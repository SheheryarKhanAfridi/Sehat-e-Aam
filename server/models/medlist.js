const mongoose = require('mongoose');

const medListSchema = new mongoose.Schema(
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
          Pharmacyowner:{
            type: String
          }
         
    } 
    , {
      timestamps: true
    });
    
    
    
    module.exports = mongoose.model('MedList', medListSchema);