// this will be the auth server
require('dotenv').config();
const crypto = require('crypto');

const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyparser = require('body-parser');
const { userExists,registerUser, getUserData, getUserNames } = require( './services/databaseHandlerAuthServer' );

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(bodyparser.json());

function generateJWT(data){
  return jwt.sign(data, process.env.JWT_SECRET);
};

function Hashpassword(password, salt){ 
  return new Promise((res, rej)=>{
    crypto.pbkdf2(password + salt, salt, 512, 512/32, 'sha256', (err, derivedKey) => {
      if (err) rej(err);
      res(derivedKey.toString('base64'));
    });
  }) 
};

app.post('/register', async function(req, res, next){
  const username = req.body?.username;
  const salt = crypto.randomBytes(32).toString("base64");
  const firstName = req.body?.firstName;
  const lastName = req.body?.lastName;
  
  if(!username || !salt || !firstName || !lastName){
    return res.status(400).json({err: "Invalid parameters"});
  }
  
  let hashedPassword = await Hashpassword(req.body?.password, salt);
  
  try{
    const userExistsFlag = await userExists(username);

    if(userExistsFlag){
      res.status(409).json({err: "User exists"});
    }else{
      const insertUser = await registerUser(username, hashedPassword, salt, firstName, lastName);
      res.status(202).json({message: "Created new user"});
    }
  }catch(err){
    res.status(500).json({err: "Technical error on register"});
  }

});

app.post("/login", async function(req, res){
  const username = req.body?.username;
  const password = req.body?.password;

  if(!username || !password){
    return res.status(400).json({err: "Invalid parameters"});
  }

  try{
    const userData = await getUserData(username);
    if(!userData){
      res.status(404).json({message: "User not registered"});
    }else{
      let salt = userData.PasswordSalt;
      let hashedPassword = await Hashpassword(password, salt);

      if(hashedPassword === userData.PasswordHash){
        const userInformation = await getUserNames(userData.Id);
        const data = {
          username: username,
          FirstName: userInformation.FirstName,
          LastName: userInformation.LastName
        }

        const jwt = generateJWT(data);
        res.json(jwt);
      }else{
        res.status(401).json({err: "Invalid username or password"});
      }
    }
  }catch(err){
    console.log(err);
    res.status(500).json({err: "Technical error"});
  }
});

const server = app.listen(process.env.PORT || 5000, function () {
  const port = server.address().port;
  console.log(`Application running on http://localhost:${port}`);
});