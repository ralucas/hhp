'use strict';

var app = app || {};

app.resultsView = Backbone.View.extend({

    el: 'form',

    events: {
        'submit': 'onSubmit'
    },

    initialize: function() {
        this.model = new app.resultsModel();
        // this.listenTo(this.model, 'submit', this.render);
    },

    template: _.template( $('#resultsTemplate').html() ),

    render: function() {
        var $results = this.$el.closest('body').find('#results');
        $results.html(this.template( this.model.toJSON() ));
        return this;
    },

    onSubmit: function(e) {
        e.preventDefault();
        var _this = this;
        var formData = {};
        var datas = $('form').serializeArray();

        _.each(datas, function(data) {
            formData[data['name']] = data['value'];
        });
        console.log('send', formData);
        this.model.save(formData)
            .then(function(response) {
                console.log('response', response);
                _this.render();
            });
    }

});

var resultsView = new app.resultsView();
