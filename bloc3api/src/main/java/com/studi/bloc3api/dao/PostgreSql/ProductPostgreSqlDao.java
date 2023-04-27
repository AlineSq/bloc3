package com.studi.bloc3api.dao.PostgreSql;

import com.studi.bloc3api.models.Product;

import java.sql.*;
import java.util.ArrayList;

public class ProductPostgreSqlDao {


    /**
     * Fonction permettant de donner la liste des produits
     * @return
     */
    public ArrayList<Product> getProducts() {

        try {
            ArrayList<Product> products = new ArrayList<>();

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
                Product p = new Product();
                p.id = rs.getRowId("product_id");
                p.categoryId = rs.getRowId("category_id");
                p.name = rs.getString("product_name");
                p.description = rs.getString("product_description");
                p.price = rs.getInt("product_price");
                p.picture = rs.getBlob("product_picture");

                products.add(p);
            }

            // Fermer la connexion à la base de données
            rs.close();
            stmt.close();
            conn.close();

            return products;

        } catch (SQLException ex) {
            // Gérer les erreurs
            System.out.println("Erreur SQL : " + ex.getMessage());
            return null;
        }
    }

    /**
     * Fonction permettant de créer un produit
     * @param _name
     * @param _price
     * @param _description
     * @param _picture
     * @return
     */
    public Product create(String _name, Integer _price, String _description, Blob _picture) {
        return null;
    }
}
