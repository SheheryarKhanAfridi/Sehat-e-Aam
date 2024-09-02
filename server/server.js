const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

const { connectDB } = require("./utils/features");
const { config } = require("dotenv");
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");
const {getBill} =require('./middleware/sendMail');
const { errorMiddleware } = require("./middleware/error");
const TestBook = require('./models/testbook')
// const userRouter = require("./routes/user");
const registerRouter = require("./routes/registerRoutes");
const adminRoutes = require("./routes/adminRoutes");
const TestList = require("./models/testlist");
const Laboratory = require("./models/labortary")
const authenticate = require("./middleware/authenticate");
const medlist = require("./models/medlist");
const { authenticator } = require("./middleware/authenticator");
const pharmacy = require("./models/pharmacy");
const MedBook = require("./models/MedBook");
const DoctorAppointment = require("./models/DoctorAppointment")
const Doctor = require("./models/doctors");
const Patient = require("./models/patient")

const app = express();
app.use(cookieParser());


app.use(express.json());
app.use(morgan("dev"));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const corsOptions = {
  origin: "http://localhost:5173", // replace with your client's origin
  credentials: true, // this allows the cookie to be sent with the request
};

app.use(cors(corsOptions));

config({
  path: "./.env",
});

connectDB();
const port = process.env.PORT || 5000;

app.use("/api/v1/register", registerRouter);
app.use("/api/v1/users", adminRoutes);


