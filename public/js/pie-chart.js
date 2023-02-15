// // Step 3
// // var svg = d3.select("svg");
// let displayPie = document.querySelector(".chart-inputs");
// // let width = svg.getAttribute("width");
// // let height = svg.getAttribute("height");
// // let radius = 200;
// // var chartData = [];

fetch('/api/budgets', {
  method: 'GET',
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
     var svg = d3.select("svg"),
     width = svg.attr("width"),
     height = svg.attr("height"),
     radius = 150;

 var g = svg.append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

 // Step 4
 var ordScale = d3.scaleOrdinal()
                     .domain(data.budgets)
                     .range(['#ffd384','#94ebcd','#fbaccc','#d3e0ea','#fa7f72']);

 // Step 5
 var pie = d3.pie().value(function(d) { 
         return d.amount; 
     });

 var arc = g.selectAll("arc")
            .data(pie(data.budgets))
            .enter();

 // Step 6
 var path = d3.arc()
              .outerRadius(radius)
              .innerRadius(0);

 arc.append("path")
    .attr("d", path)
    .attr("fill", function(d) { return ordScale(d.data.amount); });

 // Step 7
 var label = d3.arc()
               .outerRadius(radius)
               .innerRadius(0);
     
 arc.append("text")
    .attr("transform", function(d) { 
             return "translate(" + label.centroid(d) + ")"; 
     })
    .text(function(d) { return d.data.category_id; })
    .style("font-family", "arial")
    .style("font-size", 15);
     
  });
