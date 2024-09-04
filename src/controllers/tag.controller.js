const tagService = require("../services/tag.service");
const responseHandler = require("../utils/responseHandler");

const getAllTags = async (req, res) => {
  try {
    const response = await tagService.getAllTags();
    responseHandler.ok(res, response);
  } catch (error) {
    console.log({ error });
    responseHandler.error(res, error);
  }
};

const getTag = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await tagService.getTagById({ tagId: id });
    responseHandler.ok(res, response);
  } catch (error) {
    console.log({ error });
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
    console.log({ error });
    responseHandler.error(res, error);
  }
};

const updateTag = async (req, res) => {
  try {
    const response = await tagService.createTag(req.body);

    responseHandler.updated(res, {
      id: response.id,
      message: "tag updated",
    });
  } catch (error) {
    console.log({ error });
    responseHandler.error(res, error);
  }
};

const deleteTag = async (req, res) => {
  const { tagId } = req.body;
  try {
    await tagService.deleteTag({ tagId });

    responseHandler.created(res, {
      message: "tag deleted",
    });
  } catch (error) {
    console.log({ error });
    responseHandler.error(res, error);
  }
};

module.exports = { getAllTags, getTag, createTag, updateTag, deleteTag };
