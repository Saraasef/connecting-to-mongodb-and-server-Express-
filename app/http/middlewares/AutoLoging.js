const { userModel } = require("../../models/Users");
const { verifyJwtToken } = require("../../modules/Function");

const checkLogin = async (req, res, next) => {
  // because autorization and its token is on header
  try {
    let errormessage = { status: 401, message: "please login in your account" };
    const authorization = req?.headers?.authorization;
    console.log(authorization);
    if (!authorization) throw errormessage;
    let token = authorization.split(" ")?.[1];
    if (!token) throw errormessage;
    const results = verifyJwtToken(token);
    const { userName } = results;
    console.log(results);
    const user = await userModel.findOne({ userName }, { password: 0 });
    if (!user) throw errormessage;
    req.user = user;
    console.log(user);
    return next();
  } catch (error) {
    next(error);
  }
};
module.exports = { checkLogin };
