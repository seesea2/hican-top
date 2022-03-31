(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-30cd8357"],{1148:function(e,t,n){"use strict";var c=n("da84"),r=n("5926"),b=n("577e"),o=n("1d80"),i=c.RangeError;e.exports=function(e){var t=b(o(this)),n="",c=r(e);if(c<0||c==1/0)throw i("Wrong number of repetitions");for(;c>0;(c>>>=1)&&(t+=t))1&c&&(n+=t);return n}},"408a":function(e,t,n){var c=n("e330");e.exports=c(1..valueOf)},"78db":function(e,t,n){"use strict";n.r(t);n("b680");var c=n("7a23"),r=n("bc3a"),b=n.n(r),o=n("6c02"),i=n("4754"),a={class:"container text-center py-3"},u={key:0},l={key:1,class:"my-3"},s=Object(c["f"])("div",{class:"spinner-border",style:{width:"10rem",height:"10rem"},role:"status"},[Object(c["f"])("span",{class:"sr-only"},"Loading...")],-1),O=[s],j={key:2},d={key:0,class:"table mt-3"},f=Object(c["f"])("thead",{class:"thead-dark"},[Object(c["f"])("tr",null,[Object(c["f"])("th",{scope:"col"},"#"),Object(c["f"])("th",{scope:"col"},"1st Bus"),Object(c["f"])("th",{scope:"col"},"2nd Bus"),Object(c["f"])("th",{scope:"col"},"3rd Bus")])],-1),p={key:0},v={scope:"row"},g={key:1},h=Object(c["f"])("caption",null,[Object(c["f"])("ul",{class:"small"},[Object(c["f"])("li",null,[Object(c["f"])("label",null,"Seats Available")]),Object(c["f"])("li",null,[Object(c["f"])("label",{class:"bg-info"},"Standing Available")]),Object(c["f"])("li",null,[Object(c["f"])("label",{class:"bg-warning"},"Limited Standing")])])],-1),k={class:"btn-group mt-3"},m={setup:function(e){var t=this;document.title="Bus Arrival";var n=Object(c["y"])({inputCode:null,busArrival:null,busStop:null,loading:null,loadingNote:null,bookmark:null});function r(){n.loading=!0,n.loadingNote="",b.a.get("/api/lta/bus/busArrival/"+n.inputCode).then((function(e){n.busStop=e.data.busStop,n.busArrival=e.data.busArrival,n.bookmark=Object(i["b"])(n.inputCode)})).catch((function(e){e.response&&e.response.data&&e.response.data.message?n.loadingNote=e.response.data.message:n.loadingNote=e})).then((function(){n.loading=!1}))}function s(e){if(e&&"SEA"!=e.Load)return"SDA"==e.Load?"bg-info":"LSD"==e.Load?"bg-warning":void 0}function m(e){if(!e||!e.EstimatedArrival)return"NA";var t=new Date(e.EstimatedArrival);if(t.valueOf()-Date.now()<0)return"Arrived";var n=(t.valueOf()-Date.now())/1e3/60;return n<1?"1 min":n.toFixed(0)+" mins"}function w(){Object(i["a"])(n.busStop)&&(n.bookmark=Object(i["b"])(n.inputCode))}return Object(c["r"])((function(){var e=Object(o["c"])();n.inputCode=e.params.inputCode,r()})),function(e,b){return Object(c["u"])(),Object(c["e"])("div",a,[Object(c["f"])("div",null,[Object(c["E"])(n).busStop?(Object(c["u"])(),Object(c["e"])("h3",u,Object(c["D"])(Object(c["E"])(n).busStop.Description),1)):Object(c["d"])("",!0),Object(c["f"])("h5",null,"Bus Stop: "+Object(c["D"])(Object(c["E"])(n).inputCode),1),Object(c["E"])(n).loading?(Object(c["u"])(),Object(c["e"])("div",l,O)):Object(c["E"])(n).loadingNote?(Object(c["u"])(),Object(c["e"])("div",j,Object(c["D"])(Object(c["E"])(n).loadingNote),1)):Object(c["d"])("",!0)]),Object(c["E"])(n).busArrival?(Object(c["u"])(),Object(c["e"])("table",d,[f,Object(c["E"])(n).busArrival.Services.length?(Object(c["u"])(),Object(c["e"])("tbody",p,[(Object(c["u"])(!0),Object(c["e"])(c["a"],null,Object(c["A"])(Object(c["E"])(n).busArrival.Services,(function(e){return Object(c["u"])(),Object(c["e"])("tr",{key:e.ServiceNo},[Object(c["f"])("th",v,Object(c["D"])(e.ServiceNo),1),Object(c["f"])("td",{class:Object(c["p"])(s(e.NextBus))},Object(c["D"])(m(e.NextBus)),3),Object(c["f"])("td",{class:Object(c["p"])(s(e.NextBus2))},Object(c["D"])(m(e.NextBus2)),3),Object(c["f"])("td",{class:Object(c["p"])(s(e.NextBus2))},Object(c["D"])(m(e.NextBus3)),3)])})),128))])):(Object(c["u"])(),Object(c["e"])("tbody",g,[Object(c["f"])("tr",null,[(Object(c["u"])(),Object(c["e"])(c["a"],null,Object(c["A"])(4,(function(e){return Object(c["f"])("td",{key:e},"NA")})),64))])])),h])):Object(c["d"])("",!0),Object(c["f"])("div",k,[Object(c["E"])(n).loadingNote?Object(c["d"])("",!0):(Object(c["u"])(),Object(c["e"])("button",{key:0,onClick:r,class:"btn btn-primary"},"Refresh")),Object(c["E"])(n).loadingNote||Object(c["E"])(n).bookmark?Object(c["d"])("",!0):(Object(c["u"])(),Object(c["e"])("button",{key:1,onClick:w,class:"btn btn-primary"},"BookmarkBusStop")),Object(c["f"])("button",{class:"btn btn-primary",onClick:b[0]||(b[0]=function(e){return t.$router.go(-1)})},"Back")])])}}};t["default"]=m},b680:function(e,t,n){"use strict";var c=n("23e7"),r=n("da84"),b=n("e330"),o=n("5926"),i=n("408a"),a=n("1148"),u=n("d039"),l=r.RangeError,s=r.String,O=Math.floor,j=b(a),d=b("".slice),f=b(1..toFixed),p=function(e,t,n){return 0===t?n:t%2===1?p(e,t-1,n*e):p(e*e,t/2,n)},v=function(e){var t=0,n=e;while(n>=4096)t+=12,n/=4096;while(n>=2)t+=1,n/=2;return t},g=function(e,t,n){var c=-1,r=n;while(++c<6)r+=t*e[c],e[c]=r%1e7,r=O(r/1e7)},h=function(e,t){var n=6,c=0;while(--n>=0)c+=e[n],e[n]=O(c/t),c=c%t*1e7},k=function(e){var t=6,n="";while(--t>=0)if(""!==n||0===t||0!==e[t]){var c=s(e[t]);n=""===n?c:n+j("0",7-c.length)+c}return n},m=u((function(){return"0.000"!==f(8e-5,3)||"1"!==f(.9,0)||"1.25"!==f(1.255,2)||"1000000000000000128"!==f(0xde0b6b3a7640080,0)}))||!u((function(){f({})}));c({target:"Number",proto:!0,forced:m},{toFixed:function(e){var t,n,c,r,b=i(this),a=o(e),u=[0,0,0,0,0,0],O="",f="0";if(a<0||a>20)throw l("Incorrect fraction digits");if(b!=b)return"NaN";if(b<=-1e21||b>=1e21)return s(b);if(b<0&&(O="-",b=-b),b>1e-21)if(t=v(b*p(2,69,1))-69,n=t<0?b*p(2,-t,1):b/p(2,t,1),n*=4503599627370496,t=52-t,t>0){g(u,0,n),c=a;while(c>=7)g(u,1e7,0),c-=7;g(u,p(10,c,1),0),c=t-1;while(c>=23)h(u,1<<23),c-=23;h(u,1<<c),g(u,1,1),h(u,2),f=k(u)}else g(u,0,n),g(u,1<<-t,0),f=k(u)+j("0",a);return a>0?(r=f.length,f=O+(r<=a?"0."+j("0",a-r)+f:d(f,0,r-a)+"."+d(f,r-a))):f=O+f,f}})}}]);
//# sourceMappingURL=chunk-30cd8357.ee170dae.js.map