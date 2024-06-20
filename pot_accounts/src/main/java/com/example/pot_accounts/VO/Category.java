package com.example.pot_accounts.VO;

public class Category {
    private int category_key;
    private String category_title;

    public Category(int category_key, String category_title) {
        this.category_key = category_key;
        this.category_title = category_title;
    }

    public Category() {
    }

    public int getCategory_key() {
        return category_key;
    }

    public void setCategory_key(int category_key) {
        this.category_key = category_key;
    }

    public String getCategory_title() {
        return category_title;
    }

    public void setCategory_title(String category_title) {
        this.category_title = category_title;
    }

    @Override
    public String toString() {
        return "Category{" +
                "category_key=" + category_key +
                ", category_title='" + category_title + '\'' +
                '}';
    }
}
