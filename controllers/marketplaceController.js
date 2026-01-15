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

        return res.status(201).json({message: "Added plant successfully into marketplace!"});
        
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

exports.updatePlant = async (req, res) => {
    const data = req.body;
    
    let plant_img = '';

    const client = await pool.connect();

    try {
         //upload image to cloudinary
         if(data?.plant_img.split(':')[0] !== 'https' && data?.plant_img !== '') {
            const { secure_url } = await cloudinary.uploader.upload(data?.plant_img, 
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
            plant_img = data?.plant_img;
        }

        await client.query('BEGIN');

        const queryPlantDetails = ` 
            UPDATE mp_plant_details 
            SET plant_name = $1, description = $2, category = $3, date_planted = $4, plant_img = $5, address = $6, status = $7, 
            quantity = $8, price = $9, lat = $10, lng = $11 
            WHERE plant_detail_id = $12
            RETURNING plant_detail_id
        `;

        await client.query(queryPlantDetails, [ data?.plant_name, 
            data?.description, data?.category, 
            data?.date_planted, plant_img, data?.address, data?.status,
            data?.quantity, data?.price, data?.lat, data?.lng, data?.plant_detail_id ]);
        
        const queryGrowingPref = `
            UPDATE mp_growing_pref
            SET sun_pref = $1, inter_light = $2, soil_pref = $3, water_req = $4, native_habitat = $5
            WHERE plant_detail_id = $6
        `;

        await client.query(queryGrowingPref, [ data?.sun_pref.join(","), data?.inter_light.join(','), 
        data?.soil_pref.join(','), data?.water_req.join(','), data?.native_habitat.join(','), data?.plant_detail_id]);

        const queryGrowingInformation = `
        UPDATE mp_growing_info
        SET avg_h = $1, avg_w = $2, foliage_color = $3, foliage_type = $4,
        foliage_scent = $5, flower_color = $6, fragrant = $7, nocturnal_flowering = $8,
        repeat_blooming = $9, flowering_period = $10
        WHERE plant_detail_id = $11
        `;

        await client.query(queryGrowingInformation, [
        data?.avg_h, data?.avg_w, data?.foliage_color, data?.foliage_type,
        data?.foliage_scent, data?.flower_color, data?.fragrant, data?.nocturnal_flowering,
        data?.repeat_blooming, data?.flowering_period.join(','), data?.plant_detail_id
        ]);

        await client.query('COMMIT');
        return res.status(201).json({message: "Updated Plant Successfully!"});
    
    } catch (error) {
        await client.query('ROLLBACK');
        console.log("x",error?.message);
        return res.status(500).json({
            error: error?.message
        })
    } finally {
        client.release();
    }
}

exports.deletePlant = async (req, res) => {
    const { plant_detail_id } = req.body;

    try {

        await pool.query(`
            DELETE FROM mp_plant_details WHERE plant_detail_id = $1
        `, [plant_detail_id]);

        res.status(202).json({message: "Plant deleted sucessfully!"});

    } catch (error) {
        console.log("x",error?.message);
        return res.status(500).json({
            error: error?.message
        })
    }
}

exports.addPlantFromCollection = async (req,res) => {
    const authUserId = req.user.id;
    const data = req.body;

    const client = await pool.connect();

    try {
  
        await client.query('BEGIN');
        const queryPlantDetails = ` 
            INSERT INTO mp_plant_details 
            (user_id, plant_name, description, category, date_planted, plant_img, address, status, quantity, price, lat, lng) 
            VALUES ($1, $2 ,$3 , $4, $5, $6, $7, $8, $9, $10, $11, $12)
            RETURNING plant_detail_id
        `;
        const resPlantDetails = await client.query(queryPlantDetails, [ authUserId, data?.selectedPlant?.plant_name, 
            data?.selectedPlant?.description, data?.selectedPlant?.category, 
            data?.selectedPlant?.date_planted, data?.selectedPlant?.plant_img, data?.address, data?.status,
            data?.quantity, data?.price, data?.position?.lat, data?.position?.lng ]);
        
        const idPlantDetail = resPlantDetails.rows[0]?.plant_detail_id;
        
        const queryGrowingPref = `
            INSERT INTO mp_growing_pref
            (plant_detail_id, sun_pref, inter_light, soil_pref, water_req, native_habitat)
            VALUES ($1, $2 ,$3, $4, $5, $6)
        `;
        await client.query(queryGrowingPref, [ idPlantDetail, data?.selectedPlant?.sun_pref, 
            data?.selectedPlant?.inter_light, data?.selectedPlant?.soli_pref, data?.selectedPlant?.water_req, 
            data?.selectedPlant?.native_habitat]);
        
        const queryGrowingInformation = `
            INSERT INTO mp_growing_info
            (plant_detail_id, avg_h, avg_w, foliage_color, foliage_type,
            foliage_scent, flower_color, fragrant, nocturnal_flowering,
            repeat_blooming, flowering_period)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        `;
        await client.query(queryGrowingInformation, [ idPlantDetail,
            data?.selectedPlant?.avg_h, data?.selectedPlant?.avg_w, data?.selectedPlant?.foliage_color, data?.selectedPlant?.foliage_type,
            data?.selectedPlant?.foliage_scent, data?.selectedPlant?.flower_color, data?.selectedPlant?.fragrant, data?.selectedPlant?.nocturnal_flowering,
            data?.selectedPlant?.repeat_blooming, data?.selectedPlant?.flowering_period ]);

        await client.query('COMMIT');

        return res.status(201).json({message: "Added plant successfully into marketplace! "});
        
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

exports.getSellingUserPlants = async (req,res) => {

    const authUserId = req.user.id
    
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

            WHERE mpd.user_id = $1

            ORDER BY mpd.created_at DESC
        `;
        const result = await pool.query(query, [authUserId]);

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

exports.getPlantsUser = async (req, res) => {

    const { userId } = req.query;
    // console.log(userId)
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

        WHERE mpd.user_id = $1
        ORDER BY mpd.created_at DESC
        `;
        const result = await pool.query(query ,[Number(userId)]);

        return res.status(200).json({data: result.rows});
       

    } catch (error) {
        console.log("error",error?.message);
        return res.status(500).json({
            error: error?.message
        })
    }
}

exports.filterPlantMarketplace = async (req, res) => {
    const { category, search } = req.query;
   
    try {
        const query = format(` 
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

            WHERE ${category && category !== 'All' ? `to_tsvector(mpd.user_id || ' ' || mpd.category) @@ plainto_tsquery(%L)` : 
            `NOT to_tsvector(mpd.user_id || ' ' || mpd.category) @@ plainto_tsquery(%L)` }

            ${search ? `AND to_tsvector(mpd.user_id || ' ' || mpd.*) @@ plainto_tsquery(%L)` : 
            `AND NOT to_tsvector(mpd.user_id || ' ' || mpd.*) @@ plainto_tsquery(%L)` }
           
            ORDER BY mpd.created_at DESC
        `, `%${category}%`, `%${search}%`);

        const result = await pool.query(query);
        return res.status(200).json({data: result.rows});

    } catch (error) {
        console.log("error",error?.message);
        return res.status(500).json({
            error: error?.message
        })
    }
}


// TRADE
// exports.requestTrade = async (req, res) => {
//     const { seller_id, seller_plant_id, requester_id, requester_plant_id, note } = req.body;

//     try {

//         const trade_id = await pool.query(`INSERT INTO trades (seller_id, requester_id)
//         VALUES($1, $2) RETURNING *`,[seller_id, requester_id]);

//         const tradeId = trade_id?.rows[0]?.trade_id;

//         await pool.query(`INSERT INTO plant_trade_details (trade_id, seller_plant_id, requester_plant_id, note, status)
//         VALUES($1, $2, $3, $4, $5)`,[tradeId, seller_plant_id, requester_plant_id, note, 'Pending']);

//         res.status(201).json({msg: 'Request Sent!', success: true});

//     } catch (error) {
//         console.log("error",error?.message);
//         return res.status(500).json({
//             error: error?.message
//         })
//     }
// }

// exports.userRequests = async (req, res) => {
//     const authUserId = req.user.id

//     try {
//         const seller = await pool.query(`
//             SELECT trades.*, ptd.status trade_status, ptd.note, mpd.*, mgp.*, mgi.*,
//             ua.firstname, ua.lastname, ua.profile, ua.email
            
//             FROM trades 
            
//             LEFT JOIN plant_trade_details ptd ON trades.trade_id = ptd.trade_id

//             LEFT JOIN mp_plant_details mpd ON ptd.seller_plant_id = mpd.plant_detail_id 
//             LEFT JOIN mp_growing_pref mgp ON mpd.plant_detail_id = mgp.plant_detail_id
//             LEFT JOIN mp_growing_info mgi ON mpd.plant_detail_id = mgi.plant_detail_id
//             LEFT JOIN user_acc ua ON mpd.user_id = ua.user_id

//             WHERE requester_id = $1

//             ORDER BY trades.created_at DESC
//         `,[authUserId]);

//         // const requester = await pool.query(`
//         //     SELECT trades.*, ptd.status trade_status, ptd.note, cpd.*, cgp.*, cgi.*
            
//         //     FROM trades 
            
//         //     LEFT JOIN plant_trade_details ptd ON trades.trade_id = ptd.trade_id

//         //     LEFT JOIN coll_plant_details cpd ON ptd.requester_plant_id = cpd.plant_detail_id
//         //     LEFT JOIN coll_growing_pref cgp ON cpd.plant_detail_id = cgp.plant_detail_id
//         //     LEFT JOIN coll_growing_info cgi ON cpd.plant_detail_id = cgi.plant_detail_id

//         //     WHERE requester_id = $1
//         // `,[authUserId]);


//         res.status(200).json({
//             seller: seller.rows,
//             // requester: requester.rows
//         });

//     } catch (error) {
//         console.log("error",error?.message);
//         return res.status(500).json({
//             error: error?.message
//         })
//     }
// }

// exports.tradeRequest = async (req, res) => {
//     const authUserId = req.user.id

//     try {
//         const requests = await pool.query(`
//             SELECT trades.*, ptd.status trade_status, ptd.note, 
            
//             mpd.plant_img s_plant_img, mpd.plant_name s_plant_name,
//             cpd.plant_img r_plant_img, cpd.plant_name r_plant_name,

//             ua_s.firstname s_fn, ua_s.lastname s_ln, ua_s.profile s_p, ua_s.email s_e,
//             ua_r.firstname r_fn, ua_r.lastname r_ln, ua_r.profile r_p, ua_r.email r_e
            
//             FROM trades 
            
//             LEFT JOIN plant_trade_details ptd ON trades.trade_id = ptd.trade_id

//             LEFT JOIN mp_plant_details mpd ON ptd.seller_plant_id = mpd.plant_detail_id
//             LEFT JOIN user_acc ua_s ON mpd.user_id = ua_s.user_id

//             LEFT JOIN coll_plant_details cpd ON ptd.requester_plant_id = cpd.plant_detail_id
//             LEFT JOIN user_acc ua_r ON cpd.user_id = ua_r.user_id

//             WHERE seller_id = $1

//             ORDER BY trades.created_at DESC
//         `,[authUserId]);

//         res.status(200).json({
//             tradeRequests: requests.rows,
//             // requester: requester.rows
//         });

//     } catch (error) {
//         console.log("error",error?.message);
//         return res.status(500).json({
//             error: error?.message
//         })
        
//     }
// }

// exports.getTradeDetails = async (req, res) => {

//     const { tradeId } = req.query;
//     const authUserId = req.user.id;

//     console.log(tradeId);

//     try {


//         const check = await pool.query(`
//             SELECT * FROM trades WHERE seller_id = $1
//         `,[authUserId]);


//         if(check?.rows.length === 0) {
//             return res.status(404).json({message: "Not found", errorCode: 404});
//         }

//         const seller = await pool.query(`
//             SELECT trades.*, ptd.status trade_status, ptd.note, mpd.*, mgp.*, mgi.*,
//             ua.firstname s_fn, ua.lastname s_ln, ua.profile s_p, ua.email s_e
            
//             FROM trades 
            
//             LEFT JOIN plant_trade_details ptd ON trades.trade_id = ptd.trade_id

//             LEFT JOIN mp_plant_details mpd ON ptd.seller_plant_id = mpd.plant_detail_id 
//             LEFT JOIN mp_growing_pref mgp ON mpd.plant_detail_id = mgp.plant_detail_id
//             LEFT JOIN mp_growing_info mgi ON mpd.plant_detail_id = mgi.plant_detail_id
//             LEFT JOIN user_acc ua ON mpd.user_id = ua.user_id

//             WHERE ptd.trade_id = $1
//         `,[tradeId]);

//         const requester = await pool.query(`
//             SELECT trades.*, cpd.*, cgp.*, cgi.*,
//             ua.firstname r_fn, ua.lastname r_ln, ua.profile r_p, ua.email r_e,
//             ptd.created_at trade_creation
            
//             FROM trades 
            
//             LEFT JOIN plant_trade_details ptd ON trades.trade_id = ptd.trade_id

//             LEFT JOIN coll_plant_details cpd ON ptd.requester_plant_id = cpd.plant_detail_id
//             LEFT JOIN coll_growing_pref cgp ON cpd.plant_detail_id = cgp.plant_detail_id
//             LEFT JOIN coll_growing_info cgi ON cpd.plant_detail_id = cgi.plant_detail_id
//             LEFT JOIN user_acc ua ON cpd.user_id = ua.user_id

//             WHERE ptd.trade_id = $1
//         `,[tradeId]);

//         res.status(200).json({
//             seller: seller.rows[0],
//             requester: requester.rows[0]
//         });
            
//     } catch (error) {
//         console.log("error",error?.message);
//         return res.status(500).json({
//             error: error?.message
//         });
//     }
// }

// exports.approveTrade = async (req, res) => {
//     const { tradeId }  = req.body;
    
//     try {
//         const result = await pool.query(`
//             UPDATE plant_trade_details 
//             SET status = $1
//             WHERE trade_id = $2
//             RETURNING *
//         `,['Approved', tradeId]);   

//         res.status(200).json(result?.rows[0]);

//     } catch (error) {
//         console.log("error",error?.message);
//         return res.status(500).json({
//             error: error?.message
//         });
//     }
// }

// exports.rejectTrade = async (req, res) => {
//     const { tradeId } = req.body;

//     console.log(tradeId)
//     try {
//         const result = await pool.query(`
//             UPDATE plant_trade_details 
//             SET status = $1
//             WHERE trade_id = $2
//             RETURNING *
//         `,['Rejected', tradeId]);

//         res.status(200).json(result?.rows[0]);
//     } catch (error) {
//         console.log("error",error?.message);
//         return res.status(500).json({
//             error: error?.message
//         });
//     }
// }