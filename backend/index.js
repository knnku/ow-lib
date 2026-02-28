

//Init Express
const express = require('express');
const app = express();


//dependencies
const morgan = require('morgan');
const cors = require("cors");


app.use(morgan('dev'));
app.use(cors());



app.get("/", (req, res) => {
  res.send("API is running! 🚀 WOOT!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Backend listening on port 5000");
});
