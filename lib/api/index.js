'use strict';

var express   = require('express'),
    Q         = require('q'),
    DbService = require('../db/db-service.js'),
    _         = require('lodash'),
    Zillow    = require('node-zillow'),
    env       = require('../../env.json'),
    util      = require('util');

var Api = (function() {

    // Instantiates zillow
    var zillow = new Zillow(env.zwsid);

    // heartbeat test route
    var heartbeat = function(req, res, next) {
        res.json(200, { "greeting": "Hello" });
    };

    /*
    * Function that gets furnaces
    *
    * 
    * returns furnace
    */
    var getFurnaces = function(req, res, next) {
        console.log(req.body);
        var address = req.body.street_address,
            citystatezip = req.body.city + ', ' + req.body.state +
                ' ' + req.body.zipcode,
            zone = req.body.zone;

        zillow.getDeepSearchResults(address, citystatezip)
            .then(function(result) {
                var sqft = result.finishedSqFt[0];
                var dbService = new DbService(zone, sqft);
                dbService.fetch()
                    .then(function(furnaces) {
                        res.send(furnaces);
                    });
                });
    };

    return {
        heartbeat: heartbeat,
        getFurnaces: getFurnaces
    };

}());

module.exports = Api;
