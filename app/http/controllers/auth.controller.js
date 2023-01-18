const { Router } = require("express");

class AuthController {
  register(req, res, next) {
    const { userName, password, email, mobile } = req.body;
  }
  login() {}
  resetPassword() {}
}
module.exports = { AuthController: new AuthController() };
