// Main JavaScript file in Lighthouse Labs Stretch Project - Steven Wing


// Function signature to draw a bar chart
const drawBarChart = function(data, options, element){
  let numberOfBars = data.length;
  let barText = 'black';

  // Set default colour to Blue if there is no colour option sent
  let colourToUse = 'blue';
  if (options.colour) {
    colourToUse = options.colour;
  }

  //change text colour on bars if bar is set to black
  if (colourToUse == 'black') {
    barText = '#66ffff';
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

  // Generate bar graph shell
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
    barValue.style.width = barWidth + 'px';
    barValue.style.height = '0px';
    barDelay += 200;

    barValue.style.background = colourToUse;
    barValue.style.display = 'table'; //breaks ff
    barValue.id = 'bar' + i;
    barValue.value = data[i];

    let barValueNumber = document.createElement('div');
    barValueNumber.style = 'display: table-cell; vertical-align: bottom'
    barValueNumber.style.color = barText;
    barValueNumber.innerText = data[i];
    barValue.appendChild(barValueNumber);


    // construct devider for between bars
    let barDevider = document.createElement("div");
    barDevider.style.width = (barWidth / 2) + 'px';
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
  labelShell.style = 'display:flex; flex-wrap: nowrap; height: ' + (  graphHeight / 2) + 'px; width: ' + graphWidth + 'px; align-items: flex-end; justify-content: center; padding: 10px; align: center';
  element.appendChild(labelShell);

  for (let i = 0; i < numberOfBars; i++) {
    let barLabel = document.createElement("div");
    barLabel.style.width = barWidth + 'px';
    barLabel.style.height = (graphHeight / 2) + 'px';
    barLabel.style.background = colourToUse;

    let barDevider = document.createElement("div");
    barDevider.style.width = (barWidth / 2) + 'px';
    barDevider.style.background = "white";

    let labelText = document.createElement('div');
    labelText.style = 'writing-mode: vertical-rl; text-orientation: sideways; padding-top: 15px';
    labelText.style.color = barText;
    labelText.innerText = 'Data Value ' + (i + 1); // As the function signature has no area set
                                              // aside for Labels I have just named it simply


    labelShell.appendChild(barLabel);
    barLabel.appendChild(labelText);
    if (i + 1 < numberOfBars){
      labelShell.appendChild(barDevider);
    }

  }

}

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

  let secondColour = options.color;
  // check if bars are the same colour and change if they are
  if (secondColour == document.getElementById('bar0').style.background) {
    secondColour = 'purple';
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
    barValue.style.width = barWidth + 'px';
    barValue.style.background = secondColour;
    barValue.style.height = '0px';
    barValue.style.display = 'table'; //breaks ff
    barValue.id = 'barTwo' + i;

    let barValueNumber = document.createElement('div');
    barValueNumber.style = 'display: table-cell; vertical-align: bottom'
    barValueNumber.innerText = data[i];
    barValue.appendChild(barValueNumber);

    // set transform height
    let transformHeight = (data[i] * gHeight) + 'px';
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
