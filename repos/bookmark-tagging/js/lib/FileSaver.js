/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */

var saveAs=saveAs||navigator.msSaveBlob&&navigator.msSaveBlob.bind(navigator)||function(e){var t=e.document,n=function(){return e.URL||e.webkitURL||e},r=e.URL||e.webkitURL||e,i=t.createElementNS("http://www.w3.org/1999/xhtml","a"),s="download"in i,o=function(n){var r=t.createEvent("MouseEvents");r.initMouseEvent("click",!0,!1,e,0,0,0,0,0,!1,!1,!1,!1,0,null),n.dispatchEvent(r)},u=e.webkitRequestFileSystem,a=e.requestFileSystem||u||e.mozRequestFileSystem,f=function(t){(e.setImmediate||e.setTimeout)(function(){throw t},0)},l="application/octet-stream",c=0,h=[],p=function(){var e=h.length;while(e--){var t=h[e];typeof t=="string"?r.revokeObjectURL(t):t.remove()}h.length=0},d=function(e,t,n){t=[].concat(t);var r=t.length;while(r--){var i=e["on"+t[r]];if(typeof i=="function")try{i.call(e,n||e)}catch(s){f(s)}}},v=function(t,r){var f=this,p=t.type,v=!1,m,g,y=function(){var e=n().createObjectURL(t);return h.push(e),e},b=function(){d(f,"writestart progress write writeend".split(" "))},w=function(){if(v||!m)m=y(t);g&&(g.location.href=m),f.readyState=f.DONE,b()},E=function(e){return function(){if(f.readyState!==f.DONE)return e.apply(this,arguments)}},S={create:!0,exclusive:!1},x;f.readyState=f.INIT,r||(r="download");if(s){m=y(t),i.href=m,i.download=r,o(i),f.readyState=f.DONE,b();return}e.chrome&&p&&p!==l&&(x=t.slice||t.webkitSlice,t=x.call(t,0,t.size,l),v=!0),u&&r!=="download"&&(r+=".download"),p===l||u?g=e:g=e.open();if(!a){w();return}c+=t.size,a(e.TEMPORARY,c,E(function(e){e.root.getDirectory("saved",S,E(function(e){var n=function(){e.getFile(r,S,E(function(e){e.createWriter(E(function(n){n.onwriteend=function(t){g.location.href=e.toURL(),h.push(e),f.readyState=f.DONE,d(f,"writeend",t)},n.onerror=function(){var e=n.error;e.code!==e.ABORT_ERR&&w()},"writestart progress write abort".split(" ").forEach(function(e){n["on"+e]=f["on"+e]}),n.write(t),f.abort=function(){n.abort(),f.readyState=f.DONE},f.readyState=f.WRITING}),w)}),w)};e.getFile(r,{create:!1},E(function(e){e.remove(),n()}),E(function(e){e.code===e.NOT_FOUND_ERR?n():w()}))}),w)}),w)},m=v.prototype,g=function(e,t){return new v(e,t)};return m.abort=function(){var e=this;e.readyState=e.DONE,d(e,"abort")},m.readyState=m.INIT=0,m.WRITING=1,m.DONE=2,m.error=m.onwritestart=m.onprogress=m.onwrite=m.onabort=m.onerror=m.onwriteend=null,e.addEventListener("unload",p,!1),g}(self);define(["require","exports","module"],function(e,t,n){t.saveAs=saveAs});