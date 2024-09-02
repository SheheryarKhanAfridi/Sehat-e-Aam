const mongoose = require('mongoose');

const medBookSchema = new mongoose.Schema(
{
    medName: {
        type: String,
      },
      medgrams: {
        type: Number,
      },
      medPrice: {
        type: Number,
      },
      PatientID:{
        type: String
      },
      Pharmacyowner:{
        type: String
      },
      MedID:{
        type:String
      }
     
} 
, {
  timestamps: true
});



module.exports = mongoose.model('MedBook', medBookSchema);
