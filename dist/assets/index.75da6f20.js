import{_ as L,F as C,p as M,a as I,f as b,b as S,o as $}from"./index.b9e6c44b.js";import{A as U,aA as A,az as D,j as N,a0 as n,B as t,D as O,w as s,a5 as u,a1 as f,ac as _,H as r,K as a,J as V,aa as B}from"./vendor.fc019276.js";import{D as E}from"./siteSetting.c485f07c.js";import{c as v,u as P}from"./index.3cffc05f.js";import{a as R}from"./index.1845f93f.js";import{h as z}from"./header.d801b988.js";import"./index.5a78674f.js";/* empty css               *//* empty css               *//* empty css               *//* empty css               *//* empty css              *//* empty css              *//* empty css               */import"./index.b418a034.js";import"./useWindowSizeFn.41ed5ae6.js";import"./useContentViewHeight.dff0980e.js";/* empty css               */import"./useSortable.f5083cc7.js";import"./lock.18c5a2f9.js";const F=U({name:"UserDropdown",components:{Dropdown:A,Menu:D,MenuItem:v(()=>C(()=>import("./DropMenuItem.941b1817.js"),["assets/DropMenuItem.941b1817.js","assets/vendor.fc019276.js","assets/vendor.d7f2c096.css","assets/index.b9e6c44b.js","assets/index.9a418476.css"])),MenuDivider:D.Divider,LockAction:v(()=>C(()=>import("./LockModal.0d6ddd1a.js"),["assets/LockModal.0d6ddd1a.js","assets/LockModal.0068f88c.css","assets/index.858d32f5.css","assets/index.ccc15a38.css","assets/index.35b5cf30.css","assets/index.676b77b5.css","assets/index.7959f7e6.css","assets/index.c4896195.css","assets/index.553174f4.css","assets/index.317f90e2.css","assets/index.4eb149b8.css","assets/index.b9e6c44b.js","assets/index.9a418476.css","assets/vendor.fc019276.js","assets/vendor.d7f2c096.css","assets/index.1845f93f.js","assets/index.2439e102.css","assets/useWindowSizeFn.41ed5ae6.js","assets/useForm.1539aa6e.js","assets/useForm.e9b7ad84.css","assets/index.2e52422d.js","assets/index.7b8b5e30.css","assets/download.d8af783d.js","assets/index.481da178.js","assets/index.88b1d373.css","assets/lock.18c5a2f9.js","assets/header.d801b988.js"]))},props:{theme:M.oneOf(["dark","light"])},setup(){const{prefixCls:e}=I("header-user-dropdown"),{t:g}=S(),{getShowDoc:k,getUseLockPage:h}=P(),i=b(),j=N(()=>{const{realName:m="",avatar:x,desc:y}=i.getUserInfo||{};return{realName:m,avatar:x||z,desc:y}}),[o,{openModal:c}]=R();function d(){c(!0)}function l(){i.confirmLoginOut()}function p(){$(E)}function w(m){switch(m.key){case"logout":l();break;case"doc":p();break;case"lock":d();break}}return{prefixCls:e,t:g,getUserInfo:j,handleMenuClick:w,getShowDoc:k,register:o,getUseLockPage:h}}}),H=["src"];function T(e,g,k,h,i,j){const o=n("MenuItem"),c=n("MenuDivider"),d=n("Menu"),l=n("Dropdown"),p=n("LockAction");return t(),O(B,null,[s(l,{placement:"bottomLeft",overlayClassName:`${e.prefixCls}-dropdown-overlay`},{overlay:u(()=>[s(d,{onClick:e.handleMenuClick},{default:u(()=>[e.getShowDoc?(t(),f(o,{key:"doc",text:e.t("layout.header.dropdownItemDoc"),icon:"ion:document-text-outline"},null,8,["text"])):_("",!0),e.getShowDoc?(t(),f(c,{key:1})):_("",!0),e.getUseLockPage?(t(),f(o,{key:"lock",text:e.t("layout.header.tooltipLock"),icon:"ion:lock-closed-outline"},null,8,["text"])):_("",!0),s(o,{key:"logout",text:e.t("layout.header.dropdownItemLoginOut"),icon:"ion:power-outline"},null,8,["text"])]),_:1},8,["onClick"])]),default:u(()=>[r("span",{class:a([[e.prefixCls,`${e.prefixCls}--${e.theme}`],"flex"])},[r("img",{class:a(`${e.prefixCls}__header`),src:e.getUserInfo.avatar},null,10,H),r("span",{class:a(`${e.prefixCls}__info hidden md:block`)},[r("span",{class:a([`${e.prefixCls}__name  `,"truncate"])},V(e.getUserInfo.realName),3)],2)],2)]),_:1},8,["overlayClassName"]),s(p,{onRegister:e.register},null,8,["onRegister"])],64)}var pe=L(F,[["render",T]]);export{pe as default};
