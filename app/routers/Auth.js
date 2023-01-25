const express = require("express");
const app = express();
const router = require("express").Router();
const {
  registerValidator,
  loginValidator,
} = require("../http/validations/Auth");
const { AuthController } = require("../http/controllers/auth.controller");
const { expressValidatorMapper } = require("../http/middlewares/CheckError");

router.post(
  "/register",
  registerValidator(),
  expressValidatorMapper,
  AuthController.register
);
router.post(
  "/login",
  loginValidator(),
  expressValidatorMapper,
  AuthController.register
);
module.exports = { authRouters: router };
