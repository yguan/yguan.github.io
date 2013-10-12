/**
 * Created by .
 * User: yguan
 * Date: 3/6/12
 * Time: 2:14 PM
 * To change this template use File | Settings | File Templates.
 */
(function(){
	window.Graph = function () {

		// TODO: Replace recursion with stack
		function getOutflowEdges(nodesToFind, edges, outflowEdges, cycleNodeToAvoid, rootNode) {
			for (var i = 0, len = nodesToFind.length; i < len; i++)
			{
				var nodeToFind = nodesToFind[i];
				if (typeof edges[nodeToFind] !== 'undefined' && typeof outflowEdges[nodeToFind] === 'undefined') {
					var node,
						nodeEdges = edges[nodeToFind];
					delete nodeEdges[cycleNodeToAvoid];
					delete nodeEdges[rootNode];
					outflowEdges[nodeToFind] = nodeEdges;
					for (node in nodeEdges) {
						// Todo: call this method outside this for loop
						getOutflowEdges([node], edges, outflowEdges, nodeToFind, rootNode);
					}
				}
			}
		}

		// TODO: Replace recursion with stack
		function getInflowEdges(nodesToFind, edges, inflowEdges) {
			for (var i = 0, len = nodesToFind.length; i < len; i++)
			{
				var nodeToFind = nodesToFind[i],
					node;
				for (node in edges) {
					if (node !== nodeToFind && typeof edges[node] !== 'undefined' && typeof inflowEdges[node] === 'undefined') {
						var nodeEdges = edges[node],
							bottomNode;
						for (bottomNode in nodeEdges) {
							if (typeof nodeEdges[nodeToFind] !== 'undefined') {
								inflowEdges[node] = {};
								inflowEdges[node][nodeToFind] = nodeEdges[nodeToFind];
								getInflowEdges([node], edges, inflowEdges);
							}
						}
					}
				}
			}
		}

		this.getAllInflowEdges = function (node, edges) {
			var inflowEdges = {};
			getInflowEdges([node], edges, inflowEdges);
			if (inflowEdges[node] !== 'undefined') {
				// Kill the cycle
				delete inflowEdges[node];
			}
			return inflowEdges;
		};

		this.getAllOutflowEdges = function (node, edges) {
			var outflowEdges = {};
			getOutflowEdges([node], $.extend(true, {}, edges), outflowEdges, node, node);
			return outflowEdges;
		};
	};
})();