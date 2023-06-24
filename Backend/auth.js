const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateJWT(data){
  return jwt.sign(data, process.env.JWT_SECRET, {expiresIn: process.env.TOKEN_EXPIRATION});
};

function createRefreshToken(data){
  return jwt.sign(data, process.env.JWT_REFRESH_SECRET, {expiresIn: process.env.TOKEN_EXPIRATION});
}