const express=require("express")
const { registerUser, authenticateUser, logoutUser } = require("../controllers/userController")
const userRouter=express.Router()

userRouter.post("/signup",registerUser)
userRouter.post("/login",authenticateUser)
userRouter.post("/logout",logoutUser)

module.exports={
    userRouter
}