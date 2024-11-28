const commentService = require("../services/comment.service");
const { logError } = require("../utils/logs");
const responseHandler = require("../utils/responseHandler");

const getCommentByPost = async (req, res) => {
  const { postId } = req.params;
  const { limit } = req.query;

  let limitData = "";
  if (limit) {
    limitData = limit;
  }
  const take = parseInt(limitData) || 5;

  try {
    const checkPost = await commentService.checkCommentPost({ postId });
    if (!checkPost) {
      return responseHandler.notfound(res, "Post not found");
    }

    const total = await commentService.getCountPostComment({ postId });
    const response = await commentService.getCommentByPost({
      postId,
      take,
    });

    responseHandler.ok(res, { total, data: response });
  } catch (error) {
    logError(error, "get comment by post");
    responseHandler.error(res, error);
  }
};

const createComment = async (req, res) => {
  const { id: userId } = req.user;
  const { postId, content } = req.body;

  try {
    const checkPost = await commentService.checkCommentPost({ postId });
    if (!checkPost) {
      return responseHandler.notfound(res, "Post not found");
    }

    const response = await commentService.createComment({
      postId,
      authorId: userId,
      content,
    });

    responseHandler.created(res, {
      id: response.id,
      message: "Comment is created",
    });
  } catch (error) {
    logError(error, "create comment");
    responseHandler.error(res, error);
  }
};

const updateComment = async (req, res) => {
  const { id: userId } = req.user;
  const { postId, content, commentId } = req.body;

  const checkPost = await commentService.getCommentOwner({
    postId,
    userId,
    commentId,
  });

  if (!checkPost) {
    return responseHandler.notfound(res, "Comment is not found");
  }

  try {
    await commentService.updateComment({
      commentId,
      postId,
      content,
      authorId: userId,
    });

    responseHandler.updated(res, {
      id: commentId,
      message: "Comment is updated",
    });
  } catch (error) {
    logError(error, "update comment");
    responseHandler.error(res, error);
  }
};

module.exports = {
  getCommentByPost,

  createComment,
  updateComment,
};
