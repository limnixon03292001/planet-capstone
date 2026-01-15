const pool  = require('../utils/dbConnection');
const dotenv = require('dotenv');

dotenv.config();

exports.getCounts = async (req, res) => {
    try {
       
        const userCounts = await pool.query(`SELECT COUNT(acclist_id) FROM acc_list 
        LEFT JOIN user_acc ON acc_list.acc_id = user_acc.user_id
        WHERE user_acc.position = $1`
        ,['2001']);

        const adminCounts = await pool.query(`SELECT COUNT(acclist_id) FROM acc_list 
        LEFT JOIN user_acc ON acc_list.acc_id = user_acc.user_id
        WHERE user_acc.position = $1`
        ,['0329']);

        const mpCounts = await pool.query(`SELECT COUNT(plant_detail_id) FROM mp_plant_details 
        `);

        // console.log(counts.rows[0]?.count)

        return res.status(200).json({ userCounts: userCounts.rows[0]?.count, adminCounts: adminCounts.rows[0]?.count, mpCounts: mpCounts.rows[0]?.count })
        
    } catch (error) {
        console.log(error?.message);
        return res.status(500).json({
            error: error?.message
        });
    }
};

exports.getUserAccountList = async (req, res) =>{
   
    try {
       
        const accountList = await pool.query(`
            SELECT * FROM acc_list 
            LEFT JOIN user_acc ON acc_list.acc_id = user_acc.user_id
            LEFT JOIN acc_verify ON acc_list.acc_id = acc_verify.acc_id

            WHERE user_acc.position = $1
        `, ['2001']);

        // const counts = await pool.query(`SELECT COUNT(acclist_id) FROM acc_list 
        //  LEFT JOIN user_acc ON acc_list.acc_id = user_acc.user_id
        //  WHERE user_acc.position = $1`
        //  , ['2001']);

        // console.log(counts.rows[0]?.count)
        return res.status(200).json({ data: accountList.rows })
        
    } catch (error) {
        console.log(error?.message);
        return res.status(500).json({
            error: error?.message
        });
    }
};

exports.getAdminAccountList = async (req, res) => {
   
    try {
       
        const accountList = await pool.query(`
            SELECT * FROM acc_list 
            LEFT JOIN user_acc ON acc_list.acc_id = user_acc.user_id
            LEFT JOIN acc_verify ON acc_list.acc_id = acc_verify.acc_id

            WHERE user_acc.position = $1 OR user_acc.position = $2
        `,['0329', '29']);

        console.log("x", accountList?.rows);

        return res.status(200).json({data: accountList.rows })
        
    } catch (error) {
        console.log(error?.message);
        return res.status(500).json({
            error: error?.message
        });
    }
};

exports.blockAccount = async (req, res) => {

    const { userId } = req.body;

    try {
       
        await pool.query(`UPDATE user_acc SET block = $1 WHERE user_id = $2`, [true, userId]);
        return res.status(200).json({ message: 'blocked succesfully!', success: true});
        
    } catch (error) {
        console.log(error?.message);
        return res.status(500).json({
            error: error?.message
        });
    }
};

exports.unblockAccount = async (req, res) => {

    const { userId } = req.body;
    console.log(userId);
    try {
       
        await pool.query(`UPDATE user_acc SET block = $1 WHERE user_id = $2`, [false, userId]);
        return res.status(200).json({ message: 'unblocked succesfully!', success: true});
        
    } catch (error) {
        console.log(error?.message);
        return res.status(500).json({
            error: error?.message
        });
    }
};

exports.updateAccount = async (req, res) => {

    const  { data } = req.body;
 
    try {
       
        await pool.query(`UPDATE user_acc SET 
                        firstname = $1, lastname = $2,
                        birthday = $3, phonenumber = $4,
                        baranggay = $5, city = $6
                        WHERE user_id = $7`,
                        [data?.firstname, data?.lastname,
                        data?.birthday, data?.phonenumber,
                        data?.baranggay, data?.city, data?.userId ]);
  
        return res.status(200).json({ message: 'update successfully', success: true});
        
    } catch (error) {
        console.log(error?.message);
        return res.status(500).json({
            error: error?.message
        });
    }
};

exports.updateItemMp = async (req, res) => {

    const  { status, plantId } = req.body;
 
    try {
       
        await pool.query(`UPDATE mp_plant_details SET 
                        status = $1
                        WHERE plant_detail_id = $2`,
                        [status?.status, plantId]);
  
        return res.status(200).json({ message: 'update successfully', success: true});
        
    } catch (error) {
        console.log(error?.message);
        return res.status(500).json({
            error: error?.message
        });
    }
};

exports.getMarketplaceData = async (req, res) => {

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
        console.log(error?.message);
        return res.status(500).json({
            error: error?.message
        });
    }
};

exports.removeItemMp = async (req, res) => {
    const { plant_detail_id } = req.body;

    try {
        await pool.query(`
            DELETE FROM mp_plant_details WHERE plant_detail_id = $1
        `, [plant_detail_id]);

        res.status(202).json({message: "Plant deleted sucessfully!"});
        
    } catch (error) {
        console.log(error?.message);
        return res.status(500).json({
            error: error?.message
        });
    }
};