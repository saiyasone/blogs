const yup = require("yup");

const createBlogSchema = yup.object({
  body: yup.object({
    title: yup.string().required("Title is required"),
  }),
});

const updateBlogSchema = yup.object({
  body: yup.object({
    id: yup.string().required("ID is required"),
    title: yup.string().required("Title is required"),
  }),
});

module.exports = {
  createBlogSchema,
  updateBlogSchema,
};
