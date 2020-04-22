import { Component, ViewChild, ElementRef } from '@angular/core';
import { PhoneService } from './phone-service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { merge, Observable, BehaviorSubject, fromEvent, Subject, of } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { debounceTime, distinctUntilChanged, tap, catchError, finalize } from 'rxjs/operators';
import { DataSource } from '@angular/cdk/table';
import { CollectionViewer } from '@angular/cdk/collections';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'phone-directory';
  displayedColumns: string[] = ['phone'];

  totalCount: number;
  phone: any;
  dataSource: PhoneDataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(private phoneService: PhoneService) { }

  ngOnInit() {
    this.dataSource = new PhoneDataSource(this.phoneService);
  }

  ngAfterViewInit() {
    // server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          if (this.input.nativeElement.value && this.input.nativeElement.value.length == 8 || this.input.nativeElement.value.length == 10) {
            this.paginator.pageIndex = 0;
            this.loadPage();

            this.phoneService.getAll(this.input.nativeElement.value, this.paginator.pageIndex, this.paginator.pageSize).subscribe(data => {
              this.totalCount = data.totalCount;
            }, (error: HttpErrorResponse) => {
              console.log(error.name + ' ' + error.message);
            });
          }
        })
      )
      .subscribe();

    merge(this.paginator.page)
      .pipe(
        tap(() => this.loadPage())
      ).subscribe();
  }

  loadPage() {
    this.dataSource.loadPhones(
      this.input.nativeElement.value,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }
}

export class PhoneDataSource implements DataSource<string> {

  private phoneSubject = new BehaviorSubject<string[]>([]);
  public loading$ = new Subject<boolean>();

  constructor(private phoneService: PhoneService) { }

  connect(collectionViewer: CollectionViewer): Observable<any> {
    return this.phoneSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.phoneSubject.complete();
  }

  loadPhones(phone: string, pageIndex: number, pageSize: number) {
    this.loading$.next(true);
    return this.phoneService.getPhoneCombinations(phone, pageIndex, pageSize).pipe(
      catchError(() => of([])),
      finalize(() => this.loading$.next(false))
    ).subscribe(phones => {
      this.phoneSubject.next(phones.list)
    });
  }
}