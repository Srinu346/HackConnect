const jwt = require('jsonwebtoken');
const {User} = require("../config/db");
const SECRET_KEY = process.env.JWT_SECRET;

async function authMiddleware(req, res, next) {
    const token = req.headers['authorization'];

    if(!token)
    {
        return res.status(400).send("Please Login First");
    }
    else{
        try{
            const userId = jwt.verify(token,SECRET_KEY);
            req.userId = userId.id;
            const foundUser = await User.findById(userId.id);
            if(!foundUser)
            {
                return res.status(401).send("Please Register First");
            }
            next();
        } catch (e){
            return res.status(401).send(e);
        }
    }

}

module.exports = {
    authMiddleware:authMiddleware
}