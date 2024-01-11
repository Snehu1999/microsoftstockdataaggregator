const mongoose = require("mongoose")

const stockSchema = mongoose.model("stocks",{
    time:{type:String},
    open:{type:String},
    high:{type:String},
    low:{type:String},
    close:{type:String},
    volume:{type:String}
})
module.exports=stockSchema;