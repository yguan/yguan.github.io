define(["require","exports","module","component/linear-scale"],function(e,t,n){var r=e("component/linear-scale");t.create=function(e){var t=function(t){return e.valueKey?t[e.valueKey]:t},n=r.create({data:e.data,range:e.range,getValueFn:t}),i=e.container.selectAll("div.line").data(e.data);i.enter().append("div").attr("class","line"),i.append("div").attr("class",e.barLabelCls).text(function(t){return e.labelKey?t[e.labelKey]:t}),i.append("div").attr("class",e.barCls).style("width",function(t){return n(e.valueKey?t[e.valueKey]:t)+"px"}).text(function(t){return Math.round(e.valueKey?t[e.valueKey]:t)})}});