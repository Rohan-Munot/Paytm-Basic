const mongoose = require('mongoose');
const {mongo} = require("mongoose");
const Schema = mongoose.Schema

// Creating a user database schema

mongoose.connect('mongodb://127.0.0.1:27017/paytm').then(r => console.log('Connected to database'));

const UserSchema = new Schema({
    fistName: {
        type: String,
        minlength: 3,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    userName: {
        type: String,
        unique: true,
        minlength: 3,
    },
    password: {
        type: String,
        minlength: 5,
    }
})

const accountSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    balance: {
        type: Number,
    }
})

const User = mongoose.model("User", UserSchema);
const Account = mongoose.model("Account", accountSchema);
module.exports = {
    User,
    Account
}