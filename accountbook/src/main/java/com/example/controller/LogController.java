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
import com.example.mapper.LogMapper;
import com.example.mapper.AccountMapper;
import com.example.vo.LogVO;
import com.example.vo.UserVO;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/log")
public class LogController {

    @Autowired
    LogMapper logMapper;

    @Autowired
    AccountMapper accountMapper;

    @PostMapping("")
    public List<LogVO> getLog(@RequestBody UserVO user) {
        return logMapper.getLog(user.getId());
        
    }

    @PostMapping("/add")
    public boolean createLog(@RequestBody LogVO log) {
        if (logMapper.insertLog(log) == 1) {
            if (log.getIncome()) {
                if (accountMapper.addAccount(log) == 1) {
                    return true;
                }
                return false;
            }
            else {
                if (accountMapper.subAccount(log) == 1) {
                    return true;
                }
                return false;
            }
        }
        return false;
    }

    @PostMapping("/update")
    public boolean updateLog(@RequestBody LogVO log) {
        if (logMapper.updateLog(log) == 1) {
            if (log.getIncome()) {
                if (accountMapper.addAccount(log) == 1) {
                    return true;
                }
                return false;
            }
            else {
                if (accountMapper.subAccount(log) == 1) {
                    return true;
                }
                return false;
            }
        }
        return false;
    }

    @DeleteMapping("") 
    public boolean deleteLog(@RequestBody int id) {
        if (logMapper.deleteLog(id) == 1) return true;
        return false;
    }
}