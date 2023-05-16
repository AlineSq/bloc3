package com.studi.bloc3api.Controllers;

import com.studi.bloc3api.models.Category;
import com.studi.bloc3api.services.CategoryService;
import com.studi.bloc3api.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private UserService userService;

    @PostMapping("")
    public Category createCategory(@RequestHeader("Authorization") String authorizationHeader,
            @RequestBody Category _cat) {
        userService.checkToken(authorizationHeader);
        return categoryService.createCategory(_cat);
    }

    @GetMapping("")
    public List<Category> getCategory() {
        return categoryService.getCategory();
    }

    @DeleteMapping("{id}")
    public void deleteCategory(@RequestHeader("Authorization") String authorizationHeader, @PathVariable Long id) {
        userService.checkToken(authorizationHeader);
        categoryService.deleteCategory(id.intValue());
    }
}