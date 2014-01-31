/*global describe, beforeEach, expect, it, focusTimer */

describe('FocusTimer Model', function () {
  'use strict';

  beforeEach(function () {
    this.focusTimer = new focusTimer.Models.FocusTimerModel();
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

    it('should set a timer to recurse after 1 second');
  });
});
