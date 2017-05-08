module.exports = function(app, mongoose, config){
	var express = require('express'),
		router = express.Router();

	var utils = app.get('utils');
	var errcode = app.get('errcode');
	app.use(config.api_path,router);

	router.get('/home', function(req, res) {
	    res.status(200).send({message:'Welcome to our HOMEEEEE!!!'});
	});
};
