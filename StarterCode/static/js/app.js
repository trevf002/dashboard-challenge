var bbData;
function init() {
  d3.json("../data/samples.json").then((data) => {
    bbData = data
    var names = data.names
    var selDataset = d3.select("#selDataset");
    names.forEach(n=>{
      selDataset.append("option").property("value", n).text(n)
    })
    buildCharts()
})
}
function buildCharts() {
  var selected = d3.select("#selDataset").property("value");
  var metadata = bbData.metadata.filter(obj => obj.id == selected)[0];
  var samples = bbData.samples.filter(obj => obj.id == selected)[0];
  var demo = d3.select("#sample-metadata")
  demo.html("")
  Object.entries(metadata).forEach(([key,value])=>{
    demo.append("p").html(`<b>${key}:</b> ${value}`)
  })
  var {otu_ids, sample_values, otu_labels} = samples
  var barData = [{
    x:sample_values.slice(0, 10).reverse(),
    y:otu_ids.slice(0, 10).reverse().map(x=>`ID ${x}`),
    text:otu_labels.slice(0, 10).reverse(),
    type: "bar",
    orientation: "h",
  }]
  var barLayout = {
    title: "Top Ten Bacteria",
    margin: { t: 30, l: 150 }
  } 
  var config = {
    responive: true
  }
  Plotly.newPlot("bar", barData, barLayout, config)
  var bubbleLayout = {
    title: "Bacteria Cultures Per Sample",
    margin: { t: 0 },
    hovermode: "closest",
    xaxis: { title: "OTU ID" },
    margin: { t: 30 }
  }
  var bubbleData = [
  {
    x: otu_ids,
    y: sample_values,
    text: otu_labels,
    mode: "markers",
    marker: {
      size: sample_values,
      color: otu_ids,
      colorscale: "Earth"
    }
  }  
  Plotly.newPlot ("bubble", bubbleData, bubbleLayout)
}
init()
