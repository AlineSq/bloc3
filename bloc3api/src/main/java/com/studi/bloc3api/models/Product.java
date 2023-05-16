package com.studi.bloc3api.models;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "bloc3_product")
public class Product {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "product_id")
  public Integer id;

  @Column(name = "category_id")
  public Integer categoryId;

  @Column(nullable = false, name = "product_name")
  public String name;

  @Column(nullable = false, name = "product_description")
  public String description;

  @Column(nullable = false, name = "product_price")
  public Integer price;

  @Column(nullable = true, name = "product_picture")
  public String picture;

  @Column(nullable = true, name = "promotion_start_date")
  public Date promoStart;

  @Column(nullable = true, name = "promotion_end_date")
  public Date promoEnd;

  @Column(nullable = true, name = "promotion_percent")
  public Integer promoPercent;
}
