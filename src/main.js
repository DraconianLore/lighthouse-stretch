// Main JavaScript file in Lighthouse Labs Stretch Project - Steven Wing

/*
  Usage:
    drawBarChart (data, options, element)
      data: an array of numbers (the values to be put in the graph)
      options:  backgroundColor - bar colour (default blue)
                width - width of the entire bar graph(default: 300px)
                height: height of the entire bar graph(default: 300px)
                color - colour of the text inside the bars(default: white)
                alignment - value number in bar: top, center, bottom
      element:  the element ID of the DOM element you want the bar placed into

  For multiple value charts, first draw the first chart, then
  call 'multiValueBarChart' function  with the same arguments as the initial bar.
  Restrictions:
    Second set of bars cannot have more data values than the first
    Currently you may only have two sets of data per graph
*/

// Draw initial bar chart
const drawBarChart = function(data, options, element){
  let numberOfBars = data.length;
  // set text colour
  let barText = 'white';
    if (options.color) {
    barText = options.color;
  }

  // Set default colour to Blue if there is no colour option sent
  let colourToUse = 'blue';
  if (options.backgroundColor) {
    colourToUse = options.backgroundColor;
  }


  // if no width provided assign width of 300px
  let graphWidth = 300;
  if (options.width) {
    graphWidth = options.width;
  }

  //set bar width based on graph size
  let barWidth = (graphWidth / data.length) * 1.5;

  // if no height provided allow height to be determined by the data
  let graphHeight = 300;
  if (options.height) {
    graphHeight = options.height;
  }
  // generate graph title
  let graphTitle = document.createElement('div');
  graphTitle.style = 'display:flex; flex-wrap: nowrap; height: ' + (graphHeight / 5) + 'px; width: ' + graphWidth + 'px; align-items: center; justify-content: center; padding: 10px; align: center';
  graphTitle.style.backgroundColor = '#eeeeee';
  graphTitle.style.color = "black";
  graphTitle.innerHTML = '<h1>' + options.title + '</h1>';
  element.appendChild(graphTitle);

  // Generate bar graph shell
  graphHeight = graphHeight * 0.8;
  let outerShell = document.createElement("div");
  outerShell.style = 'display:flex; flex-wrap: nowrap; height: ' + graphHeight + 'px; width: ' + graphWidth + 'px; align-items: flex-end; justify-content: center; padding: 10px; border-style: solid; border-width: 5px; align: center';
  outerShell.id = 'outerShell';

  element.appendChild(outerShell);

  // Get largest bar size and make graph scalable
  let largestBar = 0;
    for(let i = 0; i < numberOfBars; i++) {
      if (data[i] > largestBar) {
        largestBar = data[i];
      }
    }
  let gHeight = graphHeight / largestBar;
  let barDelay = 0;

   // Generate bar graph
  for (let i = 0; i < numberOfBars; i++) {
    // construct bars
    let barValue = document.createElement("div");
    barValue.style.display = 'flex';
    barValue.style.flexDirection = "column-reverse";
    barValue.style.justifyContent = "flex-end";
    // check for alignment
    if (options.alignment) {
      switch(options.alignment) {
        case 'center':
          barValue.style.justifyContent = 'center';
          break;
        case 'top':
          barValue.style.justifyContent = 'flex-end';
          break;
        case 'bottom':
          barValue.style.justifyContent = 'flex-start';
          break;
      }
    }

    barValue.style.width = barWidth + 'px';
    barValue.style.height = '0px';
    barDelay += 200;

    barValue.style.background = colourToUse;

    barValue.id = 'bar' + i;
    barValue.value = data[i];

    let barValueNumber = document.createElement('div');
    barValueNumber.style = 'display: flex; justify-content: center';
    barValueNumber.style.color = barText;
    barValueNumber.innerText = data[i];
    barValue.appendChild(barValueNumber);


    // construct devider for between bars
    let barDevider = document.createElement("div");
    barDevider.style.width = (barWidth / 3) + 'px';
    barDevider.style.background = "white";

    // insert the bar into the graph
    outerShell.appendChild(barValue);

    let transformHeight = (data[i] * gHeight) + 'px';

    setTimeout(() => {
      enlargeBar(transformHeight, 'bar' + i);
    }, barDelay);

    // Add space between bars
    if (i + 1 < numberOfBars){
      outerShell.appendChild(barDevider);
    }
  }

  // Generate Labels
  let labelShell = document.createElement("div");
  labelShell.style = 'display:flex; flex-wrap: nowrap; height: ' + (  graphHeight / 2) + 'px; width: ' + graphWidth + 'px; justify-content: center; padding: 10px;';
  labelShell.style.alignItems= 'flex-end';

  element.appendChild(labelShell);

  for (let i = 0; i < numberOfBars; i++) {
    let barLabel = document.createElement("div");
    barLabel.style = 'display: flex; align-items: center; justify-content: center'
    barLabel.style.width = barWidth + 'px';
    barLabel.style.height = (graphHeight / 2) + 'px';
    barLabel.style.background = '#999999';

    let barDevider = document.createElement("div");
    barDevider.style.width = (barWidth / 2) + 'px';
    barDevider.style.background = "white";

    let labelText = document.createElement('div');
    labelText.style = 'writing-mode: vertical-rl; text-orientation: sideways';
    labelText.style.color = '#eeeeee';
    labelText.innerText = 'Data Set ' + (i + 1); // As the function signature has no area set
                                              // aside for Labels I have just named it simply


    labelShell.appendChild(barLabel);
    barLabel.appendChild(labelText);
    if (i + 1 < numberOfBars){
      labelShell.appendChild(barDevider);
    }

  }

}

