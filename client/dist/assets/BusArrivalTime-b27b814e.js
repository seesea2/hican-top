var w=Object.defineProperty;var x=(d,i,e)=>i in d?w(d,i,{enumerable:!0,configurable:!0,writable:!0,value:e}):d[i]=e;var v=(d,i,e)=>(x(d,typeof i!="symbol"?i+"":i,e),e);import{a as L,N as D}from"./Navbar-21b9960e.js";import{d as E,r as f,j as V,c as s,a as $,b as t,u as n,t as u,f as c,F as h,g as y,o as l,n as B}from"./index-a9084e4b.js";import{a as S,b as F,B as C}from"./busBookmarks-e2b89998.js";const O={class:"container text-center pt-3 pb-5"},R={key:0},T={key:1,class:"my-3"},j=t("div",{class:"spinner-border",style:{width:"10rem",height:"10rem"},role:"status"},[t("span",{class:"visually-hidden"},"Loading...")],-1),z=[j],M={key:2},q={key:0,class:"table mt-3"},G=t("thead",{class:"thead-dark"},[t("tr",null,[t("th",{scope:"col"},"#"),t("th",{scope:"col"},"1st Bus"),t("th",{scope:"col"},"2nd Bus"),t("th",{scope:"col"},"3rd Bus")])],-1),H={key:0},I={scope:"row"},J={key:1},K=t("caption",null,[t("ul",{class:"small"},[t("li",null,[t("label",null,"Seats Available")]),t("li",null,[t("label",{class:"bg-info"},"Standing Available")]),t("li",null,[t("label",{class:"bg-warning"},"Limited Standing")])])],-1),P={class:"btn-group mt-3"},Y=E({__name:"BusArrivalTime",setup(d){class i{constructor(){v(this,"odata.metadata","");v(this,"BusStopCode","");v(this,"Services",[])}}document.title="Bus Arrival";let e=f({inputCode:"",loading:!1,loadingNote:""}),p=f(new i),m=f(new C),g=f(new C);const k=V();typeof k.params.inputCode=="string"&&(e.value.inputCode=k.params.inputCode),N();function N(){e.value.loading=!0,e.value.loadingNote="",L.get("/api/lta/bus/busArrival/"+e.value.inputCode).then(a=>{m.value=a.data.busStop,p.value=a.data.busArrival,g.value=S(e.value.inputCode)}).catch(a=>{if(a.response&&a.response.data&&a.response.data.message){e.value.loadingNote=a.response.data.message;return}e.value.loadingNote=a}).finally(()=>{e.value.loading=!1})}function b(a){if(!(!a||a.Load=="SEA")){if(a.Load=="SDA")return"bg-info";if(a.Load=="LSD")return"bg-warning"}}function _(a){if(!a||!a.EstimatedArrival)return"NA";const r=new Date(a.EstimatedArrival);if(r.valueOf()-Date.now()<0)return"Arrived";const o=(r.valueOf()-Date.now())/1e3/60;return o<1?"1 min":o.toFixed(0)+" mins"}function A(){F(m.value)&&(g.value=S(e.value.inputCode))}return(a,r)=>(l(),s(h,null,[$(D),t("div",O,[t("div",null,[n(m)?(l(),s("h3",R,u(n(m).Description),1)):c("",!0),t("h5",null,"Bus Stop: "+u(n(e).inputCode),1),n(e).loading?(l(),s("div",T,z)):n(e).loadingNote?(l(),s("div",M,u(n(e).loadingNote),1)):c("",!0)]),n(p).BusStopCode?(l(),s("table",q,[G,n(p).Services.length?(l(),s("tbody",H,[(l(!0),s(h,null,y(n(p).Services,o=>(l(),s("tr",{key:o.ServiceNo},[t("th",I,u(o.ServiceNo),1),t("td",{class:B(b(o.NextBus))},u(_(o.NextBus)),3),t("td",{class:B(b(o.NextBus2))},u(_(o.NextBus2)),3),t("td",{class:B(b(o.NextBus2))},u(_(o.NextBus3)),3)]))),128))])):(l(),s("tbody",J,[t("tr",null,[(l(),s(h,null,y(4,o=>t("td",{key:o},"NA")),64))])])),K])):c("",!0),t("div",P,[n(e).loadingNote?c("",!0):(l(),s("button",{key:0,onClick:r[0]||(r[0]=o=>N()),class:"btn btn-primary"}," Refresh ")),!n(e).loadingNote&&!n(g)?(l(),s("button",{key:1,onClick:r[1]||(r[1]=o=>A()),class:"btn btn-primary"}," BookmarkBusStop ")):c("",!0),t("button",{class:"btn btn-primary",onClick:r[2]||(r[2]=o=>a.$router.go(-1))},"Back")])])],64))}});export{Y as default};