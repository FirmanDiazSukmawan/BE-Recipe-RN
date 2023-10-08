const {
  getSaved,
  getSavedId,
  getSavedUsersId,
  createSaved,
  deletedSaved,
} = require("../model/savedModel");
const savedController = {
  getSavedQuery: async (req, res) => {
    let { sortBy, sort, limit, offset } = req.query;
    let data = {
      sortBy: sortBy || "saved_id",
      sort: sort || "ASC",
      limit: limit || 10,
      offset: offset || 0,
    };
    try {
      let results = await getSaved(data);
      res.status(200).json({
        message: "saved got by query",
        data: results.rows,
      });
    } catch (err) {
      res.status(400).json({
        error: err.message,
        message: "data not found",
      });
    }
  },

  getSavedById: async (req, res) => {
    const saved_id = req.params.saved_id;
    // console.log(saved_id);
    try {
      let result = await getSavedId(saved_id);
      res.status(200).json({ data: result.rows });
      // console.log(result);
    } catch (err) {
      res.status(400).json({
        error: err.message,
        message: "error get Saved",
      });
    }
  },

  getSavedByUsersId: async (req, res) => {
    const users_id = req.params.users_id;
    try {
      const result = await getSavedUsersId(users_id);
      res.status(200).json({ data: result.rows });
      // console.log(result);
    } catch (err) {
      res.status(400).json({
        error: err.message,
        message: "error get Saved",
      });
    }
  },

  postSaved: async (req, res) => {
    try {
      let { users_id, recipes_id } = req.body;
      //   console.log(liked);
      let savedData = await createSaved(users_id, recipes_id);
      console.log(savedData);
      res.status(200).json(savedData);
    } catch (err) {
      res.status(400).json({
        err: err.message,
        message: "error create Saved",
      });
    }
  },

  deleteSaved: async (req, res) => {
    try {
      let saved_id = req.params.saved_id;
      const result = await deletedSaved(saved_id);

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

module.exports = savedController;
