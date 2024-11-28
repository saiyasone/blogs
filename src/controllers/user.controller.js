const userService = require("../services/user.service");
const responseHandler = require("../utils/responseHandler");

const UserLogin = async (req, res) => {
  const { id: userId } = req.user;
  try {
    const user = await userService.getUserLogin({ userId });
    if (!user) return responseHandler.unauthorize(res, "Unthorized this user");

    responseHandler.ok(res, user);
  } catch (error) {
    responseHandler.error(res, error);
  }
};

const getPulicUser = async (req, res) => {
  const { username } = req.query;

  try {
    const userSplit = username?.split("@")[1] || "";
    const response = await userService.getPublicUser({ username: userSplit });

    responseHandler.ok(res, response);
  } catch (error) {
    console.log({ publicUser: error });
    responseHandler.error(res, error);
  }
};

const updateProfile = async (req, res) => {
  const { id: userId } = req.user;

  try {
    const user = await userService.getUserById({ userId, isPassword: true });
    if (!user)
      return responseHandler.unauthorize(
        res,
        "User is not found or unauthorized"
      );

    const result = await userService.updateUser({
      userId,
      ...req.body,
    });

    responseHandler.updated(res, {
      id: result.id,
      message: "User is updated",
    });
  } catch (error) {
    responseHandler.error(res, error);
  }
};

module.exports = {
  getPulicUser,
  UserLogin,

  updateProfile,
};
