const JWT = require("jsonwebtoken");
const Users = require('../../models/User.model');
const Token = require('../../models/Token.model');
const sendEmail = require("../../utils/email/sendEmail");
const crypto = require("crypto");
const {hashit, compare} = require('../bcrypt')
require('dotenv').config();

const clientURL = process.env.CLIENT_URL;

const requestPasswordReset = async (email) => {
  const user = await Users.findOne({ email });
  if (!user) {
    console.log("Email does not exist");
    return false;
};

  let token = await Token.findOne({ userId: user._id });
  if (token) await token.deleteOne();

  let resetToken = crypto.randomBytes(32).toString("hex");
  const hash = hashit(resetToken);

  await new Token({
    userId: user._id,
    token: hash,
    createdAt: Date.now(),
  }).save();

  const link = `${clientURL}/passwordReset?token=${resetToken}&id=${user._id}`;

  sendEmail(
    user.email,
    "Password Reset Request",
    {
      name: user.firstName +' '+ user.lastName,
      link: link,
    },
  );
  return { link };
};

const resetPassword = async (userId, token, password) => {
  console.log(userId);
  let passwordResetToken = await Token.findOne({ userId });

  if (!passwordResetToken) {
    throw new Error("Invalid or expired password reset token");
    return false;
  }

  console.log(passwordResetToken.token, token);

  const isValid = await compare(token, passwordResetToken.token);

  if (!isValid) {
    throw new Error("Invalid or expired password reset token");
  }

  const hash = await hashit(password);

  await Users.updateOne(
    { _id: userId },
    { $set: { password: hash } },
    { new: true }
  );

  const user = await Users.findById({ _id: userId });

  sendEmail(
    user.email,
    "Password Reset Successfully",
    {
      name: user.firstName +' '+ user.lastName,
      Msg: "Password Reset Successfully"
    }
  );

  await passwordResetToken.deleteOne();

  return { message: "Password reset was successful" };
};

module.exports = {
  requestPasswordReset,
  resetPassword,
};