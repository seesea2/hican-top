import{d as f,r as v,c as n,a as B,b as t,w as y,v as S,u as a,e as C,t as u,f as p,F as h,g as m,h as w,i as k,o as i}from"./index-838393e5.js";import{a as I}from"./axios-4a70c6fc.js";import{N as A}from"./Navbar-f5c13868.js";import{g as T,r as $}from"./busBookmarks-6b02e7eb.js";const x={class:"container py-3"},V={class:"text-center"},D=t("h2",null,"Bus Arrival Time",-1),E=t("h6",null,"Get bus arrival time by bus stop code.",-1),R={class:"row justify-content-center mx-0 mt-4"},L={class:"col-12 col-md-6 col-lg-4"},O={class:"input-group"},P={class:"input-group-append"},G={key:0},M={key:0,class:"mt-4"},U=t("h3",null,"Bus Stop Bookmark",-1),W={class:"table table-sm mt-2"},q=t("thead",{class:"thead-dark"},[t("tr",null,[t("th",{scope:"col"},"BusStop"),t("th",{scope:"col"},"Name"),t("th",{scope:"col"},"Remove")])],-1),F=["onClick"],K=["onClick"],j=["onClick"],X={class:"mt-4"},z={key:0,class:"spinner-border spinner-border-sm",role:"status","aria-hidden":"true"},H=t("span",{class:"visually-hidden"},"Loading...",-1),J=[H],Q={key:1,class:"table table-sm mt-2"},Y=t("thead",{class:"thead-dark"},[t("tr",null,[t("th",{scope:"col"},"BusStop"),t("th",{scope:"col"},"Name")])],-1),Z=["onClick"],tt=["onClick"],nt=f({__name:"BusArrival",setup(et){document.title="Bus Arrival";let e=v({inputCode:"",inputNote:"",loadingNearbyBusStops:!1,showNearbyBusStops:!1,getNearbyNote:"",watchId:0}),b=v([]),c=v([]);_();function r(s){if(s&&(e.value.inputCode=s.trim()),!e.value.inputCode){e.value.inputNote="Please input bus stop code.";return}e.value.inputNote="",e.value.showNearbyBusStops=!1,e.value.watchId&&(navigator.geolocation.clearWatch(e.value.watchId),e.value.watchId=0),k.push({name:"BusArrivalTime",params:{inputCode:e.value.inputCode}})}function _(){c.value=T()}function N(s){$(s)&&_()}function g(){if(e.value.showNearbyBusStops){e.value.showNearbyBusStops=!1,e.value.watchId&&(navigator.geolocation.clearWatch(e.value.watchId),e.value.watchId=0);return}e.value.loadingNearbyBusStops=!0,navigator&&navigator.geolocation&&(e.value.watchId=navigator.geolocation.watchPosition(s=>{s&&s.coords&&I.get("/api/lta/bus/nearbyBusStops",{params:{latitude:s.coords.latitude,longitude:s.coords.longitude}}).then(l=>{b.value=l.data,e.value.showNearbyBusStops=!0}).catch(l=>{console.log(l)}).finally(()=>{e.value.loadingNearbyBusStops=!1})},s=>{switch(e.value.loadingNearbyBusStops=!1,e.value.showNearbyBusStops=!1,e.value.watchId&&(navigator.geolocation.clearWatch(e.value.watchId),e.value.watchId=0),s.code){case s.PERMISSION_DENIED:e.value.getNearbyNote="Request for Geolocation is denied.";break;case s.POSITION_UNAVAILABLE:e.value.getNearbyNote="Location information is unavailable.";break;case s.TIMEOUT:e.value.getNearbyNote="Request to get location timed out.";break;default:e.value.getNearbyNote="An unknown error occurred.";break}}))}return(s,l)=>(i(),n(h,null,[B(A),t("div",x,[t("div",V,[D,E,t("div",R,[t("div",L,[t("div",O,[y(t("input",{"onUpdate:modelValue":l[0]||(l[0]=o=>a(e).inputCode=o),placeholder:"Bus stop code",class:"form-control",onKeyup:l[1]||(l[1]=C(o=>r(a(e).inputCode),["enter"]))},null,544),[[S,a(e).inputCode,void 0,{trim:!0}]]),t("div",P,[t("button",{class:"btn btn-primary",onClick:l[2]||(l[2]=o=>r(a(e).inputCode))}," Get ")])]),a(e).inputNote?(i(),n("div",G,u(a(e).inputNote),1)):p("",!0)])]),a(c)&&a(c).length?(i(),n("div",M,[U,t("table",W,[q,t("tbody",null,[(i(!0),n(h,null,m(a(c),o=>(i(),n("tr",{key:o.BusStopCode},[t("td",null,[t("a",{onClick:d=>r(o.BusStopCode),class:"btn"},u(o.BusStopCode),9,F)]),t("td",null,[t("a",{onClick:d=>r(o.BusStopCode),class:"btn"},u(o.Description)+"@"+u(o.RoadName),9,K)]),t("td",null,[t("a",{onClick:d=>N(o.BusStopCode),class:"btn"},"X",8,j)])]))),128))])])])):p("",!0),t("div",X,[t("button",{onClick:l[3]||(l[3]=o=>g()),class:"btn btn-primary"},[w(" Toggle Nearby Bus Stops "),a(e).loadingNearbyBusStops?(i(),n("span",z,J)):p("",!0)]),t("div",null,u(a(e).getNearbyNote),1)]),a(e).showNearbyBusStops?(i(),n("table",Q,[Y,t("tbody",null,[(i(!0),n(h,null,m(a(b),o=>(i(),n("tr",{key:o.busStop.BusStopCode},[t("td",null,[t("a",{onClick:d=>r(o.busStop.BusStopCode),class:"btn"},u(o.busStop.BusStopCode),9,Z)]),t("td",null,[t("a",{onClick:d=>r(o.busStop.BusStopCode),class:"btn"},u(o.busStop.Description)+"@"+u(o.busStop.RoadName),9,tt)])]))),128))])])):p("",!0)])])],64))}});export{nt as default};
