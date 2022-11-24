const pool  = require('../utils/dbConnection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cloudinary = require("../utils/cloudinary");
const format = require("pg-format");
const transporter = require('../utils/transporter');

dotenv.config();


//Account recovery or reseting account's password
exports.sendRecoveryLink = async (req, res) =>{
    const { email } = req.body;

    try {
        const user = await pool.query("SELECT * FROM user_acc WHERE email = $1", [ email ]);

        if(user.rows.length === 0) {
            return res.status(401).json({error: {email: `Email doesn't exist`}});
        }

        // creating emailtoken link for account verification, 
        // this verification link will sent to user's email provided in registration
        jwt.sign({ email: user?.rows[0]?.email }, process.env.EMAIL_SECRET, { expiresIn: '30mins' },  (err, emailToken) => {
    
            if(err) {
                console.log("error signing email to token", err);
                res.status(500).json({err: err?.message, errMsg: "error signing email to token"});
            }
    
            const url = `${process.env.URL_DOMAIN}/reset-password/${emailToken}`;
    
            transporter.sendMail({
                to: email,
                subject: 'Reset Password',
                html: `
                <p>Hi there,</p>
            
                <p>You can now reset your account's password.</p>
        
                Please click this link to reset your accounts password: <a href="${url}">${url}</a>
        
                <p>This link will expire in 30 mins. If you did not sign up for a PLANeT account,<br>
                you can safely ignore this email.</p>
            
                <p>Best,</p>
    
                <p>The PLANeT Team</p>`,
            });
    
            return res.status(200).json({message: "Account recovery link, successfully sent!", success: true});
        });

    } catch (error) {
        console.log(error?.message);
        return res.status(500).json({
            error: error?.message
        });
    }
};

exports.checkResetPasswordLinkExpiration = async (req, res) => {
    const { token }  = req.query;
    // console.log("check")
    try {
        jwt.verify(token, process.env.EMAIL_SECRET);


        return res.status(200).json({message: "The token is valid."});

    } catch (error) {
        console.log(error?.message);

        if(error?.message === "jwt expired"){
            return res.status(400).json({error: "expired"});
        }

        return res.status(500).json({
            error: error?.message
        })
    }
};

exports.resetPassword = async (req, res) => {

    const { token, password }  = req.body;

    try {
        const user = jwt.verify(token, process.env.EMAIL_SECRET);

        //encrypt password
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);
        console.log(user?.email);
        await pool.query(`
            UPDATE user_acc
            SET password = $1
            WHERE email = $2
        `, [encryptedPassword, user?.email]);

        return res.status(204).json({message: "Reset password successfully!"});

    } catch (error) {
        console.log(error?.message);

        if(error?.message === "jwt expired"){
            return res.status(400).json({error: "expired"});
        }

        return res.status(500).json({
            error: error?.message
        })
    }
}
//Account recovery or reseting account's password

//Account confirmation during creation or registration of accounts.
exports.confirmationController = async (req, res) => {

    const { token }  = req.query;

    try {
        const user = jwt.verify(token, process.env.EMAIL_SECRET);

        await pool.query(`
            UPDATE user_acc
            SET isverified = $1
            WHERE user_id = $2
        `, [true, Number(user?.user)]);

        res.status(200).json({message: "Your email confirmation has been successfully verified!"});

    } catch (error) {
        console.log(error?.message);

        if(error?.message === "jwt expired"){
            return res.status(400).json({error: "expired"});
        }

        return res.status(500).json({
            error: error?.message
        })
    }
};

