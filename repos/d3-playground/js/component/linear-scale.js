define(["require","exports","module"],function(e,t,n){t.create=function(e){return d3.scale.linear().range(e.range).domain(d3.extent(e.data,e.getValueFn))}});