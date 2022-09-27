const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const messagesRoutes = require('./routes/messagesRoutes');

const PORT = process.env.PORT || 5000; //dotenv config? check...

const app = express();

app.use(cors());
app.use(express.json({limit: '30mb'}));

app.use('/api/users', userRoutes);
app.use('/api/chats', messagesRoutes);

// Function to start the server
const server = app.listen(PORT, () => {
    console.log(`The server is running at localhost ${PORT}`)
});


//socket.io logics for realtime data

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
        origin: ["http://localhost:3000"],
    },
});

// this variable stores the current online users we need to keep track the user
let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
};

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
    return userId.map((u) => {
        return users.filter((user) => user.userId === u?._id);
    })
};

//for following
const getUserFollow = (userId) => {
    return users.filter((user) => user?.userId === userId);
}

io.on("connection", (socket) => {

    console.log("User connected", socket.id);

    //take userId and socketId from user
     socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        io.emit("getUsers", users);
    });


     socket.on("sendNotifUser", (newNotif) => {
        // console.log("notif", newNotif);
//for following
        const user = getUserFollow(Number(newNotif?.userId)); // here we are getting the user that we want to notify

        // console.log(user);
        // users.forEach(currentUser => {
            // socket.to(currentUser?.socketId).emit("notifReceived", newNotif);
            console.log("fire")
            socket.to(user[0]?.socketId).emit("notifReceived", newNotif?.message); // sending the notification
        // });
    });

    //send a and receive a message 
    socket.on("sendMessage", (newMessageReceived) => {
        console.log("socketnew", newMessageReceived?.data?.msg);

        const users = getUser([{_id: newMessageReceived?.data?.sendTo}]); 
        users.forEach(user => {
            // console.log("socket:",)
            socket.to(user[0]?.socketId).emit("messageReceived", {msgContent: newMessageReceived?.data?.msg,
            chatRoomLink: newMessageReceived?.data?.chatRoomLink}); // sending the notification 
        });
    });

   
    //when disconnect
    socket.on("disconnect", () => {
        console.log("a user disconnected!");
        removeUser(socket.id);
        io.emit("getUsers", users);
    });

});