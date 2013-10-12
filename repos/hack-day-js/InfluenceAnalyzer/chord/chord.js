// I changed this file

/**
 * A class for generating chord diagram
 * @constructor
 * @param {object} config
 *      id				- The diagram holder's DOM id
 *      matrix			- square matrix
 *		valuePerTick	- the value per tick on the circle
 *		valuefunction	- calculate the value with valuePerTick
 *		tickUnitLabel	- the unit label for a tick
 *		arcLabels		- An array of labels for the circle segments, must have the same length as the matrix
 *		arcLabelWidth	- The width of a circle segment label
 *		pathColors		- An array of colors for the circle segments, must have the same length as the matrix
 *		width			- Width of the diagram
 *		height			- Height of the diagram
 */
var ChordDiagram = function (config) {
	var _arcLabelPadding = 10 + config.arcLabelWidth;
	this.render = function () {
		var innerRadius = Math.min(config.width, config.height) * .35,
			outerRadius = innerRadius * 1.1;
		
		var chord = d3.layout.chord()
		  .padding(.05)
		  .sortSubgroups(d3.descending)
		  .matrix(config.matrix);

		var fill = d3.scale.ordinal()
			.domain(d3.range(config.matrix.length))
			.range(config.pathColors);

		var svg = d3.select("#" + config.id)
		  .append("svg")	// set the width and height of the chart div
			.attr("width", config.width)
			.attr("height", config.height)
		  .append("g")		// set the origin of the svg graph to the center of the chart div
			.attr("transform", "translate(" + config.width / 2 + "," + config.height / 2 + ")");

		// circle segments
		svg.append("g")
		  .selectAll("path")
			.data(chord.groups)
		  .enter().append("path")
			.style("fill", function(d) { return fill(d.index); })
			.style("stroke", function(d) { return fill(d.index); })
			.attr("d", d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius))
			.on("mouseover", fade(.05, svg))
			.on("mouseout", fade(1, svg));

		// ticks around the circle
		var ticks = svg.append("g")
		  .selectAll("g")
			.data(chord.groups)
		  .enter().append("g")
		  .selectAll("g")
			.data(groupTicks)
		  .enter().append("g")
			.attr("transform", function(d) {
			  return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
				  + "translate(" + outerRadius + ",0)";
			});

		ticks.append("line")
			.attr("x1", 1)
			.attr("y1", 0)
			.attr("x2", 5)
			.attr("y2", 0)
			.style("stroke", "#000");

		ticks.append("text")
			.attr("x", 8)
			.attr("dy", ".35em")
			.attr("text-anchor", function(d) {
			  return d.angle > Math.PI ? "end" : null;
			})
			.attr("transform", function(d) {
			  return d.angle > Math.PI ? "rotate(180)translate(-16)" : null;
			})
			.text(function(d) { return d.label; });

		// paths within circle
		svg.append("g")
			.attr("class", "chord")
		  .selectAll("path")
			.data(chord.chords)
		  .enter().append("path")
			.style("fill", function(d) { return fill(d.target.index); })
			.attr("d", d3.svg.chord().radius(innerRadius))
			.style("opacity", 1);
	};

	/** Returns an array of segment angles and labels, given a group. */
	function groupTicks(d) {
	  var k = (d.endAngle - d.startAngle) / d.value;
	  return d3.range(0, d.value, config.valuePerTick).map(function(v, i) {
		var label;
		if (i === 0) {
		  label = config.arcLabels[d.index];
		} else  {
		  label = v / config.valuePerTick + config.tickUnitLabel;
		}
		return {
			angle: v * k + d.startAngle,
			label: label
		};
	  });
	}

	/** Returns an event handler for fading a given chord group. */
	function fade(opacity, svg) {
	  return function(g, i) {
		svg.selectAll("g.chord path")
			.filter(function(d) {
			  return d.source.index != i && d.target.index != i;
			})
		  .transition()
			.style("opacity", opacity);
	  };
	}

	function getArcLabelX(d, radius) {
		var x = Math.round(Math.cos(180 / Math.PI * d.startAngle) * radius);
		if (x >= 0) {
			return x + _arcLabelPadding;
		}
		return x - _arcLabelPadding;
	}

	function getArcLabelY(d, radius) {
		var y = Math.round(Math.sin(180 / Math.PI * d.startAngle) * radius);
		return -y;
	}

	function getArcLabelTextAnchor(d) {
		if (Math.cos(180 / 3.14 * d.startAngle) > 0) {
			return "start";
		}
		return "end";
	}
};