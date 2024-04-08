package com.example.pot_accounts.Dao;
// com.example.pot_accounts.Dao.MemberDao
import com.example.pot_accounts.VO.Member;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface MemberDao {
    // 회원가입
    int insMem(Member ins);
    // 아이디 중복체크 - 회원가입
    int checkId(@Param("id") String id);
}
