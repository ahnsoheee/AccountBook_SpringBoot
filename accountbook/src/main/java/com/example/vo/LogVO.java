package com.example.vo;

import java.util.Date;

public class LogVO {
    int id;
    int category_id;
    int account_id;
    int cost;
    String user_id;
    String title;
    Date date;
    Boolean income;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getCategoryId() {
        return category_id;
    }

    public void setCategoryId(int category_id) {
        this.category_id = category_id;
    }

    public int getAccountId() {
        return account_id;
    }

    public void setAccountId(int account_id) {
        this.account_id = account_id;
    }

    public int getCost() {
        return cost;
    }

    public void setCost(int cost) {
        this.cost = cost;
    }

    public String getUserId() {
        return user_id;
    }

    public void setUserId(String user_id) {
        this.user_id = user_id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Boolean getIncome() {
        return income;
    }

    public void setIncome(Boolean income) {
        this.income = income;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}