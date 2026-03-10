const express = require('express');

require("dotenv").config();

const cors = require('cors');

const connectDB = require("./config/db");

const todoRoutes = require("./routes/todoRoutes");

const app = express();

const PORT = process.env.PORT;

app.use(cors());

app.use(express.json());// middleware converts json -> js object

app.use("/todos", todoRoutes);

app.get("/", (req, res) =>{
  res.send("Server is running");
})

connectDB();

app.listen(PORT, ()=>{
  console.log(`Server is running on http://localhost:${PORT}`)
})