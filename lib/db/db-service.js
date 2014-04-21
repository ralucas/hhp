'use strict';

var knex = require('./orm'),
    Q    = require('q'),
    util = require('util');

// Tables
var tables = ['eighty', 'ninety_five', 'ninety_six'];

function DbService(zone, sqft) {
    this.zone = zone;
    this.sqft = sqft;
};

DbService.prototype.fetch = function() {
    var deferred = Q.defer();

    var low = 'zone' + this.zone + '_low',
        high = 'zone' + this.zone + '_high';

    knex('eighty')
        .where(low, '<', this.sqft)
        .andWhere(high, '>', this.sqft)
        .select('furnace_size')
        .then(function(data) {
            deferred.resolve(data);
        });

    return deferred.promise;
};

module.exports = DbService;