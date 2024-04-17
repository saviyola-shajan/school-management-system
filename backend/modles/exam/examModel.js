import mongoose from "mongoose";

const examresultSchema = mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    examName: {
      type: String,
      required: true,
    },
    examScore: [
      {
        subject: {
          type: String,
          required: true,
        },
        totalMark: {
          type: Number,
          required: true,
        },
        marksObtained: {
          type: Number,
          required: true,
        },
        grade: {
          type: String,
          required: true,
        },
      },
    ],
    overAllMark: {
      type: Number,
      required: true,
    },
    overAllGrade: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date,
    },
  },
  {
    timestamps: true,
  }
);
const ExamResult = mongoose.model("Examresult", examresultSchema);
export default ExamResult;
