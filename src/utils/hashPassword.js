const bcrypt = require("bcryptjs");

const encryptedPassword = async (password) => {
  const hashPassword = await bcrypt.hashSync(password, 12);
  return hashPassword;
};

const decryptedPassword = (oldPassword, enterPassword) => {
  const isMatch = bcrypt.compareSync(enterPassword, oldPassword);
  return isMatch;
};

module.exports = { encryptedPassword, decryptedPassword };
