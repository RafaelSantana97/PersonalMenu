CREATE DATABASE dbMenu;

USE dbMenu;

CREATE TABLE ingredient_tags (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) UNIQUE
);

CREATE TABLE recipes (
    id INT PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(255),
	link VARCHAR(255)
);

CREATE TABLE recipe_ingredient_tags (
    recipe_id INT,
    ingredient_tag_id INT,
    FOREIGN KEY (recipe_id) REFERENCES recipes(id),
    FOREIGN KEY (ingredient_tag_id) REFERENCES ingredient_tags(id)
);

CREATE TABLE recipe_ingredients (
	id INT PRIMARY KEY AUTO_INCREMENT,
	recipe_id INT,
    ingredient_description VARCHAR(255),
    FOREIGN KEY (recipe_id) REFERENCES recipes(id)
);

CREATE TABLE recipe_directions (
	id INT PRIMARY KEY AUTO_INCREMENT,
	recipe_id INT,
    direction TEXT,
    FOREIGN KEY (recipe_id) REFERENCES recipes(id)
);

CREATE TABLE users (
	id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255),
    name VARCHAR(255)
);

CREATE TABLE user_ingredient_tags (
    user_id INT,
    ingredient_tag_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (ingredient_tag_id) REFERENCES ingredient_tags(id)
);
