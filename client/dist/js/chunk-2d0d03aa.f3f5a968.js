(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0d03aa"],{"66a5":function(e,t,c){"use strict";c.r(t);var l=c("7a23"),n=c("5da5"),a=c("b85c"),o=(c("b0c0"),c("bc3a")),r=c.n(o),i={class:"mt-3",name:"emails"},s={key:0,class:"mt-2"},m={class:"form row"},u={class:"form-floating col-3"},b=Object(l["createElementVNode"])("label",{for:"floatingInput",class:"small"},"Email",-1),d={class:"form-floating col-3"},O=Object(l["createElementVNode"])("label",{for:"floatingInput",class:"small"},"Name",-1),j={class:"form-floating col-3"},p=Object(l["createElementVNode"])("label",{for:"floatingInput",class:"small"},"Company",-1),E={class:"form-floating col-3"},f=Object(l["createElementVNode"])("label",{for:"floatingInput",class:"small"},"Team",-1),g={class:"mt-2"},V=Object(l["createElementVNode"])("label",{class:"me-2"},"Add to groups:",-1),N=["onUpdate:modelValue"],h={class:"form-check-label"},k={class:"text-center mt-2"},v={key:0,class:"my-2"},y={class:"bg-info px-1"},w=["disabled"],B={key:1,class:"mt-2"},C={class:"table caption-top"},S=Object(l["createElementVNode"])("thead",{class:"text-center"},[Object(l["createElementVNode"])("tr",null,[Object(l["createElementVNode"])("th",null,"#"),Object(l["createElementVNode"])("th",null,"Email"),Object(l["createElementVNode"])("th",null,"Name"),Object(l["createElementVNode"])("th",null,"Team"),Object(l["createElementVNode"])("th",null,"Ops")])],-1),x={class:"text-center"},D=Object(l["createElementVNode"])("button",{class:"btn btn-small"},"Edit",-1),I=["onClick","disabled"],M={class:"text-center"},T={key:0,class:"my-2"},G={class:"bg-info px-1"},U={name:"EmailManage",setup:function(e){var t=Object(l["reactive"])({curEmail:{},groups:[],showingInputs:!1,allEmails:[],showingEmails:!1,disableSubmit:!1,msg:""});function c(){r.a.get("/api/msi/emails/groups").then((function(e){t.groups=e.data,console.log(e.groups),t.showingInputs=!0,t.showingEmails=!1}))}function n(){r.a.get("/api/msi/emails").then((function(e){t.allEmails=e.data,t.showingInputs=!1,t.showingEmails=!0})).catch((function(e){console.log("showEmails:",e)}))}function o(){if(console.log(t.curEmail),t.curEmail.email){t.curEmail.groups=[];var e,c=Object(a["a"])(t.groups);try{for(c.s();!(e=c.n()).done;){var l=e.value;l.checked&&t.curEmail.groups.push(l.group)}}catch(n){c.e(n)}finally{c.f()}console.log("add email: ",t.curEmail),t.disableSubmit=!0,r.a.post("/api/msi/emails",t.curEmail).then((function(e){if(console.log(e),e.data.err)return t.msg=e.data.err,void(t.disableSubmit=!1);t.msg="Successful.",setTimeout((function(){t.disableSubmit=!1,t.showingInputs=!1}),2e3)})).catch((function(e){console.log(e),t.msg=e.msg,t.disableSubmit=!1}))}else t.msg="Please input email."}function U(e){t.disableSubmit=!0,r.a.delete("/api/msi/emails/"+e.email).then((function(e){if(console.log(e),e.data.err)return t.msg=e.data.err,void(t.disableSubmit=!1);t.msg="Successful.",n(),setTimeout((function(){t.disableSubmit=!1,t.msg=""}),2e3)})).catch((function(e){console.log(e),t.msg=e.msg,t.disableSubmit=!1}))}return function(e,a){return Object(l["openBlock"])(),Object(l["createElementBlock"])("div",i,[Object(l["createElementVNode"])("div",null,[Object(l["unref"])(t).showingInputs?Object(l["createCommentVNode"])("",!0):(Object(l["openBlock"])(),Object(l["createElementBlock"])("button",{key:0,class:"btn btn-primary",onClick:a[0]||(a[0]=function(e){return c()})}," New Email ")),Object(l["unref"])(t).showingEmails?Object(l["createCommentVNode"])("",!0):(Object(l["openBlock"])(),Object(l["createElementBlock"])("button",{key:1,class:"btn btn-primary mx-1",onClick:a[1]||(a[1]=function(e){return n()})}," View Emails "))]),Object(l["unref"])(t).showingInputs?(Object(l["openBlock"])(),Object(l["createElementBlock"])("div",s,[Object(l["createElementVNode"])("div",m,[Object(l["createElementVNode"])("div",u,[Object(l["withDirectives"])(Object(l["createElementVNode"])("input",{class:"form-control",placeholder:"email","onUpdate:modelValue":a[2]||(a[2]=function(e){return Object(l["unref"])(t).curEmail.email=e}),required:""},null,512),[[l["vModelText"],Object(l["unref"])(t).curEmail.email,void 0,{trim:!0}]]),b]),Object(l["createElementVNode"])("div",d,[Object(l["withDirectives"])(Object(l["createElementVNode"])("input",{class:"form-control",placeholder:"name","onUpdate:modelValue":a[3]||(a[3]=function(e){return Object(l["unref"])(t).curEmail.name=e})},null,512),[[l["vModelText"],Object(l["unref"])(t).curEmail.name,void 0,{trim:!0}]]),O]),Object(l["createElementVNode"])("div",j,[Object(l["withDirectives"])(Object(l["createElementVNode"])("input",{class:"form-control",placeholder:"company","onUpdate:modelValue":a[4]||(a[4]=function(e){return Object(l["unref"])(t).curEmail.company=e})},null,512),[[l["vModelText"],Object(l["unref"])(t).curEmail.company,void 0,{trim:!0}]]),p]),Object(l["createElementVNode"])("div",E,[Object(l["withDirectives"])(Object(l["createElementVNode"])("input",{class:"form-control",placeholder:"team","onUpdate:modelValue":a[5]||(a[5]=function(e){return Object(l["unref"])(t).curEmail.team=e})},null,512),[[l["vModelText"],Object(l["unref"])(t).curEmail.team,void 0,{trim:!0}]]),f]),Object(l["createElementVNode"])("div",g,[V,(Object(l["openBlock"])(!0),Object(l["createElementBlock"])(l["Fragment"],null,Object(l["renderList"])(Object(l["unref"])(t).groups,(function(e){return Object(l["openBlock"])(),Object(l["createElementBlock"])("div",{class:"form-check form-check-inline",key:e.group},[Object(l["withDirectives"])(Object(l["createElementVNode"])("input",{class:"form-check-input","onUpdate:modelValue":function(t){return e.checked=t},type:"checkbox",value:""},null,8,N),[[l["vModelCheckbox"],e.checked]]),Object(l["createElementVNode"])("label",h,Object(l["toDisplayString"])(e.group),1)])})),128))]),Object(l["createElementVNode"])("div",k,[Object(l["unref"])(t).msg?(Object(l["openBlock"])(),Object(l["createElementBlock"])("div",v,[Object(l["createElementVNode"])("label",y,Object(l["toDisplayString"])(Object(l["unref"])(t).msg),1)])):Object(l["createCommentVNode"])("",!0),Object(l["createElementVNode"])("button",{class:"btn btn-primary",onClick:a[6]||(a[6]=function(e){return o()}),disabled:Object(l["unref"])(t).disableSubmit}," Create ",8,w),Object(l["createElementVNode"])("button",{class:"btn btn-success mx-1",onClick:a[7]||(a[7]=function(e){return Object(l["unref"])(t).showingInputs=!1})}," Cancel ")])])])):Object(l["createCommentVNode"])("",!0),Object(l["unref"])(t).showingEmails?(Object(l["openBlock"])(),Object(l["createElementBlock"])("div",B,[Object(l["createElementVNode"])("table",C,[S,Object(l["createElementVNode"])("tbody",x,[(Object(l["openBlock"])(!0),Object(l["createElementBlock"])(l["Fragment"],null,Object(l["renderList"])(Object(l["unref"])(t).allEmails,(function(e,c){return Object(l["openBlock"])(),Object(l["createElementBlock"])("tr",{key:c},[Object(l["createElementVNode"])("td",null,Object(l["toDisplayString"])(c+1),1),Object(l["createElementVNode"])("td",null,Object(l["toDisplayString"])(e.email),1),Object(l["createElementVNode"])("td",null,Object(l["toDisplayString"])(e.name),1),Object(l["createElementVNode"])("td",null,Object(l["toDisplayString"])(e.team),1),Object(l["createElementVNode"])("td",null,[D,Object(l["createElementVNode"])("button",{class:"btn btn-small mx-1",onClick:function(t){return U(e)},disabled:Object(l["unref"])(t).disableSubmit}," Delete ",8,I)])])})),128))])]),Object(l["createElementVNode"])("div",M,[Object(l["unref"])(t).msg?(Object(l["openBlock"])(),Object(l["createElementBlock"])("div",T,[Object(l["createElementVNode"])("label",G,Object(l["toDisplayString"])(Object(l["unref"])(t).msg),1)])):Object(l["createCommentVNode"])("",!0),Object(l["createElementVNode"])("button",{class:"btn btn-success mx-1",onClick:a[8]||(a[8]=function(e){return Object(l["unref"])(t).showingEmails=!1})}," Close ")])])):Object(l["createCommentVNode"])("",!0)])}}};const F=U;var L=F,q={class:"mt-3",name:"emails"},A={key:1,class:"mt-2"},J={class:"form"},P={class:"form-floating"},z=Object(l["createElementVNode"])("label",{for:"floatingInput",class:"small"},"Group name",-1),H={class:"table caption-top"},K=Object(l["createElementVNode"])("thead",{class:"text-center"},[Object(l["createElementVNode"])("tr",null,[Object(l["createElementVNode"])("td",null,"#"),Object(l["createElementVNode"])("td",null,"Email"),Object(l["createElementVNode"])("td",null,"Name"),Object(l["createElementVNode"])("td",null,"Team"),Object(l["createElementVNode"])("td",null,"Include")])],-1),Q={class:"text-center"},R={class:""},W={class:"form-check"},X=["onUpdate:modelValue"],Y={class:"text-center mt-2"},Z={name:"EmailGroupManage",setup:function(e){var t=Object(l["reactive"])({disableSubmit:!1,group:{group:null,emails:[]},msg:null,allEmails:[]});function c(){if(t.group.group){t.msg="",t.group.emails.length=0;var e,c=Object(a["a"])(t.allEmails);try{for(c.s();!(e=c.n()).done;){var l=e.value;console.log("data.allEmails before submit",l.email,l.checked),l.checked&&t.group.emails.push(l.email)}}catch(n){c.e(n)}finally{c.f()}console.log("submit group:",t.group),t.disableSubmit=!0,r.a.post("/api/msi/emails/group",t.group).then((function(e){console.log(e.data)})).catch((function(e){console.log(e)}))}else t.msg="Please input group name."}function n(){r.a.get("/api/msi/emails").then((function(e){console.log(e.data),t.allEmails.length=0,t.allEmails=e.data}))}return n(),function(e,n){return Object(l["openBlock"])(),Object(l["createElementBlock"])("div",q,[Object(l["unref"])(t).showGroupInputs?Object(l["createCommentVNode"])("",!0):(Object(l["openBlock"])(),Object(l["createElementBlock"])("button",{key:0,class:"btn btn-primary",onClick:n[0]||(n[0]=function(e){return Object(l["unref"])(t).showGroupInputs=!Object(l["unref"])(t).showGroupInputs})}," New Email Group ")),Object(l["unref"])(t).showGroupInputs?(Object(l["openBlock"])(),Object(l["createElementBlock"])("div",A,[Object(l["createElementVNode"])("div",J,[Object(l["createElementVNode"])("div",P,[Object(l["withDirectives"])(Object(l["createElementVNode"])("input",{class:"form-control col-auto",placeholder:"group name","onUpdate:modelValue":n[1]||(n[1]=function(e){return Object(l["unref"])(t).group.group=e}),required:""},null,512),[[l["vModelText"],Object(l["unref"])(t).group.group,void 0,{trim:!0}]]),z]),Object(l["createElementVNode"])("table",H,[K,Object(l["createElementVNode"])("tbody",Q,[(Object(l["openBlock"])(!0),Object(l["createElementBlock"])(l["Fragment"],null,Object(l["renderList"])(Object(l["unref"])(t).allEmails,(function(e,t){return Object(l["openBlock"])(),Object(l["createElementBlock"])("tr",{key:e.email},[Object(l["createElementVNode"])("td",null,Object(l["toDisplayString"])(t+1),1),Object(l["createElementVNode"])("td",null,Object(l["toDisplayString"])(e.email),1),Object(l["createElementVNode"])("td",null,Object(l["toDisplayString"])(e.name),1),Object(l["createElementVNode"])("td",null,Object(l["toDisplayString"])(e.team),1),Object(l["createElementVNode"])("td",R,[Object(l["createElementVNode"])("div",W,[Object(l["withDirectives"])(Object(l["createElementVNode"])("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":function(t){return e.checked=t},value:""},null,8,X),[[l["vModelCheckbox"],e.checked]])])])])})),128))])]),Object(l["createElementVNode"])("div",Y,[Object(l["createElementVNode"])("button",{class:"btn btn-primary",onClick:n[2]||(n[2]=function(e){return c()})}," Create "),Object(l["createElementVNode"])("button",{class:"btn btn-success mx-1",onClick:n[3]||(n[3]=function(e){return Object(l["unref"])(t).showGroupInputs=!Object(l["unref"])(t).showGroupInputs})}," Cancel ")])])])):Object(l["createCommentVNode"])("",!0)])}}};const $=Z;var _=$,ee=c("a9d6"),te=c("a18c"),ce={class:"container"},le=Object(l["createElementVNode"])("h4",{class:"my-4"},"Email Address Management",-1),ne=Object(l["createElementVNode"])("hr",{class:"border-1 my-3"},null,-1),ae={name:"EmailManagement",setup:function(e){return document.title="Email Management",Object(l["onBeforeMount"])((function(){Object(ee["c"])()||te["a"].push("/login")})),function(e,t){return Object(l["openBlock"])(),Object(l["createElementBlock"])(l["Fragment"],null,[Object(l["createVNode"])(n["a"]),Object(l["createElementVNode"])("div",ce,[le,Object(l["createVNode"])(L),ne,Object(l["createVNode"])(_)])],64)}}};const oe=ae;t["default"]=oe}}]);
//# sourceMappingURL=chunk-2d0d03aa.f3f5a968.js.map