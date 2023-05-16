package com.studi.bloc3api.Controllers;

import com.studi.bloc3api.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("login")
    public String checkUser(@RequestBody Map<String, String> body) {
        return userService.checkUser(body);
    }

    @PostMapping("/logout")
    public String logout(@RequestHeader("Authorization") String authorizationHeader) {
        userService.checkToken(authorizationHeader);
        return userService.logout(authorizationHeader);
    }
}