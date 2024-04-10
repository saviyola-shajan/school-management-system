import asyncHandler from "express-async-handler";
import otpGenerator from "otp-generator";
import Teacher from "../../modles/teacher/teacherModel.js";
import { sendEmailwithCredentials } from "../../util/sendEmail/sendEmailForLogin.js";
import bcrypt from "bcrypt";

//add teacher
export const adminAddTeacher = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      email,
      phoneNumber,
      dob,
      gender,
      bloodGroup,
      subject,
      address,
      section,
      image,
      Class,
    } = req.body;
    const imageUrl = req.file.originalname;
    const { addressType, city, state, pinCode, landMark } = address;
    if (
      !name ||
      !email ||
      !phoneNumber ||
      !dob ||
      !bloodGroup ||
      !subject ||
      !address ||
      !section ||
      !image ||
      !Class
    ) {
      res.status(400).json({ message: "Please fill all fields" });
    }
    const password = await generatePassword();
    const teacherId = await generateTeacherId();
    const hashedPaassword = await bcrypt.hash(password, 10);
    const teacher = await Teacher.create({
      name,
      email,
      password: hashedPaassword,
      teacherId,
      phoneNumber,
      dob,
      gender,
      bloodGroup,
      subject,
      address: {
        addressType,
        city,
        state,
        pinCode,
        landMark,
      },
      section,
      image: imageUrl,
      Class,
    });
    await teacher.save();
    const sendEmail = await sendEmailwithCredentials(
      email,
      password,
      teacherId
    );
    if (sendEmail) {
      res.status(201).json({
        message:
          "Teacher added sucessfully . Email and Password sent to Email for Login",
        teacher,
      });
    } else {
      res
        .status(401)
        .json({ message: "Error in adding teacher and sending email" });
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

//generate password for teacher
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

//generate teacherId
const generateTeacherId = asyncHandler(async (req, res) => {
  try {
    let nextId = 1;
    const teacherId = "T" + nextId.toString().padStart(4, "0");
    nextId++;
    console.log(teacherId);
    return teacherId;
  } catch (error) {
    res.status(400);
    throw new Error("can't generate teacherId");
  }
});

//block teacher
export const teacherBlock = asyncHandler(async (req, res) => {
  try {
    const teacherID = req.params._id;
    const teacher = await Teacher.findOne({ teacherID });
    console.log(teacher);
    teacher.isBlock = !teacher.isBlock;
    await teacher.save();
    if (teacher) {
      res.status(200).json({
        isBlock: teacher.isBlock,
        message: "Success",
      });
    } else {
      res.status(400).json({ message: "Id Invalid" });
    }
  } catch (error) {
    throw new Error(error);
  }
});

//unblock teacher
// export const teacherUnBlock = asyncHandler(async (req, res) => {
//   try {
//     const teacherID = req.params._id;
//     const teacher = await Teacher.findOne({ teacherID });
//     console.log(teacher);
//     teacher.isBlock = false;
//     await teacher.save();
//     if (teacher) {
//       res.status(200).json({
//         isBlock: teacher.isBlock,
//         message: "Success",
//       });
//     } else {
//       res.status(400).json({ message: "Id Invalid" });
//     }
//   } catch (error) {
//     throw new Error(error);
//   }
// });

//update teacher
export const updateTeacher = asyncHandler(async (req, res) => {
  try {
    const teacherID = req.params._id;
    const {
      name,
      email,
      phoneNumber,
      dob,
      gender,
      bloodGroup,
      Class,
      section,
      image,
      subject,
      address,
    } = req.body;

    const existingTeacher = await Teacher.findOne({ teacherID });
    if (!existingTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    if (name !== undefined && name !== "") existingTeacher.name = name;
    if (email !== undefined && email !== "") existingTeacher.email = email;
    if (phoneNumber !== undefined && phoneNumber !== "")
      existingTeacher.phoneNumber = phoneNumber;
    if (dob !== undefined && dob !== "") existingTeacher.dob = dob;
    if (gender !== undefined && gender !== "") existingTeacher.gender = gender;
    if (bloodGroup !== undefined && bloodGroup !== "")
      existingTeacher.bloodGroup = bloodGroup;
    if (Class !== undefined && Class !== "") existingTeacher.Class = Class;
    if (section !== undefined && section !== "")
      existingTeacher.section = section;
    if (image !== undefined && image !== "") existingTeacher.image = image;
    if (subject !== undefined && subject !== "")
      existingTeacher.subject = subject;

    if (address) {
      const { pinCode, state, landMark, city, addressType } = address || {};

      if (pinCode !== undefined && pinCode !== "")
        existingTeacher.address[0].pinCode = pinCode?.toString();
      if (state !== undefined && state !== " ")
        existingTeacher.address[0].state = state?.toString();
      if (landMark !== undefined && landMark && landMark !== "")
        existingTeacher.address[0].landMark = landMark?.toString();
      if (city !== undefined && city !== "")
        existingTeacher.address[0].city = city?.toString();
      if (addressType !== undefined && addressType !== "")
        existingTeacher.address[0].addressType = addressType?.toString();
    }

    await existingTeacher.save();

    res
      .status(200)
      .json({ message: "Teacher updated successfully", existingTeacher });
  } catch (error) {
    throw new Error(error);
  }
});

//delete  Teacher
export const deleteTeacher = asyncHandler(async (req, res) => {
  try {
    const teacherID = req.params._id;
    const deletedTeacher = await Teacher.findOneAndDelete({ teacherID });

    if (deletedTeacher) {
      res.status(200).json({ message: "Teacher deleted successfully" });
    } else {
      res.status(404).json({ message: "Teacher not found" });
    }
  } catch (error) {
    throw new Error(error);
  }
});

//add attendence teacher
