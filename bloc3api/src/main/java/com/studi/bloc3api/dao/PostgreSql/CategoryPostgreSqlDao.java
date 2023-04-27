package com.studi.bloc3api.dao.PostgreSql;

import com.studi.bloc3api.models.Category;
import com.studi.bloc3api.models.Product;

import java.sql.*;
import java.util.ArrayList;

public class CategoryPostgreSqlDao {

    /**
     * Fonction permettant de récupérer la liste des catégories
     * @return
     */
    public ArrayList<Category> getCategories() {

        try {
            ArrayList<Category> categories = new ArrayList<>();

            // Créer une connexion à la base de données
            String url = "jdbc:postgresql://localhost:5432/bdd_bloc3";
            // Login et mot de passe de test, les données seront en dehors du dépôt pour la production
            String username = "Aline";
            String password = "aline";
            Connection conn = DriverManager.getConnection(url, username, password);

            // Exécuter une requête SELECT
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM bloc3_product");


            // Parcourir les résultats de la requête
            while (rs.next()) {
                Category c = new Category();
                c.id = rs.getRowId("category_id");
                c.label = rs.getString("name");

                categories.add(c);
            }

            // Fermer la connexion à la base de données
            rs.close();
            stmt.close();
            conn.close();

            return categories;

        } catch (SQLException ex) {
            // Gérer les erreurs
            System.out.println("Erreur SQL : " + ex.getMessage());
            return null;
        }

    }

    /**
     * Fonction permettant de créer une catégorie
     * @param _label
     * @return
     */
    public Category create(String _label) {
        return null;
    }

}