(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5f1a95a6"],{4754:function(t,e,c){"use strict";function n(t){try{if(b(t.BusStopCode))return!1;let e=o();return e.push(t),localStorage.setItem("busStopBookmarks",JSON.stringify(e)),!0}catch(e){return console.log(e),!1}}function b(t){try{let e=o();return e.find(e=>e.BusStopCode===t)}catch{return}}function o(){try{const t=localStorage.getItem("busStopBookmarks");let e=[];return t&&(e=JSON.parse(t)),e}catch{return[]}}function s(t){try{let e=o();return e=e.filter(e=>e.BusStopCode!==t),localStorage.setItem("busStopBookmarks",JSON.stringify(e)),!0}catch{return!1}}c.d(e,"a",(function(){return n})),c.d(e,"b",(function(){return b})),c.d(e,"c",(function(){return o})),c.d(e,"d",(function(){return s}))},"78db":function(t,e,c){"use strict";c.r(e);var n=c("7a23"),b=c("bc3a"),o=c.n(b),s=c("6c02"),a=c("4754");const l={class:"container text-center py-3"},r={key:0},i={key:1,class:"my-3"},u=Object(n["f"])("div",{class:"spinner-border",style:{width:"10rem",height:"10rem"},role:"status"},[Object(n["f"])("span",{class:"visually-hidden"},"Loading...")],-1),O=[u],j={key:2},d={key:0,class:"table mt-3"},f=Object(n["f"])("thead",{class:"thead-dark"},[Object(n["f"])("tr",null,[Object(n["f"])("th",{scope:"col"},"#"),Object(n["f"])("th",{scope:"col"},"1st Bus"),Object(n["f"])("th",{scope:"col"},"2nd Bus"),Object(n["f"])("th",{scope:"col"},"3rd Bus")])],-1),p={key:0},g={scope:"row"},k={key:1},m=Object(n["f"])("caption",null,[Object(n["f"])("ul",{class:"small"},[Object(n["f"])("li",null,[Object(n["f"])("label",null,"Seats Available")]),Object(n["f"])("li",null,[Object(n["f"])("label",{class:"bg-info"},"Standing Available")]),Object(n["f"])("li",null,[Object(n["f"])("label",{class:"bg-warning"},"Limited Standing")])])],-1),v={class:"btn-group mt-3"};var S={name:"BusArrivalTime",setup(t){document.title="Bus Arrival";let e=Object(n["w"])({inputCode:null,busArrival:null,busStop:null,loading:null,loadingNote:null,bookmark:null});function c(){e.loading=!0,e.loadingNote="",o.a.get("/api/lta/bus/busArrival/"+e.inputCode).then(t=>{e.busStop=t.data.busStop,e.busArrival=t.data.busArrival,e.bookmark=Object(a["b"])(e.inputCode)}).catch(t=>{t.response&&t.response.data&&t.response.data.message?e.loadingNote=t.response.data.message:e.loadingNote=t}).then(()=>{e.loading=!1})}function b(t){if(t&&"SEA"!=t.Load)return"SDA"==t.Load?"bg-info":"LSD"==t.Load?"bg-warning":void 0}function u(t){if(!t||!t.EstimatedArrival)return"NA";const e=new Date(t.EstimatedArrival);if(e.valueOf()-Date.now()<0)return"Arrived";const c=(e.valueOf()-Date.now())/1e3/60;return c<1?"1 min":c.toFixed(0)+" mins"}function S(){Object(a["a"])(e.busStop)&&(e.bookmark=Object(a["b"])(e.inputCode))}return Object(n["p"])(()=>{const t=Object(s["c"])();e.inputCode=t.params.inputCode,c()}),(t,o)=>(Object(n["s"])(),Object(n["e"])("div",l,[Object(n["f"])("div",null,[Object(n["C"])(e).busStop?(Object(n["s"])(),Object(n["e"])("h3",r,Object(n["B"])(Object(n["C"])(e).busStop.Description),1)):Object(n["d"])("",!0),Object(n["f"])("h5",null,"Bus Stop: "+Object(n["B"])(Object(n["C"])(e).inputCode),1),Object(n["C"])(e).loading?(Object(n["s"])(),Object(n["e"])("div",i,O)):Object(n["C"])(e).loadingNote?(Object(n["s"])(),Object(n["e"])("div",j,Object(n["B"])(Object(n["C"])(e).loadingNote),1)):Object(n["d"])("",!0)]),Object(n["C"])(e).busArrival?(Object(n["s"])(),Object(n["e"])("table",d,[f,Object(n["C"])(e).busArrival.Services.length?(Object(n["s"])(),Object(n["e"])("tbody",p,[(Object(n["s"])(!0),Object(n["e"])(n["a"],null,Object(n["y"])(Object(n["C"])(e).busArrival.Services,t=>(Object(n["s"])(),Object(n["e"])("tr",{key:t.ServiceNo},[Object(n["f"])("th",g,Object(n["B"])(t.ServiceNo),1),Object(n["f"])("td",{class:Object(n["n"])(b(t.NextBus))},Object(n["B"])(u(t.NextBus)),3),Object(n["f"])("td",{class:Object(n["n"])(b(t.NextBus2))},Object(n["B"])(u(t.NextBus2)),3),Object(n["f"])("td",{class:Object(n["n"])(b(t.NextBus2))},Object(n["B"])(u(t.NextBus3)),3)]))),128))])):(Object(n["s"])(),Object(n["e"])("tbody",k,[Object(n["f"])("tr",null,[(Object(n["s"])(),Object(n["e"])(n["a"],null,Object(n["y"])(4,t=>Object(n["f"])("td",{key:t},"NA")),64))])])),m])):Object(n["d"])("",!0),Object(n["f"])("div",v,[Object(n["C"])(e).loadingNote?Object(n["d"])("",!0):(Object(n["s"])(),Object(n["e"])("button",{key:0,onClick:o[0]||(o[0]=t=>c()),class:"btn btn-primary"}," Refresh ")),Object(n["C"])(e).loadingNote||Object(n["C"])(e).bookmark?Object(n["d"])("",!0):(Object(n["s"])(),Object(n["e"])("button",{key:1,onClick:o[1]||(o[1]=t=>S()),class:"btn btn-primary"}," BookmarkBusStop ")),Object(n["f"])("button",{class:"btn btn-primary",onClick:o[2]||(o[2]=e=>t.$router.go(-1))},"Back")])]))}};const B=S;e["default"]=B}}]);
//# sourceMappingURL=chunk-5f1a95a6.f065423b.js.map