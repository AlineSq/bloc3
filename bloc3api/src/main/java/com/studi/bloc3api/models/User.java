package com.studi.bloc3api.models;

import jakarta.persistence.*;

@Entity
@Table(name = "bloc3_user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Integer id;

    @Column(nullable = false, name = "user_login")
    public String login;

    @Column(nullable = false, name = "user_password")
    public String password;

    @Column(nullable = false, name = "user_is_admin")
    public Boolean isAdmin;
}