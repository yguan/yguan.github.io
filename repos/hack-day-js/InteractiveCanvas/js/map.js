/*jslint evil: true, undef: true, browser: true, nomen: true */
/*globals $, jQuery, goog, hackday, Tool */

goog.provide('hackday.interactiveCanvas.map');

goog.require('paper');

/**
 * Created by .
 * User: yguan
 * Date: 4/17/12
 * Time: 4:01 PM
 * To change this template use File | Settings | File Templates.
 */

(function () {
	/**
	 * Generate a map on canvas
	 * @constructor
	 * @param {object} config
	 *		{string} canvasId The Id of the canvas to draw upon
	 *		{object} origin The origin position of the map { x: number, y: number }
	 *		{number} mapScale The scale of the map
	 *		{string} regionColor The color of map region
	 *		{string} borderColor The color of region border
	 *		{string} delayMsPerRegion The time delay in millisecond before drawing a new region 
	 */
	hackday.interactiveCanvas.map = function (config) {

		this.init = function () {
			paper.install(window);
			var canvas = document.getElementById(config.canvasId);
			paper.setup(canvas);

			new Tool().onMouseDown = function (event) {
				event.item.selected = true;
			};
			return this;
		};

		/**
		 * Draw the map on canvas
		 * @param {array} mapData An array of path information for the map
		 */
		this.draw = function (mapData) {
			var Path = paper.Path,
				Point = paper.Point,
				origin = config.origin,
				mapScale = config.mapScale,
				delayMsPerRegion = config.delayMsPerRegion,
				featureIndex = 0,
				backGround = new Path(),
				i,
				len;

			backGround.fillColor = config.backGroundColor;
			backGround.add(new Point(0, 1000));
			backGround.add(new Point(0, 0));
			backGround.add(new Point(1500, 0));
			backGround.add(new Point(1500, 1000));
			backGround.closed = true;

			for (i = 0, len = mapData.features.length; i < len; i += 1) {
				setTimeout(function () {
					drawRegion(mapData.features[featureIndex], origin, mapScale);
					featureIndex += 1;
				}, delayMsPerRegion * i);
			}
		};

		function drawRegion(feature, origin, mapScale) {
			var isMultiPolygon = feature.geometry.type === "MultiPolygon",
				coordinates,
				coordinate,
				path,
				x,
				y,
				i,
				len,
				j,
				lenJ;

			for (i = 0, len = feature.geometry.coordinates.length; i < len; i += 1) {
				path = new Path();
				path.strokeColor = config.borderColor;
				path.fillColor = config.regionColor;
				path.name = feature.properties.name;

				if (isMultiPolygon) {
					coordinates = feature.geometry.coordinates[i][0];
				} else {
					coordinates = feature.geometry.coordinates[i];
				}
				for (j = 0, lenJ = coordinates.length; j < lenJ; j += 1) {
					coordinate = coordinates[j];
					x = origin.x + coordinate[0];
					y = origin.y - coordinate[1];

					path.add(new Point(x * mapScale, y * mapScale));
				}
				path.closed = false;
				paper.view.draw();
			}
		}
	};
}());
