package com.studi.bloc3.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MercadoController {

    @GetMapping("/")
    public String index() {
        return "index";
    }

    @GetMapping(value="/catalog")
    public String productsCatalog() {return "catalog"; }

    @GetMapping(value = "/login-mercado")
    public String login() {return "login"; }

    @GetMapping(value = "/admin-page")
    public String adminPage() {return "admin-page"; }

    @GetMapping(value = "/form-add-product")
    public String form() { return "form-add-product"; }

    @GetMapping(value = "/change-product")
    public String changeProduct() { return "change-product"; }

    @GetMapping(value = "/form-add-category")
    public String addCategory() { return "form-add-category"; }

    @GetMapping(value = "/form-delete-category")
    public String deleteCategory() { return "form-delete-category"; }

    @GetMapping(value = "/form-manage-promotions")
    public String managePromotion() { return "form-manage-promotions"; }



    }