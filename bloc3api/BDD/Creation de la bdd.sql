--- Création de la base de données

CREATE TABLE bloc3_category (category_id SERIAL PRIMARY KEY, category_name varchar(100));
CREATE TABLE bloc3_product (product_id SERIAL PRIMARY KEY, category_id INTEGER REFERENCES bloc3_category (category_id), product_name varchar(100), product_description varchar(500), product_price float, product_picture BYTEA);
CREATE TABLE bloc_user (user_id SERIAL PRIMARY KEY, user_login varchar (100), user_password varchar (100), user_is_admin bool);