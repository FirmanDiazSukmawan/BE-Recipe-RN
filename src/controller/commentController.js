const {
  getComment,
  getCommentId,
  getCommentUsersId,
  getCommentRecipesId,
  createComment,
  updateComment,
  deleteComment,
} = require("../model/commentModel");
const commentController = {
  getCommentQuery: async (req, res) => {
    let { sortBy, sort, limit, offset } = req.query;
    let data = {
      sortBy: sortBy || "comment_id",
      sort: sort || "ASC",
      limit: limit || 10,
      offset: offset || 0,
    };
    try {
      let results = await getComment(data);
      res.status(200).json({
        message: "comment got by query",
        data: results.rows,
      });
    } catch (err) {
      res.status(400).json({
        error: err.message,
        message: "data not found",
      });
    }
  },

  getCommentById: async (req, res) => {
    const comment_id = req.params.comment_id;
    try {
      let result = await getCommentId(comment_id);
      res.status(200).json({ data: result.rows });
      // console.log(result);
    } catch (err) {
      res.status(400).json({
        error: err.message,
        message: "error get comment",
      });
    }
  },

  getCommentByUsersId: async (req, res) => {
    const users_id = req.params.users_id;
    try {
      const result = await getCommentUsersId(users_id);
      res.status(200).json({ data: result.rows });
      // console.log(result);
    } catch (err) {
      res.status(400).json({
        error: err.message,
        message: "error get comment",
      });
    }
  },

  getCommentByRecipesId: async (req, res) => {
    const recipes_id = req.params.recipes_id;
    try {
      const result = await getCommentRecipesId(recipes_id);
      res.status(200).json({ data: result.rows });
      // console.log(result);
    } catch (err) {
      res.status(400).json({
        error: err.message,
        message: "error get comment",
      });
    }
  },

  postComment: async (req, res) => {
    try {
      let { commen, users_id, recipes_id } = req.body;
      //   console.log(comment);
      let commentData = await createComment(commen, users_id, recipes_id);
      // console.log(commentData);
      res.status(200).json(commentData);
    } catch (err) {
      res.status(400).json({
        err: err.message,
        message: "error create comment",
      });
    }
  },

  updateComment: async (req, res) => {
    try {
      let comment_id = req.params.comment_id;
      const { commen } = req.body;

      const result = await updateComment(comment_id, commen);

      res.status(200).json({
        message: "comment updated successfully",
        data: result,
      });
    } catch (err) {
      res.status(400).json({
        err: err.message,
        message: "error updating comment",
      });
    }
  },

  deletedCommen: async (req, res) => {
    try {
      let comment_id = req.params.comment_id;
      const result = await deleteComment(comment_id);

      res.status(200).json({
        message: "comment deleted successfully",
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

module.exports = commentController;
