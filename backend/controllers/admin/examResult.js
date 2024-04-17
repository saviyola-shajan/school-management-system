import asyncHandler from "express-async-handler";
import ExamResult from "../../modles/exam/examModel.js";

//add exam result
export const addResult=asyncHandler(async(req,res)=>{
    try{
        const{subjectId,examName,overAllMark,overAllGrade,date,examScore}=req.body
        const{subject,totalMark,marksObtained,grade}=examScore
        if(!subjectId||!examName||!overAllGrade||!overAllMark||!date||!examScore){
res.status(400).json({message:"Enter all Fields"})
        }
        const addresult=await ExamResult.create({
            subjectId,
            examName,
            overAllGrade,
            overAllMark,
            date,
            examScore:{
                subject,
                totalMark,
                marksObtained,
                grade
            }
        })
        await addresult.save()
        res.status(200).json({addresult,message:"Result added sucessfully"})
    }catch(error){
throw new Error(error)
    }
})