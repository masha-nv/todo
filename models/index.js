const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/todo-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.set("debug", true);
mongoose.Promise = Promise;

module.exports.Todo = require("./todoModel");
