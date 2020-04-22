import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class PhoneService {

    constructor(private httpClient: HttpClient) { }

    getAll(phone: string, page: number, records: number): Observable<any> {
        return this.httpClient.get<any>('http://localhost:9090/phone/combinations/' + phone + '/' + page + '/' + records);
    }

    getPhoneCombinations(phone: string, page: number, records: number): Observable<any> {
        return this.httpClient.get<any>('http://localhost:9090/phone/combinations/' + phone + '/' + page + '/' + records);
    }
}