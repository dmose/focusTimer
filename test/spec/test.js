/*global describe, it, beforeEach, afterEach, expect, sinon, focusTimer */

(function () {
  'use strict';

  describe('window.focusTimer', function () {

    beforeEach(function() {
      this.sandbox = sinon.sandbox.create();

      this.sandbox.stub(focusTimer.Models, 'FocusTimerModel');
      this.sandbox.stub(focusTimer.Views, 'TimerView');
      focusTimer.Views.TimerView.prototype.render = this.sandbox.stub();

      $('#fixtures').append('<div id="view-container"></div>');
    });
    afterEach(function() {
      $('#fixtures').empty();

      this.sandbox.restore();
    });

    describe('#init', function () {

      it('should construct a new FocusTimerModel',
        function () {
          focusTimer.init();

          sinon.assert.calledOnce(focusTimer.Models.FocusTimerModel);
          sinon.assert.calledWithNew(focusTimer.Models.FocusTimerModel);
          sinon.assert.calledWithExactly(focusTimer.Models.FocusTimerModel);
        });

      it('should construct a new TimerView passing in a FocusTimerModel',
        function() {
          focusTimer.init();

          sinon.assert.calledOnce(focusTimer.Views.TimerView);
          sinon.assert.calledWithNew(focusTimer.Views.TimerView);
          sinon.assert.calledWithExactly(focusTimer.Views.TimerView,
            sinon.match(function (value) {
              if (! ('model' in value) ) {
                return false;
              }

              if (! (value.model instanceof focusTimer.Models.FocusTimerModel )) {
                return false;
              }

              return true;
            }));
        });

      it('should append the div#timer-view into #view-container', function () {
        focusTimer.Views.TimerView.prototype.$el =
          $('<div id="timer-view"></div>');

        focusTimer.init();

        expect($('#view-container > div#timer-view').length).to.equal(1);
      });
    });
  });

})();
