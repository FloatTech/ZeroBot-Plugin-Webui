import{A as s,r as l,S as d,B as c,a1 as m,a5 as p,H as f,X as h,u as g,bL as B}from"./vendor.a45ea33e.js";/* empty css                *//* empty css               *//* empty css               */import{u as x}from"./useECharts.9a72bc67.js";import"./index.c19540a9.js";const b=s({props:{loading:Boolean,width:{type:String,default:"100%"},height:{type:String,default:"300px"}},setup(e){const a=e,t=l(null),{setOptions:r}=x(t);return d(()=>a.loading,()=>{a.loading||r({tooltip:{trigger:"item"},series:[{name:"\u8BBF\u95EE\u6765\u6E90",type:"pie",radius:"80%",center:["50%","50%"],color:["#5ab1ef","#b6a2de","#67e0e3","#2ec7c9"],data:[{value:500,name:"\u7535\u5B50\u4EA7\u54C1"},{value:310,name:"\u670D\u88C5"},{value:274,name:"\u5316\u5986\u54C1"},{value:400,name:"\u5BB6\u5C45"}].sort(function(n,i){return n.value-i.value}),roseType:"radius",animationType:"scale",animationEasing:"exponentialInOut",animationDelay:function(){return Math.random()*400}}]})},{immediate:!0}),(n,i)=>(c(),m(g(B),{title:"\u6210\u4EA4\u5360\u6BD4",loading:e.loading},{default:p(()=>[f("div",{ref:(u,o)=>{o.chartRef=u,t.value=u},style:h({width:e.width,height:e.height})},null,4)]),_:1},8,["loading"]))}});export{b as default};