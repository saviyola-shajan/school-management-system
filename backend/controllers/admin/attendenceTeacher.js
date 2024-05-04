import asyncHandler from "express-async-handler";
import TeacherAttendance from "../../modles/teacher/teacherAttendenceModel.js";
import Teacher from "../../modles/teacher/teacherModel.js";

//add attendence teacher
export const addAttendanceTeacher = asyncHandler(async (req, res) => {
  try {
    const { date, status, teacherId } = req.body;

    const teacher = await Teacher.findById({ teacherId });

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    const newAttendance = new TeacherAttendance({
      teacherId: teacherId,
      date: date,
      status: status,
    });

    await newAttendance.save();

    res
      .status(201)
      .json({
        message: "Attendance added successfully",
        attendance: newAttendance,
      });
  } catch (error) {
    throw new Error(error);
  }
});

//edit teacher attendence
export const editAttendanceTeacher = asyncHandler(async (req, res) => {
  try {
    const { teacherId, date, status } = req.body;
    if (!teacherId || !date || !status) {
      return res
        .status(400)
        .json({ message: "Please provide teacherId, date, and status." });
    }
    const attendanceRecord = await TeacherAttendance.findOne({
      teacherId,
      date,
    });

    if (!attendanceRecord) {
      return res.status(404).json({ message: "Attendance record not found" });
    }

    attendanceRecord.status = status;

    await attendanceRecord.save();

    res.status(200).json({
      message: "Attendance record updated successfully",
      attendance: attendanceRecord,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//get all attendence
export const allAttendenceTeacher=asyncHandler(async(req,res)=>{
  try{
const allAttendence=await TeacherAttendance.find({})
res.status(201).json({message:"All attendence fetched",allAttendence})
  }catch(error){
    throw new Error(error)
  }
})