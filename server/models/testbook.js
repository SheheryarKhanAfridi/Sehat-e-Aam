const mongoose = require('mongoose');

const testBookSchema = new mongoose.Schema(
{
    testName: {
        type: String,
      },
      testType: {
        type: String,
      },
      testPrice: {
        type: Number,
      },
      PatientID:{
        type: String
      },
      TestID:{
        type: String
      },
      LabID:{
        type:String
      }
     
} 
, {
  timestamps: true
});



module.exports = mongoose.model('TestBook', testBookSchema);
