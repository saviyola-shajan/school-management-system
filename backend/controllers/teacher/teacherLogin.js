import asyncHandler from 'express-async-handler'
import Teacher from '../../modles/teacherModel.js'
import bcrypt from 'bcrypt'
import generateToken from '../../util/token.js'
import { sendForgotEmail } from '../../util/sendEmail/forgotPasswordEmail.js'
import otpGenerator from 'otp-generator'


//teacher login
export const teacherLogin = asyncHandler(async(req,res)=>{
try{
  const{email,password,teacherId}=req.body
  if(!email||!password||!teacherId){
    res.status(400).json({messsage:"Please fill all the fields"})
  } 
  const teacher =await Teacher.findOne({email})
  if(!teacher){
    res.status(400).json({messsage:"User is not registered"})
  }
  if (teacher.isBlock === true) {
    return res.status(500).json({ message: "You are Blocked" })
  }
  if (teacher && (await bcrypt.compare(password, teacher.password))) {
    res.status(200).json({
      _id: teacher.id,
      name: teacher.name,
      email: teacher.email,
     token: generateToken(res, teacher._id),
     messsage:"Login sucessfuly"
    });
  }else {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  //for the further security we can also send otp to email and verify while login (later)
}catch(error){
  res.status(400)
    throw new Error("Invalid Email or Password")
}
})

//teacher forgot password
export const teacherForgotPassword = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ message: "Please enter email" });
    }
    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      res.status(400).json({ message: "Email not found" });
    }
    const options = {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    };
    const otp = otpGenerator.generate(6, options);
    const teacherName = teacher.name;
    const sessionData = req.session;
    sessionData.teacherDetails = { teacherName, email };
    sessionData.otp = otp;
    sessionData.otpGeneratedTime = Date.now();
    console.log(otp);
    console.log(sessionData);

    const sendMail = await sendForgotEmail(teacher.email, otp);
    if (sendMail) {
      res.status(200).json({ message: "OTP Send" });
    } else {
      res.status(500).json({ message: "Failed to send email" });
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});



// teacher verify OTP
export const teacherVerifyOtp = asyncHandler(async (req, res) => {
  try {
    const { otp } = req.body;
    console.log(otp);
    if (!otp) {
      res.status(400).json({ message: "OTP required" });
    }
    const sessionData = req.session;
    console.log(sessionData);
    const teacherEmail = sessionData.email;
    const teacher = await Teacher.findOne({ teacherEmail });
    const storedOTP = sessionData.otp;
    console.log(storedOTP);
    if (!storedOTP || otp !== storedOTP) {
      res.status(400).json({ message: "Invalid OTP" });
    }
    const otpGeneratedTime = sessionData.otpGeneratedTime || 0;
    const currentTime = Date.now();
    const otpExpirationTime = 30 * 1000;
    if (currentTime - otpGeneratedTime > otpExpirationTime) {
      res.status(400).json({ message: "OTP has expired" });
    }
    if (storedOTP === otp) {
      res.status(200).json({ teacher, message: "OTP verified sucessfully" });
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

// if needed set resend otp

//teacher reset password
export const teacherResetPassword = asyncHandler(async (req, res) => {
  try {
    const { password, confirmPassword } = req.body;
    if (!password) {
      res.status(400).json({ message: "please enter password" });
    }
    if (password !== confirmPassword) {
      res.status(400).json({ message: "Password do not match" });
    }
    const sessionData = req.session;
    const teacherEmail = sessionData.email;
    const teacher = await Teacher.findOne({ teacherEmail });
    if (!teacher) {
      res.status(400).json({ message: "User not found" });
    }
    if (teacher) {
      const hashedPassword = await bcrypt.hash(password, 10);
      teacher.password = hashedPassword;
      await teacher.save();
      res.status(200).json({ message: "Password reset sucessfully" });
    }
    delete sessionData.teacherDetails;
    delete sessionData.otp;
    delete sessionData.otpGeneratedTime;
  } catch (error) {
    res.status(500);
    throw new Error("Internal server Error");
  }
});