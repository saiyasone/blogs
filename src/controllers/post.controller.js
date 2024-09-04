const postService = require("../services/post.service");
const responseHandler = require("../utils/responseHandler");

const getAllPosts = async (req, res) => {
  try {
    const result = await postService.getAllPosts();

    responseHandler.ok(res, result);
  } catch (error) {
    console.log({ error });
    responseHandler.error(res, error);
  }
};

const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await postService.getPostById({ postId: id });

    responseHandler.ok(res, result);
  } catch (error) {
    console.log({ error });
    responseHandler.error(res, error);
  }
};

const createPost = async (req, res) => {
  const { id: userId } = req.user;

  try {
    const result = await postService.createPost({ userId, data: req.body });

    responseHandler.created(res, {
      id: result.id,
      message: "post is created",
    });
  } catch (error) {
    console.log({ error });
    responseHandler.error(res, error);
  }
};

const updatePost = async (req, res) => {
  const { id: userId } = req.user;
  const { id, status } = req.body;

  try {
    const checkPost = await postService.checkPostId({ postId: id, userId });
    if (!checkPost) {
      return responseHandler.forbidden(
        res,
        "You dont' have permission to access this"
      );
    }

    let dataSatus = "";

    if (status === "draft") {
      dataSatus = "draft";
    } else if (status === "published") {
      dataSatus = "published";
    } else if (status === "scheduled") {
      dataSatus = "draft";
    } else {
      dataSatus = checkPost.status;
    }

    const data = {
      ...req.body,
      status: dataSatus,
    };

    await postService.updatePost({ postId: id, data });

    responseHandler.updated(res, {
      id: checkPost.id,
      message: "post is updated",
    });
  } catch (error) {
    console.log({ error });
    responseHandler.error(res, error);
  }
};

const deletePost = async (req, res) => {
  const { id: userId } = req.user;
  const { id } = req.body;

  try {
    const checkPost = await postService.checkPostId({ postId: id, userId });
    if (!checkPost) {
      return responseHandler.forbidden(
        res,
        "You dont' have permission to access this"
      );
    }

    await postService.deletePost({ postId: id });

    responseHandler.updated(res, {
      message: "post is deleted",
    });
  } catch (error) {
    console.log({ error });
    responseHandler.error(res, error);
  }
};

module.exports = {
  getAllPosts,
  getPost,

  createPost,
  updatePost,
  deletePost,
};
