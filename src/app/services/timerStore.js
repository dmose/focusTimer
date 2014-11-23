"use strict";

var Reflux = require('reflux'),
  actions = require('../services/timerActions');

var timerStore = Reflux.createStore(
  {
    store: {
      mode: "stopped", // running, expired, stopped
      remainingTime: 0.05 * 60 * 1000
    },

    _intervalId: null,

    listenables: actions,

    onStartTimer: function () {
      console.log("in onStartTimer");

      this.store.mode = "running";
      this._intervalId = window.setInterval(this._onTimerFired.bind(this),
        1000);
      this.trigger(this.store);
    },

    onStopTimer: function () {
      console.log("in onStopTimer");

      window.clearInterval(this._intervalId);
      this._intervalId = null;
      this.store.mode = "stopped";
      this.trigger(this.store);
    },

    onExpireTimer: function() {
      console.log("in onExpireTimer");

      window.clearInterval(this._intervalId);
      this._intervalId = null;
      this.store.mode = "expired";
      this.trigger(this.store);
    },

    onSetRemainingTime: function(timeInMs) {
      //console.log("in onSetRemainingTime");

      this.store.remainingTime = timeInMs;
      this.trigger(this.store);
    },

    onClearExpiredMode: function() {
      console.log("in clearExpiredMode");

      if (this.store.mode === "expired") {
        this.store.mode = "stopped";
        this.trigger(this.store);
      }
    },

    _onTimerFired: function() {
      if (this.store.remainingTime <= 0) {
        actions.expireTimer();
      }

      actions.setRemainingTime(this.store.remainingTime - 1000);
    }
  }
);

module.exports = timerStore;
