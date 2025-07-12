const express = require("express");
const {Router} = require("express");
const userRoute = Router();
const {User} = require('../config/db');
const auth = require("../middleware/auth");
const authMiddleWare = auth.authMiddleware;

userRoute.use(express.json());

userRoute.get('/profile', authMiddleWare,  async (req,res)=>{
    console.log("Fetching User Id")
    const userId = req.userId;
    const user = await User.findById(userId);
    if(!user)
    {
         res.status(404).send("User Not Found");
    }
    else{
         res.status(200).json({
            username: user.username,
            college: user.college,
            branch: user.branch,
            field: user.field,
            firstName:user.firstName,
            lastName:user.lastName
        });
    }
});

userRoute.post('/profile', async (req,res)=>{
    const {username, college, branch, field , firstName , lastName} = req.body;
    const userId = req.userId;

    const foundUser = User.findById(userId);
    if(!foundUser)
    {
        return res.status(404).send("User Not Found");
    }   
    else{

        try{
            await foundUser.updateOne({
            firstName:firstName,
            lastName:lastName,
            username: username,
            college: college,
            branch: branch,
            field: field
        })
            return res.status(200).send("Profile Updated Successfully");
        } catch (err) {
            return res.status(400).send("Error updating profile");
        }   
    }
});

userRoute.put('/update-profile', authMiddleWare , async (req,res)=>{
    const {username, college, branch, field , firstName , lastName} = req.body;
    const userId = req.userId;

    const foundUser = User.findById(userId);
    if(!foundUser)
    {
        return res.status(404).send("User Not Found");
    }   
    else{

        try{
            console.log("Updating Profile");
            await foundUser.updateOne({
            username: username,
            college: college,
            branch: branch,
            field: field,
            firstName:firstName,
            lastName:lastName
        })
            console.log("Profle Updated");
            return res.status(200).send("Profile Updated Successfully");
        } catch (err) {
            return res.status(400).send("Error updating profile");
        }   
    }
});

module.exports = {
    userRoute: userRoute,
};