//Build the panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var filteredArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var dataArray = filteredArray[0];
  
    var panel = d3.select(`#sample-metadata`);
    panel.html("");

    Object.entries(sample).forEach(([key, value]) => {
      var row = panel.append("h6");
      row.text(`${key.toUpperCase()}: ${value}`);
    }) 
  
  })
};


//build the charts
function buildChart(sample) {
  d3.json("samples.json").then((data) => {
    var samples = data.samples;
    var filteredArray = samples.filter(sampleObj => sampleObj.id == sample);
    var dataArray = filteredArray[0];
  
    var ids = dataArray.otu_ids;
    var labels = dataArray.otu_labels;
    var values = dataArray.sample_values;

    var LayoutBubble = {
      title: "Bacteria Cultures Per Sample",
      margin: { t: 0 },
      hovermode: "closest",
      xaxis: { title: "OTU ID" },
      margin: { t: 30}
      };

      var DataBubble = [
      {
        x: ids,
        y: values,
        text: labels,
        mode: "markers",
        marker: {
          color: ids,
          size: values,
          colorscale: "Earth"
          }
      }
    ];

    Plotly.plot("bubble", DataBubble, LayoutBubble);

    // @TODO: Build a Bar Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).

    d3.json("samples.json").then(function(data) {

      var barValue = values.slice(0, 10);
      var barLabel = ids.slice(0, 10);
      var barHover = labels.slice(0, 10);


      var bar_data = [
        {
          y: barValue,
          x: barLabel,
          text: barHover,
          type: "bar",
          orientation: "h"
        }
      ];

      var bar_layout = {
        margin: { t: 30, l: 150}
      };

      Plotly.plot("bar", bar_data, bar_layout);


    });

    

    

  });
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");
  

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names
    sampleNames.forEach((sample) => {
      selector
      .append("option")
      .text(sample)
      .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildChart(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildChart(newSample);
  buildMetadata(newSample);
}
 init();
      