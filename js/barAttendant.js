var barAttendant = d3.select("#bar2")
			.append("svg")
			.attr("width", fullwidth)
			.attr("height", fullheight);

function draw_bar2(dataFilter2){
	console.log(dataFilter2);
// this is the size of the svg container -- the white part
/*var fullwidth = 1000,
	fullheight = 500;

// these are the margins around the graph. Axes labels go in margins.
var margin = {top: 20, right: 25, bottom: 20, left: 200};

var width = fullwidth - margin.left - margin.right,
   	height = fullheight - margin.top - margin.bottom;

var widthScale = d3.scale.linear()
					.range([0, width]);

var heightScale = d3.scale.ordinal()
					.rangeRoundBands([ margin.top, height], 0.2);*/

	var xAxisBar = d3.svg.axis()
				.scale(widthScale)
				.ticks(1)
				.orient("bottom");

	var yAxisBar = d3.svg.axis()
				.scale(heightScale)
				.orient("left")
				.innerTickSize([0])
				.outerTickSize([0]);

	/*var svg = d3.select("#bar2")
			.append("svg")
			.attr("width", fullwidth)
			.attr("height", fullheight);*/


	/*barAttendant.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(" + marginBar.left + "," + heightBar + ")")
		.call(xAxisBar);

	barAttendant.append("g")
		.attr("class", "y axis")
		.attr("transform", "translate(" + marginBar.left + ",0)")
		.call(yAxisBar);*/

	// Label below x axis
	/*barAttendant.append("text")
		.attr("class", "xlabel")
        .attr("transform", "translate(" + (marginBar.left + widthBar / 2) + " ," +
        				(heightBar + marginBar.bottom) + ")")
        .style("text-anchor", "middle")
        .attr("dy", "12")
        .text("Percent");*/

    var rectsBar2 = barAttendant.selectAll("rect")
					.data(dataFilter2,function(d){return d.country;});

	/*data1.sort(function(a, b) {
		return d3.descending(+a.skilledAttendant, +b.skilledAttendant);
	});*/

	//console.log(data1)

	// in this case, i know it's out of 100 because it's percents.
	/*widthScale.domain([ 0, d3.max(data1, function(d) {
					return +d.skilledAttendant;
				}) ]);*/

	// js map: will make a new array out of all the d.name fields
	/*heightScale.domain(data1.map(function(d) { return d.country; } ));*/

	update_bars2(dataFilter2);

}; // End of draw

function update_bars2(data){

	heightScale.domain(data.map(function(d) { return d.country; } ));

	console.log(data);

	var dataNew = []

	data.forEach(function(d){
		if(d.skilledAttendant != "_"){
			dataNew.push({
				country : d.country,
				skilledAttendant : +d.skilledAttendant
			})
		}
	})

	/*var data1 = []

	data.forEach(function(d){
		if(d.skilledAttendant != "_"){
			data1.push({
				country : d.country,
				skilledAttendant : d.skilledAttendant
			})
		}
	})*/

	var rectsBar2 = barAttendant.selectAll("rect")
					.data(dataNew,function(d){return d.country;});

	rectsBar2
		.enter()
		.append("rect")
		.attr("x", marginBar.left)
		.attr("width",0)
		.attr("height", 20)
		.attr("id",function(d){
			return d.country;
		});

	rectsBar2
		.transition()
		.duration(1000)
		.attr("y", function(d,i){
      		//return i*30 + 25
      		return heightScale(d.country);
    	})
		.attr("width", function(d) {
			return widthScale(+d.skilledAttendant);
		});

	rectsBar2
		.exit()
		.transition()
		.duration(1000)
		.attr("width",0)
		.attr("opacity",0)
		.remove();

	var labelBar2 = barAttendant.selectAll("text")
            			.data(dataNew,function(d){return d.country});

    labelBar2
        .enter()
        .append("text")
        .attr("class", "avg");

    labelBar2
    		.transition()
    		.duration(1000)
    		.attr("x", function (d) {
        		console.log("in text: " + d.country);
            		return marginBar.left + 5;
        	})
         	.attr("y", function(d, i) {
          		return heightScale(d.country) + 13;  // location of label
        	})
        	.text(function (d) {
        		if (d.skilledAttendant === 0){
        			return "No data";
        		}else
        		if(d.skilledAttendant!== 0){
                return d.country + ": " + Math.round(d.skilledAttendant*100)/100 + "%";
            }})
         	.attr("font-family", "sans-serif")
         	.attr("font-size", "11px")
       		.attr("fill", "#000000");

    labelBar2
    	.exit()
    	.transition()
    	.duration(1000)
    	.attr("opacity",0)
    	.remove();

	/*rects.attr("x", marginBar.left)
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
		});*/

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
               	return "#333399";
       		} 
            else {
                return "orange";
            }})
        .attr("opacity",0.5);

        	// You could also use tick formatting to get a % sign on each axis tick


}//end of update bars


