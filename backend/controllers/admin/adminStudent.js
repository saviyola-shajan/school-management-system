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
      className,
    } = req.body;
    const imageUrl = req.file.originalname;
    const { addressType, city, state, pinCode, landMark } = address;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !dob ||
      !bloodGroup ||
      !address ||
      !section ||
      !image ||
      !className ||
      !fathersName ||
      !fathersPhoneNumber ||
      !mothersName ||
      !mothersPhoneNumber ||
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
      image: imageUrl,
      className,
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
      res.status(201).json({
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
    res.status(400);
    throw new Error("Can't generate admission number");
  }
});

//student block
export const studentBlock = asyncHandler(async (req, res) => {
  try {
    const studentID = req.params._id;
    const student = await Student.finOne({ studentID });
    console.log(student);
    student.isBlock = !student.isBlock;
    await student.save();
    if (student) {
      res.status(200).json({
        isBlock: student.isBlock,
        message: "Success",
      });
    } else {
      res.status(400).json({ message: "Id Invalid" });
    }
  } catch (error) {
    throw new Error(error);
  }
});

//student unblock
// export const studentUnBlock = asyncHandler(async (req, res) => {
//   try {
//     const studentID = req.params._id;
//     const student = await Teacher.findOne({ studentID });
//     console.log(student);
//     student.isBlock = false;
//     await student.save();
//     if (student) {
//       res.status(200).json({
//         isBlock: student.isBlock,
//         message: "Success",
//       });
//     } else {
//       res.status(400).json({ message: "Id Invalid" });
//     }
//   } catch (error) {
//     throw new Error(error);
//   }
// });

//update student
export const updateStudent = asyncHandler(async (req, res) => {
  try {
    const studentID = req.params._id;
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      dob,
      gender,
      bloodGroup,
      image,
      address,
    } = req.body;
    const existingStudent = await Student.findOne({ studentID });
    console.log(existingStudent);
    if (!existingStudent) {
      return res.status(404).json({ message: "student not found" });
    }
    if (firstName !== undefined && firstName !== "")
      existingStudent.firstName = firstName;
    if (lastName !== undefined && lastName !== "")
      existingStudent.lastName = lastName;
    if (email !== undefined && email !== "") existingStudent.email = email;
    if (phoneNumber !== undefined && phoneNumber !== "")
      existingStudent.phoneNumber = phoneNumber;
    if (dob !== undefined && dob !== "") existingStudent.dob = dob;
    if (gender !== undefined && gender !== "") existingStudent.gender = gender;
    if (bloodGroup !== undefined && bloodGroup !== "")
      existingStudent.bloodGroup = bloodGroup;
    if (image !== undefined && image !== "") existingStudent.image = image;
    if (address) {
      const { pinCode, state, landMark, city, addressType } = address || {};

      if (pinCode !== undefined && pinCode !== "")
        existingStudent.address[0].pinCode = pinCode?.toString();
      if (state !== undefined && state !== " ")
        existingStudent.address[0].state = state?.toString();
      if (landMark !== undefined && landMark && landMark !== "")
        existingStudent.address[0].landMark = landMark?.toString();
      if (city !== undefined && city !== "")
        existingStudent.address[0].city = city?.toString();
      if (addressType !== undefined && addressType !== "")
        existingStudent.address[0].addressType = addressType?.toString();
    }
    await existingStudent.save();
    res
      .status(200)
      .json({ message: "Student updated successfully", existingStudent });
  } catch (error) {
    throw new Error(error);
  }
});

//delete student
export const deleteStudent = asyncHandler(async (req, res) => {
  try {
    const studentID = req.params._id;
    const deletedStudent = await Student.findOneAndDelete({ studentID });
    if (deletedStudent) {
      res.status(200).json({ message: "Teacher deleted successfully" });
    } else {
      res.status(404).json({ message: "Teacher not found" });
    }
  } catch (error) {
    throw new Error(error);
  }
});

//get all students
export const getAllStudents = asyncHandler(async (req, res) => {
  try {
    const students = await Student.find({})
      .populate({
        path: "className",
        select: "className",
      })
      .populate({
        path: "section",
        select: "sectionName",
      });
    res.status(200).json({ students, message: "All students rendered" });
  } catch (error) {
    throw new Error(error);
  }
});
