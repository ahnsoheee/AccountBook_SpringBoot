package com.example.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.dto.UserDTO;

@Mapper 
public interface UserMapper {

    int insertUser(UserDTO user);
    UserDTO findUser(UserDTO user);
    UserDTO findById(String id);
    int deleteUser(String id);
}