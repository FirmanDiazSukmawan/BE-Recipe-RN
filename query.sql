
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
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);


DROP TABLE food_recipes;

DROP TABLE users;
DROP TABLE category