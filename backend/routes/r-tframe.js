const express = require('express');
const router = express.Router();

const { getFramePkgByEPC, getAllFrames } = require("../db/queries/tframes");


// Get all frames
router.get('/', async (req, res, next) => {
  try {
    const allFrames = await getAllFrames();
    res.json(allFrames);

  } catch (err) {
    next(err);
  }
});


// Get parts for frame
router.get('/:epc/parts', async (req, res, next) => {
  // Test
  console.log("Route request for frame!")
  console.log("Request: ", req.params);

  try {
    const frameData = await getFramePkgByEPC(req.params.epc);
    if (!frameData) {
      return res.status(404).json({error: "Frame ID not found!"})
    }
    res.json(frameData);
  } catch (err) {
    next(err);
  }
});



module.exports = router;
