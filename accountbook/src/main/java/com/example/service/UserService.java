package com.example.service;

import com.example.vo.UserVO;

import com.example.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;

public class UserService {
    
    @Autowired
    UserMapper userMapper;

    public boolean signup (UserVO user) {
        int res = userMapper.insertUser(user);
        if (res == 1) return true;
        return false;
    }

    public boolean signin (UserVO user) {
        if (user != null) {
            UserVO res = userMapper.findUser(user);
            if (res.equals(user)) return true;
        }
        return false;
    }

    public UserVO findUserById(String id) {
        UserVO user = userMapper.findById(id);
        return user;
    }
}