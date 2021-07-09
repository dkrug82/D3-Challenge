// @TODO: YOUR CODE HERE!
var svgWidth = 1000;
var svgHeight = 1000;

var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
  };

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight + 50);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
var chosenXAxis = "poverty";
var chosenYAxis = "healthcare";

// function used for updating x-scale var upon click on axis label
function xScale(data, chosenXAxis) {
    // create scales
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(data, d => d[chosenXAxis]) * 0.9,
        d3.max(data, d => d[chosenXAxis]) * 1.1
      ])
      .range([0, width]);

    return xLinearScale; 
}

// function used for updating y-scale var upon click on axis label
function yScale(data, chosenYAxis) {
    // create scales
    var yLinearScale = d3.scaleLinear()
      .domain([d3.min(data, d => d[chosenYAxis])-2,d3.max(data, d => d[chosenYAxis])+2])
      .range([height, 0]);

    return yLinearScale; 
}

// functions used for updating X axis -- Try someting similar for Y axis
function renderXCircles(circlesGroup, newXScale, chosenXAxis) {
      ​
        circlesGroup.transition()
          .duration(1000)
          //.attr("", d => newXScale(d[chosenXAxis]))
          .attr("cx", d => newXScale(d[chosenXAxis]));

        return circlesGroup;
    }