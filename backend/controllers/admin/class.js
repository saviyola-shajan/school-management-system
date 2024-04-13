import Class from "../../modles/class/classModel.js";
import asyncHandler from "express-async-handler";

//add class
export const addClass = asyncHandler(async (req, res) => {
  try {
    const { className, romanLetter, noOfStudents, inCharge, section } =
      req.body;
    if (!className || !romanLetter || !noOfStudents || !inCharge || !section) {
      res.status(400).json({ message: "Enter all fields" });
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
