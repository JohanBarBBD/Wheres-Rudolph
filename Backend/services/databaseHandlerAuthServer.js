const sql = require('mssql');
require('dotenv').config();
const crypto = require('crypto');
const { json } = require( 'body-parser' );


const config = {
  server: process.env.HOST,
  port: parseInt(process.env.DBPORT),
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE_AUTH,
}; 

async function userExists (username) {
  try {
    await sql.connect({
      ...config,
      trustServerCertificate: true,
    })
    const query = `SELECT Username from UserLogin WHERE Username = @username`;
    const request = new sql.Request();
    request.input('username', sql.VarChar, username);

    const result = await request.query(query);

    await sql.close();

    return result.recordset.length > 0;
  }
  catch (error) {
    throw error;
  }
}

async function registerUser (username, hashedPass, salt, firstName, lastName) {
  try {
    await sql.connect({
      ...config,
      trustServerCertificate: true,
    })
    const request = new sql.Request();
    request.input('Username', sql.VarChar, username);
    request.input('PasswordHash', sql.VarChar, hashedPass);
    request.input('PasswordSalt', sql.VarChar, salt);
    request.input('FirstName', sql.VarChar, firstName);
    request.input('LastName', sql.VarChar, lastName);
    
    console.log(request);
    const result = await request.execute('RegisterNewUser');
    console.log(result);
    await sql.close();
    return result.recordset
  }
  catch (error) {
    throw error;
  }
}

async function getUserData (username) {
  try {
    await sql.connect({
      ...config,
      trustServerCertificate: true,
    })
    const query = `SELECT * from UserLogin WHERE Username = @username`;
    const request = new sql.Request();
    request.input('username', sql.VarChar, username);

    const result = await request.query(query);

    await sql.close();
    return result.recordset[0];
  }
  catch (error) {
    throw error;
  }
}

async function getUserNames (id) {
  try {
    await sql.connect({
      ...config,
      trustServerCertificate: true,
    })
    const query = `SELECT * from UserInformation WHERE UserLoginId = @id`;
    const request = new sql.Request();
    request.input('id', sql.Int, id);

    const result = await request.query(query);

    await sql.close();
    return result.recordset[0];
  }
  catch (error) {
    throw error;
  }
}
module.exports = {
  userExists,
  registerUser,
  getUserData,
  getUserNames
};