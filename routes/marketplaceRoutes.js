const express  = require('express');
const { addPlant, getPlants, getPlant } = require('../controllers/marketplaceController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post("/addPlant", auth, addPlant);
router.get("/getPlants", auth, getPlants);
router.get("/getPlant", auth, getPlant);

module.exports = router;