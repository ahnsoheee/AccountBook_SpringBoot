package com.example.service;

import java.io.UnsupportedEncodingException;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;

import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import com.example.vo.UserVO;

@Service
public class JwtService{

	@Value("${JWT.SECRET_KEY}") 
	private String SECRET_KEY;

	@Value("${JWT.DATA_KEY}") 
	private String DATA_KEY;
	
	@Autowired
	private ObjectMapper objectMapper;
	
	public String createToken(UserVO user) {
		long currTime = System.currentTimeMillis();
		String jwt = Jwts.builder()
						.setHeaderParam("typ", "JWT")
						.setExpiration(new Date(currTime + 3600000))
						.setIssuedAt(new Date(currTime))
						.claim(DATA_KEY, user)
						.signWith(SignatureAlgorithm.HS256, this.generateKey())
						.compact();
	
		return jwt;
	}


	private byte[] generateKey(){
		byte[] key = null;
        try {
            key = SECRET_KEY.getBytes("UTF-8");
        } catch (UnsupportedEncodingException e) {
			System.out.println("Decodeing failed");
        }
        
        return key;
	}
	
	public UserVO getUser(String jwt) {
		Jws<Claims> claims = null;
        claims = Jwts.parser().setSigningKey(this.generateKey()).parseClaimsJws(jwt);

		return objectMapper.convertValue(claims.getBody().get(DATA_KEY), UserVO.class);
	}
}