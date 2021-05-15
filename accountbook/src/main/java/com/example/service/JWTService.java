// package com.example.service;

// import org.springframework.beans.factory.annotation.Value;

// public class JWTService {
//     private final Long expiredTime = 1000 * 60L * 60L * 3L;

//     @Value("#{JWT.ISSUER")
//     private String issuer;

//     @Value("${JWT.SECRET_KEY")
//     private String secretKey;

//     public String createToken(String id) {
//         try {
//             JWTCreator.Builder builder = JWT.create();
//             builder.withIssuer(issuer);
//             builder.withClaim("token", )
//         }
//     }
// }