const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

app.use(express.json()); // gives req.body

const PORT = 3000;

const Schema = mongoose.Schema;

const ToDoSchema = new Schema({
  todo: {
    type: String,
    //required: true
  },
  created: Number,
});

app.use(cors());

const Todo = mongoose.model("Todo", ToDoSchema);

app.get("/test", (req, res) => {
  console.log("Test HIT");
  res.json({ msg: "SUCCESS" });
});

app.get("/getTodos", (req, res) => {
  console.log("getTodos HIT");
  Todo.find().then((found) => {
    console.log("found", found);
    res.json(found);
  });
});

app.post("/create", (req, res) => {
  console.log("Create HIT", req.body);
  Todo.create(req.body).then((created) => {
    console.log("created", created);
    res.json(created);
  });
});

app.put("/edit/:id", (req, res) => {
  console.log("edit HIT", req.params, req.body);

  Todo.findById(req.params.id)
  .then((found) => {
    console.log("edit", found);
    found.todo = req.body.todo;
    found.save()
    .then(saved=>{
        console.log(saved)
        res.json(saved)
    })
  });
});

app.delete("/delete/:id", (req, res) => {
  console.log("Delete HIT", req.params.id);
  Todo.findByIdAndDelete(req.params.id)
    .then((deleted) => {
      console.log("deleted", deleted);
      res.json(deleted);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err.message,
      });
    });
});

app.listen(PORT, () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to Database");
    })
    .catch((err) => console.log(err));
  console.log(`Server is running on port ${PORT}`);
});

// app.get("/gettodos", (req, res) => {
//     console.log("GetTodos  HIT")

// })
