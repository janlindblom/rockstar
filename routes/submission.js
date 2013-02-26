
exports.validate = function(req, res) {
  
  res.render('submitted', {
    title: 'Rockstar Developer Wanted!',
    band: req.body.band,
    fullName: req.body.fullName,
    emailAddress: req.body.emailAddress,
    streetAddress: req.body.streetAddress,
    zipCode: req.body.zipCode,
    city: req.body.city
  });
};