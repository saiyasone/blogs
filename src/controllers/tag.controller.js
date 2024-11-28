const tagService = require("../services/tag.service");
const { logError } = require("../utils/logs");
const responseHandler = require("../utils/responseHandler");

const getAllTags = async (req, res) => {
  try {
    const response = await tagService.getAllTags();
    responseHandler.ok(res, response);
  } catch (error) {
    logError(error, "get all tags failed");
    responseHandler.error(res, error);
  }
};

const getTag = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await tagService.getTagById({ tagId: id });
    responseHandler.ok(res, response);
  } catch (error) {
    logError(error, "get tag by id");
    responseHandler.error(res, error);
  }
};

const createTag = async (req, res) => {
  try {
    const response = await tagService.createTag(req.body);
    responseHandler.created(res, {
      id: response.id,
      message: "tag created",
    });
  } catch (error) {
    logError(error, "create tag failed");
    responseHandler.error(res, error);
  }
};

const updateTag = async (req, res) => {
  const { id: tagId, name } = req.body;
  try {
    const checkTag = await tagService.getTagById({ tagId });
    if (!checkTag) {
      return responseHandler.notfound(res, "Tag not found");
    }

    const response = await tagService.updateTag({
      tagId,
      name,
    });

    responseHandler.updated(res, {
      id: response.id,
      message: "tag updated",
    });
  } catch (error) {
    logError(error, "update tag");
    responseHandler.error(res, error);
  }
};

const deleteTag = async (req, res) => {
  const { tagId } = req.body;

  try {
    const checkTag = await tagService.getTagById({ tagId });
    if (!checkTag) {
      return responseHandler.notfound(res, "Tag not found");
    }

    await tagService.deleteTag({ tagId });

    responseHandler.created(res, {
      message: "tag deleted",
    });
  } catch (error) {
    logError(error, "delete tag failed");
    responseHandler.error(res, error);
  }
};

module.exports = { getAllTags, getTag, createTag, updateTag, deleteTag };
