package com.example.pot_accounts.VO;

public class Member {
    // member_key name id password email confirm
    private int member_key; // 맴버키
    private String name; // 이름
    private String id; // 아이디
    private String password; // 비밀번호
    private String email; // 이메일
    private String confirm; // 인증여부

    public Member() {
    }

    public Member(int member_key, String name, String id, String password, String email, String confirm) {
        this.member_key = member_key;
        this.name = name;
        this.id = id;
        this.password = password;
        this.email = email;
        this.confirm = confirm;
    }

    public int getMember_key() {
        return member_key;
    }

    public void setMember_key(int member_key) {
        this.member_key = member_key;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getConfirm() {
        return confirm;
    }

    public void setConfirm(String confirm) {
        this.confirm = confirm;
    }
}
