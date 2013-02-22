
exports.validate = function(req, res){
  var status = false;
  res.send("respond with a resource");
};

function verifyEmail(req) {
  var pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (pattern.test(req)) {
    return true;
  } else {
    return false;
  }
}