package com.example.pot_accounts.Service;

import com.example.pot_accounts.Dao.MemberDao;
import com.example.pot_accounts.VO.Member;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.pot_accounts.VO.MailSender;
import org.springframework.mail.javamail.JavaMailSender;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.internet.MimeMessage.RecipientType;

@Service
public class MemberService {
    @Autowired(required = false)
    private JavaMailSender sender;
    @Autowired(required = false)
    private MemberDao dao;

        // 메일발송 메서드
        public String sendMail(MailSender email) {
            String msg="";
            MimeMessage mmsg = sender.createMimeMessage();
            try {
                mmsg.setSubject(email.getTitle());
                mmsg.setRecipient(RecipientType.TO,
                        new InternetAddress(email.getReceiver()));
                mmsg.setText(email.getContent());
                sender.send(mmsg);
                msg = "메일발송 성공";

            } catch (MessagingException e) {
                System.out.println("메시지 전송 에러 발송:"+e.getMessage());
                msg = "메일 발송 에러 발생:"+e.getMessage();
            } catch(Exception e) {
                System.out.println("기타 에러 :"+e.getMessage());
                msg = "기타 에러 발생:"+e.getMessage();
            }
            return msg;
        }

        // 회원등록
        public String insMem(Member ins){
            // 회원가입 dao
            dao.insMem(ins);
            // 가계부 시퀀스 증가 dao
            dao.accSquPlus();
            // 자동 가계부 생성 dao
            return dao.createAutoAcc()>0?"회원가입성공" : "회원가입에러";
        }

        // 아이디 중복체크(회원가입)
        public boolean checkId(String id) {
            if (id != null && dao.checkId(id) > 0) {
                return false;
            } else {
                return true;
            }
        }

        // 로그인
        public Member loginMem(Member mem){
            return dao.loginMem(mem);
        }

        // 아이디찾기
        public String findId(Member mem){
            return dao.findId(mem);
        }

        // 비밀번호 찾기
        public String findPwd(Member mem){
            return dao.findPwd(mem);
        }
}
