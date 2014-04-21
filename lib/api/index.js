'use strict';

var express   = require('express'),
    Q         = require('q'),
    DbService = require('../db/db-service.js'),
    util      = require('util');

var api = (function() {

    var heartbeat = function(req, res, next) {
        res.json(200, { "greeting": "Hello" });
    };

    var getFurnaces = function(req, res, next) {
        console.log(req.body);
        var zone = req.body.zone;
        var dbService = new DbService(zone, 1200);
        var promise = dbService.fetch();
        promise.then(function(furnaces) {
            res.send(furnaces[0]);
        });
    };

    var home = function(req, res, next) {
        console.log('home');
        res.send('hi');
    }

    return {
        heartbeat: heartbeat,
        getFurnaces: getFurnaces,
        home: home
    };

}());

module.exports = api;