const db = require("../configs/db.config");

const selectModel = {
  id: true,
  title: true,
  content: true,
  like: true,
  updated_at: true,
  published_at: true,
  author: {
    select: {
      id: true,
      firstName: true,
      lastName: true,
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
        Post_Tag: {
          select: {
            tag: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
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

  async checkPostByOwnerId({ postId, userId }) {
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
        like: true,
      },
    });

    return await response;
  }

  async createPost({ userId, data }) {
    const newPost = await db.posts.create({
      data: {
        title: data.title,
        content: data.content,
        author_id: userId,
        Post_Tag: {
          createMany: {
            data: data.tagIds?.map((tag) => ({
              tag_id: tag,
            })),
          },
        },
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
        title: data.title,
        content: data.content,
        status: data.status,
        Post_Tag: {
          update: {
            data: data.tagIds?.map((tag) => ({
              tag_id: tag,
            })),
          },
        },
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
