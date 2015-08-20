
var http = require("http");
var cheerio = require("cheerio");

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
    // console.log(data);
    var $ = cheerio.load(data);
    $(".day").each(function(i, e) {
      var day = $(e).find("h2").text();
      var summary = $(e).find(".summary").text();
      var min = $(e).find(".min").text();
      var max = $(e).find(".max").text();
      console.log(day + ", " + summary + ". Min " + min + " Max "+ max);
    });
  }
});
