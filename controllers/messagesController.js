const pool  = require('../utils/dbConnection');
const cloudinary = require("../utils/cloudinary");

exports.createRoom = async (req, res) => {
    const { userId } = req.body; //another userId
    const authUserId = req.user.id; //authenticated user who initiate the creation of room

    try {
        
        //first before creating a room, we need to check first if there is already existing room for these two users
        const existRoom = await pool.query(`
            SELECT * FROM user_chatroom 
            WHERE user_id = $1 AND friend_id = $2 OR user_id = $2 AND friend_id = $1
        `, [authUserId, userId]);

        console.log(existRoom?.rows[0]);
        //if there's already existing room from the two user return that chatroom

        if(existRoom.rows.length !== 0){
            await pool.query(`
            UPDATE user_chatroom 
            SET visible_to = NULL 
            WHERE chatroom_id = $1`, [existRoom?.rows[0]?.chatroom_id]);

            return res.status(200).json({chatroom: existRoom?.rows[0]});
        }
        
        //if there's no existing chatroom then create new room
        const newRoom = await pool.query(`
        WITH new_chatroom as (
            INSERT INTO user_chatroom (user_id, friend_id) VALUES ($1, $2) RETURNING *
        ) SELECT DISTINCT ON (new_chatroom.chatroom_id) new_chatroom.chatroom_id, new_chatroom.user_id, new_chatroom.friend_id, ua.firstname, ua.lastname,
        ua.profile, ua.email, ua.phonenumber, messages.msg_id, messages.msg_content, messages.created_at
        FROM new_chatroom
        
        LEFT JOIN messages ON new_chatroom.chatroom_id = messages.chatroom_id
        INNER JOIN user_acc ua ON new_chatroom.friend_id = ua.user_id

        `, [authUserId, userId]);

        console.log("newRoom", newRoom?.rows[0]);

       return res.status(201).json({newRoom: newRoom?.rows[0]})


    } catch (error) {
        console.log(error?.message);
        return res.status(500).json({
            error: error?.message
        })
    }
}

// exports.getAllChats = async (req, res) => {
//     const authUserId = req.user.id;
//     // console.log("all chats", authUserId);
//     try {
//         const chats = await pool.query(`
//             SELECT DISTINCT ON (user_chatroom.chatroom_id) user_chatroom.chatroom_id, 
//             user_chatroom.user_id, user_chatroom.friend_id, 
//             ua.firstname userFN, ua.lastname userLN,
//             ua.profile userP, ua.email userE, ua.phonenumber userPN, 
            
//             ub.firstname fFN, ub.lastname fLN,
//             ub.profile fP, ub.email fE,  ub.phonenumber fPN,
            
//             messages.msg_id, messages.msg_content, messages.created_at,
//             sentBy.firstname sentByFn, sentBy.lastname sentByLn

//             FROM user_chatroom
            
//             LEFT JOIN messages ON user_chatroom.chatroom_id = messages.chatroom_id
//             LEFT JOIN user_acc sentBy ON messages.sent_by = sentBy.user_id

//             INNER JOIN user_acc ua ON user_chatroom.user_id = ua.user_id
//             INNER JOIN user_acc ub ON user_chatroom.friend_id = ub.user_id
            

//             WHERE user_chatroom.user_id = $1 OR user_chatroom.friend_id = $1

//             ORDER BY user_chatroom.chatroom_id, messages.created_at DESC
//         `, [authUserId]);

//         // console.log(chats?.rows)
//         //  chats.rows.sort((a, b) => b.id - a.id)
        
//         res.status(200).json({allChats: chats?.rows});
      
//     } catch (error) {
//         console.log(error?.message);
//         return res.status(500).json({
//             error: error?.message
//         })
//     }
// }

