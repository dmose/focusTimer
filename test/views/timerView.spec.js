/*global describe, afterEach, beforeEach, expect, it, focusTimer, Backbone,
 sinon, _ */
/*jshint expr:true */

describe('Timer View', function () {
  'use strict';

  var sandbox;

  beforeEach(function () {

    sandbox = sinon.sandbox.create();

    $('#fixtures').append(
      '<div id="timer-view">' +
        '<input id="time-remaining">' +
      '</div>');

    this.timeLeft = 3 * 60;
    this.formattedTimeLeft = '3:00';
    this.decrementedFormattedTimeLeft = '2:59';

    this.model = {
      attributes: { state: 'stopped', timeLeft: this.timeLeft },
      get: function (key) {return this.attributes[key];},
      start: sandbox.spy(),
      stop: sandbox.spy()
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

        //noinspection JSAccessibilityCheck
        sandbox.stub(focusTimer.Views.TimerView.prototype, 'render');
        this.timerView = new focusTimer.Views.TimerView({model: this.model});

        this.model.trigger('change');

        //noinspection BadExpressionStatementJS,JSUnresolvedVariable
        expect(this.timerView.render).to.have.been.calledOnce;
        //noinspection JSUnresolvedVariable
        expect(this.timerView.render).to.have.been.calledWithExactly();
      });
    });

    describe('"focus" on the #time-remaining input', function() {

      it('should stop updating the input so it can be edited', function() {
        this.timerView.render();

        $('#fixtures #time-remaining').trigger("focus");
        this.model.attributes.timeLeft -= 1;
        this.model.trigger('change');

        expect($('#fixtures #time-remaining').val()).to
          .equal(this.formattedTimeLeft);
      });
    });

    describe('"blur" on the #time-remaining input', function() {
      it('should resume visual updating of the input on change', function () {
        this.timerView.render();
        $('#fixtures #time-remaining').focus();
        this.model.attributes.timeLeft -= 1;

        $('#fixtures #time-remaining').blur();
        this.model.trigger('change');

        expect($('#fixtures #time-remaining').val()).to.equal(
          this.decrementedFormattedTimeLeft);
      });
    });

    describe('"change" on the #time-remaining input', function() {
      it('should call model.set("timeLeft", inputValue)', function () {
        this.model.set = sandbox.spy();

        this.timerView.render();

        $('#fixtures #time-remaining').val('555');
        $('#fixtures #time-remaining').change();

        //noinspection BadExpressionStatementJS,JSUnresolvedVariable
        expect(this.model.set).to.have.been.calledOnce;
        //noinspection JSUnresolvedVariable
        expect(this.model.set).to.have.been.calledWithExactly('timeLeft', 555);
      });
    });

    describe('"click" on the #start-stop button', function () {

      it('should call start on the model if its state is "stopped"',
        function () {
          this.model.attributes.state = 'stopped';
          this.timerView.render();

          $('#fixtures #start-stop').trigger('click');
          
          sinon.assert.calledOnce(this.model.start);
          sinon.assert.calledWithExactly(this.model.start);
        });

      it('should call stop on the model if its state is "running"',
        function() {
          this.model.attributes.state = 'running';
          this.timerView.render();

          $('#fixtures #start-stop').trigger('click');

          sinon.assert.calledOnce(this.model.stop);
          sinon.assert.calledWithExactly(this.model.stop);
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

    it('should set the value of the input to the formatted time remaining',
      function() {
        this.timerView.render();

        var input = $('#fixtures #time-remaining');

        expect(input.prop('value')).to.equal(this.formattedTimeLeft);
      });
  });

});
