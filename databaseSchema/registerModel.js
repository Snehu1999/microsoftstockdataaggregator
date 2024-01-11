const mongoose = require("mongoose")

const registerModel = mongoose.model("registers",{
    fname:{type:String},
    lname:{type:String},
    email:{type:String, unique:true},
    custid:{type:Number, unique:true},
    password:{type:String},
    confirmPassword:{type:String},
    tokens:{type:String, default:""}
})
module.exports=registerModel
