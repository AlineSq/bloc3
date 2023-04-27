package com.studi.bloc3api.repositories;

import com.studi.bloc3api.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
}