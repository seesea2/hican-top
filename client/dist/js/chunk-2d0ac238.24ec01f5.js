(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0ac238"],{"17ea":function(e,t,c){"use strict";c.r(t);var r=c("b85c"),o=(c("4de4"),c("d3b7"),c("4e82"),c("7a23")),n=c("bc3a"),l=c.n(n),a=c("5da5"),i=c("f88d"),u=c("a9d6"),d=c("243f"),s=c("a18c"),b={class:"container"},m=Object(o["createElementVNode"])("h4",{class:"my-4"},"Templates to create Activity/Issue record",-1),p={class:"mt-3"},f=Object(o["createTextVNode"])(" Group1: "),j={class:"form-check form-check-inline"},O=Object(o["createElementVNode"])("label",{class:"form-check-label",for:"group1_0"},"All",-1),v={class:"form-check form-check-inline"},g=Object(o["createElementVNode"])("label",{class:"form-check-label",for:"group1_1"},"Deployment",-1),V={class:"form-check form-check-inline"},h=Object(o["createElementVNode"])("label",{class:"form-check-label",for:"group1_2"},"Non-Deployment",-1),k=Object(o["createTextVNode"])(" Group2: "),N={class:"form-check form-check-inline"},E=Object(o["createElementVNode"])("label",{class:"form-check-label",for:"group2_0"},"All",-1),y={class:"form-check form-check-inline"},D=Object(o["createElementVNode"])("label",{class:"form-check-label",for:"group2_1"},"ABT",-1),A={class:"form-check form-check-inline"},w=Object(o["createElementVNode"])("label",{class:"form-check-label",for:"group2_2"},"CBT",-1),B={class:"form-check form-check-inline"},_=Object(o["createElementVNode"])("label",{class:"form-check-label",for:"group2_3"},"Bus",-1),T={class:"form-check form-check-inline"},M=Object(o["createElementVNode"])("label",{class:"form-check-label",for:"group2_4"},"Rail",-1),R={key:0,class:"row"},C=["onClick"],U={class:"card-header"},x={class:"card-body"},S={class:"card-text small"},F=Object(o["createElementVNode"])("b",null,"Affected Systems:",-1),G={class:"card-text small"},J=Object(o["createElementVNode"])("b",null,"Contact Persons:",-1),P=Object(o["createElementVNode"])("hr",{class:"border-1 my-3"},null,-1),I={class:"text-center"},L={name:"ActivitiesTemplates",setup:function(e){document.title="Activities";var t=Object(o["reactive"])({activities:[],curActivity:{id:""},group1:"All",group2:"All"});function c(e){t.activities=t.activities.filter((function(t){return t.id!=e}))}function n(e){if(t.curActivity.id){for(var c in t.activities)if(t.activities[c].id==e.id){t.activities[c]=e;break}}else{var r={};for(var o in e)r[o]=e[o];t.activities.push(r),t.activities.sort((function(e,t){return new Date(t.startDatetime)-new Date(e.startDatetime)}))}}function L(){l.a.get("/api/msi/activities/templates").then((function(e){var c,o=Object(r["a"])(e.data);try{for(o.s();!(c=o.n()).done;){var n=c.value;t.activities.push(n)}}catch(l){o.e(l)}finally{o.f()}t.activities.sort((function(e,t){return new Date(t.startDatetime)-new Date(e.startDatetime)}))})).catch((function(e){console.log(e),t.activities.length=0}))}function q(){for(var e in t.curActivity)t.curActivity[e]=null;t.curActivity["type"]="Template",console.log("addActivity:",t.curActivity),Object(d["a"])("editActivityModal")}function z(e){for(var c in e)t.curActivity[c]=e[c];Object(d["a"])("activityDetailsModal")}return console.log("yc2:",t.group1),Object(o["onBeforeMount"])((function(){Object(u["c"])()?L():s["a"].push("/login")})),function(e,r){return Object(o["openBlock"])(),Object(o["createElementBlock"])(o["Fragment"],null,[Object(o["createVNode"])(a["a"]),Object(o["createElementVNode"])("div",b,[m,Object(o["createElementVNode"])("div",p,[Object(o["createElementVNode"])("div",null,[Object(o["createElementVNode"])("div",null,[f,Object(o["createElementVNode"])("div",j,[Object(o["withDirectives"])(Object(o["createElementVNode"])("input",{class:"form-check-input",type:"radio","onUpdate:modelValue":r[0]||(r[0]=function(e){return Object(o["unref"])(t).group1=e}),name:"group1",id:"group1_0",value:"All"},null,512),[[o["vModelRadio"],Object(o["unref"])(t).group1]]),O]),Object(o["createElementVNode"])("div",v,[Object(o["withDirectives"])(Object(o["createElementVNode"])("input",{class:"form-check-input",type:"radio","onUpdate:modelValue":r[1]||(r[1]=function(e){return Object(o["unref"])(t).group1=e}),name:"group1",id:"group1_1",value:"Deployment"},null,512),[[o["vModelRadio"],Object(o["unref"])(t).group1]]),g]),Object(o["createElementVNode"])("div",V,[Object(o["withDirectives"])(Object(o["createElementVNode"])("input",{class:"form-check-input",type:"radio","onUpdate:modelValue":r[2]||(r[2]=function(e){return Object(o["unref"])(t).group1=e}),name:"group1",id:"group1_2",value:"Non-Deployment"},null,512),[[o["vModelRadio"],Object(o["unref"])(t).group1]]),h])]),Object(o["createElementVNode"])("div",null,[k,Object(o["createElementVNode"])("div",N,[Object(o["withDirectives"])(Object(o["createElementVNode"])("input",{class:"form-check-input",type:"radio","onUpdate:modelValue":r[3]||(r[3]=function(e){return Object(o["unref"])(t).group2=e}),name:"group2",id:"group2_0",value:"All"},null,512),[[o["vModelRadio"],Object(o["unref"])(t).group2]]),E]),Object(o["createElementVNode"])("div",y,[Object(o["withDirectives"])(Object(o["createElementVNode"])("input",{class:"form-check-input",type:"radio","onUpdate:modelValue":r[4]||(r[4]=function(e){return Object(o["unref"])(t).group2=e}),name:"group2",id:"group2_1",value:"ABT"},null,512),[[o["vModelRadio"],Object(o["unref"])(t).group2]]),D]),Object(o["createElementVNode"])("div",A,[Object(o["withDirectives"])(Object(o["createElementVNode"])("input",{class:"form-check-input",type:"radio","onUpdate:modelValue":r[5]||(r[5]=function(e){return Object(o["unref"])(t).group2=e}),name:"group2",id:"group2_2",value:"CBT"},null,512),[[o["vModelRadio"],Object(o["unref"])(t).group2]]),w]),Object(o["createElementVNode"])("div",B,[Object(o["withDirectives"])(Object(o["createElementVNode"])("input",{class:"form-check-input",type:"radio","onUpdate:modelValue":r[6]||(r[6]=function(e){return Object(o["unref"])(t).group2=e}),name:"group2",id:"group2_3",value:"Bus"},null,512),[[o["vModelRadio"],Object(o["unref"])(t).group2]]),_]),Object(o["createElementVNode"])("div",T,[Object(o["withDirectives"])(Object(o["createElementVNode"])("input",{class:"form-check-input",type:"radio","onUpdate:modelValue":r[7]||(r[7]=function(e){return Object(o["unref"])(t).group2=e}),name:"group2",id:"group2_4",value:"Rail"},null,512),[[o["vModelRadio"],Object(o["unref"])(t).group2]]),M])])])]),Object(o["unref"])(t).activities.length?(Object(o["openBlock"])(),Object(o["createElementBlock"])("div",R,[(Object(o["openBlock"])(!0),Object(o["createElementBlock"])(o["Fragment"],null,Object(o["renderList"])(Object(o["unref"])(t).activities,(function(e){return Object(o["openBlock"])(),Object(o["createElementBlock"])(o["Fragment"],null,["All"!=Object(o["unref"])(t).group1&&Object(o["unref"])(t).group1!=e["group1"]||"All"!=Object(o["unref"])(t).group2&&Object(o["unref"])(t).group2!=e["group2"]?Object(o["createCommentVNode"])("",!0):(Object(o["openBlock"])(),Object(o["createElementBlock"])("div",{class:"col-sm-12 col-md-3 my-1",key:e.id},[Object(o["createElementVNode"])("div",{class:"card",role:"button",onClick:function(t){return z(e)}},[Object(o["createElementVNode"])("div",U,Object(o["toDisplayString"])(e.title),1),Object(o["createElementVNode"])("div",x,[Object(o["createElementVNode"])("div",S,[F,Object(o["createTextVNode"])(" "+Object(o["toDisplayString"])(e.affectedSystems),1)]),Object(o["createElementVNode"])("div",G,[J,Object(o["createTextVNode"])(" "+Object(o["toDisplayString"])(e.contactPersons),1)])])],8,C)]))],64)})),256))])):Object(o["createCommentVNode"])("",!0),P,Object(o["createElementVNode"])("div",I,[Object(o["createElementVNode"])("button",{class:"btn btn-primary",onClick:r[8]||(r[8]=function(e){return q()})}," Create Template ")])]),Object(o["createVNode"])(i["a"],{activity:Object(o["unref"])(t).curActivity,onDelete:r[9]||(r[9]=function(e){return c(e)}),onEdit:r[10]||(r[10]=function(e){return n(e)})},null,8,["activity"])],64)}}};const q=L;t["default"]=q}}]);
//# sourceMappingURL=chunk-2d0ac238.24ec01f5.js.map