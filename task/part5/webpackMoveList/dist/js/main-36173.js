(()=>{"use strict";function e(e,t,n,o,r){return{sel:e,data:t,children:n,text:o,elm:r,key:void 0===t?void 0:t.key}}var t=Array.isArray;function n(e){return"string"==typeof e||"number"==typeof e}var o={createElement:function(e,t){return document.createElement(e,t)},createElementNS:function(e,t,n){return document.createElementNS(e,t,n)},createTextNode:function(e){return document.createTextNode(e)},createComment:function(e){return document.createComment(e)},insertBefore:function(e,t,n){e.insertBefore(t,n)},removeChild:function(e,t){e.removeChild(t)},appendChild:function(e,t){e.appendChild(t)},parentNode:function(e){return e.parentNode},nextSibling:function(e){return e.nextSibling},tagName:function(e){return e.tagName},setTextContent:function(e,t){e.textContent=t},getTextContent:function(e){return e.textContent},isElement:function(e){return 1===e.nodeType},isText:function(e){return 3===e.nodeType},isComment:function(e){return 8===e.nodeType}};function r(e){return void 0===e}function i(e){return void 0!==e}var a=e("",{},[],void 0,void 0);function l(e,t){var n,o,r=e.key===t.key,i=(null===(n=e.data)||void 0===n?void 0:n.is)===(null===(o=t.data)||void 0===o?void 0:o.is);return e.sel===t.sel&&r&&i}function d(e,t,n){for(var o,r={},i=t;i<=n;++i){var a=null===(o=e[i])||void 0===o?void 0:o.key;void 0!==a&&(r[a]=i)}return r}var s=["create","update","remove","destroy","pre","post"];function c(e,t){var n,o,r=t.elm,i=e.data.class,a=t.data.class;if((i||a)&&i!==a){for(o in a=a||{},i=i||{})i[o]&&!Object.prototype.hasOwnProperty.call(a,o)&&r.classList.remove(o);for(o in a)(n=a[o])!==i[o]&&r.classList[n?"add":"remove"](o)}}var f={create:c,update:c};function u(e,t){var n,o,r=t.elm,i=e.data.props,a=t.data.props;if((i||a)&&i!==a)for(n in i=i||{},a=a||{})o=a[n],i[n]===o||"value"===n&&r[n]===o||(r[n]=o)}var v={create:u,update:u},h="undefined"!=typeof window&&window.requestAnimationFrame.bind(window)||setTimeout,m=!1;function p(e,t,n){var o;o=function(){e[t]=n},h((function(){h(o)}))}function g(e,t){var n,o,r=t.elm,i=e.data.style,a=t.data.style;if((i||a)&&i!==a){a=a||{};var l="delayed"in(i=i||{});for(o in i)a[o]||("-"===o[0]&&"-"===o[1]?r.style.removeProperty(o):r.style[o]="");for(o in a)if(n=a[o],"delayed"===o&&a.delayed)for(var d in a.delayed)n=a.delayed[d],l&&n===i.delayed[d]||p(r.style,d,n);else"remove"!==o&&n!==i[o]&&("-"===o[0]&&"-"===o[1]?r.style.setProperty(o,n):r.style[o]=n)}}function y(e){return(y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function k(e,t,n){if("function"==typeof e)e.call(t,n,t);else if("object"===y(e))for(var o=0;o<e.length;o++)k(e[o],t,n)}function b(e,t){var n=e.type,o=t.data.on;o&&o[n]&&k(o[n],t,e)}function x(e,t){var n,o=e.data.on,r=e.listener,i=e.elm,a=t&&t.data.on,l=t&&t.elm;if(o!==a){if(o&&r)if(a)for(n in o)a[n]||i.removeEventListener(n,r,!1);else for(n in o)i.removeEventListener(n,r,!1);if(a){var d=t.listener=e.listener||function e(t){b(t,e.vnode)};if(d.vnode=t,o)for(n in a)o[n]||l.addEventListener(n,d,!1);else for(n in a)l.addEventListener(n,d,!1)}}}function w(e,t,n){if(e.ns="http://www.w3.org/2000/svg","foreignObject"!==n&&void 0!==t)for(var o=0;o<t.length;++o){var r=t[o].data;void 0!==r&&w(r,t[o].children,t[o].sel)}}function T(o,r,i){var a,l,d,s={};if(void 0!==i?(null!==r&&(s=r),t(i)?a=i:n(i)?l=i:i&&i.sel&&(a=[i])):null!=r&&(t(r)?a=r:n(r)?l=r:r&&r.sel?a=[r]:s=r),void 0!==a)for(d=0;d<a.length;++d)n(a[d])&&(a[d]=e(void 0,void 0,void 0,a[d],void 0));return"s"!==o[0]||"v"!==o[1]||"g"!==o[2]||3!==o.length&&"."!==o[3]&&"#"!==o[3]||w(s,a,o),e(o,s,a,l,void 0)}var C,S=function(c,f){var u,v,h={create:[],update:[],remove:[],destroy:[],pre:[],post:[]},m=void 0!==f?f:o;for(u=0;u<s.length;++u)for(h[s[u]]=[],v=0;v<c.length;++v){var p=c[v][s[u]];void 0!==p&&h[s[u]].push(p)}function g(t){var n=t.id?"#"+t.id:"",o=t.className?"."+t.className.split(" ").join("."):"";return e(m.tagName(t).toLowerCase()+n+o,{},[],void 0,t)}function y(e,t){return function(){if(0==--t){var n=m.parentNode(e);m.removeChild(n,e)}}}function k(e,o){var l,d,s,c=e.data;if(void 0!==c){var f=null===(l=c.hook)||void 0===l?void 0:l.init;i(f)&&(f(e),c=e.data)}var u=e.children,v=e.sel;if("!"===v)r(e.text)&&(e.text=""),e.elm=m.createComment(e.text);else if(void 0!==v){var p=v.indexOf("#"),g=v.indexOf(".",p),y=p>0?p:v.length,b=g>0?g:v.length,x=-1!==p||-1!==g?v.slice(0,Math.min(y,b)):v,w=e.elm=i(c)&&i(s=c.ns)?m.createElementNS(s,x,c):m.createElement(x,c);for(y<b&&w.setAttribute("id",v.slice(y+1,b)),g>0&&w.setAttribute("class",v.slice(b+1).replace(/\./g," ")),s=0;s<h.create.length;++s)h.create[s](a,e);if(t(u))for(s=0;s<u.length;++s){var T=u[s];null!=T&&m.appendChild(w,k(T,o))}else n(e.text)&&m.appendChild(w,m.createTextNode(e.text));var C=e.data.hook;i(C)&&(null===(d=C.create)||void 0===d||d.call(C,a,e),C.insert&&o.push(e))}else e.elm=m.createTextNode(e.text);return e.elm}function b(e,t,n,o,r,i){for(;o<=r;++o){var a=n[o];null!=a&&m.insertBefore(e,k(a,i),t)}}function x(e){var t,n,o=e.data;if(void 0!==o){null===(n=null===(t=null==o?void 0:o.hook)||void 0===t?void 0:t.destroy)||void 0===n||n.call(t,e);for(var r=0;r<h.destroy.length;++r)h.destroy[r](e);if(void 0!==e.children)for(var i=0;i<e.children.length;++i){var a=e.children[i];null!=a&&"string"!=typeof a&&x(a)}}}function w(e,t,n,o){for(var r,a;n<=o;++n){var l=void 0,d=void 0,s=t[n];if(null!=s)if(i(s.sel)){x(s),l=h.remove.length+1,d=y(s.elm,l);for(var c=0;c<h.remove.length;++c)h.remove[c](s,d);var f=null===(a=null===(r=null==s?void 0:s.data)||void 0===r?void 0:r.hook)||void 0===a?void 0:a.remove;i(f)?f(s,d):d()}else m.removeChild(e,s.elm)}}function T(e,t,n){var o,a,s,c,f,u=null===(o=t.data)||void 0===o?void 0:o.hook;null===(a=null==u?void 0:u.prepatch)||void 0===a||a.call(u,e,t);var v=t.elm=e.elm,p=e.children,g=t.children;if(e!==t){if(void 0!==t.data){for(var y=0;y<h.update.length;++y)h.update[y](e,t);null===(c=null===(s=t.data.hook)||void 0===s?void 0:s.update)||void 0===c||c.call(s,e,t)}r(t.text)?i(p)&&i(g)?p!==g&&function(e,t,n,o){for(var i,a,s,c=0,f=0,u=t.length-1,v=t[0],h=t[u],p=n.length-1,g=n[0],y=n[p];c<=u&&f<=p;)null==v?v=t[++c]:null==h?h=t[--u]:null==g?g=n[++f]:null==y?y=n[--p]:l(v,g)?(T(v,g,o),v=t[++c],g=n[++f]):l(h,y)?(T(h,y,o),h=t[--u],y=n[--p]):l(v,y)?(T(v,y,o),m.insertBefore(e,v.elm,m.nextSibling(h.elm)),v=t[++c],y=n[--p]):l(h,g)?(T(h,g,o),m.insertBefore(e,h.elm,v.elm),h=t[--u],g=n[++f]):(void 0===i&&(i=d(t,c,u)),r(a=i[g.key])||(s=t[a]).sel!==g.sel?m.insertBefore(e,k(g,o),v.elm):(T(s,g,o),t[a]=void 0,m.insertBefore(e,s.elm,v.elm)),g=n[++f]);(c<=u||f<=p)&&(c>u?b(e,null==n[p+1]?null:n[p+1].elm,n,f,p,o):w(e,t,c,u))}(v,p,g,n):i(g)?(i(e.text)&&m.setTextContent(v,""),b(v,null,g,0,g.length-1,n)):i(p)?w(v,p,0,p.length-1):i(e.text)&&m.setTextContent(v,""):e.text!==t.text&&(i(p)&&w(v,p,0,p.length-1),m.setTextContent(v,t.text)),null===(f=null==u?void 0:u.postpatch)||void 0===f||f.call(u,e,t)}}return function(e,t){var n,o,r,i=[];for(n=0;n<h.pre.length;++n)h.pre[n]();for(function(e){return void 0!==e.sel}(e)||(e=g(e)),l(e,t)?T(e,t,i):(o=e.elm,r=m.parentNode(o),k(t,i),null!==r&&(m.insertBefore(r,t.elm,m.nextSibling(o)),w(r,[e],0,0))),n=0;n<i.length;++n)i[n].data.hook.insert(i[n]);for(n=0;n<h.post.length;++n)h.post[n]();return t}}([f,v,{pre:function(){m=!1},create:g,update:g,destroy:function(e){var t,n,o=e.elm,r=e.data.style;if(r&&(t=r.destroy))for(n in t)o.style[n]=t[n]},remove:function(e,t){var n=e.data.style;if(n&&n.remove){var o;m||(e.elm.offsetLeft,m=!0);var r=e.elm,i=0,a=n.remove,l=0,d=[];for(o in a)d.push(o),r.style[o]=a[o];for(var s=getComputedStyle(r)["transition-property"].split(", ");i<s.length;++i)-1!==d.indexOf(s[i])&&l++;r.addEventListener("transitionend",(function(e){e.target===r&&--l,0===l&&t()}))}else t()}},{create:x,update:x,destroy:x}]),N=11,H="rank",E=[{rank:1,title:"The Shawshank Redemption",desc:"Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",elmHeight:0},{rank:2,title:"The Godfather",desc:"The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",elmHeight:0},{rank:3,title:"The Godfather: Part II",desc:"The early life and career of Vito Corleone in 1920s New York is portrayed while his son, Michael, expands and tightens his grip on his crime syndicate stretching from Lake Tahoe, Nevada to pre-revolution 1958 Cuba.",elmHeight:0},{rank:4,title:"The Dark Knight",desc:"When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, the caped crusader must come to terms with one of the greatest psychological tests of his ability to fight injustice.",elmHeight:0},{rank:5,title:"Pulp Fiction",desc:"The lives of two mob hit men, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",elmHeight:0},{rank:6,title:"Schindler's List",desc:"In Poland during World War II, Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",elmHeight:0},{rank:7,title:"12 Angry Men",desc:"A dissenting juror in a murder trial slowly manages to convince the others that the case is not as obviously clear as it seemed in court.",elmHeight:0},{rank:8,title:"The Good, the Bad and the Ugly",desc:"A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold buried in a remote cemetery.",elmHeight:0},{rank:9,title:"The Lord of the Rings: The Return of the King",desc:"Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",elmHeight:0},{rank:10,title:"Fight Club",desc:"An insomniac office worker looking for a way to change his life crosses paths with a devil-may-care soap maker and they form an underground fight club that evolves into something much, much more...",elmHeight:0}],L=[].concat(E);function A(e){H=e,L.sort((function(t,n){return t[e]>n[e]?1:t[e]<n[e]?-1:0})),M()}function B(){var e=E[Math.floor(10*Math.random())];console.log(e),L=[{rank:N++,title:e.title,desc:e.desc,elmHeight:0}].concat(L),M(),M()}function O(e){L=L.filter((function(t){return t!==e})),M()}function M(){L.reduce((function(e,t){var n=e[e.length-1];return t.offset=n?n.offset+n.elmHeight+8:8,e.concat(t)}),[]),0===L.length?0:L[L.length-1].offset+L[L.length-1].elmHeight,C=S(C,P(L))}function j(e){return T("div.list",e.map((function(e,t){return T("div.row",{key:e.rank,style:{opacity:"0",transform:"translate(-200px)",delayed:{transform:"translateY(".concat(e.offset,"px)"),opacity:"1"},remove:{opacity:"0",transform:"translateY(".concat(e.offset,"px) translateX(200px)")}},hook:{insert:function(t){e.elmHeight=t.elm.offsetHeight}}},[T("div",{style:{fontWeight:"bold"}},e.rank),T("div",e.title),T("div",e.desc),T("div.btn.rm-btn",{on:{click:function(){return O(e)}}},"x")])})))}function P(e){return T("div",[T("h1","TOP 10 Movies"),T("div",["Sort by: ",T("span.btn-group",[T("a.btn.rank",{class:{active:"rank"===H},on:{click:function(){return A("rank")}}},"Rank"),T("a.btn.title",{class:{active:"title"===H},on:{click:function(){return A("title")}}},"Title"),T("a.btn.desc",{class:{active:"desc"===H},on:{click:function(){return A("desc")}}},"Description")]),T("a.btn.add",{on:{click:B}},"Add")]),j(e)])}var G=document.querySelector("#app");C=S(G,P(L)),M()})();