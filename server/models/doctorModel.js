import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, required: true },
  speciality: { type: String, required: true }, 
  degree: { type: String, required: true },
  experience: { type: String, required: true },
  status: { type: String,enum:["ACTIVE","INACTIVE"], default:"ACTIVE" }, 
  fees: { type: Number, required: true },
  about: { type: String, required: true },
  available: { type: Boolean, default: true },
  date: { type: Number, }, 
  address: { type: Object, required: true },
  book_slot: { type: Object, default: {} },
}, { minimize: false });
const DoctorModel=mongoose.models.doctor || mongoose.model("doctor",doctorSchema)
export default DoctorModel