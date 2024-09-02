const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const DoctorAppointment = new mongoose.Schema(
  {
      DoctorId: {
        type: String
    },
    DoctorEmail: {
        type: String
    },
    ClinicName: {
        type: String
    },
    ClinicId: {
        type: String
    },
    DoctorName: {
        type: String
    },
    SpecializationField: {
        type: String
    },
    Location: {
        type: String
    },
    MedRegNum: {
        type: Number
    },
    ClinicTime: {
        type: String
    },
    DoctorPhone: {
        type: Number
    },
    AppointmentCreatedAt: {
        type: Date,
        default: Date.now
    },
    UserId: {
        type: String
    },
    UserEmail: {
        type: String
    },
    UserPhone: {
        type: Number
    },
    BookingStatus:{
        type:Number,
        default:0
        
    },
    date:{
        type:Date
    },
    time:{
        type:String
    },
    Description:{
        type:String
    }
    },
    
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("DoctorAppointment", DoctorAppointment);
