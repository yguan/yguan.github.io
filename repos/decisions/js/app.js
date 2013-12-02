define("view/gallery",["require","exports","module"],function(require,exports){var chartUrl={stockReturn:"/stock-return"};exports.name="GalleryCtrl",exports.controller=function($scope,$location,$document,$timeout){function getVizUrl(vizId){return chartUrl[vizId]}$scope.openVisualization=function(viz){var url=getVizUrl(viz.id);viz.isLoading=!0,$timeout(function(){$location.url(url)},100)},$scope.visualizations=[{id:"stockReturn",label:"Investment Return in S&P 500",isLoading:!1}]}}),define("chart/stock-return",["require","exports","module"],function(require,exports){function setBounds(chart,widthBound){chart.setBounds(70,20,widthBound,470)}function render(container,stockReturns){var yearAxis,sp500ReturnAxis,investmentAxis,data=stockReturns.data,barWidth=20,maxBars=data.length,maxWidthBound=barWidth*maxBars,svg=dimple.newSvg(container,maxWidthBound+160,550),chart=new dimple.chart(svg,data);setBounds(chart,maxWidthBound),yearAxis=chart.addCategoryAxis("x","Year"),yearAxis.tickFormat="g",sp500ReturnAxis=chart.addMeasureAxis("y","S&P 500 Annual Return"),sp500ReturnAxis.tickFormat="%",sp500ReturnAxis.overrideMin=-.4,sp500ReturnAxis.overrideMax=.4,chart.addSeries("Year",dimple.plot.bar,[yearAxis,sp500ReturnAxis]),investmentAxis=chart.addMeasureAxis("y","Investment"),investmentAxis.tickFormat="$,.0f",chart.addSeries(" ",dimple.plot.line,[yearAxis,investmentAxis]),chart.assignColor(" ","green"),chart.draw(),stockReturns.bind("change",function(){chart.data=stockReturns.data,setBounds(chart,chart.data.length*barWidth),chart.draw()})}exports.render=render}),define("data/sp500-annual-return",["require","exports","module"],function(require,exports){var data=[{Year:1970,AnnualReturn:.01},{Year:1971,AnnualReturn:10.79},{Year:1972,AnnualReturn:15.63},{Year:1973,AnnualReturn:-17.37},{Year:1974,AnnualReturn:-28.72},{Year:1975,AnnualReturn:31.55},{Year:1976,AnnualReturn:19.15},{Year:1977,AnnualReturn:-11.5},{Year:1978,AnnualReturn:1.06},{Year:1979,AnnualReturn:12.31},{Year:1980,AnnualReturn:25.77},{Year:1981,AnnualReturn:-9.73},{Year:1982,AnnualReturn:14.76},{Year:1983,AnnualReturn:17.26},{Year:1984,AnnualReturn:1.4},{Year:1985,AnnualReturn:26.36},{Year:1986,AnnualReturn:14.62},{Year:1987,AnnualReturn:2.03},{Year:1988,AnnualReturn:12.4},{Year:1989,AnnualReturn:27.25},{Year:1990,AnnualReturn:-6.56},{Year:1991,AnnualReturn:26.31},{Year:1992,AnnualReturn:4.46},{Year:1993,AnnualReturn:7.06},{Year:1994,AnnualReturn:-1.54},{Year:1995,AnnualReturn:34.11},{Year:1996,AnnualReturn:20.26},{Year:1997,AnnualReturn:31.01},{Year:1998,AnnualReturn:26.67},{Year:1999,AnnualReturn:19.53},{Year:2e3,AnnualReturn:-10.14},{Year:2001,AnnualReturn:-13.04},{Year:2002,AnnualReturn:-23.37},{Year:2003,AnnualReturn:26.38},{Year:2004,AnnualReturn:8.99},{Year:2005,AnnualReturn:3},{Year:2006,AnnualReturn:13.62},{Year:2007,AnnualReturn:3.55},{Year:2008,AnnualReturn:-38.47},{Year:2009,AnnualReturn:23.49},{Year:2010,AnnualReturn:12.64},{Year:2011,AnnualReturn:0},{Year:2012,AnnualReturn:13.29},{Year:2013,AnnualReturn:26.62}];exports.data=data}),define("data/stock-return-dw",["exports","data/sp500-annual-return"],function(exports,sp500AnnualReturn){function calculateInvestmentReturn(initialInvestment,percentChanged){return(100+percentChanged)/100*initialInvestment}function filterStockReturn(initialInvestment,startYear){var newData=from(sp500Data).where("$Year >= @",startYear).toArray();_.each(newData,function(value,index){var preIndex=index-1,investment=0>preIndex?initialInvestment:calculateInvestmentReturn(newData[preIndex].Investment,newData[preIndex].AnnualReturn);value.Investment=investment,value["S&P 500 Annual Return"]=value.AnnualReturn/100}),stockReturn.data=newData,stockReturn.trigger("change")}var sp500Data=sp500AnnualReturn.data,stockReturn={};MicroEvent.mixin(stockReturn),stockReturn.filterStockReturn=filterStockReturn,exports.stockReturn=stockReturn}),define("view/stock-return",["require","exports","module","chart/stock-return","data/stock-return-dw"],function(require,exports){var chart=require("chart/stock-return"),stockReturn=require("data/stock-return-dw").stockReturn;exports.name="StockReturnCtrl",exports.controller=function($scope,$location){function filterStockReturn(initialInvestment,startYear){stockReturn.filterStockReturn(initialInvestment,startYear),$scope.investmentReturn=stockReturn.data[stockReturn.data.length-1].Investment}function initChart(){var $chartContainer=$("#chart");0===$chartContainer.find("svg").length&&(filterStockReturn($scope.initialInvestment,$scope.startYear),chart.render("#chart",stockReturn))}$scope.getId=function(){return $location.search().id},$scope.back=function(){$location.url("/gallery")},$scope.initialInvestment=1e4,$scope.startYear=1970,initChart(),$scope.$watch("startYear",function(newVal){filterStockReturn($scope.initialInvestment,newVal)}),$scope.$watch("initialInvestment",function(newVal){filterStockReturn(newVal,$scope.startYear)})}}),define("view/all-views",["require","exports","module","view/gallery","view/stock-return"],function(require,exports){function registerController(app,controller){app.controller(controller.name,["$scope","$location","$document","$timeout","$modal",controller.controller])}function configViewRouting(app){app.config(function($routeProvider){$routeProvider.when("/gallery",{templateUrl:"js/view/partial/gallery.html",controller:gallery.name}).when("/stock-return",{templateUrl:"js/view/partial/stock-return.html",controller:stockReturn.name}).otherwise({redirectTo:"/gallery"})})}var gallery=require("view/gallery"),stockReturn=require("view/stock-return");exports.init=function(){angular.element(document).ready(function(){var app=angular.module("decision",["ngRoute","ngAnimate","$strap.directives"]);configViewRouting(app),registerController(app,gallery),registerController(app,stockReturn),angular.bootstrap(document,["decision"])})}}),require.config({baseUrl:"js",paths:{data:"./data",lib:"./lib",view:"./view",chart:"./chart",template:"./template",extension:"./extension"}}),require(["view/all-views"],function(views){views.init()}),define("app",function(){});