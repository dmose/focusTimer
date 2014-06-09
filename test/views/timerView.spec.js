/*global describe, afterEach, beforeEach, expect, it, focusTimer, Backbone,
 sinon, _ */
/*jshint expr:true */

describe('Timer View', function () {
  'use strict';
  var sandbox, formattedTimeLeft;

  beforeEach(function () {

    sandbox = sinon.sandbox.create();

    $('#fixtures').append(
      '<div id="timer-view">' +
        '<input id="time-remaining">' +
      '</div>');

    formattedTimeLeft = '3:00';
    this.timeLeft = 3 * 60;
    this.decrementedFormattedTimeLeft = '2:59';

    this.model = {
      attributes: { state: 'stopped', timeLeft: this.timeLeft },
      get: function (key) { return this.attributes[key]; },
      start: sandbox.spy(),
      stop: sandbox.spy(),
      set: function(key, val) { this.attributes[key] = val; }
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

    $('body').removeClass();
  });

  describe('#render', function() {
    it('should return itself for chainability', function() {
      expect(this.timerView.render()).to.equal(this.timerView);
    });

    it('should display a #time-remaining input in the #timer-view div',
      function () {
        this.timerView.render();

        expect(this.timerView.$('input#time-remaining').length).to.equal(1);
      }
    );

    it('should set the value of the input to the formatted time remaining',
      function() {
        this.timerView.render();

        var input = $('#fixtures #time-remaining');

        expect(input.prop('value')).to.equal(formattedTimeLeft);
      });

    it('should display a #start-stop button with class btn', function() {
      this.timerView.render();

      expect(this.timerView.$('button#start-stop.btn').length).to.equal(1);
    });

    describe('#start-stop button', function () {

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

    it("should display a #pomodoro button in the view", function() {
      this.timerView.render();

      expect($("#pomodoro")).to.match("button");
    });

    describe("#pomodoro button", function() {
      it("should have class .pomodoro", function() {
        this.timerView.render();

        expect($("#pomodoro")).to.have.class("pomodoro");
      });
    });

  });

  describe('events', function () {

    describe('"change" from the model', function() {

      it('should call this.render()', function () {

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

    describe("change:state from the model", function() {
      it("should remove the previous 'timer-$state' class on the body element",
        function () {

          $('body').addClass('timer-sheep');
          this.model.previous = sandbox.stub().withArgs('state').
            returns("sheep");

          this.model.trigger('change:state', this.model, 'monkey', {});

          expect($('body')).to.not.have.class('timer-sheep');
        });

      it("should add the updated 'timer-$state' class to the body element",
        function() {

          this.model.previous = sandbox.stub().withArgs('state').returns('');

          this.model.trigger('change:state', this.model, 'monkey', {});

          expect($('body')).to.have.class('timer-monkey');
        });
    });

    describe('"fakeFocus" on the #time-remaining input', function(done) {

      it('should stop updating the input so it can be edited', function(done) {
        this.timerView.render();

        $('#fixtures #time-remaining').trigger("fakeFocus");
        this.model.attributes.timeLeft -= 1;
        var timerView = this.timerView;

        setTimeout(function () {
          timerView.render();
          expect($('#fixtures #time-remaining').val()).to
            .equal(formattedTimeLeft);
          done();
        }, 0);
      });
    });

    describe('"blur" on the #time-remaining input', function() {
      it('should resume visual updating of the input on change', function () {
        this.timerView.render();
        $('#fixtures #time-remaining').trigger("fakeFocus");
        this.model.attributes.timeLeft -= 1;

        $('#fixtures #time-remaining').blur();
        this.model.trigger('change');

        expect($('#fixtures #time-remaining').val()).to.equal(
          this.decrementedFormattedTimeLeft);
      });
    });

    describe('"change" on the #time-remaining input', function() {
      it('should call model.set("timeLeft", inputValue * 60)', function () {
        this.model.set = sandbox.spy();

        this.timerView.render();

        $('#fixtures #time-remaining').val('555');
        $('#fixtures #time-remaining').change();

        //noinspection BadExpressionStatementJS,JSUnresolvedVariable
        expect(this.model.set).to.have.been.calledOnce;
        //noinspection JSUnresolvedVariable
        expect(this.model.set).to.have.been.calledWithExactly('timeLeft',
            555 * 60);
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

});
