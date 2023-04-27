package com.studi.bloc3api.models;

import java.sql.Blob;
import java.sql.RowId;

public class Product {
  public RowId id;
  public RowId categoryId ;
  public String name;
  public String description;
  public Integer  price;
  public Blob picture;
}
