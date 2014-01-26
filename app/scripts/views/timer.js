/*global focusTimer, Backbone, _ */

focusTimer.Views = focusTimer.Views || {};

(function () {
  'use strict';

  focusTimer.Views.TimerView = Backbone.View.extend({

    // JST['app/scripts/templates/timer.ejs']

    id: 'timer-view',

    template: _.template(
      ['<input id="time-remaining" type="text">'].join('')),

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    }
  });

})();
