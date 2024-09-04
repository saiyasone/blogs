const db = require("../configs/db.config");

const selectModel = {
  id: true,
  title: true,
  content: true,
  updated_at: true,
  published_at: true,
  author: {
    select: {
      firstName: true,
      lastName: true,
      email: true,
    },
  },
};

class PostService {
  async getAllPosts() {
    const response = await db.posts.findMany({
      where: {
        isDelete: "no",
      },
      select: {
        ...selectModel,
      },
    });

    return await response;
  }

  async getPostById({ postId }) {
    const response = await db.posts.findFirst({
      where: {
        AND: [
          {
            id: postId,
          },
          {
            isDelete: "no",
          },
        ],
      },
      select: {
        ...selectModel,
      },
    });

    return await response;
  }

  async checkPostId({ postId, userId }) {
    const response = await db.posts.findFirst({
      where: {
        AND: [
          {
            isDelete: "no",
          },
          {
            id: postId,
          },
          {
            author_id: userId,
          },
        ],
      },
      select: {
        id: true,
        status: true,
      },
    });

    return await response;
  }

  async createPost({ userId, data }) {
    const newPost = await db.posts.create({
      data: {
        author_id: userId,
        ...data,
      },
      select: {
        id: true,
      },
    });

    return await newPost;
  }

  async updatePost({ postId, data }) {
    const updatePost = await db.posts.update({
      where: {
        id: postId,
      },
      data: {
        ...data,
      },
      select: {
        id: true,
      },
    });

    return await updatePost;
  }

  async deletePost({ postId }) {
    return await db.posts.update({
      where: {
        id: postId,
      },
      data: {
        isDelete: "yes",
      },
      select: {
        id: true,
      },
    });
  }
}

module.exports = new PostService();
