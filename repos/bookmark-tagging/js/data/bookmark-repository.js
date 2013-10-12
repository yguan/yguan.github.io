define(["require","exports","module","data/idb","data/tag-group-repository"],function(e,t,n){var r=e("data/idb"),i=e("data/tag-group-repository"),s="bookmark";n.exports={create:function(e,t,n){var r=this;t?i.add(t,{success:function(t){e.tagGroupId=t.id,r.add(e,n)},failure:n.failure}):r.add(e,n)},add:function(e,t){var n=this;e.tags?i.add(e.tags,{success:function(n){e.tagGroupId=n.id,delete e.tags,r.add(s,e,"url",t)},failure:t.failure}):r.add(s,e,"url",t)},addAll:function(e,t){function o(){r<i?n.add(e[r],{success:function(){++r,o()},failure:function(){s++}}):s===0?t.success():t.failure()}var n=this,r=0,i=e.length,s=0;o()},remove:function(e,t){r.db[s].remove(e,t)},findByKey:function(e,t,n){r.findAllByKey(s,e,t,n)},findByTitle:function(e,t){var n=_.map(e,function(e){return e.toLowerCase()}),i=e.length;r.findAll(s,function(e){var t=0,r=e.title.toLowerCase();return _.each(n,function(e){r.indexOf(e)!==-1&&t++}),i===t},t)},update:function(e,t){r.update(s,e,t)},updateTags:function(e,t,n){i.findExact(t,{success:function(t){e.tagGroupId=t[0].id,r.update(s,e,n)},failure:function(){}})},each:function(e,t){r.db[s].query().filter(function(t){return e(t),!1}).execute().done(t.success).fail(t.failure)}}});