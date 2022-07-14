/*! For license information please see 858.bb875db0.chunk.js.LICENSE.txt */
"use strict";(self.webpackChunkionic_listapp=self.webpackChunkionic_listapp||[]).push([[858],{1858:function(t,e,n){n.r(e),n.d(e,{scopeCss:function(){return $}});var r=n(2982),c="-shadowcsshost",o="-shadowcssslotted",s="-shadowcsscontext",a=")(?:\\(((?:\\([^)(]*\\)|[^)(]*)+?)\\))?([^,{]*)",i=new RegExp("(-shadowcsshost"+a,"gim"),u=new RegExp("(-shadowcsscontext"+a,"gim"),l=new RegExp("(-shadowcssslotted"+a,"gim"),h="-shadowcsshost-no-combinator",p=/-shadowcsshost-no-combinator([^\s]*)/,f=[/::shadow/g,/::content/g],g=/-shadowcsshost/gim,d=/:host/gim,v=/::slotted/gim,m=/:host-context/gim,x=/\/\*\s*[\s\S]*?\*\//g,w=/\/\*\s*#\s*source(Mapping)?URL=[\s\S]+?\*\//g,_=/(\s*)([^;\{\}]+?)(\s*)((?:{%BLOCK%}?\s*;?)|(?:\s*;))/g,b=/([{}])/g,S=/(^.*?[^\\])??((:+)(.*)|$)/,O="%BLOCK%",W=function(t,e){var n=k(t),r=0;return n.escapedString.replace(_,(function(){var t=arguments.length<=2?void 0:arguments[2],c="",o=arguments.length<=4?void 0:arguments[4],s="";o&&o.startsWith("{%BLOCK%")&&(c=n.blocks[r++],o=o.substring(O.length+1),s="{");var a={selector:t,content:c},i=e(a);return"".concat(arguments.length<=1?void 0:arguments[1]).concat(i.selector).concat(arguments.length<=3?void 0:arguments[3]).concat(s).concat(i.content).concat(o)}))},k=function(t){for(var e=t.split(b),n=[],r=[],c=0,o=[],s=0;s<e.length;s++){var a=e[s];"}"===a&&c--,c>0?o.push(a):(o.length>0&&(r.push(o.join("")),n.push(O),o=[]),n.push(a)),"{"===a&&c++}return o.length>0&&(r.push(o.join("")),n.push(O)),{escapedString:n.join(""),blocks:r}},j=function(t,e,n){return t.replace(e,(function(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];if(e[2]){for(var c=e[2].split(","),o=[],s=0;s<c.length;s++){var a=c[s].trim();if(!a)break;o.push(n(h,a,e[3]))}return o.join(",")}return h+e[3]}))},C=function(t,e,n){return t+e.replace(c,"")+n},E=function(t,e,n){return e.indexOf(c)>-1?C(t,e,n):t+e+n+", "+e+" "+t+n},R=function(t,e){var n=function(t){return t=t.replace(/\[/g,"\\[").replace(/\]/g,"\\]"),new RegExp("^("+t+")([>\\s~+[.,{:][\\s\\S]*)?$","m")}(e);return!n.test(t)},L=function(t,e){return t.replace(S,(function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"",c=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"";return n+e+r+c}))},T=function(t,e,n){e=e.replace(/\[is=([^\]]*)\]/g,(function(t){return arguments.length<=1?void 0:arguments[1]}));for(var r,c="."+e,o=function(t){var r=t.trim();if(!r)return"";if(t.indexOf(h)>-1)r=function(t,e,n){if(g.lastIndex=0,g.test(t)){var r=".".concat(n);return t.replace(p,(function(t,e){return L(e,r)})).replace(g,r+" ")}return e+" "+t}(t,e,n);else{var o=t.replace(g,"");o.length>0&&(r=L(o,c))}return r},s=function(t){var e=[],n=0;return{content:(t=t.replace(/(\[[^\]]*\])/g,(function(t,r){var c="__ph-".concat(n,"__");return e.push(r),n++,c}))).replace(/(:nth-[-\w]+)(\([^)]+\))/g,(function(t,r,c){var o="__ph-".concat(n,"__");return e.push(c),n++,r+o})),placeholders:e}}(t),a="",i=0,u=/( |>|\+|~(?!=))\s*/g,l=!((t=s.content).indexOf(h)>-1);null!==(r=u.exec(t));){var f=r[1],d=t.slice(i,r.index).trim(),v=(l=l||d.indexOf(h)>-1)?o(d):d;a+="".concat(v," ").concat(f," "),i=u.lastIndex}var m,x=t.substring(i);return a+=(l=l||x.indexOf(h)>-1)?o(x):x,m=s.placeholders,a.replace(/__ph-(\d+)__/g,(function(t,e){return m[+e]}))},B=function t(e,n,r,c,o){return W(e,(function(e){var o=e.selector,s=e.content;return"@"!==e.selector[0]?o=function(t,e,n,r){return t.split(",").map((function(t){return r&&t.indexOf("."+r)>-1?t.trim():R(t,e)?T(t,e,n).trim():t.trim()})).join(", ")}(e.selector,n,r,c):(e.selector.startsWith("@media")||e.selector.startsWith("@supports")||e.selector.startsWith("@page")||e.selector.startsWith("@document"))&&(s=t(e.content,n,r,c)),{selector:o.replace(/\s{2,}/g," ").trim(),content:s}}))},K=function(t,e,n,r,a){var p=function(t,e){var n="."+e+" > ",r=[];return t=t.replace(l,(function(){for(var t=arguments.length,e=new Array(t),c=0;c<t;c++)e[c]=arguments[c];if(e[2]){for(var o=e[2].trim(),s=e[3],a=n+o+s,i="",u=e[4]-1;u>=0;u--){var l=e[5][u];if("}"===l||","===l)break;i=l+i}var p=i+a,f="".concat(i.trimRight()).concat(a.trim());if(p.trim()!==f.trim()){var g="".concat(f,", ").concat(p);r.push({orgSelector:p,updatedSelector:g})}return a}return h+e[3]})),{selectors:r,cssText:t}}(t=function(t){return j(t,u,E)}(t=function(t){return j(t,i,C)}(t=t.replace(m,s).replace(d,c).replace(v,o))),r);return t=function(t){return f.reduce((function(t,e){return t.replace(e," ")}),t)}(t=p.cssText),e&&(t=B(t,e,n,r)),{cssText:(t=(t=t.replace(/-shadowcsshost-no-combinator/g,".".concat(n))).replace(/>\s*\*\s+([^{, ]+)/gm," $1 ")).trim(),slottedSelectors:p.selectors}},$=function(t,e,n){var c=e+"-h",o=e+"-s",s=t.match(w)||[];t=function(t){return t.replace(x,"")}(t);var a=[];if(n){var i=function(t){var e="/*!@___".concat(a.length,"___*/"),n="/*!@".concat(t.selector,"*/");return a.push({placeholder:e,comment:n}),t.selector=e+t.selector,t};t=W(t,(function(t){return"@"!==t.selector[0]?i(t):t.selector.startsWith("@media")||t.selector.startsWith("@supports")||t.selector.startsWith("@page")||t.selector.startsWith("@document")?(t.content=W(t.content,i),t):t}))}var u=K(t,e,c,o);return t=[u.cssText].concat((0,r.Z)(s)).join("\n"),n&&a.forEach((function(e){var n=e.placeholder,r=e.comment;t=t.replace(n,r)})),u.slottedSelectors.forEach((function(e){t=t.replace(e.orgSelector,e.updatedSelector)})),t}}}]);
//# sourceMappingURL=858.bb875db0.chunk.js.map