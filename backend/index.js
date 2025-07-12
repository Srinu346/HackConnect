const express = require("express");
const app = express();
const cors = require("cors");

const {loginRoute} = require('./routes/auth');
const {teamsRoute} = require('./routes/teams');
const {userRoute} = require('./routes/user');
const {authMiddleware} = require('./middleware/auth');

app.use(cors());

app.use('/api', loginRoute);
app.use('/api/user',authMiddleware,userRoute);
app.use('/api/teams', authMiddleware, teamsRoute);

app.listen(3001,()=>{
    console.log("Server is Listening on port 3001");
})