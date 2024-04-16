import asyncHandler from "express-async-handler";
import Subject from "../../modles/class/subjectModel.js";


//add subject
export const addSubject = asyncHandler(async (req, res) => {
  try {
    const { subjectName, subjectCode } = req.body;
    if (!subjectCode || !subjectName) {
     return res.status(400).json({ message: "Enter all Fields" });
    }
    const existingSubject = await Subject.findOne({ subjectCode });
    if (existingSubject) {
      return res.status(400).json({ message: "Subject already exist" });
    }
    const subject = await Subject.create({
      subjectCode,
      subjectName,
    });
    await subject.save();
    return res.status(200).json({ message: "Subject added sucessfully" });
  } catch (error) {
    throw new Error(error);
  }
});

//edit subject
export const editSubject=asyncHandler(async(req,res)=>{
  try{
const subjectId=req.params._id
const {subjectCode,subjectName}=req.body
const existingSubject =await Section.findOne({subjectId})
if(!existingSubject){
  return res.status(400).json({message:"Section not found"})
}
if(subjectCode!==undefined&&subjectCode!=="")existingSubject.subjectCode=subjectCode
if(subjectName!==undefined&&subjectName!=="")existingSubject.subjectName=subjectName
await existingSubject.save()
res
.status(200)
.json({ message: "Subject updated successfully", existingSubject });
  }catch(error){
    throw new Error(error)
  }
})

//delete subject
export const deleteSubject=asyncHandler(async(req,res)=>{
  try{
const subjectId=req.params._id
const subject = await Subject.findOneAndDelete({subjectId})
if (subject) {
  res.status(200).json({ message: "subject deleted successfully" });
} else {
  res.status(404).json({ message: "subject not found" });
}
  }catch(error){
    throw new Error(error)
  }
})

//get all subjects
export const getAllSubjects=asyncHandler(async(req,res)=>{
    try{
const subjects= await Subject.find({})
res.status(200).json({subjects,message:"All subjects rendered"})
    }catch(error){
        throw new Error(error)
    }
})