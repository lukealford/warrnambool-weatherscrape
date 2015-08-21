var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/warniweather');

mongoose.connection.on('error', function() {
  console.error('MongoDB Connection Error. Make sure MongoDB is running.');
});
var forecastList = new mongoose.Schema({
  day: String,
  summary: String,
  rain: String,
  rainchance: String,
  min:String,
  max:String
});
module.exports = mongoose.model('forecasts', forecastList);
