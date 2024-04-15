import  express  from "express";
import { adminLogin,adminSignup ,adminForgotPassword,adminVerifyOtp,adminResetPassword} from "../controllers/admin/adminLogin.js";
import { adminAddTeacher,teacherBlock,updateTeacher,deleteTeacher,getAllTeachers } from "../controllers/admin/adminTeacher.js";
import { adminAddStudent,studentBlock ,updateStudent,deleteStudent,getAllStudents} from "../controllers/admin/adminStudent.js";
import { addClass,getAllClasses } from "../controllers/admin/class.js";
import { addSubject,getAllSubjects } from "../controllers/admin/subject.js";
import { addSection,getAllSections } from "../controllers/admin/section.js";
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
adminRouter.get('/getallteachers',getAllTeachers)


//admin student routes
adminRouter.post("/addstudent",upload.single('image'),adminAddStudent)
adminRouter.post('/blockstudent/:id',studentBlock)
// adminRouter.post('/unblockstudent/:id',studentUnBlock)
adminRouter.post('/deletestudent/:id',deleteStudent)
adminRouter.post('/updatestudent/:id',upload.single('image'),updateStudent)
adminRouter.get('/getallstudents',getAllStudents)

//class routes
adminRouter.post('/addclass',addClass)
adminRouter.get('/getallclasses',getAllClasses)


//subject routes
adminRouter.post('/addsubject',addSubject)
adminRouter.get('/getallsubjects',getAllSubjects)

//secion routes
adminRouter.post('/addsection',addSection)
adminRouter.get('/getallsections',getAllSections)

export default adminRouter

