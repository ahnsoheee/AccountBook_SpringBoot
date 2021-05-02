package backend.accountbook;

import org.springframework.web.bind.annotation.GetMapping; 
import org.springframework.web.bind.annotation.PathVariable; 
import org.springframework.stereotype.Controller;

@Controller 
public class WebController { 
    @GetMapping("/hello") 
    public String hello() { 
        return "HelloWorld";
    } 
}
