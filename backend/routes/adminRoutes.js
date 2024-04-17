import  express  from "express";
import { adminLogin,adminSignup ,adminForgotPassword,adminVerifyOtp,adminResetPassword} from "../controllers/admin/adminLogin.js";
import { adminAddTeacher,teacherBlock,updateTeacher,deleteTeacher,getAllTeachers } from "../controllers/admin/adminTeacher.js";
import { adminAddStudent,studentBlock ,updateStudent,deleteStudent,getAllStudents} from "../controllers/admin/adminStudent.js";
import { addClass,getAllClasses,deleteClass,editClass } from "../controllers/admin/class.js";
import { addSubject,getAllSubjects,deleteSubject,editSubject } from "../controllers/admin/subject.js";
import { addSection,getAllSections,deleteSection,editSection } from "../controllers/admin/section.js";
import { addNotification,getAllNotifications,deleteNotification,editNotification } from "../controllers/admin/notification.js";
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
adminRouter.post('/deleteclass',deleteClass)
adminRouter.post('/editclass',editClass)


//subject routes
adminRouter.post('/addsubject',addSubject)
adminRouter.get('/getallsubjects',getAllSubjects)
adminRouter.post('/deletesubject',deleteSubject)
adminRouter.post('/editsubject',editSubject)

//secion routes
adminRouter.post('/addsection',addSection)
adminRouter.get('/getallsections',getAllSections)
adminRouter.post('/deletesection',deleteSection)
adminRouter.post('/editsection',editSection)


//notification routes
adminRouter.post('/addnotification',addNotification)
adminRouter.get('/getallnotifications',getAllNotifications)
adminRouter.post('/editnotification',editNotification)
adminRouter.post('/deletenotification',deleteNotification)

export default adminRouter

