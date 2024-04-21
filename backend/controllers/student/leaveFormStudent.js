import asyncHandler from "express-async-handler";
import StudentLeave from "../../modles/student/leaveFormModel.js";

//submit leave form
export const submitLeaveForm = asyncHandler(async (req, res) => {
  try {
    const { studentId, leaveType, startDate, endDate, reason, name } = req.body;
    if (
      !studentId ||
      !leaveType ||
      !startDate ||
      !endDate ||
      !reason ||
      !name
    ) {
      return res.status(400).json({ message: "Enter all fields" });
    }
    const leaveform = await StudentLeave.create({
      name,
      startDate,
      endDate,
      studentId,
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
