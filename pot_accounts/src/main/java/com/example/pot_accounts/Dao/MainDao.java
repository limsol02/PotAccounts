package com.example.pot_accounts.Dao;

import com.example.pot_accounts.VO.Accounts;
import com.example.pot_accounts.VO.Income;
import com.example.pot_accounts.VO.Payment;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface MainDao {
    Accounts accountsInfo(@Param("id")String id);
    List<Payment> payMonth01(@Param("id")String id);
    List<Payment> payMonth02(@Param("id")String id);
    List<Payment> payMonth03(@Param("id")String id);
    List<Income> incomeMonth01(@Param("id")String id);
    List<Income> incomeMonth02(@Param("id")String id);
    List<Income> incomeMonth03(@Param("id")String id);
    List<Payment> payWeekly(@Param("id")String id);
    List<Income> incomeWeekly(@Param("id")String id);
}
