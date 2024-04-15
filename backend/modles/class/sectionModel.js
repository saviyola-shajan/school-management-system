import mongoose from "mongoose";

const sectionSchema = mongoose.Schema(
  {
    sectionName: {
      type: String,
      required: true
    }
  },
  { timestamps: true } 
);

const Section = mongoose.model('Section', sectionSchema);
export default Section;
