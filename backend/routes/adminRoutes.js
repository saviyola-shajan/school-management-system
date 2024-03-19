import  express  from "express";
import { adminLogin,adminSignup } from "../controllers/admin/adminLogin.js";
const adminRouter =express.Router()

//login routes
adminRouter.post("/adminsignup",adminSignup)
adminRouter.get("/login",adminLogin)

export default adminRouter

