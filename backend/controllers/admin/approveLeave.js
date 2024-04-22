import StudentLeave from "../../modles/student/leaveFormModel.js";
import TeacherLeave from "../../modles/teacher/leaveFormModel.js"
import asyncHandler from "express-async-handler";


//get all leave form student
export const getAllLeavestudent=asyncHandler(async(req,res)=>{
    try{
const leaveForms=await StudentLeave.find({})
res.status(200).json({leaveForms,message:"All leave forms rendered"})
    }catch(error){
        throw new Error(error)
    }
})

//get all leave form teacher
export const getAllLeaveTeacher=asyncHandler(async(req,res)=>{
    try{
const leaveForm=await TeacherLeave.find({})
res.status(200).json({leaveForm,message:"All leave forms rendered"})
    }catch(error){
        throw new Error(error)
    }
})

//approve Leave student
export const leaveStatusStudent=asyncHandler(async(req,res)=>{
    try{
const leaveId=req.params._id
const leaveForm=await StudentLeave.find({leaveId})
if(!leaveForm){
    return res.status(400).json({message:"Leave Form not found"})
}
const { status } = req.body; 
if (status && ['approved', 'rejected'].includes(status)) {
  leaveForm.status = status;
} else {
  return res.status(400).json({ message: "Invalid status value" });
}
const updatedLeaveForm = await leaveForm.save();
return res.status(200).json(updatedLeaveForm);
    }catch(error){
        throw new Error(error)
    }
})


//approve leave teacher
export const leaveStatusTeacher=asyncHandler(async(req,res)=>{
    try{
const leaveId=req.params._id
const leaveForm=await TeacherLeave.find({leaveId})
if(!leaveForm){
    return res.status(400).json({message:"Leave Form not found"})
}
const { status } = req.body; 
if (status && ['approved', 'rejected'].includes(status)) {
  leaveForm.status = status;
} else {
  return res.status(400).json({ message: "Invalid status value" });
}
const updatedLeaveForm = await leaveForm.save();
return res.status(200).json(updatedLeaveForm);
    }catch(error){
        throw new Error(error)
    }
})