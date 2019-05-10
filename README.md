# Stretch Project - Bar Graph Generator
Stretch project for Lighthouse Labs by Steven Wing

**Usage:**
`drawBarChart (data, options, element)`
   
* data: an array of numbers (the values to be put in the graph)
* options:  
  - height: height of the entire bar graph(default: 300px)
  - width - width of the entire bar graph(default: 300px)
  - titleColour - Colour of the Title text
  - titleSize - size of title font in pixels
  - titleBackground - Background colour for title
  - backgroundColor - bar colour (default blue)
  - color - colour of the text inside the bars(default: white)
  - alignment - alignment of the value inside the bar: top, center, bottom
* element:  the element ID of the DOM element you want the bar placed into

*For multiple value charts, repeat the drawBarChart call with new data.*<br>
  Restrictions:<br>
    Extra set of data cannot have more data values than the first<br>
    Currently you may only have five data sets per graph
