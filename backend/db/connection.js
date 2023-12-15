const mongoose=require('mongoose')
require('dotenv').config()

const connectionDB=mongoose.connect("mongodb://127.0.0.1:27017/laxman")

module.exports={
    connectionDB
}