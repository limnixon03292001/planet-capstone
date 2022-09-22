
--CREATE DATABASE 
CREATE DATABASE capstone;

--CREATE TABLE FOR USER ACCOUNTS
CREATE TABLE user_acc(
    user_id SERIAL PRIMARY KEY,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    phonenumber TEXT NOT NULL,
    baranggay TEXT NOT NULL,
    city TEXT NOT NULL,
    age INT NOT NULL,
    birthday TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    profile TEXT DEFAULT 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
    cover TEXT,
    description TEXT,
    created_at DATE DEFAULT CURRENT_DATE
);

--CREATE TABLE FOR USERS'S FOLLOWERS/FOLLOWING to test
CREATE TABLE user_followers (
    followers_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    followers_user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user_acc(user_id) ON DELETE CASCADE,
    FOREIGN KEY (followers_user_id) REFERENCES user_acc(user_id) ON DELETE CASCADE
);

--CREATE TABLE FOR USER'S POST
CREATE TABLE user_posts(
    post_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    picture TEXT,
    description TEXT,
    created_at timestamp NOT NULL DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES user_acc(user_id) ON DELETE CASCADE
);

--CREATE TABLE FOR USER WHO LIKE'S A CERTAIN POST
CREATE TABLE posts_like(
    postlike_id SERIAL PRIMARY KEY,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    created_at timestamp NOT NULL DEFAULT NOW(),
    FOREIGN KEY (post_id) REFERENCES user_posts(post_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES user_acc(user_id) ON DELETE CASCADE
);

--CREATE TABLE FOR USER WHO MAKE cOMMENT TO A CERTAIN POST
CREATE TABLE posts_comment(
    postcomment_id SERIAL PRIMARY KEY,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    comment_text TEXT NOT NULL,
    created_at timestamp NOT NULL DEFAULT NOW(),
    FOREIGN KEY (post_id) REFERENCES user_posts(post_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES user_acc(user_id) ON DELETE CASCADE
);
