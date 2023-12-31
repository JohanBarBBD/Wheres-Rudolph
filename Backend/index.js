
const {getLeaderboard, userExists, getUserScore, insertScore, newUserInfo} = require('./services/databaseHandler')
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyparser = require('body-parser');

const app = express();
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(bodyparser.json());

//middleware for authentication.
function authenticateUser(req, res, next){
  const authorizationHeader = req.headers["authorization"];
  const token = authorizationHeader && authorizationHeader.split(' ')[1];
  if(token == null){
    return res.status(401).json({error: "Not authorized"});
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if(err) return res.status(403).json({ error: "NAUGHTY FORBIDDEN"});
    req.user = decoded;
    next();
  });
}

app.get("/leaderboard", cors(corsOptions), authenticateUser,async function(req, res, next){
  
  try{
    const response = await getLeaderboard();
    res.status(200).send(response);
  }catch(err){
    res.status(500).send("SORRY SOMETHING BROKE")
  }
});

app.get("/score", authenticateUser, async function(req,res){
  try{
    const result = await getUserScore(req.user.username);
    res.json(result);
  }catch(err){
    res.status(500).send("Technical error try again later");
  }
});

app.post("/login", async function(req, res){

  try{
    const doesUserExist = await userExists(req.body?.username);
    if(!doesUserExist){
      const addNewUser = await newUserInfo(req.body?.username);
      
      res.status(200).json({message: "added user"});
    }else{
      res.status(200).json({message: "exists"});
    }
  }catch(err){
    res.status(500).send("Technical error try again later");
  }
});


app.put("/score", authenticateUser, async function(req, res){
  try{
    const score = req.body?.score;

    const currentHighscore = await getUserScore(req.user.username);

    if(currentHighscore.HighScore > score || !currentHighscore.HighScore){
      const result = await insertScore(req.user.username, score);
      res.status(202).send(result);
    }else{
      res.status(304).send('score is not the highest');
    }
  }catch(err){
    res.status(500).send("Technical error please try again later");
  }
});

const server = app.listen(process.env.PORT || 8080, function () {
  const port = server.address().port;
  console.log("Application running on port: ", port);
});