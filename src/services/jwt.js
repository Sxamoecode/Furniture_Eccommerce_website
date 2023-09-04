const User = require('../models/User.model')
const JWT = require("jsonwebtoken");
const JWTSecret = process.env.JWT_SECRET;

exports.myToken = function(payload) {
  token = JWT.sign(payload, JWTSecret)
  return token;
}