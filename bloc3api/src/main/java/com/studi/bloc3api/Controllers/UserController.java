package com.studi.bloc3api.Controllers;

import com.studi.bloc3api.services.UserService;

import ch.qos.logback.core.joran.conditional.ElseAction;

import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/users")
public class UserController {

    private UserService userService;

    public UserController(UserService _UserService) {
        if (_UserService != null)
            userService = _UserService;
        else 
            userService = new UserService();
    }

    @PostMapping("login")
    public String checkUser(@RequestBody Map<String, String> body) {
        return userService.checkUser(body);
    }

    @PostMapping("check")
    public String checkToken(@RequestHeader(value ="Authorization", required = false) String authorizationHeader) {
        return userService.checkToken(authorizationHeader);
    }

    @PostMapping("/logout")
    public String logout(@RequestHeader("Authorization") String authorizationHeader) {
        userService.checkToken(authorizationHeader);
        return userService.logout(authorizationHeader);
    }
}