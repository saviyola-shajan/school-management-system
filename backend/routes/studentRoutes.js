import express from "express"
import { studentLogin,studentForgotPassword,studentResetPassword,studentVerifyOtp } from "../controllers/student/studentLogin.js";


const studentRouter=express.Router()

//student login
// studentRouter.get('/',studentLogin)
studentRouter.post("/login",studentLogin)
studentRouter.post("/forgotpassword",studentForgotPassword)
studentRouter.post("/verifyotp",studentVerifyOtp)
studentRouter.post("/resetpassword",studentResetPassword)


export default studentRouter