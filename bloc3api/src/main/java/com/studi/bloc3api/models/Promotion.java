package com.studi.bloc3api.models;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "bloc3_promo")
public class Promotion {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name="promotion_id")
  private Integer id;

  @Column(name="promotion_start_date")
  public Date promoStart ;

  @Column(name="promotion_end_date")
  public Date promoEnd ;

  @Column(name="promotion_percent")
  public Integer promoPercent ;
}
