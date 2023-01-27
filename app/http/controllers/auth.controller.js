const bcrypt = require("bcrypt");
const { userModel } = require("../../models/Users");
const { hashString, tokenGenerator } = require("../../modules/Function");
class AuthController {
  async register(req, res, next) {
    try {
      const { userName, password, email, mobile } = req.body;

      const hashPassword = hashString(password);
      const user = await userModel
        .create({
          userName,
          password: hashPassword,
          email,
          mobile,
        })
        .catch((err) => {
          // console.log(JSON.stringify(err, null, 2));
          // code of repeate of sending request
          if (err?.code == 11000) {
            throw { status: 400, message: "username already used to system" };
          }
        });
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }
  async login(req, res, next) {
    try {
      const { userName, password } = req.body;
      const user = await userModel.findOne({ userName });
      if (!user)
        throw { status: 401, message: "user name or password is not correct" };
      const compareResult = bcrypt.compareSync(password, user.password);
      if (!compareResult)
        throw { status: 401, message: "user name or password is not correct" };
      return res.status(200).json({
        status: 200,
        success: true,
        message: "you have successfully loggined",
        token: tokenGenerator({ userName }),
      });
    } catch (error) {
      next(error);
    }
  }
  resetPassword() {}
}
module.exports = { AuthController: new AuthController() };
