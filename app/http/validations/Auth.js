const { body } = require("express-validator");
const { userModel } = require("../../models/Users");

function registerValidator() {
  return [
    body("userName").custom(async (value, ctx) => {
      if (value) {
        const usernameregex = /^[a-z]+[a-z 0-9\_\.]/gi;
        if (usernameregex.test(value)) {
          const user = await userModel.findOne({ user_name: value });
          if (user) throw "username is duplicate!";
          return true;
        }
        throw "username is not true";
      }
      throw "username dont empty!";
    }),
    body("email")
      .isEmail()
      .withMessage("The email entered is not valid")
      .custom(async (email) => {
        const user = await userModel.findOne({ email });
        if (user) throw "email is duplicate!";
        return true;
      }),
    body("mobile")
      .isMobilePhone("de-DE")
      .withMessage(" the mobile entered is not valid")
      .custom(async (mobile) => {
        const user = await userModel.findOne({ mobile });
        if (user) throw "mobile is duplicate";
        return true;
      }),
    body("password")
      .isLength({ min: 6, max: 16 })
      .withMessage("the password lenght should be between 6 and 16")
      .custom((value, ctx) => {
        if (!value) throw " the password should not empty!";
        if (value !== ctx?.req?.body?.confirm_password)
          throw " the password is not equal to confirm_password";
        return true;
      }),
  ];
}
function loginValidator() {
  return [
    body("userName")
      .notEmpty()
      .withMessage("username is not empty")
      .custom((username) => {
        const usernameregex = /^[a-z]+[a-z 0-9\_\.]/gi;
        if (usernameregex.test(username)) {
          return true;
        }
        throw "username or password is not true";
      }),
    body("password")
      .isLength({ min: 6, max: 16 })
      .withMessage("password length should be between is 6 and 8"),
  ];
}

module.exports = { registerValidator, loginValidator };
