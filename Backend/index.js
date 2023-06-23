const {getLeaderboard, userExists} = require('./services/databaseHandler')
const {Hashpassword, DecodeToken, generateJWT, authenticateJWT} = require('./services/credentialHandling');
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();

app.use(cors());

//middleware for authentication.
function authenticateUser(req, res, next){
  const authorizationHeader = req.headers["authorization"];
  const token = authorizationHeader && authorizationHeader.split(' ')[1];

  if(token == null){
    return res.status(401).send("NAUGHTY, NOT ALLOWED, UNAUTHORIZED");
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if(err) return res.status(403).send("NAUGHTY FORBIDDEN");
    req.user = decoded;
    next();
  });
}

app.get("/leaderboard", authenticateUser,async function(req, res, next){
  
  try{
    const response = await getLeaderboard();
    res.status(200).send(response);
  }catch(err){
    res.status(500).send("SORRY SOMETHING BROKE")
  }
});

app.get("/login", async function(req, res){
  
  const data = {
    name: req.body?.name,
    username: req.body?.username,
    admin: req.body?.admin,
  };

  try{
    const jwt = generateJWT(data); 
    res.send(jwt)
  }catch(err){
    console.log(`Error: ${err}`);
  }
});


app.post("/score", authenticateUser, async function(req, res){

});

const server = app.listen(process.env.PORT || 8080, function () {
  const port = server.address().port;
  console.log("Application running on port: ", port);
});