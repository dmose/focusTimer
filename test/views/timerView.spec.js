/*global describe, afterEach, beforeEach, expect, it, focusTimer, Backbone, _ */

describe('Timer View', function () {
  'use strict';

  beforeEach(function () {
    $('#fixtures').append('<div id="timer-view"></div>');

    this.model = {};
    _.extend(this.model, Backbone.Events);

    this.timeLeft = 3 * 60;
    this.model.attributes = { state: 'stopped', timeLeft: this.timeLeft };

    this.timerView = new focusTimer.Views.TimerView({
      el: $('#timer-view').get()[0],
      model: this.model
    });
  });

  afterEach(function() {
    $('#fixtures').empty();
  });

  describe('events', function () {
    describe('"change" from the model', function() {
      it.skip('should cause the timerView to render', function () {
        // XXX wants sinon to test

        this.timerView = new focusTimer.Views.TimerView({model: this.model});

        this.model.trigger('change');
      });
    });
  });

  describe('#render', function() {
    it('should return itself for chainability', function() {
      expect(this.timerView.render()).to.equal(this.timerView);
    });

    it('should display a #time-remaining button in the #timer-view div',
      function () {
        this.timerView.render();

        expect(this.timerView.$('input#time-remaining').length).to.equal(1);
      }
    );

    it('should display a #start-stop button with class btn', function() {
      this.timerView.render();

      expect(this.timerView.$('button#start-stop.btn').length).to.equal(1);
    });

    it('should display a label in the button', function() {
      this.timerView.render();

      expect(this.timerView.$('#start-stop label').length).to.equal(1);
    });

    describe('label', function () {

      it('should have class ".label-run" when the model state is "stopped"',
      function() {
        this.model.attributes.state = 'stopped';

        this.timerView.render();

        expect(this.timerView.$('#start-stop label').hasClass('label-run')).to.
          equal(true);
      });
    });

    // XXX need formatting test here once we use durations, and the countdown
    // plugin
    it('should set the value of the input to the time remaining', function() {
      this.timerView.render();

      var input = this.timerView.$el.find('#time-remaining');

      expect(Number(input.prop('value'))).to.equal(this.timeLeft);
    });
  });

});
