

const express = require('express');// brings in this specific library.. frnt end= import bck end = require
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;
const FILE_PATH = path.join(__dirname, 'todos.json');

app.use(express.json());

app.get("myServer", (req, res) => {
    console.log("/ myServer  hit")
    res.json({msg: "myServer Hit"})
});
app.get("/", (req,res) => {
    console.log("/endpoint hit")
})
app.listen(PORT, () => {
    console.log('Server is running on http://localhost:${PORT}');
});

