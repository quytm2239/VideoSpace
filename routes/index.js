// Divide all of your modules in different files and
// require them here
// app is express's app
// setting is defined in /config
var client_path = './client';
var backend_path = './backend';

module.exports = function(app, mongoose, config){
	require(main_screen_path + '/main_screen')(app, mongoose, config);
	require(backend_path + '/backend')(app, mongoose, config);
};
