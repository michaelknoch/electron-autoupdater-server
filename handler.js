"use strict";

const req = require('request');
const _ = require('lodash');
const semver = require('semver');

module.exports = {
    getRelease
};

function getRelease(request, reply) {

    const version = request.query.version;

    var options = {
        url: 'https://api.github.com/repositories/58486051/releases',
        headers: {
            'User-Agent': 'michaelknoch'
        }
    };

    req(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {

            const releases = _.filter(JSON.parse(body), function (item) {
                return item.assets.length === 1;
            });

            const newestVersion = semver.clean(releases[0].tag_name);

            if (!version) {

                reply({
                    'url': releases[0].assets[0].browser_download_url
                });

            } else if (semver.lt(version, newestVersion)) {
                console.info('Update available:', newestVersion);

                reply({
                    'url': releases[0].assets[0].browser_download_url
                });

            } else {
                reply().code(204);
            }

        }
    });
}
