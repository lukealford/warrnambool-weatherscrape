
var http = require("http");
var cheerio = require("cheerio");

var url = "http://www.weatherzone.com.au/vic/south-west/warrnambool";


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
    $(".top_left").each(function(i, e) {
      var day = $(e).find("h2").text();
      var now = $(e).find(".tempnow").text();
      var tonight = $(e).find('.local_grad_tdb_10').text();
      var tomorrow = $(e).find(".local_grad_tdb_15").text();
      console.log(" Now " + now + " Tonight " + tonight + " Tomorrow "+ tomorrow );
    });
  }
});
