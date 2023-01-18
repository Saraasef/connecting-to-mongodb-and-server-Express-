const mongoose = require("mongoose");
const usersSchema = new mongoose.Schema(
  {
    firstName: { type: string },
    lastName: { type: string },
    userName: { type: string, required: true, unique: treu },
    mobile: { type: string },
    roles: { type: string, defualt: ["USER"] },
    email: { type: string },
    password: { type: string, required: true },
    skills: { type: string, default: [] },
    team: { type: string, default: [] },
  },
  { timestamps: true }
);
const userModel = mongoose.model("user", usersSchema);
module.exports = { userModel };
