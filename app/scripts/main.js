/*global focusTimer, $*/


window.focusTimer = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Utils: {},
  init: function () {
    'use strict';

    var timerView = new focusTimer.Views.TimerView({
      model: new focusTimer.Models.FocusTimerModel()
    });

    timerView.render();

    $('#view-container').append(timerView.$el);

  }
};

$(document).ready(function () {
  'use strict';
  focusTimer.init();
});
