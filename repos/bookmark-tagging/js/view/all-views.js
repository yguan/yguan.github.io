define(["require","exports","module","view/actions","view/add","view/rename-tag","view/show-tags","view/search","view/search-tab"],function(e,t,n){function f(e,t,n){e.controller(t,["$scope","$location",n])}function l(e){e.config(["$routeProvider",function(e){e.when("/add",{templateUrl:"js/view/add.html",controller:"AddCtrl"}).when("/search",{templateUrl:"js/view/search.html",controller:"SearchCtrl"}).when("/search-tab",{templateUrl:"js/view/search-tab.html",controller:"SearchTabCtrl"}).when("/rename-tag",{templateUrl:"js/view/rename-tag.html",controller:"RenameTagCtrl"}).when("/show-tags",{templateUrl:"js/view/show-tags.html",controller:"ShowTagsCtrl"}).when("/actions",{templateUrl:"js/view/actions.html",controller:"ActionsCtrl"}).otherwise({redirectTo:"/add"})}])}var r=e("view/actions"),i=e("view/add"),s=e("view/rename-tag"),o=e("view/show-tags"),u=e("view/search"),a=e("view/search-tab");t.init=function(){angular.element(document).ready(function(){var e=angular.module("bookmark",["ui.bootstrap","bootstrap-tagsinput","ngGrid","angularFileUpload","styling"]);l(e),f(e,r.name,r.controller),f(e,i.name,i.controller),f(e,s.name,s.controller),f(e,o.name,o.controller),f(e,u.name,u.controller),f(e,a.name,a.controller),angular.bootstrap(document,["bookmark"])})}});