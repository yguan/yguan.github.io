/*jslint evil: true, undef: true, browser: true, nomen: true */
/*globals $, jQuery, goog, hackday */

goog.provide('hackday.CircularMenuDemo');

goog.require('hackday.CircularMenu.HowllowPie');
goog.require('hackday.CircularMenu.data.pie');
goog.require('hackday.CircularMenu.data.smallPie');

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
	hackday.CircularMenuDemo = function () {

		var _$pieChartContainer,
			_outerRadius = 120,
			_diameter = _outerRadius * 2,
			_svgWidth = _diameter + 200,
			_pieChart,
			_smallPieSvgWidth = 160,
			_smallPieOuterRadius = 30,
			_smallPieContainer = $('<div></div>').attr('id', 'smallPie').css('z-index', 100).appendTo('body');

		$(document).click(function (e) {
			if (_$pieChartContainer) {
				if (_$pieChartContainer.is(':visible')) {
					_$pieChartContainer.hide();
				} else {
					showPieChart(e);
					_pieChart.animate();
				}
			} else {
				createPieChartContainer();
				_pieChart = createPieChart();
				_pieChart.render();

				_$pieChartContainer.find('.slice').hover(function (e) {
					_smallPieContainer.css({
						position: 'absolute',
						left: e.pageX +240 + 'px',
						top: e.pageY - 100 + 'px'
					}).show();
					showSmallPie();
				}, function (e) {
					_smallPieContainer.empty();
				});
				
				showPieChart(e);
			}
		});

		function showPieChart(e) {
			_$pieChartContainer.css({
				position: 'absolute',
				left: e.pageX - _svgWidth/2 + 'px',
				top: e.pageY - _svgWidth/2 + 'px'
			}).show();
		}

		function createPieChartContainer() {
			_$pieChartContainer = $('<div></div>')
			.attr('id', 'easy-as-pie-chart')
			.hide()
			.offset({top: 0, left: 0})
			.width(_svgWidth)
			.height(_svgWidth)
			.appendTo('body');

		}

		function showSmallPie() {
			var smallPie = new hackday.CircularMenu.HowllowPie({
				data: hackday.CircularMenu.data.smallPie,
				svgWidth: _smallPieSvgWidth,
				outerRadius: _smallPieOuterRadius,
				innerRadius: 10,
				startAngle: 0,
				endAngle: 6.28,
				strokeWidth: 3,
				pieContainer: '#smallPie'
			});
			smallPie.render();
		}
		
		function createPieChart() {
			return new hackday.CircularMenu.HowllowPie({
				data: hackday.CircularMenu.data.pie,
				svgWidth: _svgWidth,
				outerRadius: _outerRadius,
				innerRadius: 45,

				//left arc
	//			startAngle: 3.34,
	//			endAngle: 6.08,

				// right arc
				startAngle: 0.8,
				endAngle: 2.12,

	//			startAngle: 0,
	//			endAngle: 6.28,

				strokeWidth: 3,
				pieContainer: '#easy-as-pie-chart'
			});
		}
	};
}());
