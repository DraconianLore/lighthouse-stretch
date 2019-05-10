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
  let barValueAlignment = 'center';
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
  let barWidth = (graphWidth / numberOfBars) * 1.5;


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
    // generate empty bars

    for (let i = 0; i < numberOfBars; i++) {
      generateEmptyBars(i, barWidth);
    }
  } else {
    //check data sets are compatible or throw an error
    if (document.getElementById('barSet1.' + numberOfBars).value == 0) {
      alert('Error: Cannot stack more data values than existing graph. \nPlease try again');
    }
    if (document.getElementById('barSet5.1').value > 0) {
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
  for (let i = 1; i < 6; i++) {
    if (document.getElementById('barSet' + i + '.1').value > 0) {
      let currentSetLargest = 0;
      for (let x = 0; x < numberOfBars; x++) {
        currentSetLargest = 0;
        if (document.getElementById('barSet' + i + '.' + (x + 1)).value > currentSetLargest) {
          currentSetLargest = document.getElementById('barSet' + i + '.' + (x + 1)).value;
        }
      }
      largestBar += currentSetLargest;
    } else {
      currenrBarSet = i;
      break;
    }
  }
  let barGraphHeight = (graphHeight * 0.8) / largestBar;

  // generate new bars
  for (let i = 0; i < numberOfBars; i++) {
    let currentBar;
    // resize old bars
    if (currenrBarSet > 1) {
      for (let oldbar = 1; oldbar < currenrBarSet; oldbar++) {
        currentBar = document.getElementById('barSet' + oldbar + '.' + (i+1));
        currentBar.style.height = (currentBar.value * barGraphHeight) + 'px';
      }
    }
    // set new bars
    currentBar = document.getElementById('barSet' + currenrBarSet + '.' + (i + 1));
    currentBar.value = data[i];
    currentBar.style.height = (data[i] * barGraphHeight) + 'px';
    currentBar.innerText = data[i];
    currentBar.style.borderTop = '1px solid black';
    currentBar.style.background = barColour;
    currentBar.style.color = barValueColour;
    currentBar.style.alignItems = barValueAlignment;
  }


}

// Function to generate flexboxes for initialization
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

// Function to generate empty bars on initialzation
const generateEmptyBars = function(barnNumber, barWidth) {
 // add spaces between bars
  let barDevider = document.createElement('div');
  barDevider.style.width = (barWidth / 3) + 'px';
  barDevider.style.background = 'white';
  if (barnNumber > 0) {
    document.getElementById('outerShell').appendChild(barDevider);
  }

  // generate bars
    let createBar = document.createElement('div');
    createBar.style.display = 'flex';
    createBar.style.flexDirection = 'column-reverse';
    createBar.style.width = barWidth + 'px';
    createBar.id = 'bar' + (barnNumber + 1);

  for (let i = 1; i < 6; i++) {

    let barValue = document.createElement('div');
    barValue.style.display = 'flex';
    barValue.style.justifyContent = 'center';
    barValue.style.background = 'green';
    barValue.innerText = '';
    barValue.style.height = '0px';
    barValue.id = 'barSet' + i + '.' + (barnNumber + 1);
    barValue.value = 0;
    createBar.appendChild(barValue);

  }
  document.getElementById('outerShell').appendChild(createBar);


}


// set bars to enlarge
const resizeBar = function(newHeight, barToResize) {
  $('#' + barToResize).animate({height: newHeight}, 1000);
}
