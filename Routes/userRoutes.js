// Now here will create all the Routes for the User 

const express = require('express')
const { userModel } = require('../model/users.model')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const userRouter = express.Router()
const authentication = require("../authmiddlerware/auth.midleware")

// userRouter.get("/", async (req, res) => {
//     res.send("user route working")
// })

// Now lets create a register Route for the user 
userRouter.post("/register", async (req, res) => {
    // get details from the user
    const {name,email,password,phone,bio,image} = req.body
    if(!name || !email || !password || !image|| !password|| !bio|| !phone){
        res.send("Please fill all the details")
    }else{
        try {
            // find the user by email in batabase
            const user = await userModel.findOne({email})
            if(user){
                res.send("User already registered Please login")
            }else{
                // get the details and save to database
                bcrypt.hash(password, 3, async function(err, hash_pass) {
                    // Store hash in your password DB.
                    if(err){
                        res.send({msg: err.message})
                    }else{
                        const new_user = new userModel({name,email,password:hash_pass,bio,phone,image})
                        await new_user.save()
                        res.status(200).send({msg :"User saved successfully"})
                    }
                });
            }
        } catch (error) {
            console.log(error)
            res.send({msg: error.message})
        }
    }
})


// Now lets create a login Route for the user 

userRouter.post("/login", async function(req, res){
    const {email, password} = req.body
    if(!email || !password){
        res.send("Please enter your email and password")
    }else{
       try {
         // find the user with the email
         const  user = await userModel.findOne({email: email})
         let  hashpassword = user.password
         if(!user){
             res.send("This user does not exist Please register")
         }else{
             // comapre the password and generate the token
             bcrypt.compare(password, hashpassword, async function(err, result) {
                 // result == true
                 if(result){
                     const token = jwt.sign({userID : user._id}, 'nikhil');
                     res.status(200).send({msg:"login success",token : token});
                 }else{
                     res.status(401).send({msg:"login failed"})
                 }
             });
         }
       } catch (error) {
        console.log(error)
        res.send(error.message)
       }
    }
})

// let get the all User to verify if there is some one in the data base already

userRouter.get("/users" ,async function(req, res) {
    try {
        let users = await userModel.find()
        res.send(users)
    } catch (error) {
        res.send({msg:"error getting users"})
    }
})

// Now let get only one user that is loged into 


module.exports = {
    userRouter
}