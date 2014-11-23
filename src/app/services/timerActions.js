'use strict';

var Reflux = require('reflux');

var actions = Reflux.createActions([
  "startTimer",
  "stopTimer",
  "expireTimer",
  "setRemainingTime",
  "clearExpiredMode"
]);

//noinspection JSValidateTypes
module.exports = actions;
