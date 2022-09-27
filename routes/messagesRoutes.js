const express  = require('express');
const { createRoom, getAllChats, getAllMessages, getSelectedRoom, sendMessage } = require('../controllers/messagesController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post("/create-room", auth, createRoom);
router.get("/all-chats", auth, getAllChats);

router.get("/getchatroom", auth, getSelectedRoom); //getting selectedroom of chatroom
router.get("/all-messages", auth, getAllMessages); //getting all messages of specific chatroom
router.post("/send-message", auth, sendMessage); //send a message


module.exports = router;