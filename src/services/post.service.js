const db = require("../configs/db.config");
const BlogStatus = require("../enums/blog-status.enum");
const DeleleteStatus = require("../enums/delete-status.enum");

const selectModel = {
  id: true,
  title: true,
  content: true,
  status: true,
  like: true,
  subtitle: true,
  imageUrl: true,
  updated_at: true,
  published_at: true,
  reads: true,
  author: {
    select: {
      id: true,
      firstName: true,
      lastName: true,
      profile_picture: true,
    },
  },
  Comments: {
    select: {
      id: true,
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
  async getTotalPost({ query }) {
    const res = await db.posts.count({
      where: {
        AND: [
          {
            isDelete: DeleleteStatus.NO,
          },
          {
            status: BlogStatus.PUBLISHED,
          },
          {
            title: {
              contains: query.title,
            },
          },
        ],
      },
    });

    return res;
  }

  async getAllPosts({ query }) {
    const response = await db.posts.findMany({
      take: query.limit,
      where: {
        isDelete: DeleleteStatus.NO,

        AND: [
          {
            title: {
              contains: query.title,
            },
          },
          {
            status: BlogStatus.PUBLISHED,
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
            isDelete: DeleleteStatus.NO,
          },
          {
            author: {
              username,
            },
          },
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
      take: limit,
      select: {
        id: true,
        title: true,
        subtitle: true,
        updated_at: true,
        published_at: true,
        reads: true,
        like: true,
        ...selectModel,
        author: {
          select: {
            ...selectModel.author.select,
            username: true,
            profile_picture: true,
          },
        },
        Post_Tag: false,
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
            isDelete: DeleleteStatus.NO,
          },
        ],
      },
      select: {
        ...selectModel,
        author: {
          select: { ...selectModel.author.select, username: true },
        },
        Comments: false,
      },
    });

    return await response;
  }

  async checkPostByOwnerId({ postId, userId }) {
    const response = await db.posts.findFirst({
      where: {
        AND: [
          {
            isDelete: DeleleteStatus.NO,
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

  async checkPostBeforeLike({ postId }) {
    const response = await db.posts.findFirst({
      where: {
        AND: [
          {
            isDelete: DeleleteStatus.NO,
          },
          {
            id: postId,
          },
        ],
      },
      select: {
        id: true,
        like: true,
        status: true,
        author_id: true,
      },
    });

    return await response;
  }

  async createPost({ userId, data }) {
    const newPost = await db.posts.create({
      data: {
        title: data.title,
        content: data.content,
        subtitle: data.description,
        status: data.status,
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
        title: data.title || undefined,
        content: data.content || undefined,
        subtitle: data.description || undefined,
        status: data.status,
        Post_Tag: {
          deleteMany: {},
          // create: data.tagIds?.map((tag) => ({
          //   tag_id: tag,
          // })),
          create: data.tagIds?.map((tagId) => ({
            tag: {
              connect: { id: tagId },
            },
          })),
        },
      },
      select: {
        id: true,
      },
    });

    return await updatePost;
  }

  async updatePostImage({ postId, imageUrl, original }) {
    const res = await db.posts.update({
      where: {
        id: postId,
      },
      data: {
        imageUrl,
        original,
      },
      select: {
        id: true,
      },
    });

    return res;
  }

  async updateLike({ postId, data }) {
    const updatePost = await db.posts.update({
      where: {
        id: postId,
      },
      data: {
        like: data.like,
      },
      select: {
        id: true,
      },
    });

    return await updatePost;
  }

  async deletePost({ postId }) {
    return await db.posts.update({
      data: {
        isDelete: DeleleteStatus.YES,
      },
      select: {
        id: true,
      },
      where: {
        id: postId,
      },
    });
  }
}

module.exports = new PostService();
