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

    console.log(result.recordset.length);
    return result.recordset.length > 0;
  }
  catch (error) {
    console.error('Error: ', error.message);
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
    console.error('Error: ', error.message);
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
    console.error('Error: ', error.message);
  }
};

async function getLeaderboard () {
  try {
    await sql.connect({
      ...config,
      trustServerCertificate: true,
    })

    const query = 'SELECT TOP 15 Username, HighScore FROM [dbo].[UserInfo] ORDER BY HighScore';
    const request = new sql.Request();

    const result = await request.query(query);

    await sql.close();

    const leaderboard = result.recordset.map(row => {
      return new LeaderboardEntry(row.Username, row.HighScore);
    });

    return leaderboard
  }
  catch (error) {
    console.error('Error: ', error.message);
  }
};

module.exports = {
  userExists,
  newUserInfo,
  insertScore,
  getLeaderboard,
};