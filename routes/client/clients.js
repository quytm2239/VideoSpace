// ---------------------------------------------------------
// MAIN SCREEN (no middleware necessary since this isnt authenticated)
// ---------------------------------------------------------

module.exports = function(app, mongoose, config){
	var express = require('express'),
		rootRouter = express.Router();

	var utils = app.get('utils');
	var errcode = app.get('errcode');
	app.use(config.api_path,rootRouter);

	rootRouter.post('/main_screen', function(req, res) {
		console.log('/main_screen: ');

	});
};
