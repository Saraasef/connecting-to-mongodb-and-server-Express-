const { body } = require("express-validator");
function registerValidator() {
  return [
    body("userName")
      .notEmpty.length({ min: 4, max: 25 })
      .custom((value, content) => {
        if (value) {
          const userNameRegex = /^[a-z]+[a-z0-9\-\.]{2,}/gi;
        }
        if (userNameRegex.test(value)) {
          return true;
        }
        throw "user name is not correct";
      }),
    body("email").isEmail().withMessage("Email is not correct"),
    body("mobile").isMobilePhone("de-DE").withMessage("mobile is not correct"),
    body("password")
      .isLength({ min: 6, max: 16 })
      .withMessage("password should be between 6-16 characters")
      .custom((value, context) => {
        if (!value) throw "password should not be empty";
        if (value !== context?.req?.body?.confirm_password)
          throw "password is not equall with the confirm_password";
        return true;
      }),
  ];
}

module.exports = { registerValidator };
