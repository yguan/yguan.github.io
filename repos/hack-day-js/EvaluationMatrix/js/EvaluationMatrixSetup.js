/*jslint evil: true, undef: true, browser: true */
/*globals $, jQuery, goog, hackday, KeyTableModule */

goog.provide('hackday.EvaluationMatrixSetup');

goog.require('KeyTableModule');
goog.require('hackday.EvaluationMatrix');
goog.require('hackday.EvaluationMatrix.ConfigurationComponent');
goog.require('jquery.collapsible');

/**
 * Created by Yong Guan.
 * Date: 2/7/12
 * Time: 10:47 AM
 */
(function () {
	hackday.EvaluationMatrixSetup = function () {
		function createCollapsible() {
			$('.collapsible').collapsible({
				defaultOpen: 'section1,section2'
			});
		}
		this.init = function () {
			$(document).ready(function () {
				createCollapsible();
				var evaluationMatrix = new hackday.EvaluationMatrix();
				new hackday.EvaluationMatrix.ConfigurationComponent({ onSave: evaluationMatrix.load }).init();
			});
		};
	};
}());
