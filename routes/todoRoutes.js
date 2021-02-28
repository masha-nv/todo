const express = require("express");
const router = express.Router();
const helpers = require("../helpers/todoHelperRoutes");

router.route("/").get(helpers.getTodos).post(helpers.createTodo);

router
  .route("/:id")
  .get(helpers.findTodo)
  .put(helpers.updateTodo)
  .delete(helpers.deleteTodo);

module.exports = router;
