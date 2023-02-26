const express  = require('express');
const auth = require('../middlewares/auth');
const { getUserAccountList, getAdminAccountList, getCounts, blockAccount, unblockAccount } = require('../controllers/adminController');

const router = express.Router();

router.get("/getUserAccountList", auth, getUserAccountList); 
router.get("/getAdminAccountList", auth, getAdminAccountList); 
router.get("/getCounts", auth, getCounts);
router.post("/blockAccount", auth, blockAccount);
router.post("/unblockAccount", auth, unblockAccount);

module.exports = router;