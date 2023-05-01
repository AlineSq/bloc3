package com.studi.bloc3api.Controllers;

import com.studi.bloc3api.repositories.ProductRepository;
import com.studi.bloc3api.models.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
public class ProductController {


    ProductController(ProductRepository repository) {
        this.productRepository = repository;
    }
    @Autowired
    private ProductRepository productRepository;

    @PostMapping("/products")
    public Product createProduct(@RequestBody Product _product) {

            return productRepository.save(_product);
    }

    @GetMapping("/products")
    public List<Product> getProduct() {
        return productRepository.findAll();
    }
}