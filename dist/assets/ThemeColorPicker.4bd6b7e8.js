import{_ as p,a as m}from"./index.42731010.js";import{b as l}from"./index.509aeb5d.js";import{A as c,bR as f,a0 as u,B as n,D as s,aa as j,ao as C,K as a,X as _,w as k}from"./vendor.0a46d435.js";import"./index.d2159fcb.js";import"./index.8210271b.js";/* empty css               *//* empty css               *//* empty css               *//* empty css               *//* empty css              *//* empty css              *//* empty css               *//* empty css               */import"./index.f21ef536.js";import"./useWindowSizeFn.59168b39.js";import"./useContentViewHeight.aee99d3c.js";/* empty css               */import"./useSortable.9845e9f4.js";import"./lock.40f429c9.js";const x=c({name:"ThemeColorPicker",components:{CheckOutlined:f},props:{colorList:{type:Array,defualt:[]},event:{type:Number},def:{type:String}},setup(e){const{prefixCls:t}=m("setting-theme-picker");function r(o){e.event&&l(e.event,o)}return{prefixCls:t,handleClick:r}}}),h=["onClick"];function v(e,t,r,o,b,y){const d=u("CheckOutlined");return n(),s("div",{class:a(e.prefixCls)},[(n(!0),s(j,null,C(e.colorList||[],i=>(n(),s("span",{key:i,onClick:g=>e.handleClick(i),class:a([`${e.prefixCls}__item`,{[`${e.prefixCls}__item--active`]:e.def===i}]),style:_({background:i})},[k(d)],14,h))),128))],2)}var X=p(x,[["render",v]]);export{X as default};