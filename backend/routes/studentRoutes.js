import express from "express"
import { studentLogin } from "../controllers/student/studentLogin.js";


const studentRouter=express.Router()

studentRouter.get('/',studentLogin)

export default studentRouter