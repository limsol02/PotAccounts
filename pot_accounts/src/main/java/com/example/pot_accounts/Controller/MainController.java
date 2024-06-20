package com.example.pot_accounts.Controller;

import com.example.pot_accounts.Service.MainService;
import com.example.pot_accounts.VO.Accounts;
import com.example.pot_accounts.VO.Income;
import com.example.pot_accounts.VO.Member;
import com.example.pot_accounts.VO.Payment;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
     // 차트데이터
    @GetMapping("/{id}/payMonth")
    public Map<String, List<Payment>> payMonth(@PathVariable("id") String id) {
        System.out.println(id + " 들어오냐22222??");
        Map<String, List<Payment>> payRes = new HashMap<>();
        payRes.put("payMonth01", service.payMonth01(id));
        payRes.put("payMonth02", service.payMonth02(id));
        payRes.put("payMonth03", service.payMonth03(id));
        return payRes;
    }

    @GetMapping("/{id}/incomeMonth")
    public Map<String, List<Income>> incomeMonth(@PathVariable("id") String id){
        Map<String, List<Income>> incomeRes = new HashMap<>();
        incomeRes.put("incomeMonth01", service.incomeMonth01(id));
        incomeRes.put("incomeMonth02", service.incomeMonth02(id));
        incomeRes.put("incomeMonth03", service.incomeMonth03(id));
        return incomeRes;
    }
}
