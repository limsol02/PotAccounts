package com.example.pot_accounts.VO;

public class Income {
    private int income_key;
    private int accounts_key;
    private int income_money;
    private int category_key;
    private String income_method;
    private String income_memo;
    private String income_date;
    private String income_title;
    private String week_label;


    public Income(int income_key, int accounts_key, int income_money, int category_key, String income_method, String income_memo, String income_date, String income_title) {
        this.income_key = income_key;
        this.accounts_key = accounts_key;
        this.income_money = income_money;
        this.category_key = category_key;
        this.income_method = income_method;
        this.income_memo = income_memo;
        this.income_date = income_date;
        this.income_title = income_title;
    }

    public Income() {
    }

    public int getIncome_key() {
        return income_key;
    }

    public void setIncome_key(int income_key) {
        this.income_key = income_key;
    }

    public int getAccounts_key() {
        return accounts_key;
    }

    public void setAccounts_key(int accounts_key) {
        this.accounts_key = accounts_key;
    }

    public int getIncome_money() {
        return income_money;
    }

    public void setIncome_money(int income_money) {
        this.income_money = income_money;
    }

    public int getCategory_key() {
        return category_key;
    }

    public void setCategory_key(int category_key) {
        this.category_key = category_key;
    }

    public String getIncome_method() {
        return income_method;
    }

    public void setIncome_method(String income_method) {
        this.income_method = income_method;
    }

    public String getIncome_memo() {
        return income_memo;
    }

    public void setIncome_memo(String income_memo) {
        this.income_memo = income_memo;
    }

    public String getIncome_date() {
        return income_date;
    }

    public void setIncome_date(String income_date) {
        this.income_date = income_date;
    }

    public String getIncome_title() {
        return income_title;
    }

    public void setIncome_title(String income_title) {
        this.income_title = income_title;
    }

    public String getWeek_label() {
        return week_label;
    }

    public void setWeek_label(String week_label) {
        this.week_label = week_label;
    }

    @Override
    public String toString() {
        return "Income{" +
                "income_key=" + income_key +
                ", accounts_key=" + accounts_key +
                ", income_money=" + income_money +
                ", category_key=" + category_key +
                ", income_method='" + income_method + '\'' +
                ", income_memo='" + income_memo + '\'' +
                ", income_date='" + income_date + '\'' +
                ", income_title='" + income_title + '\'' +
                '}';
    }
}
