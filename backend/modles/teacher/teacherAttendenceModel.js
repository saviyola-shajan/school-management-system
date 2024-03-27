import mongoose from "mongoose";

const teacherAttendanceSchema = mongoose.Schema({
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['present', 'absent', 'late', 'excused absence'],
    required: true
  }
},
{
  timestamps: true,
});

const TeacherAttendance = mongoose.model('TeacherAttendance', teacherAttendanceSchema);

export default TeacherAttendance;