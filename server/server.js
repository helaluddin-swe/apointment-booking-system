
import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import connectCloudinary from "./config/cloudinary.js"
import adminRouter from "./routes/adminRoutes.js"
import cors from "cors"
dotenv.config()
const app=express()
// middleware
app.use(express.urlencoded())
app.use(express.json())
app.use(cors())

connectDB()
connectCloudinary()


// endpoint 
app.use("/api/admin",adminRouter)

const PORT=process.env.PORT
app.use("/",(req,res)=>res.send("api live"))
app.listen(PORT,()=>console.log(`server run on http://localhost:${PORT}`))