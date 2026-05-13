


import bcrypt from "bcryptjs"
import DoctorModel from "../models/doctorModel.js";
import {v2 as cloudinary} from "cloudinary"
import { parse } from "dotenv";
// add doctor in admin panel 
// POST /api/admin/add-doctor

export const addDoctor=async(req,res)=>{
  try {
    const { name, email, password, degree, fees, speciality, experience, about, address } = req.body;
    const imageFile = req.file;
   
    if(!name || !email || !password || !degree || !speciality || !experience || !address){
      return res.status(401).json({success:false,message:"Required Fields"})
    }
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)
    const imageUpload=await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
    const imageUrl=imageUpload.secure_url
    const newDoctor=new DoctorModel({
      name,
      email,
      password:hashedPassword,
      address:JSON.parse(address),
      fees:Number(fees),
      degree,
      speciality,
      experience,date:Date.now(),
      about,image:imageUrl
    })
    await newDoctor.save()
    res.status(201).json({success:true,data:newDoctor,message:"Add Doctor Successfully"})
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({success:false,message:error.message})
  }
}