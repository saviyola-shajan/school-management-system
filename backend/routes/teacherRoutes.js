import express from "express"
import { teacherLogin } from "../controllers/teacher/teacherLogin.js"
const teacherRouter=express.Router()



teacherRouter.get("",teacherLogin)

export default teacherRouter