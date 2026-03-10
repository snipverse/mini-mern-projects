const TODO = require("../models/Todo");

async function getTodos(req, res){
  const tasks = await TODO.find();
  res.json(tasks);
};

async function addTodo(req, res){
  const { text, number } = req.body;

  if(!text || !number){
    return res.status(400).json({
      message : "Task require text and a random number"
    })
  };

  const newTask = await TODO.create({ text, number });
  
  res.status(201).json(newTask);
}

async function getTodoById(req, res){
  const id = req.params.id;
  
  const getTask = await TODO.findById(id);

  if(!getTask){
    return res.status(404).json({
      message: "Task not found for this id"
    })
  };

  res.json(getTask);
}

async function deleteTodoById(req, res){
  const id = req.params.id;

  const deleted = await TODO.findByIdAndDelete(id);

  if(!deleted){
    return res.status(404).json({
      message: "Task not found"
    })
  };

  res.json({
    message: "Task deleted successfully"
  })
}


module.exports = { getTodos, getTodoById, deleteTodoById, addTodo }