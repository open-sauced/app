"use strict";(self.webpackChunk_open_sauced_app=self.webpackChunk_open_sauced_app||[]).push([[7297],{"./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>_objectWithoutProperties});var _objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");function _objectWithoutProperties(source,excluded){if(null==source)return{};var key,i,target=(0,_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__.Z)(source,excluded);if(Object.getOwnPropertySymbols){var sourceSymbolKeys=Object.getOwnPropertySymbols(source);for(i=0;i<sourceSymbolKeys.length;i++)key=sourceSymbolKeys[i],excluded.indexOf(key)>=0||Object.prototype.propertyIsEnumerable.call(source,key)&&(target[key]=source[key])}return target}},"./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function _objectWithoutPropertiesLoose(source,excluded){if(null==source)return{};var key,i,target={},sourceKeys=Object.keys(source);for(i=0;i<sourceKeys.length;i++)key=sourceKeys[i],excluded.indexOf(key)>=0||(target[key]=source[key]);return target}__webpack_require__.d(__webpack_exports__,{Z:()=>_objectWithoutPropertiesLoose})},"./node_modules/@floating-ui/core/dist/floating-ui.core.browser.min.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function t(t){return t.split("-")[0]}function e(t){return t.split("-")[1]}function n(e){return["top","bottom"].includes(t(e))?"x":"y"}function r(t){return"y"===t?"height":"width"}function i(i,o,a){let{reference:l,floating:s}=i;const c=l.x+l.width/2-s.width/2,f=l.y+l.height/2-s.height/2,u=n(o),m=r(u),g=l[m]/2-s[m]/2,d="x"===u;let p;switch(t(o)){case"top":p={x:c,y:l.y-s.height};break;case"bottom":p={x:c,y:l.y+l.height};break;case"right":p={x:l.x+l.width,y:f};break;case"left":p={x:l.x-s.width,y:f};break;default:p={x:l.x,y:l.y}}switch(e(o)){case"start":p[u]-=g*(a&&d?-1:1);break;case"end":p[u]+=g*(a&&d?-1:1)}return p}__webpack_require__.d(__webpack_exports__,{Cp:()=>P,JB:()=>l,RR:()=>b,cv:()=>T,dp:()=>k,dr:()=>L,oo:()=>o,uY:()=>D,x7:()=>m});const o=async(t,e,n)=>{const{placement:r="bottom",strategy:o="absolute",middleware:a=[],platform:l}=n,s=await(null==l.isRTL?void 0:l.isRTL(e));let c=await l.getElementRects({reference:t,floating:e,strategy:o}),{x:f,y:u}=i(c,r,s),m=r,g={},d=0;for(let n=0;n<a.length;n++){const{name:p,fn:h}=a[n],{x:y,y:x,data:w,reset:v}=await h({x:f,y:u,initialPlacement:r,placement:m,strategy:o,middlewareData:g,rects:c,platform:l,elements:{reference:t,floating:e}});f=null!=y?y:f,u=null!=x?x:u,g={...g,[p]:{...g[p],...w}},v&&d<=50&&(d++,"object"==typeof v&&(v.placement&&(m=v.placement),v.rects&&(c=!0===v.rects?await l.getElementRects({reference:t,floating:e,strategy:o}):v.rects),({x:f,y:u}=i(c,m,s))),n=-1)}return{x:f,y:u,placement:m,strategy:o,middlewareData:g}};function a(t){return"number"!=typeof t?function(t){return{top:0,right:0,bottom:0,left:0,...t}}(t):{top:t,right:t,bottom:t,left:t}}function l(t){return{...t,top:t.y,left:t.x,right:t.x+t.width,bottom:t.y+t.height}}async function s(t,e){var n;void 0===e&&(e={});const{x:r,y:i,platform:o,rects:s,elements:c,strategy:f}=t,{boundary:u="clippingAncestors",rootBoundary:m="viewport",elementContext:g="floating",altBoundary:d=!1,padding:p=0}=e,h=a(p),y=c[d?"floating"===g?"reference":"floating":g],x=l(await o.getClippingRect({element:null==(n=await(null==o.isElement?void 0:o.isElement(y)))||n?y:y.contextElement||await(null==o.getDocumentElement?void 0:o.getDocumentElement(c.floating)),boundary:u,rootBoundary:m,strategy:f})),w=l(o.convertOffsetParentRelativeRectToViewportRelativeRect?await o.convertOffsetParentRelativeRectToViewportRelativeRect({rect:"floating"===g?{...s.floating,x:r,y:i}:s.reference,offsetParent:await(null==o.getOffsetParent?void 0:o.getOffsetParent(c.floating)),strategy:f}):s[g]);return{top:x.top-w.top+h.top,bottom:w.bottom-x.bottom+h.bottom,left:x.left-w.left+h.left,right:w.right-x.right+h.right}}const c=Math.min,f=Math.max;function u(t,e,n){return f(t,c(e,n))}const m=t=>({name:"arrow",options:t,async fn(i){const{element:o,padding:l=0}=null!=t?t:{},{x:s,y:c,placement:f,rects:m,platform:g}=i;if(null==o)return{};const d=a(l),p={x:s,y:c},h=n(f),y=e(f),x=r(h),w=await g.getDimensions(o),v="y"===h?"top":"left",b="y"===h?"bottom":"right",R=m.reference[x]+m.reference[h]-p[h]-m.floating[x],A=p[h]-m.reference[h],P=await(null==g.getOffsetParent?void 0:g.getOffsetParent(o));let T=P?"y"===h?P.clientHeight||0:P.clientWidth||0:0;0===T&&(T=m.floating[x]);const O=R/2-A/2,D=d[v],L=T-w[x]-d[b],k=T/2-w[x]/2+O,E=u(D,k,L),C=("start"===y?d[v]:d[b])>0&&k!==E&&m.reference[x]<=m.floating[x];return{[h]:p[h]-(C?k<D?D-k:L-k:0),data:{[h]:E,centerOffset:k-E}}}}),g={left:"right",right:"left",bottom:"top",top:"bottom"};function d(t){return t.replace(/left|right|bottom|top/g,(t=>g[t]))}function p(t,i,o){void 0===o&&(o=!1);const a=e(t),l=n(t),s=r(l);let c="x"===l?a===(o?"end":"start")?"right":"left":"start"===a?"bottom":"top";return i.reference[s]>i.floating[s]&&(c=d(c)),{main:c,cross:d(c)}}const h={start:"end",end:"start"};function y(t){return t.replace(/start|end/g,(t=>h[t]))}const x=["top","right","bottom","left"],b=(x.reduce(((t,e)=>t.concat(e,e+"-start",e+"-end")),[]),function(e){return void 0===e&&(e={}),{name:"flip",options:e,async fn(n){var r;const{placement:i,middlewareData:o,rects:a,initialPlacement:l,platform:c,elements:f}=n,{mainAxis:u=!0,crossAxis:m=!0,fallbackPlacements:g,fallbackStrategy:h="bestFit",flipAlignment:x=!0,...w}=e,v=t(i),b=g||(v!==l&&x?function(t){const e=d(t);return[y(t),e,y(e)]}(l):[d(l)]),R=[l,...b],A=await s(n,w),P=[];let T=(null==(r=o.flip)?void 0:r.overflows)||[];if(u&&P.push(A[v]),m){const{main:t,cross:e}=p(i,a,await(null==c.isRTL?void 0:c.isRTL(f.floating)));P.push(A[t],A[e])}if(T=[...T,{placement:i,overflows:P}],!P.every((t=>t<=0))){var O,D;const t=(null!=(O=null==(D=o.flip)?void 0:D.index)?O:0)+1,e=R[t];if(e)return{data:{index:t,overflows:T},reset:{placement:e}};let n="bottom";switch(h){case"bestFit":{var L;const t=null==(L=T.map((t=>[t,t.overflows.filter((t=>t>0)).reduce(((t,e)=>t+e),0)])).sort(((t,e)=>t[1]-e[1]))[0])?void 0:L[0].placement;t&&(n=t);break}case"initialPlacement":n=l}if(i!==n)return{reset:{placement:n}}}return{}}}});function R(t,e){return{top:t.top-e.height,right:t.right-e.width,bottom:t.bottom-e.height,left:t.left-e.width}}function A(t){return x.some((e=>t[e]>=0))}const P=function(t){let{strategy:e="referenceHidden",...n}=void 0===t?{}:t;return{name:"hide",async fn(t){const{rects:r}=t;switch(e){case"referenceHidden":{const e=R(await s(t,{...n,elementContext:"reference"}),r.reference);return{data:{referenceHiddenOffsets:e,referenceHidden:A(e)}}}case"escaped":{const e=R(await s(t,{...n,altBoundary:!0}),r.floating);return{data:{escapedOffsets:e,escaped:A(e)}}}default:return{}}}}},T=function(r){return void 0===r&&(r=0),{name:"offset",options:r,async fn(i){const{x:o,y:a}=i,l=await async function(r,i){const{placement:o,platform:a,elements:l}=r,s=await(null==a.isRTL?void 0:a.isRTL(l.floating)),c=t(o),f=e(o),u="x"===n(o),m=["left","top"].includes(c)?-1:1,g=s&&u?-1:1,d="function"==typeof i?i(r):i;let{mainAxis:p,crossAxis:h,alignmentAxis:y}="number"==typeof d?{mainAxis:d,crossAxis:0,alignmentAxis:null}:{mainAxis:0,crossAxis:0,alignmentAxis:null,...d};return f&&"number"==typeof y&&(h="end"===f?-1*y:y),u?{x:h*g,y:p*m}:{x:p*m,y:h*g}}(i,r);return{x:o+l.x,y:a+l.y,data:l}}}};function O(t){return"x"===t?"y":"x"}const D=function(e){return void 0===e&&(e={}),{name:"shift",options:e,async fn(r){const{x:i,y:o,placement:a}=r,{mainAxis:l=!0,crossAxis:c=!1,limiter:f={fn:t=>{let{x:e,y:n}=t;return{x:e,y:n}}},...m}=e,g={x:i,y:o},d=await s(r,m),p=n(t(a)),h=O(p);let y=g[p],x=g[h];if(l){const t="y"===p?"bottom":"right";y=u(y+d["y"===p?"top":"left"],y,y-d[t])}if(c){const t="y"===h?"bottom":"right";x=u(x+d["y"===h?"top":"left"],x,x-d[t])}const w=f.fn({...r,[p]:y,[h]:x});return{...w,data:{x:w.x-i,y:w.y-o}}}}},L=function(e){return void 0===e&&(e={}),{options:e,fn(r){const{x:i,y:o,placement:a,rects:l,middlewareData:s}=r,{offset:c=0,mainAxis:f=!0,crossAxis:u=!0}=e,m={x:i,y:o},g=n(a),d=O(g);let p=m[g],h=m[d];const y="function"==typeof c?c({...l,placement:a}):c,x="number"==typeof y?{mainAxis:y,crossAxis:0}:{mainAxis:0,crossAxis:0,...y};if(f){const t="y"===g?"height":"width",e=l.reference[g]-l.floating[t]+x.mainAxis,n=l.reference[g]+l.reference[t]-x.mainAxis;p<e?p=e:p>n&&(p=n)}if(u){var w,v,b,R;const e="y"===g?"width":"height",n=["top","left"].includes(t(a)),r=l.reference[d]-l.floating[e]+(n&&null!=(w=null==(v=s.offset)?void 0:v[d])?w:0)+(n?0:x.crossAxis),i=l.reference[d]+l.reference[e]+(n?0:null!=(b=null==(R=s.offset)?void 0:R[d])?b:0)-(n?x.crossAxis:0);h<r?h=r:h>i&&(h=i)}return{[g]:p,[d]:h}}}},k=function(n){return void 0===n&&(n={}),{name:"size",options:n,async fn(r){const{placement:i,rects:o,platform:a,elements:l}=r,{apply:c,...u}=n,m=await s(r,u),g=t(i),d=e(i);let p,h;"top"===g||"bottom"===g?(p=g,h=d===(await(null==a.isRTL?void 0:a.isRTL(l.floating))?"start":"end")?"left":"right"):(h=g,p="end"===d?"top":"bottom");const y=f(m.left,0),x=f(m.right,0),w=f(m.top,0),v=f(m.bottom,0),b={availableHeight:o.floating.height-(["left","right"].includes(i)?2*(0!==w||0!==v?w+v:f(m.top,m.bottom)):m[p]),availableWidth:o.floating.width-(["top","bottom"].includes(i)?2*(0!==y||0!==x?y+x:f(m.left,m.right)):m[h])},R=await a.getDimensions(l.floating);null==c||c({...r,...b});const A=await a.getDimensions(l.floating);return R.width!==A.width||R.height!==A.height?{reset:{rects:!0}}:{}}}}},"./node_modules/@floating-ui/dom/dist/floating-ui.dom.browser.min.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Me:()=>N,oo:()=>z});var _floating_ui_core__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@floating-ui/core/dist/floating-ui.core.browser.min.mjs");function n(t){return t&&t.document&&t.location&&t.alert&&t.setInterval}function o(t){if(null==t)return window;if(!n(t)){const e=t.ownerDocument;return e&&e.defaultView||window}return t}function i(t){return o(t).getComputedStyle(t)}function r(t){return n(t)?"":t?(t.nodeName||"").toLowerCase():""}function l(){const t=navigator.userAgentData;return null!=t&&t.brands?t.brands.map((t=>t.brand+"/"+t.version)).join(" "):navigator.userAgent}function c(t){return t instanceof o(t).HTMLElement}function f(t){return t instanceof o(t).Element}function s(t){return"undefined"!=typeof ShadowRoot&&(t instanceof o(t).ShadowRoot||t instanceof ShadowRoot)}function u(t){const{overflow:e,overflowX:n,overflowY:o}=i(t);return/auto|scroll|overlay|hidden/.test(e+o+n)}function d(t){return["table","td","th"].includes(r(t))}function h(t){const e=/firefox/i.test(l()),n=i(t);return"none"!==n.transform||"none"!==n.perspective||"paint"===n.contain||["transform","perspective"].includes(n.willChange)||e&&"filter"===n.willChange||e&&!!n.filter&&"none"!==n.filter}function a(){return!/^((?!chrome|android).)*safari/i.test(l())}const g=Math.min,p=Math.max,m=Math.round;function w(t,e,n){var i,r,l,s;void 0===e&&(e=!1),void 0===n&&(n=!1);const u=t.getBoundingClientRect();let d=1,h=1;e&&c(t)&&(d=t.offsetWidth>0&&m(u.width)/t.offsetWidth||1,h=t.offsetHeight>0&&m(u.height)/t.offsetHeight||1);const g=f(t)?o(t):window,p=!a()&&n,w=(u.left+(p&&null!=(i=null==(r=g.visualViewport)?void 0:r.offsetLeft)?i:0))/d,v=(u.top+(p&&null!=(l=null==(s=g.visualViewport)?void 0:s.offsetTop)?l:0))/h,y=u.width/d,x=u.height/h;return{width:y,height:x,top:v,right:w+y,bottom:v+x,left:w,x:w,y:v}}function v(t){return(e=t,(e instanceof o(e).Node?t.ownerDocument:t.document)||window.document).documentElement;var e}function y(t){return f(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function x(t){return w(v(t)).left+y(t).scrollLeft}function b(t,e,n){const o=c(e),i=v(e),l=w(t,o&&function(t){const e=w(t);return m(e.width)!==t.offsetWidth||m(e.height)!==t.offsetHeight}(e),"fixed"===n);let f={scrollLeft:0,scrollTop:0};const s={x:0,y:0};if(o||!o&&"fixed"!==n)if(("body"!==r(e)||u(i))&&(f=y(e)),c(e)){const t=w(e,!0);s.x=t.x+e.clientLeft,s.y=t.y+e.clientTop}else i&&(s.x=x(i));return{x:l.left+f.scrollLeft-s.x,y:l.top+f.scrollTop-s.y,width:l.width,height:l.height}}function L(t){return"html"===r(t)?t:t.assignedSlot||t.parentNode||(s(t)?t.host:null)||v(t)}function R(t){return c(t)&&"fixed"!==getComputedStyle(t).position?t.offsetParent:null}function T(t){const e=o(t);let n=R(t);for(;n&&d(n)&&"static"===getComputedStyle(n).position;)n=R(n);return n&&("html"===r(n)||"body"===r(n)&&"static"===getComputedStyle(n).position&&!h(n))?e:n||function(t){let e=L(t);for(s(e)&&(e=e.host);c(e)&&!["html","body"].includes(r(e));){if(h(e))return e;e=e.parentNode}return null}(t)||e}function W(t){if(c(t))return{width:t.offsetWidth,height:t.offsetHeight};const e=w(t);return{width:e.width,height:e.height}}function E(t){const e=L(t);return["html","body","#document"].includes(r(e))?t.ownerDocument.body:c(e)&&u(e)?e:E(e)}function H(t,e){var n;void 0===e&&(e=[]);const i=E(t),r=i===(null==(n=t.ownerDocument)?void 0:n.body),l=o(i),c=r?[l].concat(l.visualViewport||[],u(i)?i:[]):i,f=e.concat(c);return r?f:f.concat(H(c))}function C(e,n,r){return"viewport"===n?(0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.JB)(function(t,e){const n=o(t),i=v(t),r=n.visualViewport;let l=i.clientWidth,c=i.clientHeight,f=0,s=0;if(r){l=r.width,c=r.height;const t=a();(t||!t&&"fixed"===e)&&(f=r.offsetLeft,s=r.offsetTop)}return{width:l,height:c,x:f,y:s}}(e,r)):f(n)?function(t,e){const n=w(t,!1,"fixed"===e),o=n.top+t.clientTop,i=n.left+t.clientLeft;return{top:o,left:i,x:i,y:o,right:i+t.clientWidth,bottom:o+t.clientHeight,width:t.clientWidth,height:t.clientHeight}}(n,r):(0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.JB)(function(t){var e;const n=v(t),o=y(t),r=null==(e=t.ownerDocument)?void 0:e.body,l=p(n.scrollWidth,n.clientWidth,r?r.scrollWidth:0,r?r.clientWidth:0),c=p(n.scrollHeight,n.clientHeight,r?r.scrollHeight:0,r?r.clientHeight:0);let f=-o.scrollLeft+x(t);const s=-o.scrollTop;return"rtl"===i(r||n).direction&&(f+=p(n.clientWidth,r?r.clientWidth:0)-l),{width:l,height:c,x:f,y:s}}(v(e)))}function S(t){const e=H(t),n=["absolute","fixed"].includes(i(t).position)&&c(t)?T(t):t;return f(n)?e.filter((t=>f(t)&&function(t,e){const n=null==e.getRootNode?void 0:e.getRootNode();if(t.contains(e))return!0;if(n&&s(n)){let n=e;do{if(n&&t===n)return!0;n=n.parentNode||n.host}while(n)}return!1}(t,n)&&"body"!==r(t))):[]}const D={getClippingRect:function(t){let{element:e,boundary:n,rootBoundary:o,strategy:i}=t;const r=[..."clippingAncestors"===n?S(e):[].concat(n),o],l=r[0],c=r.reduce(((t,n)=>{const o=C(e,n,i);return t.top=p(o.top,t.top),t.right=g(o.right,t.right),t.bottom=g(o.bottom,t.bottom),t.left=p(o.left,t.left),t}),C(e,l,i));return{width:c.right-c.left,height:c.bottom-c.top,x:c.left,y:c.top}},convertOffsetParentRelativeRectToViewportRelativeRect:function(t){let{rect:e,offsetParent:n,strategy:o}=t;const i=c(n),l=v(n);if(n===l)return e;let f={scrollLeft:0,scrollTop:0};const s={x:0,y:0};if((i||!i&&"fixed"!==o)&&(("body"!==r(n)||u(l))&&(f=y(n)),c(n))){const t=w(n,!0);s.x=t.x+n.clientLeft,s.y=t.y+n.clientTop}return{...e,x:e.x-f.scrollLeft+s.x,y:e.y-f.scrollTop+s.y}},isElement:f,getDimensions:W,getOffsetParent:T,getDocumentElement:v,getElementRects:t=>{let{reference:e,floating:n,strategy:o}=t;return{reference:b(e,T(n),o),floating:{...W(n),x:0,y:0}}},getClientRects:t=>Array.from(t.getClientRects()),isRTL:t=>"rtl"===i(t).direction};function N(t,e,n,o){void 0===o&&(o={});const{ancestorScroll:i=!0,ancestorResize:r=!0,elementResize:l=!0,animationFrame:c=!1}=o,s=i&&!c,u=r&&!c,d=s||u?[...f(t)?H(t):[],...H(e)]:[];d.forEach((t=>{s&&t.addEventListener("scroll",n,{passive:!0}),u&&t.addEventListener("resize",n)}));let h,a=null;if(l){let o=!0;a=new ResizeObserver((()=>{o||n(),o=!1})),f(t)&&!c&&a.observe(t),a.observe(e)}let g=c?w(t):null;return c&&function e(){const o=w(t);!g||o.x===g.x&&o.y===g.y&&o.width===g.width&&o.height===g.height||n(),g=o,h=requestAnimationFrame(e)}(),n(),()=>{var t;d.forEach((t=>{s&&t.removeEventListener("scroll",n),u&&t.removeEventListener("resize",n)})),null==(t=a)||t.disconnect(),a=null,c&&cancelAnimationFrame(h)}}const z=(t,n,o)=>(0,_floating_ui_core__WEBPACK_IMPORTED_MODULE_0__.oo)(t,n,{platform:D,...o})},"./node_modules/@floating-ui/react-dom/dist/floating-ui.react-dom.esm.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{YF:()=>useFloating,x7:()=>arrow});var _floating_ui_dom__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@floating-ui/dom/dist/floating-ui.dom.browser.min.mjs"),_floating_ui_dom__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@floating-ui/core/dist/floating-ui.core.browser.min.mjs"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),react_dom__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/next/dist/compiled/react-dom/index.js"),index="undefined"!=typeof document?react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect:react__WEBPACK_IMPORTED_MODULE_0__.useEffect;function deepEqual(a,b){if(a===b)return!0;if(typeof a!=typeof b)return!1;if("function"==typeof a&&a.toString()===b.toString())return!0;let length,i,keys;if(a&&b&&"object"==typeof a){if(Array.isArray(a)){if(length=a.length,length!=b.length)return!1;for(i=length;0!=i--;)if(!deepEqual(a[i],b[i]))return!1;return!0}if(keys=Object.keys(a),length=keys.length,length!==Object.keys(b).length)return!1;for(i=length;0!=i--;)if(!Object.prototype.hasOwnProperty.call(b,keys[i]))return!1;for(i=length;0!=i--;){const key=keys[i];if(("_owner"!==key||!a.$$typeof)&&!deepEqual(a[key],b[key]))return!1}return!0}return a!=a&&b!=b}function useFloating(_temp){let{middleware,placement="bottom",strategy="absolute",whileElementsMounted}=void 0===_temp?{}:_temp;const reference=react__WEBPACK_IMPORTED_MODULE_0__.useRef(null),floating=react__WEBPACK_IMPORTED_MODULE_0__.useRef(null),whileElementsMountedRef=function useLatestRef(value){const ref=react__WEBPACK_IMPORTED_MODULE_0__.useRef(value);return index((()=>{ref.current=value})),ref}(whileElementsMounted),cleanupRef=react__WEBPACK_IMPORTED_MODULE_0__.useRef(null),[data,setData]=react__WEBPACK_IMPORTED_MODULE_0__.useState({x:null,y:null,strategy,placement,middlewareData:{}}),[latestMiddleware,setLatestMiddleware]=react__WEBPACK_IMPORTED_MODULE_0__.useState(middleware);deepEqual(null==latestMiddleware?void 0:latestMiddleware.map((_ref=>{let{options}=_ref;return options})),null==middleware?void 0:middleware.map((_ref2=>{let{options}=_ref2;return options})))||setLatestMiddleware(middleware);const update=react__WEBPACK_IMPORTED_MODULE_0__.useCallback((()=>{reference.current&&floating.current&&(0,_floating_ui_dom__WEBPACK_IMPORTED_MODULE_2__.oo)(reference.current,floating.current,{middleware:latestMiddleware,placement,strategy}).then((data=>{isMountedRef.current&&react_dom__WEBPACK_IMPORTED_MODULE_1__.flushSync((()=>{setData(data)}))}))}),[latestMiddleware,placement,strategy]);index((()=>{isMountedRef.current&&update()}),[update]);const isMountedRef=react__WEBPACK_IMPORTED_MODULE_0__.useRef(!1);index((()=>(isMountedRef.current=!0,()=>{isMountedRef.current=!1})),[]);const runElementMountCallback=react__WEBPACK_IMPORTED_MODULE_0__.useCallback((()=>{if("function"==typeof cleanupRef.current&&(cleanupRef.current(),cleanupRef.current=null),reference.current&&floating.current)if(whileElementsMountedRef.current){const cleanupFn=whileElementsMountedRef.current(reference.current,floating.current,update);cleanupRef.current=cleanupFn}else update()}),[update,whileElementsMountedRef]),setReference=react__WEBPACK_IMPORTED_MODULE_0__.useCallback((node=>{reference.current=node,runElementMountCallback()}),[runElementMountCallback]),setFloating=react__WEBPACK_IMPORTED_MODULE_0__.useCallback((node=>{floating.current=node,runElementMountCallback()}),[runElementMountCallback]),refs=react__WEBPACK_IMPORTED_MODULE_0__.useMemo((()=>({reference,floating})),[]);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((()=>({...data,update,refs,reference:setReference,floating:setFloating})),[data,update,refs,setReference,setFloating])}const arrow=options=>{const{element,padding}=options;return{name:"arrow",options,fn:args=>function isRef(value){return Object.prototype.hasOwnProperty.call(value,"current")}(element)?null!=element.current?(0,_floating_ui_dom__WEBPACK_IMPORTED_MODULE_3__.x7)({element:element.current,padding}).fn(args):{}:element?(0,_floating_ui_dom__WEBPACK_IMPORTED_MODULE_3__.x7)({element,padding}).fn(args):{}}}},"./node_modules/@radix-ui/primitive/dist/index.module.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function $e42e1063c40fb3ef$export$b9ecd428b558ff10(originalEventHandler,ourEventHandler,{checkForDefaultPrevented=!0}={}){return function handleEvent(event){if(null==originalEventHandler||originalEventHandler(event),!1===checkForDefaultPrevented||!event.defaultPrevented)return null==ourEventHandler?void 0:ourEventHandler(event)}}__webpack_require__.d(__webpack_exports__,{M:()=>$e42e1063c40fb3ef$export$b9ecd428b558ff10})},"./node_modules/@radix-ui/react-compose-refs/dist/index.module.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{F:()=>$6ed0406888f73fc4$export$43e446d32b3d21af,e:()=>$6ed0406888f73fc4$export$c7b2cbe3552a0d05});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js");function $6ed0406888f73fc4$export$43e446d32b3d21af(...refs){return node=>refs.forEach((ref=>function $6ed0406888f73fc4$var$setRef(ref,value){"function"==typeof ref?ref(value):null!=ref&&(ref.current=value)}(ref,node)))}function $6ed0406888f73fc4$export$c7b2cbe3552a0d05(...refs){return(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)($6ed0406888f73fc4$export$43e446d32b3d21af(...refs),refs)}},"./node_modules/@radix-ui/react-context/dist/index.module.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{b:()=>$c512c27ab02ef895$export$50c7b4e9d9f19c1,k:()=>$c512c27ab02ef895$export$fd42f52fd3ae1109});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js");function $c512c27ab02ef895$export$fd42f52fd3ae1109(rootComponentName,defaultContext){const Context=(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(defaultContext);function Provider(props){const{children,...context}=props,value=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((()=>context),Object.values(context));return(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Context.Provider,{value},children)}return Provider.displayName=rootComponentName+"Provider",[Provider,function useContext(consumerName){const context=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(Context);if(context)return context;if(void 0!==defaultContext)return defaultContext;throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``)}]}function $c512c27ab02ef895$export$50c7b4e9d9f19c1(scopeName,createContextScopeDeps=[]){let defaultContexts=[];const createScope=()=>{const scopeContexts=defaultContexts.map((defaultContext=>(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(defaultContext)));return function useScope(scope){const contexts=(null==scope?void 0:scope[scopeName])||scopeContexts;return(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((()=>({[`__scope${scopeName}`]:{...scope,[scopeName]:contexts}})),[scope,contexts])}};return createScope.scopeName=scopeName,[function $c512c27ab02ef895$export$fd42f52fd3ae1109(rootComponentName,defaultContext){const BaseContext=(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(defaultContext),index=defaultContexts.length;function Provider(props){const{scope,children,...context}=props,Context=(null==scope?void 0:scope[scopeName][index])||BaseContext,value=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((()=>context),Object.values(context));return(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Context.Provider,{value},children)}return defaultContexts=[...defaultContexts,defaultContext],Provider.displayName=rootComponentName+"Provider",[Provider,function useContext(consumerName,scope){const Context=(null==scope?void 0:scope[scopeName][index])||BaseContext,context=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(Context);if(context)return context;if(void 0!==defaultContext)return defaultContext;throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``)}]},$c512c27ab02ef895$var$composeContextScopes(createScope,...createContextScopeDeps)]}function $c512c27ab02ef895$var$composeContextScopes(...scopes){const baseScope=scopes[0];if(1===scopes.length)return baseScope;const createScope1=()=>{const scopeHooks=scopes.map((createScope=>({useScope:createScope(),scopeName:createScope.scopeName})));return function useComposedScopes(overrideScopes){const nextScopes1=scopeHooks.reduce(((nextScopes,{useScope,scopeName})=>({...nextScopes,...useScope(overrideScopes)[`__scope${scopeName}`]})),{});return(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((()=>({[`__scope${baseScope.scopeName}`]:nextScopes1})),[nextScopes1])}};return createScope1.scopeName=baseScope.scopeName,createScope1}},"./node_modules/@radix-ui/react-presence/dist/index.module.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{z:()=>$921a889cee6df7e8$export$99c2b779aa4e8b8b});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),react_dom__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/next/dist/compiled/react-dom/index.js"),_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@radix-ui/react-compose-refs/dist/index.module.js"),_radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@radix-ui/react-use-layout-effect/dist/index.module.js");const $921a889cee6df7e8$export$99c2b779aa4e8b8b=props=>{const{present,children}=props,presence=function $921a889cee6df7e8$var$usePresence(present){const[node1,setNode]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),stylesRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({}),prevPresentRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(present),prevAnimationNameRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)("none"),initialState=present?"mounted":"unmounted",[state,send]=function $fe963b355347cc68$export$3e6543de14f8614f(initialState,machine){return(0,react__WEBPACK_IMPORTED_MODULE_0__.useReducer)(((state,event)=>{const nextState=machine[state][event];return null!=nextState?nextState:state}),initialState)}(initialState,{mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}});return(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{const currentAnimationName=$921a889cee6df7e8$var$getAnimationName(stylesRef.current);prevAnimationNameRef.current="mounted"===state?currentAnimationName:"none"}),[state]),(0,_radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_3__.b)((()=>{const styles=stylesRef.current,wasPresent=prevPresentRef.current;if(wasPresent!==present){const prevAnimationName=prevAnimationNameRef.current,currentAnimationName=$921a889cee6df7e8$var$getAnimationName(styles);if(present)send("MOUNT");else if("none"===currentAnimationName||"none"===(null==styles?void 0:styles.display))send("UNMOUNT");else{send(wasPresent&&prevAnimationName!==currentAnimationName?"ANIMATION_OUT":"UNMOUNT")}prevPresentRef.current=present}}),[present,send]),(0,_radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_3__.b)((()=>{if(node1){const handleAnimationEnd=event=>{const isCurrentAnimation=$921a889cee6df7e8$var$getAnimationName(stylesRef.current).includes(event.animationName);event.target===node1&&isCurrentAnimation&&(0,react_dom__WEBPACK_IMPORTED_MODULE_1__.flushSync)((()=>send("ANIMATION_END")))},handleAnimationStart=event=>{event.target===node1&&(prevAnimationNameRef.current=$921a889cee6df7e8$var$getAnimationName(stylesRef.current))};return node1.addEventListener("animationstart",handleAnimationStart),node1.addEventListener("animationcancel",handleAnimationEnd),node1.addEventListener("animationend",handleAnimationEnd),()=>{node1.removeEventListener("animationstart",handleAnimationStart),node1.removeEventListener("animationcancel",handleAnimationEnd),node1.removeEventListener("animationend",handleAnimationEnd)}}send("ANIMATION_END")}),[node1,send]),{isPresent:["mounted","unmountSuspended"].includes(state),ref:(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((node=>{node&&(stylesRef.current=getComputedStyle(node)),setNode(node)}),[])}}(present),child="function"==typeof children?children({present:presence.isPresent}):react__WEBPACK_IMPORTED_MODULE_0__.Children.only(children),ref=(0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_2__.e)(presence.ref,child.ref);return"function"==typeof children||presence.isPresent?(0,react__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(child,{ref}):null};function $921a889cee6df7e8$var$getAnimationName(styles){return(null==styles?void 0:styles.animationName)||"none"}$921a889cee6df7e8$export$99c2b779aa4e8b8b.displayName="Presence"},"./node_modules/@radix-ui/react-use-callback-ref/dist/index.module.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{W:()=>$b1b2314f5f9a1d84$export$25bec8c6f54ee79a});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js");function $b1b2314f5f9a1d84$export$25bec8c6f54ee79a(callback){const callbackRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(callback);return(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{callbackRef.current=callback})),(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((()=>(...args)=>{var _callbackRef$current;return null===(_callbackRef$current=callbackRef.current)||void 0===_callbackRef$current?void 0:_callbackRef$current.call(callbackRef,...args)}),[])}},"./node_modules/@radix-ui/react-use-controllable-state/dist/index.module.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{T:()=>$71cd76cc60e0454e$export$6f32135080cb4c3});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),_radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@radix-ui/react-use-callback-ref/dist/index.module.js");function $71cd76cc60e0454e$export$6f32135080cb4c3({prop,defaultProp,onChange=()=>{}}){const[uncontrolledProp,setUncontrolledProp]=function $71cd76cc60e0454e$var$useUncontrolledState({defaultProp,onChange}){const uncontrolledState=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(defaultProp),[value]=uncontrolledState,prevValueRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(value),handleChange=(0,_radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_1__.W)(onChange);return(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{prevValueRef.current!==value&&(handleChange(value),prevValueRef.current=value)}),[value,prevValueRef,handleChange]),uncontrolledState}({defaultProp,onChange}),isControlled=void 0!==prop,value1=isControlled?prop:uncontrolledProp,handleChange=(0,_radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_1__.W)(onChange);return[value1,(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((nextValue=>{if(isControlled){const value="function"==typeof nextValue?nextValue(prop):nextValue;value!==prop&&handleChange(value)}else setUncontrolledProp(nextValue)}),[isControlled,prop,setUncontrolledProp,handleChange])]}},"./node_modules/@radix-ui/react-use-layout-effect/dist/index.module.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{b:()=>$9f79659886946c16$export$e5c5a5f917a5871c});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js");const $9f79659886946c16$export$e5c5a5f917a5871c=Boolean(null===globalThis||void 0===globalThis?void 0:globalThis.document)?react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect:()=>{}},"./node_modules/@radix-ui/react-use-size/dist/index.module.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{t:()=>$db6c3485150b8e66$export$1ab7ae714698c4b8});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),_radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@radix-ui/react-use-layout-effect/dist/index.module.js");function $db6c3485150b8e66$export$1ab7ae714698c4b8(element){const[size,setSize]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(void 0);return(0,_radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_1__.b)((()=>{if(element){setSize({width:element.offsetWidth,height:element.offsetHeight});const resizeObserver=new ResizeObserver((entries=>{if(!Array.isArray(entries))return;if(!entries.length)return;const entry=entries[0];let width,height;if("borderBoxSize"in entry){const borderSizeEntry=entry.borderBoxSize,borderSize=Array.isArray(borderSizeEntry)?borderSizeEntry[0]:borderSizeEntry;width=borderSize.inlineSize,height=borderSize.blockSize}else width=element.offsetWidth,height=element.offsetHeight;setSize({width,height})}));return resizeObserver.observe(element,{box:"border-box"}),()=>resizeObserver.unobserve(element)}setSize(void 0)}),[element]),size}},"./node_modules/clsx/dist/clsx.m.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function r(e){var t,f,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(f=r(e[t]))&&(n&&(n+=" "),n+=f);else for(t in e)e[t]&&(n&&(n+=" "),n+=t);return n}function clsx(){for(var e,t,f=0,n="";f<arguments.length;)(e=arguments[f++])&&(t=r(e))&&(n&&(n+=" "),n+=t);return n}__webpack_require__.d(__webpack_exports__,{W:()=>clsx,Z:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=clsx}}]);