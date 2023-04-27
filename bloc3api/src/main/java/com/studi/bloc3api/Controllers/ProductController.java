package com.studi.bloc3api.Controllers;

import com.studi.bloc3api.repositories.ProductRepository;
import com.studi.bloc3api.models.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ProductController {


    ProductController(ProductRepository repository) {
        this.productRepository = repository;
    }
    @Autowired
    private ProductRepository productRepository;

    @PostMapping("/products")
    public Product createProduct(@RequestBody Product user) {
        return productRepository.save(user);
    }

    @GetMapping("/products")
    public List<Product> getProduct() {
        return productRepository.findAll();
    }
}