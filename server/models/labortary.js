const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const laboratorySchema = new mongoose.Schema(
  {
    laboratoryName: { type: String, required: true },
    laboratoryAddress: { type: String, required: true },
    laboratoryRegistrationDocument: { type: String, required: true },
    contactPersonName: {
      type: String,
      required: true,
    },
    contactPersonNumber: {
      type: String,
      required: true,
    },
    contactPersonEmployeeCard: {
      type: String,
      required: true,
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
      default: "Laboratory",
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

laboratorySchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.password === undefined) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
});

laboratorySchema.methods.correctPassword = async function (canPass, userPass) {
  return await bcrypt.compare(canPass, userPass);
};

module.exports = mongoose.model("Laboratory", laboratorySchema);
