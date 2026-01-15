const express  = require('express');
const auth = require('../middlewares/auth');
const { addMapPlant, getMapPlant } = require('../controllers/mapController');

const router = express.Router();

router.get("/getPlants", auth, getMapPlant); //getting all the data of map
router.post("/addPlant", auth, addMapPlant); //adding new plant 

module.exports = router;