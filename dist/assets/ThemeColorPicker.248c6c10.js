import{_ as p,a as m}from"./index.e32258ba.js";import{b as l}from"./index.5c1a804c.js";import{A as c,bR as f,a0 as u,B as n,D as s,aa as j,ao as C,K as a,X as _,w as k}from"./vendor.3083ef3c.js";import"./index.65929d54.js";import"./index.4ad523c9.js";/* empty css               *//* empty css               *//* empty css               *//* empty css               *//* empty css              *//* empty css              *//* empty css               *//* empty css               */import"./index.21429f50.js";import"./useWindowSizeFn.0e537ed1.js";import"./useContentViewHeight.96ea150e.js";/* empty css               */import"./useSortable.6ffdb4de.js";import"./lock.9fd45610.js";const x=c({name:"ThemeColorPicker",components:{CheckOutlined:f},props:{colorList:{type:Array,defualt:[]},event:{type:Number},def:{type:String}},setup(e){const{prefixCls:t}=m("setting-theme-picker");function r(o){e.event&&l(e.event,o)}return{prefixCls:t,handleClick:r}}}),h=["onClick"];function v(e,t,r,o,y,b){const d=u("CheckOutlined");return n(),s("div",{class:a(e.prefixCls)},[(n(!0),s(j,null,C(e.colorList||[],i=>(n(),s("span",{key:i,onClick:g=>e.handleClick(i),class:a([`${e.prefixCls}__item`,{[`${e.prefixCls}__item--active`]:e.def===i}]),style:_({background:i})},[k(d)],14,h))),128))],2)}var X=p(x,[["render",v]]);export{X as default};
