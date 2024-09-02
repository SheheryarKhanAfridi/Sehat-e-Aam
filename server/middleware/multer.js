const multer = require("multer");
const { v4 } = require("uuid");

storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    const id = v4();
    console.log(file, "file");
    const ext = file.originalname.split(".").pop();

    cb(null, `${id}.${ext}`);
  },
});

const upload = multer({ storage }); // Define 'upload' here

module.exports.doctorUpload = upload.fields([
  { name: "cnicBack", maxCount: 1 },
  { name: "cnicFront", maxCount: 1 },
  { name: "medicalLicencePicture", maxCount: 1 },
]);

module.exports.patientUpload = upload.fields([
  { name: "cnicBack", maxCount: 1 },
  { name: "cnicFront", maxCount: 1 },
]);

module.exports.laboratorytUpload = upload.fields([
  { name: "laboratoryRegistrationDocument", maxCount: 1 },
  { name: "contactPersonEmployeeCard", maxCount: 1 },
]);

module.exports.insuranceCompUpload = upload.fields([
  { name: "businessRegistrationDocument", maxCount: 1 },
  { name: "employeeCardPicture", maxCount: 1 },
]);
module.exports.pharmacyVendorUpload = upload.fields([
  { name: "cnicBack", maxCount: 1 },
  { name: "cnicFront", maxCount: 1 },
  { name: "businessRegistrationCertificatePicture", maxCount: 1 },
  { name: "pharmacistLicence", maxCount: 1 },
]);
