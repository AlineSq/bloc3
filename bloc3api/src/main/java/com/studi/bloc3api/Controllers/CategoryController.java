package com.studi.bloc3api.Controllers;

import com.studi.bloc3api.models.Category;
import com.studi.bloc3api.models.Product;
import com.studi.bloc3api.repositories.CategoryRepository;
import com.studi.bloc3api.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CategoryController {


    CategoryController(CategoryRepository repository) {
        this.categoryRepository = repository;
    }
    @Autowired
    private CategoryRepository categoryRepository;

    @PostMapping("/categories")
    public Category createCategory(@RequestBody Category user) {
        return categoryRepository.save(user);
    }

    @GetMapping("/categories")
    public List<Category> getCategory() {
        return categoryRepository.findAll();
    }
}