# Stretch Project - Bar Graph Generator
Stretch project for Lighthouse Labs by Steven Wing

**Usage:**
`drawBarChart (data, options, element)`<br>`
 multiValueBarChart (data, options, element)`
   
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

*For multiple value charts, draw the first chart with drawBarGraph function, then call 'multiValueBarChart' function.*<br>
  Restrictions:<br>
    Second set of bars cannot have more data values than the first<br>
    Currently you may only have two sets of data per graph

