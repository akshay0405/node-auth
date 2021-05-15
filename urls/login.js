const express = require("express");
const { check, validationResult} = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/usermodel");
router.post("",
	[
	check("email","Please enter a valid email").isEmail(),
	check("password","password length must be minimum 8").isLength({min : 8})
	],
async(req,res) => {
	const errors =validationResult(req);
	if(!errors.isEmpty()){
		return res.status(400).json({
			errors: errors.array()
		});
	}
	const {email,password}=req.body;
	try {
		let user=await User.findOne({
			email
		});
		if (!user) {
			return res.status(400).json({
				message: "User Not Registered"
			});
		}
		const isMatch = await bcrypt.compare(password,user.password);
		if(!isMatch){
			return res.status(400).json({message: "Incorrect username or password"});
		}
		const payload = {
			user : {
				id: user.id
			}
		}
		jwt.sign(payload,"randomString",
		{
			expiresIn: 3600
		},
		(err,token)=>{
			if(err) throw err;
			res.status(200).json({
				token
			});
		});

	}
	catch(e){
		res.status(500).json({
			message: "Server Error"
		});
	}
}

	);
module.exports = router;