exports.getAllChats = async (req, res) => {
    const authUserId = req.user.id;
    // console.log("all chats", authUserId);
    try {
        const chats = await pool.query(`
            SELECT uc.chatroom_id,
            uc.user_id, uc.friend_id, uc.created_at,
            ua.firstname userFN, ua.lastname userLN,
            ua.profile userP, ua.email userE, ua.phonenumber userPN, 
            
            ub.firstname fFN, ub.lastname fLN,
            ub.profile fP, ub.email fE, ub.phonenumber fPN,
            
            messages.msg_id, messages.read, messages.msg_content, messages.created_at msgContent_created, messages.sent_by sentBy_id,
            sentBy.firstname sentByFn, sentBy.lastname sentByLn

            FROM user_chatroom uc
               
            LEFT JOIN (
                SELECT DISTINCT ON (messages.chatroom_id) messages.chatroom_id, messages.read,
                messages.msg_id, messages.msg_content, messages.created_at, messages.sent_by
                FROM messages
                ORDER BY messages.chatroom_id, messages.created_at DESC
            ) messages ON uc.chatroom_id = messages.chatroom_id
            
            LEFT JOIN user_acc sentBy ON messages.sent_by = sentBy.user_id

            INNER JOIN user_acc ua ON uc.user_id = ua.user_id
            INNER JOIN user_acc ub ON uc.friend_id = ub.user_id
            
            WHERE (uc.user_id = $1 OR uc.friend_id = $1) AND (uc.visible_to = $1 OR uc.visible_to IS NULL) AND (messages.msg_id IS NOT NULL)

            ORDER BY messages.created_at DESC 
        `, [authUserId]);

        // console.log(chats?.rows) 
        //  chats.rows.sort((a, b) => b.id - a.id)
        
        res.status(200).json({allChats: chats?.rows});
      
    } catch (error) {
        console.log(error?.message);
        return res.status(500).json({
            error: error?.message
        })
    }
}

exports.getSelectedRoom = async(req,res) => {
    const { chatroom_id } = req.query;
    const userId  = req.user.id;
    
    try {   

        // first check if the user belongs into the chatroom

        const check = await pool.query(`
            SELECT * FROM user_chatroom 
            WHERE user_chatroom.chatroom_id = $1 AND
            (user_chatroom.user_id = $2 OR user_chatroom.friend_id = $2) AND (user_chatroom.visible_to = $2 OR user_chatroom.visible_to IS NULL)
        `,[chatroom_id, userId]);

        if(check.rows.length === 0){
            return res.status(401).json({errorCode: 401, message: "Oops! looks like this page does not exist."});
        }

        //updating the read value to true meaning the user saw the message
       await pool.query(`  
        UPDATE messages
        SET read = $1
        WHERE chatroom_id = $2 AND read = $3 AND NOT sent_by = $4`,[true, chatroom_id, false, userId]);
       
        const chats = await pool.query(`
            SELECT user_chatroom.chatroom_id, 
            user_chatroom.user_id, user_chatroom.friend_id, user_chatroom.visible_to,

            ua.firstname userFN, ua.lastname userLN,
            ua.profile userP, ua.email userE, ua.phonenumber userPN, 

            ub.firstname fFN, ub.lastname fLN,
            ub.profile fP, ub.email fE, ub.phonenumber fPN
            
            FROM user_chatroom
            
            INNER JOIN user_acc ua ON user_chatroom.user_id = ua.user_id
            INNER JOIN user_acc ub ON user_chatroom.friend_id = ub.user_id

            WHERE user_chatroom.chatroom_id = $1

        `, [chatroom_id]);
    
        return res.status(200).json({chatroom: chats?.rows});
      
    } catch (error) {
        console.log("x",error?.message);
        return res.status(500).json({
            error: error?.message
        })
    }
    
}

