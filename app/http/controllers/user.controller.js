const { userModel } = require("../../models/Users");
const User = require("../../routers/User");

class userController {
  getProfile(req, res, next) {
    try {
      const user = req.user;
      user.profile_image =
        req.protocol +
        "://" +
        req.get("host") +
        "/" +
        user.profile_image.replace(/[\\\\]/gm, "/");
      return res.status(200).json({
        status: 200,
        success: true,
        user,
      });
    } catch (error) {
      next(error);
    }
  }
  async editeProfile(req, res, next) {
    try {
      let data = { ...req.body };
      const userID = req.user._id;
      let fields = ["fristName", "lastName", "skills"];
      // empty array distinguisher has another package for
      let badValue = ["", " ", 0, null, -1, undefined, NaN, [], {}];
      Object.entries(data).forEach(([key, value]) => {
        console.log(key, value);
        if (!fields.includes(key)) delete data[key];
        if (badValue.includes(value)) delete data[key];
      });
      console.log(data);
      const result = await userModel.updateOne({ _id: userID }, { $set: data });
      if (result.modifiedCount > 0) {
        return res.status(200).json({
          status: 200,
          success: true,
          message: "Update was Successful",
        });
      }
      throw { status: 400, message: "Update was Unsuccessed..." };
    } catch (error) {
      next(error);
    }
  }
  async UploadProfileImage(req, res, next) {
    try {
      console.log(req.file);
      const userID = req.user._id;
      const filePath = req.file?.path.substring(7);
      const result = await userModel.updateOne(
        { _id: userID },
        { $set: { profile_image: filePath } }
      );
      if (result.modifiedCount == 0)
        throw { status: 400, message: "Update failed" };
      return res.status(200).json({
        status: 200,
        success: true,
        message: "Update done!",
      });
    } catch (error) {
      next(error);
    }
  }
  addSkills() {}
  editeSkills() {}
  acceptInivitationInTeam() {}
  rejectInivitationFromTeam() {}
}
module.exports = { userController: new userController() };
