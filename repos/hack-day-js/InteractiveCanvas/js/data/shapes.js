/*jslint evil: true, undef: true, browser: true, nomen: true */
/*globals $, jQuery, goog, hackday */

goog.provide('hackday.interactiveCanvas.data.shapes');

/**
 * Created by .
 * User: yguan
 * Date: 4/18/12
 * Time: 9:07 AM
 * To change this template use File | Settings | File Templates.
 */
(function () {
	/**
	 * Data for generating different shapes with paper.js
	 */
	hackday.interactiveCanvas.data.shapes = [
		{
			path: {
				strokeColor: 'red',
				strokeWidth: 1,
				isClosed: true,
				isSmooth: false,
				points: [
					{ x: 30, y: 75 },
					{ x: 30, y: 25 },
					{ x: 80, y: 25 },
					{ x: 80, y: 75 }
				]
			}
		},
		{
			path: {
				strokeColor: 'blue',
				strokeWidth: 1,
				isClosed: true,
				isSmooth: true,
				points: [
					{ x: 130, y: 75 },
					{ x: 130, y: 25 },
					{ x: 180, y: 25 },
					{ x: 180, y: 75 }
				]
			}
		},
		{
			path: {
				fillColor: 'cyan',
				isClosed: true,
				isSmooth: false,
				points: [
					{ x: 200, y: 90 },
					{ x: 240, y: 40 },
					{ x: 280, y: 90 }
				]
			}
		},
		{
			path: {
				strokeColor: 'gray',
				strokeWidth: 1,
				isClosed: true,
				isSmooth: false,
				points: [
					{ x: 5, y: 600},
					{ x: 5, y: 150 },
					{ x: 400, y: 150 },
					{ x: 400, y: 600 }
				]
			}
		},
		{
			path: {
				strokeColor: 'green',
				strokeWidth: 1,
				isClosed: false,
				isSmooth: false,
				points: [
					{ x: 10, y: 300 },
					{ x: 80, y: 400 },
					{ x: 150, y: 500 },
					{ x: 180, y: 200 },
					{ x: 200, y: 320 },
					{ x: 300, y: 200 }
				]
			}
		}
	];
}());