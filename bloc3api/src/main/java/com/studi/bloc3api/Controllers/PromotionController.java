package com.studi.bloc3api.Controllers;

import com.studi.bloc3api.repositories.PromotionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class PromotionController {

    @Autowired
    private PromotionRepository promoRepository;

    PromotionController(PromotionRepository repository) {
        this.promoRepository = repository;
    }
}