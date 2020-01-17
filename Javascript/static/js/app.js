// from data.js
var tableData = data;

// YOUR CODE HERE!
// write code that appends a table to your web page and then adds new rows of data for each UFO sighting.
// Use a date form in your HTML document and write JavaScript code that will listen for events and search through the date/time column to find rows that match user input.

var tbody = d3.select("tbody");

tableData.forEach(function (ufo_rows) {
    tbody.html("");
    console.log(ufo_rows);
    var row = tbody.append("tr");
    Object.entries(ufo_rows).forEach(function([key, value]) {
        console.log(key, value);
        var cell = row.append("td");
        cell.text(value);
    });

});

var button = d3.select("#filter-btn");

button.on("click", function() {
    d3.select("tbody").html("");
    var inputElement = d3.select("#datetime");
    var inputValue = inputElement.property("value");

    console.log(inputValue);
    console.log(tableData);

    var filteredData = tableData.filter(bydate => bydate.datetime == inputValue);
    console.log(filteredData);
    
    filteredData.forEach(function (filtered_ufo) {

        console.log(filtered_ufo);
        var row = tbody.append("tr");
        
        Object.entries(filtered_ufo).forEach(function([key, value]) {
            
            console.log(key, value);
            var cell = row.append("td");
            cell.text(value);

        });


    });
});
