import mongoose from "mongoose";

const studentSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    studentId: {
      type: String,
      required: true,
      unique: true,
    },
    admissionNo: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    Gender: {
      type: String,
      enum: ["Male", "Female", "Others"],
    },
    bloodGroup: {
      type: String,
      required: true,
    },
    className: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Class',
    required: true
    },
    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'Section',
      required: true
    },
    image: {
      type: String,
      required: true,
    },
    fathersName: {
      type: String,
      required: true,
    },
    fathersPhoneNumber: {
      type: Number,
      required: true,
    },
    mothersName: {
      type: String,
      required: true,
    },
    mothersPhoneNumber: {
      type: Number,
      required: true,
    },
    guardianEmail: {
      type: String,
      required: true,
    },
    address: [
      {
        addressType: {
          type: String,
          enum: ["Home", "Permanent", "Temporary"],
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
    dateOfAddmission: {
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

const Student = mongoose.model('Student',studentSchema)
export default Student
