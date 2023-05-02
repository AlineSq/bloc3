package com.studi.bloc3api.Controllers;

import com.studi.bloc3api.models.Product;
import com.studi.bloc3api.models.Promotion;
import com.studi.bloc3api.repositories.PromotionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/promotions")
public class PromotionController {

    @Autowired
    private PromotionRepository promotionRepository;

    PromotionController(PromotionRepository repository) {
        this.promotionRepository = repository;
    }

    @PostMapping("")
    public Promotion createProduct(@RequestBody Promotion _promotion) {

        return promotionRepository.save(_promotion);
    }

    @GetMapping("")
    public List<Promotion> getProduct() {
        return promotionRepository.findAll();
    }

    @DeleteMapping("{id}")
    public void deletePromotion(@PathVariable Long id) {
        promotionRepository.deleteById(id.intValue());
    }
}