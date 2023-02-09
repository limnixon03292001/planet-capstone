const pool  = require('../utils/dbConnection');
const dotenv = require('dotenv');
const cloudinary = require("../utils/cloudinary");

dotenv.config();


exports.getMapPlant = async (req, res) => {

    try {
        
        const tagged = await pool.query(`
            SELECT map_plants.*, user_acc.user_id, user_acc.firstname, user_acc.lastname, user_acc.profile, user_acc.email FROM map_plants 
            LEFT JOIN user_acc ON map_plants.user_id = user_acc.user_id
        `);

        const forSale = await pool.query(`
            SELECT mpd.*, ua.user_id, ua.firstname, ua.lastname, ua.email, ua.profile, ua.cover, ua.description userdesc
            FROM mp_plant_details mpd

            LEFT JOIN user_acc ua ON mpd.user_id = ua.user_id
        `);
        
        return res.status(201).json({ data: [...tagged.rows, ...forSale.rows] });

    } catch (error) {
        console.log(error?.message);
        return res.status(500).json({
            error: error?.message
        })
    }
}

exports.addMapPlant = async (req, res) => {

    const { plantName, description, pictureUrl, position } = req.body;
    const authUserId = req.user.id;
    
    // console.log("pos", position);
    try {

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

            const row = await pool.query(`
                INSERT INTO map_plants (user_id, plant_name, description, plant_img, lat, lng)
                VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
            `,[authUserId, plantName, description, secure_url, position?.lat, position?.lng]);

            return res.status(201).json({data: row.rows[0], message: "Plant added successfully!"});
        }
        
        const row = await pool.query(`
            INSERT INTO map_plants (user_id, plant_name, description, plant_img, lat, lng)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
        `,[authUserId, plantName, description, pictureUrl, position?.lat, position?.lng]);

        return res.status(201).json({data: row.rows[0], message: "Plant added successfully!"});

    } catch (error) {
        console.log(error?.message);
        return res.status(500).json({
            error: error?.message
        })
    }
}