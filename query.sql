-- Active: 1696510194872@@localhost@5432@recipe_rn

CREATE TABLE users (
  users_id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20),
  password VARCHAR(255) NOT NULL,
  image VARCHAR(255) NULL,
  role INT
);


CREATE TABLE food_recipes (
  recipes_id SERIAL PRIMARY KEY,
  name_recipes VARCHAR(255) NOT NULL,
  image VARCHAR (255),
  ingredients TEXT NOT NULL,
  video VARCHAR NULL,
  name_video VARCHAR(255),
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE liked (
  liked_id SERIAL PRIMARY KEY,
  users_id SERIAL,
  recipes_id SERIAL
);

CREATE TABLE saved (
  saved_id SERIAL PRIMARY KEY,
  users_id SERIAL,
  recipes_id SERIAL
);


DROP TABLE food_recipes;

DROP TABLE users;
DROP TABLE category