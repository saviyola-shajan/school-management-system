import mongoose from "mongoose";

const teacherSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    teacherId: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    dob: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Others"],
    },
    bloodGroup: {
      type: String,
      required: true,
    },
    subject:[ {
      type: mongoose.Schema.Types.ObjectId,
      ref:'Subject',
      required: true,
    }],
    Class: {
      type: String,
      required: true,
    },
    section: {
      type: String,
      enum: ["A", "B", "C", "D"],
      required:true
    },
    image: {
      type: String,
      required: true,
    },
    address: [
      {
        addressType: {
          type: String,
        },
        city: {
          type: String,
          required: true,
        },
        landMark: {
          type: String,
        },
        state: {
          type: String,
          required: true,
        },
        pinCode: {
          type: Number,
          required: true,
        },
      },
    ],
    dateOfJoin: {
      type: Date,
      default: Date.now(),
    },
    isBlock:{
        type:Boolean,
        default:false
    }
  },
  {
    timestamps: true,
  }
);

const Teacher = mongoose.model("Teacher", teacherSchema);
export default Teacher;
