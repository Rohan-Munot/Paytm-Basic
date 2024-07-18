const mongoose = require('mongoose');
const {mongo} = require("mongoose");
const Schema = mongoose.Schema

// Creating a user database schema

mongoose.connect('mongodb://127.0.0.1:27017/paytm').then(r => console.log('Connected to database'));

const UserSchema = new Schema({
    fistName: {
        type: String,
        required: true,
        minlength: 3,
    },
    lastName: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
    }
})

const accountSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    }
})

const User = mongoose.model("User", UserSchema);
const Account = mongoose.model("Account", accountSchema);
module.exports = {
    User,
    Account
}