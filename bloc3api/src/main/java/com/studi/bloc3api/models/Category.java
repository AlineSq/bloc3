package com.studi.bloc3api.models;

import jakarta.persistence.*;

@Entity
@Table(name = "bloc3_category")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private Integer id;

    @Column(nullable = false, name = "category_name")
    public String name;
}