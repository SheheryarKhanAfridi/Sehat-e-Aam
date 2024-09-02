const mongoose = require('mongoose');

const testListSchema = new mongoose.Schema(
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
      owner:{
        type: String
    
      }
     
} 
, {
  timestamps: true
});



module.exports = mongoose.model('TestList', testListSchema);

