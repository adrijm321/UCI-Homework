// @TODO: YOUR CODE HERE!
//You need to create a scatter plot between two of the data variables such as Healthcare vs. Poverty or Smokers vs. Age.
//Using the D3 techniques we taught you in class, create a scatter plot that represents each state with circle elements. You'll code this graphic in the app.js file of your homework directory—make sure you pull in the data from data.csv by using the d3.csv function. Your scatter plot should ultimately appear like the image at the top of this section.


//Include state abbreviations in the circles.


//Create and situate your axes and labels to the left and bottom of the chart.


//Note: You'll need to use python -m http.server to run the visualization. This will host the page at localhost:8000 in your web browser.
    var svgWidth = 960;
    var svgHeight = 500;

    var margin = {
        top: 50,
        bottom: 50,
        right: 50,
        left: 50
    
    };

    var height = svgHeight - margin.top - margin.bottom;
    var width = svgWidth - margin.left - margin.right;

    var svg = d3
        .select(".scatter")
        .append("svg")
        .attr("height", svgHeight)
        .attr("width", svgWidth);

    var scatterChart = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
        
    d3.csv("assets/data/data.csv").then(function(healthData) {
        healthData.forEach(function(data) {
            data.poverty = +data.poverty;
            data.healthcare = + data.healthcare;
        });
    
    var xLinearScale = d3.scaleLinear()
        .domain([0, d3.max(healthData, d => d.poverty)])    
    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(healthData, d => d.healthcare)])    
    
    var xAxis = d3.axisBottom(xLinearScale);
    var yAxis = d3.axisLeft(yLinearScale);  
    scatterChart.append("g")
        .attr("transform", `translate(0, ${height})`) 
        .call(xAxis)
    scatterChart.append("g")
        .call(yAxis);
        
    var stateCircle = scatterChart.selectAll("circle")
        .data(healthData)
        .enter()
        .append("circle")  
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("r", "10")
        .attr("fill", "blue")
        .attr("opacity", .5)
    
        
        var toolTip = d3
        .tip()
        .attr("class", "toolTip")
        .offset([80, -60])
        .html(function(d) {
            return(abbr + '%');
        });

        console.log(toolTip)
    
    stateCircle.call(toolTip);    
    
    stateCircle.on("click", function(d) {
        toolTip.show(d, this);
    })

        .on("mouseout", function(d, index) {
            toolTip.hide(d);
        });      


    scatterChart.append("text")
        .style("font-size", "10px")
        .selectAll("tspan")
        .data(healthData)
        .enter()
        .append("tspan")
            .attr("x", function(data) {
                return xLinearScale(data.healthcare);
      })
            .attr("y", function(data) {
                return yLinearScale(data.poverty);
      })
            .text(function(data) {
                return data.abbr
      });

    scatterChart.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 40)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Lacks Healtcare(%)");

    scatterChart.append("g")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .attr("class", "axisText")
        .text("In Poverty (%)");
    

    });    
