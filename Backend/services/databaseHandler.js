const sql = require('mssql');

class LeaderboardEntry {
  constructor (username, highscore) {
    this.username = username;
    this.highscore = highscore;
  }
}

async function newUserInfo (db, username) {
  try {
    const query = `INSERT INTO UserInfo (Username, HighScore) VALUES (@username, 0);`;
    const request = new db.Request();
    request.input('username', db.VarChar, username);

    const result = request.query(query);
  }
  catch (error) {
    console.error('Error: ', error.message);
  }
}

async function insertScore (db, time, username) {
  try {
    const query = 'UPDATE UserInfo SET HighScore = @time WHERE Username = @username;';
    const request = new db.Request();
    request.input('time', db.Int, time);
    request.input('username', db.VarChar, username);

    const result = request.query(query);
  }
  catch (error) {
    console.error('Error: ', error.message);
  }
};

async function getLeaderboard (db) {
  try {
    const query = 'SELECT TOP 15 Username, HighScore FROM [dbo].[UserInfo] ORDER BY HighScore';
    const request = new db.Request();

    const result = await request.query(query);

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
  newUserInfo,
  insertScore,
  getLeaderboard,
};