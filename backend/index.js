const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("API is running! 🚀 WOOT!");
});

app.listen(5000, () => {
  console.log("Backend listening on port 5000");
});
