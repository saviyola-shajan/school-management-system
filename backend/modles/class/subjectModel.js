import mongoose from "mongoose";
const subjectSchema = mongoose.Schema({
  subjectName: {
    type: String,
    required: true,
  }
});
const Subject=mongoose('Subject',subjectSchema)
export default Subject