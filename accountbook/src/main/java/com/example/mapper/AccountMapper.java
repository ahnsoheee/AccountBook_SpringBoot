package com.example.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.dto.AccountDTO;
import com.example.dto.LogDTO;
import com.example.dto.UserDTO;

@Mapper 
public interface AccountMapper {

    public List<AccountDTO> getAccount(UserDTO user);
    public int getAccountId(AccountDTO account);
    public int insertAccount(AccountDTO account);
    public int updateAccount(AccountDTO account);
    public int addAccount(LogDTO log);
    public int subAccount(LogDTO log);
    public int deleteAccount(int id);
}