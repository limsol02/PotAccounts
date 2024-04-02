package com.example.pot_accounts.Controller;


import com.example.pot_accounts.Service.StartService;
import com.example.pot_accounts.VO.Emp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class StartController {
    @Autowired(required = false)
    private StartService service;
    @GetMapping("/emp")
    //@CrossOrigin(origins = "http://localhost:3000") 인텔리 커밋 테스트
    public ResponseEntity<?> emp() {
        List<Emp> empInfo = service.empInfo();
        return ResponseEntity.ok(empInfo);
    }
}
