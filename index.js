const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const PORT = process.env.PORT || 4000;
const InitiateMongoServer = require("./config/db");
const user1 = require("./urls/user");
const login = require("./urls/login");
const userdata = require("./urls/userdata");
InitiateMongoServer();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/",(req,res)=>{
	res.json({message: "API Working"});
});
app.use("/user/usersignup", user1);
app.use("/user/login", login);
app.use("/user/details", userdata);
app.listen(PORT,(req,res) =>{
	console.log(`Server Started at PORT ${PORT}`);
});