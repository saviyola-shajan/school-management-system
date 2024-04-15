import mongoose from "mongoose";
const subjectSchema = mongoose.Schema({
  subjectName: {
    type: String,
    required: true,
  },
  subjectCode:{
    type:String,
    required:true
  }
},{
  timestamps:true
});
const Subject=mongoose.model('Subject',subjectSchema)
export default Subject