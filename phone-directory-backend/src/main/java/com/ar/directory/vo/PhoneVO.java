package com.ar.directory.vo;

import java.util.List;

public class PhoneVO {
	
	List<String> list;
	int totalCount;

	public List<String> getList() {
		return list;
	}

	public void setList(List<String> list) {
		this.list = list;
	}

	public int getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}

	@Override
	public String toString() {
		return "PhoneVO [list=" + list + ", totalCount=" + totalCount + "]";
	}

}
