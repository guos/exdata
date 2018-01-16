package com.huangxiaohong.ld.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.huangxiaohong.ld.dao.DataDao;
import com.huangxiaohong.ld.entity.Data;

@RestController
@RequestMapping("data")
public class DataController {
	@Autowired
	DataDao dataDao;

	@GetMapping("/{type}")
	public List<Data> queryByType(@PathVariable Integer type) {
		return dataDao.findByType(type);
	}

}
