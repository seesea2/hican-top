(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-18bae6a6"],{2532:function(e,t,c){"use strict";var l=c("23e7"),n=c("e330"),o=c("5a34"),a=c("1d80"),r=c("577e"),i=c("ab13"),u=n("".indexOf);l({target:"String",proto:!0,forced:!i("includes")},{includes:function(e){return!!~u(r(a(this)),r(o(e)),arguments.length>1?arguments[1]:void 0)}})},"5a34":function(e,t,c){var l=c("da84"),n=c("44e7"),o=l.TypeError;e.exports=function(e){if(n(e))throw o("The method doesn't accept regular expressions");return e}},"66a5":function(e,t,c){"use strict";c.r(t);var l=c("7a23"),n=c("5da5"),o=c("b85c"),a=(c("d3b7"),c("b0c0"),c("caad"),c("2532"),c("bc3a")),r=c.n(a),i={class:"mt-3",name:"emails"},u={key:0,class:"mt-2"},s={class:"form row"},m={class:"form-floating col-md-3 col-sm-12"},b=Object(l["createElementVNode"])("label",{for:"floatingInput",class:"small"},"Email",-1),d={class:"form-floating col-md-3 col-sm-12"},O=Object(l["createElementVNode"])("label",{for:"floatingInput",class:"small"},"Name",-1),j={class:"form-floating col-md-3 col-sm-12"},p=Object(l["createElementVNode"])("label",{for:"floatingInput",class:"small"},"Company",-1),f={class:"form-floating col-md-3 col-sm-12"},g=Object(l["createElementVNode"])("label",{for:"floatingInput",class:"small"},"Team",-1),E={class:"mt-2"},h={key:0,class:"me-2"},V=["onUpdate:modelValue"],N={class:"form-check-label"},k={class:"text-center mt-2"},v={key:0,class:"my-2"},y={class:"bg-info px-1"},G=["disabled"],w={key:1,class:"mt-2"},B={class:"table caption-top"},C=Object(l["createElementVNode"])("thead",{class:"text-center"},[Object(l["createElementVNode"])("tr",null,[Object(l["createElementVNode"])("th",null,"#"),Object(l["createElementVNode"])("th",null,"Email"),Object(l["createElementVNode"])("th",null,"Name"),Object(l["createElementVNode"])("th",null,"Company"),Object(l["createElementVNode"])("th",null,"Team"),Object(l["createElementVNode"])("th",null,"Ops")])],-1),S={class:"text-center"},x=["onClick"],D=["onClick","disabled"],I={class:"text-center"},T={key:0,class:"my-2"},M={class:"bg-info px-1"},U={name:"EmailManage",setup:function(e){var t=Object(l["reactive"])({curEmail:{},allGroups:[],showingInputs:!1,allEmails:[],showingEmails:!1,disableSubmit:!1,msg:""});function c(){t.curEmail.orgEmail=null,t.curEmail.orgGroups=[],t.curEmail.email=null,t.curEmail.groups=[],t.msg=null,t.allGroups.length=0,r.a.get("/api/msi/emails/groups").then((function(e){t.allGroups=e.data,t.showingEmails=!1,t.showingInputs=!0})).catch((function(e){console.log(e)}))}function n(){t.msg=null,r.a.get("/api/msi/emails").then((function(e){t.allEmails.length=0,t.allEmails=e.data,t.showingInputs=!1,t.showingEmails=!0})).catch((function(e){console.log("showEmails:",e)}))}function a(){if(t.curEmail.email){t.msg="",t.curEmail.groups.length=0;var e,c=Object(o["a"])(t.allGroups);try{for(c.s();!(e=c.n()).done;){var l=e.value;l.checked&&t.curEmail.groups.push(l.group)}}catch(a){c.e(a)}finally{c.f()}t.disableSubmit=!0,r.a.post("/api/msi/emails",t.curEmail).then((function(e){if(e.data.err)return t.msg=e.data.err,void(t.disableSubmit=!1);t.msg=e.data.msg,setTimeout((function(){t.disableSubmit=!1,t.msg=null,n()}),2e3)})).catch((function(e){console.log(e),t.msg=e})).finally((function(){t.disableSubmit=!1}))}else t.msg="Please input email."}function U(e){c(),t.curEmail.orgEmail=e.email,t.curEmail.email=e.email,t.curEmail.name=e.name,t.curEmail.company=e.company,t.curEmail.team=e.team,t.curEmail.role=e.role,r.a.get("/api/msi/emails/groups?email="+e.email).then((function(e){t.curEmail.orgGroups.length=0;var c,l=Object(o["a"])(e.data);try{for(l.s();!(c=l.n()).done;){var n=c.value;t.curEmail.orgGroups.push(n.group)}}catch(u){l.e(u)}finally{l.f()}var a,r=Object(o["a"])(t.allGroups);try{for(r.s();!(a=r.n()).done;){var i=a.value;t.curEmail.orgGroups.includes(i.group)&&(i.checked=!0)}}catch(u){r.e(u)}finally{r.f()}})).catch((function(e){console.log(e)}))}function F(e){t.disableSubmit=!0,r.a.delete("/api/msi/emails/"+e.email).then((function(e){if(e.data.err)return t.msg=e.data.err,void(t.disableSubmit=!1);t.msg="Successful.",n(),setTimeout((function(){t.msg=""}),2e3)})).catch((function(e){console.log(e),t.msg=e.msg})).finally((function(){t.disableSubmit=!1}))}return function(e,o){return Object(l["openBlock"])(),Object(l["createElementBlock"])("div",i,[Object(l["createElementVNode"])("div",null,[Object(l["unref"])(t).showingInputs?Object(l["createCommentVNode"])("",!0):(Object(l["openBlock"])(),Object(l["createElementBlock"])("button",{key:0,class:"btn btn-primary",onClick:o[0]||(o[0]=function(e){return c()})}," New Email ")),Object(l["unref"])(t).showingEmails?Object(l["createCommentVNode"])("",!0):(Object(l["openBlock"])(),Object(l["createElementBlock"])("button",{key:1,class:"btn btn-primary mx-1",onClick:o[1]||(o[1]=function(e){return n()})}," View Emails "))]),Object(l["unref"])(t).showingInputs?(Object(l["openBlock"])(),Object(l["createElementBlock"])("div",u,[Object(l["createElementVNode"])("div",s,[Object(l["createElementVNode"])("div",m,[Object(l["withDirectives"])(Object(l["createElementVNode"])("input",{class:"form-control",placeholder:"email","onUpdate:modelValue":o[2]||(o[2]=function(e){return Object(l["unref"])(t).curEmail.email=e}),required:""},null,512),[[l["vModelText"],Object(l["unref"])(t).curEmail.email,void 0,{trim:!0}]]),b]),Object(l["createElementVNode"])("div",d,[Object(l["withDirectives"])(Object(l["createElementVNode"])("input",{class:"form-control",placeholder:"name","onUpdate:modelValue":o[3]||(o[3]=function(e){return Object(l["unref"])(t).curEmail.name=e})},null,512),[[l["vModelText"],Object(l["unref"])(t).curEmail.name,void 0,{trim:!0}]]),O]),Object(l["createElementVNode"])("div",j,[Object(l["withDirectives"])(Object(l["createElementVNode"])("input",{class:"form-control",placeholder:"company","onUpdate:modelValue":o[4]||(o[4]=function(e){return Object(l["unref"])(t).curEmail.company=e})},null,512),[[l["vModelText"],Object(l["unref"])(t).curEmail.company,void 0,{trim:!0}]]),p]),Object(l["createElementVNode"])("div",f,[Object(l["withDirectives"])(Object(l["createElementVNode"])("input",{class:"form-control",placeholder:"team","onUpdate:modelValue":o[5]||(o[5]=function(e){return Object(l["unref"])(t).curEmail.team=e})},null,512),[[l["vModelText"],Object(l["unref"])(t).curEmail.team,void 0,{trim:!0}]]),g]),Object(l["createElementVNode"])("div",E,[Object(l["unref"])(t).allGroups.length?(Object(l["openBlock"])(),Object(l["createElementBlock"])("label",h," Add to groups: ")):Object(l["createCommentVNode"])("",!0),(Object(l["openBlock"])(!0),Object(l["createElementBlock"])(l["Fragment"],null,Object(l["renderList"])(Object(l["unref"])(t).allGroups,(function(e){return Object(l["openBlock"])(),Object(l["createElementBlock"])("div",{class:"form-check form-check-inline",key:e.group},[Object(l["withDirectives"])(Object(l["createElementVNode"])("input",{class:"form-check-input","onUpdate:modelValue":function(t){return e.checked=t},type:"checkbox",value:""},null,8,V),[[l["vModelCheckbox"],e.checked]]),Object(l["createElementVNode"])("label",N,Object(l["toDisplayString"])(e.group),1)])})),128))]),Object(l["createElementVNode"])("div",k,[Object(l["unref"])(t).msg?(Object(l["openBlock"])(),Object(l["createElementBlock"])("div",v,[Object(l["createElementVNode"])("label",y,Object(l["toDisplayString"])(Object(l["unref"])(t).msg),1)])):Object(l["createCommentVNode"])("",!0),Object(l["createElementVNode"])("button",{class:"btn btn-success",onClick:o[6]||(o[6]=function(e){return a()}),disabled:Object(l["unref"])(t).disableSubmit}," Confirm ",8,G),Object(l["createElementVNode"])("button",{class:"btn btn-success mx-1",onClick:o[7]||(o[7]=function(e){return Object(l["unref"])(t).showingInputs=!1})}," Cancel ")])])])):Object(l["createCommentVNode"])("",!0),Object(l["unref"])(t).showingEmails?(Object(l["openBlock"])(),Object(l["createElementBlock"])("div",w,[Object(l["createElementVNode"])("table",B,[C,Object(l["createElementVNode"])("tbody",S,[(Object(l["openBlock"])(!0),Object(l["createElementBlock"])(l["Fragment"],null,Object(l["renderList"])(Object(l["unref"])(t).allEmails,(function(e,c){return Object(l["openBlock"])(),Object(l["createElementBlock"])("tr",{key:c},[Object(l["createElementVNode"])("td",null,Object(l["toDisplayString"])(c+1),1),Object(l["createElementVNode"])("td",null,Object(l["toDisplayString"])(e.email),1),Object(l["createElementVNode"])("td",null,Object(l["toDisplayString"])(e.name),1),Object(l["createElementVNode"])("td",null,Object(l["toDisplayString"])(e.company),1),Object(l["createElementVNode"])("td",null,Object(l["toDisplayString"])(e.team),1),Object(l["createElementVNode"])("td",null,[Object(l["createElementVNode"])("button",{class:"btn btn-light btn-small",onClick:function(t){return U(e)}}," Edit ",8,x),Object(l["createElementVNode"])("button",{class:"btn btn-light btn-small mx-1",onClick:function(t){return F(e)},disabled:Object(l["unref"])(t).disableSubmit}," Delete ",8,D)])])})),128))])]),Object(l["createElementVNode"])("div",I,[Object(l["unref"])(t).msg?(Object(l["openBlock"])(),Object(l["createElementBlock"])("div",T,[Object(l["createElementVNode"])("label",M,Object(l["toDisplayString"])(Object(l["unref"])(t).msg),1)])):Object(l["createCommentVNode"])("",!0),Object(l["createElementVNode"])("button",{class:"btn btn-success mx-1",onClick:o[8]||(o[8]=function(e){return Object(l["unref"])(t).showingEmails=!1})}," Close ")])])):Object(l["createCommentVNode"])("",!0)])}}};const F=U;var L=F,q={class:"mt-3",name:"emails"},A={key:0,class:"mt-2"},J={class:"form"},P={class:"form-floating"},z=Object(l["createElementVNode"])("label",{for:"floatingInput",class:"small"},"Group name",-1),H={class:"table caption-top"},K=Object(l["createElementVNode"])("thead",{class:"text-center"},[Object(l["createElementVNode"])("tr",null,[Object(l["createElementVNode"])("th",null,"#"),Object(l["createElementVNode"])("th",null,"Email"),Object(l["createElementVNode"])("th",null,"Name"),Object(l["createElementVNode"])("th",null,"Team"),Object(l["createElementVNode"])("th",null,"Include")])],-1),Q={class:"text-center"},R={class:"form-check"},W=["onUpdate:modelValue"],X={class:"text-center mt-2"},Y={key:0,class:"my-2"},Z={class:"bg-info px-1"},$=["disable"],_={key:1,class:"mt-2"},ee={class:"form"},te={class:"table caption-top"},ce=Object(l["createElementVNode"])("thead",{class:"text-center"},[Object(l["createElementVNode"])("tr",null,[Object(l["createElementVNode"])("th",null,"#"),Object(l["createElementVNode"])("th",null,"Group"),Object(l["createElementVNode"])("th",null,"Ops")])],-1),le={class:"text-center"},ne=["onClick"],oe=["onClick","disabled"],ae={class:"text-center mt-2"},re={name:"EmailGroupManage",setup:function(e){var t=Object(l["reactive"])({disableSubmit:!1,curGroup:{group:null,emails:[],orgGroup:null,orgEmails:[]},msg:null,allEmails:[],showingGroupInputs:!1,allGroups:[],showingViewGroups:!1});function c(){if(t.curGroup.group){t.msg="",t.curGroup.emails.length=0;var e,c=Object(o["a"])(t.allEmails);try{for(c.s();!(e=c.n()).done;){var l=e.value;l.checked&&t.curGroup.emails.push(l.email)}}catch(n){c.e(n)}finally{c.f()}t.disableSubmit=!0,r.a.post("/api/msi/emails/group",t.curGroup).then((function(e){if(e.data.err)return t.msg=e.data.err,void(t.disableSubmit=!1);t.msg=e.data.msg,setTimeout((function(){t.disableSubmit=!1,t.msg=null,a()}),2e3)})).catch((function(e){t.msg=e,console.log(e)})).finally((function(){t.disableSubmit=!1}))}else t.msg="Please input group name."}function n(){t.curGroup.orgGroup=null,t.curGroup.orgEmails=[],t.curGroup.group=null,t.curGroup.emails=[],t.msg=null,t.allEmails.length=0,r.a.get("/api/msi/emails").then((function(e){t.allEmails=e.data,t.showingViewGroups=!1,t.showingGroupInputs=!0})).catch((function(e){console.log(e)}))}function a(){r.a.get("/api/msi/emails/groups").then((function(e){t.allGroups.length=0,t.allGroups=e.data,t.showingGroupInputs=!1,t.showingViewGroups=!0})).catch((function(e){console.log(e)}))}function i(e){n(),t.curGroup.orgGroup=e.group,t.curGroup.group=e.group,r.a.get("/api/msi/emails/groups?group="+e.group).then((function(e){t.curGroup.orgEmails.length=0;var c,l=Object(o["a"])(e.data);try{for(l.s();!(c=l.n()).done;){var n=c.value;t.curGroup.orgEmails.push(n.email)}}catch(u){l.e(u)}finally{l.f()}var a,r=Object(o["a"])(t.allEmails);try{for(r.s();!(a=r.n()).done;){var i=a.value;t.curGroup.orgEmails.includes(i.email)&&(i.checked=!0)}}catch(u){r.e(u)}finally{r.f()}})).catch((function(e){console.log(e)}))}function u(e){t.disableSubmit=!0,r.a.delete("/api/msi/emails/groups/"+e.group).then((function(e){if(e.data.err)return t.msg=e.data.err,void(t.disableSubmit=!1);t.msg="Successful.",a(),setTimeout((function(){t.msg=""}),2e3)})).catch((function(e){console.log(e),t.msg=e.msg})).finally((function(){t.disableSubmit=!1}))}return function(e,o){return Object(l["openBlock"])(),Object(l["createElementBlock"])("div",q,[Object(l["createElementVNode"])("div",null,[Object(l["unref"])(t).showingGroupInputs?Object(l["createCommentVNode"])("",!0):(Object(l["openBlock"])(),Object(l["createElementBlock"])("button",{key:0,class:"btn btn-primary",onClick:o[0]||(o[0]=function(e){return n()})}," New Email Group ")),Object(l["unref"])(t).showingViewGroups?Object(l["createCommentVNode"])("",!0):(Object(l["openBlock"])(),Object(l["createElementBlock"])("button",{key:1,class:"btn btn-primary mx-1",onClick:o[1]||(o[1]=function(e){return a()})}," View Email Groups "))]),Object(l["unref"])(t).showingGroupInputs?(Object(l["openBlock"])(),Object(l["createElementBlock"])("div",A,[Object(l["createElementVNode"])("div",J,[Object(l["createElementVNode"])("div",P,[Object(l["withDirectives"])(Object(l["createElementVNode"])("input",{class:"form-control col-auto",placeholder:"group name","onUpdate:modelValue":o[2]||(o[2]=function(e){return Object(l["unref"])(t).curGroup.group=e}),required:""},null,512),[[l["vModelText"],Object(l["unref"])(t).curGroup.group,void 0,{trim:!0}]]),z]),Object(l["createElementVNode"])("table",H,[K,Object(l["createElementVNode"])("tbody",Q,[(Object(l["openBlock"])(!0),Object(l["createElementBlock"])(l["Fragment"],null,Object(l["renderList"])(Object(l["unref"])(t).allEmails,(function(e,t){return Object(l["openBlock"])(),Object(l["createElementBlock"])("tr",{key:e.email},[Object(l["createElementVNode"])("td",null,Object(l["toDisplayString"])(t+1),1),Object(l["createElementVNode"])("td",null,Object(l["toDisplayString"])(e.email),1),Object(l["createElementVNode"])("td",null,Object(l["toDisplayString"])(e.name),1),Object(l["createElementVNode"])("td",null,Object(l["toDisplayString"])(e.team),1),Object(l["createElementVNode"])("td",null,[Object(l["createElementVNode"])("div",R,[Object(l["withDirectives"])(Object(l["createElementVNode"])("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":function(t){return e.checked=t},value:""},null,8,W),[[l["vModelCheckbox"],e.checked]])])])])})),128))])]),Object(l["createElementVNode"])("div",X,[Object(l["unref"])(t).msg?(Object(l["openBlock"])(),Object(l["createElementBlock"])("div",Y,[Object(l["createElementVNode"])("label",Z,Object(l["toDisplayString"])(Object(l["unref"])(t).msg),1)])):Object(l["createCommentVNode"])("",!0),Object(l["createElementVNode"])("button",{class:"btn btn-success",onClick:o[3]||(o[3]=function(e){return c()}),disable:Object(l["unref"])(t).disableSubmit}," Confirm ",8,$),Object(l["createElementVNode"])("button",{class:"btn btn-success mx-1",onClick:o[4]||(o[4]=function(e){return Object(l["unref"])(t).showingGroupInputs=!1})}," Cancel ")])])])):Object(l["createCommentVNode"])("",!0),Object(l["unref"])(t).showingViewGroups?(Object(l["openBlock"])(),Object(l["createElementBlock"])("div",_,[Object(l["createElementVNode"])("div",ee,[Object(l["createElementVNode"])("table",te,[ce,Object(l["createElementVNode"])("tbody",le,[(Object(l["openBlock"])(!0),Object(l["createElementBlock"])(l["Fragment"],null,Object(l["renderList"])(Object(l["unref"])(t).allGroups,(function(e,c){return Object(l["openBlock"])(),Object(l["createElementBlock"])("tr",{key:c},[Object(l["createElementVNode"])("td",null,Object(l["toDisplayString"])(c+1),1),Object(l["createElementVNode"])("td",null,Object(l["toDisplayString"])(e.group),1),Object(l["createElementVNode"])("td",null,[Object(l["createElementVNode"])("button",{class:"btn btn-light btn-small",onClick:function(t){return i(e)}}," Edit ",8,ne),Object(l["createElementVNode"])("button",{class:"btn btn-light btn-small mx-1",onClick:function(t){return u(e)},disabled:Object(l["unref"])(t).disableSubmit}," Delete ",8,oe)])])})),128))])]),Object(l["createElementVNode"])("div",ae,[Object(l["createElementVNode"])("button",{class:"btn btn-success",onClick:o[5]||(o[5]=function(e){return Object(l["unref"])(t).showingViewGroups=!1})}," Close ")])])])):Object(l["createCommentVNode"])("",!0)])}}};const ie=re;var ue=ie,se=c("a9d6"),me=c("a18c"),be={class:"container"},de=Object(l["createElementVNode"])("h4",{class:"my-4"},"Email Address Management",-1),Oe=Object(l["createElementVNode"])("hr",{class:"border-1 my-5"},null,-1),je={name:"EmailManagement",setup:function(e){return document.title="Email Management",Object(l["onBeforeMount"])((function(){Object(se["c"])()||me["a"].push("/login")})),function(e,t){return Object(l["openBlock"])(),Object(l["createElementBlock"])(l["Fragment"],null,[Object(l["createVNode"])(n["a"]),Object(l["createElementVNode"])("div",be,[de,Object(l["createVNode"])(L),Oe,Object(l["createVNode"])(ue)])],64)}}};const pe=je;t["default"]=pe},ab13:function(e,t,c){var l=c("b622"),n=l("match");e.exports=function(e){var t=/./;try{"/./"[e](t)}catch(c){try{return t[n]=!1,"/./"[e](t)}catch(l){}}return!1}}}]);
//# sourceMappingURL=chunk-18bae6a6.014a62de.js.map