// Main JavaScript file in Lighthouse Labs Stretch Project - Steven Wing

/*
  Usage:
    drawBarChart (data, options, element)
      data: an array of numbers (the values to be put in the graph)
      options:  backgroundColor - bar colour (default blue)
                width - width of the entire bar graph(default: 300px)
                height: height of the entire bar graph(default: 300px)
                color - colour of the text inside the bars(default: white)
                alignment - alignment of the value inside the bar: top, center, bottom
                titleColour - Colour of the Title text
                titleSize - size of title font in pixels
                titleBackground - Background colour for title
      element:  the element ID of the DOM element you want the bar placed into

*/

const drawBarChart = function(data, options, element){

  // check options and set defaults if empty
  let graphHeight = 300;
  if (options.height){
    graphHeight = options.height;
  }
  let graphWidth = 300;
  if (options.width){
    graphWidth = options.width;
  }
  let titleBG = '#eeeeee';
  if (options.titleBackground) {
    titleBG = options.titleBackground;
  }
  let titleColour = 'black';
  if (options.titleColour) {
    titleColour = options.titleColour;
  }
  let titleFontSize = '36px';
  if (options.titleSize) {
    titleFontSize = options.titleSize + 'px';
  }

  // create title and container if this is the first data set
  if (!document.getElementById('outerShell')) {
    let chartTitle = generateFlexbox(graphHeight / 5, graphWidth);
    chartTitle.style.alignItems = 'center';
    chartTitle.style.backgroundColor = titleBG;
    chartTitle.style.color = titleColour;
    chartTitle.style.fontSize = titleFontSize;
    chartTitle.innerHTML = '<b>' + options.title + '</b>';
    element.appendChild(chartTitle);

    let outerShell = generateFlexbox(graphHeight * 0.8, graphWidth);
    outerShell.id = 'outerShell';
    outerShell.style.borderStyle = 'solid';
    outerShell.style.borderWidth = '5px';
    element.appendChild(outerShell);
  }


}

const generateFlexbox = function(flexHeight, flexWidth){
    let flexy = document.createElement('div');
    flexy.style.display = 'flex';
    flexy.style.alignItems = 'flex-end';
    flexy.style.justifyContent = 'center';
    flexy.style.padding = '10px';
    flexy.style.height = flexHeight + 'px';
    flexy.style.width = flexWidth + 'px';
    return flexy;
}


// set bars to enlarge
const enlargeBar = function(newHeight, barToResize) {
  $('#' + barToResize).animate({height: newHeight}, 1000);
}
