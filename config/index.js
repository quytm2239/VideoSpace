module.exports={
	PORT:9999,
	db_config: {
		connectionLimit: 10000, //important
		host: 'localhost',
		user: 'root',
		password: '',
		database: 'dating',
		debug: false
	},
	mongoose_connect: 'mongodb://localhost/VideoSpace',
	api_path: '/'
};