app.post('/TestListing', async (req, res) => {
  try {
    const data = req.body;
    console.log(data)
    const { name, TestType, TestPrice } = data;

    if (!name || !TestType || !TestPrice) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    console.log(req.body);
    let username = req.cookies['jwt'];
    const decoded = jwt.verify(username, process.env.JWT_SECRET);

    console.log(decoded)

    const newTest = await TestList.create({
      owner: decoded.id,
      testName: name,
      testType: TestType,
      testPrice: TestPrice,
    });
    console.log(newTest);


    return res.status(201).json({ message: 'Test created successfully', test: newTest });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




app.get('/labtests', async (req, res) => {
  try {
    const tests = await TestList.find(); // Fetch all tests from the database
    res.status(200).json(tests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




app.get('/mytests', authenticate, async (req, res) => {
  try {
    const tests = await TestList.find({ owner: req.userId });
    res.status(200).json(tests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.delete('/test/:id', async (req, res) => {
  try {
    const testId = req.params.id;
    await TestList.findByIdAndDelete(testId);
    res.status(200).json({ message: 'Test deleted successfully' });
  } catch (error) {
    console.error('Error deleting test:', error);
    res.status(500).json({ message: 'Error deleting test' });
  }
});

app.get('/tests/:id', async (req, res) => { // to get data of tests 
  try {
    const test = await TestList.findById(req.params.id);
    if (!test) {
      return res.status(404).json({ message: 'test is not found' })
    }
    res.json(test);
  }
  catch (e) {
    res.status(500).json({ message: 'internal server error' });
  }
})


app.put('/tests/:id', async (req, res) => {
  const { testName, testType, testPrice } = req.body;
  try {
    const test = await TestList.findByIdAndUpdate(
      req.params.id,
      { testName, testType, testPrice },
      { new: true }
    );
    if (!test) {
      return res.status(404).json({ message: 'test not found' });
    }
    res.json(test);
  }
  catch (e) {
    res.status(500).json({ message: 'Server error' });
  }

})




app.get('/labs', async (req, res) => {
  try {
    const labs = await Laboratory.find();
    res.status(200).json(labs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.get('/api/tests/:labId', async (req, res) => {
  const { labId } = req.params;
  console.log(labId, 'lad idd')
  try {
    const tests = await TestList.find({ owner: labId });
    console.log(tests)
    return res.status(200).json(tests)
    // res.json(tests); 
  } catch (error) {
    console.error('Error fetching tests:', error);
    res.status(500).json({ message: 'Error fetching tests' });
  }
});

app.get('/booktests/:id', async (req, res) => {
  try {
    const test = await TestList.findById(req.params.id);
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }
    return res.status(200).json(test);
  } catch (error) {
    console.error('Error fetching test:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



app.post('/bookingtests', async (req, res) => {
  try {

    const data = req.body;
    console.log(data)
    const { testName, testType, testPrice, LabID, TestID } = data;

    console.log(req.body, 'hello');
    let username = req.cookies['jwt'];
    const decoded = jwt.verify(username, process.env.JWT_SECRET);
    console.log(decoded);
    const newTestBook = new TestBook({
      testName: testName,
      testType: testType,
      testPrice: testPrice,
      PatientID: decoded.id,
      LabID: LabID,
      TestID: TestID,

    });
    await newTestBook.save();

    res.status(201).json({ message: 'Test booked successfully!' });
  } catch (error) {
    console.error('Error booking test:', error);
    res.status(500).json({ error: 'Failed to book the test' });
  }
});


app.get('/mypatienttests', authenticate, async (req, res) => {
  try {
    const Bookedtests = await TestBook.find({ PatientID: req.userId });
    res.status(200).json(Bookedtests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/lab/bookings', async (req, res) => {
  try {
    const token = req.cookies['jwt'];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const labId = decoded.id;

    const bookings = await TestBook.find({ LabID: labId });

    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching lab bookings:', error);
    res.status(500).json({ error: 'Failed to fetch lab bookings' });
  }
});



app.post('/MedListing', async (req, res) => {
  try {
    const data = req.body;
    console.log(data)
    const { medName, medgrams, medPrice } = data;

    if (!medName || !medgrams || !medPrice) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    console.log(req.body);
    let username = req.cookies['jwt'];
    const decoded = jwt.verify(username, process.env.JWT_SECRET);

    console.log(username, 'username')

    const newMed = await medlist.create({
      Pharmacyowner: decoded.id,
      medName: medName,
      medgrams: medgrams,
      medPrice: medPrice
    });
    console.log(newMed, 'new med');


    return res.status(201).json({ message: 'Med created successfully', med: newMed });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/mymeds', authenticate, async (req, res) => {
  try {
    const meds = await medlist.find({ Pharmacyowner: req.userId });
    res.status(200).json(meds);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/mymeds/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await medlist.deleteOne({ _id: id, Pharmacyowner: req.userId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    res.status(200).json({ message: 'Medicine deleted successfully' });
  } catch (error) {
    console.error('Error deleting medicine:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.get('/mymeds/:id', async (req, res) => {
  try {
    const med = await medlist.findById(req.params.id);
    if (!med) {
      return res.status(404).json({ message: 'med is not found' })
    }
    res.json(med);
  }
  catch (e) {
    res.status(500).json({ message: 'internal server error' });
  }
})

app.put('/mymed/:id', async (req, res) => {
  const { medName, medgrams, medPrice } = req.body;
  try {
    const med = await medlist.findByIdAndUpdate(
      req.params.id,
      { medName, medgrams, medPrice },
      { new: true }
    );
    if (!med) {
      return res.status(404).json({ message: 'med not found' });
    }
    res.json(med);
  }
  catch (e) {
    res.status(500).json({ message: 'Server error' });
  }

})

app.get('/Pharms', async (req, res) => {
  try {
    const Pharmacies = await pharmacy.find();
    res.status(200).json(Pharmacies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/meds/:medId', async (req, res) => {
  const { medId } = req.params;
  console.log(medId, 'idd')
  try {
    const meds = await medlist.find({ Pharmacyowner: medId });
    console.log(meds)
    return res.status(200).json(meds)
  } catch (error) {
    console.error('Error fetching meds:', error);
    res.status(500).json({ message: 'Error fetching meds' });
  }
});

app.get('/PharmacyMeds/:id', async (req, res) => {
  try {
    const meds = await medlist.findById(req.params.id);
    if (!meds) {
      return res.status(404).json({ message: 'Test not found' });
    }
    return res.status(200).json(meds);
  } catch (error) {
    console.error('Error fetching test:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/bookingmeds', async (req, res) => {
  try {

    const data = req.body;
    console.log(data)
    const { medName, medgrams, medPrice, Pharmacyowner, MedID, } = data;

    console.log(req.body, 'hello');
    let username = req.cookies['jwt'];
    const decoded = jwt.verify(username, process.env.JWT_SECRET);
    console.log(decoded);
    const newMedBook = new MedBook({
      medName: medName,
      medgrams: medgrams,
      medPrice: medPrice,
      PatientID: decoded.id,
      Pharmacyowner: Pharmacyowner,
      MedID: MedID,

    });
    await newMedBook.save();

    res.status(201).json({ message: 'Med booked successfully!' });
  } catch (error) {
    console.error('Error booking test:', error);
    res.status(500).json({ error: 'Failed to book the test' });
  }
});
app.post('/doctorform', async (req, res) => {
  const { email, ClinicName, name, Specialization, Location, MedRegNum, ClinicTime, phone } = req.body;
  let username = req.cookies['jwt'];
  const data=req.body;
  console.log(data)
  // Check if user is authenticated
  if (!username) {
    return res.status(401).json({ message: 'User is not logged in' });
  }
  try {
    // Verify JWT token and get user information
    const decoded = jwt.verify(username, process.env.JWT_SECRET);
    const user = await Doctor.findOne({ _id: decoded.id });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log(user._id)
    
    const existingClinic = user.Clinic.find(clinic => clinic.DoctorId.toString() === user._id.toString());
   
    if (existingClinic) {
      return res.status(403).json({ message: 'Clinic already registered' });
    }

    // Update clinic data in user document
    user.Clinic.push({
      DoctorId: user._id,
      DoctorEmail: email,
      ClinicName: ClinicName,
      DoctorName: name,
      SpecializationField: Specialization,
      Location: Location,
      MedRegNum: MedRegNum,
      ClinicTime: ClinicTime,
      DoctorPhone: phone
    });

    // Save the updated user document
    await user.save({ validateBeforeSave: false });

    console.log('Clinic data added:', user.Clinic[user.Clinic.length - 1]); // Logging the last added clinic data
    res.status(200).json({ message: 'Clinic data added successfully', clinic: user.Clinic[user.Clinic.length - 1] });
  } catch (error) {
    console.error('Error adding clinic data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/getClinic', async (req, res) => {
  let username = req.cookies['jwt'];
  if (!username) {
    return res.status(401).json({ message: 'User is not logged in' });
  }
  try {
    const decoded = jwt.verify(username, process.env.JWT_SECRET);
    const user = await Doctor.findOne({ _id: decoded.id });
    console.log(user)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    } 
    const existingClinic = user.Clinic.find(clinic => clinic.DoctorId.toString() === user._id.toString());

    if (existingClinic) {
      return res.status(403).json(user);
    }
    return res.status(200).json('shop not found', user)
  } catch (error) {
    console.error('Error adding clinic data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/DoctorsDataAll', async (req, res) => {
  let username = req.cookies['jwt'];
  if (!username) {
    return res.status(401).json('cookie not found')
  }
  const decoded = jwt.verify(username, process.env.JWT_SECRET);
  const id = decoded.id
  const clinics = await Doctor.find();
  console.log(clinics)
  if (clinics) {
    return res.status(200).json({ clinics, 'User Id': id })
  }
  else {
    return res.status(400).json({ clinics })
  }
})

app.post('/DoctorApointmentBookingData', async (req, res) => {
  const data = req.body
  const { date, time, Description } = data;
  if (!date || !time || !Description) {
    console.log(data)
    return res.status(400).json('empty data')
  }
  let username = req.cookies['jwt'];
  if (!username) {
    return res.status(401).json('cookie not found')
  }
  const decoded = jwt.verify(username, process.env.JWT_SECRET);
  const user = await Patient.findOne({ _id: decoded.id });
  console.log(user, 'use Details')
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  console.log(user)
  const { DoctorEmail, ClinicName, DoctorName, SpecializationField, MedRegNum, Location, ClinicTime, DoctorPhone, DoctorId ,_id} = data
  console.log(_id,'clininc id');


  const appointment = await DoctorAppointment.create({
    date: date,
    time: time,
    Description: Description,
    DoctorEmail: DoctorEmail,
    ClinicName: ClinicName,
    DoctorName: DoctorName,
    DoctorName: DoctorName,
    SpecializationField: SpecializationField,
    MedRegNum: MedRegNum,
    Location: Location,
    ClinicTime: ClinicTime,
    ClinicTime: ClinicTime,
    DoctorPhone: DoctorPhone,
    DoctorId: DoctorId,
    UserId: decoded.id,
    UserEmail: user.emailAddress,
    UserPhone: user.mobileNumber,
    ClinicId:_id
  })
  console.log(appointment);
  return res.status(200).json({
    message: 'Appointment booked',
    appointment: appointment
  });
})


app.post('/ApointmentHistoryOfUser', async (req, res) => {
  const data = req.body
  console.log(data)
  const userId = data.id;
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }
  const appointments = await DoctorAppointment.find({ UserId: userId });
  console.log(appointments)
  if (appointments) {
    return res.status(200).json(appointments);
  }
  return res.status(401).json('zero appointments')
})

app.post('/CancellationDoctorAppointment', async (req, res) => {
  const data = req.body
  if (!data) {
    return res.status(400).json('data not found')
  }
  const appointment = await DoctorAppointment.findOne({ _id: data.id });
  if (!appointment) {
    return res.status(401).json('appointment not found');
  }
  console.log(appointment)
  // 0=pending, 1=approved, 2=cancel by user, 3=cancel by doctor, 4=completed
  appointment.BookingStatus = 2
  appointment.save();
  return res.status(200).json('appointment updated')
})

app.post('/AppointmentsforDoctor', async (req, res) => {
  const data = req.body;
  console.log(data)
  const appointment = await DoctorAppointment.find({ DoctorId: data.id });
  console.log(appointment)
  return res.status(200).json(appointment)
})

app.post('/updateStatus', async (req, res) => {
  console.log('data')
  const data = req.body;
  try {
    const appointment = await DoctorAppointment.findOne({ _id: data.id });
    appointment.BookingStatus = data.status
    await appointment.save()
    return res.status(200).json('status updated')
  } catch (error) {
    return res.status(500).json('server error')
  }
})

app.post('/updateClinicDetailss', async (req, res) => {
  const { DoctorId, DoctorEmail, ClinicName, DoctorName, SpecializationField, Location, MedRegNum, ClinicTime } = req.body;
  const object = { DoctorId, DoctorEmail, ClinicName, DoctorName, SpecializationField, Location, MedRegNum, ClinicTime };
  console.log(object, 'object hai bro');
  try { 
    const doctor = await Doctor.findOne({ _id: object.DoctorId });

    if (!doctor) {
      return res.status(404).json('Doctor not found');
    } 
    const clinicData = doctor.Clinic[0];
    if (!clinicData) {
      return res.status(405).json('Clinic not found');
    } 
    clinicData.DoctorEmail = object.DoctorEmail;
    clinicData.ClinicName = object.ClinicName;
    clinicData.DoctorName = object.DoctorName;
    clinicData.SpecializationField = object.SpecializationField;
    clinicData.Location = object.Location;
    clinicData.MedRegNum = object.MedRegNum;
    clinicData.ClinicTime = object.ClinicTime;
    await doctor.save({ validateBeforeSave: false });

    return res.status(200).json('Clinic details updated successfully');
  } catch (error) {
    console.error('Error updating clinic details:', error);
    return res.status(500).json('Server error');
  }
});


app.post('/sendReviewForClinic', async (req, res) => {
  const data = req.body;
  try {
    // Find the doctor by DoctorId from appointment details
    const doctorDetails = await Doctor.findOne({ _id: data.appointmenDetails.DoctorId });

    // Get the first clinic directly
    const clinic = doctorDetails.Clinic[0]; // Assuming you're working with the first clinic
    const { stars, description } = data;
    const appointmentDeatilsforID = data.appointmenDetails;

    // Create the new review object
    const newReview = {
      Rating: stars,
      Comment: description,
      Userid: appointmentDeatilsforID.UserId,
    };

    // Directly push the new review into the clinic's Reviews array
    clinic.Reviews.push(newReview);
    const totalRatings = clinic.Reviews.reduce((sum, review) => sum + review.Rating, 0);
    const averageRating = totalRatings / clinic.Reviews.length;

    // Update the TotalRating field
    clinic.TotalRating = parseFloat(averageRating.toFixed(2));
    // Save the updated doctor document
    await doctorDetails.save({ validateBeforeSave: false });

    res.status(200).json({ message: 'Review added successfully' });
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ message: 'Failed to add review', error });
  }
});


app.post('/ContactUs',getBill,(req,res)=>{
  return res.status(200).json('Email send')
})



 


app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});

app.use(errorMiddleware);
