const express = require("express");

const cors = require('cors');
const accountRouter = require("./routes/account");
const userRouter = require("./routes/user");
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/user' , userRouter);
app.use('/api/v1/account' ,accountRouter)

app.listen(3000, ()=>{
    console.log('Server running on 3000 ')
})