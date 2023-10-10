const db = require("../config/db");

const getComment = (data) => {
  let { sortBy, sort, limit, offset } = data;
  return db.query(`SELECT 
      comment.*,
      TO_CHAR(comment.created_at, 'DD-MM-YYYY HH24:MI:SS') AS created_at
      FROM comment
      ORDER BY comment.${sortBy} ${sort}
      LIMIT ${limit} OFFSET ${offset}`);
};

const getCommentId = (comment_id) => {
  return db.query(
    `SELECT * FROM comment WHERE comment.comment_id =${comment_id}`
  );
};

const getCommentUsersId = (users_id) => {
  return db.query(
    `SELECT 
    comment.*, 
    users.username AS creator,users.image AS imageProfile,
    TO_CHAR(comment.created_at, 'DD-MM-YYYY HH24:MI:SS') AS created_at
  FROM
    comment
  LEFT JOIN 
    food_recipes
    ON comment.recipes_id = food_recipes.recipes_id
  LEFT JOIN
    users
    ON comment.users_id = users.users_id
  WHERE 
    comment.users_id = ${users_id};
  `
  );
};

const getCommentRecipesId = (recipes_id) => {
  return db.query(
    `SELECT 
      comment.*, 
      users.username AS creator,users.image AS imageProfile,
      TO_CHAR(comment.created_at, 'DD-MM-YYYY HH24:MI:SS') AS created_at
    FROM
      comment
    LEFT JOIN 
      food_recipes
      ON comment.recipes_id = food_recipes.recipes_id
    LEFT JOIN
      users
      ON comment.users_id = users.users_id
    WHERE 
      comment.recipes_id = ${recipes_id};
    `
  );
};

const createComment = (commen, users_id, recipes_id) => {
  return db.query(
    `INSERT INTO comment (commen, users_id, recipes_id) VALUES ('${commen}', ${users_id}, ${recipes_id})`
  );
};

const updateComment = (comment_id, commen) => {
  return db.query(
    `UPDATE comment SET commen = '${commen}' WHERE comment_id = ${comment_id}`
  );
};

const deleteComment = (comment_id) => {
  return db.query(
    `DELETE FROM comment WHERE comment.comment_id = ${comment_id}`
  );
};

module.exports = {
  getComment,
  getCommentId,
  getCommentUsersId,
  getCommentRecipesId,
  createComment,
  updateComment,
  deleteComment,
};
