const express = require('express');
const app = express();
const userRouter = require('user')
const accountRouter = require('account')
const router = express.Router();

router.get('/user' ,userRouter)
router.get('/account' ,accountRouter)

module.exports = router;