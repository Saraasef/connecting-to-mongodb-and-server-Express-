const express = require("express");
const app = express();
const router = require("express").Router();
const { authRouters } = require("./Auth");
const { projectRouters } = require("./Project");
const { teamRouters } = require("./Team");
const { userRouters } = require("./User");
console.log("app", router);
router.use("/project", projectRouters);
router.use("/team", teamRouters);
router.use("/user", userRouters);
router.use("/Auth", authRouters);

module.exports = { AllRouters: router };
