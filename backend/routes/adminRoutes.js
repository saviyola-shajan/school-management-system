import  express  from "express";
import { adminLogin,adminSignup ,adminForgotPassword,adminVerifyOtp,adminResetPassword} from "../controllers/admin/adminLogin.js";
import { adminAddTeacher,teacherBlock,updateTeacher,deleteTeacher } from "../controllers/admin/adminTeacher.js";
import { adminAddStudent,studentBlock ,updateStudent,deleteStudent} from "../controllers/admin/adminStudent.js";
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
// adminRouter.post('/unblockteacher/:id',teacherUnBlock)
adminRouter.post('/deleteteacher/:id',deleteTeacher)
adminRouter.post('/updateteacher/:id',upload.single('image'),updateTeacher)


//admin student routes
adminRouter.post("/addstudent",upload.single('image'),adminAddStudent)
adminRouter.post('/blockstudent/:id',studentBlock)
// adminRouter.post('/unblockstudent/:id',studentUnBlock)
adminRouter.post('/deletestudent/:id',deleteStudent)
adminRouter.post('/updatestudent/:id',upload.single('image'),updateStudent)


export default adminRouter

