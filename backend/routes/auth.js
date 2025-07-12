const express = require("express");
const {Router} = require("express");
const loginRoute = Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {User} = require('../config/db'); 
const {z} = require('zod');

loginRoute.use(express.json());


loginRoute.post('/register', async (req,res)=>{
    const username = req.body.username
    const password = req.body.password

    const userCredential = z.object({
        username : z.string().min(3).max(50),
        password : z.string().min(6).max(50)
    });

    try{
        const validationResult = userCredential.safeParse({username, password});

        if (!validationResult.success) {
          return res.send("Validation Failed");
        }

        const user = await User.findOne({username});
        if(user)
        {
            return res.status(400).send("User Already Exists");
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({username, password: hashedPassword});
            await newUser.save();
            return res.send("Registration Succesfull");
        }

    }
    catch(err){
        return res.status(400).send(err);
    }

});

loginRoute.post('/login', async (req , res)=>{
    const username = req.body.username
    const password = req.body.password

    const userCredential = z.object({
        username : z.string().min(3).max(50),
        password : z.string().min(6).max(50)
    });

    try{
        userCredential.safeParse({username, password});
        const user = await User.findOne({username});
        if(!user)
        {
            return res.status(400).send("User Not Found");
        }
        else{
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if(!isPasswordValid)
            {
                return res.status(400).send("Invalid Password");
            }
            else{
                const token = jwt.sign({id: user._id},"SECRET_KEY", {expiresIn: '1h'});
                return res.json({token});
            }
        }

    }
    catch(err){
        return res.status(400).send(err.errors[0].message);
    } 
})

module.exports = {
  loginRoute: loginRoute,
};
