const fs = require('fs');
const path = require('path');

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
const frameRoutes = require('./routes/r-tframe');

// Route mount
app.use('/api/frames', frameRoutes)


// DB access
const db = require('./db/connection')
const createDb = fs.readFileSync(path.resolve(__dirname, "./db/schema/create.sql"), "utf8");
const seedDb = fs.readFileSync(path.resolve(__dirname, "./db/schema/seed.sql"), "utf8");


// Reset DB
app.get('/api/reset', async (req, res) => {
  try {
    console.log('Dropping and recreating tables...');
    await db.query(createDb);

    console.log('Seeding dummy data ...');
    await db.query(seedDb);

    console.log('DB reset success!');
    res.status(200).send('Success! Database Reset.');
  } catch (error) {
    console.error(`Error with seeding and creating the db: \n${error}`);
    res.status(500).send("Failed to reset database.");
  }
  
})


app.get("/", (req, res) => {
  res.send("API is running! 🚀 WOOT!");
});

// Global error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend listening on port ${PORT}`);
});
