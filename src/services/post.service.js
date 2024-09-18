const db = require("../configs/db.config");

const selectModel = {
  id: true,
  title: true,
  content: true,
  status: true,
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
};

class PostService {
  async getTotalPost() {
    const res = await db.posts.count({
      where: {
        isDelete: "no",
      },
    });

    return res;
  }

  async getAllPosts({ query }) {
    const response = await db.posts.findMany({
      take: query.limit,
      where: {
        isDelete: "no",

        AND: [
          {
            title: {
              contains: query.title,
            },
          },
          {
            author: {
              OR: [
                {
                  firstName: {
                    contains: query.author,
                  },
                },
                {
                  lastName: {
                    contains: query.author,
                  },
                },
              ],
            },
          },
        ],
      },
      select: {
        ...selectModel,
      },
    });

    return await response;
  }

  async getPostByUserId({ username, limit, search }) {
    const response = await db.posts.findMany({
      where: {
        AND: [
          {
            isDelete: "no",
          },
          {
            author: {
              username,
            },
          },
          {
            AND: [
              {
                title: {
                  contains: search.title,
                },
              },
              {
                status: {
                  equals: search.status || "draft",
                },
              },
            ],
          },
        ],
      },
      take: limit,
      select: {
        ...selectModel,
        author: {
          select: {
            ...selectModel.author.select,
            username: true,
            profile_picture: true,
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
        author: {
          select: { ...selectModel.author.select, username: true },
        },
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
        AND: [
          {
            id: postId,
          },
          {},
        ],
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
