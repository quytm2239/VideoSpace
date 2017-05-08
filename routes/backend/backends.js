// ---------------------------------------------------------
// MAIN SCREEN (no middleware necessary since this isnt authenticated)
// ---------------------------------------------------------

module.exports = function(app, mongoose, config){
	var express = require('express'),
		rootRouter = express.Router();

	app.use(config.api_path,rootRouter);

	var utils = app.get('utils');
	var errcode = app.get('errcode');

	//Get mongoose model
	var Video = require('./../../mongoose/model/video')
	var Category = require('./../../mongoose/model/category')

	app.use(config.api_path,rootRouter);

	rootRouter.post('/video', function(req, res) {

		var db = mongoose.connection;
		db.on('error', console.error.bind(console, 'connection error:'));
		db.once('open', function() {
		  // we're connected!
		  console.log('we are connected');
		});

		var video = new Video({
			name: req.body.name,
			desc: req.body.desc,
			url: req.body.url,
			category: req.body.category
		});
		video.save(function (err) {
	  	if (err) {
				return handleError(err);
			} else {
				res.status(200).send({
					message: 'Successfully save:' + video.name
				});
			}
		});

	});

	//=============================[CATEGORY]===================================
	rootRouter.post('/category', function(req, res) {

		var db = mongoose.connection;
		db.on('error', console.error.bind(console, 'connection error:'));
		db.once('open', function() {
		  console.log('we are connected');
		});

		var cate = new Category({
			name: req.body.name
		});
		cate.save(function (err) {
			if (err) {
				res.status(500).send({
					message: err
				});
			} else {
				res.status(200).send({
					message: 'Successfully save:' + cate.name
				});
			}
		});
	});

	rootRouter.get('/category', function(req, res) {

		var db = mongoose.connection;
		db.on('error', console.error.bind(console, 'connection error:'));
		db.once('open', function() {
		  console.log('we are connected');
		});

		Category.find({}).exec(function(err, result) {
	      	if (!err) {
	        	// handle result
	      	} else {
	        	// error handling
	      	};
	    });
	});
};
