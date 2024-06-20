package com.example.pot_accounts.VO;
// com.example.pot_accounts.VO.Payment
public class Payment {
    private int payment_key;
    private int accounts_key;
    private int pay_money;
    private int category_key;
    private String pay_method;
    private String pay_memo;
    private String pay_date;
    private String pay_title;
    private String week_label;

    public Payment() {
    }

    public Payment(int payment_key, int accounts_key, int pay_money, int category_key, String pay_method, String pay_memo, String pay_date, String pay_title) {
        this.payment_key = payment_key;
        this.accounts_key = accounts_key;
        this.pay_money = pay_money;
        this.category_key = category_key;
        this.pay_method = pay_method;
        this.pay_memo = pay_memo;
        this.pay_date = pay_date;
        this.pay_title = pay_title;
    }

    public int getPayment_key() {
        return payment_key;
    }

    public void setPayment_key(int payment_key) {
        this.payment_key = payment_key;
    }

    public int getAccounts_key() {
        return accounts_key;
    }

    public void setAccounts_key(int accounts_key) {
        this.accounts_key = accounts_key;
    }

    public int getPay_money() {
        return pay_money;
    }

    public void setPay_money(int pay_money) {
        this.pay_money = pay_money;
    }

    public int getCategory_key() {
        return category_key;
    }

    public void setCategory_key(int category_key) {
        this.category_key = category_key;
    }

    public String getPay_method() {
        return pay_method;
    }

    public void setPay_method(String pay_method) {
        this.pay_method = pay_method;
    }

    public String getPay_memo() {
        return pay_memo;
    }

    public void setPay_memo(String pay_memo) {
        this.pay_memo = pay_memo;
    }

    public String getPay_date() {
        return pay_date;
    }

    public void setPay_date(String pay_date) {
        this.pay_date = pay_date;
    }

    public String getPay_title() {
        return pay_title;
    }

    public void setPay_title(String pay_title) {
        this.pay_title = pay_title;
    }

    public String getWeek_label() {
        return week_label;
    }

    public void setWeek_label(String week_label) {
        this.week_label = week_label;
    }

    @Override
    public String toString() {
        return "Payment{" +
                "payment_key=" + payment_key +
                ", accounts_key=" + accounts_key +
                ", pay_money=" + pay_money +
                ", category_key=" + category_key +
                ", pay_method='" + pay_method + '\'' +
                ", pay_memo='" + pay_memo + '\'' +
                ", pay_date='" + pay_date + '\'' +
                ", pay_title='" + pay_title + '\'' +
                '}';
    }
}
