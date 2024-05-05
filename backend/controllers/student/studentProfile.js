import asyncHandler from "express-async-handler";
import Student from "../../modles/student/studentModel.js";

export const userDetails=asyncHandler(async(req,res)=>{
    try{
        const studentId=req.body
const userDetails=await Student.findOne({studentId})
    }catch(error){
        throw new Error(error)
    }
})