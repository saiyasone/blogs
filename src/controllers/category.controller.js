const categoryService = require("../services/category.service");
const { logError } = require("../utils/logs");
const responseHandler = require("../utils/responseHandler");

const getAllCategories = async (req, res) => {
  try {
    const response = await categoryService.getAllCategory();

    responseHandler.ok(res, response);
  } catch (error) {
    logError(error, "get all post");
    responseHandler.error(res, error);
  }
};

const getCategory = async (req, res) => {
  const { id: categoryId } = req.params;
  try {
    const response = await categoryService.getCategoryById({ categoryId });

    responseHandler.ok(res, response);
  } catch (error) {
    logError(error, "get category by id");
    responseHandler.error(res, error);
  }
};

const createCategory = async (req, res) => {
  const dataCategory = req.body;
  try {
    const response = await categoryService.createCategory(dataCategory);

    responseHandler.created(res, {
      id: response.id,
      message: "category is created",
    });
  } catch (error) {
    logError(error, "create category");
    responseHandler.error(res, error);
  }
};

const updateCategory = async (req, res) => {
  const { categoryId, name } = req.body;
  try {
    const checkData = await categoryService.getCategoryById({
      categoryId,
    });

    if (!checkData) {
      return responseHandler.noContent(res, "No category found");
    }

    const result = await categoryService.updateCategory({
      categoryId,
      name,
    });

    responseHandler.created(res, {
      id: result.id,
      message: "category is updated",
    });
  } catch (error) {
    logError(error, "update category");
    responseHandler.error(res, error);
  }
};

const deleteCategory = async (req, res) => {
  const { categoryId } = req.body;
  try {
    const checkData = await categoryService.getCategoryById({
      categoryId,
    });
    if (!checkData) {
      return responseHandler.notfound(res, "category is not found");
    }

    await categoryService.deleteCategory({ categoryId });

    responseHandler.updated(res, {
      message: "category is deleted",
    });
  } catch (error) {
    logError(error, "delete category failed");
    responseHandler.error(res, error);
  }
};

module.exports = {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
