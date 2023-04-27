// here we will create a simple file

const express = require('express');
const cors = require('cors')
const { connection } = require('./config/db');
const { userRouter } = require('./Routes/userRoutes');
const { authentication } = require('./authmiddlerware/auth.midleware');
const { userModel } = require('./model/users.model');
require("dotenv").config()
const app = express();
app.use(cors())
app.use(express.json())

app.use("/",userRouter)
app.get("/logedinUser", authentication , async (req,res)=>{
    // res.send("Welcome to the Home Page!")
    const id = req.body.user
    // we got the user Id for specific user
    // res.send(userId)
    try {
        const userdata =  await userModel.find({_id: id})
        res.send(userdata)
    } catch (error) {
        console.log(error)
        res.send("Somthing went wrong: " + error.message)
    }
})


app.listen(process.env.port, async ()=>{
    try {
        await connection
        console.log("connected with the mongodb"+`with port ${process.env.port}`)
    } catch (error) {
        console.log(error)
    }
})