exports.registerController = async (req,res) => {
    const {
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        baranggay,
        city,
        birthday,
        age,
    } = req.body; 

    try {
        const user = await pool.query("SELECT * FROM user_acc WHERE email = $1", [ email ]);
        
        //checking if the email already exist inside the table
        if(user.rows.length > 0) {
            return res.status(401).json({error:{ email: `Email already exist!` }});
        }

        //encrypt password
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);

        const newUser = await pool.query(`INSERT INTO user_acc (firstname, lastname, email, password, phonenumber, baranggay, city, birthday, age) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
        [firstName, lastName, email, encryptedPassword, phoneNumber, baranggay, city, birthday, age,]);

        return res.status(201).json({ userId: newUser?.rows[0]?.user_id, email: newUser?.rows[0]?.email, });

    } catch (error) {
        console.log(error?.message);
        return res.status(500).json({
            error: error?.message
        })
    }   
}

exports.emailVerification = async (req, res) => {
    const { userId, email } = req.body;

    try {
        if(email){
            const user = await pool.query("SELECT * FROM user_acc WHERE email = $1", [ email ]);
            
            //checking if the email is already verified
            if(user.rows[0]?.isverified === true ) {
                return res.status(401).json({error:{ email: `Email alredy verified!` }});
            }
        
            // creating emailtoken link for account verification, 
            // this verification link will sent to user's email provided in registration
            jwt.sign({ user: userId }, process.env.EMAIL_SECRET, { expiresIn: '30mins' },  (err, emailToken) => {
        
                if(err) {
                    console.log("error signing email to token", err);
                    res.status(500).json({err: err?.message, errMsg: "error signing email to token"});
                }
        
                const url = `${process.env.URL_DOMAIN}/confirmation/${emailToken}`;
        
                transporter.sendMail({
                    to: email,
                    subject: 'Email Verification',
                    html: `
                    <p>Hi there,</p>
              
                    <p>Thank you for signing up for PLANeT. Click on the link below to verify your account.</p>
           
                    Please click this link to confirm your email: <a href="${url}">${url}</a>
            
                    <p>This link will expire in 30 mins. If you did not sign up for a PLANeT account,<br>
                    you can safely ignore this email.</p>
             
                    <p>Best,</p>
        
                    <p>The PLANeT Team</p>`,
                });
        
                return res.status(200).json({message: "Confirmation link successfully sent!", success: true});
            });

        } else {
            return res.status(500).json({message: "Email required!"});
        }    
    } catch (error) {
        console.log(error?.message);
        return res.status(500).json({
            error: error?.message
        });
    }
    
} 
// End of Account confirmation during creation or registration of accounts.

exports.loginController = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await pool.query("SELECT * FROM user_acc WHERE email = $1", [ email ]);
        
        //check email
        if(user.rows.length === 0) {
            return res.status(401).json({error: {email: `Email doesn't exist`}});
        }
        
        //validating password
        const validPassword = await bcrypt.compare(password, user.rows[0].password)
        
        //checking the password 
        if(!validPassword) {
            return res.status(401).json({error:{password: `Invalid Password!`}});
        }

        //if all goods, then generate a token

        jwt.sign({ email: user.rows[0].email, id: user.rows[0].user_id },       
                process.env.JWT_SECRET, 
                { expiresIn: 5600 }, 
                (err,token) => {

                //if something unexpected happened in creating token
                if(err){
                    return res.status(401).json({error: 'Something went wrong...'});
                }

                //send the token
                res.status(200).json({ token: token });
            });

    } catch (error) {
        console.log(error?.message);
        return res.status(500).json({
            error: error?.message
        })
    }   
}

exports.getAuthUser = async (req, res) => {
    const authId = req.user.id;

    try {
        
        const row = await pool.query(`
            SELECT user_id, firstname, lastname, profile, email FROM user_acc WHERE user_id = $1
        `,[authId]);

        return res.status(200).json({data: row.rows[0]});

    } catch (error) {
        console.log(error?.message);
        return res.status(500).json({
            error: error?.message
        })
    }
}

exports.searchUser = async (req, res) => {
    const { searchText } = req.query;

    try {
        const queryText = format(`
            SELECT user_id, firstname, lastname, email, profile, cover FROM user_acc
            WHERE firstname || ' ' || lastname ILIKE %L`,
            `%${searchText}%`);
        
        const rows = await pool.query(queryText);
        
        return res.status(200).json({result: rows.rows});

    } catch (error) {
        console.log(error?.message);
        return res.status(500).json({
            error: error?.message
        })
    }
}

