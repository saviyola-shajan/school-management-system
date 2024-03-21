import asyncHandler from "express-async-handler";
import Admin from "../../modles/adminModel.js";
import generateToken from "../../util/adminToken.js";
import { adminForgotEmail } from "../../util/sendEmail/adminSentEmail.js";
import bcrypt from "bcrypt";
import otpGenerator from "otp-generator";

//admin register
export const adminSignup = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const adminExist = await Admin.findOne({ email });
    if (!email || !password) {
      res.status(400).json({message:"Please fill all the fields"});
    }
    if (adminExist) {
      res.status(400).json({message:"Admin with this mail already exist...!"});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    if (admin) {
      generateToken(res, admin._id);
      res.status(200).json({
        _id: admin.id,
        name: admin.name,
        email: admin.email,
      });
    }
  } catch (error) {
    res.status(400);
    throw new Error("Invalid admin data");
  }
});

//admin login
export const adminLogin = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({message:"Please add fields"});
    }
    const admin = await Admin.findOne({ email });
    if (admin && (await bcrypt.compare(password, admin.password))) {
      generateToken(res, admin._id);
      res.status(200).json({
        _id: admin.id,
        name: admin.name,
        email: admin.email,
      });
    }
  } catch (error) {
    res.status(400);
    throw new Error("Invalid Email or Password");
  }
});

//admin forgot password

export const adminForgotPassword = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({message:"Please enter email"});
    }
    const admin = await Admin.findOne({ email });
    if (!admin) {
      res.status(400).json({message:"Email not found"});
    }
    const options = {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    };
    const otp = otpGenerator.generate(6, options);
    const adminName = admin.name;
    const sessionData = req.session;
    sessionData.adminDeatils = { adminName, email };
    sessionData.otp = otp;
    sessionData.otpGeneratedTime = Date.now();
    console.log(otp);
    console.log(sessionData);

    const sendMail = await adminForgotEmail(admin.email, otp);
    if (sendMail) {
      res.status(200).json({ message: "OTP Send" });
    } else {
      res.status(500).json({ message: "Failed to send email" });
    }
  } catch (error) {
    res.status(400);
    throw new Error("Inavild Deatils");
  }
});

//admin OTP verify
export const adminVerifyOtp = asyncHandler(async (req, res) => {
  try {
    const { otp } = req.body;
    if (!otp) {
      res.status(400).json({message:"OTP required"});
    }
    console.log(req.session);
    const sessionData = req.session;
    const adminEmail=sessionData.email
    const admin = await Admin.findOne({ adminEmail });
console.log(admin);
    const storedOTP = sessionData.otp;
    console.log(storedOTP);
    if (!storedOTP || otp !== storedOTP) {
      res.status(400).json({message:"Invalid OTP"});
    }
    const otpGeneratedTime = sessionData.otpGeneratedTime || 0;
    const currentTime = Date.now();
    const otpExpirationTime = 30 * 1000;
    if (currentTime - otpGeneratedTime > otpExpirationTime) {
      res.status(400).json({message:"OTP has expired"});
    }
    if (storedOTP === otp) {
      res.status(200).json({ admin, message: "OTP verified sucessfully" }); 
    }
  } catch (error) {
    res.status(400);
    throw new Error("Invalid OTP");
  }
});

//admin reset password
export const adminResetPassword = asyncHandler(async (req, res) => {
  try {
    const {password,confirmPassword } = req.body;
    if (!password) {
      res.status(400).json({message:"please enter password"});
    }
    if (password !== confirmPassword) {
      res.status(400).json({message:'Password do not match'});
    }
    const sessionData=req.session
    const adminEmail=sessionData.email
    const admin = await Admin.findOne({ adminEmail });
    if (!admin) {
      res.status(400).json({message:"User not found"});
    }
    if (admin) {
      const hashedPassword = await bcrypt.hash(password, 10);
      admin.password = hashedPassword;
      await admin.save();
      res.status(200).json({ message: "Password reset sucessfully" });
    }
    delete sessionData.adminDeatils;
    delete sessionData.otp;
  } catch (error) {
    res.status(500);
    throw new Error("Internal server Error");
  }
});
