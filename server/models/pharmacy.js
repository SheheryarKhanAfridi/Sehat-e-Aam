const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const pharmacySchema = new mongoose.Schema(
  {
    pharmacyName: { type: String, required: true },
    city: { type: String, required: true },

    address: { type: String, required: true },

    registeredPharmacistName: { type: String, required: true },

    cnicBack: { type: String, required: true },
    cnicFront: { type: String, required: true },

    businessRegistrationCertificatePicture: { type: String, required: true },
    pharmacistLicence: { type: String, required: true },
    contactNumber: { type: String, required: true },
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
      default: "pharmacy",
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
pharmacySchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.password === undefined) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
});

pharmacySchema.methods.correctPassword = async function (canPass, userPass) {
  return await bcrypt.compare(canPass, userPass);
};
module.exports = mongoose.model("Pharmacy", pharmacySchema);
