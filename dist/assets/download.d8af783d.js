import{o as s}from"./index.b9e6c44b.js";function c({url:e,target:o="_blank",fileName:r}){const i=window.navigator.userAgent.toLowerCase().indexOf("chrome")>-1,a=window.navigator.userAgent.toLowerCase().indexOf("safari")>-1;if(/(iP)/g.test(window.navigator.userAgent))return console.error("Your browser does not support download!"),!1;if(i||a){const n=document.createElement("a");if(n.href=e,n.target=o,n.download!==void 0&&(n.download=r||e.substring(e.lastIndexOf("/")+1,e.length)),document.createEvent){const t=document.createEvent("MouseEvents");return t.initEvent("click",!0,!0),n.dispatchEvent(t),!0}}return e.indexOf("?")===-1&&(e+="?download"),s(e,{target:o}),!0}export{c as d};
