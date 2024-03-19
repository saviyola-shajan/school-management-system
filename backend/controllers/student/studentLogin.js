import asyncHandler from 'express-async-handler'


export const studentLogin = asyncHandler(async(req,res)=>{
try{
  res.send("student side")
}catch(error){
    throw new Error("Invalid Email or Password")
}
})