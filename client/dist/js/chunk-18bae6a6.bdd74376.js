(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-18bae6a6"],{2532:function(e,t,c){"use strict";var n=c("23e7"),l=c("e330"),o=c("5a34"),a=c("1d80"),r=c("577e"),i=c("ab13"),s=l("".indexOf);n({target:"String",proto:!0,forced:!i("includes")},{includes:function(e){return!!~s(r(a(this)),r(o(e)),arguments.length>1?arguments[1]:void 0)}})},"5a34":function(e,t,c){var n=c("da84"),l=c("44e7"),o=n.TypeError;e.exports=function(e){if(l(e))throw o("The method doesn't accept regular expressions");return e}},"66a5":function(e,t,c){"use strict";c.r(t);var n=c("7a23"),l=c("5da5"),o=c("b85c"),a=(c("b0c0"),c("caad"),c("2532"),c("bc3a")),r=c.n(a),i={class:"mt-3",name:"emails"},s={key:0,class:"mt-2"},u={class:"form row"},m={class:"form-floating col-md-3 col-sm-12"},b=Object(n["createElementVNode"])("label",{for:"floatingInput",class:"small"},"Email",-1),d={class:"form-floating col-md-3 col-sm-12"},O=Object(n["createElementVNode"])("label",{for:"floatingInput",class:"small"},"Name",-1),j={class:"form-floating col-md-3 col-sm-12"},p=Object(n["createElementVNode"])("label",{for:"floatingInput",class:"small"},"Company",-1),f={class:"form-floating col-md-3 col-sm-12"},g=Object(n["createElementVNode"])("label",{for:"floatingInput",class:"small"},"Team",-1),E={class:"mt-2"},h={key:0,class:"me-2"},V=["onUpdate:modelValue"],N={class:"form-check-label"},k={class:"text-center mt-2"},v={key:0,class:"my-2"},y={class:"bg-info px-1"},G=["disabled"],w={key:1,class:"mt-2"},B={class:"table caption-top"},C=Object(n["createElementVNode"])("thead",{class:"text-center"},[Object(n["createElementVNode"])("tr",null,[Object(n["createElementVNode"])("th",null,"#"),Object(n["createElementVNode"])("th",null,"Email"),Object(n["createElementVNode"])("th",null,"Name"),Object(n["createElementVNode"])("th",null,"Company"),Object(n["createElementVNode"])("th",null,"Team"),Object(n["createElementVNode"])("th",null,"Ops")])],-1),S={class:"text-center"},x=["onClick"],D=["onClick","disabled"],I={class:"text-center"},T={key:0,class:"my-2"},M={class:"bg-info px-1"},U={name:"EmailManage",setup:function(e){var t=Object(n["reactive"])({curEmail:{},allGroups:[],showingInputs:!1,allEmails:[],showingEmails:!1,disableSubmit:!1,msg:""});function c(){t.curEmail.orgEmail=null,t.curEmail.orgGroups=[],t.curEmail.email=null,t.curEmail.groups=[],t.msg=null,t.allGroups.length=0,r.a.get("/api/msi/emails/groups").then((function(e){t.allGroups=e.data,t.showingEmails=!1,t.showingInputs=!0})).catch((function(e){console.log(e)}))}function l(){t.msg=null,r.a.get("/api/msi/emails").then((function(e){t.allEmails.length=0,t.allEmails=e.data,t.showingInputs=!1,t.showingEmails=!0})).catch((function(e){console.log("showEmails:",e)}))}function a(){if(t.curEmail.email){t.msg="",t.curEmail.groups.length=0;var e,c=Object(o["a"])(t.allGroups);try{for(c.s();!(e=c.n()).done;){var n=e.value;n.checked&&t.curEmail.groups.push(n.group)}}catch(a){c.e(a)}finally{c.f()}t.disableSubmit=!0,r.a.post("/api/msi/emails",t.curEmail).then((function(e){if(e.data.err)return t.msg=e.data.err,void(t.disableSubmit=!1);t.msg=e.data.msg,setTimeout((function(){t.disableSubmit=!1,t.msg=null,l()}),2e3)})).catch((function(e){console.log(e),t.msg=e,t.disableSubmit=!1}))}else t.msg="Please input email."}function U(e){c(),t.curEmail.orgEmail=e.email,t.curEmail.email=e.email,t.curEmail.name=e.name,t.curEmail.company=e.company,t.curEmail.team=e.team,t.curEmail.role=e.role,r.a.get("/api/msi/emails/groups?email="+e.email).then((function(e){t.curEmail.orgGroups.length=0;var c,n=Object(o["a"])(e.data);try{for(n.s();!(c=n.n()).done;){var l=c.value;t.curEmail.orgGroups.push(l.group)}}catch(s){n.e(s)}finally{n.f()}var a,r=Object(o["a"])(t.allGroups);try{for(r.s();!(a=r.n()).done;){var i=a.value;t.curEmail.orgGroups.includes(i.group)&&(i.checked=!0)}}catch(s){r.e(s)}finally{r.f()}})).catch((function(e){console.log(e)}))}function F(e){t.disableSubmit=!0,r.a.delete("/api/msi/emails/"+e.email).then((function(e){if(e.data.err)return t.msg=e.data.err,void(t.disableSubmit=!1);t.msg="Successful.",t.disableSubmit=!1,l(),setTimeout((function(){t.msg=""}),2e3)})).catch((function(e){console.log(e),t.msg=e.msg,t.disableSubmit=!1}))}return function(e,o){return Object(n["openBlock"])(),Object(n["createElementBlock"])("div",i,[Object(n["createElementVNode"])("div",null,[Object(n["unref"])(t).showingInputs?Object(n["createCommentVNode"])("",!0):(Object(n["openBlock"])(),Object(n["createElementBlock"])("button",{key:0,class:"btn btn-primary btn-sm",onClick:o[0]||(o[0]=function(e){return c()})}," New Email ")),Object(n["unref"])(t).showingEmails?Object(n["createCommentVNode"])("",!0):(Object(n["openBlock"])(),Object(n["createElementBlock"])("button",{key:1,class:"btn btn-primary btn-sm mx-1",onClick:o[1]||(o[1]=function(e){return l()})}," View Emails "))]),Object(n["unref"])(t).showingInputs?(Object(n["openBlock"])(),Object(n["createElementBlock"])("div",s,[Object(n["createElementVNode"])("div",u,[Object(n["createElementVNode"])("div",m,[Object(n["withDirectives"])(Object(n["createElementVNode"])("input",{class:"form-control",placeholder:"email","onUpdate:modelValue":o[2]||(o[2]=function(e){return Object(n["unref"])(t).curEmail.email=e}),required:""},null,512),[[n["vModelText"],Object(n["unref"])(t).curEmail.email,void 0,{trim:!0}]]),b]),Object(n["createElementVNode"])("div",d,[Object(n["withDirectives"])(Object(n["createElementVNode"])("input",{class:"form-control",placeholder:"name","onUpdate:modelValue":o[3]||(o[3]=function(e){return Object(n["unref"])(t).curEmail.name=e})},null,512),[[n["vModelText"],Object(n["unref"])(t).curEmail.name,void 0,{trim:!0}]]),O]),Object(n["createElementVNode"])("div",j,[Object(n["withDirectives"])(Object(n["createElementVNode"])("input",{class:"form-control",placeholder:"company","onUpdate:modelValue":o[4]||(o[4]=function(e){return Object(n["unref"])(t).curEmail.company=e})},null,512),[[n["vModelText"],Object(n["unref"])(t).curEmail.company,void 0,{trim:!0}]]),p]),Object(n["createElementVNode"])("div",f,[Object(n["withDirectives"])(Object(n["createElementVNode"])("input",{class:"form-control",placeholder:"team","onUpdate:modelValue":o[5]||(o[5]=function(e){return Object(n["unref"])(t).curEmail.team=e})},null,512),[[n["vModelText"],Object(n["unref"])(t).curEmail.team,void 0,{trim:!0}]]),g]),Object(n["createElementVNode"])("div",E,[Object(n["unref"])(t).allGroups.length?(Object(n["openBlock"])(),Object(n["createElementBlock"])("label",h," Add to groups: ")):Object(n["createCommentVNode"])("",!0),(Object(n["openBlock"])(!0),Object(n["createElementBlock"])(n["Fragment"],null,Object(n["renderList"])(Object(n["unref"])(t).allGroups,(function(e){return Object(n["openBlock"])(),Object(n["createElementBlock"])("div",{class:"form-check form-check-inline",key:e.group},[Object(n["withDirectives"])(Object(n["createElementVNode"])("input",{class:"form-check-input","onUpdate:modelValue":function(t){return e.checked=t},type:"checkbox",value:""},null,8,V),[[n["vModelCheckbox"],e.checked]]),Object(n["createElementVNode"])("label",N,Object(n["toDisplayString"])(e.group),1)])})),128))]),Object(n["createElementVNode"])("div",k,[Object(n["unref"])(t).msg?(Object(n["openBlock"])(),Object(n["createElementBlock"])("div",v,[Object(n["createElementVNode"])("label",y,Object(n["toDisplayString"])(Object(n["unref"])(t).msg),1)])):Object(n["createCommentVNode"])("",!0),Object(n["createElementVNode"])("button",{class:"btn btn-success btn-sm",onClick:o[6]||(o[6]=function(e){return a()}),disabled:Object(n["unref"])(t).disableSubmit}," Confirm ",8,G),Object(n["createElementVNode"])("button",{class:"btn btn-success btn-sm mx-1",onClick:o[7]||(o[7]=function(e){return Object(n["unref"])(t).showingInputs=!1})}," Cancel ")])])])):Object(n["createCommentVNode"])("",!0),Object(n["unref"])(t).showingEmails?(Object(n["openBlock"])(),Object(n["createElementBlock"])("div",w,[Object(n["createElementVNode"])("table",B,[C,Object(n["createElementVNode"])("tbody",S,[(Object(n["openBlock"])(!0),Object(n["createElementBlock"])(n["Fragment"],null,Object(n["renderList"])(Object(n["unref"])(t).allEmails,(function(e,c){return Object(n["openBlock"])(),Object(n["createElementBlock"])("tr",{key:c},[Object(n["createElementVNode"])("td",null,Object(n["toDisplayString"])(c+1),1),Object(n["createElementVNode"])("td",null,Object(n["toDisplayString"])(e.email),1),Object(n["createElementVNode"])("td",null,Object(n["toDisplayString"])(e.name),1),Object(n["createElementVNode"])("td",null,Object(n["toDisplayString"])(e.company),1),Object(n["createElementVNode"])("td",null,Object(n["toDisplayString"])(e.team),1),Object(n["createElementVNode"])("td",null,[Object(n["createElementVNode"])("button",{class:"btn btn-light btn-sm",onClick:function(t){return U(e)}}," Edit ",8,x),Object(n["createElementVNode"])("button",{class:"btn btn-light btn-sm mx-1",onClick:function(t){return F(e)},disabled:Object(n["unref"])(t).disableSubmit}," Delete ",8,D)])])})),128))])]),Object(n["createElementVNode"])("div",I,[Object(n["unref"])(t).msg?(Object(n["openBlock"])(),Object(n["createElementBlock"])("div",T,[Object(n["createElementVNode"])("label",M,Object(n["toDisplayString"])(Object(n["unref"])(t).msg),1)])):Object(n["createCommentVNode"])("",!0),Object(n["createElementVNode"])("button",{class:"btn btn-success btn-sm mx-1",onClick:o[8]||(o[8]=function(e){return Object(n["unref"])(t).showingEmails=!1})}," Close ")])])):Object(n["createCommentVNode"])("",!0)])}}};const F=U;var L=F,q={class:"mt-3",name:"emails"},A={key:0,class:"mt-2"},J={class:"form"},P={class:"form-floating"},z=Object(n["createElementVNode"])("label",{for:"floatingInput",class:"small"},"Group name",-1),H={class:"table caption-top"},K=Object(n["createElementVNode"])("thead",{class:"text-center"},[Object(n["createElementVNode"])("tr",null,[Object(n["createElementVNode"])("th",null,"#"),Object(n["createElementVNode"])("th",null,"Email"),Object(n["createElementVNode"])("th",null,"Name"),Object(n["createElementVNode"])("th",null,"Team"),Object(n["createElementVNode"])("th",null,"Include")])],-1),Q={class:"text-center"},R={class:"form-check"},W=["onUpdate:modelValue"],X={class:"text-center mt-2"},Y={key:0,class:"my-2"},Z={class:"bg-info px-1"},$=["disable"],_={key:1,class:"mt-2"},ee={class:"form"},te={class:"table caption-top"},ce=Object(n["createElementVNode"])("thead",{class:"text-center"},[Object(n["createElementVNode"])("tr",null,[Object(n["createElementVNode"])("th",null,"#"),Object(n["createElementVNode"])("th",null,"Group"),Object(n["createElementVNode"])("th",null,"Ops")])],-1),ne={class:"text-center"},le=["onClick"],oe=["onClick","disabled"],ae={class:"text-center mt-2"},re={name:"EmailGroupManage",setup:function(e){var t=Object(n["reactive"])({disableSubmit:!1,curGroup:{group:null,emails:[],orgGroup:null,orgEmails:[]},msg:null,allEmails:[],showingGroupInputs:!1,allGroups:[],showingViewGroups:!1});function c(){if(t.curGroup.group){t.msg="",t.curGroup.emails.length=0;var e,c=Object(o["a"])(t.allEmails);try{for(c.s();!(e=c.n()).done;){var n=e.value;n.checked&&t.curGroup.emails.push(n.email)}}catch(l){c.e(l)}finally{c.f()}t.disableSubmit=!0,r.a.post("/api/msi/emails/group",t.curGroup).then((function(e){if(e.data.err)return t.msg=e.data.err,void(t.disableSubmit=!1);t.msg=e.data.msg,setTimeout((function(){t.disableSubmit=!1,t.msg=null,a()}),2e3)})).catch((function(e){t.msg=e,console.log(e),t.disableSubmit=!1}))}else t.msg="Please input group name."}function l(){t.curGroup.orgGroup=null,t.curGroup.orgEmails=[],t.curGroup.group=null,t.curGroup.emails=[],t.msg=null,t.allEmails.length=0,r.a.get("/api/msi/emails").then((function(e){t.allEmails=e.data,t.showingViewGroups=!1,t.showingGroupInputs=!0})).catch((function(e){console.log(e)}))}function a(){r.a.get("/api/msi/emails/groups").then((function(e){t.allGroups.length=0,t.allGroups=e.data,t.showingGroupInputs=!1,t.showingViewGroups=!0})).catch((function(e){console.log(e)}))}function i(e){l(),t.curGroup.orgGroup=e.group,t.curGroup.group=e.group,r.a.get("/api/msi/emails/groups?group="+e.group).then((function(e){t.curGroup.orgEmails.length=0;var c,n=Object(o["a"])(e.data);try{for(n.s();!(c=n.n()).done;){var l=c.value;t.curGroup.orgEmails.push(l.email)}}catch(s){n.e(s)}finally{n.f()}var a,r=Object(o["a"])(t.allEmails);try{for(r.s();!(a=r.n()).done;){var i=a.value;t.curGroup.orgEmails.includes(i.email)&&(i.checked=!0)}}catch(s){r.e(s)}finally{r.f()}})).catch((function(e){console.log(e)}))}function s(e){t.disableSubmit=!0,r.a.delete("/api/msi/emails/groups/"+e.group).then((function(e){if(e.data.err)return t.msg=e.data.err,void(t.disableSubmit=!1);t.msg="Successful.",t.disableSubmit=!1,a(),setTimeout((function(){t.msg=""}),2e3)})).catch((function(e){console.log(e),t.msg=e.msg,t.disableSubmit=!1}))}return function(e,o){return Object(n["openBlock"])(),Object(n["createElementBlock"])("div",q,[Object(n["createElementVNode"])("div",null,[Object(n["unref"])(t).showingGroupInputs?Object(n["createCommentVNode"])("",!0):(Object(n["openBlock"])(),Object(n["createElementBlock"])("button",{key:0,class:"btn btn-primary btn-sm",onClick:o[0]||(o[0]=function(e){return l()})}," New Email Group ")),Object(n["unref"])(t).showingViewGroups?Object(n["createCommentVNode"])("",!0):(Object(n["openBlock"])(),Object(n["createElementBlock"])("button",{key:1,class:"btn btn-primary btn-sm mx-1",onClick:o[1]||(o[1]=function(e){return a()})}," View Email Groups "))]),Object(n["unref"])(t).showingGroupInputs?(Object(n["openBlock"])(),Object(n["createElementBlock"])("div",A,[Object(n["createElementVNode"])("div",J,[Object(n["createElementVNode"])("div",P,[Object(n["withDirectives"])(Object(n["createElementVNode"])("input",{class:"form-control col-auto",placeholder:"group name","onUpdate:modelValue":o[2]||(o[2]=function(e){return Object(n["unref"])(t).curGroup.group=e}),required:""},null,512),[[n["vModelText"],Object(n["unref"])(t).curGroup.group,void 0,{trim:!0}]]),z]),Object(n["createElementVNode"])("table",H,[K,Object(n["createElementVNode"])("tbody",Q,[(Object(n["openBlock"])(!0),Object(n["createElementBlock"])(n["Fragment"],null,Object(n["renderList"])(Object(n["unref"])(t).allEmails,(function(e,t){return Object(n["openBlock"])(),Object(n["createElementBlock"])("tr",{key:e.email},[Object(n["createElementVNode"])("td",null,Object(n["toDisplayString"])(t+1),1),Object(n["createElementVNode"])("td",null,Object(n["toDisplayString"])(e.email),1),Object(n["createElementVNode"])("td",null,Object(n["toDisplayString"])(e.name),1),Object(n["createElementVNode"])("td",null,Object(n["toDisplayString"])(e.team),1),Object(n["createElementVNode"])("td",null,[Object(n["createElementVNode"])("div",R,[Object(n["withDirectives"])(Object(n["createElementVNode"])("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":function(t){return e.checked=t},value:""},null,8,W),[[n["vModelCheckbox"],e.checked]])])])])})),128))])]),Object(n["createElementVNode"])("div",X,[Object(n["unref"])(t).msg?(Object(n["openBlock"])(),Object(n["createElementBlock"])("div",Y,[Object(n["createElementVNode"])("label",Z,Object(n["toDisplayString"])(Object(n["unref"])(t).msg),1)])):Object(n["createCommentVNode"])("",!0),Object(n["createElementVNode"])("button",{class:"btn btn-success btn-sm",onClick:o[3]||(o[3]=function(e){return c()}),disable:Object(n["unref"])(t).disableSubmit}," Confirm ",8,$),Object(n["createElementVNode"])("button",{class:"btn btn-success btn-sm mx-1",onClick:o[4]||(o[4]=function(e){return Object(n["unref"])(t).showingGroupInputs=!1})}," Cancel ")])])])):Object(n["createCommentVNode"])("",!0),Object(n["unref"])(t).showingViewGroups?(Object(n["openBlock"])(),Object(n["createElementBlock"])("div",_,[Object(n["createElementVNode"])("div",ee,[Object(n["createElementVNode"])("table",te,[ce,Object(n["createElementVNode"])("tbody",ne,[(Object(n["openBlock"])(!0),Object(n["createElementBlock"])(n["Fragment"],null,Object(n["renderList"])(Object(n["unref"])(t).allGroups,(function(e,c){return Object(n["openBlock"])(),Object(n["createElementBlock"])("tr",{key:c},[Object(n["createElementVNode"])("td",null,Object(n["toDisplayString"])(c+1),1),Object(n["createElementVNode"])("td",null,Object(n["toDisplayString"])(e.group),1),Object(n["createElementVNode"])("td",null,[Object(n["createElementVNode"])("button",{class:"btn btn-light btn-sm",onClick:function(t){return i(e)}}," Edit ",8,le),Object(n["createElementVNode"])("button",{class:"btn btn-light btn-sm mx-1",onClick:function(t){return s(e)},disabled:Object(n["unref"])(t).disableSubmit}," Delete ",8,oe)])])})),128))])]),Object(n["createElementVNode"])("div",ae,[Object(n["createElementVNode"])("button",{class:"btn btn-success btn-sm",onClick:o[5]||(o[5]=function(e){return Object(n["unref"])(t).showingViewGroups=!1})}," Close ")])])])):Object(n["createCommentVNode"])("",!0)])}}};const ie=re;var se=ie,ue=c("a9d6"),me=c("a18c"),be={class:"container"},de=Object(n["createElementVNode"])("h4",{class:"my-4"},"Email Address Management",-1),Oe=Object(n["createElementVNode"])("hr",{class:"border-1 my-5"},null,-1),je={name:"EmailManagement",setup:function(e){return document.title="Email Management",Object(n["onBeforeMount"])((function(){Object(ue["c"])()||me["a"].push("/login")})),function(e,t){return Object(n["openBlock"])(),Object(n["createElementBlock"])(n["Fragment"],null,[Object(n["createVNode"])(l["a"]),Object(n["createElementVNode"])("div",be,[de,Object(n["createVNode"])(L),Oe,Object(n["createVNode"])(se)])],64)}}};const pe=je;t["default"]=pe},ab13:function(e,t,c){var n=c("b622"),l=n("match");e.exports=function(e){var t=/./;try{"/./"[e](t)}catch(c){try{return t[l]=!1,"/./"[e](t)}catch(n){}}return!1}}}]);
//# sourceMappingURL=chunk-18bae6a6.bdd74376.js.map