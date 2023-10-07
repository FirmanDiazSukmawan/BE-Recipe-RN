const db = require("../config/db");

const getLiked = (data) => {
  let { sortBy, sort, limit, offset } = data;
  return db.query(`SELECT 
      liked.*
      FROM liked
      ORDER BY liked.${sortBy} ${sort}
      LIMIT ${limit} OFFSET ${offset}`);
};

const getLikedId = (liked_id) => {
  return db.query(`SELECT * FROM liked WHERE liked.liked_id =${liked_id}`);
};

const getLikedUsersId = (users_id) => {
  return db.query(
    `SELECT 
    liked.*, 
    users.username AS creator,
    food_recipes.*
  FROM 
    liked
  LEFT JOIN 
    food_recipes
    ON liked.recipes_id = food_recipes.recipes_id
  LEFT JOIN
    users
    ON liked.users_id = users.users_id
  WHERE 
    liked.users_id = ${users_id};
  `
  );
};

const createLiked = (users_id, recipes_id) => {
  return db.query(
    `INSERT INTO liked (users_id,recipes_id) VALUES (${users_id},${recipes_id})`
  );
};

const deleteLiked = (liked_id) => {
  return db.query(`DELETE FROM liked WHERE liked.liked_id = ${liked_id}`);
};

module.exports = {
  getLiked,
  getLikedId,
  getLikedUsersId,
  createLiked,
  deleteLiked,
};
