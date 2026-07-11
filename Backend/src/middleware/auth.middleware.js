const jwt = require('jsonwebtoken');
const BlacklistedToken = require('../models/blacklisted.model');

async function authuser(req,res,next){
    try{

        console.log("========== AUTH MIDDLEWARE ==========");
        console.log("Cookies:", req.cookies);
        console.log("Cookie Header:", req.headers.cookie);

        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({message:'Token not found'})
        }

        const isBlacklisted = await BlacklistedToken.findOne({token});
        if(isBlacklisted){
            return res.status(401).json({message:'Token is blacklisted'})
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(err){

        console.log("JWT Error:", err.message);
        return res.status(401).json({message:'Invalid or expired token'})
    }
}

module.exports = {authuser}