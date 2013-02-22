
http = require('http');

// Partially from https://forrst.com/posts/A_5_minute_Spotify_meta_client_in_Node_js-a9z
spotify = {
    search: function (b, c) {
        var a = {
            host: "ws.spotify.com",
            path: encodeURI("/search/1/track.json?q=" + b),
            method: "GET"
        }, a = http.request(a, (function (b) {
            var c = "";
            return function (a) {
                a.setEncoding("utf8");
                a.on("data", function (a) {
                    c += a
                });
                a.on("end", function () {
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

exports.topthree = function(req, res){
    result = {
        tracks: {}
    };
    spotify.search(req.params.band, function (err, data) {
        if (err) return res.end('Error occurred: ' + err);
        tracks = data.tracks;
        result.tracks.one = tracks[0];
        result.tracks.two = tracks[1];
        result.tracks.three = tracks[2];
        res.json(result);
    });
    
};