d3.selectAll("path.countries").on("click",function(){
	console.log(this);
})

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
		draw_bar(dataBar1);
		draw_bar2(dataBar2);
	}
}

queue()
  .defer(d3.csv, "data/data2.csv")
  .defer(d3.csv,"data/skilledAttendant.csv")
  .await(display);