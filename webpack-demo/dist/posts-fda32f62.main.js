(self.webpackChunkwebpack_demo=self.webpackChunkwebpack_demo||[]).push([[287],{67:(e,t,n)=>{"use strict";var o=n(204),r=Object.create(null),c="undefined"==typeof document,i=Array.prototype.forEach;function s(){}function a(e,t){if(!t){if(!e.href)return;t=e.href.split("?")[0]}if(d(t)&&!1!==e.isLoaded&&t&&t.indexOf(".css")>-1){e.visited=!0;var n=e.cloneNode();n.isLoaded=!1,n.addEventListener("load",(function(){n.isLoaded||(n.isLoaded=!0,e.parentNode.removeChild(e))})),n.addEventListener("error",(function(){n.isLoaded||(n.isLoaded=!0,e.parentNode.removeChild(e))})),n.href="".concat(t,"?").concat(Date.now()),e.nextSibling?e.parentNode.insertBefore(n,e.nextSibling):e.parentNode.appendChild(n)}}function l(e){if(!e)return!1;var t=document.querySelectorAll("link"),n=!1;return i.call(t,(function(t){if(t.href){var r=function(e,t){var n;return e=o(e,{stripWWW:!1}),t.some((function(o){e.indexOf(t)>-1&&(n=o)})),n}(t.href,e);d(r)&&!0!==t.visited&&r&&(a(t,r),n=!0)}})),n}function u(){var e=document.querySelectorAll("link");i.call(e,(function(e){!0!==e.visited&&a(e)}))}function d(e){return!!/^https?:/i.test(e)}e.exports=function(e,t){if(c)return console.log("no window.document found, will not HMR CSS"),s;var n,i,a,d=function(e){var t=r[e];if(!t){if(document.currentScript)t=document.currentScript.src;else{var n=document.getElementsByTagName("script"),c=n[n.length-1];c&&(t=c.src)}r[e]=t}return function(e){if(!t)return null;var n=t.split(/([^\\/]+)\.js$/),r=n&&n[1];return r&&e?e.split(",").map((function(e){var n=new RegExp("".concat(r,"\\.js$"),"g");return o(t.replace(n,"".concat(e.replace(/{fileName}/g,r),".css")))})):[t.replace(".js",".css")]}}(e);return n=function(){var e=d(t.filename),n=l(e);if(t.locals)return console.log("[HMR] Detected local css modules. Reload all css"),void u();n?console.log("[HMR] css reload %s",e.join(" ")):(console.log("[HMR] Reload all css"),u())},i=50,a=0,function(){var e=this,t=arguments,o=function(){return n.apply(e,t)};clearTimeout(a),a=setTimeout(o,i)}}},204:e=>{"use strict";e.exports=function(e){if(e=e.trim(),/^data:/i.test(e))return e;var t=-1!==e.indexOf("//")?e.split("//")[0]+"//":"",n=e.replace(new RegExp(t,"i"),"").split("/"),o=n[0].toLowerCase().replace(/\.$/,"");return n[0]="",t+o+n.reduce((function(e,t){switch(t){case"..":e.pop();break;case".":break;default:e.push(t)}return e}),[]).join("/")}},421:(e,t,n)=>{"use strict";n.d(t,{Z:()=>o});const o=function(e){return fetch("https://jsonplaceholder.typicode.com".concat(e)).then((function(e){return e.json()}))}},300:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>r});var o=n(421);n(691),n(301);const r=function(){var e=document.createElement("div");return e.className="posts",e.innerHTML="<h2>Posts</h2>",(0,o.Z)("/posts").then((function(t){t.forEach((function(t){var n=document.createElement("article");n.className="post";var o=document.createElement("h3");o.textContent=t.title,n.appendChild(o);var r=document.createElement("p");r.textContent=t.body,n.appendChild(r),e.appendChild(n)}))})),e}},691:(e,t,n)=>{"use strict";var o=n(67)(e.id,{locals:!1});e.hot.dispose(o),e.hot.accept(void 0,o)},301:(e,t,n)=>{"use strict";var o=n(67)(e.id,{locals:!1});e.hot.dispose(o),e.hot.accept(void 0,o)}}]);