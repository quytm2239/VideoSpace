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
		console.log('POST: /video');

		mongoose.connect(config.mongoose_connect);

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

	rootRouter.post('/category', function(req, res) {
		console.log('POST: /category');

		var cate = new Category({
			name: req.body.name
		});
		cate.save(function (err) {
			if (err) {
				return handleError(err);
			} else {
				res.status(200).send({
					message: 'Successfully save:' + cate.name
				});
			}
		});
	});
};
