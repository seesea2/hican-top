(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7e148a16"],{1148:function(e,t,n){"use strict";var c=n("da84"),o=n("5926"),r=n("577e"),l=n("1d80"),a=c.RangeError;e.exports=function(e){var t=r(l(this)),n="",c=o(e);if(c<0||c==1/0)throw a("Wrong number of repetitions");for(;c>0;(c>>>=1)&&(t+=t))1&c&&(n+=t);return n}},"408a":function(e,t,n){var c=n("e330");e.exports=c(1..valueOf)},"78db":function(e,t,n){"use strict";n.r(t);n("b680");var c=n("7a23"),o=n("bc3a"),r=n.n(o),l=n("6c02"),a=n("4754"),i={class:"container text-center py-3"},b={key:0},s={key:1,class:"my-3"},u=Object(c["createElementVNode"])("div",{class:"spinner-border",style:{width:"10rem",height:"10rem"},role:"status"},[Object(c["createElementVNode"])("span",{class:"sr-only"},"Loading...")],-1),d=[u],O={key:2},j={key:0,class:"table mt-3"},m=Object(c["createElementVNode"])("thead",{class:"thead-dark"},[Object(c["createElementVNode"])("tr",null,[Object(c["createElementVNode"])("th",{scope:"col"},"#"),Object(c["createElementVNode"])("th",{scope:"col"},"1st Bus"),Object(c["createElementVNode"])("th",{scope:"col"},"2nd Bus"),Object(c["createElementVNode"])("th",{scope:"col"},"3rd Bus")])],-1),p={key:0},f={scope:"row"},k={key:1},N=Object(c["createElementVNode"])("caption",null,[Object(c["createElementVNode"])("ul",{class:"small"},[Object(c["createElementVNode"])("li",null,[Object(c["createElementVNode"])("label",null,"Seats Available")]),Object(c["createElementVNode"])("li",null,[Object(c["createElementVNode"])("label",{class:"bg-info"},"Standing Available")]),Object(c["createElementVNode"])("li",null,[Object(c["createElementVNode"])("label",{class:"bg-warning"},"Limited Standing")])])],-1),g={class:"btn-group mt-3"},v={name:"BusArrivalTime",setup:function(e){document.title="Bus Arrival";var t=Object(c["reactive"])({inputCode:null,busArrival:null,busStop:null,loading:null,loadingNote:null,bookmark:null});function n(){t.loading=!0,t.loadingNote="",r.a.get("/api/lta/bus/busArrival/"+t.inputCode).then((function(e){t.busStop=e.data.busStop,t.busArrival=e.data.busArrival,t.bookmark=Object(a["b"])(t.inputCode)})).catch((function(e){e.response&&e.response.data&&e.response.data.message?t.loadingNote=e.response.data.message:t.loadingNote=e})).then((function(){t.loading=!1}))}function o(e){if(e&&"SEA"!=e.Load)return"SDA"==e.Load?"bg-info":"LSD"==e.Load?"bg-warning":void 0}function u(e){if(!e||!e.EstimatedArrival)return"NA";var t=new Date(e.EstimatedArrival);if(t.valueOf()-Date.now()<0)return"Arrived";var n=(t.valueOf()-Date.now())/1e3/60;return n<1?"1 min":n.toFixed(0)+" mins"}function v(){Object(a["a"])(t.busStop)&&(t.bookmark=Object(a["b"])(t.inputCode))}return Object(c["onBeforeMount"])((function(){var e=Object(l["c"])();t.inputCode=e.params.inputCode,n()})),function(e,r){return Object(c["openBlock"])(),Object(c["createElementBlock"])("div",i,[Object(c["createElementVNode"])("div",null,[Object(c["unref"])(t).busStop?(Object(c["openBlock"])(),Object(c["createElementBlock"])("h3",b,Object(c["toDisplayString"])(Object(c["unref"])(t).busStop.Description),1)):Object(c["createCommentVNode"])("",!0),Object(c["createElementVNode"])("h5",null,"Bus Stop: "+Object(c["toDisplayString"])(Object(c["unref"])(t).inputCode),1),Object(c["unref"])(t).loading?(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",s,d)):Object(c["unref"])(t).loadingNote?(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",O,Object(c["toDisplayString"])(Object(c["unref"])(t).loadingNote),1)):Object(c["createCommentVNode"])("",!0)]),Object(c["unref"])(t).busArrival?(Object(c["openBlock"])(),Object(c["createElementBlock"])("table",j,[m,Object(c["unref"])(t).busArrival.Services.length?(Object(c["openBlock"])(),Object(c["createElementBlock"])("tbody",p,[(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(Object(c["unref"])(t).busArrival.Services,(function(e){return Object(c["openBlock"])(),Object(c["createElementBlock"])("tr",{key:e.ServiceNo},[Object(c["createElementVNode"])("th",f,Object(c["toDisplayString"])(e.ServiceNo),1),Object(c["createElementVNode"])("td",{class:Object(c["normalizeClass"])(o(e.NextBus))},Object(c["toDisplayString"])(u(e.NextBus)),3),Object(c["createElementVNode"])("td",{class:Object(c["normalizeClass"])(o(e.NextBus2))},Object(c["toDisplayString"])(u(e.NextBus2)),3),Object(c["createElementVNode"])("td",{class:Object(c["normalizeClass"])(o(e.NextBus2))},Object(c["toDisplayString"])(u(e.NextBus3)),3)])})),128))])):(Object(c["openBlock"])(),Object(c["createElementBlock"])("tbody",k,[Object(c["createElementVNode"])("tr",null,[(Object(c["openBlock"])(),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(4,(function(e){return Object(c["createElementVNode"])("td",{key:e},"NA")})),64))])])),N])):Object(c["createCommentVNode"])("",!0),Object(c["createElementVNode"])("div",g,[Object(c["unref"])(t).loadingNote?Object(c["createCommentVNode"])("",!0):(Object(c["openBlock"])(),Object(c["createElementBlock"])("button",{key:0,onClick:n,class:"btn btn-primary"}," Refresh ")),Object(c["unref"])(t).loadingNote||Object(c["unref"])(t).bookmark?Object(c["createCommentVNode"])("",!0):(Object(c["openBlock"])(),Object(c["createElementBlock"])("button",{key:1,onClick:v,class:"btn btn-primary"}," BookmarkBusStop ")),Object(c["createElementVNode"])("button",{class:"btn btn-primary",onClick:r[0]||(r[0]=function(t){return e.$router.go(-1)})},"Back")])])}}};const E=v;t["default"]=E},b680:function(e,t,n){"use strict";var c=n("23e7"),o=n("da84"),r=n("e330"),l=n("5926"),a=n("408a"),i=n("1148"),b=n("d039"),s=o.RangeError,u=o.String,d=Math.floor,O=r(i),j=r("".slice),m=r(1..toFixed),p=function(e,t,n){return 0===t?n:t%2===1?p(e,t-1,n*e):p(e*e,t/2,n)},f=function(e){var t=0,n=e;while(n>=4096)t+=12,n/=4096;while(n>=2)t+=1,n/=2;return t},k=function(e,t,n){var c=-1,o=n;while(++c<6)o+=t*e[c],e[c]=o%1e7,o=d(o/1e7)},N=function(e,t){var n=6,c=0;while(--n>=0)c+=e[n],e[n]=d(c/t),c=c%t*1e7},g=function(e){var t=6,n="";while(--t>=0)if(""!==n||0===t||0!==e[t]){var c=u(e[t]);n=""===n?c:n+O("0",7-c.length)+c}return n},v=b((function(){return"0.000"!==m(8e-5,3)||"1"!==m(.9,0)||"1.25"!==m(1.255,2)||"1000000000000000128"!==m(0xde0b6b3a7640080,0)}))||!b((function(){m({})}));c({target:"Number",proto:!0,forced:v},{toFixed:function(e){var t,n,c,o,r=a(this),i=l(e),b=[0,0,0,0,0,0],d="",m="0";if(i<0||i>20)throw s("Incorrect fraction digits");if(r!=r)return"NaN";if(r<=-1e21||r>=1e21)return u(r);if(r<0&&(d="-",r=-r),r>1e-21)if(t=f(r*p(2,69,1))-69,n=t<0?r*p(2,-t,1):r/p(2,t,1),n*=4503599627370496,t=52-t,t>0){k(b,0,n),c=i;while(c>=7)k(b,1e7,0),c-=7;k(b,p(10,c,1),0),c=t-1;while(c>=23)N(b,1<<23),c-=23;N(b,1<<c),k(b,1,1),N(b,2),m=g(b)}else k(b,0,n),k(b,1<<-t,0),m=g(b)+O("0",i);return i>0?(o=m.length,m=d+(o<=i?"0."+O("0",i-o)+m:j(m,0,o-i)+"."+j(m,o-i))):m=d+m,m}})}}]);
//# sourceMappingURL=chunk-7e148a16.9366c151.js.map