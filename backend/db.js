const mongoose = require('mongoose');
const {mongo} = require("mongoose");
const Schema = mongoose.Schema

// Creating a user database schema

mongoose.connect('mongodb+srv://rohanmunot24:rohanmunot@cluster0.spmyctg.mongodb.net/paytm').then(r => console.log('Connected to database'));

const UserSchema = new Schema({
    firstName: {
        type: String,
        minlength: 3,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
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

const User = mongoose.model("User", UserSchema);

const accountSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    balance: {
        type: Number,
    }
})
const Account = mongoose.model("Account", accountSchema);
module.exports = {
    User,
    Account
}