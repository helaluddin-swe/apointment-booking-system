


import bcrypt from "bcryptjs"
import DoctorModel from "../models/doctorModel.js";
import {v2 as cloudinary} from "cloudinary"
import validator from "validator"
// add doctor in admin panel 
// POST /api/admin/add-doctor

export const addDoctor=async(req,res)=>{
  try {
    const { name, email, password, degree, fees, speciality, experience, about, address } = req.body;
    const imageFile = req.file;
   
    // check required field 
    if(!name || !email || !password || !degree || !speciality || !experience || !address){
      return res.status(401).json({success:false,message:"Required Fields"})
    }
    // check valid email address 
    if(!validator.isEmail(email)){
      return res.status(401).json({success:false,message:"Enter a valid email"})
    }

    // check strong password
    if(password.length<8){
      return res.status(401).json({success:false,message:"Enter a strong password 8 character"})
    }

    // genrate encrypted hashed password with bcryptjs
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)

    // upload doctor image in cloudinary
    const imageUpload=await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
    const imageUrl=imageUpload.secure_url

    // update and save the all doctor data in database
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


    // update save data in json format with successfull message
    res.status(201).json({success:true,data:newDoctor,message:"Add Doctor Successfully"})
  } catch (error) {

    // update a error message if working or failed to saved data in mongodb database
    console.log(error.message)
    return res.status(500).json({success:false,message:error.message})
  }
}