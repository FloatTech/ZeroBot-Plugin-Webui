import{_ as S,F as _,Q as T,aW as L,a as k,Y as l}from"./index.e32258ba.js";import{A as F,c8 as w,j as f,u as o,a0 as n,B as s,D as B,w as y,a1 as m,ac as d,K as b,aa as v}from"./vendor.3083ef3c.js";import{c as x,u as C}from"./index.65929d54.js";import D from"./SessionTimeoutLogin.2274f7c4.js";import"./index.4ad523c9.js";/* empty css               *//* empty css               *//* empty css               *//* empty css               *//* empty css              *//* empty css              *//* empty css               *//* empty css               */import"./index.21429f50.js";import"./useWindowSizeFn.0e537ed1.js";import"./useContentViewHeight.96ea150e.js";/* empty css               */import"./useSortable.6ffdb4de.js";import"./lock.9fd45610.js";import"./Login.2321f563.js";import"./LoginForm.f2991c52.js";import"./LoginFormTitle.f029b7d4.js";import"./ForgetPasswordForm.cb74e256.js";import"./index.e8cca550.js";import"./RegisterForm.b1d06624.js";import"./index.18282c63.js";import"./MobileForm.4de0e41a.js";import"./QrCodeForm.2c7d7bd4.js";import"./download.d707deaa.js";const P=F({name:"LayoutFeatures",components:{BackTop:w,LayoutLockPage:x(()=>_(()=>import("./index.e992eb07.js"),["assets/index.e992eb07.js","assets/vendor.3083ef3c.js","assets/vendor.d7f2c096.css","assets/LockPage.1bd8b0d8.js","assets/LockPage.2bff9ea2.css","assets/index.e32258ba.js","assets/index.9a418476.css","assets/lock.9fd45610.js","assets/header.d801b988.js"])),SettingDrawer:x(()=>_(()=>import("./index.5c1a804c.js").then(function(e){return e.i}),["assets/index.5c1a804c.js","assets/index.5c7227e9.css","assets/index.35b5cf30.css","assets/index.e32258ba.js","assets/index.9a418476.css","assets/vendor.3083ef3c.js","assets/vendor.d7f2c096.css","assets/index.65929d54.js","assets/index.3445f5e4.css","assets/index.65674215.css","assets/index.4ad523c9.js","assets/index.a7c27022.css","assets/index.43ba843e.css","assets/index.858d32f5.css","assets/index.ccc15a38.css","assets/index.676b77b5.css","assets/index.7959f7e6.css","assets/index.c4896195.css","assets/index.4eb149b8.css","assets/index.21429f50.js","assets/index.0935299d.css","assets/useWindowSizeFn.0e537ed1.js","assets/useContentViewHeight.96ea150e.js","assets/useSortable.6ffdb4de.js","assets/lock.9fd45610.js"])),SessionTimeoutLogin:D},setup(){const{getUseOpenBackTop:e,getShowSettingButton:p,getSettingButtonPosition:c,getFullContent:u}=T(),g=L(),{prefixCls:j}=k("setting-drawer-fearure"),{getShowHeader:i}=C(),r=f(()=>g.getSessionTimeout),a=f(()=>{if(!o(p))return!1;const t=o(c);return t===l.AUTO?!o(i)||o(u):t===l.FIXED});return{getTarget:()=>document.body,getUseOpenBackTop:e,getIsFixedSettingDrawer:a,prefixCls:j,getIsSessionTimeout:r}}});function E(e,p,c,u,g,j){const i=n("LayoutLockPage"),r=n("BackTop"),a=n("SettingDrawer"),t=n("SessionTimeoutLogin");return s(),B(v,null,[y(i),e.getUseOpenBackTop?(s(),m(r,{key:0,target:e.getTarget},null,8,["target"])):d("",!0),e.getIsFixedSettingDrawer?(s(),m(a,{key:1,class:b(e.prefixCls)},null,8,["class"])):d("",!0),e.getIsSessionTimeout?(s(),m(t,{key:2})):d("",!0)],64)}var me=S(P,[["render",E]]);export{me as default};
