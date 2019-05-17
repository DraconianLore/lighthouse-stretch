# Stretch Project - Bar Graph Generator
Stretch project for Lighthouse Labs by Steven Wing

**Usage:**
`drawBarChart (data, options, element)`
   
* data: an array of numbers (the values to be put in the graph)
* options:  
  - height: height of the entire bar graph including title and labels(default: 400px)
  - width - width of the entire bar graph(default: 500px)
  - titleColour - Colour of the Title text (default: #630000)
  - titleSize - size of title font in pixels 
  - titleBackground - Background colour for title (default: #eeeeee)
  - backgroundColor - bar colour (default: blue)
  - barSpacing - space between bars. Width of the bars devided by this number (default: 3)
  - color - colour of the text inside the bars(default: white)
  - alignment - alignment of the value inside the bar: top, center, bottom (default: center)
  - labelText - Text for in the labels along the x-axis, bar number is appended
* element:  the element ID of the DOM element you want the bar placed into (if none provided will append to end of body)

*For multiple value charts, repeat the drawBarChart call with new data.*<br>
  Restrictions:<br>
    Extra set of data cannot have more data values than the first<br>
    By default you may only have five data sets per graph to reduce graph being too compacted
