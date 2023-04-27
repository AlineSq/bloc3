package com.studi.bloc3api.services;

import com.studi.bloc3api.dao.PostgreSql.CategoryPostgreSqlDao;
import com.studi.bloc3api.models.Category;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CategoriesService {

    private CategoryPostgreSqlDao dao;

    public CategoriesService() {
        this.dao = new CategoryPostgreSqlDao();
    }

    /**
     * Fonction permettant de récupérer la liste des catégories
     * @return
     */
    @GetMapping("/categories")
    public  List<Category> getCategories() {
        return this.dao.getCategories();
    }

    /**
     * Fonction permettant de créer une catégorie
     * @param _label
     * @return
     */
    @PostMapping("/create")
    public Category create (String _label) {
        return this.dao.create(_label);
    }
}