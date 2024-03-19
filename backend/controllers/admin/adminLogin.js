import asyncHandler from 'express-async-handler'


export const adminLogin = asyncHandler(async(req,res)=>{
try{
  res.send("admin side")
}catch(error){
    throw new Error("Invalid Email or Password")
}
})