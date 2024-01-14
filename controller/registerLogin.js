const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const registerModel = require("../databaseSchema/registerModel")

const addRegisterUser = (req,res)=>{
    bcrypt.hash(req.body.password, 10, (err, hash)=>{
        if(err){
            return res.status(500).send("Error in hashing password")
        }

        const newRegister= new registerModel({
            ...req.body,
            password:hash,
            confirmPassword:undefined,
        });

        //generate token
        // const token = jwt.sign({email: req.body.email}, process.env.SECRET_KEY, {expiresIn: "1h"});
        // newRegister.tokens.push({token})   // save token in array

        newRegister.save()
        .then(()=>{
            res.json({
                message: `Successfully added new user, Customer ID- ${req.body.custid}`,
            })
        })
        .catch(err=>{ 
            console.log("err-->",err);
            res.status(400).send("Error in saving user")})
    })
}

const authenticateLoginUser = async(req,res)=>{
    try {
    const {email, password} = req.body;
    const user = await registerModel.findOne({email:email}).exec();
    console.log("user-->",user);
    if(!user){
        console.log("user not found for email", email);
        return res.status(404).send("user not found")
    }

        const result = await bcrypt.compare(password, user.password)
            if(result){
                const token = jwt.sign({email:user.email}, process.env.SECRET_KEY, {expiresIn: "1h"})
               
                console.log("user._id-->",user._id);
                await registerModel.updateOne({_id:user._id}, 
                    {
                       $set : {
                            tokens: token
                        }
                    }
                    );

                res.json({
                    message:"Login successful",
                    tokens:token
                })
            }
            else {
                console.log("invalid credentials email:", email);
                res.status(401).send("Invalid credentials")
            }
    } catch (error) {
        console.error("err during login", error);
        res.status(500).send("err during login")
    }
}

module.exports = {addRegisterUser, authenticateLoginUser};