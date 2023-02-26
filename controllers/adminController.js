const pool  = require('../utils/dbConnection');
const cloudinary = require("../utils/cloudinary");
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

            WHERE user_acc.position = $1
        `, ['0329']);

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