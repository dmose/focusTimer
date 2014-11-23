/** @jsx React.DOM */

//noinspection BadExpressionStatementJS
'use strict';

var React = require('react'),
  Reflux = require('reflux'),
  Button = require('react-bootstrap/Button'),
  TimerWidget = require('../app/widgets/TimerWidget'),
  timerStore = require('../app/services/timerStore'),
  actions = require('../app/services/timerActions'),
  FluidTimer;

FluidTimer = React.createClass({
  mixins: [Reflux.listenTo(timerStore, "onStoreChange")],

  getInitialState: function() {
    return timerStore.store;
  },

  onStoreChange: function(currentStoreState) {
    this.setState(currentStoreState);
  },

  changeRootClass: function(className) {
    var htmlElement = document.getElementsByTagName('html')[0];
    htmlElement.className = className;
  },

  on25Click: function() {
    actions.setRemainingTime(25 * 1000 * 60);
    actions.clearExpiredMode();
  },

  on15Click: function() {
    actions.setRemainingTime(15 * 1000 * 60);
    actions.clearExpiredMode();
  },

  onPlus5Click: function() {
    actions.setRemainingTime(this.state.remainingTime + 5 * 1000 * 60);
    actions.clearExpiredMode();
  },

  render: function() {
    this.changeRootClass(this.state.mode + "-background");

    // XXX push-down at least Input to prop
    return (
      /* jshint ignore:start */
      <div>
        <TimerWidget mode={this.state.mode}
          remainingTime={this.state.remainingTime}/>
        <div>
          <Button bsSize="small" onClick={this.onPlus5Click}>+5</Button>
          <Button bsSize="small" onClick={this.on25Click}>25</Button>
          <Button bzSize="small" onClick={this.on15Click}>15</Button>
        </div>
      </div>
      /* jshint ignore:end */
    );
  }
});

React.render(
  /* jshint ignore:start */
  <FluidTimer />,
  /* jshint ignore:end */

  document.getElementById('app')
);
