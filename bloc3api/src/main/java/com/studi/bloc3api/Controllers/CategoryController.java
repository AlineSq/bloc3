package com.studi.bloc3api.Controllers;

import com.studi.bloc3api.models.Category;
import com.studi.bloc3api.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    CategoryController(CategoryRepository repository) {
        this.categoryRepository = repository;
    }
    @Autowired
    private CategoryRepository categoryRepository;

    @PostMapping("")
    public Category createCategory(@RequestBody Category user) {
        return categoryRepository.save(user);
    }

    @GetMapping("")
    public List<Category> getCategory() {
        return categoryRepository.findAll();
    }

    @DeleteMapping("{id}")
    public void deleteCategory(@PathVariable Long id) {
        categoryRepository.deleteById(id.intValue());
    }
}