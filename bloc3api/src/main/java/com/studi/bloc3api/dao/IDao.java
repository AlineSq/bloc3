package com.studi.bloc3api.dao;

import com.studi.bloc3api.models.Product;

import java.sql.Blob;
import java.util.ArrayList;

public interface IDao<T> {

    /**
     * Fonction permettant de récupérer la liste des données
     * @return
     */
    ArrayList<T> getDatas();


    /**
     * Fonction permettant de créer un objet
     * @param _data
     * @return
     */
    T create(T _data);
}
