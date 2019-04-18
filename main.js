// Main JavaScript file in Lighthouse Labs Stretch Project - Steven Wing


// Add stylesheet to document head

  var addStyleSheet = document.createElement("link");
  addStyleSheet.setAttribute("rel", "stylesheet");
  addStyleSheet.setAttribute("type", "text/css");
  addStyleSheet.setAttribute("href", "main.css");
  document.head.append(addStyleSheet);


// Function signature to draw a bar chart
const drawBarChart = function(data, options, element){
  let numberOfBars = data.length;
  let colourToUse = options.colour;
  let singleBar;
  let barWidth = options.width;

  let outerShell = document.createElement("div");
  outerShell.style = 'display:flex; flex-wrap: nowrap; align-items: flex-end; width: 30%; justify-content: center; padding: 50px';
  outerShell.align = 'center';
  element.appendChild(outerShell);

  for (let i = 0; i < numberOfBars; i++) {
    singleBar = "<img src='" + colourToUse + ".png' height='"
    + data[i] * 10 + "' width='" + barWidth + "'></img>";

    let barValue = document.createElement("div");
    barValue.style.width = barWidth + 'px';
    barValue.style.height = (data[i] * 10) + 'px';
    barValue.style.background = colourToUse;


    let barDevider = document.createElement("div");
    barDevider.style.width = (barWidth / 2) + 'px';
    barDevider.style.background = "white";
    outerShell.appendChild(barValue);
    outerShell.appendChild(barDevider);

  }
}
