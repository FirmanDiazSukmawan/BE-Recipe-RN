const express = require("express");
const router = express.Router();
const {
  getLikedQuery,
  getLikedById,
  getLikedByUsersId,
  postLiked,
  deletLiked,
} = require("../controller/likedController");

router.get("/", getLikedQuery);
router.get("/:liked_id", getLikedById);
router.get("/users/:users_id", getLikedByUsersId);
router.post("/", postLiked);
router.delete("/:liked_id", deletLiked);

module.exports = router;
