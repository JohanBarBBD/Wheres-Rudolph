const {getLeaderboard, userExists, getUserScore, insertScore} = require('./services/databaseHandler')
const {Hashpassword, DecodeToken, generateJWT, authenticateJWT} = require('./services/credentialHandling');
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

app.post("/login", async function(req, res){
  console.log(req.body);
  const data = {
    name: req.body?.name,
    username: req.body?.username,
    admin: req.body?.admin,
  };

  try{
    const jwt = generateJWT(data); 
    res.json(jwt)
  }catch(err){
    console.log(`Error: ${err}`);
  }
});

//THIS WAS FOR TESTING PURPOSES
app.get("/score", authenticateUser, async function(req,res){
  try{
    const result = await getUserScore(req.user.username);
    res.json(result);
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

const server = app.listen(process.env.PORT || 8080, function () {
  const port = server.address().port;
  console.log(`Application running on http://localhost:${port}`);
});