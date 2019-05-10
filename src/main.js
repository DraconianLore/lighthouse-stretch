// Main JavaScript file in Lighthouse Labs Stretch Project - Steven Wing

/*
  Usage:
    drawBarChart (data, options, element)
      data: an array of numbers (the values to be put in the graph)
      options:  height: height of the entire bar graph(default: 300px)
                width - width of the entire bar graph(default: 300px)
                titleColour - Colour of the Title text
                titleSize - size of title font in pixels
                titleBackground - Background colour for title
                backgroundColor - bar colour (default blue)
                color - colour of the text inside the bars(default: white)
                alignment - alignment of the value inside the bar: top, center, bottom
      element:  the element ID of the DOM element you want the bar placed into

*/

const drawBarChart = function(data, options, element){

  // get number of values in data
  let numberOfBars = data.length;
  // set current working bar set
  let currenrBarSet;

  // check options and set defaults if empty
  let graphHeight = 300;
  if (options.height) {
    graphHeight = options.height;
  }
  let graphWidth = 300;
  if (options.width) {
    graphWidth = options.width;
  }
  let titleColour = 'black';
  if (options.titleColour) {
    titleColour = options.titleColour;
  }
  let titleFontSize = '36px';
  if (options.titleSize) {
    titleFontSize = options.titleSize + 'px';
  }
  let titleBG = '#eeeeee';
  if (options.titleBackground) {
    titleBG = options.titleBackground;
  }
  let barColour = 'blue';
  if (options.backgroundColor) {
    barColour = options.backgroundColor;
  }
  let barValueColour = 'white';
  if (options.color) {
    barValueColour = options.color;
  }
  let barValueAlignment = 'top';
  if (options.alignment) {
    switch(options.alignment) {
      case 'center':
        barValueAlignment = 'center';
        break;
      case 'top':
        barValueAlignment = 'flex-end';
        break;
      case 'bottom':
        barValueAlignment = 'flex-start';
        break;
    }
  }

  // create title and container if this is the first data set
  if (!document.getElementById('outerShell')) {
    // Generate title
    let chartTitle = generateFlexbox(graphHeight / 5, graphWidth);
    chartTitle.style.alignItems = 'center';
    chartTitle.style.backgroundColor = titleBG;
    chartTitle.style.color = titleColour;
    chartTitle.style.fontSize = titleFontSize;
    chartTitle.innerHTML = '<b>' + options.title + '</b>';
    element.appendChild(chartTitle);
    // Generate Bargraph Shell
    let outerShell = generateFlexbox(graphHeight * 0.8, graphWidth);
    outerShell.id = 'outerShell';
    outerShell.style.borderStyle = 'solid';
    outerShell.style.borderWidth = '5px';
    element.appendChild(outerShell);
  } else {
    //check data sets are compatible or throw an error
    if (!document.getElementById('barSet1.' + numberOfBars - 1).value) {
      alert('Error: Cannot stack more data values than existing graph. \nPlease try again');
    }
    if (!document.getElementById('barSet5.1').value) {
      alert('Error: Maximum sets of data is 5. \nPlease create a new graph')
    }
  }

  // Get largest bar and make graph scalable
  let largestBar = 0;
  // Largest in new data set
  for (let i = 0; i < numberOfBars; i++) {
    if (data[i] > largestBar) {
      largestBar = data[i];
    }
  }
  // Check for and add largest existing bar
  for (let i = 0; i < 5; i++) {
    if (document.getElementById('barSet' + i + '.1').value) {
      let currentSetLargest = 0;
      for (let x = 0; x < numberOfBars; x++) {
        currentSetLargest = 0;
        if (document.getElementById('barSet' + i + '.' + x).value > currentSetLargest) {
          currentSetLargest = document.getElementById('barSet' + i + '.' + x).value;
        }
      }
      largestBar += currentSetLargest;
    } else {
      currenrBarSet = i + 1;
      break;
    }
  }
  let barGraphHeight = (graphHeight * 0.8) / largestBar;

  // Generate bars
  for (let i = 0; i < numberOfBars; i++) {
    // use currenrBarSet

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
const resizeBar = function(newHeight, barToResize) {
  $('#' + barToResize).animate({height: newHeight}, 1000);
}
