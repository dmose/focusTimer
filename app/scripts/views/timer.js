/*global focusTimer, Backbone, _ */

focusTimer.Views = focusTimer.Views || {};

(function () {
  'use strict';

  focusTimer.Views.TimerView = Backbone.View.extend({

    // JST['app/scripts/templates/timer.ejs']

    id: 'timer-view',

    template: _.template([
      '<input id="time-remaining" value="<%= timeLeft %>">',
      '  <button id="start-stop" class="btn">',
      '    <label></label>',
      '  </button>',
      '</input>'
    ].join('')),

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    },

    render: function() {
      this.$el.html(this.template(this.model.attributes));

      return this;
    }
  });

})();
