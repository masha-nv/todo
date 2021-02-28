const db = require("../models");

exports.getTodos = (req, res) => {
  db.Todo.find()
    .then((todos) => res.json(todos))
    .catch((e) => res.send(e));
};

exports.createTodo = (req, res) => {
  db.Todo.create(req.body)
    .then((newTodo) => res.status(201).json(newTodo))
    .catch((e) => res.send(e));
};

exports.findTodo = (req, res) => {
  db.Todo.findById(req.params.id)
    .then((todo) => res.json(todo))
    .catch((e) => res.send(e));
};

exports.updateTodo = (req, res) => {
  db.Todo.findByIdAndUpdate(
    req.params.id,
    { completed: req.body.completed },
    { new: true }
  )
    .then((updatedTodo) => res.json(updatedTodo))
    .catch((e) => res.send(e));
};

exports.deleteTodo = (req, res) => {
  db.Todo.findByIdAndDelete(req.params.id)
    .then((deletedTodo) => res.json(deletedTodo))
    .catch((e) => console.log(e));
};

module.exports = exports;
