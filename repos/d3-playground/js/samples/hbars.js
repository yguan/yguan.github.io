define(["require","exports","module","component/horizontal-div-bar"],function(e,t,n){function s(e){r.create({container:e.append("div").attr("class","chart"),barCls:"hbar",barLabelCls:"hbar-label",data:i,labelKey:"name",valueKey:"count",range:[50,200]})}var r=e("component/horizontal-div-bar"),i=[{count:2677,name:"Robert F. Kennedy Bridge Bronx Plaza"},{count:560,name:"Robert"},{count:1345,name:"something else"}];t.run=function(){var e=d3.select("body").append("div");s(e)}});