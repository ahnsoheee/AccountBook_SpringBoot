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
import org.springframework.ui.Model;

import com.example.mapper.UserMapper;
import com.example.vo.UserVO;
import com.example.service.UserService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserMapper userMapper;
    UserService userService;

    @PostMapping("/signup")
    public boolean signup(@RequestBody UserVO user) {
        return userService.signup(user);
    }

    @PostMapping("/signin")
    public boolean signin (@RequestBody UserVO user) {
        return userService.signin(user);
    }

    @GetMapping("/{id}")
    public UserVO findUserById(@PathVariable String id) {
        return userService.findUserById(id);
    }
}