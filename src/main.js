// Main JavaScript file in Lighthouse Labs Stretch Project - Steven Wing

/*
  Usage:
    drawBarChart (data, options, element)
      data: an array of numbers (the values to be put in the graph)
      options:  height: height of the entire bar graph(default: 400px)
                width - width of the entire bar graph(default: 500px)
                titleColour - Colour of the Title text
                titleSize - size of title font in pixels
                titleBackground - Background colour for title
                backgroundColor - bar colour (default: blue)
                barSpacing - space between bars. Width of the bars devided by this number (default: 3)
                color - colour of the text inside the bars(default: white)
                alignment - alignment of the value inside the bar: top, center, bottom
                labelText - Text for in the labels along the x-axis, bar number is appended
      element:  the element ID of the DOM element you want the bar placed into (if none provided will append to end of body)

*/

const drawBarChart = function(data, options, element){
  // Check if element is provided, if no element provided create graph at end of body
  if (!element) {
    element = document.querySelector('body');
  }
  // set maximum number of bars
  let maxBars = 5;
  // get number of values in data
  let numberOfBars = data.length;
  // set current working bar set
  let currenrBarSet;
  // check options and set defaults if empty
  let graphHeight = 400;  // Graph Height
  if (options.height) {
    graphHeight = options.height;
  }
  let graphWidth = 500;   // Graph Width
  if (options.width) {
    graphWidth = options.width;
  }
  let titleColour = '#630000';  // Title Colour
  if (options.titleColour) {
    titleColour = options.titleColour;
  }
  let titleFontSize = 'xx-large'; // Title font size
  if (options.titleSize) {
    titleFontSize = options.titleSize + 'px';
  }
  let titleBG = '#eeeeee';  // Title and Label Background Colour
  if (options.titleBackground) {
    titleBG = options.titleBackground;
  }
  let barSpace = 3;   // Spacing between bars
  if (options.barSpacing) {
    barSpace = options.barSpacing;
  }
  let barColour = 'blue'; // Bar colour
  if (options.backgroundColor) {
    barColour = options.backgroundColor;
  }
  let barValueColour = 'white'; // Bar text colour
  if (options.color) {
    barValueColour = options.color;
  }
  let barValueAlignment = 'center'; // Bar text alignment
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
  let labelText = 'Data Set '; // Label text
  if (options.labelText) {
    labelText = options.labelText + ' ';
  }

  // Set width of bars in graph based on data
  let barWidth = (graphWidth / numberOfBars) * 1.5;

  // create title and container if this is the first data set
  if (!document.getElementById('outerShell')) {
    // Center Bar Graph
    let barGraphShell = document.createElement('div');
    barGraphShell.style = 'display: flex; flex-direction: column; align-items: center';
    // Generate title
    let chartTitle = generateFlexbox(graphHeight / 10, graphWidth);
    chartTitle.style.alignItems = 'center';
    chartTitle.style.backgroundColor = titleBG;
    chartTitle.style.color = titleColour;
    chartTitle.style.fontSize = titleFontSize;
    chartTitle.innerHTML = '<b>' + options.title + '</b>';
    chartTitle.id = 'barTitle';
    barGraphShell.appendChild(chartTitle);
    // Generate Bargraph Shell
    let outerShell = generateFlexbox(graphHeight * 0.7, graphWidth);
    outerShell.id = 'outerShell';
    outerShell.style.borderStyle = 'solid';
    outerShell.style.borderWidth = '5px';
    barGraphShell.appendChild(outerShell);
    // generate label shell
    let labelShell = generateFlexbox(graphHeight * 0.2, graphWidth);
    labelShell.style.padding = '0px'
    labelShell.id = 'labelShell';
    barGraphShell.appendChild(labelShell);
    // Draw Bargraph
    element.appendChild(barGraphShell);
    // generate empty bars
    for (let i = 0; i < numberOfBars; i++) {
      generateEmptyBars(i, barWidth, barSpace, maxBars);
      document.getElementById('label' + (i + 1)).innerText = labelText + (i + 1);
    }
  } else {
    // check data sets are compatible or throw an error
    if (document.getElementById('barSet1.' + numberOfBars).value == 0) {
      alert('Error: Cannot stack more data values than existing graph. \nPlease try again');
    }
    if (document.getElementById('barSet' + maxBars + '.1').value > 0) {
      alert('Error: Maximum sets of data is ' + maxBars + '. \nPlease create a new graph')
    }
  }

  // Get largest bar and make graph scalable
  let largestBar = 0;
  // Largest in new data set
  for (let i = 0; i < numberOfBars; i++) {
    document.getElementById('bar' + (i + 1)).value += data[i];
    if (document.getElementById('bar' + (i + 1)).value > largestBar) {
      largestBar = document.getElementById('bar' + (i + 1)).value;
    }
  }
  // Check for existing data and set current bar set
  for (let i = 1; i <= maxBars; i++) {
    if (!document.getElementById('barSet' + i + '.1').value > 0) {
      currenrBarSet = i;
      break;
    }
  }
  let barGraphHeight = (graphHeight * 0.7) / largestBar;

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
const generateEmptyBars = function(barnNumber, barWidth, barSpacing, maxBars) {
 // add spaces between bars
  let barDevider = document.createElement('div');
  barDevider.style.width = (barWidth / barSpacing) + 'px';
  barDevider.style.background = 'white';
  let labelDevider = document.createElement('div');
  labelDevider.style.width = (barWidth / barSpacing) + 'px';
  if (barnNumber > 0) {
    document.getElementById('outerShell').appendChild(barDevider);
    document.getElementById('labelShell').appendChild(labelDevider);
  }

  // generate bars
  let createBar = document.createElement('div');
  createBar.style = 'display: flex; flex-direction: column-reverse';
  createBar.style.width = barWidth + 'px';
  createBar.id = 'bar' + (barnNumber + 1);
  createBar.value = 0;

  // generate labels
  let createLabel = document.createElement('div');
  createLabel.style = 'display: flex; align-items: center; justify-content: center';
  createLabel.style.width = barWidth + 'px';
  createLabel.style.height = document.getElementById('labelShell').style.height;
  createLabel.style.background = document.getElementById('barTitle').style.backgroundColor;

  let labelInner = document.createElement('div');
  labelInner.style = 'writing-mode: vertical-rl; text-orientation: sideways; padding: 2px; font-size: 90%';
  labelInner.id = 'label' + (barnNumber + 1);
  createLabel.appendChild(labelInner);
  document.getElementById('labelShell').appendChild(createLabel);

  // generate bar insides
  for (let i = 1; i <= maxBars; i++) {
    let barValue = document.createElement('div');
    barValue.style = 'display: flex; justify-content: center; height: 0px;';
    barValue.style.transitionProperty = 'height';
    barValue.style.transitionDuration = '2s';
    barValue.innerText = '';
    barValue.id = 'barSet' + i + '.' + (barnNumber + 1);
    barValue.value = 0;
    createBar.appendChild(barValue);

  }
  document.getElementById('outerShell').appendChild(createBar);


}
