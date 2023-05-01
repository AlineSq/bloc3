package com.studi.bloc3api.models;

import jakarta.persistence.*;

import java.sql.Blob;

@Entity
@Table(name = "bloc3_product")
public class Product {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name="product_id")
  private Integer id;

  @Column(name="category_id")
  public Integer categoryId ;

  @Column(nullable = false, name = "product_name")
  public String name;

  @Column(nullable = false, name = "product_description")
  public String description;

  @Column(nullable = false, name = "product_price")
  public Integer price;

  @Column(nullable = true, name = "product_picture")
  public byte[] picture;
}
