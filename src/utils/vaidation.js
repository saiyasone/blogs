const { validation } = require("./responseHandler");

const dataValidate = (schema) => async (req, res, next) => {
  try {
    await schema.validate({
      body: req.body,
    });

    return next();
  } catch (error) {
    console.log(error?.errors);
    validation(res, error?.message || "Something went wrong");
  }
};

module.exports = {
  dataValidate,
};
