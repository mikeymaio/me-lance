exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                      'mongodb://mmaio:asdyoug7@ds055575.mlab.com:55575/freelancer-db';

exports.TEST_DATABASE_URL = (
	process.env.TEST_DATABASE_URL ||
	'mongodb://localhost/test-freelancer-db');

exports.PORT = process.env.PORT || 8080;