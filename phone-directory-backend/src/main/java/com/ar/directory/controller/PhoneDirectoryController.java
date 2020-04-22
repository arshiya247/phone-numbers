package com.ar.directory.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ar.directory.service.PhoneDirectoryService;
import com.ar.directory.vo.PhoneVO;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@CrossOrigin
@RestController
@RequestMapping("/phone")
@Api(value = "phone-combinations.")
public class PhoneDirectoryController {

	@Autowired
	private PhoneDirectoryService phoneDirectoryService;

	@ApiOperation(value = "Generate phone combinations.", notes = "Generate Alphabatic combinations of phone.")
	@GetMapping("/combinations/{phone}/{page}/{records}")
	public ResponseEntity<PhoneVO> getCombinations(@PathVariable String phone, @PathVariable int page,
			@PathVariable int records) {

		System.out.println("phone:" + phone + "|page:" + page + "|records:" + records);
		PhoneVO phoneVO = phoneDirectoryService.getRecords(phone, page, records);
		return ResponseEntity.ok(phoneVO);
	}
}
