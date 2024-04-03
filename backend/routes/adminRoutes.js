import  express  from "express";
import { adminLogin,adminSignup ,adminForgotPassword,adminVerifyOtp,adminResetPassword} from "../controllers/admin/adminLogin.js";
import { adminAddTeacher,teacherBlock,teacherUnBlock } from "../controllers/admin/adminTeacher.js";
import { adminAddStudent,studentBlock,studentUnBlock } from "../controllers/admin/adminStudent.js";
import upload from '../middleware/multterMiddleware.js';

const adminRouter =express.Router()

//login routes
adminRouter.post("/adminsignup",adminSignup)
adminRouter.post("/login",adminLogin)
adminRouter.post('/forgotpassword',adminForgotPassword)
adminRouter.post('/verifyotp',adminVerifyOtp)
adminRouter.post('/resetpassword',adminResetPassword)

//admin teacher routes
adminRouter.post('/addteacher',upload.single('image'),adminAddTeacher)
adminRouter.post('/blockteacher/:id',teacherBlock)
adminRouter.post('/unblockteacher/:id',teacherUnBlock)


//admin student routes
adminRouter.post("/addstudent",upload.single('image'),adminAddStudent)
adminRouter.post('/blockstudent/:id',studentBlock)
adminRouter.post('/unblockstudent/:id',studentUnBlock)


export default adminRouter

