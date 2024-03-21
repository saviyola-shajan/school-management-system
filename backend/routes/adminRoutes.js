import  express  from "express";
import { adminLogin,adminSignup ,adminForgotPassword,adminVerifyOtp,adminResetPassword} from "../controllers/admin/adminLogin.js";
import { adminAddTeacher } from "../controllers/admin/adminTeacher.js";
const adminRouter =express.Router()

//login routes
adminRouter.post("/adminsignup",adminSignup)
adminRouter.post("/login",adminLogin)
adminRouter.post('/forgot',adminForgotPassword)
adminRouter.post('/verifyemail',adminVerifyOtp)
adminRouter.post('/resetpassword',adminResetPassword)

//admin teacher routes
adminRouter.post('/addteacher',adminAddTeacher)

export default adminRouter

