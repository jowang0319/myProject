
function draw_bar2(dataBar2){
// this is the size of the svg container -- the white part
var fullwidth = 1000,
	fullheight = 500;

// these are the margins around the graph. Axes labels go in margins.
var margin = {top: 20, right: 25, bottom: 20, left: 200};

var width = fullwidth - margin.left - margin.right,
   	height = fullheight - margin.top - margin.bottom;

var widthScale = d3.scale.linear()
					.range([0, width]);

var heightScale = d3.scale.ordinal()
					.rangeRoundBands([ margin.top, height], 0.2);

var xAxis = d3.svg.axis()
				.scale(widthScale)
				.orient("bottom");

var yAxis = d3.svg.axis()
				.scale(heightScale)
				.orient("left")
				.innerTickSize([0]);

var svg = d3.select("#bar2")
			.append("svg")
			.attr("width", fullwidth)
			.attr("height", fullheight);




	var data1 = []

	dataBar2.forEach(function(d){
		if(d.skilledAttendant != "_"){
			data1.push({
				country : d.country,
				skilledAttendant : d.skilledAttendant
			})
		}
	})


	data1.sort(function(a, b) {
		return d3.descending(+a.skilledAttendant, +b.skilledAttendant);
	});

	//console.log(data1)

	// in this case, i know it's out of 100 because it's percents.
	widthScale.domain([ 0, d3.max(data1, function(d) {
					return +d.skilledAttendant;
				}) ]);

	// js map: will make a new array out of all the d.name fields
	heightScale.domain(data1.map(function(d) { return d.country; } ));

	var rects = svg.selectAll("rect")
					.data(data1)
					.enter()
					.append("rect");

	rects.attr("x", margin.left)
		.attr("y", function(d){
			return heightScale(d.country)
		})
		.attr("width", function(d) {
			return widthScale(d.skilledAttendant);
		})
		.attr("height", heightScale.rangeBand())
		.attr("id",function(d){
			return d.country;
		})
		.append("title")  
		.text(function(d) {
			return d.country + "skilled attendance rate " + d.skilledAttendant + " per 100 person";
		});

	/*var labelBar = svg.selectAll("text")
            			.data(data)
          				.enter()
          				.append("text")
            			.attr("class", "avg");

    labelBar.attr("x", function (d) {
        		console.log("in text: " + d.country);
            		return (widthScale(d.youthLiteracyRate) + 10);
        	})
         	.attr("y", function (d, i) {
              	return i * 40 + 14;
            })
        	.text(function (d) {
                return d.country + " : " + d.youthLiteracyRate + "%";
            })
         	.attr("font-family", "sans-serif")
         	.attr("font-size", "11px")
       		.attr("fill", "#000000"); */

    d3.selectAll("rect")
        .attr('fill',function(d){
            if (d.country === "World"){
               	return "blue";
       		} else if(d.country === "Niger"){
                return "orange"
            }
            else {
                return "grey";
            }})
        .attr("opacity",0.5);

	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(" + margin.left + "," + height + ")")
		.call(xAxis);

	svg.append("g")
		.attr("class", "y axis")
		.attr("transform", "translate(" + margin.left + ",0)")
		.call(yAxis);

	// Label below x axis
	svg.append("text")
		.attr("class", "xlabel")
        .attr("transform", "translate(" + (margin.left + width / 2) + " ," +
        				(height + margin.bottom) + ")")
        .style("text-anchor", "middle")
        .attr("dy", "12")
        .text("Percent");

        	// You could also use tick formatting to get a % sign on each axis tick


}//end of draw bars


