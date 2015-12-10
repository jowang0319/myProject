
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

var vis = d3.select("#vis");

//var noFocus = d3.select("#round");

function focus_country(country) {
  console.log("in focus", country);
  // unfocus all, then focus one if given a name.
    d3.selectAll(".dots").classed("focused", false);
    d3.selectAll(".dots").classed("unfocused", false);
    if (country) {
        var country = country.replace(/\s/g, '_');
        d3.selectAll(".dots").classed("unfocused",true);
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
  
  var country = null;
  var localdata = getData(data);
  colorFunction = colorsNone;
  //var showScatter = "none";
  var opacity = 0;
  var show_vis = true;
  //var region = null;
  switch(value) {
    case 0:
      show_vis = false;
      //showScatter = "inline-block";
      console.log("in case",value,country);
      localdata = getData(data);
      country = null;
      yValue = "Under Five Mortality Rate";
      colorFunction = colorsNone;
    case 1:
      //showScatter = "inline-block";
      console.log("in case",value,country);
      //console.log(colorFunction);
      localdata = getData(data);
      country = null;
      yValue = "Under Five Mortality Rate";
      colorFunction = colorsNone;
    case 2:
      //showScatter = "inline-block";
      console.log("in case",value,country);
      localdata = getData(data);
      country = "Afghanistan";
      yValue = "Under Five Mortality Rate";
      colorFunction = colorsNone;
      //region: null;
      break;
    case 3:
      //showScatter = "inline-block";
      console.log("in case",country);
      //yScale = d3.scale.sqrt().range([margin.top, height - margin.bottom]);
      localdata = getData(data);
      country = "Angola";
      yValue = "Under Five Mortality Rate";
      colorFunction = colorsNone;
      //region = "Sub-Saharan Africa"
      break;
    case 4:
      //showScatter = "inline-block";
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
    case 5:
      //showScatter = "inline-block";
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
    case 6:
      //showScatter = "inline-block";
      console.log("in case", value);
      localdata = getData(data);
      console.log(localdata);
      country = null;
      yValue = "Under Five Mortality Rate";
      colorFunction = colors;
      //region: null;
      break;
    case 7:
      //showScatter = "inline-block";
      country = null;
      console.log("in case ", value);
      localdata = getData2(data);
      console.log(localdata);
      yValue = "Adolescent Fertility Rate";
      colorFunction = colors;
      //region: null;
      break;
    case 8:
      country = null;
      console.log("in case ", value);
      localdata = getData2(data);
      console.log(localdata);
      yValue = "Adolescent Fertility Rate";
      colorFunction = colors;
      show_vis = false;
      break;
    default:
      //showScatter = "none";
      //opacity = 0;
      colorFunction = colorsNone;
      country = null;
      show_vis = true;
      yValue = "Under Five Mortality Rate";
      //focus_country(country);
      colorFunction = colorsNone;
      //draw_circles(getData(data));
      //region: null;
      break;
  }
  console.log("show viz and country", show_vis, country, value);
  if (show_vis) {
    vis.style("display", "inline-block");
  } else {
    vis.style("display", "none");
  }
  draw_circles(localdata/*,showScatter*/); // we can update the data if we want in the cases.
  if (value > 1) {
   focus_country(country); // this applies a highlight on a country.
 } else {
  focus_country(null);
 }
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
    scroll.update(update);

    var oldScroll = 4500;
    $(window).scroll(function (event) {
      var scroll = $(window).scrollTop();
      //console.log("scroll", scroll);
      if (scroll >= 7900 && scroll > oldScroll) {
          vis.style("display", "none");
       } else if (scroll >= 7900 && scroll < 8100 && scroll < oldScroll-1 ) {
        vis.style("display", "inline-block"); // going backwards, turn it on.
       }
      oldScroll = scroll;
    });
  }
}

queue()
  .defer(d3.csv, "data/data.csv")
  .await(display);

