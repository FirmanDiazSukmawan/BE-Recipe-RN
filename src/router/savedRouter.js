const express = require("express");
const router = express.Router();
const {
  getSavedQuery,
  getSavedById,
  getSavedByUsersId,
  postSaved,
  deleteSaved,
} = require("../controller/savedController");

router.get("/", getSavedQuery);
router.get("/:saved_id", getSavedById);
router.get("/users/:users_id", getSavedByUsersId);
router.post("/", postSaved);
router.delete("/:saved_id", deleteSaved);

module.exports = router;
