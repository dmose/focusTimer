/*global describe, afterEach, beforeEach, expect, it, focusTimer, Backbone,
 sinon, _ */

describe('Timer View', function () {
  'use strict';

  var sandbox;

  beforeEach(function () {

    sandbox = sinon.sandbox.create();

    $('#fixtures').append('<div id="timer-view"></div>');

    this.timeLeft = 3 * 60;

    this.model = {
      attributes: { state: 'stopped', timeLeft: this.timeLeft },
      get: function (key) {return this.attributes[key];}
    };

    _.extend(this.model, Backbone.Events);

    this.timerView = new focusTimer.Views.TimerView({
      el: $('#timer-view').get()[0],
      model: this.model
    });
  });

  afterEach(function() {
    $('#fixtures').empty();

    sandbox.restore();
  });

  describe('events', function () {

    describe('"change" from the model', function() {

      it('should cause the timerView to render', function () {

        sandbox.stub(focusTimer.Views.TimerView.prototype, 'render');
        this.timerView = new focusTimer.Views.TimerView({model: this.model});


        this.model.trigger('change');

        expect(this.timerView.render).to.have.been.calledOnce;
        expect(this.timerView.render).to.have.been.calledWithExactly();
      });
    });

    describe('"click" on the #start-stop button', function () {

      it('should call start on the model if its state is "stopped"',
        function (done) {
          this.model.attributes.state = 'stopped';
          this.model.start = verify;
          this.timerView.render();

          $('#fixtures #start-stop').trigger('click');

          function verify() {
            expect(true).to.equal(true);
            done();
          }
        });

      it('should call stop on the model if its state is "running"',
        function(done) {
          this.model.attributes.state = 'running';
          this.model.stop = verify;
          this.timerView.render();

          $('#fixtures #start-stop').trigger('click');

          function verify() {
            expect(true).to.equal(true);
            done();
          }
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

    describe('button', function () {
      it('should contain a label', function() {
        this.timerView.render();

        expect($('#fixtures #start-stop label').length).to.equal(1);
      });

      describe('label', function () {

        it('should have class .label-run when the model state is "stopped"',
          function() {
            this.model.attributes.state = 'stopped';

            this.timerView.render();

            expect($('#fixtures #start-stop label').hasClass('label-run')).to.
              equal(true);
          });

        it('should have class .label-stop when the model state is "running"',
          function() {
            this.model.attributes.state = 'running';

            this.timerView.render();

            expect($('#fixtures #start-stop label').hasClass('label-stop')).to.
              equal(true);
          });
      });
    });

    // TODO need formatting test here once we use durations, and the countdown
    // plugin
    it('should set the value of the input to the time remaining', function() {
      this.timerView.render();

      var input = $('#fixtures #time-remaining');

      expect(Number(input.prop('value'))).to.equal(this.timeLeft);
    });
  });

});
