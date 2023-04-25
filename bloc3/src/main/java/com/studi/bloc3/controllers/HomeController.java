package com.studi.bloc3.controllers;

import com.studi.bloc3.models.Product;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@Controller
public class HomeController {

    @GetMapping("/")
    public String index() {
        return "index";
    }

    @GetMapping(value = "/thymeleaf")
    public String getThymeleafVue() {
        return "thymeleafTemplate";
    }
}