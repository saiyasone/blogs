const yup = require("yup");

const createCommentSchema = yup.object({
  body: yup.object({
    postId: yup.string().required("Post ID is required"),
    content: yup.string().required("Content is required"),
  }),
});

const updateCommentSchema = yup.object({
  body: yup.object({
    postId: yup.string().required("Post ID is required"),
    commentId: yup.string().required("Comment ID is required"),
    content: yup.string().required("Content is required"),
  }),
});

module.exports = {
  createCommentSchema,
  updateCommentSchema,
};
