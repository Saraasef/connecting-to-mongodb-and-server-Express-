const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");

function hashString(str) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(str, salt);
}
function tokenGenerator(payload) {
  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "200 days",
  });
  return token;
}
function verifyJwtToken(token) {
  const result = jwt.verify(token, process.env.SECRET_KEY);
  if (!result?.userName)
    throw { status: 401, message: "please login in your account" };
  return result;
}
function createPathUpload() {
  let d = new Date();
  const Year = "" + d.getFullYear();
  const month = "" + d.getMonth();
  const day = "" + d.getDay();
  const uploadPath = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "uploads",
    Year,
    month,
    day
  );
  fs.mkdirSync(uploadPath, { recursive: true });
  return path.join("public", "uploads", Year, month, day);
}

module.exports = {
  hashString,
  tokenGenerator,
  verifyJwtToken,
  createPathUpload,
};
