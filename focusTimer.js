var defaultMins = 15;

function TimeCounter() {
}
TimeCounter.prototype = {
  secondsLeft: defaultMins * 60,
  
  pendingTimeoutId: -1,
  
  updateRunButton: function tc_updateRunButton() {
    if (this.secondsLeft <= 0) {
      // hide the pause/run button
      $("input.runButtonClass").toggle(false);
      return;
    } else {
      $("input.runButtonClass").toggle(true);
    }
    
    if (this.pendingTimeoutId < 0) {
      $("input.runButtonClass").val("Run");
      $("body, input:text").css("background-color", "#bbbbbb");
    } else {
      $("input.runButtonClass").val("Pause");
      $("body, input:text").css("background-color", "#66cc66");
    }
  }, 

  toggleRunState: function tc_toggleRunState() {
    if (this.pendingTimeoutId < 0) {
      this.pendingTimeoutId = setTimeout(counter.update, 1000);
      $("input.runButtonClass").val("Pause");
      $("body, input:text").css("background-color", "#66cc66");
    } else {
      clearTimeout(this.pendingTimeoutId);
      this.pendingTimeoutId = -1;
      $("input.runButtonClass").val("Run");
      $("body, input:text").css("background-color", "#bbbbbb");
    } 
  },
  
  toString: function tc_toString(){
    var seconds = this.secondsLeft % 60;
    if (seconds < 10) {
      var secString = "0" + seconds.toString();
    }
    else {
      secString = seconds.toString();
    }
    
    return Math.floor(this.secondsLeft / 60) + ":" + secString;
  },

  updateInputValue: function tc_updateInputValue() {
    this.updateRunButton();
    $("input.timeClass").val(this.toString());
  },
  
  // last of abstraction/encapsulation violation nastiness here, working around
  // setTimeout providing a separate 'this' object.  Refactoring needed.
  update: function tc_timerUpdate() {
    // decrement seconds remaining
    counter.secondsLeft -= 1;

    counter.updateInputValue();
  
    if (counter.secondsLeft == 0) {
      // change to red
      $("body, input:text").css("background-color", "#ff0000");

      // hide the pause/run button
      counter.pendingTimeoutId = -1; // used internally to title button; ick
      counter.updateRunButton();

    } else {
      counter.pendingTimeoutId = setTimeout(counter.update, 1000);
    }
  } 
};

var counter = new TimeCounter();

$(document).ready(function(){

  $("input:button").button();
  $("input.ui-button").css("padding", "0.3em 0.7em");
  $(".ui-widget").css("font-size", "0.7em");

  // for some reason, fluid.app adds a bunch of extraneous space that we need
  // to get rid of, and sizeToContent() doesn't seem to fix it, so...
  if ("fluid" in window) {
    resizeTo(150, 60);
  } else {
    $("div.timerDivClass").css("width", "150px");
    $("div.timerDivClass").css("height", "60px");
    
  }
  counter.updateInputValue();
  
  $("input.runButtonClass").click(function() {
    counter.toggleRunState();
  });
  
  $("input.reset15ButtonClass").click(function() {
    counter.secondsLeft = 60 * 15;
    counter.updateInputValue();
    counter.updateRunButton();
  });

  $("input.reset25ButtonClass").click(function() {
    counter.secondsLeft = 60 * 25;
    counter.updateInputValue();
    counter.updateRunButton();
  });
  
  $("input.timeClass").change(function() {
    counter.secondsLeft = $("input.timeClass").val() * 60;
    counter.updateInputValue();
  });
});

