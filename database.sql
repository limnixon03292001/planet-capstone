
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

-- ALTER TABLE user_acc
-- ADD COLUMN isVerified BOOLEAN;

ALTER TABLE user_acc
ADD COLUMN position TEXT;

ALTER TABLE user_acc
ADD COLUMN block BOOLEAN DEFAULT FALSE;

CREATE TABLE acc_verify(
    verify_id SERIAL PRIMARY KEY,
    acc_id INT NOT NULL,
    verified BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (acc_id) REFERENCES user_acc(user_id) ON DELETE CASCADE
);

CREATE TABLE acc_list(
    accList_id SERIAL PRIMARY KEY,
    acc_id INT NOT NULL,
    FOREIGN KEY (acc_id) REFERENCES user_acc(user_id) ON DELETE CASCADE
);

--CREATE TABLE FOR USERS'S FOLLOWERS/FOLLOWING to test
CREATE TABLE user_followers (
    followers_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    followers_user_id INT NOT NULL,
    created_at timestamp NOT NULL DEFAULT NOW(),
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

--CREATE TABLE FOR USER CHATROOM
CREATE TABLE user_chatroom(
    chatroom_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    friend_id INT NOT NULL,
    visible_to INT,
    created_at timestamp NOT NULL DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES user_acc(user_id) ON DELETE CASCADE,
    FOREIGN KEY (friend_id) REFERENCES user_acc(user_id) ON DELETE CASCADE
);

--CREATE TABLE FOR USER CHATROOM MESSAGES
CREATE TABLE messages(
    msg_id SERIAL PRIMARY KEY,
    chatroom_id INT NOT NULL,
    sent_by INT NOT NULL,
    msg_content TEXT,
    read BOOLEAN,
    visible_to INT,
    created_at timestamp NOT NULL DEFAULT NOW(),
    FOREIGN KEY (chatroom_id) REFERENCES user_chatroom(chatroom_id) ON DELETE CASCADE,
    FOREIGN KEY (sent_by) REFERENCES user_acc(user_id) ON DELETE CASCADE
);

--CREATE TABLE FOR PLANT MAP DATA
CREATE TABLE map_plants(
    mapPlant_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    plant_name TEXT NOT NULL,
    description TEXT NOT NULL,
    plant_img TEXT,
    lat TEXT NOT NULL,
    lng TEXT NOT NULL,
    created_at timestamp NOT NULL DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES user_acc(user_id) ON DELETE CASCADE
);

-- TABLES FOR USERS PLANT COLLECTION 

CREATE TABLE coll_plant_details(
    plant_detail_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    plant_name TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    date_planted TEXT,
    plant_img TEXT,
    created_at timestamp NOT NULL DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES user_acc(user_id) ON DELETE CASCADE
);

CREATE TABLE coll_growing_pref (
    growing_pref_id SERIAL PRIMARY KEY,
    plant_detail_id INT NOT NULL,
    sun_pref TEXT,
    inter_light TEXT,
    soil_pref TEXT,
    water_req TEXT,
    native_habitat TEXT,
    created_at timestamp NOT NULL DEFAULT NOW(),
    FOREIGN KEY (plant_detail_id) REFERENCES coll_plant_details(plant_detail_id) ON DELETE CASCADE
);

CREATE TABLE coll_growing_info(
    growing_info_id SERIAL PRIMARY KEY,
    plant_detail_id INT NOT NULL,
    avg_h TEXT,
    avg_w TEXT,
    foliage_color TEXT,
    foliage_type TEXT,
    foliage_scent TEXT,
    flower_color TEXT,
    fragrant TEXT,
    nocturnal_flowering TEXT,
    repeat_blooming TEXT,
    flowering_period TEXT,
    created_at timestamp NOT NULL DEFAULT NOW(),
    FOREIGN KEY (plant_detail_id) REFERENCES coll_plant_details(plant_detail_id) ON DELETE CASCADE
);

-- END TABLES FOR USERS PLANT COLLECTION 

-- TABLES FOR MARTKETPLACE PLANTS

CREATE TABLE mp_plant_details(
    plant_detail_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    plant_name TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    date_planted TEXT,
    plant_img TEXT,
    address TEXT,
    status VARCHAR(20),
    quantity VARCHAR(20),
    price VARCHAR(20),
    lat TEXT,
    lng TEXT,
    created_at timestamp NOT NULL DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES user_acc(user_id) ON DELETE CASCADE
);

CREATE TABLE mp_growing_pref (
    growing_pref_id SERIAL PRIMARY KEY,
    plant_detail_id INT NOT NULL,
    sun_pref TEXT,
    inter_light TEXT,
    soil_pref TEXT,
    water_req TEXT,
    native_habitat TEXT,
    created_at timestamp NOT NULL DEFAULT NOW(),
    FOREIGN KEY (plant_detail_id) REFERENCES mp_plant_details(plant_detail_id) ON DELETE CASCADE
);

CREATE TABLE mp_growing_info(
    growing_info_id SERIAL PRIMARY KEY,
    plant_detail_id INT NOT NULL,
    avg_h TEXT,
    avg_w TEXT,
    foliage_color TEXT,
    foliage_type TEXT,
    foliage_scent TEXT,
    flower_color TEXT,
    fragrant TEXT,
    nocturnal_flowering TEXT,
    repeat_blooming TEXT,
    flowering_period TEXT,
    created_at timestamp NOT NULL DEFAULT NOW(),
    FOREIGN KEY (plant_detail_id) REFERENCES mp_plant_details(plant_detail_id) ON DELETE CASCADE
);

-- END TABLES FOR MARTKETPLACE PLANTS


-- PLANT TRADE TABLE (EXPERIMENTAL)

-- CREATE TABLE trades (
--     trade_id SERIAL PRIMARY KEY,
--     seller_id INT NOT NULL,
--     requester_id INT NOT NULL,
--     created_at timestamp NOT NULL DEFAULT NOW(),
--     FOREIGN KEY (seller_id) REFERENCES user_acc(user_id) ON DELETE CASCADE,
--     FOREIGN KEY (requester_id) REFERENCES user_acc(user_id) ON DELETE CASCADE
-- );

-- CREATE TABLE plant_trade_details (
--     plant_trade_id SERIAL PRIMARY KEY,
--     trade_id INT NOT NULL,
--     seller_plant_id INT NOT NULL,
--     requester_plant_id INT NOT NULL,
--     note TEXT,
--     status TEXT, 
--     created_at timestamp NOT NULL DEFAULT NOW(),
--     FOREIGN KEY (trade_id) REFERENCES trades(trade_id) ON DELETE CASCADE,
--     FOREIGN KEY (seller_plant_id) REFERENCES mp_plant_details(plant_detail_id),
--     FOREIGN KEY (requester_plant_id) REFERENCES coll_plant_details(plant_detail_id)
-- );

-- END OF PLANT TRADE TABLE












--i just gave up for now atleast

-- CREATE TABLE room(
--     room_id SERIAL PRIMARY KEY,
--     name TEXT,
--     isGroupChat BOOLEAN DEFAULT FALSE
-- )


-- CREATE TABLE participants(
--     participant_id SERIAL PRIMARY KEY,
--     user_id INT NOT NULL,
--     room_id INT NOT NULL,
--     FOREIGN KEY (user_id) REFERENCES user_acc(user_id) ON DELETE CASCADE,
--     FOREIGN KEY (room_id) REFERENCES room(room_id) ON DELETE CASCADE
-- )

-- CREATE TABLE messages(
--     msg_id SERIAL PRIMARY KEY,
--     room_id INT NOT NULL,
--     user_id INT NOT NULL,
--     msg_content TEXT NOT NULL,
--     FOREIGN KEY (room_id) REFERENCES room(room_id) ON DELETE CASCADE,
--     FOREIGN KEY (user_id) REFERENCES user_acc(user_id) ON DELETE CASCADE
-- )