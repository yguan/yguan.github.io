/*jslint evil: true, undef: true, browser: true, nomen: true */
/*globals $, jQuery, goog, hackday */

goog.provide('hackday.EvaluationMatrix');

goog.require('hackday.KeyEditTableHelper');

/**
 * Created by Yong Guan.
 * Date: 2/7/12
 * Time: 10:47 AM
 */
(function () {
	hackday.EvaluationMatrix = function () {
		var _tableId = 'matrixTable',
			_matrixTable,
			_rawTableHtml = '<table id="matrixTable"><\/table>';

		function destroy() {
			if (_matrixTable) {
				_matrixTable.fnDestroy(true);
				_matrixTable = null;
			}
		}

		/**
		 * Create the column definitions for constructing the DataTable
		 * @param {array} an array of column data
		 * [
		 *		data {object} {
		 *		name {string} name of the column
		 *		maxScore {int} max score of the column
		 * ]
		 * @return {array} an array of column definitions
		 */
		function createDataTableColumns(columns) {
			var columnDefs = [],
				totalMax = 0,
				i,
				len;

			columnDefs.push({
				"sTitle": 'Option',
				'sClass': 'left'
				//'bSortable': false
				//'sWidth': 100
			});
			for (i = 0, len = columns.length; i < len; i += 1) {
				columnDefs.push({
					"sTitle": columns[i].name
				});
				columnDefs.push({
					"sTitle": 'Max(' + columns[i].maxScore + ')',
					'sClass': 'center',
					'sWidth': 100
				});
				totalMax += parseInt(columns[i].maxScore, 10);
			}

			columnDefs.push({
				"sTitle": 'Total (max: ' + totalMax + ')',
				'sClass': 'center',
				'sWidth': 140
			});

			columnDefs.push({
				"sTitle": 'Percent',
				'sClass': 'center',
				'sWidth': 100
			});
			return columnDefs;
		}

		function bindButtonEvents(dataTable, columnData) {
			$('#addMatrixRowBtn').click(function () {
				var data = [],
					i,
					len;
				data.push(''); // option column
				for (i = 0, len = columnData.length * 2; i < len; i += 1) {
					data.push('');
				}
				data.push('0'); // the total column
				data.push(''); // the total percentage column
				dataTable.fnAddData(data);
			});

			$('#removeMatrixRowBtn').click(function () {
				var anSelected = dataTable.$('tr.focus');
				dataTable.fnDeleteRow(anSelected[0]);
			});

			$('#saveMatrixBtn').click(function () {

			});
		}

		function updateTotal(rowIndex, columnData) {
			var totalColumnIndex = columnData.length * 2 + 1,
				percentColumnIndex = totalColumnIndex + 1,
				total = 0,
				maxTotal = 0,
				rowData = _matrixTable.fnGetData(rowIndex),
				i,
				len,
				j,
				dLen;

			for (i = 2, len = rowData.length - 2; i < len; i = i + 2) {
				if (rowData[i].length > 0) {
					total += parseInt(rowData[i], 10);
				}
			}

			for (j = 0, dLen = columnData.length; j < dLen; j += 1) {
				maxTotal += parseInt(columnData[j].maxScore, 10);
			}

			_matrixTable.fnUpdate(total, rowIndex, totalColumnIndex);
			_matrixTable.fnUpdate(Math.floor(total / maxTotal * 100) + '%', rowIndex, percentColumnIndex);
		}

		this.load = function (columnData) {
			destroy();
			$('.matrixContainer').html(_rawTableHtml);

			var totalColumnIndex = columnData.length * 2 + 1;
			_matrixTable = $('#' + _tableId).dataTable({
				'bPaginate': false,
				'bInfo': false,
				'aoColumns': createDataTableColumns(columnData),
				"aaSorting": [[ totalColumnIndex, "desc" ]],
/*
				// only works when hosted with server
				"sDom": 'T<"clear">lfrtip',
				"oTableTools": {
					"aButtons": [
						"copy",
						"csv",
						"xls",
						{
							"sExtends": "pdf",
							"sPdfOrientation": "landscape"
						},
						"print"
					]
				}
*/
				"sDom": 'C<"clear">lfrtip',
				"oColVis": {
					"activate": "mouseover"
				}
			});

			new hackday.KeyEditTableHelper({
				tableId: _tableId,
				dataTable: _matrixTable,
				afterCellUpdate: function (rowIndex, columnIndex) {
					updateTotal(rowIndex, columnData);
				}
			}).makeTableEditable();

			bindButtonEvents(_matrixTable, columnData);
		};
	};
}());
