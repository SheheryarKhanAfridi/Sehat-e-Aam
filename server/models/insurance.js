const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const insuranceCompanySchema = new mongoose.Schema(
  {
    insuranceCompanyName: { type: String, required: true },
    headOfficeAddress: { type: String, required: true },
    businessRegistrationDocument: { type: String, required: true },
    contactPerson: {
      name: { type: String, required: true },
      number: { type: String, required: true },
      employeeCardPicture: { type: String, required: true },
    },
    emailAddress: {
      type: String,
      required: [true, "Email is required"],
    },
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
      default: "insuranceCompany",
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

insuranceCompanySchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.password === undefined) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
});

insuranceCompanySchema.methods.correctPassword = async function (canPass, userPass) {
  return await bcrypt.compare(canPass, userPass);
};

module.exports = mongoose.model("InsuranceCompany", insuranceCompanySchema);
