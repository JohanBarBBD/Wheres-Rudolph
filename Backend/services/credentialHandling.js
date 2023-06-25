const hashAlgo = require("crypto-js");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

function DecodeToken(token) {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
};

function generateJWT(data){
  return jwt.sign(data, process.env.JWT_SECRET);
};

function authenticateJWT(JWT){
  return jwt.verify(jwt,process.env.JWT_SECRET);
};

module.exports = {
  Hashpassword,
  DecodeToken,
  generateJWT,
  authenticateJWT
};