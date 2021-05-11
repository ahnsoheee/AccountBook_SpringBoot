package accountbook.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import accountbook.vo.UserVO;

@Mapper 
public interface UserMapper {

    List<UserVO> userList();
    UserVO findUserById(String id);
    void insertUser(UserVO user);
    void deleteUser(String id);
}