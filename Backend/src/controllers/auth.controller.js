const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const BlacklistedToken = require('../models/blacklisted.model');
const path = require('node:path');

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
async function registerUser(req, res) {
    try {
        const{username, email, password} = req.body;

        if(!username || !email || !password){
        return res.status(400).json({message: "All Fields are required"})
    }
        const existingUser = await userModel.findOne({$or: [{username}, {email}]});

        if(existingUser){
            return res.status(400).json({message: "Username or Email already exists"})
        }
 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const newUser = new userModel({username, email, password: hashedPassword});
        await newUser.save();

        const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET, 
        {expiresIn: '1D'});

        res.cookie('token', token,{
            httpOnly: true,
            secure: true,
            sameSite: "None",
            path:"/",
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(201).json({
            message: "User registered successfully", 
            user: {
                userId: newUser._id,
                username: newUser.username,
                email: newUser.email,
            
            }
        });
    } 
    catch (error) {
        console.error("Error registering user", error);
        res.status(500).json({message: "Server Error"})
    }
}


/**
 * @route POST /api/auth/login
 * @desc Login using existing email, password
 * @access Public
 */
async function loginuser(req, res) {
    
    try{

        const {email , password} = req.body;

        const user = await userModel.findOne({email})

        if(!user){
            return res.status(400).json({
                message : "Invalid Email and Passwod"
            })
        }

        const isPasswordValid = await bcrypt.compare(password,user.password)

        if(!isPasswordValid){
            return res.status(400).json({
                message : "Invalid Email or Password"
            })
        }
        const token = jwt.sign(
            {userId: user._id}, 
            process.env.JWT_SECRET, 
            {expiresIn: '1D'});

        res.cookie("token",token,{
            httpOnly: true,
            secure: true,
            sameSite: "None",
            path:"/",
            maxAge: 24 * 60 * 60 * 1000,
    })
        res.status(200).json({
            message : "User login successfully",
            user:{
                userId: user._id,
                username: user.username,
                email: user.email,
            }
        })

    }
    catch (error) {
        console.error("Error registering user", error);
        res.status(500).json({message: "Server Error"})
    }
}

/**
 * @route GET /api/auth/logout
 * @desc Logout user by blacklisting the token
 * @access Public
 */
async function logoutUser(req, res) {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(400).json({ message: "No token provided" });
        }

        const blacklistedToken = new BlacklistedToken({ token });
        await blacklistedToken.save();

        res.clearCookie("token",{
            httpOnly: true,
            secure: true,
            sameSite: "None",
            path:"/",
        });
        res.status(200).json({ message: "User logged out successfully" });
        
    } catch (error) {
        console.error("Error logging out user", error);
        res.status(500).json({ message: "Server Error" });
    }
}

/**
 * @route GET /api/auth/profile
 * @desc Get user profile information
 * @access Private  
 */
async function getUserProfile(req, res) {
    try {
    
        const user = await userModel.findById(req.user.userId).select('-password');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User profile retrieved successfully",
            user: {
                userId: user._id,
                username: user.username,
                email: user.email,
            }
        });
    } catch (error) {
        console.error("Error retrieving user profile", error);
        res.status(500).json({ message: "Server Error" });
    }
}   


module.exports = {
    registerUser,
    loginuser,
    logoutUser,
    getUserProfile,
}