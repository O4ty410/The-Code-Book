(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();var ig={exports:{}},hu={},rg={exports:{}},Ze={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ro=Symbol.for("react.element"),uS=Symbol.for("react.portal"),cS=Symbol.for("react.fragment"),fS=Symbol.for("react.strict_mode"),dS=Symbol.for("react.profiler"),hS=Symbol.for("react.provider"),pS=Symbol.for("react.context"),mS=Symbol.for("react.forward_ref"),gS=Symbol.for("react.suspense"),vS=Symbol.for("react.memo"),_S=Symbol.for("react.lazy"),gp=Symbol.iterator;function SS(e){return e===null||typeof e!="object"?null:(e=gp&&e[gp]||e["@@iterator"],typeof e=="function"?e:null)}var sg={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},ag=Object.assign,og={};function Ks(e,t,n){this.props=e,this.context=t,this.refs=og,this.updater=n||sg}Ks.prototype.isReactComponent={};Ks.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Ks.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function lg(){}lg.prototype=Ks.prototype;function Bd(e,t,n){this.props=e,this.context=t,this.refs=og,this.updater=n||sg}var zd=Bd.prototype=new lg;zd.constructor=Bd;ag(zd,Ks.prototype);zd.isPureReactComponent=!0;var vp=Array.isArray,ug=Object.prototype.hasOwnProperty,Gd={current:null},cg={key:!0,ref:!0,__self:!0,__source:!0};function fg(e,t,n){var i,r={},s=null,a=null;if(t!=null)for(i in t.ref!==void 0&&(a=t.ref),t.key!==void 0&&(s=""+t.key),t)ug.call(t,i)&&!cg.hasOwnProperty(i)&&(r[i]=t[i]);var o=arguments.length-2;if(o===1)r.children=n;else if(1<o){for(var l=Array(o),u=0;u<o;u++)l[u]=arguments[u+2];r.children=l}if(e&&e.defaultProps)for(i in o=e.defaultProps,o)r[i]===void 0&&(r[i]=o[i]);return{$$typeof:ro,type:e,key:s,ref:a,props:r,_owner:Gd.current}}function yS(e,t){return{$$typeof:ro,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function Vd(e){return typeof e=="object"&&e!==null&&e.$$typeof===ro}function MS(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var _p=/\/+/g;function Fu(e,t){return typeof e=="object"&&e!==null&&e.key!=null?MS(""+e.key):t.toString(36)}function cl(e,t,n,i,r){var s=typeof e;(s==="undefined"||s==="boolean")&&(e=null);var a=!1;if(e===null)a=!0;else switch(s){case"string":case"number":a=!0;break;case"object":switch(e.$$typeof){case ro:case uS:a=!0}}if(a)return a=e,r=r(a),e=i===""?"."+Fu(a,0):i,vp(r)?(n="",e!=null&&(n=e.replace(_p,"$&/")+"/"),cl(r,t,n,"",function(u){return u})):r!=null&&(Vd(r)&&(r=yS(r,n+(!r.key||a&&a.key===r.key?"":(""+r.key).replace(_p,"$&/")+"/")+e)),t.push(r)),1;if(a=0,i=i===""?".":i+":",vp(e))for(var o=0;o<e.length;o++){s=e[o];var l=i+Fu(s,o);a+=cl(s,t,n,l,r)}else if(l=SS(e),typeof l=="function")for(e=l.call(e),o=0;!(s=e.next()).done;)s=s.value,l=i+Fu(s,o++),a+=cl(s,t,n,l,r);else if(s==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return a}function go(e,t,n){if(e==null)return e;var i=[],r=0;return cl(e,i,"","",function(s){return t.call(n,s,r++)}),i}function ES(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var ln={current:null},fl={transition:null},TS={ReactCurrentDispatcher:ln,ReactCurrentBatchConfig:fl,ReactCurrentOwner:Gd};function dg(){throw Error("act(...) is not supported in production builds of React.")}Ze.Children={map:go,forEach:function(e,t,n){go(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return go(e,function(){t++}),t},toArray:function(e){return go(e,function(t){return t})||[]},only:function(e){if(!Vd(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};Ze.Component=Ks;Ze.Fragment=cS;Ze.Profiler=dS;Ze.PureComponent=Bd;Ze.StrictMode=fS;Ze.Suspense=gS;Ze.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=TS;Ze.act=dg;Ze.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var i=ag({},e.props),r=e.key,s=e.ref,a=e._owner;if(t!=null){if(t.ref!==void 0&&(s=t.ref,a=Gd.current),t.key!==void 0&&(r=""+t.key),e.type&&e.type.defaultProps)var o=e.type.defaultProps;for(l in t)ug.call(t,l)&&!cg.hasOwnProperty(l)&&(i[l]=t[l]===void 0&&o!==void 0?o[l]:t[l])}var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){o=Array(l);for(var u=0;u<l;u++)o[u]=arguments[u+2];i.children=o}return{$$typeof:ro,type:e.type,key:r,ref:s,props:i,_owner:a}};Ze.createContext=function(e){return e={$$typeof:pS,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:hS,_context:e},e.Consumer=e};Ze.createElement=fg;Ze.createFactory=function(e){var t=fg.bind(null,e);return t.type=e,t};Ze.createRef=function(){return{current:null}};Ze.forwardRef=function(e){return{$$typeof:mS,render:e}};Ze.isValidElement=Vd;Ze.lazy=function(e){return{$$typeof:_S,_payload:{_status:-1,_result:e},_init:ES}};Ze.memo=function(e,t){return{$$typeof:vS,type:e,compare:t===void 0?null:t}};Ze.startTransition=function(e){var t=fl.transition;fl.transition={};try{e()}finally{fl.transition=t}};Ze.unstable_act=dg;Ze.useCallback=function(e,t){return ln.current.useCallback(e,t)};Ze.useContext=function(e){return ln.current.useContext(e)};Ze.useDebugValue=function(){};Ze.useDeferredValue=function(e){return ln.current.useDeferredValue(e)};Ze.useEffect=function(e,t){return ln.current.useEffect(e,t)};Ze.useId=function(){return ln.current.useId()};Ze.useImperativeHandle=function(e,t,n){return ln.current.useImperativeHandle(e,t,n)};Ze.useInsertionEffect=function(e,t){return ln.current.useInsertionEffect(e,t)};Ze.useLayoutEffect=function(e,t){return ln.current.useLayoutEffect(e,t)};Ze.useMemo=function(e,t){return ln.current.useMemo(e,t)};Ze.useReducer=function(e,t,n){return ln.current.useReducer(e,t,n)};Ze.useRef=function(e){return ln.current.useRef(e)};Ze.useState=function(e){return ln.current.useState(e)};Ze.useSyncExternalStore=function(e,t,n){return ln.current.useSyncExternalStore(e,t,n)};Ze.useTransition=function(){return ln.current.useTransition()};Ze.version="18.3.1";rg.exports=Ze;var W=rg.exports;/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var bS=W,wS=Symbol.for("react.element"),xS=Symbol.for("react.fragment"),AS=Object.prototype.hasOwnProperty,CS=bS.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,RS={key:!0,ref:!0,__self:!0,__source:!0};function hg(e,t,n){var i,r={},s=null,a=null;n!==void 0&&(s=""+n),t.key!==void 0&&(s=""+t.key),t.ref!==void 0&&(a=t.ref);for(i in t)AS.call(t,i)&&!RS.hasOwnProperty(i)&&(r[i]=t[i]);if(e&&e.defaultProps)for(i in t=e.defaultProps,t)r[i]===void 0&&(r[i]=t[i]);return{$$typeof:wS,type:e,key:s,ref:a,props:r,_owner:CS.current}}hu.Fragment=xS;hu.jsx=hg;hu.jsxs=hg;ig.exports=hu;var I=ig.exports,Yc={},pg={exports:{}},Rn={},mg={exports:{}},gg={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(U,j){var J=U.length;U.push(j);e:for(;0<J;){var se=J-1>>>1,ce=U[se];if(0<r(ce,j))U[se]=j,U[J]=ce,J=se;else break e}}function n(U){return U.length===0?null:U[0]}function i(U){if(U.length===0)return null;var j=U[0],J=U.pop();if(J!==j){U[0]=J;e:for(var se=0,ce=U.length,Ie=ce>>>1;se<Ie;){var ke=2*(se+1)-1,Le=U[ke],ee=ke+1,pe=U[ee];if(0>r(Le,J))ee<ce&&0>r(pe,Le)?(U[se]=pe,U[ee]=J,se=ee):(U[se]=Le,U[ke]=J,se=ke);else if(ee<ce&&0>r(pe,J))U[se]=pe,U[ee]=J,se=ee;else break e}}return j}function r(U,j){var J=U.sortIndex-j.sortIndex;return J!==0?J:U.id-j.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;e.unstable_now=function(){return s.now()}}else{var a=Date,o=a.now();e.unstable_now=function(){return a.now()-o}}var l=[],u=[],f=1,h=null,c=3,p=!1,m=!1,_=!1,g=typeof setTimeout=="function"?setTimeout:null,d=typeof clearTimeout=="function"?clearTimeout:null,v=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function y(U){for(var j=n(u);j!==null;){if(j.callback===null)i(u);else if(j.startTime<=U)i(u),j.sortIndex=j.expirationTime,t(l,j);else break;j=n(u)}}function M(U){if(_=!1,y(U),!m)if(n(l)!==null)m=!0,z(T);else{var j=n(u);j!==null&&H(M,j.startTime-U)}}function T(U,j){m=!1,_&&(_=!1,d(S),S=-1),p=!0;var J=c;try{for(y(j),h=n(l);h!==null&&(!(h.expirationTime>j)||U&&!R());){var se=h.callback;if(typeof se=="function"){h.callback=null,c=h.priorityLevel;var ce=se(h.expirationTime<=j);j=e.unstable_now(),typeof ce=="function"?h.callback=ce:h===n(l)&&i(l),y(j)}else i(l);h=n(l)}if(h!==null)var Ie=!0;else{var ke=n(u);ke!==null&&H(M,ke.startTime-j),Ie=!1}return Ie}finally{h=null,c=J,p=!1}}var b=!1,w=null,S=-1,x=5,P=-1;function R(){return!(e.unstable_now()-P<x)}function L(){if(w!==null){var U=e.unstable_now();P=U;var j=!0;try{j=w(!0,U)}finally{j?F():(b=!1,w=null)}}else b=!1}var F;if(typeof v=="function")F=function(){v(L)};else if(typeof MessageChannel<"u"){var B=new MessageChannel,D=B.port2;B.port1.onmessage=L,F=function(){D.postMessage(null)}}else F=function(){g(L,0)};function z(U){w=U,b||(b=!0,F())}function H(U,j){S=g(function(){U(e.unstable_now())},j)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(U){U.callback=null},e.unstable_continueExecution=function(){m||p||(m=!0,z(T))},e.unstable_forceFrameRate=function(U){0>U||125<U?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):x=0<U?Math.floor(1e3/U):5},e.unstable_getCurrentPriorityLevel=function(){return c},e.unstable_getFirstCallbackNode=function(){return n(l)},e.unstable_next=function(U){switch(c){case 1:case 2:case 3:var j=3;break;default:j=c}var J=c;c=j;try{return U()}finally{c=J}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(U,j){switch(U){case 1:case 2:case 3:case 4:case 5:break;default:U=3}var J=c;c=U;try{return j()}finally{c=J}},e.unstable_scheduleCallback=function(U,j,J){var se=e.unstable_now();switch(typeof J=="object"&&J!==null?(J=J.delay,J=typeof J=="number"&&0<J?se+J:se):J=se,U){case 1:var ce=-1;break;case 2:ce=250;break;case 5:ce=1073741823;break;case 4:ce=1e4;break;default:ce=5e3}return ce=J+ce,U={id:f++,callback:j,priorityLevel:U,startTime:J,expirationTime:ce,sortIndex:-1},J>se?(U.sortIndex=J,t(u,U),n(l)===null&&U===n(u)&&(_?(d(S),S=-1):_=!0,H(M,J-se))):(U.sortIndex=ce,t(l,U),m||p||(m=!0,z(T))),U},e.unstable_shouldYield=R,e.unstable_wrapCallback=function(U){var j=c;return function(){var J=c;c=j;try{return U.apply(this,arguments)}finally{c=J}}}})(gg);mg.exports=gg;var PS=mg.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var IS=W,Cn=PS;function he(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var vg=new Set,ka={};function Qr(e,t){Bs(e,t),Bs(e+"Capture",t)}function Bs(e,t){for(ka[e]=t,e=0;e<t.length;e++)vg.add(t[e])}var Oi=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),qc=Object.prototype.hasOwnProperty,NS=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Sp={},yp={};function LS(e){return qc.call(yp,e)?!0:qc.call(Sp,e)?!1:NS.test(e)?yp[e]=!0:(Sp[e]=!0,!1)}function DS(e,t,n,i){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return i?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function US(e,t,n,i){if(t===null||typeof t>"u"||DS(e,t,n,i))return!0;if(i)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function un(e,t,n,i,r,s,a){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=s,this.removeEmptyString=a}var $t={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){$t[e]=new un(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];$t[t]=new un(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){$t[e]=new un(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){$t[e]=new un(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){$t[e]=new un(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){$t[e]=new un(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){$t[e]=new un(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){$t[e]=new un(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){$t[e]=new un(e,5,!1,e.toLowerCase(),null,!1,!1)});var Hd=/[\-:]([a-z])/g;function Wd(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(Hd,Wd);$t[t]=new un(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(Hd,Wd);$t[t]=new un(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(Hd,Wd);$t[t]=new un(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){$t[e]=new un(e,1,!1,e.toLowerCase(),null,!1,!1)});$t.xlinkHref=new un("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){$t[e]=new un(e,1,!1,e.toLowerCase(),null,!0,!0)});function jd(e,t,n,i){var r=$t.hasOwnProperty(t)?$t[t]:null;(r!==null?r.type!==0:i||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(US(t,n,r,i)&&(n=null),i||r===null?LS(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):r.mustUseProperty?e[r.propertyName]=n===null?r.type===3?!1:"":n:(t=r.attributeName,i=r.attributeNamespace,n===null?e.removeAttribute(t):(r=r.type,n=r===3||r===4&&n===!0?"":""+n,i?e.setAttributeNS(i,t,n):e.setAttribute(t,n))))}var Hi=IS.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,vo=Symbol.for("react.element"),ys=Symbol.for("react.portal"),Ms=Symbol.for("react.fragment"),Xd=Symbol.for("react.strict_mode"),Kc=Symbol.for("react.profiler"),_g=Symbol.for("react.provider"),Sg=Symbol.for("react.context"),$d=Symbol.for("react.forward_ref"),Zc=Symbol.for("react.suspense"),Qc=Symbol.for("react.suspense_list"),Yd=Symbol.for("react.memo"),er=Symbol.for("react.lazy"),yg=Symbol.for("react.offscreen"),Mp=Symbol.iterator;function ta(e){return e===null||typeof e!="object"?null:(e=Mp&&e[Mp]||e["@@iterator"],typeof e=="function"?e:null)}var xt=Object.assign,Ou;function Sa(e){if(Ou===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);Ou=t&&t[1]||""}return`
`+Ou+e}var ku=!1;function Bu(e,t){if(!e||ku)return"";ku=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(u){var i=u}Reflect.construct(e,[],t)}else{try{t.call()}catch(u){i=u}e.call(t.prototype)}else{try{throw Error()}catch(u){i=u}e()}}catch(u){if(u&&i&&typeof u.stack=="string"){for(var r=u.stack.split(`
`),s=i.stack.split(`
`),a=r.length-1,o=s.length-1;1<=a&&0<=o&&r[a]!==s[o];)o--;for(;1<=a&&0<=o;a--,o--)if(r[a]!==s[o]){if(a!==1||o!==1)do if(a--,o--,0>o||r[a]!==s[o]){var l=`
`+r[a].replace(" at new "," at ");return e.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",e.displayName)),l}while(1<=a&&0<=o);break}}}finally{ku=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?Sa(e):""}function FS(e){switch(e.tag){case 5:return Sa(e.type);case 16:return Sa("Lazy");case 13:return Sa("Suspense");case 19:return Sa("SuspenseList");case 0:case 2:case 15:return e=Bu(e.type,!1),e;case 11:return e=Bu(e.type.render,!1),e;case 1:return e=Bu(e.type,!0),e;default:return""}}function Jc(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Ms:return"Fragment";case ys:return"Portal";case Kc:return"Profiler";case Xd:return"StrictMode";case Zc:return"Suspense";case Qc:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Sg:return(e.displayName||"Context")+".Consumer";case _g:return(e._context.displayName||"Context")+".Provider";case $d:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Yd:return t=e.displayName||null,t!==null?t:Jc(e.type)||"Memo";case er:t=e._payload,e=e._init;try{return Jc(e(t))}catch{}}return null}function OS(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Jc(t);case 8:return t===Xd?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function _r(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Mg(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function kS(e){var t=Mg(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),i=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var r=n.get,s=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return r.call(this)},set:function(a){i=""+a,s.call(this,a)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return i},setValue:function(a){i=""+a},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function _o(e){e._valueTracker||(e._valueTracker=kS(e))}function Eg(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),i="";return e&&(i=Mg(e)?e.checked?"true":"false":e.value),e=i,e!==n?(t.setValue(e),!0):!1}function Nl(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function ef(e,t){var n=t.checked;return xt({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function Ep(e,t){var n=t.defaultValue==null?"":t.defaultValue,i=t.checked!=null?t.checked:t.defaultChecked;n=_r(t.value!=null?t.value:n),e._wrapperState={initialChecked:i,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Tg(e,t){t=t.checked,t!=null&&jd(e,"checked",t,!1)}function tf(e,t){Tg(e,t);var n=_r(t.value),i=t.type;if(n!=null)i==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(i==="submit"||i==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?nf(e,t.type,n):t.hasOwnProperty("defaultValue")&&nf(e,t.type,_r(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Tp(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var i=t.type;if(!(i!=="submit"&&i!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function nf(e,t,n){(t!=="number"||Nl(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var ya=Array.isArray;function Ns(e,t,n,i){if(e=e.options,t){t={};for(var r=0;r<n.length;r++)t["$"+n[r]]=!0;for(n=0;n<e.length;n++)r=t.hasOwnProperty("$"+e[n].value),e[n].selected!==r&&(e[n].selected=r),r&&i&&(e[n].defaultSelected=!0)}else{for(n=""+_r(n),t=null,r=0;r<e.length;r++){if(e[r].value===n){e[r].selected=!0,i&&(e[r].defaultSelected=!0);return}t!==null||e[r].disabled||(t=e[r])}t!==null&&(t.selected=!0)}}function rf(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(he(91));return xt({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function bp(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(he(92));if(ya(n)){if(1<n.length)throw Error(he(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:_r(n)}}function bg(e,t){var n=_r(t.value),i=_r(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),i!=null&&(e.defaultValue=""+i)}function wp(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function wg(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function sf(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?wg(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var So,xg=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,i,r){MSApp.execUnsafeLocalFunction(function(){return e(t,n,i,r)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(So=So||document.createElement("div"),So.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=So.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Ba(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Ca={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},BS=["Webkit","ms","Moz","O"];Object.keys(Ca).forEach(function(e){BS.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Ca[t]=Ca[e]})});function Ag(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Ca.hasOwnProperty(e)&&Ca[e]?(""+t).trim():t+"px"}function Cg(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var i=n.indexOf("--")===0,r=Ag(n,t[n],i);n==="float"&&(n="cssFloat"),i?e.setProperty(n,r):e[n]=r}}var zS=xt({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function af(e,t){if(t){if(zS[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(he(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(he(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(he(61))}if(t.style!=null&&typeof t.style!="object")throw Error(he(62))}}function of(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var lf=null;function qd(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var uf=null,Ls=null,Ds=null;function xp(e){if(e=oo(e)){if(typeof uf!="function")throw Error(he(280));var t=e.stateNode;t&&(t=_u(t),uf(e.stateNode,e.type,t))}}function Rg(e){Ls?Ds?Ds.push(e):Ds=[e]:Ls=e}function Pg(){if(Ls){var e=Ls,t=Ds;if(Ds=Ls=null,xp(e),t)for(e=0;e<t.length;e++)xp(t[e])}}function Ig(e,t){return e(t)}function Ng(){}var zu=!1;function Lg(e,t,n){if(zu)return e(t,n);zu=!0;try{return Ig(e,t,n)}finally{zu=!1,(Ls!==null||Ds!==null)&&(Ng(),Pg())}}function za(e,t){var n=e.stateNode;if(n===null)return null;var i=_u(n);if(i===null)return null;n=i[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(e=e.type,i=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!i;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(he(231,t,typeof n));return n}var cf=!1;if(Oi)try{var na={};Object.defineProperty(na,"passive",{get:function(){cf=!0}}),window.addEventListener("test",na,na),window.removeEventListener("test",na,na)}catch{cf=!1}function GS(e,t,n,i,r,s,a,o,l){var u=Array.prototype.slice.call(arguments,3);try{t.apply(n,u)}catch(f){this.onError(f)}}var Ra=!1,Ll=null,Dl=!1,ff=null,VS={onError:function(e){Ra=!0,Ll=e}};function HS(e,t,n,i,r,s,a,o,l){Ra=!1,Ll=null,GS.apply(VS,arguments)}function WS(e,t,n,i,r,s,a,o,l){if(HS.apply(this,arguments),Ra){if(Ra){var u=Ll;Ra=!1,Ll=null}else throw Error(he(198));Dl||(Dl=!0,ff=u)}}function Jr(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function Dg(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Ap(e){if(Jr(e)!==e)throw Error(he(188))}function jS(e){var t=e.alternate;if(!t){if(t=Jr(e),t===null)throw Error(he(188));return t!==e?null:e}for(var n=e,i=t;;){var r=n.return;if(r===null)break;var s=r.alternate;if(s===null){if(i=r.return,i!==null){n=i;continue}break}if(r.child===s.child){for(s=r.child;s;){if(s===n)return Ap(r),e;if(s===i)return Ap(r),t;s=s.sibling}throw Error(he(188))}if(n.return!==i.return)n=r,i=s;else{for(var a=!1,o=r.child;o;){if(o===n){a=!0,n=r,i=s;break}if(o===i){a=!0,i=r,n=s;break}o=o.sibling}if(!a){for(o=s.child;o;){if(o===n){a=!0,n=s,i=r;break}if(o===i){a=!0,i=s,n=r;break}o=o.sibling}if(!a)throw Error(he(189))}}if(n.alternate!==i)throw Error(he(190))}if(n.tag!==3)throw Error(he(188));return n.stateNode.current===n?e:t}function Ug(e){return e=jS(e),e!==null?Fg(e):null}function Fg(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Fg(e);if(t!==null)return t;e=e.sibling}return null}var Og=Cn.unstable_scheduleCallback,Cp=Cn.unstable_cancelCallback,XS=Cn.unstable_shouldYield,$S=Cn.unstable_requestPaint,Lt=Cn.unstable_now,YS=Cn.unstable_getCurrentPriorityLevel,Kd=Cn.unstable_ImmediatePriority,kg=Cn.unstable_UserBlockingPriority,Ul=Cn.unstable_NormalPriority,qS=Cn.unstable_LowPriority,Bg=Cn.unstable_IdlePriority,pu=null,pi=null;function KS(e){if(pi&&typeof pi.onCommitFiberRoot=="function")try{pi.onCommitFiberRoot(pu,e,void 0,(e.current.flags&128)===128)}catch{}}var Qn=Math.clz32?Math.clz32:JS,ZS=Math.log,QS=Math.LN2;function JS(e){return e>>>=0,e===0?32:31-(ZS(e)/QS|0)|0}var yo=64,Mo=4194304;function Ma(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Fl(e,t){var n=e.pendingLanes;if(n===0)return 0;var i=0,r=e.suspendedLanes,s=e.pingedLanes,a=n&268435455;if(a!==0){var o=a&~r;o!==0?i=Ma(o):(s&=a,s!==0&&(i=Ma(s)))}else a=n&~r,a!==0?i=Ma(a):s!==0&&(i=Ma(s));if(i===0)return 0;if(t!==0&&t!==i&&!(t&r)&&(r=i&-i,s=t&-t,r>=s||r===16&&(s&4194240)!==0))return t;if(i&4&&(i|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=i;0<t;)n=31-Qn(t),r=1<<n,i|=e[n],t&=~r;return i}function ey(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function ty(e,t){for(var n=e.suspendedLanes,i=e.pingedLanes,r=e.expirationTimes,s=e.pendingLanes;0<s;){var a=31-Qn(s),o=1<<a,l=r[a];l===-1?(!(o&n)||o&i)&&(r[a]=ey(o,t)):l<=t&&(e.expiredLanes|=o),s&=~o}}function df(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function zg(){var e=yo;return yo<<=1,!(yo&4194240)&&(yo=64),e}function Gu(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function so(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Qn(t),e[t]=n}function ny(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var i=e.eventTimes;for(e=e.expirationTimes;0<n;){var r=31-Qn(n),s=1<<r;t[r]=0,i[r]=-1,e[r]=-1,n&=~s}}function Zd(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var i=31-Qn(n),r=1<<i;r&t|e[i]&t&&(e[i]|=t),n&=~r}}var dt=0;function Gg(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Vg,Qd,Hg,Wg,jg,hf=!1,Eo=[],cr=null,fr=null,dr=null,Ga=new Map,Va=new Map,ir=[],iy="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Rp(e,t){switch(e){case"focusin":case"focusout":cr=null;break;case"dragenter":case"dragleave":fr=null;break;case"mouseover":case"mouseout":dr=null;break;case"pointerover":case"pointerout":Ga.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Va.delete(t.pointerId)}}function ia(e,t,n,i,r,s){return e===null||e.nativeEvent!==s?(e={blockedOn:t,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[r]},t!==null&&(t=oo(t),t!==null&&Qd(t)),e):(e.eventSystemFlags|=i,t=e.targetContainers,r!==null&&t.indexOf(r)===-1&&t.push(r),e)}function ry(e,t,n,i,r){switch(t){case"focusin":return cr=ia(cr,e,t,n,i,r),!0;case"dragenter":return fr=ia(fr,e,t,n,i,r),!0;case"mouseover":return dr=ia(dr,e,t,n,i,r),!0;case"pointerover":var s=r.pointerId;return Ga.set(s,ia(Ga.get(s)||null,e,t,n,i,r)),!0;case"gotpointercapture":return s=r.pointerId,Va.set(s,ia(Va.get(s)||null,e,t,n,i,r)),!0}return!1}function Xg(e){var t=Or(e.target);if(t!==null){var n=Jr(t);if(n!==null){if(t=n.tag,t===13){if(t=Dg(n),t!==null){e.blockedOn=t,jg(e.priority,function(){Hg(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function dl(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=pf(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var i=new n.constructor(n.type,n);lf=i,n.target.dispatchEvent(i),lf=null}else return t=oo(n),t!==null&&Qd(t),e.blockedOn=n,!1;t.shift()}return!0}function Pp(e,t,n){dl(e)&&n.delete(t)}function sy(){hf=!1,cr!==null&&dl(cr)&&(cr=null),fr!==null&&dl(fr)&&(fr=null),dr!==null&&dl(dr)&&(dr=null),Ga.forEach(Pp),Va.forEach(Pp)}function ra(e,t){e.blockedOn===t&&(e.blockedOn=null,hf||(hf=!0,Cn.unstable_scheduleCallback(Cn.unstable_NormalPriority,sy)))}function Ha(e){function t(r){return ra(r,e)}if(0<Eo.length){ra(Eo[0],e);for(var n=1;n<Eo.length;n++){var i=Eo[n];i.blockedOn===e&&(i.blockedOn=null)}}for(cr!==null&&ra(cr,e),fr!==null&&ra(fr,e),dr!==null&&ra(dr,e),Ga.forEach(t),Va.forEach(t),n=0;n<ir.length;n++)i=ir[n],i.blockedOn===e&&(i.blockedOn=null);for(;0<ir.length&&(n=ir[0],n.blockedOn===null);)Xg(n),n.blockedOn===null&&ir.shift()}var Us=Hi.ReactCurrentBatchConfig,Ol=!0;function ay(e,t,n,i){var r=dt,s=Us.transition;Us.transition=null;try{dt=1,Jd(e,t,n,i)}finally{dt=r,Us.transition=s}}function oy(e,t,n,i){var r=dt,s=Us.transition;Us.transition=null;try{dt=4,Jd(e,t,n,i)}finally{dt=r,Us.transition=s}}function Jd(e,t,n,i){if(Ol){var r=pf(e,t,n,i);if(r===null)Zu(e,t,i,kl,n),Rp(e,i);else if(ry(r,e,t,n,i))i.stopPropagation();else if(Rp(e,i),t&4&&-1<iy.indexOf(e)){for(;r!==null;){var s=oo(r);if(s!==null&&Vg(s),s=pf(e,t,n,i),s===null&&Zu(e,t,i,kl,n),s===r)break;r=s}r!==null&&i.stopPropagation()}else Zu(e,t,i,null,n)}}var kl=null;function pf(e,t,n,i){if(kl=null,e=qd(i),e=Or(e),e!==null)if(t=Jr(e),t===null)e=null;else if(n=t.tag,n===13){if(e=Dg(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return kl=e,null}function $g(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(YS()){case Kd:return 1;case kg:return 4;case Ul:case qS:return 16;case Bg:return 536870912;default:return 16}default:return 16}}var or=null,eh=null,hl=null;function Yg(){if(hl)return hl;var e,t=eh,n=t.length,i,r="value"in or?or.value:or.textContent,s=r.length;for(e=0;e<n&&t[e]===r[e];e++);var a=n-e;for(i=1;i<=a&&t[n-i]===r[s-i];i++);return hl=r.slice(e,1<i?1-i:void 0)}function pl(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function To(){return!0}function Ip(){return!1}function Pn(e){function t(n,i,r,s,a){this._reactName=n,this._targetInst=r,this.type=i,this.nativeEvent=s,this.target=a,this.currentTarget=null;for(var o in e)e.hasOwnProperty(o)&&(n=e[o],this[o]=n?n(s):s[o]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?To:Ip,this.isPropagationStopped=Ip,this}return xt(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=To)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=To)},persist:function(){},isPersistent:To}),t}var Zs={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},th=Pn(Zs),ao=xt({},Zs,{view:0,detail:0}),ly=Pn(ao),Vu,Hu,sa,mu=xt({},ao,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:nh,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==sa&&(sa&&e.type==="mousemove"?(Vu=e.screenX-sa.screenX,Hu=e.screenY-sa.screenY):Hu=Vu=0,sa=e),Vu)},movementY:function(e){return"movementY"in e?e.movementY:Hu}}),Np=Pn(mu),uy=xt({},mu,{dataTransfer:0}),cy=Pn(uy),fy=xt({},ao,{relatedTarget:0}),Wu=Pn(fy),dy=xt({},Zs,{animationName:0,elapsedTime:0,pseudoElement:0}),hy=Pn(dy),py=xt({},Zs,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),my=Pn(py),gy=xt({},Zs,{data:0}),Lp=Pn(gy),vy={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},_y={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Sy={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function yy(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Sy[e])?!!t[e]:!1}function nh(){return yy}var My=xt({},ao,{key:function(e){if(e.key){var t=vy[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=pl(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?_y[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:nh,charCode:function(e){return e.type==="keypress"?pl(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?pl(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Ey=Pn(My),Ty=xt({},mu,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Dp=Pn(Ty),by=xt({},ao,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:nh}),wy=Pn(by),xy=xt({},Zs,{propertyName:0,elapsedTime:0,pseudoElement:0}),Ay=Pn(xy),Cy=xt({},mu,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Ry=Pn(Cy),Py=[9,13,27,32],ih=Oi&&"CompositionEvent"in window,Pa=null;Oi&&"documentMode"in document&&(Pa=document.documentMode);var Iy=Oi&&"TextEvent"in window&&!Pa,qg=Oi&&(!ih||Pa&&8<Pa&&11>=Pa),Up=" ",Fp=!1;function Kg(e,t){switch(e){case"keyup":return Py.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Zg(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Es=!1;function Ny(e,t){switch(e){case"compositionend":return Zg(t);case"keypress":return t.which!==32?null:(Fp=!0,Up);case"textInput":return e=t.data,e===Up&&Fp?null:e;default:return null}}function Ly(e,t){if(Es)return e==="compositionend"||!ih&&Kg(e,t)?(e=Yg(),hl=eh=or=null,Es=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return qg&&t.locale!=="ko"?null:t.data;default:return null}}var Dy={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Op(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Dy[e.type]:t==="textarea"}function Qg(e,t,n,i){Rg(i),t=Bl(t,"onChange"),0<t.length&&(n=new th("onChange","change",null,n,i),e.push({event:n,listeners:t}))}var Ia=null,Wa=null;function Uy(e){uv(e,0)}function gu(e){var t=ws(e);if(Eg(t))return e}function Fy(e,t){if(e==="change")return t}var Jg=!1;if(Oi){var ju;if(Oi){var Xu="oninput"in document;if(!Xu){var kp=document.createElement("div");kp.setAttribute("oninput","return;"),Xu=typeof kp.oninput=="function"}ju=Xu}else ju=!1;Jg=ju&&(!document.documentMode||9<document.documentMode)}function Bp(){Ia&&(Ia.detachEvent("onpropertychange",ev),Wa=Ia=null)}function ev(e){if(e.propertyName==="value"&&gu(Wa)){var t=[];Qg(t,Wa,e,qd(e)),Lg(Uy,t)}}function Oy(e,t,n){e==="focusin"?(Bp(),Ia=t,Wa=n,Ia.attachEvent("onpropertychange",ev)):e==="focusout"&&Bp()}function ky(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return gu(Wa)}function By(e,t){if(e==="click")return gu(t)}function zy(e,t){if(e==="input"||e==="change")return gu(t)}function Gy(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var ei=typeof Object.is=="function"?Object.is:Gy;function ja(e,t){if(ei(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),i=Object.keys(t);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var r=n[i];if(!qc.call(t,r)||!ei(e[r],t[r]))return!1}return!0}function zp(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Gp(e,t){var n=zp(e);e=0;for(var i;n;){if(n.nodeType===3){if(i=e+n.textContent.length,e<=t&&i>=t)return{node:n,offset:t-e};e=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=zp(n)}}function tv(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?tv(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function nv(){for(var e=window,t=Nl();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Nl(e.document)}return t}function rh(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Vy(e){var t=nv(),n=e.focusedElem,i=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&tv(n.ownerDocument.documentElement,n)){if(i!==null&&rh(n)){if(t=i.start,e=i.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var r=n.textContent.length,s=Math.min(i.start,r);i=i.end===void 0?s:Math.min(i.end,r),!e.extend&&s>i&&(r=i,i=s,s=r),r=Gp(n,s);var a=Gp(n,i);r&&a&&(e.rangeCount!==1||e.anchorNode!==r.node||e.anchorOffset!==r.offset||e.focusNode!==a.node||e.focusOffset!==a.offset)&&(t=t.createRange(),t.setStart(r.node,r.offset),e.removeAllRanges(),s>i?(e.addRange(t),e.extend(a.node,a.offset)):(t.setEnd(a.node,a.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Hy=Oi&&"documentMode"in document&&11>=document.documentMode,Ts=null,mf=null,Na=null,gf=!1;function Vp(e,t,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;gf||Ts==null||Ts!==Nl(i)||(i=Ts,"selectionStart"in i&&rh(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),Na&&ja(Na,i)||(Na=i,i=Bl(mf,"onSelect"),0<i.length&&(t=new th("onSelect","select",null,t,n),e.push({event:t,listeners:i}),t.target=Ts)))}function bo(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var bs={animationend:bo("Animation","AnimationEnd"),animationiteration:bo("Animation","AnimationIteration"),animationstart:bo("Animation","AnimationStart"),transitionend:bo("Transition","TransitionEnd")},$u={},iv={};Oi&&(iv=document.createElement("div").style,"AnimationEvent"in window||(delete bs.animationend.animation,delete bs.animationiteration.animation,delete bs.animationstart.animation),"TransitionEvent"in window||delete bs.transitionend.transition);function vu(e){if($u[e])return $u[e];if(!bs[e])return e;var t=bs[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in iv)return $u[e]=t[n];return e}var rv=vu("animationend"),sv=vu("animationiteration"),av=vu("animationstart"),ov=vu("transitionend"),lv=new Map,Hp="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Mr(e,t){lv.set(e,t),Qr(t,[e])}for(var Yu=0;Yu<Hp.length;Yu++){var qu=Hp[Yu],Wy=qu.toLowerCase(),jy=qu[0].toUpperCase()+qu.slice(1);Mr(Wy,"on"+jy)}Mr(rv,"onAnimationEnd");Mr(sv,"onAnimationIteration");Mr(av,"onAnimationStart");Mr("dblclick","onDoubleClick");Mr("focusin","onFocus");Mr("focusout","onBlur");Mr(ov,"onTransitionEnd");Bs("onMouseEnter",["mouseout","mouseover"]);Bs("onMouseLeave",["mouseout","mouseover"]);Bs("onPointerEnter",["pointerout","pointerover"]);Bs("onPointerLeave",["pointerout","pointerover"]);Qr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Qr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Qr("onBeforeInput",["compositionend","keypress","textInput","paste"]);Qr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Qr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Qr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Ea="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Xy=new Set("cancel close invalid load scroll toggle".split(" ").concat(Ea));function Wp(e,t,n){var i=e.type||"unknown-event";e.currentTarget=n,WS(i,t,void 0,e),e.currentTarget=null}function uv(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var i=e[n],r=i.event;i=i.listeners;e:{var s=void 0;if(t)for(var a=i.length-1;0<=a;a--){var o=i[a],l=o.instance,u=o.currentTarget;if(o=o.listener,l!==s&&r.isPropagationStopped())break e;Wp(r,o,u),s=l}else for(a=0;a<i.length;a++){if(o=i[a],l=o.instance,u=o.currentTarget,o=o.listener,l!==s&&r.isPropagationStopped())break e;Wp(r,o,u),s=l}}}if(Dl)throw e=ff,Dl=!1,ff=null,e}function St(e,t){var n=t[Mf];n===void 0&&(n=t[Mf]=new Set);var i=e+"__bubble";n.has(i)||(cv(t,e,2,!1),n.add(i))}function Ku(e,t,n){var i=0;t&&(i|=4),cv(n,e,i,t)}var wo="_reactListening"+Math.random().toString(36).slice(2);function Xa(e){if(!e[wo]){e[wo]=!0,vg.forEach(function(n){n!=="selectionchange"&&(Xy.has(n)||Ku(n,!1,e),Ku(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[wo]||(t[wo]=!0,Ku("selectionchange",!1,t))}}function cv(e,t,n,i){switch($g(t)){case 1:var r=ay;break;case 4:r=oy;break;default:r=Jd}n=r.bind(null,t,n,e),r=void 0,!cf||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(r=!0),i?r!==void 0?e.addEventListener(t,n,{capture:!0,passive:r}):e.addEventListener(t,n,!0):r!==void 0?e.addEventListener(t,n,{passive:r}):e.addEventListener(t,n,!1)}function Zu(e,t,n,i,r){var s=i;if(!(t&1)&&!(t&2)&&i!==null)e:for(;;){if(i===null)return;var a=i.tag;if(a===3||a===4){var o=i.stateNode.containerInfo;if(o===r||o.nodeType===8&&o.parentNode===r)break;if(a===4)for(a=i.return;a!==null;){var l=a.tag;if((l===3||l===4)&&(l=a.stateNode.containerInfo,l===r||l.nodeType===8&&l.parentNode===r))return;a=a.return}for(;o!==null;){if(a=Or(o),a===null)return;if(l=a.tag,l===5||l===6){i=s=a;continue e}o=o.parentNode}}i=i.return}Lg(function(){var u=s,f=qd(n),h=[];e:{var c=lv.get(e);if(c!==void 0){var p=th,m=e;switch(e){case"keypress":if(pl(n)===0)break e;case"keydown":case"keyup":p=Ey;break;case"focusin":m="focus",p=Wu;break;case"focusout":m="blur",p=Wu;break;case"beforeblur":case"afterblur":p=Wu;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=Np;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=cy;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=wy;break;case rv:case sv:case av:p=hy;break;case ov:p=Ay;break;case"scroll":p=ly;break;case"wheel":p=Ry;break;case"copy":case"cut":case"paste":p=my;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=Dp}var _=(t&4)!==0,g=!_&&e==="scroll",d=_?c!==null?c+"Capture":null:c;_=[];for(var v=u,y;v!==null;){y=v;var M=y.stateNode;if(y.tag===5&&M!==null&&(y=M,d!==null&&(M=za(v,d),M!=null&&_.push($a(v,M,y)))),g)break;v=v.return}0<_.length&&(c=new p(c,m,null,n,f),h.push({event:c,listeners:_}))}}if(!(t&7)){e:{if(c=e==="mouseover"||e==="pointerover",p=e==="mouseout"||e==="pointerout",c&&n!==lf&&(m=n.relatedTarget||n.fromElement)&&(Or(m)||m[ki]))break e;if((p||c)&&(c=f.window===f?f:(c=f.ownerDocument)?c.defaultView||c.parentWindow:window,p?(m=n.relatedTarget||n.toElement,p=u,m=m?Or(m):null,m!==null&&(g=Jr(m),m!==g||m.tag!==5&&m.tag!==6)&&(m=null)):(p=null,m=u),p!==m)){if(_=Np,M="onMouseLeave",d="onMouseEnter",v="mouse",(e==="pointerout"||e==="pointerover")&&(_=Dp,M="onPointerLeave",d="onPointerEnter",v="pointer"),g=p==null?c:ws(p),y=m==null?c:ws(m),c=new _(M,v+"leave",p,n,f),c.target=g,c.relatedTarget=y,M=null,Or(f)===u&&(_=new _(d,v+"enter",m,n,f),_.target=y,_.relatedTarget=g,M=_),g=M,p&&m)t:{for(_=p,d=m,v=0,y=_;y;y=rs(y))v++;for(y=0,M=d;M;M=rs(M))y++;for(;0<v-y;)_=rs(_),v--;for(;0<y-v;)d=rs(d),y--;for(;v--;){if(_===d||d!==null&&_===d.alternate)break t;_=rs(_),d=rs(d)}_=null}else _=null;p!==null&&jp(h,c,p,_,!1),m!==null&&g!==null&&jp(h,g,m,_,!0)}}e:{if(c=u?ws(u):window,p=c.nodeName&&c.nodeName.toLowerCase(),p==="select"||p==="input"&&c.type==="file")var T=Fy;else if(Op(c))if(Jg)T=zy;else{T=ky;var b=Oy}else(p=c.nodeName)&&p.toLowerCase()==="input"&&(c.type==="checkbox"||c.type==="radio")&&(T=By);if(T&&(T=T(e,u))){Qg(h,T,n,f);break e}b&&b(e,c,u),e==="focusout"&&(b=c._wrapperState)&&b.controlled&&c.type==="number"&&nf(c,"number",c.value)}switch(b=u?ws(u):window,e){case"focusin":(Op(b)||b.contentEditable==="true")&&(Ts=b,mf=u,Na=null);break;case"focusout":Na=mf=Ts=null;break;case"mousedown":gf=!0;break;case"contextmenu":case"mouseup":case"dragend":gf=!1,Vp(h,n,f);break;case"selectionchange":if(Hy)break;case"keydown":case"keyup":Vp(h,n,f)}var w;if(ih)e:{switch(e){case"compositionstart":var S="onCompositionStart";break e;case"compositionend":S="onCompositionEnd";break e;case"compositionupdate":S="onCompositionUpdate";break e}S=void 0}else Es?Kg(e,n)&&(S="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(S="onCompositionStart");S&&(qg&&n.locale!=="ko"&&(Es||S!=="onCompositionStart"?S==="onCompositionEnd"&&Es&&(w=Yg()):(or=f,eh="value"in or?or.value:or.textContent,Es=!0)),b=Bl(u,S),0<b.length&&(S=new Lp(S,e,null,n,f),h.push({event:S,listeners:b}),w?S.data=w:(w=Zg(n),w!==null&&(S.data=w)))),(w=Iy?Ny(e,n):Ly(e,n))&&(u=Bl(u,"onBeforeInput"),0<u.length&&(f=new Lp("onBeforeInput","beforeinput",null,n,f),h.push({event:f,listeners:u}),f.data=w))}uv(h,t)})}function $a(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Bl(e,t){for(var n=t+"Capture",i=[];e!==null;){var r=e,s=r.stateNode;r.tag===5&&s!==null&&(r=s,s=za(e,n),s!=null&&i.unshift($a(e,s,r)),s=za(e,t),s!=null&&i.push($a(e,s,r))),e=e.return}return i}function rs(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function jp(e,t,n,i,r){for(var s=t._reactName,a=[];n!==null&&n!==i;){var o=n,l=o.alternate,u=o.stateNode;if(l!==null&&l===i)break;o.tag===5&&u!==null&&(o=u,r?(l=za(n,s),l!=null&&a.unshift($a(n,l,o))):r||(l=za(n,s),l!=null&&a.push($a(n,l,o)))),n=n.return}a.length!==0&&e.push({event:t,listeners:a})}var $y=/\r\n?/g,Yy=/\u0000|\uFFFD/g;function Xp(e){return(typeof e=="string"?e:""+e).replace($y,`
`).replace(Yy,"")}function xo(e,t,n){if(t=Xp(t),Xp(e)!==t&&n)throw Error(he(425))}function zl(){}var vf=null,_f=null;function Sf(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var yf=typeof setTimeout=="function"?setTimeout:void 0,qy=typeof clearTimeout=="function"?clearTimeout:void 0,$p=typeof Promise=="function"?Promise:void 0,Ky=typeof queueMicrotask=="function"?queueMicrotask:typeof $p<"u"?function(e){return $p.resolve(null).then(e).catch(Zy)}:yf;function Zy(e){setTimeout(function(){throw e})}function Qu(e,t){var n=t,i=0;do{var r=n.nextSibling;if(e.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"){if(i===0){e.removeChild(r),Ha(t);return}i--}else n!=="$"&&n!=="$?"&&n!=="$!"||i++;n=r}while(n);Ha(t)}function hr(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Yp(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var Qs=Math.random().toString(36).slice(2),ci="__reactFiber$"+Qs,Ya="__reactProps$"+Qs,ki="__reactContainer$"+Qs,Mf="__reactEvents$"+Qs,Qy="__reactListeners$"+Qs,Jy="__reactHandles$"+Qs;function Or(e){var t=e[ci];if(t)return t;for(var n=e.parentNode;n;){if(t=n[ki]||n[ci]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Yp(e);e!==null;){if(n=e[ci])return n;e=Yp(e)}return t}e=n,n=e.parentNode}return null}function oo(e){return e=e[ci]||e[ki],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function ws(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(he(33))}function _u(e){return e[Ya]||null}var Ef=[],xs=-1;function Er(e){return{current:e}}function Mt(e){0>xs||(e.current=Ef[xs],Ef[xs]=null,xs--)}function _t(e,t){xs++,Ef[xs]=e.current,e.current=t}var Sr={},rn=Er(Sr),mn=Er(!1),jr=Sr;function zs(e,t){var n=e.type.contextTypes;if(!n)return Sr;var i=e.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===t)return i.__reactInternalMemoizedMaskedChildContext;var r={},s;for(s in n)r[s]=t[s];return i&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=r),r}function gn(e){return e=e.childContextTypes,e!=null}function Gl(){Mt(mn),Mt(rn)}function qp(e,t,n){if(rn.current!==Sr)throw Error(he(168));_t(rn,t),_t(mn,n)}function fv(e,t,n){var i=e.stateNode;if(t=t.childContextTypes,typeof i.getChildContext!="function")return n;i=i.getChildContext();for(var r in i)if(!(r in t))throw Error(he(108,OS(e)||"Unknown",r));return xt({},n,i)}function Vl(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Sr,jr=rn.current,_t(rn,e),_t(mn,mn.current),!0}function Kp(e,t,n){var i=e.stateNode;if(!i)throw Error(he(169));n?(e=fv(e,t,jr),i.__reactInternalMemoizedMergedChildContext=e,Mt(mn),Mt(rn),_t(rn,e)):Mt(mn),_t(mn,n)}var Ri=null,Su=!1,Ju=!1;function dv(e){Ri===null?Ri=[e]:Ri.push(e)}function e1(e){Su=!0,dv(e)}function Tr(){if(!Ju&&Ri!==null){Ju=!0;var e=0,t=dt;try{var n=Ri;for(dt=1;e<n.length;e++){var i=n[e];do i=i(!0);while(i!==null)}Ri=null,Su=!1}catch(r){throw Ri!==null&&(Ri=Ri.slice(e+1)),Og(Kd,Tr),r}finally{dt=t,Ju=!1}}return null}var As=[],Cs=0,Hl=null,Wl=0,Dn=[],Un=0,Xr=null,Pi=1,Ii="";function Rr(e,t){As[Cs++]=Wl,As[Cs++]=Hl,Hl=e,Wl=t}function hv(e,t,n){Dn[Un++]=Pi,Dn[Un++]=Ii,Dn[Un++]=Xr,Xr=e;var i=Pi;e=Ii;var r=32-Qn(i)-1;i&=~(1<<r),n+=1;var s=32-Qn(t)+r;if(30<s){var a=r-r%5;s=(i&(1<<a)-1).toString(32),i>>=a,r-=a,Pi=1<<32-Qn(t)+r|n<<r|i,Ii=s+e}else Pi=1<<s|n<<r|i,Ii=e}function sh(e){e.return!==null&&(Rr(e,1),hv(e,1,0))}function ah(e){for(;e===Hl;)Hl=As[--Cs],As[Cs]=null,Wl=As[--Cs],As[Cs]=null;for(;e===Xr;)Xr=Dn[--Un],Dn[Un]=null,Ii=Dn[--Un],Dn[Un]=null,Pi=Dn[--Un],Dn[Un]=null}var xn=null,wn=null,Et=!1,qn=null;function pv(e,t){var n=Fn(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Zp(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,xn=e,wn=hr(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,xn=e,wn=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=Xr!==null?{id:Pi,overflow:Ii}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=Fn(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,xn=e,wn=null,!0):!1;default:return!1}}function Tf(e){return(e.mode&1)!==0&&(e.flags&128)===0}function bf(e){if(Et){var t=wn;if(t){var n=t;if(!Zp(e,t)){if(Tf(e))throw Error(he(418));t=hr(n.nextSibling);var i=xn;t&&Zp(e,t)?pv(i,n):(e.flags=e.flags&-4097|2,Et=!1,xn=e)}}else{if(Tf(e))throw Error(he(418));e.flags=e.flags&-4097|2,Et=!1,xn=e}}}function Qp(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;xn=e}function Ao(e){if(e!==xn)return!1;if(!Et)return Qp(e),Et=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Sf(e.type,e.memoizedProps)),t&&(t=wn)){if(Tf(e))throw mv(),Error(he(418));for(;t;)pv(e,t),t=hr(t.nextSibling)}if(Qp(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(he(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){wn=hr(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}wn=null}}else wn=xn?hr(e.stateNode.nextSibling):null;return!0}function mv(){for(var e=wn;e;)e=hr(e.nextSibling)}function Gs(){wn=xn=null,Et=!1}function oh(e){qn===null?qn=[e]:qn.push(e)}var t1=Hi.ReactCurrentBatchConfig;function aa(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(he(309));var i=n.stateNode}if(!i)throw Error(he(147,e));var r=i,s=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===s?t.ref:(t=function(a){var o=r.refs;a===null?delete o[s]:o[s]=a},t._stringRef=s,t)}if(typeof e!="string")throw Error(he(284));if(!n._owner)throw Error(he(290,e))}return e}function Co(e,t){throw e=Object.prototype.toString.call(t),Error(he(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Jp(e){var t=e._init;return t(e._payload)}function gv(e){function t(d,v){if(e){var y=d.deletions;y===null?(d.deletions=[v],d.flags|=16):y.push(v)}}function n(d,v){if(!e)return null;for(;v!==null;)t(d,v),v=v.sibling;return null}function i(d,v){for(d=new Map;v!==null;)v.key!==null?d.set(v.key,v):d.set(v.index,v),v=v.sibling;return d}function r(d,v){return d=vr(d,v),d.index=0,d.sibling=null,d}function s(d,v,y){return d.index=y,e?(y=d.alternate,y!==null?(y=y.index,y<v?(d.flags|=2,v):y):(d.flags|=2,v)):(d.flags|=1048576,v)}function a(d){return e&&d.alternate===null&&(d.flags|=2),d}function o(d,v,y,M){return v===null||v.tag!==6?(v=ac(y,d.mode,M),v.return=d,v):(v=r(v,y),v.return=d,v)}function l(d,v,y,M){var T=y.type;return T===Ms?f(d,v,y.props.children,M,y.key):v!==null&&(v.elementType===T||typeof T=="object"&&T!==null&&T.$$typeof===er&&Jp(T)===v.type)?(M=r(v,y.props),M.ref=aa(d,v,y),M.return=d,M):(M=Ml(y.type,y.key,y.props,null,d.mode,M),M.ref=aa(d,v,y),M.return=d,M)}function u(d,v,y,M){return v===null||v.tag!==4||v.stateNode.containerInfo!==y.containerInfo||v.stateNode.implementation!==y.implementation?(v=oc(y,d.mode,M),v.return=d,v):(v=r(v,y.children||[]),v.return=d,v)}function f(d,v,y,M,T){return v===null||v.tag!==7?(v=Hr(y,d.mode,M,T),v.return=d,v):(v=r(v,y),v.return=d,v)}function h(d,v,y){if(typeof v=="string"&&v!==""||typeof v=="number")return v=ac(""+v,d.mode,y),v.return=d,v;if(typeof v=="object"&&v!==null){switch(v.$$typeof){case vo:return y=Ml(v.type,v.key,v.props,null,d.mode,y),y.ref=aa(d,null,v),y.return=d,y;case ys:return v=oc(v,d.mode,y),v.return=d,v;case er:var M=v._init;return h(d,M(v._payload),y)}if(ya(v)||ta(v))return v=Hr(v,d.mode,y,null),v.return=d,v;Co(d,v)}return null}function c(d,v,y,M){var T=v!==null?v.key:null;if(typeof y=="string"&&y!==""||typeof y=="number")return T!==null?null:o(d,v,""+y,M);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case vo:return y.key===T?l(d,v,y,M):null;case ys:return y.key===T?u(d,v,y,M):null;case er:return T=y._init,c(d,v,T(y._payload),M)}if(ya(y)||ta(y))return T!==null?null:f(d,v,y,M,null);Co(d,y)}return null}function p(d,v,y,M,T){if(typeof M=="string"&&M!==""||typeof M=="number")return d=d.get(y)||null,o(v,d,""+M,T);if(typeof M=="object"&&M!==null){switch(M.$$typeof){case vo:return d=d.get(M.key===null?y:M.key)||null,l(v,d,M,T);case ys:return d=d.get(M.key===null?y:M.key)||null,u(v,d,M,T);case er:var b=M._init;return p(d,v,y,b(M._payload),T)}if(ya(M)||ta(M))return d=d.get(y)||null,f(v,d,M,T,null);Co(v,M)}return null}function m(d,v,y,M){for(var T=null,b=null,w=v,S=v=0,x=null;w!==null&&S<y.length;S++){w.index>S?(x=w,w=null):x=w.sibling;var P=c(d,w,y[S],M);if(P===null){w===null&&(w=x);break}e&&w&&P.alternate===null&&t(d,w),v=s(P,v,S),b===null?T=P:b.sibling=P,b=P,w=x}if(S===y.length)return n(d,w),Et&&Rr(d,S),T;if(w===null){for(;S<y.length;S++)w=h(d,y[S],M),w!==null&&(v=s(w,v,S),b===null?T=w:b.sibling=w,b=w);return Et&&Rr(d,S),T}for(w=i(d,w);S<y.length;S++)x=p(w,d,S,y[S],M),x!==null&&(e&&x.alternate!==null&&w.delete(x.key===null?S:x.key),v=s(x,v,S),b===null?T=x:b.sibling=x,b=x);return e&&w.forEach(function(R){return t(d,R)}),Et&&Rr(d,S),T}function _(d,v,y,M){var T=ta(y);if(typeof T!="function")throw Error(he(150));if(y=T.call(y),y==null)throw Error(he(151));for(var b=T=null,w=v,S=v=0,x=null,P=y.next();w!==null&&!P.done;S++,P=y.next()){w.index>S?(x=w,w=null):x=w.sibling;var R=c(d,w,P.value,M);if(R===null){w===null&&(w=x);break}e&&w&&R.alternate===null&&t(d,w),v=s(R,v,S),b===null?T=R:b.sibling=R,b=R,w=x}if(P.done)return n(d,w),Et&&Rr(d,S),T;if(w===null){for(;!P.done;S++,P=y.next())P=h(d,P.value,M),P!==null&&(v=s(P,v,S),b===null?T=P:b.sibling=P,b=P);return Et&&Rr(d,S),T}for(w=i(d,w);!P.done;S++,P=y.next())P=p(w,d,S,P.value,M),P!==null&&(e&&P.alternate!==null&&w.delete(P.key===null?S:P.key),v=s(P,v,S),b===null?T=P:b.sibling=P,b=P);return e&&w.forEach(function(L){return t(d,L)}),Et&&Rr(d,S),T}function g(d,v,y,M){if(typeof y=="object"&&y!==null&&y.type===Ms&&y.key===null&&(y=y.props.children),typeof y=="object"&&y!==null){switch(y.$$typeof){case vo:e:{for(var T=y.key,b=v;b!==null;){if(b.key===T){if(T=y.type,T===Ms){if(b.tag===7){n(d,b.sibling),v=r(b,y.props.children),v.return=d,d=v;break e}}else if(b.elementType===T||typeof T=="object"&&T!==null&&T.$$typeof===er&&Jp(T)===b.type){n(d,b.sibling),v=r(b,y.props),v.ref=aa(d,b,y),v.return=d,d=v;break e}n(d,b);break}else t(d,b);b=b.sibling}y.type===Ms?(v=Hr(y.props.children,d.mode,M,y.key),v.return=d,d=v):(M=Ml(y.type,y.key,y.props,null,d.mode,M),M.ref=aa(d,v,y),M.return=d,d=M)}return a(d);case ys:e:{for(b=y.key;v!==null;){if(v.key===b)if(v.tag===4&&v.stateNode.containerInfo===y.containerInfo&&v.stateNode.implementation===y.implementation){n(d,v.sibling),v=r(v,y.children||[]),v.return=d,d=v;break e}else{n(d,v);break}else t(d,v);v=v.sibling}v=oc(y,d.mode,M),v.return=d,d=v}return a(d);case er:return b=y._init,g(d,v,b(y._payload),M)}if(ya(y))return m(d,v,y,M);if(ta(y))return _(d,v,y,M);Co(d,y)}return typeof y=="string"&&y!==""||typeof y=="number"?(y=""+y,v!==null&&v.tag===6?(n(d,v.sibling),v=r(v,y),v.return=d,d=v):(n(d,v),v=ac(y,d.mode,M),v.return=d,d=v),a(d)):n(d,v)}return g}var Vs=gv(!0),vv=gv(!1),jl=Er(null),Xl=null,Rs=null,lh=null;function uh(){lh=Rs=Xl=null}function ch(e){var t=jl.current;Mt(jl),e._currentValue=t}function wf(e,t,n){for(;e!==null;){var i=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,i!==null&&(i.childLanes|=t)):i!==null&&(i.childLanes&t)!==t&&(i.childLanes|=t),e===n)break;e=e.return}}function Fs(e,t){Xl=e,lh=Rs=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(pn=!0),e.firstContext=null)}function Bn(e){var t=e._currentValue;if(lh!==e)if(e={context:e,memoizedValue:t,next:null},Rs===null){if(Xl===null)throw Error(he(308));Rs=e,Xl.dependencies={lanes:0,firstContext:e}}else Rs=Rs.next=e;return t}var kr=null;function fh(e){kr===null?kr=[e]:kr.push(e)}function _v(e,t,n,i){var r=t.interleaved;return r===null?(n.next=n,fh(t)):(n.next=r.next,r.next=n),t.interleaved=n,Bi(e,i)}function Bi(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var tr=!1;function dh(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Sv(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Di(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function pr(e,t,n){var i=e.updateQueue;if(i===null)return null;if(i=i.shared,at&2){var r=i.pending;return r===null?t.next=t:(t.next=r.next,r.next=t),i.pending=t,Bi(e,n)}return r=i.interleaved,r===null?(t.next=t,fh(i)):(t.next=r.next,r.next=t),i.interleaved=t,Bi(e,n)}function ml(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var i=t.lanes;i&=e.pendingLanes,n|=i,t.lanes=n,Zd(e,n)}}function e0(e,t){var n=e.updateQueue,i=e.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var r=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var a={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?r=s=a:s=s.next=a,n=n.next}while(n!==null);s===null?r=s=t:s=s.next=t}else r=s=t;n={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:s,shared:i.shared,effects:i.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function $l(e,t,n,i){var r=e.updateQueue;tr=!1;var s=r.firstBaseUpdate,a=r.lastBaseUpdate,o=r.shared.pending;if(o!==null){r.shared.pending=null;var l=o,u=l.next;l.next=null,a===null?s=u:a.next=u,a=l;var f=e.alternate;f!==null&&(f=f.updateQueue,o=f.lastBaseUpdate,o!==a&&(o===null?f.firstBaseUpdate=u:o.next=u,f.lastBaseUpdate=l))}if(s!==null){var h=r.baseState;a=0,f=u=l=null,o=s;do{var c=o.lane,p=o.eventTime;if((i&c)===c){f!==null&&(f=f.next={eventTime:p,lane:0,tag:o.tag,payload:o.payload,callback:o.callback,next:null});e:{var m=e,_=o;switch(c=t,p=n,_.tag){case 1:if(m=_.payload,typeof m=="function"){h=m.call(p,h,c);break e}h=m;break e;case 3:m.flags=m.flags&-65537|128;case 0:if(m=_.payload,c=typeof m=="function"?m.call(p,h,c):m,c==null)break e;h=xt({},h,c);break e;case 2:tr=!0}}o.callback!==null&&o.lane!==0&&(e.flags|=64,c=r.effects,c===null?r.effects=[o]:c.push(o))}else p={eventTime:p,lane:c,tag:o.tag,payload:o.payload,callback:o.callback,next:null},f===null?(u=f=p,l=h):f=f.next=p,a|=c;if(o=o.next,o===null){if(o=r.shared.pending,o===null)break;c=o,o=c.next,c.next=null,r.lastBaseUpdate=c,r.shared.pending=null}}while(!0);if(f===null&&(l=h),r.baseState=l,r.firstBaseUpdate=u,r.lastBaseUpdate=f,t=r.shared.interleaved,t!==null){r=t;do a|=r.lane,r=r.next;while(r!==t)}else s===null&&(r.shared.lanes=0);Yr|=a,e.lanes=a,e.memoizedState=h}}function t0(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var i=e[t],r=i.callback;if(r!==null){if(i.callback=null,i=n,typeof r!="function")throw Error(he(191,r));r.call(i)}}}var lo={},mi=Er(lo),qa=Er(lo),Ka=Er(lo);function Br(e){if(e===lo)throw Error(he(174));return e}function hh(e,t){switch(_t(Ka,t),_t(qa,e),_t(mi,lo),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:sf(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=sf(t,e)}Mt(mi),_t(mi,t)}function Hs(){Mt(mi),Mt(qa),Mt(Ka)}function yv(e){Br(Ka.current);var t=Br(mi.current),n=sf(t,e.type);t!==n&&(_t(qa,e),_t(mi,n))}function ph(e){qa.current===e&&(Mt(mi),Mt(qa))}var Tt=Er(0);function Yl(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var ec=[];function mh(){for(var e=0;e<ec.length;e++)ec[e]._workInProgressVersionPrimary=null;ec.length=0}var gl=Hi.ReactCurrentDispatcher,tc=Hi.ReactCurrentBatchConfig,$r=0,bt=null,Ft=null,Gt=null,ql=!1,La=!1,Za=0,n1=0;function qt(){throw Error(he(321))}function gh(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!ei(e[n],t[n]))return!1;return!0}function vh(e,t,n,i,r,s){if($r=s,bt=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,gl.current=e===null||e.memoizedState===null?a1:o1,e=n(i,r),La){s=0;do{if(La=!1,Za=0,25<=s)throw Error(he(301));s+=1,Gt=Ft=null,t.updateQueue=null,gl.current=l1,e=n(i,r)}while(La)}if(gl.current=Kl,t=Ft!==null&&Ft.next!==null,$r=0,Gt=Ft=bt=null,ql=!1,t)throw Error(he(300));return e}function _h(){var e=Za!==0;return Za=0,e}function oi(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Gt===null?bt.memoizedState=Gt=e:Gt=Gt.next=e,Gt}function zn(){if(Ft===null){var e=bt.alternate;e=e!==null?e.memoizedState:null}else e=Ft.next;var t=Gt===null?bt.memoizedState:Gt.next;if(t!==null)Gt=t,Ft=e;else{if(e===null)throw Error(he(310));Ft=e,e={memoizedState:Ft.memoizedState,baseState:Ft.baseState,baseQueue:Ft.baseQueue,queue:Ft.queue,next:null},Gt===null?bt.memoizedState=Gt=e:Gt=Gt.next=e}return Gt}function Qa(e,t){return typeof t=="function"?t(e):t}function nc(e){var t=zn(),n=t.queue;if(n===null)throw Error(he(311));n.lastRenderedReducer=e;var i=Ft,r=i.baseQueue,s=n.pending;if(s!==null){if(r!==null){var a=r.next;r.next=s.next,s.next=a}i.baseQueue=r=s,n.pending=null}if(r!==null){s=r.next,i=i.baseState;var o=a=null,l=null,u=s;do{var f=u.lane;if(($r&f)===f)l!==null&&(l=l.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),i=u.hasEagerState?u.eagerState:e(i,u.action);else{var h={lane:f,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};l===null?(o=l=h,a=i):l=l.next=h,bt.lanes|=f,Yr|=f}u=u.next}while(u!==null&&u!==s);l===null?a=i:l.next=o,ei(i,t.memoizedState)||(pn=!0),t.memoizedState=i,t.baseState=a,t.baseQueue=l,n.lastRenderedState=i}if(e=n.interleaved,e!==null){r=e;do s=r.lane,bt.lanes|=s,Yr|=s,r=r.next;while(r!==e)}else r===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function ic(e){var t=zn(),n=t.queue;if(n===null)throw Error(he(311));n.lastRenderedReducer=e;var i=n.dispatch,r=n.pending,s=t.memoizedState;if(r!==null){n.pending=null;var a=r=r.next;do s=e(s,a.action),a=a.next;while(a!==r);ei(s,t.memoizedState)||(pn=!0),t.memoizedState=s,t.baseQueue===null&&(t.baseState=s),n.lastRenderedState=s}return[s,i]}function Mv(){}function Ev(e,t){var n=bt,i=zn(),r=t(),s=!ei(i.memoizedState,r);if(s&&(i.memoizedState=r,pn=!0),i=i.queue,Sh(wv.bind(null,n,i,e),[e]),i.getSnapshot!==t||s||Gt!==null&&Gt.memoizedState.tag&1){if(n.flags|=2048,Ja(9,bv.bind(null,n,i,r,t),void 0,null),Vt===null)throw Error(he(349));$r&30||Tv(n,t,r)}return r}function Tv(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=bt.updateQueue,t===null?(t={lastEffect:null,stores:null},bt.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function bv(e,t,n,i){t.value=n,t.getSnapshot=i,xv(t)&&Av(e)}function wv(e,t,n){return n(function(){xv(t)&&Av(e)})}function xv(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!ei(e,n)}catch{return!0}}function Av(e){var t=Bi(e,1);t!==null&&Jn(t,e,1,-1)}function n0(e){var t=oi();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Qa,lastRenderedState:e},t.queue=e,e=e.dispatch=s1.bind(null,bt,e),[t.memoizedState,e]}function Ja(e,t,n,i){return e={tag:e,create:t,destroy:n,deps:i,next:null},t=bt.updateQueue,t===null?(t={lastEffect:null,stores:null},bt.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(i=n.next,n.next=e,e.next=i,t.lastEffect=e)),e}function Cv(){return zn().memoizedState}function vl(e,t,n,i){var r=oi();bt.flags|=e,r.memoizedState=Ja(1|t,n,void 0,i===void 0?null:i)}function yu(e,t,n,i){var r=zn();i=i===void 0?null:i;var s=void 0;if(Ft!==null){var a=Ft.memoizedState;if(s=a.destroy,i!==null&&gh(i,a.deps)){r.memoizedState=Ja(t,n,s,i);return}}bt.flags|=e,r.memoizedState=Ja(1|t,n,s,i)}function i0(e,t){return vl(8390656,8,e,t)}function Sh(e,t){return yu(2048,8,e,t)}function Rv(e,t){return yu(4,2,e,t)}function Pv(e,t){return yu(4,4,e,t)}function Iv(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Nv(e,t,n){return n=n!=null?n.concat([e]):null,yu(4,4,Iv.bind(null,t,e),n)}function yh(){}function Lv(e,t){var n=zn();t=t===void 0?null:t;var i=n.memoizedState;return i!==null&&t!==null&&gh(t,i[1])?i[0]:(n.memoizedState=[e,t],e)}function Dv(e,t){var n=zn();t=t===void 0?null:t;var i=n.memoizedState;return i!==null&&t!==null&&gh(t,i[1])?i[0]:(e=e(),n.memoizedState=[e,t],e)}function Uv(e,t,n){return $r&21?(ei(n,t)||(n=zg(),bt.lanes|=n,Yr|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,pn=!0),e.memoizedState=n)}function i1(e,t){var n=dt;dt=n!==0&&4>n?n:4,e(!0);var i=tc.transition;tc.transition={};try{e(!1),t()}finally{dt=n,tc.transition=i}}function Fv(){return zn().memoizedState}function r1(e,t,n){var i=gr(e);if(n={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null},Ov(e))kv(t,n);else if(n=_v(e,t,n,i),n!==null){var r=on();Jn(n,e,i,r),Bv(n,t,i)}}function s1(e,t,n){var i=gr(e),r={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null};if(Ov(e))kv(t,r);else{var s=e.alternate;if(e.lanes===0&&(s===null||s.lanes===0)&&(s=t.lastRenderedReducer,s!==null))try{var a=t.lastRenderedState,o=s(a,n);if(r.hasEagerState=!0,r.eagerState=o,ei(o,a)){var l=t.interleaved;l===null?(r.next=r,fh(t)):(r.next=l.next,l.next=r),t.interleaved=r;return}}catch{}finally{}n=_v(e,t,r,i),n!==null&&(r=on(),Jn(n,e,i,r),Bv(n,t,i))}}function Ov(e){var t=e.alternate;return e===bt||t!==null&&t===bt}function kv(e,t){La=ql=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Bv(e,t,n){if(n&4194240){var i=t.lanes;i&=e.pendingLanes,n|=i,t.lanes=n,Zd(e,n)}}var Kl={readContext:Bn,useCallback:qt,useContext:qt,useEffect:qt,useImperativeHandle:qt,useInsertionEffect:qt,useLayoutEffect:qt,useMemo:qt,useReducer:qt,useRef:qt,useState:qt,useDebugValue:qt,useDeferredValue:qt,useTransition:qt,useMutableSource:qt,useSyncExternalStore:qt,useId:qt,unstable_isNewReconciler:!1},a1={readContext:Bn,useCallback:function(e,t){return oi().memoizedState=[e,t===void 0?null:t],e},useContext:Bn,useEffect:i0,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,vl(4194308,4,Iv.bind(null,t,e),n)},useLayoutEffect:function(e,t){return vl(4194308,4,e,t)},useInsertionEffect:function(e,t){return vl(4,2,e,t)},useMemo:function(e,t){var n=oi();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var i=oi();return t=n!==void 0?n(t):t,i.memoizedState=i.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},i.queue=e,e=e.dispatch=r1.bind(null,bt,e),[i.memoizedState,e]},useRef:function(e){var t=oi();return e={current:e},t.memoizedState=e},useState:n0,useDebugValue:yh,useDeferredValue:function(e){return oi().memoizedState=e},useTransition:function(){var e=n0(!1),t=e[0];return e=i1.bind(null,e[1]),oi().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var i=bt,r=oi();if(Et){if(n===void 0)throw Error(he(407));n=n()}else{if(n=t(),Vt===null)throw Error(he(349));$r&30||Tv(i,t,n)}r.memoizedState=n;var s={value:n,getSnapshot:t};return r.queue=s,i0(wv.bind(null,i,s,e),[e]),i.flags|=2048,Ja(9,bv.bind(null,i,s,n,t),void 0,null),n},useId:function(){var e=oi(),t=Vt.identifierPrefix;if(Et){var n=Ii,i=Pi;n=(i&~(1<<32-Qn(i)-1)).toString(32)+n,t=":"+t+"R"+n,n=Za++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=n1++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},o1={readContext:Bn,useCallback:Lv,useContext:Bn,useEffect:Sh,useImperativeHandle:Nv,useInsertionEffect:Rv,useLayoutEffect:Pv,useMemo:Dv,useReducer:nc,useRef:Cv,useState:function(){return nc(Qa)},useDebugValue:yh,useDeferredValue:function(e){var t=zn();return Uv(t,Ft.memoizedState,e)},useTransition:function(){var e=nc(Qa)[0],t=zn().memoizedState;return[e,t]},useMutableSource:Mv,useSyncExternalStore:Ev,useId:Fv,unstable_isNewReconciler:!1},l1={readContext:Bn,useCallback:Lv,useContext:Bn,useEffect:Sh,useImperativeHandle:Nv,useInsertionEffect:Rv,useLayoutEffect:Pv,useMemo:Dv,useReducer:ic,useRef:Cv,useState:function(){return ic(Qa)},useDebugValue:yh,useDeferredValue:function(e){var t=zn();return Ft===null?t.memoizedState=e:Uv(t,Ft.memoizedState,e)},useTransition:function(){var e=ic(Qa)[0],t=zn().memoizedState;return[e,t]},useMutableSource:Mv,useSyncExternalStore:Ev,useId:Fv,unstable_isNewReconciler:!1};function Xn(e,t){if(e&&e.defaultProps){t=xt({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function xf(e,t,n,i){t=e.memoizedState,n=n(i,t),n=n==null?t:xt({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Mu={isMounted:function(e){return(e=e._reactInternals)?Jr(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var i=on(),r=gr(e),s=Di(i,r);s.payload=t,n!=null&&(s.callback=n),t=pr(e,s,r),t!==null&&(Jn(t,e,r,i),ml(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var i=on(),r=gr(e),s=Di(i,r);s.tag=1,s.payload=t,n!=null&&(s.callback=n),t=pr(e,s,r),t!==null&&(Jn(t,e,r,i),ml(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=on(),i=gr(e),r=Di(n,i);r.tag=2,t!=null&&(r.callback=t),t=pr(e,r,i),t!==null&&(Jn(t,e,i,n),ml(t,e,i))}};function r0(e,t,n,i,r,s,a){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(i,s,a):t.prototype&&t.prototype.isPureReactComponent?!ja(n,i)||!ja(r,s):!0}function zv(e,t,n){var i=!1,r=Sr,s=t.contextType;return typeof s=="object"&&s!==null?s=Bn(s):(r=gn(t)?jr:rn.current,i=t.contextTypes,s=(i=i!=null)?zs(e,r):Sr),t=new t(n,s),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=Mu,e.stateNode=t,t._reactInternals=e,i&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=r,e.__reactInternalMemoizedMaskedChildContext=s),t}function s0(e,t,n,i){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,i),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,i),t.state!==e&&Mu.enqueueReplaceState(t,t.state,null)}function Af(e,t,n,i){var r=e.stateNode;r.props=n,r.state=e.memoizedState,r.refs={},dh(e);var s=t.contextType;typeof s=="object"&&s!==null?r.context=Bn(s):(s=gn(t)?jr:rn.current,r.context=zs(e,s)),r.state=e.memoizedState,s=t.getDerivedStateFromProps,typeof s=="function"&&(xf(e,t,s,n),r.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(t=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),t!==r.state&&Mu.enqueueReplaceState(r,r.state,null),$l(e,n,r,i),r.state=e.memoizedState),typeof r.componentDidMount=="function"&&(e.flags|=4194308)}function Ws(e,t){try{var n="",i=t;do n+=FS(i),i=i.return;while(i);var r=n}catch(s){r=`
Error generating stack: `+s.message+`
`+s.stack}return{value:e,source:t,stack:r,digest:null}}function rc(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function Cf(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var u1=typeof WeakMap=="function"?WeakMap:Map;function Gv(e,t,n){n=Di(-1,n),n.tag=3,n.payload={element:null};var i=t.value;return n.callback=function(){Ql||(Ql=!0,kf=i),Cf(e,t)},n}function Vv(e,t,n){n=Di(-1,n),n.tag=3;var i=e.type.getDerivedStateFromError;if(typeof i=="function"){var r=t.value;n.payload=function(){return i(r)},n.callback=function(){Cf(e,t)}}var s=e.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){Cf(e,t),typeof i!="function"&&(mr===null?mr=new Set([this]):mr.add(this));var a=t.stack;this.componentDidCatch(t.value,{componentStack:a!==null?a:""})}),n}function a0(e,t,n){var i=e.pingCache;if(i===null){i=e.pingCache=new u1;var r=new Set;i.set(t,r)}else r=i.get(t),r===void 0&&(r=new Set,i.set(t,r));r.has(n)||(r.add(n),e=T1.bind(null,e,t,n),t.then(e,e))}function o0(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function l0(e,t,n,i,r){return e.mode&1?(e.flags|=65536,e.lanes=r,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=Di(-1,1),t.tag=2,pr(n,t,1))),n.lanes|=1),e)}var c1=Hi.ReactCurrentOwner,pn=!1;function an(e,t,n,i){t.child=e===null?vv(t,null,n,i):Vs(t,e.child,n,i)}function u0(e,t,n,i,r){n=n.render;var s=t.ref;return Fs(t,r),i=vh(e,t,n,i,s,r),n=_h(),e!==null&&!pn?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~r,zi(e,t,r)):(Et&&n&&sh(t),t.flags|=1,an(e,t,i,r),t.child)}function c0(e,t,n,i,r){if(e===null){var s=n.type;return typeof s=="function"&&!Ch(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=s,Hv(e,t,s,i,r)):(e=Ml(n.type,null,i,t,t.mode,r),e.ref=t.ref,e.return=t,t.child=e)}if(s=e.child,!(e.lanes&r)){var a=s.memoizedProps;if(n=n.compare,n=n!==null?n:ja,n(a,i)&&e.ref===t.ref)return zi(e,t,r)}return t.flags|=1,e=vr(s,i),e.ref=t.ref,e.return=t,t.child=e}function Hv(e,t,n,i,r){if(e!==null){var s=e.memoizedProps;if(ja(s,i)&&e.ref===t.ref)if(pn=!1,t.pendingProps=i=s,(e.lanes&r)!==0)e.flags&131072&&(pn=!0);else return t.lanes=e.lanes,zi(e,t,r)}return Rf(e,t,n,i,r)}function Wv(e,t,n){var i=t.pendingProps,r=i.children,s=e!==null?e.memoizedState:null;if(i.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},_t(Is,En),En|=n;else{if(!(n&1073741824))return e=s!==null?s.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,_t(Is,En),En|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=s!==null?s.baseLanes:n,_t(Is,En),En|=i}else s!==null?(i=s.baseLanes|n,t.memoizedState=null):i=n,_t(Is,En),En|=i;return an(e,t,r,n),t.child}function jv(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function Rf(e,t,n,i,r){var s=gn(n)?jr:rn.current;return s=zs(t,s),Fs(t,r),n=vh(e,t,n,i,s,r),i=_h(),e!==null&&!pn?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~r,zi(e,t,r)):(Et&&i&&sh(t),t.flags|=1,an(e,t,n,r),t.child)}function f0(e,t,n,i,r){if(gn(n)){var s=!0;Vl(t)}else s=!1;if(Fs(t,r),t.stateNode===null)_l(e,t),zv(t,n,i),Af(t,n,i,r),i=!0;else if(e===null){var a=t.stateNode,o=t.memoizedProps;a.props=o;var l=a.context,u=n.contextType;typeof u=="object"&&u!==null?u=Bn(u):(u=gn(n)?jr:rn.current,u=zs(t,u));var f=n.getDerivedStateFromProps,h=typeof f=="function"||typeof a.getSnapshotBeforeUpdate=="function";h||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o!==i||l!==u)&&s0(t,a,i,u),tr=!1;var c=t.memoizedState;a.state=c,$l(t,i,a,r),l=t.memoizedState,o!==i||c!==l||mn.current||tr?(typeof f=="function"&&(xf(t,n,f,i),l=t.memoizedState),(o=tr||r0(t,n,o,i,c,l,u))?(h||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(t.flags|=4194308)):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=i,t.memoizedState=l),a.props=i,a.state=l,a.context=u,i=o):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),i=!1)}else{a=t.stateNode,Sv(e,t),o=t.memoizedProps,u=t.type===t.elementType?o:Xn(t.type,o),a.props=u,h=t.pendingProps,c=a.context,l=n.contextType,typeof l=="object"&&l!==null?l=Bn(l):(l=gn(n)?jr:rn.current,l=zs(t,l));var p=n.getDerivedStateFromProps;(f=typeof p=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o!==h||c!==l)&&s0(t,a,i,l),tr=!1,c=t.memoizedState,a.state=c,$l(t,i,a,r);var m=t.memoizedState;o!==h||c!==m||mn.current||tr?(typeof p=="function"&&(xf(t,n,p,i),m=t.memoizedState),(u=tr||r0(t,n,u,i,c,m,l)||!1)?(f||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(i,m,l),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(i,m,l)),typeof a.componentDidUpdate=="function"&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof a.componentDidUpdate!="function"||o===e.memoizedProps&&c===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||o===e.memoizedProps&&c===e.memoizedState||(t.flags|=1024),t.memoizedProps=i,t.memoizedState=m),a.props=i,a.state=m,a.context=l,i=u):(typeof a.componentDidUpdate!="function"||o===e.memoizedProps&&c===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||o===e.memoizedProps&&c===e.memoizedState||(t.flags|=1024),i=!1)}return Pf(e,t,n,i,s,r)}function Pf(e,t,n,i,r,s){jv(e,t);var a=(t.flags&128)!==0;if(!i&&!a)return r&&Kp(t,n,!1),zi(e,t,s);i=t.stateNode,c1.current=t;var o=a&&typeof n.getDerivedStateFromError!="function"?null:i.render();return t.flags|=1,e!==null&&a?(t.child=Vs(t,e.child,null,s),t.child=Vs(t,null,o,s)):an(e,t,o,s),t.memoizedState=i.state,r&&Kp(t,n,!0),t.child}function Xv(e){var t=e.stateNode;t.pendingContext?qp(e,t.pendingContext,t.pendingContext!==t.context):t.context&&qp(e,t.context,!1),hh(e,t.containerInfo)}function d0(e,t,n,i,r){return Gs(),oh(r),t.flags|=256,an(e,t,n,i),t.child}var If={dehydrated:null,treeContext:null,retryLane:0};function Nf(e){return{baseLanes:e,cachePool:null,transitions:null}}function $v(e,t,n){var i=t.pendingProps,r=Tt.current,s=!1,a=(t.flags&128)!==0,o;if((o=a)||(o=e!==null&&e.memoizedState===null?!1:(r&2)!==0),o?(s=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(r|=1),_t(Tt,r&1),e===null)return bf(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(a=i.children,e=i.fallback,s?(i=t.mode,s=t.child,a={mode:"hidden",children:a},!(i&1)&&s!==null?(s.childLanes=0,s.pendingProps=a):s=bu(a,i,0,null),e=Hr(e,i,n,null),s.return=t,e.return=t,s.sibling=e,t.child=s,t.child.memoizedState=Nf(n),t.memoizedState=If,e):Mh(t,a));if(r=e.memoizedState,r!==null&&(o=r.dehydrated,o!==null))return f1(e,t,a,i,o,r,n);if(s){s=i.fallback,a=t.mode,r=e.child,o=r.sibling;var l={mode:"hidden",children:i.children};return!(a&1)&&t.child!==r?(i=t.child,i.childLanes=0,i.pendingProps=l,t.deletions=null):(i=vr(r,l),i.subtreeFlags=r.subtreeFlags&14680064),o!==null?s=vr(o,s):(s=Hr(s,a,n,null),s.flags|=2),s.return=t,i.return=t,i.sibling=s,t.child=i,i=s,s=t.child,a=e.child.memoizedState,a=a===null?Nf(n):{baseLanes:a.baseLanes|n,cachePool:null,transitions:a.transitions},s.memoizedState=a,s.childLanes=e.childLanes&~n,t.memoizedState=If,i}return s=e.child,e=s.sibling,i=vr(s,{mode:"visible",children:i.children}),!(t.mode&1)&&(i.lanes=n),i.return=t,i.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=i,t.memoizedState=null,i}function Mh(e,t){return t=bu({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Ro(e,t,n,i){return i!==null&&oh(i),Vs(t,e.child,null,n),e=Mh(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function f1(e,t,n,i,r,s,a){if(n)return t.flags&256?(t.flags&=-257,i=rc(Error(he(422))),Ro(e,t,a,i)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(s=i.fallback,r=t.mode,i=bu({mode:"visible",children:i.children},r,0,null),s=Hr(s,r,a,null),s.flags|=2,i.return=t,s.return=t,i.sibling=s,t.child=i,t.mode&1&&Vs(t,e.child,null,a),t.child.memoizedState=Nf(a),t.memoizedState=If,s);if(!(t.mode&1))return Ro(e,t,a,null);if(r.data==="$!"){if(i=r.nextSibling&&r.nextSibling.dataset,i)var o=i.dgst;return i=o,s=Error(he(419)),i=rc(s,i,void 0),Ro(e,t,a,i)}if(o=(a&e.childLanes)!==0,pn||o){if(i=Vt,i!==null){switch(a&-a){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(i.suspendedLanes|a)?0:r,r!==0&&r!==s.retryLane&&(s.retryLane=r,Bi(e,r),Jn(i,e,r,-1))}return Ah(),i=rc(Error(he(421))),Ro(e,t,a,i)}return r.data==="$?"?(t.flags|=128,t.child=e.child,t=b1.bind(null,e),r._reactRetry=t,null):(e=s.treeContext,wn=hr(r.nextSibling),xn=t,Et=!0,qn=null,e!==null&&(Dn[Un++]=Pi,Dn[Un++]=Ii,Dn[Un++]=Xr,Pi=e.id,Ii=e.overflow,Xr=t),t=Mh(t,i.children),t.flags|=4096,t)}function h0(e,t,n){e.lanes|=t;var i=e.alternate;i!==null&&(i.lanes|=t),wf(e.return,t,n)}function sc(e,t,n,i,r){var s=e.memoizedState;s===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:r}:(s.isBackwards=t,s.rendering=null,s.renderingStartTime=0,s.last=i,s.tail=n,s.tailMode=r)}function Yv(e,t,n){var i=t.pendingProps,r=i.revealOrder,s=i.tail;if(an(e,t,i.children,n),i=Tt.current,i&2)i=i&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&h0(e,n,t);else if(e.tag===19)h0(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}i&=1}if(_t(Tt,i),!(t.mode&1))t.memoizedState=null;else switch(r){case"forwards":for(n=t.child,r=null;n!==null;)e=n.alternate,e!==null&&Yl(e)===null&&(r=n),n=n.sibling;n=r,n===null?(r=t.child,t.child=null):(r=n.sibling,n.sibling=null),sc(t,!1,r,n,s);break;case"backwards":for(n=null,r=t.child,t.child=null;r!==null;){if(e=r.alternate,e!==null&&Yl(e)===null){t.child=r;break}e=r.sibling,r.sibling=n,n=r,r=e}sc(t,!0,n,null,s);break;case"together":sc(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function _l(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function zi(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Yr|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(he(153));if(t.child!==null){for(e=t.child,n=vr(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=vr(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function d1(e,t,n){switch(t.tag){case 3:Xv(t),Gs();break;case 5:yv(t);break;case 1:gn(t.type)&&Vl(t);break;case 4:hh(t,t.stateNode.containerInfo);break;case 10:var i=t.type._context,r=t.memoizedProps.value;_t(jl,i._currentValue),i._currentValue=r;break;case 13:if(i=t.memoizedState,i!==null)return i.dehydrated!==null?(_t(Tt,Tt.current&1),t.flags|=128,null):n&t.child.childLanes?$v(e,t,n):(_t(Tt,Tt.current&1),e=zi(e,t,n),e!==null?e.sibling:null);_t(Tt,Tt.current&1);break;case 19:if(i=(n&t.childLanes)!==0,e.flags&128){if(i)return Yv(e,t,n);t.flags|=128}if(r=t.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),_t(Tt,Tt.current),i)break;return null;case 22:case 23:return t.lanes=0,Wv(e,t,n)}return zi(e,t,n)}var qv,Lf,Kv,Zv;qv=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Lf=function(){};Kv=function(e,t,n,i){var r=e.memoizedProps;if(r!==i){e=t.stateNode,Br(mi.current);var s=null;switch(n){case"input":r=ef(e,r),i=ef(e,i),s=[];break;case"select":r=xt({},r,{value:void 0}),i=xt({},i,{value:void 0}),s=[];break;case"textarea":r=rf(e,r),i=rf(e,i),s=[];break;default:typeof r.onClick!="function"&&typeof i.onClick=="function"&&(e.onclick=zl)}af(n,i);var a;n=null;for(u in r)if(!i.hasOwnProperty(u)&&r.hasOwnProperty(u)&&r[u]!=null)if(u==="style"){var o=r[u];for(a in o)o.hasOwnProperty(a)&&(n||(n={}),n[a]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(ka.hasOwnProperty(u)?s||(s=[]):(s=s||[]).push(u,null));for(u in i){var l=i[u];if(o=r!=null?r[u]:void 0,i.hasOwnProperty(u)&&l!==o&&(l!=null||o!=null))if(u==="style")if(o){for(a in o)!o.hasOwnProperty(a)||l&&l.hasOwnProperty(a)||(n||(n={}),n[a]="");for(a in l)l.hasOwnProperty(a)&&o[a]!==l[a]&&(n||(n={}),n[a]=l[a])}else n||(s||(s=[]),s.push(u,n)),n=l;else u==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,o=o?o.__html:void 0,l!=null&&o!==l&&(s=s||[]).push(u,l)):u==="children"?typeof l!="string"&&typeof l!="number"||(s=s||[]).push(u,""+l):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(ka.hasOwnProperty(u)?(l!=null&&u==="onScroll"&&St("scroll",e),s||o===l||(s=[])):(s=s||[]).push(u,l))}n&&(s=s||[]).push("style",n);var u=s;(t.updateQueue=u)&&(t.flags|=4)}};Zv=function(e,t,n,i){n!==i&&(t.flags|=4)};function oa(e,t){if(!Et)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:i.sibling=null}}function Kt(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,i=0;if(t)for(var r=e.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags&14680064,i|=r.flags&14680064,r.return=e,r=r.sibling;else for(r=e.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=e,r=r.sibling;return e.subtreeFlags|=i,e.childLanes=n,t}function h1(e,t,n){var i=t.pendingProps;switch(ah(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Kt(t),null;case 1:return gn(t.type)&&Gl(),Kt(t),null;case 3:return i=t.stateNode,Hs(),Mt(mn),Mt(rn),mh(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(e===null||e.child===null)&&(Ao(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,qn!==null&&(Gf(qn),qn=null))),Lf(e,t),Kt(t),null;case 5:ph(t);var r=Br(Ka.current);if(n=t.type,e!==null&&t.stateNode!=null)Kv(e,t,n,i,r),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!i){if(t.stateNode===null)throw Error(he(166));return Kt(t),null}if(e=Br(mi.current),Ao(t)){i=t.stateNode,n=t.type;var s=t.memoizedProps;switch(i[ci]=t,i[Ya]=s,e=(t.mode&1)!==0,n){case"dialog":St("cancel",i),St("close",i);break;case"iframe":case"object":case"embed":St("load",i);break;case"video":case"audio":for(r=0;r<Ea.length;r++)St(Ea[r],i);break;case"source":St("error",i);break;case"img":case"image":case"link":St("error",i),St("load",i);break;case"details":St("toggle",i);break;case"input":Ep(i,s),St("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!s.multiple},St("invalid",i);break;case"textarea":bp(i,s),St("invalid",i)}af(n,s),r=null;for(var a in s)if(s.hasOwnProperty(a)){var o=s[a];a==="children"?typeof o=="string"?i.textContent!==o&&(s.suppressHydrationWarning!==!0&&xo(i.textContent,o,e),r=["children",o]):typeof o=="number"&&i.textContent!==""+o&&(s.suppressHydrationWarning!==!0&&xo(i.textContent,o,e),r=["children",""+o]):ka.hasOwnProperty(a)&&o!=null&&a==="onScroll"&&St("scroll",i)}switch(n){case"input":_o(i),Tp(i,s,!0);break;case"textarea":_o(i),wp(i);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(i.onclick=zl)}i=r,t.updateQueue=i,i!==null&&(t.flags|=4)}else{a=r.nodeType===9?r:r.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=wg(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=a.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof i.is=="string"?e=a.createElement(n,{is:i.is}):(e=a.createElement(n),n==="select"&&(a=e,i.multiple?a.multiple=!0:i.size&&(a.size=i.size))):e=a.createElementNS(e,n),e[ci]=t,e[Ya]=i,qv(e,t,!1,!1),t.stateNode=e;e:{switch(a=of(n,i),n){case"dialog":St("cancel",e),St("close",e),r=i;break;case"iframe":case"object":case"embed":St("load",e),r=i;break;case"video":case"audio":for(r=0;r<Ea.length;r++)St(Ea[r],e);r=i;break;case"source":St("error",e),r=i;break;case"img":case"image":case"link":St("error",e),St("load",e),r=i;break;case"details":St("toggle",e),r=i;break;case"input":Ep(e,i),r=ef(e,i),St("invalid",e);break;case"option":r=i;break;case"select":e._wrapperState={wasMultiple:!!i.multiple},r=xt({},i,{value:void 0}),St("invalid",e);break;case"textarea":bp(e,i),r=rf(e,i),St("invalid",e);break;default:r=i}af(n,r),o=r;for(s in o)if(o.hasOwnProperty(s)){var l=o[s];s==="style"?Cg(e,l):s==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&xg(e,l)):s==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&Ba(e,l):typeof l=="number"&&Ba(e,""+l):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(ka.hasOwnProperty(s)?l!=null&&s==="onScroll"&&St("scroll",e):l!=null&&jd(e,s,l,a))}switch(n){case"input":_o(e),Tp(e,i,!1);break;case"textarea":_o(e),wp(e);break;case"option":i.value!=null&&e.setAttribute("value",""+_r(i.value));break;case"select":e.multiple=!!i.multiple,s=i.value,s!=null?Ns(e,!!i.multiple,s,!1):i.defaultValue!=null&&Ns(e,!!i.multiple,i.defaultValue,!0);break;default:typeof r.onClick=="function"&&(e.onclick=zl)}switch(n){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return Kt(t),null;case 6:if(e&&t.stateNode!=null)Zv(e,t,e.memoizedProps,i);else{if(typeof i!="string"&&t.stateNode===null)throw Error(he(166));if(n=Br(Ka.current),Br(mi.current),Ao(t)){if(i=t.stateNode,n=t.memoizedProps,i[ci]=t,(s=i.nodeValue!==n)&&(e=xn,e!==null))switch(e.tag){case 3:xo(i.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&xo(i.nodeValue,n,(e.mode&1)!==0)}s&&(t.flags|=4)}else i=(n.nodeType===9?n:n.ownerDocument).createTextNode(i),i[ci]=t,t.stateNode=i}return Kt(t),null;case 13:if(Mt(Tt),i=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(Et&&wn!==null&&t.mode&1&&!(t.flags&128))mv(),Gs(),t.flags|=98560,s=!1;else if(s=Ao(t),i!==null&&i.dehydrated!==null){if(e===null){if(!s)throw Error(he(318));if(s=t.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(he(317));s[ci]=t}else Gs(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Kt(t),s=!1}else qn!==null&&(Gf(qn),qn=null),s=!0;if(!s)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(i=i!==null,i!==(e!==null&&e.memoizedState!==null)&&i&&(t.child.flags|=8192,t.mode&1&&(e===null||Tt.current&1?Ot===0&&(Ot=3):Ah())),t.updateQueue!==null&&(t.flags|=4),Kt(t),null);case 4:return Hs(),Lf(e,t),e===null&&Xa(t.stateNode.containerInfo),Kt(t),null;case 10:return ch(t.type._context),Kt(t),null;case 17:return gn(t.type)&&Gl(),Kt(t),null;case 19:if(Mt(Tt),s=t.memoizedState,s===null)return Kt(t),null;if(i=(t.flags&128)!==0,a=s.rendering,a===null)if(i)oa(s,!1);else{if(Ot!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(a=Yl(e),a!==null){for(t.flags|=128,oa(s,!1),i=a.updateQueue,i!==null&&(t.updateQueue=i,t.flags|=4),t.subtreeFlags=0,i=n,n=t.child;n!==null;)s=n,e=i,s.flags&=14680066,a=s.alternate,a===null?(s.childLanes=0,s.lanes=e,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=a.childLanes,s.lanes=a.lanes,s.child=a.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=a.memoizedProps,s.memoizedState=a.memoizedState,s.updateQueue=a.updateQueue,s.type=a.type,e=a.dependencies,s.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return _t(Tt,Tt.current&1|2),t.child}e=e.sibling}s.tail!==null&&Lt()>js&&(t.flags|=128,i=!0,oa(s,!1),t.lanes=4194304)}else{if(!i)if(e=Yl(a),e!==null){if(t.flags|=128,i=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),oa(s,!0),s.tail===null&&s.tailMode==="hidden"&&!a.alternate&&!Et)return Kt(t),null}else 2*Lt()-s.renderingStartTime>js&&n!==1073741824&&(t.flags|=128,i=!0,oa(s,!1),t.lanes=4194304);s.isBackwards?(a.sibling=t.child,t.child=a):(n=s.last,n!==null?n.sibling=a:t.child=a,s.last=a)}return s.tail!==null?(t=s.tail,s.rendering=t,s.tail=t.sibling,s.renderingStartTime=Lt(),t.sibling=null,n=Tt.current,_t(Tt,i?n&1|2:n&1),t):(Kt(t),null);case 22:case 23:return xh(),i=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==i&&(t.flags|=8192),i&&t.mode&1?En&1073741824&&(Kt(t),t.subtreeFlags&6&&(t.flags|=8192)):Kt(t),null;case 24:return null;case 25:return null}throw Error(he(156,t.tag))}function p1(e,t){switch(ah(t),t.tag){case 1:return gn(t.type)&&Gl(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Hs(),Mt(mn),Mt(rn),mh(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return ph(t),null;case 13:if(Mt(Tt),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(he(340));Gs()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Mt(Tt),null;case 4:return Hs(),null;case 10:return ch(t.type._context),null;case 22:case 23:return xh(),null;case 24:return null;default:return null}}var Po=!1,Jt=!1,m1=typeof WeakSet=="function"?WeakSet:Set,Re=null;function Ps(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(i){Ct(e,t,i)}else n.current=null}function Df(e,t,n){try{n()}catch(i){Ct(e,t,i)}}var p0=!1;function g1(e,t){if(vf=Ol,e=nv(),rh(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var r=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var a=0,o=-1,l=-1,u=0,f=0,h=e,c=null;t:for(;;){for(var p;h!==n||r!==0&&h.nodeType!==3||(o=a+r),h!==s||i!==0&&h.nodeType!==3||(l=a+i),h.nodeType===3&&(a+=h.nodeValue.length),(p=h.firstChild)!==null;)c=h,h=p;for(;;){if(h===e)break t;if(c===n&&++u===r&&(o=a),c===s&&++f===i&&(l=a),(p=h.nextSibling)!==null)break;h=c,c=h.parentNode}h=p}n=o===-1||l===-1?null:{start:o,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(_f={focusedElem:e,selectionRange:n},Ol=!1,Re=t;Re!==null;)if(t=Re,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,Re=e;else for(;Re!==null;){t=Re;try{var m=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(m!==null){var _=m.memoizedProps,g=m.memoizedState,d=t.stateNode,v=d.getSnapshotBeforeUpdate(t.elementType===t.type?_:Xn(t.type,_),g);d.__reactInternalSnapshotBeforeUpdate=v}break;case 3:var y=t.stateNode.containerInfo;y.nodeType===1?y.textContent="":y.nodeType===9&&y.documentElement&&y.removeChild(y.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(he(163))}}catch(M){Ct(t,t.return,M)}if(e=t.sibling,e!==null){e.return=t.return,Re=e;break}Re=t.return}return m=p0,p0=!1,m}function Da(e,t,n){var i=t.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var r=i=i.next;do{if((r.tag&e)===e){var s=r.destroy;r.destroy=void 0,s!==void 0&&Df(t,n,s)}r=r.next}while(r!==i)}}function Eu(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var i=n.create;n.destroy=i()}n=n.next}while(n!==t)}}function Uf(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function Qv(e){var t=e.alternate;t!==null&&(e.alternate=null,Qv(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[ci],delete t[Ya],delete t[Mf],delete t[Qy],delete t[Jy])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Jv(e){return e.tag===5||e.tag===3||e.tag===4}function m0(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Jv(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Ff(e,t,n){var i=e.tag;if(i===5||i===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=zl));else if(i!==4&&(e=e.child,e!==null))for(Ff(e,t,n),e=e.sibling;e!==null;)Ff(e,t,n),e=e.sibling}function Of(e,t,n){var i=e.tag;if(i===5||i===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(i!==4&&(e=e.child,e!==null))for(Of(e,t,n),e=e.sibling;e!==null;)Of(e,t,n),e=e.sibling}var Wt=null,Yn=!1;function $i(e,t,n){for(n=n.child;n!==null;)e_(e,t,n),n=n.sibling}function e_(e,t,n){if(pi&&typeof pi.onCommitFiberUnmount=="function")try{pi.onCommitFiberUnmount(pu,n)}catch{}switch(n.tag){case 5:Jt||Ps(n,t);case 6:var i=Wt,r=Yn;Wt=null,$i(e,t,n),Wt=i,Yn=r,Wt!==null&&(Yn?(e=Wt,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):Wt.removeChild(n.stateNode));break;case 18:Wt!==null&&(Yn?(e=Wt,n=n.stateNode,e.nodeType===8?Qu(e.parentNode,n):e.nodeType===1&&Qu(e,n),Ha(e)):Qu(Wt,n.stateNode));break;case 4:i=Wt,r=Yn,Wt=n.stateNode.containerInfo,Yn=!0,$i(e,t,n),Wt=i,Yn=r;break;case 0:case 11:case 14:case 15:if(!Jt&&(i=n.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){r=i=i.next;do{var s=r,a=s.destroy;s=s.tag,a!==void 0&&(s&2||s&4)&&Df(n,t,a),r=r.next}while(r!==i)}$i(e,t,n);break;case 1:if(!Jt&&(Ps(n,t),i=n.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=n.memoizedProps,i.state=n.memoizedState,i.componentWillUnmount()}catch(o){Ct(n,t,o)}$i(e,t,n);break;case 21:$i(e,t,n);break;case 22:n.mode&1?(Jt=(i=Jt)||n.memoizedState!==null,$i(e,t,n),Jt=i):$i(e,t,n);break;default:$i(e,t,n)}}function g0(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new m1),t.forEach(function(i){var r=w1.bind(null,e,i);n.has(i)||(n.add(i),i.then(r,r))})}}function Vn(e,t){var n=t.deletions;if(n!==null)for(var i=0;i<n.length;i++){var r=n[i];try{var s=e,a=t,o=a;e:for(;o!==null;){switch(o.tag){case 5:Wt=o.stateNode,Yn=!1;break e;case 3:Wt=o.stateNode.containerInfo,Yn=!0;break e;case 4:Wt=o.stateNode.containerInfo,Yn=!0;break e}o=o.return}if(Wt===null)throw Error(he(160));e_(s,a,r),Wt=null,Yn=!1;var l=r.alternate;l!==null&&(l.return=null),r.return=null}catch(u){Ct(r,t,u)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)t_(t,e),t=t.sibling}function t_(e,t){var n=e.alternate,i=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Vn(t,e),ii(e),i&4){try{Da(3,e,e.return),Eu(3,e)}catch(_){Ct(e,e.return,_)}try{Da(5,e,e.return)}catch(_){Ct(e,e.return,_)}}break;case 1:Vn(t,e),ii(e),i&512&&n!==null&&Ps(n,n.return);break;case 5:if(Vn(t,e),ii(e),i&512&&n!==null&&Ps(n,n.return),e.flags&32){var r=e.stateNode;try{Ba(r,"")}catch(_){Ct(e,e.return,_)}}if(i&4&&(r=e.stateNode,r!=null)){var s=e.memoizedProps,a=n!==null?n.memoizedProps:s,o=e.type,l=e.updateQueue;if(e.updateQueue=null,l!==null)try{o==="input"&&s.type==="radio"&&s.name!=null&&Tg(r,s),of(o,a);var u=of(o,s);for(a=0;a<l.length;a+=2){var f=l[a],h=l[a+1];f==="style"?Cg(r,h):f==="dangerouslySetInnerHTML"?xg(r,h):f==="children"?Ba(r,h):jd(r,f,h,u)}switch(o){case"input":tf(r,s);break;case"textarea":bg(r,s);break;case"select":var c=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!s.multiple;var p=s.value;p!=null?Ns(r,!!s.multiple,p,!1):c!==!!s.multiple&&(s.defaultValue!=null?Ns(r,!!s.multiple,s.defaultValue,!0):Ns(r,!!s.multiple,s.multiple?[]:"",!1))}r[Ya]=s}catch(_){Ct(e,e.return,_)}}break;case 6:if(Vn(t,e),ii(e),i&4){if(e.stateNode===null)throw Error(he(162));r=e.stateNode,s=e.memoizedProps;try{r.nodeValue=s}catch(_){Ct(e,e.return,_)}}break;case 3:if(Vn(t,e),ii(e),i&4&&n!==null&&n.memoizedState.isDehydrated)try{Ha(t.containerInfo)}catch(_){Ct(e,e.return,_)}break;case 4:Vn(t,e),ii(e);break;case 13:Vn(t,e),ii(e),r=e.child,r.flags&8192&&(s=r.memoizedState!==null,r.stateNode.isHidden=s,!s||r.alternate!==null&&r.alternate.memoizedState!==null||(bh=Lt())),i&4&&g0(e);break;case 22:if(f=n!==null&&n.memoizedState!==null,e.mode&1?(Jt=(u=Jt)||f,Vn(t,e),Jt=u):Vn(t,e),ii(e),i&8192){if(u=e.memoizedState!==null,(e.stateNode.isHidden=u)&&!f&&e.mode&1)for(Re=e,f=e.child;f!==null;){for(h=Re=f;Re!==null;){switch(c=Re,p=c.child,c.tag){case 0:case 11:case 14:case 15:Da(4,c,c.return);break;case 1:Ps(c,c.return);var m=c.stateNode;if(typeof m.componentWillUnmount=="function"){i=c,n=c.return;try{t=i,m.props=t.memoizedProps,m.state=t.memoizedState,m.componentWillUnmount()}catch(_){Ct(i,n,_)}}break;case 5:Ps(c,c.return);break;case 22:if(c.memoizedState!==null){_0(h);continue}}p!==null?(p.return=c,Re=p):_0(h)}f=f.sibling}e:for(f=null,h=e;;){if(h.tag===5){if(f===null){f=h;try{r=h.stateNode,u?(s=r.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(o=h.stateNode,l=h.memoizedProps.style,a=l!=null&&l.hasOwnProperty("display")?l.display:null,o.style.display=Ag("display",a))}catch(_){Ct(e,e.return,_)}}}else if(h.tag===6){if(f===null)try{h.stateNode.nodeValue=u?"":h.memoizedProps}catch(_){Ct(e,e.return,_)}}else if((h.tag!==22&&h.tag!==23||h.memoizedState===null||h===e)&&h.child!==null){h.child.return=h,h=h.child;continue}if(h===e)break e;for(;h.sibling===null;){if(h.return===null||h.return===e)break e;f===h&&(f=null),h=h.return}f===h&&(f=null),h.sibling.return=h.return,h=h.sibling}}break;case 19:Vn(t,e),ii(e),i&4&&g0(e);break;case 21:break;default:Vn(t,e),ii(e)}}function ii(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(Jv(n)){var i=n;break e}n=n.return}throw Error(he(160))}switch(i.tag){case 5:var r=i.stateNode;i.flags&32&&(Ba(r,""),i.flags&=-33);var s=m0(e);Of(e,s,r);break;case 3:case 4:var a=i.stateNode.containerInfo,o=m0(e);Ff(e,o,a);break;default:throw Error(he(161))}}catch(l){Ct(e,e.return,l)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function v1(e,t,n){Re=e,n_(e)}function n_(e,t,n){for(var i=(e.mode&1)!==0;Re!==null;){var r=Re,s=r.child;if(r.tag===22&&i){var a=r.memoizedState!==null||Po;if(!a){var o=r.alternate,l=o!==null&&o.memoizedState!==null||Jt;o=Po;var u=Jt;if(Po=a,(Jt=l)&&!u)for(Re=r;Re!==null;)a=Re,l=a.child,a.tag===22&&a.memoizedState!==null?S0(r):l!==null?(l.return=a,Re=l):S0(r);for(;s!==null;)Re=s,n_(s),s=s.sibling;Re=r,Po=o,Jt=u}v0(e)}else r.subtreeFlags&8772&&s!==null?(s.return=r,Re=s):v0(e)}}function v0(e){for(;Re!==null;){var t=Re;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:Jt||Eu(5,t);break;case 1:var i=t.stateNode;if(t.flags&4&&!Jt)if(n===null)i.componentDidMount();else{var r=t.elementType===t.type?n.memoizedProps:Xn(t.type,n.memoizedProps);i.componentDidUpdate(r,n.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var s=t.updateQueue;s!==null&&t0(t,s,i);break;case 3:var a=t.updateQueue;if(a!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}t0(t,a,n)}break;case 5:var o=t.stateNode;if(n===null&&t.flags&4){n=o;var l=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var u=t.alternate;if(u!==null){var f=u.memoizedState;if(f!==null){var h=f.dehydrated;h!==null&&Ha(h)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(he(163))}Jt||t.flags&512&&Uf(t)}catch(c){Ct(t,t.return,c)}}if(t===e){Re=null;break}if(n=t.sibling,n!==null){n.return=t.return,Re=n;break}Re=t.return}}function _0(e){for(;Re!==null;){var t=Re;if(t===e){Re=null;break}var n=t.sibling;if(n!==null){n.return=t.return,Re=n;break}Re=t.return}}function S0(e){for(;Re!==null;){var t=Re;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{Eu(4,t)}catch(l){Ct(t,n,l)}break;case 1:var i=t.stateNode;if(typeof i.componentDidMount=="function"){var r=t.return;try{i.componentDidMount()}catch(l){Ct(t,r,l)}}var s=t.return;try{Uf(t)}catch(l){Ct(t,s,l)}break;case 5:var a=t.return;try{Uf(t)}catch(l){Ct(t,a,l)}}}catch(l){Ct(t,t.return,l)}if(t===e){Re=null;break}var o=t.sibling;if(o!==null){o.return=t.return,Re=o;break}Re=t.return}}var _1=Math.ceil,Zl=Hi.ReactCurrentDispatcher,Eh=Hi.ReactCurrentOwner,On=Hi.ReactCurrentBatchConfig,at=0,Vt=null,Ut=null,Xt=0,En=0,Is=Er(0),Ot=0,eo=null,Yr=0,Tu=0,Th=0,Ua=null,hn=null,bh=0,js=1/0,Ci=null,Ql=!1,kf=null,mr=null,Io=!1,lr=null,Jl=0,Fa=0,Bf=null,Sl=-1,yl=0;function on(){return at&6?Lt():Sl!==-1?Sl:Sl=Lt()}function gr(e){return e.mode&1?at&2&&Xt!==0?Xt&-Xt:t1.transition!==null?(yl===0&&(yl=zg()),yl):(e=dt,e!==0||(e=window.event,e=e===void 0?16:$g(e.type)),e):1}function Jn(e,t,n,i){if(50<Fa)throw Fa=0,Bf=null,Error(he(185));so(e,n,i),(!(at&2)||e!==Vt)&&(e===Vt&&(!(at&2)&&(Tu|=n),Ot===4&&rr(e,Xt)),vn(e,i),n===1&&at===0&&!(t.mode&1)&&(js=Lt()+500,Su&&Tr()))}function vn(e,t){var n=e.callbackNode;ty(e,t);var i=Fl(e,e===Vt?Xt:0);if(i===0)n!==null&&Cp(n),e.callbackNode=null,e.callbackPriority=0;else if(t=i&-i,e.callbackPriority!==t){if(n!=null&&Cp(n),t===1)e.tag===0?e1(y0.bind(null,e)):dv(y0.bind(null,e)),Ky(function(){!(at&6)&&Tr()}),n=null;else{switch(Gg(i)){case 1:n=Kd;break;case 4:n=kg;break;case 16:n=Ul;break;case 536870912:n=Bg;break;default:n=Ul}n=c_(n,i_.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function i_(e,t){if(Sl=-1,yl=0,at&6)throw Error(he(327));var n=e.callbackNode;if(Os()&&e.callbackNode!==n)return null;var i=Fl(e,e===Vt?Xt:0);if(i===0)return null;if(i&30||i&e.expiredLanes||t)t=eu(e,i);else{t=i;var r=at;at|=2;var s=s_();(Vt!==e||Xt!==t)&&(Ci=null,js=Lt()+500,Vr(e,t));do try{M1();break}catch(o){r_(e,o)}while(!0);uh(),Zl.current=s,at=r,Ut!==null?t=0:(Vt=null,Xt=0,t=Ot)}if(t!==0){if(t===2&&(r=df(e),r!==0&&(i=r,t=zf(e,r))),t===1)throw n=eo,Vr(e,0),rr(e,i),vn(e,Lt()),n;if(t===6)rr(e,i);else{if(r=e.current.alternate,!(i&30)&&!S1(r)&&(t=eu(e,i),t===2&&(s=df(e),s!==0&&(i=s,t=zf(e,s))),t===1))throw n=eo,Vr(e,0),rr(e,i),vn(e,Lt()),n;switch(e.finishedWork=r,e.finishedLanes=i,t){case 0:case 1:throw Error(he(345));case 2:Pr(e,hn,Ci);break;case 3:if(rr(e,i),(i&130023424)===i&&(t=bh+500-Lt(),10<t)){if(Fl(e,0)!==0)break;if(r=e.suspendedLanes,(r&i)!==i){on(),e.pingedLanes|=e.suspendedLanes&r;break}e.timeoutHandle=yf(Pr.bind(null,e,hn,Ci),t);break}Pr(e,hn,Ci);break;case 4:if(rr(e,i),(i&4194240)===i)break;for(t=e.eventTimes,r=-1;0<i;){var a=31-Qn(i);s=1<<a,a=t[a],a>r&&(r=a),i&=~s}if(i=r,i=Lt()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*_1(i/1960))-i,10<i){e.timeoutHandle=yf(Pr.bind(null,e,hn,Ci),i);break}Pr(e,hn,Ci);break;case 5:Pr(e,hn,Ci);break;default:throw Error(he(329))}}}return vn(e,Lt()),e.callbackNode===n?i_.bind(null,e):null}function zf(e,t){var n=Ua;return e.current.memoizedState.isDehydrated&&(Vr(e,t).flags|=256),e=eu(e,t),e!==2&&(t=hn,hn=n,t!==null&&Gf(t)),e}function Gf(e){hn===null?hn=e:hn.push.apply(hn,e)}function S1(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var i=0;i<n.length;i++){var r=n[i],s=r.getSnapshot;r=r.value;try{if(!ei(s(),r))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function rr(e,t){for(t&=~Th,t&=~Tu,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Qn(t),i=1<<n;e[n]=-1,t&=~i}}function y0(e){if(at&6)throw Error(he(327));Os();var t=Fl(e,0);if(!(t&1))return vn(e,Lt()),null;var n=eu(e,t);if(e.tag!==0&&n===2){var i=df(e);i!==0&&(t=i,n=zf(e,i))}if(n===1)throw n=eo,Vr(e,0),rr(e,t),vn(e,Lt()),n;if(n===6)throw Error(he(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Pr(e,hn,Ci),vn(e,Lt()),null}function wh(e,t){var n=at;at|=1;try{return e(t)}finally{at=n,at===0&&(js=Lt()+500,Su&&Tr())}}function qr(e){lr!==null&&lr.tag===0&&!(at&6)&&Os();var t=at;at|=1;var n=On.transition,i=dt;try{if(On.transition=null,dt=1,e)return e()}finally{dt=i,On.transition=n,at=t,!(at&6)&&Tr()}}function xh(){En=Is.current,Mt(Is)}function Vr(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,qy(n)),Ut!==null)for(n=Ut.return;n!==null;){var i=n;switch(ah(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&Gl();break;case 3:Hs(),Mt(mn),Mt(rn),mh();break;case 5:ph(i);break;case 4:Hs();break;case 13:Mt(Tt);break;case 19:Mt(Tt);break;case 10:ch(i.type._context);break;case 22:case 23:xh()}n=n.return}if(Vt=e,Ut=e=vr(e.current,null),Xt=En=t,Ot=0,eo=null,Th=Tu=Yr=0,hn=Ua=null,kr!==null){for(t=0;t<kr.length;t++)if(n=kr[t],i=n.interleaved,i!==null){n.interleaved=null;var r=i.next,s=n.pending;if(s!==null){var a=s.next;s.next=r,i.next=a}n.pending=i}kr=null}return e}function r_(e,t){do{var n=Ut;try{if(uh(),gl.current=Kl,ql){for(var i=bt.memoizedState;i!==null;){var r=i.queue;r!==null&&(r.pending=null),i=i.next}ql=!1}if($r=0,Gt=Ft=bt=null,La=!1,Za=0,Eh.current=null,n===null||n.return===null){Ot=1,eo=t,Ut=null;break}e:{var s=e,a=n.return,o=n,l=t;if(t=Xt,o.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var u=l,f=o,h=f.tag;if(!(f.mode&1)&&(h===0||h===11||h===15)){var c=f.alternate;c?(f.updateQueue=c.updateQueue,f.memoizedState=c.memoizedState,f.lanes=c.lanes):(f.updateQueue=null,f.memoizedState=null)}var p=o0(a);if(p!==null){p.flags&=-257,l0(p,a,o,s,t),p.mode&1&&a0(s,u,t),t=p,l=u;var m=t.updateQueue;if(m===null){var _=new Set;_.add(l),t.updateQueue=_}else m.add(l);break e}else{if(!(t&1)){a0(s,u,t),Ah();break e}l=Error(he(426))}}else if(Et&&o.mode&1){var g=o0(a);if(g!==null){!(g.flags&65536)&&(g.flags|=256),l0(g,a,o,s,t),oh(Ws(l,o));break e}}s=l=Ws(l,o),Ot!==4&&(Ot=2),Ua===null?Ua=[s]:Ua.push(s),s=a;do{switch(s.tag){case 3:s.flags|=65536,t&=-t,s.lanes|=t;var d=Gv(s,l,t);e0(s,d);break e;case 1:o=l;var v=s.type,y=s.stateNode;if(!(s.flags&128)&&(typeof v.getDerivedStateFromError=="function"||y!==null&&typeof y.componentDidCatch=="function"&&(mr===null||!mr.has(y)))){s.flags|=65536,t&=-t,s.lanes|=t;var M=Vv(s,o,t);e0(s,M);break e}}s=s.return}while(s!==null)}o_(n)}catch(T){t=T,Ut===n&&n!==null&&(Ut=n=n.return);continue}break}while(!0)}function s_(){var e=Zl.current;return Zl.current=Kl,e===null?Kl:e}function Ah(){(Ot===0||Ot===3||Ot===2)&&(Ot=4),Vt===null||!(Yr&268435455)&&!(Tu&268435455)||rr(Vt,Xt)}function eu(e,t){var n=at;at|=2;var i=s_();(Vt!==e||Xt!==t)&&(Ci=null,Vr(e,t));do try{y1();break}catch(r){r_(e,r)}while(!0);if(uh(),at=n,Zl.current=i,Ut!==null)throw Error(he(261));return Vt=null,Xt=0,Ot}function y1(){for(;Ut!==null;)a_(Ut)}function M1(){for(;Ut!==null&&!XS();)a_(Ut)}function a_(e){var t=u_(e.alternate,e,En);e.memoizedProps=e.pendingProps,t===null?o_(e):Ut=t,Eh.current=null}function o_(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=p1(n,t),n!==null){n.flags&=32767,Ut=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{Ot=6,Ut=null;return}}else if(n=h1(n,t,En),n!==null){Ut=n;return}if(t=t.sibling,t!==null){Ut=t;return}Ut=t=e}while(t!==null);Ot===0&&(Ot=5)}function Pr(e,t,n){var i=dt,r=On.transition;try{On.transition=null,dt=1,E1(e,t,n,i)}finally{On.transition=r,dt=i}return null}function E1(e,t,n,i){do Os();while(lr!==null);if(at&6)throw Error(he(327));n=e.finishedWork;var r=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(he(177));e.callbackNode=null,e.callbackPriority=0;var s=n.lanes|n.childLanes;if(ny(e,s),e===Vt&&(Ut=Vt=null,Xt=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Io||(Io=!0,c_(Ul,function(){return Os(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=On.transition,On.transition=null;var a=dt;dt=1;var o=at;at|=4,Eh.current=null,g1(e,n),t_(n,e),Vy(_f),Ol=!!vf,_f=vf=null,e.current=n,v1(n),$S(),at=o,dt=a,On.transition=s}else e.current=n;if(Io&&(Io=!1,lr=e,Jl=r),s=e.pendingLanes,s===0&&(mr=null),KS(n.stateNode),vn(e,Lt()),t!==null)for(i=e.onRecoverableError,n=0;n<t.length;n++)r=t[n],i(r.value,{componentStack:r.stack,digest:r.digest});if(Ql)throw Ql=!1,e=kf,kf=null,e;return Jl&1&&e.tag!==0&&Os(),s=e.pendingLanes,s&1?e===Bf?Fa++:(Fa=0,Bf=e):Fa=0,Tr(),null}function Os(){if(lr!==null){var e=Gg(Jl),t=On.transition,n=dt;try{if(On.transition=null,dt=16>e?16:e,lr===null)var i=!1;else{if(e=lr,lr=null,Jl=0,at&6)throw Error(he(331));var r=at;for(at|=4,Re=e.current;Re!==null;){var s=Re,a=s.child;if(Re.flags&16){var o=s.deletions;if(o!==null){for(var l=0;l<o.length;l++){var u=o[l];for(Re=u;Re!==null;){var f=Re;switch(f.tag){case 0:case 11:case 15:Da(8,f,s)}var h=f.child;if(h!==null)h.return=f,Re=h;else for(;Re!==null;){f=Re;var c=f.sibling,p=f.return;if(Qv(f),f===u){Re=null;break}if(c!==null){c.return=p,Re=c;break}Re=p}}}var m=s.alternate;if(m!==null){var _=m.child;if(_!==null){m.child=null;do{var g=_.sibling;_.sibling=null,_=g}while(_!==null)}}Re=s}}if(s.subtreeFlags&2064&&a!==null)a.return=s,Re=a;else e:for(;Re!==null;){if(s=Re,s.flags&2048)switch(s.tag){case 0:case 11:case 15:Da(9,s,s.return)}var d=s.sibling;if(d!==null){d.return=s.return,Re=d;break e}Re=s.return}}var v=e.current;for(Re=v;Re!==null;){a=Re;var y=a.child;if(a.subtreeFlags&2064&&y!==null)y.return=a,Re=y;else e:for(a=v;Re!==null;){if(o=Re,o.flags&2048)try{switch(o.tag){case 0:case 11:case 15:Eu(9,o)}}catch(T){Ct(o,o.return,T)}if(o===a){Re=null;break e}var M=o.sibling;if(M!==null){M.return=o.return,Re=M;break e}Re=o.return}}if(at=r,Tr(),pi&&typeof pi.onPostCommitFiberRoot=="function")try{pi.onPostCommitFiberRoot(pu,e)}catch{}i=!0}return i}finally{dt=n,On.transition=t}}return!1}function M0(e,t,n){t=Ws(n,t),t=Gv(e,t,1),e=pr(e,t,1),t=on(),e!==null&&(so(e,1,t),vn(e,t))}function Ct(e,t,n){if(e.tag===3)M0(e,e,n);else for(;t!==null;){if(t.tag===3){M0(t,e,n);break}else if(t.tag===1){var i=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(mr===null||!mr.has(i))){e=Ws(n,e),e=Vv(t,e,1),t=pr(t,e,1),e=on(),t!==null&&(so(t,1,e),vn(t,e));break}}t=t.return}}function T1(e,t,n){var i=e.pingCache;i!==null&&i.delete(t),t=on(),e.pingedLanes|=e.suspendedLanes&n,Vt===e&&(Xt&n)===n&&(Ot===4||Ot===3&&(Xt&130023424)===Xt&&500>Lt()-bh?Vr(e,0):Th|=n),vn(e,t)}function l_(e,t){t===0&&(e.mode&1?(t=Mo,Mo<<=1,!(Mo&130023424)&&(Mo=4194304)):t=1);var n=on();e=Bi(e,t),e!==null&&(so(e,t,n),vn(e,n))}function b1(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),l_(e,n)}function w1(e,t){var n=0;switch(e.tag){case 13:var i=e.stateNode,r=e.memoizedState;r!==null&&(n=r.retryLane);break;case 19:i=e.stateNode;break;default:throw Error(he(314))}i!==null&&i.delete(t),l_(e,n)}var u_;u_=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||mn.current)pn=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return pn=!1,d1(e,t,n);pn=!!(e.flags&131072)}else pn=!1,Et&&t.flags&1048576&&hv(t,Wl,t.index);switch(t.lanes=0,t.tag){case 2:var i=t.type;_l(e,t),e=t.pendingProps;var r=zs(t,rn.current);Fs(t,n),r=vh(null,t,i,e,r,n);var s=_h();return t.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,gn(i)?(s=!0,Vl(t)):s=!1,t.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,dh(t),r.updater=Mu,t.stateNode=r,r._reactInternals=t,Af(t,i,e,n),t=Pf(null,t,i,!0,s,n)):(t.tag=0,Et&&s&&sh(t),an(null,t,r,n),t=t.child),t;case 16:i=t.elementType;e:{switch(_l(e,t),e=t.pendingProps,r=i._init,i=r(i._payload),t.type=i,r=t.tag=A1(i),e=Xn(i,e),r){case 0:t=Rf(null,t,i,e,n);break e;case 1:t=f0(null,t,i,e,n);break e;case 11:t=u0(null,t,i,e,n);break e;case 14:t=c0(null,t,i,Xn(i.type,e),n);break e}throw Error(he(306,i,""))}return t;case 0:return i=t.type,r=t.pendingProps,r=t.elementType===i?r:Xn(i,r),Rf(e,t,i,r,n);case 1:return i=t.type,r=t.pendingProps,r=t.elementType===i?r:Xn(i,r),f0(e,t,i,r,n);case 3:e:{if(Xv(t),e===null)throw Error(he(387));i=t.pendingProps,s=t.memoizedState,r=s.element,Sv(e,t),$l(t,i,null,n);var a=t.memoizedState;if(i=a.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:a.cache,pendingSuspenseBoundaries:a.pendingSuspenseBoundaries,transitions:a.transitions},t.updateQueue.baseState=s,t.memoizedState=s,t.flags&256){r=Ws(Error(he(423)),t),t=d0(e,t,i,n,r);break e}else if(i!==r){r=Ws(Error(he(424)),t),t=d0(e,t,i,n,r);break e}else for(wn=hr(t.stateNode.containerInfo.firstChild),xn=t,Et=!0,qn=null,n=vv(t,null,i,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Gs(),i===r){t=zi(e,t,n);break e}an(e,t,i,n)}t=t.child}return t;case 5:return yv(t),e===null&&bf(t),i=t.type,r=t.pendingProps,s=e!==null?e.memoizedProps:null,a=r.children,Sf(i,r)?a=null:s!==null&&Sf(i,s)&&(t.flags|=32),jv(e,t),an(e,t,a,n),t.child;case 6:return e===null&&bf(t),null;case 13:return $v(e,t,n);case 4:return hh(t,t.stateNode.containerInfo),i=t.pendingProps,e===null?t.child=Vs(t,null,i,n):an(e,t,i,n),t.child;case 11:return i=t.type,r=t.pendingProps,r=t.elementType===i?r:Xn(i,r),u0(e,t,i,r,n);case 7:return an(e,t,t.pendingProps,n),t.child;case 8:return an(e,t,t.pendingProps.children,n),t.child;case 12:return an(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(i=t.type._context,r=t.pendingProps,s=t.memoizedProps,a=r.value,_t(jl,i._currentValue),i._currentValue=a,s!==null)if(ei(s.value,a)){if(s.children===r.children&&!mn.current){t=zi(e,t,n);break e}}else for(s=t.child,s!==null&&(s.return=t);s!==null;){var o=s.dependencies;if(o!==null){a=s.child;for(var l=o.firstContext;l!==null;){if(l.context===i){if(s.tag===1){l=Di(-1,n&-n),l.tag=2;var u=s.updateQueue;if(u!==null){u=u.shared;var f=u.pending;f===null?l.next=l:(l.next=f.next,f.next=l),u.pending=l}}s.lanes|=n,l=s.alternate,l!==null&&(l.lanes|=n),wf(s.return,n,t),o.lanes|=n;break}l=l.next}}else if(s.tag===10)a=s.type===t.type?null:s.child;else if(s.tag===18){if(a=s.return,a===null)throw Error(he(341));a.lanes|=n,o=a.alternate,o!==null&&(o.lanes|=n),wf(a,n,t),a=s.sibling}else a=s.child;if(a!==null)a.return=s;else for(a=s;a!==null;){if(a===t){a=null;break}if(s=a.sibling,s!==null){s.return=a.return,a=s;break}a=a.return}s=a}an(e,t,r.children,n),t=t.child}return t;case 9:return r=t.type,i=t.pendingProps.children,Fs(t,n),r=Bn(r),i=i(r),t.flags|=1,an(e,t,i,n),t.child;case 14:return i=t.type,r=Xn(i,t.pendingProps),r=Xn(i.type,r),c0(e,t,i,r,n);case 15:return Hv(e,t,t.type,t.pendingProps,n);case 17:return i=t.type,r=t.pendingProps,r=t.elementType===i?r:Xn(i,r),_l(e,t),t.tag=1,gn(i)?(e=!0,Vl(t)):e=!1,Fs(t,n),zv(t,i,r),Af(t,i,r,n),Pf(null,t,i,!0,e,n);case 19:return Yv(e,t,n);case 22:return Wv(e,t,n)}throw Error(he(156,t.tag))};function c_(e,t){return Og(e,t)}function x1(e,t,n,i){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Fn(e,t,n,i){return new x1(e,t,n,i)}function Ch(e){return e=e.prototype,!(!e||!e.isReactComponent)}function A1(e){if(typeof e=="function")return Ch(e)?1:0;if(e!=null){if(e=e.$$typeof,e===$d)return 11;if(e===Yd)return 14}return 2}function vr(e,t){var n=e.alternate;return n===null?(n=Fn(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Ml(e,t,n,i,r,s){var a=2;if(i=e,typeof e=="function")Ch(e)&&(a=1);else if(typeof e=="string")a=5;else e:switch(e){case Ms:return Hr(n.children,r,s,t);case Xd:a=8,r|=8;break;case Kc:return e=Fn(12,n,t,r|2),e.elementType=Kc,e.lanes=s,e;case Zc:return e=Fn(13,n,t,r),e.elementType=Zc,e.lanes=s,e;case Qc:return e=Fn(19,n,t,r),e.elementType=Qc,e.lanes=s,e;case yg:return bu(n,r,s,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case _g:a=10;break e;case Sg:a=9;break e;case $d:a=11;break e;case Yd:a=14;break e;case er:a=16,i=null;break e}throw Error(he(130,e==null?e:typeof e,""))}return t=Fn(a,n,t,r),t.elementType=e,t.type=i,t.lanes=s,t}function Hr(e,t,n,i){return e=Fn(7,e,i,t),e.lanes=n,e}function bu(e,t,n,i){return e=Fn(22,e,i,t),e.elementType=yg,e.lanes=n,e.stateNode={isHidden:!1},e}function ac(e,t,n){return e=Fn(6,e,null,t),e.lanes=n,e}function oc(e,t,n){return t=Fn(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function C1(e,t,n,i,r){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Gu(0),this.expirationTimes=Gu(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Gu(0),this.identifierPrefix=i,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function Rh(e,t,n,i,r,s,a,o,l){return e=new C1(e,t,n,o,l),t===1?(t=1,s===!0&&(t|=8)):t=0,s=Fn(3,null,null,t),e.current=s,s.stateNode=e,s.memoizedState={element:i,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},dh(s),e}function R1(e,t,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:ys,key:i==null?null:""+i,children:e,containerInfo:t,implementation:n}}function f_(e){if(!e)return Sr;e=e._reactInternals;e:{if(Jr(e)!==e||e.tag!==1)throw Error(he(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(gn(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(he(171))}if(e.tag===1){var n=e.type;if(gn(n))return fv(e,n,t)}return t}function d_(e,t,n,i,r,s,a,o,l){return e=Rh(n,i,!0,e,r,s,a,o,l),e.context=f_(null),n=e.current,i=on(),r=gr(n),s=Di(i,r),s.callback=t??null,pr(n,s,r),e.current.lanes=r,so(e,r,i),vn(e,i),e}function wu(e,t,n,i){var r=t.current,s=on(),a=gr(r);return n=f_(n),t.context===null?t.context=n:t.pendingContext=n,t=Di(s,a),t.payload={element:e},i=i===void 0?null:i,i!==null&&(t.callback=i),e=pr(r,t,a),e!==null&&(Jn(e,r,a,s),ml(e,r,a)),a}function tu(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function E0(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Ph(e,t){E0(e,t),(e=e.alternate)&&E0(e,t)}function P1(){return null}var h_=typeof reportError=="function"?reportError:function(e){console.error(e)};function Ih(e){this._internalRoot=e}xu.prototype.render=Ih.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(he(409));wu(e,t,null,null)};xu.prototype.unmount=Ih.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;qr(function(){wu(null,e,null,null)}),t[ki]=null}};function xu(e){this._internalRoot=e}xu.prototype.unstable_scheduleHydration=function(e){if(e){var t=Wg();e={blockedOn:null,target:e,priority:t};for(var n=0;n<ir.length&&t!==0&&t<ir[n].priority;n++);ir.splice(n,0,e),n===0&&Xg(e)}};function Nh(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Au(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function T0(){}function I1(e,t,n,i,r){if(r){if(typeof i=="function"){var s=i;i=function(){var u=tu(a);s.call(u)}}var a=d_(t,i,e,0,null,!1,!1,"",T0);return e._reactRootContainer=a,e[ki]=a.current,Xa(e.nodeType===8?e.parentNode:e),qr(),a}for(;r=e.lastChild;)e.removeChild(r);if(typeof i=="function"){var o=i;i=function(){var u=tu(l);o.call(u)}}var l=Rh(e,0,!1,null,null,!1,!1,"",T0);return e._reactRootContainer=l,e[ki]=l.current,Xa(e.nodeType===8?e.parentNode:e),qr(function(){wu(t,l,n,i)}),l}function Cu(e,t,n,i,r){var s=n._reactRootContainer;if(s){var a=s;if(typeof r=="function"){var o=r;r=function(){var l=tu(a);o.call(l)}}wu(t,a,e,r)}else a=I1(n,t,e,r,i);return tu(a)}Vg=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Ma(t.pendingLanes);n!==0&&(Zd(t,n|1),vn(t,Lt()),!(at&6)&&(js=Lt()+500,Tr()))}break;case 13:qr(function(){var i=Bi(e,1);if(i!==null){var r=on();Jn(i,e,1,r)}}),Ph(e,1)}};Qd=function(e){if(e.tag===13){var t=Bi(e,134217728);if(t!==null){var n=on();Jn(t,e,134217728,n)}Ph(e,134217728)}};Hg=function(e){if(e.tag===13){var t=gr(e),n=Bi(e,t);if(n!==null){var i=on();Jn(n,e,t,i)}Ph(e,t)}};Wg=function(){return dt};jg=function(e,t){var n=dt;try{return dt=e,t()}finally{dt=n}};uf=function(e,t,n){switch(t){case"input":if(tf(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var i=n[t];if(i!==e&&i.form===e.form){var r=_u(i);if(!r)throw Error(he(90));Eg(i),tf(i,r)}}}break;case"textarea":bg(e,n);break;case"select":t=n.value,t!=null&&Ns(e,!!n.multiple,t,!1)}};Ig=wh;Ng=qr;var N1={usingClientEntryPoint:!1,Events:[oo,ws,_u,Rg,Pg,wh]},la={findFiberByHostInstance:Or,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},L1={bundleType:la.bundleType,version:la.version,rendererPackageName:la.rendererPackageName,rendererConfig:la.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Hi.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Ug(e),e===null?null:e.stateNode},findFiberByHostInstance:la.findFiberByHostInstance||P1,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var No=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!No.isDisabled&&No.supportsFiber)try{pu=No.inject(L1),pi=No}catch{}}Rn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=N1;Rn.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Nh(t))throw Error(he(200));return R1(e,t,null,n)};Rn.createRoot=function(e,t){if(!Nh(e))throw Error(he(299));var n=!1,i="",r=h_;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(i=t.identifierPrefix),t.onRecoverableError!==void 0&&(r=t.onRecoverableError)),t=Rh(e,1,!1,null,null,n,!1,i,r),e[ki]=t.current,Xa(e.nodeType===8?e.parentNode:e),new Ih(t)};Rn.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(he(188)):(e=Object.keys(e).join(","),Error(he(268,e)));return e=Ug(t),e=e===null?null:e.stateNode,e};Rn.flushSync=function(e){return qr(e)};Rn.hydrate=function(e,t,n){if(!Au(t))throw Error(he(200));return Cu(null,e,t,!0,n)};Rn.hydrateRoot=function(e,t,n){if(!Nh(e))throw Error(he(405));var i=n!=null&&n.hydratedSources||null,r=!1,s="",a=h_;if(n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(a=n.onRecoverableError)),t=d_(t,null,e,1,n??null,r,!1,s,a),e[ki]=t.current,Xa(e),i)for(e=0;e<i.length;e++)n=i[e],r=n._getVersion,r=r(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,r]:t.mutableSourceEagerHydrationData.push(n,r);return new xu(t)};Rn.render=function(e,t,n){if(!Au(t))throw Error(he(200));return Cu(null,e,t,!1,n)};Rn.unmountComponentAtNode=function(e){if(!Au(e))throw Error(he(40));return e._reactRootContainer?(qr(function(){Cu(null,null,e,!1,function(){e._reactRootContainer=null,e[ki]=null})}),!0):!1};Rn.unstable_batchedUpdates=wh;Rn.unstable_renderSubtreeIntoContainer=function(e,t,n,i){if(!Au(n))throw Error(he(200));if(e==null||e._reactInternals===void 0)throw Error(he(38));return Cu(e,t,n,!1,i)};Rn.version="18.3.1-next-f1338f8080-20240426";function p_(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(p_)}catch(e){console.error(e)}}p_(),pg.exports=Rn;var D1=pg.exports,b0=D1;Yc.createRoot=b0.createRoot,Yc.hydrateRoot=b0.hydrateRoot;function U1({onStart:e}){return I.jsxs("div",{className:"scene-center",children:[I.jsx("h1",{className:"scene-title",children:"LAUNCH SEQUENCE"}),I.jsx("p",{className:"scene-sub",children:"Educational Sci-Fi Mission"}),I.jsx("button",{className:"scene-btn",onClick:e,children:"Begin Mission"})]})}function F1({onContinue:e}){return I.jsxs("div",{className:"scene-center",children:[I.jsx("h1",{className:"scene-title briefing-title",children:"Mission Briefing"}),I.jsx("p",{className:"scene-sub briefing-body",children:"Commander, you have been selected to lead Launch Sequence — a mission to unlock the knowledge buried in each sector of the station. Study the terminals, pass the checks, and earn your launch clearance."}),I.jsx("button",{className:"scene-btn",onClick:e,children:"Enter Hangar"})]})}function Lh(e){const t=W.useRef(null),n=W.useRef(null),i=W.useRef(e);W.useEffect(()=>{i.current=e},[e]),W.useEffect(()=>{function r(s){const a=n.current??s,o=Math.min((s-a)/1e3,.05);n.current=s,i.current(o),t.current=requestAnimationFrame(r)}return t.current=requestAnimationFrame(r),()=>cancelAnimationFrame(t.current)},[])}function O1(){const e=W.useRef({});return W.useEffect(()=>{const t=i=>{e.current[i.code]=!0},n=i=>{e.current[i.code]=!1};return window.addEventListener("keydown",t),window.addEventListener("keyup",n),()=>{window.removeEventListener("keydown",t),window.removeEventListener("keyup",n)}},[]),e}function yt(e,t,n,i,r,s){s=Math.min(s,i/2,r/2),e.beginPath(),e.moveTo(t+s,n),e.lineTo(t+i-s,n),e.arcTo(t+i,n,t+i,n+s,s),e.lineTo(t+i,n+r-s),e.arcTo(t+i,n+r,t+i-s,n+r,s),e.lineTo(t+s,n+r),e.arcTo(t,n+r,t,n+r-s,s),e.lineTo(t,n+s),e.arcTo(t,n,t+s,n,s),e.closePath()}function k1(e,t,n){const i=n*.55;return Array.from({length:e},()=>({x:Math.random()*t,y:Math.random()*i,r:Math.random()*.75+.2,vy:-(Math.random()*7+2),vx:(Math.random()-.5)*3.5,alpha:Math.random()*.32+.06,phase:Math.random()*Math.PI*2,speed:Math.random()*.7+.25}))}function B1(e,t,n,i){const r=i*.55;e.forEach(s=>{s.y+=s.vy*t,s.x+=s.vx*t,(s.y<0||s.x<-10||s.x>n+10)&&(s.x=Math.random()*n,s.y=r*.98)})}function z1(e,t,n){t.forEach(i=>{const r=.5+.5*Math.sin(i.phase+n*i.speed),s=i.alpha*r;e.beginPath(),e.arc(i.x,i.y,i.r,0,Math.PI*2),e.fillStyle=`rgba(130, 185, 255, ${s.toFixed(3)})`,e.fill()})}function G1(e,t,n){const i=Array.from({length:e},()=>({x:Math.random()*t,y:Math.random()*n*.55,r:Math.random()*1.4+.3,base:Math.random(),phase:Math.random()*Math.PI*2,speed:Math.random()*1.5+.5,bright:!1,colorTint:null})),r=Array.from({length:20},()=>{const s=[null,null,null,"warm","cool"];return{x:Math.random()*t,y:Math.random()*n*.55,r:Math.random()*1+1.5,base:Math.random()*.4+.6,phase:Math.random()*Math.PI*2,speed:Math.random()*3+1.5,bright:!0,colorTint:s[Math.floor(Math.random()*s.length)]}});return[...i,...r]}function V1(e,t,n){t.forEach(i=>{const s=.3+.7*(.5+.5*Math.sin(i.phase+n*i.speed))*i.base;if(i.bright){let a=200,o=230,l=255;i.colorTint==="warm"?(a=255,o=210,l=160):i.colorTint==="cool"&&(a=160,o=200,l=255),e.beginPath(),e.arc(i.x,i.y,i.r,0,Math.PI*2),e.fillStyle=`rgba(${a}, ${o}, ${l}, ${s.toFixed(2)})`,e.fill();const u=4+i.r*1.5,f=(s*.4).toFixed(3);e.strokeStyle=`rgba(${a}, ${o}, ${l}, ${f})`,e.lineWidth=.8;for(let h=0;h<4;h++){const c=h*Math.PI/2;e.beginPath(),e.moveTo(i.x+Math.cos(c)*i.r,i.y+Math.sin(c)*i.r),e.lineTo(i.x+Math.cos(c)*(i.r+u),i.y+Math.sin(c)*(i.r+u)),e.stroke()}}else e.beginPath(),e.arc(i.x,i.y,i.r,0,Math.PI*2),e.fillStyle=`rgba(200, 230, 255, ${s.toFixed(2)})`,e.fill()})}let ua=null;function H1(e,t){if(ua&&ua.W===e&&ua.H===t)return ua.dots;const n=t*.55,i=[];for(let r=0;r<200;r++){const s=Math.abs(Math.sin(r*127.1+311.7))*e,a=n+Math.abs(Math.sin(r*311.7+127.1))*(t-n);i.push({x:s,y:a})}return ua={W:e,H:t,dots:i},i}function W1(e,t,n,i,r){const s=i!==void 0?i:t/2,a=n*.55,o=14,l=20,u={x:t/2};for(let M=0;M<=o;M++){const T=M/o,b=a+(n-a)*Math.pow(T,1.8),w=.12+.38*Math.pow(T,.6);e.strokeStyle=`rgba(40,140,255,${w.toFixed(2)})`,e.lineWidth=.8+T*.6,e.beginPath(),e.moveTo(0,b),e.lineTo(t,b),e.stroke()}for(let M=0;M<=l;M++){const T=M/l*t,w=.3-Math.abs(M/l-.5)*2*.14;e.strokeStyle=`rgba(40,140,255,${Math.max(.06,w).toFixed(2)})`,e.lineWidth=.75,e.beginPath(),e.moveTo(u.x+(T-u.x)*.01,a),e.lineTo(T,n),e.stroke()}const f=e.createLinearGradient(0,a,0,n);f.addColorStop(0,"rgba(5, 15, 35, 0.0)"),f.addColorStop(1,"rgba(5, 15, 40, 0.75)"),e.fillStyle=f,e.fillRect(0,a,t,n-a);const h=e.createLinearGradient(0,a,0,a+(n-a)*.28);h.addColorStop(0,"rgba(2, 5, 18, 0.52)"),h.addColorStop(1,"rgba(0, 0, 0, 0.00)"),e.fillStyle=h,e.fillRect(0,a,t,(n-a)*.28);const c=e.createRadialGradient(t/2,a+(n-a)*.5,(n-a)*.1,t/2,a+(n-a)*.5,Math.max(t/2,n-a)*1.05);c.addColorStop(0,"rgba(0, 0, 0, 0.00)"),c.addColorStop(.55,"rgba(0, 0, 0, 0.00)"),c.addColorStop(1,"rgba(2, 5, 20, 0.58)"),e.fillStyle=c,e.fillRect(0,a,t,n-a),H1(t,n).forEach(({x:M,y:T})=>{e.beginPath(),e.arc(M,T,1,0,Math.PI*2),e.fillStyle="rgba(80, 100, 140, 0.08)",e.fill()});const m=n*.55,_=60,g=12;for(let M=0;M<g;M++){const T=M/g*Math.PI*2,b=(M+.5)/g*Math.PI*2;e.beginPath(),e.arc(s,m,_,T,b),e.arc(s,m,_-8,b,T,!0),e.closePath(),e.fillStyle=M%2===0?"rgba(255, 200, 0, 0.18)":"rgba(0, 0, 0, 0.18)",e.fill()}e.save(),e.setLineDash([8,6]),e.strokeStyle="rgba(255, 255, 255, 0.08)",e.lineWidth=1,[-.9,-.45,0,.45,.9].forEach(M=>{e.beginPath(),e.moveTo(s,m),e.lineTo(s+Math.cos(M+Math.PI/2)*220,m+Math.sin(M+Math.PI/2)*80),e.stroke()}),e.setLineDash([]),e.restore(),e.save(),e.font="bold 32px Courier New, monospace",e.textAlign="center",e.fillStyle="rgba(255, 255, 255, 0.06)",e.translate(s,n*.72),e.scale(1,.3),e.fillText("LAUNCH PAD",0,0),e.restore();const v=s-20,y=n*.55-2;e.strokeStyle="rgba(60, 80, 120, 0.25)",e.lineWidth=.8;for(let M=v;M<=v+40;M+=4)e.beginPath(),e.moveTo(M,y),e.lineTo(M,y+10),e.stroke();for(let M=y;M<=y+10;M+=4)e.beginPath(),e.moveTo(v,M),e.lineTo(v+40,M),e.stroke()}function j1(e,t,n=!1){[.14,.36,.64,.86].forEach(a=>{const o=t*a,l=e.createRadialGradient(o,0,0,o,0,100);l.addColorStop(0,"rgba(255,158,38,0.20)"),l.addColorStop(1,"rgba(255,140,0,0.00)"),e.fillStyle=l,e.fillRect(o-100,0,200,100),e.fillStyle="rgba(36,40,50,0.92)",e.fillRect(o-14,0,28,7),e.fillStyle="rgba(255,178,58,0.88)",e.fillRect(o-10,5,20,4)});const i=n?[.1,.25,.5,.75,.9]:[.2,.5,.8],r=n?.28:.18,s=n?150:120;i.forEach(a=>{const o=t*a,l=e.createRadialGradient(o,0,0,o,0,s);l.addColorStop(0,`rgba(80, 160, 255, ${r})`),l.addColorStop(1,"rgba(80, 160, 255, 0.00)"),e.fillStyle=l,e.fillRect(o-s,0,s*2,s),e.fillStyle=n?"rgba(200, 235, 255, 0.90)":"rgba(160, 210, 255, 0.65)",e.fillRect(o-30,0,60,3)})}function X1(e,t,n,i){if(i<=.005)return;const r=e.createLinearGradient(0,0,0,180);r.addColorStop(0,`rgba(255, 15, 0, ${i})`),r.addColorStop(1,"rgba(255, 15, 0, 0)"),e.fillStyle=r,e.fillRect(0,0,t,180);const s=e.createLinearGradient(0,0,110,0);s.addColorStop(0,`rgba(220, 0, 0, ${i*.45})`),s.addColorStop(1,"rgba(220, 0, 0, 0)"),e.fillStyle=s,e.fillRect(0,0,110,n);const a=e.createLinearGradient(t-110,0,t,0);a.addColorStop(0,"rgba(220, 0, 0, 0)"),a.addColorStop(1,`rgba(220, 0, 0, ${i*.45})`),e.fillStyle=a,e.fillRect(t-110,0,110,n)}function $1(e,t,n,i,r,s,a){const o=s*.55,l=i-40,u=t-80,f=t+80,h=12,c=e.createLinearGradient(u-h/2,0,u+h/2,0);c.addColorStop(0,"#1a1f2e"),c.addColorStop(.5,"#2a3040"),c.addColorStop(1,"#1a1f2e"),e.fillStyle=c,e.fillRect(u-h/2,l,h,o-l);const p=e.createLinearGradient(f-h/2,0,f+h/2,0);p.addColorStop(0,"#1a1f2e"),p.addColorStop(.5,"#2a3040"),p.addColorStop(1,"#1a1f2e"),e.fillStyle=p,e.fillRect(f-h/2,l,h,o-l),e.strokeStyle="rgba(80, 100, 140, 0.7)",e.lineWidth=2;const m=o-l;for(let T=0;T<4;T++){const b=l+T/4*m,w=l+(T+1)/4*m;e.beginPath(),e.moveTo(u+h/2,b),e.lineTo(f-h/2,w),e.stroke(),e.beginPath(),e.moveTo(f-h/2,b),e.lineTo(u+h/2,w),e.stroke()}[.25,.55,.78].map(T=>l+T*m).forEach(T=>{e.fillStyle="#2a3040",e.fillRect(u+h/2,T-3,30,6),e.fillStyle="#3a4555",e.fillRect(u+h/2+28,T-4,4,8),e.fillStyle="#2a3040",e.fillRect(f-h/2-30,T-3,30,6),e.fillStyle="#3a4555",e.fillRect(f-h/2-32,T-4,4,8)});const g=l+m*.35,d=l+m*.65;e.strokeStyle="rgba(60, 80, 130, 0.85)",e.lineWidth=3,e.beginPath(),e.moveTo(u+h/2,g),e.lineTo(t-22,g),e.stroke(),e.beginPath(),e.moveTo(f-h/2,d),e.lineTo(t+22,d),e.stroke(),e.fillStyle="rgba(80, 110, 170, 0.9)",e.fillRect(t-28,g-4,8,8),e.fillRect(t+20,d-4,8,8),e.strokeStyle="rgba(50, 70, 110, 0.6)",e.lineWidth=1,e.beginPath(),e.moveTo(u-h/2+2,l+10),e.lineTo(u-h/2+2,o-5),e.stroke();for(let T=l+10;T<o-5;T+=8)e.beginPath(),e.moveTo(u-h/2+2,T),e.lineTo(u-h/2-5,T),e.stroke();const v=20,y=o-v;[u,f].forEach(T=>{e.save(),e.beginPath(),e.rect(T-h/2,y,h,v),e.clip();for(let b=0;b<6;b++)e.fillStyle=b%2===0?"rgba(255, 200, 0, 0.60)":"rgba(0, 0, 0, 0.50)",e.beginPath(),e.moveTo(T-h/2+b*4,y),e.lineTo(T-h/2+b*4+4,y),e.lineTo(T-h/2+b*4,y+v),e.lineTo(T-h/2+b*4-4,y+v),e.closePath(),e.fill();e.restore()}),[.1,.3,.55,.75,.9].forEach((T,b)=>{const w=l+T*m,S=Math.sin(a*2.5+b*1.1)>.3,x=S?.8:.25,P=S?.3:.05;[u,f].forEach(R=>{const L=e.createRadialGradient(R,w,0,R,w,14);L.addColorStop(0,`rgba(255, 200, 80, ${P})`),L.addColorStop(1,"rgba(255, 200, 80, 0)"),e.fillStyle=L,e.beginPath(),e.arc(R,w,14,0,Math.PI*2),e.fill(),e.beginPath(),e.arc(R,w,3,0,Math.PI*2),e.fillStyle=`rgba(255, 200, 80, ${x})`,e.fill()})}),e.strokeStyle="rgba(100, 120, 160, 0.5)",e.lineWidth=1,e.beginPath(),e.moveTo(u,l),e.lineTo(u-60,l-80),e.stroke(),e.beginPath(),e.moveTo(f,l),e.lineTo(f+60,l-80),e.stroke()}function Y1(e,t,n,i){const r=t/2,s=n*.55,a=e.createRadialGradient(r,-20,0,r,-20,200);a.addColorStop(0,"rgba(100, 160, 255, 0.12)"),a.addColorStop(1,"rgba(100, 160, 255, 0)"),e.fillStyle=a,e.beginPath(),e.arc(r,-20,200,0,Math.PI*2),e.fill();const o=7;for(let l=0;l<o;l++){const u=(l-o/2)/o*.6,f=(.05+.02*Math.sin(i*.3+l*.7)).toFixed(3),h=Math.tan(u)*s,c=e.createLinearGradient(r,-20,r+h,s);c.addColorStop(0,`rgba(100, 160, 255, ${f})`),c.addColorStop(1,"rgba(100, 160, 255, 0)"),e.fillStyle=c;const p=8+l*3;e.beginPath(),e.moveTo(r-p*.1,-20),e.lineTo(r+p*.1,-20),e.lineTo(r+h+p,s),e.lineTo(r+h-p,s),e.closePath(),e.fill()}for(let l=0;l<4;l++){const u=r+Math.sin(i*1.2+l)*3+(l-2)*12,f=e.createLinearGradient(u,s-60,u,s+20);f.addColorStop(0,"rgba(255, 200, 100, 0)"),f.addColorStop(.5,`rgba(255, 200, 100, ${(.02+l*.005).toFixed(3)})`),f.addColorStop(1,"rgba(255, 200, 100, 0)"),e.fillStyle=f,e.fillRect(u-3,s-60,6,80)}for(let l=0;l<30;l++){const u=r-80+(Math.sin(l*127.1+i*.3+l)*.5+.5)*160,h=(((Math.sin(l*311.7)*.5+.5)*s-i*15*(.5+l%5*.1))%s+s)%s,c=(.04+.03*Math.sin(i*1.5+l*.7)).toFixed(3);e.beginPath(),e.arc(u,h,1,0,Math.PI*2),e.fillStyle=`rgba(200, 220, 255, ${c})`,e.fill()}}function q1(e,t,n,i,r=!1,s=1){const a=Math.sin(i*.8)*2.5,o=n+a,l=52,u=160,f=r?80:58,h=r?20:13,p=f*(.25+.75*s)+Math.sin(i*9)*h*s,m=.35+.6*s,_=e.createRadialGradient(t,o+6,1,t,o+8,Math.max(1,p*.5));_.addColorStop(0,`rgba(255, 255, 240, ${m})`),_.addColorStop(.3,`rgba(255, 240, 180, ${m*.9})`),_.addColorStop(.6,`rgba(255, 200,  80, ${m*.7})`),_.addColorStop(1,"rgba(255, 120,  20, 0.00)"),e.fillStyle=_,e.beginPath(),e.ellipse(t,o+18,Math.max(1,8*s),Math.max(1,p*.55),0,0,Math.PI*2),e.fill();const g=e.createRadialGradient(t,o+15,2,t,o+25,Math.max(1,p*.75));g.addColorStop(0,`rgba(255, 180,  60, ${m*.65})`),g.addColorStop(.4,`rgba(255, 100,  20, ${m*.45})`),g.addColorStop(.75,`rgba(200,  50,   0, ${m*.2})`),g.addColorStop(1,"rgba(150, 20, 0, 0)"),e.fillStyle=g,e.beginPath(),e.ellipse(t,o+28,Math.max(1,14*s),Math.max(1,p*.8),0,0,Math.PI*2),e.fill();const d=e.createRadialGradient(t,o+22,2,t,o+32,Math.max(1,p));if(d.addColorStop(0,`rgba(200,  80,  10, ${m*.5})`),d.addColorStop(.5,`rgba(160,  40, 180, ${m*.25})`),d.addColorStop(.8,`rgba(100,  20, 140, ${m*.12})`),d.addColorStop(1,"rgba(80,  10, 120, 0.00)"),e.fillStyle=d,e.beginPath(),e.ellipse(t,o+32,Math.max(1,20*s),Math.max(1,p),0,0,Math.PI*2),e.fill(),s>.5)for(let U=0;U<3;U++){const j=(i*6+U*1.2)%3,J=j/3,se=((1-J)*.18*s).toFixed(3);e.beginPath(),e.ellipse(t,o+10+j*12,Math.max(1,(12+J*18)*s),Math.max(1,(4+J*8)*s),0,0,Math.PI*2),e.strokeStyle=`rgba(255, 200, 80, ${se})`,e.lineWidth=1.5,e.stroke()}const v=e.createRadialGradient(t,o+10,0,t,o+10,30);v.addColorStop(0,"rgba(120, 180, 255, 0.30)"),v.addColorStop(.5,"rgba(80, 140, 255, 0.12)"),v.addColorStop(1,"rgba(60, 100, 255, 0)"),e.fillStyle=v,e.beginPath(),e.arc(t,o+10,30,0,Math.PI*2),e.fill();const y=e.createRadialGradient(t,o+16,0,t,o+16,30);y.addColorStop(0,"rgba(255, 150, 50, 0.08)"),y.addColorStop(1,"rgba(255, 150, 50, 0)"),e.fillStyle=y,e.beginPath(),e.arc(t,o+16,30,0,Math.PI*2),e.fill();for(let U=0;U<8;U++){const j=t+Math.sin(i*(3.1+U*.7)+U*1.8)*(6+U*2),J=o+10-(i*(15+U*5)+U*7)%30,se=(.3+.4*Math.sin(i*4+U)).toFixed(3);e.beginPath(),e.arc(j,J,.8+U%3*.4,0,Math.PI*2),e.fillStyle=`rgba(255, 200, 80, ${se})`,e.fill()}e.fillStyle="#3a3a42",e.beginPath(),e.moveTo(t-14,o),e.lineTo(t+14,o),e.lineTo(t+18,o+14),e.lineTo(t-18,o+14),e.closePath(),e.fill();for(let U=0;U<4;U++){const j=(U+1)/5,J=4+j*14,se=o+j*12;e.strokeStyle=`rgba(80, 80, 100, ${.6-U*.1})`,e.lineWidth=1,e.beginPath(),e.moveTo(t-J,se),e.lineTo(t+J,se),e.stroke()}const M=e.createRadialGradient(t,o+2,0,t,o+2,8);M.addColorStop(0,"rgba(200, 230, 255, 0.50)"),M.addColorStop(1,"rgba(100, 160, 255, 0)"),e.fillStyle=M,e.beginPath(),e.arc(t,o+2,8,0,Math.PI*2),e.fill(),e.strokeStyle="rgba(180,180,200,0.60)",e.lineWidth=1.5,e.beginPath(),e.moveTo(t-18,o+14),e.lineTo(t+18,o+14),e.stroke(),[[-1,t-l/2],[1,t+l/2]].forEach(([U,j])=>{const J=e.createLinearGradient(j,o-50,j-U*32,o);J.addColorStop(0,"rgba(200, 210, 230, 0.88)"),J.addColorStop(1,"rgba(140, 150, 170, 0.72)"),e.fillStyle=J,e.beginPath(),e.moveTo(j,o-48),e.lineTo(j-U*30,o+12),e.lineTo(j-U*8,o+12),e.lineTo(j,o-30),e.closePath(),e.fill(),e.fillStyle="rgba(210, 45, 35, 0.72)",e.beginPath(),e.moveTo(j,o-30),e.lineTo(j-U*8,o+12),e.lineTo(j-U*14,o+12),e.lineTo(j,o-22),e.closePath(),e.fill()});const T=e.createLinearGradient(t-l/2,0,t+l/2,0);T.addColorStop(0,"rgba(90,  95, 110, 0.95)"),T.addColorStop(.18,"rgba(200, 210, 225, 0.97)"),T.addColorStop(.32,"rgba(235, 240, 252, 0.98)"),T.addColorStop(.55,"rgba(215, 220, 235, 0.97)"),T.addColorStop(.78,"rgba(175, 180, 196, 0.96)"),T.addColorStop(1,"rgba(110, 115, 130, 0.94)"),e.fillStyle=T,yt(e,t-l/2,o-u,l,u,8),e.fill(),e.save(),yt(e,t-l/2,o-u,l,u,8),e.clip();const b=e.createRadialGradient(t-8,o-u*.5,4,t-8,o-u*.5,l*.9);b.addColorStop(0,"rgba(255, 255, 255, 0.08)"),b.addColorStop(.5,"rgba(255, 255, 255, 0.02)"),b.addColorStop(1,"rgba(0, 0, 0, 0.10)"),e.fillStyle=b,e.fillRect(t-l/2,o-u,l,u),e.restore();const w=[.12,.22,.34,.46,.57,.68,.79,.9].map(U=>o-u+u*U);e.strokeStyle="rgba(60, 65, 80, 0.20)",e.lineWidth=1,w.forEach(U=>{e.beginPath(),e.moveTo(t-l/2+2,U),e.lineTo(t+l/2-2,U),e.stroke()}),e.strokeStyle="rgba(60, 65, 80, 0.15)",[t-10,t+10].forEach(U=>{e.beginPath(),e.moveTo(U,o-u+5),e.lineTo(U,o-5),e.stroke()}),[{x:t-l/2+6,y:o-u+u*.22},{x:t+l/2-6,y:o-u+u*.22},{x:t-l/2+6,y:o-u+u*.46},{x:t+l/2-6,y:o-u+u*.46},{x:t-l/2+6,y:o-u+u*.68},{x:t+l/2-6,y:o-u+u*.68},{x:t-l/2+6,y:o-u+u*.88},{x:t+l/2-6,y:o-u+u*.88},{x:t-18,y:o-u+u*.34},{x:t+18,y:o-u+u*.34},{x:t-18,y:o-u+u*.57},{x:t+18,y:o-u+u*.57}].forEach(({x:U,y:j})=>{e.beginPath(),e.arc(U,j,2,0,Math.PI*2),e.fillStyle="#cccccc",e.fill(),e.strokeStyle="#888888",e.lineWidth=.8,e.stroke()}),e.strokeStyle="rgba(90, 95, 110, 0.50)",e.lineWidth=1.5,e.beginPath(),e.moveTo(t-l/2+4,o-u+10),e.lineTo(t-l/2+4,o-10),e.stroke(),e.strokeStyle="rgba(100, 180, 255, 0.6)",e.lineWidth=1.5,e.beginPath(),e.moveTo(t-l/2+1,o-u+12),e.lineTo(t-l/2+1,o-12),e.stroke(),e.fillStyle="rgba(210, 38, 28, 0.88)",e.fillRect(t-l/2,o-u+2,l,14),e.fillStyle="rgba(210, 38, 28, 0.78)",e.fillRect(t-l/2,o-80,l,10),e.fillStyle="rgba(190, 30, 22, 0.60)",e.fillRect(t-l/2,o-44,l,5),e.save(),e.fillStyle="rgba(40, 40, 55, 0.70)",e.font="bold 9px Courier New, monospace",e.textAlign="center",e.fillText("TCB-1",t,o-95),e.restore();const x=e.createLinearGradient(t-l/2,o-u,t+l/2,o-u);x.addColorStop(0,"rgba(80,  85, 100, 0.92)"),x.addColorStop(.3,"rgba(200, 210, 228, 0.95)"),x.addColorStop(.55,"rgba(225, 232, 248, 0.97)"),x.addColorStop(.8,"rgba(185, 192, 210, 0.93)"),x.addColorStop(1,"rgba(100, 105, 120, 0.90)"),e.fillStyle=x,e.beginPath(),e.moveTo(t-l/2,o-u),e.lineTo(t+l/2,o-u),e.quadraticCurveTo(t+l/2-4,o-u-40,t,o-u-72),e.quadraticCurveTo(t-l/2+4,o-u-40,t-l/2,o-u),e.fill(),e.save(),e.beginPath(),e.moveTo(t-l/2,o-u),e.lineTo(t+l/2,o-u),e.quadraticCurveTo(t+l/2-4,o-u-40,t,o-u-72),e.quadraticCurveTo(t-l/2+4,o-u-40,t-l/2,o-u),e.clip();const P=e.createLinearGradient(t,o-u-72,t,o-u-30);P.addColorStop(0,"rgba(60, 20, 5, 0.35)"),P.addColorStop(1,"rgba(60, 20, 5, 0)"),e.fillStyle=P,e.fillRect(t-l/2,o-u-72,l,42),e.strokeStyle="rgba(60, 30, 0, 0.3)",e.lineWidth=.5;for(let U=t-l/2;U<t+l/2;U+=3)e.beginPath(),e.moveTo(U,o-u-72),e.lineTo(U,o-u-30),e.stroke();for(let U=o-u-72;U<o-u-30;U+=3)e.beginPath(),e.moveTo(t-l/2,U),e.lineTo(t+l/2,U),e.stroke();e.restore(),e.strokeStyle="rgba(255, 255, 255, 0.45)",e.lineWidth=1.5,e.beginPath(),e.moveTo(t+8,o-u-2),e.quadraticCurveTo(t+10,o-u-30,t+3,o-u-62),e.stroke();const R=o-u+48;e.beginPath(),e.arc(t,R,13,0,Math.PI*2),e.fillStyle="rgba(80, 85, 100, 0.90)",e.fill(),e.beginPath(),e.arc(t,R,10,0,Math.PI*2),e.fillStyle="rgba(40, 180, 255, 0.28)",e.fill(),e.strokeStyle="rgba(100, 210, 255, 0.75)",e.lineWidth=1.5,e.stroke(),e.beginPath(),e.arc(t-3,R-3,3.5,0,Math.PI*2),e.fillStyle="rgba(255, 255, 255, 0.30)",e.fill();const L=r?180:120,F=r?.14:.06,B=e.createRadialGradient(t,o-u/2,10,t,o-u/2,L);if(B.addColorStop(0,`rgba(200, 220, 255, ${F})`),B.addColorStop(1,"rgba(200, 220, 255, 0.00)"),e.fillStyle=B,e.beginPath(),e.ellipse(t,o-u/2,L,L*1.5,0,0,Math.PI*2),e.fill(),r){const U=e.createRadialGradient(t,o-u/2,L*.5,t,o-u/2,L*2.2);U.addColorStop(0,"rgba(255, 160, 60, 0.08)"),U.addColorStop(1,"rgba(255, 160, 60, 0.00)"),e.fillStyle=U,e.beginPath(),e.ellipse(t,o-u/2,L*2.2,L*3,0,0,Math.PI*2),e.fill()}const D=n+6,z=e.createRadialGradient(t,D,0,t,D,50),H=(.06+.04*s).toFixed(3);z.addColorStop(0,`rgba(255, 180, 80, ${H})`),z.addColorStop(.5,`rgba(200, 120, 40, ${(parseFloat(H)*.5).toFixed(3)})`),z.addColorStop(1,"rgba(100, 50, 0, 0)"),e.fillStyle=z,e.beginPath(),e.ellipse(t,D,50,12,0,0,Math.PI*2),e.fill()}function K1(e,t,n){const i=.7+.3*Math.sin(n*2.8);t.forEach(({x:r,y:s})=>{const a=s-84,o=e.createRadialGradient(r,a,0,r,a,16);o.addColorStop(0,`rgba(0, 255, 130, ${(.3*i).toFixed(3)})`),o.addColorStop(1,"rgba(0, 255, 130, 0)"),e.fillStyle=o,e.beginPath(),e.arc(r,a,16,0,Math.PI*2),e.fill(),e.beginPath(),e.arc(r,a,3.5,0,Math.PI*2),e.fillStyle=`rgba(0, 255, 130, ${(.9*i).toFixed(2)})`,e.fill()})}function Z1(e,t,n,i){const r=.8+.2*Math.sin(i*1.5),s=n*.55,a=e.createLinearGradient(0,0,0,s*.7);a.addColorStop(0,`rgba(0, 200, 100, ${(.06*r).toFixed(3)})`),a.addColorStop(1,"rgba(0, 200, 100, 0)"),e.fillStyle=a,e.fillRect(0,0,t,s*.7),e.strokeStyle=`rgba(0, 220, 110, ${(.14*r).toFixed(3)})`,e.lineWidth=1;const o=6;for(let l=1;l<=o;l++){const u=l/(o+1),f=s+(n-s)*Math.pow(u,1.8);e.beginPath(),e.moveTo(0,f),e.lineTo(t,f),e.stroke()}}function Q1(e,t,n,i,r,s){const a=n-230,o=.65+.35*Math.sin(s*2.1),l=t+55,u=a-90,f=t+200,h=a-210,c=i*.82,p=r*.06;e.save(),e.beginPath(),e.moveTo(t,a),e.bezierCurveTo(l,u,f,h,c,p),e.strokeStyle=`rgba(0, 210, 255, ${(.08*o).toFixed(3)})`,e.lineWidth=14,e.setLineDash([]),e.stroke(),e.beginPath(),e.moveTo(t,a),e.bezierCurveTo(l,u,f,h,c,p),e.strokeStyle=`rgba(0, 200, 255, ${(.72*o).toFixed(3)})`,e.lineWidth=1.5,e.setLineDash([7,5]),e.lineDashOffset=-(s*20)%12,e.stroke(),e.setLineDash([]),e.beginPath(),e.arc(c,p,4,0,Math.PI*2),e.fillStyle=`rgba(0, 230, 255, ${(.85*o).toFixed(3)})`,e.fill(),e.fillStyle=`rgba(0, 210, 255, ${(.55*o).toFixed(3)})`,e.font="bold 8px 'Courier New', monospace",e.textAlign="center",e.fillText("TRAJECTORY LOCKED",c,p+16),e.restore()}const w0={power:{rows:[["VOLT","11.4kV"],["LOAD","68%"]],status:"STANDBY",onlineStatus:"ONLINE"},fuel:{rows:[["PRESS","245kPa"],["TEMP","18°C"]],status:"STANDBY",onlineStatus:"ONLINE"},nav:{rows:[["COORD","X-42"],["SPEED","000"]],status:"LOCKED",onlineStatus:"CALIBRATED"},comms:{rows:[["FREQ","24.8GHz"],["SIG","98%"]],status:"OFFLINE",onlineStatus:"ONLINE"},diagnostics:{rows:[["TEMP","62°C"],["CORE","NOMINAL"]],status:"HEALTHY",onlineStatus:"NOMINAL"},engine:{rows:[["THRUST","000%"],["FUEL","100%"]],status:"IDLE",onlineStatus:"ARMED"}},J1={power:{intensity:.3,flicker:!1},fuel:{intensity:.34,flicker:!1},nav:{intensity:.26,flicker:!1},comms:{intensity:.32,flicker:!0,flickerFreq:3.8},diagnostics:{intensity:.36,flicker:!1},engine:{intensity:.44,flicker:!0,flickerFreq:5.2}};function eM(e,t,n,i,r,s,a=!1){const o=Object.keys(w0).find(Be=>i.toLowerCase().includes(Be))||"power",l=90,u=110,f=J1[o]||{intensity:.3,flicker:!1},h=f.flicker?.72+.28*Math.sin(s*f.flickerFreq)*(.6+.4*Math.sin(s*19.1)):1,c=(.6+.4*Math.sin(s*2.2))*h,p=o.charCodeAt(0)*.41;let m,_,g,d,v,y;r?([m,_,g]=[255,179,71],[d,v,y]=[255,215,140]):a?([m,_,g]=[34,255,136],[d,v,y]=[110,255,185]):([m,_,g]=[0,175,255],[d,v,y]=[140,215,255]);const M=90+f.intensity*50;{const Be=f.intensity*.45*(.5+.5*c),q=e.createRadialGradient(t,n-u*.45,0,t,n-u*.45,M);q.addColorStop(0,`rgba(${m},${_},${g},${Be.toFixed(3)})`),q.addColorStop(1,`rgba(${m},${_},${g},0.000)`),e.fillStyle=q,e.beginPath(),e.ellipse(t,n-u*.45,M,M*.7,0,0,Math.PI*2),e.fill()}if(r){const Be=e.createRadialGradient(t,n,0,t,n,110);Be.addColorStop(0,`rgba(${m},${_},${g},${(.14*c).toFixed(2)})`),Be.addColorStop(1,`rgba(${m},${_},${g},0.000)`),e.fillStyle=Be,e.beginPath(),e.ellipse(t,n,110,80,0,0,Math.PI*2),e.fill()}const T=e.createLinearGradient(t-5,0,t+5,0);T.addColorStop(0,"rgba(18,45,88,0.95)"),T.addColorStop(.5,"rgba(38,75,138,0.95)"),T.addColorStop(1,"rgba(18,45,88,0.95)"),e.fillStyle=T,e.fillRect(t-4,n,8,26),e.fillStyle="rgba(28,58,106,0.92)",e.beginPath(),e.moveTo(t-4,n+2),e.lineTo(t-18,n+20),e.lineTo(t-18,n+27),e.lineTo(t-14,n+27),e.lineTo(t-2,n+8),e.closePath(),e.fill(),e.beginPath(),e.moveTo(t+4,n+2),e.lineTo(t+18,n+20),e.lineTo(t+18,n+27),e.lineTo(t+14,n+27),e.lineTo(t+2,n+8),e.closePath(),e.fill();const b=e.createLinearGradient(t-24,n+22,t+24,n+32);b.addColorStop(0,"rgba(12,32,72,0.98)"),b.addColorStop(.5,`rgba(${m},${_},${g},0.12)`),b.addColorStop(1,"rgba(12,32,72,0.98)"),e.fillStyle=b,yt(e,t-24,n+22,48,10,3),e.fill(),e.strokeStyle=`rgba(${m},${_},${g},0.22)`,e.lineWidth=1,yt(e,t-24,n+22,48,10,3),e.stroke(),e.strokeStyle="rgba(28,48,72,0.50)",e.lineWidth=2,e.beginPath(),e.moveTo(t,n+32),e.quadraticCurveTo(t+20,n+55,t+40,n+78),e.stroke();const w=t-l/2,S=n-u,x=e.createLinearGradient(w,S,w+l,S+u);x.addColorStop(0,"rgba(6,18,46,0.97)"),x.addColorStop(.5,"rgba(9,22,54,0.97)"),x.addColorStop(1,"rgba(5,13,38,0.97)"),e.fillStyle=x,yt(e,w,S,l,u,7),e.fill();const P=r?Math.min(.95,.75+.25*c):a?.5+.22*c:f.intensity*.9*c;e.strokeStyle=`rgba(${m},${_},${g},${P.toFixed(2)})`,e.lineWidth=r?1.8:1.5,yt(e,w,S,l,u,7),e.stroke(),e.strokeStyle=`rgba(${m},${_},${g},0.10)`,e.lineWidth=1,e.beginPath(),e.moveTo(w+8,S+1),e.lineTo(w+l-8,S+1),e.stroke();const R=6;e.strokeStyle=`rgba(${m},${_},${g},${(.22*c).toFixed(2)})`,e.lineWidth=1,[[w,S],[w+l,S],[w,S+u],[w+l,S+u]].forEach(([Be,q],_e)=>{const K=_e===1||_e===3?-1:1,le=_e===2||_e===3?-1:1;e.beginPath(),e.moveTo(Be+K*1,q+le*(R+1)),e.lineTo(Be+K*1,q+le*1),e.lineTo(Be+K*(R+1),q+le*1),e.stroke()});const L=w+6,F=S+6,B=l-12,D=u-12,z=e.createLinearGradient(L,F,L+B,F+D);z.addColorStop(0,"rgba(0,16,48,0.96)"),z.addColorStop(1,"rgba(0,9,28,0.96)"),e.fillStyle=z,yt(e,L,F,B,D,4),e.fill(),e.fillStyle=`rgba(${m},${_},${g},0.022)`;for(let Be=F+2;Be<F+D-2;Be+=3)e.fillRect(L+2,Be,B-4,1.5);const H=F+s*26%D,U=e.createLinearGradient(0,H-8,0,H+8);U.addColorStop(0,`rgba(${m},${_},${g},0.000)`),U.addColorStop(.5,`rgba(${m},${_},${g},0.055)`),U.addColorStop(1,`rgba(${m},${_},${g},0.000)`),e.fillStyle=U,e.fillRect(L,Math.max(F,H-8),B,16);const j=F+12,J=o==="diagnostics"?"DIAG":o.toUpperCase();e.font="bold 7px Courier New, monospace",e.textAlign="left",e.fillStyle=`rgba(${m},${_},${g},${r?.95:.72})`,e.fillText(J,L+5,j);const se=w0[o],ce=a?"ONLINE":se?se.status:"STANDBY",[Ie,ke,Le]=a?[34,255,136]:[255,179,71];e.font="6px Courier New, monospace",e.textAlign="right",e.fillStyle=`rgba(${Ie},${ke},${Le},0.80)`,e.fillText(ce,L+B-4,j),e.strokeStyle=`rgba(${m},${_},${g},0.18)`,e.lineWidth=.75,e.beginPath(),e.moveTo(L+4,j+4),e.lineTo(L+B-4,j+4),e.stroke();const ee=se?se.rows:[["--","---"],["--","---"]],pe=j+16,fe=14;ee.slice(0,2).forEach(([Be,q],_e)=>{const K=pe+_e*fe;e.beginPath(),e.arc(L+7,K-2.5,1.8,0,Math.PI*2),e.fillStyle=`rgba(${m},${_},${g},0.60)`,e.fill(),e.font="6px Courier New, monospace",e.textAlign="left",e.fillStyle=`rgba(${m},${_},${g},0.48)`,e.fillText(Be,L+13,K),e.textAlign="right",e.fillStyle=`rgba(${d},${v},${y},${r?.98:.9})`,e.fillText(q,L+B-5,K),e.strokeStyle=`rgba(${m},${_},${g},0.08)`,e.lineWidth=.5,e.beginPath(),e.moveTo(L+4,K+6),e.lineTo(L+B-4,K+6),e.stroke()});const Pe=pe+2*fe+5,ze=a?se?se.onlineStatus:"ONLINE":se?se.status:"STANDBY";e.beginPath(),e.arc(L+7,Pe-2.5,1.8,0,Math.PI*2),e.fillStyle=`rgba(${Ie},${ke},${Le},0.70)`,e.fill(),e.font="6px Courier New, monospace",e.textAlign="left",e.fillStyle=`rgba(${m},${_},${g},0.48)`,e.fillText("STATUS",L+13,Pe),e.textAlign="right",e.fillStyle=`rgba(${Ie},${ke},${Le},${r?.98:.9})`,e.fillText(ze,L+B-5,Pe),e.strokeStyle=`rgba(${m},${_},${g},0.14)`,e.lineWidth=.75,e.beginPath(),e.moveTo(L+4,Pe+5),e.lineTo(L+B-4,Pe+5),e.stroke();const Fe=Pe+8,nt=14,We=Fe+nt/2;e.fillStyle=`rgba(${m},${_},${g},0.055)`,yt(e,L+3,Fe,B-6,nt,2),e.fill();const Qe=L+5,me=L+B-5-Qe;if(o==="fuel"){const q=(me-9)/10,_e=nt-3,K=r?.8:a?.65:.28;for(let le=0;le<10;le++){const A=Qe+le*(q+1),E=Math.max(2,(.3+.7*Math.abs(Math.sin(le*.95+s*.5+p)))*_e*(a?1:.4));e.fillStyle=`rgba(${m},${_},${g},${K})`,yt(e,A,We+nt/2-1-E,q,E,1),e.fill()}}else{const Be=nt*.33*(a?1:.38);for(let q=0;q<2;q++){e.beginPath();for(let _e=0;_e<=30;_e++){const K=Qe+_e/30*me,le=_e/30*Math.PI*5+s*2.1+p,A=We+Math.sin(le)*Be*(.8+.2*Math.sin(le*.6+s*.7));_e===0?e.moveTo(K,A):e.lineTo(K,A)}q===0?(e.strokeStyle=`rgba(${m},${_},${g},${r?.9:a?.75:.4})`,e.lineWidth=1.2):(e.strokeStyle=`rgba(${m},${_},${g},0.12)`,e.lineWidth=3),e.stroke()}e.lineWidth=1}const ot=w+l-10,Je=S+10;let He;r?He=Math.floor(s*4)%2===0?"rgba(255,179,71,0.95)":"rgba(255,179,71,0.12)":a?He=`rgba(34,255,136,${(.8+.2*c).toFixed(2)})`:He=`rgba(0,175,255,${(.55+.25*c).toFixed(2)})`;const O=e.createRadialGradient(ot,Je,0,ot,Je,7);O.addColorStop(0,He),O.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=O,e.beginPath(),e.arc(ot,Je,7,0,Math.PI*2),e.fill(),e.beginPath(),e.arc(ot,Je,2.5,0,Math.PI*2),e.fillStyle=He,e.fill(),e.save(),e.translate(L+14,F+10),e.rotate(-.52),e.beginPath(),e.ellipse(0,0,10,5,0,0,Math.PI*2),e.fillStyle="rgba(255,255,255,0.045)",e.fill(),e.restore(),e.fillStyle=`rgba(${m},${_},${g},${r?.95:a?.7:.5})`,e.font="bold 8px 'Courier New', monospace",e.textAlign="center",e.fillText(i.toUpperCase(),t,n+42)}function tM(e,t,n,i){const a=.65+.35*Math.sin(i*1.6);for(let u=4;u>=1;u--)e.beginPath(),e.ellipse(t,n,88+u*14,20+u*3,0,0,Math.PI*2),e.strokeStyle=`rgba(0,175,255,${(.04*a/u).toFixed(3)})`,e.lineWidth=u*5,e.stroke();e.beginPath(),e.ellipse(t,n,88,20,0,0,Math.PI*2);const o=e.createLinearGradient(t-88,n,t+88,n);o.addColorStop(0,"rgba(0,175,255,0.00)"),o.addColorStop(.2,`rgba(0,175,255,${(.85*a).toFixed(2)})`),o.addColorStop(.5,`rgba(100,220,255,${(.95*a).toFixed(2)})`),o.addColorStop(.8,`rgba(0,175,255,${(.85*a).toFixed(2)})`),o.addColorStop(1,"rgba(0,175,255,0.00)"),e.strokeStyle=o,e.lineWidth=2.5,e.stroke();const l=e.createRadialGradient(t,n,0,t,n,88);l.addColorStop(0,`rgba(0,175,255,${(.06*a).toFixed(3)})`),l.addColorStop(.6,`rgba(0,175,255,${(.025*a).toFixed(3)})`),l.addColorStop(1,"rgba(0,175,255,0.000)"),e.fillStyle=l,e.beginPath(),e.ellipse(t,n,88,20,0,0,Math.PI*2),e.fill(),e.lineWidth=1;for(let u=0;u<12;u++){const f=u/12*Math.PI*2,h=t+Math.cos(f)*88,c=n+Math.sin(f)*20,p=t+Math.cos(f)*83,m=n+Math.sin(f)*(20-1.5);e.beginPath(),e.moveTo(h,c),e.lineTo(p,m),e.strokeStyle=`rgba(0,175,255,${(.45*a).toFixed(2)})`,e.lineWidth=u%3===0?1.5:.75,e.stroke()}e.lineWidth=1}function nM(e,t,n,i,r){const s=Math.sin(r*6)*(Math.abs(i)>10?3:1),a=n+s,o=i>5?1:i<-5?-1:0,l=1.3;e.beginPath(),e.ellipse(t,a+4,20,4,0,0,Math.PI*2),e.fillStyle="rgba(0, 0, 0, 0.30)",e.fill();const u=Math.abs(i)>8?Math.sin(r*9)*5:0;[[-7*l,u],[7*l,-u]].forEach(([h,c])=>{const p=t+h-5*l,m=a-2+18*l+Math.abs(c*.3);yt(e,p,m,10*l,6,3),e.fillStyle="rgba(30, 50, 100, 0.90)",e.fill()}),[[-7*l,u],[7*l,-u]].forEach(([h,c])=>{e.fillStyle="rgba(55, 90, 160, 0.90)",e.fillRect(t+h-4*l,a-2,8*l,18*l+Math.abs(c*.3)),e.strokeStyle="rgba(0, 0, 0, 0.30)",e.lineWidth=1,e.beginPath(),e.moveTo(t+h,a-2),e.lineTo(t+h,a-2+16*l),e.stroke()});const f=e.createRadialGradient(t,a-16*l,2,t,a-16*l,20*l);f.addColorStop(0,"rgba(120, 170, 230, 0.95)"),f.addColorStop(1,"rgba(50,  90,  160, 0.95)"),e.fillStyle=f,yt(e,t-14*l,a-30*l,28*l,28*l,7),e.fill(),e.strokeStyle="rgba(0, 0, 0, 0.30)",e.lineWidth=1,e.beginPath(),e.moveTo(t,a-30*l),e.lineTo(t,a-2),e.stroke(),e.beginPath(),e.moveTo(t-14*l,a-18*l),e.lineTo(t+14*l,a-18*l),e.stroke(),[[-1,-14*l-4],[1,14*l+4-10]].forEach(([h,c])=>{e.fillStyle="rgba(80, 120, 200, 0.90)",yt(e,t+c-0,a-30*l,10,10,4),e.fill()}),e.beginPath(),e.arc(t,a-36*l,15*l,0,Math.PI*2),e.fillStyle="rgba(40, 70, 130, 0.95)",e.fill(),e.beginPath(),e.ellipse(t+o*2*l,a-36*l,10*l,8*l,0,0,Math.PI*2),e.fillStyle="rgba(10, 190, 255, 0.55)",e.fill(),e.save(),e.translate(t+o*2*l-3,a-36*l-2),e.beginPath(),e.ellipse(0,0,5*l,3*l,-.4,Math.PI*1.1,Math.PI*1.8),e.strokeStyle="rgba(255, 255, 255, 0.35)",e.lineWidth=1.5,e.stroke(),e.beginPath(),e.ellipse(3,2,2*l,1.5*l,.2,Math.PI*1.1,Math.PI*1.75),e.strokeStyle="rgba(255, 255, 255, 0.20)",e.lineWidth=1,e.stroke(),e.restore(),e.beginPath(),e.ellipse(t+o*2*l-3,a-39*l,3.5,2.5,-.4,0,Math.PI*2),e.fillStyle="rgba(255, 255, 255, 0.60)",e.fill(),e.fillStyle="rgba(30, 55, 110, 0.85)",yt(e,t-18*l,a-28*l,7*l,22*l,3),e.fill(),e.fillStyle="rgba(50, 80, 150, 0.7)",e.fillRect(t-18*l+1,a-14*l,5*l,3),e.fillRect(t-18*l+1,a-10*l,5*l,2),e.fillStyle="rgba(80, 110, 180, 0.8)",e.beginPath(),e.arc(t-18*l+3,a-14*l+1,2,0,Math.PI*2),e.fill()}function iM(e,t,n,i){const r=e.createLinearGradient(0,0,0,n);r.addColorStop(0,"#020818"),r.addColorStop(.55,"#04102a"),r.addColorStop(1,"#060e22"),e.fillStyle=r,e.fillRect(0,0,t,n),[{x:t*.15,y:n*.18,rx:220,ry:130,r:"rgba(60,15,120,0.28)",phase:0},{x:t*.8,y:n*.1,rx:200,ry:115,r:"rgba(8,45,140,0.26)",phase:1.3},{x:t*.5,y:n*.3,rx:270,ry:155,r:"rgba(28,10,95,0.20)",phase:2.1},{x:t*.32,y:n*.22,rx:180,ry:100,r:"rgba(12,65,160,0.18)",phase:.8},{x:t*.68,y:n*.36,rx:165,ry:95,r:"rgba(75,8,130,0.16)",phase:1.7}].forEach(({x:m,y:_,rx:g,ry:d,r:v,phase:y})=>{const M=m+Math.sin(i*.011+y)*10,T=e.createRadialGradient(M,_,0,M,_,Math.max(g,d));T.addColorStop(0,v),T.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=T,e.beginPath(),e.ellipse(M,_,g,d,0,0,Math.PI*2),e.fill()});const a=t*.85,o=n*.12,l=80,u=i!==void 0?i*.001:0;e.save(),e.beginPath(),e.arc(a,o,l,0,Math.PI*2),e.clip();const f=e.createRadialGradient(a-20,o-20,10,a,o,l);f.addColorStop(0,"rgba(180, 195, 215, 0.90)"),f.addColorStop(.4,"rgba(140, 160, 185, 0.88)"),f.addColorStop(.75,"rgba(100, 120, 150, 0.85)"),f.addColorStop(1,"rgba(60, 75, 100, 0.80)"),e.fillStyle=f,e.fillRect(a-l,o-l,l*2,l*2),[{dx:20,dy:-15,rx:14,ry:10},{dx:-25,dy:20,rx:10,ry:8},{dx:10,dy:30,rx:18,ry:12},{dx:-10,dy:-30,rx:8,ry:6}].forEach(({dx:m,dy:_,rx:g,ry:d},v)=>{const y=u+v*.8,M=m*Math.cos(y)-_*Math.sin(y),T=m*Math.sin(y)+_*Math.cos(y);e.beginPath(),e.ellipse(a+M,o+T,g,d,y*.5,0,Math.PI*2),e.fillStyle="rgba(50, 60, 80, 0.40)",e.fill(),e.strokeStyle="rgba(200, 215, 235, 0.15)",e.lineWidth=1,e.stroke()}),e.restore();const c=e.createRadialGradient(a,o,l*.9,a,o,l*1.55);c.addColorStop(0,"rgba(130, 175, 255, 0.00)"),c.addColorStop(.22,"rgba(110, 160, 255, 0.28)"),c.addColorStop(.55,"rgba(80,  130, 220, 0.14)"),c.addColorStop(.8,"rgba(60,  100, 190, 0.06)"),c.addColorStop(1,"rgba(0,   0,   0,   0.00)"),e.fillStyle=c,e.beginPath(),e.arc(a,o,l*1.55,0,Math.PI*2),e.fill();const p=e.createRadialGradient(a,o,l*.82,a,o,l*1.12);p.addColorStop(0,"rgba(150, 200, 255, 0.00)"),p.addColorStop(.5,"rgba(120, 170, 255, 0.18)"),p.addColorStop(1,"rgba(80,  130, 220, 0.00)"),e.fillStyle=p,e.beginPath(),e.arc(a,o,l*1.12,0,Math.PI*2),e.fill()}function rM(e,t,n,i,r){const s=i*.55,a=n+14;if(a>=s)return;const o=14,l=70,u=e.createLinearGradient(t,a,t,s);u.addColorStop(0,"rgba(255, 200, 80, 0.22)"),u.addColorStop(.5,"rgba(255, 150, 40, 0.12)"),u.addColorStop(1,"rgba(255, 100, 10, 0.04)"),e.fillStyle=u,e.beginPath(),e.moveTo(t-o,a),e.lineTo(t+o,a),e.lineTo(t+l,s),e.lineTo(t-l,s),e.closePath(),e.fill();const f=e.createLinearGradient(t,a,t,s);f.addColorStop(0,"rgba(255, 245, 200, 0.40)"),f.addColorStop(.3,"rgba(255, 210, 120, 0.20)"),f.addColorStop(1,"rgba(255, 160, 60, 0.06)"),e.fillStyle=f,e.beginPath(),e.moveTo(t-o*.35,a),e.lineTo(t+o*.35,a),e.lineTo(t+l*.3,s),e.lineTo(t-l*.3,s),e.closePath(),e.fill();const h=(.22+.08*Math.sin(r*4.2))*1,c=e.createRadialGradient(t,s,0,t,s,l*1.5);c.addColorStop(0,`rgba(255, 190, 60, ${h.toFixed(3)})`),c.addColorStop(.4,`rgba(255, 110, 20, ${(h*.55).toFixed(3)})`),c.addColorStop(1,"rgba(200, 50, 0, 0.00)"),e.fillStyle=c,e.beginPath(),e.ellipse(t,s,l*1.5,16,0,0,Math.PI*2),e.fill()}function sM(e,t,n,i){for(let r=0;r<24;r++){const s=r*137.508,o=(i*(1.8+r%5*.35)+s*.01)%3.5/3.5;if(o>.88)continue;const l=o<.18?o/.18*.45:(1-(o-.18)/.7)*.45;if(l<.01)continue;const u=(Math.sin(s*.13)*.5+.5)*50-25,f=o*55,h=Math.sin(i*1.3+s*.07)*4,c=t+u+h,p=n+8-f,m=.7+(1-o)*1.8,_=Math.floor(180+o*50),g=Math.floor(80+o*80);e.beginPath(),e.arc(c,p,m,0,Math.PI*2),e.fillStyle=`rgba(255, ${_}, ${g}, ${l.toFixed(3)})`,e.fill()}}const nu=[-.35,-.21,-.07,.07,.21,.35],aM=[[0,2,4],[1,3,5],[3,1,4]],oM=[1.3,4.1,7.6],lM=55,Vf=[3.8,4.5,3.2],m_=1.1,x0=[{body0:"rgba(225,108,32,0.92)",body1:"rgba(152,60,10,0.92)",legs:"rgba(170,76,15,0.90)",boots:"rgba(112,46,8,0.92)",pack:"rgba(122,46,10,0.85)",helm:"rgba(66,34,12,0.95)",arms:"rgba(160,70,14,0.90)"},{body0:"rgba(136,150,166,0.92)",body1:"rgba(74,84,96,0.92)",legs:"rgba(84,94,108,0.90)",boots:"rgba(52,58,70,0.92)",pack:"rgba(54,64,76,0.85)",helm:"rgba(44,54,64,0.95)",arms:"rgba(76,86,102,0.90)"},{body0:"rgba(208,175,34,0.92)",body1:"rgba(140,110,8,0.92)",legs:"rgba(152,128,14,0.90)",boots:"rgba(102,80,6,0.92)",pack:"rgba(112,90,8,0.85)",helm:"rgba(70,54,10,0.95)",arms:"rgba(142,118,12,0.90)"}];function uM(e,t){return aM.map((n,i)=>{const r=i%n.length,s=n[r],a=e*.5+nu[s]*e,o=i===1,l=nu[s]<0?1:-1;return{id:i,x:o?a-55:a,y:t*.7,route:n,routeIdx:r,state:o?"walking":"working",workTimer:o?0:Vf[i]*(i===2?.55:1),reactTimer:0,reactDir:1,facing:o?1:l,seed:oM[i]}})}function cM(e,t,n,i,r){r||!e||e.forEach(s=>{if(s.y=i*.7,s.state==="reacting"){s.reactTimer-=t,s.reactTimer<=0&&(s.state="working",s.workTimer=Vf[s.id]*.35);return}if(s.state==="working"){s.workTimer-=t,s.workTimer<=0&&(s.routeIdx=(s.routeIdx+1)%s.route.length,s.state="walking");return}if(s.state==="walking"){const a=s.route[s.routeIdx],o=n*.5+nu[a]*n,l=o-s.x;if(Math.abs(l)<3)s.x=o,s.state="working",s.workTimer=Vf[s.id],s.facing=nu[a]<0?1:-1;else{const u=Math.sign(l)*lM*t;s.x+=Math.abs(u)>Math.abs(l)?l:u,s.facing=l>0?1:-1}}})}function fM(e,t){if(!e)return;let n=null,i=1/0;e.forEach(r=>{const s=Math.abs(r.x-t);s<i&&(i=s,n=r)}),n&&n.state!=="reacting"&&(n.state="reacting",n.reactTimer=m_,n.reactDir=t>n.x?1:-1)}function dM(e,t,n){const{x:i,y:r,state:s,seed:a,facing:o,reactDir:l,id:u}=t,f=.65,h=x0[u%x0.length];e.save(),e.globalAlpha=.86,e.beginPath(),e.ellipse(i,r+3,12*f,3,0,0,Math.PI*2),e.fillStyle="rgba(0,0,0,0.28)",e.fill();const c=s==="walking",p=c?Math.sin(n*6+a)*2.5:0,m=s==="working"?Math.sin(n*7.5+a*2.1):0,_=m*.5,g=r+p+_,d=s==="working"?.15+Math.sin(n*1.4+a)*.03:0;e.save(),d>0&&(e.translate(i,g),e.rotate(o*d),e.translate(-i,-g));const v=c?Math.sin(n*6+a)*5:0;[[-6*f,v],[6*f,-v]].forEach(([T,b])=>{yt(e,i+T-4*f,g-2+14*f+Math.abs(b*.25),9*f,5,2),e.fillStyle=h.boots,e.fill(),e.fillStyle=h.legs,e.fillRect(i+T-3.5*f,g-2,7*f,14*f+Math.abs(b*.2))});const y=e.createRadialGradient(i,g-14*f,1,i,g-14*f,15*f);if(y.addColorStop(0,h.body0),y.addColorStop(1,h.body1),e.fillStyle=y,yt(e,i-11*f,g-26*f,22*f,24*f,5),e.fill(),e.fillStyle=h.pack,yt(e,i+(o>=0?-14*f:3*f),g-24*f,5*f,18*f,2),e.fill(),e.fillStyle=h.arms,s==="reacting"){const T=l||1,b=1-Math.max(0,t.reactTimer/m_),w=-1.05*Math.min(1,b*2.5);e.save(),e.translate(i+T*10*f,g-24*f),e.rotate(w),e.fillRect(-3*f,0,6*f,12*f),e.restore(),e.fillRect(i-T*10*f-3*f,g-24*f,6*f,12*f)}else if(s==="working"){const T=.26+m*.18,b=-(.1+Math.sin(n*.9+a)*.05);e.save(),e.translate(i+o*10*f,g-24*f),e.rotate(T),e.fillRect(-3*f,0,6*f,12*f),e.restore(),e.save(),e.translate(i-o*10*f,g-24*f),e.rotate(b),e.fillRect(-3*f,0,6*f,12*f),e.restore()}else{const T=Math.sin(n*6+a)*.22;[[-1,T],[1,-T]].forEach(([b,w])=>{e.save(),e.translate(i+b*10*f,g-24*f),e.rotate(w),e.fillRect(-3*f,0,6*f,12*f),e.restore()})}e.restore(),e.fillStyle=h.arms,e.beginPath(),e.ellipse(i-11*f,g-24*f,5*f,3.5*f,-.2,0,Math.PI*2),e.fill(),e.beginPath(),e.ellipse(i+11*f,g-24*f,5*f,3.5*f,.2,0,Math.PI*2),e.fill(),e.fillStyle="rgba(255,255,255,0.18)",yt(e,i-5*f,g-22*f,10*f,7*f,1),e.fill(),e.fillStyle=h.body0,e.fillRect(i-4*f,g-22*f,8*f,2*f),e.fillStyle="rgba(160,200,255,0.14)",e.fillRect(i-11*f,g-26*f,3*f,22*f),e.fillStyle=h.pack,e.fillRect(i-11*f,g-4*f,22*f,3*f),e.fillStyle="rgba(200,210,230,0.70)",e.fillRect(i-2*f,g-4*f,4*f,3*f),e.beginPath(),e.arc(i,g-32*f,10*f,0,Math.PI*2),e.fillStyle=h.helm,e.fill(),e.beginPath(),e.arc(i,g-32*f,10*f,Math.PI*.7,Math.PI*2.3),e.strokeStyle="rgba(80,100,140,0.55)",e.lineWidth=1.5,e.stroke(),e.fillStyle="rgba(180,190,210,0.80)",e.fillRect(i+6*f,g-42*f,2,6*f),e.beginPath(),e.arc(i+7*f,g-42*f,2,0,Math.PI*2),e.fillStyle="rgba(80,220,255,0.75)",e.fill();const M=s==="reacting"?(l||1)*1.4*f:o*1.4*f;e.beginPath(),e.ellipse(i+M,g-32*f,6.5*f,5.5*f,0,0,Math.PI*2),e.fillStyle="rgba(10,190,255,0.50)",e.fill(),e.beginPath(),e.ellipse(i+M,g-32*f,5*f,4*f,0,0,Math.PI*2),e.fillStyle="rgba(0,140,220,0.20)",e.fill(),e.beginPath(),e.ellipse(i+M-2,g-33*f,2,1.5,-.3,0,Math.PI*2),e.fillStyle="rgba(255,255,255,0.55)",e.fill(),e.restore()}function hM(e,t,n){t&&t.forEach(i=>dM(e,i,n))}function pM(e,t){return[{type:"tanker",x:e*.14,y:t*.76,dir:1,speed:30,state:"driving",stopTimer:0},{type:"buggy",x:e*.8,y:t*.76,dir:-1,speed:56,state:"driving",stopTimer:0}]}function mM(e,t,n,i){e&&e.forEach(r=>{if(r.y=i*.76,r.state==="stopped"){r.stopTimer-=t,r.stopTimer<=0&&(r.state="driving",r.dir*=-1);return}r.x+=r.dir*r.speed*t;const s=r.type==="tanker"?88:60;r.x<s||r.x>n-s?(r.x=Math.max(s,Math.min(n-s,r.x)),r.state="stopped",r.stopTimer=2.5+Math.random()*3.5):Math.random()<t*.18&&(r.state="stopped",r.stopTimer=1.8+Math.random()*2.8)})}function gM(e,t,n){t&&t.forEach(i=>{i.type==="tanker"?vM(e,i.x,i.y,i.dir,n,i.state==="stopped"):_M(e,i.x,i.y,i.dir,n,i.state==="stopped")})}function vM(e,t,n,i,r,s){e.save(),e.globalAlpha=.91,e.beginPath(),e.ellipse(t,n+3,44,5,0,0,Math.PI*2),e.fillStyle="rgba(0,0,0,0.30)",e.fill(),i<0&&(e.translate(t*2,0),e.scale(-1,1));const a=10,o=n-a-16;[t-30,t-20].forEach(d=>{e.beginPath(),e.arc(d,n-a,a,0,Math.PI*2),e.fillStyle="rgba(26,26,30,0.96)",e.fill(),e.beginPath(),e.arc(d,n-a,a*.44,0,Math.PI*2),e.fillStyle="rgba(168,174,186,0.90)",e.fill()}),e.beginPath(),e.arc(t+26,n-a,a,0,Math.PI*2),e.fillStyle="rgba(26,26,30,0.96)",e.fill(),e.beginPath(),e.arc(t+26,n-a,a*.44,0,Math.PI*2),e.fillStyle="rgba(168,174,186,0.90)",e.fill(),e.fillStyle="rgba(192,200,215,0.95)",yt(e,t-38,o,76,16,3),e.fill();const l=t-36,u=o-13,f=52,h=13,c=e.createLinearGradient(t,u,t,u+h);c.addColorStop(0,"rgba(212,220,230,0.97)"),c.addColorStop(.55,"rgba(172,182,195,0.97)"),c.addColorStop(1,"rgba(130,140,155,0.97)"),e.fillStyle=c,yt(e,l,u,f,h,h*.5),e.fill(),e.save(),e.beginPath(),yt(e,l,u,f,h,h*.5),e.clip(),e.fillStyle="rgba(255,190,0,0.46)";for(let d=0;d<6;d++)e.fillRect(l+d*16,u,9,h);e.restore(),[l,l+f].forEach(d=>{e.beginPath(),e.arc(d,u+h*.5,h*.5,0,Math.PI*2),e.fillStyle="rgba(178,186,200,0.97)",e.fill()});const p=e.createLinearGradient(t+17,0,t+40,0);p.addColorStop(0,"rgba(30,58,118,0.96)"),p.addColorStop(1,"rgba(16,36,82,0.96)"),e.fillStyle=p,yt(e,t+17,o-12,23,28,4),e.fill(),e.fillStyle="rgba(128,200,255,0.46)",yt(e,t+20,o-9,15,9,2),e.fill(),e.fillStyle="rgba(96,106,128,0.85)",e.fillRect(t+38,o-7,5,3),e.fillStyle="rgba(48,50,56,0.90)",e.fillRect(t-36,o-8,4,10),e.fillStyle="rgba(68,70,78,0.85)",e.fillRect(t-37,o-9,6,3);const m=l+f*.78,_=u+2;e.fillStyle="rgba(20,24,34,0.88)",e.fillRect(m,_,5,h-4),e.fillStyle="rgba(80,220,120,0.90)",e.fillRect(m+1,_+1,3,(h-6)*.92),[o+4,o+10].forEach(d=>{e.fillStyle="rgba(160,168,182,0.30)",e.fillRect(t-38,d,52,1.5)}),[[t-30,n-a],[t-20,n-a],[t+26,n-a]].forEach(([d,v])=>{e.beginPath(),e.arc(d,v,a*.28,0,Math.PI*2),e.fillStyle="rgba(80,86,100,0.70)",e.fill()});const g=Math.sin(r*3.8)>0&&!s;e.beginPath(),e.arc(t-2,u-5,3,0,Math.PI*2),e.fillStyle=`rgba(255,155,0,${.32+(g?.68:0)})`,e.fill(),g&&(e.beginPath(),e.arc(t-2,u-5,9,0,Math.PI*2),e.fillStyle="rgba(255,155,0,0.13)",e.fill()),e.restore()}function _M(e,t,n,i,r,s){e.save(),e.globalAlpha=.89,e.beginPath(),e.ellipse(t,n+2,28,4,0,0,Math.PI*2),e.fillStyle="rgba(0,0,0,0.28)",e.fill(),i<0&&(e.translate(t*2,0),e.scale(-1,1));const a=7,o=n-a-13;[-18,18].forEach(f=>{e.beginPath(),e.arc(t+f,n-a,a,0,Math.PI*2),e.fillStyle="rgba(26,26,30,0.95)",e.fill(),e.beginPath(),e.arc(t+f,n-a,a*.42,0,Math.PI*2),e.fillStyle="rgba(152,158,172,0.88)",e.fill()});const l=e.createLinearGradient(t,o,t,o+13);l.addColorStop(0,"rgba(240,120,28,0.95)"),l.addColorStop(1,"rgba(170,62,10,0.95)"),e.fillStyle=l,yt(e,t-23,o,46,13,4),e.fill(),e.strokeStyle="rgba(186,192,206,0.88)",e.lineWidth=2.5,e.lineJoin="round",e.beginPath(),e.moveTo(t-16,o),e.lineTo(t-16,o-15),e.lineTo(t+16,o-15),e.lineTo(t+16,o),e.stroke(),e.beginPath(),e.moveTo(t-8,o),e.lineTo(t+14,o-15),e.stroke(),e.fillStyle="rgba(36,46,60,0.88)",e.beginPath(),e.arc(t-3,o-2,6,Math.PI,0),e.fill(),e.fillStyle="rgba(118,208,255,0.44)",e.beginPath(),e.ellipse(t-3,o-2,4.5,3.5,0,0,Math.PI*2),e.fill(),e.fillStyle="rgba(138,215,255,0.36)",yt(e,t+8,o+2,11,8,2),e.fill(),e.fillStyle="rgba(255,255,255,0.14)",e.fillRect(t+9,o+3,3,4),e.save(),e.beginPath(),yt(e,t+16,o+6,7,6,1),e.clip();for(let f=0;f<4;f++)e.fillStyle=f%2===0?"rgba(255,200,0,0.65)":"rgba(20,20,24,0.65)",e.fillRect(t+16+f*2,o+6,2,6);e.restore(),[-18,18].forEach(f=>{e.beginPath(),e.arc(t+f,n-a,a*.3,0,Math.PI*2),e.fillStyle="rgba(72,78,94,0.68)",e.fill()}),e.fillStyle="rgba(255,140,50,0.22)",e.fillRect(t-22,o+4,30,1.5);const u=Math.sin(r*5.5+1.8)>.38&&!s;e.beginPath(),e.arc(t+14,o-16,2.5,0,Math.PI*2),e.fillStyle=`rgba(55,220,85,${.3+(u?.62:0)})`,e.fill(),e.restore()}function SM(e,t,n){const i=n*.55,r=n*.78,s=t*.2,a=t*.085,o=w=>a+(s-a)*(w/n),l=w=>t-a-(s-a)*(w/n);e.save(),e.beginPath(),e.moveTo(0,0),e.lineTo(o(0),0),e.lineTo(o(n),n),e.lineTo(0,n),e.closePath(),e.clip();const u=e.createLinearGradient(0,0,s,0);u.addColorStop(0,"rgba(7,12,30,0.99)"),u.addColorStop(.55,"rgba(14,24,52,0.96)"),u.addColorStop(1,"rgba(22,38,72,0.40)"),e.fillStyle=u,e.fillRect(0,0,s+4,n),e.strokeStyle="rgba(32,52,90,0.38)",e.lineWidth=1;for(let w=1;w<9;w++){const S=w/9*n;e.beginPath(),e.moveTo(0,S),e.lineTo(o(S)-2,S),e.stroke()}[.3,.62,.92].forEach(w=>{const S=o(n)*w,x=o(0)*w;e.fillStyle="rgba(3,5,16,0.72)",e.beginPath(),e.moveTo(x-9,0),e.lineTo(S-9,n),e.lineTo(S+9,n),e.lineTo(x+9,0),e.closePath(),e.fill();const P=e.createLinearGradient(x-6,0,x+6,0);P.addColorStop(0,"rgba(20,32,60,0.97)"),P.addColorStop(.4,"rgba(38,56,92,0.97)"),P.addColorStop(.6,"rgba(38,56,92,0.97)"),P.addColorStop(1,"rgba(20,32,60,0.97)"),e.fillStyle=P,e.beginPath(),e.moveTo(x-6,0),e.lineTo(S-6,n),e.lineTo(S+6,n),e.lineTo(x+6,0),e.closePath(),e.fill(),e.fillStyle="rgba(60,95,155,0.30)",e.beginPath(),e.moveTo(x-6,0),e.lineTo(S-6,n),e.lineTo(S-3,n),e.lineTo(x-3,0),e.closePath(),e.fill()}),[n*.13,n*.28,n*.44,n*.6].forEach(w=>{const S=o(w);e.fillStyle="rgba(12,22,48,0.90)",e.fillRect(0,w-5,S,10),e.fillStyle="rgba(36,54,90,0.52)",e.fillRect(0,w-5,S,2),e.fillStyle="rgba(0,0,0,0.18)",e.fillRect(0,w+5,S,4)});const f=o(n)*.68,h=n*.25,c=e.createLinearGradient(f,h,f,r);c.addColorStop(0,"rgba(255,165,48,0.28)"),c.addColorStop(1,"rgba(255,140,0,0.00)"),e.fillStyle=c,e.beginPath(),e.moveTo(f-5,h+8),e.lineTo(f-72,r),e.lineTo(f+58,r),e.lineTo(f+5,h+8),e.closePath(),e.fill(),e.fillStyle="rgba(28,34,48,0.96)",e.fillRect(f-13,h-5,26,10),e.fillStyle="rgba(255,175,55,0.92)",e.fillRect(f-9,h+3,18,5),e.restore();const p=e.createRadialGradient(f,r,0,f,r,s*1.1);p.addColorStop(0,"rgba(255,150,30,0.16)"),p.addColorStop(1,"rgba(255,130,0,0.00)"),e.fillStyle=p,e.fillRect(0,r-8,s*1.6,n-r+8),e.save(),e.beginPath(),e.moveTo(l(0),0),e.lineTo(t,0),e.lineTo(t,n),e.lineTo(l(n),n),e.closePath(),e.clip();const m=e.createLinearGradient(t-s-4,0,t,0);m.addColorStop(0,"rgba(22,38,72,0.40)"),m.addColorStop(.45,"rgba(14,24,52,0.96)"),m.addColorStop(1,"rgba(7,12,30,0.99)"),e.fillStyle=m,e.fillRect(t-s-4,0,s+4,n),e.strokeStyle="rgba(32,52,90,0.38)",e.lineWidth=1;for(let w=1;w<9;w++){const S=w/9*n;e.beginPath(),e.moveTo(l(S)+2,S),e.lineTo(t,S),e.stroke()}[.08,.38,.7].forEach(w=>{const S=l(n)+(t-l(n))*w,x=l(0)+(t-l(0))*w;e.fillStyle="rgba(3,5,16,0.72)",e.beginPath(),e.moveTo(x-9,0),e.lineTo(S-9,n),e.lineTo(S+9,n),e.lineTo(x+9,0),e.closePath(),e.fill();const P=e.createLinearGradient(x-6,0,x+6,0);P.addColorStop(0,"rgba(20,32,60,0.97)"),P.addColorStop(.4,"rgba(38,56,92,0.97)"),P.addColorStop(.6,"rgba(38,56,92,0.97)"),P.addColorStop(1,"rgba(20,32,60,0.97)"),e.fillStyle=P,e.beginPath(),e.moveTo(x-6,0),e.lineTo(S-6,n),e.lineTo(S+6,n),e.lineTo(x+6,0),e.closePath(),e.fill(),e.fillStyle="rgba(60,95,155,0.30)",e.beginPath(),e.moveTo(x+3,0),e.lineTo(S+3,n),e.lineTo(S+6,n),e.lineTo(x+6,0),e.closePath(),e.fill()}),[n*.13,n*.28,n*.44,n*.6].forEach(w=>{const S=l(w);e.fillStyle="rgba(12,22,48,0.90)",e.fillRect(S,w-5,t-S,10),e.fillStyle="rgba(36,54,90,0.52)",e.fillRect(S,w-5,t-S,2),e.fillStyle="rgba(0,0,0,0.18)",e.fillRect(S,w+5,t-S,4)});const _=l(n)+(t-l(n))*.32,g=n*.25,d=e.createLinearGradient(_,g,_,r);d.addColorStop(0,"rgba(255,165,48,0.28)"),d.addColorStop(1,"rgba(255,140,0,0.00)"),e.fillStyle=d,e.beginPath(),e.moveTo(_-5,g+8),e.lineTo(_-58,r),e.lineTo(_+72,r),e.lineTo(_+5,g+8),e.closePath(),e.fill(),e.fillStyle="rgba(28,34,48,0.96)",e.fillRect(_-13,g-5,26,10),e.fillStyle="rgba(255,175,55,0.92)",e.fillRect(_-9,g+3,18,5),e.restore();const v=e.createRadialGradient(_,r,0,_,r,s*1.1);v.addColorStop(0,"rgba(255,150,30,0.16)"),v.addColorStop(1,"rgba(255,130,0,0.00)"),e.fillStyle=v,e.fillRect(t-s*1.6,r-8,s*1.6,n-r+8),[t*.22,t*.78].forEach(w=>{const S=e.createLinearGradient(w,0,w,n*.68);S.addColorStop(0,"rgba(255,168,45,0.12)"),S.addColorStop(.5,"rgba(255,150,30,0.05)"),S.addColorStop(1,"rgba(255,130,0,0.00)"),e.fillStyle=S,e.beginPath(),e.moveTo(w-6,0),e.lineTo(w-50,n*.68),e.lineTo(w+50,n*.68),e.lineTo(w+6,0),e.closePath(),e.fill()});const y=e.createLinearGradient(0,r,s,r);y.addColorStop(0,"rgba(38,75,155,0.18)"),y.addColorStop(1,"rgba(38,75,155,0.00)"),e.fillStyle=y,e.fillRect(0,r,s*1.3,n-r);const M=e.createLinearGradient(t,r,t-s,r);M.addColorStop(0,"rgba(38,75,155,0.18)"),M.addColorStop(1,"rgba(38,75,155,0.00)"),e.fillStyle=M,e.fillRect(t-s*1.3,r,s*1.3,n-r),e.fillStyle="rgba(9,16,42,0.97)",e.fillRect(0,0,t,24),e.strokeStyle="rgba(24,40,76,0.65)",e.lineWidth=1.5;const T=t/10;for(let w=0;w<=10;w++)e.beginPath(),e.moveTo(w*T,0),e.lineTo(w*T+T,24),e.stroke(),e.beginPath(),e.moveTo(w*T+T,0),e.lineTo(w*T,24),e.stroke();e.fillStyle="rgba(40,62,108,0.45)",e.fillRect(0,22,t,2);const b=e.createLinearGradient(0,24,0,98);b.addColorStop(0,"rgba(8,15,46,0.84)"),b.addColorStop(1,"rgba(8,15,46,0.00)"),e.fillStyle=b,e.fillRect(0,24,t,74),e.strokeStyle="rgba(40,100,200,0.25)",e.lineWidth=1,e.beginPath(),e.moveTo(0,i),e.lineTo(t,i),e.stroke()}function yM(){return{phaseTime:0,countdownTimer:10,rocketAscent:0,cameraOffset:0,shakeX:0,shakeY:0,flashAlpha:0,alarmAlpha:0,fadeAlpha:0,ignitionLevel:.3,particles:[],phaseTransitioned:!1}}const Dh=520;function lc(e,t,n){if(e.particles.length>=Dh)return;const i=(Math.random()-.5)*60;e.particles.push({type:"smoke",x:t+i,y:n,vx:i*.4,vy:-(Math.random()*55+25),r:Math.random()*14+6,alpha:0,peakAlpha:Math.random()*.5+.2,life:0,maxLife:Math.random()*2.2+1.4,gray:Math.floor(Math.random()*55+140)})}function A0(e,t,n){e.particles.length>=Dh||e.particles.push({type:"exhaust",x:t+(Math.random()-.5)*28,y:n+15,vx:(Math.random()-.5)*70,vy:Math.random()*140+80,r:Math.random()*9+3,alpha:.85,life:0,maxLife:Math.random()*.5+.25,hue:Math.random()*35+5})}function MM(e,t,n){e.particles.length>=Dh||e.particles.push({type:"contrail",x:t+(Math.random()-.5)*16,y:n,vx:(Math.random()-.5)*5,vy:6+Math.random()*10,r:Math.random()*5+3,alpha:0,peakAlpha:Math.random()*.18+.28,life:0,maxLife:Math.random()*3+2.2})}function EM(e,t){const{particles:n}=e;for(let i=n.length-1;i>=0;i--){const r=n[i];if(r.life+=t,r.life>=r.maxLife){n.splice(i,1);continue}const s=r.life/r.maxLife;r.x+=r.vx*t,r.y+=r.vy*t,r.vy*=r.type==="smoke"?Math.pow(.97,t*60):r.type==="contrail"?Math.pow(.96,t*60):Math.pow(.9,t*60),r.r+=(r.type==="smoke"?9:r.type==="contrail"?5:3)*t,r.type==="smoke"?r.alpha=s<.25?r.peakAlpha*(s/.25):r.peakAlpha*(1-(s-.25)/.75):r.type==="contrail"?r.alpha=s<.12?r.peakAlpha*(s/.12):r.peakAlpha*(1-(s-.12)/.88):r.alpha=(1-s)*.8}}function TM(e,t,n,i){if(i<=.3)return;const r=Math.max(0,(i-.3)/.7),s=55+r*110,a=r*.62,o=n+38;e.save(),e.globalCompositeOperation="lighter",e.beginPath(),e.arc(t,o,s,0,Math.PI*2);const l=e.createRadialGradient(t,o,0,t,o,s);l.addColorStop(0,`rgba(255, 235, 90,  ${a.toFixed(3)})`),l.addColorStop(.22,`rgba(255, 130, 15,  ${(a*.72).toFixed(3)})`),l.addColorStop(.55,`rgba(210, 45,  0,   ${(a*.3).toFixed(3)})`),l.addColorStop(1,"rgba(140, 15, 0, 0)"),e.fillStyle=l,e.fill(),e.restore()}function bM(e,t){t.particles.forEach(n=>{if(!(n.alpha<=.005||n.r<=0)){if(e.beginPath(),e.arc(n.x,n.y,Math.max(.1,n.r),0,Math.PI*2),n.type==="smoke"){const i=e.createRadialGradient(n.x,n.y,0,n.x,n.y,n.r);i.addColorStop(0,`rgba(${n.gray}, ${n.gray}, ${n.gray+18}, ${n.alpha.toFixed(3)})`),i.addColorStop(1,`rgba(${n.gray-40}, ${n.gray-40}, ${n.gray}, 0)`),e.fillStyle=i}else if(n.type==="contrail"){const i=e.createRadialGradient(n.x,n.y,0,n.x,n.y,n.r);i.addColorStop(0,`rgba(225, 235, 255, ${n.alpha.toFixed(3)})`),i.addColorStop(.5,`rgba(200, 215, 245, ${(n.alpha*.5).toFixed(3)})`),i.addColorStop(1,"rgba(180, 200, 230, 0)"),e.fillStyle=i}else{const i=e.createRadialGradient(n.x,n.y,0,n.x,n.y,n.r),r=Math.min(255,Math.floor(n.hue*7));i.addColorStop(0,`rgba(255, 248, 210, ${n.alpha.toFixed(3)})`),i.addColorStop(.4,`rgba(255, ${r}, 20, ${(n.alpha*.75).toFixed(3)})`),i.addColorStop(1,"rgba(180, 40, 0, 0)"),e.fillStyle=i}e.fill()}})}const C0={id:"power_restoration",title:"Power Restoration",objective:"Fix the variable name error to restore thruster array B",challenge:{context:"The power management script declares a variable called `power`, but the console.log call references `powr` — a name that doesn't exist. The system cannot resolve it. Fix the misspelling to restore power output.",brokenCode:`let power = 100;
console.log(powr);  // ERROR: powr is not defined`,hint:"Look at the name inside console.log — does it match exactly what was declared on line 1?",validate(e){const t=e.replace(/\/\/.*/g,"").replace(/\s+/g," ").trim();return t.includes("console.log(power)")&&!t.includes("console.log(powr)")}},success:{worldEffect:"power_restored",dialogue:[{text:"Power distribution: nominal. Thruster Array B is receiving current. All modules at operational status."},{text:"The variable was declared as `power`. The log was reading `powr` — a name that was never stored. The system found nothing to retrieve and halted distribution."},{text:"In any script, the name used to store a value and the name used to retrieve it must match exactly. That precision is what keeps every dependent system operational.",isLast:!0}]}},R0={id:"nav_calibration",title:"Trajectory Control",objective:"Fix the comparison operator to lock the orbital trajectory",challenge:{context:"The guidance computer checks whether current velocity meets the orbital insertion threshold — but the comparison is broken. Instead of testing the condition, the script overwrites velocity with the threshold value. The trajectory cannot lock.",brokenCode:`let velocity = 7800;          // m/s — current ascent speed
let escapeVelocity = 11200;   // m/s — orbital insertion threshold

if (velocity = escapeVelocity) {
  console.log("Trajectory locked. Orbital insertion confirmed.");
}`,hint:"The operator inside the if check is = — that's assignment, not comparison. Use >= to ask: is velocity at or above escapeVelocity?",validate(e){const t=e.replace(/\/\/.*/g,"").replace(/\s+/g," ").trim();return t.includes("velocity >= escapeVelocity")||t.includes("velocity > escapeVelocity")}},success:{worldEffect:"nav_calibrated",dialogue:[{text:"Guidance computer: nominal. Trajectory condition confirmed. Orbital insertion logic responding correctly."},{text:"The `=` operator was overwriting `escapeVelocity` with the value of `velocity`, then evaluating the assigned number as a condition — always resolving to true. `>=` compares the two values without modifying either."},{text:"Conditionals are how the guidance system determines what to do at each flight phase. Every decision depends on the comparison operator being exact.",isLast:!0}]}},P0={id:"fuel_calculation",title:"Fuel Calculation",objective:"Fix the arithmetic operator in the thrust calculation",challenge:{context:"The fuel flow controller is producing negative thrust values. The formula is correct — thrust equals mass flow rate multiplied by exhaust velocity — but the operator is wrong.",brokenCode:`let massFlow = 350;         // kg/s — propellant flow rate
let exhaustVelocity = 4400; // m/s — exhaust exit speed

let thrust = massFlow - exhaustVelocity; // ERROR: wrong operator
console.log("Thrust: " + thrust + " N");`,hint:"Thrust = mass flow rate × exhaust velocity. Which operator means multiply?",validate(e){const t=e.replace(/\/\/.*/g,"").replace(/\s+/g,"");return t.includes("massFlow*exhaustVelocity")||t.includes("350*4400")}},success:{worldEffect:"fuel_online",dialogue:[{text:"Fuel flow controller: nominal. Thrust output: 1,540,000 N. Engine command accepted. Propulsion line cleared."},{text:"The script used subtraction: 350 minus 4,400. Result: -4,050 — a negative thrust value the engine controller refused. Multiplication gives 1,540,000 N — a physically valid force."},{text:"Numbers are how the rocket quantifies everything measurable. Every calculated value must use the correct operation, or the downstream systems receive data they cannot use.",isLast:!0}]}},I0={id:"comms_signal",title:"Communications Signal",objective:"Fix the undefined variable reference in the broadcast string",challenge:{context:"The communications array is offline. The broadcast script references a variable name that was never declared. The console log throws a ReferenceError and no signal is transmitted.",brokenCode:`let callsign = "LAUNCH-BAY-01";
let statusMessage = "ALL SYSTEMS NOMINAL";

let broadcast = callsign + " — " + statusMsg; // ERROR: 'statusMsg' is not defined
console.log(broadcast);`,hint:"Compare the variable declared on line 2 with the name used on line 4. Are they the same?",validate(e){const t=e.replace(/\/\/.*/g,"").replace(/\s+/g,"");return t.includes("+statusMessage")||t.includes("statusMessage+")||t.includes('"statusMessage"')}},success:{worldEffect:"comms_online",dialogue:[{text:"Communications array: nominal. Broadcast transmitted: 'LAUNCH-BAY-01 — ALL SYSTEMS NOMINAL'."},{text:"The variable `statusMessage` was declared correctly. The script was reading `statusMsg` — a name that did not exist. The system had nothing to retrieve and the transmission could not be assembled."},{text:"Strings are how systems encode and transmit information. Every variable referenced in a string operation must match a declared name exactly, or the data cannot be included.",isLast:!0}]}},N0={id:"diagnostics_scan",title:"Diagnostics Scan",objective:"Fix the loop start index so the scan checks all systems",challenge:{context:"The diagnostics array is reporting only three systems online, but four are active. The scan loop starts at index 1, skipping the first system in the array.",brokenCode:`let systems = ["power", "fuel", "navigation", "engine"];
let onlineCount = 0;

for (let i = 1; i < systems.length; i++) { // ERROR: starts at 1, skips index 0
  onlineCount++;
}

console.log("Systems online: " + onlineCount + " / " + systems.length);`,hint:"Arrays start at index 0. What should the loop counter start at?",validate(e){const t=e.replace(/\/\/.*/g,"").replace(/\s+/g,"");return(t.includes("leti=0")||t.includes("i=0;")||t.includes("i=0,"))&&t.includes("for")}},success:{worldEffect:"diagnostics_online",dialogue:[{text:"Diagnostic scanner: nominal. Scan confirmed: 4 / 4 systems online."},{text:"The loop was beginning at `i = 1`, skipping index 0 — the first system in the array. Changing to `i = 0` ensures every element is processed from the first position."},{text:"Loops are how the station automates repetition across system lists. The starting index defines exactly what is included. An off-by-one error produces no fault alert — only silent data loss.",isLast:!0}]}},L0={id:"engine_ignition",title:"Engine Ignition",objective:"Call the calculateIsp function and assign its return value",challenge:{context:"Engine specific impulse reads zero. The `calculateIsp` function exists and is correct, but it is never called. The result is hardcoded to 0, so the engine controller rejects the ignition sequence.",brokenCode:`function calculateIsp(thrust, fuelFlow) {
  return thrust / (fuelFlow * 9.81);
}

let thrust   = 1540000; // N
let fuelFlow = 350;     // kg/s

let isp = 0; // ERROR: calculateIsp is defined but never called
console.log("Engine Isp: " + isp + " s");`,hint:"The function is defined above. Call it with the two variables and assign the result to `isp`.",validate(e){const t=e.replace(/\/\/.*/g,"").replace(/\s+/g,"");return t.includes("calculateIsp(thrust,fuelFlow)")||t.includes("calculateIsp(1540000,350)")}},success:{worldEffect:"engine_online",dialogue:[{text:"Engine core: nominal. Specific impulse confirmed: 448.8 s. Ignition sequence authorised."},{text:"The function `calculateIsp` was defined but never invoked. The variable `isp` remained at 0. Calling the function and assigning its return value gave the ignition controller a valid reading."},{text:"Defining a function creates the capability. Calling it and capturing the return value is what makes the result available to the system. Without the call, the calculation never runs.",isLast:!0}]}},wM={[C0.id]:C0,[R0.id]:R0,[P0.id]:P0,[I0.id]:I0,[N0.id]:N0,[L0.id]:L0};function xM(e){return wM[e]??null}let An=!1,Lr=null;function yi(){try{return(!Lr||Lr.state==="closed")&&(Lr=new(window.AudioContext||window.webkitAudioContext)),Lr.resume().catch(()=>{}),Lr}catch{return null}}function AM(){return An=!An,An}function CM(){return An}function Uh(e,t=3){const n=Math.floor(t*e.sampleRate),i=e.createBuffer(1,n,e.sampleRate),r=i.getChannelData(0);for(let a=0;a<n;a++)r[a]=Math.random()*2-1;const s=e.createBufferSource();return s.buffer=i,s.loop=!0,s}function Ru({droneFreqs:e,lfoRate:t,lfoDepth:n,noiseFilter:i,noiseGainVal:r,masterGain:s,fadeIn:a}){if(An)return()=>{};try{const o=yi();if(!o)return()=>{};const l=o.createGain();l.gain.value=0,l.connect(o.destination);const u=[],f=[];e.forEach(({freq:p,type:m="sine"})=>{const _=o.createOscillator();_.type=m,_.frequency.value=p,_.connect(l),_.start(),u.push(_)});const h=o.createOscillator(),c=o.createGain();if(h.type="sine",h.frequency.value=t,c.gain.value=n,h.connect(c),u.length>0&&c.connect(u[0].frequency),h.start(),f.push(h),i){const p=Uh(o),m=o.createBiquadFilter();m.type=i.type,m.frequency.value=i.freq,m.Q.value=i.Q??1;const _=o.createGain();_.gain.value=r??.012,p.connect(m),m.connect(_),_.connect(l),p.start(),f.push(p)}return l.gain.linearRampToValueAtTime(s,o.currentTime+(a??4)),()=>{try{l.gain.cancelScheduledValues(o.currentTime),l.gain.linearRampToValueAtTime(0,o.currentTime+1.2),setTimeout(()=>{[...u,...f].forEach(p=>{try{p.stop()}catch{}})},1300)}catch{}}}catch{return()=>{}}}function RM(){return Ru({droneFreqs:[{freq:55},{freq:82.4}],lfoRate:.15,lfoDepth:1.4,noiseFilter:{type:"lowpass",freq:280,Q:.8},noiseGainVal:.01,masterGain:.022,fadeIn:5})}function PM(){return Ru({droneFreqs:[{freq:110},{freq:165,type:"sine"}],lfoRate:.08,lfoDepth:.9,noiseFilter:{type:"highpass",freq:1400,Q:.6},noiseGainVal:.013,masterGain:.018,fadeIn:3.5})}function IM(){return Ru({droneFreqs:[{freq:82,type:"sine"},{freq:123}],lfoRate:.1,lfoDepth:.7,noiseFilter:{type:"bandpass",freq:600,Q:1.5},noiseGainVal:.009,masterGain:.016,fadeIn:4})}function NM(){return Ru({droneFreqs:[{freq:32},{freq:48}],lfoRate:.06,lfoDepth:2,noiseFilter:{type:"highpass",freq:7e3,Q:.4},noiseGainVal:.008,masterGain:.02,fadeIn:6})}function LM(){if(!An)try{const e=yi();if(!e)return;const t=e.createOscillator(),n=e.createGain();t.connect(n),n.connect(e.destination),t.type="sine",t.frequency.setValueAtTime(260,e.currentTime),t.frequency.linearRampToValueAtTime(520,e.currentTime+.08),n.gain.setValueAtTime(.07,e.currentTime),n.gain.exponentialRampToValueAtTime(1e-4,e.currentTime+.22),t.start(e.currentTime),t.stop(e.currentTime+.24)}catch{}}function DM(){if(!An)try{const e=yi();if(!e)return;const t=e.createOscillator(),n=e.createGain();t.connect(n),n.connect(e.destination),t.type="sine",t.frequency.setValueAtTime(460,e.currentTime),t.frequency.linearRampToValueAtTime(200,e.currentTime+.1),n.gain.setValueAtTime(.06,e.currentTime),n.gain.exponentialRampToValueAtTime(1e-4,e.currentTime+.22),t.start(e.currentTime),t.stop(e.currentTime+.24)}catch{}}let uc=0;function g_(){if(!An&&(uc=(uc+1)%3,uc===0))try{const e=yi();if(!e)return;const t=e.createOscillator(),n=e.createGain();t.connect(n),n.connect(e.destination),t.type="square",t.frequency.value=880+Math.random()*280,n.gain.setValueAtTime(.007,e.currentTime),n.gain.exponentialRampToValueAtTime(1e-4,e.currentTime+.022),t.start(e.currentTime),t.stop(e.currentTime+.025)}catch{}}function Fh(){if(!An)try{const e=yi();if(!e)return;const t=e.createOscillator(),n=e.createGain();t.connect(n),n.connect(e.destination),t.type="sawtooth",t.frequency.setValueAtTime(150,e.currentTime),t.frequency.linearRampToValueAtTime(75,e.currentTime+.3),n.gain.setValueAtTime(.045,e.currentTime),n.gain.exponentialRampToValueAtTime(1e-4,e.currentTime+.35),t.start(e.currentTime),t.stop(e.currentTime+.38)}catch{}}function Oh(){if(!An)try{const e=yi();if(!e)return;[261.63,329.63,392,523.25].forEach((t,n)=>{const i=e.createOscillator(),r=e.createGain();i.connect(r),r.connect(e.destination),i.type="sine",i.frequency.value=t;const s=e.currentTime+n*.06;r.gain.setValueAtTime(0,s),r.gain.linearRampToValueAtTime(.07,s+.06),r.gain.exponentialRampToValueAtTime(1e-4,s+1.6),i.start(s),i.stop(s+1.6)})}catch{}}function UM(e){if(!An)try{const t=yi();if(!t)return;const n=380+(10-Math.max(0,e))*55,i=t.createOscillator(),r=t.createGain();i.connect(r),r.connect(t.destination),i.type="sine",i.frequency.value=n,r.gain.setValueAtTime(.1,t.currentTime),r.gain.exponentialRampToValueAtTime(1e-4,t.currentTime+.16),i.start(t.currentTime),i.stop(t.currentTime+.18)}catch{}}function FM(){if(An)return{setLevel:()=>{},stop:()=>{}};try{const e=yi();if(!e)return{setLevel:()=>{},stop:()=>{}};const t=e.createGain();t.gain.value=0,t.connect(e.destination);const n=e.createOscillator();n.type="sawtooth",n.frequency.value=38;const i=e.createGain();i.gain.value=.55,n.connect(i),i.connect(t),n.start();const r=e.createOscillator(),s=e.createGain();r.type="sine",r.frequency.value=7,s.gain.value=5,r.connect(s),s.connect(n.frequency),r.start();const a=Uh(e,4),o=e.createBiquadFilter();o.type="lowpass",o.frequency.value=200,o.Q.value=1.2;const l=e.createGain();l.gain.value=.45,a.connect(o),o.connect(l),l.connect(t),a.start();let u=!1;return{setLevel(f){if(!u)try{t.gain.linearRampToValueAtTime(f*.09,e.currentTime+.08)}catch{}},stop(){u=!0;try{t.gain.cancelScheduledValues(e.currentTime),t.gain.linearRampToValueAtTime(0,e.currentTime+1),setTimeout(()=>{[n,r,a].forEach(f=>{try{f.stop()}catch{}})},1200)}catch{}}}}catch{return{setLevel:()=>{},stop:()=>{}}}}function OM(){if(!An)try{const e=yi();if(!e)return;const t=e.createGain();t.connect(e.destination);const n=e.createOscillator(),i=e.createGain();n.type="sine",n.frequency.setValueAtTime(80,e.currentTime),n.frequency.exponentialRampToValueAtTime(18,e.currentTime+.55),i.gain.setValueAtTime(.7,e.currentTime),i.gain.exponentialRampToValueAtTime(.001,e.currentTime+.65),n.connect(i),i.connect(t),n.start(e.currentTime),n.stop(e.currentTime+.7);const r=Uh(e,2),s=e.createBiquadFilter();s.type="lowpass",s.frequency.value=900;const a=e.createGain();a.gain.setValueAtTime(.45,e.currentTime),a.gain.exponentialRampToValueAtTime(.001,e.currentTime+1.6),r.connect(s),s.connect(a),a.connect(t),r.start(e.currentTime),setTimeout(()=>{try{r.stop()}catch{}},1800),t.gain.setValueAtTime(.22,e.currentTime),t.gain.exponentialRampToValueAtTime(.001,e.currentTime+1.8),setTimeout(()=>{try{t.disconnect()}catch{}},2e3)}catch{}}function D0(){try{let m=function(x,P,R){const L=s.createOscillator(),F=s.createGain();L.type="triangle",L.frequency.value=x,F.gain.setValueAtTime(0,P),F.gain.linearRampToValueAtTime(.11,P+.01),F.gain.exponentialRampToValueAtTime(.001,P+Math.min(R*.85,.52)),L.connect(F),F.connect(a),L.start(P),L.stop(P+R),p.push(L);const B=s.createOscillator(),D=s.createGain();B.type="sine",B.frequency.value=x*2,D.gain.setValueAtTime(0,P),D.gain.linearRampToValueAtTime(.032,P+.008),D.gain.exponentialRampToValueAtTime(.001,P+.14),B.connect(D),D.connect(a),B.start(P),B.stop(P+.18),p.push(B)},_=function(x,P,R){x.forEach(L=>{[0,5,-5].forEach(F=>{const B=L*Math.pow(2,F/1200),D=s.createOscillator(),z=s.createGain();D.type="sine",D.frequency.value=B,z.gain.setValueAtTime(0,P),z.gain.linearRampToValueAtTime(.016,P+1.8),z.gain.setValueAtTime(.016,P+R-1.8),z.gain.linearRampToValueAtTime(0,P+R),D.connect(z),z.connect(a),D.start(P),D.stop(P+R),p.push(D)})})},g=function(x,P,R){const L=s.createOscillator(),F=s.createGain();L.type="sine",L.frequency.value=x,F.gain.setValueAtTime(0,P),F.gain.linearRampToValueAtTime(.03,P+.3),F.gain.setValueAtTime(.03,P+R-.6),F.gain.linearRampToValueAtTime(0,P+R),L.connect(F),F.connect(a),L.start(P),L.stop(P+R),p.push(L)},M=function(x){let P=x;d.forEach(([R,L])=>{m(R,P,u*L),P+=u*L}),v.forEach(({freqs:R,bar:L,bars:F})=>_(R,x+L*f,F*f)),y.forEach(([R,L,F])=>g(R,x+L*f,F*f))},w=function(x){for(;T+b*h<x;)M(T+b*h),b++};var e=m,t=_,n=g,i=M,r=w;const s=yi();if(!s)return()=>{};const a=s.createGain();a.gain.value=0,a.connect(s.destination),a.gain.linearRampToValueAtTime(.22,s.currentTime+5);const l=60/72,u=l/2,f=l*4,h=f*8,c={F2:87.31,A2:110,C3:130.81,E3:164.81,F3:174.61,G3:196,A3:220,B3:246.94,C4:261.63,D4:293.66,E4:329.63,F4:349.23,G4:392,A4:440,B4:493.88,C5:523.25},p=[],d=[[c.A3,1],[c.C4,1],[c.E4,2],[c.A4,1],[c.G4,1],[c.E4,2],[c.C4,1],[c.E4,1],[c.G4,2],[c.A4,1],[c.E4,1],[c.C4,2],[c.F3,1],[c.A3,1],[c.C4,2],[c.F4,1],[c.E4,1],[c.C4,2],[c.A3,1],[c.C4,1],[c.E4,2],[c.F4,1],[c.C4,1],[c.A3,2],[c.C4,1],[c.E4,1],[c.G4,2],[c.C5,1],[c.B4,1],[c.G4,2],[c.E4,1],[c.G4,1],[c.B4,2],[c.C5,1],[c.G4,1],[c.E4,2],[c.E3,1],[c.G3,1],[c.B3,2],[c.E4,1],[c.D4,1],[c.B3,2],[c.G3,1],[c.B3,1],[c.D4,2],[c.E4,2],[c.A3,2]],v=[{freqs:[c.A2,c.E3,c.A3,c.C4],bar:0,bars:2},{freqs:[c.F2,c.C3,c.F3,c.A3],bar:2,bars:2},{freqs:[c.C3,c.G3,c.C4,c.E4],bar:4,bars:2},{freqs:[c.E3,c.B3,c.E4,c.G4],bar:6,bars:2}],y=[[c.A2,0,2],[c.F2,2,2],[c.C3,4,2],[c.E3,6,2]],T=s.currentTime+.5;let b=0;w(s.currentTime+h*2);const S=setInterval(()=>w(s.currentTime+h*2),h/2*1e3);return()=>{clearInterval(S);try{a.gain.cancelScheduledValues(s.currentTime),a.gain.linearRampToValueAtTime(0,s.currentTime+2),setTimeout(()=>{p.forEach(x=>{try{x.stop()}catch{}})},2200)}catch{}}}catch{return()=>{}}}function kM(){try{Lr&&Lr.suspend().catch(()=>{})}catch{}}let El=null;function Lo(e){El=e}function BM(){if(El){try{El()}catch{}El=null}}function zM(e,t){try{if(!window.speechSynthesis)return;window.speechSynthesis.cancel();const n=new SpeechSynthesisUtterance(e);n.rate=.88,n.pitch=t==="control"?.78:1.05,n.volume=.8;const i=window.speechSynthesis.getVoices(),r=i.find(s=>s.lang==="en-US"&&s.localService)||i.find(s=>s.lang==="en-US")||i.find(s=>s.lang.startsWith("en"))||null;r&&(n.voice=r),window.speechSynthesis.speak(n)}catch{}}const GM={power_restoration:"power_management.js",nav_calibration:"flight_control.js"},VM={power_restoration:"ReferenceError: 'powr' is not defined. Variable names must match exactly — every character counts.",nav_calibration:"TypeError: Invalid assignment target. The = operator assigns a value; use >= to compare."},HM={power_restoration:"Fix deployed. Restoring power output...",nav_calibration:"Fix deployed. Locking orbital trajectory..."};function WM({mission:e,onSuccess:t}){const[n,i]=W.useState(e.challenge.brokenCode),[r,s]=W.useState("idle"),[a,o]=W.useState(0),[l,u]=W.useState(!1),f=GM[e.id]??`${e.id}.js`,h=VM[e.id]??"SyntaxError — code could not be executed.",c=HM[e.id]??"Fix deployed. System restoring...";function p(){if(r==="success")return;const _=a+1;o(_),e.challenge.validate(n)?(s("success"),setTimeout(()=>t(),900)):(s("error"),Fh(),_>=2&&u(!0))}function m(_){i(_.target.value),r==="error"&&s("idle")}return I.jsxs("div",{className:"cr-container",children:[I.jsxs("div",{className:"cr-header",children:[I.jsx("span",{className:"cr-badge",children:"Mission"}),I.jsx("span",{className:"cr-title",children:e.title})]}),I.jsx("p",{className:"cr-objective",children:e.objective}),I.jsx("div",{className:"cr-context",children:e.challenge.context}),I.jsxs("div",{className:`cr-editor-wrap${r==="error"?" cr-editor-wrap--error":""}${r==="success"?" cr-editor-wrap--success":""}`,children:[I.jsxs("div",{className:"cr-editor-bar",children:[I.jsx("span",{className:"cr-file-name",children:f}),r==="success"&&I.jsx("span",{className:"cr-badge-ok",children:"✓ FIXED"}),r==="error"&&I.jsx("span",{className:"cr-badge-err",children:"✗ ERROR"})]}),I.jsx("textarea",{className:`cr-editor${r==="success"?" cr-editor--success":""}`,value:n,onChange:m,spellCheck:!1,autoCorrect:"off",autoCapitalize:"off",disabled:r==="success",rows:e.challenge.brokenCode.split(`
`).length+1,onKeyDown:_=>{if(_.key==="Tab"){_.preventDefault();const g=_.target.selectionStart,d=n.slice(0,g)+"  "+n.slice(_.target.selectionEnd);i(d),requestAnimationFrame(()=>{_.target.selectionStart=_.target.selectionEnd=g+2})}}})]}),r==="error"&&I.jsx("div",{className:"cr-error-msg",children:h},a),l&&r!=="success"&&I.jsxs("div",{className:"cr-hint",children:[I.jsx("span",{className:"cr-hint-label",children:"Hint"}),I.jsx("span",{children:e.challenge.hint})]}),r==="success"&&I.jsx("div",{className:"cr-success-msg",children:c}),r!=="success"&&I.jsx("button",{className:"cr-deploy-btn",onClick:p,children:"[ Deploy Fix ]"})]})}const jM=18,XM={power_restored:"POWER SYSTEMS · ALL SYSTEMS NOMINAL",nav_calibrated:"GUIDANCE COMPUTER · TRAJECTORY LOCKED · NOMINAL"};function $M({terminal:e,onClose:t,onMissionComplete:n}){var L;const i=e!==null,[r,s]=W.useState("intro"),[a,o]=W.useState(null),[l,u]=W.useState(0),[f,h]=W.useState(0),[c,p]=W.useState([]),[m,_]=W.useState(!1),g=W.useRef(null),d=W.useRef(null),v=W.useRef(null);v.current=r==="success"&&a?a.success.dialogue:e==null?void 0:e.sequence,W.useEffect(()=>{i&&(clearInterval(d.current),s("intro"),o(null),u(0),h(0),p([]),_(!1))},[e==null?void 0:e.id,i]),W.useEffect(()=>{if(!i||r==="challenge"||r==="complete")return;const F=v.current;if(!F)return;const B=F[l];if(!B)return;h(0);let D=0;return clearInterval(d.current),d.current=setInterval(()=>{D++,h(D),g_(),D>=B.text.length&&clearInterval(d.current)},jM),()=>clearInterval(d.current)},[l,e==null?void 0:e.id,r,i]),W.useEffect(()=>{g.current&&(g.current.scrollTop=g.current.scrollHeight)},[f,c.length]);const y=v.current,M=y==null?void 0:y[l],T=!!(M&&f<M.text.length),b=M?M.text.slice(0,f):"",w=W.useCallback(()=>{const F=v.current;if(!F||r==="challenge"||r==="complete")return;const B=F[l];if(!B)return;if(T){clearInterval(d.current),h(B.text.length);return}if(r==="intro"&&B.type==="mission"){const z=xM(B.missionId);o(z),p([]),s("challenge");return}const D=[...c,B.text];if(B.isLast||l+1>=F.length){p(D),_(!0),r==="success"&&s("complete");return}p(D),u(z=>z+1)},[r,l,T,c]),S=W.useCallback(()=>{a&&(Oh(),n==null||n(a.id,a.success.worldEffect),u(0),h(0),p([]),_(!1),s("success"))},[a,n]);W.useEffect(()=>{if(!i)return;const F=B=>{B.code==="Escape"&&t()};return window.addEventListener("keydown",F),()=>window.removeEventListener("keydown",F)},[i,t]),W.useEffect(()=>{if(!i||r==="challenge")return;const F=B=>{(B.code==="Space"||B.code==="Enter")&&(B.preventDefault(),w())};return window.addEventListener("keydown",F),()=>window.removeEventListener("keydown",F)},[i,r,w]);const x=r==="success"||r==="complete",P=["terminal-panel",x?"terminal-panel--success":""].filter(Boolean).join(" "),R=x?XM[(L=a==null?void 0:a.success)==null?void 0:L.worldEffect]??"ALL SYSTEMS NOMINAL":(e==null?void 0:e.statusLine)??"";return I.jsx("div",{className:`terminal-backdrop${i?" open":""}`,onClick:F=>{F.target===F.currentTarget&&t()},children:e&&I.jsxs("div",{className:P,children:[I.jsx("div",{className:"terminal-scanlines"}),I.jsxs("div",{className:"t-header",children:[I.jsxs("div",{className:"t-header-left",children:[I.jsx("span",{className:`t-dot${x?" t-dot--success":""}`}),I.jsx("span",{className:"t-label",children:e.label}),e.offline&&I.jsx("span",{className:"t-offline-badge",children:"OFFLINE"}),r==="challenge"&&a&&I.jsx("span",{className:"t-mission-badge t-mission-badge--active",children:a.title}),r==="complete"&&I.jsx("span",{className:"t-mission-badge t-mission-badge--done",children:"Mission Complete"})]}),I.jsxs("div",{className:"t-header-right",children:[I.jsx("span",{className:"t-esc-hint",children:"ESC to close"}),I.jsx("button",{className:"t-close-btn",onClick:t,"aria-label":"Close terminal",children:"✕"})]})]}),I.jsxs("div",{className:"t-statusbar",children:[I.jsx("span",{className:`t-status-dot${e.offline&&!x?" t-status-dot--offline":""}`}),I.jsx("span",{className:"t-status-text",children:R})]}),r!=="challenge"&&I.jsxs("div",{className:"t-body",ref:g,children:[c.map((F,B)=>I.jsxs("div",{className:"t-history-msg",children:[I.jsx("div",{className:"t-ai-tag",children:e.ai.name}),I.jsx("p",{className:"t-msg-text t-msg-old",children:F})]},B)),!m&&M&&I.jsxs("div",{className:"t-current-msg",onClick:w,children:[I.jsxs("div",{className:"t-ai-tag",children:[e.ai.name,I.jsx("span",{className:"t-ai-title",children:e.ai.title})]}),I.jsxs("p",{className:"t-msg-text",children:[b,T&&I.jsx("span",{className:"t-cursor",children:"▋"})]})]}),m&&r==="intro"&&I.jsxs("div",{className:"t-done",children:[I.jsx("span",{className:"t-done-line"}),I.jsx("span",{className:"t-done-text",children:"End of transmission"}),I.jsx("span",{className:"t-done-line"})]})]}),r==="challenge"&&a&&I.jsx(WM,{mission:a,onSuccess:S}),r!=="challenge"&&I.jsx("div",{className:"t-footer",children:r==="complete"?I.jsx("button",{className:"t-action-btn t-mission-complete-btn",onClick:t,children:"[ Mission Complete — Close Terminal ]"}):m?I.jsx("button",{className:"t-action-btn t-close-action",onClick:t,children:"[ Close Terminal ]"}):I.jsx("button",{className:`t-action-btn${T?" t-btn-skip":""}`,onClick:w,children:T?"[ Skip ▶▶ ]":"[ Continue ▶ ]"})})]})})}const Tl=[{id:"power",label:"Power Systems",desc:"Reactor core and power distribution",terminalId:"power",missionId:"power_restoration"},{id:"fuel",label:"Fuel Systems",desc:"Propellant management and flow control",terminalId:"fuel",missionId:"fuel_calculation"},{id:"nav",label:"Navigation",desc:"Guidance computer and trajectory",terminalId:"nav",missionId:"nav_calibration"},{id:"comms",label:"Communications",desc:"Broadcast array and signal routing",terminalId:"comms",missionId:"comms_signal"},{id:"diagnostics",label:"Diagnostics",desc:"System scan and fault detection",terminalId:"diagnostics",missionId:"diagnostics_scan"},{id:"engine",label:"Engine Core",desc:"Primary thruster ignition sequence",terminalId:"engine",missionId:"engine_ignition"}],U0=Tl.map(e=>e.missionId),kh="launch_seq_v1";function bl(){return{completedMissions:[],version:1}}function YM(){try{const e=localStorage.getItem(kh);if(!e)return bl();const t=JSON.parse(e);return Array.isArray(t.completedMissions)?t:bl()}catch{return bl()}}function qM(e){try{localStorage.setItem(kh,JSON.stringify(e))}catch{}}function Bh(e,t){if(e.completedMissions.includes(t))return e;const n={...e,completedMissions:[...e.completedMissions,t]};return qM(n),n}function nr(e,t){return e.completedMissions.includes(t)}function KM(){try{localStorage.removeItem(kh)}catch{}return bl()}function ZM({progress:e}){const t=Tl.filter(i=>nr(e,i.missionId)).length,n=Tl.length;return I.jsxs("div",{className:"progress-panel",children:[I.jsxs("div",{className:"pp-header",children:[I.jsx("span",{className:"pp-title",children:"Rocket Systems"}),I.jsxs("span",{className:"pp-count",children:[I.jsx("span",{className:"pp-count-num",children:t}),I.jsx("span",{className:"pp-count-sep",children:"/"}),I.jsx("span",{className:"pp-count-total",children:n})]})]}),I.jsx("div",{className:"pp-systems",children:Tl.map(i=>{const r=nr(e,i.missionId);return I.jsxs("div",{className:`pp-system${r?" pp-system--online":" pp-system--locked"}`,children:[I.jsx("span",{className:"pp-dot"}),I.jsx("span",{className:"pp-name",children:i.label}),I.jsx("span",{className:"pp-badge",children:r?"Online":"Locked"})]},i.id)})}),I.jsx("div",{className:"pp-bar-track",children:I.jsx("div",{className:"pp-bar-fill",style:{width:`${t/n*100}%`}})})]})}const F0={id:"power",label:"Power Systems",statusLine:"REACTOR CORE · DISTRIBUTION FAULT · ARRAY B OFFLINE",ai:{name:"ARIA",title:"Adaptive Response Intelligence"},sequence:[{text:"Commander. The power distribution script has a critical fault. Thruster Array B is drawing zero current. The reactor is running — but the energy is not reaching the module."},{text:"A spacecraft's power system distributes electrical current from the reactor to every module on board. If the distribution script fails to read the correct value, a module loses power entirely. Reactor output makes no difference — the module is simply unreachable."},{text:"This script stores the power level in a variable — a named container the system looks up by name. If the name used to retrieve that value doesn't exactly match the name it was stored under, the system throws a reference error. The module stays offline."},{text:"The fault script is on your terminal. The variable is declared correctly — but it is being referenced by the wrong name. Fix the reference. Restore power to Thruster Array B.",type:"mission",missionId:"power_restoration"}]},O0={id:"nav",label:"Navigation",statusLine:"GUIDANCE COMPUTER · TRAJECTORY LOGIC FAULT",ai:{name:"ARIA",title:"Adaptive Response Intelligence"},sequence:[{text:"Commander. The guidance computer has flagged a logic fault in the trajectory script. The script is supposed to confirm whether current velocity is sufficient for orbital insertion — but it is producing an incorrect result on every evaluation."},{text:"A guidance computer makes real-time decisions during flight — checking whether speed, altitude, and trajectory meet the conditions required for each mission phase. If the decision logic is wrong, the computer will execute the wrong path even when all other systems are nominal."},{text:"This script makes a decision using a conditional — an if statement that checks whether a condition is true. The fault is in the comparison operator. The assignment operator `=` stores a value into a variable. The comparison operator `>=` checks whether a value meets a threshold. They look almost identical but do opposite things."},{text:"The fault script is on your terminal. One character separates a correct comparison from a broken assignment. Fix the operator. Confirm the trajectory check.",type:"mission",missionId:"nav_calibration"}]},k0={id:"fuel",label:"Fuel Systems",statusLine:"FUEL SYSTEM · THRUST NEGATIVE · PROPULSION LINE SHUT DOWN",ai:{name:"ARIA",title:"Adaptive Response Intelligence"},sequence:[{text:"Commander. The fuel flow controller has shut down the propulsion line. Thrust output is reading negative — a physically impossible value that caused the system to reject the engine command automatically."},{text:"Rocket thrust is produced by burning propellant and expelling exhaust at high velocity. The controller calculates the force from two values: how fast propellant flows into the combustion chamber, and how fast exhaust exits the nozzle. These two quantities must be multiplied together. The wrong arithmetic operation produces a result that violates the system's safety limits."},{text:"This calculation uses number arithmetic. JavaScript provides four operators: addition, subtraction, multiplication, and division. Each produces a fundamentally different result. The wrong operator here causes the thrust value to collapse below zero — a value the engine controller cannot act on."},{text:"The fault script is on your terminal. One arithmetic operator needs to be changed. Restore a valid positive thrust value to clear the engine command.",type:"mission",missionId:"fuel_calculation"}]},B0={id:"comms",label:"Communications",statusLine:"COMMUNICATIONS · REFERENCE ERROR · BROADCAST OFFLINE",ai:{name:"ARIA",title:"Adaptive Response Intelligence"},sequence:[{text:"Commander. The communications array is offline. The broadcast controller is throwing a reference error — the transmission script is attempting to read a variable that does not exist. No signal is being transmitted."},{text:"A spacecraft's communications system transmits status logs, telemetry data, and control confirmations to mission control and onboard systems. Every transmission is assembled as a text string — a sequence of characters built from system data. If the script cannot read a required value, the message cannot be constructed."},{text:"This script assembles the broadcast using string concatenation — joining values together with the `+` operator. The fault is a variable name mismatch: the script references a name that was never declared. JavaScript throws a ReferenceError and halts the transmission entirely."},{text:"The fault script is on your terminal. The declared variable and the referenced variable are not the same name. Correct the reference. Restore the broadcast.",type:"mission",missionId:"comms_signal"}]},z0={id:"diagnostics",label:"Diagnostics",statusLine:"DIAGNOSTICS · SCAN UNDERREPORTING · INDEX FAULT",ai:{name:"ARIA",title:"Adaptive Response Intelligence"},sequence:[{text:"Commander. The diagnostic scanner is reporting incorrect data. It shows three systems online — four are active. The scan is silently missing one system on every pass. No fault alert has been raised."},{text:"A spacecraft's diagnostic system runs automated scans of every subsystem — checking status, temperature, power draw, and response time. The scan moves through each system one by one in sequence. If the scan routine starts at the wrong position, one or more systems are never checked — and no error is generated."},{text:"This scan uses a loop — a block of code that repeats an action for each item in a list. The loop counter controls where the scan begins. JavaScript arrays are zero-indexed: the first element is at position zero, not position one. A loop starting at index 1 silently skips the first system on every execution."},{text:"The fault script is on your terminal. The loop is starting one position too late. Correct the starting index. Ensure all four systems are included in every scan.",type:"mission",missionId:"diagnostics_scan"}]},G0={id:"engine",label:"Engine Core",statusLine:"ENGINE CORE · ISP ZERO · IGNITION BLOCKED",ai:{name:"ARIA",title:"Adaptive Response Intelligence"},sequence:[{text:"Commander. The engine core is blocked. The ignition controller is reporting a specific impulse value of zero — a physically impossible reading that is preventing the ignition sequence from being authorised."},{text:"Specific impulse measures how efficiently a rocket engine uses its propellant. It is one of the primary values the ignition system uses to confirm the engine is ready for operation. The calculation exists in the control script. The issue is not the calculation itself — the calculation is never executed."},{text:"This script defines a function — a named, reusable block of instructions. Defining a function does not execute it. The function only runs when it is explicitly called by name. If the return value of that function is never assigned to a variable, the result is discarded and the system reads zero."},{text:"The fault script is on your terminal. The function exists. It is correct. It is never called. Fix the call and capture the return value. Confirm the Isp reading.",type:"mission",missionId:"engine_ignition"}]},QM={[F0.id]:F0,[O0.id]:O0,[k0.id]:k0,[B0.id]:B0,[z0.id]:z0,[G0.id]:G0};function JM(e,t){return{id:e,label:t??e,statusLine:"TERMINAL OFFLINE",offline:!0,ai:{name:"ARIA",title:"Adaptive Response Intelligence"},sequence:[{text:`${t??e} terminal is currently offline. It will come online as you progress through the station.`,isLast:!0}]}}function V0(e,t){return QM[e]??JM(e,t)}const H0=260,e2=[{key:"c9",threshold:9.4,from:"control",msg:"T-nine — systems nominal."},{key:"c7",threshold:7.4,from:"control",msg:"T-seven — fuel pressurised."},{key:"c5",threshold:5.4,from:"control",msg:"T-five — computer armed."},{key:"c3",threshold:3.4,from:"crew",msg:"T-three — go for engine start."},{key:"c2",threshold:2.4,from:"control",msg:"T-two — you are go for launch."},{key:"c1",threshold:1.4,from:"crew",msg:"T-one — ignition sequence start."}],t2=12,n2=80,Ta=typeof window<"u"&&(window.matchMedia("(pointer: coarse)").matches||window.matchMedia("(hover: none)").matches||"ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0||/Android|iPhone|iPad|iPod|Samsung|SamsungBrowser/i.test(navigator.userAgent)),i2=Ta?55:120,Do=[{id:"power",label:"Power Systems",relX:-.35},{id:"fuel",label:"Fuel Systems",relX:-.21},{id:"nav",label:"Navigation",relX:-.07},{id:"comms",label:"Communications",relX:.07},{id:"diagnostics",label:"Diagnostics",relX:.21},{id:"engine",label:"Engine Core",relX:.35}],r2={power:"powerRestored",fuel:"fuelOnline",nav:"navCalibrated",comms:"commsOnline",diagnostics:"diagnosticsOnline",engine:"engineOnline"};function s2(e){return e>8?"SYSTEMS CHECK":e>6?"FUEL PRESSURISATION":e>4?"GUIDANCE COMPUTER ARMED":e>3?"MAIN ENGINE START":e>1?"ALL SYSTEMS GO":"IGNITION SEQUENCE START"}function a2({progress:e,onMissionComplete:t,autoLaunch:n,onLaunchComplete:i}){var Be;const r=W.useRef(null),s=W.useRef({x:0,y:0,vx:0}),a=W.useRef([]),o=W.useRef(0),l=W.useRef({W:1,H:1}),u=W.useRef(!1),f=W.useCallback(q=>({powerRestored:nr(q,"power_restoration"),fuelOnline:nr(q,"fuel_calculation"),navCalibrated:nr(q,"nav_calibration"),commsOnline:nr(q,"comms_signal"),diagnosticsOnline:nr(q,"diagnostics_scan"),engineOnline:nr(q,"engine_ignition")}),[]),[h,c]=W.useState(null),[p,m]=W.useState(null),[_,g]=W.useState(()=>f(e)),[d,v]=W.useState(null),[y,M]=W.useState(10),T=W.useRef(!1),b=W.useRef(_),w=W.useRef(null),S=W.useRef(10),x=W.useRef(yM()),P=W.useRef(!1),R=W.useRef([]),L=W.useRef(null),F=W.useRef(i),B=W.useRef(null),D=W.useRef(new Set),z=W.useRef(null),H=W.useRef(null),U=W.useRef({}),[j,J]=W.useState([]),[se,ce]=W.useState("--:--:--"),[Ie,ke]=W.useState({x:0,y:0}),Le=W.useRef({active:!1,cx:0,cy:0});W.useEffect(()=>{F.current=i},[i]),W.useEffect(()=>{const q=()=>{const K=new Date,le=String(K.getHours()).padStart(2,"0"),A=String(K.getMinutes()).padStart(2,"0"),E=String(K.getSeconds()).padStart(2,"0");ce(`${le}:${A}:${E}`)};q();const _e=setInterval(q,1e3);return()=>clearInterval(_e)},[]),W.useEffect(()=>{var q,_e;d==="countdown"?(BM(),B.current=FM()):d==="ignition"?((q=B.current)==null||q.stop(),B.current=null,OM()):(!d||d==="complete")&&((_e=B.current)==null||_e.stop(),B.current=null)},[d]),W.useEffect(()=>()=>{var q;(q=B.current)==null||q.stop()},[]),W.useEffect(()=>{g(f(e))},[e,f]),W.useEffect(()=>{b.current=_},[_]),W.useEffect(()=>RM(),[]),W.useEffect(()=>{p&&!L.current&&LM(),!p&&L.current&&DM(),L.current=p},[p]),W.useEffect(()=>{T.current=p!==null},[p]),W.useEffect(()=>{w.current=d,x.current.phaseTransitioned=!1},[d]),W.useEffect(()=>{if(!n)return;const q=setTimeout(()=>{const _e=x.current;_e.phaseTime=0,_e.countdownTimer=10,_e.rocketAscent=0,_e.cameraOffset=0,_e.shakeX=0,_e.shakeY=0,_e.flashAlpha=0,_e.alarmAlpha=0,_e.fadeAlpha=0,_e.ignitionLevel=.3,_e.particles=[],_e.phaseTransitioned=!1,S.current=10,P.current=!0,D.current=new Set,J([]),M(10),v("countdown")},1200);return()=>clearTimeout(q)},[]);const ee=O1();W.useEffect(()=>{function q(){const _e=r.current;if(!_e)return;const K=_e.clientWidth,le=_e.clientHeight;_e.width=K,_e.height=le,l.current={W:K,H:le};const A=le*.82;u.current?(s.current.y=A,s.current.x=Math.max(30,Math.min(K-30,s.current.x))):(s.current={x:K/2,y:A,vx:0},a.current=G1(i2,K,le),R.current=k1(Ta?20:55,K,le),u.current=!0)}return q(),window.addEventListener("resize",q),()=>window.removeEventListener("resize",q)},[]),W.useEffect(()=>{function q(_e){if(_e.code==="KeyE"&&h&&!T.current&&!w.current){const K=Do.find(le=>le.id===h);m(V0(h,K==null?void 0:K.label))}}return window.addEventListener("keydown",q),()=>window.removeEventListener("keydown",q)},[h]);const pe=30,fe=9,Pe=W.useCallback((q,_e,K,le)=>{const A=q-K,E=_e-le,N=Math.sqrt(A*A+E*E),X=N>pe?A/N*pe:A,ne=N>pe?E/N*pe:E;ke({x:X,y:ne}),ee.current.ArrowLeft=A<-fe,ee.current.ArrowRight=A>fe},[ee]),ze=W.useCallback(q=>{q.preventDefault();const _e=q.touches[0],K=q.currentTarget.getBoundingClientRect(),le=K.left+K.width/2,A=K.top+K.height/2;Le.current={active:!0,cx:le,cy:A},Pe(_e.clientX,_e.clientY,le,A)},[Pe]),Fe=W.useCallback(q=>{q.preventDefault();const _e=Le.current;_e.active&&Pe(q.touches[0].clientX,q.touches[0].clientY,_e.cx,_e.cy)},[Pe]),nt=W.useCallback(q=>{q.preventDefault(),Le.current.active=!1,ee.current.ArrowLeft=!1,ee.current.ArrowRight=!1,ke({x:0,y:0})},[ee]),We=W.useCallback(()=>{if(!h||T.current||w.current)return;const q=Do.find(_e=>_e.id===h);m(V0(h,q==null?void 0:q.label))},[h]),Qe=W.useCallback((q,_e)=>{t==null||t(q,_e)},[t]),ut=W.useCallback(q=>{const _e=r.current;if(!_e||!u.current)return;const K=_e.getContext("2d"),{W:le,H:A}=l.current,E=s.current,N=x.current,X=w.current;o.current+=q;const ne=o.current;if(!T.current&&(!X||X==="countdown")){const oe=ee.current.KeyA||ee.current.ArrowLeft,Te=ee.current.KeyD||ee.current.ArrowRight;E.vx+=((Te?H0:oe?-H0:0)-E.vx)*Math.min(t2*q,1),E.x=Math.max(30,Math.min(le-30,E.x+E.vx*q))}else E.vx*=.88;if(X==="countdown"){N.phaseTime+=q,N.countdownTimer=Math.max(0,10-N.phaseTime);const oe=N.phaseTime/10;N.shakeX=Math.sin(ne*48)*oe*oe*2.8,N.shakeY=Math.cos(ne*37)*oe*oe*2.8,N.alarmAlpha=.22*(.5+.5*Math.sin(ne*5.5)),N.ignitionLevel=Math.max(.3,Math.min(1,(N.phaseTime-6)/4)),N.phaseTime>3.5&&Math.random()<oe*12*q&&lc(N,le/2,A*.55+22);const Te=Math.max(0,Math.ceil(N.countdownTimer));Te!==S.current&&(S.current=Te,M(Te),Te>0&&UM(Te)),B.current&&B.current.setLevel(Math.max(0,(N.ignitionLevel-.3)/.7)),e2.forEach(({key:Ge,threshold:k,from:ge,msg:ie})=>{!D.current.has(Ge)&&N.countdownTimer<=k&&(D.current.add(Ge),J(we=>[...we.slice(-4),{from:ge,msg:ie,id:Ge}]),zM(ie,ge))}),N.phaseTime>=10&&!N.phaseTransitioned&&(N.phaseTransitioned=!0,N.flashAlpha=1,N.alarmAlpha=0,N.ignitionLevel=1,N.phaseTime=0,M(0),v("ignition"))}if(X==="ignition"){N.phaseTime+=q,N.flashAlpha=Math.max(0,N.flashAlpha*Math.pow(.82,q*60)),N.ignitionLevel=1;const oe=7+Math.sin(ne*80)*3;N.shakeX=(Math.random()-.5)*oe,N.shakeY=(Math.random()-.5)*oe,Math.random()<.9&&lc(N,le/2,A*.55+25),Math.random()<.75&&A0(N,le/2,A*.55+25),N.phaseTime>=1.6&&!N.phaseTransitioned&&(N.phaseTransitioned=!0,N.phaseTime=0,N.rocketAscent=0,v("liftoff"))}if(X==="liftoff"){N.phaseTime+=q,N.rocketAscent-=(160+N.phaseTime*N.phaseTime*65)*q;const oe=Math.max(0,-N.rocketAscent-A*.12);N.cameraOffset+=(oe-N.cameraOffset)*Math.min(3.5*q,.95);const Te=Math.max(0,5.5-N.phaseTime*2);N.shakeX=(Math.random()-.5)*Te,N.shakeY=(Math.random()-.5)*Te,Math.random()<.8&&A0(N,le/2,A*.55+N.rocketAscent+22),Math.random()<.35&&lc(N,le/2,A*.55+N.rocketAscent+35),Math.random()<.22&&MM(N,le/2,A*.55+N.rocketAscent+8),N.rocketAscent<-A*1.35&&!N.phaseTransitioned&&(N.phaseTransitioned=!0,N.phaseTime=0,v("ascent"))}if(X==="ascent"){N.phaseTime+=q,N.rocketAscent-=(550+N.phaseTime*280)*q;const oe=Math.max(0,-N.rocketAscent-A*.12);N.cameraOffset+=(oe-N.cameraOffset)*Math.min(5*q,.98),N.shakeX=0,N.shakeY=0,N.phaseTime>1.5&&(N.fadeAlpha=Math.min(1,(N.phaseTime-1.5)/2.2)),N.phaseTime>=4.5&&!N.phaseTransitioned&&(N.phaseTransitioned=!0,v("complete"),F.current&&setTimeout(F.current,700))}EM(N,q);const ve=Do.map(oe=>({...oe,x:le/2+oe.relX*le,y:A*.72}));if(X)h!==null&&c(null);else{let oe=null;ve.forEach(Te=>{const Ge=E.x-Te.x,k=E.y-Te.y;Math.sqrt(Ge*Ge+k*k)<n2&&(oe=Te.id)}),c(Te=>Te===oe?Te:oe)}const Q=b.current,te=Q.powerRestored||!!X,Se=A*.55+N.rocketAscent;z.current||(z.current=uM(le,A));const Me=T.current||!!X;if(!Me){const oe=U.current,Te=["powerRestored","fuelOnline","navCalibrated","commsOnline","diagnosticsOnline","engineOnline"];for(let Ge=0;Ge<Te.length;Ge++)if(Q[Te[Ge]]&&!oe[Te[Ge]]){fM(z.current,le/2);break}U.current={...Q}}cM(z.current,q,le,A,Me),H.current||(H.current=pM(le,A)),X||mM(H.current,q,le,A),iM(K,le,A,ne),N.alarmAlpha>.005&&X1(K,le,A,N.alarmAlpha),K.save(),K.translate(Math.round(N.shakeX),Math.round(N.shakeY-N.cameraOffset)),V1(K,a.current,ne),Y1(K,le,A,ne),SM(K,le,A),j1(K,le,te),W1(K,le,A,le/2),rM(K,le/2,Se,A,ne),tM(K,le/2,Se,ne),X||(hM(K,z.current,ne),gM(K,H.current,ne)),te&&Z1(K,le,A,ne),(!X||X==="countdown")&&(B1(R.current,q,le,A),z1(K,R.current,ne)),bM(K,N),Q.navCalibrated&&(!X||X==="countdown")&&Q1(K,le/2,Se,le,A,ne),TM(K,le/2,Se,N.ignitionLevel),sM(K,le/2,Se,ne);const re=Se-232;$1(K,le/2,Se,re,le,A,ne),q1(K,le/2,Se,ne,te,N.ignitionLevel),(!X||X==="countdown")&&(ve.forEach(oe=>{const Te=!!Q[r2[oe.id]];eM(K,oe.x,oe.y,oe.label,!X&&oe.id===h,ne,Te)}),Q.powerRestored&&K1(K,ve,ne));const ae=X==="countdown"?Math.max(0,Math.min(1,N.countdownTimer/2)):X?0:1;ae>.01&&(K.save(),K.globalAlpha=ae,nM(K,E.x,E.y,E.vx,ne),K.restore()),K.restore(),N.flashAlpha>.01&&(K.fillStyle=`rgba(255,248,225,${Math.min(1,N.flashAlpha)})`,K.fillRect(0,0,le,A)),N.fadeAlpha>.005&&(K.fillStyle=`rgba(2,5,18,${Math.min(1,N.fadeAlpha)})`,K.fillRect(0,0,le,A))},[ee]);Lh(ut);const me=h?(Be=Do.find(q=>q.id===h))==null?void 0:Be.label:null,ot=()=>{if(P.current)return;const q=x.current;q.phaseTime=0,q.countdownTimer=10,q.rocketAscent=0,q.cameraOffset=0,q.shakeX=0,q.shakeY=0,q.flashAlpha=0,q.alarmAlpha=0,q.fadeAlpha=0,q.ignitionLevel=.3,q.particles=[],q.phaseTransitioned=!1,S.current=10,P.current=!0,D.current=new Set,J([]),M(10),v("countdown")},Je=d&&d!=="complete",He=y<=3,O=_;return I.jsxs("div",{style:{position:"relative",width:"100%",height:"100%"},children:[I.jsx("canvas",{ref:r,className:"hangar-canvas"}),I.jsx("div",{className:"game-vignette"}),!d&&I.jsxs("div",{className:"hud-overlay",children:[I.jsxs("div",{className:"hud-chip",children:["Phase ",I.jsx("span",{children:"Rocket Builder"})]}),I.jsxs("div",{className:"hud-chip",children:["Bay ",I.jsx("span",{children:"Hangar 1"})]}),O.powerRestored&&I.jsxs("div",{className:"hud-chip hud-chip--online",children:["Power       ",I.jsx("span",{children:"Online"})]}),O.fuelOnline&&I.jsxs("div",{className:"hud-chip hud-chip--online",children:["Fuel        ",I.jsx("span",{children:"Online"})]}),O.navCalibrated&&I.jsxs("div",{className:"hud-chip hud-chip--online",children:["Navigation  ",I.jsx("span",{children:"Online"})]}),O.commsOnline&&I.jsxs("div",{className:"hud-chip hud-chip--online",children:["Comms       ",I.jsx("span",{children:"Online"})]}),O.diagnosticsOnline&&I.jsxs("div",{className:"hud-chip hud-chip--online",children:["Diagnostics ",I.jsx("span",{children:"Online"})]}),O.engineOnline&&I.jsxs("div",{className:"hud-chip hud-chip--online",children:["Engine      ",I.jsx("span",{children:"Online"})]})]}),me&&!p&&!d&&!Ta&&I.jsxs("div",{className:"interact-prompt",children:[I.jsx("kbd",{children:"E"})," Interact · ",me]}),!d&&I.jsx("button",{className:"dev-launch-btn",onClick:ot,children:"▶ BEGIN LAUNCH"}),!d&&I.jsx(ZM,{progress:e}),!d&&!Ta&&I.jsxs("div",{className:"controls-hint",children:[I.jsxs("div",{children:[I.jsx("kbd",{className:"ck",children:"A"}),I.jsx("kbd",{className:"ck",children:"D"})," Move"]}),I.jsxs("div",{children:[I.jsx("kbd",{className:"ck",children:"E"})," Interact"]})]}),!d&&Ta&&I.jsxs("div",{className:"mobile-controls",children:[I.jsx("div",{className:"mobile-joystick",onTouchStart:ze,onTouchMove:Fe,onTouchEnd:nt,onTouchCancel:nt,"aria-label":"Move character",children:I.jsx("div",{className:"joystick-nub",style:{transform:`translate(${Ie.x}px, ${Ie.y}px)`}})}),me&&!p&&I.jsx("button",{className:"mobile-btn mobile-btn--interact",onTouchStart:q=>{q.preventDefault(),We()},"aria-label":"Interact",children:"E"})]}),Je&&I.jsxs("div",{className:"launch-overlay",children:[d==="countdown"&&I.jsxs(I.Fragment,{children:[I.jsx("div",{className:"launch-warning",children:"Launch Sequence Initiated"}),I.jsx("div",{className:`launch-countdown${He?" launch-countdown--critical":""}`,children:y}),I.jsx("div",{className:"launch-status",children:s2(y)})]}),d==="ignition"&&I.jsx("div",{className:"launch-event launch-event--ignition",children:"Ignition"}),d==="liftoff"&&I.jsx("div",{className:"launch-event launch-event--liftoff",children:"Liftoff"}),j.length>0&&I.jsx("div",{className:"launch-comms",children:j.map(q=>I.jsxs("div",{className:`launch-comms-line launch-comms-line--${q.from}`,children:[I.jsx("span",{className:"comms-from",children:q.from==="crew"?"CREW":"MC"}),q.msg]},q.id))})]}),I.jsx($M,{terminal:p,onClose:()=>m(null),onMissionComplete:Qe}),!d&&I.jsxs("div",{className:"game-status-bar",children:[I.jsxs("span",{className:"gsb-left",children:["MISSION STATUS: ",I.jsx("em",{children:"STANDBY"})]}),I.jsxs("span",{className:"gsb-right",children:["SYSTEM TIME: ",I.jsx("em",{children:se})]})]})]})}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const zh="184",o2=0,W0=1,l2=2,wl=1,u2=2,ba=3,_i=0,_n=1,fi=2,Ui=0,Wr=1,iu=2,j0=3,X0=4,c2=5,Dr=100,f2=101,d2=102,h2=103,p2=104,m2=200,g2=201,v2=202,_2=203,Hf=204,Wf=205,S2=206,y2=207,M2=208,E2=209,T2=210,b2=211,w2=212,x2=213,A2=214,jf=0,Xf=1,$f=2,Xs=3,Yf=4,qf=5,Kf=6,Zf=7,Gh=0,C2=1,R2=2,gi=0,v_=1,__=2,S_=3,Vh=4,y_=5,M_=6,E_=7,T_=300,Kr=301,$s=302,cc=303,fc=304,Pu=306,Qf=1e3,Ni=1001,Jf=1002,jt=1003,P2=1004,Uo=1005,en=1006,dc=1007,zr=1008,bn=1009,b_=1010,w_=1011,to=1012,Hh=1013,Si=1014,di=1015,Gi=1016,Wh=1017,jh=1018,no=1020,x_=35902,A_=35899,C_=1021,R_=1022,Zn=1023,Vi=1026,Gr=1027,P_=1028,Xh=1029,Zr=1030,$h=1031,Yh=1033,xl=33776,Al=33777,Cl=33778,Rl=33779,ed=35840,td=35841,nd=35842,id=35843,rd=36196,sd=37492,ad=37496,od=37488,ld=37489,ru=37490,ud=37491,cd=37808,fd=37809,dd=37810,hd=37811,pd=37812,md=37813,gd=37814,vd=37815,_d=37816,Sd=37817,yd=37818,Md=37819,Ed=37820,Td=37821,bd=36492,wd=36494,xd=36495,Ad=36283,Cd=36284,su=36285,Rd=36286,I2=3200,Pd=0,N2=1,sr="",Ln="srgb",au="srgb-linear",ou="linear",ft="srgb",ss=7680,$0=519,L2=512,D2=513,U2=514,qh=515,F2=516,O2=517,Kh=518,k2=519,Y0=35044,q0="300 es",hi=2e3,io=2001;function B2(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function lu(e){return document.createElementNS("http://www.w3.org/1999/xhtml",e)}function z2(){const e=lu("canvas");return e.style.display="block",e}const K0={};function Z0(...e){const t="THREE."+e.shift();console.log(t,...e)}function I_(e){const t=e[0];if(typeof t=="string"&&t.startsWith("TSL:")){const n=e[1];n&&n.isStackTrace?e[0]+=" "+n.getLocation():e[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return e}function Ve(...e){e=I_(e);const t="THREE."+e.shift();{const n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function st(...e){e=I_(e);const t="THREE."+e.shift();{const n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function Id(...e){const t=e.join(" ");t in K0||(K0[t]=!0,Ve(...e))}function G2(e,t,n){return new Promise(function(i,r){function s(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:r();break;case e.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}const V2={[jf]:Xf,[$f]:Kf,[Yf]:Zf,[Xs]:qf,[Xf]:jf,[Kf]:$f,[Zf]:Yf,[qf]:Xs};class es{addEventListener(t,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(n)===-1&&i[t].push(n)}hasEventListener(t,n){const i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(n)!==-1}removeEventListener(t,n){const i=this._listeners;if(i===void 0)return;const r=i[t];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(t){const n=this._listeners;if(n===void 0)return;const i=n[t.type];if(i!==void 0){t.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,t);t.target=null}}}const Zt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],hc=Math.PI/180,Nd=180/Math.PI;function uo(){const e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Zt[e&255]+Zt[e>>8&255]+Zt[e>>16&255]+Zt[e>>24&255]+"-"+Zt[t&255]+Zt[t>>8&255]+"-"+Zt[t>>16&15|64]+Zt[t>>24&255]+"-"+Zt[n&63|128]+Zt[n>>8&255]+"-"+Zt[n>>16&255]+Zt[n>>24&255]+Zt[i&255]+Zt[i>>8&255]+Zt[i>>16&255]+Zt[i>>24&255]).toLowerCase()}function tt(e,t,n){return Math.max(t,Math.min(n,e))}function H2(e,t){return(e%t+t)%t}function pc(e,t,n){return(1-n)*e+n*t}function ca(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw new Error("Invalid component type.")}}function fn(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw new Error("Invalid component type.")}}const ip=class ip{constructor(t=0,n=0){this.x=t,this.y=n}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,n){return this.x=t,this.y=n,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const n=this.x,i=this.y,r=t.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,n){return this.x=tt(this.x,t.x,n.x),this.y=tt(this.y,t.y,n.y),this}clampScalar(t,n){return this.x=tt(this.x,t,n),this.y=tt(this.y,t,n),this}clampLength(t,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(tt(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(t)/n;return Math.acos(tt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,i=this.y-t.y;return n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this}rotateAround(t,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-t.x,a=this.y-t.y;return this.x=s*i-a*r+t.x,this.y=s*r+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};ip.prototype.isVector2=!0;let lt=ip;class Js{constructor(t=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=t,this._y=n,this._z=i,this._w=r}static slerpFlat(t,n,i,r,s,a,o){let l=i[r+0],u=i[r+1],f=i[r+2],h=i[r+3],c=s[a+0],p=s[a+1],m=s[a+2],_=s[a+3];if(h!==_||l!==c||u!==p||f!==m){let g=l*c+u*p+f*m+h*_;g<0&&(c=-c,p=-p,m=-m,_=-_,g=-g);let d=1-o;if(g<.9995){const v=Math.acos(g),y=Math.sin(v);d=Math.sin(d*v)/y,o=Math.sin(o*v)/y,l=l*d+c*o,u=u*d+p*o,f=f*d+m*o,h=h*d+_*o}else{l=l*d+c*o,u=u*d+p*o,f=f*d+m*o,h=h*d+_*o;const v=1/Math.sqrt(l*l+u*u+f*f+h*h);l*=v,u*=v,f*=v,h*=v}}t[n]=l,t[n+1]=u,t[n+2]=f,t[n+3]=h}static multiplyQuaternionsFlat(t,n,i,r,s,a){const o=i[r],l=i[r+1],u=i[r+2],f=i[r+3],h=s[a],c=s[a+1],p=s[a+2],m=s[a+3];return t[n]=o*m+f*h+l*p-u*c,t[n+1]=l*m+f*c+u*h-o*p,t[n+2]=u*m+f*p+o*c-l*h,t[n+3]=f*m-o*h-l*c-u*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,n,i,r){return this._x=t,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,n=!0){const i=t._x,r=t._y,s=t._z,a=t._order,o=Math.cos,l=Math.sin,u=o(i/2),f=o(r/2),h=o(s/2),c=l(i/2),p=l(r/2),m=l(s/2);switch(a){case"XYZ":this._x=c*f*h+u*p*m,this._y=u*p*h-c*f*m,this._z=u*f*m+c*p*h,this._w=u*f*h-c*p*m;break;case"YXZ":this._x=c*f*h+u*p*m,this._y=u*p*h-c*f*m,this._z=u*f*m-c*p*h,this._w=u*f*h+c*p*m;break;case"ZXY":this._x=c*f*h-u*p*m,this._y=u*p*h+c*f*m,this._z=u*f*m+c*p*h,this._w=u*f*h-c*p*m;break;case"ZYX":this._x=c*f*h-u*p*m,this._y=u*p*h+c*f*m,this._z=u*f*m-c*p*h,this._w=u*f*h+c*p*m;break;case"YZX":this._x=c*f*h+u*p*m,this._y=u*p*h+c*f*m,this._z=u*f*m-c*p*h,this._w=u*f*h-c*p*m;break;case"XZY":this._x=c*f*h-u*p*m,this._y=u*p*h-c*f*m,this._z=u*f*m+c*p*h,this._w=u*f*h+c*p*m;break;default:Ve("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,n){const i=n/2,r=Math.sin(i);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const n=t.elements,i=n[0],r=n[4],s=n[8],a=n[1],o=n[5],l=n[9],u=n[2],f=n[6],h=n[10],c=i+o+h;if(c>0){const p=.5/Math.sqrt(c+1);this._w=.25/p,this._x=(f-l)*p,this._y=(s-u)*p,this._z=(a-r)*p}else if(i>o&&i>h){const p=2*Math.sqrt(1+i-o-h);this._w=(f-l)/p,this._x=.25*p,this._y=(r+a)/p,this._z=(s+u)/p}else if(o>h){const p=2*Math.sqrt(1+o-i-h);this._w=(s-u)/p,this._x=(r+a)/p,this._y=.25*p,this._z=(l+f)/p}else{const p=2*Math.sqrt(1+h-i-o);this._w=(a-r)/p,this._x=(s+u)/p,this._y=(l+f)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,n){let i=t.dot(n)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*n.z-t.z*n.y,this._y=t.z*n.x-t.x*n.z,this._z=t.x*n.y-t.y*n.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(tt(this.dot(t),-1,1)))}rotateTowards(t,n){const i=this.angleTo(t);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,n){const i=t._x,r=t._y,s=t._z,a=t._w,o=n._x,l=n._y,u=n._z,f=n._w;return this._x=i*f+a*o+r*u-s*l,this._y=r*f+a*l+s*o-i*u,this._z=s*f+a*u+i*l-r*o,this._w=a*f-i*o-r*l-s*u,this._onChangeCallback(),this}slerp(t,n){let i=t._x,r=t._y,s=t._z,a=t._w,o=this.dot(t);o<0&&(i=-i,r=-r,s=-s,a=-a,o=-o);let l=1-n;if(o<.9995){const u=Math.acos(o),f=Math.sin(u);l=Math.sin(l*u)/f,n=Math.sin(n*u)/f,this._x=this._x*l+i*n,this._y=this._y*l+r*n,this._z=this._z*l+s*n,this._w=this._w*l+a*n,this._onChangeCallback()}else this._x=this._x*l+i*n,this._y=this._y*l+r*n,this._z=this._z*l+s*n,this._w=this._w*l+a*n,this.normalize();return this}slerpQuaternions(t,n,i){return this.copy(t).slerp(n,i)}random(){const t=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(t),r*Math.cos(t),s*Math.sin(n),s*Math.cos(n))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,n=0){return this._x=t[n],this._y=t[n+1],this._z=t[n+2],this._w=t[n+3],this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._w,t}fromBufferAttribute(t,n){return this._x=t.getX(n),this._y=t.getY(n),this._z=t.getZ(n),this._w=t.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const rp=class rp{constructor(t=0,n=0,i=0){this.x=t,this.y=n,this.z=i}set(t,n,i){return i===void 0&&(i=this.z),this.x=t,this.y=n,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,n){return this.x=t.x*n.x,this.y=t.y*n.y,this.z=t.z*n.z,this}applyEuler(t){return this.applyQuaternion(Q0.setFromEuler(t))}applyAxisAngle(t,n){return this.applyQuaternion(Q0.setFromAxisAngle(t,n))}applyMatrix3(t){const n=this.x,i=this.y,r=this.z,s=t.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const n=this.x,i=this.y,r=this.z,s=t.elements,a=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(t){const n=this.x,i=this.y,r=this.z,s=t.x,a=t.y,o=t.z,l=t.w,u=2*(a*r-o*i),f=2*(o*n-s*r),h=2*(s*i-a*n);return this.x=n+l*u+a*h-o*f,this.y=i+l*f+o*u-s*h,this.z=r+l*h+s*f-a*u,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const n=this.x,i=this.y,r=this.z,s=t.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,n){return this.x=tt(this.x,t.x,n.x),this.y=tt(this.y,t.y,n.y),this.z=tt(this.z,t.z,n.z),this}clampScalar(t,n){return this.x=tt(this.x,t,n),this.y=tt(this.y,t,n),this.z=tt(this.z,t,n),this}clampLength(t,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(tt(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,n){const i=t.x,r=t.y,s=t.z,a=n.x,o=n.y,l=n.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(t){const n=t.lengthSq();if(n===0)return this.set(0,0,0);const i=t.dot(this)/n;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return mc.copy(this).projectOnVector(t),this.sub(mc)}reflect(t){return this.sub(mc.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(t)/n;return Math.acos(tt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,i=this.y-t.y,r=this.z-t.z;return n*n+i*i+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,n,i){const r=Math.sin(n)*t;return this.x=r*Math.sin(i),this.y=Math.cos(n)*t,this.z=r*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,n,i){return this.x=t*Math.sin(n),this.y=i,this.z=t*Math.cos(n),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(t){const n=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(t,n){return this.fromArray(t.elements,n*4)}setFromMatrix3Column(t,n){return this.fromArray(t.elements,n*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(t),this.y=n,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};rp.prototype.isVector3=!0;let V=rp;const mc=new V,Q0=new Js,sp=class sp{constructor(t,n,i,r,s,a,o,l,u){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,i,r,s,a,o,l,u)}set(t,n,i,r,s,a,o,l,u){const f=this.elements;return f[0]=t,f[1]=r,f[2]=o,f[3]=n,f[4]=s,f[5]=l,f[6]=i,f[7]=a,f[8]=u,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(t,n,i){return t.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const n=t.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const i=t.elements,r=n.elements,s=this.elements,a=i[0],o=i[3],l=i[6],u=i[1],f=i[4],h=i[7],c=i[2],p=i[5],m=i[8],_=r[0],g=r[3],d=r[6],v=r[1],y=r[4],M=r[7],T=r[2],b=r[5],w=r[8];return s[0]=a*_+o*v+l*T,s[3]=a*g+o*y+l*b,s[6]=a*d+o*M+l*w,s[1]=u*_+f*v+h*T,s[4]=u*g+f*y+h*b,s[7]=u*d+f*M+h*w,s[2]=c*_+p*v+m*T,s[5]=c*g+p*y+m*b,s[8]=c*d+p*M+m*w,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=t,n[4]*=t,n[7]*=t,n[2]*=t,n[5]*=t,n[8]*=t,this}determinant(){const t=this.elements,n=t[0],i=t[1],r=t[2],s=t[3],a=t[4],o=t[5],l=t[6],u=t[7],f=t[8];return n*a*f-n*o*u-i*s*f+i*o*l+r*s*u-r*a*l}invert(){const t=this.elements,n=t[0],i=t[1],r=t[2],s=t[3],a=t[4],o=t[5],l=t[6],u=t[7],f=t[8],h=f*a-o*u,c=o*l-f*s,p=u*s-a*l,m=n*h+i*c+r*p;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/m;return t[0]=h*_,t[1]=(r*u-f*i)*_,t[2]=(o*i-r*a)*_,t[3]=c*_,t[4]=(f*n-r*l)*_,t[5]=(r*s-o*n)*_,t[6]=p*_,t[7]=(i*l-u*n)*_,t[8]=(a*n-i*s)*_,this}transpose(){let t;const n=this.elements;return t=n[1],n[1]=n[3],n[3]=t,t=n[2],n[2]=n[6],n[6]=t,t=n[5],n[5]=n[7],n[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const n=this.elements;return t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8],this}setUvTransform(t,n,i,r,s,a,o){const l=Math.cos(s),u=Math.sin(s);return this.set(i*l,i*u,-i*(l*a+u*o)+a+t,-r*u,r*l,-r*(-u*a+l*o)+o+n,0,0,1),this}scale(t,n){return this.premultiply(gc.makeScale(t,n)),this}rotate(t){return this.premultiply(gc.makeRotation(-t)),this}translate(t,n){return this.premultiply(gc.makeTranslation(t,n)),this}makeTranslation(t,n){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,n,0,0,1),this}makeRotation(t){const n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(t,n){return this.set(t,0,0,0,n,0,0,0,1),this}equals(t){const n=this.elements,i=t.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(t,n=0){for(let i=0;i<9;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){const i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}};sp.prototype.isMatrix3=!0;let je=sp;const gc=new je,J0=new je().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),em=new je().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function W2(){const e={enabled:!0,workingColorSpace:au,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===ft&&(r.r=Fi(r.r),r.g=Fi(r.g),r.b=Fi(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ft&&(r.r=ks(r.r),r.g=ks(r.g),r.b=ks(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===sr?ou:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Id("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),e.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Id("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),e.colorSpaceToWorking(r,s)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return e.define({[au]:{primaries:t,whitePoint:i,transfer:ou,toXYZ:J0,fromXYZ:em,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Ln},outputColorSpaceConfig:{drawingBufferColorSpace:Ln}},[Ln]:{primaries:t,whitePoint:i,transfer:ft,toXYZ:J0,fromXYZ:em,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Ln}}}),e}const et=W2();function Fi(e){return e<.04045?e*.0773993808:Math.pow(e*.9478672986+.0521327014,2.4)}function ks(e){return e<.0031308?e*12.92:1.055*Math.pow(e,.41666)-.055}let as;class j2{static getDataURL(t,n="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{as===void 0&&(as=lu("canvas")),as.width=t.width,as.height=t.height;const r=as.getContext("2d");t instanceof ImageData?r.putImageData(t,0,0):r.drawImage(t,0,0,t.width,t.height),i=as}return i.toDataURL(n)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const n=lu("canvas");n.width=t.width,n.height=t.height;const i=n.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const r=i.getImageData(0,0,t.width,t.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Fi(s[a]/255)*255;return i.putImageData(r,0,0),n}else if(t.data){const n=t.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Fi(n[i]/255)*255):n[i]=Fi(n[i]);return{data:n,width:t.width,height:t.height}}else return Ve("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let X2=0;class Zh{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:X2++}),this.uuid=uo(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?t.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?t.set(n.displayWidth,n.displayHeight,0):n!==null?t.set(n.width,n.height,n.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(vc(r[a].image)):s.push(vc(r[a]))}else s=vc(r);i.url=s}return n||(t.images[this.uuid]=i),i}}function vc(e){return typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap?j2.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(Ve("Texture: Unable to serialize Texture."),{})}let $2=0;const _c=new V;class tn extends es{constructor(t=tn.DEFAULT_IMAGE,n=tn.DEFAULT_MAPPING,i=Ni,r=Ni,s=en,a=zr,o=Zn,l=bn,u=tn.DEFAULT_ANISOTROPY,f=sr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:$2++}),this.uuid=uo(),this.name="",this.source=new Zh(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=u,this.format=o,this.internalFormat=null,this.type=l,this.offset=new lt(0,0),this.repeat=new lt(1,1),this.center=new lt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new je,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(_c).x}get height(){return this.source.getSize(_c).y}get depth(){return this.source.getSize(_c).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const n in t){const i=t[n];if(i===void 0){Ve(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){Ve(`Texture.setValues(): property '${n}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[n]=i}}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==T_)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Qf:t.x=t.x-Math.floor(t.x);break;case Ni:t.x=t.x<0?0:1;break;case Jf:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Qf:t.y=t.y-Math.floor(t.y);break;case Ni:t.y=t.y<0?0:1;break;case Jf:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}tn.DEFAULT_IMAGE=null;tn.DEFAULT_MAPPING=T_;tn.DEFAULT_ANISOTROPY=1;const ap=class ap{constructor(t=0,n=0,i=0,r=1){this.x=t,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,n,i,r){return this.x=t,this.y=n,this.z=i,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this.w=t.w+n.w,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this.w+=t.w*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this.w=t.w-n.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const n=this.x,i=this.y,r=this.z,s=this.w,a=t.elements;return this.x=a[0]*n+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*n+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*n+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*n+a[7]*i+a[11]*r+a[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const n=Math.sqrt(1-t.w*t.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/n,this.y=t.y/n,this.z=t.z/n),this}setAxisAngleFromRotationMatrix(t){let n,i,r,s;const l=t.elements,u=l[0],f=l[4],h=l[8],c=l[1],p=l[5],m=l[9],_=l[2],g=l[6],d=l[10];if(Math.abs(f-c)<.01&&Math.abs(h-_)<.01&&Math.abs(m-g)<.01){if(Math.abs(f+c)<.1&&Math.abs(h+_)<.1&&Math.abs(m+g)<.1&&Math.abs(u+p+d-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const y=(u+1)/2,M=(p+1)/2,T=(d+1)/2,b=(f+c)/4,w=(h+_)/4,S=(m+g)/4;return y>M&&y>T?y<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(y),r=b/i,s=w/i):M>T?M<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(M),i=b/r,s=S/r):T<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(T),i=w/s,r=S/s),this.set(i,r,s,n),this}let v=Math.sqrt((g-m)*(g-m)+(h-_)*(h-_)+(c-f)*(c-f));return Math.abs(v)<.001&&(v=1),this.x=(g-m)/v,this.y=(h-_)/v,this.z=(c-f)/v,this.w=Math.acos((u+p+d-1)/2),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,n){return this.x=tt(this.x,t.x,n.x),this.y=tt(this.y,t.y,n.y),this.z=tt(this.z,t.z,n.z),this.w=tt(this.w,t.w,n.w),this}clampScalar(t,n){return this.x=tt(this.x,t,n),this.y=tt(this.y,t,n),this.z=tt(this.z,t,n),this.w=tt(this.w,t,n),this}clampLength(t,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(tt(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this.w+=(t.w-this.w)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this.w=t.w+(n.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this.w=t[n+3],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t[n+3]=this.w,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this.w=t.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};ap.prototype.isVector4=!0;let Rt=ap;class Y2 extends es{constructor(t=1,n=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:en,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=t,this.height=n,this.depth=i.depth,this.scissor=new Rt(0,0,t,n),this.scissorTest=!1,this.viewport=new Rt(0,0,t,n),this.textures=[];const r={width:t,height:n,depth:i.depth},s=new tn(r),a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(t={}){const n={minFilter:en,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(n.mapping=t.mapping),t.wrapS!==void 0&&(n.wrapS=t.wrapS),t.wrapT!==void 0&&(n.wrapT=t.wrapT),t.wrapR!==void 0&&(n.wrapR=t.wrapR),t.magFilter!==void 0&&(n.magFilter=t.magFilter),t.minFilter!==void 0&&(n.minFilter=t.minFilter),t.format!==void 0&&(n.format=t.format),t.type!==void 0&&(n.type=t.type),t.anisotropy!==void 0&&(n.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(n.colorSpace=t.colorSpace),t.flipY!==void 0&&(n.flipY=t.flipY),t.generateMipmaps!==void 0&&(n.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(n.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(n)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,n,i=1){if(this.width!==t||this.height!==n||this.depth!==i){this.width=t,this.height=n,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=t,this.textures[r].image.height=n,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,t,n),this.scissor.set(0,0,t,n)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++){this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const r=Object.assign({},t.textures[n].image);this.textures[n].source=new Zh(r)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this.multiview=t.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}}class vi extends Y2{constructor(t=1,n=1,i={}){super(t,n,i),this.isWebGLRenderTarget=!0}}class N_ extends tn{constructor(t=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:n,height:i,depth:r},this.magFilter=jt,this.minFilter=jt,this.wrapR=Ni,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class q2 extends tn{constructor(t=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:n,height:i,depth:r},this.magFilter=jt,this.minFilter=jt,this.wrapR=Ni,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const du=class du{constructor(t,n,i,r,s,a,o,l,u,f,h,c,p,m,_,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,i,r,s,a,o,l,u,f,h,c,p,m,_,g)}set(t,n,i,r,s,a,o,l,u,f,h,c,p,m,_,g){const d=this.elements;return d[0]=t,d[4]=n,d[8]=i,d[12]=r,d[1]=s,d[5]=a,d[9]=o,d[13]=l,d[2]=u,d[6]=f,d[10]=h,d[14]=c,d[3]=p,d[7]=m,d[11]=_,d[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new du().fromArray(this.elements)}copy(t){const n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(t){const n=this.elements,i=t.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(t){const n=t.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(t,n,i){return this.determinant()===0?(t.set(1,0,0),n.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,n,i){return this.set(t.x,n.x,i.x,0,t.y,n.y,i.y,0,t.z,n.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinant()===0)return this.identity();const n=this.elements,i=t.elements,r=1/os.setFromMatrixColumn(t,0).length(),s=1/os.setFromMatrixColumn(t,1).length(),a=1/os.setFromMatrixColumn(t,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*a,n[9]=i[9]*a,n[10]=i[10]*a,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(t){const n=this.elements,i=t.x,r=t.y,s=t.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),u=Math.sin(r),f=Math.cos(s),h=Math.sin(s);if(t.order==="XYZ"){const c=a*f,p=a*h,m=o*f,_=o*h;n[0]=l*f,n[4]=-l*h,n[8]=u,n[1]=p+m*u,n[5]=c-_*u,n[9]=-o*l,n[2]=_-c*u,n[6]=m+p*u,n[10]=a*l}else if(t.order==="YXZ"){const c=l*f,p=l*h,m=u*f,_=u*h;n[0]=c+_*o,n[4]=m*o-p,n[8]=a*u,n[1]=a*h,n[5]=a*f,n[9]=-o,n[2]=p*o-m,n[6]=_+c*o,n[10]=a*l}else if(t.order==="ZXY"){const c=l*f,p=l*h,m=u*f,_=u*h;n[0]=c-_*o,n[4]=-a*h,n[8]=m+p*o,n[1]=p+m*o,n[5]=a*f,n[9]=_-c*o,n[2]=-a*u,n[6]=o,n[10]=a*l}else if(t.order==="ZYX"){const c=a*f,p=a*h,m=o*f,_=o*h;n[0]=l*f,n[4]=m*u-p,n[8]=c*u+_,n[1]=l*h,n[5]=_*u+c,n[9]=p*u-m,n[2]=-u,n[6]=o*l,n[10]=a*l}else if(t.order==="YZX"){const c=a*l,p=a*u,m=o*l,_=o*u;n[0]=l*f,n[4]=_-c*h,n[8]=m*h+p,n[1]=h,n[5]=a*f,n[9]=-o*f,n[2]=-u*f,n[6]=p*h+m,n[10]=c-_*h}else if(t.order==="XZY"){const c=a*l,p=a*u,m=o*l,_=o*u;n[0]=l*f,n[4]=-h,n[8]=u*f,n[1]=c*h+_,n[5]=a*f,n[9]=p*h-m,n[2]=m*h-p,n[6]=o*f,n[10]=_*h+c}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(t){return this.compose(K2,t,Z2)}lookAt(t,n,i){const r=this.elements;return yn.subVectors(t,n),yn.lengthSq()===0&&(yn.z=1),yn.normalize(),Yi.crossVectors(i,yn),Yi.lengthSq()===0&&(Math.abs(i.z)===1?yn.x+=1e-4:yn.z+=1e-4,yn.normalize(),Yi.crossVectors(i,yn)),Yi.normalize(),Fo.crossVectors(yn,Yi),r[0]=Yi.x,r[4]=Fo.x,r[8]=yn.x,r[1]=Yi.y,r[5]=Fo.y,r[9]=yn.y,r[2]=Yi.z,r[6]=Fo.z,r[10]=yn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const i=t.elements,r=n.elements,s=this.elements,a=i[0],o=i[4],l=i[8],u=i[12],f=i[1],h=i[5],c=i[9],p=i[13],m=i[2],_=i[6],g=i[10],d=i[14],v=i[3],y=i[7],M=i[11],T=i[15],b=r[0],w=r[4],S=r[8],x=r[12],P=r[1],R=r[5],L=r[9],F=r[13],B=r[2],D=r[6],z=r[10],H=r[14],U=r[3],j=r[7],J=r[11],se=r[15];return s[0]=a*b+o*P+l*B+u*U,s[4]=a*w+o*R+l*D+u*j,s[8]=a*S+o*L+l*z+u*J,s[12]=a*x+o*F+l*H+u*se,s[1]=f*b+h*P+c*B+p*U,s[5]=f*w+h*R+c*D+p*j,s[9]=f*S+h*L+c*z+p*J,s[13]=f*x+h*F+c*H+p*se,s[2]=m*b+_*P+g*B+d*U,s[6]=m*w+_*R+g*D+d*j,s[10]=m*S+_*L+g*z+d*J,s[14]=m*x+_*F+g*H+d*se,s[3]=v*b+y*P+M*B+T*U,s[7]=v*w+y*R+M*D+T*j,s[11]=v*S+y*L+M*z+T*J,s[15]=v*x+y*F+M*H+T*se,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[4]*=t,n[8]*=t,n[12]*=t,n[1]*=t,n[5]*=t,n[9]*=t,n[13]*=t,n[2]*=t,n[6]*=t,n[10]*=t,n[14]*=t,n[3]*=t,n[7]*=t,n[11]*=t,n[15]*=t,this}determinant(){const t=this.elements,n=t[0],i=t[4],r=t[8],s=t[12],a=t[1],o=t[5],l=t[9],u=t[13],f=t[2],h=t[6],c=t[10],p=t[14],m=t[3],_=t[7],g=t[11],d=t[15],v=l*p-u*c,y=o*p-u*h,M=o*c-l*h,T=a*p-u*f,b=a*c-l*f,w=a*h-o*f;return n*(_*v-g*y+d*M)-i*(m*v-g*T+d*b)+r*(m*y-_*T+d*w)-s*(m*M-_*b+g*w)}transpose(){const t=this.elements;let n;return n=t[1],t[1]=t[4],t[4]=n,n=t[2],t[2]=t[8],t[8]=n,n=t[6],t[6]=t[9],t[9]=n,n=t[3],t[3]=t[12],t[12]=n,n=t[7],t[7]=t[13],t[13]=n,n=t[11],t[11]=t[14],t[14]=n,this}setPosition(t,n,i){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=n,r[14]=i),this}invert(){const t=this.elements,n=t[0],i=t[1],r=t[2],s=t[3],a=t[4],o=t[5],l=t[6],u=t[7],f=t[8],h=t[9],c=t[10],p=t[11],m=t[12],_=t[13],g=t[14],d=t[15],v=n*o-i*a,y=n*l-r*a,M=n*u-s*a,T=i*l-r*o,b=i*u-s*o,w=r*u-s*l,S=f*_-h*m,x=f*g-c*m,P=f*d-p*m,R=h*g-c*_,L=h*d-p*_,F=c*d-p*g,B=v*F-y*L+M*R+T*P-b*x+w*S;if(B===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const D=1/B;return t[0]=(o*F-l*L+u*R)*D,t[1]=(r*L-i*F-s*R)*D,t[2]=(_*w-g*b+d*T)*D,t[3]=(c*b-h*w-p*T)*D,t[4]=(l*P-a*F-u*x)*D,t[5]=(n*F-r*P+s*x)*D,t[6]=(g*M-m*w-d*y)*D,t[7]=(f*w-c*M+p*y)*D,t[8]=(a*L-o*P+u*S)*D,t[9]=(i*P-n*L-s*S)*D,t[10]=(m*b-_*M+d*v)*D,t[11]=(h*M-f*b-p*v)*D,t[12]=(o*x-a*R-l*S)*D,t[13]=(n*R-i*x+r*S)*D,t[14]=(_*y-m*T-g*v)*D,t[15]=(f*T-h*y+c*v)*D,this}scale(t){const n=this.elements,i=t.x,r=t.y,s=t.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,n=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(t,n,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(t){const n=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(t){const n=Math.cos(t),i=Math.sin(t);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(t){const n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,a=t.x,o=t.y,l=t.z,u=s*a,f=s*o;return this.set(u*a+i,u*o-r*l,u*l+r*o,0,u*o+r*l,f*o+i,f*l-r*a,0,u*l-r*o,f*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(t,n,i){return this.set(t,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,n,i,r,s,a){return this.set(1,i,s,0,t,1,a,0,n,r,1,0,0,0,0,1),this}compose(t,n,i){const r=this.elements,s=n._x,a=n._y,o=n._z,l=n._w,u=s+s,f=a+a,h=o+o,c=s*u,p=s*f,m=s*h,_=a*f,g=a*h,d=o*h,v=l*u,y=l*f,M=l*h,T=i.x,b=i.y,w=i.z;return r[0]=(1-(_+d))*T,r[1]=(p+M)*T,r[2]=(m-y)*T,r[3]=0,r[4]=(p-M)*b,r[5]=(1-(c+d))*b,r[6]=(g+v)*b,r[7]=0,r[8]=(m+y)*w,r[9]=(g-v)*w,r[10]=(1-(c+_))*w,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,n,i){const r=this.elements;t.x=r[12],t.y=r[13],t.z=r[14];const s=this.determinant();if(s===0)return i.set(1,1,1),n.identity(),this;let a=os.set(r[0],r[1],r[2]).length();const o=os.set(r[4],r[5],r[6]).length(),l=os.set(r[8],r[9],r[10]).length();s<0&&(a=-a),Hn.copy(this);const u=1/a,f=1/o,h=1/l;return Hn.elements[0]*=u,Hn.elements[1]*=u,Hn.elements[2]*=u,Hn.elements[4]*=f,Hn.elements[5]*=f,Hn.elements[6]*=f,Hn.elements[8]*=h,Hn.elements[9]*=h,Hn.elements[10]*=h,n.setFromRotationMatrix(Hn),i.x=a,i.y=o,i.z=l,this}makePerspective(t,n,i,r,s,a,o=hi,l=!1){const u=this.elements,f=2*s/(n-t),h=2*s/(i-r),c=(n+t)/(n-t),p=(i+r)/(i-r);let m,_;if(l)m=s/(a-s),_=a*s/(a-s);else if(o===hi)m=-(a+s)/(a-s),_=-2*a*s/(a-s);else if(o===io)m=-a/(a-s),_=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return u[0]=f,u[4]=0,u[8]=c,u[12]=0,u[1]=0,u[5]=h,u[9]=p,u[13]=0,u[2]=0,u[6]=0,u[10]=m,u[14]=_,u[3]=0,u[7]=0,u[11]=-1,u[15]=0,this}makeOrthographic(t,n,i,r,s,a,o=hi,l=!1){const u=this.elements,f=2/(n-t),h=2/(i-r),c=-(n+t)/(n-t),p=-(i+r)/(i-r);let m,_;if(l)m=1/(a-s),_=a/(a-s);else if(o===hi)m=-2/(a-s),_=-(a+s)/(a-s);else if(o===io)m=-1/(a-s),_=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return u[0]=f,u[4]=0,u[8]=0,u[12]=c,u[1]=0,u[5]=h,u[9]=0,u[13]=p,u[2]=0,u[6]=0,u[10]=m,u[14]=_,u[3]=0,u[7]=0,u[11]=0,u[15]=1,this}equals(t){const n=this.elements,i=t.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(t,n=0){for(let i=0;i<16;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){const i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t[n+9]=i[9],t[n+10]=i[10],t[n+11]=i[11],t[n+12]=i[12],t[n+13]=i[13],t[n+14]=i[14],t[n+15]=i[15],t}};du.prototype.isMatrix4=!0;let wt=du;const os=new V,Hn=new wt,K2=new V(0,0,0),Z2=new V(1,1,1),Yi=new V,Fo=new V,yn=new V,tm=new wt,nm=new Js;class yr{constructor(t=0,n=0,i=0,r=yr.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,n,i,r=this._order){return this._x=t,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,n=this._order,i=!0){const r=t.elements,s=r[0],a=r[4],o=r[8],l=r[1],u=r[5],f=r[9],h=r[2],c=r[6],p=r[10];switch(n){case"XYZ":this._y=Math.asin(tt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-f,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(c,u),this._z=0);break;case"YXZ":this._x=Math.asin(-tt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,u)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(tt(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-a,u)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-tt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(c,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,u));break;case"YZX":this._z=Math.asin(tt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-f,u),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-tt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(c,u),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-f,p),this._y=0);break;default:Ve("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,n,i){return tm.makeRotationFromQuaternion(t),this.setFromRotationMatrix(tm,n,i)}setFromVector3(t,n=this._order){return this.set(t.x,t.y,t.z,n)}reorder(t){return nm.setFromEuler(this),this.setFromQuaternion(nm,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}yr.DEFAULT_ORDER="XYZ";class L_{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Q2=0;const im=new V,ls=new Js,Ei=new wt,Oo=new V,fa=new V,J2=new V,eE=new Js,rm=new V(1,0,0),sm=new V(0,1,0),am=new V(0,0,1),om={type:"added"},tE={type:"removed"},us={type:"childadded",child:null},Sc={type:"childremoved",child:null};class Ht extends es{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Q2++}),this.uuid=uo(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ht.DEFAULT_UP.clone();const t=new V,n=new yr,i=new Js,r=new V(1,1,1);function s(){i.setFromEuler(n,!1)}function a(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new wt},normalMatrix:{value:new je}}),this.matrix=new wt,this.matrixWorld=new wt,this.matrixAutoUpdate=Ht.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ht.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new L_,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,n){this.quaternion.setFromAxisAngle(t,n)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,n){return ls.setFromAxisAngle(t,n),this.quaternion.multiply(ls),this}rotateOnWorldAxis(t,n){return ls.setFromAxisAngle(t,n),this.quaternion.premultiply(ls),this}rotateX(t){return this.rotateOnAxis(rm,t)}rotateY(t){return this.rotateOnAxis(sm,t)}rotateZ(t){return this.rotateOnAxis(am,t)}translateOnAxis(t,n){return im.copy(t).applyQuaternion(this.quaternion),this.position.add(im.multiplyScalar(n)),this}translateX(t){return this.translateOnAxis(rm,t)}translateY(t){return this.translateOnAxis(sm,t)}translateZ(t){return this.translateOnAxis(am,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Ei.copy(this.matrixWorld).invert())}lookAt(t,n,i){t.isVector3?Oo.copy(t):Oo.set(t,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),fa.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ei.lookAt(fa,Oo,this.up):Ei.lookAt(Oo,fa,this.up),this.quaternion.setFromRotationMatrix(Ei),r&&(Ei.extractRotation(r.matrixWorld),ls.setFromRotationMatrix(Ei),this.quaternion.premultiply(ls.invert()))}add(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return t===this?(st("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(om),us.child=t,this.dispatchEvent(us),us.child=null):st("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(t);return n!==-1&&(t.parent=null,this.children.splice(n,1),t.dispatchEvent(tE),Sc.child=t,this.dispatchEvent(Sc),Sc.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Ei.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ei.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ei),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(om),us.child=t,this.dispatchEvent(us),us.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,n){if(this[t]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(t,n);if(a!==void 0)return a}}getObjectsByProperty(t,n,i=[]){this[t]===n&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(t,n,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(fa,t,J2),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(fa,eE,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return t.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(t){t(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(t)}traverseAncestors(t){const n=this.parent;n!==null&&(t(n),n.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const n=t.x,i=t.y,r=t.z,s=this.matrix.elements;s[12]+=n-s[0]*n-s[4]*i-s[8]*r,s[13]+=i-s[1]*n-s[5]*i-s[9]*r,s[14]+=r-s[2]*n-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].updateMatrixWorld(t)}updateWorldMatrix(t,n){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(t){const n=t===void 0||typeof t=="string",i={};n&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(t),r.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let u=0,f=l.length;u<f;u++){const h=l[u];s(t.shapes,h)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,u=this.material.length;l<u;l++)o.push(s(t.materials,this.material[l]));r.material=o}else r.material=s(t.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(t.animations,l))}}if(n){const o=a(t.geometries),l=a(t.materials),u=a(t.textures),f=a(t.images),h=a(t.shapes),c=a(t.skeletons),p=a(t.animations),m=a(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),u.length>0&&(i.textures=u),f.length>0&&(i.images=f),h.length>0&&(i.shapes=h),c.length>0&&(i.skeletons=c),p.length>0&&(i.animations=p),m.length>0&&(i.nodes=m)}return i.object=r,i;function a(o){const l=[];for(const u in o){const f=o[u];delete f.metadata,l.push(f)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,n=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),n===!0)for(let i=0;i<t.children.length;i++){const r=t.children[i];this.add(r.clone())}return this}}Ht.DEFAULT_UP=new V(0,1,0);Ht.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ht.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class wa extends Ht{constructor(){super(),this.isGroup=!0,this.type="Group"}}const nE={type:"move"};class yc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new wa,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new wa,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new V,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new V),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new wa,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new V,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new V,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const n=this._hand;if(n)for(const i of t.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,n,i){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,u=this._hand;if(t&&n.session.visibilityState!=="visible-blurred"){if(u&&t.hand){a=!0;for(const _ of t.hand.values()){const g=n.getJointPose(_,i),d=this._getHandJoint(u,_);g!==null&&(d.matrix.fromArray(g.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=g.radius),d.visible=g!==null}const f=u.joints["index-finger-tip"],h=u.joints["thumb-tip"],c=f.position.distanceTo(h.position),p=.02,m=.005;u.inputState.pinching&&c>p+m?(u.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!u.inputState.pinching&&c<=p-m&&(u.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=n.getPose(t.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(r=n.getPose(t.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(nE)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),u!==null&&(u.visible=a!==null),this}_getHandJoint(t,n){if(t.joints[n.jointName]===void 0){const i=new wa;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[n.jointName]=i,t.add(i)}return t.joints[n.jointName]}}const D_={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},qi={h:0,s:0,l:0},ko={h:0,s:0,l:0};function Mc(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}class qe{constructor(t,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,n,i)}set(t,n,i){if(n===void 0&&i===void 0){const r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,n,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,n=Ln){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,et.colorSpaceToWorking(this,n),this}setRGB(t,n,i,r=et.workingColorSpace){return this.r=t,this.g=n,this.b=i,et.colorSpaceToWorking(this,r),this}setHSL(t,n,i,r=et.workingColorSpace){if(t=H2(t,1),n=tt(n,0,1),i=tt(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,a=2*i-s;this.r=Mc(a,s,t+1/3),this.g=Mc(a,s,t),this.b=Mc(a,s,t-1/3)}return et.colorSpaceToWorking(this,r),this}setStyle(t,n=Ln){function i(s){s!==void 0&&parseFloat(s)<1&&Ve("Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:Ve("Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(a===6)return this.setHex(parseInt(s,16),n);Ve("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,n);return this}setColorName(t,n=Ln){const i=D_[t.toLowerCase()];return i!==void 0?this.setHex(i,n):Ve("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Fi(t.r),this.g=Fi(t.g),this.b=Fi(t.b),this}copyLinearToSRGB(t){return this.r=ks(t.r),this.g=ks(t.g),this.b=ks(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ln){return et.workingToColorSpace(Qt.copy(this),t),Math.round(tt(Qt.r*255,0,255))*65536+Math.round(tt(Qt.g*255,0,255))*256+Math.round(tt(Qt.b*255,0,255))}getHexString(t=Ln){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,n=et.workingColorSpace){et.workingToColorSpace(Qt.copy(this),n);const i=Qt.r,r=Qt.g,s=Qt.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let l,u;const f=(o+a)/2;if(o===a)l=0,u=0;else{const h=a-o;switch(u=f<=.5?h/(a+o):h/(2-a-o),a){case i:l=(r-s)/h+(r<s?6:0);break;case r:l=(s-i)/h+2;break;case s:l=(i-r)/h+4;break}l/=6}return t.h=l,t.s=u,t.l=f,t}getRGB(t,n=et.workingColorSpace){return et.workingToColorSpace(Qt.copy(this),n),t.r=Qt.r,t.g=Qt.g,t.b=Qt.b,t}getStyle(t=Ln){et.workingToColorSpace(Qt.copy(this),t);const n=Qt.r,i=Qt.g,r=Qt.b;return t!==Ln?`color(${t} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(t,n,i){return this.getHSL(qi),this.setHSL(qi.h+t,qi.s+n,qi.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,n){return this.r=t.r+n.r,this.g=t.g+n.g,this.b=t.b+n.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,n){return this.r+=(t.r-this.r)*n,this.g+=(t.g-this.g)*n,this.b+=(t.b-this.b)*n,this}lerpColors(t,n,i){return this.r=t.r+(n.r-t.r)*i,this.g=t.g+(n.g-t.g)*i,this.b=t.b+(n.b-t.b)*i,this}lerpHSL(t,n){this.getHSL(qi),t.getHSL(ko);const i=pc(qi.h,ko.h,n),r=pc(qi.s,ko.s,n),s=pc(qi.l,ko.l,n);return this.setHSL(i,r,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const n=this.r,i=this.g,r=this.b,s=t.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,n=0){return this.r=t[n],this.g=t[n+1],this.b=t[n+2],this}toArray(t=[],n=0){return t[n]=this.r,t[n+1]=this.g,t[n+2]=this.b,t}fromBufferAttribute(t,n){return this.r=t.getX(n),this.g=t.getY(n),this.b=t.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Qt=new qe;qe.NAMES=D_;class Qh{constructor(t,n=25e-5){this.isFogExp2=!0,this.name="",this.color=new qe(t),this.density=n}clone(){return new Qh(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class iE extends Ht{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new yr,this.environmentIntensity=1,this.environmentRotation=new yr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,n){return super.copy(t,n),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const n=super.toJSON(t);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}const Wn=new V,Ti=new V,Ec=new V,bi=new V,cs=new V,fs=new V,lm=new V,Tc=new V,bc=new V,wc=new V,xc=new Rt,Ac=new Rt,Cc=new Rt;class Kn{constructor(t=new V,n=new V,i=new V){this.a=t,this.b=n,this.c=i}static getNormal(t,n,i,r){r.subVectors(i,n),Wn.subVectors(t,n),r.cross(Wn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(t,n,i,r,s){Wn.subVectors(r,n),Ti.subVectors(i,n),Ec.subVectors(t,n);const a=Wn.dot(Wn),o=Wn.dot(Ti),l=Wn.dot(Ec),u=Ti.dot(Ti),f=Ti.dot(Ec),h=a*u-o*o;if(h===0)return s.set(0,0,0),null;const c=1/h,p=(u*l-o*f)*c,m=(a*f-o*l)*c;return s.set(1-p-m,m,p)}static containsPoint(t,n,i,r){return this.getBarycoord(t,n,i,r,bi)===null?!1:bi.x>=0&&bi.y>=0&&bi.x+bi.y<=1}static getInterpolation(t,n,i,r,s,a,o,l){return this.getBarycoord(t,n,i,r,bi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,bi.x),l.addScaledVector(a,bi.y),l.addScaledVector(o,bi.z),l)}static getInterpolatedAttribute(t,n,i,r,s,a){return xc.setScalar(0),Ac.setScalar(0),Cc.setScalar(0),xc.fromBufferAttribute(t,n),Ac.fromBufferAttribute(t,i),Cc.fromBufferAttribute(t,r),a.setScalar(0),a.addScaledVector(xc,s.x),a.addScaledVector(Ac,s.y),a.addScaledVector(Cc,s.z),a}static isFrontFacing(t,n,i,r){return Wn.subVectors(i,n),Ti.subVectors(t,n),Wn.cross(Ti).dot(r)<0}set(t,n,i){return this.a.copy(t),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(t,n,i,r){return this.a.copy(t[n]),this.b.copy(t[i]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,n,i,r){return this.a.fromBufferAttribute(t,n),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Wn.subVectors(this.c,this.b),Ti.subVectors(this.a,this.b),Wn.cross(Ti).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Kn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return Kn.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,i,r,s){return Kn.getInterpolation(t,this.a,this.b,this.c,n,i,r,s)}containsPoint(t){return Kn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Kn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,n){const i=this.a,r=this.b,s=this.c;let a,o;cs.subVectors(r,i),fs.subVectors(s,i),Tc.subVectors(t,i);const l=cs.dot(Tc),u=fs.dot(Tc);if(l<=0&&u<=0)return n.copy(i);bc.subVectors(t,r);const f=cs.dot(bc),h=fs.dot(bc);if(f>=0&&h<=f)return n.copy(r);const c=l*h-f*u;if(c<=0&&l>=0&&f<=0)return a=l/(l-f),n.copy(i).addScaledVector(cs,a);wc.subVectors(t,s);const p=cs.dot(wc),m=fs.dot(wc);if(m>=0&&p<=m)return n.copy(s);const _=p*u-l*m;if(_<=0&&u>=0&&m<=0)return o=u/(u-m),n.copy(i).addScaledVector(fs,o);const g=f*m-p*h;if(g<=0&&h-f>=0&&p-m>=0)return lm.subVectors(s,r),o=(h-f)/(h-f+(p-m)),n.copy(r).addScaledVector(lm,o);const d=1/(g+_+c);return a=_*d,o=c*d,n.copy(i).addScaledVector(cs,a).addScaledVector(fs,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class co{constructor(t=new V(1/0,1/0,1/0),n=new V(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=n}set(t,n){return this.min.copy(t),this.max.copy(n),this}setFromArray(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n+=3)this.expandByPoint(jn.fromArray(t,n));return this}setFromBufferAttribute(t){this.makeEmpty();for(let n=0,i=t.count;n<i;n++)this.expandByPoint(jn.fromBufferAttribute(t,n));return this}setFromPoints(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n++)this.expandByPoint(t[n]);return this}setFromCenterAndSize(t,n){const i=jn.copy(n).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,n=!1){return this.makeEmpty(),this.expandByObject(t,n)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,n=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,jn):jn.fromBufferAttribute(s,a),jn.applyMatrix4(t.matrixWorld),this.expandByPoint(jn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Bo.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Bo.copy(i.boundingBox)),Bo.applyMatrix4(t.matrixWorld),this.union(Bo)}const r=t.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],n);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,n){return n.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,jn),jn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let n,i;return t.normal.x>0?(n=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(n=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(n+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(n+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(n+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(n+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),n<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(da),zo.subVectors(this.max,da),ds.subVectors(t.a,da),hs.subVectors(t.b,da),ps.subVectors(t.c,da),Ki.subVectors(hs,ds),Zi.subVectors(ps,hs),wr.subVectors(ds,ps);let n=[0,-Ki.z,Ki.y,0,-Zi.z,Zi.y,0,-wr.z,wr.y,Ki.z,0,-Ki.x,Zi.z,0,-Zi.x,wr.z,0,-wr.x,-Ki.y,Ki.x,0,-Zi.y,Zi.x,0,-wr.y,wr.x,0];return!Rc(n,ds,hs,ps,zo)||(n=[1,0,0,0,1,0,0,0,1],!Rc(n,ds,hs,ps,zo))?!1:(Go.crossVectors(Ki,Zi),n=[Go.x,Go.y,Go.z],Rc(n,ds,hs,ps,zo))}clampPoint(t,n){return n.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,jn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(jn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(wi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),wi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),wi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),wi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),wi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),wi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),wi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),wi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(wi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const wi=[new V,new V,new V,new V,new V,new V,new V,new V],jn=new V,Bo=new co,ds=new V,hs=new V,ps=new V,Ki=new V,Zi=new V,wr=new V,da=new V,zo=new V,Go=new V,xr=new V;function Rc(e,t,n,i,r){for(let s=0,a=e.length-3;s<=a;s+=3){xr.fromArray(e,s);const o=r.x*Math.abs(xr.x)+r.y*Math.abs(xr.y)+r.z*Math.abs(xr.z),l=t.dot(xr),u=n.dot(xr),f=i.dot(xr);if(Math.max(-Math.max(l,u,f),Math.min(l,u,f))>o)return!1}return!0}const Dt=new V,Vo=new lt;let rE=0;class kn extends es{constructor(t,n,i=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:rE++}),this.name="",this.array=t,this.itemSize=n,this.count=t!==void 0?t.length/n:0,this.normalized=i,this.usage=Y0,this.updateRanges=[],this.gpuType=di,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,n,i){t*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[t+r]=n.array[i+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)Vo.fromBufferAttribute(this,n),Vo.applyMatrix3(t),this.setXY(n,Vo.x,Vo.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Dt.fromBufferAttribute(this,n),Dt.applyMatrix3(t),this.setXYZ(n,Dt.x,Dt.y,Dt.z);return this}applyMatrix4(t){for(let n=0,i=this.count;n<i;n++)Dt.fromBufferAttribute(this,n),Dt.applyMatrix4(t),this.setXYZ(n,Dt.x,Dt.y,Dt.z);return this}applyNormalMatrix(t){for(let n=0,i=this.count;n<i;n++)Dt.fromBufferAttribute(this,n),Dt.applyNormalMatrix(t),this.setXYZ(n,Dt.x,Dt.y,Dt.z);return this}transformDirection(t){for(let n=0,i=this.count;n<i;n++)Dt.fromBufferAttribute(this,n),Dt.transformDirection(t),this.setXYZ(n,Dt.x,Dt.y,Dt.z);return this}set(t,n=0){return this.array.set(t,n),this}getComponent(t,n){let i=this.array[t*this.itemSize+n];return this.normalized&&(i=ca(i,this.array)),i}setComponent(t,n,i){return this.normalized&&(i=fn(i,this.array)),this.array[t*this.itemSize+n]=i,this}getX(t){let n=this.array[t*this.itemSize];return this.normalized&&(n=ca(n,this.array)),n}setX(t,n){return this.normalized&&(n=fn(n,this.array)),this.array[t*this.itemSize]=n,this}getY(t){let n=this.array[t*this.itemSize+1];return this.normalized&&(n=ca(n,this.array)),n}setY(t,n){return this.normalized&&(n=fn(n,this.array)),this.array[t*this.itemSize+1]=n,this}getZ(t){let n=this.array[t*this.itemSize+2];return this.normalized&&(n=ca(n,this.array)),n}setZ(t,n){return this.normalized&&(n=fn(n,this.array)),this.array[t*this.itemSize+2]=n,this}getW(t){let n=this.array[t*this.itemSize+3];return this.normalized&&(n=ca(n,this.array)),n}setW(t,n){return this.normalized&&(n=fn(n,this.array)),this.array[t*this.itemSize+3]=n,this}setXY(t,n,i){return t*=this.itemSize,this.normalized&&(n=fn(n,this.array),i=fn(i,this.array)),this.array[t+0]=n,this.array[t+1]=i,this}setXYZ(t,n,i,r){return t*=this.itemSize,this.normalized&&(n=fn(n,this.array),i=fn(i,this.array),r=fn(r,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=r,this}setXYZW(t,n,i,r,s){return t*=this.itemSize,this.normalized&&(n=fn(n,this.array),i=fn(i,this.array),r=fn(r,this.array),s=fn(s,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=r,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Y0&&(t.usage=this.usage),t}dispose(){this.dispatchEvent({type:"dispose"})}}class U_ extends kn{constructor(t,n,i){super(new Uint16Array(t),n,i)}}class F_ extends kn{constructor(t,n,i){super(new Uint32Array(t),n,i)}}class nn extends kn{constructor(t,n,i){super(new Float32Array(t),n,i)}}const sE=new co,ha=new V,Pc=new V;class fo{constructor(t=new V,n=-1){this.isSphere=!0,this.center=t,this.radius=n}set(t,n){return this.center.copy(t),this.radius=n,this}setFromPoints(t,n){const i=this.center;n!==void 0?i.copy(n):sE.setFromPoints(t).getCenter(i);let r=0;for(let s=0,a=t.length;s<a;s++)r=Math.max(r,i.distanceToSquared(t[s]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const n=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=n*n}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,n){const i=this.center.distanceToSquared(t);return n.copy(t),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ha.subVectors(t,this.center);const n=ha.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(ha,r/i),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Pc.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ha.copy(t.center).add(Pc)),this.expandByPoint(ha.copy(t.center).sub(Pc))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let aE=0;const Nn=new wt,Ic=new Ht,ms=new V,Mn=new co,pa=new co,zt=new V;class cn extends es{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:aE++}),this.uuid=uo(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(B2(t)?F_:U_)(t,1):this.index=t,this}setIndirect(t,n=0){return this.indirect=t,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,n){return this.attributes[t]=n,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,n,i=0){this.groups.push({start:t,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,n){this.drawRange.start=t,this.drawRange.count=n}applyMatrix4(t){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(t),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new je().getNormalMatrix(t);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Nn.makeRotationFromQuaternion(t),this.applyMatrix4(Nn),this}rotateX(t){return Nn.makeRotationX(t),this.applyMatrix4(Nn),this}rotateY(t){return Nn.makeRotationY(t),this.applyMatrix4(Nn),this}rotateZ(t){return Nn.makeRotationZ(t),this.applyMatrix4(Nn),this}translate(t,n,i){return Nn.makeTranslation(t,n,i),this.applyMatrix4(Nn),this}scale(t,n,i){return Nn.makeScale(t,n,i),this.applyMatrix4(Nn),this}lookAt(t){return Ic.lookAt(t),Ic.updateMatrix(),this.applyMatrix4(Ic.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ms).negate(),this.translate(ms.x,ms.y,ms.z),this}setFromPoints(t){const n=this.getAttribute("position");if(n===void 0){const i=[];for(let r=0,s=t.length;r<s;r++){const a=t[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new nn(i,3))}else{const i=Math.min(t.length,n.count);for(let r=0;r<i;r++){const s=t[r];n.setXYZ(r,s.x,s.y,s.z||0)}t.length>n.count&&Ve("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new co);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){st("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new V(-1/0,-1/0,-1/0),new V(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];Mn.setFromBufferAttribute(s),this.morphTargetsRelative?(zt.addVectors(this.boundingBox.min,Mn.min),this.boundingBox.expandByPoint(zt),zt.addVectors(this.boundingBox.max,Mn.max),this.boundingBox.expandByPoint(zt)):(this.boundingBox.expandByPoint(Mn.min),this.boundingBox.expandByPoint(Mn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&st('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new fo);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){st("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new V,1/0);return}if(t){const i=this.boundingSphere.center;if(Mn.setFromBufferAttribute(t),n)for(let s=0,a=n.length;s<a;s++){const o=n[s];pa.setFromBufferAttribute(o),this.morphTargetsRelative?(zt.addVectors(Mn.min,pa.min),Mn.expandByPoint(zt),zt.addVectors(Mn.max,pa.max),Mn.expandByPoint(zt)):(Mn.expandByPoint(pa.min),Mn.expandByPoint(pa.max))}Mn.getCenter(i);let r=0;for(let s=0,a=t.count;s<a;s++)zt.fromBufferAttribute(t,s),r=Math.max(r,i.distanceToSquared(zt));if(n)for(let s=0,a=n.length;s<a;s++){const o=n[s],l=this.morphTargetsRelative;for(let u=0,f=o.count;u<f;u++)zt.fromBufferAttribute(o,u),l&&(ms.fromBufferAttribute(t,u),zt.add(ms)),r=Math.max(r,i.distanceToSquared(zt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&st('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,n=this.attributes;if(t===null||n.position===void 0||n.normal===void 0||n.uv===void 0){st("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,r=n.normal,s=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new kn(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let S=0;S<i.count;S++)o[S]=new V,l[S]=new V;const u=new V,f=new V,h=new V,c=new lt,p=new lt,m=new lt,_=new V,g=new V;function d(S,x,P){u.fromBufferAttribute(i,S),f.fromBufferAttribute(i,x),h.fromBufferAttribute(i,P),c.fromBufferAttribute(s,S),p.fromBufferAttribute(s,x),m.fromBufferAttribute(s,P),f.sub(u),h.sub(u),p.sub(c),m.sub(c);const R=1/(p.x*m.y-m.x*p.y);isFinite(R)&&(_.copy(f).multiplyScalar(m.y).addScaledVector(h,-p.y).multiplyScalar(R),g.copy(h).multiplyScalar(p.x).addScaledVector(f,-m.x).multiplyScalar(R),o[S].add(_),o[x].add(_),o[P].add(_),l[S].add(g),l[x].add(g),l[P].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:t.count}]);for(let S=0,x=v.length;S<x;++S){const P=v[S],R=P.start,L=P.count;for(let F=R,B=R+L;F<B;F+=3)d(t.getX(F+0),t.getX(F+1),t.getX(F+2))}const y=new V,M=new V,T=new V,b=new V;function w(S){T.fromBufferAttribute(r,S),b.copy(T);const x=o[S];y.copy(x),y.sub(T.multiplyScalar(T.dot(x))).normalize(),M.crossVectors(b,x);const R=M.dot(l[S])<0?-1:1;a.setXYZW(S,y.x,y.y,y.z,R)}for(let S=0,x=v.length;S<x;++S){const P=v[S],R=P.start,L=P.count;for(let F=R,B=R+L;F<B;F+=3)w(t.getX(F+0)),w(t.getX(F+1)),w(t.getX(F+2))}}computeVertexNormals(){const t=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new kn(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let c=0,p=i.count;c<p;c++)i.setXYZ(c,0,0,0);const r=new V,s=new V,a=new V,o=new V,l=new V,u=new V,f=new V,h=new V;if(t)for(let c=0,p=t.count;c<p;c+=3){const m=t.getX(c+0),_=t.getX(c+1),g=t.getX(c+2);r.fromBufferAttribute(n,m),s.fromBufferAttribute(n,_),a.fromBufferAttribute(n,g),f.subVectors(a,s),h.subVectors(r,s),f.cross(h),o.fromBufferAttribute(i,m),l.fromBufferAttribute(i,_),u.fromBufferAttribute(i,g),o.add(f),l.add(f),u.add(f),i.setXYZ(m,o.x,o.y,o.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(g,u.x,u.y,u.z)}else for(let c=0,p=n.count;c<p;c+=3)r.fromBufferAttribute(n,c+0),s.fromBufferAttribute(n,c+1),a.fromBufferAttribute(n,c+2),f.subVectors(a,s),h.subVectors(r,s),f.cross(h),i.setXYZ(c+0,f.x,f.y,f.z),i.setXYZ(c+1,f.x,f.y,f.z),i.setXYZ(c+2,f.x,f.y,f.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let n=0,i=t.count;n<i;n++)zt.fromBufferAttribute(t,n),zt.normalize(),t.setXYZ(n,zt.x,zt.y,zt.z)}toNonIndexed(){function t(o,l){const u=o.array,f=o.itemSize,h=o.normalized,c=new u.constructor(l.length*f);let p=0,m=0;for(let _=0,g=l.length;_<g;_++){o.isInterleavedBufferAttribute?p=l[_]*o.data.stride+o.offset:p=l[_]*f;for(let d=0;d<f;d++)c[m++]=u[p++]}return new kn(c,f,h)}if(this.index===null)return Ve("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new cn,i=this.index.array,r=this.attributes;for(const o in r){const l=r[o],u=t(l,i);n.setAttribute(o,u)}const s=this.morphAttributes;for(const o in s){const l=[],u=s[o];for(let f=0,h=u.length;f<h;f++){const c=u[f],p=t(c,i);l.push(p)}n.morphAttributes[o]=l}n.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const u=a[o];n.addGroup(u.start,u.count,u.materialIndex)}return n}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const u in l)l[u]!==void 0&&(t[u]=l[u]);return t}t.data={attributes:{}};const n=this.index;n!==null&&(t.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const u=i[l];t.data.attributes[l]=u.toJSON(t.data)}const r={};let s=!1;for(const l in this.morphAttributes){const u=this.morphAttributes[l],f=[];for(let h=0,c=u.length;h<c;h++){const p=u[h];f.push(p.toJSON(t.data))}f.length>0&&(r[l]=f,s=!0)}s&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone());const r=t.attributes;for(const u in r){const f=r[u];this.setAttribute(u,f.clone(n))}const s=t.morphAttributes;for(const u in s){const f=[],h=s[u];for(let c=0,p=h.length;c<p;c++)f.push(h[c].clone(n));this.morphAttributes[u]=f}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let u=0,f=a.length;u<f;u++){const h=a[u];this.addGroup(h.start,h.count,h.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let oE=0;class ts extends es{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:oE++}),this.uuid=uo(),this.name="",this.type="Material",this.blending=Wr,this.side=_i,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Hf,this.blendDst=Wf,this.blendEquation=Dr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new qe(0,0,0),this.blendAlpha=0,this.depthFunc=Xs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=$0,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ss,this.stencilZFail=ss,this.stencilZPass=ss,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const n in t){const i=t[n];if(i===void 0){Ve(`Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){Ve(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(t){const n=t===void 0||typeof t=="string";n&&(t={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Wr&&(i.blending=this.blending),this.side!==_i&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Hf&&(i.blendSrc=this.blendSrc),this.blendDst!==Wf&&(i.blendDst=this.blendDst),this.blendEquation!==Dr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Xs&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==$0&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ss&&(i.stencilFail=this.stencilFail),this.stencilZFail!==ss&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==ss&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(n){const s=r(t.textures),a=r(t.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const n=t.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const xi=new V,Nc=new V,Ho=new V,Qi=new V,Lc=new V,Wo=new V,Dc=new V;class Jh{constructor(t=new V,n=new V(0,0,-1)){this.origin=t,this.direction=n}set(t,n){return this.origin.copy(t),this.direction.copy(n),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,n){return n.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,xi)),this}closestPointToPoint(t,n){n.subVectors(t,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const n=xi.subVectors(t,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(t):(xi.copy(this.origin).addScaledVector(this.direction,n),xi.distanceToSquared(t))}distanceSqToSegment(t,n,i,r){Nc.copy(t).add(n).multiplyScalar(.5),Ho.copy(n).sub(t).normalize(),Qi.copy(this.origin).sub(Nc);const s=t.distanceTo(n)*.5,a=-this.direction.dot(Ho),o=Qi.dot(this.direction),l=-Qi.dot(Ho),u=Qi.lengthSq(),f=Math.abs(1-a*a);let h,c,p,m;if(f>0)if(h=a*l-o,c=a*o-l,m=s*f,h>=0)if(c>=-m)if(c<=m){const _=1/f;h*=_,c*=_,p=h*(h+a*c+2*o)+c*(a*h+c+2*l)+u}else c=s,h=Math.max(0,-(a*c+o)),p=-h*h+c*(c+2*l)+u;else c=-s,h=Math.max(0,-(a*c+o)),p=-h*h+c*(c+2*l)+u;else c<=-m?(h=Math.max(0,-(-a*s+o)),c=h>0?-s:Math.min(Math.max(-s,-l),s),p=-h*h+c*(c+2*l)+u):c<=m?(h=0,c=Math.min(Math.max(-s,-l),s),p=c*(c+2*l)+u):(h=Math.max(0,-(a*s+o)),c=h>0?s:Math.min(Math.max(-s,-l),s),p=-h*h+c*(c+2*l)+u);else c=a>0?-s:s,h=Math.max(0,-(a*c+o)),p=-h*h+c*(c+2*l)+u;return i&&i.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(Nc).addScaledVector(Ho,c),p}intersectSphere(t,n){xi.subVectors(t.center,this.origin);const i=xi.dot(this.direction),r=xi.dot(xi)-i*i,s=t.radius*t.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,n):this.at(o,n)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const n=t.normal.dot(this.direction);if(n===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/n;return i>=0?i:null}intersectPlane(t,n){const i=this.distanceToPlane(t);return i===null?null:this.at(i,n)}intersectsPlane(t){const n=t.distanceToPoint(this.origin);return n===0||t.normal.dot(this.direction)*n<0}intersectBox(t,n){let i,r,s,a,o,l;const u=1/this.direction.x,f=1/this.direction.y,h=1/this.direction.z,c=this.origin;return u>=0?(i=(t.min.x-c.x)*u,r=(t.max.x-c.x)*u):(i=(t.max.x-c.x)*u,r=(t.min.x-c.x)*u),f>=0?(s=(t.min.y-c.y)*f,a=(t.max.y-c.y)*f):(s=(t.max.y-c.y)*f,a=(t.min.y-c.y)*f),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),h>=0?(o=(t.min.z-c.z)*h,l=(t.max.z-c.z)*h):(o=(t.max.z-c.z)*h,l=(t.min.z-c.z)*h),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(t){return this.intersectBox(t,xi)!==null}intersectTriangle(t,n,i,r,s){Lc.subVectors(n,t),Wo.subVectors(i,t),Dc.crossVectors(Lc,Wo);let a=this.direction.dot(Dc),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Qi.subVectors(this.origin,t);const l=o*this.direction.dot(Wo.crossVectors(Qi,Wo));if(l<0)return null;const u=o*this.direction.dot(Lc.cross(Qi));if(u<0||l+u>a)return null;const f=-o*Qi.dot(Dc);return f<0?null:this.at(f/a,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class uu extends ts{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yr,this.combine=Gh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const um=new wt,Ar=new Jh,jo=new fo,cm=new V,Xo=new V,$o=new V,Yo=new V,Uc=new V,qo=new V,fm=new V,Ko=new V;class ct extends Ht{constructor(t=new cn,n=new uu){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(t,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;n.fromBufferAttribute(r,t);const o=this.morphTargetInfluences;if(s&&o){qo.set(0,0,0);for(let l=0,u=s.length;l<u;l++){const f=o[l],h=s[l];f!==0&&(Uc.fromBufferAttribute(h,t),a?qo.addScaledVector(Uc,f):qo.addScaledVector(Uc.sub(n),f))}n.add(qo)}return n}raycast(t,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),jo.copy(i.boundingSphere),jo.applyMatrix4(s),Ar.copy(t.ray).recast(t.near),!(jo.containsPoint(Ar.origin)===!1&&(Ar.intersectSphere(jo,cm)===null||Ar.origin.distanceToSquared(cm)>(t.far-t.near)**2))&&(um.copy(s).invert(),Ar.copy(t.ray).applyMatrix4(um),!(i.boundingBox!==null&&Ar.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,n,Ar)))}_computeIntersections(t,n,i){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,u=s.attributes.uv,f=s.attributes.uv1,h=s.attributes.normal,c=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,_=c.length;m<_;m++){const g=c[m],d=a[g.materialIndex],v=Math.max(g.start,p.start),y=Math.min(o.count,Math.min(g.start+g.count,p.start+p.count));for(let M=v,T=y;M<T;M+=3){const b=o.getX(M),w=o.getX(M+1),S=o.getX(M+2);r=Zo(this,d,t,i,u,f,h,b,w,S),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=g.materialIndex,n.push(r))}}else{const m=Math.max(0,p.start),_=Math.min(o.count,p.start+p.count);for(let g=m,d=_;g<d;g+=3){const v=o.getX(g),y=o.getX(g+1),M=o.getX(g+2);r=Zo(this,a,t,i,u,f,h,v,y,M),r&&(r.faceIndex=Math.floor(g/3),n.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,_=c.length;m<_;m++){const g=c[m],d=a[g.materialIndex],v=Math.max(g.start,p.start),y=Math.min(l.count,Math.min(g.start+g.count,p.start+p.count));for(let M=v,T=y;M<T;M+=3){const b=M,w=M+1,S=M+2;r=Zo(this,d,t,i,u,f,h,b,w,S),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=g.materialIndex,n.push(r))}}else{const m=Math.max(0,p.start),_=Math.min(l.count,p.start+p.count);for(let g=m,d=_;g<d;g+=3){const v=g,y=g+1,M=g+2;r=Zo(this,a,t,i,u,f,h,v,y,M),r&&(r.faceIndex=Math.floor(g/3),n.push(r))}}}}function lE(e,t,n,i,r,s,a,o){let l;if(t.side===_n?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,t.side===_i,o),l===null)return null;Ko.copy(o),Ko.applyMatrix4(e.matrixWorld);const u=n.ray.origin.distanceTo(Ko);return u<n.near||u>n.far?null:{distance:u,point:Ko.clone(),object:e}}function Zo(e,t,n,i,r,s,a,o,l,u){e.getVertexPosition(o,Xo),e.getVertexPosition(l,$o),e.getVertexPosition(u,Yo);const f=lE(e,t,n,i,Xo,$o,Yo,fm);if(f){const h=new V;Kn.getBarycoord(fm,Xo,$o,Yo,h),r&&(f.uv=Kn.getInterpolatedAttribute(r,o,l,u,h,new lt)),s&&(f.uv1=Kn.getInterpolatedAttribute(s,o,l,u,h,new lt)),a&&(f.normal=Kn.getInterpolatedAttribute(a,o,l,u,h,new V),f.normal.dot(i.direction)>0&&f.normal.multiplyScalar(-1));const c={a:o,b:l,c:u,normal:new V,materialIndex:0};Kn.getNormal(Xo,$o,Yo,c.normal),f.face=c,f.barycoord=h}return f}class uE extends tn{constructor(t=null,n=1,i=1,r,s,a,o,l,u=jt,f=jt,h,c){super(null,a,o,l,u,f,r,s,h,c),this.isDataTexture=!0,this.image={data:t,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Fc=new V,cE=new V,fE=new je;class Ir{constructor(t=new V(1,0,0),n=0){this.isPlane=!0,this.normal=t,this.constant=n}set(t,n){return this.normal.copy(t),this.constant=n,this}setComponents(t,n,i,r){return this.normal.set(t,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(t,n){return this.normal.copy(t),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(t,n,i){const r=Fc.subVectors(i,n).cross(cE.subVectors(t,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,n){return n.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,n,i=!0){const r=t.delta(Fc),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(t.start)===0?n.copy(t.start):null;const a=-(t.start.dot(this.normal)+this.constant)/s;return i===!0&&(a<0||a>1)?null:n.copy(t.start).addScaledVector(r,a)}intersectsLine(t){const n=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return n<0&&i>0||i<0&&n>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,n){const i=n||fE.getNormalMatrix(t),r=this.coplanarPoint(Fc).applyMatrix4(t),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Cr=new fo,dE=new lt(.5,.5),Qo=new V;class ep{constructor(t=new Ir,n=new Ir,i=new Ir,r=new Ir,s=new Ir,a=new Ir){this.planes=[t,n,i,r,s,a]}set(t,n,i,r,s,a){const o=this.planes;return o[0].copy(t),o[1].copy(n),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(t){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,n=hi,i=!1){const r=this.planes,s=t.elements,a=s[0],o=s[1],l=s[2],u=s[3],f=s[4],h=s[5],c=s[6],p=s[7],m=s[8],_=s[9],g=s[10],d=s[11],v=s[12],y=s[13],M=s[14],T=s[15];if(r[0].setComponents(u-a,p-f,d-m,T-v).normalize(),r[1].setComponents(u+a,p+f,d+m,T+v).normalize(),r[2].setComponents(u+o,p+h,d+_,T+y).normalize(),r[3].setComponents(u-o,p-h,d-_,T-y).normalize(),i)r[4].setComponents(l,c,g,M).normalize(),r[5].setComponents(u-l,p-c,d-g,T-M).normalize();else if(r[4].setComponents(u-l,p-c,d-g,T-M).normalize(),n===hi)r[5].setComponents(u+l,p+c,d+g,T+M).normalize();else if(n===io)r[5].setComponents(l,c,g,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Cr.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const n=t.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Cr.copy(n.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Cr)}intersectsSprite(t){Cr.center.set(0,0,0);const n=dE.distanceTo(t.center);return Cr.radius=.7071067811865476+n,Cr.applyMatrix4(t.matrixWorld),this.intersectsSphere(Cr)}intersectsSphere(t){const n=this.planes,i=t.center,r=-t.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(t){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(Qo.x=r.normal.x>0?t.max.x:t.min.x,Qo.y=r.normal.y>0?t.max.y:t.min.y,Qo.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(Qo)<0)return!1}return!0}containsPoint(t){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class O_ extends ts{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new qe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const cu=new V,fu=new V,dm=new wt,ma=new Jh,Jo=new fo,Oc=new V,hm=new V;class hE extends Ht{constructor(t=new cn,n=new O_){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const n=t.attributes.position,i=[0];for(let r=1,s=n.count;r<s;r++)cu.fromBufferAttribute(n,r-1),fu.fromBufferAttribute(n,r),i[r]=i[r-1],i[r]+=cu.distanceTo(fu);t.setAttribute("lineDistance",new nn(i,1))}else Ve("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,n){const i=this.geometry,r=this.matrixWorld,s=t.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Jo.copy(i.boundingSphere),Jo.applyMatrix4(r),Jo.radius+=s,t.ray.intersectsSphere(Jo)===!1)return;dm.copy(r).invert(),ma.copy(t.ray).applyMatrix4(dm);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,u=this.isLineSegments?2:1,f=i.index,c=i.attributes.position;if(f!==null){const p=Math.max(0,a.start),m=Math.min(f.count,a.start+a.count);for(let _=p,g=m-1;_<g;_+=u){const d=f.getX(_),v=f.getX(_+1),y=el(this,t,ma,l,d,v,_);y&&n.push(y)}if(this.isLineLoop){const _=f.getX(m-1),g=f.getX(p),d=el(this,t,ma,l,_,g,m-1);d&&n.push(d)}}else{const p=Math.max(0,a.start),m=Math.min(c.count,a.start+a.count);for(let _=p,g=m-1;_<g;_+=u){const d=el(this,t,ma,l,_,_+1,_);d&&n.push(d)}if(this.isLineLoop){const _=el(this,t,ma,l,m-1,p,m-1);_&&n.push(_)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function el(e,t,n,i,r,s,a){const o=e.geometry.attributes.position;if(cu.fromBufferAttribute(o,r),fu.fromBufferAttribute(o,s),n.distanceSqToSegment(cu,fu,Oc,hm)>i)return;Oc.applyMatrix4(e.matrixWorld);const u=t.ray.origin.distanceTo(Oc);if(!(u<t.near||u>t.far))return{distance:u,point:hm.clone().applyMatrix4(e.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:e}}class k_ extends ts{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new qe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const pm=new wt,Ld=new Jh,tl=new fo,nl=new V;class pE extends Ht{constructor(t=new cn,n=new k_){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,n){const i=this.geometry,r=this.matrixWorld,s=t.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),tl.copy(i.boundingSphere),tl.applyMatrix4(r),tl.radius+=s,t.ray.intersectsSphere(tl)===!1)return;pm.copy(r).invert(),Ld.copy(t.ray).applyMatrix4(pm);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,u=i.index,h=i.attributes.position;if(u!==null){const c=Math.max(0,a.start),p=Math.min(u.count,a.start+a.count);for(let m=c,_=p;m<_;m++){const g=u.getX(m);nl.fromBufferAttribute(h,g),mm(nl,g,l,r,t,n,this)}}else{const c=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);for(let m=c,_=p;m<_;m++)nl.fromBufferAttribute(h,m),mm(nl,m,l,r,t,n,this)}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function mm(e,t,n,i,r,s,a){const o=Ld.distanceSqToPoint(e);if(o<n){const l=new V;Ld.closestPointToPoint(e,l),l.applyMatrix4(i);const u=r.ray.origin.distanceTo(l);if(u<r.near||u>r.far)return;s.push({distance:u,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class B_ extends tn{constructor(t=[],n=Kr,i,r,s,a,o,l,u,f){super(t,n,i,r,s,a,o,l,u,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class ho extends tn{constructor(t,n,i,r,s,a,o,l,u){super(t,n,i,r,s,a,o,l,u),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ys extends tn{constructor(t,n,i=Si,r,s,a,o=jt,l=jt,u,f=Vi,h=1){if(f!==Vi&&f!==Gr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const c={width:t,height:n,depth:h};super(c,r,s,a,o,l,f,i,u),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Zh(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const n=super.toJSON(t);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}class mE extends Ys{constructor(t,n=Si,i=Kr,r,s,a=jt,o=jt,l,u=Vi){const f={width:t,height:t,depth:1},h=[f,f,f,f,f,f];super(t,t,n,i,r,s,a,o,l,u),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class z_ extends tn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Li extends cn{constructor(t=1,n=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],u=[],f=[],h=[];let c=0,p=0;m("z","y","x",-1,-1,i,n,t,a,s,0),m("z","y","x",1,-1,i,n,-t,a,s,1),m("x","z","y",1,1,t,i,n,r,a,2),m("x","z","y",1,-1,t,i,-n,r,a,3),m("x","y","z",1,-1,t,n,i,r,s,4),m("x","y","z",-1,-1,t,n,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new nn(u,3)),this.setAttribute("normal",new nn(f,3)),this.setAttribute("uv",new nn(h,2));function m(_,g,d,v,y,M,T,b,w,S,x){const P=M/w,R=T/S,L=M/2,F=T/2,B=b/2,D=w+1,z=S+1;let H=0,U=0;const j=new V;for(let J=0;J<z;J++){const se=J*R-F;for(let ce=0;ce<D;ce++){const Ie=ce*P-L;j[_]=Ie*v,j[g]=se*y,j[d]=B,u.push(j.x,j.y,j.z),j[_]=0,j[g]=0,j[d]=b>0?1:-1,f.push(j.x,j.y,j.z),h.push(ce/w),h.push(1-J/S),H+=1}}for(let J=0;J<S;J++)for(let se=0;se<w;se++){const ce=c+se+D*J,Ie=c+se+D*(J+1),ke=c+(se+1)+D*(J+1),Le=c+(se+1)+D*J;l.push(ce,Ie,Le),l.push(Ie,ke,Le),U+=6}o.addGroup(p,U,x),p+=U,c+=H}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Li(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class $n extends cn{constructor(t=1,n=1,i=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:n,height:i,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const u=this;r=Math.floor(r),s=Math.floor(s);const f=[],h=[],c=[],p=[];let m=0;const _=[],g=i/2;let d=0;v(),a===!1&&(t>0&&y(!0),n>0&&y(!1)),this.setIndex(f),this.setAttribute("position",new nn(h,3)),this.setAttribute("normal",new nn(c,3)),this.setAttribute("uv",new nn(p,2));function v(){const M=new V,T=new V;let b=0;const w=(n-t)/i;for(let S=0;S<=s;S++){const x=[],P=S/s,R=P*(n-t)+t;for(let L=0;L<=r;L++){const F=L/r,B=F*l+o,D=Math.sin(B),z=Math.cos(B);T.x=R*D,T.y=-P*i+g,T.z=R*z,h.push(T.x,T.y,T.z),M.set(D,w,z).normalize(),c.push(M.x,M.y,M.z),p.push(F,1-P),x.push(m++)}_.push(x)}for(let S=0;S<r;S++)for(let x=0;x<s;x++){const P=_[x][S],R=_[x+1][S],L=_[x+1][S+1],F=_[x][S+1];(t>0||x!==0)&&(f.push(P,R,F),b+=3),(n>0||x!==s-1)&&(f.push(R,L,F),b+=3)}u.addGroup(d,b,0),d+=b}function y(M){const T=m,b=new lt,w=new V;let S=0;const x=M===!0?t:n,P=M===!0?1:-1;for(let L=1;L<=r;L++)h.push(0,g*P,0),c.push(0,P,0),p.push(.5,.5),m++;const R=m;for(let L=0;L<=r;L++){const B=L/r*l+o,D=Math.cos(B),z=Math.sin(B);w.x=x*z,w.y=g*P,w.z=x*D,h.push(w.x,w.y,w.z),c.push(0,P,0),b.x=D*.5+.5,b.y=z*.5*P+.5,p.push(b.x,b.y),m++}for(let L=0;L<r;L++){const F=T+L,B=R+L;M===!0?f.push(B,B+1,F):f.push(B+1,B,F),S+=3}u.addGroup(d,S,M===!0?1:2),d+=S}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new $n(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Oa extends $n{constructor(t=1,n=1,i=32,r=1,s=!1,a=0,o=Math.PI*2){super(0,t,n,i,r,s,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:n,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(t){return new Oa(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Iu extends cn{constructor(t=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:n,widthSegments:i,heightSegments:r};const s=t/2,a=n/2,o=Math.floor(i),l=Math.floor(r),u=o+1,f=l+1,h=t/o,c=n/l,p=[],m=[],_=[],g=[];for(let d=0;d<f;d++){const v=d*c-a;for(let y=0;y<u;y++){const M=y*h-s;m.push(M,-v,0),_.push(0,0,1),g.push(y/o),g.push(1-d/l)}}for(let d=0;d<l;d++)for(let v=0;v<o;v++){const y=v+u*d,M=v+u*(d+1),T=v+1+u*(d+1),b=v+1+u*d;p.push(y,M,b),p.push(M,T,b)}this.setIndex(p),this.setAttribute("position",new nn(m,3)),this.setAttribute("normal",new nn(_,3)),this.setAttribute("uv",new nn(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Iu(t.width,t.height,t.widthSegments,t.heightSegments)}}class Ur extends cn{constructor(t=1,n=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:n,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},n=Math.max(3,Math.floor(n)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let u=0;const f=[],h=new V,c=new V,p=[],m=[],_=[],g=[];for(let d=0;d<=i;d++){const v=[],y=d/i;let M=0;d===0&&a===0?M=.5/n:d===i&&l===Math.PI&&(M=-.5/n);for(let T=0;T<=n;T++){const b=T/n;h.x=-t*Math.cos(r+b*s)*Math.sin(a+y*o),h.y=t*Math.cos(a+y*o),h.z=t*Math.sin(r+b*s)*Math.sin(a+y*o),m.push(h.x,h.y,h.z),c.copy(h).normalize(),_.push(c.x,c.y,c.z),g.push(b+M,1-y),v.push(u++)}f.push(v)}for(let d=0;d<i;d++)for(let v=0;v<n;v++){const y=f[d][v+1],M=f[d][v],T=f[d+1][v],b=f[d+1][v+1];(d!==0||a>0)&&p.push(y,M,b),(d!==i-1||l<Math.PI)&&p.push(M,T,b)}this.setIndex(p),this.setAttribute("position",new nn(m,3)),this.setAttribute("normal",new nn(_,3)),this.setAttribute("uv",new nn(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ur(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}function qs(e){const t={};for(const n in e){t[n]={};for(const i in e[n]){const r=e[n][i];if(gm(r))r.isRenderTargetTexture?(Ve("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[n][i]=null):t[n][i]=r.clone();else if(Array.isArray(r))if(gm(r[0])){const s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();t[n][i]=s}else t[n][i]=r.slice();else t[n][i]=r}}return t}function sn(e){const t={};for(let n=0;n<e.length;n++){const i=qs(e[n]);for(const r in i)t[r]=i[r]}return t}function gm(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function gE(e){const t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function G_(e){const t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:et.workingColorSpace}const vE={clone:qs,merge:sn};var _E=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,SE=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Gn extends ts{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=_E,this.fragmentShader=SE,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=qs(t.uniforms),this.uniformsGroups=gE(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const n=super.toJSON(t);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?n.uniforms[r]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?n.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?n.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?n.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?n.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?n.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?n.uniforms[r]={type:"m4",value:a.toArray()}:n.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class yE extends Gn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Ai extends ts{constructor(t){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new qe(16777215),this.specular=new qe(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new qe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Pd,this.normalScale=new lt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yr,this.combine=Gh,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class ME extends ts{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=I2,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class EE extends ts{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class TE extends O_{constructor(t){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(t)}copy(t){return super.copy(t),this.scale=t.scale,this.dashSize=t.dashSize,this.gapSize=t.gapSize,this}}class tp extends Ht{constructor(t,n=1){super(),this.isLight=!0,this.type="Light",this.color=new qe(t),this.intensity=n}dispose(){this.dispatchEvent({type:"dispose"})}copy(t,n){return super.copy(t,n),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const n=super.toJSON(t);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,n}}const kc=new wt,vm=new V,_m=new V;class V_{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new lt(512,512),this.mapType=bn,this.map=null,this.mapPass=null,this.matrix=new wt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ep,this._frameExtents=new lt(1,1),this._viewportCount=1,this._viewports=[new Rt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const n=this.camera,i=this.matrix;vm.setFromMatrixPosition(t.matrixWorld),n.position.copy(vm),_m.setFromMatrixPosition(t.target.matrixWorld),n.lookAt(_m),n.updateMatrixWorld(),kc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(kc,n.coordinateSystem,n.reversedDepth),n.coordinateSystem===io||n.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(kc)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const il=new V,rl=new Js,ri=new V;class H_ extends Ht{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new wt,this.projectionMatrix=new wt,this.projectionMatrixInverse=new wt,this.coordinateSystem=hi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,n){return super.copy(t,n),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(il,rl,ri),ri.x===1&&ri.y===1&&ri.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(il,rl,ri.set(1,1,1)).invert()}updateWorldMatrix(t,n){super.updateWorldMatrix(t,n),this.matrixWorld.decompose(il,rl,ri),ri.x===1&&ri.y===1&&ri.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(il,rl,ri.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Ji=new V,Sm=new lt,ym=new lt;class Tn extends H_{constructor(t=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const n=.5*this.getFilmHeight()/t;this.fov=Nd*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(hc*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Nd*2*Math.atan(Math.tan(hc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,n,i){Ji.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ji.x,Ji.y).multiplyScalar(-t/Ji.z),Ji.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ji.x,Ji.y).multiplyScalar(-t/Ji.z)}getViewSize(t,n){return this.getViewBounds(t,Sm,ym),n.subVectors(ym,Sm)}setViewOffset(t,n,i,r,s,a){this.aspect=t/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let n=t*Math.tan(hc*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,u=a.fullHeight;s+=a.offsetX*r/l,n-=a.offsetY*i/u,r*=a.width/l,i*=a.height/u}const o=this.filmOffset;o!==0&&(s+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}class bE extends V_{constructor(){super(new Tn(90,1,.5,500)),this.isPointLightShadow=!0}}class Mm extends tp{constructor(t,n,i=0,r=2){super(t,n),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new bE}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,n){return super.copy(t,n),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){const n=super.toJSON(t);return n.object.distance=this.distance,n.object.decay=this.decay,n.object.shadow=this.shadow.toJSON(),n}}class np extends H_{constructor(t=-1,n=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,n,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-t,a=i+t,o=r+n,l=r-n;if(this.view!==null&&this.view.enabled){const u=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=u*this.view.offsetX,a=s+u*this.view.width,o-=f*this.view.offsetY,l=o-f*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}class wE extends V_{constructor(){super(new np(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Em extends tp{constructor(t,n){super(t,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ht.DEFAULT_UP),this.updateMatrix(),this.target=new Ht,this.shadow=new wE}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const n=super.toJSON(t);return n.object.shadow=this.shadow.toJSON(),n.object.target=this.target.uuid,n}}class xE extends tp{constructor(t,n){super(t,n),this.isAmbientLight=!0,this.type="AmbientLight"}}const gs=-90,vs=1;class AE extends Ht{constructor(t,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Tn(gs,vs,t,n);r.layers=this.layers,this.add(r);const s=new Tn(gs,vs,t,n);s.layers=this.layers,this.add(s);const a=new Tn(gs,vs,t,n);a.layers=this.layers,this.add(a);const o=new Tn(gs,vs,t,n);o.layers=this.layers,this.add(o);const l=new Tn(gs,vs,t,n);l.layers=this.layers,this.add(l);const u=new Tn(gs,vs,t,n);u.layers=this.layers,this.add(u)}updateCoordinateSystem(){const t=this.coordinateSystem,n=this.children.concat(),[i,r,s,a,o,l]=n;for(const u of n)this.remove(u);if(t===hi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===io)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const u of n)this.add(u),u.updateMatrixWorld()}update(t,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,u,f]=this.children,h=t.getRenderTarget(),c=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;t.isWebGLRenderer===!0?g=t.state.buffers.depth.getReversed():g=t.reversedDepthBuffer,t.setRenderTarget(i,0,r),g&&t.autoClear===!1&&t.clearDepth(),t.render(n,s),t.setRenderTarget(i,1,r),g&&t.autoClear===!1&&t.clearDepth(),t.render(n,a),t.setRenderTarget(i,2,r),g&&t.autoClear===!1&&t.clearDepth(),t.render(n,o),t.setRenderTarget(i,3,r),g&&t.autoClear===!1&&t.clearDepth(),t.render(n,l),t.setRenderTarget(i,4,r),g&&t.autoClear===!1&&t.clearDepth(),t.render(n,u),i.texture.generateMipmaps=_,t.setRenderTarget(i,5,r),g&&t.autoClear===!1&&t.clearDepth(),t.render(n,f),t.setRenderTarget(h,c,p),t.xr.enabled=m,i.texture.needsPMREMUpdate=!0}}class CE extends Tn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const op=class op{constructor(t,n,i,r){this.elements=[1,0,0,1],t!==void 0&&this.set(t,n,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(t,n=0){for(let i=0;i<4;i++)this.elements[i]=t[i+n];return this}set(t,n,i,r){const s=this.elements;return s[0]=t,s[2]=n,s[1]=i,s[3]=r,this}};op.prototype.isMatrix2=!0;let Tm=op;function bm(e,t,n,i){const r=RE(i);switch(n){case C_:return e*t;case P_:return e*t/r.components*r.byteLength;case Xh:return e*t/r.components*r.byteLength;case Zr:return e*t*2/r.components*r.byteLength;case $h:return e*t*2/r.components*r.byteLength;case R_:return e*t*3/r.components*r.byteLength;case Zn:return e*t*4/r.components*r.byteLength;case Yh:return e*t*4/r.components*r.byteLength;case xl:case Al:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Cl:case Rl:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case td:case id:return Math.max(e,16)*Math.max(t,8)/4;case ed:case nd:return Math.max(e,8)*Math.max(t,8)/2;case rd:case sd:case od:case ld:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case ad:case ru:case ud:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case cd:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case fd:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case dd:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case hd:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case pd:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case md:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case gd:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case vd:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case _d:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case Sd:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case yd:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case Md:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case Ed:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case Td:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case bd:case wd:case xd:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Ad:case Cd:return Math.ceil(e/4)*Math.ceil(t/4)*8;case su:case Rd:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function RE(e){switch(e){case bn:case b_:return{byteLength:1,components:1};case to:case w_:case Gi:return{byteLength:2,components:1};case Wh:case jh:return{byteLength:2,components:4};case Si:case Hh:case di:return{byteLength:4,components:1};case x_:case A_:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:zh}}));typeof window<"u"&&(window.__THREE__?Ve("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=zh);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function W_(){let e=null,t=!1,n=null,i=null;function r(s,a){n(s,a),i=e.requestAnimationFrame(r)}return{start:function(){t!==!0&&n!==null&&e!==null&&(i=e.requestAnimationFrame(r),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(s){n=s},setContext:function(s){e=s}}}function PE(e){const t=new WeakMap;function n(o,l){const u=o.array,f=o.usage,h=u.byteLength,c=e.createBuffer();e.bindBuffer(l,c),e.bufferData(l,u,f),o.onUploadCallback();let p;if(u instanceof Float32Array)p=e.FLOAT;else if(typeof Float16Array<"u"&&u instanceof Float16Array)p=e.HALF_FLOAT;else if(u instanceof Uint16Array)o.isFloat16BufferAttribute?p=e.HALF_FLOAT:p=e.UNSIGNED_SHORT;else if(u instanceof Int16Array)p=e.SHORT;else if(u instanceof Uint32Array)p=e.UNSIGNED_INT;else if(u instanceof Int32Array)p=e.INT;else if(u instanceof Int8Array)p=e.BYTE;else if(u instanceof Uint8Array)p=e.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)p=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:c,type:p,bytesPerElement:u.BYTES_PER_ELEMENT,version:o.version,size:h}}function i(o,l,u){const f=l.array,h=l.updateRanges;if(e.bindBuffer(u,o),h.length===0)e.bufferSubData(u,0,f);else{h.sort((p,m)=>p.start-m.start);let c=0;for(let p=1;p<h.length;p++){const m=h[c],_=h[p];_.start<=m.start+m.count+1?m.count=Math.max(m.count,_.start+_.count-m.start):(++c,h[c]=_)}h.length=c+1;for(let p=0,m=h.length;p<m;p++){const _=h[p];e.bufferSubData(u,_.start*f.BYTES_PER_ELEMENT,f,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(e.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const f=t.get(o);(!f||f.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const u=t.get(o);if(u===void 0)t.set(o,n(o,l));else if(u.version<o.version){if(u.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(u.buffer,o,l),u.version=o.version}}return{get:r,remove:s,update:a}}var IE=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,NE=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,LE=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,DE=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,UE=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,FE=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,OE=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,kE=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,BE=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,zE=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,GE=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,VE=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,HE=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,WE=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,jE=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,XE=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,$E=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,YE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,qE=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,KE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,ZE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,QE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,JE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,eT=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,tT=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,nT=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,iT=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,rT=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,sT=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,aT=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,oT="gl_FragColor = linearToOutputTexel( gl_FragColor );",lT=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,uT=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,cT=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,fT=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,dT=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,hT=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,pT=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,mT=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,gT=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,vT=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,_T=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,ST=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,yT=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,MT=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ET=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,TT=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,bT=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,wT=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,xT=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,AT=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,CT=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,RT=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,PT=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = inverseTransformDirection( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,IT=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,NT=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,LT=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,DT=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,UT=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,FT=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,OT=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,kT=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,BT=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,zT=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,GT=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,VT=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,HT=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,WT=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,jT=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,XT=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,$T=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,YT=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,qT=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,KT=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,ZT=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,QT=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,JT=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,eb=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,tb=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,nb=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ib=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,rb=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,sb=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ab=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,ob=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,lb=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ub=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,cb=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,fb=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,db=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,hb=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,pb=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,mb=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,gb=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,vb=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,_b=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Sb=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,yb=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Mb=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Eb=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Tb=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,bb=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,wb=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,xb=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Ab=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Cb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Rb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Pb=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ib=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Nb=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Lb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Db=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ub=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Fb=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ob=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,kb=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Bb=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,zb=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Gb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Vb=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hb=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Wb=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,jb=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Xb=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$b=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Yb=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qb=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Kb=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Zb=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Qb=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Jb=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ew=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,tw=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,nw=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,iw=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,rw=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sw=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,aw=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ow=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,lw=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,uw=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,cw=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ye={alphahash_fragment:IE,alphahash_pars_fragment:NE,alphamap_fragment:LE,alphamap_pars_fragment:DE,alphatest_fragment:UE,alphatest_pars_fragment:FE,aomap_fragment:OE,aomap_pars_fragment:kE,batching_pars_vertex:BE,batching_vertex:zE,begin_vertex:GE,beginnormal_vertex:VE,bsdfs:HE,iridescence_fragment:WE,bumpmap_pars_fragment:jE,clipping_planes_fragment:XE,clipping_planes_pars_fragment:$E,clipping_planes_pars_vertex:YE,clipping_planes_vertex:qE,color_fragment:KE,color_pars_fragment:ZE,color_pars_vertex:QE,color_vertex:JE,common:eT,cube_uv_reflection_fragment:tT,defaultnormal_vertex:nT,displacementmap_pars_vertex:iT,displacementmap_vertex:rT,emissivemap_fragment:sT,emissivemap_pars_fragment:aT,colorspace_fragment:oT,colorspace_pars_fragment:lT,envmap_fragment:uT,envmap_common_pars_fragment:cT,envmap_pars_fragment:fT,envmap_pars_vertex:dT,envmap_physical_pars_fragment:TT,envmap_vertex:hT,fog_vertex:pT,fog_pars_vertex:mT,fog_fragment:gT,fog_pars_fragment:vT,gradientmap_pars_fragment:_T,lightmap_pars_fragment:ST,lights_lambert_fragment:yT,lights_lambert_pars_fragment:MT,lights_pars_begin:ET,lights_toon_fragment:bT,lights_toon_pars_fragment:wT,lights_phong_fragment:xT,lights_phong_pars_fragment:AT,lights_physical_fragment:CT,lights_physical_pars_fragment:RT,lights_fragment_begin:PT,lights_fragment_maps:IT,lights_fragment_end:NT,lightprobes_pars_fragment:LT,logdepthbuf_fragment:DT,logdepthbuf_pars_fragment:UT,logdepthbuf_pars_vertex:FT,logdepthbuf_vertex:OT,map_fragment:kT,map_pars_fragment:BT,map_particle_fragment:zT,map_particle_pars_fragment:GT,metalnessmap_fragment:VT,metalnessmap_pars_fragment:HT,morphinstance_vertex:WT,morphcolor_vertex:jT,morphnormal_vertex:XT,morphtarget_pars_vertex:$T,morphtarget_vertex:YT,normal_fragment_begin:qT,normal_fragment_maps:KT,normal_pars_fragment:ZT,normal_pars_vertex:QT,normal_vertex:JT,normalmap_pars_fragment:eb,clearcoat_normal_fragment_begin:tb,clearcoat_normal_fragment_maps:nb,clearcoat_pars_fragment:ib,iridescence_pars_fragment:rb,opaque_fragment:sb,packing:ab,premultiplied_alpha_fragment:ob,project_vertex:lb,dithering_fragment:ub,dithering_pars_fragment:cb,roughnessmap_fragment:fb,roughnessmap_pars_fragment:db,shadowmap_pars_fragment:hb,shadowmap_pars_vertex:pb,shadowmap_vertex:mb,shadowmask_pars_fragment:gb,skinbase_vertex:vb,skinning_pars_vertex:_b,skinning_vertex:Sb,skinnormal_vertex:yb,specularmap_fragment:Mb,specularmap_pars_fragment:Eb,tonemapping_fragment:Tb,tonemapping_pars_fragment:bb,transmission_fragment:wb,transmission_pars_fragment:xb,uv_pars_fragment:Ab,uv_pars_vertex:Cb,uv_vertex:Rb,worldpos_vertex:Pb,background_vert:Ib,background_frag:Nb,backgroundCube_vert:Lb,backgroundCube_frag:Db,cube_vert:Ub,cube_frag:Fb,depth_vert:Ob,depth_frag:kb,distance_vert:Bb,distance_frag:zb,equirect_vert:Gb,equirect_frag:Vb,linedashed_vert:Hb,linedashed_frag:Wb,meshbasic_vert:jb,meshbasic_frag:Xb,meshlambert_vert:$b,meshlambert_frag:Yb,meshmatcap_vert:qb,meshmatcap_frag:Kb,meshnormal_vert:Zb,meshnormal_frag:Qb,meshphong_vert:Jb,meshphong_frag:ew,meshphysical_vert:tw,meshphysical_frag:nw,meshtoon_vert:iw,meshtoon_frag:rw,points_vert:sw,points_frag:aw,shadow_vert:ow,shadow_frag:lw,sprite_vert:uw,sprite_frag:cw},Ee={common:{diffuse:{value:new qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new je}},envmap:{envMap:{value:null},envMapRotation:{value:new je},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new je}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new je}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new je},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new je},normalScale:{value:new lt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new je},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new je}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new je}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new je}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new V},probesMax:{value:new V},probesResolution:{value:new V}},points:{diffuse:{value:new qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0},uvTransform:{value:new je}},sprite:{diffuse:{value:new qe(16777215)},opacity:{value:1},center:{value:new lt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}}},li={basic:{uniforms:sn([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.fog]),vertexShader:Ye.meshbasic_vert,fragmentShader:Ye.meshbasic_frag},lambert:{uniforms:sn([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,Ee.lights,{emissive:{value:new qe(0)},envMapIntensity:{value:1}}]),vertexShader:Ye.meshlambert_vert,fragmentShader:Ye.meshlambert_frag},phong:{uniforms:sn([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,Ee.lights,{emissive:{value:new qe(0)},specular:{value:new qe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ye.meshphong_vert,fragmentShader:Ye.meshphong_frag},standard:{uniforms:sn([Ee.common,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.roughnessmap,Ee.metalnessmap,Ee.fog,Ee.lights,{emissive:{value:new qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ye.meshphysical_vert,fragmentShader:Ye.meshphysical_frag},toon:{uniforms:sn([Ee.common,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.gradientmap,Ee.fog,Ee.lights,{emissive:{value:new qe(0)}}]),vertexShader:Ye.meshtoon_vert,fragmentShader:Ye.meshtoon_frag},matcap:{uniforms:sn([Ee.common,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,{matcap:{value:null}}]),vertexShader:Ye.meshmatcap_vert,fragmentShader:Ye.meshmatcap_frag},points:{uniforms:sn([Ee.points,Ee.fog]),vertexShader:Ye.points_vert,fragmentShader:Ye.points_frag},dashed:{uniforms:sn([Ee.common,Ee.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ye.linedashed_vert,fragmentShader:Ye.linedashed_frag},depth:{uniforms:sn([Ee.common,Ee.displacementmap]),vertexShader:Ye.depth_vert,fragmentShader:Ye.depth_frag},normal:{uniforms:sn([Ee.common,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,{opacity:{value:1}}]),vertexShader:Ye.meshnormal_vert,fragmentShader:Ye.meshnormal_frag},sprite:{uniforms:sn([Ee.sprite,Ee.fog]),vertexShader:Ye.sprite_vert,fragmentShader:Ye.sprite_frag},background:{uniforms:{uvTransform:{value:new je},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ye.background_vert,fragmentShader:Ye.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new je}},vertexShader:Ye.backgroundCube_vert,fragmentShader:Ye.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ye.cube_vert,fragmentShader:Ye.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ye.equirect_vert,fragmentShader:Ye.equirect_frag},distance:{uniforms:sn([Ee.common,Ee.displacementmap,{referencePosition:{value:new V},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ye.distance_vert,fragmentShader:Ye.distance_frag},shadow:{uniforms:sn([Ee.lights,Ee.fog,{color:{value:new qe(0)},opacity:{value:1}}]),vertexShader:Ye.shadow_vert,fragmentShader:Ye.shadow_frag}};li.physical={uniforms:sn([li.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new je},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new je},clearcoatNormalScale:{value:new lt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new je},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new je},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new je},sheen:{value:0},sheenColor:{value:new qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new je},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new je},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new je},transmissionSamplerSize:{value:new lt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new je},attenuationDistance:{value:0},attenuationColor:{value:new qe(0)},specularColor:{value:new qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new je},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new je},anisotropyVector:{value:new lt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new je}}]),vertexShader:Ye.meshphysical_vert,fragmentShader:Ye.meshphysical_frag};const sl={r:0,b:0,g:0},fw=new wt,j_=new je;j_.set(-1,0,0,0,1,0,0,0,1);function dw(e,t,n,i,r,s){const a=new qe(0);let o=r===!0?0:1,l,u,f=null,h=0,c=null;function p(v){let y=v.isScene===!0?v.background:null;if(y&&y.isTexture){const M=v.backgroundBlurriness>0;y=t.get(y,M)}return y}function m(v){let y=!1;const M=p(v);M===null?g(a,o):M&&M.isColor&&(g(M,1),y=!0);const T=e.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,s):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,s),(e.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function _(v,y){const M=p(y);M&&(M.isCubeTexture||M.mapping===Pu)?(u===void 0&&(u=new ct(new Li(1,1,1),new Gn({name:"BackgroundCubeMaterial",uniforms:qs(li.backgroundCube.uniforms),vertexShader:li.backgroundCube.vertexShader,fragmentShader:li.backgroundCube.fragmentShader,side:_n,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(T,b,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),u.material.uniforms.envMap.value=M,u.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(fw.makeRotationFromEuler(y.backgroundRotation)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&u.material.uniforms.backgroundRotation.value.premultiply(j_),u.material.toneMapped=et.getTransfer(M.colorSpace)!==ft,(f!==M||h!==M.version||c!==e.toneMapping)&&(u.material.needsUpdate=!0,f=M,h=M.version,c=e.toneMapping),u.layers.enableAll(),v.unshift(u,u.geometry,u.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new ct(new Iu(2,2),new Gn({name:"BackgroundMaterial",uniforms:qs(li.background.uniforms),vertexShader:li.background.vertexShader,fragmentShader:li.background.fragmentShader,side:_i,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=M,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.toneMapped=et.getTransfer(M.colorSpace)!==ft,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(f!==M||h!==M.version||c!==e.toneMapping)&&(l.material.needsUpdate=!0,f=M,h=M.version,c=e.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function g(v,y){v.getRGB(sl,G_(e)),n.buffers.color.setClear(sl.r,sl.g,sl.b,y,s)}function d(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(v,y=1){a.set(v),o=y,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(v){o=v,g(a,o)},render:m,addToRenderList:_,dispose:d}}function hw(e,t){const n=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},r=c(null);let s=r,a=!1;function o(R,L,F,B,D){let z=!1;const H=h(R,B,F,L);s!==H&&(s=H,u(s.object)),z=p(R,B,F,D),z&&m(R,B,F,D),D!==null&&t.update(D,e.ELEMENT_ARRAY_BUFFER),(z||a)&&(a=!1,M(R,L,F,B),D!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(D).buffer))}function l(){return e.createVertexArray()}function u(R){return e.bindVertexArray(R)}function f(R){return e.deleteVertexArray(R)}function h(R,L,F,B){const D=B.wireframe===!0;let z=i[L.id];z===void 0&&(z={},i[L.id]=z);const H=R.isInstancedMesh===!0?R.id:0;let U=z[H];U===void 0&&(U={},z[H]=U);let j=U[F.id];j===void 0&&(j={},U[F.id]=j);let J=j[D];return J===void 0&&(J=c(l()),j[D]=J),J}function c(R){const L=[],F=[],B=[];for(let D=0;D<n;D++)L[D]=0,F[D]=0,B[D]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:F,attributeDivisors:B,object:R,attributes:{},index:null}}function p(R,L,F,B){const D=s.attributes,z=L.attributes;let H=0;const U=F.getAttributes();for(const j in U)if(U[j].location>=0){const se=D[j];let ce=z[j];if(ce===void 0&&(j==="instanceMatrix"&&R.instanceMatrix&&(ce=R.instanceMatrix),j==="instanceColor"&&R.instanceColor&&(ce=R.instanceColor)),se===void 0||se.attribute!==ce||ce&&se.data!==ce.data)return!0;H++}return s.attributesNum!==H||s.index!==B}function m(R,L,F,B){const D={},z=L.attributes;let H=0;const U=F.getAttributes();for(const j in U)if(U[j].location>=0){let se=z[j];se===void 0&&(j==="instanceMatrix"&&R.instanceMatrix&&(se=R.instanceMatrix),j==="instanceColor"&&R.instanceColor&&(se=R.instanceColor));const ce={};ce.attribute=se,se&&se.data&&(ce.data=se.data),D[j]=ce,H++}s.attributes=D,s.attributesNum=H,s.index=B}function _(){const R=s.newAttributes;for(let L=0,F=R.length;L<F;L++)R[L]=0}function g(R){d(R,0)}function d(R,L){const F=s.newAttributes,B=s.enabledAttributes,D=s.attributeDivisors;F[R]=1,B[R]===0&&(e.enableVertexAttribArray(R),B[R]=1),D[R]!==L&&(e.vertexAttribDivisor(R,L),D[R]=L)}function v(){const R=s.newAttributes,L=s.enabledAttributes;for(let F=0,B=L.length;F<B;F++)L[F]!==R[F]&&(e.disableVertexAttribArray(F),L[F]=0)}function y(R,L,F,B,D,z,H){H===!0?e.vertexAttribIPointer(R,L,F,D,z):e.vertexAttribPointer(R,L,F,B,D,z)}function M(R,L,F,B){_();const D=B.attributes,z=F.getAttributes(),H=L.defaultAttributeValues;for(const U in z){const j=z[U];if(j.location>=0){let J=D[U];if(J===void 0&&(U==="instanceMatrix"&&R.instanceMatrix&&(J=R.instanceMatrix),U==="instanceColor"&&R.instanceColor&&(J=R.instanceColor)),J!==void 0){const se=J.normalized,ce=J.itemSize,Ie=t.get(J);if(Ie===void 0)continue;const ke=Ie.buffer,Le=Ie.type,ee=Ie.bytesPerElement,pe=Le===e.INT||Le===e.UNSIGNED_INT||J.gpuType===Hh;if(J.isInterleavedBufferAttribute){const fe=J.data,Pe=fe.stride,ze=J.offset;if(fe.isInstancedInterleavedBuffer){for(let Fe=0;Fe<j.locationSize;Fe++)d(j.location+Fe,fe.meshPerAttribute);R.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=fe.meshPerAttribute*fe.count)}else for(let Fe=0;Fe<j.locationSize;Fe++)g(j.location+Fe);e.bindBuffer(e.ARRAY_BUFFER,ke);for(let Fe=0;Fe<j.locationSize;Fe++)y(j.location+Fe,ce/j.locationSize,Le,se,Pe*ee,(ze+ce/j.locationSize*Fe)*ee,pe)}else{if(J.isInstancedBufferAttribute){for(let fe=0;fe<j.locationSize;fe++)d(j.location+fe,J.meshPerAttribute);R.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let fe=0;fe<j.locationSize;fe++)g(j.location+fe);e.bindBuffer(e.ARRAY_BUFFER,ke);for(let fe=0;fe<j.locationSize;fe++)y(j.location+fe,ce/j.locationSize,Le,se,ce*ee,ce/j.locationSize*fe*ee,pe)}}else if(H!==void 0){const se=H[U];if(se!==void 0)switch(se.length){case 2:e.vertexAttrib2fv(j.location,se);break;case 3:e.vertexAttrib3fv(j.location,se);break;case 4:e.vertexAttrib4fv(j.location,se);break;default:e.vertexAttrib1fv(j.location,se)}}}}v()}function T(){x();for(const R in i){const L=i[R];for(const F in L){const B=L[F];for(const D in B){const z=B[D];for(const H in z)f(z[H].object),delete z[H];delete B[D]}}delete i[R]}}function b(R){if(i[R.id]===void 0)return;const L=i[R.id];for(const F in L){const B=L[F];for(const D in B){const z=B[D];for(const H in z)f(z[H].object),delete z[H];delete B[D]}}delete i[R.id]}function w(R){for(const L in i){const F=i[L];for(const B in F){const D=F[B];if(D[R.id]===void 0)continue;const z=D[R.id];for(const H in z)f(z[H].object),delete z[H];delete D[R.id]}}}function S(R){for(const L in i){const F=i[L],B=R.isInstancedMesh===!0?R.id:0,D=F[B];if(D!==void 0){for(const z in D){const H=D[z];for(const U in H)f(H[U].object),delete H[U];delete D[z]}delete F[B],Object.keys(F).length===0&&delete i[L]}}}function x(){P(),a=!0,s!==r&&(s=r,u(s.object))}function P(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:x,resetDefaultState:P,dispose:T,releaseStatesOfGeometry:b,releaseStatesOfObject:S,releaseStatesOfProgram:w,initAttributes:_,enableAttribute:g,disableUnusedAttributes:v}}function pw(e,t,n){let i;function r(l){i=l}function s(l,u){e.drawArrays(i,l,u),n.update(u,i,1)}function a(l,u,f){f!==0&&(e.drawArraysInstanced(i,l,u,f),n.update(u,i,f))}function o(l,u,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,u,0,f);let c=0;for(let p=0;p<f;p++)c+=u[p];n.update(c,i,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function mw(e,t,n,i){let r;function s(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){const w=t.get("EXT_texture_filter_anisotropic");r=e.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(w){return!(w!==Zn&&i.convert(w)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(w){const S=w===Gi&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(w!==bn&&i.convert(w)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==di&&!S)}function l(w){if(w==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let u=n.precision!==void 0?n.precision:"highp";const f=l(u);f!==u&&(Ve("WebGLRenderer:",u,"not supported, using",f,"instead."),u=f);const h=n.logarithmicDepthBuffer===!0,c=n.reversedDepthBuffer===!0&&t.has("EXT_clip_control");n.reversedDepthBuffer===!0&&c===!1&&Ve("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),d=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),M=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),T=e.getParameter(e.MAX_SAMPLES),b=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:u,logarithmicDepthBuffer:h,reversedDepthBuffer:c,maxTextures:p,maxVertexTextures:m,maxTextureSize:_,maxCubemapSize:g,maxAttributes:d,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:M,maxSamples:T,samples:b}}function gw(e){const t=this;let n=null,i=0,r=!1,s=!1;const a=new Ir,o=new je,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,c){const p=h.length!==0||c||i!==0||r;return r=c,i=h.length,p},this.beginShadows=function(){s=!0,f(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,c){n=f(h,c,0)},this.setState=function(h,c,p){const m=h.clippingPlanes,_=h.clipIntersection,g=h.clipShadows,d=e.get(h);if(!r||m===null||m.length===0||s&&!g)s?f(null):u();else{const v=s?0:i,y=v*4;let M=d.clippingState||null;l.value=M,M=f(m,c,y,p);for(let T=0;T!==y;++T)M[T]=n[T];d.clippingState=M,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function u(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function f(h,c,p,m){const _=h!==null?h.length:0;let g=null;if(_!==0){if(g=l.value,m!==!0||g===null){const d=p+_*4,v=c.matrixWorldInverse;o.getNormalMatrix(v),(g===null||g.length<d)&&(g=new Float32Array(d));for(let y=0,M=p;y!==_;++y,M+=4)a.copy(h[y]).applyMatrix4(v,o),a.normal.toArray(g,M),g[M+3]=a.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,g}}const ur=4,wm=[.125,.215,.35,.446,.526,.582],Fr=20,vw=256,ga=new np,xm=new qe;let Bc=null,zc=0,Gc=0,Vc=!1;const _w=new V;class Am{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,n=0,i=.1,r=100,s={}){const{size:a=256,position:o=_w}=s;Bc=this._renderer.getRenderTarget(),zc=this._renderer.getActiveCubeFace(),Gc=this._renderer.getActiveMipmapLevel(),Vc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,r,l,o),n>0&&this._blur(l,0,0,n),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,n=null){return this._fromTexture(t,n)}fromCubemap(t,n=null){return this._fromTexture(t,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Pm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Rm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Bc,zc,Gc),this._renderer.xr.enabled=Vc,t.scissorTest=!1,_s(t,0,0,t.width,t.height)}_fromTexture(t,n){t.mapping===Kr||t.mapping===$s?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Bc=this._renderer.getRenderTarget(),zc=this._renderer.getActiveCubeFace(),Gc=this._renderer.getActiveMipmapLevel(),Vc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:en,minFilter:en,generateMipmaps:!1,type:Gi,format:Zn,colorSpace:au,depthBuffer:!1},r=Cm(t,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Cm(t,n,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Sw(s)),this._blurMaterial=Mw(s,t,n),this._ggxMaterial=yw(s,t,n)}return r}_compileMaterial(t){const n=new ct(new cn,t);this._renderer.compile(n,ga)}_sceneToCubeUV(t,n,i,r,s){const l=new Tn(90,1,n,i),u=[1,-1,1,1,1,1],f=[1,1,1,-1,-1,-1],h=this._renderer,c=h.autoClear,p=h.toneMapping;h.getClearColor(xm),h.toneMapping=gi,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(r),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ct(new Li,new uu({name:"PMREM.Background",side:_n,depthWrite:!1,depthTest:!1})));const _=this._backgroundBox,g=_.material;let d=!1;const v=t.background;v?v.isColor&&(g.color.copy(v),t.background=null,d=!0):(g.color.copy(xm),d=!0);for(let y=0;y<6;y++){const M=y%3;M===0?(l.up.set(0,u[y],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+f[y],s.y,s.z)):M===1?(l.up.set(0,0,u[y]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+f[y],s.z)):(l.up.set(0,u[y],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+f[y]));const T=this._cubeSize;_s(r,M*T,y>2?T:0,T,T),h.setRenderTarget(r),d&&h.render(_,l),h.render(t,l)}h.toneMapping=p,h.autoClear=c,t.background=v}_textureToCubeUV(t,n){const i=this._renderer,r=t.mapping===Kr||t.mapping===$s;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Pm()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Rm());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=t;const l=this._cubeSize;_s(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(a,ga)}_applyPMREM(t){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(t,s-1,s);n.autoClear=i}_applyGGXFilter(t,n,i){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const l=a.uniforms,u=i/(this._lodMeshes.length-1),f=n/(this._lodMeshes.length-1),h=Math.sqrt(u*u-f*f),c=0+u*1.25,p=h*c,{_lodMax:m}=this,_=this._sizeLods[i],g=3*_*(i>m-ur?i-m+ur:0),d=4*(this._cubeSize-_);l.envMap.value=t.texture,l.roughness.value=p,l.mipInt.value=m-n,_s(s,g,d,3*_,2*_),r.setRenderTarget(s),r.render(o,ga),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=m-i,_s(t,g,d,3*_,2*_),r.setRenderTarget(t),r.render(o,ga)}_blur(t,n,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(t,a,n,i,r,"latitudinal",s),this._halfBlur(a,t,i,i,r,"longitudinal",s)}_halfBlur(t,n,i,r,s,a,o){const l=this._renderer,u=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&st("blur direction must be either latitudinal or longitudinal!");const f=3,h=this._lodMeshes[r];h.material=u;const c=u.uniforms,p=this._sizeLods[i]-1,m=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Fr-1),_=s/m,g=isFinite(s)?1+Math.floor(f*_):Fr;g>Fr&&Ve(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Fr}`);const d=[];let v=0;for(let w=0;w<Fr;++w){const S=w/_,x=Math.exp(-S*S/2);d.push(x),w===0?v+=x:w<g&&(v+=2*x)}for(let w=0;w<d.length;w++)d[w]=d[w]/v;c.envMap.value=t.texture,c.samples.value=g,c.weights.value=d,c.latitudinal.value=a==="latitudinal",o&&(c.poleAxis.value=o);const{_lodMax:y}=this;c.dTheta.value=m,c.mipInt.value=y-i;const M=this._sizeLods[r],T=3*M*(r>y-ur?r-y+ur:0),b=4*(this._cubeSize-M);_s(n,T,b,3*M,2*M),l.setRenderTarget(n),l.render(h,ga)}}function Sw(e){const t=[],n=[],i=[];let r=e;const s=e-ur+1+wm.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);t.push(o);let l=1/o;a>e-ur?l=wm[a-e+ur-1]:a===0&&(l=0),n.push(l);const u=1/(o-2),f=-u,h=1+u,c=[f,f,h,f,h,h,f,f,h,h,f,h],p=6,m=6,_=3,g=2,d=1,v=new Float32Array(_*m*p),y=new Float32Array(g*m*p),M=new Float32Array(d*m*p);for(let b=0;b<p;b++){const w=b%3*2/3-1,S=b>2?0:-1,x=[w,S,0,w+2/3,S,0,w+2/3,S+1,0,w,S,0,w+2/3,S+1,0,w,S+1,0];v.set(x,_*m*b),y.set(c,g*m*b);const P=[b,b,b,b,b,b];M.set(P,d*m*b)}const T=new cn;T.setAttribute("position",new kn(v,_)),T.setAttribute("uv",new kn(y,g)),T.setAttribute("faceIndex",new kn(M,d)),i.push(new ct(T,null)),r>ur&&r--}return{lodMeshes:i,sizeLods:t,sigmas:n}}function Cm(e,t,n){const i=new vi(e,t,n);return i.texture.mapping=Pu,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function _s(e,t,n,i,r){e.viewport.set(t,n,i,r),e.scissor.set(t,n,i,r)}function yw(e,t,n){return new Gn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:vw,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Nu(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Ui,depthTest:!1,depthWrite:!1})}function Mw(e,t,n){const i=new Float32Array(Fr),r=new V(0,1,0);return new Gn({name:"SphericalGaussianBlur",defines:{n:Fr,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Nu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Ui,depthTest:!1,depthWrite:!1})}function Rm(){return new Gn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Nu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ui,depthTest:!1,depthWrite:!1})}function Pm(){return new Gn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Nu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ui,depthTest:!1,depthWrite:!1})}function Nu(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class X_ extends vi{constructor(t=1,n={}){super(t,t,n),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},r=[i,i,i,i,i,i];this.texture=new B_(r),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Li(5,5,5),s=new Gn({name:"CubemapFromEquirect",uniforms:qs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:_n,blending:Ui});s.uniforms.tEquirect.value=n;const a=new ct(r,s),o=n.minFilter;return n.minFilter===zr&&(n.minFilter=en),new AE(1,10,this).update(t,a),n.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,n=!0,i=!0,r=!0){const s=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(n,i,r);t.setRenderTarget(s)}}function Ew(e){let t=new WeakMap,n=new WeakMap,i=null;function r(c,p=!1){return c==null?null:p?a(c):s(c)}function s(c){if(c&&c.isTexture){const p=c.mapping;if(p===cc||p===fc)if(t.has(c)){const m=t.get(c).texture;return o(m,c.mapping)}else{const m=c.image;if(m&&m.height>0){const _=new X_(m.height);return _.fromEquirectangularTexture(e,c),t.set(c,_),c.addEventListener("dispose",u),o(_.texture,c.mapping)}else return null}}return c}function a(c){if(c&&c.isTexture){const p=c.mapping,m=p===cc||p===fc,_=p===Kr||p===$s;if(m||_){let g=n.get(c);const d=g!==void 0?g.texture.pmremVersion:0;if(c.isRenderTargetTexture&&c.pmremVersion!==d)return i===null&&(i=new Am(e)),g=m?i.fromEquirectangular(c,g):i.fromCubemap(c,g),g.texture.pmremVersion=c.pmremVersion,n.set(c,g),g.texture;if(g!==void 0)return g.texture;{const v=c.image;return m&&v&&v.height>0||_&&v&&l(v)?(i===null&&(i=new Am(e)),g=m?i.fromEquirectangular(c):i.fromCubemap(c),g.texture.pmremVersion=c.pmremVersion,n.set(c,g),c.addEventListener("dispose",f),g.texture):null}}}return c}function o(c,p){return p===cc?c.mapping=Kr:p===fc&&(c.mapping=$s),c}function l(c){let p=0;const m=6;for(let _=0;_<m;_++)c[_]!==void 0&&p++;return p===m}function u(c){const p=c.target;p.removeEventListener("dispose",u);const m=t.get(p);m!==void 0&&(t.delete(p),m.dispose())}function f(c){const p=c.target;p.removeEventListener("dispose",f);const m=n.get(p);m!==void 0&&(n.delete(p),m.dispose())}function h(){t=new WeakMap,n=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:h}}function Tw(e){const t={};function n(i){if(t[i]!==void 0)return t[i];const r=e.getExtension(i);return t[i]=r,r}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const r=n(i);return r===null&&Id("WebGLRenderer: "+i+" extension not supported."),r}}}function bw(e,t,n,i){const r={},s=new WeakMap;function a(h){const c=h.target;c.index!==null&&t.remove(c.index);for(const m in c.attributes)t.remove(c.attributes[m]);c.removeEventListener("dispose",a),delete r[c.id];const p=s.get(c);p&&(t.remove(p),s.delete(c)),i.releaseStatesOfGeometry(c),c.isInstancedBufferGeometry===!0&&delete c._maxInstanceCount,n.memory.geometries--}function o(h,c){return r[c.id]===!0||(c.addEventListener("dispose",a),r[c.id]=!0,n.memory.geometries++),c}function l(h){const c=h.attributes;for(const p in c)t.update(c[p],e.ARRAY_BUFFER)}function u(h){const c=[],p=h.index,m=h.attributes.position;let _=0;if(m===void 0)return;if(p!==null){const v=p.array;_=p.version;for(let y=0,M=v.length;y<M;y+=3){const T=v[y+0],b=v[y+1],w=v[y+2];c.push(T,b,b,w,w,T)}}else{const v=m.array;_=m.version;for(let y=0,M=v.length/3-1;y<M;y+=3){const T=y+0,b=y+1,w=y+2;c.push(T,b,b,w,w,T)}}const g=new(m.count>=65535?F_:U_)(c,1);g.version=_;const d=s.get(h);d&&t.remove(d),s.set(h,g)}function f(h){const c=s.get(h);if(c){const p=h.index;p!==null&&c.version<p.version&&u(h)}else u(h);return s.get(h)}return{get:o,update:l,getWireframeAttribute:f}}function ww(e,t,n){let i;function r(h){i=h}let s,a;function o(h){s=h.type,a=h.bytesPerElement}function l(h,c){e.drawElements(i,c,s,h*a),n.update(c,i,1)}function u(h,c,p){p!==0&&(e.drawElementsInstanced(i,c,s,h*a,p),n.update(c,i,p))}function f(h,c,p){if(p===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,c,0,s,h,0,p);let _=0;for(let g=0;g<p;g++)_+=c[g];n.update(_,i,1)}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=u,this.renderMultiDraw=f}function xw(e){const t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(n.calls++,a){case e.TRIANGLES:n.triangles+=o*(s/3);break;case e.LINES:n.lines+=o*(s/2);break;case e.LINE_STRIP:n.lines+=o*(s-1);break;case e.LINE_LOOP:n.lines+=o*s;break;case e.POINTS:n.points+=o*s;break;default:st("WebGLInfo: Unknown draw mode:",a);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:r,update:i}}function Aw(e,t,n){const i=new WeakMap,r=new Rt;function s(a,o,l){const u=a.morphTargetInfluences,f=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=f!==void 0?f.length:0;let c=i.get(o);if(c===void 0||c.count!==h){let P=function(){S.dispose(),i.delete(o),o.removeEventListener("dispose",P)};var p=P;c!==void 0&&c.texture.dispose();const m=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,d=o.morphAttributes.position||[],v=o.morphAttributes.normal||[],y=o.morphAttributes.color||[];let M=0;m===!0&&(M=1),_===!0&&(M=2),g===!0&&(M=3);let T=o.attributes.position.count*M,b=1;T>t.maxTextureSize&&(b=Math.ceil(T/t.maxTextureSize),T=t.maxTextureSize);const w=new Float32Array(T*b*4*h),S=new N_(w,T,b,h);S.type=di,S.needsUpdate=!0;const x=M*4;for(let R=0;R<h;R++){const L=d[R],F=v[R],B=y[R],D=T*b*4*R;for(let z=0;z<L.count;z++){const H=z*x;m===!0&&(r.fromBufferAttribute(L,z),w[D+H+0]=r.x,w[D+H+1]=r.y,w[D+H+2]=r.z,w[D+H+3]=0),_===!0&&(r.fromBufferAttribute(F,z),w[D+H+4]=r.x,w[D+H+5]=r.y,w[D+H+6]=r.z,w[D+H+7]=0),g===!0&&(r.fromBufferAttribute(B,z),w[D+H+8]=r.x,w[D+H+9]=r.y,w[D+H+10]=r.z,w[D+H+11]=B.itemSize===4?r.w:1)}}c={count:h,texture:S,size:new lt(T,b)},i.set(o,c),o.addEventListener("dispose",P)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(e,"morphTexture",a.morphTexture,n);else{let m=0;for(let g=0;g<u.length;g++)m+=u[g];const _=o.morphTargetsRelative?1:1-m;l.getUniforms().setValue(e,"morphTargetBaseInfluence",_),l.getUniforms().setValue(e,"morphTargetInfluences",u)}l.getUniforms().setValue(e,"morphTargetsTexture",c.texture,n),l.getUniforms().setValue(e,"morphTargetsTextureSize",c.size)}return{update:s}}function Cw(e,t,n,i,r){let s=new WeakMap;function a(u){const f=r.render.frame,h=u.geometry,c=t.get(u,h);if(s.get(c)!==f&&(t.update(c),s.set(c,f)),u.isInstancedMesh&&(u.hasEventListener("dispose",l)===!1&&u.addEventListener("dispose",l),s.get(u)!==f&&(n.update(u.instanceMatrix,e.ARRAY_BUFFER),u.instanceColor!==null&&n.update(u.instanceColor,e.ARRAY_BUFFER),s.set(u,f))),u.isSkinnedMesh){const p=u.skeleton;s.get(p)!==f&&(p.update(),s.set(p,f))}return c}function o(){s=new WeakMap}function l(u){const f=u.target;f.removeEventListener("dispose",l),i.releaseStatesOfObject(f),n.remove(f.instanceMatrix),f.instanceColor!==null&&n.remove(f.instanceColor)}return{update:a,dispose:o}}const Rw={[v_]:"LINEAR_TONE_MAPPING",[__]:"REINHARD_TONE_MAPPING",[S_]:"CINEON_TONE_MAPPING",[Vh]:"ACES_FILMIC_TONE_MAPPING",[M_]:"AGX_TONE_MAPPING",[E_]:"NEUTRAL_TONE_MAPPING",[y_]:"CUSTOM_TONE_MAPPING"};function Pw(e,t,n,i,r){const s=new vi(t,n,{type:e,depthBuffer:i,stencilBuffer:r,depthTexture:i?new Ys(t,n):void 0}),a=new vi(t,n,{type:Gi,depthBuffer:!1,stencilBuffer:!1}),o=new cn;o.setAttribute("position",new nn([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new nn([0,2,0,0,2,0],2));const l=new yE({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),u=new ct(o,l),f=new np(-1,1,1,-1,0,1);let h=null,c=null,p=!1,m,_=null,g=[],d=!1;this.setSize=function(v,y){s.setSize(v,y),a.setSize(v,y);for(let M=0;M<g.length;M++){const T=g[M];T.setSize&&T.setSize(v,y)}},this.setEffects=function(v){g=v,d=g.length>0&&g[0].isRenderPass===!0;const y=s.width,M=s.height;for(let T=0;T<g.length;T++){const b=g[T];b.setSize&&b.setSize(y,M)}},this.begin=function(v,y){if(p||v.toneMapping===gi&&g.length===0)return!1;if(_=y,y!==null){const M=y.width,T=y.height;(s.width!==M||s.height!==T)&&this.setSize(M,T)}return d===!1&&v.setRenderTarget(s),m=v.toneMapping,v.toneMapping=gi,!0},this.hasRenderPass=function(){return d},this.end=function(v,y){v.toneMapping=m,p=!0;let M=s,T=a;for(let b=0;b<g.length;b++){const w=g[b];if(w.enabled!==!1&&(w.render(v,T,M,y),w.needsSwap!==!1)){const S=M;M=T,T=S}}if(h!==v.outputColorSpace||c!==v.toneMapping){h=v.outputColorSpace,c=v.toneMapping,l.defines={},et.getTransfer(h)===ft&&(l.defines.SRGB_TRANSFER="");const b=Rw[c];b&&(l.defines[b]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=M.texture,v.setRenderTarget(_),v.render(u,f),_=null,p=!1},this.isCompositing=function(){return p},this.dispose=function(){s.depthTexture&&s.depthTexture.dispose(),s.dispose(),a.dispose(),o.dispose(),l.dispose()}}const $_=new tn,Dd=new Ys(1,1),Y_=new N_,q_=new q2,K_=new B_,Im=[],Nm=[],Lm=new Float32Array(16),Dm=new Float32Array(9),Um=new Float32Array(4);function ea(e,t,n){const i=e[0];if(i<=0||i>0)return e;const r=t*n;let s=Im[r];if(s===void 0&&(s=new Float32Array(r),Im[r]=s),t!==0){i.toArray(s,0);for(let a=1,o=0;a!==t;++a)o+=n,e[a].toArray(s,o)}return s}function kt(e,t){if(e.length!==t.length)return!1;for(let n=0,i=e.length;n<i;n++)if(e[n]!==t[n])return!1;return!0}function Bt(e,t){for(let n=0,i=t.length;n<i;n++)e[n]=t[n]}function Lu(e,t){let n=Nm[t];n===void 0&&(n=new Int32Array(t),Nm[t]=n);for(let i=0;i!==t;++i)n[i]=e.allocateTextureUnit();return n}function Iw(e,t){const n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function Nw(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(kt(n,t))return;e.uniform2fv(this.addr,t),Bt(n,t)}}function Lw(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(kt(n,t))return;e.uniform3fv(this.addr,t),Bt(n,t)}}function Dw(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(kt(n,t))return;e.uniform4fv(this.addr,t),Bt(n,t)}}function Uw(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(kt(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Bt(n,t)}else{if(kt(n,i))return;Um.set(i),e.uniformMatrix2fv(this.addr,!1,Um),Bt(n,i)}}function Fw(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(kt(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Bt(n,t)}else{if(kt(n,i))return;Dm.set(i),e.uniformMatrix3fv(this.addr,!1,Dm),Bt(n,i)}}function Ow(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(kt(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Bt(n,t)}else{if(kt(n,i))return;Lm.set(i),e.uniformMatrix4fv(this.addr,!1,Lm),Bt(n,i)}}function kw(e,t){const n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function Bw(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(kt(n,t))return;e.uniform2iv(this.addr,t),Bt(n,t)}}function zw(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(kt(n,t))return;e.uniform3iv(this.addr,t),Bt(n,t)}}function Gw(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(kt(n,t))return;e.uniform4iv(this.addr,t),Bt(n,t)}}function Vw(e,t){const n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function Hw(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(kt(n,t))return;e.uniform2uiv(this.addr,t),Bt(n,t)}}function Ww(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(kt(n,t))return;e.uniform3uiv(this.addr,t),Bt(n,t)}}function jw(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(kt(n,t))return;e.uniform4uiv(this.addr,t),Bt(n,t)}}function Xw(e,t,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r);let s;this.type===e.SAMPLER_2D_SHADOW?(Dd.compareFunction=n.isReversedDepthBuffer()?Kh:qh,s=Dd):s=$_,n.setTexture2D(t||s,r)}function $w(e,t,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(t||q_,r)}function Yw(e,t,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(t||K_,r)}function qw(e,t,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(t||Y_,r)}function Kw(e){switch(e){case 5126:return Iw;case 35664:return Nw;case 35665:return Lw;case 35666:return Dw;case 35674:return Uw;case 35675:return Fw;case 35676:return Ow;case 5124:case 35670:return kw;case 35667:case 35671:return Bw;case 35668:case 35672:return zw;case 35669:case 35673:return Gw;case 5125:return Vw;case 36294:return Hw;case 36295:return Ww;case 36296:return jw;case 35678:case 36198:case 36298:case 36306:case 35682:return Xw;case 35679:case 36299:case 36307:return $w;case 35680:case 36300:case 36308:case 36293:return Yw;case 36289:case 36303:case 36311:case 36292:return qw}}function Zw(e,t){e.uniform1fv(this.addr,t)}function Qw(e,t){const n=ea(t,this.size,2);e.uniform2fv(this.addr,n)}function Jw(e,t){const n=ea(t,this.size,3);e.uniform3fv(this.addr,n)}function ex(e,t){const n=ea(t,this.size,4);e.uniform4fv(this.addr,n)}function tx(e,t){const n=ea(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function nx(e,t){const n=ea(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function ix(e,t){const n=ea(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function rx(e,t){e.uniform1iv(this.addr,t)}function sx(e,t){e.uniform2iv(this.addr,t)}function ax(e,t){e.uniform3iv(this.addr,t)}function ox(e,t){e.uniform4iv(this.addr,t)}function lx(e,t){e.uniform1uiv(this.addr,t)}function ux(e,t){e.uniform2uiv(this.addr,t)}function cx(e,t){e.uniform3uiv(this.addr,t)}function fx(e,t){e.uniform4uiv(this.addr,t)}function dx(e,t,n){const i=this.cache,r=t.length,s=Lu(n,r);kt(i,s)||(e.uniform1iv(this.addr,s),Bt(i,s));let a;this.type===e.SAMPLER_2D_SHADOW?a=Dd:a=$_;for(let o=0;o!==r;++o)n.setTexture2D(t[o]||a,s[o])}function hx(e,t,n){const i=this.cache,r=t.length,s=Lu(n,r);kt(i,s)||(e.uniform1iv(this.addr,s),Bt(i,s));for(let a=0;a!==r;++a)n.setTexture3D(t[a]||q_,s[a])}function px(e,t,n){const i=this.cache,r=t.length,s=Lu(n,r);kt(i,s)||(e.uniform1iv(this.addr,s),Bt(i,s));for(let a=0;a!==r;++a)n.setTextureCube(t[a]||K_,s[a])}function mx(e,t,n){const i=this.cache,r=t.length,s=Lu(n,r);kt(i,s)||(e.uniform1iv(this.addr,s),Bt(i,s));for(let a=0;a!==r;++a)n.setTexture2DArray(t[a]||Y_,s[a])}function gx(e){switch(e){case 5126:return Zw;case 35664:return Qw;case 35665:return Jw;case 35666:return ex;case 35674:return tx;case 35675:return nx;case 35676:return ix;case 5124:case 35670:return rx;case 35667:case 35671:return sx;case 35668:case 35672:return ax;case 35669:case 35673:return ox;case 5125:return lx;case 36294:return ux;case 36295:return cx;case 36296:return fx;case 35678:case 36198:case 36298:case 36306:case 35682:return dx;case 35679:case 36299:case 36307:return hx;case 35680:case 36300:case 36308:case 36293:return px;case 36289:case 36303:case 36311:case 36292:return mx}}class vx{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.setValue=Kw(n.type)}}class _x{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=gx(n.type)}}class Sx{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,n,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(t,n[o.id],i)}}}const Hc=/(\w+)(\])?(\[|\.)?/g;function Fm(e,t){e.seq.push(t),e.map[t.id]=t}function yx(e,t,n){const i=e.name,r=i.length;for(Hc.lastIndex=0;;){const s=Hc.exec(i),a=Hc.lastIndex;let o=s[1];const l=s[2]==="]",u=s[3];if(l&&(o=o|0),u===void 0||u==="["&&a+2===r){Fm(n,u===void 0?new vx(o,e,t):new _x(o,e,t));break}else{let h=n.map[o];h===void 0&&(h=new Sx(o),Fm(n,h)),n=h}}}class Pl{constructor(t,n){this.seq=[],this.map={};const i=t.getProgramParameter(n,t.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=t.getActiveUniform(n,a),l=t.getUniformLocation(n,o.name);yx(o,l,this)}const r=[],s=[];for(const a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(t,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(t,i,r)}setOptional(t,n,i){const r=n[i];r!==void 0&&this.setValue(t,i,r)}static upload(t,n,i,r){for(let s=0,a=n.length;s!==a;++s){const o=n[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,r)}}static seqWithValue(t,n){const i=[];for(let r=0,s=t.length;r!==s;++r){const a=t[r];a.id in n&&i.push(a)}return i}}function Om(e,t,n){const i=e.createShader(t);return e.shaderSource(i,n),e.compileShader(i),i}const Mx=37297;let Ex=0;function Tx(e,t){const n=e.split(`
`),i=[],r=Math.max(t-6,0),s=Math.min(t+6,n.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===t?">":" "} ${o}: ${n[a]}`)}return i.join(`
`)}const km=new je;function bx(e){et._getMatrix(km,et.workingColorSpace,e);const t=`mat3( ${km.elements.map(n=>n.toFixed(4))} )`;switch(et.getTransfer(e)){case ou:return[t,"LinearTransferOETF"];case ft:return[t,"sRGBTransferOETF"];default:return Ve("WebGLProgram: Unsupported color space: ",e),[t,"LinearTransferOETF"]}}function Bm(e,t,n){const i=e.getShaderParameter(t,e.COMPILE_STATUS),s=(e.getShaderInfoLog(t)||"").trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return n.toUpperCase()+`

`+s+`

`+Tx(e.getShaderSource(t),o)}else return s}function wx(e,t){const n=bx(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}const xx={[v_]:"Linear",[__]:"Reinhard",[S_]:"Cineon",[Vh]:"ACESFilmic",[M_]:"AgX",[E_]:"Neutral",[y_]:"Custom"};function Ax(e,t){const n=xx[t];return n===void 0?(Ve("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+e+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+e+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const al=new V;function Cx(){et.getLuminanceCoefficients(al);const e=al.x.toFixed(4),t=al.y.toFixed(4),n=al.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${t}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Rx(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(xa).join(`
`)}function Px(e){const t=[];for(const n in e){const i=e[n];i!==!1&&t.push("#define "+n+" "+i)}return t.join(`
`)}function Ix(e,t){const n={},i=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=e.getActiveAttrib(t,r),a=s.name;let o=1;s.type===e.FLOAT_MAT2&&(o=2),s.type===e.FLOAT_MAT3&&(o=3),s.type===e.FLOAT_MAT4&&(o=4),n[a]={type:s.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function xa(e){return e!==""}function zm(e,t){const n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Gm(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Nx=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ud(e){return e.replace(Nx,Dx)}const Lx=new Map;function Dx(e,t){let n=Ye[t];if(n===void 0){const i=Lx.get(t);if(i!==void 0)n=Ye[i],Ve('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Ud(n)}const Ux=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Vm(e){return e.replace(Ux,Fx)}function Fx(e,t,n,i){let r="";for(let s=parseInt(t);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Hm(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision==="highp"?t+=`
#define HIGH_PRECISION`:e.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:e.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}const Ox={[wl]:"SHADOWMAP_TYPE_PCF",[ba]:"SHADOWMAP_TYPE_VSM"};function kx(e){return Ox[e.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Bx={[Kr]:"ENVMAP_TYPE_CUBE",[$s]:"ENVMAP_TYPE_CUBE",[Pu]:"ENVMAP_TYPE_CUBE_UV"};function zx(e){return e.envMap===!1?"ENVMAP_TYPE_CUBE":Bx[e.envMapMode]||"ENVMAP_TYPE_CUBE"}const Gx={[$s]:"ENVMAP_MODE_REFRACTION"};function Vx(e){return e.envMap===!1?"ENVMAP_MODE_REFLECTION":Gx[e.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Hx={[Gh]:"ENVMAP_BLENDING_MULTIPLY",[C2]:"ENVMAP_BLENDING_MIX",[R2]:"ENVMAP_BLENDING_ADD"};function Wx(e){return e.envMap===!1?"ENVMAP_BLENDING_NONE":Hx[e.combine]||"ENVMAP_BLENDING_NONE"}function jx(e){const t=e.envMapCubeUVHeight;if(t===null)return null;const n=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function Xx(e,t,n,i){const r=e.getContext(),s=n.defines;let a=n.vertexShader,o=n.fragmentShader;const l=kx(n),u=zx(n),f=Vx(n),h=Wx(n),c=jx(n),p=Rx(n),m=Px(s),_=r.createProgram();let g,d,v=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(g=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,m].filter(xa).join(`
`),g.length>0&&(g+=`
`),d=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,m].filter(xa).join(`
`),d.length>0&&(d+=`
`)):(g=[Hm(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,m,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+f:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexNormals?"#define HAS_NORMAL":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(xa).join(`
`),d=[Hm(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,m,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+u:"",n.envMap?"#define "+f:"",n.envMap?"#define "+h:"",c?"#define CUBEUV_TEXEL_WIDTH "+c.texelWidth:"",c?"#define CUBEUV_TEXEL_HEIGHT "+c.texelHeight:"",c?"#define CUBEUV_MAX_MIP "+c.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==gi?"#define TONE_MAPPING":"",n.toneMapping!==gi?Ye.tonemapping_pars_fragment:"",n.toneMapping!==gi?Ax("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Ye.colorspace_pars_fragment,wx("linearToOutputTexel",n.outputColorSpace),Cx(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(xa).join(`
`)),a=Ud(a),a=zm(a,n),a=Gm(a,n),o=Ud(o),o=zm(o,n),o=Gm(o,n),a=Vm(a),o=Vm(o),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,d=["#define varying in",n.glslVersion===q0?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===q0?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const y=v+g+a,M=v+d+o,T=Om(r,r.VERTEX_SHADER,y),b=Om(r,r.FRAGMENT_SHADER,M);r.attachShader(_,T),r.attachShader(_,b),n.index0AttributeName!==void 0?r.bindAttribLocation(_,0,n.index0AttributeName):n.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function w(R){if(e.debug.checkShaderErrors){const L=r.getProgramInfoLog(_)||"",F=r.getShaderInfoLog(T)||"",B=r.getShaderInfoLog(b)||"",D=L.trim(),z=F.trim(),H=B.trim();let U=!0,j=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(U=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(r,_,T,b);else{const J=Bm(r,T,"vertex"),se=Bm(r,b,"fragment");st("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+D+`
`+J+`
`+se)}else D!==""?Ve("WebGLProgram: Program Info Log:",D):(z===""||H==="")&&(j=!1);j&&(R.diagnostics={runnable:U,programLog:D,vertexShader:{log:z,prefix:g},fragmentShader:{log:H,prefix:d}})}r.deleteShader(T),r.deleteShader(b),S=new Pl(r,_),x=Ix(r,_)}let S;this.getUniforms=function(){return S===void 0&&w(this),S};let x;this.getAttributes=function(){return x===void 0&&w(this),x};let P=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=r.getProgramParameter(_,Mx)),P},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Ex++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=T,this.fragmentShader=b,this}let $x=0;class Yx{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const n=t.vertexShader,i=t.fragmentShader,r=this._getShaderStage(n),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(t);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(t){const n=this.materialCache.get(t);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const n=this.materialCache;let i=n.get(t);return i===void 0&&(i=new Set,n.set(t,i)),i}_getShaderStage(t){const n=this.shaderCache;let i=n.get(t);return i===void 0&&(i=new qx(t),n.set(t,i)),i}}class qx{constructor(t){this.id=$x++,this.code=t,this.usedTimes=0}}function Kx(e){return e===Zr||e===ru||e===su}function Zx(e,t,n,i,r,s){const a=new L_,o=new Yx,l=new Set,u=[],f=new Map,h=i.logarithmicDepthBuffer;let c=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(S){return l.add(S),S===0?"uv":`uv${S}`}function _(S,x,P,R,L,F){const B=R.fog,D=L.geometry,z=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?R.environment:null,H=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap,U=t.get(S.envMap||z,H),j=U&&U.mapping===Pu?U.image.height:null,J=p[S.type];S.precision!==null&&(c=i.getMaxPrecision(S.precision),c!==S.precision&&Ve("WebGLProgram.getParameters:",S.precision,"not supported, using",c,"instead."));const se=D.morphAttributes.position||D.morphAttributes.normal||D.morphAttributes.color,ce=se!==void 0?se.length:0;let Ie=0;D.morphAttributes.position!==void 0&&(Ie=1),D.morphAttributes.normal!==void 0&&(Ie=2),D.morphAttributes.color!==void 0&&(Ie=3);let ke,Le,ee,pe;if(J){const Xe=li[J];ke=Xe.vertexShader,Le=Xe.fragmentShader}else ke=S.vertexShader,Le=S.fragmentShader,o.update(S),ee=o.getVertexShaderID(S),pe=o.getFragmentShaderID(S);const fe=e.getRenderTarget(),Pe=e.state.buffers.depth.getReversed(),ze=L.isInstancedMesh===!0,Fe=L.isBatchedMesh===!0,nt=!!S.map,We=!!S.matcap,Qe=!!U,ut=!!S.aoMap,me=!!S.lightMap,ot=!!S.bumpMap,Je=!!S.normalMap,He=!!S.displacementMap,O=!!S.emissiveMap,Be=!!S.metalnessMap,q=!!S.roughnessMap,_e=S.anisotropy>0,K=S.clearcoat>0,le=S.dispersion>0,A=S.iridescence>0,E=S.sheen>0,N=S.transmission>0,X=_e&&!!S.anisotropyMap,ne=K&&!!S.clearcoatMap,de=K&&!!S.clearcoatNormalMap,ve=K&&!!S.clearcoatRoughnessMap,Q=A&&!!S.iridescenceMap,te=A&&!!S.iridescenceThicknessMap,Se=E&&!!S.sheenColorMap,Me=E&&!!S.sheenRoughnessMap,re=!!S.specularMap,ae=!!S.specularColorMap,oe=!!S.specularIntensityMap,Te=N&&!!S.transmissionMap,Ge=N&&!!S.thicknessMap,k=!!S.gradientMap,ge=!!S.alphaMap,ie=S.alphaTest>0,we=!!S.alphaHash,ye=!!S.extensions;let ue=gi;S.toneMapped&&(fe===null||fe.isXRRenderTarget===!0)&&(ue=e.toneMapping);const De={shaderID:J,shaderType:S.type,shaderName:S.name,vertexShader:ke,fragmentShader:Le,defines:S.defines,customVertexShaderID:ee,customFragmentShaderID:pe,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:c,batching:Fe,batchingColor:Fe&&L._colorsTexture!==null,instancing:ze,instancingColor:ze&&L.instanceColor!==null,instancingMorph:ze&&L.morphTexture!==null,outputColorSpace:fe===null?e.outputColorSpace:fe.isXRRenderTarget===!0?fe.texture.colorSpace:et.workingColorSpace,alphaToCoverage:!!S.alphaToCoverage,map:nt,matcap:We,envMap:Qe,envMapMode:Qe&&U.mapping,envMapCubeUVHeight:j,aoMap:ut,lightMap:me,bumpMap:ot,normalMap:Je,displacementMap:He,emissiveMap:O,normalMapObjectSpace:Je&&S.normalMapType===N2,normalMapTangentSpace:Je&&S.normalMapType===Pd,packedNormalMap:Je&&S.normalMapType===Pd&&Kx(S.normalMap.format),metalnessMap:Be,roughnessMap:q,anisotropy:_e,anisotropyMap:X,clearcoat:K,clearcoatMap:ne,clearcoatNormalMap:de,clearcoatRoughnessMap:ve,dispersion:le,iridescence:A,iridescenceMap:Q,iridescenceThicknessMap:te,sheen:E,sheenColorMap:Se,sheenRoughnessMap:Me,specularMap:re,specularColorMap:ae,specularIntensityMap:oe,transmission:N,transmissionMap:Te,thicknessMap:Ge,gradientMap:k,opaque:S.transparent===!1&&S.blending===Wr&&S.alphaToCoverage===!1,alphaMap:ge,alphaTest:ie,alphaHash:we,combine:S.combine,mapUv:nt&&m(S.map.channel),aoMapUv:ut&&m(S.aoMap.channel),lightMapUv:me&&m(S.lightMap.channel),bumpMapUv:ot&&m(S.bumpMap.channel),normalMapUv:Je&&m(S.normalMap.channel),displacementMapUv:He&&m(S.displacementMap.channel),emissiveMapUv:O&&m(S.emissiveMap.channel),metalnessMapUv:Be&&m(S.metalnessMap.channel),roughnessMapUv:q&&m(S.roughnessMap.channel),anisotropyMapUv:X&&m(S.anisotropyMap.channel),clearcoatMapUv:ne&&m(S.clearcoatMap.channel),clearcoatNormalMapUv:de&&m(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ve&&m(S.clearcoatRoughnessMap.channel),iridescenceMapUv:Q&&m(S.iridescenceMap.channel),iridescenceThicknessMapUv:te&&m(S.iridescenceThicknessMap.channel),sheenColorMapUv:Se&&m(S.sheenColorMap.channel),sheenRoughnessMapUv:Me&&m(S.sheenRoughnessMap.channel),specularMapUv:re&&m(S.specularMap.channel),specularColorMapUv:ae&&m(S.specularColorMap.channel),specularIntensityMapUv:oe&&m(S.specularIntensityMap.channel),transmissionMapUv:Te&&m(S.transmissionMap.channel),thicknessMapUv:Ge&&m(S.thicknessMap.channel),alphaMapUv:ge&&m(S.alphaMap.channel),vertexTangents:!!D.attributes.tangent&&(Je||_e),vertexNormals:!!D.attributes.normal,vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!D.attributes.color&&D.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!D.attributes.uv&&(nt||ge),fog:!!B,useFog:S.fog===!0,fogExp2:!!B&&B.isFogExp2,flatShading:S.wireframe===!1&&(S.flatShading===!0||D.attributes.normal===void 0&&Je===!1&&(S.isMeshLambertMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isMeshPhysicalMaterial)),sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:Pe,skinning:L.isSkinnedMesh===!0,morphTargets:D.morphAttributes.position!==void 0,morphNormals:D.morphAttributes.normal!==void 0,morphColors:D.morphAttributes.color!==void 0,morphTargetsCount:ce,morphTextureStride:Ie,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numLightProbeGrids:F.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:S.dithering,shadowMapEnabled:e.shadowMap.enabled&&P.length>0,shadowMapType:e.shadowMap.type,toneMapping:ue,decodeVideoTexture:nt&&S.map.isVideoTexture===!0&&et.getTransfer(S.map.colorSpace)===ft,decodeVideoTextureEmissive:O&&S.emissiveMap.isVideoTexture===!0&&et.getTransfer(S.emissiveMap.colorSpace)===ft,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===fi,flipSided:S.side===_n,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:ye&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ye&&S.extensions.multiDraw===!0||Fe)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return De.vertexUv1s=l.has(1),De.vertexUv2s=l.has(2),De.vertexUv3s=l.has(3),l.clear(),De}function g(S){const x=[];if(S.shaderID?x.push(S.shaderID):(x.push(S.customVertexShaderID),x.push(S.customFragmentShaderID)),S.defines!==void 0)for(const P in S.defines)x.push(P),x.push(S.defines[P]);return S.isRawShaderMaterial===!1&&(d(x,S),v(x,S),x.push(e.outputColorSpace)),x.push(S.customProgramCacheKey),x.join()}function d(S,x){S.push(x.precision),S.push(x.outputColorSpace),S.push(x.envMapMode),S.push(x.envMapCubeUVHeight),S.push(x.mapUv),S.push(x.alphaMapUv),S.push(x.lightMapUv),S.push(x.aoMapUv),S.push(x.bumpMapUv),S.push(x.normalMapUv),S.push(x.displacementMapUv),S.push(x.emissiveMapUv),S.push(x.metalnessMapUv),S.push(x.roughnessMapUv),S.push(x.anisotropyMapUv),S.push(x.clearcoatMapUv),S.push(x.clearcoatNormalMapUv),S.push(x.clearcoatRoughnessMapUv),S.push(x.iridescenceMapUv),S.push(x.iridescenceThicknessMapUv),S.push(x.sheenColorMapUv),S.push(x.sheenRoughnessMapUv),S.push(x.specularMapUv),S.push(x.specularColorMapUv),S.push(x.specularIntensityMapUv),S.push(x.transmissionMapUv),S.push(x.thicknessMapUv),S.push(x.combine),S.push(x.fogExp2),S.push(x.sizeAttenuation),S.push(x.morphTargetsCount),S.push(x.morphAttributeCount),S.push(x.numDirLights),S.push(x.numPointLights),S.push(x.numSpotLights),S.push(x.numSpotLightMaps),S.push(x.numHemiLights),S.push(x.numRectAreaLights),S.push(x.numDirLightShadows),S.push(x.numPointLightShadows),S.push(x.numSpotLightShadows),S.push(x.numSpotLightShadowsWithMaps),S.push(x.numLightProbes),S.push(x.shadowMapType),S.push(x.toneMapping),S.push(x.numClippingPlanes),S.push(x.numClipIntersection),S.push(x.depthPacking)}function v(S,x){a.disableAll(),x.instancing&&a.enable(0),x.instancingColor&&a.enable(1),x.instancingMorph&&a.enable(2),x.matcap&&a.enable(3),x.envMap&&a.enable(4),x.normalMapObjectSpace&&a.enable(5),x.normalMapTangentSpace&&a.enable(6),x.clearcoat&&a.enable(7),x.iridescence&&a.enable(8),x.alphaTest&&a.enable(9),x.vertexColors&&a.enable(10),x.vertexAlphas&&a.enable(11),x.vertexUv1s&&a.enable(12),x.vertexUv2s&&a.enable(13),x.vertexUv3s&&a.enable(14),x.vertexTangents&&a.enable(15),x.anisotropy&&a.enable(16),x.alphaHash&&a.enable(17),x.batching&&a.enable(18),x.dispersion&&a.enable(19),x.batchingColor&&a.enable(20),x.gradientMap&&a.enable(21),x.packedNormalMap&&a.enable(22),x.vertexNormals&&a.enable(23),S.push(a.mask),a.disableAll(),x.fog&&a.enable(0),x.useFog&&a.enable(1),x.flatShading&&a.enable(2),x.logarithmicDepthBuffer&&a.enable(3),x.reversedDepthBuffer&&a.enable(4),x.skinning&&a.enable(5),x.morphTargets&&a.enable(6),x.morphNormals&&a.enable(7),x.morphColors&&a.enable(8),x.premultipliedAlpha&&a.enable(9),x.shadowMapEnabled&&a.enable(10),x.doubleSided&&a.enable(11),x.flipSided&&a.enable(12),x.useDepthPacking&&a.enable(13),x.dithering&&a.enable(14),x.transmission&&a.enable(15),x.sheen&&a.enable(16),x.opaque&&a.enable(17),x.pointsUvs&&a.enable(18),x.decodeVideoTexture&&a.enable(19),x.decodeVideoTextureEmissive&&a.enable(20),x.alphaToCoverage&&a.enable(21),x.numLightProbeGrids>0&&a.enable(22),S.push(a.mask)}function y(S){const x=p[S.type];let P;if(x){const R=li[x];P=vE.clone(R.uniforms)}else P=S.uniforms;return P}function M(S,x){let P=f.get(x);return P!==void 0?++P.usedTimes:(P=new Xx(e,x,S,r),u.push(P),f.set(x,P)),P}function T(S){if(--S.usedTimes===0){const x=u.indexOf(S);u[x]=u[u.length-1],u.pop(),f.delete(S.cacheKey),S.destroy()}}function b(S){o.remove(S)}function w(){o.dispose()}return{getParameters:_,getProgramCacheKey:g,getUniforms:y,acquireProgram:M,releaseProgram:T,releaseShaderCache:b,programs:u,dispose:w}}function Qx(){let e=new WeakMap;function t(a){return e.has(a)}function n(a){let o=e.get(a);return o===void 0&&(o={},e.set(a,o)),o}function i(a){e.delete(a)}function r(a,o,l){e.get(a)[o]=l}function s(){e=new WeakMap}return{has:t,get:n,remove:i,update:r,dispose:s}}function Jx(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.material.id!==t.material.id?e.material.id-t.material.id:e.materialVariant!==t.materialVariant?e.materialVariant-t.materialVariant:e.z!==t.z?e.z-t.z:e.id-t.id}function Wm(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.z!==t.z?t.z-e.z:e.id-t.id}function jm(){const e=[];let t=0;const n=[],i=[],r=[];function s(){t=0,n.length=0,i.length=0,r.length=0}function a(c){let p=0;return c.isInstancedMesh&&(p+=2),c.isSkinnedMesh&&(p+=1),p}function o(c,p,m,_,g,d){let v=e[t];return v===void 0?(v={id:c.id,object:c,geometry:p,material:m,materialVariant:a(c),groupOrder:_,renderOrder:c.renderOrder,z:g,group:d},e[t]=v):(v.id=c.id,v.object=c,v.geometry=p,v.material=m,v.materialVariant=a(c),v.groupOrder=_,v.renderOrder=c.renderOrder,v.z=g,v.group=d),t++,v}function l(c,p,m,_,g,d){const v=o(c,p,m,_,g,d);m.transmission>0?i.push(v):m.transparent===!0?r.push(v):n.push(v)}function u(c,p,m,_,g,d){const v=o(c,p,m,_,g,d);m.transmission>0?i.unshift(v):m.transparent===!0?r.unshift(v):n.unshift(v)}function f(c,p){n.length>1&&n.sort(c||Jx),i.length>1&&i.sort(p||Wm),r.length>1&&r.sort(p||Wm)}function h(){for(let c=t,p=e.length;c<p;c++){const m=e[c];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:l,unshift:u,finish:h,sort:f}}function eA(){let e=new WeakMap;function t(i,r){const s=e.get(i);let a;return s===void 0?(a=new jm,e.set(i,[a])):r>=s.length?(a=new jm,s.push(a)):a=s[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}function tA(){const e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={direction:new V,color:new qe};break;case"SpotLight":n={position:new V,direction:new V,color:new qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new V,color:new qe,distance:0,decay:0};break;case"HemisphereLight":n={direction:new V,skyColor:new qe,groundColor:new qe};break;case"RectAreaLight":n={color:new qe,position:new V,halfWidth:new V,halfHeight:new V};break}return e[t.id]=n,n}}}function nA(){const e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new lt};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new lt};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new lt,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[t.id]=n,n}}}let iA=0;function rA(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+(t.map?1:0)-(e.map?1:0)}function sA(e){const t=new tA,n=nA(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)i.probe.push(new V);const r=new V,s=new wt,a=new wt;function o(u){let f=0,h=0,c=0;for(let x=0;x<9;x++)i.probe[x].set(0,0,0);let p=0,m=0,_=0,g=0,d=0,v=0,y=0,M=0,T=0,b=0,w=0;u.sort(rA);for(let x=0,P=u.length;x<P;x++){const R=u[x],L=R.color,F=R.intensity,B=R.distance;let D=null;if(R.shadow&&R.shadow.map&&(R.shadow.map.texture.format===Zr?D=R.shadow.map.texture:D=R.shadow.map.depthTexture||R.shadow.map.texture),R.isAmbientLight)f+=L.r*F,h+=L.g*F,c+=L.b*F;else if(R.isLightProbe){for(let z=0;z<9;z++)i.probe[z].addScaledVector(R.sh.coefficients[z],F);w++}else if(R.isDirectionalLight){const z=t.get(R);if(z.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const H=R.shadow,U=n.get(R);U.shadowIntensity=H.intensity,U.shadowBias=H.bias,U.shadowNormalBias=H.normalBias,U.shadowRadius=H.radius,U.shadowMapSize=H.mapSize,i.directionalShadow[p]=U,i.directionalShadowMap[p]=D,i.directionalShadowMatrix[p]=R.shadow.matrix,v++}i.directional[p]=z,p++}else if(R.isSpotLight){const z=t.get(R);z.position.setFromMatrixPosition(R.matrixWorld),z.color.copy(L).multiplyScalar(F),z.distance=B,z.coneCos=Math.cos(R.angle),z.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),z.decay=R.decay,i.spot[_]=z;const H=R.shadow;if(R.map&&(i.spotLightMap[T]=R.map,T++,H.updateMatrices(R),R.castShadow&&b++),i.spotLightMatrix[_]=H.matrix,R.castShadow){const U=n.get(R);U.shadowIntensity=H.intensity,U.shadowBias=H.bias,U.shadowNormalBias=H.normalBias,U.shadowRadius=H.radius,U.shadowMapSize=H.mapSize,i.spotShadow[_]=U,i.spotShadowMap[_]=D,M++}_++}else if(R.isRectAreaLight){const z=t.get(R);z.color.copy(L).multiplyScalar(F),z.halfWidth.set(R.width*.5,0,0),z.halfHeight.set(0,R.height*.5,0),i.rectArea[g]=z,g++}else if(R.isPointLight){const z=t.get(R);if(z.color.copy(R.color).multiplyScalar(R.intensity),z.distance=R.distance,z.decay=R.decay,R.castShadow){const H=R.shadow,U=n.get(R);U.shadowIntensity=H.intensity,U.shadowBias=H.bias,U.shadowNormalBias=H.normalBias,U.shadowRadius=H.radius,U.shadowMapSize=H.mapSize,U.shadowCameraNear=H.camera.near,U.shadowCameraFar=H.camera.far,i.pointShadow[m]=U,i.pointShadowMap[m]=D,i.pointShadowMatrix[m]=R.shadow.matrix,y++}i.point[m]=z,m++}else if(R.isHemisphereLight){const z=t.get(R);z.skyColor.copy(R.color).multiplyScalar(F),z.groundColor.copy(R.groundColor).multiplyScalar(F),i.hemi[d]=z,d++}}g>0&&(e.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Ee.LTC_FLOAT_1,i.rectAreaLTC2=Ee.LTC_FLOAT_2):(i.rectAreaLTC1=Ee.LTC_HALF_1,i.rectAreaLTC2=Ee.LTC_HALF_2)),i.ambient[0]=f,i.ambient[1]=h,i.ambient[2]=c;const S=i.hash;(S.directionalLength!==p||S.pointLength!==m||S.spotLength!==_||S.rectAreaLength!==g||S.hemiLength!==d||S.numDirectionalShadows!==v||S.numPointShadows!==y||S.numSpotShadows!==M||S.numSpotMaps!==T||S.numLightProbes!==w)&&(i.directional.length=p,i.spot.length=_,i.rectArea.length=g,i.point.length=m,i.hemi.length=d,i.directionalShadow.length=v,i.directionalShadowMap.length=v,i.pointShadow.length=y,i.pointShadowMap.length=y,i.spotShadow.length=M,i.spotShadowMap.length=M,i.directionalShadowMatrix.length=v,i.pointShadowMatrix.length=y,i.spotLightMatrix.length=M+T-b,i.spotLightMap.length=T,i.numSpotLightShadowsWithMaps=b,i.numLightProbes=w,S.directionalLength=p,S.pointLength=m,S.spotLength=_,S.rectAreaLength=g,S.hemiLength=d,S.numDirectionalShadows=v,S.numPointShadows=y,S.numSpotShadows=M,S.numSpotMaps=T,S.numLightProbes=w,i.version=iA++)}function l(u,f){let h=0,c=0,p=0,m=0,_=0;const g=f.matrixWorldInverse;for(let d=0,v=u.length;d<v;d++){const y=u[d];if(y.isDirectionalLight){const M=i.directional[h];M.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(g),h++}else if(y.isSpotLight){const M=i.spot[p];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(g),M.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(g),p++}else if(y.isRectAreaLight){const M=i.rectArea[m];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(g),a.identity(),s.copy(y.matrixWorld),s.premultiply(g),a.extractRotation(s),M.halfWidth.set(y.width*.5,0,0),M.halfHeight.set(0,y.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),m++}else if(y.isPointLight){const M=i.point[c];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(g),c++}else if(y.isHemisphereLight){const M=i.hemi[_];M.direction.setFromMatrixPosition(y.matrixWorld),M.direction.transformDirection(g),_++}}}return{setup:o,setupView:l,state:i}}function Xm(e){const t=new sA(e),n=[],i=[],r=[];function s(c){h.camera=c,n.length=0,i.length=0,r.length=0}function a(c){n.push(c)}function o(c){i.push(c)}function l(c){r.push(c)}function u(){t.setup(n)}function f(c){t.setupView(n,c)}const h={lightsArray:n,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:h,setupLights:u,setupLightsView:f,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function aA(e){let t=new WeakMap;function n(r,s=0){const a=t.get(r);let o;return a===void 0?(o=new Xm(e),t.set(r,[o])):s>=a.length?(o=new Xm(e),a.push(o)):o=a[s],o}function i(){t=new WeakMap}return{get:n,dispose:i}}const oA=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,lA=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,uA=[new V(1,0,0),new V(-1,0,0),new V(0,1,0),new V(0,-1,0),new V(0,0,1),new V(0,0,-1)],cA=[new V(0,-1,0),new V(0,-1,0),new V(0,0,1),new V(0,0,-1),new V(0,-1,0),new V(0,-1,0)],$m=new wt,va=new V,Wc=new V;function fA(e,t,n){let i=new ep;const r=new lt,s=new lt,a=new Rt,o=new ME,l=new EE,u={},f=n.maxTextureSize,h={[_i]:_n,[_n]:_i,[fi]:fi},c=new Gn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new lt},radius:{value:4}},vertexShader:oA,fragmentShader:lA}),p=c.clone();p.defines.HORIZONTAL_PASS=1;const m=new cn;m.setAttribute("position",new kn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new ct(m,c),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=wl;let d=this.type;this.render=function(b,w,S){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||b.length===0)return;this.type===u2&&(Ve("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=wl);const x=e.getRenderTarget(),P=e.getActiveCubeFace(),R=e.getActiveMipmapLevel(),L=e.state;L.setBlending(Ui),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);const F=d!==this.type;F&&w.traverse(function(B){B.material&&(Array.isArray(B.material)?B.material.forEach(D=>D.needsUpdate=!0):B.material.needsUpdate=!0)});for(let B=0,D=b.length;B<D;B++){const z=b[B],H=z.shadow;if(H===void 0){Ve("WebGLShadowMap:",z,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;r.copy(H.mapSize);const U=H.getFrameExtents();r.multiply(U),s.copy(H.mapSize),(r.x>f||r.y>f)&&(r.x>f&&(s.x=Math.floor(f/U.x),r.x=s.x*U.x,H.mapSize.x=s.x),r.y>f&&(s.y=Math.floor(f/U.y),r.y=s.y*U.y,H.mapSize.y=s.y));const j=e.state.buffers.depth.getReversed();if(H.camera._reversedDepth=j,H.map===null||F===!0){if(H.map!==null&&(H.map.depthTexture!==null&&(H.map.depthTexture.dispose(),H.map.depthTexture=null),H.map.dispose()),this.type===ba){if(z.isPointLight){Ve("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}H.map=new vi(r.x,r.y,{format:Zr,type:Gi,minFilter:en,magFilter:en,generateMipmaps:!1}),H.map.texture.name=z.name+".shadowMap",H.map.depthTexture=new Ys(r.x,r.y,di),H.map.depthTexture.name=z.name+".shadowMapDepth",H.map.depthTexture.format=Vi,H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=jt,H.map.depthTexture.magFilter=jt}else z.isPointLight?(H.map=new X_(r.x),H.map.depthTexture=new mE(r.x,Si)):(H.map=new vi(r.x,r.y),H.map.depthTexture=new Ys(r.x,r.y,Si)),H.map.depthTexture.name=z.name+".shadowMap",H.map.depthTexture.format=Vi,this.type===wl?(H.map.depthTexture.compareFunction=j?Kh:qh,H.map.depthTexture.minFilter=en,H.map.depthTexture.magFilter=en):(H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=jt,H.map.depthTexture.magFilter=jt);H.camera.updateProjectionMatrix()}const J=H.map.isWebGLCubeRenderTarget?6:1;for(let se=0;se<J;se++){if(H.map.isWebGLCubeRenderTarget)e.setRenderTarget(H.map,se),e.clear();else{se===0&&(e.setRenderTarget(H.map),e.clear());const ce=H.getViewport(se);a.set(s.x*ce.x,s.y*ce.y,s.x*ce.z,s.y*ce.w),L.viewport(a)}if(z.isPointLight){const ce=H.camera,Ie=H.matrix,ke=z.distance||ce.far;ke!==ce.far&&(ce.far=ke,ce.updateProjectionMatrix()),va.setFromMatrixPosition(z.matrixWorld),ce.position.copy(va),Wc.copy(ce.position),Wc.add(uA[se]),ce.up.copy(cA[se]),ce.lookAt(Wc),ce.updateMatrixWorld(),Ie.makeTranslation(-va.x,-va.y,-va.z),$m.multiplyMatrices(ce.projectionMatrix,ce.matrixWorldInverse),H._frustum.setFromProjectionMatrix($m,ce.coordinateSystem,ce.reversedDepth)}else H.updateMatrices(z);i=H.getFrustum(),M(w,S,H.camera,z,this.type)}H.isPointLightShadow!==!0&&this.type===ba&&v(H,S),H.needsUpdate=!1}d=this.type,g.needsUpdate=!1,e.setRenderTarget(x,P,R)};function v(b,w){const S=t.update(_);c.defines.VSM_SAMPLES!==b.blurSamples&&(c.defines.VSM_SAMPLES=b.blurSamples,p.defines.VSM_SAMPLES=b.blurSamples,c.needsUpdate=!0,p.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new vi(r.x,r.y,{format:Zr,type:Gi})),c.uniforms.shadow_pass.value=b.map.depthTexture,c.uniforms.resolution.value=b.mapSize,c.uniforms.radius.value=b.radius,e.setRenderTarget(b.mapPass),e.clear(),e.renderBufferDirect(w,null,S,c,_,null),p.uniforms.shadow_pass.value=b.mapPass.texture,p.uniforms.resolution.value=b.mapSize,p.uniforms.radius.value=b.radius,e.setRenderTarget(b.map),e.clear(),e.renderBufferDirect(w,null,S,p,_,null)}function y(b,w,S,x){let P=null;const R=S.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(R!==void 0)P=R;else if(P=S.isPointLight===!0?l:o,e.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0||w.alphaToCoverage===!0){const L=P.uuid,F=w.uuid;let B=u[L];B===void 0&&(B={},u[L]=B);let D=B[F];D===void 0&&(D=P.clone(),B[F]=D,w.addEventListener("dispose",T)),P=D}if(P.visible=w.visible,P.wireframe=w.wireframe,x===ba?P.side=w.shadowSide!==null?w.shadowSide:w.side:P.side=w.shadowSide!==null?w.shadowSide:h[w.side],P.alphaMap=w.alphaMap,P.alphaTest=w.alphaToCoverage===!0?.5:w.alphaTest,P.map=w.map,P.clipShadows=w.clipShadows,P.clippingPlanes=w.clippingPlanes,P.clipIntersection=w.clipIntersection,P.displacementMap=w.displacementMap,P.displacementScale=w.displacementScale,P.displacementBias=w.displacementBias,P.wireframeLinewidth=w.wireframeLinewidth,P.linewidth=w.linewidth,S.isPointLight===!0&&P.isMeshDistanceMaterial===!0){const L=e.properties.get(P);L.light=S}return P}function M(b,w,S,x,P){if(b.visible===!1)return;if(b.layers.test(w.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&P===ba)&&(!b.frustumCulled||i.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(S.matrixWorldInverse,b.matrixWorld);const F=t.update(b),B=b.material;if(Array.isArray(B)){const D=F.groups;for(let z=0,H=D.length;z<H;z++){const U=D[z],j=B[U.materialIndex];if(j&&j.visible){const J=y(b,j,x,P);b.onBeforeShadow(e,b,w,S,F,J,U),e.renderBufferDirect(S,null,F,J,b,U),b.onAfterShadow(e,b,w,S,F,J,U)}}}else if(B.visible){const D=y(b,B,x,P);b.onBeforeShadow(e,b,w,S,F,D,null),e.renderBufferDirect(S,null,F,D,b,null),b.onAfterShadow(e,b,w,S,F,D,null)}}const L=b.children;for(let F=0,B=L.length;F<B;F++)M(L[F],w,S,x,P)}function T(b){b.target.removeEventListener("dispose",T);for(const S in u){const x=u[S],P=b.target.uuid;P in x&&(x[P].dispose(),delete x[P])}}}function dA(e,t){function n(){let k=!1;const ge=new Rt;let ie=null;const we=new Rt(0,0,0,0);return{setMask:function(ye){ie!==ye&&!k&&(e.colorMask(ye,ye,ye,ye),ie=ye)},setLocked:function(ye){k=ye},setClear:function(ye,ue,De,Xe,Pt){Pt===!0&&(ye*=Xe,ue*=Xe,De*=Xe),ge.set(ye,ue,De,Xe),we.equals(ge)===!1&&(e.clearColor(ye,ue,De,Xe),we.copy(ge))},reset:function(){k=!1,ie=null,we.set(-1,0,0,0)}}}function i(){let k=!1,ge=!1,ie=null,we=null,ye=null;return{setReversed:function(ue){if(ge!==ue){const De=t.get("EXT_clip_control");ue?De.clipControlEXT(De.LOWER_LEFT_EXT,De.ZERO_TO_ONE_EXT):De.clipControlEXT(De.LOWER_LEFT_EXT,De.NEGATIVE_ONE_TO_ONE_EXT),ge=ue;const Xe=ye;ye=null,this.setClear(Xe)}},getReversed:function(){return ge},setTest:function(ue){ue?fe(e.DEPTH_TEST):Pe(e.DEPTH_TEST)},setMask:function(ue){ie!==ue&&!k&&(e.depthMask(ue),ie=ue)},setFunc:function(ue){if(ge&&(ue=V2[ue]),we!==ue){switch(ue){case jf:e.depthFunc(e.NEVER);break;case Xf:e.depthFunc(e.ALWAYS);break;case $f:e.depthFunc(e.LESS);break;case Xs:e.depthFunc(e.LEQUAL);break;case Yf:e.depthFunc(e.EQUAL);break;case qf:e.depthFunc(e.GEQUAL);break;case Kf:e.depthFunc(e.GREATER);break;case Zf:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}we=ue}},setLocked:function(ue){k=ue},setClear:function(ue){ye!==ue&&(ye=ue,ge&&(ue=1-ue),e.clearDepth(ue))},reset:function(){k=!1,ie=null,we=null,ye=null,ge=!1}}}function r(){let k=!1,ge=null,ie=null,we=null,ye=null,ue=null,De=null,Xe=null,Pt=null;return{setTest:function(ht){k||(ht?fe(e.STENCIL_TEST):Pe(e.STENCIL_TEST))},setMask:function(ht){ge!==ht&&!k&&(e.stencilMask(ht),ge=ht)},setFunc:function(ht,Mi,ti){(ie!==ht||we!==Mi||ye!==ti)&&(e.stencilFunc(ht,Mi,ti),ie=ht,we=Mi,ye=ti)},setOp:function(ht,Mi,ti){(ue!==ht||De!==Mi||Xe!==ti)&&(e.stencilOp(ht,Mi,ti),ue=ht,De=Mi,Xe=ti)},setLocked:function(ht){k=ht},setClear:function(ht){Pt!==ht&&(e.clearStencil(ht),Pt=ht)},reset:function(){k=!1,ge=null,ie=null,we=null,ye=null,ue=null,De=null,Xe=null,Pt=null}}}const s=new n,a=new i,o=new r,l=new WeakMap,u=new WeakMap;let f={},h={},c={},p=new WeakMap,m=[],_=null,g=!1,d=null,v=null,y=null,M=null,T=null,b=null,w=null,S=new qe(0,0,0),x=0,P=!1,R=null,L=null,F=null,B=null,D=null;const z=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let H=!1,U=0;const j=e.getParameter(e.VERSION);j.indexOf("WebGL")!==-1?(U=parseFloat(/^WebGL (\d)/.exec(j)[1]),H=U>=1):j.indexOf("OpenGL ES")!==-1&&(U=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),H=U>=2);let J=null,se={};const ce=e.getParameter(e.SCISSOR_BOX),Ie=e.getParameter(e.VIEWPORT),ke=new Rt().fromArray(ce),Le=new Rt().fromArray(Ie);function ee(k,ge,ie,we){const ye=new Uint8Array(4),ue=e.createTexture();e.bindTexture(k,ue),e.texParameteri(k,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(k,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let De=0;De<ie;De++)k===e.TEXTURE_3D||k===e.TEXTURE_2D_ARRAY?e.texImage3D(ge,0,e.RGBA,1,1,we,0,e.RGBA,e.UNSIGNED_BYTE,ye):e.texImage2D(ge+De,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,ye);return ue}const pe={};pe[e.TEXTURE_2D]=ee(e.TEXTURE_2D,e.TEXTURE_2D,1),pe[e.TEXTURE_CUBE_MAP]=ee(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),pe[e.TEXTURE_2D_ARRAY]=ee(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),pe[e.TEXTURE_3D]=ee(e.TEXTURE_3D,e.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),fe(e.DEPTH_TEST),a.setFunc(Xs),ot(!1),Je(W0),fe(e.CULL_FACE),ut(Ui);function fe(k){f[k]!==!0&&(e.enable(k),f[k]=!0)}function Pe(k){f[k]!==!1&&(e.disable(k),f[k]=!1)}function ze(k,ge){return c[k]!==ge?(e.bindFramebuffer(k,ge),c[k]=ge,k===e.DRAW_FRAMEBUFFER&&(c[e.FRAMEBUFFER]=ge),k===e.FRAMEBUFFER&&(c[e.DRAW_FRAMEBUFFER]=ge),!0):!1}function Fe(k,ge){let ie=m,we=!1;if(k){ie=p.get(ge),ie===void 0&&(ie=[],p.set(ge,ie));const ye=k.textures;if(ie.length!==ye.length||ie[0]!==e.COLOR_ATTACHMENT0){for(let ue=0,De=ye.length;ue<De;ue++)ie[ue]=e.COLOR_ATTACHMENT0+ue;ie.length=ye.length,we=!0}}else ie[0]!==e.BACK&&(ie[0]=e.BACK,we=!0);we&&e.drawBuffers(ie)}function nt(k){return _!==k?(e.useProgram(k),_=k,!0):!1}const We={[Dr]:e.FUNC_ADD,[f2]:e.FUNC_SUBTRACT,[d2]:e.FUNC_REVERSE_SUBTRACT};We[h2]=e.MIN,We[p2]=e.MAX;const Qe={[m2]:e.ZERO,[g2]:e.ONE,[v2]:e.SRC_COLOR,[Hf]:e.SRC_ALPHA,[T2]:e.SRC_ALPHA_SATURATE,[M2]:e.DST_COLOR,[S2]:e.DST_ALPHA,[_2]:e.ONE_MINUS_SRC_COLOR,[Wf]:e.ONE_MINUS_SRC_ALPHA,[E2]:e.ONE_MINUS_DST_COLOR,[y2]:e.ONE_MINUS_DST_ALPHA,[b2]:e.CONSTANT_COLOR,[w2]:e.ONE_MINUS_CONSTANT_COLOR,[x2]:e.CONSTANT_ALPHA,[A2]:e.ONE_MINUS_CONSTANT_ALPHA};function ut(k,ge,ie,we,ye,ue,De,Xe,Pt,ht){if(k===Ui){g===!0&&(Pe(e.BLEND),g=!1);return}if(g===!1&&(fe(e.BLEND),g=!0),k!==c2){if(k!==d||ht!==P){if((v!==Dr||T!==Dr)&&(e.blendEquation(e.FUNC_ADD),v=Dr,T=Dr),ht)switch(k){case Wr:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case iu:e.blendFunc(e.ONE,e.ONE);break;case j0:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case X0:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:st("WebGLState: Invalid blending: ",k);break}else switch(k){case Wr:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case iu:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case j0:st("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case X0:st("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:st("WebGLState: Invalid blending: ",k);break}y=null,M=null,b=null,w=null,S.set(0,0,0),x=0,d=k,P=ht}return}ye=ye||ge,ue=ue||ie,De=De||we,(ge!==v||ye!==T)&&(e.blendEquationSeparate(We[ge],We[ye]),v=ge,T=ye),(ie!==y||we!==M||ue!==b||De!==w)&&(e.blendFuncSeparate(Qe[ie],Qe[we],Qe[ue],Qe[De]),y=ie,M=we,b=ue,w=De),(Xe.equals(S)===!1||Pt!==x)&&(e.blendColor(Xe.r,Xe.g,Xe.b,Pt),S.copy(Xe),x=Pt),d=k,P=!1}function me(k,ge){k.side===fi?Pe(e.CULL_FACE):fe(e.CULL_FACE);let ie=k.side===_n;ge&&(ie=!ie),ot(ie),k.blending===Wr&&k.transparent===!1?ut(Ui):ut(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),a.setFunc(k.depthFunc),a.setTest(k.depthTest),a.setMask(k.depthWrite),s.setMask(k.colorWrite);const we=k.stencilWrite;o.setTest(we),we&&(o.setMask(k.stencilWriteMask),o.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),o.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),O(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?fe(e.SAMPLE_ALPHA_TO_COVERAGE):Pe(e.SAMPLE_ALPHA_TO_COVERAGE)}function ot(k){R!==k&&(k?e.frontFace(e.CW):e.frontFace(e.CCW),R=k)}function Je(k){k!==o2?(fe(e.CULL_FACE),k!==L&&(k===W0?e.cullFace(e.BACK):k===l2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):Pe(e.CULL_FACE),L=k}function He(k){k!==F&&(H&&e.lineWidth(k),F=k)}function O(k,ge,ie){k?(fe(e.POLYGON_OFFSET_FILL),(B!==ge||D!==ie)&&(B=ge,D=ie,a.getReversed()&&(ge=-ge),e.polygonOffset(ge,ie))):Pe(e.POLYGON_OFFSET_FILL)}function Be(k){k?fe(e.SCISSOR_TEST):Pe(e.SCISSOR_TEST)}function q(k){k===void 0&&(k=e.TEXTURE0+z-1),J!==k&&(e.activeTexture(k),J=k)}function _e(k,ge,ie){ie===void 0&&(J===null?ie=e.TEXTURE0+z-1:ie=J);let we=se[ie];we===void 0&&(we={type:void 0,texture:void 0},se[ie]=we),(we.type!==k||we.texture!==ge)&&(J!==ie&&(e.activeTexture(ie),J=ie),e.bindTexture(k,ge||pe[k]),we.type=k,we.texture=ge)}function K(){const k=se[J];k!==void 0&&k.type!==void 0&&(e.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function le(){try{e.compressedTexImage2D(...arguments)}catch(k){st("WebGLState:",k)}}function A(){try{e.compressedTexImage3D(...arguments)}catch(k){st("WebGLState:",k)}}function E(){try{e.texSubImage2D(...arguments)}catch(k){st("WebGLState:",k)}}function N(){try{e.texSubImage3D(...arguments)}catch(k){st("WebGLState:",k)}}function X(){try{e.compressedTexSubImage2D(...arguments)}catch(k){st("WebGLState:",k)}}function ne(){try{e.compressedTexSubImage3D(...arguments)}catch(k){st("WebGLState:",k)}}function de(){try{e.texStorage2D(...arguments)}catch(k){st("WebGLState:",k)}}function ve(){try{e.texStorage3D(...arguments)}catch(k){st("WebGLState:",k)}}function Q(){try{e.texImage2D(...arguments)}catch(k){st("WebGLState:",k)}}function te(){try{e.texImage3D(...arguments)}catch(k){st("WebGLState:",k)}}function Se(k){return h[k]!==void 0?h[k]:e.getParameter(k)}function Me(k,ge){h[k]!==ge&&(e.pixelStorei(k,ge),h[k]=ge)}function re(k){ke.equals(k)===!1&&(e.scissor(k.x,k.y,k.z,k.w),ke.copy(k))}function ae(k){Le.equals(k)===!1&&(e.viewport(k.x,k.y,k.z,k.w),Le.copy(k))}function oe(k,ge){let ie=u.get(ge);ie===void 0&&(ie=new WeakMap,u.set(ge,ie));let we=ie.get(k);we===void 0&&(we=e.getUniformBlockIndex(ge,k.name),ie.set(k,we))}function Te(k,ge){const we=u.get(ge).get(k);l.get(ge)!==we&&(e.uniformBlockBinding(ge,we,k.__bindingPointIndex),l.set(ge,we))}function Ge(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),a.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),f={},h={},J=null,se={},c={},p=new WeakMap,m=[],_=null,g=!1,d=null,v=null,y=null,M=null,T=null,b=null,w=null,S=new qe(0,0,0),x=0,P=!1,R=null,L=null,F=null,B=null,D=null,ke.set(0,0,e.canvas.width,e.canvas.height),Le.set(0,0,e.canvas.width,e.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:fe,disable:Pe,bindFramebuffer:ze,drawBuffers:Fe,useProgram:nt,setBlending:ut,setMaterial:me,setFlipSided:ot,setCullFace:Je,setLineWidth:He,setPolygonOffset:O,setScissorTest:Be,activeTexture:q,bindTexture:_e,unbindTexture:K,compressedTexImage2D:le,compressedTexImage3D:A,texImage2D:Q,texImage3D:te,pixelStorei:Me,getParameter:Se,updateUBOMapping:oe,uniformBlockBinding:Te,texStorage2D:de,texStorage3D:ve,texSubImage2D:E,texSubImage3D:N,compressedTexSubImage2D:X,compressedTexSubImage3D:ne,scissor:re,viewport:ae,reset:Ge}}function hA(e,t,n,i,r,s,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new lt,f=new WeakMap,h=new Set;let c;const p=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(A,E){return m?new OffscreenCanvas(A,E):lu("canvas")}function g(A,E,N){let X=1;const ne=le(A);if((ne.width>N||ne.height>N)&&(X=N/Math.max(ne.width,ne.height)),X<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const de=Math.floor(X*ne.width),ve=Math.floor(X*ne.height);c===void 0&&(c=_(de,ve));const Q=E?_(de,ve):c;return Q.width=de,Q.height=ve,Q.getContext("2d").drawImage(A,0,0,de,ve),Ve("WebGLRenderer: Texture has been resized from ("+ne.width+"x"+ne.height+") to ("+de+"x"+ve+")."),Q}else return"data"in A&&Ve("WebGLRenderer: Image in DataTexture is too big ("+ne.width+"x"+ne.height+")."),A;return A}function d(A){return A.generateMipmaps}function v(A){e.generateMipmap(A)}function y(A){return A.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?e.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function M(A,E,N,X,ne,de=!1){if(A!==null){if(e[A]!==void 0)return e[A];Ve("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let ve;X&&(ve=t.get("EXT_texture_norm16"),ve||Ve("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Q=E;if(E===e.RED&&(N===e.FLOAT&&(Q=e.R32F),N===e.HALF_FLOAT&&(Q=e.R16F),N===e.UNSIGNED_BYTE&&(Q=e.R8),N===e.UNSIGNED_SHORT&&ve&&(Q=ve.R16_EXT),N===e.SHORT&&ve&&(Q=ve.R16_SNORM_EXT)),E===e.RED_INTEGER&&(N===e.UNSIGNED_BYTE&&(Q=e.R8UI),N===e.UNSIGNED_SHORT&&(Q=e.R16UI),N===e.UNSIGNED_INT&&(Q=e.R32UI),N===e.BYTE&&(Q=e.R8I),N===e.SHORT&&(Q=e.R16I),N===e.INT&&(Q=e.R32I)),E===e.RG&&(N===e.FLOAT&&(Q=e.RG32F),N===e.HALF_FLOAT&&(Q=e.RG16F),N===e.UNSIGNED_BYTE&&(Q=e.RG8),N===e.UNSIGNED_SHORT&&ve&&(Q=ve.RG16_EXT),N===e.SHORT&&ve&&(Q=ve.RG16_SNORM_EXT)),E===e.RG_INTEGER&&(N===e.UNSIGNED_BYTE&&(Q=e.RG8UI),N===e.UNSIGNED_SHORT&&(Q=e.RG16UI),N===e.UNSIGNED_INT&&(Q=e.RG32UI),N===e.BYTE&&(Q=e.RG8I),N===e.SHORT&&(Q=e.RG16I),N===e.INT&&(Q=e.RG32I)),E===e.RGB_INTEGER&&(N===e.UNSIGNED_BYTE&&(Q=e.RGB8UI),N===e.UNSIGNED_SHORT&&(Q=e.RGB16UI),N===e.UNSIGNED_INT&&(Q=e.RGB32UI),N===e.BYTE&&(Q=e.RGB8I),N===e.SHORT&&(Q=e.RGB16I),N===e.INT&&(Q=e.RGB32I)),E===e.RGBA_INTEGER&&(N===e.UNSIGNED_BYTE&&(Q=e.RGBA8UI),N===e.UNSIGNED_SHORT&&(Q=e.RGBA16UI),N===e.UNSIGNED_INT&&(Q=e.RGBA32UI),N===e.BYTE&&(Q=e.RGBA8I),N===e.SHORT&&(Q=e.RGBA16I),N===e.INT&&(Q=e.RGBA32I)),E===e.RGB&&(N===e.UNSIGNED_SHORT&&ve&&(Q=ve.RGB16_EXT),N===e.SHORT&&ve&&(Q=ve.RGB16_SNORM_EXT),N===e.UNSIGNED_INT_5_9_9_9_REV&&(Q=e.RGB9_E5),N===e.UNSIGNED_INT_10F_11F_11F_REV&&(Q=e.R11F_G11F_B10F)),E===e.RGBA){const te=de?ou:et.getTransfer(ne);N===e.FLOAT&&(Q=e.RGBA32F),N===e.HALF_FLOAT&&(Q=e.RGBA16F),N===e.UNSIGNED_BYTE&&(Q=te===ft?e.SRGB8_ALPHA8:e.RGBA8),N===e.UNSIGNED_SHORT&&ve&&(Q=ve.RGBA16_EXT),N===e.SHORT&&ve&&(Q=ve.RGBA16_SNORM_EXT),N===e.UNSIGNED_SHORT_4_4_4_4&&(Q=e.RGBA4),N===e.UNSIGNED_SHORT_5_5_5_1&&(Q=e.RGB5_A1)}return(Q===e.R16F||Q===e.R32F||Q===e.RG16F||Q===e.RG32F||Q===e.RGBA16F||Q===e.RGBA32F)&&t.get("EXT_color_buffer_float"),Q}function T(A,E){let N;return A?E===null||E===Si||E===no?N=e.DEPTH24_STENCIL8:E===di?N=e.DEPTH32F_STENCIL8:E===to&&(N=e.DEPTH24_STENCIL8,Ve("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===Si||E===no?N=e.DEPTH_COMPONENT24:E===di?N=e.DEPTH_COMPONENT32F:E===to&&(N=e.DEPTH_COMPONENT16),N}function b(A,E){return d(A)===!0||A.isFramebufferTexture&&A.minFilter!==jt&&A.minFilter!==en?Math.log2(Math.max(E.width,E.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?E.mipmaps.length:1}function w(A){const E=A.target;E.removeEventListener("dispose",w),x(E),E.isVideoTexture&&f.delete(E),E.isHTMLTexture&&h.delete(E)}function S(A){const E=A.target;E.removeEventListener("dispose",S),R(E)}function x(A){const E=i.get(A);if(E.__webglInit===void 0)return;const N=A.source,X=p.get(N);if(X){const ne=X[E.__cacheKey];ne.usedTimes--,ne.usedTimes===0&&P(A),Object.keys(X).length===0&&p.delete(N)}i.remove(A)}function P(A){const E=i.get(A);e.deleteTexture(E.__webglTexture);const N=A.source,X=p.get(N);delete X[E.__cacheKey],a.memory.textures--}function R(A){const E=i.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),i.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(E.__webglFramebuffer[X]))for(let ne=0;ne<E.__webglFramebuffer[X].length;ne++)e.deleteFramebuffer(E.__webglFramebuffer[X][ne]);else e.deleteFramebuffer(E.__webglFramebuffer[X]);E.__webglDepthbuffer&&e.deleteRenderbuffer(E.__webglDepthbuffer[X])}else{if(Array.isArray(E.__webglFramebuffer))for(let X=0;X<E.__webglFramebuffer.length;X++)e.deleteFramebuffer(E.__webglFramebuffer[X]);else e.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&e.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&e.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let X=0;X<E.__webglColorRenderbuffer.length;X++)E.__webglColorRenderbuffer[X]&&e.deleteRenderbuffer(E.__webglColorRenderbuffer[X]);E.__webglDepthRenderbuffer&&e.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const N=A.textures;for(let X=0,ne=N.length;X<ne;X++){const de=i.get(N[X]);de.__webglTexture&&(e.deleteTexture(de.__webglTexture),a.memory.textures--),i.remove(N[X])}i.remove(A)}let L=0;function F(){L=0}function B(){return L}function D(A){L=A}function z(){const A=L;return A>=r.maxTextures&&Ve("WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+r.maxTextures),L+=1,A}function H(A){const E=[];return E.push(A.wrapS),E.push(A.wrapT),E.push(A.wrapR||0),E.push(A.magFilter),E.push(A.minFilter),E.push(A.anisotropy),E.push(A.internalFormat),E.push(A.format),E.push(A.type),E.push(A.generateMipmaps),E.push(A.premultiplyAlpha),E.push(A.flipY),E.push(A.unpackAlignment),E.push(A.colorSpace),E.join()}function U(A,E){const N=i.get(A);if(A.isVideoTexture&&_e(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&N.__version!==A.version){const X=A.image;if(X===null)Ve("WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)Ve("WebGLRenderer: Texture marked for update but image is incomplete");else{Pe(N,A,E);return}}else A.isExternalTexture&&(N.__webglTexture=A.sourceTexture?A.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,N.__webglTexture,e.TEXTURE0+E)}function j(A,E){const N=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&N.__version!==A.version){Pe(N,A,E);return}else A.isExternalTexture&&(N.__webglTexture=A.sourceTexture?A.sourceTexture:null);n.bindTexture(e.TEXTURE_2D_ARRAY,N.__webglTexture,e.TEXTURE0+E)}function J(A,E){const N=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&N.__version!==A.version){Pe(N,A,E);return}n.bindTexture(e.TEXTURE_3D,N.__webglTexture,e.TEXTURE0+E)}function se(A,E){const N=i.get(A);if(A.isCubeDepthTexture!==!0&&A.version>0&&N.__version!==A.version){ze(N,A,E);return}n.bindTexture(e.TEXTURE_CUBE_MAP,N.__webglTexture,e.TEXTURE0+E)}const ce={[Qf]:e.REPEAT,[Ni]:e.CLAMP_TO_EDGE,[Jf]:e.MIRRORED_REPEAT},Ie={[jt]:e.NEAREST,[P2]:e.NEAREST_MIPMAP_NEAREST,[Uo]:e.NEAREST_MIPMAP_LINEAR,[en]:e.LINEAR,[dc]:e.LINEAR_MIPMAP_NEAREST,[zr]:e.LINEAR_MIPMAP_LINEAR},ke={[L2]:e.NEVER,[k2]:e.ALWAYS,[D2]:e.LESS,[qh]:e.LEQUAL,[U2]:e.EQUAL,[Kh]:e.GEQUAL,[F2]:e.GREATER,[O2]:e.NOTEQUAL};function Le(A,E){if(E.type===di&&t.has("OES_texture_float_linear")===!1&&(E.magFilter===en||E.magFilter===dc||E.magFilter===Uo||E.magFilter===zr||E.minFilter===en||E.minFilter===dc||E.minFilter===Uo||E.minFilter===zr)&&Ve("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(A,e.TEXTURE_WRAP_S,ce[E.wrapS]),e.texParameteri(A,e.TEXTURE_WRAP_T,ce[E.wrapT]),(A===e.TEXTURE_3D||A===e.TEXTURE_2D_ARRAY)&&e.texParameteri(A,e.TEXTURE_WRAP_R,ce[E.wrapR]),e.texParameteri(A,e.TEXTURE_MAG_FILTER,Ie[E.magFilter]),e.texParameteri(A,e.TEXTURE_MIN_FILTER,Ie[E.minFilter]),E.compareFunction&&(e.texParameteri(A,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(A,e.TEXTURE_COMPARE_FUNC,ke[E.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===jt||E.minFilter!==Uo&&E.minFilter!==zr||E.type===di&&t.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||i.get(E).__currentAnisotropy){const N=t.get("EXT_texture_filter_anisotropic");e.texParameterf(A,N.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,r.getMaxAnisotropy())),i.get(E).__currentAnisotropy=E.anisotropy}}}function ee(A,E){let N=!1;A.__webglInit===void 0&&(A.__webglInit=!0,E.addEventListener("dispose",w));const X=E.source;let ne=p.get(X);ne===void 0&&(ne={},p.set(X,ne));const de=H(E);if(de!==A.__cacheKey){ne[de]===void 0&&(ne[de]={texture:e.createTexture(),usedTimes:0},a.memory.textures++,N=!0),ne[de].usedTimes++;const ve=ne[A.__cacheKey];ve!==void 0&&(ne[A.__cacheKey].usedTimes--,ve.usedTimes===0&&P(E)),A.__cacheKey=de,A.__webglTexture=ne[de].texture}return N}function pe(A,E,N){return Math.floor(Math.floor(A/N)/E)}function fe(A,E,N,X){const de=A.updateRanges;if(de.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,E.width,E.height,N,X,E.data);else{de.sort((Me,re)=>Me.start-re.start);let ve=0;for(let Me=1;Me<de.length;Me++){const re=de[ve],ae=de[Me],oe=re.start+re.count,Te=pe(ae.start,E.width,4),Ge=pe(re.start,E.width,4);ae.start<=oe+1&&Te===Ge&&pe(ae.start+ae.count-1,E.width,4)===Te?re.count=Math.max(re.count,ae.start+ae.count-re.start):(++ve,de[ve]=ae)}de.length=ve+1;const Q=n.getParameter(e.UNPACK_ROW_LENGTH),te=n.getParameter(e.UNPACK_SKIP_PIXELS),Se=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,E.width);for(let Me=0,re=de.length;Me<re;Me++){const ae=de[Me],oe=Math.floor(ae.start/4),Te=Math.ceil(ae.count/4),Ge=oe%E.width,k=Math.floor(oe/E.width),ge=Te,ie=1;n.pixelStorei(e.UNPACK_SKIP_PIXELS,Ge),n.pixelStorei(e.UNPACK_SKIP_ROWS,k),n.texSubImage2D(e.TEXTURE_2D,0,Ge,k,ge,ie,N,X,E.data)}A.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,Q),n.pixelStorei(e.UNPACK_SKIP_PIXELS,te),n.pixelStorei(e.UNPACK_SKIP_ROWS,Se)}}function Pe(A,E,N){let X=e.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(X=e.TEXTURE_2D_ARRAY),E.isData3DTexture&&(X=e.TEXTURE_3D);const ne=ee(A,E),de=E.source;n.bindTexture(X,A.__webglTexture,e.TEXTURE0+N);const ve=i.get(de);if(de.version!==ve.__version||ne===!0){if(n.activeTexture(e.TEXTURE0+N),(typeof ImageBitmap<"u"&&E.image instanceof ImageBitmap)===!1){const ie=et.getPrimaries(et.workingColorSpace),we=E.colorSpace===sr?null:et.getPrimaries(E.colorSpace),ye=E.colorSpace===sr||ie===we?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,E.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,ye)}n.pixelStorei(e.UNPACK_ALIGNMENT,E.unpackAlignment);let te=g(E.image,!1,r.maxTextureSize);te=K(E,te);const Se=s.convert(E.format,E.colorSpace),Me=s.convert(E.type);let re=M(E.internalFormat,Se,Me,E.normalized,E.colorSpace,E.isVideoTexture);Le(X,E);let ae;const oe=E.mipmaps,Te=E.isVideoTexture!==!0,Ge=ve.__version===void 0||ne===!0,k=de.dataReady,ge=b(E,te);if(E.isDepthTexture)re=T(E.format===Gr,E.type),Ge&&(Te?n.texStorage2D(e.TEXTURE_2D,1,re,te.width,te.height):n.texImage2D(e.TEXTURE_2D,0,re,te.width,te.height,0,Se,Me,null));else if(E.isDataTexture)if(oe.length>0){Te&&Ge&&n.texStorage2D(e.TEXTURE_2D,ge,re,oe[0].width,oe[0].height);for(let ie=0,we=oe.length;ie<we;ie++)ae=oe[ie],Te?k&&n.texSubImage2D(e.TEXTURE_2D,ie,0,0,ae.width,ae.height,Se,Me,ae.data):n.texImage2D(e.TEXTURE_2D,ie,re,ae.width,ae.height,0,Se,Me,ae.data);E.generateMipmaps=!1}else Te?(Ge&&n.texStorage2D(e.TEXTURE_2D,ge,re,te.width,te.height),k&&fe(E,te,Se,Me)):n.texImage2D(e.TEXTURE_2D,0,re,te.width,te.height,0,Se,Me,te.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){Te&&Ge&&n.texStorage3D(e.TEXTURE_2D_ARRAY,ge,re,oe[0].width,oe[0].height,te.depth);for(let ie=0,we=oe.length;ie<we;ie++)if(ae=oe[ie],E.format!==Zn)if(Se!==null)if(Te){if(k)if(E.layerUpdates.size>0){const ye=bm(ae.width,ae.height,E.format,E.type);for(const ue of E.layerUpdates){const De=ae.data.subarray(ue*ye/ae.data.BYTES_PER_ELEMENT,(ue+1)*ye/ae.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,ie,0,0,ue,ae.width,ae.height,1,Se,De)}E.clearLayerUpdates()}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,ie,0,0,0,ae.width,ae.height,te.depth,Se,ae.data)}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,ie,re,ae.width,ae.height,te.depth,0,ae.data,0,0);else Ve("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Te?k&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,ie,0,0,0,ae.width,ae.height,te.depth,Se,Me,ae.data):n.texImage3D(e.TEXTURE_2D_ARRAY,ie,re,ae.width,ae.height,te.depth,0,Se,Me,ae.data)}else{Te&&Ge&&n.texStorage2D(e.TEXTURE_2D,ge,re,oe[0].width,oe[0].height);for(let ie=0,we=oe.length;ie<we;ie++)ae=oe[ie],E.format!==Zn?Se!==null?Te?k&&n.compressedTexSubImage2D(e.TEXTURE_2D,ie,0,0,ae.width,ae.height,Se,ae.data):n.compressedTexImage2D(e.TEXTURE_2D,ie,re,ae.width,ae.height,0,ae.data):Ve("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Te?k&&n.texSubImage2D(e.TEXTURE_2D,ie,0,0,ae.width,ae.height,Se,Me,ae.data):n.texImage2D(e.TEXTURE_2D,ie,re,ae.width,ae.height,0,Se,Me,ae.data)}else if(E.isDataArrayTexture)if(Te){if(Ge&&n.texStorage3D(e.TEXTURE_2D_ARRAY,ge,re,te.width,te.height,te.depth),k)if(E.layerUpdates.size>0){const ie=bm(te.width,te.height,E.format,E.type);for(const we of E.layerUpdates){const ye=te.data.subarray(we*ie/te.data.BYTES_PER_ELEMENT,(we+1)*ie/te.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,we,te.width,te.height,1,Se,Me,ye)}E.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,Se,Me,te.data)}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,re,te.width,te.height,te.depth,0,Se,Me,te.data);else if(E.isData3DTexture)Te?(Ge&&n.texStorage3D(e.TEXTURE_3D,ge,re,te.width,te.height,te.depth),k&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,Se,Me,te.data)):n.texImage3D(e.TEXTURE_3D,0,re,te.width,te.height,te.depth,0,Se,Me,te.data);else if(E.isFramebufferTexture){if(Ge)if(Te)n.texStorage2D(e.TEXTURE_2D,ge,re,te.width,te.height);else{let ie=te.width,we=te.height;for(let ye=0;ye<ge;ye++)n.texImage2D(e.TEXTURE_2D,ye,re,ie,we,0,Se,Me,null),ie>>=1,we>>=1}}else if(E.isHTMLTexture){if("texElementImage2D"in e){const ie=e.canvas;if(ie.hasAttribute("layoutsubtree")||ie.setAttribute("layoutsubtree","true"),te.parentNode!==ie){ie.appendChild(te),h.add(E),ie.onpaint=Xe=>{const Pt=Xe.changedElements;for(const ht of h)Pt.includes(ht.image)&&(ht.needsUpdate=!0)},ie.requestPaint();return}const we=0,ye=e.RGBA,ue=e.RGBA,De=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,we,ye,ue,De,te),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(oe.length>0){if(Te&&Ge){const ie=le(oe[0]);n.texStorage2D(e.TEXTURE_2D,ge,re,ie.width,ie.height)}for(let ie=0,we=oe.length;ie<we;ie++)ae=oe[ie],Te?k&&n.texSubImage2D(e.TEXTURE_2D,ie,0,0,Se,Me,ae):n.texImage2D(e.TEXTURE_2D,ie,re,Se,Me,ae);E.generateMipmaps=!1}else if(Te){if(Ge){const ie=le(te);n.texStorage2D(e.TEXTURE_2D,ge,re,ie.width,ie.height)}k&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,Se,Me,te)}else n.texImage2D(e.TEXTURE_2D,0,re,Se,Me,te);d(E)&&v(X),ve.__version=de.version,E.onUpdate&&E.onUpdate(E)}A.__version=E.version}function ze(A,E,N){if(E.image.length!==6)return;const X=ee(A,E),ne=E.source;n.bindTexture(e.TEXTURE_CUBE_MAP,A.__webglTexture,e.TEXTURE0+N);const de=i.get(ne);if(ne.version!==de.__version||X===!0){n.activeTexture(e.TEXTURE0+N);const ve=et.getPrimaries(et.workingColorSpace),Q=E.colorSpace===sr?null:et.getPrimaries(E.colorSpace),te=E.colorSpace===sr||ve===Q?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,E.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,E.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,te);const Se=E.isCompressedTexture||E.image[0].isCompressedTexture,Me=E.image[0]&&E.image[0].isDataTexture,re=[];for(let ue=0;ue<6;ue++)!Se&&!Me?re[ue]=g(E.image[ue],!0,r.maxCubemapSize):re[ue]=Me?E.image[ue].image:E.image[ue],re[ue]=K(E,re[ue]);const ae=re[0],oe=s.convert(E.format,E.colorSpace),Te=s.convert(E.type),Ge=M(E.internalFormat,oe,Te,E.normalized,E.colorSpace),k=E.isVideoTexture!==!0,ge=de.__version===void 0||X===!0,ie=ne.dataReady;let we=b(E,ae);Le(e.TEXTURE_CUBE_MAP,E);let ye;if(Se){k&&ge&&n.texStorage2D(e.TEXTURE_CUBE_MAP,we,Ge,ae.width,ae.height);for(let ue=0;ue<6;ue++){ye=re[ue].mipmaps;for(let De=0;De<ye.length;De++){const Xe=ye[De];E.format!==Zn?oe!==null?k?ie&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ue,De,0,0,Xe.width,Xe.height,oe,Xe.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ue,De,Ge,Xe.width,Xe.height,0,Xe.data):Ve("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):k?ie&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ue,De,0,0,Xe.width,Xe.height,oe,Te,Xe.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ue,De,Ge,Xe.width,Xe.height,0,oe,Te,Xe.data)}}}else{if(ye=E.mipmaps,k&&ge){ye.length>0&&we++;const ue=le(re[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,we,Ge,ue.width,ue.height)}for(let ue=0;ue<6;ue++)if(Me){k?ie&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,0,0,re[ue].width,re[ue].height,oe,Te,re[ue].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,Ge,re[ue].width,re[ue].height,0,oe,Te,re[ue].data);for(let De=0;De<ye.length;De++){const Pt=ye[De].image[ue].image;k?ie&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ue,De+1,0,0,Pt.width,Pt.height,oe,Te,Pt.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ue,De+1,Ge,Pt.width,Pt.height,0,oe,Te,Pt.data)}}else{k?ie&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,0,0,oe,Te,re[ue]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,Ge,oe,Te,re[ue]);for(let De=0;De<ye.length;De++){const Xe=ye[De];k?ie&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ue,De+1,0,0,oe,Te,Xe.image[ue]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ue,De+1,Ge,oe,Te,Xe.image[ue])}}}d(E)&&v(e.TEXTURE_CUBE_MAP),de.__version=ne.version,E.onUpdate&&E.onUpdate(E)}A.__version=E.version}function Fe(A,E,N,X,ne,de){const ve=s.convert(N.format,N.colorSpace),Q=s.convert(N.type),te=M(N.internalFormat,ve,Q,N.normalized,N.colorSpace),Se=i.get(E),Me=i.get(N);if(Me.__renderTarget=E,!Se.__hasExternalTextures){const re=Math.max(1,E.width>>de),ae=Math.max(1,E.height>>de);ne===e.TEXTURE_3D||ne===e.TEXTURE_2D_ARRAY?n.texImage3D(ne,de,te,re,ae,E.depth,0,ve,Q,null):n.texImage2D(ne,de,te,re,ae,0,ve,Q,null)}n.bindFramebuffer(e.FRAMEBUFFER,A),q(E)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,X,ne,Me.__webglTexture,0,Be(E)):(ne===e.TEXTURE_2D||ne>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&ne<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,X,ne,Me.__webglTexture,de),n.bindFramebuffer(e.FRAMEBUFFER,null)}function nt(A,E,N){if(e.bindRenderbuffer(e.RENDERBUFFER,A),E.depthBuffer){const X=E.depthTexture,ne=X&&X.isDepthTexture?X.type:null,de=T(E.stencilBuffer,ne),ve=E.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;q(E)?o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Be(E),de,E.width,E.height):N?e.renderbufferStorageMultisample(e.RENDERBUFFER,Be(E),de,E.width,E.height):e.renderbufferStorage(e.RENDERBUFFER,de,E.width,E.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,ve,e.RENDERBUFFER,A)}else{const X=E.textures;for(let ne=0;ne<X.length;ne++){const de=X[ne],ve=s.convert(de.format,de.colorSpace),Q=s.convert(de.type),te=M(de.internalFormat,ve,Q,de.normalized,de.colorSpace);q(E)?o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Be(E),te,E.width,E.height):N?e.renderbufferStorageMultisample(e.RENDERBUFFER,Be(E),te,E.width,E.height):e.renderbufferStorage(e.RENDERBUFFER,te,E.width,E.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function We(A,E,N){const X=E.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,A),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ne=i.get(E.depthTexture);if(ne.__renderTarget=E,(!ne.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),X){if(ne.__webglInit===void 0&&(ne.__webglInit=!0,E.depthTexture.addEventListener("dispose",w)),ne.__webglTexture===void 0){ne.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,ne.__webglTexture),Le(e.TEXTURE_CUBE_MAP,E.depthTexture);const Se=s.convert(E.depthTexture.format),Me=s.convert(E.depthTexture.type);let re;E.depthTexture.format===Vi?re=e.DEPTH_COMPONENT24:E.depthTexture.format===Gr&&(re=e.DEPTH24_STENCIL8);for(let ae=0;ae<6;ae++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,re,E.width,E.height,0,Se,Me,null)}}else U(E.depthTexture,0);const de=ne.__webglTexture,ve=Be(E),Q=X?e.TEXTURE_CUBE_MAP_POSITIVE_X+N:e.TEXTURE_2D,te=E.depthTexture.format===Gr?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(E.depthTexture.format===Vi)q(E)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,te,Q,de,0,ve):e.framebufferTexture2D(e.FRAMEBUFFER,te,Q,de,0);else if(E.depthTexture.format===Gr)q(E)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,te,Q,de,0,ve):e.framebufferTexture2D(e.FRAMEBUFFER,te,Q,de,0);else throw new Error("Unknown depthTexture format")}function Qe(A){const E=i.get(A),N=A.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==A.depthTexture){const X=A.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),X){const ne=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,X.removeEventListener("dispose",ne)};X.addEventListener("dispose",ne),E.__depthDisposeCallback=ne}E.__boundDepthTexture=X}if(A.depthTexture&&!E.__autoAllocateDepthBuffer)if(N)for(let X=0;X<6;X++)We(E.__webglFramebuffer[X],A,X);else{const X=A.texture.mipmaps;X&&X.length>0?We(E.__webglFramebuffer[0],A,0):We(E.__webglFramebuffer,A,0)}else if(N){E.__webglDepthbuffer=[];for(let X=0;X<6;X++)if(n.bindFramebuffer(e.FRAMEBUFFER,E.__webglFramebuffer[X]),E.__webglDepthbuffer[X]===void 0)E.__webglDepthbuffer[X]=e.createRenderbuffer(),nt(E.__webglDepthbuffer[X],A,!1);else{const ne=A.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,de=E.__webglDepthbuffer[X];e.bindRenderbuffer(e.RENDERBUFFER,de),e.framebufferRenderbuffer(e.FRAMEBUFFER,ne,e.RENDERBUFFER,de)}}else{const X=A.texture.mipmaps;if(X&&X.length>0?n.bindFramebuffer(e.FRAMEBUFFER,E.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=e.createRenderbuffer(),nt(E.__webglDepthbuffer,A,!1);else{const ne=A.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,de=E.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,de),e.framebufferRenderbuffer(e.FRAMEBUFFER,ne,e.RENDERBUFFER,de)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function ut(A,E,N){const X=i.get(A);E!==void 0&&Fe(X.__webglFramebuffer,A,A.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),N!==void 0&&Qe(A)}function me(A){const E=A.texture,N=i.get(A),X=i.get(E);A.addEventListener("dispose",S);const ne=A.textures,de=A.isWebGLCubeRenderTarget===!0,ve=ne.length>1;if(ve||(X.__webglTexture===void 0&&(X.__webglTexture=e.createTexture()),X.__version=E.version,a.memory.textures++),de){N.__webglFramebuffer=[];for(let Q=0;Q<6;Q++)if(E.mipmaps&&E.mipmaps.length>0){N.__webglFramebuffer[Q]=[];for(let te=0;te<E.mipmaps.length;te++)N.__webglFramebuffer[Q][te]=e.createFramebuffer()}else N.__webglFramebuffer[Q]=e.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){N.__webglFramebuffer=[];for(let Q=0;Q<E.mipmaps.length;Q++)N.__webglFramebuffer[Q]=e.createFramebuffer()}else N.__webglFramebuffer=e.createFramebuffer();if(ve)for(let Q=0,te=ne.length;Q<te;Q++){const Se=i.get(ne[Q]);Se.__webglTexture===void 0&&(Se.__webglTexture=e.createTexture(),a.memory.textures++)}if(A.samples>0&&q(A)===!1){N.__webglMultisampledFramebuffer=e.createFramebuffer(),N.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let Q=0;Q<ne.length;Q++){const te=ne[Q];N.__webglColorRenderbuffer[Q]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,N.__webglColorRenderbuffer[Q]);const Se=s.convert(te.format,te.colorSpace),Me=s.convert(te.type),re=M(te.internalFormat,Se,Me,te.normalized,te.colorSpace,A.isXRRenderTarget===!0),ae=Be(A);e.renderbufferStorageMultisample(e.RENDERBUFFER,ae,re,A.width,A.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+Q,e.RENDERBUFFER,N.__webglColorRenderbuffer[Q])}e.bindRenderbuffer(e.RENDERBUFFER,null),A.depthBuffer&&(N.__webglDepthRenderbuffer=e.createRenderbuffer(),nt(N.__webglDepthRenderbuffer,A,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(de){n.bindTexture(e.TEXTURE_CUBE_MAP,X.__webglTexture),Le(e.TEXTURE_CUBE_MAP,E);for(let Q=0;Q<6;Q++)if(E.mipmaps&&E.mipmaps.length>0)for(let te=0;te<E.mipmaps.length;te++)Fe(N.__webglFramebuffer[Q][te],A,E,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+Q,te);else Fe(N.__webglFramebuffer[Q],A,E,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0);d(E)&&v(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(ve){for(let Q=0,te=ne.length;Q<te;Q++){const Se=ne[Q],Me=i.get(Se);let re=e.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(re=A.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(re,Me.__webglTexture),Le(re,Se),Fe(N.__webglFramebuffer,A,Se,e.COLOR_ATTACHMENT0+Q,re,0),d(Se)&&v(re)}n.unbindTexture()}else{let Q=e.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(Q=A.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(Q,X.__webglTexture),Le(Q,E),E.mipmaps&&E.mipmaps.length>0)for(let te=0;te<E.mipmaps.length;te++)Fe(N.__webglFramebuffer[te],A,E,e.COLOR_ATTACHMENT0,Q,te);else Fe(N.__webglFramebuffer,A,E,e.COLOR_ATTACHMENT0,Q,0);d(E)&&v(Q),n.unbindTexture()}A.depthBuffer&&Qe(A)}function ot(A){const E=A.textures;for(let N=0,X=E.length;N<X;N++){const ne=E[N];if(d(ne)){const de=y(A),ve=i.get(ne).__webglTexture;n.bindTexture(de,ve),v(de),n.unbindTexture()}}}const Je=[],He=[];function O(A){if(A.samples>0){if(q(A)===!1){const E=A.textures,N=A.width,X=A.height;let ne=e.COLOR_BUFFER_BIT;const de=A.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,ve=i.get(A),Q=E.length>1;if(Q)for(let Se=0;Se<E.length;Se++)n.bindFramebuffer(e.FRAMEBUFFER,ve.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+Se,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,ve.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+Se,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,ve.__webglMultisampledFramebuffer);const te=A.texture.mipmaps;te&&te.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,ve.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,ve.__webglFramebuffer);for(let Se=0;Se<E.length;Se++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(ne|=e.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(ne|=e.STENCIL_BUFFER_BIT)),Q){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,ve.__webglColorRenderbuffer[Se]);const Me=i.get(E[Se]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,Me,0)}e.blitFramebuffer(0,0,N,X,0,0,N,X,ne,e.NEAREST),l===!0&&(Je.length=0,He.length=0,Je.push(e.COLOR_ATTACHMENT0+Se),A.depthBuffer&&A.resolveDepthBuffer===!1&&(Je.push(de),He.push(de),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,He)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,Je))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),Q)for(let Se=0;Se<E.length;Se++){n.bindFramebuffer(e.FRAMEBUFFER,ve.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+Se,e.RENDERBUFFER,ve.__webglColorRenderbuffer[Se]);const Me=i.get(E[Se]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,ve.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+Se,e.TEXTURE_2D,Me,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,ve.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){const E=A.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[E])}}}function Be(A){return Math.min(r.maxSamples,A.samples)}function q(A){const E=i.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function _e(A){const E=a.render.frame;f.get(A)!==E&&(f.set(A,E),A.update())}function K(A,E){const N=A.colorSpace,X=A.format,ne=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||N!==au&&N!==sr&&(et.getTransfer(N)===ft?(X!==Zn||ne!==bn)&&Ve("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):st("WebGLTextures: Unsupported texture color space:",N)),E}function le(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(u.width=A.naturalWidth||A.width,u.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(u.width=A.displayWidth,u.height=A.displayHeight):(u.width=A.width,u.height=A.height),u}this.allocateTextureUnit=z,this.resetTextureUnits=F,this.getTextureUnits=B,this.setTextureUnits=D,this.setTexture2D=U,this.setTexture2DArray=j,this.setTexture3D=J,this.setTextureCube=se,this.rebindTextures=ut,this.setupRenderTarget=me,this.updateRenderTargetMipmap=ot,this.updateMultisampleRenderTarget=O,this.setupDepthRenderbuffer=Qe,this.setupFrameBufferTexture=Fe,this.useMultisampledRTT=q,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function pA(e,t){function n(i,r=sr){let s;const a=et.getTransfer(r);if(i===bn)return e.UNSIGNED_BYTE;if(i===Wh)return e.UNSIGNED_SHORT_4_4_4_4;if(i===jh)return e.UNSIGNED_SHORT_5_5_5_1;if(i===x_)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===A_)return e.UNSIGNED_INT_10F_11F_11F_REV;if(i===b_)return e.BYTE;if(i===w_)return e.SHORT;if(i===to)return e.UNSIGNED_SHORT;if(i===Hh)return e.INT;if(i===Si)return e.UNSIGNED_INT;if(i===di)return e.FLOAT;if(i===Gi)return e.HALF_FLOAT;if(i===C_)return e.ALPHA;if(i===R_)return e.RGB;if(i===Zn)return e.RGBA;if(i===Vi)return e.DEPTH_COMPONENT;if(i===Gr)return e.DEPTH_STENCIL;if(i===P_)return e.RED;if(i===Xh)return e.RED_INTEGER;if(i===Zr)return e.RG;if(i===$h)return e.RG_INTEGER;if(i===Yh)return e.RGBA_INTEGER;if(i===xl||i===Al||i===Cl||i===Rl)if(a===ft)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===xl)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Al)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Cl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Rl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===xl)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Al)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Cl)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Rl)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===ed||i===td||i===nd||i===id)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===ed)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===td)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===nd)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===id)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===rd||i===sd||i===ad||i===od||i===ld||i===ru||i===ud)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(i===rd||i===sd)return a===ft?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===ad)return a===ft?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===od)return s.COMPRESSED_R11_EAC;if(i===ld)return s.COMPRESSED_SIGNED_R11_EAC;if(i===ru)return s.COMPRESSED_RG11_EAC;if(i===ud)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===cd||i===fd||i===dd||i===hd||i===pd||i===md||i===gd||i===vd||i===_d||i===Sd||i===yd||i===Md||i===Ed||i===Td)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(i===cd)return a===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===fd)return a===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===dd)return a===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===hd)return a===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===pd)return a===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===md)return a===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===gd)return a===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===vd)return a===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===_d)return a===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Sd)return a===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===yd)return a===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Md)return a===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ed)return a===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Td)return a===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===bd||i===wd||i===xd)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(i===bd)return a===ft?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===wd)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===xd)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Ad||i===Cd||i===su||i===Rd)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(i===Ad)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Cd)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===su)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Rd)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===no?e.UNSIGNED_INT_24_8:e[i]!==void 0?e[i]:null}return{convert:n}}const mA=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,gA=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class vA{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,n){if(this.texture===null){const i=new z_(t.texture);(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const n=t.cameras[0].viewport,i=new Gn({vertexShader:mA,fragmentShader:gA,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new ct(new Iu(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class _A extends es{constructor(t,n){super();const i=this;let r=null,s=1,a=null,o="local-floor",l=1,u=null,f=null,h=null,c=null,p=null,m=null;const _=typeof XRWebGLBinding<"u",g=new vA,d={},v=n.getContextAttributes();let y=null,M=null;const T=[],b=[],w=new lt;let S=null;const x=new Tn;x.viewport=new Rt;const P=new Tn;P.viewport=new Rt;const R=[x,P],L=new CE;let F=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ee){let pe=T[ee];return pe===void 0&&(pe=new yc,T[ee]=pe),pe.getTargetRaySpace()},this.getControllerGrip=function(ee){let pe=T[ee];return pe===void 0&&(pe=new yc,T[ee]=pe),pe.getGripSpace()},this.getHand=function(ee){let pe=T[ee];return pe===void 0&&(pe=new yc,T[ee]=pe),pe.getHandSpace()};function D(ee){const pe=b.indexOf(ee.inputSource);if(pe===-1)return;const fe=T[pe];fe!==void 0&&(fe.update(ee.inputSource,ee.frame,u||a),fe.dispatchEvent({type:ee.type,data:ee.inputSource}))}function z(){r.removeEventListener("select",D),r.removeEventListener("selectstart",D),r.removeEventListener("selectend",D),r.removeEventListener("squeeze",D),r.removeEventListener("squeezestart",D),r.removeEventListener("squeezeend",D),r.removeEventListener("end",z),r.removeEventListener("inputsourceschange",H);for(let ee=0;ee<T.length;ee++){const pe=b[ee];pe!==null&&(b[ee]=null,T[ee].disconnect(pe))}F=null,B=null,g.reset();for(const ee in d)delete d[ee];t.setRenderTarget(y),p=null,c=null,h=null,r=null,M=null,Le.stop(),i.isPresenting=!1,t.setPixelRatio(S),t.setSize(w.width,w.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ee){s=ee,i.isPresenting===!0&&Ve("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ee){o=ee,i.isPresenting===!0&&Ve("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return u||a},this.setReferenceSpace=function(ee){u=ee},this.getBaseLayer=function(){return c!==null?c:p},this.getBinding=function(){return h===null&&_&&(h=new XRWebGLBinding(r,n)),h},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(ee){if(r=ee,r!==null){if(y=t.getRenderTarget(),r.addEventListener("select",D),r.addEventListener("selectstart",D),r.addEventListener("selectend",D),r.addEventListener("squeeze",D),r.addEventListener("squeezestart",D),r.addEventListener("squeezeend",D),r.addEventListener("end",z),r.addEventListener("inputsourceschange",H),v.xrCompatible!==!0&&await n.makeXRCompatible(),S=t.getPixelRatio(),t.getSize(w),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let fe=null,Pe=null,ze=null;v.depth&&(ze=v.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,fe=v.stencil?Gr:Vi,Pe=v.stencil?no:Si);const Fe={colorFormat:n.RGBA8,depthFormat:ze,scaleFactor:s};h=this.getBinding(),c=h.createProjectionLayer(Fe),r.updateRenderState({layers:[c]}),t.setPixelRatio(1),t.setSize(c.textureWidth,c.textureHeight,!1),M=new vi(c.textureWidth,c.textureHeight,{format:Zn,type:bn,depthTexture:new Ys(c.textureWidth,c.textureHeight,Pe,void 0,void 0,void 0,void 0,void 0,void 0,fe),stencilBuffer:v.stencil,colorSpace:t.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:c.ignoreDepthValues===!1,resolveStencilBuffer:c.ignoreDepthValues===!1})}else{const fe={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,n,fe),r.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),M=new vi(p.framebufferWidth,p.framebufferHeight,{format:Zn,type:bn,colorSpace:t.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),u=null,a=await r.requestReferenceSpace(o),Le.setContext(r),Le.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function H(ee){for(let pe=0;pe<ee.removed.length;pe++){const fe=ee.removed[pe],Pe=b.indexOf(fe);Pe>=0&&(b[Pe]=null,T[Pe].disconnect(fe))}for(let pe=0;pe<ee.added.length;pe++){const fe=ee.added[pe];let Pe=b.indexOf(fe);if(Pe===-1){for(let Fe=0;Fe<T.length;Fe++)if(Fe>=b.length){b.push(fe),Pe=Fe;break}else if(b[Fe]===null){b[Fe]=fe,Pe=Fe;break}if(Pe===-1)break}const ze=T[Pe];ze&&ze.connect(fe)}}const U=new V,j=new V;function J(ee,pe,fe){U.setFromMatrixPosition(pe.matrixWorld),j.setFromMatrixPosition(fe.matrixWorld);const Pe=U.distanceTo(j),ze=pe.projectionMatrix.elements,Fe=fe.projectionMatrix.elements,nt=ze[14]/(ze[10]-1),We=ze[14]/(ze[10]+1),Qe=(ze[9]+1)/ze[5],ut=(ze[9]-1)/ze[5],me=(ze[8]-1)/ze[0],ot=(Fe[8]+1)/Fe[0],Je=nt*me,He=nt*ot,O=Pe/(-me+ot),Be=O*-me;if(pe.matrixWorld.decompose(ee.position,ee.quaternion,ee.scale),ee.translateX(Be),ee.translateZ(O),ee.matrixWorld.compose(ee.position,ee.quaternion,ee.scale),ee.matrixWorldInverse.copy(ee.matrixWorld).invert(),ze[10]===-1)ee.projectionMatrix.copy(pe.projectionMatrix),ee.projectionMatrixInverse.copy(pe.projectionMatrixInverse);else{const q=nt+O,_e=We+O,K=Je-Be,le=He+(Pe-Be),A=Qe*We/_e*q,E=ut*We/_e*q;ee.projectionMatrix.makePerspective(K,le,A,E,q,_e),ee.projectionMatrixInverse.copy(ee.projectionMatrix).invert()}}function se(ee,pe){pe===null?ee.matrixWorld.copy(ee.matrix):ee.matrixWorld.multiplyMatrices(pe.matrixWorld,ee.matrix),ee.matrixWorldInverse.copy(ee.matrixWorld).invert()}this.updateCamera=function(ee){if(r===null)return;let pe=ee.near,fe=ee.far;g.texture!==null&&(g.depthNear>0&&(pe=g.depthNear),g.depthFar>0&&(fe=g.depthFar)),L.near=P.near=x.near=pe,L.far=P.far=x.far=fe,(F!==L.near||B!==L.far)&&(r.updateRenderState({depthNear:L.near,depthFar:L.far}),F=L.near,B=L.far),L.layers.mask=ee.layers.mask|6,x.layers.mask=L.layers.mask&-5,P.layers.mask=L.layers.mask&-3;const Pe=ee.parent,ze=L.cameras;se(L,Pe);for(let Fe=0;Fe<ze.length;Fe++)se(ze[Fe],Pe);ze.length===2?J(L,x,P):L.projectionMatrix.copy(x.projectionMatrix),ce(ee,L,Pe)};function ce(ee,pe,fe){fe===null?ee.matrix.copy(pe.matrixWorld):(ee.matrix.copy(fe.matrixWorld),ee.matrix.invert(),ee.matrix.multiply(pe.matrixWorld)),ee.matrix.decompose(ee.position,ee.quaternion,ee.scale),ee.updateMatrixWorld(!0),ee.projectionMatrix.copy(pe.projectionMatrix),ee.projectionMatrixInverse.copy(pe.projectionMatrixInverse),ee.isPerspectiveCamera&&(ee.fov=Nd*2*Math.atan(1/ee.projectionMatrix.elements[5]),ee.zoom=1)}this.getCamera=function(){return L},this.getFoveation=function(){if(!(c===null&&p===null))return l},this.setFoveation=function(ee){l=ee,c!==null&&(c.fixedFoveation=ee),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=ee)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(L)},this.getCameraTexture=function(ee){return d[ee]};let Ie=null;function ke(ee,pe){if(f=pe.getViewerPose(u||a),m=pe,f!==null){const fe=f.views;p!==null&&(t.setRenderTargetFramebuffer(M,p.framebuffer),t.setRenderTarget(M));let Pe=!1;fe.length!==L.cameras.length&&(L.cameras.length=0,Pe=!0);for(let We=0;We<fe.length;We++){const Qe=fe[We];let ut=null;if(p!==null)ut=p.getViewport(Qe);else{const ot=h.getViewSubImage(c,Qe);ut=ot.viewport,We===0&&(t.setRenderTargetTextures(M,ot.colorTexture,ot.depthStencilTexture),t.setRenderTarget(M))}let me=R[We];me===void 0&&(me=new Tn,me.layers.enable(We),me.viewport=new Rt,R[We]=me),me.matrix.fromArray(Qe.transform.matrix),me.matrix.decompose(me.position,me.quaternion,me.scale),me.projectionMatrix.fromArray(Qe.projectionMatrix),me.projectionMatrixInverse.copy(me.projectionMatrix).invert(),me.viewport.set(ut.x,ut.y,ut.width,ut.height),We===0&&(L.matrix.copy(me.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale)),Pe===!0&&L.cameras.push(me)}const ze=r.enabledFeatures;if(ze&&ze.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&_){h=i.getBinding();const We=h.getDepthInformation(fe[0]);We&&We.isValid&&We.texture&&g.init(We,r.renderState)}if(ze&&ze.includes("camera-access")&&_){t.state.unbindTexture(),h=i.getBinding();for(let We=0;We<fe.length;We++){const Qe=fe[We].camera;if(Qe){let ut=d[Qe];ut||(ut=new z_,d[Qe]=ut);const me=h.getCameraImage(Qe);ut.sourceTexture=me}}}}for(let fe=0;fe<T.length;fe++){const Pe=b[fe],ze=T[fe];Pe!==null&&ze!==void 0&&ze.update(Pe,pe,u||a)}Ie&&Ie(ee,pe),pe.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:pe}),m=null}const Le=new W_;Le.setAnimationLoop(ke),this.setAnimationLoop=function(ee){Ie=ee},this.dispose=function(){}}}const SA=new wt,Z_=new je;Z_.set(-1,0,0,0,1,0,0,0,1);function yA(e,t){function n(g,d){g.matrixAutoUpdate===!0&&g.updateMatrix(),d.value.copy(g.matrix)}function i(g,d){d.color.getRGB(g.fogColor.value,G_(e)),d.isFog?(g.fogNear.value=d.near,g.fogFar.value=d.far):d.isFogExp2&&(g.fogDensity.value=d.density)}function r(g,d,v,y,M){d.isNodeMaterial?d.uniformsNeedUpdate=!1:d.isMeshBasicMaterial?s(g,d):d.isMeshLambertMaterial?(s(g,d),d.envMap&&(g.envMapIntensity.value=d.envMapIntensity)):d.isMeshToonMaterial?(s(g,d),h(g,d)):d.isMeshPhongMaterial?(s(g,d),f(g,d),d.envMap&&(g.envMapIntensity.value=d.envMapIntensity)):d.isMeshStandardMaterial?(s(g,d),c(g,d),d.isMeshPhysicalMaterial&&p(g,d,M)):d.isMeshMatcapMaterial?(s(g,d),m(g,d)):d.isMeshDepthMaterial?s(g,d):d.isMeshDistanceMaterial?(s(g,d),_(g,d)):d.isMeshNormalMaterial?s(g,d):d.isLineBasicMaterial?(a(g,d),d.isLineDashedMaterial&&o(g,d)):d.isPointsMaterial?l(g,d,v,y):d.isSpriteMaterial?u(g,d):d.isShadowMaterial?(g.color.value.copy(d.color),g.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function s(g,d){g.opacity.value=d.opacity,d.color&&g.diffuse.value.copy(d.color),d.emissive&&g.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(g.map.value=d.map,n(d.map,g.mapTransform)),d.alphaMap&&(g.alphaMap.value=d.alphaMap,n(d.alphaMap,g.alphaMapTransform)),d.bumpMap&&(g.bumpMap.value=d.bumpMap,n(d.bumpMap,g.bumpMapTransform),g.bumpScale.value=d.bumpScale,d.side===_n&&(g.bumpScale.value*=-1)),d.normalMap&&(g.normalMap.value=d.normalMap,n(d.normalMap,g.normalMapTransform),g.normalScale.value.copy(d.normalScale),d.side===_n&&g.normalScale.value.negate()),d.displacementMap&&(g.displacementMap.value=d.displacementMap,n(d.displacementMap,g.displacementMapTransform),g.displacementScale.value=d.displacementScale,g.displacementBias.value=d.displacementBias),d.emissiveMap&&(g.emissiveMap.value=d.emissiveMap,n(d.emissiveMap,g.emissiveMapTransform)),d.specularMap&&(g.specularMap.value=d.specularMap,n(d.specularMap,g.specularMapTransform)),d.alphaTest>0&&(g.alphaTest.value=d.alphaTest);const v=t.get(d),y=v.envMap,M=v.envMapRotation;y&&(g.envMap.value=y,g.envMapRotation.value.setFromMatrix4(SA.makeRotationFromEuler(M)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(Z_),g.reflectivity.value=d.reflectivity,g.ior.value=d.ior,g.refractionRatio.value=d.refractionRatio),d.lightMap&&(g.lightMap.value=d.lightMap,g.lightMapIntensity.value=d.lightMapIntensity,n(d.lightMap,g.lightMapTransform)),d.aoMap&&(g.aoMap.value=d.aoMap,g.aoMapIntensity.value=d.aoMapIntensity,n(d.aoMap,g.aoMapTransform))}function a(g,d){g.diffuse.value.copy(d.color),g.opacity.value=d.opacity,d.map&&(g.map.value=d.map,n(d.map,g.mapTransform))}function o(g,d){g.dashSize.value=d.dashSize,g.totalSize.value=d.dashSize+d.gapSize,g.scale.value=d.scale}function l(g,d,v,y){g.diffuse.value.copy(d.color),g.opacity.value=d.opacity,g.size.value=d.size*v,g.scale.value=y*.5,d.map&&(g.map.value=d.map,n(d.map,g.uvTransform)),d.alphaMap&&(g.alphaMap.value=d.alphaMap,n(d.alphaMap,g.alphaMapTransform)),d.alphaTest>0&&(g.alphaTest.value=d.alphaTest)}function u(g,d){g.diffuse.value.copy(d.color),g.opacity.value=d.opacity,g.rotation.value=d.rotation,d.map&&(g.map.value=d.map,n(d.map,g.mapTransform)),d.alphaMap&&(g.alphaMap.value=d.alphaMap,n(d.alphaMap,g.alphaMapTransform)),d.alphaTest>0&&(g.alphaTest.value=d.alphaTest)}function f(g,d){g.specular.value.copy(d.specular),g.shininess.value=Math.max(d.shininess,1e-4)}function h(g,d){d.gradientMap&&(g.gradientMap.value=d.gradientMap)}function c(g,d){g.metalness.value=d.metalness,d.metalnessMap&&(g.metalnessMap.value=d.metalnessMap,n(d.metalnessMap,g.metalnessMapTransform)),g.roughness.value=d.roughness,d.roughnessMap&&(g.roughnessMap.value=d.roughnessMap,n(d.roughnessMap,g.roughnessMapTransform)),d.envMap&&(g.envMapIntensity.value=d.envMapIntensity)}function p(g,d,v){g.ior.value=d.ior,d.sheen>0&&(g.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),g.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(g.sheenColorMap.value=d.sheenColorMap,n(d.sheenColorMap,g.sheenColorMapTransform)),d.sheenRoughnessMap&&(g.sheenRoughnessMap.value=d.sheenRoughnessMap,n(d.sheenRoughnessMap,g.sheenRoughnessMapTransform))),d.clearcoat>0&&(g.clearcoat.value=d.clearcoat,g.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(g.clearcoatMap.value=d.clearcoatMap,n(d.clearcoatMap,g.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,n(d.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(g.clearcoatNormalMap.value=d.clearcoatNormalMap,n(d.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===_n&&g.clearcoatNormalScale.value.negate())),d.dispersion>0&&(g.dispersion.value=d.dispersion),d.iridescence>0&&(g.iridescence.value=d.iridescence,g.iridescenceIOR.value=d.iridescenceIOR,g.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(g.iridescenceMap.value=d.iridescenceMap,n(d.iridescenceMap,g.iridescenceMapTransform)),d.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=d.iridescenceThicknessMap,n(d.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),d.transmission>0&&(g.transmission.value=d.transmission,g.transmissionSamplerMap.value=v.texture,g.transmissionSamplerSize.value.set(v.width,v.height),d.transmissionMap&&(g.transmissionMap.value=d.transmissionMap,n(d.transmissionMap,g.transmissionMapTransform)),g.thickness.value=d.thickness,d.thicknessMap&&(g.thicknessMap.value=d.thicknessMap,n(d.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=d.attenuationDistance,g.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(g.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(g.anisotropyMap.value=d.anisotropyMap,n(d.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=d.specularIntensity,g.specularColor.value.copy(d.specularColor),d.specularColorMap&&(g.specularColorMap.value=d.specularColorMap,n(d.specularColorMap,g.specularColorMapTransform)),d.specularIntensityMap&&(g.specularIntensityMap.value=d.specularIntensityMap,n(d.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,d){d.matcap&&(g.matcap.value=d.matcap)}function _(g,d){const v=t.get(d).light;g.referencePosition.value.setFromMatrixPosition(v.matrixWorld),g.nearDistance.value=v.shadow.camera.near,g.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function MA(e,t,n,i){let r={},s={},a=[];const o=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,y){const M=y.program;i.uniformBlockBinding(v,M)}function u(v,y){let M=r[v.id];M===void 0&&(m(v),M=f(v),r[v.id]=M,v.addEventListener("dispose",g));const T=y.program;i.updateUBOMapping(v,T);const b=t.render.frame;s[v.id]!==b&&(c(v),s[v.id]=b)}function f(v){const y=h();v.__bindingPointIndex=y;const M=e.createBuffer(),T=v.__size,b=v.usage;return e.bindBuffer(e.UNIFORM_BUFFER,M),e.bufferData(e.UNIFORM_BUFFER,T,b),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,y,M),M}function h(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return st("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function c(v){const y=r[v.id],M=v.uniforms,T=v.__cache;e.bindBuffer(e.UNIFORM_BUFFER,y);for(let b=0,w=M.length;b<w;b++){const S=Array.isArray(M[b])?M[b]:[M[b]];for(let x=0,P=S.length;x<P;x++){const R=S[x];if(p(R,b,x,T)===!0){const L=R.__offset,F=Array.isArray(R.value)?R.value:[R.value];let B=0;for(let D=0;D<F.length;D++){const z=F[D],H=_(z);typeof z=="number"||typeof z=="boolean"?(R.__data[0]=z,e.bufferSubData(e.UNIFORM_BUFFER,L+B,R.__data)):z.isMatrix3?(R.__data[0]=z.elements[0],R.__data[1]=z.elements[1],R.__data[2]=z.elements[2],R.__data[3]=0,R.__data[4]=z.elements[3],R.__data[5]=z.elements[4],R.__data[6]=z.elements[5],R.__data[7]=0,R.__data[8]=z.elements[6],R.__data[9]=z.elements[7],R.__data[10]=z.elements[8],R.__data[11]=0):ArrayBuffer.isView(z)?R.__data.set(new z.constructor(z.buffer,z.byteOffset,R.__data.length)):(z.toArray(R.__data,B),B+=H.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,L,R.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(v,y,M,T){const b=v.value,w=y+"_"+M;if(T[w]===void 0)return typeof b=="number"||typeof b=="boolean"?T[w]=b:ArrayBuffer.isView(b)?T[w]=b.slice():T[w]=b.clone(),!0;{const S=T[w];if(typeof b=="number"||typeof b=="boolean"){if(S!==b)return T[w]=b,!0}else{if(ArrayBuffer.isView(b))return!0;if(S.equals(b)===!1)return S.copy(b),!0}}return!1}function m(v){const y=v.uniforms;let M=0;const T=16;for(let w=0,S=y.length;w<S;w++){const x=Array.isArray(y[w])?y[w]:[y[w]];for(let P=0,R=x.length;P<R;P++){const L=x[P],F=Array.isArray(L.value)?L.value:[L.value];for(let B=0,D=F.length;B<D;B++){const z=F[B],H=_(z),U=M%T,j=U%H.boundary,J=U+j;M+=j,J!==0&&T-J<H.storage&&(M+=T-J),L.__data=new Float32Array(H.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=M,M+=H.storage}}}const b=M%T;return b>0&&(M+=T-b),v.__size=M,v.__cache={},this}function _(v){const y={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(y.boundary=4,y.storage=4):v.isVector2?(y.boundary=8,y.storage=8):v.isVector3||v.isColor?(y.boundary=16,y.storage=12):v.isVector4?(y.boundary=16,y.storage=16):v.isMatrix3?(y.boundary=48,y.storage=48):v.isMatrix4?(y.boundary=64,y.storage=64):v.isTexture?Ve("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(y.boundary=16,y.storage=v.byteLength):Ve("WebGLRenderer: Unsupported uniform value type.",v),y}function g(v){const y=v.target;y.removeEventListener("dispose",g);const M=a.indexOf(y.__bindingPointIndex);a.splice(M,1),e.deleteBuffer(r[y.id]),delete r[y.id],delete s[y.id]}function d(){for(const v in r)e.deleteBuffer(r[v]);a=[],r={},s={}}return{bind:l,update:u,dispose:d}}const EA=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let si=null;function TA(){return si===null&&(si=new uE(EA,16,16,Zr,Gi),si.name="DFG_LUT",si.minFilter=en,si.magFilter=en,si.wrapS=Ni,si.wrapT=Ni,si.generateMipmaps=!1,si.needsUpdate=!0),si}class bA{constructor(t={}){const{canvas:n=z2(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:u=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:c=!1,outputBufferType:p=bn}=t;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=a;const _=p,g=new Set([Yh,$h,Xh]),d=new Set([bn,Si,to,no,Wh,jh]),v=new Uint32Array(4),y=new Int32Array(4),M=new V;let T=null,b=null;const w=[],S=[];let x=null;this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=gi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const P=this;let R=!1,L=null;this._outputColorSpace=Ln;let F=0,B=0,D=null,z=-1,H=null;const U=new Rt,j=new Rt;let J=null;const se=new qe(0);let ce=0,Ie=n.width,ke=n.height,Le=1,ee=null,pe=null;const fe=new Rt(0,0,Ie,ke),Pe=new Rt(0,0,Ie,ke);let ze=!1;const Fe=new ep;let nt=!1,We=!1;const Qe=new wt,ut=new V,me=new Rt,ot={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Je=!1;function He(){return D===null?Le:1}let O=i;function Be(C,G){return n.getContext(C,G)}try{const C={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:u,powerPreference:f,failIfMajorPerformanceCaveat:h};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${zh}`),n.addEventListener("webglcontextlost",ue,!1),n.addEventListener("webglcontextrestored",De,!1),n.addEventListener("webglcontextcreationerror",Xe,!1),O===null){const G="webgl2";if(O=Be(G,C),O===null)throw Be(G)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(C){throw st("WebGLRenderer: "+C.message),C}let q,_e,K,le,A,E,N,X,ne,de,ve,Q,te,Se,Me,re,ae,oe,Te,Ge,k,ge,ie;function we(){q=new Tw(O),q.init(),k=new pA(O,q),_e=new mw(O,q,t,k),K=new dA(O,q),_e.reversedDepthBuffer&&c&&K.buffers.depth.setReversed(!0),le=new xw(O),A=new Qx,E=new hA(O,q,K,A,_e,k,le),N=new Ew(P),X=new PE(O),ge=new hw(O,X),ne=new bw(O,X,le,ge),de=new Cw(O,ne,X,ge,le),oe=new Aw(O,_e,E),Me=new gw(A),ve=new Zx(P,N,q,_e,ge,Me),Q=new yA(P,A),te=new eA,Se=new aA(q),ae=new dw(P,N,K,de,m,l),re=new fA(P,de,_e),ie=new MA(O,le,_e,K),Te=new pw(O,q,le),Ge=new ww(O,q,le),le.programs=ve.programs,P.capabilities=_e,P.extensions=q,P.properties=A,P.renderLists=te,P.shadowMap=re,P.state=K,P.info=le}we(),_!==bn&&(x=new Pw(_,n.width,n.height,r,s));const ye=new _A(P,O);this.xr=ye,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const C=q.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=q.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return Le},this.setPixelRatio=function(C){C!==void 0&&(Le=C,this.setSize(Ie,ke,!1))},this.getSize=function(C){return C.set(Ie,ke)},this.setSize=function(C,G,Z=!0){if(ye.isPresenting){Ve("WebGLRenderer: Can't change size while VR device is presenting.");return}Ie=C,ke=G,n.width=Math.floor(C*Le),n.height=Math.floor(G*Le),Z===!0&&(n.style.width=C+"px",n.style.height=G+"px"),x!==null&&x.setSize(n.width,n.height),this.setViewport(0,0,C,G)},this.getDrawingBufferSize=function(C){return C.set(Ie*Le,ke*Le).floor()},this.setDrawingBufferSize=function(C,G,Z){Ie=C,ke=G,Le=Z,n.width=Math.floor(C*Z),n.height=Math.floor(G*Z),this.setViewport(0,0,C,G)},this.setEffects=function(C){if(_===bn){st("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(C){for(let G=0;G<C.length;G++)if(C[G].isOutputPass===!0){Ve("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}x.setEffects(C||[])},this.getCurrentViewport=function(C){return C.copy(U)},this.getViewport=function(C){return C.copy(fe)},this.setViewport=function(C,G,Z,$){C.isVector4?fe.set(C.x,C.y,C.z,C.w):fe.set(C,G,Z,$),K.viewport(U.copy(fe).multiplyScalar(Le).round())},this.getScissor=function(C){return C.copy(Pe)},this.setScissor=function(C,G,Z,$){C.isVector4?Pe.set(C.x,C.y,C.z,C.w):Pe.set(C,G,Z,$),K.scissor(j.copy(Pe).multiplyScalar(Le).round())},this.getScissorTest=function(){return ze},this.setScissorTest=function(C){K.setScissorTest(ze=C)},this.setOpaqueSort=function(C){ee=C},this.setTransparentSort=function(C){pe=C},this.getClearColor=function(C){return C.copy(ae.getClearColor())},this.setClearColor=function(){ae.setClearColor(...arguments)},this.getClearAlpha=function(){return ae.getClearAlpha()},this.setClearAlpha=function(){ae.setClearAlpha(...arguments)},this.clear=function(C=!0,G=!0,Z=!0){let $=0;if(C){let Y=!1;if(D!==null){const xe=D.texture.format;Y=g.has(xe)}if(Y){const xe=D.texture.type,Ce=d.has(xe),be=ae.getClearColor(),Ne=ae.getClearAlpha(),Ue=be.r,$e=be.g,Ke=be.b;Ce?(v[0]=Ue,v[1]=$e,v[2]=Ke,v[3]=Ne,O.clearBufferuiv(O.COLOR,0,v)):(y[0]=Ue,y[1]=$e,y[2]=Ke,y[3]=Ne,O.clearBufferiv(O.COLOR,0,y))}else $|=O.COLOR_BUFFER_BIT}G&&($|=O.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Z&&($|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),$!==0&&O.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(C){C.setRenderer(this),L=C},this.dispose=function(){n.removeEventListener("webglcontextlost",ue,!1),n.removeEventListener("webglcontextrestored",De,!1),n.removeEventListener("webglcontextcreationerror",Xe,!1),ae.dispose(),te.dispose(),Se.dispose(),A.dispose(),N.dispose(),de.dispose(),ge.dispose(),ie.dispose(),ve.dispose(),ye.dispose(),ye.removeEventListener("sessionstart",lp),ye.removeEventListener("sessionend",up),br.stop()};function ue(C){C.preventDefault(),Z0("WebGLRenderer: Context Lost."),R=!0}function De(){Z0("WebGLRenderer: Context Restored."),R=!1;const C=le.autoReset,G=re.enabled,Z=re.autoUpdate,$=re.needsUpdate,Y=re.type;we(),le.autoReset=C,re.enabled=G,re.autoUpdate=Z,re.needsUpdate=$,re.type=Y}function Xe(C){st("WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function Pt(C){const G=C.target;G.removeEventListener("dispose",Pt),ht(G)}function ht(C){Mi(C),A.remove(C)}function Mi(C){const G=A.get(C).programs;G!==void 0&&(G.forEach(function(Z){ve.releaseProgram(Z)}),C.isShaderMaterial&&ve.releaseShaderCache(C))}this.renderBufferDirect=function(C,G,Z,$,Y,xe){G===null&&(G=ot);const Ce=Y.isMesh&&Y.matrixWorld.determinant()<0,be=iS(C,G,Z,$,Y);K.setMaterial($,Ce);let Ne=Z.index,Ue=1;if($.wireframe===!0){if(Ne=ne.getWireframeAttribute(Z),Ne===void 0)return;Ue=2}const $e=Z.drawRange,Ke=Z.attributes.position;let Oe=$e.start*Ue,pt=($e.start+$e.count)*Ue;xe!==null&&(Oe=Math.max(Oe,xe.start*Ue),pt=Math.min(pt,(xe.start+xe.count)*Ue)),Ne!==null?(Oe=Math.max(Oe,0),pt=Math.min(pt,Ne.count)):Ke!=null&&(Oe=Math.max(Oe,0),pt=Math.min(pt,Ke.count));const It=pt-Oe;if(It<0||It===1/0)return;ge.setup(Y,$,be,Z,Ne);let At,mt=Te;if(Ne!==null&&(At=X.get(Ne),mt=Ge,mt.setIndex(At)),Y.isMesh)$.wireframe===!0?(K.setLineWidth($.wireframeLinewidth*He()),mt.setMode(O.LINES)):mt.setMode(O.TRIANGLES);else if(Y.isLine){let Yt=$.linewidth;Yt===void 0&&(Yt=1),K.setLineWidth(Yt*He()),Y.isLineSegments?mt.setMode(O.LINES):Y.isLineLoop?mt.setMode(O.LINE_LOOP):mt.setMode(O.LINE_STRIP)}else Y.isPoints?mt.setMode(O.POINTS):Y.isSprite&&mt.setMode(O.TRIANGLES);if(Y.isBatchedMesh)if(q.get("WEBGL_multi_draw"))mt.renderMultiDraw(Y._multiDrawStarts,Y._multiDrawCounts,Y._multiDrawCount);else{const Yt=Y._multiDrawStarts,Ae=Y._multiDrawCounts,Sn=Y._multiDrawCount,rt=Ne?X.get(Ne).bytesPerElement:1,In=A.get($).currentProgram.getUniforms();for(let ni=0;ni<Sn;ni++)In.setValue(O,"_gl_DrawID",ni),mt.render(Yt[ni]/rt,Ae[ni])}else if(Y.isInstancedMesh)mt.renderInstances(Oe,It,Y.count);else if(Z.isInstancedBufferGeometry){const Yt=Z._maxInstanceCount!==void 0?Z._maxInstanceCount:1/0,Ae=Math.min(Z.instanceCount,Yt);mt.renderInstances(Oe,It,Ae)}else mt.render(Oe,It)};function ti(C,G,Z){C.transparent===!0&&C.side===fi&&C.forceSinglePass===!1?(C.side=_n,C.needsUpdate=!0,mo(C,G,Z),C.side=_i,C.needsUpdate=!0,mo(C,G,Z),C.side=fi):mo(C,G,Z)}this.compile=function(C,G,Z=null){Z===null&&(Z=C),b=Se.get(Z),b.init(G),S.push(b),Z.traverseVisible(function(Y){Y.isLight&&Y.layers.test(G.layers)&&(b.pushLight(Y),Y.castShadow&&b.pushShadow(Y))}),C!==Z&&C.traverseVisible(function(Y){Y.isLight&&Y.layers.test(G.layers)&&(b.pushLight(Y),Y.castShadow&&b.pushShadow(Y))}),b.setupLights();const $=new Set;return C.traverse(function(Y){if(!(Y.isMesh||Y.isPoints||Y.isLine||Y.isSprite))return;const xe=Y.material;if(xe)if(Array.isArray(xe))for(let Ce=0;Ce<xe.length;Ce++){const be=xe[Ce];ti(be,Z,Y),$.add(be)}else ti(xe,Z,Y),$.add(xe)}),b=S.pop(),$},this.compileAsync=function(C,G,Z=null){const $=this.compile(C,G,Z);return new Promise(Y=>{function xe(){if($.forEach(function(Ce){A.get(Ce).currentProgram.isReady()&&$.delete(Ce)}),$.size===0){Y(C);return}setTimeout(xe,10)}q.get("KHR_parallel_shader_compile")!==null?xe():setTimeout(xe,10)})};let Du=null;function tS(C){Du&&Du(C)}function lp(){br.stop()}function up(){br.start()}const br=new W_;br.setAnimationLoop(tS),typeof self<"u"&&br.setContext(self),this.setAnimationLoop=function(C){Du=C,ye.setAnimationLoop(C),C===null?br.stop():br.start()},ye.addEventListener("sessionstart",lp),ye.addEventListener("sessionend",up),this.render=function(C,G){if(G!==void 0&&G.isCamera!==!0){st("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;L!==null&&L.renderStart(C,G);const Z=ye.enabled===!0&&ye.isPresenting===!0,$=x!==null&&(D===null||Z)&&x.begin(P,D);if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),G.parent===null&&G.matrixWorldAutoUpdate===!0&&G.updateMatrixWorld(),ye.enabled===!0&&ye.isPresenting===!0&&(x===null||x.isCompositing()===!1)&&(ye.cameraAutoUpdate===!0&&ye.updateCamera(G),G=ye.getCamera()),C.isScene===!0&&C.onBeforeRender(P,C,G,D),b=Se.get(C,S.length),b.init(G),b.state.textureUnits=E.getTextureUnits(),S.push(b),Qe.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),Fe.setFromProjectionMatrix(Qe,hi,G.reversedDepth),We=this.localClippingEnabled,nt=Me.init(this.clippingPlanes,We),T=te.get(C,w.length),T.init(),w.push(T),ye.enabled===!0&&ye.isPresenting===!0){const Ce=P.xr.getDepthSensingMesh();Ce!==null&&Uu(Ce,G,-1/0,P.sortObjects)}Uu(C,G,0,P.sortObjects),T.finish(),P.sortObjects===!0&&T.sort(ee,pe),Je=ye.enabled===!1||ye.isPresenting===!1||ye.hasDepthSensing()===!1,Je&&ae.addToRenderList(T,C),this.info.render.frame++,nt===!0&&Me.beginShadows();const Y=b.state.shadowsArray;if(re.render(Y,C,G),nt===!0&&Me.endShadows(),this.info.autoReset===!0&&this.info.reset(),($&&x.hasRenderPass())===!1){const Ce=T.opaque,be=T.transmissive;if(b.setupLights(),G.isArrayCamera){const Ne=G.cameras;if(be.length>0)for(let Ue=0,$e=Ne.length;Ue<$e;Ue++){const Ke=Ne[Ue];fp(Ce,be,C,Ke)}Je&&ae.render(C);for(let Ue=0,$e=Ne.length;Ue<$e;Ue++){const Ke=Ne[Ue];cp(T,C,Ke,Ke.viewport)}}else be.length>0&&fp(Ce,be,C,G),Je&&ae.render(C),cp(T,C,G)}D!==null&&B===0&&(E.updateMultisampleRenderTarget(D),E.updateRenderTargetMipmap(D)),$&&x.end(P),C.isScene===!0&&C.onAfterRender(P,C,G),ge.resetDefaultState(),z=-1,H=null,S.pop(),S.length>0?(b=S[S.length-1],E.setTextureUnits(b.state.textureUnits),nt===!0&&Me.setGlobalState(P.clippingPlanes,b.state.camera)):b=null,w.pop(),w.length>0?T=w[w.length-1]:T=null,L!==null&&L.renderEnd()};function Uu(C,G,Z,$){if(C.visible===!1)return;if(C.layers.test(G.layers)){if(C.isGroup)Z=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(G);else if(C.isLightProbeGrid)b.pushLightProbeGrid(C);else if(C.isLight)b.pushLight(C),C.castShadow&&b.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||Fe.intersectsSprite(C)){$&&me.setFromMatrixPosition(C.matrixWorld).applyMatrix4(Qe);const Ce=de.update(C),be=C.material;be.visible&&T.push(C,Ce,be,Z,me.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||Fe.intersectsObject(C))){const Ce=de.update(C),be=C.material;if($&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),me.copy(C.boundingSphere.center)):(Ce.boundingSphere===null&&Ce.computeBoundingSphere(),me.copy(Ce.boundingSphere.center)),me.applyMatrix4(C.matrixWorld).applyMatrix4(Qe)),Array.isArray(be)){const Ne=Ce.groups;for(let Ue=0,$e=Ne.length;Ue<$e;Ue++){const Ke=Ne[Ue],Oe=be[Ke.materialIndex];Oe&&Oe.visible&&T.push(C,Ce,Oe,Z,me.z,Ke)}}else be.visible&&T.push(C,Ce,be,Z,me.z,null)}}const xe=C.children;for(let Ce=0,be=xe.length;Ce<be;Ce++)Uu(xe[Ce],G,Z,$)}function cp(C,G,Z,$){const{opaque:Y,transmissive:xe,transparent:Ce}=C;b.setupLightsView(Z),nt===!0&&Me.setGlobalState(P.clippingPlanes,Z),$&&K.viewport(U.copy($)),Y.length>0&&po(Y,G,Z),xe.length>0&&po(xe,G,Z),Ce.length>0&&po(Ce,G,Z),K.buffers.depth.setTest(!0),K.buffers.depth.setMask(!0),K.buffers.color.setMask(!0),K.setPolygonOffset(!1)}function fp(C,G,Z,$){if((Z.isScene===!0?Z.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[$.id]===void 0){const Oe=q.has("EXT_color_buffer_half_float")||q.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[$.id]=new vi(1,1,{generateMipmaps:!0,type:Oe?Gi:bn,minFilter:zr,samples:Math.max(4,_e.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:et.workingColorSpace})}const xe=b.state.transmissionRenderTarget[$.id],Ce=$.viewport||U;xe.setSize(Ce.z*P.transmissionResolutionScale,Ce.w*P.transmissionResolutionScale);const be=P.getRenderTarget(),Ne=P.getActiveCubeFace(),Ue=P.getActiveMipmapLevel();P.setRenderTarget(xe),P.getClearColor(se),ce=P.getClearAlpha(),ce<1&&P.setClearColor(16777215,.5),P.clear(),Je&&ae.render(Z);const $e=P.toneMapping;P.toneMapping=gi;const Ke=$.viewport;if($.viewport!==void 0&&($.viewport=void 0),b.setupLightsView($),nt===!0&&Me.setGlobalState(P.clippingPlanes,$),po(C,Z,$),E.updateMultisampleRenderTarget(xe),E.updateRenderTargetMipmap(xe),q.has("WEBGL_multisampled_render_to_texture")===!1){let Oe=!1;for(let pt=0,It=G.length;pt<It;pt++){const At=G[pt],{object:mt,geometry:Yt,material:Ae,group:Sn}=At;if(Ae.side===fi&&mt.layers.test($.layers)){const rt=Ae.side;Ae.side=_n,Ae.needsUpdate=!0,dp(mt,Z,$,Yt,Ae,Sn),Ae.side=rt,Ae.needsUpdate=!0,Oe=!0}}Oe===!0&&(E.updateMultisampleRenderTarget(xe),E.updateRenderTargetMipmap(xe))}P.setRenderTarget(be,Ne,Ue),P.setClearColor(se,ce),Ke!==void 0&&($.viewport=Ke),P.toneMapping=$e}function po(C,G,Z){const $=G.isScene===!0?G.overrideMaterial:null;for(let Y=0,xe=C.length;Y<xe;Y++){const Ce=C[Y],{object:be,geometry:Ne,group:Ue}=Ce;let $e=Ce.material;$e.allowOverride===!0&&$!==null&&($e=$),be.layers.test(Z.layers)&&dp(be,G,Z,Ne,$e,Ue)}}function dp(C,G,Z,$,Y,xe){C.onBeforeRender(P,G,Z,$,Y,xe),C.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),Y.onBeforeRender(P,G,Z,$,C,xe),Y.transparent===!0&&Y.side===fi&&Y.forceSinglePass===!1?(Y.side=_n,Y.needsUpdate=!0,P.renderBufferDirect(Z,G,$,Y,C,xe),Y.side=_i,Y.needsUpdate=!0,P.renderBufferDirect(Z,G,$,Y,C,xe),Y.side=fi):P.renderBufferDirect(Z,G,$,Y,C,xe),C.onAfterRender(P,G,Z,$,Y,xe)}function mo(C,G,Z){G.isScene!==!0&&(G=ot);const $=A.get(C),Y=b.state.lights,xe=b.state.shadowsArray,Ce=Y.state.version,be=ve.getParameters(C,Y.state,xe,G,Z,b.state.lightProbeGridArray),Ne=ve.getProgramCacheKey(be);let Ue=$.programs;$.environment=C.isMeshStandardMaterial||C.isMeshLambertMaterial||C.isMeshPhongMaterial?G.environment:null,$.fog=G.fog;const $e=C.isMeshStandardMaterial||C.isMeshLambertMaterial&&!C.envMap||C.isMeshPhongMaterial&&!C.envMap;$.envMap=N.get(C.envMap||$.environment,$e),$.envMapRotation=$.environment!==null&&C.envMap===null?G.environmentRotation:C.envMapRotation,Ue===void 0&&(C.addEventListener("dispose",Pt),Ue=new Map,$.programs=Ue);let Ke=Ue.get(Ne);if(Ke!==void 0){if($.currentProgram===Ke&&$.lightsStateVersion===Ce)return pp(C,be),Ke}else be.uniforms=ve.getUniforms(C),L!==null&&C.isNodeMaterial&&L.build(C,Z,be),C.onBeforeCompile(be,P),Ke=ve.acquireProgram(be,Ne),Ue.set(Ne,Ke),$.uniforms=be.uniforms;const Oe=$.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(Oe.clippingPlanes=Me.uniform),pp(C,be),$.needsLights=sS(C),$.lightsStateVersion=Ce,$.needsLights&&(Oe.ambientLightColor.value=Y.state.ambient,Oe.lightProbe.value=Y.state.probe,Oe.directionalLights.value=Y.state.directional,Oe.directionalLightShadows.value=Y.state.directionalShadow,Oe.spotLights.value=Y.state.spot,Oe.spotLightShadows.value=Y.state.spotShadow,Oe.rectAreaLights.value=Y.state.rectArea,Oe.ltc_1.value=Y.state.rectAreaLTC1,Oe.ltc_2.value=Y.state.rectAreaLTC2,Oe.pointLights.value=Y.state.point,Oe.pointLightShadows.value=Y.state.pointShadow,Oe.hemisphereLights.value=Y.state.hemi,Oe.directionalShadowMatrix.value=Y.state.directionalShadowMatrix,Oe.spotLightMatrix.value=Y.state.spotLightMatrix,Oe.spotLightMap.value=Y.state.spotLightMap,Oe.pointShadowMatrix.value=Y.state.pointShadowMatrix),$.lightProbeGrid=b.state.lightProbeGridArray.length>0,$.currentProgram=Ke,$.uniformsList=null,Ke}function hp(C){if(C.uniformsList===null){const G=C.currentProgram.getUniforms();C.uniformsList=Pl.seqWithValue(G.seq,C.uniforms)}return C.uniformsList}function pp(C,G){const Z=A.get(C);Z.outputColorSpace=G.outputColorSpace,Z.batching=G.batching,Z.batchingColor=G.batchingColor,Z.instancing=G.instancing,Z.instancingColor=G.instancingColor,Z.instancingMorph=G.instancingMorph,Z.skinning=G.skinning,Z.morphTargets=G.morphTargets,Z.morphNormals=G.morphNormals,Z.morphColors=G.morphColors,Z.morphTargetsCount=G.morphTargetsCount,Z.numClippingPlanes=G.numClippingPlanes,Z.numIntersection=G.numClipIntersection,Z.vertexAlphas=G.vertexAlphas,Z.vertexTangents=G.vertexTangents,Z.toneMapping=G.toneMapping}function nS(C,G){if(C.length===0)return null;if(C.length===1)return C[0].texture!==null?C[0]:null;M.setFromMatrixPosition(G.matrixWorld);for(let Z=0,$=C.length;Z<$;Z++){const Y=C[Z];if(Y.texture!==null&&Y.boundingBox.containsPoint(M))return Y}return null}function iS(C,G,Z,$,Y){G.isScene!==!0&&(G=ot),E.resetTextureUnits();const xe=G.fog,Ce=$.isMeshStandardMaterial||$.isMeshLambertMaterial||$.isMeshPhongMaterial?G.environment:null,be=D===null?P.outputColorSpace:D.isXRRenderTarget===!0?D.texture.colorSpace:et.workingColorSpace,Ne=$.isMeshStandardMaterial||$.isMeshLambertMaterial&&!$.envMap||$.isMeshPhongMaterial&&!$.envMap,Ue=N.get($.envMap||Ce,Ne),$e=$.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,Ke=!!Z.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),Oe=!!Z.morphAttributes.position,pt=!!Z.morphAttributes.normal,It=!!Z.morphAttributes.color;let At=gi;$.toneMapped&&(D===null||D.isXRRenderTarget===!0)&&(At=P.toneMapping);const mt=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,Yt=mt!==void 0?mt.length:0,Ae=A.get($),Sn=b.state.lights;if(nt===!0&&(We===!0||C!==H)){const vt=C===H&&$.id===z;Me.setState($,C,vt)}let rt=!1;$.version===Ae.__version?(Ae.needsLights&&Ae.lightsStateVersion!==Sn.state.version||Ae.outputColorSpace!==be||Y.isBatchedMesh&&Ae.batching===!1||!Y.isBatchedMesh&&Ae.batching===!0||Y.isBatchedMesh&&Ae.batchingColor===!0&&Y.colorTexture===null||Y.isBatchedMesh&&Ae.batchingColor===!1&&Y.colorTexture!==null||Y.isInstancedMesh&&Ae.instancing===!1||!Y.isInstancedMesh&&Ae.instancing===!0||Y.isSkinnedMesh&&Ae.skinning===!1||!Y.isSkinnedMesh&&Ae.skinning===!0||Y.isInstancedMesh&&Ae.instancingColor===!0&&Y.instanceColor===null||Y.isInstancedMesh&&Ae.instancingColor===!1&&Y.instanceColor!==null||Y.isInstancedMesh&&Ae.instancingMorph===!0&&Y.morphTexture===null||Y.isInstancedMesh&&Ae.instancingMorph===!1&&Y.morphTexture!==null||Ae.envMap!==Ue||$.fog===!0&&Ae.fog!==xe||Ae.numClippingPlanes!==void 0&&(Ae.numClippingPlanes!==Me.numPlanes||Ae.numIntersection!==Me.numIntersection)||Ae.vertexAlphas!==$e||Ae.vertexTangents!==Ke||Ae.morphTargets!==Oe||Ae.morphNormals!==pt||Ae.morphColors!==It||Ae.toneMapping!==At||Ae.morphTargetsCount!==Yt||!!Ae.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&(rt=!0):(rt=!0,Ae.__version=$.version);let In=Ae.currentProgram;rt===!0&&(In=mo($,G,Y),L&&$.isNodeMaterial&&L.onUpdateProgram($,In,Ae));let ni=!1,Wi=!1,ns=!1;const gt=In.getUniforms(),Nt=Ae.uniforms;if(K.useProgram(In.program)&&(ni=!0,Wi=!0,ns=!0),$.id!==z&&(z=$.id,Wi=!0),Ae.needsLights){const vt=nS(b.state.lightProbeGridArray,Y);Ae.lightProbeGrid!==vt&&(Ae.lightProbeGrid=vt,Wi=!0)}if(ni||H!==C){K.buffers.depth.getReversed()&&C.reversedDepth!==!0&&(C._reversedDepth=!0,C.updateProjectionMatrix()),gt.setValue(O,"projectionMatrix",C.projectionMatrix),gt.setValue(O,"viewMatrix",C.matrixWorldInverse);const Xi=gt.map.cameraPosition;Xi!==void 0&&Xi.setValue(O,ut.setFromMatrixPosition(C.matrixWorld)),_e.logarithmicDepthBuffer&&gt.setValue(O,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&gt.setValue(O,"isOrthographic",C.isOrthographicCamera===!0),H!==C&&(H=C,Wi=!0,ns=!0)}if(Ae.needsLights&&(Sn.state.directionalShadowMap.length>0&&gt.setValue(O,"directionalShadowMap",Sn.state.directionalShadowMap,E),Sn.state.spotShadowMap.length>0&&gt.setValue(O,"spotShadowMap",Sn.state.spotShadowMap,E),Sn.state.pointShadowMap.length>0&&gt.setValue(O,"pointShadowMap",Sn.state.pointShadowMap,E)),Y.isSkinnedMesh){gt.setOptional(O,Y,"bindMatrix"),gt.setOptional(O,Y,"bindMatrixInverse");const vt=Y.skeleton;vt&&(vt.boneTexture===null&&vt.computeBoneTexture(),gt.setValue(O,"boneTexture",vt.boneTexture,E))}Y.isBatchedMesh&&(gt.setOptional(O,Y,"batchingTexture"),gt.setValue(O,"batchingTexture",Y._matricesTexture,E),gt.setOptional(O,Y,"batchingIdTexture"),gt.setValue(O,"batchingIdTexture",Y._indirectTexture,E),gt.setOptional(O,Y,"batchingColorTexture"),Y._colorsTexture!==null&&gt.setValue(O,"batchingColorTexture",Y._colorsTexture,E));const ji=Z.morphAttributes;if((ji.position!==void 0||ji.normal!==void 0||ji.color!==void 0)&&oe.update(Y,Z,In),(Wi||Ae.receiveShadow!==Y.receiveShadow)&&(Ae.receiveShadow=Y.receiveShadow,gt.setValue(O,"receiveShadow",Y.receiveShadow)),($.isMeshStandardMaterial||$.isMeshLambertMaterial||$.isMeshPhongMaterial)&&$.envMap===null&&G.environment!==null&&(Nt.envMapIntensity.value=G.environmentIntensity),Nt.dfgLUT!==void 0&&(Nt.dfgLUT.value=TA()),Wi){if(gt.setValue(O,"toneMappingExposure",P.toneMappingExposure),Ae.needsLights&&rS(Nt,ns),xe&&$.fog===!0&&Q.refreshFogUniforms(Nt,xe),Q.refreshMaterialUniforms(Nt,$,Le,ke,b.state.transmissionRenderTarget[C.id]),Ae.needsLights&&Ae.lightProbeGrid){const vt=Ae.lightProbeGrid;Nt.probesSH.value=vt.texture,Nt.probesMin.value.copy(vt.boundingBox.min),Nt.probesMax.value.copy(vt.boundingBox.max),Nt.probesResolution.value.copy(vt.resolution)}Pl.upload(O,hp(Ae),Nt,E)}if($.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(Pl.upload(O,hp(Ae),Nt,E),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&gt.setValue(O,"center",Y.center),gt.setValue(O,"modelViewMatrix",Y.modelViewMatrix),gt.setValue(O,"normalMatrix",Y.normalMatrix),gt.setValue(O,"modelMatrix",Y.matrixWorld),$.uniformsGroups!==void 0){const vt=$.uniformsGroups;for(let Xi=0,is=vt.length;Xi<is;Xi++){const mp=vt[Xi];ie.update(mp,In),ie.bind(mp,In)}}return In}function rS(C,G){C.ambientLightColor.needsUpdate=G,C.lightProbe.needsUpdate=G,C.directionalLights.needsUpdate=G,C.directionalLightShadows.needsUpdate=G,C.pointLights.needsUpdate=G,C.pointLightShadows.needsUpdate=G,C.spotLights.needsUpdate=G,C.spotLightShadows.needsUpdate=G,C.rectAreaLights.needsUpdate=G,C.hemisphereLights.needsUpdate=G}function sS(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return F},this.getActiveMipmapLevel=function(){return B},this.getRenderTarget=function(){return D},this.setRenderTargetTextures=function(C,G,Z){const $=A.get(C);$.__autoAllocateDepthBuffer=C.resolveDepthBuffer===!1,$.__autoAllocateDepthBuffer===!1&&($.__useRenderToTexture=!1),A.get(C.texture).__webglTexture=G,A.get(C.depthTexture).__webglTexture=$.__autoAllocateDepthBuffer?void 0:Z,$.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(C,G){const Z=A.get(C);Z.__webglFramebuffer=G,Z.__useDefaultFramebuffer=G===void 0};const aS=O.createFramebuffer();this.setRenderTarget=function(C,G=0,Z=0){D=C,F=G,B=Z;let $=null,Y=!1,xe=!1;if(C){const be=A.get(C);if(be.__useDefaultFramebuffer!==void 0){K.bindFramebuffer(O.FRAMEBUFFER,be.__webglFramebuffer),U.copy(C.viewport),j.copy(C.scissor),J=C.scissorTest,K.viewport(U),K.scissor(j),K.setScissorTest(J),z=-1;return}else if(be.__webglFramebuffer===void 0)E.setupRenderTarget(C);else if(be.__hasExternalTextures)E.rebindTextures(C,A.get(C.texture).__webglTexture,A.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){const $e=C.depthTexture;if(be.__boundDepthTexture!==$e){if($e!==null&&A.has($e)&&(C.width!==$e.image.width||C.height!==$e.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");E.setupDepthRenderbuffer(C)}}const Ne=C.texture;(Ne.isData3DTexture||Ne.isDataArrayTexture||Ne.isCompressedArrayTexture)&&(xe=!0);const Ue=A.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(Ue[G])?$=Ue[G][Z]:$=Ue[G],Y=!0):C.samples>0&&E.useMultisampledRTT(C)===!1?$=A.get(C).__webglMultisampledFramebuffer:Array.isArray(Ue)?$=Ue[Z]:$=Ue,U.copy(C.viewport),j.copy(C.scissor),J=C.scissorTest}else U.copy(fe).multiplyScalar(Le).floor(),j.copy(Pe).multiplyScalar(Le).floor(),J=ze;if(Z!==0&&($=aS),K.bindFramebuffer(O.FRAMEBUFFER,$)&&K.drawBuffers(C,$),K.viewport(U),K.scissor(j),K.setScissorTest(J),Y){const be=A.get(C.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+G,be.__webglTexture,Z)}else if(xe){const be=G;for(let Ne=0;Ne<C.textures.length;Ne++){const Ue=A.get(C.textures[Ne]);O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0+Ne,Ue.__webglTexture,Z,be)}}else if(C!==null&&Z!==0){const be=A.get(C.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,be.__webglTexture,Z)}z=-1},this.readRenderTargetPixels=function(C,G,Z,$,Y,xe,Ce,be=0){if(!(C&&C.isWebGLRenderTarget)){st("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ne=A.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Ce!==void 0&&(Ne=Ne[Ce]),Ne){K.bindFramebuffer(O.FRAMEBUFFER,Ne);try{const Ue=C.textures[be],$e=Ue.format,Ke=Ue.type;if(C.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+be),!_e.textureFormatReadable($e)){st("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!_e.textureTypeReadable(Ke)){st("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}G>=0&&G<=C.width-$&&Z>=0&&Z<=C.height-Y&&O.readPixels(G,Z,$,Y,k.convert($e),k.convert(Ke),xe)}finally{const Ue=D!==null?A.get(D).__webglFramebuffer:null;K.bindFramebuffer(O.FRAMEBUFFER,Ue)}}},this.readRenderTargetPixelsAsync=async function(C,G,Z,$,Y,xe,Ce,be=0){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ne=A.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Ce!==void 0&&(Ne=Ne[Ce]),Ne)if(G>=0&&G<=C.width-$&&Z>=0&&Z<=C.height-Y){K.bindFramebuffer(O.FRAMEBUFFER,Ne);const Ue=C.textures[be],$e=Ue.format,Ke=Ue.type;if(C.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+be),!_e.textureFormatReadable($e))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!_e.textureTypeReadable(Ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Oe=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,Oe),O.bufferData(O.PIXEL_PACK_BUFFER,xe.byteLength,O.STREAM_READ),O.readPixels(G,Z,$,Y,k.convert($e),k.convert(Ke),0);const pt=D!==null?A.get(D).__webglFramebuffer:null;K.bindFramebuffer(O.FRAMEBUFFER,pt);const It=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await G2(O,It,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,Oe),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,xe),O.deleteBuffer(Oe),O.deleteSync(It),xe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(C,G=null,Z=0){const $=Math.pow(2,-Z),Y=Math.floor(C.image.width*$),xe=Math.floor(C.image.height*$),Ce=G!==null?G.x:0,be=G!==null?G.y:0;E.setTexture2D(C,0),O.copyTexSubImage2D(O.TEXTURE_2D,Z,0,0,Ce,be,Y,xe),K.unbindTexture()};const oS=O.createFramebuffer(),lS=O.createFramebuffer();this.copyTextureToTexture=function(C,G,Z=null,$=null,Y=0,xe=0){let Ce,be,Ne,Ue,$e,Ke,Oe,pt,It;const At=C.isCompressedTexture?C.mipmaps[xe]:C.image;if(Z!==null)Ce=Z.max.x-Z.min.x,be=Z.max.y-Z.min.y,Ne=Z.isBox3?Z.max.z-Z.min.z:1,Ue=Z.min.x,$e=Z.min.y,Ke=Z.isBox3?Z.min.z:0;else{const Nt=Math.pow(2,-Y);Ce=Math.floor(At.width*Nt),be=Math.floor(At.height*Nt),C.isDataArrayTexture?Ne=At.depth:C.isData3DTexture?Ne=Math.floor(At.depth*Nt):Ne=1,Ue=0,$e=0,Ke=0}$!==null?(Oe=$.x,pt=$.y,It=$.z):(Oe=0,pt=0,It=0);const mt=k.convert(G.format),Yt=k.convert(G.type);let Ae;G.isData3DTexture?(E.setTexture3D(G,0),Ae=O.TEXTURE_3D):G.isDataArrayTexture||G.isCompressedArrayTexture?(E.setTexture2DArray(G,0),Ae=O.TEXTURE_2D_ARRAY):(E.setTexture2D(G,0),Ae=O.TEXTURE_2D),K.activeTexture(O.TEXTURE0),K.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,G.flipY),K.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),K.pixelStorei(O.UNPACK_ALIGNMENT,G.unpackAlignment);const Sn=K.getParameter(O.UNPACK_ROW_LENGTH),rt=K.getParameter(O.UNPACK_IMAGE_HEIGHT),In=K.getParameter(O.UNPACK_SKIP_PIXELS),ni=K.getParameter(O.UNPACK_SKIP_ROWS),Wi=K.getParameter(O.UNPACK_SKIP_IMAGES);K.pixelStorei(O.UNPACK_ROW_LENGTH,At.width),K.pixelStorei(O.UNPACK_IMAGE_HEIGHT,At.height),K.pixelStorei(O.UNPACK_SKIP_PIXELS,Ue),K.pixelStorei(O.UNPACK_SKIP_ROWS,$e),K.pixelStorei(O.UNPACK_SKIP_IMAGES,Ke);const ns=C.isDataArrayTexture||C.isData3DTexture,gt=G.isDataArrayTexture||G.isData3DTexture;if(C.isDepthTexture){const Nt=A.get(C),ji=A.get(G),vt=A.get(Nt.__renderTarget),Xi=A.get(ji.__renderTarget);K.bindFramebuffer(O.READ_FRAMEBUFFER,vt.__webglFramebuffer),K.bindFramebuffer(O.DRAW_FRAMEBUFFER,Xi.__webglFramebuffer);for(let is=0;is<Ne;is++)ns&&(O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,A.get(C).__webglTexture,Y,Ke+is),O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,A.get(G).__webglTexture,xe,It+is)),O.blitFramebuffer(Ue,$e,Ce,be,Oe,pt,Ce,be,O.DEPTH_BUFFER_BIT,O.NEAREST);K.bindFramebuffer(O.READ_FRAMEBUFFER,null),K.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else if(Y!==0||C.isRenderTargetTexture||A.has(C)){const Nt=A.get(C),ji=A.get(G);K.bindFramebuffer(O.READ_FRAMEBUFFER,oS),K.bindFramebuffer(O.DRAW_FRAMEBUFFER,lS);for(let vt=0;vt<Ne;vt++)ns?O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Nt.__webglTexture,Y,Ke+vt):O.framebufferTexture2D(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Nt.__webglTexture,Y),gt?O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,ji.__webglTexture,xe,It+vt):O.framebufferTexture2D(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,ji.__webglTexture,xe),Y!==0?O.blitFramebuffer(Ue,$e,Ce,be,Oe,pt,Ce,be,O.COLOR_BUFFER_BIT,O.NEAREST):gt?O.copyTexSubImage3D(Ae,xe,Oe,pt,It+vt,Ue,$e,Ce,be):O.copyTexSubImage2D(Ae,xe,Oe,pt,Ue,$e,Ce,be);K.bindFramebuffer(O.READ_FRAMEBUFFER,null),K.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else gt?C.isDataTexture||C.isData3DTexture?O.texSubImage3D(Ae,xe,Oe,pt,It,Ce,be,Ne,mt,Yt,At.data):G.isCompressedArrayTexture?O.compressedTexSubImage3D(Ae,xe,Oe,pt,It,Ce,be,Ne,mt,At.data):O.texSubImage3D(Ae,xe,Oe,pt,It,Ce,be,Ne,mt,Yt,At):C.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,xe,Oe,pt,Ce,be,mt,Yt,At.data):C.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,xe,Oe,pt,At.width,At.height,mt,At.data):O.texSubImage2D(O.TEXTURE_2D,xe,Oe,pt,Ce,be,mt,Yt,At);K.pixelStorei(O.UNPACK_ROW_LENGTH,Sn),K.pixelStorei(O.UNPACK_IMAGE_HEIGHT,rt),K.pixelStorei(O.UNPACK_SKIP_PIXELS,In),K.pixelStorei(O.UNPACK_SKIP_ROWS,ni),K.pixelStorei(O.UNPACK_SKIP_IMAGES,Wi),xe===0&&G.generateMipmaps&&O.generateMipmap(Ae),K.unbindTexture()},this.initRenderTarget=function(C){A.get(C).__webglFramebuffer===void 0&&E.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?E.setTextureCube(C,0):C.isData3DTexture?E.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?E.setTexture2DArray(C,0):E.setTexture2D(C,0),K.unbindTexture()},this.resetState=function(){F=0,B=0,D=null,K.reset(),ge.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return hi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const n=this.getContext();n.drawingBufferColorSpace=et._getDrawingBufferColorSpace(t),n.unpackColorSpace=et._getUnpackColorSpace()}}const ol=225e6,Ym=4.5,qm=14,Km=90,wA=[1,10,100,1e3],Fd="AUTO",Od="WIDE",Q_="CHASE",kd="POV",J_="FLYBY",eS="ORBITAL",jc=[Fd,Od,Q_,kd,J_,eS],xA=[{id:"burn",prog:.28,label:"MID-COURSE CORRECTION BURN",sub:"Δv = +4.2 m/s  ·  Duration: 8.3 sec",color:"#f59e0b",duration:5},{id:"flare",prog:.47,label:"SOLAR PARTICLE EVENT",sub:"Class M5.2 flare  ·  Radiation shield nominal",color:"#ef4444",duration:6},{id:"update",prog:.63,label:"MISSION CONTROL UPDATE",sub:"All systems nominal  ·  Go for orbital insertion",color:"#22c55e",duration:5},{id:"nav",prog:.79,label:"NAVIGATION CORRECTION",sub:"Inclination +0.003°  ·  ΔR = 812 km",color:"#60a5fa",duration:4},{id:"comm",prog:.9,label:"COMMS DELAY  ·  14.2 MIN",sub:"Mars approach confirmed  ·  Stand by",color:"#a78bfa",duration:5}],dn=new V(-9,0,0),ui=new V(22,0,0),Il=2.2,Zm=1.5,AA=new V(-1,.35,.6).normalize();function Nr(e,t,n){return e+(t-e)*Math.max(0,Math.min(1,n))}function ar(e,t,n){return Math.max(t,Math.min(n,e))}function Qm(e){const t=Math.floor(Math.max(0,e)),n=Math.floor(t/3600),i=Math.floor(t%3600/60),r=t%60;return`${String(n).padStart(2,"0")}:${String(i).padStart(2,"0")}:${String(r).padStart(2,"0")}`}function CA(e){const t=Math.max(0,e);return t>=1e6?`${(t/1e6).toFixed(2)}M km`:t>=1e3?`${(t/1e3).toFixed(0)}k km`:`${t.toFixed(0)} km`}function RA(e,t,n,i,r,s,a){return[(1-e)*(1-e)*t+2*(1-e)*e*i+e*e*s,(1-e)*(1-e)*n+2*(1-e)*e*r+e*e*a]}function PA(){const n=document.createElement("canvas");n.width=2048,n.height=1024;const i=n.getContext("2d"),r=i.createLinearGradient(0,0,0,1024);r.addColorStop(0,"#0a2855"),r.addColorStop(.5,"#0d3a70"),r.addColorStop(1,"#0a2855"),i.fillStyle=r,i.fillRect(0,0,2048,1024);for(let l=0;l<180;l++){const u=(Math.sin(l*3.7)*.5+.5)*2048,f=(Math.cos(l*2.9)*.5+.5)*1024,h=i.createRadialGradient(u,f,0,u,f,2048*.022);h.addColorStop(0,"rgba(30,100,200,0.18)"),h.addColorStop(1,"rgba(0,0,0,0)"),i.fillStyle=h,i.beginPath(),i.ellipse(u,f,2048*.022,1024*.01,l,0,Math.PI*2),i.fill()}i.globalCompositeOperation="source-over",[{x:2048*.16,y:1024*.32,rx:2048*.085,ry:1024*.2,rot:.25,c:"#2d6b28"},{x:2048*.12,y:1024*.46,rx:2048*.065,ry:1024*.13,rot:.08,c:"#316d24"},{x:2048*.2,y:1024*.64,rx:2048*.05,ry:1024*.18,rot:-.08,c:"#3a7a30"},{x:2048*.455,y:1024*.29,rx:2048*.048,ry:1024*.11,rot:.1,c:"#4a8a3a"},{x:2048*.465,y:1024*.54,rx:2048*.058,ry:1024*.22,rot:.05,c:"#7a6a28"},{x:2048*.62,y:1024*.28,rx:2048*.16,ry:1024*.19,rot:.05,c:"#4a8040"},{x:2048*.66,y:1024*.5,rx:2048*.04,ry:1024*.12,rot:.1,c:"#3a7030"},{x:2048*.765,y:1024*.62,rx:2048*.055,ry:1024*.08,rot:.18,c:"#8a7830"}].forEach(({x:l,y:u,rx:f,ry:h,rot:c,c:p})=>{i.save(),i.translate(l,u),i.rotate(c),i.fillStyle=p,i.beginPath(),i.ellipse(0,0,f,h,0,0,Math.PI*2),i.fill(),i.fillStyle="rgba(0,0,0,0.12)";for(let m=0;m<8;m++)i.beginPath(),i.ellipse((Math.random()-.5)*f,(Math.random()-.5)*h,f*.3*Math.random(),h*.25*Math.random(),Math.random(),0,Math.PI*2),i.fill();i.restore()}),i.fillStyle="rgba(255,255,255,0.22)";for(let l=0;l<200;l++){const u=(Math.sin(l*4.1+1)*.5+.5)*2048,f=(Math.cos(l*3.7+2)*.5+.5)*1024;i.beginPath(),i.ellipse(u,f,2048*.038,1024*.018,l*.8,0,Math.PI*2),i.fill()}i.fillStyle="rgba(255,255,255,0.14)";for(let l=0;l<120;l++){const u=(Math.sin(l*5.3+3)*.5+.5)*2048,f=(Math.cos(l*4.1+1)*.5+.5)*1024;i.beginPath(),i.ellipse(u,f,2048*.055,1024*.025,l*1.1,0,Math.PI*2),i.fill()}const a=i.createLinearGradient(0,0,0,1024*.1);a.addColorStop(0,"rgba(235,245,255,0.95)"),a.addColorStop(1,"rgba(200,225,255,0)"),i.fillStyle=a,i.fillRect(0,0,2048,1024*.1);const o=i.createLinearGradient(0,1024*.9,0,1024);return o.addColorStop(0,"rgba(200,225,255,0)"),o.addColorStop(1,"rgba(235,245,255,0.90)"),i.fillStyle=o,i.fillRect(0,1024*.9,2048,1024*.1),new ho(n)}function IA(){const n=document.createElement("canvas");n.width=2048,n.height=1024;const i=n.getContext("2d");return i.fillStyle="#000",i.fillRect(0,0,2048,1024),[[2048*.2,1024*.33,18],[2048*.15,1024*.4,14],[2048*.22,1024*.39,10],[2048*.47,1024*.3,16],[2048*.5,1024*.32,12],[2048*.44,1024*.31,10],[2048*.58,1024*.3,14],[2048*.64,1024*.31,12],[2048*.7,1024*.29,10],[2048*.72,1024*.35,9],[2048*.66,1024*.4,8],[2048*.22,1024*.62,9],[2048*.47,1024*.5,8],[2048*.77,1024*.63,7],[2048*.66,1024*.48,10]].forEach(([s,a,o])=>{const l=i.createRadialGradient(s,a,0,s,a,57.344);l.addColorStop(0,"rgba(255,220,100,0.85)"),l.addColorStop(.5,"rgba(255,180,60,0.40)"),l.addColorStop(1,"rgba(0,0,0,0)"),i.fillStyle=l,i.beginPath(),i.arc(s,a,2048*.028,0,Math.PI*2),i.fill();for(let u=0;u<o;u++){const f=(Math.random()-.5)*2048*.035,h=(Math.random()-.5)*1024*.03,c=.35+Math.random()*.55;i.fillStyle=`rgba(255,${150+Math.random()*105|0},${40+Math.random()*60|0},${c})`,i.fillRect(s+f|0,a+h|0,2,2)}}),new ho(n)}function NA(){const n=document.createElement("canvas");n.width=1024,n.height=512;const i=n.getContext("2d");return i.fillStyle="#888",i.fillRect(0,0,1024,512),i.fillStyle="#222",[[1024*.16,512*.32,1024*.085,512*.2,.25],[1024*.12,512*.46,1024*.065,512*.13,.08],[1024*.2,512*.64,1024*.05,512*.18,-.08],[1024*.455,512*.29,1024*.048,512*.11,.1],[1024*.465,512*.54,1024*.058,512*.22,.05],[1024*.62,512*.28,1024*.16,512*.19,.05],[1024*.66,512*.5,1024*.04,512*.12,.1],[1024*.765,512*.62,1024*.055,512*.08,.18]].forEach(([r,s,a,o,l])=>{i.save(),i.translate(r,s),i.rotate(l),i.beginPath(),i.ellipse(0,0,a,o,0,0,Math.PI*2),i.fill(),i.restore()}),new ho(n)}function LA(){const n=document.createElement("canvas");n.width=2048,n.height=1024;const i=n.getContext("2d"),r=i.createLinearGradient(0,0,0,1024);r.addColorStop(0,"#a03818"),r.addColorStop(.5,"#c04822"),r.addColorStop(1,"#a03818"),i.fillStyle=r,i.fillRect(0,0,2048,1024),[[2048*.4,1024*.42,2048*.18,1024*.15,0,"rgba(160,50,16,0.42)"],[2048*.7,1024*.5,2048*.14,1024*.18,0,"rgba(185,72,24,0.35)"],[2048*.2,1024*.62,2048*.12,1024*.12,0,"rgba(135,38,10,0.38)"],[2048*.55,1024*.25,2048*.22,1024*.1,0,"rgba(190,82,28,0.28)"],[2048*.8,1024*.35,2048*.1,1024*.14,0,"rgba(155,55,18,0.32)"],[2048*.05,1024*.55,2048*.08,1024*.16,0,"rgba(175,62,20,0.30)"]].forEach(([l,u,f,h,c,p])=>{i.save(),i.translate(l,u),i.rotate(c),i.fillStyle=p,i.beginPath(),i.ellipse(0,0,f,h,0,0,Math.PI*2),i.fill(),i.fillStyle="rgba(0,0,0,0.10)";for(let m=0;m<6;m++)i.beginPath(),i.ellipse((Math.random()-.5)*f,(Math.random()-.5)*h,f*.25,h*.2,Math.random(),0,Math.PI*2),i.fill();i.restore()}),i.save(),i.translate(2048*.48,1024*.46),i.rotate(-.14),i.fillStyle="rgba(80,18,4,0.55)",i.fillRect(-2048*.2,-1024*.025,2048*.4,1024*.042),i.fillStyle="rgba(60,12,2,0.30)",i.fillRect(-2048*.2,-1024*.014,2048*.4,1024*.028),i.restore();const s=i.createRadialGradient(2048*.28,1024*.4,0,2048*.28,1024*.4,2048*.055);s.addColorStop(0,"rgba(215,95,38,0.65)"),s.addColorStop(.6,"rgba(185,70,24,0.20)"),s.addColorStop(1,"rgba(0,0,0,0)"),i.fillStyle=s,i.beginPath(),i.arc(2048*.28,1024*.4,2048*.055,0,Math.PI*2),i.fill(),i.fillStyle="rgba(210,115,48,0.14)",i.fillRect(0,1024*.42,2048,1024*.18);const a=i.createLinearGradient(0,0,0,1024*.1);a.addColorStop(0,"rgba(235,228,220,0.90)"),a.addColorStop(1,"rgba(0,0,0,0)"),i.fillStyle=a,i.fillRect(0,0,2048,1024*.1);const o=i.createLinearGradient(0,1024*.9,0,1024);return o.addColorStop(0,"rgba(0,0,0,0)"),o.addColorStop(1,"rgba(225,218,210,0.82)"),i.fillStyle=o,i.fillRect(0,1024*.9,2048,1024*.1),new ho(n)}const Jm=`
varying vec3 vNormal;
varying vec3 vViewDir;
void main() {
  vNormal = normalize(normalMatrix * normal);
  vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
  vViewDir = normalize(-mvPos.xyz);
  gl_Position = projectionMatrix * mvPos;
}`,eg=`
uniform vec3 glowColor;
uniform float intensity;
uniform float power;
varying vec3 vNormal;
varying vec3 vViewDir;
void main() {
  float rim = 1.0 - clamp(dot(vNormal, vViewDir), 0.0, 1.0);
  rim = pow(rim, power);
  gl_FragColor = vec4(glowColor, rim * intensity);
}`;function DA(){const e=new iE;e.fog=new Qh(67088,.0012);const t=new Em(16775400,3.2);t.position.copy(AA).multiplyScalar(50),e.add(t);const n=new xE(660520,1.2);e.add(n);const i=new Em(1716320,.8);i.position.set(30,5,10),e.add(i);function r(T,b){const w=new cn,S=new Float32Array(T*3),x=new Float32Array(T*3);for(let R=0;R<T;R++){const L=Math.random()*Math.PI*2,F=Math.acos(2*Math.random()-1),B=b*.5+b*.5*Math.random();S[R*3]=B*Math.sin(F)*Math.cos(L),S[R*3+1]=B*Math.sin(F)*Math.sin(L),S[R*3+2]=B*Math.cos(F);const D=Math.random();D<.09?(x[R*3]=1,x[R*3+1]=.72,x[R*3+2]=.38):D<.18?(x[R*3]=.62,x[R*3+1]=.75,x[R*3+2]=1):D<.25?(x[R*3]=.82,x[R*3+1]=.48,x[R*3+2]=1):D<.3?(x[R*3]=1,x[R*3+1]=.9,x[R*3+2]=.6):(x[R*3]=.88,x[R*3+1]=.9,x[R*3+2]=.96)}w.setAttribute("position",new kn(S,3)),w.setAttribute("color",new kn(x,3));const P=new k_({size:1.4,vertexColors:!0,sizeAttenuation:!1});return new pE(w,P)}const s=r(3500,800),a=r(1200,400);e.add(s),e.add(a);const o=new Ur(Il,96,96),l=new Ai({map:PA(),specularMap:NA(),specular:new qe(2250120),shininess:55,emissiveMap:IA(),emissive:new qe(16752688),emissiveIntensity:.55}),u=new ct(o,l);u.position.copy(dn),u.rotation.y=-.4,e.add(u);const f=new ct(new Ur(Il*1.055,64,64),new Gn({uniforms:{glowColor:{value:new qe(3381759)},intensity:{value:1.65},power:{value:3.8}},vertexShader:Jm,fragmentShader:eg,transparent:!0,blending:iu,side:_i,depthWrite:!1}));u.add(f);const h=new Ur(Il*1.01,64,64);function c(){const w=document.createElement("canvas");w.width=1024,w.height=512;const S=w.getContext("2d");S.fillStyle="rgba(0,0,0,0)",S.clearRect(0,0,1024,512),S.fillStyle="rgba(255,255,255,0.22)";for(let x=0;x<300;x++){const P=(Math.sin(x*3.1+1)*.5+.5)*1024,R=(Math.cos(x*4.7+2)*.5+.5)*512;S.beginPath(),S.ellipse(P,R,1024*.042,512*.02,x*.9,0,Math.PI*2),S.fill()}return new ho(w)}const p=new Ai({map:c(),transparent:!0,opacity:.6,depthWrite:!1,blending:Wr}),m=new ct(h,p);m.name="clouds",u.add(m);const _=new Ur(Zm,96,96),g=new Ai({map:LA(),specular:new qe(1118481),shininess:8}),d=new ct(_,g);d.position.copy(ui),d.rotation.y=.5,e.add(d);const v=new ct(new Ur(Zm*1.045,64,64),new Gn({uniforms:{glowColor:{value:new qe(13391138)},intensity:{value:1.2},power:{value:4.5}},vertexShader:Jm,fragmentShader:eg,transparent:!0,blending:iu,side:_i,depthWrite:!1}));d.add(v);function y(){const T=new wa,b=new Ai({color:14477554,specular:10075084,shininess:110}),w=new Ai({color:13145386,specular:14531396,shininess:75}),S=new Ai({color:3688536,specular:6715272,shininess:65}),x=new Ai({color:8030874,specular:11189196,shininess:190}),P=new Ai({color:1320538,specular:3364266,shininess:210,side:fi}),R=new Ai({color:6977536,specular:10074880,shininess:90}),L=new ct(new Oa(.078,.22,14),b);L.rotation.z=Math.PI/2,L.position.x=.58,T.add(L);const F=new ct(new $n(.078,.078,.22,14),b);F.rotation.z=Math.PI/2,F.position.x=.36,T.add(F);const B=new ct(new $n(.072,.072,.09,14),S);B.rotation.z=Math.PI/2,B.position.x=.21,T.add(B);const D=new ct(new $n(.13,.13,.44,16),w);D.rotation.z=Math.PI/2,D.position.x=-.04,T.add(D);const z=new ct(new $n(.138,.138,.046,16),S);z.rotation.z=Math.PI/2,z.position.x=-.04,T.add(z);const H=new ct(new $n(.098,.118,.28,14),S);H.rotation.z=Math.PI/2,H.position.x=-.4,T.add(H),[-1,1].forEach(ce=>{const Ie=new ct(new Li(.38,.007,.18),P);Ie.position.set(-.04,0,ce*.28),T.add(Ie);const ke=new ct(new Li(.4,.012,.2),R);ke.position.set(-.04,0,ce*.28),T.add(ke);const Le=new ct(new Li(.34,.007,.17),P);Le.position.set(-.04,0,ce*.54),T.add(Le);const ee=new ct(new Li(.36,.012,.19),R);ee.position.set(-.04,0,ce*.54),T.add(ee);const pe=new ct(new $n(.006,.006,.18,6),S);pe.position.set(-.04,0,ce*.41),pe.rotation.x=Math.PI/2,T.add(pe);const fe=new ct(new $n(.008,.008,Math.abs(ce*.14),6),S);fe.position.set(-.04,0,ce*.14),fe.rotation.x=Math.PI/2,T.add(fe)}),[-.055,.055].forEach(ce=>{const Ie=new ct(new $n(.068,.046,.14,14),x);Ie.rotation.z=Math.PI/2,Ie.position.set(-.58,ce,0),T.add(Ie)});const U=new uu({color:16744480,transparent:!0,opacity:.88}),j=new uu({color:16777215,transparent:!0,opacity:.72});[-.055,.055].forEach(ce=>{const Ie=new ct(new Oa(.054,.48,8),U);Ie.position.set(-.84,ce,0),Ie.rotation.z=Math.PI/2,Ie.name="plume",T.add(Ie);const ke=new ct(new Oa(.023,.23,8),j);ke.position.set(-.75,ce,0),ke.rotation.z=Math.PI/2,ke.name="plume",T.add(ke)});const J=new Mm(16736272,7,5);J.position.set(-.84,-.055,0),T.add(J);const se=new Mm(16736272,7,5);return se.position.set(-.84,.055,0),T.add(se),T}const M=y();return M.name="spacecraft",e.add(M),{scene:e,earth:u,mars:d,spacecraft:M,stars1:s,stars2:a}}function Aa(e){const t=dn.x,n=dn.y,i=ui.x,r=ui.y,s=(t+i)*.5,a=Math.min(n,r)+6,[o,l]=RA(e,t,n,s,a,i,r),u=dn.z,f=ui.z,h=Nr(u,f,e)+Math.sin(e*Math.PI)*1.5;return new V(o,l,h)}function UA(e){const t=[];for(let s=0;s<=80;s++)t.push(Aa(s/80));const n=new cn().setFromPoints(t),i=new TE({color:52479,linewidth:1,dashSize:.4,gapSize:.25,transparent:!0,opacity:.55}),r=new hE(n,i);return r.computeLineDistances(),e.add(r),r}function tg(e,t,n){e.fillStyle="rgba(255,255,255,0.040)";for(let i=0;i<1400;i++)e.fillRect(Math.random()*t|0,Math.random()*n|0,1,1);e.fillStyle="rgba(0,0,0,0.025)";for(let i=0;i<700;i++)e.fillRect(Math.random()*t|0,Math.random()*n|0,1,1)}function _a(e,t,n,i,r,s,a,o){const l=-Math.PI*.78,u=Math.PI*1.56;e.beginPath(),e.arc(t,n,i,l,l+u),e.strokeStyle="rgba(255,255,255,0.07)",e.lineWidth=i*.2,e.lineCap="butt",e.stroke(),r>.005&&(e.beginPath(),e.arc(t,n,i,l,l+r*u),e.strokeStyle=o,e.lineWidth=i*.2,e.lineCap="round",e.shadowBlur=8,e.shadowColor=o,e.stroke(),e.shadowBlur=0),e.fillStyle="rgba(210,235,255,0.92)",e.font=`bold ${Math.round(i*.38)}px monospace`,e.textAlign="center",e.textBaseline="middle",e.fillText(a,t,n),e.fillStyle="rgba(100,150,190,0.60)",e.font=`${Math.round(i*.28)}px monospace`,e.textBaseline="alphabetic",e.fillText(s,t,n+i*1.22)}function FA(e,t,n,i,r){const s=n*.175,a=n-s,o=Math.min(s*.3,t*.03),l=a+s*.44,u=[t*.345,t*.425,t*.505,t*.585,t*.665],f=ar(i/37300,0,1),h=ar(.84-r*.09,0,1),c=ar(.76-r*.05,0,1);_a(e,u[0],l,o,f,"VEL",`${(i/1e3).toFixed(1)}k`,"#00e8a4"),_a(e,u[1],l,o*.88,h,"FUEL",`${Math.round(h*100)}%`,"#00d4ff"),_a(e,u[2],l,o*1.12,c,"THR",`${Math.round(c*100)}%`,"#f59e0b"),_a(e,u[3],l,o*.88,.94,"O2","94%","#22c55e"),_a(e,u[4],l,o*.88,.55+r*.1,"TMP",`${21+Math.round(r*4)}°C`,"#a78bfa");const p="rgba(0,180,255,0.14)",m="rgba(0,200,255,0.70)",_=t*.054,g=s*.23;[["NAV",t*.226],["HUD",t*.226],["SYS",t*.226]].forEach(([d,v],y)=>{const M=a+s*(.14+y*.29);e.fillStyle=p,e.fillRect(v,M,_,g),e.strokeStyle="rgba(0,180,255,0.32)",e.lineWidth=.8,e.strokeRect(v,M,_,g),e.fillStyle=m,e.font=`${Math.round(_*.22)}px monospace`,e.textAlign="center",e.textBaseline="middle",e.fillText(d,v+_/2,M+g/2)}),[["COM",t-t*.226-_],["AUX",t-t*.226-_],["PWR",t-t*.226-_]].forEach(([d,v],y)=>{const M=a+s*(.14+y*.29);e.fillStyle=p,e.fillRect(v,M,_,g),e.strokeStyle="rgba(0,180,255,0.32)",e.lineWidth=.8,e.strokeRect(v,M,_,g),e.fillStyle=m,e.font=`${Math.round(_*.22)}px monospace`,e.textAlign="center",e.textBaseline="middle",e.fillText(d,v+_/2,M+g/2)})}function OA(e,t,n,i){const r=[{cx:.1,cy:.2,r:.35,ic:"rgba(95,15,210,0.20)",oc:"rgba(55,5,135,0)",ph:0},{cx:.88,cy:.54,r:.32,ic:"rgba(218,68,18,0.18)",oc:"rgba(148,30,6,0)",ph:1.9},{cx:.48,cy:.06,r:.3,ic:"rgba(72,10,192,0.16)",oc:"rgba(40,2,122,0)",ph:3.3},{cx:.93,cy:.27,r:.26,ic:"rgba(225,85,22,0.15)",oc:"rgba(160,42,8,0)",ph:4.8},{cx:.05,cy:.8,r:.28,ic:"rgba(140,28,232,0.17)",oc:"rgba(80,8,165,0)",ph:2.2},{cx:.66,cy:.92,r:.24,ic:"rgba(200,95,30,0.14)",oc:"rgba(130,50,12,0)",ph:5.5},{cx:.28,cy:.94,r:.22,ic:"rgba(118,20,218,0.15)",oc:"rgba(68,6,150,0)",ph:1.3},{cx:.8,cy:.03,r:.28,ic:"rgba(192,78,28,0.15)",oc:"rgba(120,38,10,0)",ph:3.9},{cx:.5,cy:.5,r:.18,ic:"rgba(80,18,180,0.08)",oc:"rgba(40,5,110,0)",ph:6.1}];e.save(),e.globalCompositeOperation="screen",r.forEach(({cx:s,cy:a,r:o,ic:l,oc:u,ph:f})=>{const h=.88+.12*Math.sin(i*.22+f),c=s*t,p=a*n,m=o*t*h,_=e.createRadialGradient(c,p,m*.04,c,p,m);_.addColorStop(0,l),_.addColorStop(1,u),e.fillStyle=_,e.fillRect(0,0,t,n)}),e.restore()}function kA(e,t,n,i,r){if(i<.01)return;e.save(),e.globalAlpha=i;const s="rgba(5,9,20,0.97)",a=t*.22,o=t-t*.22,l=n*.068,u=n-n*.175,f=16;e.beginPath(),e.rect(0,0,t,n),e.moveTo(a+f,l),e.lineTo(o-f,l),e.quadraticCurveTo(o,l,o,l+f),e.lineTo(o,u-f),e.quadraticCurveTo(o,u,o-f,u),e.lineTo(a+f,u),e.quadraticCurveTo(a,u,a,u-f),e.lineTo(a,l+f),e.quadraticCurveTo(a,l,a+f,l),e.closePath(),e.fillStyle=s,e.fill("evenodd"),e.strokeStyle="rgba(0,190,255,0.40)",e.lineWidth=1.6,e.shadowBlur=14,e.shadowColor="rgba(0,190,255,0.40)",e.beginPath(),e.moveTo(a+f,l),e.lineTo(o-f,l),e.quadraticCurveTo(o,l,o,l+f),e.lineTo(o,u-f),e.quadraticCurveTo(o,u,o-f,u),e.lineTo(a+f,u),e.quadraticCurveTo(a,u,a,u-f),e.lineTo(a,l+f),e.quadraticCurveTo(a,l,a+f,l),e.closePath(),e.stroke(),e.shadowBlur=0;const h=a*.08,c=n*.12,p=a*.84,m=n*.54,_=10;e.strokeStyle="rgba(0,160,255,0.35)",e.lineWidth=1,e.shadowBlur=6,e.shadowColor="rgba(0,160,255,0.28)",e.beginPath(),e.moveTo(h+_,c),e.lineTo(h+p-_,c),e.quadraticCurveTo(h+p,c,h+p,c+_),e.lineTo(h+p,c+m-_),e.quadraticCurveTo(h+p,c+m,h+p-_,c+m),e.lineTo(h+_,c+m),e.quadraticCurveTo(h,c+m,h,c+m-_),e.lineTo(h,c+_),e.quadraticCurveTo(h,c,h+_,c),e.closePath(),e.stroke(),e.shadowBlur=0,e.fillStyle="rgba(0,190,255,0.42)",e.font="8px 'Courier New',monospace",e.textAlign="left",e.textBaseline="alphabetic",e.fillText("EARTH",h+7,c+m-8),[{x:h+p*.2,c:"#22c55e",l:"PWR"},{x:h+p*.5,c:"#22c55e",l:"NAV"},{x:h+p*.8,c:"#f59e0b",l:"THR"}].forEach(({x:g,c:d,l:v})=>{const y=c-18;e.fillStyle=d,e.shadowBlur=6,e.shadowColor=d,e.beginPath(),e.arc(g,y,3.5,0,Math.PI*2),e.fill(),e.shadowBlur=0,e.fillStyle="rgba(180,210,240,0.55)",e.font="7px monospace",e.textAlign="center",e.fillText(v,g,y+11)}),e.restore()}function BA({onPlayAgain:e}){const t=W.useRef(null),n=W.useRef(null),i=W.useRef(null),r=W.useRef(null),s=W.useRef(null),a=W.useRef(null),o=W.useRef(null),l=W.useRef(!1),u=W.useRef({W:1,H:1}),f=W.useRef(0),h=W.useRef(0),c=W.useRef(!1),p=W.useRef("emerge"),m=W.useRef(Od),_=W.useRef(1),g=W.useRef(1),d=W.useRef(0),v=W.useRef(null),y=W.useRef(0),M=W.useRef(0),T=W.useRef(1),b=W.useRef(new Set),w=W.useRef(null),S=W.useRef(0),x=W.useRef(!1),P=W.useRef(new V(0,0,10)),R=W.useRef(new V(0,0,0)),[L,F]=W.useState("emerge"),[B,D]=W.useState(Od),[z,H]=W.useState(1),[U,j]=W.useState(1),[J,se]=W.useState(!1),[ce,Ie]=W.useState(!1),[ke,Le]=W.useState(0),[ee,pe]=W.useState(ol),[fe,Pe]=W.useState(32500),[ze,Fe]=W.useState(null);W.useEffect(()=>{p.current=L,h.current=0,c.current=!1,x.current=!1},[L]),W.useEffect(()=>{m.current=B},[B]),W.useEffect(()=>{_.current=z},[z]),W.useEffect(()=>{g.current=U},[U]),W.useEffect(()=>NM(),[]),W.useEffect(()=>{const me=t.current;if(!me)return;const{W:ot,H:Je}=(()=>{var ne;const X=((ne=me.parentElement)==null?void 0:ne.getBoundingClientRect())||{width:800,height:600};return{W:X.width|0,H:X.height|0}})();u.current={W:ot,H:Je};const He=new bA({canvas:me,antialias:!0,alpha:!1});He.setPixelRatio(Math.min(window.devicePixelRatio,2)),He.setSize(ot,Je),He.toneMapping=Vh,He.toneMappingExposure=1.1,He.shadowMap.enabled=!1,i.current=He;const O=new Tn(52,ot/Je,.05,5e3);O.position.set(-6,2,8),O.lookAt(dn),s.current=O,P.current.copy(O.position),R.current.copy(dn);const{scene:Be,earth:q,mars:_e,spacecraft:K,stars1:le,stars2:A}=DA();r.current=Be,a.current={earth:q,mars:_e,spacecraft:K,stars1:le,stars2:A};const E=UA(Be);o.current=E,E.visible=!1,l.current=!0;function N(){const X=me.parentElement;if(!X)return;const ne=X.clientWidth|0,de=X.clientHeight|0;u.current={W:ne,H:de},He.setSize(ne,de),O.aspect=ne/de,O.updateProjectionMatrix(),n.current&&(n.current.width=ne,n.current.height=de)}return window.addEventListener("resize",N),N(),()=>{window.removeEventListener("resize",N),He.dispose()}},[]);const nt=W.useCallback(me=>{D(me),m.current=me,se(!1)},[]),We=W.useCallback(()=>{v.current=f.current,Ie(!1),se(!0),F("transit"),o.current&&(o.current.visible=!0)},[]),Qe=W.useCallback(me=>{if(!l.current||!i.current||!r.current||!s.current)return;const ot=i.current,Je=r.current,He=s.current,{W:O,H:Be}=u.current,q=p.current,_e=_.current,K=q==="transit"?me*_e:me;f.current+=me,h.current+=K;const le=f.current,A=h.current,{earth:E,mars:N,spacecraft:X,stars1:ne,stars2:de}=a.current;E.rotation.y+=me*.018,N.rotation.y+=me*.012;const ve=E.getObjectByName("clouds");ve&&(ve.rotation.y+=me*.022),X.traverse(re=>{re.name==="plume"&&(re.material.opacity=.7+.18*Math.sin(le*14),re.scale.set(1,.85+.15*Math.sin(le*18),1))}),m.current===Fd&&(M.current+=me,M.current>20&&(M.current=0,T.current=T.current%(jc.length-1)+1));const Q=m.current===Fd?jc[T.current]:m.current,te=Math.min(me*3.5,1);if(q==="emerge"){const re=ar(A/Ym,0,1);X.visible=!1,o.current.visible=!1,N.visible=!1;const ae=new V(-4+re*2,1.5-re*1.5,5+re*1),oe=dn.clone().add(new V(0,.5,0));P.current.lerp(ae,te),R.current.lerp(oe,te),A>=Ym&&!c.current&&(c.current=!0,N.visible=!0,F("orbit"))}else if(q==="orbit"){N.visible=!0,X.visible=!0,o.current.visible=!1;const re=-.18+le*.25,ae=Il*1.8,oe=dn.x+Math.cos(re)*ae,Te=dn.z+Math.sin(re)*ae;X.position.set(oe,dn.y,Te),X.lookAt(dn),X.rotateY(Math.PI/2);const Ge=new V(-6,2.5,9),k=new V(dn.x,0,0);P.current.lerp(Ge,te),R.current.lerp(k,te),A>=2.5&&!x.current&&(x.current=!0,Ie(!0))}else if(q==="transit"){const re=ar(A/Km,0,1);d.current=re,X.visible=!0,o.current.visible=!0;const ae=Aa(re);if(X.position.copy(ae),re<.998){const oe=Aa(Math.min(1,re+.02));X.lookAt(oe),X.rotateY(-Math.PI/2)}if(Q===kd){X.visible=!1;const oe=Aa(Math.min(1,re+.1));P.current.lerp(ae,Math.min(me*10,1)),R.current.lerp(oe,te*1.4),He.fov=40,He.updateProjectionMatrix()}else if(Q===Q_){const oe=Aa(Math.max(0,re-.04)),Te=new V(oe.x,oe.y+1.5,oe.z+4.5);P.current.lerp(Te,te),R.current.lerp(ae,te),He.fov=56,He.updateProjectionMatrix()}else if(Q===J_){const oe=new V(ae.x+Math.cos(le*.22)*8,ae.y+Math.sin(le*.14)*3,ae.z+Math.sin(le*.22)*8);P.current.lerp(oe,te*.6),R.current.lerp(ae,te),He.fov=65,He.updateProjectionMatrix()}else if(Q===eS){const oe=dn.clone().lerp(ui,re),Te=new V(oe.x,28,12);P.current.lerp(Te,te*.5),R.current.lerp(oe,te*.5),He.fov=55,He.updateProjectionMatrix()}else{const oe=dn.x,Te=ui.x,Ge=Nr(oe+1,Te-3,re),k=Nr(3,2,re),ge=Nr(9,8,re),ie=new V(Ge,k,ge),we=new V(Nr(oe,Te,re),0,0);P.current.lerp(ie,te*.4),R.current.lerp(we,te*.4),He.fov=52,He.updateProjectionMatrix()}xA.forEach(oe=>{re>=oe.prog&&!b.current.has(oe.id)&&(b.current.add(oe.id),w.current=oe,S.current=oe.duration,Fe(oe))}),w.current&&S.current>0&&(S.current-=me,S.current<=0&&(w.current=null,Fe(null))),le-y.current>.18&&(y.current=le,Le(v.current!==null?le-v.current:0),pe(ol*(1-re)),Pe(Math.round(32500+re*4800))),A>=Km&&!c.current&&(c.current=!0,F("approach"))}else if(q==="approach"){const re=ar(A/qm,0,1);X.visible=!1,o.current.visible=!1;const ae=new V(ui.x-2+re*2,2-re*1.5,7-re*3),oe=ui.clone();P.current.lerp(ae,te*.5),R.current.lerp(oe,te*.5),He.fov=Nr(52,38,re),He.updateProjectionMatrix(),le-y.current>.22&&(y.current=le,Le(v.current!==null?le-v.current:0),pe(Math.max(0,ol*(1-ar(1+re*.01,0,1)))),Pe(Math.round(Nr(37300,3200,re)))),A>=qm&&!c.current&&(c.current=!0,setTimeout(()=>F("arrival"),400))}else if(q==="arrival"){X.visible=!1,o.current.visible=!1;const re=new V(ui.x,.5,5);P.current.lerp(re,te*.3),R.current.lerp(ui,te*.3)}He.position.copy(P.current),He.lookAt(R.current),ne.rotation.y+=me*.001,de.rotation.y-=me*6e-4,ot.render(Je,He);const Se=n.current;if(!Se)return;const Me=Se.getContext("2d");if(Me.clearRect(0,0,O,Be),q==="transit"||q==="approach"){if(Q===kd){OA(Me,O,Be,le);const re=ar(d.current*4,0,1);re>.05&&(kA(Me,O,Be,re),FA(Me,O,Be,Math.round(32500+d.current*4800),d.current))}tg(Me,O,Be)}else(q==="emerge"||q==="orbit")&&tg(Me,O,Be)},[]);Lh(Qe);const ut=L==="transit"||L==="approach";return I.jsxs("div",{className:"mars-scene",children:[I.jsx("canvas",{ref:t,className:"mars-canvas"}),I.jsx("canvas",{ref:n,style:{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:1}}),ut&&I.jsxs("div",{className:"mars-telemetry",style:{opacity:U},children:[I.jsx("div",{className:"mtel-label",children:"MISSION TELEMETRY"}),I.jsxs("div",{className:"mtel-row",children:[I.jsx("span",{children:"MISSION TIME"}),I.jsx("span",{children:Qm(ke)})]}),I.jsxs("div",{className:"mtel-row",children:[I.jsx("span",{children:"DIST TO MARS"}),I.jsx("span",{children:CA(ee)})]}),I.jsxs("div",{className:"mtel-row",children:[I.jsx("span",{children:"VELOCITY"}),I.jsxs("span",{children:[fe.toLocaleString()," m/s"]})]}),I.jsxs("div",{className:"mtel-row",children:[I.jsx("span",{children:"LIFE SUPPORT"}),I.jsx("span",{className:"mtel-ok",children:"NOMINAL"})]}),I.jsxs("div",{className:"mtel-row",children:[I.jsx("span",{children:"PROPULSION"}),I.jsx("span",{className:"mtel-ok",children:"NOMINAL"})]}),I.jsxs("div",{className:"mtel-row",children:[I.jsx("span",{children:"COMMS DELAY"}),I.jsx("span",{children:L==="transit"?`${(4+Math.abs(Math.sin((ee/ol-.5)*Math.PI))*8.5).toFixed(1)} min`:"0.3 min"})]})]}),ut&&I.jsx("div",{className:"mars-mc-bar",style:{opacity:U},children:["PWR","FUEL","NAV","COMMS","DIAG","ENG"].map(me=>I.jsx("span",{className:"mc-item mc-ok",children:me},me))}),J&&L==="transit"&&I.jsxs("div",{className:"mars-director",children:[I.jsx("div",{className:"mdir-title",children:"DIRECTOR MODE"}),I.jsx("div",{className:"mdir-section",children:"CAMERA"}),I.jsx("div",{className:"mdir-row",children:jc.map(me=>I.jsx("button",{className:`mdir-btn${B===me?" mdir-btn--on":""}`,onClick:()=>nt(me),children:me==="AUTO"?"⟳ AUTO":me==="WIDE"?"⊞ WIDE":me==="CHASE"?"⊿ CHASE":me==="POV"?"⊙ POV":me==="FLYBY"?"⤢ FLYBY":"◎ ORBITAL"},me))}),I.jsx("div",{className:"mdir-section",children:"TIME SCALE"}),I.jsx("div",{className:"mdir-row",children:wA.map(me=>I.jsxs("button",{className:`mdir-btn${z===me?" mdir-btn--on":""}`,onClick:()=>H(me),children:[me,"×"]},me))}),I.jsx("div",{className:"mdir-section",children:"HUD OPACITY"}),I.jsx("div",{className:"mdir-row",children:[0,.5,.75,1].map(me=>I.jsx("button",{className:`mdir-btn${U===me?" mdir-btn--on":""}`,onClick:()=>j(me),children:me===0?"OFF":Math.round(me*100)+"%"},me))})]}),L==="transit"&&I.jsx("button",{className:"mdir-toggle",onClick:()=>se(me=>!me),children:J?"✕":"⊞ DIRECTOR"}),ze&&I.jsxs("div",{className:"mars-event",style:{borderColor:ze.color},children:[I.jsx("div",{className:"mevent-label",style:{color:ze.color},children:ze.label}),I.jsx("div",{className:"mevent-sub",children:ze.sub})]}),ce&&I.jsx("div",{className:"mars-mode-overlay",children:I.jsxs("div",{className:"mmo-card",children:[I.jsx("div",{className:"mmo-pre",children:"LOW EARTH ORBIT · STAND BY"}),I.jsx("div",{className:"mmo-title",children:"BEGIN EARTH–MARS TRANSIT"}),I.jsxs("div",{className:"mmo-sub",children:["All systems nominal. Vehicle ready for trans-Mars injection burn.",I.jsx("br",{}),"Use Director Mode during transit to switch cameras and time scale."]}),I.jsx("div",{className:"mmo-options",children:I.jsxs("button",{className:"mmo-btn mmo-btn-featured",onClick:We,children:[I.jsx("span",{className:"mmo-btn-title",children:"INITIATE TRANSIT"}),I.jsx("span",{className:"mmo-btn-desc",children:"Cinematic · Director Mode · Switch cameras live"})]})})]})}),L==="arrival"&&I.jsxs("div",{className:"mars-arrival",children:[I.jsx("div",{className:"arr-pre",children:"MARS ORBIT INSERTION · CONFIRMED"}),I.jsx("div",{className:"arr-title",children:"SIMULATION CONCLUDED"}),I.jsxs("div",{className:"arr-data",children:[I.jsxs("div",{className:"arr-row",children:[I.jsx("span",{children:"MISSION TIME"}),I.jsx("span",{children:Qm(ke)})]}),I.jsxs("div",{className:"arr-row",children:[I.jsx("span",{children:"PHASES COMPLETE"}),I.jsx("span",{children:"3 / 3"})]}),I.jsxs("div",{className:"arr-row",children:[I.jsx("span",{children:"ROCKET BUILDER"}),I.jsx("span",{className:"arr-ok",children:"CONFIRMED"})]}),I.jsxs("div",{className:"arr-row",children:[I.jsx("span",{children:"DEBUG ARENA"}),I.jsx("span",{className:"arr-ok",children:"CONFIRMED"})]}),I.jsxs("div",{className:"arr-row",children:[I.jsx("span",{children:"VISUAL LAB"}),I.jsx("span",{className:"arr-ok",children:"CONFIRMED"})]})]}),I.jsx("p",{className:"arr-sub",children:"All six systems repaired. All faults resolved. Mars orbital insertion nominal."}),e&&I.jsx("button",{className:"arr-play-again-btn",onClick:e,children:"PLAY AGAIN"})]})]})}const ng=5.2,Xc=.55,ll=3.1,$c=4.4,zA={power_restoration:{system:"POWER SYSTEMS",subtitle:"Primary fault resolved",action:"Repairing power conduits...",fault:["FAULT DETECTED","Fuel system pressure critical"],interior:"power",isLast:!1,accent:"#f59e0b",accent2:"#ef4444",bg1:"#04080f",bg2:"#08101e"},fuel_calculation:{system:"FUEL SYSTEMS",subtitle:"Pressure fault resolved",action:"Recalibrating fuel lines...",fault:["FAULT DETECTED","Navigation matrix corrupted"],interior:"fuel",isLast:!1,accent:"#f97316",accent2:"#dc2626",bg1:"#100400",bg2:"#180900"},nav_calibration:{system:"NAVIGATION",subtitle:"Gyroscopic fault resolved",action:"Recalibrating guidance sensors...",fault:["FAULT DETECTED","Communications array offline"],interior:"nav",isLast:!1,accent:"#06b6d4",accent2:"#0ea5e9",bg1:"#020c12",bg2:"#04141e"},comms_signal:{system:"COMMUNICATIONS",subtitle:"Signal fault resolved",action:"Restoring relay nodes...",fault:["FAULT DETECTED","Diagnostic systems unresponsive"],interior:"comms",isLast:!1,accent:"#22c55e",accent2:"#16a34a",bg1:"#020e06",bg2:"#04160a"},diagnostics_scan:{system:"DIAGNOSTICS",subtitle:"Diagnostic fault resolved",action:"Running full system scan...",fault:["FAULT DETECTED","Engine ignition sequence failure"],interior:"diagnostics",isLast:!1,accent:"#818cf8",accent2:"#6366f1",bg1:"#04040e",bg2:"#08081a"},engine_ignition:{system:"ENGINE CORE",subtitle:"All faults resolved",action:"Aligning ignition coils...",fault:["ALL SYSTEMS NOMINAL","Launch sequence ready"],interior:"engine",isLast:!0,accent:"#fb923c",accent2:"#22c55e",bg1:"#0e0300",bg2:"#180500"}};function it(e,t,n,i,r,s){s=Math.min(s,i/2,r/2),e.beginPath(),e.moveTo(t+s,n),e.lineTo(t+i-s,n),e.arcTo(t+i,n,t+i,n+s,s),e.lineTo(t+i,n+r-s),e.arcTo(t+i,n+r,t+i-s,n+r,s),e.lineTo(t+s,n+r),e.arcTo(t,n+r,t,n+r-s,s),e.lineTo(t,n+s),e.arcTo(t,n,t+s,n,s),e.closePath()}function GA(e,t,n,i,r){const s=r?i:0;e.save(),e.globalAlpha=.25,e.fillStyle="#000",e.beginPath(),e.ellipse(t,n+4,30,9,0,0,Math.PI*2),e.fill(),e.restore();const a=e.createLinearGradient(t-26,n-10,t-26,n+6);a.addColorStop(0,"#374151"),a.addColorStop(1,"#111827"),e.fillStyle=a,it(e,t-26,n-10,52,14,5),e.fill(),e.strokeStyle="#4b5563",e.lineWidth=1,it(e,t-26,n-10,52,14,5),e.stroke();for(let F=0;F<7;F++){const B=(F*7.4+i*18)%52-26;e.fillStyle="#1f2937",it(e,t+B-2,n-7,4,8,2),e.fill()}const o=e.createLinearGradient(t-20,n-55,t+20,n-10);o.addColorStop(0,"#4b5563"),o.addColorStop(.5,"#374151"),o.addColorStop(1,"#1f2937"),e.fillStyle=o,it(e,t-20,n-58,40,48,6),e.fill(),e.strokeStyle="#6b7280",e.lineWidth=1,it(e,t-20,n-58,40,48,6),e.stroke(),it(e,t-13,n-50,26,22,3),e.fillStyle="#111827",e.fill(),e.strokeStyle="#374151",e.lineWidth=.8,e.stroke();const l=["#22c55e","#f59e0b","#3b82f6"];for(let F=0;F<3;F++){const B=Math.sin(i*(2.5+F*.8)+F*2)>.2;e.fillStyle=B?l[F]:"#1f2937",B&&(e.shadowBlur=6,e.shadowColor=l[F]),e.beginPath(),e.arc(t-8+F*8,n-38,3.5,0,Math.PI*2),e.fill(),e.shadowBlur=0}for(let F=0;F<3;F++)e.strokeStyle="#374151",e.lineWidth=1.2,e.beginPath(),e.moveTo(t-12,n-22+F*5),e.lineTo(t+12,n-22+F*5),e.stroke();e.fillStyle="#374151",it(e,t-6,n-62,12,6,2),e.fill();const u=e.createLinearGradient(t-16,n-80,t+16,n-62);u.addColorStop(0,"#6b7280"),u.addColorStop(1,"#374151"),e.fillStyle=u,it(e,t-16,n-82,32,22,7),e.fill(),e.strokeStyle="#9ca3af",e.lineWidth=1,it(e,t-16,n-82,32,22,7),e.stroke(),it(e,t-11,n-76,22,8,4),e.fillStyle="#0f172a",e.fill();const f=.5+.5*Math.sin(i*3.2),h=e.createLinearGradient(t-10,n-72,t+10,n-72);h.addColorStop(0,`rgba(6,182,212,${f*.4})`),h.addColorStop(.5,`rgba(6,182,212,${f})`),h.addColorStop(1,`rgba(6,182,212,${f*.4})`),it(e,t-10,n-75,20,6,3),e.fillStyle=h,e.fill(),e.shadowBlur=8*f,e.shadowColor="#06b6d4",e.fill(),e.shadowBlur=0,e.strokeStyle="#6b7280",e.lineWidth=2,e.beginPath(),e.moveTo(t+8,n-82),e.lineTo(t+10,n-94),e.stroke(),e.fillStyle=Math.sin(i*4)>0?"#ef4444":"#7f1d1d",e.beginPath(),e.arc(t+10,n-95,3,0,Math.PI*2),e.fill();const c=t-20,p=n-48,m=Math.sin(s*2.8)*.22,_=-Math.PI*.55+m,g=c+Math.cos(_)*30,d=p+Math.sin(_)*30,v=Math.sin(s*3.5+.8)*.18,y=_-.5+v,M=g+Math.cos(y)*24,T=d+Math.sin(y)*24;if(e.fillStyle="#4b5563",e.beginPath(),e.arc(c,p,6,0,Math.PI*2),e.fill(),e.strokeStyle="#4b5563",e.lineWidth=8,e.lineCap="round",e.beginPath(),e.moveTo(c,p),e.lineTo(g,d),e.stroke(),e.fillStyle="#6b7280",e.beginPath(),e.arc(g,d,5,0,Math.PI*2),e.fill(),e.strokeStyle="#6b7280",e.lineWidth=6,e.beginPath(),e.moveTo(g,d),e.lineTo(M,T),e.stroke(),e.fillStyle="#9ca3af",e.beginPath(),e.arc(M,T,5,0,Math.PI*2),e.fill(),e.strokeStyle="#d1d5db",e.lineWidth=1.5,e.beginPath(),e.arc(M,T,5,0,Math.PI*2),e.stroke(),r&&Math.sin(s*6)>.5){e.shadowBlur=12,e.shadowColor="#fbbf24",e.fillStyle="#fbbf24",e.beginPath(),e.arc(M,T,3,0,Math.PI*2),e.fill(),e.shadowBlur=0;for(let F=0;F<4;F++){const B=(s*7+F*1.57)%(Math.PI*2),D=6+Math.sin(s*11+F)*4,z=M+Math.cos(B)*D,H=T+Math.sin(B)*D;e.fillStyle=F%2===0?"#fbbf24":"#f97316",e.globalAlpha=.8,e.beginPath(),e.arc(z,H,1.5,0,Math.PI*2),e.fill(),e.globalAlpha=1}}const b=t+20,w=n-48,S=-Math.PI*.15+Math.sin(s*1.6)*.08,x=b+Math.cos(S)*28,P=w+Math.sin(S)*28;e.fillStyle="#4b5563",e.beginPath(),e.arc(b,w,6,0,Math.PI*2),e.fill(),e.strokeStyle="#4b5563",e.lineWidth=8,e.lineCap="round",e.beginPath(),e.moveTo(b,w),e.lineTo(x,P),e.stroke(),e.fillStyle="#6b7280",e.beginPath(),e.arc(x,P,5,0,Math.PI*2),e.fill(),e.strokeStyle="#6b7280",e.lineWidth=5;const R=x+Math.cos(S+.4)*16,L=P+Math.sin(S+.4)*16;e.beginPath(),e.moveTo(x,P),e.lineTo(R,L),e.stroke()}function VA(e,t,n,i,r){const s=n*.72;e.fillStyle="#0d1420",e.fillRect(0,s,t,n-s);for(let h=0;h<t;h+=48)e.strokeStyle="#1a2540",e.lineWidth=1,e.beginPath(),e.moveTo(h,s),e.lineTo(h,n),e.stroke();e.fillStyle="#07101c",e.fillRect(0,0,t,s);for(let h=40;h<s;h+=60)for(let c=20;c<t;c+=60)e.fillStyle="#0e1a2e",e.beginPath(),e.arc(c,h,4,0,Math.PI*2),e.fill();const a=n*.12;e.strokeStyle=r,e.lineWidth=10,e.shadowBlur=18,e.shadowColor=r,e.beginPath(),e.moveTo(0,a),e.lineTo(t,a),e.stroke(),e.shadowBlur=0,e.strokeStyle="#78350f",e.lineWidth=6,e.beginPath(),e.moveTo(0,a),e.lineTo(t,a),e.stroke(),[t*.15,t*.35,t*.55,t*.75].forEach(h=>{const c=s-10;e.strokeStyle="#1e3a5f",e.lineWidth=6,e.beginPath(),e.moveTo(h,a),e.lineTo(h,c),e.stroke(),e.fillStyle="#0d1b2e",it(e,h-18,c-40,36,40,4),e.fill(),e.strokeStyle="#1e3a5f",e.lineWidth=1.5,it(e,h-18,c-40,36,40,4),e.stroke();const p=Math.sin(i*2.8+h)>0;e.fillStyle=p?r:"#451a03",e.shadowBlur=p?8:0,e.shadowColor=r,e.beginPath(),e.arc(h,c-20,5,0,Math.PI*2),e.fill(),e.shadowBlur=0});for(let h=0;h<3;h++){const c=t*.28+h*t*.22,p=(i*2.3+h*1.2)%1;if(p<.25){const m=1-p/.25;e.fillStyle=`rgba(251,191,36,${m})`,e.shadowBlur=6,e.shadowColor="#fbbf24",e.beginPath(),e.arc(c+Math.sin(i*17)*4,a+p*22,2.5,0,Math.PI*2),e.fill(),e.shadowBlur=0}}for(let h=0;h<5;h++){const c=n*.2+h*n*.1;e.strokeStyle="#1e3a5f",e.lineWidth=3,e.beginPath(),e.moveTo(0,c),e.lineTo(t*.12,c),e.stroke(),e.beginPath(),e.moveTo(t,c),e.lineTo(t*.88,c),e.stroke(),e.fillStyle=h%2===0?"#f59e0b55":"#ef444455",e.fillRect(0,c-1,t*.12,2),e.fillRect(t*.88,c-1,t*.12,2)}const l=t*.42,u=s-55;e.strokeStyle="#334155",e.lineWidth=8,e.beginPath(),e.moveTo(l,a+30),e.lineTo(l,u),e.stroke(),e.fillStyle="#1e293b",it(e,l-22,u-10,44,44,5),e.fill(),e.strokeStyle="#475569",e.lineWidth=2,it(e,l-22,u-10,44,44,5),e.stroke(),Math.sin(i*9)>.3&&(e.strokeStyle=r,e.lineWidth=2,e.shadowBlur=8,e.shadowColor=r,e.beginPath(),e.moveTo(l-5,u+10),e.lineTo(l-5+Math.sin(i*23)*6,u+20+Math.cos(i*17)*4),e.stroke(),e.shadowBlur=0)}function HA(e,t,n,i,r){const s=n*.72;e.fillStyle="#0d0800",e.fillRect(0,s,t,n-s),e.fillStyle="#090400",e.fillRect(0,0,t,s),[t*.18,t*.72].forEach((p,m)=>{const _=n*.1,g=t*.14,d=n*.55,v=e.createLinearGradient(p,_,p+g,_);v.addColorStop(0,"#1c0900"),v.addColorStop(.3,"#2d1200"),v.addColorStop(.7,"#1c0900"),v.addColorStop(1,"#0e0500"),e.fillStyle=v,it(e,p,_,g,d,g*.5),e.fill(),e.strokeStyle="#7c2d12",e.lineWidth=2,it(e,p,_,g,d,g*.5),e.stroke(),e.beginPath(),e.ellipse(p+g/2,_+g*.35,g*.5,g*.35,0,Math.PI,0),e.fillStyle="#3d1505",e.fill();for(let b=1;b<=3;b++)e.strokeStyle="#7c2d12",e.lineWidth=2.5,e.beginPath(),e.ellipse(p+g/2,_+b*d*.25,g*.5,6,0,0,Math.PI*2),e.stroke();const y=p+g/2,M=_+d*.6;e.fillStyle="#1f2937",e.beginPath(),e.arc(y,M,10,0,Math.PI*2),e.fill(),e.strokeStyle="#374151",e.lineWidth=1.5,e.beginPath(),e.arc(y,M,10,0,Math.PI*2),e.stroke();const T=-Math.PI*.8+(Math.sin(i*1.5+m)*.1+.85)*Math.PI*1.6;e.strokeStyle=r,e.lineWidth=2,e.beginPath(),e.moveTo(y,M),e.lineTo(y+Math.cos(T)*7,M+Math.sin(T)*7),e.stroke()});const o=n*.38,l=n*.52;[o,l].forEach(p=>{e.strokeStyle="#7c2d12",e.lineWidth=10,e.beginPath(),e.moveTo(t*.18+t*.14,p),e.lineTo(t*.72,p),e.stroke(),e.strokeStyle="#9a3412",e.lineWidth=6,e.beginPath(),e.moveTo(t*.18+t*.14,p),e.lineTo(t*.72,p),e.stroke();for(let m=t*.35;m<t*.72;m+=t*.1)e.fillStyle="#7c2d12",e.fillRect(m-4,p-10,8,20),e.strokeStyle="#9a3412",e.lineWidth=1,e.strokeRect(m-4,p-10,8,20)});const u=t*.5,f=o-5;e.fillStyle="#450a0a",e.beginPath(),e.arc(u,f,16,0,Math.PI*2),e.fill(),e.strokeStyle=r,e.lineWidth=2,e.beginPath(),e.arc(u,f,16,0,Math.PI*2),e.stroke();const h=i*.5;e.strokeStyle="#d97706",e.lineWidth=5,e.beginPath(),e.moveTo(u-Math.cos(h)*18,f-Math.sin(h)*18),e.lineTo(u+Math.cos(h)*18,f+Math.sin(h)*18),e.stroke();const c=i*.8%1;e.fillStyle=`rgba(251,146,60,${.7-c*.6})`,e.beginPath(),e.ellipse(u+5,f+16+c*30,3,5+c*4,0,0,Math.PI*2),e.fill(),e.fillStyle="#1f0900",e.fillRect(0,s,t,n-s);for(let p=0;p<t;p+=40)e.strokeStyle="#2d0e00",e.lineWidth=1,e.beginPath(),e.moveTo(p,s),e.lineTo(p,n),e.stroke();e.fillStyle=`rgba(251,146,60,${.04+.02*Math.sin(i*3)})`,e.fillRect(0,s-20,t,20)}function WA(e,t,n,i,r){const s=n*.72;e.fillStyle="#030c12",e.fillRect(0,0,t,n);const a=e.createRadialGradient(t/2,0,0,t/2,0,t*.7);a.addColorStop(0,"#051620"),a.addColorStop(1,"#020a10"),e.fillStyle=a,e.fillRect(0,0,t,s),e.strokeStyle="#0e3a5f44",e.lineWidth=1;const o=[[.2,.15],[.45,.08],[.6,.2],[.35,.3],[.75,.12],[.15,.35]];for(let m=0;m<o.length;m++){const[_,g]=o[m],[d,v]=o[(m+2)%o.length];e.beginPath(),e.moveTo(_*t,g*n),e.lineTo(d*t,v*n),e.stroke()}o.forEach(([m,_])=>{e.fillStyle=r,e.shadowBlur=6,e.shadowColor=r,e.beginPath(),e.arc(m*t,_*n,2.5,0,Math.PI*2),e.fill(),e.shadowBlur=0});const l=t/2,u=n*.4;e.strokeStyle="#0e4a6a",e.lineWidth=4,e.beginPath(),e.arc(l,u,55,0,Math.PI*2),e.stroke(),e.strokeStyle=r+"66",e.lineWidth=2,e.beginPath(),e.arc(l,u,55,0,Math.PI*2),e.stroke(),e.save(),e.translate(l,u),e.rotate(i*.4),e.scale(1,.35),e.strokeStyle="#1a6080",e.lineWidth=3,e.beginPath(),e.arc(0,0,55,0,Math.PI*2),e.stroke(),e.restore(),e.save(),e.translate(l,u),e.rotate(i*-.6+1),e.scale(.35,1),e.strokeStyle=r,e.lineWidth=3,e.shadowBlur=8,e.shadowColor=r,e.beginPath(),e.arc(0,0,45,0,Math.PI*2),e.stroke(),e.shadowBlur=0,e.restore();const f=e.createRadialGradient(l-8,u-8,2,l,u,18);f.addColorStop(0,"#1e6a8c"),f.addColorStop(1,"#0a2030"),e.fillStyle=f,e.beginPath(),e.arc(l,u,18,0,Math.PI*2),e.fill();const h=t*.38,c=s-30;e.fillStyle="#0a1a25",it(e,h-30,c-45,60,50,6),e.fill(),e.strokeStyle=r+"88",e.lineWidth=1.5,it(e,h-30,c-45,60,50,6),e.stroke(),e.fillStyle=r+"cc",e.font="8px monospace",["LAT: 28.5°N","LON: -80.7°W","ALT: 402km",`HDG: ${(Math.sin(i*.3)*5+45).toFixed(1)}°`].forEach((m,_)=>{e.fillText(m,h-26,c-36+_*10)}),e.fillStyle="#06101a",e.fillRect(0,s,t,n-s);const p=e.createLinearGradient(0,s,0,n);p.addColorStop(0,"#0e305033"),p.addColorStop(1,"transparent"),e.fillStyle=p,e.fillRect(0,s,t,n*.15)}function jA(e,t,n,i,r){const s=n*.72;e.fillStyle="#030a04",e.fillRect(0,0,t,n),[t*.15,t*.5,t*.82].forEach((f,h)=>{const c=t*.16,p=n*.25,m=n*.15;e.fillStyle="#0a1a0c",it(e,f-c/2,m,c,p,4),e.fill(),e.strokeStyle="#14400a",e.lineWidth=2,it(e,f-c/2,m,c,p,4),e.stroke(),e.fillStyle="#00180022",it(e,f-c/2+3,m+3,c-6,p-6,3),e.fill(),e.strokeStyle=r,e.lineWidth=1.5,e.shadowBlur=4,e.shadowColor=r,e.beginPath();for(let _=0;_<c-10;_+=2){const g=p/2+Math.sin((_*.15+i*(2+h*.7))*Math.PI*2)*(p*.25*(.5+.5*Math.sin(i*.8+h)));_===0?e.moveTo(f-c/2+5+_,m+g):e.lineTo(f-c/2+5+_,m+g)}e.stroke(),e.shadowBlur=0,e.fillStyle=r+"99",e.font="7px monospace",e.fillText(["SIG-A","SIG-B","SIG-C"][h],f-12,m+p-5)});for(let f=t*.1;f<t*.9;f+=40)e.strokeStyle="#1a3a1e",e.lineWidth=4,e.beginPath(),e.moveTo(f,0),e.lineTo(f+Math.sin(i*.3+f*.01)*4,n*.45),e.stroke();for(let f=0;f<4;f++){const h=t*.04,c=n*.15+f*n*.12;e.fillStyle="#0d1f0f",it(e,h,c,42,34,4),e.fill(),e.strokeStyle="#1a401e",e.lineWidth=1,it(e,h,c,42,34,4),e.stroke();const p=Math.sin(i*3.5+f*1.1)>0;e.fillStyle=p?r:"#14400a",e.shadowBlur=p?8:0,e.shadowColor=r,e.beginPath(),e.arc(h+21,c+17,5,0,Math.PI*2),e.fill(),e.shadowBlur=0;const m=(i*80+f*30)%(t*.86);e.strokeStyle=r+"55",e.lineWidth=1,e.beginPath(),e.moveTo(h+42,c+17),e.lineTo(Math.min(h+42+m,t*.9),c+17),e.stroke()}const o=t*.42,l=s-50;e.fillStyle="#0d2010",it(e,o-24,l-20,48,45,5),e.fill(),e.strokeStyle="#22c55e55",e.lineWidth=1.5,it(e,o-24,l-20,48,45,5),e.stroke();const u=Math.sin(i*4)*6;e.strokeStyle="#374151",e.lineWidth=4,e.lineCap="round",e.beginPath(),e.moveTo(o-8,l-25),e.quadraticCurveTo(o-8+u,l,o-8+u*.5,l+15),e.stroke(),e.fillStyle=Math.sin(i*6)>0?r:"#14400a",e.shadowBlur=6,e.shadowColor=r,e.beginPath(),e.arc(o-8+u*.5,l+16,5,0,Math.PI*2),e.fill(),e.shadowBlur=0,e.fillStyle="#030a04",e.fillRect(0,s,t,n-s)}function XA(e,t,n,i,r){const s=n*.72;e.fillStyle="#040410",e.fillRect(0,0,t,n),e.fillStyle="#070718",e.fillRect(0,s,t,n-s);for(let p=0;p<t;p+=36)e.strokeStyle="#10103a",e.lineWidth=1,e.beginPath(),e.moveTo(p,s),e.lineTo(p,n),e.stroke();for(let p=s;p<n;p+=36)e.strokeStyle="#10103a",e.lineWidth=1,e.beginPath(),e.moveTo(0,p),e.lineTo(t,p),e.stroke();[{x:t*.15,y:n*.2,w:t*.18,h:n*.35},{x:t*.68,y:n*.2,w:t*.18,h:n*.35}].forEach((p,m)=>{e.globalAlpha=.85+.08*Math.sin(i*2+m),e.fillStyle="#0a0a2e",it(e,p.x,p.y,p.w,p.h,6),e.fill(),e.strokeStyle=r+"88",e.lineWidth=1.5,it(e,p.x,p.y,p.w,p.h,6),e.stroke(),e.globalAlpha=1;for(let d=0;d<p.h-10;d+=12){const v=.2+.15*Math.sin(i*3+d*.1+m);e.fillStyle=`rgba(129,140,248,${v})`,e.fillRect(p.x+4,p.y+6+d,p.w-8,3)}const _=["SYS.CHECK","MEM: 94%","TEMP: 312K","FLUX: 0.87","ERR: 0x3F","RETRY..."];e.fillStyle=r,e.font="8px monospace";const g=Math.floor(i*3+m*3)%_.length;for(let d=0;d<Math.min(5,Math.floor(p.h/14));d++){const v=.4+.6*Math.sin(i+d);e.globalAlpha=v,e.fillText(_[(g+d)%_.length],p.x+6,p.y+16+d*14)}e.globalAlpha=1,e.fillStyle=r,e.font="9px monospace",e.fillText(`MODULE-${m+1}`,p.x+6,p.y+10)});const o=t*.5,l=n*.5;e.fillStyle="#0d0d22",it(e,o-40,l-15,80,30,4),e.fill(),e.strokeStyle=r+"66",e.lineWidth=1.5,it(e,o-40,l-15,80,30,4),e.stroke();const u=o-35+i*40%70,f=e.createLinearGradient(u-6,l-14,u+6,l-14);f.addColorStop(0,"transparent"),f.addColorStop(.5,r+"cc"),f.addColorStop(1,"transparent"),e.fillStyle=f,e.fillRect(u-6,l-14,12,28);const h=t*.42,c=s-50;e.fillStyle="#0a1628",it(e,h-28,c-22,56,46,4),e.fill(),e.strokeStyle=r+"55",e.lineWidth=1,it(e,h-28,c-22,56,46,4),e.stroke(),e.strokeStyle=r+"66",e.lineWidth=1,[[h-20,c-15,h+5,c-15],[h+5,c-15,h+5,c],[h+5,c,h+20,c]].forEach(([p,m,_,g])=>{e.beginPath(),e.moveTo(p,m),e.lineTo(_,g),e.stroke()}),e.fillStyle=Math.sin(i*7)>0?"#ef4444":"#1f0606",e.shadowBlur=Math.sin(i*7)>0?8:0,e.shadowColor="#ef4444",it(e,h-8,c-8,16,14,2),e.fill(),e.shadowBlur=0}function $A(e,t,n,i,r,s,a){const o=n*.72;e.fillStyle=s&&a?"#000800":"#0a0200",e.fillRect(0,0,t,n);const l=t*.65,u=e.createRadialGradient(t/2,n*.5,0,t/2,n*.5,t*.5);u.addColorStop(0,s&&a?"#001200":"#180800"),u.addColorStop(.7,s&&a?"#000a00":"#0d0400"),u.addColorStop(1,"#000000"),e.fillStyle=u,e.beginPath(),e.ellipse(t/2,n*.5,l/2,n*.45,0,0,Math.PI*2),e.fill();const f=n*.12;e.fillStyle="#1a0a00",e.beginPath(),e.ellipse(t/2,f,l/2,30,0,0,Math.PI*2),e.fill();const h=8;for(let d=0;d<h;d++){const v=d/h*Math.PI*2,y=l/2*.55,M=t/2+Math.cos(v)*y,T=f+Math.sin(v)*12,b=s&&a?!0:Math.sin(i*4+d)>.2;e.fillStyle=b?s&&a?"#22c55e":"#f97316":"#3d1505",e.shadowBlur=b?8:0,e.shadowColor=s&&a?"#22c55e":"#f97316",e.beginPath(),e.arc(M,T,6,0,Math.PI*2),e.fill(),e.shadowBlur=0}for(let d=0;d<6;d++){const v=n*.2+d*n*.08;e.strokeStyle="#2d1000",e.lineWidth=6,e.beginPath(),e.ellipse(t/2,v,l/2*.92,12,0,0,Math.PI*2),e.stroke(),e.strokeStyle="#451500",e.lineWidth=2,e.stroke()}const c=s&&a?.08:.18+.08*Math.sin(i*2);e.fillStyle=`rgba(251,146,60,${c})`,e.beginPath(),e.ellipse(t/2,o-10,l/2*.6,30,0,0,Math.PI*2),e.fill();const p=t*.74,m=n*.45;e.fillStyle="#1c0800",e.beginPath(),e.arc(p,m,35,0,Math.PI*2),e.fill(),e.strokeStyle="#7c2d12",e.lineWidth=3,e.beginPath(),e.arc(p,m,35,0,Math.PI*2),e.stroke(),e.save(),e.translate(p,m),e.rotate(i*6);for(let d=0;d<6;d++)e.rotate(Math.PI/3),e.fillStyle="#451500",it(e,5,-4,22,8,3),e.fill();e.restore();const _=t*.42,g=o-60;e.fillStyle="#2d1000",e.beginPath(),e.arc(_,g,20,0,Math.PI*2),e.fill(),e.strokeStyle=s&&a?"#22c55e":r,e.lineWidth=3,e.shadowBlur=12,e.shadowColor=s&&a?"#22c55e":r,e.beginPath(),e.arc(_,g,20,0,Math.PI*2),e.stroke(),e.shadowBlur=0;for(let d=0;d<4;d++)e.strokeStyle=s&&a?"#22c55e88":r+"88",e.lineWidth=1.5,e.beginPath(),e.arc(_,g,8+d*3,-Math.PI/2+i*(d%2===0?1.5:-1.5),Math.PI/2+i*(d%2===0?1.5:-1.5)),e.stroke();e.fillStyle="#0a0200",e.fillRect(0,o,t,n-o)}function YA({missionId:e,onDone:t}){const n=zA[e],i=W.useRef(null),r=W.useRef(0),s=W.useRef(!1),a=W.useRef({W:1,H:1}),[o,l]=W.useState(!1),u=W.useCallback(()=>{s.current||(s.current=!0,t==null||t())},[t]),f=W.useCallback(()=>{l(!0),setTimeout(u,400)},[u]);W.useEffect(()=>{function c(){const p=i.current;if(!p)return;const m=p.clientWidth,_=p.clientHeight;p.width=m,p.height=_,a.current={W:m,H:_}}return c(),window.addEventListener("resize",c),()=>window.removeEventListener("resize",c)},[]);const h=W.useCallback(c=>{if(s.current)return;const p=i.current;if(!p||!n)return;const m=p.getContext("2d"),{W:_,H:g}=a.current;r.current+=c;const d=r.current;if(d>=ng&&!s.current){s.current=!0,setTimeout(()=>{t==null||t()},50);return}const v=d>=ll;if(n.interior==="engine")$A(m,_,g,d,n.accent,n.isLast,v&&n.isLast);else{const w=m.createLinearGradient(0,0,0,g);w.addColorStop(0,n.bg1),w.addColorStop(1,n.bg2),m.fillStyle=w,m.fillRect(0,0,_,g),n.interior==="power"?VA(m,_,g,d,n.accent):n.interior==="fuel"?HA(m,_,g,d,n.accent):n.interior==="nav"?WA(m,_,g,d,n.accent):n.interior==="comms"?jA(m,_,g,d,n.accent):n.interior==="diagnostics"&&XA(m,_,g,d,n.accent)}const y=_*.46,M=g*.72-4;GA(m,y,M,d,!v);const T=g*.1;m.fillStyle="#000",m.fillRect(0,0,_,T),m.fillRect(0,g-T,_,T);const b=Math.min(1,d/Xc);if(m.globalAlpha=b,m.fillStyle=n.accent,m.font=`bold ${Math.round(_*.022)}px 'Courier New', monospace`,m.textAlign="left",m.fillText(n.system,_*.04,T*.62),m.fillStyle="#ffffff88",m.font=`${Math.round(_*.016)}px 'Courier New', monospace`,m.fillText("SYSTEM REPAIR IN PROGRESS",_*.04,T*.88),m.globalAlpha=1,d<ll){const w=Math.min(1,(d-.3)/.4);if(w>0){m.globalAlpha=w,m.fillStyle="#ffffff",m.font=`${Math.round(_*.018)}px 'Courier New', monospace`,m.textAlign="left";const S=Math.floor((d-.3)*18);m.fillText(n.action.slice(0,S),_*.04,g-T*.35),m.globalAlpha=1}}if(v){const w=Math.min(1,(d-ll)/.45);if(n.isLast)m.fillStyle=`rgba(34,197,94,${w*.12})`,m.fillRect(0,T,_,g-T*2),m.globalAlpha=w,m.textAlign="center",m.fillStyle="#22c55e",m.font=`bold ${Math.round(_*.028)}px 'Courier New', monospace`,m.shadowBlur=16,m.shadowColor="#22c55e",m.fillText(n.fault[0],_/2,g*.5-14),m.shadowBlur=0,m.fillStyle="#ffffff",m.font=`${Math.round(_*.018)}px 'Courier New', monospace`,m.fillText(n.fault[1],_/2,g*.5+14),m.globalAlpha=1;else{m.fillStyle=`rgba(220,38,38,${w*.18})`,m.fillRect(0,T,_,g-T*2);const S=Math.sin((d-ll)*Math.PI*5)*.5+.5;m.strokeStyle=`rgba(220,38,38,${w*S*.9})`,m.lineWidth=3,m.strokeRect(3,T+3,_-6,g-T*2-6),m.globalAlpha=w,m.textAlign="center",m.fillStyle="#ef4444",m.font=`bold ${Math.round(_*.028)}px 'Courier New', monospace`,m.shadowBlur=12,m.shadowColor="#ef4444",m.fillText(n.fault[0],_/2,g*.5-14),m.shadowBlur=0,m.fillStyle="#ffffff",m.font=`${Math.round(_*.018)}px 'Courier New', monospace`,m.fillText(n.fault[1],_/2,g*.5+14),m.globalAlpha=1}}if(d<Xc&&(m.fillStyle=`rgba(0,0,0,${1-d/Xc})`,m.fillRect(0,0,_,g)),d>$c){const w=Math.min(1,(d-$c)/(ng-$c));m.fillStyle=`rgba(0,0,0,${w})`,m.fillRect(0,0,_,g)}o&&(m.fillStyle="rgba(0,0,0,0.7)",m.fillRect(0,0,_,g)),m.textAlign="left"},[n,u,o]);return Lh(h),n?I.jsxs("div",{style:{position:"absolute",inset:0,zIndex:600,cursor:"pointer",userSelect:"none"},onClick:f,children:[I.jsx("canvas",{ref:i,style:{width:"100%",height:"100%",display:"block"}}),I.jsx("div",{style:{position:"absolute",bottom:"12%",right:"4%",color:"#ffffff66",fontSize:"11px",fontFamily:"monospace",letterSpacing:"0.1em",pointerEvents:"none"},children:"TAP TO SKIP"})]}):null}const Ss=[{id:"debug_wrong_variable",title:"Cross-System Reference Fault",systemContext:"The navigation power check is referencing a variable that was never declared. The condition evaluates incorrectly — navigation reports OFFLINE despite the reactor running at 87%.",systemExplanation:"Navigation systems continuously verify that available power meets minimum operating thresholds. The check compares a live sensor reading against a stored minimum. If the wrong variable name is used, the system reads an undefined reference and the condition fails regardless of actual power output.",codingConcept:"VARIABLES",conceptDetail:"A value is stored under a specific name. The name used to retrieve it must exactly match the name it was stored under. A mismatched name is treated as a different, undefined variable.",brokenCode:`let currentPower = 87;  // % — current reactor output
let minPower = 80;      // % — minimum threshold for navigation

if (minimumPower >= minPower) { // ERROR: 'minimumPower' is not defined
  console.log("Navigation: ONLINE");
} else {
  console.log("Navigation: OFFLINE — insufficient power");
}`,hint:"The variable declared on line 1 and the variable used in the condition are not the same name.",validate(e){const t=e.replace(/\/\/.*/g,"").replace(/\s+/g,"");return t.includes("currentPower>=minPower")||t.includes("currentPower>=80")},successText:"Reference resolved. Navigation confirms: ONLINE. currentPower (87) is above minPower (80). Power check operational."},{id:"debug_wrong_operator",title:"Engine Cut-Off Logic Inverted",systemContext:"The engine cut-off logic is inverted. At launch altitude (0 m), the main engines are reading CUT-OFF. The vehicle cannot begin its ascent.",systemExplanation:"Engine cut-off logic determines when the main engines should fire and when they should shut down. The engines must be active during ascent — below the designated cut-off altitude. Above that point they shut down for staging or orbital insertion. An inverted comparison reverses this entirely.",codingConcept:"CONDITIONALS",conceptDetail:"An if statement evaluates whether a condition is true or false and executes different code for each result. The comparison operator — `>` or `<` — determines what the condition is actually testing. Reversing the operator reverses the decision.",brokenCode:`let altitude       = 0;      // m — current altitude
let cutOffAltitude = 80000; // m — engine cut-off point

if (altitude > cutOffAltitude) { // ERROR: engines should fire BELOW cut-off
  console.log("Main engines: ACTIVE");
} else {
  console.log("Main engines: CUT-OFF");
}`,hint:"The rocket fires its engines while climbing toward 80,000 m. Should the condition be > or <?",validate(e){const t=e.replace(/\/\/.*/g,"").replace(/\s+/g,"");return t.includes("altitude<cutOffAltitude")||t.includes("altitude<80000")},successText:"Logic corrected. altitude (0) < cutOffAltitude (80,000) — condition true. Main engines: ACTIVE. Ascent sequence cleared."},{id:"debug_missing_return",title:"Diagnostic Loop — Return Value Discarded",systemContext:"The pre-launch diagnostic scanner is reporting zero systems ready. The scan loop runs without error, but readyCount never increments. Three modules are operational — none are being counted.",systemExplanation:"Diagnostic systems scan each subsystem and count how many are operational before authorising launch. The scanner uses a function to check each module and returns a boolean result. If that result is never used, the count stays at zero regardless of the actual system states.",codingConcept:"FUNCTIONS",conceptDetail:"A function can return a value when called. That return value must be captured and used by the calling code. Calling a function without acting on its return value discards the result entirely — the function ran, but nothing was done with what it found.",brokenCode:`function checkSystem(system) {
  return system.status === "NOMINAL";
}

let systems = [
  { name: "engine-A",  status: "NOMINAL" },
  { name: "engine-B",  status: "FAULT"   },
  { name: "fuel-pump", status: "NOMINAL" },
];

let readyCount = 0;

for (let i = 0; i < systems.length; i++) {
  checkSystem(systems[i]); // ERROR: return value ignored
}

console.log("Systems ready: " + readyCount);`,hint:"The function returns true or false. Use that return value inside an if statement to conditionally increment readyCount.",validate(e){const t=e.replace(/\/\/.*/g,"").replace(/\s+/g,"");return t.includes("if(checkSystem(systems[i]))")||t.includes("if(checkSystem(systems[i]))readyCount++")},successText:"Scan complete. Systems ready: 2 / 3. engine-B flagged FAULT. Diagnostic loop confirmed operational. Launch authorisation check passed."}];function qA({progress:e,onComplete:t}){const[n,i]=W.useState(0),[r,s]=W.useState(Ss[0].brokenCode);W.useEffect(()=>PM(),[]);const[a,o]=W.useState(null),[l,u]=W.useState(""),[f,h]=W.useState(0),[c,p]=W.useState(e),m=Ss[n],_=Ss.filter(v=>c.completedMissions.includes(v.id)).length,g=W.useCallback(()=>{if(m.validate(r)){Oh(),o("success"),u(m.successText);const v=Bh(c,m.id);p(v);const y=n===Ss.length-1;setTimeout(()=>{if(y)t(v);else{const M=n+1;i(M),s(Ss[M].brokenCode),o(null),u(""),h(0)}},2400)}else Fh(),o("error"),h(v=>v+1),u("Fault unresolved. Re-examine the code and try again.")},[r,m,n,c,t]),d=W.useCallback(v=>{s(v.target.value),a==="error"&&o(null),g_()},[a]);return I.jsxs("div",{className:"debug-arena",children:[I.jsxs("div",{className:"da-header",children:[I.jsx("div",{className:"da-mode-label",children:"DEBUG ARENA · PHASE 2"}),I.jsxs("div",{className:"da-progress",children:[_," / ",Ss.length," RESOLVED"]})]}),I.jsxs("div",{className:"da-body",children:[I.jsxs("div",{className:"da-step",children:[I.jsx("div",{className:"da-step-label",children:"STEP 1 · SYSTEM CONTEXT"}),I.jsx("div",{className:"da-step-text",children:m.systemContext})]}),I.jsxs("div",{className:"da-step",children:[I.jsx("div",{className:"da-step-label",children:"STEP 2 · SYSTEM EXPLANATION"}),I.jsx("div",{className:"da-step-text",children:m.systemExplanation})]}),I.jsxs("div",{className:"da-step da-step--concept",children:[I.jsxs("div",{className:"da-step-label",children:["STEP 3 · CODING CONCEPT · ",I.jsx("span",{className:"da-concept-tag",children:m.codingConcept})]}),I.jsx("div",{className:"da-step-text",children:m.conceptDetail})]}),I.jsxs("div",{className:"da-step da-step--task",children:[I.jsxs("div",{className:"da-step-label",children:["STEP 4 · PLAYER TASK · ",m.title]}),I.jsxs("div",{className:"da-editor-wrap",children:[I.jsxs("div",{className:"da-editor-bar",children:[I.jsx("span",{className:"da-editor-file",children:"system_diagnostic.js"}),I.jsx("span",{className:"da-editor-status",children:a==="success"?"✓ RESOLVED":a==="error"?"✕ FAULT ACTIVE":"● EDITING"})]}),I.jsx("textarea",{className:"da-editor",value:r,onChange:d,spellCheck:!1,rows:r.split(`
`).length+2,disabled:a==="success"})]}),f>=2&&a!=="success"&&I.jsxs("div",{className:"da-hint",children:[I.jsx("span",{className:"da-hint-label",children:"DIAGNOSTIC HINT"}),m.hint]}),a!=="success"&&I.jsx("button",{className:"da-deploy-btn",onClick:g,children:"RUN DIAGNOSTIC"})]}),l&&I.jsxs("div",{className:"da-step da-step--response",children:[I.jsx("div",{className:"da-step-label",children:"STEP 5 · SYSTEM RESPONSE"}),I.jsx("div",{className:`da-step-response da-step-response--${a}`,children:l})]})]})]})}const ul=[{id:"visual_fuel",title:"Fuel Tank Alert Scan",systemContext:"The fuel monitoring display is showing zero low-fuel alerts. Telemetry confirms multiple tanks are critically below threshold. The monitoring loop is running but the alert count is not updating correctly.",systemExplanation:"Fuel monitoring systems scan all onboard tanks and flag those below a safe minimum. Each flagged tank triggers an alert in the mission control display. The loop processes every tank in sequence and increments the alert counter when a tank falls below the threshold.",codingConcept:"LOOPS",conceptDetail:"A loop runs a block of code repeatedly, once for each item in a list. The loop counter moves through each position in sequence. On each pass, the loop body evaluates the current item — here, checking whether a tank is below the minimum and incrementing the alert count if so.",instruction:"How many low-fuel alerts does this scan produce?",code:`let tanks = [450, 120, 89, 310, 55]; // kg remaining
let alerts = 0;

for (let i = 0; i < tanks.length; i++) {
  if (tanks[i] < 100) {
    alerts++;
  }
}`,options:[{label:"1 alert",value:"a"},{label:"2 alerts",value:"b"},{label:"3 alerts",value:"c"},{label:"0 alerts",value:"d"}],correct:"b",explanation:"The loop checks each tank in order. 450 ≥ 100 (skip), 120 ≥ 100 (skip), 89 < 100 (alert), 310 ≥ 100 (skip), 55 < 100 (alert). Two tanks are below threshold. Fuel alert count restored: 2."},{id:"visual_comms",title:"Signal Routing Logic",systemContext:"The telemetry router is directing signals to the wrong relay. Mission control is receiving data on the backup link when the primary should be active. The routing logic uses signal strength to select a channel.",systemExplanation:"Signal routing systems use conditional logic to determine which communication channel to use based on measured signal strength. Each condition is evaluated in order — the first one that is true determines the output. Misreading the thresholds causes the router to select the wrong channel.",codingConcept:"CONDITIONALS",conceptDetail:"An if/else if chain evaluates conditions in sequence. The first condition that is true executes its block and the rest are skipped entirely. The order and values of the thresholds determine which path the system takes for any given input.",instruction:"Which route does the system select when signalStrength is 42?",code:`let signalStrength = 42;
let route;

if (signalStrength >= 80) {
  route = "PRIMARY — Direct link";
} else if (signalStrength >= 40) {
  route = "RELAY — Secondary link";
} else {
  route = "BACKUP — Emergency link";
}`,options:[{label:"PRIMARY — Direct link",value:"a"},{label:"RELAY — Secondary link",value:"b"},{label:"BACKUP — Emergency link",value:"c"},{label:"No route selected",value:"d"}],correct:"b",explanation:"42 is not ≥ 80 — first condition false. 42 is ≥ 40 — second condition true. The chain stops here. RELAY selected. Signal routing restored to correct channel."},{id:"visual_diagnostics",title:"Engine Status Function",systemContext:"The engine temperature monitor is displaying inconsistent status readings. Mission control cannot determine whether the engine is within safe operating parameters. The status function is being called with live sensor data.",systemExplanation:"Engine monitoring systems use functions to evaluate sensor readings and return a status classification. The function runs the same logic each time it is called, returning a result based on the input value. Operators must be able to read what a function will return for any given input to interpret telemetry correctly.",codingConcept:"FUNCTIONS",conceptDetail:"A function takes an input, runs a defined set of instructions, and returns a result. The return value depends on which condition inside the function is satisfied first. Once a return statement is reached, the function stops — no further conditions are checked.",instruction:"What does getEngineStatus(1250) return?",code:`function getEngineStatus(temp) {
  if (temp > 1500) {
    return "CRITICAL";
  }
  if (temp > 1000) {
    return "NOMINAL";
  }
  return "COLD";
}

let status = getEngineStatus(1250);`,options:[{label:'"CRITICAL"',value:"a"},{label:'"NOMINAL"',value:"b"},{label:'"COLD"',value:"c"},{label:"undefined",value:"d"}],correct:"b",explanation:'1250 is not > 1500 — first return skipped. 1250 is > 1000 — second return executes: "NOMINAL". The function exits. The third return is never reached. Engine status confirmed: NOMINAL.'}];function KA({progress:e,onComplete:t}){const[n,i]=W.useState(0),[r,s]=W.useState(null);W.useEffect(()=>IM(),[]);const[a,o]=W.useState(!1),[l,u]=W.useState(e),f=ul[n],h=r===f.correct,c=ul.filter(_=>l.completedMissions.includes(_.id)).length,p=W.useCallback(()=>{if(r)if(o(!0),h){Oh();const _=Bh(l,f.id);u(_);const g=n===ul.length-1;setTimeout(()=>{if(g)t(_);else{const d=n+1;i(d),s(null),o(!1)}},2600)}else Fh()},[r,h,f,n,l,t]),m=W.useCallback(()=>{s(null),o(!1)},[]);return I.jsxs("div",{className:"visual-lab",children:[I.jsxs("div",{className:"vl-header",children:[I.jsx("div",{className:"vl-mode-label",children:"VISUAL LAB · PHASE 3"}),I.jsxs("div",{className:"vl-progress",children:[c," / ",ul.length," CONFIRMED"]})]}),I.jsxs("div",{className:"vl-body",children:[I.jsxs("div",{className:"vl-step",children:[I.jsx("div",{className:"vl-step-label",children:"STEP 1 · SYSTEM CONTEXT"}),I.jsx("div",{className:"vl-step-text",children:f.systemContext})]}),I.jsxs("div",{className:"vl-step",children:[I.jsx("div",{className:"vl-step-label",children:"STEP 2 · SYSTEM EXPLANATION"}),I.jsx("div",{className:"vl-step-text",children:f.systemExplanation})]}),I.jsxs("div",{className:"vl-step vl-step--concept",children:[I.jsxs("div",{className:"vl-step-label",children:["STEP 3 · CODING CONCEPT · ",I.jsx("span",{className:"vl-concept-tag",children:f.codingConcept})]}),I.jsx("div",{className:"vl-step-text",children:f.conceptDetail})]}),I.jsxs("div",{className:"vl-step vl-step--task",children:[I.jsxs("div",{className:"vl-step-label",children:["STEP 4 · PLAYER TASK · ",f.title]}),I.jsx("div",{className:"vl-instruction",children:f.instruction}),I.jsxs("div",{className:"vl-code-wrap",children:[I.jsx("div",{className:"vl-code-bar",children:I.jsx("span",{className:"vl-code-label",children:"SYSTEM CODE · READ ONLY"})}),I.jsx("pre",{className:"vl-code",children:f.code})]}),I.jsx("div",{className:"vl-options",children:f.options.map(_=>{let g="vl-option";return a?_.value===f.correct?g+=" vl-option--correct":_.value===r&&(g+=" vl-option--wrong"):_.value===r&&(g+=" vl-option--selected"),I.jsxs("button",{className:g,onClick:()=>!a&&s(_.value),disabled:a,children:[I.jsx("span",{className:"vl-option-key",children:_.value.toUpperCase()}),I.jsx("span",{className:"vl-option-label",children:_.label})]},_.value)})}),!a&&I.jsx("button",{className:`vl-confirm-btn${r?"":" vl-confirm-btn--disabled"}`,onClick:p,disabled:!r,children:"CONFIRM READING"})]}),a&&I.jsxs("div",{className:"vl-step vl-step--response",children:[I.jsx("div",{className:"vl-step-label",children:"STEP 5 · SYSTEM RESPONSE"}),I.jsxs("div",{className:`vl-response vl-response--${h?"correct":"wrong"}`,children:[I.jsx("div",{className:"vl-response-head",children:h?"BEHAVIOUR CONFIRMED":"READING INCORRECT"}),I.jsx("div",{className:"vl-response-body",children:f.explanation}),!h&&I.jsx("button",{className:"vl-retry-btn",onClick:m,children:"RE-ANALYSE"})]})]})]})]})}const ai={BUILDER:"builder",DEBUG:"debug",VISUAL:"visual",LAUNCH:"launch"};function ZA({nextMode:e,onDone:t}){W.useEffect(()=>{const r=setTimeout(t,3e3);return()=>clearTimeout(r)},[t]);const n={debug:{pre:"ROCKET BUILDER · COMPLETE",title:"DEBUG ARENA",sub:"All six systems repaired. Proceed to fault verification."},visual:{pre:"DEBUG ARENA · COMPLETE",title:"VISUAL LAB",sub:"All faults resolved. Proceed to final systems analysis."},launch:{pre:"ALL PHASES COMPLETE",title:"LAUNCH SEQUENCE INITIATED",sub:"All systems nominal. Stand by for launch."}},i=n[e]??n.launch;return I.jsxs("div",{className:"mode-transition",children:[I.jsx("div",{className:"mt-pre",children:i.pre}),I.jsx("div",{className:"mt-title",children:i.title}),I.jsx("div",{className:"mt-sub",children:i.sub}),I.jsx("div",{className:"mt-bar",children:I.jsx("div",{className:"mt-bar-fill"})})]})}function QA({onResume:e,onQuit:t}){return I.jsx("div",{className:"pause-overlay",children:I.jsxs("div",{className:"pause-panel",children:[I.jsx("div",{className:"pause-title",children:"MISSION PAUSED"}),I.jsx("div",{className:"pause-sub",children:"Your progress is saved."}),I.jsx("button",{className:"pause-btn pause-btn--resume",onClick:e,children:"RESUME MISSION"}),I.jsx("button",{className:"pause-btn pause-btn--quit",onClick:t,children:"QUIT TO GAME HUB"})]})})}function JA(){const[e,t]=W.useState(!1),n=W.useRef(!1),i=W.useRef(null);W.useEffect(()=>(i.current=D0(),Lo(i.current),()=>{var s;(s=i.current)==null||s.call(i),i.current=null,Lo(null)}),[]);const r=W.useCallback(()=>{var a;const s=!n.current;n.current=s,t(s),s?((a=i.current)==null||a.call(i),i.current=null,Lo(null)):(i.current=D0(),Lo(i.current))},[]);return I.jsx("button",{className:"game-music-btn",onClick:r,title:e?"Music off":"Music on",children:e?"♪":"♫"})}function eC(){const[e,t]=W.useState(CM()),n=W.useCallback(()=>{const i=AM();t(i)},[]);return I.jsx("button",{className:"game-mute-btn",onClick:n,title:e?"Unmute":"Mute",children:e?"🔇":"🔊"})}function tC(){const[e,t]=W.useState("MAIN_MENU"),[n,i]=W.useState(ai.BUILDER),[r,s]=W.useState(null),[a,o]=W.useState(()=>YM()),[l,u]=W.useState(!1),[f,h]=W.useState(null),c=W.useRef(null),p=W.useCallback(()=>{try{window.parent.postMessage({type:"QUIT_TO_HUB"},"*")}catch{}},[]),m=W.useCallback(()=>{o(KM()),t("MAIN_MENU"),i(ai.BUILDER),s(null),u(!1)},[]);W.useEffect(()=>{function b(w){w.data&&w.data.type==="STOP_AUDIO"&&kM()}return window.addEventListener("message",b),()=>window.removeEventListener("message",b)},[]),W.useEffect(()=>{const b=a.completedMissions,w=U0.every(P=>b.includes(P)),S=["debug_wrong_variable","debug_wrong_operator","debug_missing_return"].every(P=>b.includes(P)),x=["visual_fuel","visual_comms","visual_diagnostics"].every(P=>b.includes(P));if(x||S&&x){i(ai.LAUNCH);return}if(S){i(ai.VISUAL);return}if(w){i(ai.DEBUG);return}},[]);const _=W.useCallback(b=>{c.current=b,h(b)},[]),g=W.useCallback(()=>{const b=c.current;c.current=null,h(null),b&&o(w=>{const S=Bh(w,b);return U0.every(P=>S.completedMissions.includes(P))&&s("debug"),S})},[]),d=W.useCallback(b=>{o(b),s("visual")},[]),v=W.useCallback(b=>{o(b),s("launch")},[]),y=W.useCallback(()=>{i(r),s(null)},[r]),M=W.useCallback(()=>{t("MARS")},[]),T=e==="HANGAR";return I.jsxs("div",{className:"game-root",children:[I.jsx("button",{className:"game-pause-btn",onClick:()=>u(!0),title:"Pause",children:"⏸ PAUSE"}),I.jsx(JA,{}),I.jsx(eC,{}),l&&I.jsx(QA,{onResume:()=>u(!1),onQuit:p}),e==="MAIN_MENU"&&I.jsx(U1,{onStart:()=>t("BRIEFING")}),e==="BRIEFING"&&I.jsx(F1,{onContinue:()=>t("HANGAR")}),T&&(n===ai.BUILDER||n===ai.LAUNCH)&&I.jsx(a2,{progress:a,onMissionComplete:_,autoLaunch:n===ai.LAUNCH,onLaunchComplete:M}),T&&n===ai.DEBUG&&I.jsx(qA,{progress:a,onComplete:d}),T&&n===ai.VISUAL&&I.jsx(KA,{progress:a,onComplete:v}),e==="MARS"&&I.jsx(BA,{onPlayAgain:m}),f&&I.jsx(YA,{missionId:f,onDone:g}),r&&I.jsx(ZA,{nextMode:r,onDone:y})]})}const nC=Yc.createRoot(document.getElementById("launch-sequence-root"));nC.render(I.jsx(tC,{}));
