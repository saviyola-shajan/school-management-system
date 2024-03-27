import asyncHandler from "express-async-handler";
import otpGenerator from "otp-generator";
import Teacher from "../../modles/teacher/teacherModel.js";
import { sendEmailwithCredentials } from "../../util/sendEmail/sendEmailForLogin.js";
import bcrypt from 'bcrypt'

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
    const imageUrl=req.file.originalname
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
     const password=  await generatePassword()
     const teacherId= await generateTeacherId()
    const hashedPaassword=await bcrypt.hash(password, 10);
    const teacher = await Teacher.create({
      name,
      email,
      password:hashedPaassword,
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
      image:imageUrl,
      Class,
    });
    await teacher.save()
    const sendEmail=await sendEmailwithCredentials(email,password,teacherId)
    if(sendEmail){
        res.status(201).json({message:"Teacher added sucessfully . Email and Password sent to Email for Login",teacher})
    }else{
        res.status(401).json({message:"Error in adding teacher and sending email"})
    }
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
});

//generate password for teacher
const generatePassword=asyncHandler(async(req,res)=>{
    try{
        const options = {
            digits: true,
            lowerCaseAlphabets: true,
            upperCaseAlphabets: true,
            specialChars: true,
          };
          const password = otpGenerator.generate(8, options);
          console.log(password);
          return password
    }catch(error){
        res.status(400)
        throw new Error("can't generate password")
    }
})


//generate teacherId
const generateTeacherId=asyncHandler(async(req,res)=>{
    try{
        let nextId=1
        const teacherId = 'T' + nextId.toString().padStart(4, '0');
        nextId++;
        console.log(teacherId);
        return teacherId;
    }catch(error){
        res.status(400)
        throw new Error("can't generate teacherId")
    }
})

//block teacher
