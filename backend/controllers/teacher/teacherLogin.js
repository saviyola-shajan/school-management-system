import asyncHandler from 'express-async-handler'


export const teacherLogin = asyncHandler(async(req,res)=>{
try{
  res.send("teacher side")
}catch(error){
    throw new Error("Invalid Email or Password")
}
})