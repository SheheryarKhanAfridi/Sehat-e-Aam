const { tryCatch, errorHandler } = require("../utils/features");
const jwt = require("jsonwebtoken");
const Doctor = require("../models/doctors");
const Patient = require("../models/patient");
const Laboratory = require("../models/labortary");
const InsuranceCompany = require("../models/insurance");
const Pharmacy = require("../models/pharmacy");

// /////////////////////////////////////FOR SENDING TOKEN BELOW ONLY/////////

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createAndSendToken = (user, statusCode, res, data) => {
  const token = signToken(user._id);
  console.log(token);
  const cookiesOption = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
  };

  res.cookie("jwt", token, cookiesOption);
  user.password = undefined;
  user.confirmPassword = undefined;

  res.status(statusCode).json({
    success: true,
    token,
    role: data.role,
    user,
  });
  console.log("It is coming here sdfsadfsadf");
};

const getUserById = tryCatch(async (req, res, next) => {
  const { id } = req.params;

  // Find user in all schemas
  const [doctor, laboratory, insurance, patient, pharmacy] = await Promise.all([Doctor.findOne({ _id: id }).select("+password"), Laboratory.findOne({ _id: id }).select("+password"), InsuranceCompany.findOne({ _id: id }).select("+password"), Patient.findOne({ _id: id }).select("+password"), Pharmacy.findOne({ _id: id }).select("+password")]);

  // Get the first user found
  const user = doctor || laboratory || insurance || patient || pharmacy;

  if (!user) {
    return next(new errorHandler("User not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

///////////////////////////////////////////////////////////////////////////////

const registerDoctor = tryCatch(async (req, res, next) => {
  const { name, gender, dateOfBirth, city, province, hospitalName, opdDayAndTimings, specialization, mobileNumber, emailAddress, password, confirmPassword } = req.body;

  console.log(req.body);
  // Check if all required fields are present
  if (!name || !gender || !dateOfBirth || !city || !province || !hospitalName || !opdDayAndTimings || !specialization || !mobileNumber || !emailAddress || !password || !confirmPassword) {
    return next(new errorHandler("Please fill all the fields", 400));
  }
  const photos = req.files;

  // Create new doctor
  const newDoctor = new Doctor({
    name,
    gender,
    dateOfBirth,
    city,
    province,

    cnicBack: photos.cnicBack?.[0]?.path,
    cnicFront: photos.cnicFront?.[0]?.path,

    medicalLicencePicture: photos.medicalLicencePicture?.[0]?.path,
    hospitalName,
    opdDayAndTimings,
    specialization,
    mobileNumber,
    emailAddress,
    password,
    confirmPassword,
  });

  await newDoctor.save();

  return res.status(201).json({
    status: "success",
    data: {
      doctor: newDoctor,
    },
  });
});

const registerPatients = tryCatch(async (req, res, next) => {
  const { name, gender, dateOfBirth, city, province, mobileNumber, emailAddress, password, confirmPassword } = req.body;

  console.log(req.body);
  // Check if all required fields are present
  if (!name || !gender || !dateOfBirth || !city || !province || !mobileNumber || !emailAddress || !password || !confirmPassword) {
    return next(new errorHandler("Please fill all the fields", 400));
  }
  const photos = req.files;

  // Create new patient
  const newPatient = new Patient({
    name,
    gender,
    dateOfBirth,
    city,
    province,
    cnicBack: photos.cnicBack?.[0]?.path,
    cnicFront: photos.cnicFront?.[0]?.path,
    mobileNumber,
    emailAddress,
    password,
    confirmPassword,
  });

  await newPatient.save();

  return res.status(201).json({
    status: "success",
    data: {
      patient: newPatient,
    },
  });
});
const registerLaboratory = tryCatch(async (req, res, next) => {
  const { laboratoryName, laboratoryAddress, emailAddress, contactPersonName, contactPersonNumber, password, confirmPassword } = req.body;

  console.log(req.body);
  // Check if all required fields are present
  if (!laboratoryName || !laboratoryAddress || !emailAddress || !contactPersonName || !contactPersonNumber || !password || !confirmPassword) {
    return next(new errorHandler("Please fill all the fields", 400));
  }
  const photos = req.files;

  // Create new laboratory
  const newLaboratory = new Laboratory({
    emailAddress,
    laboratoryName,
    laboratoryAddress,
    laboratoryRegistrationDocument: photos.laboratoryRegistrationDocument?.[0]?.path,
    contactPersonName,
    contactPersonNumber,
    contactPersonEmployeeCard: photos.contactPersonEmployeeCard?.[0]?.path,
    password,
    confirmPassword,
  });

  await newLaboratory.save();

  return res.status(201).json({
    status: "success",
    data: {
      laboratory: newLaboratory,
    },
  });
});

const registerInsuranceComp = tryCatch(async (req, res, next) => {
  const { insuranceCompanyName, headOfficeAddress, name, number, emailAddress, password, confirmPassword } = req.body;

  console.log(req.body);
  // Check if all required fields are present
  if (!insuranceCompanyName || !headOfficeAddress || !name || !number || !emailAddress || !password || !confirmPassword) {
    return next(new errorHandler("Please fill all the fields", 400));
  }
  const photos = req.files;

  // Create new insurance company
  const newInsuranceCompany = new InsuranceCompany({
    insuranceCompanyName,
    headOfficeAddress,
    businessRegistrationDocument: photos.businessRegistrationDocument?.[0]?.path,
    contactPerson: {
      name,
      number,
      employeeCardPicture: photos.employeeCardPicture?.[0]?.path,
    },
    emailAddress,
    password,
    confirmPassword,
  });

  await newInsuranceCompany.save();

  return res.status(201).json({
    status: "success",
    data: {
      insuranceCompany: newInsuranceCompany,
    },
  });
});

const registerPharmacyvendor = tryCatch(async (req, res, next) => {
  const { pharmacyName, city, address, registeredPharmacistName, contactNumber, emailAddress, password, confirmPassword } = req.body;

  console.log(req.body);
  // Check if all required fields are present
  if (!pharmacyName || !city || !address || !registeredPharmacistName || !contactNumber || !emailAddress || !password || !confirmPassword) {
    return next(new errorHandler("Please fill all the fields", 400));
  }
  const photos = req.files;

  // Create new pharmacy
  const newPharmacy = new Pharmacy({
    pharmacyName,
    city,
    address,
    registeredPharmacistName,
    cnicBack: photos.cnicBack?.[0]?.path,
    cnicFront: photos.cnicFront?.[0]?.path,
    pharmacistLicence: photos.pharmacistLicence?.[0]?.path,
    businessRegistrationCertificatePicture: photos.businessRegistrationCertificatePicture?.[0]?.path,
    contactNumber,
    emailAddress,
    password,
    confirmPassword,
  });

  await newPharmacy.save();

  return res.status(201).json({
    status: "success",
    data: {
      pharmacy: newPharmacy,
    },
  });
});

const login = tryCatch(async (req, res, next) => {
  const { emailAddress, password, from } = req.body;
  console.log(req.body);
  if (!emailAddress || !password) {
    return next(new errorHandler("Please provide email and password", 400));
  }

  // Find user in all schemas
  const [doctor, laboratory, insurance, patient, pharmacy] = await Promise.all([Doctor.findOne({ emailAddress }).select("+password"), Laboratory.findOne({ emailAddress }).select("+password"), InsuranceCompany.findOne({ emailAddress }).select("+password"), Patient.findOne({ emailAddress }).select("+password"), Pharmacy.findOne({ emailAddress }).select("+password")]);

  // Get the first user found
  const user = doctor || laboratory || insurance || patient || pharmacy;

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new errorHandler("Incorrect Email or Password", 401));
  }

  if (user.accountStatus === false) {
    return next(new errorHandler("Your account is not Activated Yet by the Admin", 401));
  }
  if (from === "adminLogin" && user.role !== "Admin") {
    return next(new errorHandler("You are not allowed to login from here", 401));
  }
  createAndSendToken(user._id, 201, res, user);
  // return res.status(200).json({ success: true, message: "Logged in successfully", user });
});

const adminLogin = tryCatch(async (req, res, next) => {
  const { name, password } = req.body;
  console.log("chal raha ha bhai");

  console.log(req.body);
  if (!name || !password) {
    return next(new errorHandler("Please provide User name and password", 400));
  }

  // Find user in all schemas
  const user = await Doctor.findOne({ name }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new errorHandler("Incorrect User name or Password", 401));
  }

  if (user.role !== "Admin") {
    return next(new errorHandler("You are not allowed to login from here", 401));
  }
  createAndSendToken(user._id, 201, res, user);
  // return res.status(200).json({ success: true, message: "Logged in successfully", user });
});

module.exports = { adminLogin, getUserById, login, registerDoctor, registerPharmacyvendor, registerInsuranceComp, registerPatients, registerLaboratory };
