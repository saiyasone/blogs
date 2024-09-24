const FirebaseProvider = require("../providers/firebase.provider");
const postService = require("../services/post.service");
const userService = require("../services/user.service");
const responseHandler = require("../utils/responseHandler");

const upload = async (req, res) => {
  const { id: userId } = req.user;
  const { path, postId } = req.body;
  const file = req.file;

  if (!file) {
    return responseHandler.badrequest(res, "File is required");
  }

  try {
    const newFile = await FirebaseProvider.uploadToFirebase({
      path,
      dataFile: file,
    });
    if (newFile.imageUrl) {
      if (path === "profile") {
        const response = await userService.updateUserProfile({
          userId,
          image: newFile.imageUrl,
          original: newFile.newName,
        });

        if (response.id) {
          responseHandler.created(res, {
            message: "upload file successfully",
          });
        }
      }

      if (path === "blog") {
        await postService.updatePostImage({
          postId,
          imageUrl: newFile.imageUrl,
          original: newFile.newName,
        });

        responseHandler.created(res, {
          message: "upload file successfully",
        });
      }
    }
  } catch (error) {
    console.log("Upload errors", error);
    responseHandler.error(res, error);
  }
};

const deleteFile = async (req, res) => {
  const { image, path } = req.body;

  try {
    await FirebaseProvider.deleteFile({
      filename: image,
      path,
    });

    responseHandler.updated(res, {
      message: "File is deleted",
    });
  } catch (error) {
    console.log("delete errors", error);
    responseHandler.error(res, error);
  }
};

module.exports = {
  upload,
  deleteFile,
};
