import jwt from "jsonwebtoken"

const adminAuth=async(req,res ,next)=>{
 try {
  const {atoken}=req.headers

  if(!atoken){
    return res.json({success:false,message:"Invalid and try not loin again"})
  }


  const decode= jwt.verify(atoken,process.env.JWT_SECRET)

  // check with admin email and passwords
  if(decode !==process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
     return res.json({success:false,message:"Not Authorized and login again"})
  }
  next()
 } catch (error) {
   console.log(error.message)
    return res.status(500).json({success:false,message:error.message}) 
 }
}
export default adminAuth