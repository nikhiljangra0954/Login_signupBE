// here we will create a model schema for the user

const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name : String,
    email:String,
    password:String,
    phone : String,
    bio : String,
    image : String
},{
    versionKey : false
})

const userModel = mongoose.model("user", userSchema)

// now export the model 
module.exports ={
    userModel
}

