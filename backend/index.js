

// Init Express
const express = require('express');
const app = express();


// Dependencies
const morgan = require('morgan');
const cors = require("cors");


app.use(morgan('dev'));
app.use(cors());

// Serve images, stylesheets and js without routes - pre appended
// app.use(express.static);


// Init route - keep 
const frameRoutes = require('./routes/r-tframe-pkg');

// Route mount
app.use('api/frames', frameRoutes)



app.get("/", (req, res) => {
  res.send("API is running! 🚀 WOOT!");
});

// Global error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Backend listening on port 5000");
});
