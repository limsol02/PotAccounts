package com.example.pot_accounts.Controller;

import com.example.pot_accounts.Service.MainService;
import com.example.pot_accounts.VO.Accounts;
import com.example.pot_accounts.VO.Member;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/account")

public class MainController {
    @Autowired(required = false)
    private MainService service;
    @GetMapping("/{id}")
    public Accounts accountsInfo(@PathVariable("id") String id, HttpSession session) {
        System.out.println(id + " 들어오냐??");
        System.out.println("세션 ID: " + session.getId());
        Member loginMember = (Member) session.getAttribute("loginMem");
        if (loginMember != null) {
            System.out.println(loginMember.getName() + "님이 로그인되어 있습니다.");
        } else {
            System.out.println("로그인된 사용자가 없습니다.");
        }
        return service.accountsInfo(id);
    }
}
