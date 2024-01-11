const jwt = require("jsonwebtoken")
require('dotenv').config()

//middleware for token verification: :
const authentication =(req,res,next)=>{
    const token = req.header("Authorization");
    console.log("==>",token)
    if(!token) return res.status(401).send("Access denied");

    try {
       const decoded = jwt.verify(token, process.env.SECRET_KEY);
       console.log("===>",decoded);
       req.user= decoded;
       next();
    } catch (error) {
        res.status(400).send("Invalid token")
    }
}
module.exports = {authentication};