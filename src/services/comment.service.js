const db = require("../configs/db.config");

class CommentService {
  async checkCommentPost({ postId }) {
    const response = await db.posts.findFirst({
      where: {
        AND: [
          {
            isDelete: "no",
          },
          {
            id: postId,
          },
        ],
      },

      select: {
        id: true,
        author_id: true,
      },
    });
    return response;
  }

  async getAllCountComment() {
    const response = await db.comments.count({
      where: {
        isDelete: "no",
      },
    });

    return response;
  }

  async getCountPostComment({ postId }) {
    const response = await db.comments.count({
      where: {
        AND: [{ isDelete: "no" }, { post_id: postId }],
      },
    });

    return response;
  }

  // skip => offset
  // take => limit
  async getCommentByPost({ postId, take }) {
    const response = await db.comments.findMany({
      take,
      where: {
        AND: [
          {
            isDelete: "no",
          },
          {
            post_id: postId,
          },
        ],
      },

      select: {
        id: true,
        content: true,
        post_id: true,
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            profile_picture: true,
          },
        },
        updated_at: true,
      },
    });
    return response;
  }

  async getCommentOwner({ postId, userId, commentId }) {
    const response = await db.comments.findFirst({
      where: {
        AND: [
          {
            isDelete: "no",
          },
          {
            id: commentId,
          },
          {
            post_id: postId,
          },
          {
            author_id: userId,
          },
        ],
      },

      select: {
        id: true,
        content: true,
        author_id: true,
      },
    });
    return response;
  }

  async createComment({ authorId, postId, content }) {
    const res = await db.comments.create({
      data: {
        author_id: authorId,
        post_id: postId,
        content,
      },
      select: {
        id: true,
      },
    });

    return await res;
  }

  async updateComment({ commentId, postId, content, authorId }) {
    const res = await db.comments.update({
      where: {
        id: commentId,
        post_id: postId,
        author_id: authorId,
      },
      data: {
        content,
      },
      select: {
        id: true,
      },
    });

    return await res;
  }
}

module.exports = new CommentService();
