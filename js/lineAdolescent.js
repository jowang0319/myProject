function draw_lineAdolescent(){
	

var widthLine = 350;
var heightLine = 300;

var marginLine = {top:20, right:0, bottom:40, left:45};

var dateFormat = d3.time.format("%Y");

var xScaleLine = d3.time.scale()
	.range([marginLine.left,widthLine-marginLine.left - marginLine.right]);
var yScaleLine = d3.scale.linear()
	.range([marginLine.top, heightLine- marginLine.bottom]);

var xAxisLine2 = d3.svg.axis()
	.scale(xScaleLine)
	.orient("bottom")
	.ticks(3)
	.tickFormat(function(d){
		return dateFormat(d);
	})
	.innerTickSize([0]);
var yAxisLine2 = d3.svg.axis()
	.scale(yScaleLine)
	.orient("left")
	.ticks(3)
	.innerTickSize([0]);

var line = d3.svg.line()
	.x(function(d){
		return xScaleLine(dateFormat.parse(d.year));
	})
	.y(function(d){
		return yScaleLine(+d.amount);
	});

/*var tooltip = d3.select("body")
	.append("div")
	.attr("class","tooltip");*/

var svgLine = d3.select("#line2")
	.append("svg")
	.attr("width",widthLine)
	.attr("height",heightLine);

d3.csv("adolescentFertility.csv",function(data){
	var years = ["1961", "1962", "1963", "1964", "1965", "1966", "1967", "1968", "1969", "1970", "1971", "1972", "1973", "1974", "1975", "1976", "1977", "1978", "1979", "1980", "1981", "1982", "1983", "1984", "1985", "1986", "1987", "1988", "1989", "1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010","2011","2012","2013","2014"]; 
var dataSet = [];

data.forEach(function(d,i){
	var fertilityRate = [];

	years.forEach(function(y){
		//console.log(d.country)
		if (d[y]){
			fertilityRate.push({
				year: y,
				amount:d[y],
				country: d.country
			});
		}
	});
	dataSet.push({
		country: d.country,
		rates: fertilityRate
	});

});

console.log(dataSet);

xScaleLine.domain(
	d3.extent(years,function(d){
		return dateFormat.parse(d);
}));
yScaleLine.domain([
	d3.max(dataSet,function(d){
		return d3.max(d.rates,function(d){
			return +d.amount;
		});
	}),
	0
]);

var groupsLine = svgLine.selectAll("g.lines")
	.data(dataSet)
	.enter()
	.append("g")
	.attr("class","lines")
	.attr("id",function(d){
		return d.country
	});

groupsLine.selectAll("path")
	.data(function(d){
		return [d.rates];
	})
	.enter()
	.append("path")
	.attr("class","line")
	.attr("d",line);

svgLine.append("g")
	.attr("class","x axis")
	.attr("transform","translate(0," + (heightLine - marginLine.bottom) + ")")
	.call(xAxisLine2);
svgLine.append("g")
	.attr("class","y axis")
	.attr("transform","translate(" + marginLine.left + ",0)")
	.call(yAxisLine2);

svgLine.append("text")      
    .attr("x", widthLine/2 )
    .attr("y", heightLine - 10 )
    .style("text-anchor", "middle")
    .attr("class","lineLabel")
    .text("Year");

svgLine.append("text")  
    .attr("y", 0 )    
    .attr("x", - heightLine/2)
    .attr("class","lineLabel")
    .style("text-anchor", "middle")
    .text("Adolescent Fertility Rate(per 1000 person)")
    .attr("transform", "rotate(-90)")
    .attr("dy", "1em");

/*d3.selectAll("g.lines")
	.attr("stroke", function(d) { 
		if (d.country === "World"){
			return "blue";
		} else if (d.country === "Niger"){
			return "orange";
		} else{
			return "grey"
		}
					})
	.attr("opacity",function(d){
		if (d.country === "World"){
			return "1";
		} else if (d.country === "Niger"){
			return "1";
		} else{
			return "0.1"
		}
	})*/

d3.selectAll("path.line")
	.attr("class",function(d){
		console.log(d);
		if (d.country == "World"){
			return "focused1";
		}
		else if (d.country == "Niger"){
			return "focused2"
		}
		else{
			return "unfocused"
		}
	});

groupsLine.append("text")
    .attr("transform", function(d){
        if (d.country === "Niger" || d.country === "World") {
            //console.log(d);
            return "translate(" + (widthLine - marginLine.right - marginLine.left + 5) + ", "+ yScaleLine(+d.rates[53].amount) +")";
                    	}

                    })
    .attr("dy",".35em")
    .text(function(d) { 
        if (d.country==="Niger" || d.country === "World") {
                    		return d.country;
                    	}
                    })
    .attr("class","highlightCountry");



/*d3.selectAll("g.lines")
	.on("mouseover",mouseoverFunc)
	.on("mouseout",mouseoutFunc)
	.on("mousemove",mousemoveFunc);*/

});// end of csv


/*
function mouseoverFunc(d) {
					d3.selectAll("path.line").classed("unfocused", true);
					d3.select(this).select("path.line").classed("unfocused", false).classed("focused", true);
					tooltip
						.style("display", null) 
						.html("<p>Country: " + d.country + "</br>Region: " + d.region +  "</p>");
			}

			function mouseoutFunc() {
					d3.selectAll("path.line").classed("unfocused", false).classed("focused", false);
					tooltip.style("display", "none"); 
			}
			
			function mousemoveFunc(d) {
					tooltip
						.style("top", (d3.event.pageY - 10) + "px" )
						.style("left", (d3.event.pageX + 10) + "px");
	}
*/






}
// end of function draw line

draw_lineAdolescent();