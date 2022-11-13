const express  = require('express');
const { addPlant, getPlants, getPlant, getRelatedPlants, getPlantsUser, addPlantFromCollection } = require('../controllers/marketplaceController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post("/addPlant", auth, addPlant);
router.post("/addPlantFromCollection", auth, addPlantFromCollection);
router.get("/getPlants", auth, getPlants);
router.get("/getPlant", auth, getPlant);
router.get("/getRelatedPlants", auth, getRelatedPlants);
router.get("/getPlantsUser", auth, getPlantsUser);

module.exports = router;