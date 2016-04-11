'use strict';

const Hapi = require('hapi');
const handler = require('./handler');

const server = new Hapi.Server();
server.connection({port: 3000});

server.route({
    method: 'GET',
    path: '/release',
    handler: handler.getRelease
});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
