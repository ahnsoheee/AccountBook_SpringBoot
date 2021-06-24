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

import com.example.mapper.CategoryMapper;
import com.example.vo.CategoryVO;
import com.example.vo.UserVO;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/category")
public class CategoryController {

    @Autowired
    CategoryMapper categoryMapper;

    @PostMapping("")
    public List<CategoryVO> getCategory(@RequestBody HashMap<String, String> h) {
        List<CategoryVO> categoryList = categoryMapper.getCategory(h);
        return categoryList;
    }

    @PostMapping("/add")
    public boolean insertCategory(@RequestBody HashMap<String, String> h) {
        CategoryVO category = new CategoryVO();
        category.setName(h.get("name"));
        category.setUser_id(h.get("user_id"));
        category.setType(h.get("type"));
        
        if (categoryMapper.getCategoryId(category) == 0) {
            if (categoryMapper.insertCategory(category) == 1) return true;
        }
        return false;
    }

    @PostMapping("/update")
    public boolean updateCategory(@RequestBody CategoryVO category) {
        if (categoryMapper.updateCategory(category) == 1) return true;
        return false;
    }

    @DeleteMapping("")
    public boolean deleteCategory(@RequestBody int id) {
        if (categoryMapper.deleteCategory(id) == 1) return true;
        return false;
    }
}