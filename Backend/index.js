const https = require("https");
const fs = require("fs");
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


app.get('/testGitHubLogin', async function(req,res){
  try{
    const response = await fetch('https://github.com/login/oauth/authorize?' + new URLSearchParams({
      client_id: '49cb04e7c492a9b174dc',
      redirect_uri: 'http://localhost:3000/authenticateUser',
      scope: 'user'
    }), {
      method: "GET",
      Headers: {
        "Access-Control-Allow-Origin": '*'
      }
    })
    
    res.json(json);
  }catch(err){
    console.log(err);
  }
});

app.get("/score", authenticateUser, async function(req,res){
  try{
    console.log(req.user);
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

    if(currentHighscore.HighScore > score){
      const result = await insertScore(req.user.username, score);
      res.status(202).send(result);
    }else{
      res.status(304).send('score is not the highest');
    };
  }catch(err){
    res.status(500).send("Technical error please try again later");
  }
});

const options = {
  key: process.env.CERTKEY,
  cert: fs.readFileSync('../server.crt'),
}

https.createServer(options, app).listen(process.env.PORT, function () {
  console.log(`Application running on https://localhost:${process.env.PORT}`);
});