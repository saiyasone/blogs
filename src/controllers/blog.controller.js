const postService = require("../services/post.service");
const responseHandler = require("../utils/responseHandler");

const getAllPosts = async (req, res) => {
  const dataQuery = req.query;

  let title = "";
  let author = "";
  let limit = 5;

  if (!!dataQuery?.title) {
    title = dataQuery.title;
  }
  if (!!dataQuery?.author) {
    author = dataQuery.author;
  }
  if (!!dataQuery?.limit) {
    limit = parseInt(dataQuery.limit);
  }

  const query = {
    title,
    author,
    limit,
  };

  try {
    const total = await postService.getTotalPost();
    const result = await postService.getAllPosts({ query });

    responseHandler.ok(res, { total, data: result });
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

const getUserPost = async (req, res) => {
  const query = req.query;
  const limit = parseInt(query?.limit) || 10;
  const title = query?.title || "";
  const status = query?.status || "";
  const username = query?.username || "";
  const usernameSplit = username.split("@")[1];
  const search = {
    title,
    status,
  };

  try {
    const result = await postService.getPostByUserId({
      username: usernameSplit,
      limit,
      search,
    }); 

    responseHandler.ok(res, result);
  } catch (error) {
    console.log({ error });
    responseHandler.error(res, error);
  }
};

const createPost = async (req, res) => {
  const { id: userId } = req.user;

  try {
    const data = {
      ...req.body,
      tagIds: req.body.tagIds || [],
    };

    const result = await postService.createPost({ userId, data });

    responseHandler.created(res, {
      id: result.id,
      message: "post is created",
    });
  } catch (error) {
    console.log({ error });
    responseHandler.error(res, error);
  }
};

const createLikePost = async (req, res) => {
  const { postId, userId } = req.body;

  try {
    const checkPost = await postService.checkPostByOwnerId({
      postId,
      userId,
    });
    if (!checkPost) {
      return responseHandler.forbidden(
        res,
        "This post does not belong to owner"
      );
    }

    console.log(checkPost);

    const response = await postService.updatePost({
      postId,
      data: {
        like: checkPost.like + 1,
      },
    });

    responseHandler.created(res, {
      id: response.id,
      message: "like is updated",
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
    const checkPost = await postService.checkPostByOwnerId({
      postId: id,
      userId,
    });
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
      tagIds: req.body.tagIds || [],
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
    const checkPost = await postService.checkPostByOwnerId({
      postId: id,
      userId,
    });
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
  getUserPost,

  createPost,
  createLikePost,
  updatePost,
  deletePost,
};
