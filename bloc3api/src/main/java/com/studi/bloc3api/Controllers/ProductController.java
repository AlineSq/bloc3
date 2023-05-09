package com.studi.bloc3api.Controllers;

import com.studi.bloc3api.repositories.ProductRepository;
import com.studi.bloc3api.models.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Path;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {


    ProductController(ProductRepository repository) {
        this.productRepository = repository;
    }
    @Autowired
    private ProductRepository productRepository;

    @PostMapping("")
    public Product createProduct(@RequestBody Product _product) {

            return productRepository.save(_product);
    }

    @GetMapping("")
    public List<Product> getProduct() {
        return productRepository.findAll();
    }

    @DeleteMapping("{id}")
    public void deleteProduct(@PathVariable Integer id) {
        productRepository.deleteById(id);
    }

    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable Integer id, @RequestBody Product product) {
        Product existingProduct = productRepository.findById(id).orElse(null);
        if (existingProduct != null) {
            existingProduct.promoStart = product.promoStart;
            existingProduct.promoEnd = product.promoEnd;
            existingProduct.promoPercent = product.promoPercent;
            existingProduct.id = product.id;
            existingProduct.picture = product.picture;
            existingProduct.categoryId = product.categoryId;
            existingProduct.price = product.price;
            existingProduct.description = product.description;
            existingProduct.name = product.name;

            if (product.picture != null) {
                existingProduct.picture = product.picture;
            }
            return productRepository.save(existingProduct);
        }
        return null;
    }


    @PostMapping("/updatePromotion")
    public Product updatePromotion(@RequestBody Product product) {
        Product existingProduct = productRepository.findById(product.id).orElse(null);
        if (existingProduct != null) {
            existingProduct.promoStart = product.promoStart;
            existingProduct.promoEnd = product.promoEnd;
            existingProduct.promoPercent = product.promoPercent;
            return productRepository.save(existingProduct);
        }
        return null;
    }

    @PostMapping("/stopPromotion")
    public Product stopPromotion(@RequestBody Product product) {
        Product existingProduct = productRepository.findById(product.id).orElse(null);
        if (existingProduct != null) {
            existingProduct.promoStart = null;
            existingProduct.promoEnd = null;
            existingProduct.promoPercent = null;
            return productRepository.save(existingProduct);
        }
        return null;
    }

}