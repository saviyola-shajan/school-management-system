import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler"
import Admin from "../modles/adminModel";

const protectAdmin = asyncHandler(async(req,res,next)=>{
    let token;

    token = req.cookies.jwt;

    if(token){
        try {
            
            const decode =  jwt.verify(token,process.env.JWT_SECRET)
            req.user= await Admin.findById(decode.id).select('-password')
            next()
        } catch (error) {
            res.status(401).send('Not Authorized, Invalid Token')
        } 
    }else{
        res.status(401).send('Not Authorized, no token')
    }

})
export {protectAdmin}