// Defining the main function, which will call the getData function
function init(){
  buildbarcharts();
}

//------------------------------------------------------------------------------------------------------------

// Define buildbarcharts function which will build the default chart when the page first loads
function buildbarcharts(){
  
  var chart_data = [{
    x: ['1900s', '1910s', '1920s', '1930s', '1940s', '1950s', '1960s', '1970s', '1980s',
    '1990s', '2000s', '2010s', '2018'],
    // y: [1,2,3,4,5,6,7,8,9,10,11,12,13],
    y: [47,49,54,60,62,67,67,68,71,73,75,80,87],
    type: "bar",
    text: [47,49,54,60,62,67,67,68,71,73,75,80,87],
    font: {
      family: 'Arial',
      size: 50,
      color: 'blue'
    },
    textposition: 'auto',
    hoverinfo: 'none',
    opacity: 0.5,



    marker: {
      color: '#1f77b4'
    }
  }];

  var layout = {
    title: "Life Expectancy - Male",
    xaxis: { title: "Decades"},
    yaxis: { title: "Age in Years"}
  };
  Plotly.plot("plot", chart_data, layout);
}

//---------------------------------------------------------------------------------------------

// Defining the new update Charts function which will call for new charts to be plotted each time 
//this function is called from getDataCharts() function

function updatePlotly(newdata, newlayout) {
  var BAR = document.getElementById("plot");  
  Plotly.newPlot(BAR, newdata, newlayout);
}

//---------------------------------------------------------------------------------------------

function getDataCharts(dataset) {
  var data = [];
  var layout = {};
  
  switch (dataset) {
    
    case "dataset1":
    data = [{
      x: ['1900s', '1910s', '1920s', '1930s', '1940s', '1950s', '1960s', '1970s', '1980s',
      '1990s', '2000s', '2010s', '2018'],
      // y: [1,2,3,4,5,6,7,8,9,10,11,12,13],
      y: [47,49,54,60,62,67,67,68,71,73,75,80,87],
      
      type: "bar",

      text: [47,49,54,60,62,67,67,68,71,73,75,80,87],

      textposition: 'auto',
      hoverinfo: 'none',
      opacity: 0.5,
      marker: {
        color: '#1f77b4'
      }
    }];
    layout = {
      title: "Life Expectancy - Male",
      xaxis: { title: "Decades"},
      yaxis: { title: "Age in Years"}
    };
    break;
    
    case "dataset2":
    data = [{
      x: ['1900s', '1910s', '1920s', '1930s', '1940s', '1950s', '1960s', '1970s', '1980s',
      '1990s', '2000s', '2010s', '2018'],
      y: [49,52,66,64,67,72,74,76,78,80,80,82,89],
      type: "bar",
      text: [49,52,66,64,67,72,74,76,78,80,80,82,89],

      textposition: 'auto',
      hoverinfo: 'none',
      opacity: 0.5,
      
      marker: {
        color: 'pink'
      }
    }];
    layout = {
      title: "Life Expectancy - Female",
      xaxis: { title: "Decades"},
      yaxis: { title: "Age in Years"}
    };
    break;
    //-------------------------------------------------------------------------------------------------
    
    
    default:
    data = [];
    layout = {title: "No Graph has been selected"};
  }
  updatePlotly(data, layout);
}

init();