exports.getAllMessages = async (req, res) => {

    const { chatroom_id } = req.query;
    const authUserId = req.user.id;

    try {   
        
        const messages = await pool.query(`
            SELECT messages.*, user_acc.firstname, user_acc.lastname, user_acc.profile 
            FROM messages 
            LEFT JOIN user_acc ON messages.sent_by = user_acc.user_id
            WHERE (messages.chatroom_id = $1) AND (messages.visible_to = $2 OR messages.visible_to IS NULL) 
            ORDER BY messages.created_at ASC
        `, [Number(chatroom_id), authUserId]);

        // console.log(messages?.rows);
        res.status(200).json({messages: messages.rows});

    } catch (error) {
        console.log(error?.message);
        return res.status(500).json({
            error: error?.message
        })
    }
}

exports.sendMessage = async (req, res) => {

    const { chatroom_id, msg_content, pictureUrl } = req.body; // id of the chatroom and the content of the msg
    const authId = req.user.id; //id of authenticated id sender

    try {   

         //upload image to cloudinary
         if(pictureUrl) {
            console.log("uploading...")
            const { secure_url } = await cloudinary.uploader.upload(pictureUrl, 
                {
                    upload_preset: 'capstone',
                    allowed_formats : ['png', 'jpg', 'jpeg',],
                }, 
                function(error, result) {
                    if(error){
                        console.log(error);
                    }
                }
            );
            console.log("uploading done")
            // if theres an image
            const newMessage = await pool.query(`
            WITH new_message as (
                INSERT INTO messages (chatroom_id, sent_by, msg_content, read) VALUES ($1, $2, $3, $4) RETURNING *
            ) SELECT new_message.*, user_acc.firstname, user_acc.lastname, user_acc.profile 
            FROM new_message
            LEFT JOIN user_acc ON new_message.sent_by = user_acc.user_id
            `, [chatroom_id, authId, secure_url, false]);

            return res.status(201).json({ newMessage: newMessage?.rows[0]});

        } else {
            //if theres no image
            console.log("text")
            const newMessage = await pool.query(`
            WITH new_message as (
                INSERT INTO messages (chatroom_id, sent_by, msg_content, read) VALUES ($1, $2, $3, $4) RETURNING *
            ) SELECT new_message.*, user_acc.firstname, user_acc.lastname, user_acc.profile 
            FROM new_message
            LEFT JOIN user_acc ON new_message.sent_by = user_acc.user_id
            `, [chatroom_id, authId, msg_content, false]);

            const checkV = await pool.query(`
                SELECT * FROM user_chatroom 
                WHERE user_chatroom.chatroom_id = $1 AND
                (user_chatroom.visible_to = $2 OR user_chatroom.visible_to = $3);
            `,[chatroom_id, authId, -1]);

            if(checkV.rows[0]?.visible_to === authId){
                await pool.query(`
                UPDATE user_chatroom 
                SET visible_to = NULL 
                WHERE chatroom_id = $1`, [chatroom_id]);
            }

            console.log("h", checkV.rows[0])

            return res.status(201).json({ newMessage: newMessage?.rows[0]});
        }
        

    } catch (error) {
        console.log(error?.message);
        return res.status(500).json({
            error: error?.message
        })
    }
}

