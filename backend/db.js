const mongoose = require('mongoose');
const Schema = mongoose.Schema

// Creating a user database schema

mongoose.connect('mongodb://127.0.0.1:27017/paytm').then(r => console.log('Connected to database'));

const UserSchema = new Schema({
    fistName: String,
    lastName: String,
    userName: String,
    password: String
})

const User = mongoose.model("User", UserSchema);
module.exports = {
    User
}