const pool  = require('../utils/dbConnection');
const cloudinary = require("../utils/cloudinary");
const format = require("pg-format");

exports.addPlant = async (req,res) => {
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
            INSERT INTO mp_plant_details 
            (user_id, plant_name, description, category, date_planted, plant_img, address, status, quantity, price, lat, lng) 
            VALUES ($1, $2 ,$3 , $4, $5, $6, $7, $8, $9, $10, $11, $12)
            RETURNING plant_detail_id
        `;
        const resPlantDetails = await client.query(queryPlantDetails, [ authUserId, data?.plantDetails?.plantName, 
            data?.plantDetails?.desc, data?.plantDetails?.plantCat, 
            data?.plantDetails?.datePlanted, plant_img, data?.plantDetails?.address, data?.plantDetails?.status,
            data?.plantDetails?.quantity, data?.plantDetails?.price, data?.plantDetails?.position?.lat, data?.plantDetails?.position?.lng ]);
        
        const idPlantDetail = resPlantDetails.rows[0]?.plant_detail_id;
        
        const queryGrowingPref = `
            INSERT INTO mp_growing_pref
            (plant_detail_id, sun_pref, inter_light, soil_pref, water_req, native_habitat)
            VALUES ($1, $2 ,$3, $4, $5, $6)
        `;
        await client.query(queryGrowingPref, [ idPlantDetail, sunPref, interLight, soilPref, waterReq, nativeHab ]);
        
        const queryGrowingInformation = `
            INSERT INTO mp_growing_info
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

exports.getPlants = async (req, res) => {

    try {
        
        const query = ` 
            SELECT mpd.*, mgp.*, mgi.*, ua.user_id, ua.firstname, ua.lastname, ua.email, ua.profile, ua.cover, ua.description userdesc,
            uf.followersCount as followersCount, ufv2.followingCount as followingcount
            
            FROM mp_plant_details mpd

            LEFT JOIN user_acc ua ON mpd.user_id = ua.user_id
            LEFT JOIN mp_growing_pref mgp ON mpd.plant_detail_id = mgp.plant_detail_id
            LEFT JOIN mp_growing_info mgi ON mpd.plant_detail_id = mgi.plant_detail_id
            LEFT JOIN (SELECT user_id, COUNT(*) followersCount FROM user_followers GROUP BY user_followers.user_id ) uf
            ON mpd.user_id = uf.user_id
            LEFT JOIN (SELECT followers_user_id, COUNT(*) followingCount FROM user_followers GROUP BY user_followers.followers_user_id) ufv2
            ON mpd.user_id = ufv2.followers_user_id

            ORDER BY mpd.created_at DESC
        `;
        const result = await pool.query(query);

        return res.status(200).json({data: result.rows});


    } catch (error) {
        console.log("error",error?.message);
        return res.status(500).json({
            error: error?.message
        })
    }
}

exports.getPlant = async (req, res) => {

    const { id } = req.query;

    try {
        
        const query = ` 
            SELECT mpd.*, mgp.*, mgi.*, ua.user_id, ua.firstname, ua.lastname, ua.email, ua.profile
            
            FROM mp_plant_details mpd

            LEFT JOIN user_acc ua ON mpd.user_id = ua.user_id
            LEFT JOIN mp_growing_pref mgp ON mpd.plant_detail_id = mgp.plant_detail_id
            LEFT JOIN mp_growing_info mgi ON mpd.plant_detail_id = mgi.plant_detail_id

            WHERE mpd.plant_detail_id = $1
            ORDER BY mpd.created_at DESC
        `;

        const result = await pool.query(query, [id]);

        return res.status(200).json({data: result.rows});

    } catch (error) {
        console.log("error",error?.message);
        return res.status(500).json({
            error: error?.message
        })
    }
}

exports.getRelatedPlants = async (req, res) => {

    const { category, plantId } = req.query;

    try {
        
        const query = ` 
            SELECT mpd.*, mgp.*, mgi.*, ua.user_id, ua.firstname, ua.lastname, ua.email, ua.profile, ua.cover, ua.description userdesc,
            uf.followersCount as followersCount, ufv2.followingCount as followingcount
            
            FROM mp_plant_details mpd

            LEFT JOIN user_acc ua ON mpd.user_id = ua.user_id
            LEFT JOIN mp_growing_pref mgp ON mpd.plant_detail_id = mgp.plant_detail_id
            LEFT JOIN mp_growing_info mgi ON mpd.plant_detail_id = mgi.plant_detail_id
            LEFT JOIN (SELECT user_id, COUNT(*) followersCount FROM user_followers GROUP BY user_followers.user_id ) uf
            ON mpd.user_id = uf.user_id
            LEFT JOIN (SELECT followers_user_id, COUNT(*) followingCount FROM user_followers GROUP BY user_followers.followers_user_id) ufv2
            ON mpd.user_id = ufv2.followers_user_id

            WHERE mpd.category = $1 AND NOT mpd.plant_detail_id = $2
            ORDER BY mpd.created_at DESC
        `;

        const result = await pool.query(query, [category, plantId]);

        return res.status(200).json({data: result.rows});

    } catch (error) {
        console.log("error",error?.message);
        return res.status(500).json({
            error: error?.message
        })
    }
}