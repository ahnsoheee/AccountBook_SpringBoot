package com.example;

import java.util.List;
import java.util.Date;
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
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.ExpiredJwtException;

import com.example.mapper.UserMapper;
import com.example.dto.UserDTO;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserMapper userMapper;

    @PostMapping("/signup")
    public boolean signup(@RequestBody UserDTO user) {
        int res = userMapper.insertUser(user);
        if (res == 1) return true;
        return false;
    }

    @PostMapping("/signin")
    public boolean signin (@RequestBody UserDTO user, HttpServletResponse response) {
        UserDTO res = userMapper.findUser(user);
        if (res != null) {
            String jwt = this.createToken(user.getUser_id());  
            Cookie cookie = new Cookie("token", jwt);
            cookie.setHttpOnly(true);
            cookie.setMaxAge(7 * 24 * 60 * 60);
            cookie.setPath("/");
            response.addCookie(cookie);
            return true;
        }
        return false;
    }

    @GetMapping("/auth")
    public UserDTO auth(HttpServletRequest request) {
        UserDTO user = null;

        Cookie[] cookies = request.getCookies();

        for (int i = 0; i < cookies.length; i++) {
            if (cookies[i].getName().equals("token")) {
                String token = cookies[i].getValue();
                if (this.validateToken(token)){
                    Claims claims = this.getClaimFromToken(token);
                    String user_id = claims.get(DATA_KEY).toString();
                    user = userMapper.findById(user_id);
                }
                return user;
            }
        }
        return user;
    }
    
    @Value("${JWT.SECRET_KEY}") 
	private String SECRET_KEY;

	@Value("${JWT.DATA_KEY}") 
	private String DATA_KEY;
	
	public String createToken(String id) {
		long currTime = System.currentTimeMillis();
		String jwt = Jwts.builder()
						.setHeaderParam("typ", "JWT")
						.setExpiration(new Date(currTime + 3600000))
						.setIssuedAt(new Date(currTime))
						.claim(DATA_KEY, id)
						.signWith(SignatureAlgorithm.HS256, this.generateKey())
						.compact();

		return jwt;
	}
    
    public boolean validateToken(String token) {
        try {
            return Jwts.parser()
                        .setSigningKey(this.generateKey())
                        .parseClaimsJws(token)
                        .getBody()
                        .getExpiration()
                        .after(new Date());
        } catch (ExpiredJwtException e) {
            return false;
        } catch (Exception e) {
            return false;
        }
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
	
	public Claims getClaimFromToken(String token) {
		return Jwts.parser()
                    .setSigningKey(this.generateKey())
                    .parseClaimsJws(token)
                    .getBody();
	}
}