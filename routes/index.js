// Divide all of your modules in different files and
// require them here
// app is express's app
// setting is defined in /config
var client_path = './client';
var backend_path = './backend';
var home_path = './home';

module.exports = function(app, mongoose, config){
	require(home_path + '/home')(app, mongoose, config);
 	require(client_path + '/clients')(app, mongoose, config);
 	require(backend_path + '/backends')(app, mongoose, config);
};
