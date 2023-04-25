package com.studi.bloc3api.dao.products;

import java.sql.*;

public class ProductDao {


    public String go() {
        try {
            // Créer une connexion à la base de données
            String url = "jdbc:postgresql://localhost:5432/bdd_bloc3";
            // Login et mot de passe de test, les données seront en dehors du dépôt pour la production
            String username = "Aline";
            String password = "aline";
            Connection conn = DriverManager.getConnection(url, username, password);

            // Exécuter une requête SELECT
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM mytable");

            // Parcourir les résultats de la requête
            while (rs.next()) {
                int id = rs.getInt("id");
                String name = rs.getString("name");
                int age = rs.getInt("age");
                System.out.println(id + " " + name + " " + age);
            }

            // Fermer la connexion à la base de données
            rs.close();
            stmt.close();
            conn.close();
        } catch (SQLException ex) {
            // Gérer les erreurs
            System.out.println("Erreur SQL : " + ex.getMessage());
        }
        return "";
    }
}
