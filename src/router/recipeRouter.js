const express = require("express");
const router = express.Router();
const {
  findById,
  getRecipesQuery,
  postRecipes,
  putRecipes,
  deletRecipes,
  findByUsersId,
  getAllRecipes,
} = require("../controller/recipeController");
// const upload = require("../middleware/multer");
const uploadImageAndVideo = require("../middleware/uploadVideo");

router.get("/", getRecipesQuery);
router.get("/all", getAllRecipes);
router.get("/:recipes_id", findById);
router.get("/user/:users_id", findByUsersId);
router.post("/", uploadImageAndVideo, postRecipes);
router.put("/:recipes_id", uploadImageAndVideo, putRecipes);
router.delete("/:recipes_id", deletRecipes);

module.exports = router;
