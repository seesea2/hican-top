(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-31344f8c"],{4754:function(t,e,o){"use strict";function c(t){try{if(s(t.BusStopCode))return!1;let e=n();return e.push(t),localStorage.setItem("busStopBookmarks",JSON.stringify(e)),!0}catch(e){return console.log(e),!1}}function s(t){try{let e=n();return e.find(e=>e.BusStopCode===t)}catch{return}}function n(){try{const t=localStorage.getItem("busStopBookmarks");let e=[];return t&&(e=JSON.parse(t)),e}catch{return[]}}function a(t){try{let e=n();return e=e.filter(e=>e.BusStopCode!==t),localStorage.setItem("busStopBookmarks",JSON.stringify(e)),!0}catch{return!1}}o.d(e,"a",(function(){return c})),o.d(e,"b",(function(){return s})),o.d(e,"c",(function(){return n})),o.d(e,"d",(function(){return a}))},"61b8":function(t,e,o){"use strict";o("b076")},b076:function(t,e,o){},d178:function(t,e,o){"use strict";var c=o("7a23");const s={id:"nav",class:"p-3"},n=Object(c["g"])("BusArrival"),a=Object(c["g"])("☯ "),b=Object(c["g"])("Podcast"),u=Object(c["g"])("☯ "),r=Object(c["g"])("LearnWords");function l(t,e){const o=Object(c["z"])("router-link");return Object(c["s"])(),Object(c["e"])("div",s,[Object(c["h"])(o,{to:"/"},{default:Object(c["F"])(()=>[n]),_:1}),a,Object(c["h"])(o,{to:"/podcast"},{default:Object(c["F"])(()=>[b]),_:1}),u,Object(c["h"])(o,{to:"/learn"},{default:Object(c["F"])(()=>[r]),_:1})])}o("61b8");var i=o("6b0d"),d=o.n(i);const O={},j=d()(O,[["render",l],["__scopeId","data-v-23468830"]]);e["a"]=j},d85b:function(t,e,o){"use strict";o.r(e);var c=o("7a23"),s=o("bc3a"),n=o.n(s),a=o("d178"),b=o("4754"),u=o("a18c");const r={class:"container py-3"},l={class:"text-center"},i=Object(c["f"])("h2",null,"Bus Arrival Time",-1),d=Object(c["f"])("h6",null,"Get bus arrival time by bus stop code.",-1),O={class:"row justify-content-center mx-0 mt-4"},j={class:"col-12 col-md-6 col-lg-4"},p={class:"input-group"},f={class:"input-group-append"},B={key:0},S={key:0,class:"mt-4"},k=Object(c["f"])("h3",null,"Bus Stop Bookmark",-1),h={class:"table table-sm mt-2"},m=Object(c["f"])("thead",{class:"thead-dark"},[Object(c["f"])("tr",null,[Object(c["f"])("th",{scope:"col"},"BusStop"),Object(c["f"])("th",{scope:"col"},"Name"),Object(c["f"])("th",{scope:"col"},"Remove")])],-1),y=["onClick"],C=["onClick"],g=["onClick"],N={class:"mt-4"},v=Object(c["g"])(" Toggle Nearby Bus Stops "),w={key:0,class:"spinner-border spinner-border-sm",role:"status","aria-hidden":"true"},I={key:1,class:"table table-sm mt-2"},A=Object(c["f"])("thead",{class:"thead-dark"},[Object(c["f"])("tr",null,[Object(c["f"])("th",{scope:"col"},"BusStop"),Object(c["f"])("th",{scope:"col"},"Name")])],-1),_=["onClick"],R=["onClick"];var T={name:"BusArrival",setup(t){document.title="Bus Arrival";let e=Object(c["w"])({inputCode:null,inputNote:null,lodingNearbyBusStops:!1,showNearbyBusStops:!1,nearbyBusStops:null,getNearbyNote:null,watchId:null,bookmarkBusStops:null});function o(t){t&&(e.inputCode=t),e.inputCode&&e.inputCode.trim()?(e.inputNote=null,u["a"].push({name:"BusArrivalTime",params:{inputCode:e.inputCode.trim()}})):e.inputNote="Please input bus stop code."}function s(){e.bookmarkBusStops=Object(b["c"])()}function T(t){Object(b["d"])(t)&&e.refreshBookmarks()}function D(){if(e.showNearbyBusStops)return e.showNearbyBusStops=!1,void(e.watchId&&(navigator.geolocation.clearWatch(e.watchId),e.watchId=null));e.lodingNearbyBusStops=!0,navigator&&navigator.geolocation&&(e.watchId=navigator.geolocation.watchPosition(t=>{t&&t.coords&&n.a.get("/api/lta/bus/nearbyBusStops",{params:{latitude:t.coords.latitude,longitude:t.coords.longitude}}).then(t=>{e.nearbyBusStops=t.data,e.showNearbyBusStops=!0}).catch(t=>{console.log(t)}).then(e.lodingNearbyBusStops=!1)},t=>{switch(e.lodingNearbyBusStops=!1,e.showNearbyBusStops=!1,t.code){case t.PERMISSION_DENIED:e.getNearbyNote="Request for Geolocation is denied.";break;case t.POSITION_UNAVAILABLE:e.getNearbyNote="Location information is unavailable.";break;case t.TIMEOUT:e.getNearbyNote="Request to get location timed out.";break;default:e.getNearbyNote="An unknown error occurred.";break}}))}return Object(c["p"])(()=>{s()}),(t,s)=>(Object(c["s"])(),Object(c["e"])(c["a"],null,[Object(c["h"])(a["a"]),Object(c["f"])("div",r,[Object(c["f"])("div",l,[i,d,Object(c["f"])("div",O,[Object(c["f"])("div",j,[Object(c["f"])("div",p,[Object(c["G"])(Object(c["f"])("input",{"onUpdate:modelValue":s[0]||(s[0]=t=>Object(c["C"])(e).inputCode=t),placeholder:"Bus stop code",class:"form-control",onKeyup:s[1]||(s[1]=Object(c["H"])(t=>o(),["enter"]))},null,544),[[c["D"],Object(c["C"])(e).inputCode,void 0,{trim:!0}]]),Object(c["f"])("div",f,[Object(c["f"])("button",{class:"btn btn-primary",onClick:s[2]||(s[2]=t=>o())}," Get ")])]),Object(c["C"])(e).inputNote?(Object(c["s"])(),Object(c["e"])("div",B,Object(c["B"])(Object(c["C"])(e).inputNote),1)):Object(c["d"])("",!0)])]),Object(c["C"])(e).bookmarkBusStops&&Object(c["C"])(e).bookmarkBusStops.length?(Object(c["s"])(),Object(c["e"])("div",S,[k,Object(c["f"])("table",h,[m,Object(c["f"])("tbody",null,[(Object(c["s"])(!0),Object(c["e"])(c["a"],null,Object(c["y"])(Object(c["C"])(e).bookmarkBusStops,t=>(Object(c["s"])(),Object(c["e"])("tr",{key:t.BusStopCode},[Object(c["f"])("td",null,[Object(c["f"])("a",{onClick:e=>o(t.BusStopCode),class:"btn"},Object(c["B"])(t.BusStopCode),9,y)]),Object(c["f"])("td",null,[Object(c["f"])("a",{onClick:e=>o(t.BusStopCode),class:"btn"},Object(c["B"])(t.Description)+"@"+Object(c["B"])(t.RoadName),9,C)]),Object(c["f"])("td",null,[Object(c["f"])("a",{onClick:e=>T(t.BusStopCode),class:"btn"},"X",8,g)])]))),128))])])])):Object(c["d"])("",!0),Object(c["f"])("div",N,[Object(c["f"])("button",{onClick:D,class:"btn btn-primary"},[v,Object(c["C"])(e).lodingNearbyBusStops?(Object(c["s"])(),Object(c["e"])("span",w)):Object(c["d"])("",!0)]),Object(c["f"])("div",null,Object(c["B"])(Object(c["C"])(e).getNearbyNote),1)]),Object(c["C"])(e).showNearbyBusStops?(Object(c["s"])(),Object(c["e"])("table",I,[A,Object(c["f"])("tbody",null,[(Object(c["s"])(!0),Object(c["e"])(c["a"],null,Object(c["y"])(Object(c["C"])(e).nearbyBusStops,t=>(Object(c["s"])(),Object(c["e"])("tr",{key:t.busStop.BusStopCode},[Object(c["f"])("td",null,[Object(c["f"])("a",{onClick:e=>o(t.busStop.BusStopCode),class:"btn"},Object(c["B"])(t.busStop.BusStopCode),9,_)]),Object(c["f"])("td",null,[Object(c["f"])("a",{onClick:e=>o(t.busStop.BusStopCode),class:"btn"},Object(c["B"])(t.busStop.Description)+"@"+Object(c["B"])(t.busStop.RoadName),9,R)])]))),128))])])):Object(c["d"])("",!0)])])],64))}};const D=T;e["default"]=D}}]);
//# sourceMappingURL=chunk-31344f8c.ebe9147e.js.map