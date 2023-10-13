const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
    username: String,
    email: { type: String, unique: true, required: true },
    password: String,
});

const User = mongoose.model("User" , userschema);
module.exports = {  User };