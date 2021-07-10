// @TODO: YOUR CODE HERE!
var svgWidth = 1000;
var svgHeight = 1000;

var margin = {
    top: 20,
    right: 60,
    bottom: 80,
    left: 50
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

// // functions used for updating X axis -- Try someting similar for Y axis

// function renderXCircles(circlesGroup, newXScale, chosenXAxis) {​
//             circlesGroup.transition()
//         .duration()
//           //.attr("", d => newXScale(d[chosenXAxis]))
//         .attr("cx", d => newXScale(d[chosenXAxis]));
//         return circlesGroup;
// }


// // functions used for updating Y axis
// function renderYCircles(circlesGroup, newYScale, chosenYAxis) {
//   ​
//     circlesGroup.transition()
//       .duration(1000)
//       //.attr("", d => newXScale(d[chosenXAxis]))
//       .attr("cy", d => newYScale(d[chosenYAxis]));

//     return circlesGroup;
// }

// // function used for updating circles group 
// function updateToolTip(chosenXAxis, chosenYAxis, circlesGroup) {
//     ​
//         var xlabel;
//         var ylabel;
      
//         if (chosenXAxis === "poverty") {
//           xlabel = "Poverty %:";
//         }
//         else if (chosenXAxis === "age") {
//           xlabel = "Age:";
//         }
        
//     ​
//         if (chosenYAxis === 'healthcare'){
//             ylabel = "Healthcare:"
//         }
//         else if (chosenYAxis === 'smokes'){
//             ylabel = "Somkers:"
//         }
        
      
//         var toolTip = d3.tip()
//           .attr("class", "tooltip")
//           .offset([80, -60])
//           .classed("d3-tip")
//         //   .style("color", "")
//         //   .style("background", '')
//         //   .style("border", "")
//         //   .style("border-width", "")
//         //   .style("border-radius", "")
//         //   .style("padding", "")
//           .html(function(d) {
//             return (`${d.state}<br>${xlabel} ${d[chosenXAxis]}%<br>${ylabel} ${d[chosenYAxis]}%`);
//           });
      
//         circlesGroup.call(toolTip);
      
//         circlesGroup.on("mouseover", function(data) {
//           toolTip.show(data);
//         })
//           // onmouseout event
//         .on("mouseout", function(data, index) {
//         toolTip.hide(data);
//         });
      
//         return circlesGroup;
//     }

// Read the CSV data
d3.csv("assets/data/data.csv").then(function(data, err) {
   // parse data
   data.forEach(d => {
    // convert to numbers 
    d.poverty = +d.poverty; 
  });
  
     // xLinearScale function above csv import
     var xLinearScale = xScale(data, chosenXAxis);
     
    // Create y scale function
    var yLinearScale = yScale(data, chosenYAxis);

     // Create initial axis functions
     var bottomAxis = d3.axisBottom(xLinearScale);
     var leftAxis = d3.axisLeft(yLinearScale);
     
      // append x axis
      var xAxis = chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);
      
          // append y axis
    var yAxis = chartGroup.append("g")
    .call(leftAxis);

    // append initial circles
    var circlesGroup = chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("g");

    var circles = circlesGroup.append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d[chosenYAxis]))
    .attr("r", 15)
    .classed('stateCircle', true);

    // append text inside circles
    var circlesText = circlesGroup.append("text")
    .text(d => d.abbr)
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d[chosenYAxis])+5) //to center the text in the circles
    .classed('stateText', true);
});