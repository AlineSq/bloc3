package com.studi.bloc3api.models;

import java.util.Date;
import java.util.UUID;

/**
 * Classe décrivant le token
 */
public class Token {

    /**
     * Login du token
     */
    public String login;

    /**
     * Date de validité du token
     */
    public Date dateCreation;

    /**
     * Valeur du token
     */
    public String value;

    public Token(String _login) {
        this.login = _login;
        this.dateCreation = new Date();
        this.value = UUID.randomUUID().toString();
    }
}