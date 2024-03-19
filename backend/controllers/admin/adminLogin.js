import asyncHandler from 'express-async-handler'
import Admin from '../../modles/adminModel.js'
import generateToken from '../../util/adminToken.js'
import bcrypt from 'bcrypt'


export const adminSignup = asyncHandler(async(req,res)=>{
  try{
    const {name,email,password}=req.body
    const adminExist= await Admin.findOne({email})
    if(!email||!password){
      res.status(400)
      throw new Error("Please fill all the fields")
    }
    if(adminExist){
      res.status(400)
      throw new Error("Admin with this mail already exist...!")
    }
    const hashedPassword = await bcrypt.hash(password,10)
     const admin=await Admin.create({
      name:name,
      email:email,
      password:hashedPassword
    })
    if(admin){
      res.status(200).json({
        _id:admin.id,
        name:admin.name,
        email:admin.email,
       token: generateToken(admin._id)
      })
    }
  }catch(error){
    res.status(400)
    throw new Error("Invalid admin data")
  }
})

export const adminLogin = asyncHandler(async(req,res)=>{
try{
  const{email,password}=req.body
  const admin= await Admin.findOne({email})
  if(admin&&(await bcrypt.compare(password,admin.password))){
    res.status(201).json({
      _id:admin.id,
      name:admin.name,
      email:admin.email,
      token:generateToken(admin._id)
    })
  }
}catch(error){
  res.status(401)
    throw new Error("Invalid Email or Password")
}
})