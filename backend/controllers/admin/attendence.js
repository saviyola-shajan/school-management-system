import TeacherAttendance from "../../modles/teacher/teacherAttendenceModel.js";
import asyncHandler from "express-async-handler";
import Teacher from "../../modles/teacher/teacherModel.js";



//add attendence teacher
export const addAttendence=asyncHandler(async(req,res)=>{
    try{
  const{date,status,teacherId}=req.body
  const teachers=await Teacher.find({})
  
    }catch(error){
      throw new Error(error)
    }
  })