exports.addPostController = async (req, res) => {
    const { pictureUrl, description } = req.body;

    try {

        //upload image to cloudinary
        if(pictureUrl) {
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

            // const row = await pool.query(`
            //     WITH inserted_post as (
            //         INSERT INTO user_posts (user_id, picture, description) VALUES ($1, $2, $3) RETURNING *
            //     ) SELECT inserted_post.*,
            //             user_acc.firstname, user_acc.lastname, user_acc.profile
            //     FROM inserted_post LEFT JOIN user_acc on inserted_post.user_id = user_acc.user_id`,
            // [req.user.id, secure_url, description ]);

            const row = await pool.query(`
            WITH inserted_post as (
                INSERT INTO user_posts (user_id, picture, description) VALUES ($1, $2, $3) RETURNING *
            ) SELECT inserted_post.*, inserted_post.created_at as post_created, user_acc.firstname, user_acc.lastname, user_acc.profile,
                pc.commentcount as commentcount, pl.likecount as likecount
                FROM inserted_post 
                LEFT JOIN user_acc ON inserted_post.user_id = user_acc.user_id
                LEFT JOIN (SELECT post_id, COUNT(*) likecount FROM posts_like GROUP BY posts_like.post_id) pl ON inserted_post.post_id = pl.post_id
                LEFT JOIN (SELECT post_id, COUNT(*) commentcount FROM posts_comment GROUP BY posts_comment.post_id) pc ON inserted_post.post_id = pc.post_id`,
            [ req.user.id, secure_url, description ]);

            return res.status(201).json({data: row.rows[0], message: "Post has been created successfully!"});
        }   
        
        // const row = await pool.query(`
        //         WITH inserted_post as (
        //             INSERT INTO user_posts (user_id, description) VALUES ($1, $2 ) RETURNING *
        //         ) SELECT inserted_post.*, inserted_post.created_at as createdPost,
        //                 user_acc.firstname, user_acc.lastname, user_acc.profile
        //         FROM inserted_post LEFT JOIN user_acc on inserted_post.user_id = user_acc.user_id`,
        //     [req.user.id, description ]);

        // if there's no image 
        const row = await pool.query(`
            WITH inserted_post as (
                INSERT INTO user_posts (user_id, description) VALUES ($1, $2) RETURNING *
            ) SELECT inserted_post.*, inserted_post.created_at as post_created, user_acc.firstname, user_acc.lastname, user_acc.profile,
                pc.commentcount as commentcount, pl.likecount as likecount
                FROM inserted_post 
                LEFT JOIN user_acc ON inserted_post.user_id = user_acc.user_id
                LEFT JOIN (SELECT post_id, COUNT(*) likecount FROM posts_like GROUP BY posts_like.post_id) pl ON inserted_post.post_id = pl.post_id
                LEFT JOIN (SELECT post_id, COUNT(*) commentcount FROM posts_comment GROUP BY posts_comment.post_id) pc ON inserted_post.post_id = pc.post_id`,
        [ req.user.id, description ]);

       
        return res.status(201).json({data: row.rows[0], message: "Post has been created successfully!"});

    } catch (error) {
        console.log("x",error?.message);
        return res.status(500).json({
            error: error?.message
        })
    }
}

exports.getPostController = async (req, res) => {
    const { page } = req.query;
    // console.log("page",page);
    try {
        
        const rows = await pool.query(`
            SELECT 
            up.*, ua.profile, ua.firstname, ua.lastname, ua.user_id as user_id, up.created_at as postCreated,
            pc.commentcount as commentcount, pl.likecount as likecount

            FROM user_posts up
            
            LEFT JOIN user_acc ua ON up.user_id = ua.user_id

            LEFT JOIN (SELECT post_id, COUNT(*) likecount 
            FROM posts_like GROUP BY posts_like.post_id ) pl ON up.post_id = pl.post_id

            LEFT JOIN (SELECT post_id, COUNT(*) commentcount FROM posts_comment GROUP BY posts_comment.post_id) pc ON up.post_id = pc.post_id

            GROUP BY up.post_id, ua.user_id, ua.firstname, pl.likecount, pc.commentcount
            ORDER BY up.created_at DESC
            LIMIT 3 OFFSET ((($1) - 1) * 3)
         
             `, [page]);
            //  console.log(rows.rows);

        res.status(200).json({posts: rows.rows});
    } catch (error) {
        console.log("x",error?.message);
        return res.status(500).json({
            error: error?.message
        })
    }
}

