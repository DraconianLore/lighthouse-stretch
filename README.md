# Stretch Project
Stretch project for Lighthouse Labs

## Goal - build a library so others can generate bar graphs on their web pages
**Using** - HTML, CSS, JS, JQuery
*Things to not use* - server, SVG, canvas
*Possibly using* - css transitions and animations

---

Functional requirements:
=======================
  * have a simple API to draw a bar chart
  * function should be used by my HTML page to render the chart into my demo page
  * Function signature should be : drawBarChart(data, options, element);
    * data      = array of numbers
    * options   = object with options e.g. width, height, colour
    * element   = DOM element or jQuery element the chart will get rendered into

---

Display requirements:
====================
  ## BAR CHART
  Display a list of single values, horizontally as a bar chart
  * Numerical values should be displayed inside the bar
  * Position of values should be customizable - Top, centre or bottom of the bar
  Bar sizes dependant on data passed in
  Bar width dependant on total amount of values passed
  Bar height dependant on values of data
  Bar porperties should be customizable
  * Bar colour
  * Label colour
  * Bar spacing(between bars)
  * Bar Chart aces
  x-axis should show labels for each data value
  * *how to structure*
  Y-axis should show ticks at certain values
  * *how to configure ? part of data? option in function?*
  Title of the bar chart able to be set and shown dynamically
  Title of the bar chart is customizable
  * Font Size
  * Font Colour

  ## MULTIPLE VALUE (STACKED) BAR CHARTS
  Allow user to pass multiple values to each bar
  * *how to do diferently from a single chart?*
  Support all feature of a single Bar Chart
  * Customizable bar colours, per value
  * Customizable label colours


