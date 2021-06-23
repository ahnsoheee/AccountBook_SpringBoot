package com.example;

import java.util.List;
import java.util.HashMap;
import java.util.Date;
import java.text.SimpleDateFormat;  
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
    public boolean insertLog(@RequestBody HashMap<String, String> h) {
        System.out.println(h);
        LogVO log = new LogVO();
        log.setUserId(h.get("user_id"));;
        log.setAccountId(Integer.parseInt(h.get("account_id")));
        log.setCategoryId(Integer.parseInt(h.get("category_id")));
        log.setIncome(Boolean.parseBoolean(h.get("income")));
        log.setCost(Integer.parseInt(h.get("cost")));
        log.setTitle(h.get("title"));

        SimpleDateFormat dateParser = new SimpleDateFormat("yyyy-MM-dd");
        {
            try {
                log.setDate(dateParser.parse(h.get("date")));
            } catch (ParseException e) {
                e.printStackTrace();
                return false;
            }
        }

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