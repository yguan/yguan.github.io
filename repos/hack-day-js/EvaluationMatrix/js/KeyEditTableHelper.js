/*jslint evil: true, undef: true, browser: true */
/*globals $, jQuery, goog, hackday */

goog.provide('hackday.KeyEditTableHelper');

/**
 * Created by Yong Guan.
 * User: yguan
 * Date: 2/7/12
 * Time: 10:47 AM
 */
(function () {
	/**
	* Make the table support key navigation and inline edit
	* @param {object} config
	* {
	*	tableId {string} - the table's Id
	*	dataTable {DataTable object} - the table to change
	*	afterCellUpdate {function} - the function to call after the cell is updated
	* }
	*/
	hackday.KeyEditTableHelper = function (config) {
		this.makeTableEditable = function () {
			var keyTable = new KeyTable({
				"table": document.getElementById(config.tableId),
				"datatable": config.dataTable
			});

			/* Apply a return key event to each cell in the table */
			keyTable.event.action(null, null, function (nCell) {
				/* Block KeyTable from performing any events while jEditable is in edit mode */
				keyTable.block = true;

				/* Initialise the Editable instance for this table */
				$(nCell).editable(function (sVal) {
					/* Submit function (local only) - unblock KeyTable */
					var aPos = config.dataTable.fnGetPosition(this),
						rowIndex = aPos[0],
						columnIndex =  aPos[1];
					config.dataTable.fnUpdate(sVal, rowIndex, columnIndex);
					config.afterCellUpdate(rowIndex, columnIndex);
					keyTable.block = false;
				}, {
					"onblur": 'submit',
					"onreset": function () {
						/* Unblock KeyTable, but only after this 'esc' key event has finished. Otherwise
						 * it will 'esc' KeyTable as well
						 */
						setTimeout(function () { keyTable.block = false; }, 0);
					}
				});

				/* Dispatch click event to go into edit mode - Saf 4 needs a timeout... */
				setTimeout(function () { $(nCell).click(); }, 0);
			});
		};

		this.highlightRowAndColumnOnMouseOver = function () {
			config.dataTable.$('td').hover(function () {
				var iCol = $('td', this.parentNode).index(this) % 5;
				$('td:nth-child(' + (iCol + 1) + ')', config.dataTable.$('tr')).addClass('highlighted');
			}, function () {
				config.dataTable.$('td.highlighted').removeClass('highlighted');
			});
		};
	};
}());
