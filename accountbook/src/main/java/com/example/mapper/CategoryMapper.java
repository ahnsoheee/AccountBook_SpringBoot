package com.example.mapper;

import java.util.List;
import java.util.HashMap;

import org.apache.ibatis.annotations.Mapper;

import com.example.dto.CategoryDTO;
import com.example.dto.UserDTO;

@Mapper 
public interface CategoryMapper {

    List<CategoryDTO> getCategory(CategoryDTO category);
    int getCategoryId(CategoryDTO category);
    int insertCategory(CategoryDTO category);
    int updateCategory(CategoryDTO category);
    int deleteCategory(int id);
}