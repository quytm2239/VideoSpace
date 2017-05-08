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
	mongoose_connect: 'mongodb://128.199.91.116/VideoSpace',
	api_path: '/'
};
