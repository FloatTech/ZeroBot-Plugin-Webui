import{_ as b,J as k,a as h,Z as v,f as R,V as O,b as M,b9 as A,a7 as C,b1 as B,b2 as T,h as j}from"./index.b9e6c44b.js";import{A as $,cf as w,bl as x,a0 as l,B as D,D as F,w as o,a5 as i,ad as u,J as d,K as J,u as m}from"./vendor.fc019276.js";const N=$({name:"SettingFooter",components:{CopyOutlined:w,RedoOutlined:x},setup(){const e=k(),{prefixCls:p}=h("setting-footer"),{t:s}=M(),{createSuccessModal:g,createMessage:r}=j(),f=v(),c=R(),t=O();function a(){const{isSuccessRef:n}=A(JSON.stringify(m(t.getProjectConfig),null,2));m(n)&&g({title:s("layout.setting.operatingTitle"),content:s("layout.setting.operatingContent")})}function S(){try{t.setProjectConfig(C);const{colorWeak:n,grayMode:y}=C;B(n),T(y),r.success(s("layout.setting.resetSuccess"))}catch(n){r.error(n)}}function _(){localStorage.clear(),t.resetAllState(),e.resetState(),f.resetState(),c.resetState(),location.reload()}return{prefixCls:p,t:s,handleCopy:a,handleResetSetting:S,handleClearAndRedo:_}}});function P(e,p,s,g,r,f){const c=l("CopyOutlined"),t=l("a-button"),a=l("RedoOutlined");return D(),F("div",{class:J(e.prefixCls)},[o(t,{type:"primary",block:"",onClick:e.handleCopy},{default:i(()=>[o(c,{class:"mr-2"}),u(" "+d(e.t("layout.setting.copyBtn")),1)]),_:1},8,["onClick"]),o(t,{color:"warning",block:"",onClick:e.handleResetSetting,class:"my-3"},{default:i(()=>[o(a,{class:"mr-2"}),u(" "+d(e.t("common.resetText")),1)]),_:1},8,["onClick"]),o(t,{color:"error",block:"",onClick:e.handleClearAndRedo},{default:i(()=>[o(a,{class:"mr-2"}),u(" "+d(e.t("layout.setting.clearBtn")),1)]),_:1},8,["onClick"])],2)}var W=b(N,[["render",P],["__scopeId","data-v-40ca4b3c"]]);export{W as default};
