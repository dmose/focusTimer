/*global focusTimer, Backbone*/

focusTimer.Models = focusTimer.Models || {};

(function () {
  'use strict';

  focusTimer.Models.FocusTimerModel = Backbone.Model.extend({

    url: '',

    defaults: {
      'state': 'stopped',
      'time-left': 25 * 60
    },

    start: function() {
      this.set('state', 'running');
      this.update();
    },

    update: function() {
      if (this.get('state') !== 'running') {
        throw new Error('state must be set to "running" when update is called');
      }

      if (this.get('time-left') === 0) {
        this.set('state', 'expired');
      }

      this.set('time-left', this.get('time-left') - 1);
    },

    validate: function(attrs, options) {
    },

    parse: function(response, options)  {
      return response;
    }
  });

})();
