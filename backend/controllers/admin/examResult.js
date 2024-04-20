import asyncHandler from "express-async-handler";
import ExamResult from "../../modles/exam/examModel.js";

//add exam result
export const addResult=asyncHandler(async(req,res)=>{
    try{
        const{subjectId,examName,overAllMark,overAllGrade,date,examScore,remark}=req.body
        const{subject,totalMark,marksObtained,grade}=examScore
        if(!subjectId||!examName||!overAllGrade||!overAllMark||!date||!examScore||!remark){
res.status(400).json({message:"Enter all Fields"})
        }
        const addresult=await ExamResult.create({
            subjectId,
            examName,
            overAllGrade,
            overAllMark,
            date,
            remark,
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

//edit exam result
export const editExamResult=asyncHandler(async(req,res)=>{
    try{
const resultId=req.params._id
const{subjectId,examName,overAllMark,overAllGrade,date,examScore,remark}=req.body
const existingResult=await ExamResult.findOne({resultId})
if(!existingResult){
    return res.status(400).json({message:"Result Not found"})
}
if (subjectId !== undefined && subjectId !== "")existingResult.subjectId = subjectId;
if (examName !== undefined && examName !== "")existingResult.examName = examName;
if (overAllMark !== undefined && overAllMark !== "")existingResult.overAllMark = overAllMark;
if (overAllGrade !== undefined && overAllGrade !== "")existingResult.overAllGrade = overAllGrade;
if (date !== undefined && date !== "")existingResult.date = date;
if (remark !== undefined && remark !== "") {
    if (['Passed', 'Failed'].includes(remark)) {
      existingResult.remark = remark;
    } else {
      res.status(400).json({ message: "Invalid remark value" });
    }
  }
if (examScore) {
    existingResult.examScore = [];
  for (const score of examScore) {
    existingResult.examScore.push({
      subject: score.subject || existingResult.examScore.find(existingScore => existingScore.subject === score.subject)?.subject,
      totalMark: score.totalMark || existingResult.examScore.find(existingScore => existingScore.subject === score.subject)?.totalMark,
      marksObtained: score.marksObtained || existingResult.examScore.find(existingScore => existingScore.subject === score.subject)?.marksObtained,
      grade: score.grade || existingResult.examScore.find(existingScore => existingScore.subject === score.subject)?.grade,
    });
  }
}
const updatedResult=await examScore.save()
res.status(200).json({updatedResult,message:"Result updated sucessfully"})
    }catch(error){
        throw new Error(error)
    }
})

//block exam result
export const blockResult=asyncHandler(async(req,res)=>{
    try{
const examId=req.params._id
const examResult= await ExamResult.findOne({examId})
examResult.isBlock=!examResult.isBlock
await examResult.save();
if (examResult) {
  res.status(200).json({
    isBlock: student.isBlock,
    message: "Success",
  });
} else {
  res.status(400).json({ message: "Id Invalid" });
}
    }catch(error){
        throw new Error(error)
    }
})

//delete exam result
