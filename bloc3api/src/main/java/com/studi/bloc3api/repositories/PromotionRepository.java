package com.studi.bloc3api.repositories;

import com.studi.bloc3api.models.Promotion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PromotionRepository extends JpaRepository<Promotion, Integer> {
}