import{A as d,bS as r,j as c,a0 as p,B as l,D as m,H as u,J as h,w as f,a4 as j,K as C}from"./vendor.a45ea33e.js";/* empty css                */import{_ as g,a as _,b as x}from"./index.c19540a9.js";import{b}from"./index.ae92ac38.js";import"./index.76f8779a.js";import"./index.809887c2.js";/* empty css               *//* empty css               *//* empty css               *//* empty css               *//* empty css              *//* empty css              *//* empty css               *//* empty css               */import"./index.dfe67a3a.js";import"./useWindowSizeFn.48fcda03.js";import"./useContentViewHeight.4cbdde4a.js";/* empty css               */import"./useSortable.a6e1258f.js";import"./lock.0c0efc31.js";const v=d({name:"SwitchItem",components:{Switch:r},props:{event:{type:Number},disabled:{type:Boolean},title:{type:String},def:{type:Boolean}},setup(e){const{prefixCls:t}=_("setting-switch-item"),{t:n}=x(),i=c(()=>e.def?{checked:e.def}:{});function s(a){e.event&&b(e.event,a)}return{prefixCls:t,t:n,handleChange:s,getBindValue:i}}});function S(e,t,n,i,s,a){const o=p("Switch");return l(),m("div",{class:C(e.prefixCls)},[u("span",null,h(e.title),1),f(o,j(e.getBindValue,{onChange:e.handleChange,disabled:e.disabled,checkedChildren:e.t("layout.setting.on"),unCheckedChildren:e.t("layout.setting.off")}),null,16,["onChange","disabled","checkedChildren","unCheckedChildren"])],2)}var L=g(v,[["render",S],["__scopeId","data-v-fd7354e2"]]);export{L as default};