import Class from "../../modles/class/classModel.js";
import asyncHandler from "express-async-handler";

//add class
export const addClass = asyncHandler(async (req, res) => {
  try {
    const { className, romanLetter, noOfStudents, inCharge, section } =
      req.body;
    if (!className || !romanLetter || !noOfStudents || !inCharge || !section) {
     return res.status(400).json({ message: "Enter all fields" });
    }
    const existingClass = await Class.findOne({ className });
    if (existingClass) {
      return res.status(400).json({ message: "class already exist" });
    }     
    const addClass = await Class.create({
      className,
      romanLetter,
      noOfStudents,
      inCharge,
      section,
    });
    await addClass.save();
    return res.status(200).json({ message: "Class added sucessfully" });
  } catch (error) {
    throw new Error(error);
  }
});


//edit class
export const editClass=asyncHandler(async(req,res)=>{
  try{
const classId=req.params._id
const {className,romanLetter,noOfStudents,inCharge,section}=req.body
const existingClass =await Class.findOne({classId})
if(!existingClass){
  return res.status(400).json({message:"Class not found"})
}
if(className!==undefined&&className!=="")existingClass.className=className
if(romanLetter!==undefined&&romanLetter!=="")existingClass.romanLetter=romanLetter
if(noOfStudents!==undefined&&noOfStudents!=="")existingClass.noOfStudents=noOfStudents
if(inCharge!==undefined&&inCharge!=="")existingClass.inCharge=inCharge
if(section!==undefined&&section!=="")existingClass.section=section

await existingClass.save()
res
.status(200)
.json({ message: "Class updated successfully", existingClass });
  }catch(error){
    throw new Error(error)
  }
})


//delete class
export const deleteClass=asyncHandler(async(req,res)=>{
  try{
const classId=req.params._id
const deletedClass = await Class.findOneAndDelete({classId})
if (deletedClass) {
  res.status(200).json({ message: "class deleted successfully" });
} else {
  res.status(404).json({ message: "class not found" });
}
  }catch(error){
    throw new Error(error)
  }
})


//get all classes
export const getAllClasses=asyncHandler(async(req,res)=>{
    try{
const classes= await Class.find({}).populate({
    path:"inCharge",
    select:"name"
}).populate({
  path:"section",
  select:"sectionName"
})
res.status(200).json({classes})
    }catch(error){
throw new Error(error)
    }
})
