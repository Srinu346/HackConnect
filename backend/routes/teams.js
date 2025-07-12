const express = require("express");
const {Router} = require("express");
const teamsRoute = Router();
const {User , Team} = require("../config/db");
const MiddleWare = require("../middleware/auth");
const auth = require("../middleware/auth");
const authMiddleWare = MiddleWare.authMiddleware;

teamsRoute.use(express.json());

teamsRoute.get('/get-team/:id',authMiddleWare , (req,res)=>{
    const teamId = req.query.id;
    Team.findById(teamId)
        .then(team => {
            if (!team) {
                return res.status(404).send("Team Not Found");
            }
            return res.status(200).json({
                title: team.title,
                description: team.description,
                techStack: team.techStack,
                requiredSkills: team.requiredSkills,
                creator: team.creator
            });
        })
        .catch(err => {
            return res.status(500).send("Internal Server Error");
        });

});


teamsRoute.post('/create', authMiddleWare, async (req, res) => {
  try {
    const { title, domain, description, members } = req.body;
    const userId = req.userId;

    // Fetch creator name from User collection
    const creatorUser = await User.findById(userId);
    if (!creatorUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const creatorName = `${creatorUser.firstName} ${creatorUser.lastName}`;

    const newTeam = new Team({
      title,
      domain,
      description,
      members, // Expecting array of { name, stack }
      creator: userId,
      creatorName,
    });

    const response = await newTeam.save();

    if (response) {
      return res.status(200).json({ message: "Team Created Successfully" });
    } else {
      return res.status(400).json({ error: "Error Creating Team" });
    }
  } catch (error) {
    console.error("Error creating team:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});


teamsRoute.patch('/:id/join', async (req, res) => {
  const teamId = req.params.id;
  const userId = req.user._id;

  const team = await Team.findById(teamId);
  if (!team) return res.status(404).send("Team not found");

  if (team.members.includes(userId)) {
    return res.status(400).send("Already a member");
  }

  team.members.push(userId);
  await team.save();

  res.send("Joined the team successfully");
});

teamsRoute.patch('/:id/leave', async (req, res) => {
  const teamId = req.params.id;
  const userId = req.user._id;

  const team = await Team.findById(teamId);
  if (!team) return res.status(404).send("Team not found");

  if (!team.members.includes(userId)) {
    return res.status(400).send("Not a member");
  }

  team.members = team.members.filter(member => member !== userId);
  await team.save();

  res.send("Left the team successfully");
});

teamsRoute.get('/my-teams', async (req, res) => {
  const userId = req.user._id;

  try {
    const teams = await Team.find({ members: userId })
      .populate('creator', 'username college branch field');

    return res.status(200).json(teams);
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
});

teamsRoute.delete('/:id/delete', async (req, res) => {
  const teamId = req.params.id;

  try {
    const team = await Team.findByIdAndDelete(teamId);
    if (!team) return res.status(404).send("Team not found");

    return res.status(200).send("Team deleted successfully");
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
});

teamsRoute.get('/all-teams', authMiddleWare , async (req, res) => {
  try {
    const teams = await Team.find();

    if (!teams || teams.length === 0) {
      return res.status(404).json({ message: "No teams found" });
    }
    res.status(200).json(teams);
  } catch (err) {
    console.error("Error fetching teams:", err);
    res.status(500).json({ error: "Failed to fetch teams" });
  }
});


module.exports = {
    teamsRoute: teamsRoute,
};