const {
  findRecipesId,
  recipesQuery,
  createRecipes,
  updateRecipes,
  deleteRecipes,
  getRecipesByUsersId,
  AllRecipes,
} = require("../model/recipeModel");
const cloudinary = require("../config/cloudinaryConfig");
const recipeController = {
  getRecipesQuery: async (req, res) => {
    let { searchBy, search, sortBy, sort, limit, offset } = req.query;
    let data = {
      searchBy: searchBy || "name_recipes",
      search: search || "",
      sortBy: sortBy || "name_recipes",
      sort: sort || "ASC",
      limit: limit || 25,
      offset: offset || 0,
    };
    try {
      let results = await recipesQuery(data);
      res.status(200).json({
        message: "recipes got by query",
        data: results.rows,
      });
    } catch (err) {
      res.status(400).json({
        error: err.message,
        message: "data not found",
      });
    }
  },

  getAllRecipes: async (req, res) => {
    try {
      let result = await AllRecipes();
      res.json({
        message: "Recipe has been read successfully",
        data: result.rows,
      });
    } catch (err) {
      res.json({
        error: err.message,
        message: "error reading Recipe",
      });
    }
  },

  findById: async (req, res) => {
    const recipes_id = req.params.recipes_id;
    try {
      let result = await findRecipesId(recipes_id);
      res.status(200).json({ data: result.rows });
      // console.log(result);
    } catch (err) {
      res.status(400).json({
        error: err.message,
        message: "error finding recipes",
      });
    }
  },

  findByUsersId: async (req, res) => {
    const users_id = req.params.users_id;
    try {
      const result = await getRecipesByUsersId(users_id);
      res.status(200).json({ data: result.rows });
      // console.log(result);
    } catch (err) {
      res.status(400).json({
        error: err.message,
        message: "error finding recipes",
      });
    }
  },

  postRecipes: async (req, res) => {
    // console.log(req.files.video);
    try {
      let recipesImage;
      if (req.files.image && req.files.image[0]) {
        recipesImage = await cloudinary.uploader.upload(
          req.files.image[0].path,
          {
            folder: "recipe_image",
            resource_type: "image",
          }
        );
      } else {
        return res.status(400).json({ message: "U need upload image" });
      }

      let recipesVideo;
      if (req.files.video && req.files.video[0]) {
        recipesVideo = await cloudinary.uploader.upload(
          req.files.video[0].path,
          {
            folder: "recipe_video",
            resource_type: "video",
          }
        );
      } else {
        return res.status(400).json({ message: "U need upload video" });
      }

      let recipe = {
        name_recipes: req.body.name_recipes,
        image: recipesImage.secure_url,
        video: recipesVideo.secure_url,
        name_video: req.body.name_video,
        ingredients: req.body.ingredients,
        users_id: req.body.users_id,
      };
      if (
        !recipe.name_recipes ||
        !recipe.image ||
        !recipe.video ||
        !recipe.name_video ||
        !recipe.ingredients
      ) {
        return res.status(400).json({ message: "U need fill all fields" });
      }
      let recipeData = await createRecipes(recipe);
      // console.log(recipe);
      res.status(200).json({
        message: "create recipe succesfully",
        data: recipeData.rows,
      });
    } catch (err) {
      console.error("Error creating recipes:", err);
      res.status(400).json({
        err: err.message,
        message: "error create recipes",
      });
    }
  },

  putRecipes: async (req, res) => {
    try {
      let recipes_id = req.params.recipes_id;
      let recipesImage = await cloudinary.uploader.upload(
        req.files.image && req.files?.image?.[0].path,
        {
          folder: "recipe_image",
          resource_type: "image",
        }
      );
      let recipesVideo = await cloudinary.uploader.upload(
        req.files.video && req.files?.video?.[0].path,
        {
          resource_type: "video",
          folder: "recipe_video",
        }
      );

      if (!recipesImage || !recipesVideo) {
        return res.json({ messsage: "need upload image or video" });
      }
      let recipe = await findRecipesId(Number(recipes_id));
      let data = recipe.rows[0];
      // console.log(data);
      let recipeData = {
        name_recipes: req.body.name_recipes || data.name_recipes,
        image: recipesImage.secure_url || data.image,
        video: recipesVideo.secure_url || data.video,
        name_video: req.body.name_video || data.name_video,
        ingredients: req.body.ingredients || data.ingredients,
      };
      // console.log(recipeData);
      await updateRecipes(recipeData, Number(recipes_id));
      res.status(200).json({
        message: "recipe updated successfully",
      });
    } catch (err) {
      res.status(400).json({
        error: err.message,
        message: "error update recipe",
      });
    }
  },

  deletRecipes: async (req, res) => {
    try {
      let recipes_id = req.params.recipes_id;
      console.log(recipes_id);
      const result = await deleteRecipes(recipes_id);
      const data = await cloudinary.uploader.destroy(result);
      // console.log(data);

      res.status(200).json({
        message: "recipe deleted successfully",
        data: data,
      });
    } catch (err) {
      res.status(400).json({
        err: err.message,
        message: "error deleting",
      });
    }
  },
};

module.exports = recipeController;
