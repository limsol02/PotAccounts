package com.example.pot_accounts.Dao;
// com.example.potaccounts.Dao.StartDao
import com.example.pot_accounts.VO.Emp;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface StartDao {
    List<Emp> empInfo();
}
