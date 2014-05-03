'use strict';

var app = app || {};

app.resultsModel = Backbone.Model.extend({

    url: '/api/furnaces',

    parse: function(response, options) {
        this.set({'furnaces': response});
    }

});
