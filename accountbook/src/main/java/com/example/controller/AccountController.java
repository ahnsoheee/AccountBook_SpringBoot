package com.example;

import java.util.List;
import java.util.HashMap;
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
import com.example.mapper.AccountMapper;
import com.example.vo.AccountVO;
import com.example.vo.UserVO;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/account")
public class AccountController {

    @Autowired
    AccountMapper accountMapper;

    @PostMapping("")
    public List<AccountVO> getAccount(@RequestBody UserVO user) {
        List<AccountVO> accountList = accountMapper.getAccount(user);

        return accountList;
    }

    @PostMapping("/add")
    public boolean insertAccount(@RequestBody HashMap<String, String> h) {
        AccountVO account = new AccountVO();
        account.setUser_id(h.get("user_id"));
        account.setAsset(Integer.parseInt(h.get("asset")));
        account.setName(h.get("name"));
        
        if (accountMapper.getAccountId(account) == 0) {
            if (accountMapper.insertAccount(account) == 1) return true;
        }
        return false;
    }

    @PostMapping("/update")
    public boolean updateAccount(@RequestBody AccountVO account) {
        if (accountMapper.updateAccount(account) == 1) return true;
        return false;
    }

    @DeleteMapping("")
    public boolean deleteAccount(@RequestBody int id) {
        if (accountMapper.deleteAccount(id) == 1) return true;
        return false;
    }
}