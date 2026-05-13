import DoctorModel from "../models/doctorModel.js"



// get all doctore for admin 
export const getAllDoctors=async(req,res)=>{
  try {
    const data=await DoctorModel.find({})
    res.json({success:true,data})
  } catch (error) {
    console.log(error.message)
    res.json({success:false,message:error.message})
    
  }
}