
//normal settings
var width = 700;
var height = 600;
var margin = {top:20,right:10,bottom:50,left:50};

var colors = d3.scale.category10();
var dotRadius = 6; 

var xScale = d3.scale.linear()
	.range([ margin.left, width - margin.right - margin.left ]);

var yScale = d3.scale.linear()
	.range([ height - margin.bottom, margin.top ]);

var xAxis = d3.svg.axis()
	.scale(xScale)
	.orient("bottom")
	.ticks(5);  

var yAxis = d3.svg.axis()
	.scale(yScale)
	.orient("left")
	.ticks(5);

var svg = d3.select("#vis")
	.append("svg")
	.attr("width", width)
	.attr("height", height);

 var drawylabel = svg
    .append('text')
    .attr("transform", "rotate(-90)")
    .attr("x", -margin.top)
    .attr("y", -margin.left +103 )
    .attr("dy", "1em")
    .style("text-anchor", "end")
    .attr("class", "label");

drawylabel.transition().duration(1000)

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + (height - margin.bottom) + ")")
    .call(xAxis)
    .append("text")
    .attr("x", width - margin.left - margin.right/2)
    .attr("y", -15)
    .attr("dy", "1em")
    .style("text-anchor", "end")
    .attr("class", "label")
    .text("Female Youth Literacy Rate");

svg.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + margin.left + ",0)")
    .call(yAxis)
    /*.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -margin.top)
    .attr("y", -2*margin.left / 3)
    .attr("dy", "1em")
    .style("text-anchor", "end")
    .attr("class", "label")
    .text(label);*/


function draw_circles(data){
	//console.log(data);

	xScale.domain([
		d3.min(data,function(d){
			return d.x;
		}) - 4,
		d3.max(data,function(d){
			return d.x;
		}) 
	]);

	yScale.domain([
		d3.min(data,function(d){
			return + d.y;
		}) - 7,
		d3.max(data,function(d){
			return + d.y;
		}) +2
	]);

	var circles = svg.selectAll("circle")
		.data(data,function(d){return d.country;})

	circles
		.enter()
		/*.append("g")
		.attr("id",function(d){
			return d.Region;
		})*/
		.append("circle")
		.attr("r", 0)
		.attr("opacity",0)
		.attr("id",function(d){
				return d.country;
			})
		.attr("class","dots")
		.attr("fill",function(d){
			return colors(d.Region);
		})
				

			
	circles.transition().duration(1000).attr("cx", function(d) {
				return xScale(+d.x);
			})
			.attr("cy", function(d) {
				return yScale(+d.y);
			})
			.attr("r",dotRadius)
			.attr("opacity",0.8);
	circles.exit().transition().duration(1000).attr("r",0).attr("opacity",0).remove();

	svg.select('.x.axis').transition().duration(1000).call(xAxis);
	svg.select('.y.axis').transition().duration(1000).call(yAxis);


}

function getData(data){
  data.forEach(function(d){
    d.x = +d.youthLiteracyRate;
    d.y = +d.under5Mortality;
    //d.region = d.Region.replace(/\s/g, '_')
  })
  //console.log(data);
  return data;
}

function getData2(data){
  data.forEach(function(d){
    d.x = +d.youthLiteracyRate;
    d.y = +d.adolescentFertilityRate;
  })
  //console.log(data);
  return data;
}























