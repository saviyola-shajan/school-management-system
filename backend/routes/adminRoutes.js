import  express  from "express";
import { adminLogin } from "../controllers/admin/adminLogin.js";
const adminRouter =express.Router()



adminRouter.get("",adminLogin)

export default adminRouter

