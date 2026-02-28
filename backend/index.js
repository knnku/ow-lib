require('dotenv').config();

//Init Express
const express = require("express");
const app = express();


//Dev dependencies
const morgan = require("morgan");


app.use(morgan('dev'));



app.get("/", (req, res) => {
  res.send("API is running! 🚀 WOOT!");
});

app.listen(5000, () => {
  console.log("Backend listening on port 5000");
});
