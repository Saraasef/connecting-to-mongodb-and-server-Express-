const mongoose = require("mongoose");
const projectsSchema = new mongoose.Schema(
  {
    title: { type: string, required: true },
    text: { type: string },
    image: { type: string, default: "./default/default.png" },
    owner: { type: mongoose.Types.ObjectId, required: true },
    team: { type: mongoose.Types.ObjectId },
    private: { type: mongoose.Types.ObjectId, default: true },
  },
  { timestamps: true }
);
const projectModel = mongoose.model("team", projectsSchema);
module.exports = { projectModel };
