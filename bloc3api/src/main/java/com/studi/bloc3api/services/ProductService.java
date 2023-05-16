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

    public Product createProduct(Product _product) {

        return productRepository.save(_product);
    }

    public List<Product> getProduct() {
        return productRepository.findAll();
    }

    public void deleteProduct(Integer id) {
        productRepository.deleteById(id);
    }

    public Product updateProduct(Integer id, Product product) {
        Product existingProduct = productRepository.findById(id).orElse(null);
        if (existingProduct != null) {
            existingProduct = product;
            existingProduct.id = id;
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
