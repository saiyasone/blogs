const responseHandler = require("../utils/responseHandler");

const getAllCategorys = async (req, res) => {
  try {
  } catch (error) {
    console.log({ error });
    responseHandler.error(res, error);
  }
};

const getCategory = async (req, res) => {
  try {
  } catch (error) {
    console.log({ error });
    responseHandler.error(res, error);
  }
};

const createCategory = async (req, res) => {
  try {
  } catch (error) {
    console.log({ error });
    responseHandler.error(res, error);
  }
};

const updateCategory = async (req, res) => {
  try {
  } catch (error) {
    console.log({ error });
    responseHandler.error(res, error);
  }
};

const deleteCategory = async (req, res) => {
  try {
  } catch (error) {
    console.log({ error });
    responseHandler.error(res, error);
  }
};

module.exports = {
  getAllCategorys,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
