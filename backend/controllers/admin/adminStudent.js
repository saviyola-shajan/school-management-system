import asyncHandler from "express-async-handler";
import otpGenerator from "otp-generator";
import Student from "../../modles/student/studentModel.js";
import bcrypt from "bcrypt";
import { sendEmailwithCredentials } from "../../util/sendEmail/sendEmailForLogin.js";

// add student
export const adminAddStudent = asyncHandler(async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      dob,
      gender,
      bloodGroup,
      fathersName,
      fathersPhoneNumber,
      mothersName,
      mothersPhoneNumber,
      guardianEmail,
      address,
      section,
      image,
      Class,
    } = req.body;
    const imageUrl =req.file.originalname
    const { addressType, city, state, pinCode, landMark } = address;
      if (
        !firstName ||
        !lastName||
        !email ||
        !phoneNumber ||
        !dob ||
        !bloodGroup ||
        !address ||
        !section ||
        !image ||
        !Class||
        !fathersName||
        !fathersPhoneNumber||
        !mothersName||
        !mothersPhoneNumber||
        !guardianEmail
      ) {
        res.status(400).json({ message: "Please fill all fields" });
      }
    const password = await generatePassword();
    const studentId = await generateStudentId();
    const admissionNo = await generateAdmissionNo();
    const hashedPaassword = await bcrypt.hash(password, 10);
    const student = await Student.create({
        firstName,
      lastName,
      email,
      password: hashedPaassword,
      studentId,
      phoneNumber,
      dob,
      gender,
      bloodGroup,
      admissionNo,
      address: {
        addressType,
        city,
        state,
        pinCode,
        landMark,
      },
      section,
      image:imageUrl,
      Class,
      fathersName,
      fathersPhoneNumber,
      mothersName,
      mothersPhoneNumber,
      guardianEmail,
    });
    await student.save();
    const sendEmail = await sendEmailwithCredentials(
      email,
      password,
      studentId
    );
    if (sendEmail) {
      res
        .status(201)
        .json({
          message:
            "Student added sucessfully . Email and Password sent to Email for Login",
          student,
        });
    } else {
      res
        .status(401)
        .json({ message: "Error in adding student and sending email" });
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

//generate password for student
const generatePassword = asyncHandler(async (req, res) => {
  try {
    const options = {
      digits: true,
      lowerCaseAlphabets: true,
      upperCaseAlphabets: true,
      specialChars: true,
    };
    const password = otpGenerator.generate(8, options);
    console.log(password);
    return password;
  } catch (error) {
    res.status(400);
    throw new Error("can't generate password");
  }
});

//generate studentId
const generateStudentId = asyncHandler(async (req, res) => {
  try {
    let nextId = 1;
    const teacherId = "S" + nextId.toString().padStart(4, "0");
    nextId++;
    console.log(teacherId);
    return teacherId;
  } catch (error) {
    res.status(400);
    throw new Error("can't generate teacherId");
  }
});

//generate admission number
const generateAdmissionNo = asyncHandler(async (req, res) => {
  try {
    let nextAdmissionNumber = 1000;
    const admissionNumber = nextAdmissionNumber.toString().padStart(4, "0");
    nextAdmissionNumber++;
    console.log(admissionNumber);
    return admissionNumber;
  } catch (error) {
    res.status(400)
    throw new Error("Can't generate admission number")
  }
});
