package com.studi.bloc3api.repositories;

import com.studi.bloc3api.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Integer> {
}