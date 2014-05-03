'use strict';

var knex   = require('./orm'),
    Q      = require('q'),
    util   = require('util');

Q.longStackSupport = true;

// Tables
var tables = ['eighty', 'ninety_five', 'ninety_six'];

function DbService(zone, sqft) {
    this.zone = zone;
    this.sqft = sqft;
}

DbService.prototype.fetch = function() {
    var response = [];
    var _this = this;
    var deferred = Q.defer();

    var low = 'zone' + this.zone + '_low',
        high = 'zone' + this.zone + '_high';

    tables.forEach(function(table) {
        knex(table)
            .where(low, '<', _this.sqft)
            .andWhere(high, '>', _this.sqft)
            .select('furnace_size')
            .then(function(data) {
                var result = {};
                if (!data[0]) {
                    result[table] = 'none';
                } else {
                    result[table] = data[0].furnace_size;
                }
                response.push(result);
                if (tables.length === response.length) {
                    deferred.resolve(response);
                }
            });
    });
    return deferred.promise;
};

module.exports = DbService;
