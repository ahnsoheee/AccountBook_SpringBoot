package com.example.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.vo.AccountVO;
import com.example.vo.LogVO;
import com.example.vo.UserVO;

@Mapper 
public interface AccountMapper {

    List<AccountVO> getAccount(UserVO user);
    int getAccountId(AccountVO account);
    int insertAccount(AccountVO account);
    int updateAccount(AccountVO account);
    int addAccount(LogVO log);
    int subAccount(LogVO log);
    int deleteAccount(int id);
}