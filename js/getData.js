var selectedCountry = null;
var dataFilter1 = [];
var dataFilter2 = [];

function onClick(d){
	//console.log(d.id);
	selectedCountry = d.id;
	console.log(selectedCountry);
	d3.selectAll("g.lines")
		.each(function(d){
		//console.log(d);
		if (d.country === "World"){
			d3.select(this).select("path.line").classed("focused1", true);
			d3.select(this).select("text").attr("opacity",1);
		}
		else if (d.countryCode === selectedCountry){
			d3.select(this).select("path.line").classed("focused2", true);
			d3.select(this).select("text").attr("opacity",1);
		}
		else{
			d3.select(this).select("path.line").classed("focused2",false).classed("unfocused", true);
			d3.select(this).select("text").attr("opacity",0);
		}
	});
	/*d3.selectAll("text.labelOnline")
		.each(function(d){
			console.log(d);
		})*/
	dataFilter1 = dataBar1.filter(function(d){
		return d.ISO3 === selectedCountry || d.country === "World"
	});
	console.log(dataFilter1);
	update_bars(dataFilter1);
};

	

var dataBar1 = [];
var dataBar2 = [];

function display (error,barData,barData2){
	if (error){
		console.log(error);
	} else{
		//console.log(barData);
		//console.log(barData2);
		dataBar1 = barData;
		dataBar2 = barData2;
		draw_bar(dataFilter1);
		draw_bar2(dataBar2);
	}
}



queue()
  .defer(d3.csv, "data/data2.csv")
  .defer(d3.csv,"data/skilledAttendant.csv")
  .await(display);