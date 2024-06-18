package com.example.pot_accounts.Dao;

import com.example.pot_accounts.VO.Accounts;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface MainDao {
    Accounts accountsInfo(@Param("id")String id);
}
