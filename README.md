# Rockstar Developer!

A playground/sandbox if you will.

It's a form that gets validated and submitted using JavaScript and Ajax. There's a backend built using [Node.js](https://github.com/joyent/node) and [Express.js](https://github.com/visionmedia/express) that takes care of everything. The design is a vanilla [Foundation](https://github.com/zurb/foundation) install. Nothing actually gets submitted anywhere, the rules of the game were to do validation and playing around with some APIs.

The actual "app code" can be found in the following files:

### Frontend
* public/javascripts/app.js - Frontend/jQuery

### Backend
* routes/band.js - API calls to get artist data
* routes/index.js - The front page
* routes/submission.js - Submit receiver

### Views
* views/index.jade
* views/layout.jade
* views/submitted.jade
* views/theform.jade

### Engine
* app.js - Express.js engine
