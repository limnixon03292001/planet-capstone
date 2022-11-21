const express  = require('express');
const { addPlant, getPlants, getPlant, getRelatedPlants, getPlantsUser, 
        addPlantFromCollection, requestTrade, userRequests, tradeRequest, getTradeDetails, rejectTrade, approveTrade 
} = require('../controllers/marketplaceController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post("/addPlant", auth, addPlant);
router.post("/addPlantFromCollection", auth, addPlantFromCollection);
router.get("/getPlants", auth, getPlants);
router.get("/getPlant", auth, getPlant);
router.get("/getRelatedPlants", auth, getRelatedPlants);
router.get("/getPlantsUser", auth, getPlantsUser);

//trade
router.post("/requestTrade", auth, requestTrade);
router.get("/getuserRequestTrade", auth, userRequests);//users request
router.get("/getIncomingRequests", auth, tradeRequest);//list of requests
router.get("/getTradeDetails", auth, getTradeDetails); // get trade details
router.post("/approveTrade", auth, approveTrade);
router.post("/rejectTrade", auth, rejectTrade);

module.exports = router;