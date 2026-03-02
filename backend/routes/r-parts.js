const express = require('express');
const router = express.Router();
const { partsScan } = require('../routes/r-parts');


router.put('scan/:id', async (req, res) => {
  const { partData } = req.params.id;
  
  try {
    const updatedRows = await partsScan(partData)

    if (updatedRows === 0) {
      return req.status(400).json({
        success: false,
        message: "Part ID not found in Database"
      });
    }
  }

  res.json({
    success: true,
    part: updatedRows[0]
  });

  catch (err) {
    console.error("Route error: ", err);
    res.status(500).json({
      success: false,
      message: "Server error during scan."
    });
  }
});