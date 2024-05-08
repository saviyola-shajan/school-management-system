import asyncHandler from "express-async-handler";
import Student from "../../modles/student/studentModel.js";

// get student details
export const studentDetails=asyncHandler(async(req,res)=>{
    try{
        const studentId=req.params._id
const userDetails=await Student.findOne({studentId})
res.status(201).json({userDetails,message:"user deatils fetched"})
    }catch(error){
        throw new Error(error)
    }
})