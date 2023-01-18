const mongoose = require("mongoose");
const teamsSchema = new mongoose.Schema(
  {
    teamName: { type: string, required: true },
    description: { type: string },
    users: { type: [mongoose.Types.ObjectId], default: [] },
    ownerTeam: { type: mongoose.Types.ObjectId, required: true },
  },
  { timestamps: true }
);
const teamModel = mongoose.model("team", teamsSchema);
module.exports = { teamModel };