exports.getPostUserController = async (req, res) => {
    const { page, user_id } = req.query;
    // console.log("page",page, user_id);
    try {
        
        const rows = await pool.query(`
            SELECT 
            up.*, ua.profile, ua.firstname, ua.lastname, ua.user_id as user_id, up.created_at as postCreated,
            pc.commentcount as commentcount, pl.likecount as likecount

            FROM user_posts up
            
            LEFT JOIN user_acc ua ON up.user_id = ua.user_id
            LEFT JOIN (SELECT post_id, COUNT(*) likecount FROM posts_like GROUP BY posts_like.post_id ) pl ON up.post_id = pl.post_id
            LEFT JOIN (SELECT post_id, COUNT(*) commentcount FROM posts_comment GROUP BY posts_comment.post_id) pc ON up.post_id = pc.post_id

            WHERE up.user_id = $1
            GROUP BY up.post_id, ua.user_id, ua.firstname, pl.likecount, pc.commentcount
    
            ORDER BY up.created_at DESC
            LIMIT 3 OFFSET ((($2) - 1) * 3)
         
             `, [user_id, page]);
            //  console.log(rows?.rows);
        
        res.status(200).json({posts: rows?.rows});
    } catch (error) {
        console.log("x",error?.message);
        return res.status(500).json({
            error: error?.message
        })
    }
}

exports.deletePost = async (req, res) => {
    const { post_id } = req.body;

    try {
        await pool.query(`
            DELETE FROM user_posts WHERE post_id = $1
        `, [post_id]);

        res.status(202).json({message: "Post deleted sucessfully!"});

    } catch (error) {
        console.log(error?.message);
        return res.status(500).json({
            error: error?.message
        })
    }

}

