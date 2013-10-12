/*jslint evil: true, undef: true, browser: true, nomen: true */
/*globals $, jQuery, goog, hackday */

goog.provide('hackday.CircularMenu.HowllowPie');

/**
 * Created by Yong Guan
 * Date: 9/18/12
 */
 
(function () {
	/**
	 * Class to create a pie chart with a hole in the center
	 *	@param {object} config
	 *		@param {number} svgWidth
	 *		@param {number} outerRadius
	 *		@param {number} innerRadius the center hole
	 *		@param {number} strokeWidth
	 *		@param {number} startAngle clockwise start from y axis 3.14
	 *		@param {number} endAngle 6.28
	 *		@param {string} pieContainer container selector
	 *		@param {array} data
	 */
	hackday.CircularMenu.HowllowPie = function (config) {

		this.animate = function() {
			paths
				.transition()
				.duration(tweenDuration)
				.attrTween("d", pieTween);
			paths.exit().remove();

			lines.transition()
				.duration(tweenDuration)
				.attr("transform", function(d) {
				return "rotate(" + (d.startAngle + d.endAngle) / 2 * (180 / Math.PI) + ")";
			});
			lines.exit().remove();

			valueLabels.transition().duration(tweenDuration).attrTween("transform", textTween);
			valueLabels.exit().remove();

			nameLabels.transition().duration(tweenDuration).attrTween("transform", textTween);
			nameLabels.exit().remove();
		};

		this.render = function (data) {
			drawLayout();
			drawArcPaths();
			drawPercentageLabels();
			drawNameLabels();
			drawTickMarkLines();
		}

		var outerRadius = config.outerRadius,
			innerRadius = config.innerRadius,
			width = config.svgWidth,
			height = width,
			centerPosition = {
				x: width / 2,
				y: width / 2
			};

		var textOffset = 14;
		var tweenDuration = 250; // todo: what is it?

		//OBJECTS TO BE POPULATED WITH DATA LATER
		var lines, valueLabels, nameLabels, paths;

		//D3 helper function to create colors from an ordinal scale
		var color = d3.scale.category20();

		//D3 helper function to populate pie slice parameters from array data
		var donut = d3.layout.pie()
			.value(function(d) {
				return d.octetTotalCount;
			})
			.startAngle(config.startAngle)
			.endAngle(config.endAngle);

		var data = config.data,
			pieData = [],
			oldPieData = [],
			filteredPieData = [];

		pieData = donut(data);

		var totalOctets = 0;
		filteredPieData = pieData.filter(filterData);
		function filterData(element, index, array) {
			element.id = data[index].id;
			element.name = data[index].name;
			element.value = data[index].octetTotalCount;
			totalOctets += element.value;
			return (element.value > 0);
		}

		var arc,
			arc_group,
			svg,
			label_group,
			center_group;

		function drawLayout() {
			//D3 helper function to draw arcs, populates parameter "d" in path object
			arc = d3.svg.arc()
				.startAngle(function(d) {
					return d.startAngle;
				})
				.endAngle(function(d) {
					return d.endAngle;
				})
				.innerRadius(innerRadius)
				.outerRadius(outerRadius);

			///////////////////////////////////////////////////////////
			// CREATE VIS & GROUPS ////////////////////////////////////
			///////////////////////////////////////////////////////////

			svg = d3.select(config.pieContainer).append("svg:svg")
				.attr("width", width)
				.attr("height", height);

			//GROUP FOR ARCS/PATHS
			arc_group = svg.append("svg:g")
				.attr("class", "arc")
				.attr("transform", "translate(" + centerPosition.x + "," + centerPosition.y + ")");

			//GROUP FOR LABELS
			label_group = svg.append("svg:g")
				.attr("class", "label_group")
				.attr("transform", "translate(" + centerPosition.x + "," + centerPosition.y + ")");

			//GROUP FOR CENTER TEXT
			center_group = svg.append("svg:g")
				.attr("class", "center_group")
				.attr("transform", "translate(" + centerPosition.x + "," + centerPosition.y + ")");

			///////////////////////////////////////////////////////////
			// Center Circle
			///////////////////////////////////////////////////////////

			//WHITE CIRCLE BEHIND LABELS
			var whiteCircle = center_group.append("svg:circle")
				.attr("fill", "white")
				.attr("r", innerRadius);

			var smallCenterCircle = center_group.append("svg:circle")
				.attr("stroke", "green")
				.attr("stroke-width", 2)
				.attr("fill", "white")
				.attr("r", innerRadius / 2);
		}

		function drawArcPaths() {
			paths = arc_group.selectAll("path").data(filteredPieData);
			paths.enter().append("svg:path")
				.attr("class", "slice")
				.attr("stroke", "white")
				.attr("stroke-width", config.strokeWidth)
				.attr("fill", function(d, i) {
					return color(i);
				})
				.attr("id", function(d, i) {
					return d.id;
				})
				.transition()
				.duration(tweenDuration)
				.attrTween("d", pieTween);
			paths
				.transition()
				.duration(tweenDuration)
				.attrTween("d", pieTween);
			paths.exit()
				.transition()
				.duration(tweenDuration)
				.attrTween("d", removePieTween)
				.remove();


		}

		function drawTickMarkLines() {
			lines = label_group.selectAll("line").data(filteredPieData);
			lines.enter().append("svg:line")
				.attr("x1", 0)
				.attr("x2", 0)
				.attr("y1", -outerRadius - 3)
				.attr("y2", -outerRadius - 8)
				.attr("stroke", "gray")
				.attr("transform", function(d) {
				return "rotate(" + (d.startAngle + d.endAngle) / 2 * (180 / Math.PI) + ")";
			});
			lines.transition()
				.duration(tweenDuration)
				.attr("transform", function(d) {
				return "rotate(" + (d.startAngle + d.endAngle) / 2 * (180 / Math.PI) + ")";
			});
			lines.exit().remove();
		}

		function drawPercentageLabels() {
			valueLabels = label_group.selectAll("text.value").data(filteredPieData)
			.attr("dy", function(d) {
				if ((d.startAngle + d.endAngle) / 2 > Math.PI / 2 && (d.startAngle + d.endAngle) / 2 < Math.PI * 1.5) {
					return 5;
				} else {
					return -7;
				}
			})
			.attr("text-anchor", function(d) {
				if ((d.startAngle + d.endAngle) / 2 < Math.PI) {
					return "beginning";
				} else {
					return "end";
				}
			})
			.text(function(d) {
				var percentage = (d.value / totalOctets) * 100;
				return percentage.toFixed(1) + "%";
			});

			valueLabels.enter().append("svg:text")
				.attr("class", "value")
				.attr("transform", function(d) {
				return "translate(" + Math.cos(((d.startAngle + d.endAngle - Math.PI) / 2)) * (outerRadius + textOffset) + "," + Math.sin((d.startAngle + d.endAngle - Math.PI) / 2) * (outerRadius + textOffset) + ")";
			})
			.attr("dy", function(d) {
				if ((d.startAngle + d.endAngle) / 2 > Math.PI / 2 && (d.startAngle + d.endAngle) / 2 < Math.PI * 1.5) {
					return 5;
				} else {
					return -7;
				}
			})
			.attr("text-anchor",
				function(d) {
					if ((d.startAngle + d.endAngle) / 2 < Math.PI) {
						return "beginning";
					} else {
						return "end";
					}
				}).text(function(d) {
				var percentage = (d.value / totalOctets) * 100;
				return percentage.toFixed(1) + "%";
			});
		}

		function drawNameLabels() {
			nameLabels = label_group.selectAll("text.units").data(filteredPieData)
				.attr("dy", function(d) {
				if ((d.startAngle + d.endAngle) / 2 > Math.PI / 2 && (d.startAngle + d.endAngle) / 2 < Math.PI * 1.5) {
					return 17;
				} else {
					return 5;
				}
			})
			.attr("text-anchor",
				function(d) {
					if ((d.startAngle + d.endAngle) / 2 < Math.PI) {
						return "beginning";
					} else {
						return "end";
					}
				}).text(function(d) {
				return d.name;
			});

			nameLabels.enter().append("svg:text")
				.attr("class", "units")
				.attr("transform", function(d) {
				return "translate(" + Math.cos(((d.startAngle + d.endAngle - Math.PI) / 2)) * (outerRadius + textOffset) + "," + Math.sin((d.startAngle + d.endAngle - Math.PI) / 2) * (outerRadius + textOffset) + ")";
			})
			.attr("dy", function(d) {
				if ((d.startAngle + d.endAngle) / 2 > Math.PI / 2 && (d.startAngle + d.endAngle) / 2 < Math.PI * 1.5) {
					return 17;
				} else {
					return 5;
				}
			})
			.attr("text-anchor",
				function(d) {
					if ((d.startAngle + d.endAngle) / 2 < Math.PI) {
						return "beginning";
					} else {
						return "end";
					}
				}).text(function(d) {
				return d.name;
			});
		}

		// Interpolate the arcs in data space.
		function pieTween(d, i) {
			var s0;
			var e0;
			if (oldPieData[i]) {
				s0 = oldPieData[i].startAngle;
				e0 = oldPieData[i].endAngle;
			} else if (!(oldPieData[i]) && oldPieData[i - 1]) {
				s0 = oldPieData[i - 1].endAngle;
				e0 = oldPieData[i - 1].endAngle;
			} else if (!(oldPieData[i - 1]) && oldPieData.length > 0) {
				s0 = oldPieData[oldPieData.length - 1].endAngle;
				e0 = oldPieData[oldPieData.length - 1].endAngle;
			} else {
				s0 = 0;
				e0 = 0;
			}
			var i = d3.interpolate({startAngle: s0, endAngle: e0}, {startAngle: d.startAngle, endAngle: d.endAngle});
			return function(t) {
				var b = i(t);
				return arc(b);
			};
		}

		function removePieTween(d, i) {
			s0 = 2 * Math.PI;
			e0 = 2 * Math.PI;
			var i = d3.interpolate({startAngle: d.startAngle, endAngle: d.endAngle}, {startAngle: s0, endAngle: e0});
			return function(t) {
				var b = i(t);
				return arc(b);
			};
		}

		function textTween(d, i) {
			var a;
			if (oldPieData[i]) {
				a = (oldPieData[i].startAngle + oldPieData[i].endAngle - Math.PI) / 2;
			} else if (!(oldPieData[i]) && oldPieData[i - 1]) {
				a = (oldPieData[i - 1].startAngle + oldPieData[i - 1].endAngle - Math.PI) / 2;
			} else if (!(oldPieData[i - 1]) && oldPieData.length > 0) {
				a = (oldPieData[oldPieData.length - 1].startAngle + oldPieData[oldPieData.length - 1].endAngle - Math.PI) / 2;
			} else {
				a = 0;
			}
			var b = (d.startAngle + d.endAngle - Math.PI) / 2;

			var fn = d3.interpolateNumber(a, b);
			return function(t) {
				var val = fn(t);
				return "translate(" + Math.cos(val) * (outerRadius + textOffset) + "," + Math.sin(val) * (outerRadius + textOffset) + ")";
			};
		}
	};
}());
