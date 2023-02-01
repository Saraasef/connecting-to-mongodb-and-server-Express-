const { userController } = require("../http/controllers/user.controller");
const { checkLogin } = require("../http/middlewares/AutoLoging");
const { uploadmulter } = require("../modules/multer");

const router = require("express").Router();

router.get("/profile", checkLogin, userController.getProfile);
router.post("/profile", checkLogin, userController.editeProfile);
router.post(
  "/profile-image",
  uploadmulter.single("image"),
  checkLogin,
  userController.UploadProfileImage
);
module.exports = { userRouters: router };
