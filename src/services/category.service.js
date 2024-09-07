const db = require("../configs/db.config");

class CategoryService {
  async getAllCategory() {
    const response = await db.categories.findMany({
      where: {
        isDelete: "no",
      },
    });
    return await response;
  }

  async getCategoryById({ categoryId }) {
    const response = await db.categories.findFirst({
      where: {
        AND: [{ isDelete: "no" }, { id: categoryId }],
      },
    });

    return await response;
  }

  async createCategory(data) {
    const response = await db.categories.create({
      data: {
        ...data,
      },
      select: {
        id: true,
      },
    });

    return await response;
  }

  async updateCategory({ categoryId, name }) {
    const response = await db.categories.update({
      where: {
        id: categoryId,
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

  async deleteCategory({ categoryId }) {
    return await db.categories.update({
      where: {
        id: categoryId,
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

module.exports = new CategoryService();
