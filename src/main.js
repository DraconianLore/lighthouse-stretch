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
  element.appendChild(outerShell);

  // Get largest bar size and make graph scalable
  let largestBar = 0;
    for(let i = 0; i < numberOfBars; i++) {
      if (data[i] > largestBar) {
        largestBar = data[i];
      }
    }
  let gHeight = graphHeight / largestBar;

  // Generate bar graph
  for (let i = 0; i < numberOfBars; i++) {
    // construct bars
    let barValue = document.createElement("div");
    barValue.style.width = barWidth + 'px';
    barValue.style.height = (data[i] * gHeight) + 'px';
    barValue.style.background = colourToUse;
    barValue.style.display = 'table'; //breaks ff

    let barValueNumber = document.createElement('div');
    barValueNumber.style = 'display: table-cell; vertical-align: bottom'
    barValueNumber.style.color = barText;
    barValueNumber.innerText = data[i];
    barValue.appendChild(barValueNumber);


    // construct devider for between bars
    let barDevider = document.createElement("div");
    barDevider.style.width = (barWidth / 2) + 'px';
    barDevider.style.background = "white";
    outerShell.appendChild(barValue);

    // Add space between bars
    if (i + 1 < numberOfBars){
      outerShell.appendChild(barDevider);
    }
  }
}
