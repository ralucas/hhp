var nconf = require('nconf');

function Config() {
    nconf.argv().env();
    var environment = nconf.get('NODE_ENV') || 'development';
    nconf.file(environment, 'environments/' + environment + '.json');
    nconf.file('default', 'environments/' + 'default.json');
}

Config.prototype.get = function(key) {
    return nconf.get(key);
};

module.exports = new Config();
