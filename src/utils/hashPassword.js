const bcrypt = require("bcryptjs");

const encryptedPassword = async (password) => {
  const hashPassword = await bcrypt.hashSync(password, 12);
  return hashPassword;
};

const decryptedPassword = (currentPassword, enterPassword) => {
  const isMatch = bcrypt.compareSync(enterPassword, currentPassword);
  return isMatch;
};

module.exports = { encryptedPassword, decryptedPassword };
