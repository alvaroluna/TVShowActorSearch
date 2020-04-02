var request = require("request");
var fs = require("fs");
var TV = function() {
  var divider = "\n-------------------------------\n\n";
  this.findShow = function(show) {
    var URL = "http://api.tvmaze.com/singlesearch/shows?q=" + show;
    request(URL, function(err, response, body) {
      var jsonData = JSON.parse(body);
      // parse the response body to a JSON object
      var showData = [
        "Show: " + jsonData.name,
        "Genre(s): " + jsonData.genres.join(", "),
        "Rating: " + jsonData.rating.average,
        "Network: " + jsonData.network.name,
        "Summary: " + jsonData.summary
      ].join("\n\n");
      fs.appendFileSync("log.txt", showData + divider, function(err) {
        if (err) throw err;
        console.log(showData);
      });
    });
  };
  this.findActor = function(actor) {
    var URL = "http://api.tvmaze.com/search/people?q=" + actor;
    request(URL, function(err, response, body) {
      var jsonData = JSON.parse(body);

      var actorData = [];
      for (i = 0; i < jsonData.length; i++) {
        var tempData = [
          "Name: " + jsonData[i].person.name,
          "Birthday: " + jsonData[i].person.birthday,
          "Gender: " + jsonData[i].person.gender,
          "Country: " + jsonData[i].person.country,
          "URL: " + jsonData[i].person.url
        ].join("\n\n");

        actorData.push(tempData);
      }

      fs.appendFileSync("log.txt", actorData + divider, function(err) {
        if (err) throw err;
        console.log(showData);
      });
    });
  };
};

module.exports = TV;
