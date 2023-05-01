package com.studi.bloc3.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String index() {
        return "index";
    }

    @GetMapping(value="/home")
    public String home() {return "home";}

    @GetMapping(value="/catalog")
    public String productsCatalog() {return "catalog";}

    @GetMapping(value = "/login-mercado")
    public String login() {return "login";
    }

    @GetMapping(value = "/admin-page")
    public String adminPage() {return "admin-page"; }

    @GetMapping(value = "/form-add-product")
    public String form() { return "form-add-product"; }
}