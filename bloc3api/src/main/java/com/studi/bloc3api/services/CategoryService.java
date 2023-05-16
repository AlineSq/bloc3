package com.studi.bloc3api.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.studi.bloc3api.models.Category;
import com.studi.bloc3api.repositories.CategoryRepository;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public Category createCategory(Category _cat) {
        return categoryRepository.save(_cat);
    }

    public List<Category> getCategory() {
        return categoryRepository.findAll();
    }

    public void deleteCategory(Integer _id) {
        categoryRepository.deleteById(_id);
    }
}
