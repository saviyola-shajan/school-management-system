import asyncHandler from "express-async-handler";
import TeacherLeave from "../../modles/teacher/leaveFormModel.js";

//submit leave form
export const submitLeaveForm = asyncHandler(async (req, res) => {
  try {
    const { teacherId, leaveType, startDate, endDate, reason, name } = req.body;
    if (
      !teacherId ||
      !leaveType ||
      !startDate ||
      !endDate ||
      !reason ||
      !name
    ) {
      return res.status(400).json({ message: "Enter all fields" });
    }
    const leaveform = await TeacherLeave.create({
      name,
      startDate,
      endDate,
      teacherId,
      reason,
      leaveType,
    });
    await leaveform.save();
    res
      .status(200)
      .json({ leaveform, message: "Leave Form Submitted sucessfully" });
  } catch (error) {
    throw new Error(error);
  }
});
