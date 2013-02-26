# Rockstar Developer!

A playgroundsandbox if you will.

It's a form that gets validated and submitted using JavaScript and Ajax. There's a backend built using node.js and Express.js that takes care of everything. The design is a vanilla Foundation install. Nothing actually gets submitted anywhere, the rules of the game were to do validation and playing around with some APIs.

The actual "app code" can be found in the following files:

* public/javascripts/app.js - Frontend/jQuery

* routes/band.js - API calls to get artist data
* routes/index.js - The front page
* routes/submission.js - Submit receiver

* views/index.jade
* views/layout.jade
* views/submitted.jade
* views/theform.jade

* app.js - Express.js engine