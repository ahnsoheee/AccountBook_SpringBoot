package com.example;

import java.util.List;
import java.util.HashMap;
import java.util.Date;
import java.text.ParseException;
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
import com.example.dto.LogDTO;
import com.example.dto.UserDTO;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/log")
public class LogController {

    @Autowired
    LogMapper logMapper;

    @Autowired
    AccountMapper accountMapper;

    @PostMapping("")
    public List<LogDTO> getLog(@RequestBody UserDTO user) {
        List<LogDTO> log = logMapper.getLog(user.getUser_id());
        return log;
    }

    @PostMapping("/add")
    public boolean insertLog(@RequestBody LogDTO log) {
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
    public boolean updateLog(@RequestBody LogDTO log) {
        LogDTO prev = logMapper.findById(log.getId());

        if (logMapper.updateLog(log) == 1) {
            if (prev.getCategory_id() == 1) {
                if (accountMapper.subAccount(prev) != 1) return false;
            } else {
                if (accountMapper.addAccount(prev) != 1) return false;
            }

            if (log.getIncome()) {
                if (accountMapper.addAccount(log) != 1) return false; 
            } else {
                if (accountMapper.subAccount(log) != 1) return false;
            }
            return true;
        }
        return false;
    }

    @DeleteMapping("") 
    public boolean deleteLog(@RequestBody LogDTO log) {
        int id = log.getId();
        LogDTO prev = logMapper.findById(id);
        
        if (logMapper.deleteLog(id) == 1) {
            if (prev.getCategory_id() == 1) {
                if (accountMapper.subAccount(prev) != 1) return false; 
            } else {
                if (accountMapper.addAccount(prev) != 1) return false;
            }
            return true;
        };
        return false;
    }
}