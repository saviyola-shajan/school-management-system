import asyncHandler from "express-async-handler";
import Teacher from "../../modles/teacher/teacherModel.js";

// get teacher details
export const teacherDetails=asyncHandler(async(req,res)=>{
    try{
        const teacherId=req.params._id
const teacherDetails=Teacher.findOne({teacherId})
res.status(201).json({teacherDetails,message:"teacher details fetched"})
    }catch(error){
        throw new Error(error)
    }
})