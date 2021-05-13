package com.example.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.vo.UserVO;

@Mapper 
public interface UserMapper {

    List<UserVO> userList();
    UserVO findUserById(String id);
    int insertUser(UserVO user);
    void deleteUser(String id);
}