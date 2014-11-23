//noinspection BadExpressionStatementJS
'use strict';

var React = require('react'),
  Button = require('react-bootstrap/Button'),
  Input = require('react-bootstrap/Input'),
  actions = require('../services/timerActions'),
  duratiform = require('duratiform');

var TimerDisplay = React.createClass({

  render: function() {
    return (
      /* jshint ignore:start */
      <Input className="timer" type="time"
        onClick={this.props.inputClick} readOnly="true"
        value={duratiform.format(this.props.remainingTime, "m:ss")}>
      </Input>
      /* jshint ignore:end */
    );
  }
});

var TimerInput = React.createClass({

  onSubmit: function() {
    var remainingTimeMs = Date.parse(this.refs.timeLeft.getValue());
    console.log("remainingTimeMs:", remainingTimeMs);
    actions.setRemainingTime(remainingTimeMs);
    actions.startTimer();
  },

  render: function() {
    return (
      /*jshint ignore:start */
      <form onSubmit={this.onSubmit}>
        <Input className="timer" type="time" ref="timeLeft"
          defaultValue={duratiform.format(this.props.remainingTime, "m:ss")}>
        </Input>
      </form>
      /*jshint ignore:end */
    );
  }
});

var TimerWidget = React.createClass(
  {
    getInitialState: function () {
      return {inputMode: false};
    },

    onActionClick: function () {
      if (this.props.mode === "running") {
        actions.stopTimer();
      } else {
        actions.startTimer();
      }
    },

    onDisplayInputClick: function() {
      console.log("input clicked");
      actions.stopTimer();
      this.setState({inputMode: true});
    },

    render: function () {

      var actionWidgetry;

      if (this.props.mode !== "expired") {
        var buttonText = (this.props.mode === "running") ? "Stop" : "Start";

        /* jshint ignore:start */
        actionWidgetry = <Button onClick={this.onActionClick}>{buttonText}</Button>;
        /* jshint ignore:end */
      }

      if (this.state.inputMode) {
        return (
          /* jshint ignore:start */
          <div className="widget-wrapper">
            <TimerInput remainingTime={this.props.remainingTime} />
            {actionWidgetry}
          </div>
          /* jshint ignore:end */
        );
      }

      // we must be in display mode, so...
      return (
        /* jshint ignore:start */
        <div className="widget-wrapper">
          <TimerDisplay remainingTime={this.props.remainingTime}
            inputClick={this.onDisplayInputClick} />
          {actionWidgetry}
        </div>
        /* jshint ignore:end */
      );
    }
  }
);
module.exports = TimerWidget;
