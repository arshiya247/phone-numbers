package com.ar.directory.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import org.springframework.stereotype.Service;

import com.ar.directory.vo.PhoneVO;

@Service
public class PhoneDirectoryService {

	public PhoneVO getRecords(String phone, int page, int records) {
//		page--;

		ArrayList<String> combinations = getPhoneCombinations(phone);
		List<String> subList = null;

		if (page * records + records < combinations.size()) {
			subList = combinations.subList(page * records, page * records + records);
		} else if (page * records < combinations.size()) {
			subList = combinations.subList(page * records, combinations.size());
		} else {
			subList = Collections.emptyList();
		}

		PhoneVO phoneVO = new PhoneVO();
		phoneVO.setList(subList);
		phoneVO.setTotalCount(combinations.size());
		return phoneVO;
	}

	private ArrayList<String> getPhoneCombinations(String phone) {
		String actualPhoneNo = phone.substring(0, phone.length() - 1);
		ArrayList<String> combinations = new ArrayList<>();

		for (int i = 0; i < 26; i++) {
			combinations.add(actualPhoneNo + (char) ('A' + i));
		}
		return combinations;
	}
}
