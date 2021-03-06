Here's a quick-n-dirty writeup about how to make a Fluid app of focusTimer.
It turns out that the open-source version fluidium (the one that it's permitted to create distributions from)
can't seem to make the window small enough for a good user experience, so for now, the best
UX can be had by following these instructions to create a Fluid app.

Now that chromeless is more mature than when I started this, I've got
focusTimer bootstrapped to work with it, but the UX needs some work there too,
so for now I'm releasing as is.

* download & install Fluid.app
* start Fluid.app
* fill out the page like this:

URL: http://dmose.github.com/focusTimer/

Name: focusTimer

Icon: https://github.com/dmose/focusTimer/raw/e1c8d6219816dcd6de84edb5c88aee667a82aac0/time-tracker.png

* press the Create button
* after creation completes successfully, click the Launch Now button
* from the focusTimer menu, select Preferences

* Select Appearance, and make the following changes:

Window Style: HUD (Black)
Window Level: Floating
Window Opacity: somewhere near 75%

* click next, then select:

Spaces Behavior: Windows Appear in all Spaces
When this SSB is not frontmost: Windows are draggable from anywhere

* Quit out of focusTimer
* Start focusTimer
* From the View menu, select "Hide Status Bar"
