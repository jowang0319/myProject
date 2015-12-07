
function draw_lineU5MR(){

var widthLine = 300;
var heightLine = 280;

var marginLine = {top:20, right:0, bottom:40, left:45};

var dateFormat = d3.time.format("%Y");

var xScaleLine = d3.time.scale()
	.range([marginLine.left,widthLine-marginLine.left - marginLine.right]);
var yScaleLine = d3.scale.linear()
	.range([marginLine.top, heightLine- marginLine.bottom]);

var xAxisLine = d3.svg.axis()
	.scale(xScaleLine)
	.orient("bottom")
	.ticks(3)
	.tickFormat(function(d){
		return dateFormat(d);
	})
	.innerTickSize([0]);
var yAxisLine = d3.svg.axis()
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

var svgLine = d3.select("#line")
	.append("svg")
	.attr("width",widthLine)
	.attr("height",heightLine);

d3.csv("data/U5MR.csv",function(data){
	var years = ["1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010","2011","2012","2013","2014","2015"]; 

var dataSet = [];

data.forEach(function(d,i){
	var mortality = [];

	years.forEach(function(y){
		if (d[y]){
			mortality.push({
				year: y,
				amount:d[y],
				countryCode: d.countryCode
			});
		}
	});
	dataSet.push({
		country: d.country,
		rates: mortality,
		countryCode: d.countryCode
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

var groups = svgLine.selectAll("g.lines")
	.data(dataSet)
	.enter()
	.append("g")
	.attr("class","lines");

groups.selectAll("path")
	.data(function(d){
		return [d.rates];
	})
	.enter()
	.append("path")
	.attr("class","line")
	.attr("d",line)
	.attr("id",function(d){
		return d.countryCode;
	});

d3.selectAll("path.line").classed("unfocused",true);

svgLine.append("g")
	.attr("class","x axis")
	.attr("transform","translate(0," + (heightLine - marginLine.bottom) + ")")
	.call(xAxisLine);
svgLine.append("g")
	.attr("class","y axis")
	.attr("transform","translate(" + marginLine.left + ",0)")
	.call(yAxisLine);

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
    .text("Under Five Mortality Rate(per 1000 person)")
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

/*groups.append("text")
    .attr("transform", function(d){
        if (d.country === "Niger" || d.country === "World") {
            console.log(d);
            return "translate(" + (width - margin.right - margin.left + 5) + ", "+ yScale(+d.rates[25].amount) +")";
                    	}

                    })
    .attr("dy",".35em")
    .text(function(d) { 
        if (d.country==="Niger" || d.country === "World") {
                    		return d.country;
                    	}
                    })
    .attr("class","highlightCountry");*/

groups.append("text")
    .attr("transform", function(d){
        if (d.rates[25]) {
            //console.log(d);
            return "translate(" + (widthLine - marginLine.right - marginLine.left + 2) + ", "+ yScaleLine(+d.rates[25].amount) +")";
                    	}

                    })
    .attr("dy",".35em")
    .text(function(d) { 
        if (d.rates[25]) {
                    		return d.country;
                    	}
                    })
    .attr("class","labelOnLine")
    .attr("opacity",0);



/*d3.selectAll("g.lines")
	.on("mouseover",mouseoverFunc)
	.on("mouseout",mouseoutFunc)
	.on("mousemove",mousemoveFunc);*/

});
}//end of draw line function

draw_lineU5MR();