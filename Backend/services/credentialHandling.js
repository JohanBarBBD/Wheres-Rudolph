const hashAlgo = require("crypto-js");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

function Hashpassword(password){
  const salt = crypto.randomBytes(32).toString("base64");
  
  crypto.pbkdf2(password + salt, salt, 512, 512/32, 'sha256', (err, derivedKey) => {
    if (err) throw err;
    return derivedKey.toString('base64');
  });

};

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