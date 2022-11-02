const express  = require('express');
const { addPlant, getPlants, getPlant, getRelatedPlants } = require('../controllers/marketplaceController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post("/addPlant", auth, addPlant);
router.get("/getPlants", auth, getPlants);
router.get("/getPlant", auth, getPlant);
router.get("/getRelatedPlants", auth, getRelatedPlants);

module.exports = router;