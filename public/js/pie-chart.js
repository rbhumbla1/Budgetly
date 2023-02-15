
const getData = async () => {
    const response = await fetch('/api/budgets', {
        method: 'GET',
    });

    if (response.ok) {
        let data = await response.json();
        
        var svg = d3.select("svg"),
            width = svg.attr("width"),
            height = svg.attr("height"),
            radius = 200;


        var g = svg.append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        var ordScale = d3.scaleOrdinal()
            .domain(data)
            .range(['#ffd384', '#94ebcd', '#fbaccc', '#d3e0ea', '#fa7f72']);

        var pie = d3.pie().value(function (d) {
            return d.amount;
        });

        var arc = g.selectAll("arc")
            .data(pie(data))
            .enter();

        var path = d3.arc()
            .outerRadius(radius)
            .innerRadius(0);

        arc.append("path")
            .attr("d", path)
            .attr("fill", function (d) { return ordScale(d.data.category_name); });

        var label = d3.arc()
            .outerRadius(radius)
            .innerRadius(0);

        arc.append("text")
            .attr("transform", function (d) {
                return "translate(" + label.centroid(d) + ")";
            })
            .attr("dy", "0em")
            .text(function (d) { return d.data.category_name })
            .style("text-anchor", "middle")
            .style("font-family", "arial")
            .style("font-size", 15)

        arc.append("text")
            .attr("transform", function (d) {
                return "translate(" + label.centroid(d) + ")";
            })
            .attr("dy", "1em")
            .text(function (d) { return ' $' + d.data.amount})
            .style("text-anchor", "middle")
            .style("font-family", "arial")
            .style("font-size", 15) 
        
        


    } else {
        console.log("get failed");
    }


}

getData();

