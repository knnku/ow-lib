const express = require('express');
const router = express.Router();

const { getTframePkgbyID, getAllFrames } = require("../db/queries/tframes");


// Main landing for now - get all framst and show as list in page
router.get('/', async (req, res, next) => {
  try {
    const getAll = await getAllFrames();
    res.json(packages);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const frameData = await getTframePkgbyID(req.params.id);
    if (!frameData) {
      return res.status(404).json({error: "Tension Frame ID not found!"})
    }
    res.json(frameData);
  } catch (err) {
    next(err);
  }
})





module.exports = router;
