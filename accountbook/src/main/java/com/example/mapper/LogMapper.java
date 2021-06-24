package com.example.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.dto.LogDTO;
import com.example.dto.UserDTO;

@Mapper 
public interface LogMapper {

    List<LogDTO> getLog(String id);
    LogDTO findById(int id);
    int insertLog(LogDTO log);
    int updateLog(LogDTO log);
    int deleteLog(int id);
}