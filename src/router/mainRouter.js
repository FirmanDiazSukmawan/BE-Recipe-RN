const express = require("express");
const router = express.Router();
// const categoryRouter = require("./categoryRouter");
const userRouter = require("./userRouter");
const recipeRouter = require("./recipeRouter");
const likedRouter = require("./likedRouter");
const savedRouter = require("./savedRouter");

router.use("/users", userRouter);
// router.use("/category", categoryRouter);
router.use("/recipe", recipeRouter);
router.use("/liked", likedRouter);
router.use("/saved", savedRouter);

module.exports = router;
