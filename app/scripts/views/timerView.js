/*global focusTimer, Backbone, _ */

focusTimer.Views = focusTimer.Views || {};

(function () {
  'use strict';

  focusTimer.Views.TimerView = Backbone.View.extend({

    // JST['app/scripts/templates/timer.ejs']
    events: {
      'click #start-stop': '_startStop',
      'focus #time-remaining': '_onInputFocus',
      'blur #time-remaining': '_onInputBlur',
      'change #time-remaining': '_onInputChange'
    },

    id: 'timer-view',

    template: _.template([
      '<input id="time-remaining" value="<%= timeLeft %>" class="input-sm">',
      '  <button id="start-stop" class="btn btn-xs">',
      '    <label class="<% print(this._getLabelClassForState(state)); %>">',
      '    </label>',
      '  </button>',
      '</input>'
    ].join('')),

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this._editingMode = false;
    },

    _getLabelClassForState: function (state) {
      var classMap = { stopped: 'label-run', running: 'label-stop' };

      return classMap[state];
    },

    _startStop: function (event) {
      var state = this.model.get('state');
      if (state === 'stopped') {
        this.model.start();
      } else if (state === 'running') {
        this.model.stop();
      } else {
        throw new Error('Unexpected model.state: ' + state);
      }
    },

    _onInputFocus: function (event) {
      this._editingMode = true;
    },

    _onInputBlur: function (event) {
      this._editingMode = false;
    },

    _onInputChange: function (event) {
      var val = Number(this.$el.find('#time-remaining').val());
      this.model.set('timeLeft', val);
    },

    render: function() {
      if (!this._editingMode) {
        this.$el.html(this.template(this.model.attributes));
      }

      return this;
    }
  });

})();
