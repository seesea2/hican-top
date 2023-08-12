import{m as w,r as h,d as S,l as b,i as p,j as x,c as i,a as N,b as e,u as c,w as E,v as U,p as V,e as $,t as _,f as g,F as y,g as B,o as u,h as O}from"./index-9c80e1dc.js";import{a as f,N as W}from"./Navbar-86b99ee9.js";const D=w("vocabularyUserStore",()=>{let l=h({bLogin:!1,user:""});const t=localStorage.getItem("LearnEn");t&&(l.value=JSON.parse(t));function o(s){l.value.bLogin=!0,l.value.user=s,localStorage.setItem("LearnEn",JSON.stringify(l.value))}function d(){l.value.bLogin=!1,localStorage.setItem("LearnEn",JSON.stringify(l.value))}return{profile:l,login:o,logout:d}}),I={class:"container pt-3 pb-5"},J=e("div",{class:"text-center"},[e("h2",null,"Learn Words")],-1),K={class:"row justify-content-end"},R={class:"col-auto"},j={key:0,class:"input-group"},F=["onKeyup"],M={class:"input-group-append"},T={key:1},q={class:"small"},z={class:"text-center"},A={key:0,class:"spinner-border text-primary",role:"status",style:{width:"5rem",height:"5rem"},"aria-hidden":"true",center:""},G=e("span",{class:"visually-hidden"},"Loading...",-1),H=[G],P={center:""},Q={key:0,class:"small"},X=e("div",null,"Note:",-1),Y=e("ul",null,[e("li",null,"click dictionary to see definitions."),e("li",null,"click x to hide the word for your account.")],-1),Z=[X,Y],ee={class:"col-auto"},te={class:"col-auto align-self-end ml-auto"},ne=e("span",{class:"ms-2"},"[",-1),oe=["href"],se=["href"],ae=["href"],re=["href"],le=e("span",null,"]",-1),ie=["onClick"],ue={class:"text-center"},fe=S({__name:"Learn",setup(l){document.title="Learn Words";const t=D();let o=h({learntCount:0,words:[],loading:!0}),d=h(""),s=h("");b(()=>{if(!t.profile.bLogin){p.push({name:"LearnEn"});return}const r=x();if(typeof r.params.user=="string"&&(d.value=r.params.user.toLowerCase()),!d.value&&!t.profile.user){t.logout();return}if(!d.value){p.push({name:"LearnEn",params:{user:t.profile.user}});return}if(t.profile.user!=d.value){t.logout(),p.push({name:"LearnEn"});return}}),b(()=>{m()});function L(){t.logout(),p.push({name:"LearnEn"})}function v(){s.value&&(s.value=s.value.toLowerCase(),t.login(s.value),f.get("/api/user/"+s.value),p.push({name:"LearnEn",params:{user:s.value}}),f.get("/api/learn/"+s.value+"/count").then(r=>{o.value.learntCount=r.data.count}))}function m(){let r="/api/learn/";t.profile.bLogin&&(r+=t.profile.user),o.value.loading=!0,f.get(r).then(n=>{o.value.words=n.data,o.value.loading=!1}).catch(n=>{console.log(n),o.value.words.length=0,o.value.loading=!1}),t.profile.bLogin&&f.get(r+"/count").then(n=>{o.value.learntCount=n.data.count})}function k(r){t.profile.bLogin&&f.get(`/api/learn/${t.profile.user}?word=${r}`).then(()=>{o.value.words=o.value.words.filter(n=>n!=r),o.value.learntCount+=1}).catch(n=>{console.log(n)})}return(r,n)=>(u(),i(y,null,[N(W),e("div",I,[J,e("div",K,[e("div",R,[c(t).profile.bLogin?(u(),i("div",T,[e("span",q,"Learnt:"+_(c(o).learntCount),1),e("button",{onClick:n[2]||(n[2]=a=>L()),class:"col-auto p-1 ms-2 btn btn-outline-primary btn-sm"}," Sign out ")])):(u(),i("div",j,[E(e("input",{"onUpdate:modelValue":n[0]||(n[0]=a=>V(s)?s.value=a:s=a),placeholder:"user",class:"form-control",onKeyup:$(v,["enter"])},null,40,F),[[U,c(s),void 0,{trim:!0}]]),e("div",M,[e("button",{onClick:n[1]||(n[1]=a=>v()),class:"col-auto btn btn-primary"}," Sign in ")])]))])]),e("div",z,[c(o).loading?(u(),i("span",A,H)):g("",!0)]),e("div",P,[c(t).profile.bLogin?(u(),i("div",Q,Z)):g("",!0),(u(!0),i(y,null,B(c(o).words,(a,C)=>(u(),i("div",{class:"row",key:a},[e("div",ee,[O(_(C+1)+": ",1),e("b",null,_(a),1)]),e("div",te,[ne,e("a",{class:"btn p-0 btn-sm",target:"_blank",href:"https://dictionary.cambridge.org/dictionary/english/"+a},"Cambridge",8,oe),e("a",{class:"btn p-0 ms-1 btn-sm",target:"_blank",href:"https://www.collinsdictionary.com/dictionary/english/"+a},"Collins",8,se),e("a",{class:"btn p-0 ms-1 btn-sm",target:"_blank",href:"https://www.lexico.com/en/definition/"+a},"Oxford",8,ae),e("a",{class:"btn p-0 ms-1 btn-sm",target:"_blank",href:"https://dict.cn/"+a},"Dict",8,re),le,c(t).profile.bLogin?(u(),i("button",{key:0,class:"btn btn-outline-info border-0 ms-2",onClick:ce=>k(a)}," x ",8,ie)):g("",!0)])]))),128)),e("div",ue,[e("button",{class:"btn btn-primary my-2",onClick:n[3]||(n[3]=a=>m())},"Refresh")])])])],64))}});export{fe as default};
