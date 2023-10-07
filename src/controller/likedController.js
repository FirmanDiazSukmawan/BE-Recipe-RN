const {
  getLiked,
  getLikedId,
  getLikedUsersId,
  createLiked,
  deleteLiked,
} = require("../model/likedModel");
const likedController = {
  getLikedQuery: async (req, res) => {
    let { sortBy, sort, limit, offset } = req.query;
    let data = {
      sortBy: sortBy || "liked_id",
      sort: sort || "ASC",
      limit: limit || 10,
      offset: offset || 0,
    };
    try {
      let results = await getLiked(data);
      res.status(200).json({
        message: "liked got by query",
        data: results.rows,
      });
    } catch (err) {
      res.status(400).json({
        error: err.message,
        message: "data not found",
      });
    }
  },

  getLikedById: async (req, res) => {
    const liked_id = req.params.liked_id;
    try {
      let result = await getLikedId(liked_id);
      res.status(200).json({ data: result.rows });
      // console.log(result);
    } catch (err) {
      res.status(400).json({
        error: err.message,
        message: "error get Liked",
      });
    }
  },

  getLikedByUsersId: async (req, res) => {
    const users_id = req.params.users_id;
    try {
      const result = await getLikedUsersId(users_id);
      res.status(200).json({ data: result.rows });
      // console.log(result);
    } catch (err) {
      res.status(400).json({
        error: err.message,
        message: "error get Liked",
      });
    }
  },

  postLiked: async (req, res) => {
    try {
      let { users_id, recipes_id } = req.body;
      //   console.log(liked);
      let likedData = await createLiked(users_id, recipes_id);
      console.log(likedData);
      res.status(200).json(likedData);
    } catch (err) {
      res.status(400).json({
        err: err.message,
        message: "error create Liked",
      });
    }
  },

  deletLiked: async (req, res) => {
    try {
      let liked_id = req.params.liked_id;
      const result = await deleteLiked(liked_id);

      res.status(200).json({
        message: "liked deleted successfully",
        data: result,
      });
    } catch (err) {
      res.status(400).json({
        err: err.message,
        message: "error deleting",
      });
    }
  },
};

module.exports = likedController;
