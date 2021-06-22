package com.example.mapper;

import java.util.List;
import java.util.HashMap;

import org.apache.ibatis.annotations.Mapper;

import com.example.vo.CategoryVO;
import com.example.vo.UserVO;

@Mapper 
public interface CategoryMapper {

    List<CategoryVO> getCategory(HashMap<String, String> h);
    int getCategoryId(CategoryVO category);
    int insertCategory(CategoryVO category);
    int updateCategory(CategoryVO category);
    int deleteCategory(int id);
}