const { tryCatch } = require("../middleware/error");
const Doctor = require("../models/doctors");
const Laboratory = require("../models/labortary");
const Insurance = require("../models/insurance");
const Patient = require("../models/patient");
const Pharmacy = require("../models/pharmacy");
const { errorHandler } = require("../utils/features");

const getAllUsers = tryCatch(async (req, res, next) => {
  //getting all the user from all MODELS
  const doctors = Doctor.find();
  const laboratories = Laboratory.find();
  const insuranceCompanies = Insurance.find();
  const patients = Patient.find();
  const pharmacies = Pharmacy.find();

  const allUsers = await Promise.all([doctors, laboratories, insuranceCompanies, patients, pharmacies]);

  const usersArray = [].concat(allUsers[0], allUsers[1], allUsers[2], allUsers[3], allUsers[4]);

  res.status(200).json({
    status: "success",
    data: {
      users: usersArray,
    },
  });
});

const getUserDetails = tryCatch(async (req, res, next) => {
  const { modal, userId } = req.body;
  console.log(modal, userId);
  //getting user on the basis of model
  let user;
  if (modal === "Doctor") {
    user = await Doctor.findById(userId);
  } else if (modal === "Laboratory") {
    user = await Laboratory.findById(userId);
  } else if (modal === "insuranceCompany") {
    user = await Insurance.findById(userId);
  } else if (modal === "Patient") {
    user = await Patient.findById(userId);
  } else if (modal === "pharmacy") {
    user = await Pharmacy.findById(userId);
  }

  return res.status(200).json({
    status: true,
    user,
  });
});

const activateAccout = tryCatch(async (req, res, next) => {
  const { modal, userId } = req.body;
  console.log("came here", modal, userId);
  //getting user on the basis of model
  let user;
  if (modal === "Doctor") {
    user = await Doctor.findById(userId);
  } else if (modal === "Laboratory") {
    user = await Laboratory.findById(userId);
  } else if (modal === "insuranceCompany") {
    user = await Insurance.findById(userId);
  } else if (modal === "Patient") {
    user = await Patient.findById(userId);
  } else if (modal === "pharmacy") {
    user = await Pharmacy.findById(userId);
  }
  if (!user) {
    return next(new errorHandler("User not found", 404));
  }

  user.accountStatus = true;
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: "success",
    message: "Account activated successfully",
  });
});

const userStats = tryCatch(async (req, res, next) => {
  const doctors = Doctor.find();
  const laboratories = Laboratory.find();
  const insuranceCompanies = Insurance.find();
  const patients = Patient.find();
  const pharmacies = Pharmacy.find();

  const allUsers = await Promise.all([doctors, laboratories, insuranceCompanies, patients, pharmacies]);

  const usersArray = [].concat(allUsers[0], allUsers[1], allUsers[2], allUsers[3], allUsers[4]);

  const activeUsers = usersArray.filter((user) => user.accountStatus === true);
  const inactiveUsers = usersArray.filter((user) => user.accountStatus === false);

  const totalUsers = usersArray.length;
  const totalActiveUsers = activeUsers.length;
  const totalInactiveUsers = inactiveUsers.length;

  res.status(200).json({
    status: "success",
    totalUsers,
    totalActiveUsers,
    totalInactiveUsers,
  });
});

module.exports = { userStats, activateAccout, getUserDetails, getAllUsers };
