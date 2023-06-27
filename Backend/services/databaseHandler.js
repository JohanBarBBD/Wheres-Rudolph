const sql = require('mssql');
require('dotenv').config();

const config = {
  server: process.env.HOST,
  port: parseInt(process.env.DBPORT),
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
}; 

class LeaderboardEntry {
  constructor (username, highscore) {
    this.username = username;
    this.highscore = highscore;
  }
}

class SizeSetting {
  constructor (name, value) {
    this.SizeName = name;
    this.SizeValue = value;
  }
}

async function userExists (username) {
  try {
    await sql.connect({
      ...config,
      trustServerCertificate: true,
    })
    const query = `SELECT Username from UserInfo WHERE Username = @username`;
    const request = new sql.Request();
    request.input('username', sql.VarChar, username);

    const result = await request.query(query);

    await sql.close();

    return result.recordset.length > 0;
  }
  catch (error) {
    console.log(error);
  }
}

async function newUserInfo (username) {
  try {
    await sql.connect({
      ...config,
      trustServerCertificate: true,
    })
    const query = `INSERT INTO UserInfo (Username, HighScore) OUTPUT inserted.Username, inserted.HighScore VALUES (@username, 0);`;
    const request = new sql.Request();
    request.input('username', sql.VarChar, username);

    const result = await request.query(query);

    await sql.close();
    return new LeaderboardEntry(result.recordset[0].Username, result.recordset[0].HighScore);
  }
  catch (error) {
    throw error;
  }
}

async function insertScore (username, time) {
  try {
    await sql.connect({
      ...config,
      trustServerCertificate: true,
    })

    const query = 'UPDATE UserInfo SET HighScore = @time OUTPUT inserted.Username, inserted.HighScore WHERE Username = @username;';
    const request = new sql.Request();
    request.input('time', sql.Int, time);
    request.input('username', sql.VarChar, username);

    const result = await request.query(query);

    await sql.close();

    return new LeaderboardEntry(result.recordset[0].Username, result.recordset[0].HighScore);
  }
  catch (error) {
    throw error;
  }
};

async function getLeaderboard () {
  try {
    await sql.connect({
      ...config,
      trustServerCertificate: true,
    })

    const query = 'SELECT TOP 15 Username, HighScore FROM UserInfo WHERE HighScore > 0 ORDER BY HighScore ';
    const request = new sql.Request();

    const result = await request.query(query);

    await sql.close();

    const leaderboard = result.recordset.map(row => {
      return new LeaderboardEntry(row.Username, row.HighScore);
    });

    return leaderboard
  }
  catch (error) {
    throw error;
  }
};

async function getUserScore (username) {
  try {
    await sql.connect({
      ...config,
      trustServerCertificate: true,
    })
    const query = `SELECT HighScore from UserInfo WHERE Username = @username`;
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

async function getHead () {
  try {
    await sql.connect({
      ...config,
      trustServerCertificate: true,
    })

    const query = 'SELECT TOP 1 SizeName, SizeValue FROM HeadSizes INNER JOIN GlobalGameSettings ON HeadSizes.Id = GlobalGameSettings.HeadSizeId';
    const request = new sql.Request();

    const result = await request.query(query);

    await sql.close();

    const setting = new SizeSetting(result.recordset[0].SizeName, result.recordset[0].SizeValue);
    return setting;
  }
  catch (error) {
    throw error;
  }
};

async function giveHead (size) {
  try {
    await sql.connect({
      ...config,
      trustServerCertificate: true,
    })

    const query = 'UPDATE GlobalGameSettings SET HeadSizeId = (SELECT TOP 1 Id from HeadSizes WHERE SizeName = @size) OUTPUT inserted.HeadSizeId';
    const request = new sql.Request();
    request.input('size', sql.VarChar, size);

    const result = await request.query(query);

    await sql.close();

    return result.recordset[0].HeadSizeId;
  }
  catch (error) {
    throw error;
  }
};

module.exports = {
  userExists,
  newUserInfo,
  insertScore,
  getLeaderboard,
  getUserScore,
  getHead,
  giveHead,
};