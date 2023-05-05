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
            existingProduct = product;
            existingProduct.id = id;
            return productRepository.save(existingProduct);
        }
        return null;
    }


    /* @PostMapping("/updatePromotion?id={idProduct}&startDate={startDate}&endDate={endDate}&percent={percent}")
    public Product updatePromotion(@PathVariable Integer idProduct, @PathVariable Date startDate,
                                   @PathVariable Date endDate, @PathVariable Integer percent) { */
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
}