# Wheres-Rudolph
Welcome to wheres rudolph. Aim of the game is to find the little rudolph the red nose reindeer in the image. Very simple.
## Disclaimer
Please note that AWS is handling all our TLS, so we will have to ask you to pretend that you can't access everything because http is running on local.
## Collaborators:
- Duncan Quick
- Johan Barnard
- Michael Coker
- Steven Pinto

## Setup
If you have any issues setting up the project please don't hesistate to approach one of the collaborators.
### Backend setup (Auth server)
Change to Backend folder and run the npm commands from there
The command for running the auth server is npm run auth
The port we used for the auth server is 5000, set this in the .env under AUTH_PORT
### Backend setup (Resource server)
The start command needs to be run from the Backend folder
The command for running the resource server is npm run start
The port we used for the resource server is 8080, set this in the .env under PORT
### Frontend setup (Static files)
#### edit the config.js file in the script folder
```js
const apiUrl ="{Url to local Backend}"
const authUrl = "{Url to AuthProvider}"
```

Example :
```js
const apiUrl ="http://localhost:8080"
const authUrl = "http://localhost:5000"
```

then you can just open the html files in your local browser(side note the auth and backend servers will need to be running)
Remember to ensure that you include the port numbers in this config file, or you will not hit any of the endpoints.
### .env setup
 - HOST= whatever your db server is (ie BBD-DQ//SQLEXPRESS01)
 - DBPORT= whatever port you setup your instance on
 - USER= your DB user
 - PASSWORD= your DB password
 - DATABASE=WheresRudolph
 - DATABASE_AUTH=WheresRudolphAuth
 - PORT= Your port from the Resource server setup we used 8080
 - AUTH_PORT= Your port from the Auth server setup, we used 5000
 - JWT_SECRET= Generate your own 
 - TOKEN_EXPIRATION=300s
### DB setup
You can run the scripts in the DB folder to generate the database, make sure you use the same instance for both databases.
Good luck connecting to a local instance of SQL Express. I believe in you, Ivan.