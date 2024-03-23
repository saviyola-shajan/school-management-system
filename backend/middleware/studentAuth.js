import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler"
import Student from "../modles/studentModel";

const protectStudent = asyncHandler(async(req,res,next)=>{
    let token;

    token = req.cookies.jwt;

    if(token){
        try {
            
            const decode =  jwt.verify(token,process.env.JWT_SECRET)
            req.user= await Student.findById(decode.id).select('-password')
            next()
        } catch (error) {
            res.status(401).send('Not Authorized, Invalid Token')
        } 
    }else{
        res.status(401).send('Not Authorized, no token')
    }

})
export {protectStudent}