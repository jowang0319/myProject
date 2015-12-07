var fullwidth = 300,
	fullheight = 180;

// these are the margins around the graph. Axes labels go in margins.
var marginBar = {top: 20, right: 25, bottom: 20, left: 20};

var widthBar = fullwidth - marginBar.left - marginBar.right,
   	heightBar = fullheight - marginBar.top - marginBar.bottom;

var widthScale = d3.scale.linear()
					.range([0, widthBar]).domain([0,100]);

var heightScale = d3.scale.ordinal()
					.rangeRoundBands([ marginBar.top, heightBar], 0.2);


var barEducation = d3.select("#bar1")
			.append("svg")
			.attr("width", fullwidth)
			.attr("height", fullheight);

function draw_bar(dataFilter1){
// this is the size of the svg container -- the white part


console.log(dataFilter1);

	var xAxisBar = d3.svg.axis()
				.scale(widthScale)
				.ticks(1)
				.orient("bottom");

	var yAxisBar = d3.svg.axis()
				.scale(heightScale)
				.orient("left")
				.innerTickSize([0]);

	barEducation.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(" + marginBar.left + "," + heightBar + ")")
		.call(xAxisBar);

	barEducation.append("g")
		.attr("class", "y axis")
		.attr("transform", "translate(" + marginBar.left + ",0)")
		.call(yAxisBar);

	// Label below x axis
	barEducation.append("text")
		.attr("class", "xlabel")
        .attr("transform", "translate(" + (marginBar.left + widthBar / 2) + " ," +
        				(heightBar + marginBar.bottom) + ")")
        .style("text-anchor", "middle")
        .attr("dy", "12")
        .text("Percent");

    var rectsBar = barEducation.selectAll("rect")
					.data(dataFilter1, function(d) {return d.country;});

	/*rects
		.enter()
		.append("rect")
		.attr("x", marginBar.left)
		.attr("y", function(d,i){
			return i*40
		})
		.attr("width",0)
		.attr("height",20)
		.attr("id",function(d){
			return d.country;
		});*/

     update_bars(dataFilter1);

} // end of draw_bar


function update_bars(data) {

	//console.log(data);

	heightScale.domain(data.map(function(d) { return d.country; } ));

	var rectsBar = barEducation.selectAll("rect")
					.data(data, function(d) {return d.country;});

	rectsBar
		.enter()
		.append("rect")
		.attr("x", marginBar.left)
		.attr("y", function(d,i){
			return i*60 + 25
		})
		.attr("width",0)
		.attr("height", 40)
		.attr("id",function(d){
			return d.country;
		});

	rectsBar
		.transition()
		.duration(1000)
		.attr("width", function(d) {
			return widthScale(+d.youthLiteracyRate);
		});
		/*.append("title")  
		.text(function(d) {
			return d.country + "youth literacy rate " + d.youthLiteracyRate + " per 100 person";
		});*/

	rectsBar
		.exit()
		.transition()
		.duration(1000)
		.attr("width",0)
		.attr("opacity",0)
		.remove();

	d3.selectAll("rect")
        .attr('fill',function(d){
            if (d.country === "World"){
               	return "blue";
       		} 
            else {
                return "orange";
            }})
        .attr("opacity",0.5);

	} // end update

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



        	// You could also use tick formatting to get a % sign on each axis tick



