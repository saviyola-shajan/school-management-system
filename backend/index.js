import express from "express";
import dotenv from 'dotenv'
import cors from "cors";
import cookieParser from "cookie-parser"
import connectDB from "./config/db.js"
import session from "express-session"
import adminRoutes from "./routes/adminRoutes.js"
import studentRoutes from "./routes/studentRoutes.js"
import teacherRoutes from "./routes/teacherRoutes.js"
import errorHandler from "./middleware/errorMiddleware.js";

dotenv.config()
const app = express();
app.use(express.json());
// app.use(cors());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin:'http://localhost:5173',
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
}))

app.use(express.static("./public"))
const sessionSecret=process.env.SESSION_SECRET 

app.use(session({
  secret:sessionSecret,
  resave:false,
  saveUninitialized:false,
  cookie:{
    maxAge: 24 * 60 * 60 * 1000,
  }
}))


app.use('/api/student',studentRoutes)
app.use('/api/teacher',teacherRoutes)
app.use('/api/admin',adminRoutes)
app.use(errorHandler)

connectDB();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
