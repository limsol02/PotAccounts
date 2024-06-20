package com.example.pot_accounts.Service;

import com.example.pot_accounts.Dao.MainDao;
import com.example.pot_accounts.VO.Accounts;
import com.example.pot_accounts.VO.Income;
import com.example.pot_accounts.VO.Payment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MainService {
    @Autowired(required = false)
    private MainDao dao;

    public Accounts accountsInfo(String id){
        return dao.accountsInfo(id);
    }
    // 차트 데이터
    public List<Payment> payMonth01(String id){
        return dao.payMonth01(id);
    }
    public List<Payment> payMonth02(String id){
        return dao.payMonth02(id);
    }
    public List<Payment> payMonth03(String id){
        return dao.payMonth03(id);
    }
    public List<Income> incomeMonth01(String id){
        return dao.incomeMonth01(id);
    }
    public List<Income> incomeMonth02(String id){
        return dao.incomeMonth02(id);
    }public List<Income> incomeMonth03(String id){
        return dao.incomeMonth03(id);
    }
}
