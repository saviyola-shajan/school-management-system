import TeacherAttendance from "../../modles/teacher/teacherAttendenceModel.js";
import asyncHandler from "express-async-handler";
import Teacher from "../../modles/teacher/teacherModel.js";

//add attendence teacher
const Teacher = require("./models/Teacher");
const TeacherAttendance = require("./models/TeacherAttendance");
const asyncHandler = require("express-async-handler");

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
