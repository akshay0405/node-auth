const mongoose = require("mongoose");
const MONGOURI = "Add your url";
const InitiateMongoServer = async() =>{
	try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true
    });
console.log("Database connection established");}
    catch (e) {
    console.log(e);
    throw e;
  }
};
module.exports = InitiateMongoServer;
