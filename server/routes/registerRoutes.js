const express = require("express");
const { registerDoctor, registerPatients, registerLaboratory, registerInsuranceComp, registerPharmacyvendor, login, getUserById, adminLogin } = require("../controllers/registerstionController");
const { doctorUpload, patientUpload, laboratorytUpload, insuranceCompUpload, pharmacyVendorUpload } = require("../middleware/multer");
const testlist = require("../models/testlist");
const router = express.Router();

// GET routes
router.post("/regDoctors", doctorUpload, registerDoctor);
router.post("/regPatients", patientUpload, registerPatients);
router.post("/regLaboratory", laboratorytUpload, registerLaboratory);
router.post("/regInsuranceComp", insuranceCompUpload, registerInsuranceComp);
router.post("/regPharmacyVendor", pharmacyVendorUpload, registerPharmacyvendor);
router.post("/login", login);
router.post("/adminLogin", adminLogin);




router.get("/:id", getUserById); // Get user by id and delete user (admin only)

module.exports = router;
