(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-30cd8357"],{1148:function(e,t,r){"use strict";var n=r("a691"),o=r("577e"),a=r("1d80");e.exports=function(e){var t=o(a(this)),r="",c=n(e);if(c<0||c==1/0)throw RangeError("Wrong number of repetitions");for(;c>0;(c>>>=1)&&(t+=t))1&c&&(r+=t);return r}},"408a":function(e,t){var r=1..valueOf;e.exports=function(e){return r.call(e)}},"78db":function(e,t,r){"use strict";r.r(t);var n=r("7a23"),o={class:"container text-center py-3"},a={key:0},c={key:1,class:"my-3"},i=Object(n["f"])("div",{class:"spinner-border",style:{width:"10rem",height:"10rem"},role:"status"},[Object(n["f"])("span",{class:"sr-only"},"Loading...")],-1),l=[i],s={key:2},b={key:0,class:"table mt-3"},u=Object(n["f"])("thead",{class:"thead-dark"},[Object(n["f"])("tr",null,[Object(n["f"])("th",{scope:"col"},"#"),Object(n["f"])("th",{scope:"col"},"1st Bus"),Object(n["f"])("th",{scope:"col"},"2nd Bus"),Object(n["f"])("th",{scope:"col"},"3rd Bus")])],-1),d={key:0},f={scope:"row"},O={key:1},j=Object(n["f"])("caption",null,[Object(n["f"])("ul",{class:"small"},[Object(n["f"])("li",null,[Object(n["f"])("label",null,"Seats Available")]),Object(n["f"])("li",null,[Object(n["f"])("label",{class:"bg-info"},"Standing Available")]),Object(n["f"])("li",null,[Object(n["f"])("label",{class:"bg-warning"},"Limited Standing")])])],-1),h={class:"btn-group mt-3"};function p(e,t,r,i,p,v){var g=this;return Object(n["r"])(),Object(n["e"])("div",o,[Object(n["f"])("div",null,[p.busStop?(Object(n["r"])(),Object(n["e"])("h3",a,Object(n["A"])(p.busStop.Description),1)):Object(n["d"])("",!0),Object(n["f"])("h5",null,"Bus Stop: "+Object(n["A"])(p.inputCode),1),p.loading?(Object(n["r"])(),Object(n["e"])("div",c,l)):p.loadingNote?(Object(n["r"])(),Object(n["e"])("div",s,Object(n["A"])(p.loadingNote),1)):Object(n["d"])("",!0)]),p.busArrival?(Object(n["r"])(),Object(n["e"])("table",b,[u,p.busArrival.Services.length?(Object(n["r"])(),Object(n["e"])("tbody",d,[(Object(n["r"])(!0),Object(n["e"])(n["a"],null,Object(n["x"])(p.busArrival.Services,(function(e){return Object(n["r"])(),Object(n["e"])("tr",{key:e.ServiceNo},[Object(n["f"])("th",f,Object(n["A"])(e.ServiceNo),1),Object(n["f"])("td",{class:Object(n["n"])(v.getLoadColour(e.NextBus))},Object(n["A"])(v.calculateArrivalTime(e.NextBus)),3),Object(n["f"])("td",{class:Object(n["n"])(v.getLoadColour(e.NextBus2))},Object(n["A"])(v.calculateArrivalTime(e.NextBus2)),3),Object(n["f"])("td",{class:Object(n["n"])(v.getLoadColour(e.NextBus2))},Object(n["A"])(v.calculateArrivalTime(e.NextBus3)),3)])})),128))])):(Object(n["r"])(),Object(n["e"])("tbody",O,[Object(n["f"])("tr",null,[(Object(n["r"])(),Object(n["e"])(n["a"],null,Object(n["x"])(4,(function(e){return Object(n["f"])("td",{key:e},"NA")})),64))])])),j])):Object(n["d"])("",!0),Object(n["f"])("div",h,[p.loadingNote?Object(n["d"])("",!0):(Object(n["r"])(),Object(n["e"])("button",{key:0,onClick:t[0]||(t[0]=function(){return v.refresh&&v.refresh.apply(v,arguments)}),class:"btn btn-primary"}," Refresh ")),p.loadingNote||p.bookmark?Object(n["d"])("",!0):(Object(n["r"])(),Object(n["e"])("button",{key:1,onClick:t[1]||(t[1]=function(){return v.addBookmark&&v.addBookmark.apply(v,arguments)}),class:"btn btn-primary"}," BookmarkBusStop ")),Object(n["f"])("button",{class:"btn btn-primary",onClick:t[2]||(t[2]=function(e){return g.$router.go(-1)})},"Back")])])}r("b680");var v=r("bc3a"),g=r.n(v),k=r("6c02"),m=r("4754"),A={name:"BusArrivalTime",data:function(){return{inputCode:null,busArrival:null,busStop:null,loading:null,loadingNote:null,bookmark:null}},created:function(){var e=Object(k["c"])();this.inputCode=e.params.inputCode,this.refresh()},methods:{refresh:function(){var e=this;this.loading=!0,this.loadingNote="",g.a.get("/api/lta/bus/busArrival/"+this.inputCode).then((function(t){e.busStop=t.data.busStop,e.busArrival=t.data.busArrival,e.bookmark=Object(m["b"])(e.inputCode)})).catch((function(t){t.response&&t.response.data&&t.response.data.message?e.loadingNote=t.response.data.message:e.loadingNote=t})).then((function(){e.loading=!1}))},getLoadColour:function(e){if(e&&"SEA"!=e.Load)return"SDA"==e.Load?"bg-info":"LSD"==e.Load?"bg-warning":void 0},calculateArrivalTime:function(e){if(!e||!e.EstimatedArrival)return"NA";var t=new Date(e.EstimatedArrival);if(t.valueOf()-Date.now()<0)return"Arrived";var r=(t.valueOf()-Date.now())/1e3/60;return r<1?"1 min":r.toFixed(0)+" mins"},addBookmark:function(){console.log("to add",this.busStop),Object(m["a"])(this.busStop)&&(this.bookmark=Object(m["b"])(this.inputCode),console.log("this.bookmark after add",this.bookmark))}}};A.render=p;t["default"]=A},b680:function(e,t,r){"use strict";var n=r("23e7"),o=r("a691"),a=r("408a"),c=r("1148"),i=r("d039"),l=1..toFixed,s=Math.floor,b=function(e,t,r){return 0===t?r:t%2===1?b(e,t-1,r*e):b(e*e,t/2,r)},u=function(e){var t=0,r=e;while(r>=4096)t+=12,r/=4096;while(r>=2)t+=1,r/=2;return t},d=function(e,t,r){var n=-1,o=r;while(++n<6)o+=t*e[n],e[n]=o%1e7,o=s(o/1e7)},f=function(e,t){var r=6,n=0;while(--r>=0)n+=e[r],e[r]=s(n/t),n=n%t*1e7},O=function(e){var t=6,r="";while(--t>=0)if(""!==r||0===t||0!==e[t]){var n=String(e[t]);r=""===r?n:r+c.call("0",7-n.length)+n}return r},j=l&&("0.000"!==8e-5.toFixed(3)||"1"!==.9.toFixed(0)||"1.25"!==1.255.toFixed(2)||"1000000000000000128"!==(0xde0b6b3a7640080).toFixed(0))||!i((function(){l.call({})}));n({target:"Number",proto:!0,forced:j},{toFixed:function(e){var t,r,n,i,l=a(this),s=o(e),j=[0,0,0,0,0,0],h="",p="0";if(s<0||s>20)throw RangeError("Incorrect fraction digits");if(l!=l)return"NaN";if(l<=-1e21||l>=1e21)return String(l);if(l<0&&(h="-",l=-l),l>1e-21)if(t=u(l*b(2,69,1))-69,r=t<0?l*b(2,-t,1):l/b(2,t,1),r*=4503599627370496,t=52-t,t>0){d(j,0,r),n=s;while(n>=7)d(j,1e7,0),n-=7;d(j,b(10,n,1),0),n=t-1;while(n>=23)f(j,1<<23),n-=23;f(j,1<<n),d(j,1,1),f(j,2),p=O(j)}else d(j,0,r),d(j,1<<-t,0),p=O(j)+c.call("0",s);return s>0?(i=p.length,p=h+(i<=s?"0."+c.call("0",s-i)+p:p.slice(0,i-s)+"."+p.slice(i-s))):p=h+p,p}})}}]);
//# sourceMappingURL=chunk-30cd8357.7f10beb3.js.map