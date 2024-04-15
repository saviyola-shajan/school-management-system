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

//get all subjects
export const getAllSubjects=asyncHandler(async(req,res)=>{
    try{
const subjects= await Subject.find({})
res.status(200).json({subjects,message:"All subjects rendered"})
    }catch(error){
        throw new Error(error)
    }
})