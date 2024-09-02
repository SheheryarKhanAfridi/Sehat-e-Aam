const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    gender: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    city: { type: String, required: true },
    province: { type: String, required: true },
    cnicBack: { type: String, required: true },
    cnicFront: { type: String, required: true },
    medicalLicencePicture: { type: String, required: true },
    hospitalName: { type: String, required: true },
    opdDayAndTimings: { type: String, required: true },
    specialization: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    emailAddress: { type: String, required: true },
    Clinic: [{
      DoctorId: {
        type: String
      },
      DoctorEmail: {
        type: String
      },
      ClinicName: {
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
      ClinicCreatedAt: {
        type: Date,
        default: Date.now
      },
      TotalRating:{
        type:Number
    },
      Reviews:[
        {
            Rating:{
                type:Number
            },
            Comment:{
                type:String
            },
            timestamps: {
                type: Date,
                default: Date.now,
              },
              Userid:{
                type:String
          }
        },
        
    ],
    TotalRating:{
        type:Number
    }
    }],
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, "Confirm Password is required"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords does not match!",
      },
    },
    accountStatus: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "Doctor",
    },
  },
  {
    timestamps: true,
  }
);

doctorSchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.password === undefined) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
});

doctorSchema.methods.correctPassword = async function (canPass, userPass) {
  return await bcrypt.compare(canPass, userPass);
};
module.exports = mongoose.model("Doctor", doctorSchema);
