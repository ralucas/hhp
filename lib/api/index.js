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

        // Tables
        var tables = ['eighty', 'ninety_five', 'ninety_six'];
        
        var low = 'zone' + zone + '_low',
            high = 'zone' + zone + '_high';



        zillow.getDeepSearchResults(address, citystatezip)
            .then(function(result) {
                var sqft = result.response[0]
                    .results[0].result[0].finishedSqFt[0];
                var dbService = new DbService(zone, sqft);
                var options = {
                    where: [low, "<", sqft],
                    andWhere: [high, ">", sqft],
                    select: 'furnace_size'
                };

                dbService.fetch(tables, options)
                    .then(function(furnaces) {
                        var furnOpts = {
                            where: [],
                            andWhere: [],
                            select: ''
                        };
                        dbService.fetch('furnaces', furnOpts)
                        .then(function(response) {
                            var r = furnaces.concat(response);
                            res.send(furnaces);
                        });
                    });
                });
    };

    return {
        heartbeat: heartbeat,
        getFurnaces: getFurnaces
    };

}());

module.exports = Api;
