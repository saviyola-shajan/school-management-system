import  express  from "express";
import { adminLogin,adminSignup ,adminForgotPassword,adminVerifyOtp,adminResetPassword} from "../controllers/admin/adminLogin.js";
import { adminAddTeacher,teacherBlock,updateTeacher,deleteTeacher,getAllTeachers } from "../controllers/admin/adminTeacher.js";
import { adminAddStudent,studentBlock ,updateStudent,deleteStudent,getAllStudents} from "../controllers/admin/adminStudent.js";
import { addClass,getAllClasses,deleteClass,editClass } from "../controllers/admin/class.js";
import { addSubject,getAllSubjects,deleteSubject,editSubject } from "../controllers/admin/subject.js";
import { addSection,getAllSections,deleteSection,editSection } from "../controllers/admin/section.js";
import { addNotification,getAllNotifications,deleteNotification,editNotification } from "../controllers/admin/notification.js";
import { addResult,getAllExamResults,deleteExamresult,blockResult,editExamResult } from "../controllers/admin/examResult.js";
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

///////////////////check in postman

//class routes
adminRouter.post('/addclass',addClass)
adminRouter.get('/getallclasses',getAllClasses)
adminRouter.post('/deleteclass/:id',deleteClass)
adminRouter.post('/editclass/:id',editClass)


//subject routes
adminRouter.post('/addsubject',addSubject)
adminRouter.get('/getallsubjects',getAllSubjects)
adminRouter.post('/deletesubject/:id',deleteSubject)
adminRouter.post('/editsubject/:id',editSubject)

//secion routes
adminRouter.post('/addsection',addSection)
adminRouter.get('/getallsections',getAllSections)
adminRouter.post('/deletesection/:id',deleteSection)
adminRouter.post('/editsection/:id',editSection)


//notification routes
adminRouter.post('/addnotification',addNotification)
adminRouter.get('/getallnotifications',getAllNotifications)
adminRouter.post('/editnotification/:id',editNotification)
adminRouter.post('/deletenotification/:id',deleteNotification)

//exam results routes
adminRouter.post('/addexamresults',addResult)
adminRouter.post('/editexamresult/:id',editExamResult)
adminRouter.post('/deleteexamresult/:id',editExamResult)
adminRouter.post('/blockexamresult/:id',blockResult)
adminRouter.get('/getallresults',getAllExamResults)

export default adminRouter

