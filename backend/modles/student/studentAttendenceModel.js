import mongoose from "mongoose";

const studentAttendenceSchema = mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    status: {
      type: String,
      enum: ["present", "absent", "late", "excused absence"],
      required: true,
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'Subject',
      required: true,
      },
      teacherId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Teacher",
      }
  },
  {
    timestamps: true,
  }
);
const StudentAttendence =mongoose.model('StudentAttendence',studentAttendenceSchema)

export default StudentAttendence
