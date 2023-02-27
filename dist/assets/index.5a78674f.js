var w=Object.defineProperty;var k=(u,o,n)=>o in u?w(u,o,{enumerable:!0,configurable:!0,writable:!0,value:n}):u[o]=n;var v=(u,o,n)=>(k(u,typeof o!="symbol"?o+"":o,n),n);var b=(u,o,n)=>new Promise((i,c)=>{var _=e=>{try{s(n.next(e))}catch(t){c(t)}},f=e=>{try{s(n.throw(e))}catch(t){c(t)}},s=e=>e.done?i(e.value):Promise.resolve(e.value).then(_,f);s((n=n.apply(u,o)).next())});import{a as useDesign,f as useUserStore,a9 as getBotList,aa as sendMsg,ab as wsUrl,ac as Api,ad as getGroupList,ae as getFriendList,w as withInstall}from"./index.b9e6c44b.js";import{A as defineComponent,r as ref,j as computed,B as openBlock,D as createElementBlock,w as createVNode,a5 as withCtx,aa as Fragment,ao as renderList,a1 as createBlock,K as normalizeClass,u as unref,bn as Avatar,ap as Popover,v as message,P as reactive,a_ as Divider,bo as FormItem,an as Input,aS as Button,a4 as mergeProps,aY as Form,ad as createTextVNode,ai as onUnmounted,H as createBaseVNode,J as toDisplayString,bp as Tag,bq as Table,br as commonjsGlobal,bs as getDefaultExportFromCjs,al as watchEffect,bt as Select,bu as SelectOptGroup,bv as SelectOption}from"./vendor.fc019276.js";/* empty css               *//* empty css               *//* empty css               *//* empty css               *//* empty css              *//* empty css              *//* empty css               */var BotSwitch_vue_vue_type_style_index_0_lang="";const _sfc_main$4=defineComponent({setup(u){const{prefixCls:o}=useDesign("botSwitch"),n=ref({id:1,pic:"http://q4.qlogo.cn/g?b=qq&nk="+1+"&s=640"}),i=useUserStore(),c=ref([]),_=computed(()=>i.getQQ),f=()=>b(this,null,function*(){c.value=[];let e=yield getBotList();!_.value&&e.length>0&&i.setQQ(e[0]);for(let t of e)c.value.push({id:t,pic:"http://q4.qlogo.cn/g?b=qq&nk="+t+"&s=640"});n.value={id:_.value,pic:"http://q4.qlogo.cn/g?b=qq&nk="+_.value+"&s=640"}}),s=e=>{i.setQQ(e.id),message.info("\u5207\u6362\u5230QQ: "+e.id),n.value=e,console.log(n)};return f(),(e,t)=>(openBlock(),createElementBlock("div",null,[createVNode(unref(Popover),{title:"\u70B9\u51FB\u4E0B\u5217\u5934\u50CF, \u5207\u6362QQ\u53F7",trigger:"click"},{content:withCtx(()=>[(openBlock(!0),createElementBlock(Fragment,null,renderList(c.value,r=>(openBlock(),createBlock(unref(Avatar),{key:r.id,src:r.pic,onClick:a=>s(r),class:normalizeClass(`${unref(o)}__avatar`)},null,8,["src","onClick","class"]))),128))]),default:withCtx(()=>[createVNode(unref(Avatar),{src:n.value.pic},null,8,["src"])]),_:1})]))}});var MessageSendBox_vue_vue_type_style_index_0_lang="";const _hoisted_1$2=createTextVNode("\u53D1\u9001\u6D88\u606F"),_hoisted_2$1=createTextVNode("\u53D1\u9001"),_sfc_main$3=defineComponent({setup(u){const{prefixCls:o}=useDesign("messageSendBox"),n=reactive({gidList:[],msg:""}),i=computed(()=>({labelCol:{span:4},wrapperCol:{span:14}})),c=e=>{n.gidList=e},_=useUserStore(),f=computed(()=>_.getQQ),s=()=>b(this,null,function*(){yield sendMsg({selfId:f.value,gidList:n.gidList,message:n.msg})});return(e,t)=>(openBlock(),createElementBlock("div",{class:normalizeClass(`${unref(o)}__sendbox`)},[createVNode(unref(Divider),null,{default:withCtx(()=>[_hoisted_1$2]),_:1}),createVNode(unref(Form),mergeProps({layout:"horizontal"},unref(i),{model:unref(n)}),{default:withCtx(()=>[createVNode(unref(MessageSendSelect),{onChangeGroupIdList:c}),createVNode(unref(FormItem),{label:"\u6D88\u606F"},{default:withCtx(()=>[createVNode(unref(Input).TextArea,{value:unref(n).msg,"onUpdate:value":t[0]||(t[0]=r=>unref(n).msg=r),placeholder:"\u8BF7\u8F93\u5165\u6D88\u606F",style:{width:"400px"},rows:4},null,8,["value"])]),_:1}),createVNode(unref(FormItem),{"wrapper-col":{span:14,offset:4}},{default:withCtx(()=>[createVNode(unref(Button),{type:"primary",onClick:s},{default:withCtx(()=>[_hoisted_2$1]),_:1})]),_:1})]),_:1},16,["model"])],2))}});class Websocket1{constructor(o){v(this,"socket");this.socket=new WebSocket(o)}onMessage(o){this.socket.onmessage=o}onOpen(o){this.socket.onopen=o}onError(o){this.socket.onerror=o}onClose(o){this.socket.onclose=o}send(o){this.socket.send(JSON.stringify(o))}}const _hoisted_1$1=createTextVNode("\u6D88\u606F"),_hoisted_2={key:0},_hoisted_3=createTextVNode("\u7FA4\u804A"),_hoisted_4={key:1},_hoisted_5=createTextVNode("\u79C1\u804A"),_sfc_main$2=defineComponent({setup(__props){const columns=[{title:"\u65F6\u95F4",dataIndex:"time",key:"time"},{title:"\u7FA4\u540D",dataIndex:"group_name",key:"group_name",slots:{customRender:"group_name"}},{title:"\u6635\u79F0",dataIndex:"nickname",key:"nickname",slots:{customRender:"nickname"}},{title:"\u6D88\u606F\u7C7B\u578B",dataIndex:"message_type",key:"message_type",slots:{customRender:"message_type"}},{title:"\u6D88\u606F\u5185\u5BB9",dataIndex:"raw_message",key:"raw_message"}],msgTableData=ref([]),ws=new Websocket1(wsUrl+Api.data);return ws.onOpen(u=>{console.log(u),console.log("msg ws\u8FDE\u63A5\u5DF2\u6253\u5F00")}),ws.onMessage(event=>{let myDate=new Date;console.log(event.data);let result=eval("("+event.data+")");result.time=myDate.toLocaleString(),result.key=String(result.message_id),msgTableData.value.unshift(result),msgTableData.value.length>1e3&&msgTableData.value.shift()}),ws.onClose(()=>{console.log("ws\u8FDE\u63A5\u5DF2\u5173\u95ED")}),ws.onError(u=>{console.log("ws\u51FA\u73B0\u9519\u8BEF"+u)}),onUnmounted(()=>{ws.socket.close()}),(u,o)=>(openBlock(),createElementBlock("div",null,[createVNode(unref(Divider),null,{default:withCtx(()=>[_hoisted_1$1]),_:1}),createVNode(unref(Table),{columns,"data-source":msgTableData.value},{nickname:withCtx(({record:n})=>[createBaseVNode("span",null,toDisplayString(n.nickname+" ("+n.user_id+")"),1)]),group_name:withCtx(({record:n})=>[createBaseVNode("span",null,toDisplayString(n.group_name+" ("+n.group_id+")"),1)]),message_type:withCtx(({text:n})=>[n==="group"?(openBlock(),createElementBlock("span",_hoisted_2,[createVNode(unref(Tag),{color:"green"},{default:withCtx(()=>[_hoisted_3]),_:1})])):(openBlock(),createElementBlock("span",_hoisted_4,[createVNode(unref(Tag),{color:"red"},{default:withCtx(()=>[_hoisted_5]),_:1})]))]),_:1},8,["data-source"])]))}});var ansi_up={};(function(u){(function(o,n){if(typeof u.nodeName!="string")n(u);else{var i={};n(i),o.AnsiUp=i.default}})(commonjsGlobal,function(o){var n=this&&this.__makeTemplateObject||function(s,e){return Object.defineProperty?Object.defineProperty(s,"raw",{value:e}):s.raw=e,s},i;(function(s){s[s.EOS=0]="EOS",s[s.Text=1]="Text",s[s.Incomplete=2]="Incomplete",s[s.ESC=3]="ESC",s[s.Unknown=4]="Unknown",s[s.SGR=5]="SGR",s[s.OSCURL=6]="OSCURL"})(i||(i={}));var c=function(){function s(){this.VERSION="5.1.0",this.setup_palettes(),this._use_classes=!1,this.bold=!1,this.italic=!1,this.underline=!1,this.fg=this.bg=null,this._buffer="",this._url_whitelist={http:1,https:1}}return Object.defineProperty(s.prototype,"use_classes",{get:function(){return this._use_classes},set:function(e){this._use_classes=e},enumerable:!1,configurable:!0}),Object.defineProperty(s.prototype,"url_whitelist",{get:function(){return this._url_whitelist},set:function(e){this._url_whitelist=e},enumerable:!1,configurable:!0}),s.prototype.setup_palettes=function(){var e=this;this.ansi_colors=[[{rgb:[0,0,0],class_name:"ansi-black"},{rgb:[187,0,0],class_name:"ansi-red"},{rgb:[0,187,0],class_name:"ansi-green"},{rgb:[187,187,0],class_name:"ansi-yellow"},{rgb:[0,0,187],class_name:"ansi-blue"},{rgb:[187,0,187],class_name:"ansi-magenta"},{rgb:[0,187,187],class_name:"ansi-cyan"},{rgb:[255,255,255],class_name:"ansi-white"}],[{rgb:[85,85,85],class_name:"ansi-bright-black"},{rgb:[255,85,85],class_name:"ansi-bright-red"},{rgb:[0,255,0],class_name:"ansi-bright-green"},{rgb:[255,255,85],class_name:"ansi-bright-yellow"},{rgb:[85,85,255],class_name:"ansi-bright-blue"},{rgb:[255,85,255],class_name:"ansi-bright-magenta"},{rgb:[85,255,255],class_name:"ansi-bright-cyan"},{rgb:[255,255,255],class_name:"ansi-bright-white"}]],this.palette_256=[],this.ansi_colors.forEach(function(m){m.forEach(function(x){e.palette_256.push(x)})});for(var t=[0,95,135,175,215,255],r=0;r<6;++r)for(var a=0;a<6;++a)for(var l=0;l<6;++l){var g={rgb:[t[r],t[a],t[l]],class_name:"truecolor"};this.palette_256.push(g)}for(var h=8,d=0;d<24;++d,h+=10){var p={rgb:[h,h,h],class_name:"truecolor"};this.palette_256.push(p)}},s.prototype.escape_txt_for_html=function(e){return e.replace(/[&<>"']/gm,function(t){if(t==="&")return"&amp;";if(t==="<")return"&lt;";if(t===">")return"&gt;";if(t==='"')return"&quot;";if(t==="'")return"&#x27;"})},s.prototype.append_buffer=function(e){var t=this._buffer+e;this._buffer=t},s.prototype.get_next_packet=function(){var e={kind:i.EOS,text:"",url:""},t=this._buffer.length;if(t==0)return e;var r=this._buffer.indexOf("");if(r==-1)return e.kind=i.Text,e.text=this._buffer,this._buffer="",e;if(r>0)return e.kind=i.Text,e.text=this._buffer.slice(0,r),this._buffer=this._buffer.slice(r),e;if(r==0){if(t==1)return e.kind=i.Incomplete,e;var a=this._buffer.charAt(1);if(a!="["&&a!="]")return e.kind=i.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e;if(a=="["){this._csi_regex||(this._csi_regex=_(n([`
                        ^                           # beginning of line
                                                    #
                                                    # First attempt
                        (?:                         # legal sequence
                          [                      # CSI
                          ([<-?]?)              # private-mode char
                          ([d;]*)                    # any digits or semicolons
                          ([ -/]?               # an intermediate modifier
                          [@-~])                # the command
                        )
                        |                           # alternate (second attempt)
                        (?:                         # illegal sequence
                          [                      # CSI
                          [ -~]*                # anything legal
                          ([\0-:])              # anything illegal
                        )
                    `],[`
                        ^                           # beginning of line
                                                    #
                                                    # First attempt
                        (?:                         # legal sequence
                          \\x1b\\[                      # CSI
                          ([\\x3c-\\x3f]?)              # private-mode char
                          ([\\d;]*)                    # any digits or semicolons
                          ([\\x20-\\x2f]?               # an intermediate modifier
                          [\\x40-\\x7e])                # the command
                        )
                        |                           # alternate (second attempt)
                        (?:                         # illegal sequence
                          \\x1b\\[                      # CSI
                          [\\x20-\\x7e]*                # anything legal
                          ([\\x00-\\x1f:])              # anything illegal
                        )
                    `])));var l=this._buffer.match(this._csi_regex);if(l===null)return e.kind=i.Incomplete,e;if(l[4])return e.kind=i.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e;l[1]!=""||l[3]!="m"?e.kind=i.Unknown:e.kind=i.SGR,e.text=l[2];var g=l[0].length;return this._buffer=this._buffer.slice(g),e}if(a=="]"){if(t<4)return e.kind=i.Incomplete,e;if(this._buffer.charAt(2)!="8"||this._buffer.charAt(3)!=";")return e.kind=i.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e;this._osc_st||(this._osc_st=f(n([`
                        (?:                         # legal sequence
                          (\\)                    # ESC                           |                           # alternate
                          (\x07)                      # BEL (what xterm did)
                        )
                        |                           # alternate (second attempt)
                        (                           # illegal sequence
                          [\0-]                 # anything illegal
                          |                           # alternate
                          [\b-]                 # anything illegal
                          |                           # alternate
                          [-]                 # anything illegal
                        )
                    `],[`
                        (?:                         # legal sequence
                          (\\x1b\\\\)                    # ESC \\
                          |                           # alternate
                          (\\x07)                      # BEL (what xterm did)
                        )
                        |                           # alternate (second attempt)
                        (                           # illegal sequence
                          [\\x00-\\x06]                 # anything illegal
                          |                           # alternate
                          [\\x08-\\x1a]                 # anything illegal
                          |                           # alternate
                          [\\x1c-\\x1f]                 # anything illegal
                        )
                    `]))),this._osc_st.lastIndex=0;{var h=this._osc_st.exec(this._buffer);if(h===null)return e.kind=i.Incomplete,e;if(h[3])return e.kind=i.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e}{var d=this._osc_st.exec(this._buffer);if(d===null)return e.kind=i.Incomplete,e;if(d[3])return e.kind=i.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e}this._osc_regex||(this._osc_regex=_(n([`
                        ^                           # beginning of line
                                                    #
                        ]8;                    # OSC Hyperlink
                        [ -:<-~]*       # params (excluding ;)
                        ;                           # end of params
                        ([!-~]{0,512})        # URL capture
                        (?:                         # ST
                          (?:\\)                  # ESC                           |                           # alternate
                          (?:\x07)                    # BEL (what xterm did)
                        )
                        ([ -~]+)              # TEXT capture
                        ]8;;                   # OSC Hyperlink End
                        (?:                         # ST
                          (?:\\)                  # ESC                           |                           # alternate
                          (?:\x07)                    # BEL (what xterm did)
                        )
                    `],[`
                        ^                           # beginning of line
                                                    #
                        \\x1b\\]8;                    # OSC Hyperlink
                        [\\x20-\\x3a\\x3c-\\x7e]*       # params (excluding ;)
                        ;                           # end of params
                        ([\\x21-\\x7e]{0,512})        # URL capture
                        (?:                         # ST
                          (?:\\x1b\\\\)                  # ESC \\
                          |                           # alternate
                          (?:\\x07)                    # BEL (what xterm did)
                        )
                        ([\\x20-\\x7e]+)              # TEXT capture
                        \\x1b\\]8;;                   # OSC Hyperlink End
                        (?:                         # ST
                          (?:\\x1b\\\\)                  # ESC \\
                          |                           # alternate
                          (?:\\x07)                    # BEL (what xterm did)
                        )
                    `])));var l=this._buffer.match(this._osc_regex);if(l===null)return e.kind=i.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e;e.kind=i.OSCURL,e.url=l[1],e.text=l[2];var g=l[0].length;return this._buffer=this._buffer.slice(g),e}}},s.prototype.ansi_to_html=function(e){this.append_buffer(e);for(var t=[];;){var r=this.get_next_packet();if(r.kind==i.EOS||r.kind==i.Incomplete)break;r.kind==i.ESC||r.kind==i.Unknown||(r.kind==i.Text?t.push(this.transform_to_html(this.with_state(r))):r.kind==i.SGR?this.process_ansi(r):r.kind==i.OSCURL&&t.push(this.process_hyperlink(r)))}return t.join("")},s.prototype.with_state=function(e){return{bold:this.bold,italic:this.italic,underline:this.underline,fg:this.fg,bg:this.bg,text:e.text}},s.prototype.process_ansi=function(e){for(var t=e.text.split(";");t.length>0;){var r=t.shift(),a=parseInt(r,10);if(isNaN(a)||a===0)this.fg=this.bg=null,this.bold=!1,this.italic=!1,this.underline=!1;else if(a===1)this.bold=!0;else if(a===3)this.italic=!0;else if(a===4)this.underline=!0;else if(a===22)this.bold=!1;else if(a===23)this.italic=!1;else if(a===24)this.underline=!1;else if(a===39)this.fg=null;else if(a===49)this.bg=null;else if(a>=30&&a<38)this.fg=this.ansi_colors[0][a-30];else if(a>=40&&a<48)this.bg=this.ansi_colors[0][a-40];else if(a>=90&&a<98)this.fg=this.ansi_colors[1][a-90];else if(a>=100&&a<108)this.bg=this.ansi_colors[1][a-100];else if((a===38||a===48)&&t.length>0){var l=a===38,g=t.shift();if(g==="5"&&t.length>0){var h=parseInt(t.shift(),10);h>=0&&h<=255&&(l?this.fg=this.palette_256[h]:this.bg=this.palette_256[h])}if(g==="2"&&t.length>2){var d=parseInt(t.shift(),10),p=parseInt(t.shift(),10),m=parseInt(t.shift(),10);if(d>=0&&d<=255&&p>=0&&p<=255&&m>=0&&m<=255){var x={rgb:[d,p,m],class_name:"truecolor"};l?this.fg=x:this.bg=x}}}}},s.prototype.transform_to_html=function(e){var t=e.text;if(t.length===0||(t=this.escape_txt_for_html(t),!e.bold&&!e.italic&&!e.underline&&e.fg===null&&e.bg===null))return t;var r=[],a=[],l=e.fg,g=e.bg;e.bold&&r.push("font-weight:bold"),e.italic&&r.push("font-style:italic"),e.underline&&r.push("text-decoration:underline"),this._use_classes?(l&&(l.class_name!=="truecolor"?a.push(l.class_name+"-fg"):r.push("color:rgb("+l.rgb.join(",")+")")),g&&(g.class_name!=="truecolor"?a.push(g.class_name+"-bg"):r.push("background-color:rgb("+g.rgb.join(",")+")"))):(l&&r.push("color:rgb("+l.rgb.join(",")+")"),g&&r.push("background-color:rgb("+g.rgb+")"));var h="",d="";return a.length&&(h=' class="'+a.join(" ")+'"'),r.length&&(d=' style="'+r.join(";")+'"'),"<span"+d+h+">"+t+"</span>"},s.prototype.process_hyperlink=function(e){var t=e.url.split(":");if(t.length<1||!this._url_whitelist[t[0]])return"";var r='<a href="'+this.escape_txt_for_html(e.url)+'">'+this.escape_txt_for_html(e.text)+"</a>";return r},s}();function _(s){for(var e=[],t=1;t<arguments.length;t++)e[t-1]=arguments[t];var r=s.raw[0],a=/^\s+|\s+\n|\s*#[\s\S]*?\n|\n/gm,l=r.replace(a,"");return new RegExp(l)}function f(s){for(var e=[],t=1;t<arguments.length;t++)e[t-1]=arguments[t];var r=s.raw[0],a=/^\s+|\s+\n|\s*#[\s\S]*?\n|\n/gm,l=r.replace(a,"");return new RegExp(l,"g")}Object.defineProperty(o,"__esModule",{value:!0}),o.default=c})})(ansi_up);var AnsiUp=getDefaultExportFromCjs(ansi_up);function removeHtmlTab(u){return u.replace(/<[^<>]+?>/g,"")}function escape2Html(u){const o={lt:"<",gt:">",nbsp:" ",amp:"&",quot:'"'};return u.replace(/&(lt|gt|nbsp|amp|quot);/gi,function(n,i){return o[i]})}var LogWebsocket_vue_vue_type_style_index_0_lang="";const _hoisted_1=createTextVNode("\u65E5\u5FD7"),_sfc_main$1=defineComponent({setup(u){const{prefixCls:o}=useDesign("logWebsocket"),n=ref([]),i=[{title:"\u5185\u5BB9",dataIndex:"msg",key:"msg",slots:{customRender:"msg"}}],c=new Websocket1(wsUrl+Api.getLog),_=new AnsiUp;return c.onOpen(f=>{console.log(f),console.log("log ws\u8FDE\u63A5\u5DF2\u6253\u5F00")}),c.onMessage(f=>{let s=_.ansi_to_html(f.data);n.value.unshift({msg:escape2Html(removeHtmlTab(s))}),n.value.length>1e3&&n.value.shift()}),c.onClose(()=>{console.log("ws\u8FDE\u63A5\u5DF2\u5173\u95ED")}),c.onError(f=>{console.log("ws\u51FA\u73B0\u9519\u8BEF"+f)}),onUnmounted(()=>{c.socket.close()}),(f,s)=>(openBlock(),createElementBlock("div",null,[createVNode(unref(Divider),null,{default:withCtx(()=>[_hoisted_1]),_:1}),createVNode(unref(Table),{columns:i,"data-source":n.value,class:normalizeClass(`${unref(o)}__table`)},{msg:withCtx(({text:e})=>[createBaseVNode("span",{class:normalizeClass(`${unref(o)}__msg`)},toDisplayString(e),3)]),_:1},8,["data-source","class"])]))}}),_sfc_main=defineComponent({emits:["changeGroupIdList"],setup(u,{emit:o}){const n=ref([0]),i=useUserStore(),c=computed(()=>i.getQQ),_=ref([]),f=ref([]),s=()=>b(this,null,function*(){_.value=yield getGroupList({selfId:c.value}),_.value.unshift({group_id:0,group_name:"\u5168\u90E8\u7FA4\u804A",group_create_time:0,group_level:0,max_member_count:0,member_count:0})}),e=()=>b(this,null,function*(){f.value=yield getFriendList({selfId:c.value})}),t=()=>{o("changeGroupIdList",n.value)};return watchEffect(()=>{s(),e()}),(r,a)=>(openBlock(),createElementBlock("div",null,[createVNode(unref(FormItem),{label:"\u7FA4\u804A & \u597D\u53CB"},{default:withCtx(()=>[createVNode(unref(Select),{value:n.value,"onUpdate:value":a[0]||(a[0]=l=>n.value=l),mode:"multiple",style:{width:"40%"},placeholder:"\u8BF7\u9009\u62E9\u7FA4\u804A & \u597D\u53CB",onChange:t},{default:withCtx(()=>[createVNode(unref(SelectOptGroup),{label:"\u7FA4\u804A"},{default:withCtx(()=>[(openBlock(!0),createElementBlock(Fragment,null,renderList(_.value,l=>(openBlock(),createBlock(unref(SelectOption),{value:l.group_id,key:l.group_id},{default:withCtx(()=>[createTextVNode(toDisplayString(l.group_name+" ("+l.group_id+")"),1)]),_:2},1032,["value"]))),128))]),_:1}),createVNode(unref(SelectOptGroup),{label:"\u597D\u53CB"},{default:withCtx(()=>[(openBlock(!0),createElementBlock(Fragment,null,renderList(f.value,l=>(openBlock(),createBlock(unref(SelectOption),{value:-l.user_id,key:l.user_id},{default:withCtx(()=>[createTextVNode(toDisplayString(l.nickname+" ("+l.user_id+")"),1)]),_:2},1032,["value"]))),128))]),_:1})]),_:1},8,["value"])]),_:1})]))}}),BotSwitch=withInstall(_sfc_main$4),MessageSendBox=withInstall(_sfc_main$3),MessageWebsocket=withInstall(_sfc_main$2),LogWebsocket=withInstall(_sfc_main$1),MessageSendSelect=withInstall(_sfc_main);export{BotSwitch as B,LogWebsocket as L,MessageSendBox as M,MessageWebsocket as a};
