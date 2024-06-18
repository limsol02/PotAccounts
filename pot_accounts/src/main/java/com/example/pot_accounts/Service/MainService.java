package com.example.pot_accounts.Service;

import com.example.pot_accounts.Dao.MainDao;
import com.example.pot_accounts.VO.Accounts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MainService {
    @Autowired(required = false)
    private MainDao dao;

    public Accounts accountsInfo(String id){
        return dao.accountsInfo(id);
    }
}
