// here we will connect with out data base

const mongoose = require('mongoose')
require("dotenv").config()

const connection = mongoose.connect(process.env.mongourl)

// export the connection

module.exports ={
    connection
}
