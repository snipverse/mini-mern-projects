const mongoose = require('mongoose');

const todoSchemaAgain = new mongoose.Schema({
  text:{
    type: String, 
    required: true
  },
  number:{
    type: Number,
    required: true
  }
})

module.exports = mongoose.model("TodoSchemaA", todoSchemaAgain);