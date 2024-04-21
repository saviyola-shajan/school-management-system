import express from "express"
import { teacherLogin,teacherForgotPassword,teacherVerifyOtp,teacherResetPassword } from "../controllers/teacher/teacherLogin.js"
import { submitLeaveForm } from "../controllers/teacher/leaveFormTeacher.js"

const teacherRouter=express.Router()


//teacher login
// teacherRouter.get("",teacherLogin)
teacherRouter.post("/login",teacherLogin)
teacherRouter.post("/forgotpassword",teacherForgotPassword)
teacherRouter.post("/verifyotp",teacherVerifyOtp)
teacherRouter.post("/resetpassword",teacherResetPassword)

//leave form
teacherRouter.post('/teacherleaveform',submitLeaveForm)

export default teacherRouter