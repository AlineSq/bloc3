package com.studi.bloc3api.Controllers;

import com.studi.bloc3api.services.ProductService;
import com.studi.bloc3api.services.UserService;
import com.studi.bloc3api.models.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private UserService userService;

    @PostMapping("")
    public Product createProduct(@RequestHeader("Authorization") String authorizationHeader,
            @RequestBody Product _product) {
        userService.checkToken(authorizationHeader);
        return productService.createProduct(_product);
    }

    @GetMapping("")
    public List<Product> getProduct() {
        return productService.getProduct();
    }

    @DeleteMapping("{id}")
    public void deleteProduct(@RequestHeader("Authorization") String authorizationHeader, @PathVariable Integer id) {
        userService.checkToken(authorizationHeader);
        productService.deleteProduct(id);
    }

    @PutMapping("/{id}")
    public Product updateProduct(@RequestHeader("Authorization") String authorizationHeader, @PathVariable Integer id,
            @RequestBody Product product) {
        userService.checkToken(authorizationHeader);
        return productService.updateProduct(id, product);
    }

    @PostMapping("/updatePromotion")
    public Product updatePromotion(@RequestHeader("Authorization") String authorizationHeader,
            @RequestBody Product product) {
        userService.checkToken(authorizationHeader);
        return productService.updatePromotion(product);
    }
}