var start_val = 72.5432,
    start_val2 = 1990,
    duration = 2000,
    end_val = [31.8350]
    end_val2 = [2015];

var qSVG = d3.select("#number").append("svg").attr("width","100%").attr("height","100%");

qSVG.selectAll("#txt2")
    .data(end_val2)
    .enter()
    .append("text")
    .text(start_val2)
    .attr("class", "count")
    .attr("id","txt2")
    .attr("x", "45%")
    .attr("y", "100%")
    .transition()
    .duration(5000)
        .tween("text", function(d) {
            var i = d3.interpolate(this.textContent, d),
                prec = (d + "").split("."),
                round = (prec.length > 1) ? Math.pow(10, prec[1].length) : 1;

            return function(t) {
                this.textContent = Math.round(i(t) * round) / round;
            };
        });

var qSVG = d3.select("#number").append("svg").attr("width","100%").attr("height","100%");

qSVG.selectAll("#txt")
    .data(end_val)
    .enter()
    .append("text")
    .text(start_val)
    .attr("class", "count")
    .attr("id","txt")
    .attr("x", "45%")
    .attr("y", "70%")
    .transition()
    .duration(5000)
        .tween("text", function(d) {
            var i = d3.interpolate(this.textContent, d),
                prec = (d + "").split("."),
                round = (prec.length > 1) ? Math.pow(10, prec[1].length) : 1;

            return function(t) {
                this.textContent = Math.round(i(t) * round) / round;
            };
        });

function draw_round(){
    var roundWidth = "50%";
    //var qSVG = d3.select("#number").append("svg").attr("width",200).attr("height",200);
    var svgContainer = d3.select("#number").append("svg")
                        .attr("width", "100%")
                        .attr("height", "100%");

    var round = svgContainer.append("circle")
                        .attr("id","round")
                        .attr("cx", "50%")
                        .attr("cy", "50%")
                        .attr("r", start_val);




}

draw_round();