import asyncHandler from "express-async-handler";
import Teacher from "../../modles/teacher/teacherModel.js";
import Student from "../../modles/student/studentModel.js";
import Subject from "../../modles/class/subjectModel.js";
import StudentAttendence from "../../modles/student/studentAttendenceModel.js";

//add attendence student
export const addStudentAttendance = asyncHandler(async (req, res) => {
  try {
    const { studentId, date, status, subjectId, teacherId } = req.body;

    if (!studentId || !date || !status || !subjectId || !teacherId) {
      return res
        .status(400)
        .json({
          message:
            "Invalid attendance data. Please provide all required fields.",
        });
    }

    const student = await Student.findById({ studentId });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const subject = await Subject.findById({ subjectId });
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    const teacher = await Teacher.findById({ teacherId });
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    const newAttendance = new StudentAttendence({
      studentId,
      date,
      status,
      subject: subjectId,
      teacherId,
    });

    const savedAttendance = await newAttendance.save();

    res
      .status(201)
      .json({
        message: "Attendance added successfully",
        attendance: savedAttendance,
      });
  } catch (error) {
    throw new Error(error);
  }
});

//edit student attendence
export const editStudentAttendance = asyncHandler(async (req, res) => {
  try {
    const { studentId, date, status, subjectId, teacherId } = req.body;

    if (!studentId || !date || !status) {
      return res
        .status(400)
        .json({
          message:
            " Please provide studentId, date, and status.",
        });
    }

    const attendanceRecord = await StudentAttendence.findOne({
      studentId,
      date,
    });

    if (!attendanceRecord) {
      return res.status(404).json({ message: "Attendance record not found" });
    }

    attendanceRecord.status = status;
    if (subjectId) {
      const subject = await Subject.findById({ subjectId });

      if (!subject) {
        return res.status(404).json({ message: "Subject not found" });
      }

      attendanceRecord.subject = subjectId;
    }
    if (teacherId) {
      const teacher = await Teacher.findById({ teacherId });

      if (!teacher) {
        return res.status(404).json({ message: "Teacher not found" });
      }

      attendanceRecord.teacher = teacherId;
    }

    const updatedAttendance = await attendanceRecord.save();

    res
      .status(200)
      .json({
        message: "Attendance record updated successfully",
        attendance: updatedAttendance,
      });
  } catch (error) {
    throw new Error(error);
  }
});

//get all student attendence
export const allAttendenceStudent=asyncHandler(async(req,res)=>{
  try{
const allAttendence=await StudentAttendence.find({})
res.status(201).json({message:"All attendence Fetched",allAttendence})
  }catch(error){
    throw new Error(error)
  }
})