const express = require("express");
const router = express.Router();
const {
  getCommentQuery,
  getCommentById,
  getCommentByUsersId,
  getCommentByRecipesId,
  postComment,
  updateComment,
  deletedCommen,
} = require("../controller/commentController");

router.get("/", getCommentQuery);
router.get("/:comment_id", getCommentById);
router.get("/users/:users_id", getCommentByUsersId);
router.get("/recipe/:recipes_id", getCommentByRecipesId);
router.post("/", postComment);
router.put("/:comment_id", updateComment);
router.delete("/:comment_id", deletedCommen);

module.exports = router;
