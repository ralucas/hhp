'use strict';

var knex   = require('./orm'),
    Q      = require('q'),
    util   = require('util');

Q.longStackSupport = true;

function DbService(zone, sqft) {
    this.zone = zone;
    this.sqft = sqft;
}

function prepareQuery(arr) {
    var output = [];
    arr.forEach(function(el) {
        output += el.toString() + ',';
    });
    return output;
}

DbService.prototype.fetch = function(tables, options) {
    var response = [],
        deferred = Q.defer();

    tables.forEach(function(table) {
        knex(table)
            .where(options.where[0], options.where[1], options.where[2])
            .andWhere(options.andWhere[0], options.andWhere[1], options.andWhere[2])
            .select(options.select)
            .then(function(data) {
                var result = {};
                if (!data[0]) {
                    result[table] = 'none';
                } else {
                    result[table] = data[0][options.select];
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
