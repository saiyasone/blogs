const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const db = require("../configs/db.config");

class UserService {
  async getUserLogin({ userId }) {
    try {
      const user = await db.users.findFirst({
        where: {
          AND: [
            {
              id: userId,
            },
            {
              isDelete: "no",
            },
          ],
        },
        select: {
          id: true,
          username: true,
          email: true,
          firstName: true,
          lastName: true,
          bio: true,
          profile_picture: true,
          original_picture: true,
        },
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserById({ userId }) {
    try {
      const user = await db.users.findFirst({
        where: {
          AND: [
            {
              id: userId,
            },
            {
              isDelete: "no",
            },
          ],
        },
        select: {
          id: true,
          password: true,
        },
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  async checkUserExistByEmail({ email }) {
    try {
      const user = await db.users.findFirst({
        where: {
          AND: [
            {
              isDelete: "no",
            },
            {
              email,
            },
          ],
        },
        select: {
          id: true,
          email: true,
          password: true,
        },
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  async getPublicUser({ username }) {
    const res = await db.users.findFirst({
      where: {
        AND: [
          {
            isDelete: "no",
          },
          {
            username,
          },
        ],
      },
    });

    return await res;
  }

  async checkUserExistByUsername({ username }) {
    try {
      const user = await db.users.findFirst({
        select: {
          id: true,
          username: true,
          password: true,
        },
        where: {
          AND: [
            {
              isDelete: "no",
            },
            {
              username,
            },
          ],
        },
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  async createUser({ username, email, password, bio }) {
    try {
      const newUser = await db.users.create({
        select: {
          id: true,
        },
        data: {
          username,
          email,
          password,
          bio,
        },
      });

      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async updateUser({ userId, firstName, lastName, bio }) {
    const res = await db.users.update({
      where: {
        id: userId,
      },
      data: {
        bio,
        firstName,
        lastName,
      },
      select: {
        id: true,
      },
    });

    return await res;
  }

  async updatePassword({ password, userId }) {
    const res = await db.users.update({
      where: {
        id: userId,
      },
      data: {
        password,
      },
      select: {
        id: true,
      },
    });

    return await res;
  }

  async updateUserProfile({ userId, image, original }) {
    const res = await db.users.update({
      where: {
        id: userId,
      },
      data: {
        profile_picture: image,
        original_picture: original,
      },
      select: {
        id: true,
      },
    });

    return await res;
  }
}

module.exports = new UserService();
