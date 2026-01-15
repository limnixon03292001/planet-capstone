const express  = require('express');
const auth = require('../middlewares/auth');
const { getUserAccountList, getAdminAccountList, getCounts, blockAccount, unblockAccount, 
    updateAccount, getMarketplaceData, removeItemMp, updateItemMp } = require('../controllers/adminController');

const router = express.Router();

router.get("/getUserAccountList", auth, getUserAccountList); 
router.get("/getAdminAccountList", auth, getAdminAccountList); 
router.get("/getCounts", auth, getCounts);
router.post("/blockAccount", auth, blockAccount);
router.post("/unblockAccount", auth, unblockAccount);
router.post("/updateAccount", auth, updateAccount);
router.post("/updateItemMp", auth, updateItemMp);
router.get("/getMarketplaceData", auth, getMarketplaceData);
router.delete("/removeItemMp", auth, removeItemMp)

module.exports = router;