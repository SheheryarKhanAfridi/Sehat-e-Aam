const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const patientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    gender: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    city: { type: String, required: true },
    province: { type: String, required: true },
    cnicBack: { type: String, required: true },
    cnicFront: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    emailAddress: { type: String, required: true },
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
    role: {
      type: String,
      default: "Patient",
    },
    accountStatus: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

patientSchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.password === undefined) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
});

patientSchema.methods.correctPassword = async function (canPass, userPass) {
  return await bcrypt.compare(canPass, userPass);
};

module.exports = mongoose.model("Patient", patientSchema);
