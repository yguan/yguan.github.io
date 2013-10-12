define(["require","exports","module","data/bookmark-repository","data/tag-group-repository","view/tab"],function(e,t,n){var r=e("data/bookmark-repository"),i=e("data/tag-group-repository"),s=e("view/tab"),o=function(){var e='<div class="ngCellText"><a href ng-click="searchWithTags({tags})">{{{tags}}}</a></div>';return e.replace(/{tags}/g,"row.getProperty(col.field)")},u='<div class="ngCellText bookmark-count"><div class="left">{{row.getProperty(col.field)}}</div><div class="delete right" ng-hide="row.getProperty(col.field) > 0" ng-click="delete()" title="delete"></div></div>';t.name="ShowTagsCtrl",t.controller=function(e,t){var n=[];e.go=function(e){t.url(e)},e.searchWithTags=function(e){var n="/search?tags="+encodeURIComponent(e);t.url(n)},e.getTags=function(){return i.getAllTags()},e.keywords=[],e.gridData=[],e.gridOptions={data:"gridData",enableCellSelection:!1,enableRowSelection:!1,enableCellEditOnFocus:!1,enableColumnResize:!0,columnDefs:[{field:"bookmarkCount",displayName:"Bookmarks",width:90,cellTemplate:u},{field:"tagsStr",displayName:"Tags",cellTemplate:o()}],sortInfo:{fields:["tagsStr"],directions:["asc"]}},i.getAll({success:function(t){n=t,_.each(n,function(e){e.tagsStr=e.tags.join(", "),e.bookmarkCount=0});var i=_.mapToLookup(n,"id");r.each(function(e){i[e.tagGroupId].bookmarkCount++},{success:function(){e.gridData=n,e.$apply()},failure:console.log})}}),e.$watch("keywords",function(t,r){t.length&&t.length>0?e.gridData=_.filter(n,function(e){return _.in(t,e.tags)}):e.gridData=n},!0),e.delete=function(){var t=this.row.orig.entity.id;index=_.findIndex(e.gridData,function(e){return e.id===t}),i.remove(t),e.gridData.splice(index,1)}}});