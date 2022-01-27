const express = require("express");
const winners = require("../controller/winners");


const router = express.Router();

router.post('/add', winners.addWinners);
router.get('/detail/:id', winners.details);
router.post('/all', winners.getWinners);
router.put('/update/:id', winners.updateWinners);
router.delete('/delete/:id', winners.deleteWinners);

module.exports = router;