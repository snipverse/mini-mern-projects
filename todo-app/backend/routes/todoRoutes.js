const express = require("express");

const { addTodo, getTodos, getTodoById, deleteTodoById} = require("../controllers/todoController")
const Router = express.Router();

Router.get("/", getTodos);

Router.post("/", addTodo);

Router.get("/:id", getTodoById);

Router.delete("/:id", deleteTodoById);

module.exports = Router;