exports.updatePost = async (req, res) => {
    const {
        post_id,
        picture,
        description
    }  = req.body;

    try {
        
        //upload image to cloudinary
        if(picture) {
            const { secure_url } = await cloudinary.uploader.upload(picture, 
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

            await pool.query(`
            UPDATE user_posts
            SET picture = $1, description = $2
            WHERE post_id = $3 
            RETURNING *
        `, [secure_url, description, post_id]);

            const rows = await pool.query(`
            SELECT up.*, up.created_at as postCreated, ua.firstname, ua.lastname, ua.profile, ua.user_id, 
            pc.commentcount as commentcount, pl.likecount as likecount
            
            FROM user_posts up

            LEFT JOIN user_acc ua ON up.user_id = ua.user_id
            LEFT JOIN (SELECT post_id, COUNT(*) likecount FROM posts_like GROUP BY posts_like.post_id) pl ON up.post_id = pl.post_id
            LEFT JOIN (SELECT post_id, COUNT(*) commentcount FROM posts_comment GROUP BY posts_comment.post_id) pc ON up.post_id = pc.post_id

            WHERE up.post_id = $1
        `, [post_id])

 
        return res.status(200).json({updatedPost: rows.rows[0]});

        }   

 
        //after the update of the post, another query for getting full data of the post
        // i dont know if this approach is efficient, i hate making two queries.
        //since im not a backend expert, i dont care anymore lol

        await pool.query(`
        UPDATE user_posts
        SET picture = $1, description = $2
        WHERE post_id = $3 
        RETURNING *
        `, [picture, description, post_id]);
    
        const rows = await pool.query(`
            SELECT up.*, up.created_at as postCreated, ua.firstname, ua.lastname, ua.profile, ua.user_id, 
            pc.commentcount as commentcount, pl.likecount as likecount
            
            FROM user_posts up

            LEFT JOIN user_acc ua ON up.user_id = ua.user_id
            LEFT JOIN (SELECT post_id, COUNT(*) likecount FROM posts_like GROUP BY posts_like.post_id) pl ON up.post_id = pl.post_id
            LEFT JOIN (SELECT post_id, COUNT(*) commentcount FROM posts_comment GROUP BY posts_comment.post_id) pc ON up.post_id = pc.post_id

            WHERE up.post_id = $1
        `, [post_id])

     
        res.status(200).json({updatedPost: rows.rows[0]});
    } catch (error) {
        console.log(error?.message);
        return res.status(500).json({
            error: error?.message
        })
    }
}

exports.getPostLiked = async (req, res) => {
    const {post_id} = req.query;
    const user_id = req.user.id;
    // console.log("request", post_id);
    try {
        const rows = await pool.query("SELECT * FROM posts_like WHERE user_id = $1 AND post_id = $2", [user_id, post_id]);

        if(rows.rows.length > 0){
            res.json({ liked: true });
        } else {
            res.json({ liked: false });
        }
    } catch (error) {
        console.log(error?.message);
        return res.status(500).json({
            error: error?.message
        })
    }
}

exports.postLike = async (req, res) => {
    const { post_id } = req.body;
    const user_id = req.user.id;
    console.log("like", post_id, user_id);
    try {
        await pool.query("INSERT INTO posts_like (post_id, user_id) VALUES ($1, $2) RETURNING *", [post_id, user_id]);

        const rows = await pool.query(`
            SELECT 
            up.*, ua.profile, ua.firstname, ua.lastname, ua.user_id as user_id, up.created_at as postCreated,
            pc.commentcount as commentcount, pl.likecount as likecount 

            FROM user_posts up
            
            LEFT JOIN user_acc ua ON up.user_id = ua.user_id
            LEFT JOIN (SELECT post_id, COUNT(*) likecount FROM posts_like GROUP BY posts_like.post_id) pl ON up.post_id = pl.post_id
            LEFT JOIN (SELECT post_id, COUNT(*) commentcount FROM posts_comment GROUP BY posts_comment.post_id) pc ON up.post_id = pc.post_id
            WHERE up.post_id = $1
     
         `, [post_id]);
        // console.log(rows.rows);
        res.status(201).json({likePost: rows.rows[0], message: "liked successfully"});
    } catch (error) {
        console.log(error?.message);
        return res.status(500).json({
            error: error?.message
        })
    }
}

exports.postDislike = async (req, res) => {
    const { post_id } = req.body;
    const user_id = req.user.id; //currently logged in user

    try {
        await pool.query("DELETE FROM posts_like WHERE post_id = $1 AND user_id = $2", [post_id, user_id]);
        // console.log(rows.rows);
        const rows = await pool.query(`
            SELECT 
            up.*, ua.profile, ua.firstname, ua.lastname, ua.user_id as user_id, up.created_at as postCreated,
            pc.commentcount as commentcount, pl.likecount as likecount 

            FROM user_posts up
            
            LEFT JOIN user_acc ua ON up.user_id = ua.user_id
            LEFT JOIN (SELECT post_id, COUNT(*) likecount FROM posts_like GROUP BY posts_like.post_id) pl ON up.post_id = pl.post_id
            LEFT JOIN (SELECT post_id, COUNT(*) commentcount FROM posts_comment GROUP BY posts_comment.post_id) pc ON up.post_id = pc.post_id
            WHERE up.post_id = $1
 
            `, [post_id]);
            res.status(201).json({dislikePost: rows.rows[0], message: "disliked successfully"});
    } catch (error) {
        console.log(error?.message);
        return res.status(500).json({
            error: error?.message
        })
    }
}

exports.getComment = async (req, res) => {
    const { post_id } = req.query;
    // console.log("get comment", post_id)
    try {
        const rows = await pool.query(`
            SELECT pc.created_at AS comment_created,
            ua.firstname, ua.lastname, ua.profile, ua.user_id,
            pc.*
            

            FROM posts_comment pc
            
            LEFT JOIN user_acc ua ON pc.user_id = ua.user_id
            WHERE pc.post_id = $1
            ORDER BY pc.postcomment_id DESC
        `, [post_id]);
        
        res.status(200).json({comments: rows.rows});
    } catch (error) {
        console.log(error?.message);
        return res.status(500).json({
            error: error?.message
        })
    }
}

exports.deleteComment = async (req, res) => {
    const { comment_id } = req.body;
    console.log(comment_id)
    try {
        await pool.query(`
            DELETE FROM posts_comment WHERE postcomment_id = $1
        `, [comment_id])

        return res.status(200).json({message: "Comment deleted sucessfully!"})

    } catch (error) {
        console.log(error?.message);
        return res.status(500).json({
            error: error?.message
        })
    }
}

exports.addComment = async (req, res) => {
    const { post_id, comment_text } = req.body;
    const user_id = req.user.id;

    try {
        const rows = await pool.query(`
            WITH inserted_comment as (
                INSERT INTO posts_comment (post_id, user_id, comment_text) VALUES ($1, $2, $3) RETURNING *
            ) SELECT inserted_comment.*, inserted_comment.created_at as comment_created, user_acc.firstname, user_acc.lastname, user_acc.profile
                FROM inserted_comment 
                LEFT JOIN user_acc ON inserted_comment.user_id = user_acc.user_id
        `, [post_id, user_id, comment_text])
        
        // console.log(rows.rows[0])
        return res.status(200).json({newComment: rows.rows[0], message: "Comment added sucessfully!"})

    } catch (error) {
        console.log(error?.message);
        return res.status(500).json({
            error: error?.message
        })
    }
}

exports.getUserProfile = async (req, res) => {
    const { userId } = req.query;

    try {
        
        const rows = await pool.query(`
            SELECT ua.*, uf.followersCount as followersCount, ufv2.followingCount as followingcount

            FROM user_acc ua
            
            LEFT JOIN (SELECT user_id, COUNT(*) followersCount FROM user_followers GROUP BY user_followers.user_id ) uf
            ON ua.user_id = uf.user_id
            LEFT JOIN (SELECT followers_user_id, COUNT(*) followingCount FROM user_followers GROUP BY user_followers.followers_user_id) ufv2
            ON ua.user_id = ufv2.followers_user_id

            WHERE ua.user_id = $1
         
             `, [userId]);
            //  console.log(rows?.rows);
        
        res.status(200).json({profile: rows?.rows[0]});
    } catch (error) {
        console.log(error?.message);
        return res.status(500).json({
            error: error?.message
        })
    }
}

exports.getFollowers = async (req, res) => {
    const authUserId = req.user.id;

    try {
        
        const rows = await pool.query(`
            SELECT uf.followers_user_id, ua.firstname, ua.lastname, ua.profile, ua.cover, ua.email, 
            uf.created_at FROM user_followers uf
            LEFT JOIN user_acc ua ON uf.followers_user_id = ua.user_id
            WHERE uf.user_id = $1
            ORDER BY uf.created_at DESC
        `, [authUserId]);

        return res.status(200).json({followers: rows?.rows});

    } catch (error) {
        console.log(error?.message);
        return res.status(500).json({
            error: error?.message
        })
    }
}

exports.followUser = async (req, res) => {
    const followerUserId = req.user.id; //currently logged in user who wants to follow another user
    const { userId } = req.body; // the user that the currently logged in user wants to follow

    try {
         // if the user attempts to follow him/herself, obviously they cannot do that lol
         if(followerUserId === userId) {
            return res.status(500).json({error: "Following yourself is not allowed!"});
        }

        const rows = await pool.query(`
            INSERT INTO user_followers (user_id, followers_user_id) VALUES ($1, $2) RETURNING *  
             `, [userId, followerUserId]);
        
        res.status(200).json({followed: rows?.rows[0], message: "followed sucessfully!"});
    } catch (error) {
        console.log("x",error?.message);
        return res.status(500).json({
            error: error?.message
        })
    }

}

exports.unFollowUser = async (req, res) => {
    const followerUserId = req.user.id; //currently logged in user who wants to unfollow another user
    const { userId } = req.body; // the user, that the currently logged in user wants to unfollow

    console.log(followerUserId, userId)
    try {
        const rows = await pool.query(`
            DELETE FROM user_followers WHERE user_id = $1 AND followers_user_id = $2
             `, [userId, followerUserId]);
        
        res.status(200).json({unfollowed: rows?.rows[0], message: "unfollowed sucessfully!"});
    } catch (error) {
        console.log("x",error?.message);
        return res.status(500).json({
            error: error?.message
        })
    }

}

//this controller function is for checking whether the currently logged in user following someone
exports.getIsFollowingUser = async (req, res) => {
    const followerUserId = req.user.id; //id of the currently logged in user
    const { userId } = req.query; //the userid that we want to check

    try {   
        const rows = await pool.query("SELECT * FROM user_followers WHERE user_id = $1 AND followers_user_id = $2", [userId, followerUserId]);

        if(rows.rows.length > 0){
            res.json({ following: true });
        } else {
            res.json({ following: false });
        }
    } catch (error) {
        console.log(error?.message);
        return res.status(500).json({
            error: error?.message
        })
    }
}

//add plant collection
exports.addPlantCollection = async (req,res) => {
    const authUserId = req.user.id;
    const data = req.body;
    
    //converting array values into a string
    const sunPref = data?.growingPref?.sunPref.join(", ");
    const interLight = data?.growingPref?.interLight.join(", ");
    const soilPref = data?.growingPref?.soilPref.join(", ");
    const waterReq = data?.growingPref?.waterReq.join(", ");
    const nativeHab = data?.growingPref?.nativeHab.join(", ");

    const client = await pool.connect();

    let plant_img = '';

    try {
        //upload image to cloudinary
        if(data?.plantDetails?.pictureUrl) {
            const { secure_url } = await cloudinary.uploader.upload(data?.plantDetails?.pictureUrl, 
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
            plant_img = secure_url;
        } else {
            plant_img = '';
        }

        await client.query('BEGIN');
        const queryPlantDetails = ` 
            INSERT INTO coll_plant_details 
            (user_id, plant_name, description, category, date_planted, plant_img) 
            VALUES ($1, $2 ,$3 , $4, $5, $6)
            RETURNING plant_detail_id
        `;
        const resPlantDetails = await client.query(queryPlantDetails, [ authUserId, data?.plantDetails?.plantName, 
            data?.plantDetails?.desc, data?.plantDetails?.plantCat, 
            data?.plantDetails?.datePlanted, plant_img ]);
        
        const idPlantDetail = resPlantDetails.rows[0]?.plant_detail_id;
        
        
        const queryGrowingPref = `
            INSERT INTO coll_growing_pref
            (plant_detail_id, sun_pref, inter_light, soil_pref, water_req, native_habitat)
            VALUES ($1, $2 ,$3, $4, $5, $6)
        `;
        await client.query(queryGrowingPref, [ idPlantDetail, sunPref, interLight, soilPref, waterReq, nativeHab ]);
        
        const queryGrowingInformation = `
            INSERT INTO coll_growing_info
            (plant_detail_id, avg_h, avg_w, foliage_color, foliage_type,
            foliage_scent, flower_color, fragrant, nocturnal_flowering,
            repeat_blooming, flowering_period)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        `;
        await client.query(queryGrowingInformation, [ idPlantDetail,
            data?.growingInfo?.avgHeight, data?.growingInfo?.avgWidth, data?.growingInfo?.foliageColor, data?.growingInfo?.foliageType,
            data?.growingInfo?.foliageScent, data?.growingInfo?.flowerColor, data?.growingInfo?.fragrant, data?.growingInfo?.nocturnalFlow,
            data?.growingInfo?.repeatBloom, data?.growingInfo?.floweringPer ]);

        await client.query('COMMIT');

        return res.status(201).json({message: "Added plant successfully into your collections! "});
        
    } catch (error) {
        await client.query('ROLLBACK');
        console.log("adding plant into your collection failed",error?.message);
        return res.status(500).json({
            error: error?.message
        })
    } finally {
        client.release();
    }
}

//get all plant collection of a user
exports.getPlantCollection = async (req, res) => {

    const { userId } = req.query;

    try {
        
        const query = ` 
            SELECT cpd.*, cgp.*, cgi.*, ua.user_id, ua.firstname, ua.lastname, ua.email, ua.profile
            FROM coll_plant_details cpd

            LEFT JOIN user_acc ua ON cpd.user_id = ua.user_id
            LEFT JOIN coll_growing_pref cgp ON cpd.plant_detail_id = cgp.plant_detail_id
            LEFT JOIN coll_growing_info cgi ON cpd.plant_detail_id = cgi.plant_detail_id

            WHERE cpd.user_id = $1
            ORDER BY cpd.created_at DESC
        `

        const result = await pool.query(query, [Number(userId)]);

        return res.status(200).json({data: result.rows});


    } catch (error) {
        console.log("error",error?.message);
        return res.status(500).json({
            error: error?.message
        })
    }
}

// exports.filterPlantCollections = async (req, res) => {
//     const { userId, filters } = req.query;
//     console.log("filter data", filters)
//     try {
        
//         const query =  format(` 
//             SELECT cpd.*, cgp.*, cgi.*, ua.user_id, ua.firstname, ua.lastname, ua.email, ua.profile
//             FROM coll_plant_details cpd

//             LEFT JOIN user_acc ua ON cpd.user_id = ua.user_id
//             LEFT JOIN coll_growing_pref cgp ON cpd.plant_detail_id = cgp.plant_detail_id
//             LEFT JOIN coll_growing_info cgi ON cpd.plant_detail_id = cgi.plant_detail_id

//             WHERE cpd.user_id = $1 

//            AND to_tsvector(cpd.user_id || ' ' || cpd.category || ' ' || cgp.sun_pref 
//            || ' ' || cgp.inter_light || ' ' || cgp.soil_pref || ' ' || cgp.water_req 
//            || ' ' || cgp.native_habitat) @@ plainto_tsquery(%L)  


//            ORDER BY cpd.created_at DESC

//         `, `%${filters}%`,)


//         const result = await pool.query(query, [Number(userId)]);

//         return res.status(200).json({data: result.rows});


//     } catch (error) {
//         console.log("error",error?.message);
//         return res.status(500).json({
//             error: error?.message
//         })
//     }
// }

exports.filterPlantCollections = async (req, res) => {
    const { userId, category, sunPref, interLight, soilPref, waterReq, nativeHab } = req.query;
   
    try {
        
        const query =  format(` 
            SELECT cpd.*, cgp.*, cgi.*, ua.user_id, ua.firstname, ua.lastname, ua.email, ua.profile
            FROM coll_plant_details cpd

            LEFT JOIN user_acc ua ON cpd.user_id = ua.user_id
            LEFT JOIN coll_growing_pref cgp ON cpd.plant_detail_id = cgp.plant_detail_id
            LEFT JOIN coll_growing_info cgi ON cpd.plant_detail_id = cgi.plant_detail_id

            WHERE cpd.user_id = $1

            ${category && category !== 'All' ? `AND to_tsvector(cpd.user_id || ' ' || cpd.category) @@ plainto_tsquery(%L)` : 
            `AND NOT to_tsvector(cpd.user_id || ' ' || cpd.category) @@ plainto_tsquery(%L)` }
            
            ${sunPref ? `AND to_tsvector(cpd.user_id || ' ' || cgp.sun_pref) @@ plainto_tsquery(%L)` :
            `AND NOT to_tsvector(cpd.user_id || ' ' || cgp.sun_pref) @@ plainto_tsquery(%L)`}

            ${interLight ? `AND to_tsvector(cpd.user_id || ' ' || cgp.inter_light) @@ plainto_tsquery(%L)` :
            `AND NOT to_tsvector(cpd.user_id || ' ' || cgp.inter_light) @@ plainto_tsquery(%L)`}
            
            ${soilPref ? `AND to_tsvector(cpd.user_id || ' ' || cgp.soil_pref) @@ plainto_tsquery(%L)` :
            `AND NOT to_tsvector(cpd.user_id || ' ' || cgp.soil_pref) @@ plainto_tsquery(%L)`}
            
            ${waterReq ? `AND to_tsvector(cpd.user_id || ' ' || cgp.water_req) @@ plainto_tsquery(%L)` :
            `AND NOT to_tsvector(cpd.user_id || ' ' || cgp.water_req) @@ plainto_tsquery(%L)`}

            ${nativeHab ? `AND to_tsvector(cpd.user_id || ' ' || cgp.native_habitat) @@ plainto_tsquery(%L)` : 
            `AND NOT to_tsvector(cpd.user_id || ' ' || cgp.native_habitat) @@ plainto_tsquery(%L)`}
            
            ORDER BY cpd.created_at DESC

        `, `%${category}%`, `%${sunPref}%`, `%${interLight}%`, `%${soilPref}%`, `%${waterReq}%`, `%${nativeHab}%`)


        const result = await pool.query(query, [Number(userId)]);
        const count = await pool.query(`SELECT COUNT(cpd.plant_detail_id) FROM coll_plant_details cpd  WHERE cpd.user_id = $1`, [Number(userId)]);

        return res.status(200).json({data: result.rows, total: count.rows[0]});


    } catch (error) {
        console.log("error",error?.message);
        return res.status(500).json({
            error: error?.message
        })
    }
}