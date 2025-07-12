const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = mongoose.Types.ObjectId;
const MONGO_URI = process.env.MONGO_URI;


mongoose.connect(MONGO_URI);

const userSchema = new Schema ({
    id : ObjectID,
    username : {
        type: String,
        unique: true,
    },
    firstName: String,
    lastName : String,
    password : String,
    college : String,
    branch : String,
    field: String,
});

const teamSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  domain: {
    type: String,
    required: true,
  },
  description: String,

  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userSchema",
    required: true,
  },

  creatorName: {
    type: String,
    required: true,
  },

  members: [
    {
      name: {
        type: String,
        required: true,
      },
      stack: {
        type: String,
        required: true,
      },
    },
  ],
});


const User = mongoose.model('User', userSchema);
const Team = mongoose.model('Team', teamSchema);

module.exports = { User, Team };