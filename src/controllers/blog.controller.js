const postService = require("../services/post.service");
const { logError } = require("../utils/logs");
const responseHandler = require("../utils/responseHandler");

const getAllPosts = async (req, res) => {
  const dataQuery = req.query;

  let title = "";
  let author = "";
  let limit = 5;

  if (dataQuery?.title) {
    title = dataQuery.title;
  }
  if (dataQuery?.author) {
    author = dataQuery.author;
  }
  if (dataQuery?.limit) {
    limit = parseInt(dataQuery.limit);
  }

  const query = {
    title,
    author,
    limit,
  };

  try {
    const total = await postService.getTotalPost({ query });
    const result = await postService.getAllPosts({ query });

    responseHandler.ok(res, { total, data: result });
  } catch (error) {
    logError(error, "get all posts");
    responseHandler.error(res, error);
  }
};

const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await postService.getPostById({ postId: id });

    responseHandler.ok(res, result);
  } catch (error) {
    logError(error, "get post by id");
    responseHandler.error(res, error);
  }
};

const getUserPost = async (req, res) => {
  const query = req.query;
  const limit = parseInt(query?.limit) || 10;

  let title = "";
  if (query?.title) {
    title = query.title;
  }

  let status = "";
  if (query?.status) {
    status = query.status;
  }

  let search = "";
  if (query?.search) {
    search = query.search;
  }

  const username = query?.username || "";
  const usernameSplit = username.split("@")[1];
  const searchInput = {
    title,
    status,
    search,
  };

  try {
    if (!usernameSplit) {
      return responseHandler.ok(res, []);
    }

    const result = await postService.getPostByUserId({
      search: searchInput,
      username: usernameSplit,
      limit,
    });

    const finalResult = result.map((blog) => ({
      ...blog,
      total_comment: blog.Comments.length,
    }));

    responseHandler.ok(res, finalResult);
  } catch (error) {
    logError(error, "get post by user");
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
    logError(error, "create post");
    responseHandler.error(res, error);
  }
};

const createLikePost = async (req, res) => {
  const { postId } = req.body;
  const { id: userId } = req.user;

  try {
    const checkPost = await postService.checkPostBeforeLike({
      postId,
    });

    if (checkPost.author_id === userId) {
      return responseHandler.forbidden(res, "You can't like your post");
    }

    const data = {
      like: checkPost.like + 1,
    };
    const response = await postService.updateLike({
      postId,
      data,
    });

    responseHandler.created(res, {
      id: response.id,
      message: "like is updated",
    });
  } catch (error) {
    logError(error, "add like");
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

    let dataStatus = "";

    if (status === "draft") {
      dataStatus = "draft";
    } else if (status === "published") {
      dataStatus = "published";
    } else if (status === "scheduled") {
      dataStatus = "draft";
    } else {
      dataStatus = checkPost.status;
    }

    const data = {
      ...req.body,
      status: dataStatus,
      tagIds: req.body.tagIds || [],
    };

    await postService.updatePost({ postId: id, data });

    responseHandler.updated(res, {
      id: checkPost.id,
      message: "post is updated",
    });
  } catch (error) {
    logError(error, "update post");
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
    logError(error, "delete post");
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
