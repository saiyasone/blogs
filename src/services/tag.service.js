const db = require("../configs/db.config");

const selectModel = {
  id: true,
  name: true,
};

class TagService {
  async getAllTags() {
    const response = await db.tags.findMany({
      where: {
        isDelete: "no",
      },
      select: {
        ...selectModel,
      },
    });
    return await response;
  }

  async getTagById({ tagId }) {
    const response = await db.tags.findFirst({
      where: {
        AND: [{ isDelete: "no" }, { id: tagId }],
      },
      select: {
        ...selectModel,
      },
    });

    return await response;
  }

  async createTag(data) {
    const response = await db.tags.create({
      data: {
        ...data,
      },
      select: {
        id: true,
      },
    });

    return await response;
  }

  async updateTag({ tagId, name }) {
    const response = await db.tags.update({
      where: {
        id: tagId,
      },
      data: {
        name,
      },
      select: {
        id: true,
      },
    });

    return await response;
  }

  async deleteTag({ tagId }) {
    return await db.tags.update({
      where: {
        id: tagId,
      },

      data: {
        isDelete: "yes",
      },
    });
  }
}

module.exports = new TagService();
