import{_ as p,a as m}from"./index.aaa1a380.js";import{b as l}from"./index.0e8d0ece.js";import{A as c,bW as f,a0 as u,B as n,D as s,aa as j,ao as C,K as a,X as _,w as k}from"./vendor.a45ea33e.js";import"./index.568d2644.js";import"./index.a15f8a8f.js";/* empty css               *//* empty css               *//* empty css               *//* empty css               *//* empty css              *//* empty css              *//* empty css               *//* empty css               */import"./index.06254a78.js";import"./useWindowSizeFn.48fcda03.js";import"./useContentViewHeight.ac28b703.js";/* empty css               */import"./useSortable.5cfd8c8f.js";import"./lock.5d6e984a.js";const x=c({name:"ThemeColorPicker",components:{CheckOutlined:f},props:{colorList:{type:Array,defualt:[]},event:{type:Number},def:{type:String}},setup(e){const{prefixCls:t}=m("setting-theme-picker");function r(o){e.event&&l(e.event,o)}return{prefixCls:t,handleClick:r}}}),h=["onClick"];function v(e,t,r,o,y,b){const d=u("CheckOutlined");return n(),s("div",{class:a(e.prefixCls)},[(n(!0),s(j,null,C(e.colorList||[],i=>(n(),s("span",{key:i,onClick:g=>e.handleClick(i),class:a([`${e.prefixCls}__item`,{[`${e.prefixCls}__item--active`]:e.def===i}]),style:_({background:i})},[k(d)],14,h))),128))],2)}var q=p(x,[["render",v]]);export{q as default};