package com.example.pot_accounts.Service;


import com.example.pot_accounts.Dao.StartDao;
import com.example.pot_accounts.VO.Emp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StartService {
    @Autowired(required = false)
    StartDao dao;

    public List<Emp> empInfo(){
        List<Emp> e = dao.empInfo();
        for(Emp emp : e){
            System.out.println(emp.getEmpno());
        }
        return dao.empInfo();
    }
}
