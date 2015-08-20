//requirements
var http = require("http");
var fs = require("fs");
var cheerio = require("cheerio");

//Bom town url - change to town / region for different area
var url = "http://www.bom.gov.au/vic/forecasts/warrnambool.shtml";


// Utility function that downloads a URL and invokes
// callback with the data.
function download(url, callback) {
  http.get(url, function(res) {
    var data = "";
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on("end", function() {
      callback(data);
    });
  }).on("error", function() {
    callback(null);
  });
}

download(url, function(data) {
  if (data) {

    var $ = cheerio.load(data);
    //select data we want to scrape
    $(".day").each(function(i, e) {
      var day = $(e).find("h2").text();
      var summary = $(e).find("p").text();
      var rain = $(e).find("em.rain").text();
      var rainchance = $(e).find(".pop").text()
      var min = $(e).find(".min").text();
      var max = $(e).find(".max").text();
      //put data into array
      var forecastDay ={
        day: day,
        summary: summary,
        rain: rain,
        rainchance: rainchance,
        min: min,
        max: max
      };
     //stringify and parse it!
     var s = JSON.stringify(forecastDay);
     var p = JSON.parse(s)
     // Get Values from JSON and display in log
     console.log("------------------------------------------------------------")
     console.log( p.day);
     console.log( p.summary);
     console.log("Chance of rain:", p.rainchance);
     console.log( "Rain fall:",p.rain);
     console.log( "Minimum of:",p.min);
     console.log( "Maximum of:",p.max);
    });
  }
});
