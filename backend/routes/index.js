const express = require('express');
const app = express();
const userRouter = require('user')
const router = express.Router();

router.get('/user' ,userRouter)

module.exports = router;