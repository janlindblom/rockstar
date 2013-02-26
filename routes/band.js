
http = require('http');

// Sources:
// * https://developer.spotify.com/technologies/web-api/search/
// * http://developer.echonest.com/docs/v4
// * https://forrst.com/posts/A_5_minute_Spotify_meta_client_in_Node_js-a9z

music = {
  tracks: function(b,c) {
    this.get("/search/1/track.json?q=" + b, c, 'spotify')
  },
  image: function(b,c) {
    this.get("/api/v4/artist/images?api_key=0OTOYR1HMTOLDLNMY&format=json&results=1&name=" + b, c, 'echonest')
 },
  get: function (b, c, source) {
    serviceHost = '';
    if (source == 'spotify') {
      serviceHost = "ws.spotify.com";
    } else if (source == 'echonest') {
      serviceHost = "developer.echonest.com";
    }
    var a = {
      host: serviceHost,
      path: encodeURI(b),
      method: "GET"
    },
    a = http.request(a, (function(b) {
      var c = "";
      return function (a) {
        a.setEncoding("utf8");
        // Process response data
        a.on("data", function(a) {
          c += a
        });
        // End of input
        a.on("end", function() {
          var a, d;
          try {
            d = JSON.parse(c)
          } catch (e) {
            a = e, console.log(e)
          }
          b(a, d)
        })
      }
    })(c));
    a.end();
    a.on("error", function (a) {
      c(a, {})
    })
  }
};

// This one calls Echonest
exports.image = function(req, res) {
  result = {};
  music.image(req.params.band, function(err, data) {
    if (err) return res.end('Error: ' + err);
    result.image = data.response.images[0];
    res.json(result);
  });
};

// This one calls Spotify
exports.topthree = function(req, res) {
  result = {
    tracks: {}
  };
  music.tracks(req.params.band, function (err, data) {
    if (err) return res.end('Error: ' + err);
    // Won't bother with looping since we're only getting the first three
    result.tracks.one = data.tracks[0];
    result.tracks.two = data.tracks[1];
    result.tracks.three = data.tracks[2];
    res.json(result);
  });
};