import  express  from "express";
import { adminLogin,adminSignup ,adminForgotPassword,adminVerifyOtp,adminResetPassword} from "../controllers/admin/adminLogin.js";
const adminRouter =express.Router()

//login routes
adminRouter.post("/adminsignup",adminSignup)
adminRouter.post("/login",adminLogin)
adminRouter.post('/forgot',adminForgotPassword)
adminRouter.post('/verifyemail',adminVerifyOtp)
adminRouter.post('/resetpassword',adminResetPassword)

export default adminRouter

