'use strict';
const Hapi = require('hapi');
const Good = require('good');
const GoodConsole = require('good-console');
const routes = require('./routes');


const server = Hapi.createServer(process.env.PORT || 3000);

var loggingOpts = {
	reporters: [
		{
			reporter: GoodConsole,
			args:[
				{ request: '*' },
				{ format: 'YYYY-MM-DDTHH:mm:ss.SSS[Z]' }
			]
		}
	]
};

server.route(routes);


server.register({ plugin: Good, options: loggingOpts }, function(err) {
	if (err) throw err;
});


server.start(function () {
    console.log('Server running at:', server.info.uri);
});