const express = require("express");
const app = express();

const router = require("express").Router();
const { AuthController } = require("../http/controllers/auth.controller");
// router.post("/register", AuthController.register);

module.exports = { authRouters: router };
