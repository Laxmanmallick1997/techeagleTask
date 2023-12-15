const jwt=require("jsonwebtoken")
require("dotenv").config()
const token=(userId,res)=>{
    const token=jwt.sign({userId},process.env.secretKey,{
        expiresIn:'10d'
    })
    res.cookie("jwt",token,{
        maxAge:10*24*60*60*1000,
    })
    return token
}

module.exports={
    token
}