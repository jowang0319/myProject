var svgLegend = d3.select("#legends").append("svg").attr("width","100%").attr("height",20);

function drawLegend(dataLegend){
	var legendBar = svgLegend.selectAll("circle")
					.data(dataLegend);

	legendBar
		.enter()
		.append("circle")
		.attr("cx",function(d,i){return i*120+5})
		.attr("cy",5)
		.attr("r",5)
		.attr("class","legendBar")
		.attr("fill",function(d){
			if (d === "World"){
				return "blue";
			} else{
				return "orange"
			}
		});

	var legendText = svgLegend.selectAll("text")
		.data(dataLegend)
		.enter()
		.append("text")
		.attr("class","legendText");

	legendText
		.attr("x", function(d,i){return i*120 + 15})
		.attr("y",8)
		.text(function(d){
			return d;
		})
		.attr("font-family", "sans-serif")
        .attr("font-size", "11px")
       	.attr("fill", "#000000");

    legendText
    	.transition()
    	.duration(200)
    	.text(function(d){return d;});
}


