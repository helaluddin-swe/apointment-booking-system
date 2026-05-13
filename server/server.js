

import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db"
dotenv.config()
const app=express()
connectDB()

app.use(express.json())
const PORT=process.env.PORT
app.use("/",(req,res)=>res.send("api live"))
app.listen(PORT,()=>console.log(`server run on http://localhost:${PORT}`))