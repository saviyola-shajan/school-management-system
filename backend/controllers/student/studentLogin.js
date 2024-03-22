import asyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'
import generateToken from '../../util/token.js'
import { sendForgotEmail } from '../../util/sendEmail/forgotPasswordEmail.js'
import otpGenerator from 'otp-generator'
import Student from '../../modles/studentModel.js'

//student login
export const studentLogin = asyncHandler(async(req,res)=>{
    try{
      const{email,password,studentId}=req.body
      if(!email||!password||!studentId){
        res.status(400).json({messsage:"Please fill all the fields"})
      } 
      const student =await Student.findOne({email})
      if(!student){
        res.status(400).json({messsage:"User is not registered"})
      }
      if (student.isBlock === true) {
        return res.status(500).json({ message: "You are Blocked" })
      }
      if (student && (await bcrypt.compare(password, student.password))) {
        res.status(200).json({
          _id: student.id,
          name: student.firstName,
          email: student.email,
         token: generateToken(res, student._id),
         messsage:"Login sucessfuly"
        });
      }else {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      //for the further security we can also send otp to email and verify while login (later)
    }catch(error){
      res.status(400)
        throw new Error(error)
    }
    })


    //student forgot password
    export const studentForgotPassword = asyncHandler(async (req, res) => {
        try {
          const { email } = req.body;
          if (!email) {
            res.status(400).json({ message: "Please enter email" });
          }
          const student = await Student.findOne({ email });
          if (!student) {
            res.status(400).json({ message: "Email not found" });
          }
          const options = {
            digits: true,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
          };
          const otp = otpGenerator.generate(6, options);
          const studentName = student.firstName;
          const sessionData = req.session;
          sessionData.studentDetails = { studentName, email };
          sessionData.otp = otp;
          sessionData.otpGeneratedTime = Date.now();
          console.log(otp);
          console.log(sessionData);
      
          const sendMail = await sendForgotEmail(student.email, otp);
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

      //student verify OTP
      export const studentVerifyOtp = asyncHandler(async (req, res) => {
        try {
          const { otp } = req.body;
          console.log(otp);
          if (!otp) {
           return res.status(400).json({ message: "OTP required" });
          }
          const sessionData = req.session;
          console.log(sessionData);
          const studentEmail = sessionData.email;
          const student = await Student.findOne({ studentEmail });
          const storedOTP = sessionData.otp;
          console.log(storedOTP);
          if (!storedOTP || otp !== storedOTP) {
           return res.status(400).json({ message: "Invalid OTP" });
          }
          const otpGeneratedTime = sessionData.otpGeneratedTime || 0;
          const currentTime = Date.now();
          const otpExpirationTime = 30 * 1000;
          if (currentTime - otpGeneratedTime > otpExpirationTime) {
            return res.status(400).json({ message: "OTP has expired" });
          }
          if (storedOTP === otp) {
            res.status(200).json({ student, message: "OTP verified sucessfully" });
          }
        } catch (error) {
          res.status(400);
          throw new Error(error);
        }
      });


      //student reset password
      export const studentResetPassword = asyncHandler(async (req, res) => {
        try {
          const { password, confirmPassword } = req.body;
          if (!password) {
            res.status(400).json({ message: "please enter password" });
          }
          if (password !== confirmPassword) {
            res.status(400).json({ message: "Password do not match" });
          }
          const sessionData = req.session;
          const studentEmail = sessionData.email;
          const student = await Student.findOne({ studentEmail });
          if (!student) {
            res.status(400).json({ message: "User not found" });
          }
          if (student) {
            const hashedPassword = await bcrypt.hash(password, 10);
            student.password = hashedPassword;
            await student.save();
            res.status(200).json({ message: "Password reset sucessfully" });
          }
          delete sessionData.studentDetails;
          delete sessionData.otp;
          delete sessionData.otpGeneratedTime;
        } catch (error) {
          res.status(500);
          throw new Error(error);
        }
      });