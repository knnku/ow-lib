const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("API is running! 🚀");
});

app.listen(3000, () => {
  console.log("Backend listening on port 3000");
});
