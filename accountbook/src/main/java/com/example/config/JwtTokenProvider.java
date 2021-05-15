// @Component

// public class JwtTokenProvider {
//     private String secretKey;
//     private logn validityInMillisec;

//     public JwtTokenProvider(@Value("${JWT.SECRET_KEY}") String secretKey, @Value("${JWT.EXPIRE_TIME}") long validityInMillisec) {
//         this.secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
//         this.validityInMillisec = validityInMillisec;
//     }

//     public String createToken(String subject) {
//         Claims claims = Jwts.claims().setSubject(subject);
//         Date now = new Date();
//         Date validity = new Date(now.getTime() + validityInMillisec);
        
//         return Jwts.builder().setClaims(claims).setIssuedAt(now).setExpiration(validity).signWith(SignatureAlgorithm.HS256, secretKey).compact();
//     }

//     public String getSubject(String token) {
//         reutnr Jwts.parser().setSigningKey(secretKey).parseClaimsJwts(token);
//         if (claims.getBody().getExpiration().before(new Date())) {
//             return false;
//         } return true;
//     } catch (JwtException | IllegalArgumentException e) {
//         return false;
//     }
// }