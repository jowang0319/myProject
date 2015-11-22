function draw_map(){
	var width = 1200,
	height = 800;

	var svg = d3.select('#map').append('svg')
			.attr('width',width)
			.attr('height',height);

	var projection = d3.geo.mercator()
		.scale(140)
		.translate([width/2-160,height/2+20]);

	var path = d3.geo.path()
		.projection(projection);

	var colors = d3.scale.linear().range(["#e0cfdd","#954586"])
				.interpolate(d3.interpolateLab);

	var countryById = d3.map();

	queue()
		.defer(d3.json,"js/countries.json")
		.defer(d3.csv,'data/data.csv',typeAndSet)
		.await(loaded);

	var myTooltip = d3.select("body")
    				.append("div")
    				.attr("class", "myTooltip");

	function typeAndSet(d){
		d.rate = +d["2015"]
		d.country = d["Country Name"];
		d.code = d["Country Code"];
		countryById.set(d.code,d);
		return d;
	}

	function getColor(d){
		var dataRow = countryById.get(d.id);
		if (dataRow){
			console.log(dataRow);
			return colors(dataRow.rate);
		} else {
			console.log("no dataRow", d);
			return "#ccc";
		}
	}

	function getText(d){
		var dataRow = countryById.get(d.id);
		if (dataRow){
			console.log(dataRow);
			return "<strong>" + dataRow.country + "</strong></br> Under 5 Mortality Rate: " + dataRow.rate + "‰";
		} else {
			console.log("no dataRow",d);
			return d.properties.name + ": no data"; 
		}
	}

	function loaded(error,world,region){
		console.log(world);
		console.log(region);

		colors.domain(d3.extent(region, function(d){return d.rate;}))

		var countries = topojson.feature(world,world.objects.units).features;

		svg.selectAll("path.countries")
			.data(countries)
			.enter()
			.append("path")
			.attr("class","countries")
			.attr("id", function (d,i){return d.id;})
			.attr('d',path)
			.attr('fill',function(d,i){
				console.log(d.properties.name);
				return getColor(d);
			})
			//.append("title")
			//.text(function(d){
			//	return getText(d);
			//});

	var linear = colors;

	svg.append("g")
		.attr("class","legendLinear")
		.attr("transform","translate(0,20)");

	var legendLinear = d3.legend.color()
		.shapeWidth(30)
		.orient('horizontal')
		.scale(linear);

	svg.select(".legendLinear")
		.call(legendLinear);

	/*$('svg path').tipsy({
		gravity: 'nw',
		fade: true,
		html: true, 
		title: function() { 
			console.log(getText(this.__data__));
			var name = getText(this.__data__)
			return name;
		 }
	});*/

	svg.selectAll("path.countries")
    	.on("mouseover", mouseoverFunc)
        .on("mousemove", mousemoveFunc)
        .on("mouseout", mouseoutFunc);

	function mouseoverFunc(d){
		console.log("moused over",getText(d));
		myTooltip
			.style("display",null)
			.html("<p>" + getText(d) + "</p>");
	}

	function mousemoveFunc(d) {
        myTooltip
            .style("top", (d3.event.pageY - 5) + "px")
            .style("left", (d3.event.pageX + 10) + "px");
    }

    function mouseoutFunc(d) {
        return myTooltip.style("display", "none"); 
    }

	}; 

} //end of draw map function

draw_map();
      