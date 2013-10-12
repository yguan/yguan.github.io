/*jslint evil: true, undef: true, browser: true */
/*globals $, jQuery, goog, hackday */

goog.provide('hackday.EvaluationMatrix.ConfigurationComponent');

/**
 * Created by Yong Guan.
 * Date: 2/7/12
 * Time: 10:47 AM
 */
(function () {

	/**
	 * UI component for setting up the matrix columns
	 * @param {object} config
	 * {
	 *	onSave {function} - event to be trigger when the save button is click
	 * }
	 */
	hackday.EvaluationMatrix.ConfigurationComponent = function (config) {
		function bindButtonEvents(dataTable) {
			$('#addRowBtn').click(function () {
				dataTable.fnAddData(['', '5']);
			});

			$('#removeRowBtn').click(function () {
				var anSelected = dataTable.$('tr.focus');
				dataTable.fnDeleteRow(anSelected[0]);
			});

			$('#saveBtn').click(function () {
				var tableData = dataTable.fnGetData(),
					columns = [],
					column = {},
					i,
					len;
				for (i = 0, len = tableData.length; i < len; i += 1) {
					column.name = tableData[i][0];
					column.maxScore = tableData[i][1];
					columns.push(column);
				}
				config.onSave(columns);
			});
		}

		function createColumnListTable() {
			var columnTable = $('#columnTable').dataTable({
				"bPaginate": false,
				"bInfo": false,
				"bSort": false,
				"aoColumns": [
					{ "sTitle": "Criterion" },
					{
						"sTitle": "Max Score",
						"sClass": "center",
						"sWidth": 150
					}
				]
			});

			new hackday.KeyEditTableHelper({
				tableId: 'columnTable',
				dataTable: columnTable,
				afterCellUpdate: function () {}
			}).makeTableEditable();

			bindButtonEvents(columnTable);
		}

		this.init = function () {
			$(document).ready(function () {
				createColumnListTable();
			});
		};
	};
}());
