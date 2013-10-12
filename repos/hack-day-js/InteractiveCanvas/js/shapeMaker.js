/*jslint evil: true, undef: true, browser: true, nomen: true */
/*globals $, jQuery, goog, hackday */

goog.provide('hackday.interactiveCanvas.shapeMaker');

goog.require('paper');

/**
 * Created by Yong Guan
 * Date: 4/17/12
 * Time: 4:01 PM
 */

(function () {
	/**
	 * Generate shapes on canvas
	 * @constructor
	 * @param {object} config
	 *		{string} canvasId The Id of the canvas to draw upon
	 *		{string} canvasId The Id of the canvas to draw upon
	 */
	hackday.interactiveCanvas.shapeMaker = function (config) {

		this.init = function () {
			var canvas = document.getElementById(config.canvasId);
			paper.setup(canvas);
			return this;
		};

		/**
		 * Draw shapes on canvas
		 * @param {array} shapes An array of path information for the shapes
		 */
		this.draw = function (shapes) {
			var Path = paper.Path,
				Point = paper.Point,
				showPoint = false,
				i,
				len,
				pathData,
				path,
				j,
				lenJ;

			for (i = 0, len = shapes.length; i < len; i += 1) {
				pathData = shapes[i].path;
				path = new Path();
				path.strokeColor = pathData.strokeColor;
				path.strokeWidth = pathData.strokeWidth;
				path.fillColor = pathData.fillColor;
				path.closed = pathData.isClosed;
				path.fullySelected = showPoint;

				for (j = 0, lenJ = pathData.points.length; j < lenJ; j += 1) {
					path.add(new Point(pathData.points[j].x, pathData.points[j].y));
				}

				if (pathData.isSmooth) {
					path.smooth();
				}
			}

			//	path.resize = true;
			paper.view.draw();
		};
	};

}());