const express = require('express');
const zod = require('zod');
const {authMiddleware} = require('../authMiddleware')
const {User, Account} = require("../db");
const jwt = require("jsonwebtoken");
const router = express.Router();
const {JWT_SECRET} = require('../config')

const signupSchema = zod.object({
    userName: zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
})
router.post('/signup', async (req, res) => {
    const body = req.body;
    const {success} = signupSchema.safeParse({
        userName: body.userName,
        password: body.password,
        firstName: body.firstName,
        lastName: body.lastName
    });
    if (!success) {
        return res.json({
            msg: "Invalid Inputs"
        })
    }
    const user = User.findOne({
        userName: body.userName
    })
    if (user){
        const dbUser = await User.create({
            userName: body.userName,
            password: body.password,
            firstName: body.firstName,
            lastName: body.lastName
        })
        const userId = dbUser._id;

        await Account.create({
            userId,
            balance: 1 + Math.random() * 10000
        })

        const token = jwt.sign({
            userId
        }, JWT_SECRET);

        res.json({
            message: "User created successfully",
            token: token
        })

    }else {
        return res.json({
            msg: "Email already taken"
        })
    }


})

const signinSchema = zod.object({
    userName: zod.string().email(),
    password: zod.string()
})
router.post('/signin', async (req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;
    const user =await User.findOne({userName: userName, password: password})
    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET)
        res.json({
            token
        })
    }else {
        res.json({
            msg: "Invalid Credentials"
        })
    }
})
const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})
router.put('/', authMiddleware, async (req, res) => {
    const {success} = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }
    try {
        await User.updateOne(
            { _id: req.userId }, // Filter criteria
            { $set: req.body }   // Update operation
        );
        res.json({
            msg: 'User updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
})

router.get('/bulk', async (req, res) => {
    const filter = req.query.filter || ''
    const users = await User.find({
        $or: [{
            firstName: {
                $regex: filter
            }
        },{
            lastName: {
                $regex: filter
            }
        }]
    })
    res.json({
        user: users.map(user => ({
            username: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})
module.exports = router
