const db = require("../config/db");

const getSaved = (data) => {
  let { sortBy, sort, limit, offset } = data;
  return db.query(`SELECT 
      saved.*
      FROM saved
      ORDER BY saved.${sortBy} ${sort}
      LIMIT ${limit} OFFSET ${offset}`);
};

const getSavedId = (saved_id) => {
  return db.query(`SELECT * FROM saved WHERE saved.saved_id =${saved_id}`);
};

const getSavedUsersId = (users_id) => {
  return db.query(
    `SELECT 
    saved.*, 
    users.username AS creator,
    food_recipes.*
  FROM 
    saved
  LEFT JOIN 
    food_recipes
    ON saved.recipes_id = food_recipes.recipes_id
  LEFT JOIN
    users
    ON saved.users_id = users.users_id
  WHERE 
    saved.users_id = ${users_id};
  `
  );
};

const createSaved = (users_id, recipes_id) => {
  return db.query(
    `INSERT INTO saved (users_id,recipes_id) VALUES (${users_id},${recipes_id})`
  );
};

const deletedSaved = (saved_id) => {
  return db.query(`DELETE FROM saved WHERE saved.saved_id = ${saved_id}`);
};

module.exports = {
  getSaved,
  getSavedId,
  getSavedUsersId,
  createSaved,
  deletedSaved,
};
