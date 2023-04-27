package com.studi.bloc3api.services;

import com.studi.bloc3api.models.Product;
import com.studi.bloc3api.dao.PostgreSql.ProductPostgreSqlDao;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Blob;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ProductsService {

    private ProductPostgreSqlDao dao;

    public ProductsService() {
        this.dao = new ProductPostgreSqlDao();
    }

    /**
     * Fonction permettant de donner la liste des produits
     * @return
     */
    @GetMapping("/products")
    public List<Product> getProducts() {
        return this.dao.getProducts();
    }

    /**
     * Fonction permettant de créer un produit
     * @param _name
     * @param _price
     * @param _description
     * @param _picture
     * @return
     */
    @PostMapping("/create")
    public Product create(String _name, Integer _price, String _description, Blob _picture) {
        return this.dao.create(_name, _price, _description, _picture);
    }
}