/*global focusTimer, Backbone*/

focusTimer.Models = focusTimer.Models || {};

(function () {
  'use strict';

  focusTimer.Models.FocusTimerModel = Backbone.Model.extend({

    url: '',

    defaults: {
      'state': 'stopped',
      'timeLeft': 25 * 60
    },

    initialize: function () {
      this.update = this._update.bind(this);
    },

    start: function() {
      this.set('state', 'running');
      this.update();
      this._intervalTimer = setInterval(this.update, 1000);
    },

    stop: function() {
      clearInterval(this._intervalTimer);
      this.set('state', 'stopped');
    },

    _update: function() {
      console.log('in update');

      if (this.get('state') !== 'running') {
        throw new Error('state must be set to "running" when update is called');
      }

      if (this.get('timeLeft') === 0) {
        this.set('state', 'expired');
      }

      this.set('timeLeft', this.get('timeLeft') - 1);
    },

    validate: function(attrs, options) {
    },

    parse: function(response, options)  {
      return response;
    }
  });

})();