// Draw second data set on initial graph
const multiValueBarChart = function(data, options, element) {
  // Reduce width of existing bars and add the new bar beside it
  let numberOfBars = data.length;

  // Check if there is more data sent than existing graph and return error if there is
  if (!document.getElementById('bar' + (numberOfBars - 1))) {
    alert('Error: Second sed of data cannot contain more values than existing graph \nPlease try again');
    return;
  }
  if (document.getElementById('barTwo0')) {
    alert('Error: Second data set already exists. \nYou may only have 2 sets of values per graph');
    return;
  }

  let secondColour = 'blue';
  if (options.backgroundColor) {
    secondColour = options.backgroundColor
  }
  // check if bars are the same colour and change if they are
  if (secondColour == document.getElementById('bar0').style.backgroundColor) {
    secondColour = 'purple';
  }

  let barText = 'white';
  if (options.color) {
    barText = options.color;
  }
  //set bar width based on graph size
  let barWidth = parseInt(document.getElementById('bar0').style.width,10) / 2;
  let largestBar = 0;

  for (let i = 0; i < numberOfBars; i++) {
    let thisBar = document.getElementById('bar' + i).value;

    if (thisBar > largestBar) {
      largestBar = thisBar;
    }
  }

  let gHeight = (parseInt(element.style.height,10)) / largestBar;
  let barDelay = 0;

  for (let i = 0; i < numberOfBars; i++) {
    let currentBar = document.getElementById('bar' + i);
    currentBar.style.width =  barWidth + 'px';

    barDelay += 200;

    let barValue = document.createElement("div");
    barValue.style.display = 'table';
    barValue.style = "table-layout: fixed";
    barValue.style.width = barWidth + 'px';
    barValue.style.background = secondColour;
    barValue.style.height = '0px';
    barValue.id = 'barTwo' + i;

    let barValueNumber = document.createElement('div');
    barValue.style.display = 'flex';
    barValue.style.flexDirection = "column-reverse";
    barValue.style.justifyContent = "flex-end";
    // check for alignment
    if (options.alignment) {
      switch(options.alignment) {
        case 'center':
          barValue.style.justifyContent = 'center';
          break;
        case 'top':
          barValue.style.justifyContent = 'flex-end';
          break;
        case 'bottom':
          barValue.style.justifyContent = 'flex-start';
          break;
      }
    }
    barValueNumber.style.color = barText;
    barValue.appendChild(barValueNumber);

    // set transform height, check if new bars are larger, if so set height to top of space
    let transformHeight = (data[i] * gHeight) + 'px';
    if (data[i] > largestBar) {
      transformHeight = (largestBar * gHeight + 10) + 'px';
      barValueNumber.style.fontWeight = 'bold';
      barValueNumber.innerText = '^ \n';
    }
    barValueNumber.innerText += data[i];

    currentBar.parentNode.insertBefore(barValue, currentBar.nextSibling);
    setTimeout(() => {
      enlargeBar(transformHeight, 'barTwo' + i);
    }, barDelay);

  }
}

// set bars to enlarge
const enlargeBar = function(newHeight, barToResize) {
  $('#' + barToResize).animate({height: newHeight}, 1000);
}
