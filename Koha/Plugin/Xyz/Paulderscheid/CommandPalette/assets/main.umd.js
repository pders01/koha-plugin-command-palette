(function($,y){typeof exports=="object"&&typeof module<"u"?module.exports=y():typeof define=="function"&&define.amd?define(y):($=typeof globalThis<"u"?globalThis:$||self,$.CommandPaletteBundle=y())})(this,function(){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ht;const $=globalThis,y=$.ShadowRoot&&($.ShadyCSS===void 0||$.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,V=Symbol(),F=new WeakMap;let ct=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==V)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(y&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=F.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&F.set(e,t))}return t}toString(){return this.cssText}};const dt=n=>new ct(typeof n=="string"?n:n+"",void 0,V),pt=(n,t)=>{if(y)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),i=$.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,n.appendChild(s)}},Z=y?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return dt(e)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:ut,defineProperty:$t,getOwnPropertyDescriptor:ft,getOwnPropertyNames:mt,getOwnPropertySymbols:_t,getPrototypeOf:yt}=Object,f=globalThis,J=f.trustedTypes,gt=J?J.emptyScript:"",L=f.reactiveElementPolyfillSupport,P=(n,t)=>n,M={toAttribute(n,t){switch(t){case Boolean:n=n?gt:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},j=(n,t)=>!ut(n,t),G={attribute:!0,type:String,converter:M,reflect:!1,hasChanged:j};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),f.litPropertyMetadata??(f.litPropertyMetadata=new WeakMap);class E extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=G){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&$t(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:o}=ft(this.prototype,t)??{get(){return this[e]},set(r){this[e]=r}};return{get(){return i==null?void 0:i.call(this)},set(r){const l=i==null?void 0:i.call(this);o.call(this,r),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??G}static _$Ei(){if(this.hasOwnProperty(P("elementProperties")))return;const t=yt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(P("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(P("properties"))){const e=this.properties,s=[...mt(e),..._t(e)];for(const i of s)this.createProperty(i,e[i])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)e.unshift(Z(i))}else t!==void 0&&e.push(Z(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return pt(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostConnected)==null?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostDisconnected)==null?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EC(t,e){var o;const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){const r=(((o=s.converter)==null?void 0:o.toAttribute)!==void 0?s.converter:M).toAttribute(e,s.type);this._$Em=t,r==null?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){var o;const s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){const r=s.getPropertyOptions(i),l=typeof r.converter=="function"?{fromAttribute:r.converter}:((o=r.converter)==null?void 0:o.fromAttribute)!==void 0?r.converter:M;this._$Em=i,this[i]=l.fromAttribute(e,r.type),this._$Em=null}}requestUpdate(t,e,s){if(t!==void 0){if(s??(s=this.constructor.getPropertyOptions(t)),!(s.hasChanged??j)(this[t],e))return;this.P(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(t,e,s){this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this._$Em!==t&&(this._$Ej??(this._$Ej=new Set)).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[o,r]of this._$Ep)this[o]=r;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[o,r]of i)r.wrapped!==!0||this._$AL.has(o)||this[o]===void 0||this.P(o,this[o],r)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(s=this._$EO)==null||s.forEach(i=>{var o;return(o=i.hostUpdate)==null?void 0:o.call(i)}),this.update(e)):this._$EU()}catch(i){throw t=!1,this._$EU(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&(this._$Ej=this._$Ej.forEach(e=>this._$EC(e,this[e]))),this._$EU()}updated(t){}firstUpdated(t){}}E.elementStyles=[],E.shadowRootOptions={mode:"open"},E[P("elementProperties")]=new Map,E[P("finalized")]=new Map,L==null||L({ReactiveElement:E}),(f.reactiveElementVersions??(f.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const C=globalThis,k=C.trustedTypes,Q=k?k.createPolicy("lit-html",{createHTML:n=>n}):void 0,Y="$lit$",m=`lit$${Math.random().toFixed(9).slice(2)}$`,X="?"+m,At=`<${X}>`,g=document,U=()=>g.createComment(""),x=n=>n===null||typeof n!="object"&&typeof n!="function",z=Array.isArray,vt=n=>z(n)||typeof(n==null?void 0:n[Symbol.iterator])=="function",B=`[ 	
\f\r]`,O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,tt=/-->/g,et=/>/g,A=RegExp(`>|${B}(?:([^\\s"'>=/]+)(${B}*=${B}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),st=/'/g,it=/"/g,nt=/^(?:script|style|textarea|title)$/i,bt=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),K=bt(1),S=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),ot=new WeakMap,v=g.createTreeWalker(g,129);function rt(n,t){if(!z(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return Q!==void 0?Q.createHTML(t):t}const Et=(n,t)=>{const e=n.length-1,s=[];let i,o=t===2?"<svg>":t===3?"<math>":"",r=O;for(let l=0;l<e;l++){const a=n[l];let d,p,h=-1,u=0;for(;u<a.length&&(r.lastIndex=u,p=r.exec(a),p!==null);)u=r.lastIndex,r===O?p[1]==="!--"?r=tt:p[1]!==void 0?r=et:p[2]!==void 0?(nt.test(p[2])&&(i=RegExp("</"+p[2],"g")),r=A):p[3]!==void 0&&(r=A):r===A?p[0]===">"?(r=i??O,h=-1):p[1]===void 0?h=-2:(h=r.lastIndex-p[2].length,d=p[1],r=p[3]===void 0?A:p[3]==='"'?it:st):r===it||r===st?r=A:r===tt||r===et?r=O:(r=A,i=void 0);const _=r===A&&n[l+1].startsWith("/>")?" ":"";o+=r===O?a+At:h>=0?(s.push(d),a.slice(0,h)+Y+a.slice(h)+m+_):a+m+(h===-2?l:_)}return[rt(n,o+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};class H{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,r=0;const l=t.length-1,a=this.parts,[d,p]=Et(t,e);if(this.el=H.createElement(d,s),v.currentNode=this.el.content,e===2||e===3){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(i=v.nextNode())!==null&&a.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(const h of i.getAttributeNames())if(h.endsWith(Y)){const u=p[r++],_=i.getAttribute(h).split(m),D=/([.?@])?(.*)/.exec(u);a.push({type:1,index:o,name:D[2],strings:_,ctor:D[1]==="."?wt:D[1]==="?"?Pt:D[1]==="@"?Ct:I}),i.removeAttribute(h)}else h.startsWith(m)&&(a.push({type:6,index:o}),i.removeAttribute(h));if(nt.test(i.tagName)){const h=i.textContent.split(m),u=h.length-1;if(u>0){i.textContent=k?k.emptyScript:"";for(let _=0;_<u;_++)i.append(h[_],U()),v.nextNode(),a.push({type:2,index:++o});i.append(h[u],U())}}}else if(i.nodeType===8)if(i.data===X)a.push({type:2,index:o});else{let h=-1;for(;(h=i.data.indexOf(m,h+1))!==-1;)a.push({type:7,index:o}),h+=m.length-1}o++}}static createElement(t,e){const s=g.createElement("template");return s.innerHTML=t,s}}function w(n,t,e=n,s){var r,l;if(t===S)return t;let i=s!==void 0?(r=e.o)==null?void 0:r[s]:e.l;const o=x(t)?void 0:t._$litDirective$;return(i==null?void 0:i.constructor)!==o&&((l=i==null?void 0:i._$AO)==null||l.call(i,!1),o===void 0?i=void 0:(i=new o(n),i._$AT(n,e,s)),s!==void 0?(e.o??(e.o=[]))[s]=i:e.l=i),i!==void 0&&(t=w(n,i._$AS(n,t.values),i,s)),t}class St{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=((t==null?void 0:t.creationScope)??g).importNode(e,!0);v.currentNode=i;let o=v.nextNode(),r=0,l=0,a=s[0];for(;a!==void 0;){if(r===a.index){let d;a.type===2?d=new T(o,o.nextSibling,this,t):a.type===1?d=new a.ctor(o,a.name,a.strings,this,t):a.type===6&&(d=new Ut(o,this,t)),this._$AV.push(d),a=s[++l]}r!==(a==null?void 0:a.index)&&(o=v.nextNode(),r++)}return v.currentNode=g,i}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class T{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this.v}constructor(t,e,s,i){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this.v=(i==null?void 0:i.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=w(this,t,e),x(t)?t===c||t==null||t===""?(this._$AH!==c&&this._$AR(),this._$AH=c):t!==this._$AH&&t!==S&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):vt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==c&&x(this._$AH)?this._$AA.nextSibling.data=t:this.T(g.createTextNode(t)),this._$AH=t}$(t){var o;const{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=H.createElement(rt(s.h,s.h[0]),this.options)),s);if(((o=this._$AH)==null?void 0:o._$AD)===i)this._$AH.p(e);else{const r=new St(i,this),l=r.u(this.options);r.p(e),this.T(l),this._$AH=r}}_$AC(t){let e=ot.get(t.strings);return e===void 0&&ot.set(t.strings,e=new H(t)),e}k(t){z(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const o of t)i===e.length?e.push(s=new T(this.O(U()),this.O(U()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,e);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this.v=t,(e=this._$AP)==null||e.call(this,t))}}class I{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,o){this.type=1,this._$AH=c,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=c}_$AI(t,e=this,s,i){const o=this.strings;let r=!1;if(o===void 0)t=w(this,t,e,0),r=!x(t)||t!==this._$AH&&t!==S,r&&(this._$AH=t);else{const l=t;let a,d;for(t=o[0],a=0;a<o.length-1;a++)d=w(this,l[s+a],e,a),d===S&&(d=this._$AH[a]),r||(r=!x(d)||d!==this._$AH[a]),d===c?t=c:t!==c&&(t+=(d??"")+o[a+1]),this._$AH[a]=d}r&&!i&&this.j(t)}j(t){t===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class wt extends I{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===c?void 0:t}}class Pt extends I{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==c)}}class Ct extends I{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){if((t=w(this,t,e,0)??c)===S)return;const s=this._$AH,i=t===c&&s!==c||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==c&&(s===c||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class Ut{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){w(this,t)}}const W=C.litHtmlPolyfillSupport;W==null||W(H,T),(C.litHtmlVersions??(C.litHtmlVersions=[])).push("3.2.0");const xt=(n,t,e)=>{const s=(e==null?void 0:e.renderBefore)??t;let i=s._$litPart$;if(i===void 0){const o=(e==null?void 0:e.renderBefore)??null;s._$litPart$=i=new T(t.insertBefore(U(),o),o,void 0,e??{})}return i._$AI(n),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class R extends E{constructor(){super(...arguments),this.renderOptions={host:this},this.o=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this.o=xt(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this.o)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.o)==null||t.setConnected(!1)}render(){return S}}R._$litElement$=!0,R.finalized=!0,(ht=globalThis.litElementHydrateSupport)==null||ht.call(globalThis,{LitElement:R});const q=globalThis.litElementPolyfillSupport;q==null||q({LitElement:R}),(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ot=n=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(n,t)}):customElements.define(n,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ht={attribute:!0,type:String,converter:M,reflect:!1,hasChanged:j},Tt=(n=Ht,t,e)=>{const{kind:s,metadata:i}=e;let o=globalThis.litPropertyMetadata.get(i);if(o===void 0&&globalThis.litPropertyMetadata.set(i,o=new Map),o.set(e.name,n),s==="accessor"){const{name:r}=e;return{set(l){const a=t.get.call(this);t.set.call(this,l),this.requestUpdate(r,a,n)},init(l){return l!==void 0&&this.P(r,void 0,n),l}}}if(s==="setter"){const{name:r}=e;return function(l){const a=this[r];t.call(this,l),this.requestUpdate(r,a,n)}}throw Error("Unsupported decorator location: "+s)};function at(n){return(t,e)=>typeof e=="object"?Tt(n,t,e):((s,i,o)=>{const r=i.hasOwnProperty(o);return i.constructor.createProperty(o,r?{...s,wrapped:!0}:s),r?Object.getOwnPropertyDescriptor(i,o):void 0})(n,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Rt(n){return at({...n,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Nt=(n,t,e)=>(e.configurable=!0,e.enumerable=!0,Reflect.decorate&&typeof t!="object"&&Object.defineProperty(n,t,e),e);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function lt(n,t){return(e,s,i)=>{const o=r=>{var l;return((l=r.renderRoot)==null?void 0:l.querySelector(n))??null};return Nt(e,s,{get(){return o(this)}})}}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function*Mt(n,t){if(n!==void 0){let e=0;for(const s of n)yield t(s,e++)}}function kt(n,t,e){let s=null;return function(...i){const o=function(){s=null,n.apply(this,i)};s!==null&&clearTimeout(s),s=setTimeout(o,t)}}var It=Object.defineProperty,Dt=Object.getOwnPropertyDescriptor,N=(n,t,e,s)=>{for(var i=s>1?void 0:s?Dt(t,e):t,o=n.length-1,r;o>=0;o--)(r=n[o])&&(i=(s?r(t,e,i):r(i))||i);return s&&i&&It(t,e,i),i};let b=class extends R{constructor(){super(),this.active=!1,this.routes=[],this.boundHandleKeyDown=this.handleKeyDown.bind(this),this.boundHandleKeyDownPalette=this.handleKeyDownPalette.bind(this),this.debouncedHandleInput=kt(this.handleInput.bind(this),100)}getRoutes(n){fetch("/api/v1/contrib/commandpalette/routes"+(n?`?path=${n}`:"")).then(e=>e.json()).then(e=>{this.routes=e}).catch(e=>{console.error(e)})}handleInput(){const n=this.paletteInput.value;this.getRoutes(n)}handleKeyDown(n){if(n.target.id==="palette-input")return;(n.ctrlKey||n.metaKey)&&n.key==="/"&&(n.preventDefault(),this.palette.showModal(),this.paletteInput.focus())}handleKeyDownPalette(n){n.target.id!=="palette-input"&&n.key==="/"&&(n.preventDefault(),this.paletteInput.focus())}handleFocusInput(n){var e;const t=n.target;t.id==="palette-input"&&((e=t.nextElementSibling)==null||e.classList.add("hidden"))}handleBlurInput(n){var e;const t=n.target;t.id==="palette-input"&&((e=t.nextElementSibling)==null||e.classList.remove("hidden"))}connectedCallback(){super.connectedCallback(),document.addEventListener("keydown",this.boundHandleKeyDown),this.getRoutes()}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this.boundHandleKeyDown)}firstUpdated(n){super.firstUpdated(n),this.palette.addEventListener("keydown",this.boundHandleKeyDownPalette)}createRenderRoot(){return this}render(){return K`
            <div id="palette" class="modal fade" tabindex="-1" aria-labelledby="paletteLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <form class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="paletteLabel">Command Palette</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <input
                                id="palette-input"
                                class="form-control form-control-lg mb-4"
                                type="text"
                                placeholder="Start typing..."
                                aria-label="Command Palette"
                                @input=${this.debouncedHandleInput}
                                @focus=${this.handleFocusInput}
                                @blur=${this.handleBlurInput}
                            />
                            <kbd class="position-absolute top-0 end-0 m-2">/</kbd>
                            <ul
                                id="palette-items"
                                class="list-group overflow-auto"
                                style="max-height: 24rem;"
                            >
                                ${this.routes.length?Mt(this.routes,n=>K`
                                              <li class="list-group-item my-2">
                                                  <a
                                                      href="/cgi-bin/koha${n}"
                                                      class="link"
                                                      >${n}</a
                                                  >
                                              </li>
                                          `):K`<li class="list-group-item my-2 bg-light">
                                          No results
                                      </li>`}
                            </ul>
                        </div>
                    </form>
                </div>
            </div>
        `}};return N([at({type:Boolean,reflect:!0})],b.prototype,"active",2),N([Rt()],b.prototype,"routes",2),N([lt("#palette")],b.prototype,"palette",2),N([lt("#palette-input")],b.prototype,"paletteInput",2),b=N([Ot("koha-command-palette")],b),{KohaCommandPalette:b}});
//# sourceMappingURL=main.umd.js.map
