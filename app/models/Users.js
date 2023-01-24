const mongoose = require("mongoose");
const usersSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    userName: { type: String, required: true, unique: true },
    mobile: { type: String },
    roles: { type: [String], defualt: ["USER"] },
    email: { type: String },
    password: { type: String, required: true },
    skills: { type: [String], default: [] },
    team: { type: [mongoose.Types.ObjectId], default: [] },
  },
  { timestamps: true }
);
const userModel = mongoose.model("user", usersSchema);
module.exports = { userModel };
