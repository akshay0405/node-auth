const mongoose = require("mongoose");
const MONGOURI = "mongodb+srv://Admin:admin12345@node-auth.8bw9g.mongodb.net/node-auth?retryWrites=true&w=majority";
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