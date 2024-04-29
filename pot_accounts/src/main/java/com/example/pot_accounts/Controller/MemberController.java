package com.example.pot_accounts.Controller;

import com.example.pot_accounts.GenerateCertNumber;
import com.example.pot_accounts.Service.MemberService;
import com.example.pot_accounts.VO.MailSender;
import com.example.pot_accounts.VO.Member;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MemberController {
    @Autowired(required = false)
    private MemberService service;

    String code = "";
    // 메일 보내기
    @PostMapping("/sendMail")
    public ResponseEntity<?> mailSend(@RequestParam("receiver") String receiver, Model d) {
        GenerateCertNumber ge = new GenerateCertNumber();
        ge.setCertNumLength(5);
        MailSender mailVo = new MailSender();
        mailVo.setReceiver(receiver);
        mailVo.setTitle("Pot Accoutns 인증코드 입니다.");
        code = ge.excuteGenerate();
        mailVo.setContent("Pot Accoutns 의 인증메일 입니다."
                + "\n인증번호를 입력하여 주세요.\n\n"+code);
        System.out.println(ge.excuteGenerate());
        boolean isMailSent = service.sendMail(mailVo).equals("메일 발송 성공");
        return ResponseEntity.ok(isMailSent ? "메일 발송 성공" : "메일 발송 실패");
    }
    // 인증번호
    @GetMapping("codeNumber")
    public ResponseEntity<String> codeNumber(){
        System.out.println("!!!!!!!!!!!!인증번호 확인용!!!!!!!!"+code);
        return ResponseEntity.ok(code);
    }

    // 회원등록
    @PostMapping("register")
    public ResponseEntity<?> insMember(Member ins, Model d){
        return ResponseEntity.ok(service.insMem(ins));
    }
    // 아이디 중복체크
    @GetMapping("idCheck")
    public ResponseEntity<?> idCheck(@RequestParam("id") String id){
        if(service.checkId(id)){
            System.out.println("중복");
        }else{
            System.out.println("중복ㄴ");
        }
        return ResponseEntity.ok(service.checkId(id));
    }

    // 로그인
    @PostMapping("login")
    public ResponseEntity<?> login(Member mem){
        return ResponseEntity.ok(service.loginMem(mem));
    }

    // 아이디찾기
    @PostMapping("findId")
    public ResponseEntity<String> findId(Member mem){
        return ResponseEntity.ok(service.findId(mem));
    }
    // 비밀번호 찾기
    @PostMapping("findPwd")
    public ResponseEntity<String> findPwd(Member mem){
        return ResponseEntity.ok(service.findPwd(mem));
    }
}
