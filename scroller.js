
// For use with scroller_template.html and mfreeman_scroller.js.

// function to move a selection to the front/top, from
// https://gist.github.com/trtg/3922684
d3.selection.prototype.moveToFront = function() {
  return this.each(function(){
    this.parentNode.appendChild(this);
  });
};

// Settings object

var settings = {
  // could be used to save settings for styling things.
}

var data = []; // make this global

function focus_country(country) {
  console.log("in focus", country);
  // unfocus all, then focus one if given a name.
    d3.selectAll("circle").classed("focused", false);
    d3.selectAll("circle").classed("unfocused", false);
    if (country) {
        var country = country.replace(/\s/g, '_');
        d3.selectAll("circle").classed("unfocused",true);
        var dots = d3.select("#" + country );
        dots.classed("unfocused",false).classed("focused", true);
        var dotsgroup = d3.select("#" + country);
        dots.moveToFront();
    }
}

/*function focus_region(region) {
  console.log("in focus", region);
  // unfocus all, then focus one if given a name.
    d3.selectAll("g").classed("focused", false);
    if (region) {
        var region = region
        var dots = d3.selectAll("#" + region);
        dots.classed("focused", true);
        var dotsgroup = d3.selectAll("#" + region);
        dots.moveToFront();
    }
}*/


function draw_label(yValue){  
  drawylabel.text(yValue);
}

// ******* Change the showX and showY function for some cases ********
var update = function(value) {
  var showScatter = "none";
  var country = null;
  var localdata = getData(data);
  colorFunction = colorsNone;
  //var region = null;
  switch(value) {
    case 1:
      showScatter = "inline-block";
      console.log("in case",value,country);
      localdata = getData(data);
      country = "Afghanistan";
      yValue = "Under Five Mortality Rate";
      colorFunction = colors;
      //region: null;
      
      break;
    case 2:
      showScatter = "inline-block";
      console.log("in case",country);
      //yScale = d3.scale.sqrt().range([margin.top, height - margin.bottom]);
      localdata = getData(data);
      country = "Angola";
      yValue = "Under Five Mortality Rate";
      colorFunction = colors;
      //region = "Sub-Saharan Africa"
      break;
    case 3:
      showScatter = "inline-block";
      console.log("in case",value,country,"10 lowest");
      country = null;
      localdata = getData(data).sort(function(a,b){
        return a.youthLiteracyRate - b.youthLiteracyRate;
      }).slice(0,10);
      console.log(localdata);
      yValue = "Under Five Mortality Rate";
      colorFunction = colors;
      //region: null;
      break;
    case 4:
      showScatter = "inline-block";
      console.log("in case",value,country,"10 hightest");
      country = null;
      localdata = getData(data).sort(function(a,b){
        return b.youthLiteracyRate - a.youthLiteracyRate;
      }).slice(0,10);
      console.log(localdata);
      yValue = "Under Five Mortality Rate";
      colorFunction = colors;
      //region: null;
      break;
    case 5:
      showScatter = "inline-block";
      console.log("in case", value);
      localdata = getData(data);
      console.log(localdata);
      yValue = "Under Five Mortality Rate";
      colorFunction = colors;
      //region: null;
      break;
    case 6:
      showScatter = "inline-block";
      console.log("in case ", value);
      localdata = getData2(data);
      console.log(localdata);
      yValue = "Adolescent Fertility Rate";
      colorFunction = colors;
      //region: null;
      break;
    default:
      showScatter = "none";
      colorFunction = colorsNone;
      country = null;
      yValue = "Under Five Mortality Rate";
      focus_country(country);
      colorFunction = colorsNone;
      //draw_circles(getData(data));
      //region: null;
      break;
  }
  draw_circles(localdata); // we can update the data if we want in the cases.
  focus_country(country); // this applies a highlight on a country.
  draw_label(yValue);
  //focus_region(region);
}
// setup scroll functionality


function display(error, mydata) {
  if (error) {
    console.log(error);
  } else {

    data = mydata; // assign to global; call func in line_chart_refactor.js

    console.log(data);

    var scroll = scroller()
      .container(d3.select('#graphic'));

    // pass in .step selection as the steps
    scroll(d3.selectAll('.step'));

    // Pass the update function to the scroll object
    scroll.update(update)
  }
}

queue()
  .defer(d3.csv, "data.csv")
  .await(display);

