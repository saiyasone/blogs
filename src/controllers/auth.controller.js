const userService = require("../services/user.service");
const {
  encryptedPassword,
  decryptedPassword,
} = require("../utils/hashPassword");
const { jwtSign } = require("../utils/jwtToken");
const responseHandler = require("../utils/responseHandler");

const Register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userCheck = await userService.checkUserExistByUsername({ username });
    if (userCheck) {
      return responseHandler.unauthorize(res, "Username already exists");
    }

    const emailCheck = await userService.checkUserExistByEmail({ email });
    if (emailCheck) {
      return responseHandler.unauthorize(res, "Username already exists");
    }

    const hashPassword = await encryptedPassword(password);
    if (!hashPassword) {
      return responseHandler.error(res, "Something went wrong");
    }

    const user = await userService.createUser({
      username,
      email,
      password: hashPassword,
      bio: "",
    });

    return responseHandler.created(res, {
      id: user.id,
      message: "user is created",
    });
  } catch (error) {
    console.log({ error });
    responseHandler.error(res, error);
  }
};

const Login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const checkUser = await userService.checkUserExistByUsername({
      username,
    });

    if (!checkUser) {
      responseHandler.unauthorize(res, "User not found");
      return;
    }

    const isMatch = await decryptedPassword(checkUser.password, password);
    if (!isMatch) {
      responseHandler.unauthorize(res, "Username or password is not correct");
      return;
    }

    const user = await userService.getUserById({ userId: checkUser.id });
    const accessToken = await jwtSign(user);

    responseHandler.ok(res, {
      accessToken,
    });
  } catch (error) {
    console.log({ error });
    responseHandler.error(res, error);
  }
};

const GoogleSignIn = async (req, res) => {
  try {
    if (!req.user) {
      return responseHandler.notfound(
        res,
        "Sign in with google account is failed"
      );
    }

    responseHandler.created(res, {
      user: req.user?.profile,
      accessToken: req.user.accessToken,
    });
  } catch (error) {
    console.log({ error });
    responseHandler.error(res, error);
  }
};

module.exports = {
  Login,
  Register,

  GoogleSignIn,
};
