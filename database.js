const mongoose = require('mongoose');

const { Schema, model } = mongoose;

mongoose.connect('mongodb://127.0.0.1:27017/report-project', {
  serverSelectionTimeoutMS: 5000
})
  .then(() => console.log('Connected'))
  .catch(() => {
    console.log("Connection error");
    process.exit()
  });

  const Report = new Schema({
    title:String,
    reportDate: Date,
    category:String,
    numberOfImages:Number,
    numberOfPages: Number,
  });
  
  const ReportModel = model('Report', Report);
  
  module.exports = {
    ReportModel
  }