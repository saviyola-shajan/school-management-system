import express from "express";
import dotenv from 'dotenv'
import cors from "cors";
import connectDB from "./config/db.js"
import cookieParser from "cookie-parser"
import adminRoutes from "./routes/adminRoutes.js"
import studentRoutes from "./routes/studentRoutes.js"
import teacherRoutes from "./routes/teacherRoutes.js"

dotenv.config()
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }));

app.use(express.static("./public"))


app.use('/',studentRoutes)
app.use('/teacher',teacherRoutes)
app.use('/admin',adminRoutes)

const PORT = process.env.PORT || 5000;
connectDB();

app.listen(PORT, () =>
  console.log(`Server started on http://localhost:${PORT}`)
);
