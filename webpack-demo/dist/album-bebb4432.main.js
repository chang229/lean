(self.webpackChunkwebpack_demo=self.webpackChunkwebpack_demo||[]).push([[985],{67:(e,t,n)=>{"use strict";var r=n(204),o=Object.create(null),c="undefined"==typeof document,i=Array.prototype.forEach;function a(){}function s(e,t){if(!t){if(!e.href)return;t=e.href.split("?")[0]}if(d(t)&&!1!==e.isLoaded&&t&&t.indexOf(".css")>-1){e.visited=!0;var n=e.cloneNode();n.isLoaded=!1,n.addEventListener("load",(function(){n.isLoaded||(n.isLoaded=!0,e.parentNode.removeChild(e))})),n.addEventListener("error",(function(){n.isLoaded||(n.isLoaded=!0,e.parentNode.removeChild(e))})),n.href="".concat(t,"?").concat(Date.now()),e.nextSibling?e.parentNode.insertBefore(n,e.nextSibling):e.parentNode.appendChild(n)}}function l(e){if(!e)return!1;var t=document.querySelectorAll("link"),n=!1;return i.call(t,(function(t){if(t.href){var o=function(e,t){var n;return e=r(e,{stripWWW:!1}),t.some((function(r){e.indexOf(t)>-1&&(n=r)})),n}(t.href,e);d(o)&&!0!==t.visited&&o&&(s(t,o),n=!0)}})),n}function u(){var e=document.querySelectorAll("link");i.call(e,(function(e){!0!==e.visited&&s(e)}))}function d(e){return!!/^https?:/i.test(e)}e.exports=function(e,t){if(c)return console.log("no window.document found, will not HMR CSS"),a;var n,i,s,d=function(e){var t=o[e];if(!t){if(document.currentScript)t=document.currentScript.src;else{var n=document.getElementsByTagName("script"),c=n[n.length-1];c&&(t=c.src)}o[e]=t}return function(e){if(!t)return null;var n=t.split(/([^\\/]+)\.js$/),o=n&&n[1];return o&&e?e.split(",").map((function(e){var n=new RegExp("".concat(o,"\\.js$"),"g");return r(t.replace(n,"".concat(e.replace(/{fileName}/g,o),".css")))})):[t.replace(".js",".css")]}}(e);return n=function(){var e=d(t.filename),n=l(e);if(t.locals)return console.log("[HMR] Detected local css modules. Reload all css"),void u();n?console.log("[HMR] css reload %s",e.join(" ")):(console.log("[HMR] Reload all css"),u())},i=50,s=0,function(){var e=this,t=arguments,r=function(){return n.apply(e,t)};clearTimeout(s),s=setTimeout(r,i)}}},204:e=>{"use strict";e.exports=function(e){if(e=e.trim(),/^data:/i.test(e))return e;var t=-1!==e.indexOf("//")?e.split("//")[0]+"//":"",n=e.replace(new RegExp(t,"i"),"").split("/"),r=n[0].toLowerCase().replace(/\.$/,"");return n[0]="",t+r+n.reduce((function(e,t){switch(t){case"..":e.pop();break;case".":break;default:e.push(t)}return e}),[]).join("/")}},231:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>o});var r=n(421);n(691),n(532);const o=function(){var e=document.createElement("div");return e.className="album",e.innerHTML="<h2>Albums</h2>",(0,r.Z)("/photos?albumId=1").then((function(t){t.forEach((function(t){var n=document.createElement("section");n.className="photo";var r=document.createElement("img");r.src=t.thumbnailUrl,n.appendChild(r);var o=document.createElement("h3");o.textContent=t.title,n.appendChild(o),e.appendChild(n)}))})),e}},421:(e,t,n)=>{"use strict";n.d(t,{Z:()=>r});const r=function(e){return fetch("https://jsonplaceholder.typicode.com".concat(e)).then((function(e){return e.json()}))}},532:(e,t,n)=>{"use strict";var r=n(67)(e.id,{locals:!1});e.hot.dispose(r),e.hot.accept(void 0,r)},691:(e,t,n)=>{"use strict";var r=n(67)(e.id,{locals:!1});e.hot.dispose(r),e.hot.accept(void 0,r)}}]);