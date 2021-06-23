package com.example.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.vo.LogVO;
import com.example.vo.UserVO;

@Mapper 
public interface LogMapper {

    List<LogVO> getLog(String id);
    LogVO findById(int id);
    int insertLog(LogVO log);
    int updateLog(LogVO log);
    int deleteLog(int id);
}