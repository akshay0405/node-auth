const express = require("express");
const { check, validationResult} = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/usermodel");


 router.post(
 	"",
 	[check("username","Please Enter a valid username").not().isEmpty().isLength({min: 6}),
 	check("email","Please enter a valid email").isEmail(),
 	check("password","password length is too short").isLength({min: 8}),
 	check("name","name is too short").isLength({min: 4}),

 	],
 	async (req, res) => {
 		const errors = validationResult(req);
 		if (!errors.isEmpty()) {
 			return res.status(400).json({
 				errors: errors.array()
 			});
 		}
 		const {
 			username,
 			name,
 			email,
 			password,
 		} = req.body;
 		try{
 			let user1 = await User.findOne({email});
 			if(user1){
 				return res.status(400).json({msg : "User Already Exists"});

 			}
 		
 		user1 = new User({
 			username,
 			name,
 			email,
 			password,
 		}); 
const salt = await bcrypt.genSalt(10);
user1.password = await bcrypt.hash(password,salt);
await user1.save();

const payload = {
	user1: {
		id: user1.id
	}
};
jwt.sign(payload,"randomString",{
	expiresIn: 10000
},(err,token)=> {
	if (err) throw err;
	res.status(200).json({
		token
	});
}
	);

 	} catch (err){
 		console.log(err.message);
 		res.status(500).send("Error in saving  Occured");
 	}
}
 	);
module.exports = router;