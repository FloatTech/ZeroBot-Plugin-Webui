import{A as l,a8 as m,bV as d,a as _,j as f,a0 as e,B as g,a1 as E,a5 as a,w as c}from"./vendor.fc019276.js";/* empty css                */import{_ as C,I as L,aJ as h,b,P as B}from"./index.b9e6c44b.js";const I=l({name:"ErrorAction",components:{Icon:L,Tooltip:m,Badge:d},setup(){const{t:o}=b(),{push:n}=_(),t=h(),r=f(()=>t.getErrorLogListCount);function s(){n(B.ERROR_LOG_PAGE).then(()=>{t.setErrorLogListCount(0)})}return{t:o,getCount:r,handleToErrorList:s}}});function T(o,n,t,r,s,j){const i=e("Icon"),u=e("Badge"),p=e("Tooltip");return g(),E(p,{title:o.t("layout.header.tooltipErrorLog"),placement:"bottom",mouseEnterDelay:.5,onClick:o.handleToErrorList},{default:a(()=>[c(u,{count:o.getCount,offset:[0,10],overflowCount:99},{default:a(()=>[c(i,{icon:"ion:bug-outline"})]),_:1},8,["count"])]),_:1},8,["title","mouseEnterDelay","onClick"])}var R=C(I,[["render",T]]);export{R as default};
