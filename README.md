# Stretch Project
Stretch project for Lighthouse Labs

**Usage:**
drawBarChart (data, options, element)
   
* data: an array of numbers (the values to be put in the graph)
* options:  
  - backgroundColor - bar colour (default blue)
  - width - width of the entire bar graph(default: 300px)
  - height: height of the entire bar graph(default: 300px)
  - color - colour of the text inside the bars(default: white)
  - alignment - alignment of the value inside the bar: top, center, bottom
  - titleColour - Colour of the Title text
  - titleSize - size of title font in pixels
* element:  the element ID of the DOM element you want the bar placed into

  *For multiple value charts, first draw the first chart, then
  call 'multiValueBarChart' function  with the same arguments as the initial bar.*
  
  Restrictions:
    Second set of bars cannot have more data values than the first
    Currently you may only have two sets of data per graph

