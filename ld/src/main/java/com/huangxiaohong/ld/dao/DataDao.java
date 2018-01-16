package com.huangxiaohong.ld.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.huangxiaohong.ld.entity.Data;

public interface DataDao extends JpaRepository<Data, Integer> {

	public List<Data> findByType(int type);

}
