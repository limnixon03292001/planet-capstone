const express  = require('express');
const auth = require('../middlewares/auth');

const { registerController, loginController, addPostController, 
        getPostController, getPostLiked, postLike, postDislike, 
        getComment, deletePost, updatePost, deleteComment, addComment, 
        getPostUserController, 
        getUserProfile,
        followUser,
        unFollowUser,
        getIsFollowingUser,
        getAuthUser,
        searchUser,
        getFollowers,
        addPlantCollection,
        getPlantCollection
} = require('../controllers/userController'); 

const router = express.Router();

// route for authentication
router.post("/register", registerController);
router.post("/login", loginController); 
// end of route for authentication

router.get("/auth-user", auth, getAuthUser); //route for getting the authenticated user
router.get("/user", auth, getUserProfile); //route for getting the users profile
router.get("/search", auth, searchUser); //route for searching a user.
router.get("/get-followers", auth, getFollowers);
router.post("/follow-user", auth, followUser); //route for following a user
router.post("/unfollow-user", auth, unFollowUser); //route for unfollowing a user
router.get("/isfollowing-user", auth, getIsFollowingUser); //route for checking, if the currently logged in user followed a user

router.post("/post",auth , addPostController); // route for adding a post
router.get("/post",auth, getPostController); //route for getting all post
router.get("/post-user",auth, getPostUserController); //route for getting all post of specific user
router.delete("/post", auth, deletePost);// route for deleting a certain post
router.put("/post", auth, updatePost); // route for updating the content of a post
router.get("/post-liked",auth ,getPostLiked); //route for checking if the user liked a certain post
router.post("/post-like" ,auth , postLike); //route for liking certain post
router.post("/post-dislike", auth, postDislike); //route for disliking certain post


router.get("/getcomment", auth, getComment); //route for getting a comment of a certain post
router.post("/addcomment", auth, addComment); //route for adding a comment of a certain post
router.delete("/deletecomment", auth, deleteComment); //route for deleteing a comment of a certain post


//plant collection route
router.post("/addPlantCollection", auth, addPlantCollection);//adding plant to users plant collections
router.get("/getPlantCollections", auth, getPlantCollection); //getting plant collections of a user

module.exports = router;