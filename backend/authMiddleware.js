const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require('./config')

const authMiddleware = (req, res, next) => {
    const authToken = req.headers.authorization;
    if (!authToken || !authToken.startsWith('Bearer')) {
        return res.status(401).send('Invalid from middleware top');
    }
    const token = authToken.split(' ')[1];

    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next()
    }
    catch (err) {
        console.log(err)
        return res.status(401).json({
            msg: "Unauthorized from middleware bottom"
        });
    }
}

module.exports = {authMiddleware};