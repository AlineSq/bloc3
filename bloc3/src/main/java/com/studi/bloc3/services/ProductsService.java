package com.studi.bloc3.services;

import com.studi.bloc3.models.Product;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ProductsService {

    @GetMapping("/products")
    public List<Product> getProducts() {
       return Arrays.asList(new Product());
    }

}