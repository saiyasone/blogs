const yup = require("yup");

const loginSchema = yup.object({
  body: yup.object({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  }),
});

const registerSchema = yup.object().shape({
  body: yup.object({
    email: yup.string().required("Email is required").email("Email is invalid"),
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  }),
});

module.exports = {
  loginSchema,
  registerSchema,
};
