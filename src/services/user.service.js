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
        },
      });

      return await user;
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
          username: true,
          email: true,
        },
      });

      return await user;
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

      return await user;
    } catch (error) {
      throw error;
    }
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

      return await user;
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

      return await newUser;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserService();
