package com.example.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.vo.UserVO;

@Mapper 
public interface UserMapper {

    int insertUser(UserVO user);
    UserVO findUser(UserVO user);
    UserVO findById(String id);
    int deleteUser(String id);
}