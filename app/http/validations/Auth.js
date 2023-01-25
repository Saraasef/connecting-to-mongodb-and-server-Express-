const { body } = require("express-validator");
const { userModel } = require("../../models/Users");

function registerValidator() {
  return [
    body("userName").custom(async (value, context) => {
      if (value) {
        const userNameRegex = /^[a-z]+[a-z0-9\-\.]{2,}/gi;
        if (userNameRegex.test(value)) {
          const user = await userModel.findOne({ userName: value });
          if (user) throw "the user name is existed already";
          return true;
        }
        throw "user name is not correct";
      } else {
        throw "user name schould not be emplty ";
      }
    }),
    body("email")
      .isEmail()
      .withMessage("Email is not correct")
      .custom(async (email) => {
        const user = await userModel.findOne({ email });
        if (user) throw "the email is existed already";
        return true;
      }),
    body("mobile")
      .isMobilePhone("de-DE")
      .withMessage("mobile is not correct")
      .custom(async (mobile) => {
        const user = await userModel.findOne({ mobile });
        if (user) throw "the email is existed already";
        return true;
      }),
    body("password")
      .isLength({ min: 6, max: 16 })
      .withMessage("password should be between 6-16 characters")
      .custom((value, context) => {
        if (!value) throw "password should not be empty";
        if (value !== context?.req?.body?.confirmPassword)
          throw "password is not equall with the confirPassword";
        return true;
      }),
  ];
}
function loginValidator() {
  return [
    body("userName")
      .notEmpty()
      .withMessage("user name should not be empty")
      .custom(async (value, context) => {
        if (value) {
          const userNameRegex = /^[a-z]+[a-z0-9\-\.]{2,}/gi;
          if (userNameRegex.test(value)) {
            const user = await userModel.findOne({ userName: value });
            if (user) throw "the user name is existed already";
            return true;
          }
          throw "user name is not correct";
        } else {
          throw "user name schould not be emplty ";
        }
      }),
    body("password")
      .isLength({ min: 6, max: 16 })
      .withMessage("password should be between 6-16 characters"),
  ];
}

module.exports = { registerValidator, loginValidator };
