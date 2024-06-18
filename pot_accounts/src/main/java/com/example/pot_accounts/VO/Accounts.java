package com.example.pot_accounts.VO;

public class Accounts {
    // accounts_key(int) type(String) participant(int) accounts_title(String)
    private int accounts_key;
    private String type;
    private int participant;
    private String accounts_title;

    public Accounts() {
    }

    public Accounts(int accounts_key, String type, int participant, String accounts_title) {
        this.accounts_key = accounts_key;
        this.type = type;
        this.participant = participant;
        this.accounts_title = accounts_title;
    }

    public int getAccounts_key() {
        return accounts_key;
    }

    public void setAccounts_key(int accounts_key) {
        this.accounts_key = accounts_key;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getParticipant() {
        return participant;
    }

    public void setParticipant(int participant) {
        this.participant = participant;
    }

    public String getAccounts_title() {
        return accounts_title;
    }

    public void setAccounts_title(String accounts_title) {
        this.accounts_title = accounts_title;
    }
}
