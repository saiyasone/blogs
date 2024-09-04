const db = require("../configs/db.config");

class TagService {
  async getAllTags() {
    const response = await db.tags.findMany({
      where: {
        isDelete: "no",
      },
    });
    return await response;
  }

  async getTagById({ tagId }) {
    const response = await db.tags.findFirst({
      where: {
        AND: [{ isDelete: "no" }, { id: tagId }],
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

  async updateTag({ tagId, data }) {
    const response = await db.tags.update({
      where: {
        id: tagId,
      },
      data: {
        ...data,
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
      select: {
        id: true,
      },
      data: {
        isDelete: "yes",
      },
    });
  }
}

module.exports = new TagService();
