/*global describe, beforeEach, afterEach, expect, it, focusTimer, sinon */

describe('FocusTimer Model', function () {
  'use strict';

  beforeEach(function () {
    this.sandbox = sinon.sandbox.create({useFakeTimers: true});
    this.focusTimer = new focusTimer.Models.FocusTimerModel();
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  describe('construction', function() {
    it('should set the state attribute to "stopped"', function() {
      expect(this.focusTimer.get('state')).to.equal('stopped');
    });

    it('should set the time-left attribute to 25 mins * 60 secs', function () {
      expect(this.focusTimer.get('timeLeft')).to.equal(25 * 60);
    });
  });

  describe('#start', function() {
    it('should set the timer state to "running"', function() {
      this.focusTimer.set('state', 'stopped');

      this.focusTimer.start();

      expect(this.focusTimer.get('state')).to.equal('running');
    });

    it('should call #update', function(done) {
      this.focusTimer.update = function() {
        done();
      };

      this.focusTimer.start();
    });


    it('should cause update to be called again after 1 and 2 seconds',
      function() {
        this.sandbox.stub(this.focusTimer, 'update');

        this.focusTimer.start();
        sinon.assert.calledOnce(this.focusTimer.update);

        this.sandbox.clock.tick(1000);
        sinon.assert.calledTwice(this.focusTimer.update);

        this.sandbox.clock.tick(1000);
        sinon.assert.calledThrice(this.focusTimer.update);
        sinon.assert.calledWithExactly(this.focusTimer.update);
      });
  });

  describe('stop', function() {
    it('should set the timer state to "stopped"', function() {
      this.focusTimer.set('state', 'running');

      this.focusTimer.stop();

      expect(this.focusTimer.get('state')).to.equal('stopped');
    });

    it('should cause a running timer to not change timeLeft at the end of the' +
      ' next interval', function () {
      this.focusTimer.start();

      this.focusTimer.stop();

      // ensure update will not throw an error when the clock moves forward
      this.focusTimer.set('state', 'running');

      var lastTimeLeft = this.focusTimer.get('timeLeft');
      this.sandbox.clock.tick(1000);

      expect(this.focusTimer.get('timeLeft')).to.equal(lastTimeLeft);
    });

  });

  describe('#update', function() {
    it('should throw an Error if the state is not "running"', function() {
      this.focusTimer.set('state', 'stopped');

      expect(this.focusTimer.update).to.throw(Error);
    });

    it('should set the state to expired if timeLeft is 0', function() {
      this.focusTimer.set('timeLeft', 0);
      this.focusTimer.set('state', 'running');

      this.focusTimer.update();

      expect(this.focusTimer.get('state')).to.equal('expired');
    });

    it('should decrement the timeLeft attribute', function () {
      this.focusTimer.set('timeLeft', 1);
      this.focusTimer.set('state', 'running');

      this.focusTimer.update();

      expect(this.focusTimer.get('timeLeft')).to.equal(0);
    });
  });
});
