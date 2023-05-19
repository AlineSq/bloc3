package com.studi.bloc3api.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.studi.bloc3api.models.Product;
import com.studi.bloc3api.repositories.ProductRepository;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public ProductRepository getProductRepository() {
        return productRepository;
    }

    public Product createProduct(Product _product) {

        return productRepository.save(_product);
    }

    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    public void deleteProduct(Integer id) {
        productRepository.deleteById(id);
    }

    public Product updateProduct(Integer id, Product product) {
        Product existingProduct = productRepository.findById(id).orElse(null);
        if (existingProduct != null) {
            existingProduct.name = product.name;
            existingProduct.description = product.description;
            existingProduct.categoryId = product.categoryId;
            existingProduct.price = product.price;
            
            if (product.picture != null && product.picture.length()>0)
                existingProduct.picture = product.picture;

            return productRepository.save(existingProduct);
        }
        return null;
    }

    public Product updatePromotion(Product product) {
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
