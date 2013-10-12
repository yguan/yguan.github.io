/*        GraphToChord                                            */
/*Copyright 2010 Daptiv Solutions LLC.  All rights reserved. */
/*jslint bitwise: false, browser: true, css: true, debug: false, eqeqeq: true, es5: false, evil: false, forin: false, fragment: true,
 laxbreak: true, passfail: false, immed: true, nomen: false, newcap: false, onevar: false, plusplus: false, strict: false,
 white: true */
/*global $, jQuery, eProject, $resources, window, Daptiv */

(function () {
	/**
	 * This is what I do...
	 * @constructor
	 */
	window.GraphToChord = function (network) {
		var _nodeNames = [],
			_nodeColors = [],
			_directConnectionMatrix,
			_nameColorLabels = [];

		function parseWeightToInt(weight) {
			if (weight === null) {
				return 0;
			}
			return parseInt(weight);
		}

		function createArrayWithZeroValue(length) {
			var array = [];
			for (var i = 0; i < length; i++) {
				array.push(0);
			}
			return array;
		}
		
		this.init = function () {
			var nodeName,
				color;
			for (nodeName in network.nodes) {
				_nodeNames.push(nodeName);
				color = network.nodes[nodeName].color;
				_nodeColors.push(color);

				_nameColorLabels.push('<div><span class="colorblock" style="background-color:' + color + '"></span>' + nodeName + '</div>');
			}

			var length = _nodeNames.length;
			_directConnectionMatrix = new Array(length);
			
			for (var i = 0; i < length; i++) {
				var row = createArrayWithZeroValue(_nodeNames.length),
					edges = network.edges[_nodeNames[i]];
				if (typeof edges !== 'undefined') {
					for (var j = 0; j < length; j++) {
						var edge = edges[_nodeNames[j]];
						row[j] = parseWeightToInt(edge && edge.edgeWeight ? edge.edgeWeight : null);
					}
				}
				_directConnectionMatrix[i] = row;
			}
		};
		
		this.arcLabels = function () {
			return _nodeNames;
		};
		
		this.pathColors = function () {
			return _nodeColors;
		};

		this.directConnectionMatrix = function () {
			return _directConnectionMatrix;
		};

		this.getNameColorLabelsHtml = function () {
			return _nameColorLabels.join('');
		};

		this.init();
	};
}());
