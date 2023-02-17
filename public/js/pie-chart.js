//We used the d3 api to create a pie chart to show the distribution of budget goals
//Reference: We used the example code given here as our starter code: 
//https://www.educative.io/answers/how-to-create-a-pie-chart-using-d3

const getData = async () => {
    const response = await fetch('/api/budgets', {
        method: 'GET',
    });

    if (response.ok) {
        let data = await response.json();

        //create a pie chart
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

        //use data from fetch call as data source
        var arc = g.selectAll("arc")
            .data(pie(data))
            .enter();

        var path = d3.arc()
            .outerRadius(radius)
            .innerRadius(0);

        //the pie slices are based on budget category
        arc.append("path")
            .attr("d", path)
            .attr("fill", function (d) { return ordScale(d.data.category_name); });

        var label = d3.arc()
            .outerRadius(radius)
            .innerRadius(0);

        //add budget category name to the display for a slice
        arc.append("text")
            .attr("transform", function (d) {
                return "translate(" + label.centroid(d) + ")";
            })
            .attr("dy", "0em")
            .text(function (d) { return d.data.category_name })
            .style("text-anchor", "middle")
            .style("font-family", "arial")
            .style("font-size", 15)

        //Also add the budget goal amount in display of the slice
        arc.append("text")
            .attr("transform", function (d) {
                return "translate(" + label.centroid(d) + ")";
            })
            .attr("dy", "1em")
            .text(function (d) { return ' $' + d.data.amount })
            .style("text-anchor", "middle")
            .style("font-family", "arial")
            .style("font-size", 15)


    } else {
        console.log("get failed")
    }

}

getData();
