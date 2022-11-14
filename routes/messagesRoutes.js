const express  = require('express');
const { createRoom, getAllChats, getAllMessages, getSelectedRoom, sendMessage, deleteConversation } = require('../controllers/messagesController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post("/create-room", auth, createRoom);
router.get("/all-chats", auth, getAllChats);

router.get("/getchatroom", auth, getSelectedRoom); //getting selectedroom of chatroom
router.get("/all-messages", auth, getAllMessages); //getting all messages of specific chatroom
router.post("/send-message", auth, sendMessage); //send a message
router.delete("/delete-convo", auth, deleteConversation); //deleteConversation

module.exports = router;