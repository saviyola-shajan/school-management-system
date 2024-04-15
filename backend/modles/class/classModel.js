import mongoose from "mongoose";

const classSchema = mongoose.Schema(
  {
    className:{
type:String,
required:true
  },
    romanLetter:{
    type:String,
    required:true
},
section:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"Setion",
  required:true
},
noOfStudents:{
  type:Number,
  required:true
},
inCharge:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"Teacher",
  required:true
}},{
  timestamps:true
})
  const Class = mongoose.model('Class',classSchema)
export default Class