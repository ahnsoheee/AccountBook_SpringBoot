package com.example.vo;

public class AccountVO {
    int id;
    String user_id;
    String name;
    int asset;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String UserId() {
        return user_id;
    }

    public void setUserId(String user_id) {
        this.user_id = user_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAsset() {
        return asset;
    }

    public void setAsset(int asset) {
        this.asset = asset;
    }
}