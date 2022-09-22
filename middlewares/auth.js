const jwt = require("jsonwebtoken");
const dotenv =  require("dotenv");

dotenv.config();

const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    // console.log(token);
    if(!token){
       return res.status(401).json({errors: 'Not authorized, No token found!'})
    }
    try{
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        // console.log('decodedToken:', decodedToken);
        next();
    }
    catch(err){
        res.status(401).json({errors: 'Invalid Token!'});
    }
}


module.exports = auth;