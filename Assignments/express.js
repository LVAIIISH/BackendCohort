//BUILDING A SIMPLE CRUD API W/ EXPRESS

const express = require( 'express' );
const app = express();
const items = [];   //Simple in-memory database

// Middleware 
// asdf
// asdfsadfa


app.use(express.json());

//Create (POST)
app.post('/items', (req, res) => {
  const item = req.body;
  items.push(item);
  res.status(201).send('Item created');
});

//Read (GET)
  app.get('/items', (req, res) => {
    res.json(items);
  })