exports.deleteConversation = async (req, res) => {
    const { chatroom_id, visible_to, user1, user2 } = req.body;
    const authId = req.user.id; //id of authenticated id sender

    let visibleTo = '';
    let visibleMsg= '';

    try {

        // if(authId === user1){
        //     if(authId === visible_to) {
        //         await pool.query(`
        //         UPDATE user_chatroom 
        //         SET visible_to = $1 
        //         WHERE chatroom_id = $2`, [-1, chatroom_id]);
        //         return res.status(200).json({message: "Conversation deleted successfully!"});
        //     }
        //     await pool.query(`
        //     UPDATE user_chatroom 
        //     SET visible_to = $1 
        //     WHERE chatroom_id = $2`, [user2, chatroom_id]);
        //     return res.status(200).json({message: "Conversation deleted successfully!"});
        // }else if (authId === user2){
        //     if(authId === visible_to) {
        //         await pool.query(`
        //         UPDATE user_chatroom 
        //         SET visible_to = $1 
        //         WHERE chatroom_id = $2`, [-1, chatroom_id]);
        //         return res.status(200).json({message: "Conversation deleted successfully!"});
        //     }
        //     await pool.query(`
        //     UPDATE user_chatroom 
        //     SET visible_to = $1 
        //     WHERE chatroom_id = $2`, [user1, chatroom_id]);
        //     return res.status(200).json({message: "Conversation deleted successfully!"});
        // }

        if(authId === user1){
            if(authId === visible_to) {
                visibleTo = -1
            } else {
                visibleTo = user2
            }
            
        }else if (authId === user2){
            if(authId === visible_to) {
                visibleTo = -1
            } else {
                visibleTo = user1
            }
        }

        // console.log("x",visibleTo);

        //updating the visibility of the chatroom
        //we are not actually deleting the chatroom once the user delete their conversation
        await pool.query(`
        UPDATE user_chatroom 
        SET visible_to = $1 
        WHERE chatroom_id = $2`, [Number(visibleTo), chatroom_id]);

        //here updating each messages, hiding them once the user delete conversation
        //bug here
        await pool.query(`
        UPDATE messages
        SET visible_to = $1 
        WHERE chatroom_id = $2 AND (visible_to = $3 OR visible_to = $4)`, [Number(-1), chatroom_id, user1, user2]);

        if(authId === user1) {
            visibleMsg = user2;
        } else if (authId === user2){
            visibleMsg = user1;
        }

        await pool.query(`
        UPDATE messages
        SET visible_to = $1 
        WHERE chatroom_id = $2 AND visible_to IS NULL`, [Number(visibleMsg), chatroom_id]);

        return res.status(200).json({message: "Conversation deleted successfully!"});
        
    } catch (error) {
        console.log(error?.message);
        return res.status(500).json({
            error: error?.message
        })
    }
}







// exports.createRoom = async (req, res) => {
//     const { userId } = req.body; //another userId
//     const authUserId = req.user.id; //authenticated user who initiate the creation of room
//     // const roomName = "room" //static value for testing
//     // const isGroupChat = false;
//     const participantsArr = [{user_id: userId}, {user_id: authUserId}];
//     console.log(participantsArr);

//     try {
        
//         //check first 

//         const existsChat = await pool.query(`
//             SELECT * FROM room r
            
//             LEFT JOIN participants p ON r.room_id = p.room_id
//             LEFT JOIN participants p1 ON r.room_id = p1.room_id

//             WHERE p.user_id = $1 AND p1.user_id = $2 

//             GROUP BY r.room_id, p.participant_id, p1.participant_id
//         `,[authUserId, userId]);

//         console.log("e",existsChat.rows);

//         if(existsChat.rows.length === 0) {
//            const room = await pool.query(`
//                 INSERT INTO room (name, isGroupChat) VALUES ($1, $2) RETURNING *
//             `,[roomName, isGroupChat]);

//             const roomId = room?.rows[0]?.room_id;

//             participantsArr?.map( async (u) => {
//                 await pool.query(`
//                 INSERT INTO participants (user_id, room_id ) VALUES ($1, $2) RETURNING *
//                 `,[u.user_id, roomId])
//             });
//         } else {
//             return res.status(200).json({chat:existsChat.rows[0]})
//         }

//     } catch (error) {
//         console.log(error?.message);
//         return res.status(500).json({
//             error: error?.message
//         })
//     }
// }

// exports.getAllChats = async (req, res) => {
//     const authUserId = req.user.id;
//     console.log(authUserId);
//     try {
//         const chats = await pool.query(`
//         SELECT room_id FROM participants p
//         LEFT JOIN room r ON p.room_id = r.room_id
//         `);

//         console.log(chats?.rows);

      
//     } catch (error) {
//         console.log(error?.message);
//         return res.status(500).json({
//             error: error?.message
//         })
//     }
// }