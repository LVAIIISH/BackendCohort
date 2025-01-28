const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const Todo = require("./models/Todo");

dotenv.config();

const app = express();
//Middleware  
app.use(express.json());
app.use(cors());
//MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));
 //Routes
 app.get('/api/todos',async (req , res) => {
const todos = await Todo.find();
res.json(todos)
 });
 app.post('/api/todos', async (req, res) =>{
    const newTodo = new Todo({title: req.body.title})
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
 });

 app.delete('/api/todos/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
 
 res.json({message: 'Todo Deleted'});
});
app.put('/api/todos/:id', async (req,res) => {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id,{completed: req.body.completed },{new: true});
    res.json(updatedTodo);
});
//START SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on PORT ${PORT}'));



 