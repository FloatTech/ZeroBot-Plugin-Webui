var p=Object.defineProperty;var s=Object.getOwnPropertySymbols;var c=Object.prototype.hasOwnProperty,h=Object.prototype.propertyIsEnumerable;var i=(o,e,t)=>e in o?p(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t,l=(o,e)=>{for(var t in e||(e={}))c.call(e,t)&&i(o,t,e[t]);if(s)for(var t of s(e))h.call(e,t)&&i(o,t,e[t]);return o};import{u as m}from"./useECharts.794c0bcc.js";import{b as u}from"./props.f48aca0b.js";import{A as f,r as y,_ as d,B as b,D as g,X as x}from"./vendor.fc019276.js";import"./index.b9e6c44b.js";const v=f({props:l({},u),setup(o){const e=y(null),{setOptions:t}=m(e);return d(()=>{t({tooltip:{trigger:"axis",axisPointer:{lineStyle:{width:1,color:"#019680"}}},xAxis:{type:"category",boundaryGap:!1,data:["6:00","7:00","8:00","9:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"],splitLine:{show:!0,lineStyle:{width:1,type:"solid",color:"rgba(226,226,226,0.5)"}},axisTick:{show:!1}},yAxis:[{type:"value",max:8e4,splitNumber:4,axisTick:{show:!1},splitArea:{show:!0,areaStyle:{color:["rgba(255,255,255,0.2)","rgba(226,226,226,0.2)"]}}}],grid:{left:"1%",right:"1%",top:"2  %",bottom:0,containLabel:!0},series:[{smooth:!0,data:[111,222,4e3,18e3,33333,55555,66666,33333,14e3,36e3,66666,44444,22222,11111,4e3,2e3,500,333,222,111],type:"line",areaStyle:{},itemStyle:{color:"#5ab1ef"}},{smooth:!0,data:[33,66,88,333,3333,5e3,18e3,3e3,1200,13e3,22e3,11e3,2221,1201,390,198,60,30,22,11],type:"line",areaStyle:{},itemStyle:{color:"#019680"}}]})}),(a,w)=>(b(),g("div",{ref:(r,n)=>{n.chartRef=r,e.value=r},style:x({height:a.height,width:a.width})},null,4))}});export{v as default};
