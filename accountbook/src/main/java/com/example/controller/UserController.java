package com.example;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.mapper.UserMapper;
import com.example.vo.UserVO;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserMapper userMapper;

    @GetMapping
    public List<UserVO> userList() {
        System.out.println(userMapper.userList());
        return userMapper.userList();
    }

    @PostMapping("/signup")
    public boolean insertUser(@RequestBody UserVO user) {
        int res = userMapper.insertUser(user);
        if (res == 1) {
            System.out.println("유저 생성 성공");
            return true;
        }
        return false;
    }
    
    @GetMapping("/{id}")
    public UserVO findUserById(@PathVariable String id) {
        System.out.println(userMapper.findUserById(id));
        UserVO user = userMapper.findUserById(id);
        return user;
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable String id) {
        userMapper.deleteUser(id);
        System.out.println("삭제 성공");
    }
}