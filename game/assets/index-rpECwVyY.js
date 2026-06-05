(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();var Lg={exports:{}},Au={},Ig={exports:{}},Qe={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ma=Symbol.for("react.element"),$S=Symbol.for("react.portal"),YS=Symbol.for("react.fragment"),qS=Symbol.for("react.strict_mode"),KS=Symbol.for("react.profiler"),ZS=Symbol.for("react.provider"),JS=Symbol.for("react.context"),QS=Symbol.for("react.forward_ref"),ey=Symbol.for("react.suspense"),ty=Symbol.for("react.memo"),ny=Symbol.for("react.lazy"),Op=Symbol.iterator;function iy(t){return t===null||typeof t!="object"?null:(t=Op&&t[Op]||t["@@iterator"],typeof t=="function"?t:null)}var Dg={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Ug=Object.assign,Fg={};function Qs(t,e,n){this.props=t,this.context=e,this.refs=Fg,this.updater=n||Dg}Qs.prototype.isReactComponent={};Qs.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};Qs.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function Og(){}Og.prototype=Qs.prototype;function ih(t,e,n){this.props=t,this.context=e,this.refs=Fg,this.updater=n||Dg}var rh=ih.prototype=new Og;rh.constructor=ih;Ug(rh,Qs.prototype);rh.isPureReactComponent=!0;var kp=Array.isArray,kg=Object.prototype.hasOwnProperty,sh={current:null},Bg={key:!0,ref:!0,__self:!0,__source:!0};function zg(t,e,n){var i,r={},s=null,o=null;if(e!=null)for(i in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(s=""+e.key),e)kg.call(e,i)&&!Bg.hasOwnProperty(i)&&(r[i]=e[i]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var l=Array(a),u=0;u<a;u++)l[u]=arguments[u+2];r.children=l}if(t&&t.defaultProps)for(i in a=t.defaultProps,a)r[i]===void 0&&(r[i]=a[i]);return{$$typeof:ma,type:t,key:s,ref:o,props:r,_owner:sh.current}}function ry(t,e){return{$$typeof:ma,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function oh(t){return typeof t=="object"&&t!==null&&t.$$typeof===ma}function sy(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var Bp=/\/+/g;function Ku(t,e){return typeof t=="object"&&t!==null&&t.key!=null?sy(""+t.key):e.toString(36)}function El(t,e,n,i,r){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(s){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case ma:case $S:o=!0}}if(o)return o=t,r=r(o),t=i===""?"."+Ku(o,0):i,kp(r)?(n="",t!=null&&(n=t.replace(Bp,"$&/")+"/"),El(r,e,n,"",function(u){return u})):r!=null&&(oh(r)&&(r=ry(r,n+(!r.key||o&&o.key===r.key?"":(""+r.key).replace(Bp,"$&/")+"/")+t)),e.push(r)),1;if(o=0,i=i===""?".":i+":",kp(t))for(var a=0;a<t.length;a++){s=t[a];var l=i+Ku(s,a);o+=El(s,e,n,l,r)}else if(l=iy(t),typeof l=="function")for(t=l.call(t),a=0;!(s=t.next()).done;)s=s.value,l=i+Ku(s,a++),o+=El(s,e,n,l,r);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function xa(t,e,n){if(t==null)return t;var i=[],r=0;return El(t,i,"","",function(s){return e.call(n,s,r++)}),i}function oy(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var cn={current:null},Tl={transition:null},ay={ReactCurrentDispatcher:cn,ReactCurrentBatchConfig:Tl,ReactCurrentOwner:sh};function Gg(){throw Error("act(...) is not supported in production builds of React.")}Qe.Children={map:xa,forEach:function(t,e,n){xa(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return xa(t,function(){e++}),e},toArray:function(t){return xa(t,function(e){return e})||[]},only:function(t){if(!oh(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};Qe.Component=Qs;Qe.Fragment=YS;Qe.Profiler=KS;Qe.PureComponent=ih;Qe.StrictMode=qS;Qe.Suspense=ey;Qe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ay;Qe.act=Gg;Qe.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var i=Ug({},t.props),r=t.key,s=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,o=sh.current),e.key!==void 0&&(r=""+e.key),t.type&&t.type.defaultProps)var a=t.type.defaultProps;for(l in e)kg.call(e,l)&&!Bg.hasOwnProperty(l)&&(i[l]=e[l]===void 0&&a!==void 0?a[l]:e[l])}var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){a=Array(l);for(var u=0;u<l;u++)a[u]=arguments[u+2];i.children=a}return{$$typeof:ma,type:t.type,key:r,ref:s,props:i,_owner:o}};Qe.createContext=function(t){return t={$$typeof:JS,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:ZS,_context:t},t.Consumer=t};Qe.createElement=zg;Qe.createFactory=function(t){var e=zg.bind(null,t);return e.type=t,e};Qe.createRef=function(){return{current:null}};Qe.forwardRef=function(t){return{$$typeof:QS,render:t}};Qe.isValidElement=oh;Qe.lazy=function(t){return{$$typeof:ny,_payload:{_status:-1,_result:t},_init:oy}};Qe.memo=function(t,e){return{$$typeof:ty,type:t,compare:e===void 0?null:e}};Qe.startTransition=function(t){var e=Tl.transition;Tl.transition={};try{t()}finally{Tl.transition=e}};Qe.unstable_act=Gg;Qe.useCallback=function(t,e){return cn.current.useCallback(t,e)};Qe.useContext=function(t){return cn.current.useContext(t)};Qe.useDebugValue=function(){};Qe.useDeferredValue=function(t){return cn.current.useDeferredValue(t)};Qe.useEffect=function(t,e){return cn.current.useEffect(t,e)};Qe.useId=function(){return cn.current.useId()};Qe.useImperativeHandle=function(t,e,n){return cn.current.useImperativeHandle(t,e,n)};Qe.useInsertionEffect=function(t,e){return cn.current.useInsertionEffect(t,e)};Qe.useLayoutEffect=function(t,e){return cn.current.useLayoutEffect(t,e)};Qe.useMemo=function(t,e){return cn.current.useMemo(t,e)};Qe.useReducer=function(t,e,n){return cn.current.useReducer(t,e,n)};Qe.useRef=function(t){return cn.current.useRef(t)};Qe.useState=function(t){return cn.current.useState(t)};Qe.useSyncExternalStore=function(t,e,n){return cn.current.useSyncExternalStore(t,e,n)};Qe.useTransition=function(){return cn.current.useTransition()};Qe.version="18.3.1";Ig.exports=Qe;var W=Ig.exports;/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ly=W,uy=Symbol.for("react.element"),cy=Symbol.for("react.fragment"),fy=Object.prototype.hasOwnProperty,dy=ly.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,hy={key:!0,ref:!0,__self:!0,__source:!0};function Vg(t,e,n){var i,r={},s=null,o=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(o=e.ref);for(i in e)fy.call(e,i)&&!hy.hasOwnProperty(i)&&(r[i]=e[i]);if(t&&t.defaultProps)for(i in e=t.defaultProps,e)r[i]===void 0&&(r[i]=e[i]);return{$$typeof:uy,type:t,key:s,ref:o,props:r,_owner:dy.current}}Au.Fragment=cy;Au.jsx=Vg;Au.jsxs=Vg;Lg.exports=Au;var P=Lg.exports,df={},Hg={exports:{}},Pn={},Wg={exports:{}},Xg={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(U,X){var J=U.length;U.push(X);e:for(;0<J;){var se=J-1>>>1,ye=U[se];if(0<r(ye,X))U[se]=X,U[J]=ye,J=se;else break e}}function n(U){return U.length===0?null:U[0]}function i(U){if(U.length===0)return null;var X=U[0],J=U.pop();if(J!==X){U[0]=J;e:for(var se=0,ye=U.length,Ge=ye>>>1;se<Ge;){var He=2*(se+1)-1,Ue=U[He],te=He+1,me=U[te];if(0>r(Ue,J))te<ye&&0>r(me,Ue)?(U[se]=me,U[te]=J,se=te):(U[se]=Ue,U[He]=J,se=He);else if(te<ye&&0>r(me,J))U[se]=me,U[te]=J,se=te;else break e}}return X}function r(U,X){var J=U.sortIndex-X.sortIndex;return J!==0?J:U.id-X.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var o=Date,a=o.now();t.unstable_now=function(){return o.now()-a}}var l=[],u=[],c=1,d=null,f=3,p=!1,m=!1,_=!1,g=typeof setTimeout=="function"?setTimeout:null,h=typeof clearTimeout=="function"?clearTimeout:null,v=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function S(U){for(var X=n(u);X!==null;){if(X.callback===null)i(u);else if(X.startTime<=U)i(u),X.sortIndex=X.expirationTime,e(l,X);else break;X=n(u)}}function M(U){if(_=!1,S(U),!m)if(n(l)!==null)m=!0,G(T);else{var X=n(u);X!==null&&H(M,X.startTime-U)}}function T(U,X){m=!1,_&&(_=!1,h(y),y=-1),p=!0;var J=f;try{for(S(X),d=n(l);d!==null&&(!(d.expirationTime>X)||U&&!N());){var se=d.callback;if(typeof se=="function"){d.callback=null,f=d.priorityLevel;var ye=se(d.expirationTime<=X);X=t.unstable_now(),typeof ye=="function"?d.callback=ye:d===n(l)&&i(l),S(X)}else i(l);d=n(l)}if(d!==null)var Ge=!0;else{var He=n(u);He!==null&&H(M,He.startTime-X),Ge=!1}return Ge}finally{d=null,f=J,p=!1}}var b=!1,w=null,y=-1,C=5,R=-1;function N(){return!(t.unstable_now()-R<C)}function I(){if(w!==null){var U=t.unstable_now();R=U;var X=!0;try{X=w(!0,U)}finally{X?F():(b=!1,w=null)}}else b=!1}var F;if(typeof v=="function")F=function(){v(I)};else if(typeof MessageChannel<"u"){var z=new MessageChannel,D=z.port2;z.port1.onmessage=I,F=function(){D.postMessage(null)}}else F=function(){g(I,0)};function G(U){w=U,b||(b=!0,F())}function H(U,X){y=g(function(){U(t.unstable_now())},X)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(U){U.callback=null},t.unstable_continueExecution=function(){m||p||(m=!0,G(T))},t.unstable_forceFrameRate=function(U){0>U||125<U?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):C=0<U?Math.floor(1e3/U):5},t.unstable_getCurrentPriorityLevel=function(){return f},t.unstable_getFirstCallbackNode=function(){return n(l)},t.unstable_next=function(U){switch(f){case 1:case 2:case 3:var X=3;break;default:X=f}var J=f;f=X;try{return U()}finally{f=J}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(U,X){switch(U){case 1:case 2:case 3:case 4:case 5:break;default:U=3}var J=f;f=U;try{return X()}finally{f=J}},t.unstable_scheduleCallback=function(U,X,J){var se=t.unstable_now();switch(typeof J=="object"&&J!==null?(J=J.delay,J=typeof J=="number"&&0<J?se+J:se):J=se,U){case 1:var ye=-1;break;case 2:ye=250;break;case 5:ye=1073741823;break;case 4:ye=1e4;break;default:ye=5e3}return ye=J+ye,U={id:c++,callback:X,priorityLevel:U,startTime:J,expirationTime:ye,sortIndex:-1},J>se?(U.sortIndex=J,e(u,U),n(l)===null&&U===n(u)&&(_?(h(y),y=-1):_=!0,H(M,J-se))):(U.sortIndex=ye,e(l,U),m||p||(m=!0,G(T))),U},t.unstable_shouldYield=N,t.unstable_wrapCallback=function(U){var X=f;return function(){var J=f;f=X;try{return U.apply(this,arguments)}finally{f=J}}}})(Xg);Wg.exports=Xg;var py=Wg.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var my=W,Rn=py;function fe(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var jg=new Set,jo={};function Qr(t,e){Gs(t,e),Gs(t+"Capture",e)}function Gs(t,e){for(jo[t]=e,t=0;t<e.length;t++)jg.add(e[t])}var Fi=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),hf=Object.prototype.hasOwnProperty,gy=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,zp={},Gp={};function vy(t){return hf.call(Gp,t)?!0:hf.call(zp,t)?!1:gy.test(t)?Gp[t]=!0:(zp[t]=!0,!1)}function _y(t,e,n,i){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return i?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function Sy(t,e,n,i){if(e===null||typeof e>"u"||_y(t,e,n,i))return!0;if(i)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function fn(t,e,n,i,r,s,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=o}var qt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){qt[t]=new fn(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];qt[e]=new fn(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){qt[t]=new fn(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){qt[t]=new fn(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){qt[t]=new fn(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){qt[t]=new fn(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){qt[t]=new fn(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){qt[t]=new fn(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){qt[t]=new fn(t,5,!1,t.toLowerCase(),null,!1,!1)});var ah=/[\-:]([a-z])/g;function lh(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(ah,lh);qt[e]=new fn(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(ah,lh);qt[e]=new fn(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(ah,lh);qt[e]=new fn(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){qt[t]=new fn(t,1,!1,t.toLowerCase(),null,!1,!1)});qt.xlinkHref=new fn("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){qt[t]=new fn(t,1,!1,t.toLowerCase(),null,!0,!0)});function uh(t,e,n,i){var r=qt.hasOwnProperty(e)?qt[e]:null;(r!==null?r.type!==0:i||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(Sy(e,n,r,i)&&(n=null),i||r===null?vy(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):r.mustUseProperty?t[r.propertyName]=n===null?r.type===3?!1:"":n:(e=r.attributeName,i=r.attributeNamespace,n===null?t.removeAttribute(e):(r=r.type,n=r===3||r===4&&n===!0?"":""+n,i?t.setAttributeNS(i,e,n):t.setAttribute(e,n))))}var Vi=my.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Aa=Symbol.for("react.element"),Ms=Symbol.for("react.portal"),Es=Symbol.for("react.fragment"),ch=Symbol.for("react.strict_mode"),pf=Symbol.for("react.profiler"),$g=Symbol.for("react.provider"),Yg=Symbol.for("react.context"),fh=Symbol.for("react.forward_ref"),mf=Symbol.for("react.suspense"),gf=Symbol.for("react.suspense_list"),dh=Symbol.for("react.memo"),er=Symbol.for("react.lazy"),qg=Symbol.for("react.offscreen"),Vp=Symbol.iterator;function so(t){return t===null||typeof t!="object"?null:(t=Vp&&t[Vp]||t["@@iterator"],typeof t=="function"?t:null)}var xt=Object.assign,Zu;function bo(t){if(Zu===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Zu=e&&e[1]||""}return`
`+Zu+t}var Ju=!1;function Qu(t,e){if(!t||Ju)return"";Ju=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(u){var i=u}Reflect.construct(t,[],e)}else{try{e.call()}catch(u){i=u}t.call(e.prototype)}else{try{throw Error()}catch(u){i=u}t()}}catch(u){if(u&&i&&typeof u.stack=="string"){for(var r=u.stack.split(`
`),s=i.stack.split(`
`),o=r.length-1,a=s.length-1;1<=o&&0<=a&&r[o]!==s[a];)a--;for(;1<=o&&0<=a;o--,a--)if(r[o]!==s[a]){if(o!==1||a!==1)do if(o--,a--,0>a||r[o]!==s[a]){var l=`
`+r[o].replace(" at new "," at ");return t.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",t.displayName)),l}while(1<=o&&0<=a);break}}}finally{Ju=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?bo(t):""}function yy(t){switch(t.tag){case 5:return bo(t.type);case 16:return bo("Lazy");case 13:return bo("Suspense");case 19:return bo("SuspenseList");case 0:case 2:case 15:return t=Qu(t.type,!1),t;case 11:return t=Qu(t.type.render,!1),t;case 1:return t=Qu(t.type,!0),t;default:return""}}function vf(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case Es:return"Fragment";case Ms:return"Portal";case pf:return"Profiler";case ch:return"StrictMode";case mf:return"Suspense";case gf:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case Yg:return(t.displayName||"Context")+".Consumer";case $g:return(t._context.displayName||"Context")+".Provider";case fh:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case dh:return e=t.displayName||null,e!==null?e:vf(t.type)||"Memo";case er:e=t._payload,t=t._init;try{return vf(t(e))}catch{}}return null}function My(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return vf(e);case 8:return e===ch?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function _r(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Kg(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function Ey(t){var e=Kg(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),i=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var r=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return r.call(this)},set:function(o){i=""+o,s.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return i},setValue:function(o){i=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function Ca(t){t._valueTracker||(t._valueTracker=Ey(t))}function Zg(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),i="";return t&&(i=Kg(t)?t.checked?"true":"false":t.value),t=i,t!==n?(e.setValue(t),!0):!1}function jl(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function _f(t,e){var n=e.checked;return xt({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function Hp(t,e){var n=e.defaultValue==null?"":e.defaultValue,i=e.checked!=null?e.checked:e.defaultChecked;n=_r(e.value!=null?e.value:n),t._wrapperState={initialChecked:i,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function Jg(t,e){e=e.checked,e!=null&&uh(t,"checked",e,!1)}function Sf(t,e){Jg(t,e);var n=_r(e.value),i=e.type;if(n!=null)i==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(i==="submit"||i==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?yf(t,e.type,n):e.hasOwnProperty("defaultValue")&&yf(t,e.type,_r(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function Wp(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var i=e.type;if(!(i!=="submit"&&i!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function yf(t,e,n){(e!=="number"||jl(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var wo=Array.isArray;function Is(t,e,n,i){if(t=t.options,e){e={};for(var r=0;r<n.length;r++)e["$"+n[r]]=!0;for(n=0;n<t.length;n++)r=e.hasOwnProperty("$"+t[n].value),t[n].selected!==r&&(t[n].selected=r),r&&i&&(t[n].defaultSelected=!0)}else{for(n=""+_r(n),e=null,r=0;r<t.length;r++){if(t[r].value===n){t[r].selected=!0,i&&(t[r].defaultSelected=!0);return}e!==null||t[r].disabled||(e=t[r])}e!==null&&(e.selected=!0)}}function Mf(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(fe(91));return xt({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function Xp(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(fe(92));if(wo(n)){if(1<n.length)throw Error(fe(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:_r(n)}}function Qg(t,e){var n=_r(e.value),i=_r(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),i!=null&&(t.defaultValue=""+i)}function jp(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function ev(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Ef(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?ev(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var Ra,tv=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,i,r){MSApp.execUnsafeLocalFunction(function(){return t(e,n,i,r)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(Ra=Ra||document.createElement("div"),Ra.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=Ra.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function $o(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var Io={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Ty=["Webkit","ms","Moz","O"];Object.keys(Io).forEach(function(t){Ty.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),Io[e]=Io[t]})});function nv(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||Io.hasOwnProperty(t)&&Io[t]?(""+e).trim():e+"px"}function iv(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var i=n.indexOf("--")===0,r=nv(n,e[n],i);n==="float"&&(n="cssFloat"),i?t.setProperty(n,r):t[n]=r}}var by=xt({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Tf(t,e){if(e){if(by[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(fe(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(fe(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(fe(61))}if(e.style!=null&&typeof e.style!="object")throw Error(fe(62))}}function bf(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var wf=null;function hh(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var xf=null,Ds=null,Us=null;function $p(t){if(t=_a(t)){if(typeof xf!="function")throw Error(fe(280));var e=t.stateNode;e&&(e=Lu(e),xf(t.stateNode,t.type,e))}}function rv(t){Ds?Us?Us.push(t):Us=[t]:Ds=t}function sv(){if(Ds){var t=Ds,e=Us;if(Us=Ds=null,$p(t),e)for(t=0;t<e.length;t++)$p(e[t])}}function ov(t,e){return t(e)}function av(){}var ec=!1;function lv(t,e,n){if(ec)return t(e,n);ec=!0;try{return ov(t,e,n)}finally{ec=!1,(Ds!==null||Us!==null)&&(av(),sv())}}function Yo(t,e){var n=t.stateNode;if(n===null)return null;var i=Lu(n);if(i===null)return null;n=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(t=t.type,i=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!i;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(fe(231,e,typeof n));return n}var Af=!1;if(Fi)try{var oo={};Object.defineProperty(oo,"passive",{get:function(){Af=!0}}),window.addEventListener("test",oo,oo),window.removeEventListener("test",oo,oo)}catch{Af=!1}function wy(t,e,n,i,r,s,o,a,l){var u=Array.prototype.slice.call(arguments,3);try{e.apply(n,u)}catch(c){this.onError(c)}}var Do=!1,$l=null,Yl=!1,Cf=null,xy={onError:function(t){Do=!0,$l=t}};function Ay(t,e,n,i,r,s,o,a,l){Do=!1,$l=null,wy.apply(xy,arguments)}function Cy(t,e,n,i,r,s,o,a,l){if(Ay.apply(this,arguments),Do){if(Do){var u=$l;Do=!1,$l=null}else throw Error(fe(198));Yl||(Yl=!0,Cf=u)}}function es(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function uv(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function Yp(t){if(es(t)!==t)throw Error(fe(188))}function Ry(t){var e=t.alternate;if(!e){if(e=es(t),e===null)throw Error(fe(188));return e!==t?null:t}for(var n=t,i=e;;){var r=n.return;if(r===null)break;var s=r.alternate;if(s===null){if(i=r.return,i!==null){n=i;continue}break}if(r.child===s.child){for(s=r.child;s;){if(s===n)return Yp(r),t;if(s===i)return Yp(r),e;s=s.sibling}throw Error(fe(188))}if(n.return!==i.return)n=r,i=s;else{for(var o=!1,a=r.child;a;){if(a===n){o=!0,n=r,i=s;break}if(a===i){o=!0,i=r,n=s;break}a=a.sibling}if(!o){for(a=s.child;a;){if(a===n){o=!0,n=s,i=r;break}if(a===i){o=!0,i=s,n=r;break}a=a.sibling}if(!o)throw Error(fe(189))}}if(n.alternate!==i)throw Error(fe(190))}if(n.tag!==3)throw Error(fe(188));return n.stateNode.current===n?t:e}function cv(t){return t=Ry(t),t!==null?fv(t):null}function fv(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=fv(t);if(e!==null)return e;t=t.sibling}return null}var dv=Rn.unstable_scheduleCallback,qp=Rn.unstable_cancelCallback,Py=Rn.unstable_shouldYield,Ny=Rn.unstable_requestPaint,Dt=Rn.unstable_now,Ly=Rn.unstable_getCurrentPriorityLevel,ph=Rn.unstable_ImmediatePriority,hv=Rn.unstable_UserBlockingPriority,ql=Rn.unstable_NormalPriority,Iy=Rn.unstable_LowPriority,pv=Rn.unstable_IdlePriority,Cu=null,pi=null;function Dy(t){if(pi&&typeof pi.onCommitFiberRoot=="function")try{pi.onCommitFiberRoot(Cu,t,void 0,(t.current.flags&128)===128)}catch{}}var Qn=Math.clz32?Math.clz32:Oy,Uy=Math.log,Fy=Math.LN2;function Oy(t){return t>>>=0,t===0?32:31-(Uy(t)/Fy|0)|0}var Pa=64,Na=4194304;function xo(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function Kl(t,e){var n=t.pendingLanes;if(n===0)return 0;var i=0,r=t.suspendedLanes,s=t.pingedLanes,o=n&268435455;if(o!==0){var a=o&~r;a!==0?i=xo(a):(s&=o,s!==0&&(i=xo(s)))}else o=n&~r,o!==0?i=xo(o):s!==0&&(i=xo(s));if(i===0)return 0;if(e!==0&&e!==i&&!(e&r)&&(r=i&-i,s=e&-e,r>=s||r===16&&(s&4194240)!==0))return e;if(i&4&&(i|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=i;0<e;)n=31-Qn(e),r=1<<n,i|=t[n],e&=~r;return i}function ky(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function By(t,e){for(var n=t.suspendedLanes,i=t.pingedLanes,r=t.expirationTimes,s=t.pendingLanes;0<s;){var o=31-Qn(s),a=1<<o,l=r[o];l===-1?(!(a&n)||a&i)&&(r[o]=ky(a,e)):l<=e&&(t.expiredLanes|=a),s&=~a}}function Rf(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function mv(){var t=Pa;return Pa<<=1,!(Pa&4194240)&&(Pa=64),t}function tc(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function ga(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-Qn(e),t[e]=n}function zy(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var i=t.eventTimes;for(t=t.expirationTimes;0<n;){var r=31-Qn(n),s=1<<r;e[r]=0,i[r]=-1,t[r]=-1,n&=~s}}function mh(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var i=31-Qn(n),r=1<<i;r&e|t[i]&e&&(t[i]|=e),n&=~r}}var ft=0;function gv(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var vv,gh,_v,Sv,yv,Pf=!1,La=[],cr=null,fr=null,dr=null,qo=new Map,Ko=new Map,ir=[],Gy="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Kp(t,e){switch(t){case"focusin":case"focusout":cr=null;break;case"dragenter":case"dragleave":fr=null;break;case"mouseover":case"mouseout":dr=null;break;case"pointerover":case"pointerout":qo.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ko.delete(e.pointerId)}}function ao(t,e,n,i,r,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[r]},e!==null&&(e=_a(e),e!==null&&gh(e)),t):(t.eventSystemFlags|=i,e=t.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),t)}function Vy(t,e,n,i,r){switch(e){case"focusin":return cr=ao(cr,t,e,n,i,r),!0;case"dragenter":return fr=ao(fr,t,e,n,i,r),!0;case"mouseover":return dr=ao(dr,t,e,n,i,r),!0;case"pointerover":var s=r.pointerId;return qo.set(s,ao(qo.get(s)||null,t,e,n,i,r)),!0;case"gotpointercapture":return s=r.pointerId,Ko.set(s,ao(Ko.get(s)||null,t,e,n,i,r)),!0}return!1}function Mv(t){var e=Or(t.target);if(e!==null){var n=es(e);if(n!==null){if(e=n.tag,e===13){if(e=uv(n),e!==null){t.blockedOn=e,yv(t.priority,function(){_v(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function bl(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=Nf(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var i=new n.constructor(n.type,n);wf=i,n.target.dispatchEvent(i),wf=null}else return e=_a(n),e!==null&&gh(e),t.blockedOn=n,!1;e.shift()}return!0}function Zp(t,e,n){bl(t)&&n.delete(e)}function Hy(){Pf=!1,cr!==null&&bl(cr)&&(cr=null),fr!==null&&bl(fr)&&(fr=null),dr!==null&&bl(dr)&&(dr=null),qo.forEach(Zp),Ko.forEach(Zp)}function lo(t,e){t.blockedOn===e&&(t.blockedOn=null,Pf||(Pf=!0,Rn.unstable_scheduleCallback(Rn.unstable_NormalPriority,Hy)))}function Zo(t){function e(r){return lo(r,t)}if(0<La.length){lo(La[0],t);for(var n=1;n<La.length;n++){var i=La[n];i.blockedOn===t&&(i.blockedOn=null)}}for(cr!==null&&lo(cr,t),fr!==null&&lo(fr,t),dr!==null&&lo(dr,t),qo.forEach(e),Ko.forEach(e),n=0;n<ir.length;n++)i=ir[n],i.blockedOn===t&&(i.blockedOn=null);for(;0<ir.length&&(n=ir[0],n.blockedOn===null);)Mv(n),n.blockedOn===null&&ir.shift()}var Fs=Vi.ReactCurrentBatchConfig,Zl=!0;function Wy(t,e,n,i){var r=ft,s=Fs.transition;Fs.transition=null;try{ft=1,vh(t,e,n,i)}finally{ft=r,Fs.transition=s}}function Xy(t,e,n,i){var r=ft,s=Fs.transition;Fs.transition=null;try{ft=4,vh(t,e,n,i)}finally{ft=r,Fs.transition=s}}function vh(t,e,n,i){if(Zl){var r=Nf(t,e,n,i);if(r===null)fc(t,e,i,Jl,n),Kp(t,i);else if(Vy(r,t,e,n,i))i.stopPropagation();else if(Kp(t,i),e&4&&-1<Gy.indexOf(t)){for(;r!==null;){var s=_a(r);if(s!==null&&vv(s),s=Nf(t,e,n,i),s===null&&fc(t,e,i,Jl,n),s===r)break;r=s}r!==null&&i.stopPropagation()}else fc(t,e,i,null,n)}}var Jl=null;function Nf(t,e,n,i){if(Jl=null,t=hh(i),t=Or(t),t!==null)if(e=es(t),e===null)t=null;else if(n=e.tag,n===13){if(t=uv(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return Jl=t,null}function Ev(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Ly()){case ph:return 1;case hv:return 4;case ql:case Iy:return 16;case pv:return 536870912;default:return 16}default:return 16}}var ar=null,_h=null,wl=null;function Tv(){if(wl)return wl;var t,e=_h,n=e.length,i,r="value"in ar?ar.value:ar.textContent,s=r.length;for(t=0;t<n&&e[t]===r[t];t++);var o=n-t;for(i=1;i<=o&&e[n-i]===r[s-i];i++);return wl=r.slice(t,1<i?1-i:void 0)}function xl(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function Ia(){return!0}function Jp(){return!1}function Nn(t){function e(n,i,r,s,o){this._reactName=n,this._targetInst=r,this.type=i,this.nativeEvent=s,this.target=o,this.currentTarget=null;for(var a in t)t.hasOwnProperty(a)&&(n=t[a],this[a]=n?n(s):s[a]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?Ia:Jp,this.isPropagationStopped=Jp,this}return xt(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Ia)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Ia)},persist:function(){},isPersistent:Ia}),e}var eo={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Sh=Nn(eo),va=xt({},eo,{view:0,detail:0}),jy=Nn(va),nc,ic,uo,Ru=xt({},va,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:yh,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==uo&&(uo&&t.type==="mousemove"?(nc=t.screenX-uo.screenX,ic=t.screenY-uo.screenY):ic=nc=0,uo=t),nc)},movementY:function(t){return"movementY"in t?t.movementY:ic}}),Qp=Nn(Ru),$y=xt({},Ru,{dataTransfer:0}),Yy=Nn($y),qy=xt({},va,{relatedTarget:0}),rc=Nn(qy),Ky=xt({},eo,{animationName:0,elapsedTime:0,pseudoElement:0}),Zy=Nn(Ky),Jy=xt({},eo,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),Qy=Nn(Jy),e1=xt({},eo,{data:0}),e0=Nn(e1),t1={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},n1={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},i1={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function r1(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=i1[t])?!!e[t]:!1}function yh(){return r1}var s1=xt({},va,{key:function(t){if(t.key){var e=t1[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=xl(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?n1[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:yh,charCode:function(t){return t.type==="keypress"?xl(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?xl(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),o1=Nn(s1),a1=xt({},Ru,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),t0=Nn(a1),l1=xt({},va,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:yh}),u1=Nn(l1),c1=xt({},eo,{propertyName:0,elapsedTime:0,pseudoElement:0}),f1=Nn(c1),d1=xt({},Ru,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),h1=Nn(d1),p1=[9,13,27,32],Mh=Fi&&"CompositionEvent"in window,Uo=null;Fi&&"documentMode"in document&&(Uo=document.documentMode);var m1=Fi&&"TextEvent"in window&&!Uo,bv=Fi&&(!Mh||Uo&&8<Uo&&11>=Uo),n0=" ",i0=!1;function wv(t,e){switch(t){case"keyup":return p1.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function xv(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var Ts=!1;function g1(t,e){switch(t){case"compositionend":return xv(e);case"keypress":return e.which!==32?null:(i0=!0,n0);case"textInput":return t=e.data,t===n0&&i0?null:t;default:return null}}function v1(t,e){if(Ts)return t==="compositionend"||!Mh&&wv(t,e)?(t=Tv(),wl=_h=ar=null,Ts=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return bv&&e.locale!=="ko"?null:e.data;default:return null}}var _1={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function r0(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!_1[t.type]:e==="textarea"}function Av(t,e,n,i){rv(i),e=Ql(e,"onChange"),0<e.length&&(n=new Sh("onChange","change",null,n,i),t.push({event:n,listeners:e}))}var Fo=null,Jo=null;function S1(t){kv(t,0)}function Pu(t){var e=xs(t);if(Zg(e))return t}function y1(t,e){if(t==="change")return e}var Cv=!1;if(Fi){var sc;if(Fi){var oc="oninput"in document;if(!oc){var s0=document.createElement("div");s0.setAttribute("oninput","return;"),oc=typeof s0.oninput=="function"}sc=oc}else sc=!1;Cv=sc&&(!document.documentMode||9<document.documentMode)}function o0(){Fo&&(Fo.detachEvent("onpropertychange",Rv),Jo=Fo=null)}function Rv(t){if(t.propertyName==="value"&&Pu(Jo)){var e=[];Av(e,Jo,t,hh(t)),lv(S1,e)}}function M1(t,e,n){t==="focusin"?(o0(),Fo=e,Jo=n,Fo.attachEvent("onpropertychange",Rv)):t==="focusout"&&o0()}function E1(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Pu(Jo)}function T1(t,e){if(t==="click")return Pu(e)}function b1(t,e){if(t==="input"||t==="change")return Pu(e)}function w1(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var ti=typeof Object.is=="function"?Object.is:w1;function Qo(t,e){if(ti(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),i=Object.keys(e);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var r=n[i];if(!hf.call(e,r)||!ti(t[r],e[r]))return!1}return!0}function a0(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function l0(t,e){var n=a0(t);t=0;for(var i;n;){if(n.nodeType===3){if(i=t+n.textContent.length,t<=e&&i>=e)return{node:n,offset:e-t};t=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=a0(n)}}function Pv(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?Pv(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function Nv(){for(var t=window,e=jl();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=jl(t.document)}return e}function Eh(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function x1(t){var e=Nv(),n=t.focusedElem,i=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&Pv(n.ownerDocument.documentElement,n)){if(i!==null&&Eh(n)){if(e=i.start,t=i.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var r=n.textContent.length,s=Math.min(i.start,r);i=i.end===void 0?s:Math.min(i.end,r),!t.extend&&s>i&&(r=i,i=s,s=r),r=l0(n,s);var o=l0(n,i);r&&o&&(t.rangeCount!==1||t.anchorNode!==r.node||t.anchorOffset!==r.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(r.node,r.offset),t.removeAllRanges(),s>i?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var A1=Fi&&"documentMode"in document&&11>=document.documentMode,bs=null,Lf=null,Oo=null,If=!1;function u0(t,e,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;If||bs==null||bs!==jl(i)||(i=bs,"selectionStart"in i&&Eh(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),Oo&&Qo(Oo,i)||(Oo=i,i=Ql(Lf,"onSelect"),0<i.length&&(e=new Sh("onSelect","select",null,e,n),t.push({event:e,listeners:i}),e.target=bs)))}function Da(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var ws={animationend:Da("Animation","AnimationEnd"),animationiteration:Da("Animation","AnimationIteration"),animationstart:Da("Animation","AnimationStart"),transitionend:Da("Transition","TransitionEnd")},ac={},Lv={};Fi&&(Lv=document.createElement("div").style,"AnimationEvent"in window||(delete ws.animationend.animation,delete ws.animationiteration.animation,delete ws.animationstart.animation),"TransitionEvent"in window||delete ws.transitionend.transition);function Nu(t){if(ac[t])return ac[t];if(!ws[t])return t;var e=ws[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in Lv)return ac[t]=e[n];return t}var Iv=Nu("animationend"),Dv=Nu("animationiteration"),Uv=Nu("animationstart"),Fv=Nu("transitionend"),Ov=new Map,c0="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Mr(t,e){Ov.set(t,e),Qr(e,[t])}for(var lc=0;lc<c0.length;lc++){var uc=c0[lc],C1=uc.toLowerCase(),R1=uc[0].toUpperCase()+uc.slice(1);Mr(C1,"on"+R1)}Mr(Iv,"onAnimationEnd");Mr(Dv,"onAnimationIteration");Mr(Uv,"onAnimationStart");Mr("dblclick","onDoubleClick");Mr("focusin","onFocus");Mr("focusout","onBlur");Mr(Fv,"onTransitionEnd");Gs("onMouseEnter",["mouseout","mouseover"]);Gs("onMouseLeave",["mouseout","mouseover"]);Gs("onPointerEnter",["pointerout","pointerover"]);Gs("onPointerLeave",["pointerout","pointerover"]);Qr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Qr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Qr("onBeforeInput",["compositionend","keypress","textInput","paste"]);Qr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Qr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Qr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Ao="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),P1=new Set("cancel close invalid load scroll toggle".split(" ").concat(Ao));function f0(t,e,n){var i=t.type||"unknown-event";t.currentTarget=n,Cy(i,e,void 0,t),t.currentTarget=null}function kv(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var i=t[n],r=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var o=i.length-1;0<=o;o--){var a=i[o],l=a.instance,u=a.currentTarget;if(a=a.listener,l!==s&&r.isPropagationStopped())break e;f0(r,a,u),s=l}else for(o=0;o<i.length;o++){if(a=i[o],l=a.instance,u=a.currentTarget,a=a.listener,l!==s&&r.isPropagationStopped())break e;f0(r,a,u),s=l}}}if(Yl)throw t=Cf,Yl=!1,Cf=null,t}function _t(t,e){var n=e[kf];n===void 0&&(n=e[kf]=new Set);var i=t+"__bubble";n.has(i)||(Bv(e,t,2,!1),n.add(i))}function cc(t,e,n){var i=0;e&&(i|=4),Bv(n,t,i,e)}var Ua="_reactListening"+Math.random().toString(36).slice(2);function ea(t){if(!t[Ua]){t[Ua]=!0,jg.forEach(function(n){n!=="selectionchange"&&(P1.has(n)||cc(n,!1,t),cc(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[Ua]||(e[Ua]=!0,cc("selectionchange",!1,e))}}function Bv(t,e,n,i){switch(Ev(e)){case 1:var r=Wy;break;case 4:r=Xy;break;default:r=vh}n=r.bind(null,e,n,t),r=void 0,!Af||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),i?r!==void 0?t.addEventListener(e,n,{capture:!0,passive:r}):t.addEventListener(e,n,!0):r!==void 0?t.addEventListener(e,n,{passive:r}):t.addEventListener(e,n,!1)}function fc(t,e,n,i,r){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var o=i.tag;if(o===3||o===4){var a=i.stateNode.containerInfo;if(a===r||a.nodeType===8&&a.parentNode===r)break;if(o===4)for(o=i.return;o!==null;){var l=o.tag;if((l===3||l===4)&&(l=o.stateNode.containerInfo,l===r||l.nodeType===8&&l.parentNode===r))return;o=o.return}for(;a!==null;){if(o=Or(a),o===null)return;if(l=o.tag,l===5||l===6){i=s=o;continue e}a=a.parentNode}}i=i.return}lv(function(){var u=s,c=hh(n),d=[];e:{var f=Ov.get(t);if(f!==void 0){var p=Sh,m=t;switch(t){case"keypress":if(xl(n)===0)break e;case"keydown":case"keyup":p=o1;break;case"focusin":m="focus",p=rc;break;case"focusout":m="blur",p=rc;break;case"beforeblur":case"afterblur":p=rc;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=Qp;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=Yy;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=u1;break;case Iv:case Dv:case Uv:p=Zy;break;case Fv:p=f1;break;case"scroll":p=jy;break;case"wheel":p=h1;break;case"copy":case"cut":case"paste":p=Qy;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=t0}var _=(e&4)!==0,g=!_&&t==="scroll",h=_?f!==null?f+"Capture":null:f;_=[];for(var v=u,S;v!==null;){S=v;var M=S.stateNode;if(S.tag===5&&M!==null&&(S=M,h!==null&&(M=Yo(v,h),M!=null&&_.push(ta(v,M,S)))),g)break;v=v.return}0<_.length&&(f=new p(f,m,null,n,c),d.push({event:f,listeners:_}))}}if(!(e&7)){e:{if(f=t==="mouseover"||t==="pointerover",p=t==="mouseout"||t==="pointerout",f&&n!==wf&&(m=n.relatedTarget||n.fromElement)&&(Or(m)||m[Oi]))break e;if((p||f)&&(f=c.window===c?c:(f=c.ownerDocument)?f.defaultView||f.parentWindow:window,p?(m=n.relatedTarget||n.toElement,p=u,m=m?Or(m):null,m!==null&&(g=es(m),m!==g||m.tag!==5&&m.tag!==6)&&(m=null)):(p=null,m=u),p!==m)){if(_=Qp,M="onMouseLeave",h="onMouseEnter",v="mouse",(t==="pointerout"||t==="pointerover")&&(_=t0,M="onPointerLeave",h="onPointerEnter",v="pointer"),g=p==null?f:xs(p),S=m==null?f:xs(m),f=new _(M,v+"leave",p,n,c),f.target=g,f.relatedTarget=S,M=null,Or(c)===u&&(_=new _(h,v+"enter",m,n,c),_.target=S,_.relatedTarget=g,M=_),g=M,p&&m)t:{for(_=p,h=m,v=0,S=_;S;S=ss(S))v++;for(S=0,M=h;M;M=ss(M))S++;for(;0<v-S;)_=ss(_),v--;for(;0<S-v;)h=ss(h),S--;for(;v--;){if(_===h||h!==null&&_===h.alternate)break t;_=ss(_),h=ss(h)}_=null}else _=null;p!==null&&d0(d,f,p,_,!1),m!==null&&g!==null&&d0(d,g,m,_,!0)}}e:{if(f=u?xs(u):window,p=f.nodeName&&f.nodeName.toLowerCase(),p==="select"||p==="input"&&f.type==="file")var T=y1;else if(r0(f))if(Cv)T=b1;else{T=E1;var b=M1}else(p=f.nodeName)&&p.toLowerCase()==="input"&&(f.type==="checkbox"||f.type==="radio")&&(T=T1);if(T&&(T=T(t,u))){Av(d,T,n,c);break e}b&&b(t,f,u),t==="focusout"&&(b=f._wrapperState)&&b.controlled&&f.type==="number"&&yf(f,"number",f.value)}switch(b=u?xs(u):window,t){case"focusin":(r0(b)||b.contentEditable==="true")&&(bs=b,Lf=u,Oo=null);break;case"focusout":Oo=Lf=bs=null;break;case"mousedown":If=!0;break;case"contextmenu":case"mouseup":case"dragend":If=!1,u0(d,n,c);break;case"selectionchange":if(A1)break;case"keydown":case"keyup":u0(d,n,c)}var w;if(Mh)e:{switch(t){case"compositionstart":var y="onCompositionStart";break e;case"compositionend":y="onCompositionEnd";break e;case"compositionupdate":y="onCompositionUpdate";break e}y=void 0}else Ts?wv(t,n)&&(y="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(y="onCompositionStart");y&&(bv&&n.locale!=="ko"&&(Ts||y!=="onCompositionStart"?y==="onCompositionEnd"&&Ts&&(w=Tv()):(ar=c,_h="value"in ar?ar.value:ar.textContent,Ts=!0)),b=Ql(u,y),0<b.length&&(y=new e0(y,t,null,n,c),d.push({event:y,listeners:b}),w?y.data=w:(w=xv(n),w!==null&&(y.data=w)))),(w=m1?g1(t,n):v1(t,n))&&(u=Ql(u,"onBeforeInput"),0<u.length&&(c=new e0("onBeforeInput","beforeinput",null,n,c),d.push({event:c,listeners:u}),c.data=w))}kv(d,e)})}function ta(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Ql(t,e){for(var n=e+"Capture",i=[];t!==null;){var r=t,s=r.stateNode;r.tag===5&&s!==null&&(r=s,s=Yo(t,n),s!=null&&i.unshift(ta(t,s,r)),s=Yo(t,e),s!=null&&i.push(ta(t,s,r))),t=t.return}return i}function ss(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function d0(t,e,n,i,r){for(var s=e._reactName,o=[];n!==null&&n!==i;){var a=n,l=a.alternate,u=a.stateNode;if(l!==null&&l===i)break;a.tag===5&&u!==null&&(a=u,r?(l=Yo(n,s),l!=null&&o.unshift(ta(n,l,a))):r||(l=Yo(n,s),l!=null&&o.push(ta(n,l,a)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var N1=/\r\n?/g,L1=/\u0000|\uFFFD/g;function h0(t){return(typeof t=="string"?t:""+t).replace(N1,`
`).replace(L1,"")}function Fa(t,e,n){if(e=h0(e),h0(t)!==e&&n)throw Error(fe(425))}function eu(){}var Df=null,Uf=null;function Ff(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Of=typeof setTimeout=="function"?setTimeout:void 0,I1=typeof clearTimeout=="function"?clearTimeout:void 0,p0=typeof Promise=="function"?Promise:void 0,D1=typeof queueMicrotask=="function"?queueMicrotask:typeof p0<"u"?function(t){return p0.resolve(null).then(t).catch(U1)}:Of;function U1(t){setTimeout(function(){throw t})}function dc(t,e){var n=e,i=0;do{var r=n.nextSibling;if(t.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"){if(i===0){t.removeChild(r),Zo(e);return}i--}else n!=="$"&&n!=="$?"&&n!=="$!"||i++;n=r}while(n);Zo(e)}function hr(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function m0(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var to=Math.random().toString(36).slice(2),ci="__reactFiber$"+to,na="__reactProps$"+to,Oi="__reactContainer$"+to,kf="__reactEvents$"+to,F1="__reactListeners$"+to,O1="__reactHandles$"+to;function Or(t){var e=t[ci];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Oi]||n[ci]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=m0(t);t!==null;){if(n=t[ci])return n;t=m0(t)}return e}t=n,n=t.parentNode}return null}function _a(t){return t=t[ci]||t[Oi],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function xs(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(fe(33))}function Lu(t){return t[na]||null}var Bf=[],As=-1;function Er(t){return{current:t}}function yt(t){0>As||(t.current=Bf[As],Bf[As]=null,As--)}function vt(t,e){As++,Bf[As]=t.current,t.current=e}var Sr={},sn=Er(Sr),gn=Er(!1),Xr=Sr;function Vs(t,e){var n=t.type.contextTypes;if(!n)return Sr;var i=t.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===e)return i.__reactInternalMemoizedMaskedChildContext;var r={},s;for(s in n)r[s]=e[s];return i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=r),r}function vn(t){return t=t.childContextTypes,t!=null}function tu(){yt(gn),yt(sn)}function g0(t,e,n){if(sn.current!==Sr)throw Error(fe(168));vt(sn,e),vt(gn,n)}function zv(t,e,n){var i=t.stateNode;if(e=e.childContextTypes,typeof i.getChildContext!="function")return n;i=i.getChildContext();for(var r in i)if(!(r in e))throw Error(fe(108,My(t)||"Unknown",r));return xt({},n,i)}function nu(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||Sr,Xr=sn.current,vt(sn,t),vt(gn,gn.current),!0}function v0(t,e,n){var i=t.stateNode;if(!i)throw Error(fe(169));n?(t=zv(t,e,Xr),i.__reactInternalMemoizedMergedChildContext=t,yt(gn),yt(sn),vt(sn,t)):yt(gn),vt(gn,n)}var Ri=null,Iu=!1,hc=!1;function Gv(t){Ri===null?Ri=[t]:Ri.push(t)}function k1(t){Iu=!0,Gv(t)}function Tr(){if(!hc&&Ri!==null){hc=!0;var t=0,e=ft;try{var n=Ri;for(ft=1;t<n.length;t++){var i=n[t];do i=i(!0);while(i!==null)}Ri=null,Iu=!1}catch(r){throw Ri!==null&&(Ri=Ri.slice(t+1)),dv(ph,Tr),r}finally{ft=e,hc=!1}}return null}var Cs=[],Rs=0,iu=null,ru=0,Un=[],Fn=0,jr=null,Pi=1,Ni="";function Pr(t,e){Cs[Rs++]=ru,Cs[Rs++]=iu,iu=t,ru=e}function Vv(t,e,n){Un[Fn++]=Pi,Un[Fn++]=Ni,Un[Fn++]=jr,jr=t;var i=Pi;t=Ni;var r=32-Qn(i)-1;i&=~(1<<r),n+=1;var s=32-Qn(e)+r;if(30<s){var o=r-r%5;s=(i&(1<<o)-1).toString(32),i>>=o,r-=o,Pi=1<<32-Qn(e)+r|n<<r|i,Ni=s+t}else Pi=1<<s|n<<r|i,Ni=t}function Th(t){t.return!==null&&(Pr(t,1),Vv(t,1,0))}function bh(t){for(;t===iu;)iu=Cs[--Rs],Cs[Rs]=null,ru=Cs[--Rs],Cs[Rs]=null;for(;t===jr;)jr=Un[--Fn],Un[Fn]=null,Ni=Un[--Fn],Un[Fn]=null,Pi=Un[--Fn],Un[Fn]=null}var An=null,xn=null,Mt=!1,Kn=null;function Hv(t,e){var n=On(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function _0(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,An=t,xn=hr(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,An=t,xn=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=jr!==null?{id:Pi,overflow:Ni}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=On(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,An=t,xn=null,!0):!1;default:return!1}}function zf(t){return(t.mode&1)!==0&&(t.flags&128)===0}function Gf(t){if(Mt){var e=xn;if(e){var n=e;if(!_0(t,e)){if(zf(t))throw Error(fe(418));e=hr(n.nextSibling);var i=An;e&&_0(t,e)?Hv(i,n):(t.flags=t.flags&-4097|2,Mt=!1,An=t)}}else{if(zf(t))throw Error(fe(418));t.flags=t.flags&-4097|2,Mt=!1,An=t}}}function S0(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;An=t}function Oa(t){if(t!==An)return!1;if(!Mt)return S0(t),Mt=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!Ff(t.type,t.memoizedProps)),e&&(e=xn)){if(zf(t))throw Wv(),Error(fe(418));for(;e;)Hv(t,e),e=hr(e.nextSibling)}if(S0(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(fe(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){xn=hr(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}xn=null}}else xn=An?hr(t.stateNode.nextSibling):null;return!0}function Wv(){for(var t=xn;t;)t=hr(t.nextSibling)}function Hs(){xn=An=null,Mt=!1}function wh(t){Kn===null?Kn=[t]:Kn.push(t)}var B1=Vi.ReactCurrentBatchConfig;function co(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(fe(309));var i=n.stateNode}if(!i)throw Error(fe(147,t));var r=i,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(o){var a=r.refs;o===null?delete a[s]:a[s]=o},e._stringRef=s,e)}if(typeof t!="string")throw Error(fe(284));if(!n._owner)throw Error(fe(290,t))}return t}function ka(t,e){throw t=Object.prototype.toString.call(e),Error(fe(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function y0(t){var e=t._init;return e(t._payload)}function Xv(t){function e(h,v){if(t){var S=h.deletions;S===null?(h.deletions=[v],h.flags|=16):S.push(v)}}function n(h,v){if(!t)return null;for(;v!==null;)e(h,v),v=v.sibling;return null}function i(h,v){for(h=new Map;v!==null;)v.key!==null?h.set(v.key,v):h.set(v.index,v),v=v.sibling;return h}function r(h,v){return h=vr(h,v),h.index=0,h.sibling=null,h}function s(h,v,S){return h.index=S,t?(S=h.alternate,S!==null?(S=S.index,S<v?(h.flags|=2,v):S):(h.flags|=2,v)):(h.flags|=1048576,v)}function o(h){return t&&h.alternate===null&&(h.flags|=2),h}function a(h,v,S,M){return v===null||v.tag!==6?(v=yc(S,h.mode,M),v.return=h,v):(v=r(v,S),v.return=h,v)}function l(h,v,S,M){var T=S.type;return T===Es?c(h,v,S.props.children,M,S.key):v!==null&&(v.elementType===T||typeof T=="object"&&T!==null&&T.$$typeof===er&&y0(T)===v.type)?(M=r(v,S.props),M.ref=co(h,v,S),M.return=h,M):(M=Il(S.type,S.key,S.props,null,h.mode,M),M.ref=co(h,v,S),M.return=h,M)}function u(h,v,S,M){return v===null||v.tag!==4||v.stateNode.containerInfo!==S.containerInfo||v.stateNode.implementation!==S.implementation?(v=Mc(S,h.mode,M),v.return=h,v):(v=r(v,S.children||[]),v.return=h,v)}function c(h,v,S,M,T){return v===null||v.tag!==7?(v=Hr(S,h.mode,M,T),v.return=h,v):(v=r(v,S),v.return=h,v)}function d(h,v,S){if(typeof v=="string"&&v!==""||typeof v=="number")return v=yc(""+v,h.mode,S),v.return=h,v;if(typeof v=="object"&&v!==null){switch(v.$$typeof){case Aa:return S=Il(v.type,v.key,v.props,null,h.mode,S),S.ref=co(h,null,v),S.return=h,S;case Ms:return v=Mc(v,h.mode,S),v.return=h,v;case er:var M=v._init;return d(h,M(v._payload),S)}if(wo(v)||so(v))return v=Hr(v,h.mode,S,null),v.return=h,v;ka(h,v)}return null}function f(h,v,S,M){var T=v!==null?v.key:null;if(typeof S=="string"&&S!==""||typeof S=="number")return T!==null?null:a(h,v,""+S,M);if(typeof S=="object"&&S!==null){switch(S.$$typeof){case Aa:return S.key===T?l(h,v,S,M):null;case Ms:return S.key===T?u(h,v,S,M):null;case er:return T=S._init,f(h,v,T(S._payload),M)}if(wo(S)||so(S))return T!==null?null:c(h,v,S,M,null);ka(h,S)}return null}function p(h,v,S,M,T){if(typeof M=="string"&&M!==""||typeof M=="number")return h=h.get(S)||null,a(v,h,""+M,T);if(typeof M=="object"&&M!==null){switch(M.$$typeof){case Aa:return h=h.get(M.key===null?S:M.key)||null,l(v,h,M,T);case Ms:return h=h.get(M.key===null?S:M.key)||null,u(v,h,M,T);case er:var b=M._init;return p(h,v,S,b(M._payload),T)}if(wo(M)||so(M))return h=h.get(S)||null,c(v,h,M,T,null);ka(v,M)}return null}function m(h,v,S,M){for(var T=null,b=null,w=v,y=v=0,C=null;w!==null&&y<S.length;y++){w.index>y?(C=w,w=null):C=w.sibling;var R=f(h,w,S[y],M);if(R===null){w===null&&(w=C);break}t&&w&&R.alternate===null&&e(h,w),v=s(R,v,y),b===null?T=R:b.sibling=R,b=R,w=C}if(y===S.length)return n(h,w),Mt&&Pr(h,y),T;if(w===null){for(;y<S.length;y++)w=d(h,S[y],M),w!==null&&(v=s(w,v,y),b===null?T=w:b.sibling=w,b=w);return Mt&&Pr(h,y),T}for(w=i(h,w);y<S.length;y++)C=p(w,h,y,S[y],M),C!==null&&(t&&C.alternate!==null&&w.delete(C.key===null?y:C.key),v=s(C,v,y),b===null?T=C:b.sibling=C,b=C);return t&&w.forEach(function(N){return e(h,N)}),Mt&&Pr(h,y),T}function _(h,v,S,M){var T=so(S);if(typeof T!="function")throw Error(fe(150));if(S=T.call(S),S==null)throw Error(fe(151));for(var b=T=null,w=v,y=v=0,C=null,R=S.next();w!==null&&!R.done;y++,R=S.next()){w.index>y?(C=w,w=null):C=w.sibling;var N=f(h,w,R.value,M);if(N===null){w===null&&(w=C);break}t&&w&&N.alternate===null&&e(h,w),v=s(N,v,y),b===null?T=N:b.sibling=N,b=N,w=C}if(R.done)return n(h,w),Mt&&Pr(h,y),T;if(w===null){for(;!R.done;y++,R=S.next())R=d(h,R.value,M),R!==null&&(v=s(R,v,y),b===null?T=R:b.sibling=R,b=R);return Mt&&Pr(h,y),T}for(w=i(h,w);!R.done;y++,R=S.next())R=p(w,h,y,R.value,M),R!==null&&(t&&R.alternate!==null&&w.delete(R.key===null?y:R.key),v=s(R,v,y),b===null?T=R:b.sibling=R,b=R);return t&&w.forEach(function(I){return e(h,I)}),Mt&&Pr(h,y),T}function g(h,v,S,M){if(typeof S=="object"&&S!==null&&S.type===Es&&S.key===null&&(S=S.props.children),typeof S=="object"&&S!==null){switch(S.$$typeof){case Aa:e:{for(var T=S.key,b=v;b!==null;){if(b.key===T){if(T=S.type,T===Es){if(b.tag===7){n(h,b.sibling),v=r(b,S.props.children),v.return=h,h=v;break e}}else if(b.elementType===T||typeof T=="object"&&T!==null&&T.$$typeof===er&&y0(T)===b.type){n(h,b.sibling),v=r(b,S.props),v.ref=co(h,b,S),v.return=h,h=v;break e}n(h,b);break}else e(h,b);b=b.sibling}S.type===Es?(v=Hr(S.props.children,h.mode,M,S.key),v.return=h,h=v):(M=Il(S.type,S.key,S.props,null,h.mode,M),M.ref=co(h,v,S),M.return=h,h=M)}return o(h);case Ms:e:{for(b=S.key;v!==null;){if(v.key===b)if(v.tag===4&&v.stateNode.containerInfo===S.containerInfo&&v.stateNode.implementation===S.implementation){n(h,v.sibling),v=r(v,S.children||[]),v.return=h,h=v;break e}else{n(h,v);break}else e(h,v);v=v.sibling}v=Mc(S,h.mode,M),v.return=h,h=v}return o(h);case er:return b=S._init,g(h,v,b(S._payload),M)}if(wo(S))return m(h,v,S,M);if(so(S))return _(h,v,S,M);ka(h,S)}return typeof S=="string"&&S!==""||typeof S=="number"?(S=""+S,v!==null&&v.tag===6?(n(h,v.sibling),v=r(v,S),v.return=h,h=v):(n(h,v),v=yc(S,h.mode,M),v.return=h,h=v),o(h)):n(h,v)}return g}var Ws=Xv(!0),jv=Xv(!1),su=Er(null),ou=null,Ps=null,xh=null;function Ah(){xh=Ps=ou=null}function Ch(t){var e=su.current;yt(su),t._currentValue=e}function Vf(t,e,n){for(;t!==null;){var i=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),t===n)break;t=t.return}}function Os(t,e){ou=t,xh=Ps=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(mn=!0),t.firstContext=null)}function zn(t){var e=t._currentValue;if(xh!==t)if(t={context:t,memoizedValue:e,next:null},Ps===null){if(ou===null)throw Error(fe(308));Ps=t,ou.dependencies={lanes:0,firstContext:t}}else Ps=Ps.next=t;return e}var kr=null;function Rh(t){kr===null?kr=[t]:kr.push(t)}function $v(t,e,n,i){var r=e.interleaved;return r===null?(n.next=n,Rh(e)):(n.next=r.next,r.next=n),e.interleaved=n,ki(t,i)}function ki(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var tr=!1;function Ph(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Yv(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function Ii(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function pr(t,e,n){var i=t.updateQueue;if(i===null)return null;if(i=i.shared,at&2){var r=i.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),i.pending=e,ki(t,n)}return r=i.interleaved,r===null?(e.next=e,Rh(i)):(e.next=r.next,r.next=e),i.interleaved=e,ki(t,n)}function Al(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,mh(t,n)}}function M0(t,e){var n=t.updateQueue,i=t.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var r=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?r=s=o:s=s.next=o,n=n.next}while(n!==null);s===null?r=s=e:s=s.next=e}else r=s=e;n={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:s,shared:i.shared,effects:i.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function au(t,e,n,i){var r=t.updateQueue;tr=!1;var s=r.firstBaseUpdate,o=r.lastBaseUpdate,a=r.shared.pending;if(a!==null){r.shared.pending=null;var l=a,u=l.next;l.next=null,o===null?s=u:o.next=u,o=l;var c=t.alternate;c!==null&&(c=c.updateQueue,a=c.lastBaseUpdate,a!==o&&(a===null?c.firstBaseUpdate=u:a.next=u,c.lastBaseUpdate=l))}if(s!==null){var d=r.baseState;o=0,c=u=l=null,a=s;do{var f=a.lane,p=a.eventTime;if((i&f)===f){c!==null&&(c=c.next={eventTime:p,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var m=t,_=a;switch(f=e,p=n,_.tag){case 1:if(m=_.payload,typeof m=="function"){d=m.call(p,d,f);break e}d=m;break e;case 3:m.flags=m.flags&-65537|128;case 0:if(m=_.payload,f=typeof m=="function"?m.call(p,d,f):m,f==null)break e;d=xt({},d,f);break e;case 2:tr=!0}}a.callback!==null&&a.lane!==0&&(t.flags|=64,f=r.effects,f===null?r.effects=[a]:f.push(a))}else p={eventTime:p,lane:f,tag:a.tag,payload:a.payload,callback:a.callback,next:null},c===null?(u=c=p,l=d):c=c.next=p,o|=f;if(a=a.next,a===null){if(a=r.shared.pending,a===null)break;f=a,a=f.next,f.next=null,r.lastBaseUpdate=f,r.shared.pending=null}}while(!0);if(c===null&&(l=d),r.baseState=l,r.firstBaseUpdate=u,r.lastBaseUpdate=c,e=r.shared.interleaved,e!==null){r=e;do o|=r.lane,r=r.next;while(r!==e)}else s===null&&(r.shared.lanes=0);Yr|=o,t.lanes=o,t.memoizedState=d}}function E0(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var i=t[e],r=i.callback;if(r!==null){if(i.callback=null,i=n,typeof r!="function")throw Error(fe(191,r));r.call(i)}}}var Sa={},mi=Er(Sa),ia=Er(Sa),ra=Er(Sa);function Br(t){if(t===Sa)throw Error(fe(174));return t}function Nh(t,e){switch(vt(ra,e),vt(ia,t),vt(mi,Sa),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:Ef(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=Ef(e,t)}yt(mi),vt(mi,e)}function Xs(){yt(mi),yt(ia),yt(ra)}function qv(t){Br(ra.current);var e=Br(mi.current),n=Ef(e,t.type);e!==n&&(vt(ia,t),vt(mi,n))}function Lh(t){ia.current===t&&(yt(mi),yt(ia))}var Tt=Er(0);function lu(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var pc=[];function Ih(){for(var t=0;t<pc.length;t++)pc[t]._workInProgressVersionPrimary=null;pc.length=0}var Cl=Vi.ReactCurrentDispatcher,mc=Vi.ReactCurrentBatchConfig,$r=0,wt=null,Ot=null,Ht=null,uu=!1,ko=!1,sa=0,z1=0;function Zt(){throw Error(fe(321))}function Dh(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!ti(t[n],e[n]))return!1;return!0}function Uh(t,e,n,i,r,s){if($r=s,wt=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,Cl.current=t===null||t.memoizedState===null?W1:X1,t=n(i,r),ko){s=0;do{if(ko=!1,sa=0,25<=s)throw Error(fe(301));s+=1,Ht=Ot=null,e.updateQueue=null,Cl.current=j1,t=n(i,r)}while(ko)}if(Cl.current=cu,e=Ot!==null&&Ot.next!==null,$r=0,Ht=Ot=wt=null,uu=!1,e)throw Error(fe(300));return t}function Fh(){var t=sa!==0;return sa=0,t}function li(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ht===null?wt.memoizedState=Ht=t:Ht=Ht.next=t,Ht}function Gn(){if(Ot===null){var t=wt.alternate;t=t!==null?t.memoizedState:null}else t=Ot.next;var e=Ht===null?wt.memoizedState:Ht.next;if(e!==null)Ht=e,Ot=t;else{if(t===null)throw Error(fe(310));Ot=t,t={memoizedState:Ot.memoizedState,baseState:Ot.baseState,baseQueue:Ot.baseQueue,queue:Ot.queue,next:null},Ht===null?wt.memoizedState=Ht=t:Ht=Ht.next=t}return Ht}function oa(t,e){return typeof e=="function"?e(t):e}function gc(t){var e=Gn(),n=e.queue;if(n===null)throw Error(fe(311));n.lastRenderedReducer=t;var i=Ot,r=i.baseQueue,s=n.pending;if(s!==null){if(r!==null){var o=r.next;r.next=s.next,s.next=o}i.baseQueue=r=s,n.pending=null}if(r!==null){s=r.next,i=i.baseState;var a=o=null,l=null,u=s;do{var c=u.lane;if(($r&c)===c)l!==null&&(l=l.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),i=u.hasEagerState?u.eagerState:t(i,u.action);else{var d={lane:c,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};l===null?(a=l=d,o=i):l=l.next=d,wt.lanes|=c,Yr|=c}u=u.next}while(u!==null&&u!==s);l===null?o=i:l.next=a,ti(i,e.memoizedState)||(mn=!0),e.memoizedState=i,e.baseState=o,e.baseQueue=l,n.lastRenderedState=i}if(t=n.interleaved,t!==null){r=t;do s=r.lane,wt.lanes|=s,Yr|=s,r=r.next;while(r!==t)}else r===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function vc(t){var e=Gn(),n=e.queue;if(n===null)throw Error(fe(311));n.lastRenderedReducer=t;var i=n.dispatch,r=n.pending,s=e.memoizedState;if(r!==null){n.pending=null;var o=r=r.next;do s=t(s,o.action),o=o.next;while(o!==r);ti(s,e.memoizedState)||(mn=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,i]}function Kv(){}function Zv(t,e){var n=wt,i=Gn(),r=e(),s=!ti(i.memoizedState,r);if(s&&(i.memoizedState=r,mn=!0),i=i.queue,Oh(e_.bind(null,n,i,t),[t]),i.getSnapshot!==e||s||Ht!==null&&Ht.memoizedState.tag&1){if(n.flags|=2048,aa(9,Qv.bind(null,n,i,r,e),void 0,null),Wt===null)throw Error(fe(349));$r&30||Jv(n,e,r)}return r}function Jv(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=wt.updateQueue,e===null?(e={lastEffect:null,stores:null},wt.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function Qv(t,e,n,i){e.value=n,e.getSnapshot=i,t_(e)&&n_(t)}function e_(t,e,n){return n(function(){t_(e)&&n_(t)})}function t_(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!ti(t,n)}catch{return!0}}function n_(t){var e=ki(t,1);e!==null&&ei(e,t,1,-1)}function T0(t){var e=li();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:oa,lastRenderedState:t},e.queue=t,t=t.dispatch=H1.bind(null,wt,t),[e.memoizedState,t]}function aa(t,e,n,i){return t={tag:t,create:e,destroy:n,deps:i,next:null},e=wt.updateQueue,e===null?(e={lastEffect:null,stores:null},wt.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(i=n.next,n.next=t,t.next=i,e.lastEffect=t)),t}function i_(){return Gn().memoizedState}function Rl(t,e,n,i){var r=li();wt.flags|=t,r.memoizedState=aa(1|e,n,void 0,i===void 0?null:i)}function Du(t,e,n,i){var r=Gn();i=i===void 0?null:i;var s=void 0;if(Ot!==null){var o=Ot.memoizedState;if(s=o.destroy,i!==null&&Dh(i,o.deps)){r.memoizedState=aa(e,n,s,i);return}}wt.flags|=t,r.memoizedState=aa(1|e,n,s,i)}function b0(t,e){return Rl(8390656,8,t,e)}function Oh(t,e){return Du(2048,8,t,e)}function r_(t,e){return Du(4,2,t,e)}function s_(t,e){return Du(4,4,t,e)}function o_(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function a_(t,e,n){return n=n!=null?n.concat([t]):null,Du(4,4,o_.bind(null,e,t),n)}function kh(){}function l_(t,e){var n=Gn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&Dh(e,i[1])?i[0]:(n.memoizedState=[t,e],t)}function u_(t,e){var n=Gn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&Dh(e,i[1])?i[0]:(t=t(),n.memoizedState=[t,e],t)}function c_(t,e,n){return $r&21?(ti(n,e)||(n=mv(),wt.lanes|=n,Yr|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,mn=!0),t.memoizedState=n)}function G1(t,e){var n=ft;ft=n!==0&&4>n?n:4,t(!0);var i=mc.transition;mc.transition={};try{t(!1),e()}finally{ft=n,mc.transition=i}}function f_(){return Gn().memoizedState}function V1(t,e,n){var i=gr(t);if(n={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null},d_(t))h_(e,n);else if(n=$v(t,e,n,i),n!==null){var r=un();ei(n,t,i,r),p_(n,e,i)}}function H1(t,e,n){var i=gr(t),r={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null};if(d_(t))h_(e,r);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var o=e.lastRenderedState,a=s(o,n);if(r.hasEagerState=!0,r.eagerState=a,ti(a,o)){var l=e.interleaved;l===null?(r.next=r,Rh(e)):(r.next=l.next,l.next=r),e.interleaved=r;return}}catch{}finally{}n=$v(t,e,r,i),n!==null&&(r=un(),ei(n,t,i,r),p_(n,e,i))}}function d_(t){var e=t.alternate;return t===wt||e!==null&&e===wt}function h_(t,e){ko=uu=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function p_(t,e,n){if(n&4194240){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,mh(t,n)}}var cu={readContext:zn,useCallback:Zt,useContext:Zt,useEffect:Zt,useImperativeHandle:Zt,useInsertionEffect:Zt,useLayoutEffect:Zt,useMemo:Zt,useReducer:Zt,useRef:Zt,useState:Zt,useDebugValue:Zt,useDeferredValue:Zt,useTransition:Zt,useMutableSource:Zt,useSyncExternalStore:Zt,useId:Zt,unstable_isNewReconciler:!1},W1={readContext:zn,useCallback:function(t,e){return li().memoizedState=[t,e===void 0?null:e],t},useContext:zn,useEffect:b0,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,Rl(4194308,4,o_.bind(null,e,t),n)},useLayoutEffect:function(t,e){return Rl(4194308,4,t,e)},useInsertionEffect:function(t,e){return Rl(4,2,t,e)},useMemo:function(t,e){var n=li();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var i=li();return e=n!==void 0?n(e):e,i.memoizedState=i.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},i.queue=t,t=t.dispatch=V1.bind(null,wt,t),[i.memoizedState,t]},useRef:function(t){var e=li();return t={current:t},e.memoizedState=t},useState:T0,useDebugValue:kh,useDeferredValue:function(t){return li().memoizedState=t},useTransition:function(){var t=T0(!1),e=t[0];return t=G1.bind(null,t[1]),li().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var i=wt,r=li();if(Mt){if(n===void 0)throw Error(fe(407));n=n()}else{if(n=e(),Wt===null)throw Error(fe(349));$r&30||Jv(i,e,n)}r.memoizedState=n;var s={value:n,getSnapshot:e};return r.queue=s,b0(e_.bind(null,i,s,t),[t]),i.flags|=2048,aa(9,Qv.bind(null,i,s,n,e),void 0,null),n},useId:function(){var t=li(),e=Wt.identifierPrefix;if(Mt){var n=Ni,i=Pi;n=(i&~(1<<32-Qn(i)-1)).toString(32)+n,e=":"+e+"R"+n,n=sa++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=z1++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},X1={readContext:zn,useCallback:l_,useContext:zn,useEffect:Oh,useImperativeHandle:a_,useInsertionEffect:r_,useLayoutEffect:s_,useMemo:u_,useReducer:gc,useRef:i_,useState:function(){return gc(oa)},useDebugValue:kh,useDeferredValue:function(t){var e=Gn();return c_(e,Ot.memoizedState,t)},useTransition:function(){var t=gc(oa)[0],e=Gn().memoizedState;return[t,e]},useMutableSource:Kv,useSyncExternalStore:Zv,useId:f_,unstable_isNewReconciler:!1},j1={readContext:zn,useCallback:l_,useContext:zn,useEffect:Oh,useImperativeHandle:a_,useInsertionEffect:r_,useLayoutEffect:s_,useMemo:u_,useReducer:vc,useRef:i_,useState:function(){return vc(oa)},useDebugValue:kh,useDeferredValue:function(t){var e=Gn();return Ot===null?e.memoizedState=t:c_(e,Ot.memoizedState,t)},useTransition:function(){var t=vc(oa)[0],e=Gn().memoizedState;return[t,e]},useMutableSource:Kv,useSyncExternalStore:Zv,useId:f_,unstable_isNewReconciler:!1};function $n(t,e){if(t&&t.defaultProps){e=xt({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function Hf(t,e,n,i){e=t.memoizedState,n=n(i,e),n=n==null?e:xt({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var Uu={isMounted:function(t){return(t=t._reactInternals)?es(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var i=un(),r=gr(t),s=Ii(i,r);s.payload=e,n!=null&&(s.callback=n),e=pr(t,s,r),e!==null&&(ei(e,t,r,i),Al(e,t,r))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var i=un(),r=gr(t),s=Ii(i,r);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=pr(t,s,r),e!==null&&(ei(e,t,r,i),Al(e,t,r))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=un(),i=gr(t),r=Ii(n,i);r.tag=2,e!=null&&(r.callback=e),e=pr(t,r,i),e!==null&&(ei(e,t,i,n),Al(e,t,i))}};function w0(t,e,n,i,r,s,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(i,s,o):e.prototype&&e.prototype.isPureReactComponent?!Qo(n,i)||!Qo(r,s):!0}function m_(t,e,n){var i=!1,r=Sr,s=e.contextType;return typeof s=="object"&&s!==null?s=zn(s):(r=vn(e)?Xr:sn.current,i=e.contextTypes,s=(i=i!=null)?Vs(t,r):Sr),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=Uu,t.stateNode=e,e._reactInternals=t,i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=r,t.__reactInternalMemoizedMaskedChildContext=s),e}function x0(t,e,n,i){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,i),e.state!==t&&Uu.enqueueReplaceState(e,e.state,null)}function Wf(t,e,n,i){var r=t.stateNode;r.props=n,r.state=t.memoizedState,r.refs={},Ph(t);var s=e.contextType;typeof s=="object"&&s!==null?r.context=zn(s):(s=vn(e)?Xr:sn.current,r.context=Vs(t,s)),r.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(Hf(t,e,s,n),r.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(e=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),e!==r.state&&Uu.enqueueReplaceState(r,r.state,null),au(t,n,r,i),r.state=t.memoizedState),typeof r.componentDidMount=="function"&&(t.flags|=4194308)}function js(t,e){try{var n="",i=e;do n+=yy(i),i=i.return;while(i);var r=n}catch(s){r=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:r,digest:null}}function _c(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function Xf(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var $1=typeof WeakMap=="function"?WeakMap:Map;function g_(t,e,n){n=Ii(-1,n),n.tag=3,n.payload={element:null};var i=e.value;return n.callback=function(){du||(du=!0,td=i),Xf(t,e)},n}function v_(t,e,n){n=Ii(-1,n),n.tag=3;var i=t.type.getDerivedStateFromError;if(typeof i=="function"){var r=e.value;n.payload=function(){return i(r)},n.callback=function(){Xf(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){Xf(t,e),typeof i!="function"&&(mr===null?mr=new Set([this]):mr.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function A0(t,e,n){var i=t.pingCache;if(i===null){i=t.pingCache=new $1;var r=new Set;i.set(e,r)}else r=i.get(e),r===void 0&&(r=new Set,i.set(e,r));r.has(n)||(r.add(n),t=aM.bind(null,t,e,n),e.then(t,t))}function C0(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function R0(t,e,n,i,r){return t.mode&1?(t.flags|=65536,t.lanes=r,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=Ii(-1,1),e.tag=2,pr(n,e,1))),n.lanes|=1),t)}var Y1=Vi.ReactCurrentOwner,mn=!1;function ln(t,e,n,i){e.child=t===null?jv(e,null,n,i):Ws(e,t.child,n,i)}function P0(t,e,n,i,r){n=n.render;var s=e.ref;return Os(e,r),i=Uh(t,e,n,i,s,r),n=Fh(),t!==null&&!mn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Bi(t,e,r)):(Mt&&n&&Th(e),e.flags|=1,ln(t,e,i,r),e.child)}function N0(t,e,n,i,r){if(t===null){var s=n.type;return typeof s=="function"&&!jh(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,__(t,e,s,i,r)):(t=Il(n.type,null,i,e,e.mode,r),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&r)){var o=s.memoizedProps;if(n=n.compare,n=n!==null?n:Qo,n(o,i)&&t.ref===e.ref)return Bi(t,e,r)}return e.flags|=1,t=vr(s,i),t.ref=e.ref,t.return=e,e.child=t}function __(t,e,n,i,r){if(t!==null){var s=t.memoizedProps;if(Qo(s,i)&&t.ref===e.ref)if(mn=!1,e.pendingProps=i=s,(t.lanes&r)!==0)t.flags&131072&&(mn=!0);else return e.lanes=t.lanes,Bi(t,e,r)}return jf(t,e,n,i,r)}function S_(t,e,n){var i=e.pendingProps,r=i.children,s=t!==null?t.memoizedState:null;if(i.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},vt(Ls,Tn),Tn|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,vt(Ls,Tn),Tn|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=s!==null?s.baseLanes:n,vt(Ls,Tn),Tn|=i}else s!==null?(i=s.baseLanes|n,e.memoizedState=null):i=n,vt(Ls,Tn),Tn|=i;return ln(t,e,r,n),e.child}function y_(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function jf(t,e,n,i,r){var s=vn(n)?Xr:sn.current;return s=Vs(e,s),Os(e,r),n=Uh(t,e,n,i,s,r),i=Fh(),t!==null&&!mn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Bi(t,e,r)):(Mt&&i&&Th(e),e.flags|=1,ln(t,e,n,r),e.child)}function L0(t,e,n,i,r){if(vn(n)){var s=!0;nu(e)}else s=!1;if(Os(e,r),e.stateNode===null)Pl(t,e),m_(e,n,i),Wf(e,n,i,r),i=!0;else if(t===null){var o=e.stateNode,a=e.memoizedProps;o.props=a;var l=o.context,u=n.contextType;typeof u=="object"&&u!==null?u=zn(u):(u=vn(n)?Xr:sn.current,u=Vs(e,u));var c=n.getDerivedStateFromProps,d=typeof c=="function"||typeof o.getSnapshotBeforeUpdate=="function";d||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==i||l!==u)&&x0(e,o,i,u),tr=!1;var f=e.memoizedState;o.state=f,au(e,i,o,r),l=e.memoizedState,a!==i||f!==l||gn.current||tr?(typeof c=="function"&&(Hf(e,n,c,i),l=e.memoizedState),(a=tr||w0(e,n,a,i,f,l,u))?(d||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=l),o.props=i,o.state=l,o.context=u,i=a):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{o=e.stateNode,Yv(t,e),a=e.memoizedProps,u=e.type===e.elementType?a:$n(e.type,a),o.props=u,d=e.pendingProps,f=o.context,l=n.contextType,typeof l=="object"&&l!==null?l=zn(l):(l=vn(n)?Xr:sn.current,l=Vs(e,l));var p=n.getDerivedStateFromProps;(c=typeof p=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==d||f!==l)&&x0(e,o,i,l),tr=!1,f=e.memoizedState,o.state=f,au(e,i,o,r);var m=e.memoizedState;a!==d||f!==m||gn.current||tr?(typeof p=="function"&&(Hf(e,n,p,i),m=e.memoizedState),(u=tr||w0(e,n,u,i,f,m,l)||!1)?(c||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(i,m,l),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(i,m,l)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&f===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&f===t.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=m),o.props=i,o.state=m,o.context=l,i=u):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&f===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&f===t.memoizedState||(e.flags|=1024),i=!1)}return $f(t,e,n,i,s,r)}function $f(t,e,n,i,r,s){y_(t,e);var o=(e.flags&128)!==0;if(!i&&!o)return r&&v0(e,n,!1),Bi(t,e,s);i=e.stateNode,Y1.current=e;var a=o&&typeof n.getDerivedStateFromError!="function"?null:i.render();return e.flags|=1,t!==null&&o?(e.child=Ws(e,t.child,null,s),e.child=Ws(e,null,a,s)):ln(t,e,a,s),e.memoizedState=i.state,r&&v0(e,n,!0),e.child}function M_(t){var e=t.stateNode;e.pendingContext?g0(t,e.pendingContext,e.pendingContext!==e.context):e.context&&g0(t,e.context,!1),Nh(t,e.containerInfo)}function I0(t,e,n,i,r){return Hs(),wh(r),e.flags|=256,ln(t,e,n,i),e.child}var Yf={dehydrated:null,treeContext:null,retryLane:0};function qf(t){return{baseLanes:t,cachePool:null,transitions:null}}function E_(t,e,n){var i=e.pendingProps,r=Tt.current,s=!1,o=(e.flags&128)!==0,a;if((a=o)||(a=t!==null&&t.memoizedState===null?!1:(r&2)!==0),a?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(r|=1),vt(Tt,r&1),t===null)return Gf(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=i.children,t=i.fallback,s?(i=e.mode,s=e.child,o={mode:"hidden",children:o},!(i&1)&&s!==null?(s.childLanes=0,s.pendingProps=o):s=ku(o,i,0,null),t=Hr(t,i,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=qf(n),e.memoizedState=Yf,t):Bh(e,o));if(r=t.memoizedState,r!==null&&(a=r.dehydrated,a!==null))return q1(t,e,o,i,a,r,n);if(s){s=i.fallback,o=e.mode,r=t.child,a=r.sibling;var l={mode:"hidden",children:i.children};return!(o&1)&&e.child!==r?(i=e.child,i.childLanes=0,i.pendingProps=l,e.deletions=null):(i=vr(r,l),i.subtreeFlags=r.subtreeFlags&14680064),a!==null?s=vr(a,s):(s=Hr(s,o,n,null),s.flags|=2),s.return=e,i.return=e,i.sibling=s,e.child=i,i=s,s=e.child,o=t.child.memoizedState,o=o===null?qf(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},s.memoizedState=o,s.childLanes=t.childLanes&~n,e.memoizedState=Yf,i}return s=t.child,t=s.sibling,i=vr(s,{mode:"visible",children:i.children}),!(e.mode&1)&&(i.lanes=n),i.return=e,i.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=i,e.memoizedState=null,i}function Bh(t,e){return e=ku({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function Ba(t,e,n,i){return i!==null&&wh(i),Ws(e,t.child,null,n),t=Bh(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function q1(t,e,n,i,r,s,o){if(n)return e.flags&256?(e.flags&=-257,i=_c(Error(fe(422))),Ba(t,e,o,i)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=i.fallback,r=e.mode,i=ku({mode:"visible",children:i.children},r,0,null),s=Hr(s,r,o,null),s.flags|=2,i.return=e,s.return=e,i.sibling=s,e.child=i,e.mode&1&&Ws(e,t.child,null,o),e.child.memoizedState=qf(o),e.memoizedState=Yf,s);if(!(e.mode&1))return Ba(t,e,o,null);if(r.data==="$!"){if(i=r.nextSibling&&r.nextSibling.dataset,i)var a=i.dgst;return i=a,s=Error(fe(419)),i=_c(s,i,void 0),Ba(t,e,o,i)}if(a=(o&t.childLanes)!==0,mn||a){if(i=Wt,i!==null){switch(o&-o){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(i.suspendedLanes|o)?0:r,r!==0&&r!==s.retryLane&&(s.retryLane=r,ki(t,r),ei(i,t,r,-1))}return Xh(),i=_c(Error(fe(421))),Ba(t,e,o,i)}return r.data==="$?"?(e.flags|=128,e.child=t.child,e=lM.bind(null,t),r._reactRetry=e,null):(t=s.treeContext,xn=hr(r.nextSibling),An=e,Mt=!0,Kn=null,t!==null&&(Un[Fn++]=Pi,Un[Fn++]=Ni,Un[Fn++]=jr,Pi=t.id,Ni=t.overflow,jr=e),e=Bh(e,i.children),e.flags|=4096,e)}function D0(t,e,n){t.lanes|=e;var i=t.alternate;i!==null&&(i.lanes|=e),Vf(t.return,e,n)}function Sc(t,e,n,i,r){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:r}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=i,s.tail=n,s.tailMode=r)}function T_(t,e,n){var i=e.pendingProps,r=i.revealOrder,s=i.tail;if(ln(t,e,i.children,n),i=Tt.current,i&2)i=i&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&D0(t,n,e);else if(t.tag===19)D0(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}i&=1}if(vt(Tt,i),!(e.mode&1))e.memoizedState=null;else switch(r){case"forwards":for(n=e.child,r=null;n!==null;)t=n.alternate,t!==null&&lu(t)===null&&(r=n),n=n.sibling;n=r,n===null?(r=e.child,e.child=null):(r=n.sibling,n.sibling=null),Sc(e,!1,r,n,s);break;case"backwards":for(n=null,r=e.child,e.child=null;r!==null;){if(t=r.alternate,t!==null&&lu(t)===null){e.child=r;break}t=r.sibling,r.sibling=n,n=r,r=t}Sc(e,!0,n,null,s);break;case"together":Sc(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function Pl(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function Bi(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),Yr|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(fe(153));if(e.child!==null){for(t=e.child,n=vr(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=vr(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function K1(t,e,n){switch(e.tag){case 3:M_(e),Hs();break;case 5:qv(e);break;case 1:vn(e.type)&&nu(e);break;case 4:Nh(e,e.stateNode.containerInfo);break;case 10:var i=e.type._context,r=e.memoizedProps.value;vt(su,i._currentValue),i._currentValue=r;break;case 13:if(i=e.memoizedState,i!==null)return i.dehydrated!==null?(vt(Tt,Tt.current&1),e.flags|=128,null):n&e.child.childLanes?E_(t,e,n):(vt(Tt,Tt.current&1),t=Bi(t,e,n),t!==null?t.sibling:null);vt(Tt,Tt.current&1);break;case 19:if(i=(n&e.childLanes)!==0,t.flags&128){if(i)return T_(t,e,n);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),vt(Tt,Tt.current),i)break;return null;case 22:case 23:return e.lanes=0,S_(t,e,n)}return Bi(t,e,n)}var b_,Kf,w_,x_;b_=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Kf=function(){};w_=function(t,e,n,i){var r=t.memoizedProps;if(r!==i){t=e.stateNode,Br(mi.current);var s=null;switch(n){case"input":r=_f(t,r),i=_f(t,i),s=[];break;case"select":r=xt({},r,{value:void 0}),i=xt({},i,{value:void 0}),s=[];break;case"textarea":r=Mf(t,r),i=Mf(t,i),s=[];break;default:typeof r.onClick!="function"&&typeof i.onClick=="function"&&(t.onclick=eu)}Tf(n,i);var o;n=null;for(u in r)if(!i.hasOwnProperty(u)&&r.hasOwnProperty(u)&&r[u]!=null)if(u==="style"){var a=r[u];for(o in a)a.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(jo.hasOwnProperty(u)?s||(s=[]):(s=s||[]).push(u,null));for(u in i){var l=i[u];if(a=r!=null?r[u]:void 0,i.hasOwnProperty(u)&&l!==a&&(l!=null||a!=null))if(u==="style")if(a){for(o in a)!a.hasOwnProperty(o)||l&&l.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in l)l.hasOwnProperty(o)&&a[o]!==l[o]&&(n||(n={}),n[o]=l[o])}else n||(s||(s=[]),s.push(u,n)),n=l;else u==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,a=a?a.__html:void 0,l!=null&&a!==l&&(s=s||[]).push(u,l)):u==="children"?typeof l!="string"&&typeof l!="number"||(s=s||[]).push(u,""+l):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(jo.hasOwnProperty(u)?(l!=null&&u==="onScroll"&&_t("scroll",t),s||a===l||(s=[])):(s=s||[]).push(u,l))}n&&(s=s||[]).push("style",n);var u=s;(e.updateQueue=u)&&(e.flags|=4)}};x_=function(t,e,n,i){n!==i&&(e.flags|=4)};function fo(t,e){if(!Mt)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:i.sibling=null}}function Jt(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,i=0;if(e)for(var r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags&14680064,i|=r.flags&14680064,r.return=t,r=r.sibling;else for(r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=t,r=r.sibling;return t.subtreeFlags|=i,t.childLanes=n,e}function Z1(t,e,n){var i=e.pendingProps;switch(bh(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Jt(e),null;case 1:return vn(e.type)&&tu(),Jt(e),null;case 3:return i=e.stateNode,Xs(),yt(gn),yt(sn),Ih(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(t===null||t.child===null)&&(Oa(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,Kn!==null&&(rd(Kn),Kn=null))),Kf(t,e),Jt(e),null;case 5:Lh(e);var r=Br(ra.current);if(n=e.type,t!==null&&e.stateNode!=null)w_(t,e,n,i,r),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!i){if(e.stateNode===null)throw Error(fe(166));return Jt(e),null}if(t=Br(mi.current),Oa(e)){i=e.stateNode,n=e.type;var s=e.memoizedProps;switch(i[ci]=e,i[na]=s,t=(e.mode&1)!==0,n){case"dialog":_t("cancel",i),_t("close",i);break;case"iframe":case"object":case"embed":_t("load",i);break;case"video":case"audio":for(r=0;r<Ao.length;r++)_t(Ao[r],i);break;case"source":_t("error",i);break;case"img":case"image":case"link":_t("error",i),_t("load",i);break;case"details":_t("toggle",i);break;case"input":Hp(i,s),_t("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!s.multiple},_t("invalid",i);break;case"textarea":Xp(i,s),_t("invalid",i)}Tf(n,s),r=null;for(var o in s)if(s.hasOwnProperty(o)){var a=s[o];o==="children"?typeof a=="string"?i.textContent!==a&&(s.suppressHydrationWarning!==!0&&Fa(i.textContent,a,t),r=["children",a]):typeof a=="number"&&i.textContent!==""+a&&(s.suppressHydrationWarning!==!0&&Fa(i.textContent,a,t),r=["children",""+a]):jo.hasOwnProperty(o)&&a!=null&&o==="onScroll"&&_t("scroll",i)}switch(n){case"input":Ca(i),Wp(i,s,!0);break;case"textarea":Ca(i),jp(i);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(i.onclick=eu)}i=r,e.updateQueue=i,i!==null&&(e.flags|=4)}else{o=r.nodeType===9?r:r.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=ev(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof i.is=="string"?t=o.createElement(n,{is:i.is}):(t=o.createElement(n),n==="select"&&(o=t,i.multiple?o.multiple=!0:i.size&&(o.size=i.size))):t=o.createElementNS(t,n),t[ci]=e,t[na]=i,b_(t,e,!1,!1),e.stateNode=t;e:{switch(o=bf(n,i),n){case"dialog":_t("cancel",t),_t("close",t),r=i;break;case"iframe":case"object":case"embed":_t("load",t),r=i;break;case"video":case"audio":for(r=0;r<Ao.length;r++)_t(Ao[r],t);r=i;break;case"source":_t("error",t),r=i;break;case"img":case"image":case"link":_t("error",t),_t("load",t),r=i;break;case"details":_t("toggle",t),r=i;break;case"input":Hp(t,i),r=_f(t,i),_t("invalid",t);break;case"option":r=i;break;case"select":t._wrapperState={wasMultiple:!!i.multiple},r=xt({},i,{value:void 0}),_t("invalid",t);break;case"textarea":Xp(t,i),r=Mf(t,i),_t("invalid",t);break;default:r=i}Tf(n,r),a=r;for(s in a)if(a.hasOwnProperty(s)){var l=a[s];s==="style"?iv(t,l):s==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&tv(t,l)):s==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&$o(t,l):typeof l=="number"&&$o(t,""+l):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(jo.hasOwnProperty(s)?l!=null&&s==="onScroll"&&_t("scroll",t):l!=null&&uh(t,s,l,o))}switch(n){case"input":Ca(t),Wp(t,i,!1);break;case"textarea":Ca(t),jp(t);break;case"option":i.value!=null&&t.setAttribute("value",""+_r(i.value));break;case"select":t.multiple=!!i.multiple,s=i.value,s!=null?Is(t,!!i.multiple,s,!1):i.defaultValue!=null&&Is(t,!!i.multiple,i.defaultValue,!0);break;default:typeof r.onClick=="function"&&(t.onclick=eu)}switch(n){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return Jt(e),null;case 6:if(t&&e.stateNode!=null)x_(t,e,t.memoizedProps,i);else{if(typeof i!="string"&&e.stateNode===null)throw Error(fe(166));if(n=Br(ra.current),Br(mi.current),Oa(e)){if(i=e.stateNode,n=e.memoizedProps,i[ci]=e,(s=i.nodeValue!==n)&&(t=An,t!==null))switch(t.tag){case 3:Fa(i.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&Fa(i.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else i=(n.nodeType===9?n:n.ownerDocument).createTextNode(i),i[ci]=e,e.stateNode=i}return Jt(e),null;case 13:if(yt(Tt),i=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(Mt&&xn!==null&&e.mode&1&&!(e.flags&128))Wv(),Hs(),e.flags|=98560,s=!1;else if(s=Oa(e),i!==null&&i.dehydrated!==null){if(t===null){if(!s)throw Error(fe(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(fe(317));s[ci]=e}else Hs(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;Jt(e),s=!1}else Kn!==null&&(rd(Kn),Kn=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(i=i!==null,i!==(t!==null&&t.memoizedState!==null)&&i&&(e.child.flags|=8192,e.mode&1&&(t===null||Tt.current&1?kt===0&&(kt=3):Xh())),e.updateQueue!==null&&(e.flags|=4),Jt(e),null);case 4:return Xs(),Kf(t,e),t===null&&ea(e.stateNode.containerInfo),Jt(e),null;case 10:return Ch(e.type._context),Jt(e),null;case 17:return vn(e.type)&&tu(),Jt(e),null;case 19:if(yt(Tt),s=e.memoizedState,s===null)return Jt(e),null;if(i=(e.flags&128)!==0,o=s.rendering,o===null)if(i)fo(s,!1);else{if(kt!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=lu(t),o!==null){for(e.flags|=128,fo(s,!1),i=o.updateQueue,i!==null&&(e.updateQueue=i,e.flags|=4),e.subtreeFlags=0,i=n,n=e.child;n!==null;)s=n,t=i,s.flags&=14680066,o=s.alternate,o===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=o.childLanes,s.lanes=o.lanes,s.child=o.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=o.memoizedProps,s.memoizedState=o.memoizedState,s.updateQueue=o.updateQueue,s.type=o.type,t=o.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return vt(Tt,Tt.current&1|2),e.child}t=t.sibling}s.tail!==null&&Dt()>$s&&(e.flags|=128,i=!0,fo(s,!1),e.lanes=4194304)}else{if(!i)if(t=lu(o),t!==null){if(e.flags|=128,i=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),fo(s,!0),s.tail===null&&s.tailMode==="hidden"&&!o.alternate&&!Mt)return Jt(e),null}else 2*Dt()-s.renderingStartTime>$s&&n!==1073741824&&(e.flags|=128,i=!0,fo(s,!1),e.lanes=4194304);s.isBackwards?(o.sibling=e.child,e.child=o):(n=s.last,n!==null?n.sibling=o:e.child=o,s.last=o)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=Dt(),e.sibling=null,n=Tt.current,vt(Tt,i?n&1|2:n&1),e):(Jt(e),null);case 22:case 23:return Wh(),i=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==i&&(e.flags|=8192),i&&e.mode&1?Tn&1073741824&&(Jt(e),e.subtreeFlags&6&&(e.flags|=8192)):Jt(e),null;case 24:return null;case 25:return null}throw Error(fe(156,e.tag))}function J1(t,e){switch(bh(e),e.tag){case 1:return vn(e.type)&&tu(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Xs(),yt(gn),yt(sn),Ih(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return Lh(e),null;case 13:if(yt(Tt),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(fe(340));Hs()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return yt(Tt),null;case 4:return Xs(),null;case 10:return Ch(e.type._context),null;case 22:case 23:return Wh(),null;case 24:return null;default:return null}}var za=!1,tn=!1,Q1=typeof WeakSet=="function"?WeakSet:Set,Re=null;function Ns(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(i){Ct(t,e,i)}else n.current=null}function Zf(t,e,n){try{n()}catch(i){Ct(t,e,i)}}var U0=!1;function eM(t,e){if(Df=Zl,t=Nv(),Eh(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var r=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var o=0,a=-1,l=-1,u=0,c=0,d=t,f=null;t:for(;;){for(var p;d!==n||r!==0&&d.nodeType!==3||(a=o+r),d!==s||i!==0&&d.nodeType!==3||(l=o+i),d.nodeType===3&&(o+=d.nodeValue.length),(p=d.firstChild)!==null;)f=d,d=p;for(;;){if(d===t)break t;if(f===n&&++u===r&&(a=o),f===s&&++c===i&&(l=o),(p=d.nextSibling)!==null)break;d=f,f=d.parentNode}d=p}n=a===-1||l===-1?null:{start:a,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(Uf={focusedElem:t,selectionRange:n},Zl=!1,Re=e;Re!==null;)if(e=Re,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,Re=t;else for(;Re!==null;){e=Re;try{var m=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(m!==null){var _=m.memoizedProps,g=m.memoizedState,h=e.stateNode,v=h.getSnapshotBeforeUpdate(e.elementType===e.type?_:$n(e.type,_),g);h.__reactInternalSnapshotBeforeUpdate=v}break;case 3:var S=e.stateNode.containerInfo;S.nodeType===1?S.textContent="":S.nodeType===9&&S.documentElement&&S.removeChild(S.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(fe(163))}}catch(M){Ct(e,e.return,M)}if(t=e.sibling,t!==null){t.return=e.return,Re=t;break}Re=e.return}return m=U0,U0=!1,m}function Bo(t,e,n){var i=e.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var r=i=i.next;do{if((r.tag&t)===t){var s=r.destroy;r.destroy=void 0,s!==void 0&&Zf(e,n,s)}r=r.next}while(r!==i)}}function Fu(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var i=n.create;n.destroy=i()}n=n.next}while(n!==e)}}function Jf(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function A_(t){var e=t.alternate;e!==null&&(t.alternate=null,A_(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[ci],delete e[na],delete e[kf],delete e[F1],delete e[O1])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function C_(t){return t.tag===5||t.tag===3||t.tag===4}function F0(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||C_(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Qf(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=eu));else if(i!==4&&(t=t.child,t!==null))for(Qf(t,e,n),t=t.sibling;t!==null;)Qf(t,e,n),t=t.sibling}function ed(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(i!==4&&(t=t.child,t!==null))for(ed(t,e,n),t=t.sibling;t!==null;)ed(t,e,n),t=t.sibling}var jt=null,Yn=!1;function ji(t,e,n){for(n=n.child;n!==null;)R_(t,e,n),n=n.sibling}function R_(t,e,n){if(pi&&typeof pi.onCommitFiberUnmount=="function")try{pi.onCommitFiberUnmount(Cu,n)}catch{}switch(n.tag){case 5:tn||Ns(n,e);case 6:var i=jt,r=Yn;jt=null,ji(t,e,n),jt=i,Yn=r,jt!==null&&(Yn?(t=jt,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):jt.removeChild(n.stateNode));break;case 18:jt!==null&&(Yn?(t=jt,n=n.stateNode,t.nodeType===8?dc(t.parentNode,n):t.nodeType===1&&dc(t,n),Zo(t)):dc(jt,n.stateNode));break;case 4:i=jt,r=Yn,jt=n.stateNode.containerInfo,Yn=!0,ji(t,e,n),jt=i,Yn=r;break;case 0:case 11:case 14:case 15:if(!tn&&(i=n.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){r=i=i.next;do{var s=r,o=s.destroy;s=s.tag,o!==void 0&&(s&2||s&4)&&Zf(n,e,o),r=r.next}while(r!==i)}ji(t,e,n);break;case 1:if(!tn&&(Ns(n,e),i=n.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=n.memoizedProps,i.state=n.memoizedState,i.componentWillUnmount()}catch(a){Ct(n,e,a)}ji(t,e,n);break;case 21:ji(t,e,n);break;case 22:n.mode&1?(tn=(i=tn)||n.memoizedState!==null,ji(t,e,n),tn=i):ji(t,e,n);break;default:ji(t,e,n)}}function O0(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new Q1),e.forEach(function(i){var r=uM.bind(null,t,i);n.has(i)||(n.add(i),i.then(r,r))})}}function Hn(t,e){var n=e.deletions;if(n!==null)for(var i=0;i<n.length;i++){var r=n[i];try{var s=t,o=e,a=o;e:for(;a!==null;){switch(a.tag){case 5:jt=a.stateNode,Yn=!1;break e;case 3:jt=a.stateNode.containerInfo,Yn=!0;break e;case 4:jt=a.stateNode.containerInfo,Yn=!0;break e}a=a.return}if(jt===null)throw Error(fe(160));R_(s,o,r),jt=null,Yn=!1;var l=r.alternate;l!==null&&(l.return=null),r.return=null}catch(u){Ct(r,e,u)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)P_(e,t),e=e.sibling}function P_(t,e){var n=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(Hn(e,t),ri(t),i&4){try{Bo(3,t,t.return),Fu(3,t)}catch(_){Ct(t,t.return,_)}try{Bo(5,t,t.return)}catch(_){Ct(t,t.return,_)}}break;case 1:Hn(e,t),ri(t),i&512&&n!==null&&Ns(n,n.return);break;case 5:if(Hn(e,t),ri(t),i&512&&n!==null&&Ns(n,n.return),t.flags&32){var r=t.stateNode;try{$o(r,"")}catch(_){Ct(t,t.return,_)}}if(i&4&&(r=t.stateNode,r!=null)){var s=t.memoizedProps,o=n!==null?n.memoizedProps:s,a=t.type,l=t.updateQueue;if(t.updateQueue=null,l!==null)try{a==="input"&&s.type==="radio"&&s.name!=null&&Jg(r,s),bf(a,o);var u=bf(a,s);for(o=0;o<l.length;o+=2){var c=l[o],d=l[o+1];c==="style"?iv(r,d):c==="dangerouslySetInnerHTML"?tv(r,d):c==="children"?$o(r,d):uh(r,c,d,u)}switch(a){case"input":Sf(r,s);break;case"textarea":Qg(r,s);break;case"select":var f=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!s.multiple;var p=s.value;p!=null?Is(r,!!s.multiple,p,!1):f!==!!s.multiple&&(s.defaultValue!=null?Is(r,!!s.multiple,s.defaultValue,!0):Is(r,!!s.multiple,s.multiple?[]:"",!1))}r[na]=s}catch(_){Ct(t,t.return,_)}}break;case 6:if(Hn(e,t),ri(t),i&4){if(t.stateNode===null)throw Error(fe(162));r=t.stateNode,s=t.memoizedProps;try{r.nodeValue=s}catch(_){Ct(t,t.return,_)}}break;case 3:if(Hn(e,t),ri(t),i&4&&n!==null&&n.memoizedState.isDehydrated)try{Zo(e.containerInfo)}catch(_){Ct(t,t.return,_)}break;case 4:Hn(e,t),ri(t);break;case 13:Hn(e,t),ri(t),r=t.child,r.flags&8192&&(s=r.memoizedState!==null,r.stateNode.isHidden=s,!s||r.alternate!==null&&r.alternate.memoizedState!==null||(Vh=Dt())),i&4&&O0(t);break;case 22:if(c=n!==null&&n.memoizedState!==null,t.mode&1?(tn=(u=tn)||c,Hn(e,t),tn=u):Hn(e,t),ri(t),i&8192){if(u=t.memoizedState!==null,(t.stateNode.isHidden=u)&&!c&&t.mode&1)for(Re=t,c=t.child;c!==null;){for(d=Re=c;Re!==null;){switch(f=Re,p=f.child,f.tag){case 0:case 11:case 14:case 15:Bo(4,f,f.return);break;case 1:Ns(f,f.return);var m=f.stateNode;if(typeof m.componentWillUnmount=="function"){i=f,n=f.return;try{e=i,m.props=e.memoizedProps,m.state=e.memoizedState,m.componentWillUnmount()}catch(_){Ct(i,n,_)}}break;case 5:Ns(f,f.return);break;case 22:if(f.memoizedState!==null){B0(d);continue}}p!==null?(p.return=f,Re=p):B0(d)}c=c.sibling}e:for(c=null,d=t;;){if(d.tag===5){if(c===null){c=d;try{r=d.stateNode,u?(s=r.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(a=d.stateNode,l=d.memoizedProps.style,o=l!=null&&l.hasOwnProperty("display")?l.display:null,a.style.display=nv("display",o))}catch(_){Ct(t,t.return,_)}}}else if(d.tag===6){if(c===null)try{d.stateNode.nodeValue=u?"":d.memoizedProps}catch(_){Ct(t,t.return,_)}}else if((d.tag!==22&&d.tag!==23||d.memoizedState===null||d===t)&&d.child!==null){d.child.return=d,d=d.child;continue}if(d===t)break e;for(;d.sibling===null;){if(d.return===null||d.return===t)break e;c===d&&(c=null),d=d.return}c===d&&(c=null),d.sibling.return=d.return,d=d.sibling}}break;case 19:Hn(e,t),ri(t),i&4&&O0(t);break;case 21:break;default:Hn(e,t),ri(t)}}function ri(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(C_(n)){var i=n;break e}n=n.return}throw Error(fe(160))}switch(i.tag){case 5:var r=i.stateNode;i.flags&32&&($o(r,""),i.flags&=-33);var s=F0(t);ed(t,s,r);break;case 3:case 4:var o=i.stateNode.containerInfo,a=F0(t);Qf(t,a,o);break;default:throw Error(fe(161))}}catch(l){Ct(t,t.return,l)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function tM(t,e,n){Re=t,N_(t)}function N_(t,e,n){for(var i=(t.mode&1)!==0;Re!==null;){var r=Re,s=r.child;if(r.tag===22&&i){var o=r.memoizedState!==null||za;if(!o){var a=r.alternate,l=a!==null&&a.memoizedState!==null||tn;a=za;var u=tn;if(za=o,(tn=l)&&!u)for(Re=r;Re!==null;)o=Re,l=o.child,o.tag===22&&o.memoizedState!==null?z0(r):l!==null?(l.return=o,Re=l):z0(r);for(;s!==null;)Re=s,N_(s),s=s.sibling;Re=r,za=a,tn=u}k0(t)}else r.subtreeFlags&8772&&s!==null?(s.return=r,Re=s):k0(t)}}function k0(t){for(;Re!==null;){var e=Re;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:tn||Fu(5,e);break;case 1:var i=e.stateNode;if(e.flags&4&&!tn)if(n===null)i.componentDidMount();else{var r=e.elementType===e.type?n.memoizedProps:$n(e.type,n.memoizedProps);i.componentDidUpdate(r,n.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&E0(e,s,i);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}E0(e,o,n)}break;case 5:var a=e.stateNode;if(n===null&&e.flags&4){n=a;var l=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var u=e.alternate;if(u!==null){var c=u.memoizedState;if(c!==null){var d=c.dehydrated;d!==null&&Zo(d)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(fe(163))}tn||e.flags&512&&Jf(e)}catch(f){Ct(e,e.return,f)}}if(e===t){Re=null;break}if(n=e.sibling,n!==null){n.return=e.return,Re=n;break}Re=e.return}}function B0(t){for(;Re!==null;){var e=Re;if(e===t){Re=null;break}var n=e.sibling;if(n!==null){n.return=e.return,Re=n;break}Re=e.return}}function z0(t){for(;Re!==null;){var e=Re;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{Fu(4,e)}catch(l){Ct(e,n,l)}break;case 1:var i=e.stateNode;if(typeof i.componentDidMount=="function"){var r=e.return;try{i.componentDidMount()}catch(l){Ct(e,r,l)}}var s=e.return;try{Jf(e)}catch(l){Ct(e,s,l)}break;case 5:var o=e.return;try{Jf(e)}catch(l){Ct(e,o,l)}}}catch(l){Ct(e,e.return,l)}if(e===t){Re=null;break}var a=e.sibling;if(a!==null){a.return=e.return,Re=a;break}Re=e.return}}var nM=Math.ceil,fu=Vi.ReactCurrentDispatcher,zh=Vi.ReactCurrentOwner,kn=Vi.ReactCurrentBatchConfig,at=0,Wt=null,Ft=null,Yt=0,Tn=0,Ls=Er(0),kt=0,la=null,Yr=0,Ou=0,Gh=0,zo=null,pn=null,Vh=0,$s=1/0,Ci=null,du=!1,td=null,mr=null,Ga=!1,lr=null,hu=0,Go=0,nd=null,Nl=-1,Ll=0;function un(){return at&6?Dt():Nl!==-1?Nl:Nl=Dt()}function gr(t){return t.mode&1?at&2&&Yt!==0?Yt&-Yt:B1.transition!==null?(Ll===0&&(Ll=mv()),Ll):(t=ft,t!==0||(t=window.event,t=t===void 0?16:Ev(t.type)),t):1}function ei(t,e,n,i){if(50<Go)throw Go=0,nd=null,Error(fe(185));ga(t,n,i),(!(at&2)||t!==Wt)&&(t===Wt&&(!(at&2)&&(Ou|=n),kt===4&&rr(t,Yt)),_n(t,i),n===1&&at===0&&!(e.mode&1)&&($s=Dt()+500,Iu&&Tr()))}function _n(t,e){var n=t.callbackNode;By(t,e);var i=Kl(t,t===Wt?Yt:0);if(i===0)n!==null&&qp(n),t.callbackNode=null,t.callbackPriority=0;else if(e=i&-i,t.callbackPriority!==e){if(n!=null&&qp(n),e===1)t.tag===0?k1(G0.bind(null,t)):Gv(G0.bind(null,t)),D1(function(){!(at&6)&&Tr()}),n=null;else{switch(gv(i)){case 1:n=ph;break;case 4:n=hv;break;case 16:n=ql;break;case 536870912:n=pv;break;default:n=ql}n=B_(n,L_.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function L_(t,e){if(Nl=-1,Ll=0,at&6)throw Error(fe(327));var n=t.callbackNode;if(ks()&&t.callbackNode!==n)return null;var i=Kl(t,t===Wt?Yt:0);if(i===0)return null;if(i&30||i&t.expiredLanes||e)e=pu(t,i);else{e=i;var r=at;at|=2;var s=D_();(Wt!==t||Yt!==e)&&(Ci=null,$s=Dt()+500,Vr(t,e));do try{sM();break}catch(a){I_(t,a)}while(!0);Ah(),fu.current=s,at=r,Ft!==null?e=0:(Wt=null,Yt=0,e=kt)}if(e!==0){if(e===2&&(r=Rf(t),r!==0&&(i=r,e=id(t,r))),e===1)throw n=la,Vr(t,0),rr(t,i),_n(t,Dt()),n;if(e===6)rr(t,i);else{if(r=t.current.alternate,!(i&30)&&!iM(r)&&(e=pu(t,i),e===2&&(s=Rf(t),s!==0&&(i=s,e=id(t,s))),e===1))throw n=la,Vr(t,0),rr(t,i),_n(t,Dt()),n;switch(t.finishedWork=r,t.finishedLanes=i,e){case 0:case 1:throw Error(fe(345));case 2:Nr(t,pn,Ci);break;case 3:if(rr(t,i),(i&130023424)===i&&(e=Vh+500-Dt(),10<e)){if(Kl(t,0)!==0)break;if(r=t.suspendedLanes,(r&i)!==i){un(),t.pingedLanes|=t.suspendedLanes&r;break}t.timeoutHandle=Of(Nr.bind(null,t,pn,Ci),e);break}Nr(t,pn,Ci);break;case 4:if(rr(t,i),(i&4194240)===i)break;for(e=t.eventTimes,r=-1;0<i;){var o=31-Qn(i);s=1<<o,o=e[o],o>r&&(r=o),i&=~s}if(i=r,i=Dt()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*nM(i/1960))-i,10<i){t.timeoutHandle=Of(Nr.bind(null,t,pn,Ci),i);break}Nr(t,pn,Ci);break;case 5:Nr(t,pn,Ci);break;default:throw Error(fe(329))}}}return _n(t,Dt()),t.callbackNode===n?L_.bind(null,t):null}function id(t,e){var n=zo;return t.current.memoizedState.isDehydrated&&(Vr(t,e).flags|=256),t=pu(t,e),t!==2&&(e=pn,pn=n,e!==null&&rd(e)),t}function rd(t){pn===null?pn=t:pn.push.apply(pn,t)}function iM(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var i=0;i<n.length;i++){var r=n[i],s=r.getSnapshot;r=r.value;try{if(!ti(s(),r))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function rr(t,e){for(e&=~Gh,e&=~Ou,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-Qn(e),i=1<<n;t[n]=-1,e&=~i}}function G0(t){if(at&6)throw Error(fe(327));ks();var e=Kl(t,0);if(!(e&1))return _n(t,Dt()),null;var n=pu(t,e);if(t.tag!==0&&n===2){var i=Rf(t);i!==0&&(e=i,n=id(t,i))}if(n===1)throw n=la,Vr(t,0),rr(t,e),_n(t,Dt()),n;if(n===6)throw Error(fe(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,Nr(t,pn,Ci),_n(t,Dt()),null}function Hh(t,e){var n=at;at|=1;try{return t(e)}finally{at=n,at===0&&($s=Dt()+500,Iu&&Tr())}}function qr(t){lr!==null&&lr.tag===0&&!(at&6)&&ks();var e=at;at|=1;var n=kn.transition,i=ft;try{if(kn.transition=null,ft=1,t)return t()}finally{ft=i,kn.transition=n,at=e,!(at&6)&&Tr()}}function Wh(){Tn=Ls.current,yt(Ls)}function Vr(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,I1(n)),Ft!==null)for(n=Ft.return;n!==null;){var i=n;switch(bh(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&tu();break;case 3:Xs(),yt(gn),yt(sn),Ih();break;case 5:Lh(i);break;case 4:Xs();break;case 13:yt(Tt);break;case 19:yt(Tt);break;case 10:Ch(i.type._context);break;case 22:case 23:Wh()}n=n.return}if(Wt=t,Ft=t=vr(t.current,null),Yt=Tn=e,kt=0,la=null,Gh=Ou=Yr=0,pn=zo=null,kr!==null){for(e=0;e<kr.length;e++)if(n=kr[e],i=n.interleaved,i!==null){n.interleaved=null;var r=i.next,s=n.pending;if(s!==null){var o=s.next;s.next=r,i.next=o}n.pending=i}kr=null}return t}function I_(t,e){do{var n=Ft;try{if(Ah(),Cl.current=cu,uu){for(var i=wt.memoizedState;i!==null;){var r=i.queue;r!==null&&(r.pending=null),i=i.next}uu=!1}if($r=0,Ht=Ot=wt=null,ko=!1,sa=0,zh.current=null,n===null||n.return===null){kt=1,la=e,Ft=null;break}e:{var s=t,o=n.return,a=n,l=e;if(e=Yt,a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var u=l,c=a,d=c.tag;if(!(c.mode&1)&&(d===0||d===11||d===15)){var f=c.alternate;f?(c.updateQueue=f.updateQueue,c.memoizedState=f.memoizedState,c.lanes=f.lanes):(c.updateQueue=null,c.memoizedState=null)}var p=C0(o);if(p!==null){p.flags&=-257,R0(p,o,a,s,e),p.mode&1&&A0(s,u,e),e=p,l=u;var m=e.updateQueue;if(m===null){var _=new Set;_.add(l),e.updateQueue=_}else m.add(l);break e}else{if(!(e&1)){A0(s,u,e),Xh();break e}l=Error(fe(426))}}else if(Mt&&a.mode&1){var g=C0(o);if(g!==null){!(g.flags&65536)&&(g.flags|=256),R0(g,o,a,s,e),wh(js(l,a));break e}}s=l=js(l,a),kt!==4&&(kt=2),zo===null?zo=[s]:zo.push(s),s=o;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var h=g_(s,l,e);M0(s,h);break e;case 1:a=l;var v=s.type,S=s.stateNode;if(!(s.flags&128)&&(typeof v.getDerivedStateFromError=="function"||S!==null&&typeof S.componentDidCatch=="function"&&(mr===null||!mr.has(S)))){s.flags|=65536,e&=-e,s.lanes|=e;var M=v_(s,a,e);M0(s,M);break e}}s=s.return}while(s!==null)}F_(n)}catch(T){e=T,Ft===n&&n!==null&&(Ft=n=n.return);continue}break}while(!0)}function D_(){var t=fu.current;return fu.current=cu,t===null?cu:t}function Xh(){(kt===0||kt===3||kt===2)&&(kt=4),Wt===null||!(Yr&268435455)&&!(Ou&268435455)||rr(Wt,Yt)}function pu(t,e){var n=at;at|=2;var i=D_();(Wt!==t||Yt!==e)&&(Ci=null,Vr(t,e));do try{rM();break}catch(r){I_(t,r)}while(!0);if(Ah(),at=n,fu.current=i,Ft!==null)throw Error(fe(261));return Wt=null,Yt=0,kt}function rM(){for(;Ft!==null;)U_(Ft)}function sM(){for(;Ft!==null&&!Py();)U_(Ft)}function U_(t){var e=k_(t.alternate,t,Tn);t.memoizedProps=t.pendingProps,e===null?F_(t):Ft=e,zh.current=null}function F_(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=J1(n,e),n!==null){n.flags&=32767,Ft=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{kt=6,Ft=null;return}}else if(n=Z1(n,e,Tn),n!==null){Ft=n;return}if(e=e.sibling,e!==null){Ft=e;return}Ft=e=t}while(e!==null);kt===0&&(kt=5)}function Nr(t,e,n){var i=ft,r=kn.transition;try{kn.transition=null,ft=1,oM(t,e,n,i)}finally{kn.transition=r,ft=i}return null}function oM(t,e,n,i){do ks();while(lr!==null);if(at&6)throw Error(fe(327));n=t.finishedWork;var r=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(fe(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(zy(t,s),t===Wt&&(Ft=Wt=null,Yt=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Ga||(Ga=!0,B_(ql,function(){return ks(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=kn.transition,kn.transition=null;var o=ft;ft=1;var a=at;at|=4,zh.current=null,eM(t,n),P_(n,t),x1(Uf),Zl=!!Df,Uf=Df=null,t.current=n,tM(n),Ny(),at=a,ft=o,kn.transition=s}else t.current=n;if(Ga&&(Ga=!1,lr=t,hu=r),s=t.pendingLanes,s===0&&(mr=null),Dy(n.stateNode),_n(t,Dt()),e!==null)for(i=t.onRecoverableError,n=0;n<e.length;n++)r=e[n],i(r.value,{componentStack:r.stack,digest:r.digest});if(du)throw du=!1,t=td,td=null,t;return hu&1&&t.tag!==0&&ks(),s=t.pendingLanes,s&1?t===nd?Go++:(Go=0,nd=t):Go=0,Tr(),null}function ks(){if(lr!==null){var t=gv(hu),e=kn.transition,n=ft;try{if(kn.transition=null,ft=16>t?16:t,lr===null)var i=!1;else{if(t=lr,lr=null,hu=0,at&6)throw Error(fe(331));var r=at;for(at|=4,Re=t.current;Re!==null;){var s=Re,o=s.child;if(Re.flags&16){var a=s.deletions;if(a!==null){for(var l=0;l<a.length;l++){var u=a[l];for(Re=u;Re!==null;){var c=Re;switch(c.tag){case 0:case 11:case 15:Bo(8,c,s)}var d=c.child;if(d!==null)d.return=c,Re=d;else for(;Re!==null;){c=Re;var f=c.sibling,p=c.return;if(A_(c),c===u){Re=null;break}if(f!==null){f.return=p,Re=f;break}Re=p}}}var m=s.alternate;if(m!==null){var _=m.child;if(_!==null){m.child=null;do{var g=_.sibling;_.sibling=null,_=g}while(_!==null)}}Re=s}}if(s.subtreeFlags&2064&&o!==null)o.return=s,Re=o;else e:for(;Re!==null;){if(s=Re,s.flags&2048)switch(s.tag){case 0:case 11:case 15:Bo(9,s,s.return)}var h=s.sibling;if(h!==null){h.return=s.return,Re=h;break e}Re=s.return}}var v=t.current;for(Re=v;Re!==null;){o=Re;var S=o.child;if(o.subtreeFlags&2064&&S!==null)S.return=o,Re=S;else e:for(o=v;Re!==null;){if(a=Re,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:Fu(9,a)}}catch(T){Ct(a,a.return,T)}if(a===o){Re=null;break e}var M=a.sibling;if(M!==null){M.return=a.return,Re=M;break e}Re=a.return}}if(at=r,Tr(),pi&&typeof pi.onPostCommitFiberRoot=="function")try{pi.onPostCommitFiberRoot(Cu,t)}catch{}i=!0}return i}finally{ft=n,kn.transition=e}}return!1}function V0(t,e,n){e=js(n,e),e=g_(t,e,1),t=pr(t,e,1),e=un(),t!==null&&(ga(t,1,e),_n(t,e))}function Ct(t,e,n){if(t.tag===3)V0(t,t,n);else for(;e!==null;){if(e.tag===3){V0(e,t,n);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(mr===null||!mr.has(i))){t=js(n,t),t=v_(e,t,1),e=pr(e,t,1),t=un(),e!==null&&(ga(e,1,t),_n(e,t));break}}e=e.return}}function aM(t,e,n){var i=t.pingCache;i!==null&&i.delete(e),e=un(),t.pingedLanes|=t.suspendedLanes&n,Wt===t&&(Yt&n)===n&&(kt===4||kt===3&&(Yt&130023424)===Yt&&500>Dt()-Vh?Vr(t,0):Gh|=n),_n(t,e)}function O_(t,e){e===0&&(t.mode&1?(e=Na,Na<<=1,!(Na&130023424)&&(Na=4194304)):e=1);var n=un();t=ki(t,e),t!==null&&(ga(t,e,n),_n(t,n))}function lM(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),O_(t,n)}function uM(t,e){var n=0;switch(t.tag){case 13:var i=t.stateNode,r=t.memoizedState;r!==null&&(n=r.retryLane);break;case 19:i=t.stateNode;break;default:throw Error(fe(314))}i!==null&&i.delete(e),O_(t,n)}var k_;k_=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||gn.current)mn=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return mn=!1,K1(t,e,n);mn=!!(t.flags&131072)}else mn=!1,Mt&&e.flags&1048576&&Vv(e,ru,e.index);switch(e.lanes=0,e.tag){case 2:var i=e.type;Pl(t,e),t=e.pendingProps;var r=Vs(e,sn.current);Os(e,n),r=Uh(null,e,i,t,r,n);var s=Fh();return e.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,vn(i)?(s=!0,nu(e)):s=!1,e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,Ph(e),r.updater=Uu,e.stateNode=r,r._reactInternals=e,Wf(e,i,t,n),e=$f(null,e,i,!0,s,n)):(e.tag=0,Mt&&s&&Th(e),ln(null,e,r,n),e=e.child),e;case 16:i=e.elementType;e:{switch(Pl(t,e),t=e.pendingProps,r=i._init,i=r(i._payload),e.type=i,r=e.tag=fM(i),t=$n(i,t),r){case 0:e=jf(null,e,i,t,n);break e;case 1:e=L0(null,e,i,t,n);break e;case 11:e=P0(null,e,i,t,n);break e;case 14:e=N0(null,e,i,$n(i.type,t),n);break e}throw Error(fe(306,i,""))}return e;case 0:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:$n(i,r),jf(t,e,i,r,n);case 1:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:$n(i,r),L0(t,e,i,r,n);case 3:e:{if(M_(e),t===null)throw Error(fe(387));i=e.pendingProps,s=e.memoizedState,r=s.element,Yv(t,e),au(e,i,null,n);var o=e.memoizedState;if(i=o.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){r=js(Error(fe(423)),e),e=I0(t,e,i,n,r);break e}else if(i!==r){r=js(Error(fe(424)),e),e=I0(t,e,i,n,r);break e}else for(xn=hr(e.stateNode.containerInfo.firstChild),An=e,Mt=!0,Kn=null,n=jv(e,null,i,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Hs(),i===r){e=Bi(t,e,n);break e}ln(t,e,i,n)}e=e.child}return e;case 5:return qv(e),t===null&&Gf(e),i=e.type,r=e.pendingProps,s=t!==null?t.memoizedProps:null,o=r.children,Ff(i,r)?o=null:s!==null&&Ff(i,s)&&(e.flags|=32),y_(t,e),ln(t,e,o,n),e.child;case 6:return t===null&&Gf(e),null;case 13:return E_(t,e,n);case 4:return Nh(e,e.stateNode.containerInfo),i=e.pendingProps,t===null?e.child=Ws(e,null,i,n):ln(t,e,i,n),e.child;case 11:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:$n(i,r),P0(t,e,i,r,n);case 7:return ln(t,e,e.pendingProps,n),e.child;case 8:return ln(t,e,e.pendingProps.children,n),e.child;case 12:return ln(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(i=e.type._context,r=e.pendingProps,s=e.memoizedProps,o=r.value,vt(su,i._currentValue),i._currentValue=o,s!==null)if(ti(s.value,o)){if(s.children===r.children&&!gn.current){e=Bi(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var a=s.dependencies;if(a!==null){o=s.child;for(var l=a.firstContext;l!==null;){if(l.context===i){if(s.tag===1){l=Ii(-1,n&-n),l.tag=2;var u=s.updateQueue;if(u!==null){u=u.shared;var c=u.pending;c===null?l.next=l:(l.next=c.next,c.next=l),u.pending=l}}s.lanes|=n,l=s.alternate,l!==null&&(l.lanes|=n),Vf(s.return,n,e),a.lanes|=n;break}l=l.next}}else if(s.tag===10)o=s.type===e.type?null:s.child;else if(s.tag===18){if(o=s.return,o===null)throw Error(fe(341));o.lanes|=n,a=o.alternate,a!==null&&(a.lanes|=n),Vf(o,n,e),o=s.sibling}else o=s.child;if(o!==null)o.return=s;else for(o=s;o!==null;){if(o===e){o=null;break}if(s=o.sibling,s!==null){s.return=o.return,o=s;break}o=o.return}s=o}ln(t,e,r.children,n),e=e.child}return e;case 9:return r=e.type,i=e.pendingProps.children,Os(e,n),r=zn(r),i=i(r),e.flags|=1,ln(t,e,i,n),e.child;case 14:return i=e.type,r=$n(i,e.pendingProps),r=$n(i.type,r),N0(t,e,i,r,n);case 15:return __(t,e,e.type,e.pendingProps,n);case 17:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:$n(i,r),Pl(t,e),e.tag=1,vn(i)?(t=!0,nu(e)):t=!1,Os(e,n),m_(e,i,r),Wf(e,i,r,n),$f(null,e,i,!0,t,n);case 19:return T_(t,e,n);case 22:return S_(t,e,n)}throw Error(fe(156,e.tag))};function B_(t,e){return dv(t,e)}function cM(t,e,n,i){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function On(t,e,n,i){return new cM(t,e,n,i)}function jh(t){return t=t.prototype,!(!t||!t.isReactComponent)}function fM(t){if(typeof t=="function")return jh(t)?1:0;if(t!=null){if(t=t.$$typeof,t===fh)return 11;if(t===dh)return 14}return 2}function vr(t,e){var n=t.alternate;return n===null?(n=On(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function Il(t,e,n,i,r,s){var o=2;if(i=t,typeof t=="function")jh(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case Es:return Hr(n.children,r,s,e);case ch:o=8,r|=8;break;case pf:return t=On(12,n,e,r|2),t.elementType=pf,t.lanes=s,t;case mf:return t=On(13,n,e,r),t.elementType=mf,t.lanes=s,t;case gf:return t=On(19,n,e,r),t.elementType=gf,t.lanes=s,t;case qg:return ku(n,r,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case $g:o=10;break e;case Yg:o=9;break e;case fh:o=11;break e;case dh:o=14;break e;case er:o=16,i=null;break e}throw Error(fe(130,t==null?t:typeof t,""))}return e=On(o,n,e,r),e.elementType=t,e.type=i,e.lanes=s,e}function Hr(t,e,n,i){return t=On(7,t,i,e),t.lanes=n,t}function ku(t,e,n,i){return t=On(22,t,i,e),t.elementType=qg,t.lanes=n,t.stateNode={isHidden:!1},t}function yc(t,e,n){return t=On(6,t,null,e),t.lanes=n,t}function Mc(t,e,n){return e=On(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function dM(t,e,n,i,r){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=tc(0),this.expirationTimes=tc(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=tc(0),this.identifierPrefix=i,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function $h(t,e,n,i,r,s,o,a,l){return t=new dM(t,e,n,a,l),e===1?(e=1,s===!0&&(e|=8)):e=0,s=On(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:i,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Ph(s),t}function hM(t,e,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Ms,key:i==null?null:""+i,children:t,containerInfo:e,implementation:n}}function z_(t){if(!t)return Sr;t=t._reactInternals;e:{if(es(t)!==t||t.tag!==1)throw Error(fe(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(vn(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(fe(171))}if(t.tag===1){var n=t.type;if(vn(n))return zv(t,n,e)}return e}function G_(t,e,n,i,r,s,o,a,l){return t=$h(n,i,!0,t,r,s,o,a,l),t.context=z_(null),n=t.current,i=un(),r=gr(n),s=Ii(i,r),s.callback=e??null,pr(n,s,r),t.current.lanes=r,ga(t,r,i),_n(t,i),t}function Bu(t,e,n,i){var r=e.current,s=un(),o=gr(r);return n=z_(n),e.context===null?e.context=n:e.pendingContext=n,e=Ii(s,o),e.payload={element:t},i=i===void 0?null:i,i!==null&&(e.callback=i),t=pr(r,e,o),t!==null&&(ei(t,r,o,s),Al(t,r,o)),o}function mu(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function H0(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function Yh(t,e){H0(t,e),(t=t.alternate)&&H0(t,e)}function pM(){return null}var V_=typeof reportError=="function"?reportError:function(t){console.error(t)};function qh(t){this._internalRoot=t}zu.prototype.render=qh.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(fe(409));Bu(t,e,null,null)};zu.prototype.unmount=qh.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;qr(function(){Bu(null,t,null,null)}),e[Oi]=null}};function zu(t){this._internalRoot=t}zu.prototype.unstable_scheduleHydration=function(t){if(t){var e=Sv();t={blockedOn:null,target:t,priority:e};for(var n=0;n<ir.length&&e!==0&&e<ir[n].priority;n++);ir.splice(n,0,t),n===0&&Mv(t)}};function Kh(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function Gu(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function W0(){}function mM(t,e,n,i,r){if(r){if(typeof i=="function"){var s=i;i=function(){var u=mu(o);s.call(u)}}var o=G_(e,i,t,0,null,!1,!1,"",W0);return t._reactRootContainer=o,t[Oi]=o.current,ea(t.nodeType===8?t.parentNode:t),qr(),o}for(;r=t.lastChild;)t.removeChild(r);if(typeof i=="function"){var a=i;i=function(){var u=mu(l);a.call(u)}}var l=$h(t,0,!1,null,null,!1,!1,"",W0);return t._reactRootContainer=l,t[Oi]=l.current,ea(t.nodeType===8?t.parentNode:t),qr(function(){Bu(e,l,n,i)}),l}function Vu(t,e,n,i,r){var s=n._reactRootContainer;if(s){var o=s;if(typeof r=="function"){var a=r;r=function(){var l=mu(o);a.call(l)}}Bu(e,o,t,r)}else o=mM(n,e,t,r,i);return mu(o)}vv=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=xo(e.pendingLanes);n!==0&&(mh(e,n|1),_n(e,Dt()),!(at&6)&&($s=Dt()+500,Tr()))}break;case 13:qr(function(){var i=ki(t,1);if(i!==null){var r=un();ei(i,t,1,r)}}),Yh(t,1)}};gh=function(t){if(t.tag===13){var e=ki(t,134217728);if(e!==null){var n=un();ei(e,t,134217728,n)}Yh(t,134217728)}};_v=function(t){if(t.tag===13){var e=gr(t),n=ki(t,e);if(n!==null){var i=un();ei(n,t,e,i)}Yh(t,e)}};Sv=function(){return ft};yv=function(t,e){var n=ft;try{return ft=t,e()}finally{ft=n}};xf=function(t,e,n){switch(e){case"input":if(Sf(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var i=n[e];if(i!==t&&i.form===t.form){var r=Lu(i);if(!r)throw Error(fe(90));Zg(i),Sf(i,r)}}}break;case"textarea":Qg(t,n);break;case"select":e=n.value,e!=null&&Is(t,!!n.multiple,e,!1)}};ov=Hh;av=qr;var gM={usingClientEntryPoint:!1,Events:[_a,xs,Lu,rv,sv,Hh]},ho={findFiberByHostInstance:Or,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},vM={bundleType:ho.bundleType,version:ho.version,rendererPackageName:ho.rendererPackageName,rendererConfig:ho.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Vi.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=cv(t),t===null?null:t.stateNode},findFiberByHostInstance:ho.findFiberByHostInstance||pM,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Va=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Va.isDisabled&&Va.supportsFiber)try{Cu=Va.inject(vM),pi=Va}catch{}}Pn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=gM;Pn.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Kh(e))throw Error(fe(200));return hM(t,e,null,n)};Pn.createRoot=function(t,e){if(!Kh(t))throw Error(fe(299));var n=!1,i="",r=V_;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=$h(t,1,!1,null,null,n,!1,i,r),t[Oi]=e.current,ea(t.nodeType===8?t.parentNode:t),new qh(e)};Pn.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(fe(188)):(t=Object.keys(t).join(","),Error(fe(268,t)));return t=cv(e),t=t===null?null:t.stateNode,t};Pn.flushSync=function(t){return qr(t)};Pn.hydrate=function(t,e,n){if(!Gu(e))throw Error(fe(200));return Vu(null,t,e,!0,n)};Pn.hydrateRoot=function(t,e,n){if(!Kh(t))throw Error(fe(405));var i=n!=null&&n.hydratedSources||null,r=!1,s="",o=V_;if(n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=G_(e,null,t,1,n??null,r,!1,s,o),t[Oi]=e.current,ea(t),i)for(t=0;t<i.length;t++)n=i[t],r=n._getVersion,r=r(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,r]:e.mutableSourceEagerHydrationData.push(n,r);return new zu(e)};Pn.render=function(t,e,n){if(!Gu(e))throw Error(fe(200));return Vu(null,t,e,!1,n)};Pn.unmountComponentAtNode=function(t){if(!Gu(t))throw Error(fe(40));return t._reactRootContainer?(qr(function(){Vu(null,null,t,!1,function(){t._reactRootContainer=null,t[Oi]=null})}),!0):!1};Pn.unstable_batchedUpdates=Hh;Pn.unstable_renderSubtreeIntoContainer=function(t,e,n,i){if(!Gu(n))throw Error(fe(200));if(t==null||t._reactInternals===void 0)throw Error(fe(38));return Vu(t,e,n,!1,i)};Pn.version="18.3.1-next-f1338f8080-20240426";function H_(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(H_)}catch(t){console.error(t)}}H_(),Hg.exports=Pn;var _M=Hg.exports,X0=_M;df.createRoot=X0.createRoot,df.hydrateRoot=X0.hydrateRoot;function SM({onStart:t}){return P.jsxs("div",{className:"scene-center",children:[P.jsx("h1",{className:"scene-title",children:"LAUNCH SEQUENCE"}),P.jsx("p",{className:"scene-sub",children:"Educational Sci-Fi Mission"}),P.jsx("button",{className:"scene-btn",onClick:t,children:"Begin Mission"})]})}function yM({onContinue:t}){return P.jsxs("div",{className:"scene-center",children:[P.jsx("h1",{className:"scene-title briefing-title",children:"Mission Briefing"}),P.jsx("p",{className:"scene-sub briefing-body",children:"Commander, you have been selected to lead Launch Sequence — a mission to unlock the knowledge buried in each sector of the station. Study the terminals, pass the checks, and earn your launch clearance."}),P.jsx("button",{className:"scene-btn",onClick:t,children:"Enter Hangar"})]})}function Zh(t){const e=W.useRef(null),n=W.useRef(null),i=W.useRef(t);W.useEffect(()=>{i.current=t},[t]),W.useEffect(()=>{function r(s){const o=n.current??s,a=Math.min((s-o)/1e3,.05);n.current=s,i.current(a),e.current=requestAnimationFrame(r)}return e.current=requestAnimationFrame(r),()=>cancelAnimationFrame(e.current)},[])}function MM(){const t=W.useRef({});return W.useEffect(()=>{const e=i=>{t.current[i.code]=!0},n=i=>{t.current[i.code]=!1};return window.addEventListener("keydown",e),window.addEventListener("keyup",n),()=>{window.removeEventListener("keydown",e),window.removeEventListener("keyup",n)}},[]),t}function St(t,e,n,i,r,s){s=Math.min(s,i/2,r/2),t.beginPath(),t.moveTo(e+s,n),t.lineTo(e+i-s,n),t.arcTo(e+i,n,e+i,n+s,s),t.lineTo(e+i,n+r-s),t.arcTo(e+i,n+r,e+i-s,n+r,s),t.lineTo(e+s,n+r),t.arcTo(e,n+r,e,n+r-s,s),t.lineTo(e,n+s),t.arcTo(e,n,e+s,n,s),t.closePath()}function EM(t,e,n){const i=n*.55;return Array.from({length:t},()=>({x:Math.random()*e,y:Math.random()*i,r:Math.random()*.75+.2,vy:-(Math.random()*7+2),vx:(Math.random()-.5)*3.5,alpha:Math.random()*.32+.06,phase:Math.random()*Math.PI*2,speed:Math.random()*.7+.25}))}function TM(t,e,n,i){const r=i*.55;t.forEach(s=>{s.y+=s.vy*e,s.x+=s.vx*e,(s.y<0||s.x<-10||s.x>n+10)&&(s.x=Math.random()*n,s.y=r*.98)})}function bM(t,e,n){e.forEach(i=>{const r=.5+.5*Math.sin(i.phase+n*i.speed),s=i.alpha*r;t.beginPath(),t.arc(i.x,i.y,i.r,0,Math.PI*2),t.fillStyle=`rgba(130, 185, 255, ${s.toFixed(3)})`,t.fill()})}function wM(t,e,n){const i=Array.from({length:t},()=>({x:Math.random()*e,y:Math.random()*n*.55,r:Math.random()*1.4+.3,base:Math.random(),phase:Math.random()*Math.PI*2,speed:Math.random()*1.5+.5,bright:!1,colorTint:null})),r=Array.from({length:20},()=>{const s=[null,null,null,"warm","cool"];return{x:Math.random()*e,y:Math.random()*n*.55,r:Math.random()*1+1.5,base:Math.random()*.4+.6,phase:Math.random()*Math.PI*2,speed:Math.random()*3+1.5,bright:!0,colorTint:s[Math.floor(Math.random()*s.length)]}});return[...i,...r]}function xM(t,e,n){e.forEach(i=>{const s=.3+.7*(.5+.5*Math.sin(i.phase+n*i.speed))*i.base;if(i.bright){let o=200,a=230,l=255;i.colorTint==="warm"?(o=255,a=210,l=160):i.colorTint==="cool"&&(o=160,a=200,l=255),t.beginPath(),t.arc(i.x,i.y,i.r,0,Math.PI*2),t.fillStyle=`rgba(${o}, ${a}, ${l}, ${s.toFixed(2)})`,t.fill();const u=4+i.r*1.5,c=(s*.4).toFixed(3);t.strokeStyle=`rgba(${o}, ${a}, ${l}, ${c})`,t.lineWidth=.8;for(let d=0;d<4;d++){const f=d*Math.PI/2;t.beginPath(),t.moveTo(i.x+Math.cos(f)*i.r,i.y+Math.sin(f)*i.r),t.lineTo(i.x+Math.cos(f)*(i.r+u),i.y+Math.sin(f)*(i.r+u)),t.stroke()}}else t.beginPath(),t.arc(i.x,i.y,i.r,0,Math.PI*2),t.fillStyle=`rgba(200, 230, 255, ${s.toFixed(2)})`,t.fill()})}let po=null;function AM(t,e){if(po&&po.W===t&&po.H===e)return po.dots;const n=e*.55,i=[];for(let r=0;r<200;r++){const s=Math.abs(Math.sin(r*127.1+311.7))*t,o=n+Math.abs(Math.sin(r*311.7+127.1))*(e-n);i.push({x:s,y:o})}return po={W:t,H:e,dots:i},i}function CM(t,e,n,i,r){const s=i!==void 0?i:e/2,o=n*.55,a=14,l=20,u={x:e/2};for(let M=0;M<=a;M++){const T=M/a,b=o+(n-o)*Math.pow(T,1.8),w=.12+.38*Math.pow(T,.6);t.strokeStyle=`rgba(40,140,255,${w.toFixed(2)})`,t.lineWidth=.8+T*.6,t.beginPath(),t.moveTo(0,b),t.lineTo(e,b),t.stroke()}for(let M=0;M<=l;M++){const T=M/l*e,w=.3-Math.abs(M/l-.5)*2*.14;t.strokeStyle=`rgba(40,140,255,${Math.max(.06,w).toFixed(2)})`,t.lineWidth=.75,t.beginPath(),t.moveTo(u.x+(T-u.x)*.01,o),t.lineTo(T,n),t.stroke()}const c=t.createLinearGradient(0,o,0,n);c.addColorStop(0,"rgba(5, 15, 35, 0.0)"),c.addColorStop(1,"rgba(5, 15, 40, 0.75)"),t.fillStyle=c,t.fillRect(0,o,e,n-o);const d=t.createLinearGradient(0,o,0,o+(n-o)*.28);d.addColorStop(0,"rgba(2, 5, 18, 0.52)"),d.addColorStop(1,"rgba(0, 0, 0, 0.00)"),t.fillStyle=d,t.fillRect(0,o,e,(n-o)*.28);const f=t.createRadialGradient(e/2,o+(n-o)*.5,(n-o)*.1,e/2,o+(n-o)*.5,Math.max(e/2,n-o)*1.05);f.addColorStop(0,"rgba(0, 0, 0, 0.00)"),f.addColorStop(.55,"rgba(0, 0, 0, 0.00)"),f.addColorStop(1,"rgba(2, 5, 20, 0.58)"),t.fillStyle=f,t.fillRect(0,o,e,n-o),AM(e,n).forEach(({x:M,y:T})=>{t.beginPath(),t.arc(M,T,1,0,Math.PI*2),t.fillStyle="rgba(80, 100, 140, 0.08)",t.fill()});const m=n*.55,_=60,g=12;for(let M=0;M<g;M++){const T=M/g*Math.PI*2,b=(M+.5)/g*Math.PI*2;t.beginPath(),t.arc(s,m,_,T,b),t.arc(s,m,_-8,b,T,!0),t.closePath(),t.fillStyle=M%2===0?"rgba(255, 200, 0, 0.18)":"rgba(0, 0, 0, 0.18)",t.fill()}t.save(),t.setLineDash([8,6]),t.strokeStyle="rgba(255, 255, 255, 0.08)",t.lineWidth=1,[-.9,-.45,0,.45,.9].forEach(M=>{t.beginPath(),t.moveTo(s,m),t.lineTo(s+Math.cos(M+Math.PI/2)*220,m+Math.sin(M+Math.PI/2)*80),t.stroke()}),t.setLineDash([]),t.restore(),t.save(),t.font="bold 32px Courier New, monospace",t.textAlign="center",t.fillStyle="rgba(255, 255, 255, 0.06)",t.translate(s,n*.72),t.scale(1,.3),t.fillText("LAUNCH PAD",0,0),t.restore();const v=s-20,S=n*.55-2;t.strokeStyle="rgba(60, 80, 120, 0.25)",t.lineWidth=.8;for(let M=v;M<=v+40;M+=4)t.beginPath(),t.moveTo(M,S),t.lineTo(M,S+10),t.stroke();for(let M=S;M<=S+10;M+=4)t.beginPath(),t.moveTo(v,M),t.lineTo(v+40,M),t.stroke()}function RM(t,e,n=!1){[.14,.36,.64,.86].forEach(o=>{const a=e*o,l=t.createRadialGradient(a,0,0,a,0,100);l.addColorStop(0,"rgba(255,158,38,0.20)"),l.addColorStop(1,"rgba(255,140,0,0.00)"),t.fillStyle=l,t.fillRect(a-100,0,200,100),t.fillStyle="rgba(36,40,50,0.92)",t.fillRect(a-14,0,28,7),t.fillStyle="rgba(255,178,58,0.88)",t.fillRect(a-10,5,20,4)});const i=n?[.1,.25,.5,.75,.9]:[.2,.5,.8],r=n?.28:.18,s=n?150:120;i.forEach(o=>{const a=e*o,l=t.createRadialGradient(a,0,0,a,0,s);l.addColorStop(0,`rgba(80, 160, 255, ${r})`),l.addColorStop(1,"rgba(80, 160, 255, 0.00)"),t.fillStyle=l,t.fillRect(a-s,0,s*2,s),t.fillStyle=n?"rgba(200, 235, 255, 0.90)":"rgba(160, 210, 255, 0.65)",t.fillRect(a-30,0,60,3)})}function PM(t,e,n,i){if(i<=.005)return;const r=t.createLinearGradient(0,0,0,180);r.addColorStop(0,`rgba(255, 15, 0, ${i})`),r.addColorStop(1,"rgba(255, 15, 0, 0)"),t.fillStyle=r,t.fillRect(0,0,e,180);const s=t.createLinearGradient(0,0,110,0);s.addColorStop(0,`rgba(220, 0, 0, ${i*.45})`),s.addColorStop(1,"rgba(220, 0, 0, 0)"),t.fillStyle=s,t.fillRect(0,0,110,n);const o=t.createLinearGradient(e-110,0,e,0);o.addColorStop(0,"rgba(220, 0, 0, 0)"),o.addColorStop(1,`rgba(220, 0, 0, ${i*.45})`),t.fillStyle=o,t.fillRect(e-110,0,110,n)}function NM(t,e,n,i,r,s,o){const a=s*.55,l=i-40,u=e-80,c=e+80,d=12,f=t.createLinearGradient(u-d/2,0,u+d/2,0);f.addColorStop(0,"#1a1f2e"),f.addColorStop(.5,"#2a3040"),f.addColorStop(1,"#1a1f2e"),t.fillStyle=f,t.fillRect(u-d/2,l,d,a-l);const p=t.createLinearGradient(c-d/2,0,c+d/2,0);p.addColorStop(0,"#1a1f2e"),p.addColorStop(.5,"#2a3040"),p.addColorStop(1,"#1a1f2e"),t.fillStyle=p,t.fillRect(c-d/2,l,d,a-l),t.strokeStyle="rgba(80, 100, 140, 0.7)",t.lineWidth=2;const m=a-l;for(let T=0;T<4;T++){const b=l+T/4*m,w=l+(T+1)/4*m;t.beginPath(),t.moveTo(u+d/2,b),t.lineTo(c-d/2,w),t.stroke(),t.beginPath(),t.moveTo(c-d/2,b),t.lineTo(u+d/2,w),t.stroke()}[.25,.55,.78].map(T=>l+T*m).forEach(T=>{t.fillStyle="#2a3040",t.fillRect(u+d/2,T-3,30,6),t.fillStyle="#3a4555",t.fillRect(u+d/2+28,T-4,4,8),t.fillStyle="#2a3040",t.fillRect(c-d/2-30,T-3,30,6),t.fillStyle="#3a4555",t.fillRect(c-d/2-32,T-4,4,8)});const g=l+m*.35,h=l+m*.65;t.strokeStyle="rgba(60, 80, 130, 0.85)",t.lineWidth=3,t.beginPath(),t.moveTo(u+d/2,g),t.lineTo(e-22,g),t.stroke(),t.beginPath(),t.moveTo(c-d/2,h),t.lineTo(e+22,h),t.stroke(),t.fillStyle="rgba(80, 110, 170, 0.9)",t.fillRect(e-28,g-4,8,8),t.fillRect(e+20,h-4,8,8),t.strokeStyle="rgba(50, 70, 110, 0.6)",t.lineWidth=1,t.beginPath(),t.moveTo(u-d/2+2,l+10),t.lineTo(u-d/2+2,a-5),t.stroke();for(let T=l+10;T<a-5;T+=8)t.beginPath(),t.moveTo(u-d/2+2,T),t.lineTo(u-d/2-5,T),t.stroke();const v=20,S=a-v;[u,c].forEach(T=>{t.save(),t.beginPath(),t.rect(T-d/2,S,d,v),t.clip();for(let b=0;b<6;b++)t.fillStyle=b%2===0?"rgba(255, 200, 0, 0.60)":"rgba(0, 0, 0, 0.50)",t.beginPath(),t.moveTo(T-d/2+b*4,S),t.lineTo(T-d/2+b*4+4,S),t.lineTo(T-d/2+b*4,S+v),t.lineTo(T-d/2+b*4-4,S+v),t.closePath(),t.fill();t.restore()}),[.1,.3,.55,.75,.9].forEach((T,b)=>{const w=l+T*m,y=Math.sin(o*2.5+b*1.1)>.3,C=y?.8:.25,R=y?.3:.05;[u,c].forEach(N=>{const I=t.createRadialGradient(N,w,0,N,w,14);I.addColorStop(0,`rgba(255, 200, 80, ${R})`),I.addColorStop(1,"rgba(255, 200, 80, 0)"),t.fillStyle=I,t.beginPath(),t.arc(N,w,14,0,Math.PI*2),t.fill(),t.beginPath(),t.arc(N,w,3,0,Math.PI*2),t.fillStyle=`rgba(255, 200, 80, ${C})`,t.fill()})}),t.strokeStyle="rgba(100, 120, 160, 0.5)",t.lineWidth=1,t.beginPath(),t.moveTo(u,l),t.lineTo(u-60,l-80),t.stroke(),t.beginPath(),t.moveTo(c,l),t.lineTo(c+60,l-80),t.stroke()}function LM(t,e,n,i){const r=e/2,s=n*.55,o=t.createRadialGradient(r,-20,0,r,-20,200);o.addColorStop(0,"rgba(100, 160, 255, 0.12)"),o.addColorStop(1,"rgba(100, 160, 255, 0)"),t.fillStyle=o,t.beginPath(),t.arc(r,-20,200,0,Math.PI*2),t.fill();const a=7;for(let l=0;l<a;l++){const u=(l-a/2)/a*.6,c=(.05+.02*Math.sin(i*.3+l*.7)).toFixed(3),d=Math.tan(u)*s,f=t.createLinearGradient(r,-20,r+d,s);f.addColorStop(0,`rgba(100, 160, 255, ${c})`),f.addColorStop(1,"rgba(100, 160, 255, 0)"),t.fillStyle=f;const p=8+l*3;t.beginPath(),t.moveTo(r-p*.1,-20),t.lineTo(r+p*.1,-20),t.lineTo(r+d+p,s),t.lineTo(r+d-p,s),t.closePath(),t.fill()}for(let l=0;l<4;l++){const u=r+Math.sin(i*1.2+l)*3+(l-2)*12,c=t.createLinearGradient(u,s-60,u,s+20);c.addColorStop(0,"rgba(255, 200, 100, 0)"),c.addColorStop(.5,`rgba(255, 200, 100, ${(.02+l*.005).toFixed(3)})`),c.addColorStop(1,"rgba(255, 200, 100, 0)"),t.fillStyle=c,t.fillRect(u-3,s-60,6,80)}for(let l=0;l<30;l++){const u=r-80+(Math.sin(l*127.1+i*.3+l)*.5+.5)*160,d=(((Math.sin(l*311.7)*.5+.5)*s-i*15*(.5+l%5*.1))%s+s)%s,f=(.04+.03*Math.sin(i*1.5+l*.7)).toFixed(3);t.beginPath(),t.arc(u,d,1,0,Math.PI*2),t.fillStyle=`rgba(200, 220, 255, ${f})`,t.fill()}}function IM(t,e,n,i,r=!1,s=1){const o=Math.sin(i*.8)*2.5,a=n+o,l=52,u=160,c=r?80:58,d=r?20:13,p=c*(.25+.75*s)+Math.sin(i*9)*d*s,m=.35+.6*s,_=t.createRadialGradient(e,a+6,1,e,a+8,Math.max(1,p*.5));_.addColorStop(0,`rgba(255, 255, 240, ${m})`),_.addColorStop(.3,`rgba(255, 240, 180, ${m*.9})`),_.addColorStop(.6,`rgba(255, 200,  80, ${m*.7})`),_.addColorStop(1,"rgba(255, 120,  20, 0.00)"),t.fillStyle=_,t.beginPath(),t.ellipse(e,a+18,Math.max(1,8*s),Math.max(1,p*.55),0,0,Math.PI*2),t.fill();const g=t.createRadialGradient(e,a+15,2,e,a+25,Math.max(1,p*.75));g.addColorStop(0,`rgba(255, 180,  60, ${m*.65})`),g.addColorStop(.4,`rgba(255, 100,  20, ${m*.45})`),g.addColorStop(.75,`rgba(200,  50,   0, ${m*.2})`),g.addColorStop(1,"rgba(150, 20, 0, 0)"),t.fillStyle=g,t.beginPath(),t.ellipse(e,a+28,Math.max(1,14*s),Math.max(1,p*.8),0,0,Math.PI*2),t.fill();const h=t.createRadialGradient(e,a+22,2,e,a+32,Math.max(1,p));if(h.addColorStop(0,`rgba(200,  80,  10, ${m*.5})`),h.addColorStop(.5,`rgba(160,  40, 180, ${m*.25})`),h.addColorStop(.8,`rgba(100,  20, 140, ${m*.12})`),h.addColorStop(1,"rgba(80,  10, 120, 0.00)"),t.fillStyle=h,t.beginPath(),t.ellipse(e,a+32,Math.max(1,20*s),Math.max(1,p),0,0,Math.PI*2),t.fill(),s>.5)for(let U=0;U<3;U++){const X=(i*6+U*1.2)%3,J=X/3,se=((1-J)*.18*s).toFixed(3);t.beginPath(),t.ellipse(e,a+10+X*12,Math.max(1,(12+J*18)*s),Math.max(1,(4+J*8)*s),0,0,Math.PI*2),t.strokeStyle=`rgba(255, 200, 80, ${se})`,t.lineWidth=1.5,t.stroke()}const v=t.createRadialGradient(e,a+10,0,e,a+10,30);v.addColorStop(0,"rgba(120, 180, 255, 0.30)"),v.addColorStop(.5,"rgba(80, 140, 255, 0.12)"),v.addColorStop(1,"rgba(60, 100, 255, 0)"),t.fillStyle=v,t.beginPath(),t.arc(e,a+10,30,0,Math.PI*2),t.fill();const S=t.createRadialGradient(e,a+16,0,e,a+16,30);S.addColorStop(0,"rgba(255, 150, 50, 0.08)"),S.addColorStop(1,"rgba(255, 150, 50, 0)"),t.fillStyle=S,t.beginPath(),t.arc(e,a+16,30,0,Math.PI*2),t.fill();for(let U=0;U<8;U++){const X=e+Math.sin(i*(3.1+U*.7)+U*1.8)*(6+U*2),J=a+10-(i*(15+U*5)+U*7)%30,se=(.3+.4*Math.sin(i*4+U)).toFixed(3);t.beginPath(),t.arc(X,J,.8+U%3*.4,0,Math.PI*2),t.fillStyle=`rgba(255, 200, 80, ${se})`,t.fill()}t.fillStyle="#3a3a42",t.beginPath(),t.moveTo(e-14,a),t.lineTo(e+14,a),t.lineTo(e+18,a+14),t.lineTo(e-18,a+14),t.closePath(),t.fill();for(let U=0;U<4;U++){const X=(U+1)/5,J=4+X*14,se=a+X*12;t.strokeStyle=`rgba(80, 80, 100, ${.6-U*.1})`,t.lineWidth=1,t.beginPath(),t.moveTo(e-J,se),t.lineTo(e+J,se),t.stroke()}const M=t.createRadialGradient(e,a+2,0,e,a+2,8);M.addColorStop(0,"rgba(200, 230, 255, 0.50)"),M.addColorStop(1,"rgba(100, 160, 255, 0)"),t.fillStyle=M,t.beginPath(),t.arc(e,a+2,8,0,Math.PI*2),t.fill(),t.strokeStyle="rgba(180,180,200,0.60)",t.lineWidth=1.5,t.beginPath(),t.moveTo(e-18,a+14),t.lineTo(e+18,a+14),t.stroke(),[[-1,e-l/2],[1,e+l/2]].forEach(([U,X])=>{const J=t.createLinearGradient(X,a-50,X-U*32,a);J.addColorStop(0,"rgba(200, 210, 230, 0.88)"),J.addColorStop(1,"rgba(140, 150, 170, 0.72)"),t.fillStyle=J,t.beginPath(),t.moveTo(X,a-48),t.lineTo(X-U*30,a+12),t.lineTo(X-U*8,a+12),t.lineTo(X,a-30),t.closePath(),t.fill(),t.fillStyle="rgba(210, 45, 35, 0.72)",t.beginPath(),t.moveTo(X,a-30),t.lineTo(X-U*8,a+12),t.lineTo(X-U*14,a+12),t.lineTo(X,a-22),t.closePath(),t.fill()});const T=t.createLinearGradient(e-l/2,0,e+l/2,0);T.addColorStop(0,"rgba(90,  95, 110, 0.95)"),T.addColorStop(.18,"rgba(200, 210, 225, 0.97)"),T.addColorStop(.32,"rgba(235, 240, 252, 0.98)"),T.addColorStop(.55,"rgba(215, 220, 235, 0.97)"),T.addColorStop(.78,"rgba(175, 180, 196, 0.96)"),T.addColorStop(1,"rgba(110, 115, 130, 0.94)"),t.fillStyle=T,St(t,e-l/2,a-u,l,u,8),t.fill(),t.save(),St(t,e-l/2,a-u,l,u,8),t.clip();const b=t.createRadialGradient(e-8,a-u*.5,4,e-8,a-u*.5,l*.9);b.addColorStop(0,"rgba(255, 255, 255, 0.08)"),b.addColorStop(.5,"rgba(255, 255, 255, 0.02)"),b.addColorStop(1,"rgba(0, 0, 0, 0.10)"),t.fillStyle=b,t.fillRect(e-l/2,a-u,l,u),t.restore();const w=[.12,.22,.34,.46,.57,.68,.79,.9].map(U=>a-u+u*U);t.strokeStyle="rgba(60, 65, 80, 0.20)",t.lineWidth=1,w.forEach(U=>{t.beginPath(),t.moveTo(e-l/2+2,U),t.lineTo(e+l/2-2,U),t.stroke()}),t.strokeStyle="rgba(60, 65, 80, 0.15)",[e-10,e+10].forEach(U=>{t.beginPath(),t.moveTo(U,a-u+5),t.lineTo(U,a-5),t.stroke()}),[{x:e-l/2+6,y:a-u+u*.22},{x:e+l/2-6,y:a-u+u*.22},{x:e-l/2+6,y:a-u+u*.46},{x:e+l/2-6,y:a-u+u*.46},{x:e-l/2+6,y:a-u+u*.68},{x:e+l/2-6,y:a-u+u*.68},{x:e-l/2+6,y:a-u+u*.88},{x:e+l/2-6,y:a-u+u*.88},{x:e-18,y:a-u+u*.34},{x:e+18,y:a-u+u*.34},{x:e-18,y:a-u+u*.57},{x:e+18,y:a-u+u*.57}].forEach(({x:U,y:X})=>{t.beginPath(),t.arc(U,X,2,0,Math.PI*2),t.fillStyle="#cccccc",t.fill(),t.strokeStyle="#888888",t.lineWidth=.8,t.stroke()}),t.strokeStyle="rgba(90, 95, 110, 0.50)",t.lineWidth=1.5,t.beginPath(),t.moveTo(e-l/2+4,a-u+10),t.lineTo(e-l/2+4,a-10),t.stroke(),t.strokeStyle="rgba(100, 180, 255, 0.6)",t.lineWidth=1.5,t.beginPath(),t.moveTo(e-l/2+1,a-u+12),t.lineTo(e-l/2+1,a-12),t.stroke(),t.fillStyle="rgba(210, 38, 28, 0.88)",t.fillRect(e-l/2,a-u+2,l,14),t.fillStyle="rgba(210, 38, 28, 0.78)",t.fillRect(e-l/2,a-80,l,10),t.fillStyle="rgba(190, 30, 22, 0.60)",t.fillRect(e-l/2,a-44,l,5),t.save(),t.fillStyle="rgba(40, 40, 55, 0.70)",t.font="bold 9px Courier New, monospace",t.textAlign="center",t.fillText("TCB-1",e,a-95),t.restore();const C=t.createLinearGradient(e-l/2,a-u,e+l/2,a-u);C.addColorStop(0,"rgba(80,  85, 100, 0.92)"),C.addColorStop(.3,"rgba(200, 210, 228, 0.95)"),C.addColorStop(.55,"rgba(225, 232, 248, 0.97)"),C.addColorStop(.8,"rgba(185, 192, 210, 0.93)"),C.addColorStop(1,"rgba(100, 105, 120, 0.90)"),t.fillStyle=C,t.beginPath(),t.moveTo(e-l/2,a-u),t.lineTo(e+l/2,a-u),t.quadraticCurveTo(e+l/2-4,a-u-40,e,a-u-72),t.quadraticCurveTo(e-l/2+4,a-u-40,e-l/2,a-u),t.fill(),t.save(),t.beginPath(),t.moveTo(e-l/2,a-u),t.lineTo(e+l/2,a-u),t.quadraticCurveTo(e+l/2-4,a-u-40,e,a-u-72),t.quadraticCurveTo(e-l/2+4,a-u-40,e-l/2,a-u),t.clip();const R=t.createLinearGradient(e,a-u-72,e,a-u-30);R.addColorStop(0,"rgba(60, 20, 5, 0.35)"),R.addColorStop(1,"rgba(60, 20, 5, 0)"),t.fillStyle=R,t.fillRect(e-l/2,a-u-72,l,42),t.strokeStyle="rgba(60, 30, 0, 0.3)",t.lineWidth=.5;for(let U=e-l/2;U<e+l/2;U+=3)t.beginPath(),t.moveTo(U,a-u-72),t.lineTo(U,a-u-30),t.stroke();for(let U=a-u-72;U<a-u-30;U+=3)t.beginPath(),t.moveTo(e-l/2,U),t.lineTo(e+l/2,U),t.stroke();t.restore(),t.strokeStyle="rgba(255, 255, 255, 0.45)",t.lineWidth=1.5,t.beginPath(),t.moveTo(e+8,a-u-2),t.quadraticCurveTo(e+10,a-u-30,e+3,a-u-62),t.stroke();const N=a-u+48;t.beginPath(),t.arc(e,N,13,0,Math.PI*2),t.fillStyle="rgba(80, 85, 100, 0.90)",t.fill(),t.beginPath(),t.arc(e,N,10,0,Math.PI*2),t.fillStyle="rgba(40, 180, 255, 0.28)",t.fill(),t.strokeStyle="rgba(100, 210, 255, 0.75)",t.lineWidth=1.5,t.stroke(),t.beginPath(),t.arc(e-3,N-3,3.5,0,Math.PI*2),t.fillStyle="rgba(255, 255, 255, 0.30)",t.fill();const I=r?180:120,F=r?.14:.06,z=t.createRadialGradient(e,a-u/2,10,e,a-u/2,I);if(z.addColorStop(0,`rgba(200, 220, 255, ${F})`),z.addColorStop(1,"rgba(200, 220, 255, 0.00)"),t.fillStyle=z,t.beginPath(),t.ellipse(e,a-u/2,I,I*1.5,0,0,Math.PI*2),t.fill(),r){const U=t.createRadialGradient(e,a-u/2,I*.5,e,a-u/2,I*2.2);U.addColorStop(0,"rgba(255, 160, 60, 0.08)"),U.addColorStop(1,"rgba(255, 160, 60, 0.00)"),t.fillStyle=U,t.beginPath(),t.ellipse(e,a-u/2,I*2.2,I*3,0,0,Math.PI*2),t.fill()}const D=n+6,G=t.createRadialGradient(e,D,0,e,D,50),H=(.06+.04*s).toFixed(3);G.addColorStop(0,`rgba(255, 180, 80, ${H})`),G.addColorStop(.5,`rgba(200, 120, 40, ${(parseFloat(H)*.5).toFixed(3)})`),G.addColorStop(1,"rgba(100, 50, 0, 0)"),t.fillStyle=G,t.beginPath(),t.ellipse(e,D,50,12,0,0,Math.PI*2),t.fill()}function DM(t,e,n){const i=.7+.3*Math.sin(n*2.8);e.forEach(({x:r,y:s})=>{const o=s-84,a=t.createRadialGradient(r,o,0,r,o,16);a.addColorStop(0,`rgba(0, 255, 130, ${(.3*i).toFixed(3)})`),a.addColorStop(1,"rgba(0, 255, 130, 0)"),t.fillStyle=a,t.beginPath(),t.arc(r,o,16,0,Math.PI*2),t.fill(),t.beginPath(),t.arc(r,o,3.5,0,Math.PI*2),t.fillStyle=`rgba(0, 255, 130, ${(.9*i).toFixed(2)})`,t.fill()})}function UM(t,e,n,i){const r=.8+.2*Math.sin(i*1.5),s=n*.55,o=t.createLinearGradient(0,0,0,s*.7);o.addColorStop(0,`rgba(0, 200, 100, ${(.06*r).toFixed(3)})`),o.addColorStop(1,"rgba(0, 200, 100, 0)"),t.fillStyle=o,t.fillRect(0,0,e,s*.7),t.strokeStyle=`rgba(0, 220, 110, ${(.14*r).toFixed(3)})`,t.lineWidth=1;const a=6;for(let l=1;l<=a;l++){const u=l/(a+1),c=s+(n-s)*Math.pow(u,1.8);t.beginPath(),t.moveTo(0,c),t.lineTo(e,c),t.stroke()}}function FM(t,e,n,i,r,s){const o=n-230,a=.65+.35*Math.sin(s*2.1),l=e+55,u=o-90,c=e+200,d=o-210,f=i*.82,p=r*.06;t.save(),t.beginPath(),t.moveTo(e,o),t.bezierCurveTo(l,u,c,d,f,p),t.strokeStyle=`rgba(0, 210, 255, ${(.08*a).toFixed(3)})`,t.lineWidth=14,t.setLineDash([]),t.stroke(),t.beginPath(),t.moveTo(e,o),t.bezierCurveTo(l,u,c,d,f,p),t.strokeStyle=`rgba(0, 200, 255, ${(.72*a).toFixed(3)})`,t.lineWidth=1.5,t.setLineDash([7,5]),t.lineDashOffset=-(s*20)%12,t.stroke(),t.setLineDash([]),t.beginPath(),t.arc(f,p,4,0,Math.PI*2),t.fillStyle=`rgba(0, 230, 255, ${(.85*a).toFixed(3)})`,t.fill(),t.fillStyle=`rgba(0, 210, 255, ${(.55*a).toFixed(3)})`,t.font="bold 8px 'Courier New', monospace",t.textAlign="center",t.fillText("TRAJECTORY LOCKED",f,p+16),t.restore()}const j0={power:{rows:[["VOLT","11.4kV"],["LOAD","68%"]],status:"STANDBY",onlineStatus:"ONLINE"},fuel:{rows:[["PRESS","245kPa"],["TEMP","18°C"]],status:"STANDBY",onlineStatus:"ONLINE"},nav:{rows:[["COORD","X-42"],["SPEED","000"]],status:"LOCKED",onlineStatus:"CALIBRATED"},comms:{rows:[["FREQ","24.8GHz"],["SIG","98%"]],status:"OFFLINE",onlineStatus:"ONLINE"},diagnostics:{rows:[["TEMP","62°C"],["CORE","NOMINAL"]],status:"HEALTHY",onlineStatus:"NOMINAL"},engine:{rows:[["THRUST","000%"],["FUEL","100%"]],status:"IDLE",onlineStatus:"ARMED"}},OM={power:{intensity:.3,flicker:!1},fuel:{intensity:.34,flicker:!1},nav:{intensity:.26,flicker:!1},comms:{intensity:.32,flicker:!0,flickerFreq:3.8},diagnostics:{intensity:.36,flicker:!1},engine:{intensity:.44,flicker:!0,flickerFreq:5.2}};function kM(t,e,n,i,r,s,o=!1){const a=Object.keys(j0).find(Be=>i.toLowerCase().includes(Be))||"power",l=90,u=110,c=OM[a]||{intensity:.3,flicker:!1},d=c.flicker?.72+.28*Math.sin(s*c.flickerFreq)*(.6+.4*Math.sin(s*19.1)):1,f=(.6+.4*Math.sin(s*2.2))*d,p=a.charCodeAt(0)*.41;let m,_,g,h,v,S;r?([m,_,g]=[255,179,71],[h,v,S]=[255,215,140]):o?([m,_,g]=[34,255,136],[h,v,S]=[110,255,185]):([m,_,g]=[0,175,255],[h,v,S]=[140,215,255]);const M=90+c.intensity*50;{const Be=c.intensity*.45*(.5+.5*f),q=t.createRadialGradient(e,n-u*.45,0,e,n-u*.45,M);q.addColorStop(0,`rgba(${m},${_},${g},${Be.toFixed(3)})`),q.addColorStop(1,`rgba(${m},${_},${g},0.000)`),t.fillStyle=q,t.beginPath(),t.ellipse(e,n-u*.45,M,M*.7,0,0,Math.PI*2),t.fill()}if(r){const Be=t.createRadialGradient(e,n,0,e,n,110);Be.addColorStop(0,`rgba(${m},${_},${g},${(.14*f).toFixed(2)})`),Be.addColorStop(1,`rgba(${m},${_},${g},0.000)`),t.fillStyle=Be,t.beginPath(),t.ellipse(e,n,110,80,0,0,Math.PI*2),t.fill()}const T=t.createLinearGradient(e-5,0,e+5,0);T.addColorStop(0,"rgba(18,45,88,0.95)"),T.addColorStop(.5,"rgba(38,75,138,0.95)"),T.addColorStop(1,"rgba(18,45,88,0.95)"),t.fillStyle=T,t.fillRect(e-4,n,8,26),t.fillStyle="rgba(28,58,106,0.92)",t.beginPath(),t.moveTo(e-4,n+2),t.lineTo(e-18,n+20),t.lineTo(e-18,n+27),t.lineTo(e-14,n+27),t.lineTo(e-2,n+8),t.closePath(),t.fill(),t.beginPath(),t.moveTo(e+4,n+2),t.lineTo(e+18,n+20),t.lineTo(e+18,n+27),t.lineTo(e+14,n+27),t.lineTo(e+2,n+8),t.closePath(),t.fill();const b=t.createLinearGradient(e-24,n+22,e+24,n+32);b.addColorStop(0,"rgba(12,32,72,0.98)"),b.addColorStop(.5,`rgba(${m},${_},${g},0.12)`),b.addColorStop(1,"rgba(12,32,72,0.98)"),t.fillStyle=b,St(t,e-24,n+22,48,10,3),t.fill(),t.strokeStyle=`rgba(${m},${_},${g},0.22)`,t.lineWidth=1,St(t,e-24,n+22,48,10,3),t.stroke(),t.strokeStyle="rgba(28,48,72,0.50)",t.lineWidth=2,t.beginPath(),t.moveTo(e,n+32),t.quadraticCurveTo(e+20,n+55,e+40,n+78),t.stroke();const w=e-l/2,y=n-u,C=t.createLinearGradient(w,y,w+l,y+u);C.addColorStop(0,"rgba(6,18,46,0.97)"),C.addColorStop(.5,"rgba(9,22,54,0.97)"),C.addColorStop(1,"rgba(5,13,38,0.97)"),t.fillStyle=C,St(t,w,y,l,u,7),t.fill();const R=r?Math.min(.95,.75+.25*f):o?.5+.22*f:c.intensity*.9*f;t.strokeStyle=`rgba(${m},${_},${g},${R.toFixed(2)})`,t.lineWidth=r?1.8:1.5,St(t,w,y,l,u,7),t.stroke(),t.strokeStyle=`rgba(${m},${_},${g},0.10)`,t.lineWidth=1,t.beginPath(),t.moveTo(w+8,y+1),t.lineTo(w+l-8,y+1),t.stroke();const N=6;t.strokeStyle=`rgba(${m},${_},${g},${(.22*f).toFixed(2)})`,t.lineWidth=1,[[w,y],[w+l,y],[w,y+u],[w+l,y+u]].forEach(([Be,q],ve)=>{const K=ve===1||ve===3?-1:1,ue=ve===2||ve===3?-1:1;t.beginPath(),t.moveTo(Be+K*1,q+ue*(N+1)),t.lineTo(Be+K*1,q+ue*1),t.lineTo(Be+K*(N+1),q+ue*1),t.stroke()});const I=w+6,F=y+6,z=l-12,D=u-12,G=t.createLinearGradient(I,F,I+z,F+D);G.addColorStop(0,"rgba(0,16,48,0.96)"),G.addColorStop(1,"rgba(0,9,28,0.96)"),t.fillStyle=G,St(t,I,F,z,D,4),t.fill(),t.fillStyle=`rgba(${m},${_},${g},0.022)`;for(let Be=F+2;Be<F+D-2;Be+=3)t.fillRect(I+2,Be,z-4,1.5);const H=F+s*26%D,U=t.createLinearGradient(0,H-8,0,H+8);U.addColorStop(0,`rgba(${m},${_},${g},0.000)`),U.addColorStop(.5,`rgba(${m},${_},${g},0.055)`),U.addColorStop(1,`rgba(${m},${_},${g},0.000)`),t.fillStyle=U,t.fillRect(I,Math.max(F,H-8),z,16);const X=F+12,J=a==="diagnostics"?"DIAG":a.toUpperCase();t.font="bold 7px Courier New, monospace",t.textAlign="left",t.fillStyle=`rgba(${m},${_},${g},${r?.95:.72})`,t.fillText(J,I+5,X);const se=j0[a],ye=o?"ONLINE":se?se.status:"STANDBY",[Ge,He,Ue]=o?[34,255,136]:[255,179,71];t.font="6px Courier New, monospace",t.textAlign="right",t.fillStyle=`rgba(${Ge},${He},${Ue},0.80)`,t.fillText(ye,I+z-4,X),t.strokeStyle=`rgba(${m},${_},${g},0.18)`,t.lineWidth=.75,t.beginPath(),t.moveTo(I+4,X+4),t.lineTo(I+z-4,X+4),t.stroke();const te=se?se.rows:[["--","---"],["--","---"]],me=X+16,de=14;te.slice(0,2).forEach(([Be,q],ve)=>{const K=me+ve*de;t.beginPath(),t.arc(I+7,K-2.5,1.8,0,Math.PI*2),t.fillStyle=`rgba(${m},${_},${g},0.60)`,t.fill(),t.font="6px Courier New, monospace",t.textAlign="left",t.fillStyle=`rgba(${m},${_},${g},0.48)`,t.fillText(Be,I+13,K),t.textAlign="right",t.fillStyle=`rgba(${h},${v},${S},${r?.98:.9})`,t.fillText(q,I+z-5,K),t.strokeStyle=`rgba(${m},${_},${g},0.08)`,t.lineWidth=.5,t.beginPath(),t.moveTo(I+4,K+6),t.lineTo(I+z-4,K+6),t.stroke()});const Pe=me+2*de+5,ke=o?se?se.onlineStatus:"ONLINE":se?se.status:"STANDBY";t.beginPath(),t.arc(I+7,Pe-2.5,1.8,0,Math.PI*2),t.fillStyle=`rgba(${Ge},${He},${Ue},0.70)`,t.fill(),t.font="6px Courier New, monospace",t.textAlign="left",t.fillStyle=`rgba(${m},${_},${g},0.48)`,t.fillText("STATUS",I+13,Pe),t.textAlign="right",t.fillStyle=`rgba(${Ge},${He},${Ue},${r?.98:.9})`,t.fillText(ke,I+z-5,Pe),t.strokeStyle=`rgba(${m},${_},${g},0.14)`,t.lineWidth=.75,t.beginPath(),t.moveTo(I+4,Pe+5),t.lineTo(I+z-4,Pe+5),t.stroke();const Fe=Pe+8,it=14,Xe=Fe+it/2;t.fillStyle=`rgba(${m},${_},${g},0.055)`,St(t,I+3,Fe,z-6,it,2),t.fill();const et=I+5,he=I+z-5-et;if(a==="fuel"){const q=(he-9)/10,ve=it-3,K=r?.8:o?.65:.28;for(let ue=0;ue<10;ue++){const x=et+ue*(q+1),E=Math.max(2,(.3+.7*Math.abs(Math.sin(ue*.95+s*.5+p)))*ve*(o?1:.4));t.fillStyle=`rgba(${m},${_},${g},${K})`,St(t,x,Xe+it/2-1-E,q,E,1),t.fill()}}else{const Be=it*.33*(o?1:.38);for(let q=0;q<2;q++){t.beginPath();for(let ve=0;ve<=30;ve++){const K=et+ve/30*he,ue=ve/30*Math.PI*5+s*2.1+p,x=Xe+Math.sin(ue)*Be*(.8+.2*Math.sin(ue*.6+s*.7));ve===0?t.moveTo(K,x):t.lineTo(K,x)}q===0?(t.strokeStyle=`rgba(${m},${_},${g},${r?.9:o?.75:.4})`,t.lineWidth=1.2):(t.strokeStyle=`rgba(${m},${_},${g},0.12)`,t.lineWidth=3),t.stroke()}t.lineWidth=1}const lt=w+l-10,tt=y+10;let We;r?We=Math.floor(s*4)%2===0?"rgba(255,179,71,0.95)":"rgba(255,179,71,0.12)":o?We=`rgba(34,255,136,${(.8+.2*f).toFixed(2)})`:We=`rgba(0,175,255,${(.55+.25*f).toFixed(2)})`;const O=t.createRadialGradient(lt,tt,0,lt,tt,7);O.addColorStop(0,We),O.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=O,t.beginPath(),t.arc(lt,tt,7,0,Math.PI*2),t.fill(),t.beginPath(),t.arc(lt,tt,2.5,0,Math.PI*2),t.fillStyle=We,t.fill(),t.save(),t.translate(I+14,F+10),t.rotate(-.52),t.beginPath(),t.ellipse(0,0,10,5,0,0,Math.PI*2),t.fillStyle="rgba(255,255,255,0.045)",t.fill(),t.restore(),t.fillStyle=`rgba(${m},${_},${g},${r?.95:o?.7:.5})`,t.font="bold 8px 'Courier New', monospace",t.textAlign="center",t.fillText(i.toUpperCase(),e,n+42)}function BM(t,e,n,i){const o=.65+.35*Math.sin(i*1.6);for(let u=4;u>=1;u--)t.beginPath(),t.ellipse(e,n,88+u*14,20+u*3,0,0,Math.PI*2),t.strokeStyle=`rgba(0,175,255,${(.04*o/u).toFixed(3)})`,t.lineWidth=u*5,t.stroke();t.beginPath(),t.ellipse(e,n,88,20,0,0,Math.PI*2);const a=t.createLinearGradient(e-88,n,e+88,n);a.addColorStop(0,"rgba(0,175,255,0.00)"),a.addColorStop(.2,`rgba(0,175,255,${(.85*o).toFixed(2)})`),a.addColorStop(.5,`rgba(100,220,255,${(.95*o).toFixed(2)})`),a.addColorStop(.8,`rgba(0,175,255,${(.85*o).toFixed(2)})`),a.addColorStop(1,"rgba(0,175,255,0.00)"),t.strokeStyle=a,t.lineWidth=2.5,t.stroke();const l=t.createRadialGradient(e,n,0,e,n,88);l.addColorStop(0,`rgba(0,175,255,${(.06*o).toFixed(3)})`),l.addColorStop(.6,`rgba(0,175,255,${(.025*o).toFixed(3)})`),l.addColorStop(1,"rgba(0,175,255,0.000)"),t.fillStyle=l,t.beginPath(),t.ellipse(e,n,88,20,0,0,Math.PI*2),t.fill(),t.lineWidth=1;for(let u=0;u<12;u++){const c=u/12*Math.PI*2,d=e+Math.cos(c)*88,f=n+Math.sin(c)*20,p=e+Math.cos(c)*83,m=n+Math.sin(c)*(20-1.5);t.beginPath(),t.moveTo(d,f),t.lineTo(p,m),t.strokeStyle=`rgba(0,175,255,${(.45*o).toFixed(2)})`,t.lineWidth=u%3===0?1.5:.75,t.stroke()}t.lineWidth=1}function zM(t,e,n,i,r){const s=Math.sin(r*6)*(Math.abs(i)>10?3:1),o=n+s,a=i>5?1:i<-5?-1:0,l=1.3;t.beginPath(),t.ellipse(e,o+4,20,4,0,0,Math.PI*2),t.fillStyle="rgba(0, 0, 0, 0.30)",t.fill();const u=Math.abs(i)>8?Math.sin(r*9)*5:0;[[-7*l,u],[7*l,-u]].forEach(([d,f])=>{const p=e+d-5*l,m=o-2+18*l+Math.abs(f*.3);St(t,p,m,10*l,6,3),t.fillStyle="rgba(30, 50, 100, 0.90)",t.fill()}),[[-7*l,u],[7*l,-u]].forEach(([d,f])=>{t.fillStyle="rgba(55, 90, 160, 0.90)",t.fillRect(e+d-4*l,o-2,8*l,18*l+Math.abs(f*.3)),t.strokeStyle="rgba(0, 0, 0, 0.30)",t.lineWidth=1,t.beginPath(),t.moveTo(e+d,o-2),t.lineTo(e+d,o-2+16*l),t.stroke()});const c=t.createRadialGradient(e,o-16*l,2,e,o-16*l,20*l);c.addColorStop(0,"rgba(120, 170, 230, 0.95)"),c.addColorStop(1,"rgba(50,  90,  160, 0.95)"),t.fillStyle=c,St(t,e-14*l,o-30*l,28*l,28*l,7),t.fill(),t.strokeStyle="rgba(0, 0, 0, 0.30)",t.lineWidth=1,t.beginPath(),t.moveTo(e,o-30*l),t.lineTo(e,o-2),t.stroke(),t.beginPath(),t.moveTo(e-14*l,o-18*l),t.lineTo(e+14*l,o-18*l),t.stroke(),[[-1,-14*l-4],[1,14*l+4-10]].forEach(([d,f])=>{t.fillStyle="rgba(80, 120, 200, 0.90)",St(t,e+f-0,o-30*l,10,10,4),t.fill()}),t.beginPath(),t.arc(e,o-36*l,15*l,0,Math.PI*2),t.fillStyle="rgba(40, 70, 130, 0.95)",t.fill(),t.beginPath(),t.ellipse(e+a*2*l,o-36*l,10*l,8*l,0,0,Math.PI*2),t.fillStyle="rgba(10, 190, 255, 0.55)",t.fill(),t.save(),t.translate(e+a*2*l-3,o-36*l-2),t.beginPath(),t.ellipse(0,0,5*l,3*l,-.4,Math.PI*1.1,Math.PI*1.8),t.strokeStyle="rgba(255, 255, 255, 0.35)",t.lineWidth=1.5,t.stroke(),t.beginPath(),t.ellipse(3,2,2*l,1.5*l,.2,Math.PI*1.1,Math.PI*1.75),t.strokeStyle="rgba(255, 255, 255, 0.20)",t.lineWidth=1,t.stroke(),t.restore(),t.beginPath(),t.ellipse(e+a*2*l-3,o-39*l,3.5,2.5,-.4,0,Math.PI*2),t.fillStyle="rgba(255, 255, 255, 0.60)",t.fill(),t.fillStyle="rgba(30, 55, 110, 0.85)",St(t,e-18*l,o-28*l,7*l,22*l,3),t.fill(),t.fillStyle="rgba(50, 80, 150, 0.7)",t.fillRect(e-18*l+1,o-14*l,5*l,3),t.fillRect(e-18*l+1,o-10*l,5*l,2),t.fillStyle="rgba(80, 110, 180, 0.8)",t.beginPath(),t.arc(e-18*l+3,o-14*l+1,2,0,Math.PI*2),t.fill()}function GM(t,e,n,i){const r=t.createLinearGradient(0,0,0,n);r.addColorStop(0,"#020818"),r.addColorStop(.55,"#04102a"),r.addColorStop(1,"#060e22"),t.fillStyle=r,t.fillRect(0,0,e,n),[{x:e*.15,y:n*.18,rx:220,ry:130,r:"rgba(60,15,120,0.28)",phase:0},{x:e*.8,y:n*.1,rx:200,ry:115,r:"rgba(8,45,140,0.26)",phase:1.3},{x:e*.5,y:n*.3,rx:270,ry:155,r:"rgba(28,10,95,0.20)",phase:2.1},{x:e*.32,y:n*.22,rx:180,ry:100,r:"rgba(12,65,160,0.18)",phase:.8},{x:e*.68,y:n*.36,rx:165,ry:95,r:"rgba(75,8,130,0.16)",phase:1.7}].forEach(({x:m,y:_,rx:g,ry:h,r:v,phase:S})=>{const M=m+Math.sin(i*.011+S)*10,T=t.createRadialGradient(M,_,0,M,_,Math.max(g,h));T.addColorStop(0,v),T.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=T,t.beginPath(),t.ellipse(M,_,g,h,0,0,Math.PI*2),t.fill()});const o=e*.85,a=n*.12,l=80,u=i!==void 0?i*.001:0;t.save(),t.beginPath(),t.arc(o,a,l,0,Math.PI*2),t.clip();const c=t.createRadialGradient(o-20,a-20,10,o,a,l);c.addColorStop(0,"rgba(180, 195, 215, 0.90)"),c.addColorStop(.4,"rgba(140, 160, 185, 0.88)"),c.addColorStop(.75,"rgba(100, 120, 150, 0.85)"),c.addColorStop(1,"rgba(60, 75, 100, 0.80)"),t.fillStyle=c,t.fillRect(o-l,a-l,l*2,l*2),[{dx:20,dy:-15,rx:14,ry:10},{dx:-25,dy:20,rx:10,ry:8},{dx:10,dy:30,rx:18,ry:12},{dx:-10,dy:-30,rx:8,ry:6}].forEach(({dx:m,dy:_,rx:g,ry:h},v)=>{const S=u+v*.8,M=m*Math.cos(S)-_*Math.sin(S),T=m*Math.sin(S)+_*Math.cos(S);t.beginPath(),t.ellipse(o+M,a+T,g,h,S*.5,0,Math.PI*2),t.fillStyle="rgba(50, 60, 80, 0.40)",t.fill(),t.strokeStyle="rgba(200, 215, 235, 0.15)",t.lineWidth=1,t.stroke()}),t.restore();const f=t.createRadialGradient(o,a,l*.9,o,a,l*1.55);f.addColorStop(0,"rgba(130, 175, 255, 0.00)"),f.addColorStop(.22,"rgba(110, 160, 255, 0.28)"),f.addColorStop(.55,"rgba(80,  130, 220, 0.14)"),f.addColorStop(.8,"rgba(60,  100, 190, 0.06)"),f.addColorStop(1,"rgba(0,   0,   0,   0.00)"),t.fillStyle=f,t.beginPath(),t.arc(o,a,l*1.55,0,Math.PI*2),t.fill();const p=t.createRadialGradient(o,a,l*.82,o,a,l*1.12);p.addColorStop(0,"rgba(150, 200, 255, 0.00)"),p.addColorStop(.5,"rgba(120, 170, 255, 0.18)"),p.addColorStop(1,"rgba(80,  130, 220, 0.00)"),t.fillStyle=p,t.beginPath(),t.arc(o,a,l*1.12,0,Math.PI*2),t.fill()}function VM(t,e,n,i,r){const s=i*.55,o=n+14;if(o>=s)return;const a=14,l=70,u=t.createLinearGradient(e,o,e,s);u.addColorStop(0,"rgba(255, 200, 80, 0.22)"),u.addColorStop(.5,"rgba(255, 150, 40, 0.12)"),u.addColorStop(1,"rgba(255, 100, 10, 0.04)"),t.fillStyle=u,t.beginPath(),t.moveTo(e-a,o),t.lineTo(e+a,o),t.lineTo(e+l,s),t.lineTo(e-l,s),t.closePath(),t.fill();const c=t.createLinearGradient(e,o,e,s);c.addColorStop(0,"rgba(255, 245, 200, 0.40)"),c.addColorStop(.3,"rgba(255, 210, 120, 0.20)"),c.addColorStop(1,"rgba(255, 160, 60, 0.06)"),t.fillStyle=c,t.beginPath(),t.moveTo(e-a*.35,o),t.lineTo(e+a*.35,o),t.lineTo(e+l*.3,s),t.lineTo(e-l*.3,s),t.closePath(),t.fill();const d=(.22+.08*Math.sin(r*4.2))*1,f=t.createRadialGradient(e,s,0,e,s,l*1.5);f.addColorStop(0,`rgba(255, 190, 60, ${d.toFixed(3)})`),f.addColorStop(.4,`rgba(255, 110, 20, ${(d*.55).toFixed(3)})`),f.addColorStop(1,"rgba(200, 50, 0, 0.00)"),t.fillStyle=f,t.beginPath(),t.ellipse(e,s,l*1.5,16,0,0,Math.PI*2),t.fill()}function HM(t,e,n,i){for(let r=0;r<24;r++){const s=r*137.508,a=(i*(1.8+r%5*.35)+s*.01)%3.5/3.5;if(a>.88)continue;const l=a<.18?a/.18*.45:(1-(a-.18)/.7)*.45;if(l<.01)continue;const u=(Math.sin(s*.13)*.5+.5)*50-25,c=a*55,d=Math.sin(i*1.3+s*.07)*4,f=e+u+d,p=n+8-c,m=.7+(1-a)*1.8,_=Math.floor(180+a*50),g=Math.floor(80+a*80);t.beginPath(),t.arc(f,p,m,0,Math.PI*2),t.fillStyle=`rgba(255, ${_}, ${g}, ${l.toFixed(3)})`,t.fill()}}const gu=[-.35,-.21,-.07,.07,.21,.35],WM=[[0,2,4],[1,3,5],[3,1,4]],XM=[1.3,4.1,7.6],jM=55,sd=[3.8,4.5,3.2],W_=1.1,$0=[{body0:"rgba(225,108,32,0.92)",body1:"rgba(152,60,10,0.92)",legs:"rgba(170,76,15,0.90)",boots:"rgba(112,46,8,0.92)",pack:"rgba(122,46,10,0.85)",helm:"rgba(66,34,12,0.95)",arms:"rgba(160,70,14,0.90)"},{body0:"rgba(136,150,166,0.92)",body1:"rgba(74,84,96,0.92)",legs:"rgba(84,94,108,0.90)",boots:"rgba(52,58,70,0.92)",pack:"rgba(54,64,76,0.85)",helm:"rgba(44,54,64,0.95)",arms:"rgba(76,86,102,0.90)"},{body0:"rgba(208,175,34,0.92)",body1:"rgba(140,110,8,0.92)",legs:"rgba(152,128,14,0.90)",boots:"rgba(102,80,6,0.92)",pack:"rgba(112,90,8,0.85)",helm:"rgba(70,54,10,0.95)",arms:"rgba(142,118,12,0.90)"}];function $M(t,e){return WM.map((n,i)=>{const r=i%n.length,s=n[r],o=t*.5+gu[s]*t,a=i===1,l=gu[s]<0?1:-1;return{id:i,x:a?o-55:o,y:e*.7,route:n,routeIdx:r,state:a?"walking":"working",workTimer:a?0:sd[i]*(i===2?.55:1),reactTimer:0,reactDir:1,facing:a?1:l,seed:XM[i]}})}function YM(t,e,n,i,r){r||!t||t.forEach(s=>{if(s.y=i*.7,s.state==="reacting"){s.reactTimer-=e,s.reactTimer<=0&&(s.state="working",s.workTimer=sd[s.id]*.35);return}if(s.state==="working"){s.workTimer-=e,s.workTimer<=0&&(s.routeIdx=(s.routeIdx+1)%s.route.length,s.state="walking");return}if(s.state==="walking"){const o=s.route[s.routeIdx],a=n*.5+gu[o]*n,l=a-s.x;if(Math.abs(l)<3)s.x=a,s.state="working",s.workTimer=sd[s.id],s.facing=gu[o]<0?1:-1;else{const u=Math.sign(l)*jM*e;s.x+=Math.abs(u)>Math.abs(l)?l:u,s.facing=l>0?1:-1}}})}function qM(t,e){if(!t)return;let n=null,i=1/0;t.forEach(r=>{const s=Math.abs(r.x-e);s<i&&(i=s,n=r)}),n&&n.state!=="reacting"&&(n.state="reacting",n.reactTimer=W_,n.reactDir=e>n.x?1:-1)}function KM(t,e,n){const{x:i,y:r,state:s,seed:o,facing:a,reactDir:l,id:u}=e,c=.65,d=$0[u%$0.length];t.save(),t.globalAlpha=.86,t.beginPath(),t.ellipse(i,r+3,12*c,3,0,0,Math.PI*2),t.fillStyle="rgba(0,0,0,0.28)",t.fill();const f=s==="walking",p=f?Math.sin(n*6+o)*2.5:0,m=s==="working"?Math.sin(n*7.5+o*2.1):0,_=m*.5,g=r+p+_,h=s==="working"?.15+Math.sin(n*1.4+o)*.03:0;t.save(),h>0&&(t.translate(i,g),t.rotate(a*h),t.translate(-i,-g));const v=f?Math.sin(n*6+o)*5:0;[[-6*c,v],[6*c,-v]].forEach(([T,b])=>{St(t,i+T-4*c,g-2+14*c+Math.abs(b*.25),9*c,5,2),t.fillStyle=d.boots,t.fill(),t.fillStyle=d.legs,t.fillRect(i+T-3.5*c,g-2,7*c,14*c+Math.abs(b*.2))});const S=t.createRadialGradient(i,g-14*c,1,i,g-14*c,15*c);if(S.addColorStop(0,d.body0),S.addColorStop(1,d.body1),t.fillStyle=S,St(t,i-11*c,g-26*c,22*c,24*c,5),t.fill(),t.fillStyle=d.pack,St(t,i+(a>=0?-14*c:3*c),g-24*c,5*c,18*c,2),t.fill(),t.fillStyle=d.arms,s==="reacting"){const T=l||1,b=1-Math.max(0,e.reactTimer/W_),w=-1.05*Math.min(1,b*2.5);t.save(),t.translate(i+T*10*c,g-24*c),t.rotate(w),t.fillRect(-3*c,0,6*c,12*c),t.restore(),t.fillRect(i-T*10*c-3*c,g-24*c,6*c,12*c)}else if(s==="working"){const T=.26+m*.18,b=-(.1+Math.sin(n*.9+o)*.05);t.save(),t.translate(i+a*10*c,g-24*c),t.rotate(T),t.fillRect(-3*c,0,6*c,12*c),t.restore(),t.save(),t.translate(i-a*10*c,g-24*c),t.rotate(b),t.fillRect(-3*c,0,6*c,12*c),t.restore()}else{const T=Math.sin(n*6+o)*.22;[[-1,T],[1,-T]].forEach(([b,w])=>{t.save(),t.translate(i+b*10*c,g-24*c),t.rotate(w),t.fillRect(-3*c,0,6*c,12*c),t.restore()})}t.restore(),t.fillStyle=d.arms,t.beginPath(),t.ellipse(i-11*c,g-24*c,5*c,3.5*c,-.2,0,Math.PI*2),t.fill(),t.beginPath(),t.ellipse(i+11*c,g-24*c,5*c,3.5*c,.2,0,Math.PI*2),t.fill(),t.fillStyle="rgba(255,255,255,0.18)",St(t,i-5*c,g-22*c,10*c,7*c,1),t.fill(),t.fillStyle=d.body0,t.fillRect(i-4*c,g-22*c,8*c,2*c),t.fillStyle="rgba(160,200,255,0.14)",t.fillRect(i-11*c,g-26*c,3*c,22*c),t.fillStyle=d.pack,t.fillRect(i-11*c,g-4*c,22*c,3*c),t.fillStyle="rgba(200,210,230,0.70)",t.fillRect(i-2*c,g-4*c,4*c,3*c),t.beginPath(),t.arc(i,g-32*c,10*c,0,Math.PI*2),t.fillStyle=d.helm,t.fill(),t.beginPath(),t.arc(i,g-32*c,10*c,Math.PI*.7,Math.PI*2.3),t.strokeStyle="rgba(80,100,140,0.55)",t.lineWidth=1.5,t.stroke(),t.fillStyle="rgba(180,190,210,0.80)",t.fillRect(i+6*c,g-42*c,2,6*c),t.beginPath(),t.arc(i+7*c,g-42*c,2,0,Math.PI*2),t.fillStyle="rgba(80,220,255,0.75)",t.fill();const M=s==="reacting"?(l||1)*1.4*c:a*1.4*c;t.beginPath(),t.ellipse(i+M,g-32*c,6.5*c,5.5*c,0,0,Math.PI*2),t.fillStyle="rgba(10,190,255,0.50)",t.fill(),t.beginPath(),t.ellipse(i+M,g-32*c,5*c,4*c,0,0,Math.PI*2),t.fillStyle="rgba(0,140,220,0.20)",t.fill(),t.beginPath(),t.ellipse(i+M-2,g-33*c,2,1.5,-.3,0,Math.PI*2),t.fillStyle="rgba(255,255,255,0.55)",t.fill(),t.restore()}function ZM(t,e,n){e&&e.forEach(i=>KM(t,i,n))}function JM(t,e){return[{type:"tanker",x:t*.14,y:e*.76,dir:1,speed:30,state:"driving",stopTimer:0},{type:"buggy",x:t*.8,y:e*.76,dir:-1,speed:56,state:"driving",stopTimer:0}]}function QM(t,e,n,i){t&&t.forEach(r=>{if(r.y=i*.76,r.state==="stopped"){r.stopTimer-=e,r.stopTimer<=0&&(r.state="driving",r.dir*=-1);return}r.x+=r.dir*r.speed*e;const s=r.type==="tanker"?88:60;r.x<s||r.x>n-s?(r.x=Math.max(s,Math.min(n-s,r.x)),r.state="stopped",r.stopTimer=2.5+Math.random()*3.5):Math.random()<e*.18&&(r.state="stopped",r.stopTimer=1.8+Math.random()*2.8)})}function e2(t,e,n){e&&e.forEach(i=>{i.type==="tanker"?t2(t,i.x,i.y,i.dir,n,i.state==="stopped"):n2(t,i.x,i.y,i.dir,n,i.state==="stopped")})}function t2(t,e,n,i,r,s){t.save(),t.globalAlpha=.91,t.beginPath(),t.ellipse(e,n+3,44,5,0,0,Math.PI*2),t.fillStyle="rgba(0,0,0,0.30)",t.fill(),i<0&&(t.translate(e*2,0),t.scale(-1,1));const o=10,a=n-o-16;[e-30,e-20].forEach(h=>{t.beginPath(),t.arc(h,n-o,o,0,Math.PI*2),t.fillStyle="rgba(26,26,30,0.96)",t.fill(),t.beginPath(),t.arc(h,n-o,o*.44,0,Math.PI*2),t.fillStyle="rgba(168,174,186,0.90)",t.fill()}),t.beginPath(),t.arc(e+26,n-o,o,0,Math.PI*2),t.fillStyle="rgba(26,26,30,0.96)",t.fill(),t.beginPath(),t.arc(e+26,n-o,o*.44,0,Math.PI*2),t.fillStyle="rgba(168,174,186,0.90)",t.fill(),t.fillStyle="rgba(192,200,215,0.95)",St(t,e-38,a,76,16,3),t.fill();const l=e-36,u=a-13,c=52,d=13,f=t.createLinearGradient(e,u,e,u+d);f.addColorStop(0,"rgba(212,220,230,0.97)"),f.addColorStop(.55,"rgba(172,182,195,0.97)"),f.addColorStop(1,"rgba(130,140,155,0.97)"),t.fillStyle=f,St(t,l,u,c,d,d*.5),t.fill(),t.save(),t.beginPath(),St(t,l,u,c,d,d*.5),t.clip(),t.fillStyle="rgba(255,190,0,0.46)";for(let h=0;h<6;h++)t.fillRect(l+h*16,u,9,d);t.restore(),[l,l+c].forEach(h=>{t.beginPath(),t.arc(h,u+d*.5,d*.5,0,Math.PI*2),t.fillStyle="rgba(178,186,200,0.97)",t.fill()});const p=t.createLinearGradient(e+17,0,e+40,0);p.addColorStop(0,"rgba(30,58,118,0.96)"),p.addColorStop(1,"rgba(16,36,82,0.96)"),t.fillStyle=p,St(t,e+17,a-12,23,28,4),t.fill(),t.fillStyle="rgba(128,200,255,0.46)",St(t,e+20,a-9,15,9,2),t.fill(),t.fillStyle="rgba(96,106,128,0.85)",t.fillRect(e+38,a-7,5,3),t.fillStyle="rgba(48,50,56,0.90)",t.fillRect(e-36,a-8,4,10),t.fillStyle="rgba(68,70,78,0.85)",t.fillRect(e-37,a-9,6,3);const m=l+c*.78,_=u+2;t.fillStyle="rgba(20,24,34,0.88)",t.fillRect(m,_,5,d-4),t.fillStyle="rgba(80,220,120,0.90)",t.fillRect(m+1,_+1,3,(d-6)*.92),[a+4,a+10].forEach(h=>{t.fillStyle="rgba(160,168,182,0.30)",t.fillRect(e-38,h,52,1.5)}),[[e-30,n-o],[e-20,n-o],[e+26,n-o]].forEach(([h,v])=>{t.beginPath(),t.arc(h,v,o*.28,0,Math.PI*2),t.fillStyle="rgba(80,86,100,0.70)",t.fill()});const g=Math.sin(r*3.8)>0&&!s;t.beginPath(),t.arc(e-2,u-5,3,0,Math.PI*2),t.fillStyle=`rgba(255,155,0,${.32+(g?.68:0)})`,t.fill(),g&&(t.beginPath(),t.arc(e-2,u-5,9,0,Math.PI*2),t.fillStyle="rgba(255,155,0,0.13)",t.fill()),t.restore()}function n2(t,e,n,i,r,s){t.save(),t.globalAlpha=.89,t.beginPath(),t.ellipse(e,n+2,28,4,0,0,Math.PI*2),t.fillStyle="rgba(0,0,0,0.28)",t.fill(),i<0&&(t.translate(e*2,0),t.scale(-1,1));const o=7,a=n-o-13;[-18,18].forEach(c=>{t.beginPath(),t.arc(e+c,n-o,o,0,Math.PI*2),t.fillStyle="rgba(26,26,30,0.95)",t.fill(),t.beginPath(),t.arc(e+c,n-o,o*.42,0,Math.PI*2),t.fillStyle="rgba(152,158,172,0.88)",t.fill()});const l=t.createLinearGradient(e,a,e,a+13);l.addColorStop(0,"rgba(240,120,28,0.95)"),l.addColorStop(1,"rgba(170,62,10,0.95)"),t.fillStyle=l,St(t,e-23,a,46,13,4),t.fill(),t.strokeStyle="rgba(186,192,206,0.88)",t.lineWidth=2.5,t.lineJoin="round",t.beginPath(),t.moveTo(e-16,a),t.lineTo(e-16,a-15),t.lineTo(e+16,a-15),t.lineTo(e+16,a),t.stroke(),t.beginPath(),t.moveTo(e-8,a),t.lineTo(e+14,a-15),t.stroke(),t.fillStyle="rgba(36,46,60,0.88)",t.beginPath(),t.arc(e-3,a-2,6,Math.PI,0),t.fill(),t.fillStyle="rgba(118,208,255,0.44)",t.beginPath(),t.ellipse(e-3,a-2,4.5,3.5,0,0,Math.PI*2),t.fill(),t.fillStyle="rgba(138,215,255,0.36)",St(t,e+8,a+2,11,8,2),t.fill(),t.fillStyle="rgba(255,255,255,0.14)",t.fillRect(e+9,a+3,3,4),t.save(),t.beginPath(),St(t,e+16,a+6,7,6,1),t.clip();for(let c=0;c<4;c++)t.fillStyle=c%2===0?"rgba(255,200,0,0.65)":"rgba(20,20,24,0.65)",t.fillRect(e+16+c*2,a+6,2,6);t.restore(),[-18,18].forEach(c=>{t.beginPath(),t.arc(e+c,n-o,o*.3,0,Math.PI*2),t.fillStyle="rgba(72,78,94,0.68)",t.fill()}),t.fillStyle="rgba(255,140,50,0.22)",t.fillRect(e-22,a+4,30,1.5);const u=Math.sin(r*5.5+1.8)>.38&&!s;t.beginPath(),t.arc(e+14,a-16,2.5,0,Math.PI*2),t.fillStyle=`rgba(55,220,85,${.3+(u?.62:0)})`,t.fill(),t.restore()}function i2(t,e,n){const i=n*.55,r=n*.78,s=e*.2,o=e*.085,a=w=>o+(s-o)*(w/n),l=w=>e-o-(s-o)*(w/n);t.save(),t.beginPath(),t.moveTo(0,0),t.lineTo(a(0),0),t.lineTo(a(n),n),t.lineTo(0,n),t.closePath(),t.clip();const u=t.createLinearGradient(0,0,s,0);u.addColorStop(0,"rgba(7,12,30,0.99)"),u.addColorStop(.55,"rgba(14,24,52,0.96)"),u.addColorStop(1,"rgba(22,38,72,0.40)"),t.fillStyle=u,t.fillRect(0,0,s+4,n),t.strokeStyle="rgba(32,52,90,0.38)",t.lineWidth=1;for(let w=1;w<9;w++){const y=w/9*n;t.beginPath(),t.moveTo(0,y),t.lineTo(a(y)-2,y),t.stroke()}[.3,.62,.92].forEach(w=>{const y=a(n)*w,C=a(0)*w;t.fillStyle="rgba(3,5,16,0.72)",t.beginPath(),t.moveTo(C-9,0),t.lineTo(y-9,n),t.lineTo(y+9,n),t.lineTo(C+9,0),t.closePath(),t.fill();const R=t.createLinearGradient(C-6,0,C+6,0);R.addColorStop(0,"rgba(20,32,60,0.97)"),R.addColorStop(.4,"rgba(38,56,92,0.97)"),R.addColorStop(.6,"rgba(38,56,92,0.97)"),R.addColorStop(1,"rgba(20,32,60,0.97)"),t.fillStyle=R,t.beginPath(),t.moveTo(C-6,0),t.lineTo(y-6,n),t.lineTo(y+6,n),t.lineTo(C+6,0),t.closePath(),t.fill(),t.fillStyle="rgba(60,95,155,0.30)",t.beginPath(),t.moveTo(C-6,0),t.lineTo(y-6,n),t.lineTo(y-3,n),t.lineTo(C-3,0),t.closePath(),t.fill()}),[n*.13,n*.28,n*.44,n*.6].forEach(w=>{const y=a(w);t.fillStyle="rgba(12,22,48,0.90)",t.fillRect(0,w-5,y,10),t.fillStyle="rgba(36,54,90,0.52)",t.fillRect(0,w-5,y,2),t.fillStyle="rgba(0,0,0,0.18)",t.fillRect(0,w+5,y,4)});const c=a(n)*.68,d=n*.25,f=t.createLinearGradient(c,d,c,r);f.addColorStop(0,"rgba(255,165,48,0.28)"),f.addColorStop(1,"rgba(255,140,0,0.00)"),t.fillStyle=f,t.beginPath(),t.moveTo(c-5,d+8),t.lineTo(c-72,r),t.lineTo(c+58,r),t.lineTo(c+5,d+8),t.closePath(),t.fill(),t.fillStyle="rgba(28,34,48,0.96)",t.fillRect(c-13,d-5,26,10),t.fillStyle="rgba(255,175,55,0.92)",t.fillRect(c-9,d+3,18,5),t.restore();const p=t.createRadialGradient(c,r,0,c,r,s*1.1);p.addColorStop(0,"rgba(255,150,30,0.16)"),p.addColorStop(1,"rgba(255,130,0,0.00)"),t.fillStyle=p,t.fillRect(0,r-8,s*1.6,n-r+8),t.save(),t.beginPath(),t.moveTo(l(0),0),t.lineTo(e,0),t.lineTo(e,n),t.lineTo(l(n),n),t.closePath(),t.clip();const m=t.createLinearGradient(e-s-4,0,e,0);m.addColorStop(0,"rgba(22,38,72,0.40)"),m.addColorStop(.45,"rgba(14,24,52,0.96)"),m.addColorStop(1,"rgba(7,12,30,0.99)"),t.fillStyle=m,t.fillRect(e-s-4,0,s+4,n),t.strokeStyle="rgba(32,52,90,0.38)",t.lineWidth=1;for(let w=1;w<9;w++){const y=w/9*n;t.beginPath(),t.moveTo(l(y)+2,y),t.lineTo(e,y),t.stroke()}[.08,.38,.7].forEach(w=>{const y=l(n)+(e-l(n))*w,C=l(0)+(e-l(0))*w;t.fillStyle="rgba(3,5,16,0.72)",t.beginPath(),t.moveTo(C-9,0),t.lineTo(y-9,n),t.lineTo(y+9,n),t.lineTo(C+9,0),t.closePath(),t.fill();const R=t.createLinearGradient(C-6,0,C+6,0);R.addColorStop(0,"rgba(20,32,60,0.97)"),R.addColorStop(.4,"rgba(38,56,92,0.97)"),R.addColorStop(.6,"rgba(38,56,92,0.97)"),R.addColorStop(1,"rgba(20,32,60,0.97)"),t.fillStyle=R,t.beginPath(),t.moveTo(C-6,0),t.lineTo(y-6,n),t.lineTo(y+6,n),t.lineTo(C+6,0),t.closePath(),t.fill(),t.fillStyle="rgba(60,95,155,0.30)",t.beginPath(),t.moveTo(C+3,0),t.lineTo(y+3,n),t.lineTo(y+6,n),t.lineTo(C+6,0),t.closePath(),t.fill()}),[n*.13,n*.28,n*.44,n*.6].forEach(w=>{const y=l(w);t.fillStyle="rgba(12,22,48,0.90)",t.fillRect(y,w-5,e-y,10),t.fillStyle="rgba(36,54,90,0.52)",t.fillRect(y,w-5,e-y,2),t.fillStyle="rgba(0,0,0,0.18)",t.fillRect(y,w+5,e-y,4)});const _=l(n)+(e-l(n))*.32,g=n*.25,h=t.createLinearGradient(_,g,_,r);h.addColorStop(0,"rgba(255,165,48,0.28)"),h.addColorStop(1,"rgba(255,140,0,0.00)"),t.fillStyle=h,t.beginPath(),t.moveTo(_-5,g+8),t.lineTo(_-58,r),t.lineTo(_+72,r),t.lineTo(_+5,g+8),t.closePath(),t.fill(),t.fillStyle="rgba(28,34,48,0.96)",t.fillRect(_-13,g-5,26,10),t.fillStyle="rgba(255,175,55,0.92)",t.fillRect(_-9,g+3,18,5),t.restore();const v=t.createRadialGradient(_,r,0,_,r,s*1.1);v.addColorStop(0,"rgba(255,150,30,0.16)"),v.addColorStop(1,"rgba(255,130,0,0.00)"),t.fillStyle=v,t.fillRect(e-s*1.6,r-8,s*1.6,n-r+8),[e*.22,e*.78].forEach(w=>{const y=t.createLinearGradient(w,0,w,n*.68);y.addColorStop(0,"rgba(255,168,45,0.12)"),y.addColorStop(.5,"rgba(255,150,30,0.05)"),y.addColorStop(1,"rgba(255,130,0,0.00)"),t.fillStyle=y,t.beginPath(),t.moveTo(w-6,0),t.lineTo(w-50,n*.68),t.lineTo(w+50,n*.68),t.lineTo(w+6,0),t.closePath(),t.fill()});const S=t.createLinearGradient(0,r,s,r);S.addColorStop(0,"rgba(38,75,155,0.18)"),S.addColorStop(1,"rgba(38,75,155,0.00)"),t.fillStyle=S,t.fillRect(0,r,s*1.3,n-r);const M=t.createLinearGradient(e,r,e-s,r);M.addColorStop(0,"rgba(38,75,155,0.18)"),M.addColorStop(1,"rgba(38,75,155,0.00)"),t.fillStyle=M,t.fillRect(e-s*1.3,r,s*1.3,n-r),t.fillStyle="rgba(9,16,42,0.97)",t.fillRect(0,0,e,24),t.strokeStyle="rgba(24,40,76,0.65)",t.lineWidth=1.5;const T=e/10;for(let w=0;w<=10;w++)t.beginPath(),t.moveTo(w*T,0),t.lineTo(w*T+T,24),t.stroke(),t.beginPath(),t.moveTo(w*T+T,0),t.lineTo(w*T,24),t.stroke();t.fillStyle="rgba(40,62,108,0.45)",t.fillRect(0,22,e,2);const b=t.createLinearGradient(0,24,0,98);b.addColorStop(0,"rgba(8,15,46,0.84)"),b.addColorStop(1,"rgba(8,15,46,0.00)"),t.fillStyle=b,t.fillRect(0,24,e,74),t.strokeStyle="rgba(40,100,200,0.25)",t.lineWidth=1,t.beginPath(),t.moveTo(0,i),t.lineTo(e,i),t.stroke()}function r2(){return{phaseTime:0,countdownTimer:10,rocketAscent:0,cameraOffset:0,shakeX:0,shakeY:0,flashAlpha:0,alarmAlpha:0,fadeAlpha:0,ignitionLevel:.3,particles:[],phaseTransitioned:!1}}const Jh=520;function Ec(t,e,n){if(t.particles.length>=Jh)return;const i=(Math.random()-.5)*60;t.particles.push({type:"smoke",x:e+i,y:n,vx:i*.4,vy:-(Math.random()*55+25),r:Math.random()*14+6,alpha:0,peakAlpha:Math.random()*.5+.2,life:0,maxLife:Math.random()*2.2+1.4,gray:Math.floor(Math.random()*55+140)})}function Y0(t,e,n){t.particles.length>=Jh||t.particles.push({type:"exhaust",x:e+(Math.random()-.5)*28,y:n+15,vx:(Math.random()-.5)*70,vy:Math.random()*140+80,r:Math.random()*9+3,alpha:.85,life:0,maxLife:Math.random()*.5+.25,hue:Math.random()*35+5})}function s2(t,e,n){t.particles.length>=Jh||t.particles.push({type:"contrail",x:e+(Math.random()-.5)*16,y:n,vx:(Math.random()-.5)*5,vy:6+Math.random()*10,r:Math.random()*5+3,alpha:0,peakAlpha:Math.random()*.18+.28,life:0,maxLife:Math.random()*3+2.2})}function o2(t,e){const{particles:n}=t;for(let i=n.length-1;i>=0;i--){const r=n[i];if(r.life+=e,r.life>=r.maxLife){n.splice(i,1);continue}const s=r.life/r.maxLife;r.x+=r.vx*e,r.y+=r.vy*e,r.vy*=r.type==="smoke"?Math.pow(.97,e*60):r.type==="contrail"?Math.pow(.96,e*60):Math.pow(.9,e*60),r.r+=(r.type==="smoke"?9:r.type==="contrail"?5:3)*e,r.type==="smoke"?r.alpha=s<.25?r.peakAlpha*(s/.25):r.peakAlpha*(1-(s-.25)/.75):r.type==="contrail"?r.alpha=s<.12?r.peakAlpha*(s/.12):r.peakAlpha*(1-(s-.12)/.88):r.alpha=(1-s)*.8}}function a2(t,e,n,i){if(i<=.3)return;const r=Math.max(0,(i-.3)/.7),s=55+r*110,o=r*.62,a=n+38;t.save(),t.globalCompositeOperation="lighter",t.beginPath(),t.arc(e,a,s,0,Math.PI*2);const l=t.createRadialGradient(e,a,0,e,a,s);l.addColorStop(0,`rgba(255, 235, 90,  ${o.toFixed(3)})`),l.addColorStop(.22,`rgba(255, 130, 15,  ${(o*.72).toFixed(3)})`),l.addColorStop(.55,`rgba(210, 45,  0,   ${(o*.3).toFixed(3)})`),l.addColorStop(1,"rgba(140, 15, 0, 0)"),t.fillStyle=l,t.fill(),t.restore()}function l2(t,e){e.particles.forEach(n=>{if(!(n.alpha<=.005||n.r<=0)){if(t.beginPath(),t.arc(n.x,n.y,Math.max(.1,n.r),0,Math.PI*2),n.type==="smoke"){const i=t.createRadialGradient(n.x,n.y,0,n.x,n.y,n.r);i.addColorStop(0,`rgba(${n.gray}, ${n.gray}, ${n.gray+18}, ${n.alpha.toFixed(3)})`),i.addColorStop(1,`rgba(${n.gray-40}, ${n.gray-40}, ${n.gray}, 0)`),t.fillStyle=i}else if(n.type==="contrail"){const i=t.createRadialGradient(n.x,n.y,0,n.x,n.y,n.r);i.addColorStop(0,`rgba(225, 235, 255, ${n.alpha.toFixed(3)})`),i.addColorStop(.5,`rgba(200, 215, 245, ${(n.alpha*.5).toFixed(3)})`),i.addColorStop(1,"rgba(180, 200, 230, 0)"),t.fillStyle=i}else{const i=t.createRadialGradient(n.x,n.y,0,n.x,n.y,n.r),r=Math.min(255,Math.floor(n.hue*7));i.addColorStop(0,`rgba(255, 248, 210, ${n.alpha.toFixed(3)})`),i.addColorStop(.4,`rgba(255, ${r}, 20, ${(n.alpha*.75).toFixed(3)})`),i.addColorStop(1,"rgba(180, 40, 0, 0)"),t.fillStyle=i}t.fill()}})}const q0={id:"power_restoration",title:"Power Restoration",objective:"Fix the variable name error to restore thruster array B",challenge:{context:"The power management script declares a variable called `power`, but the console.log call references `powr` — a name that doesn't exist. The system cannot resolve it. Fix the misspelling to restore power output.",brokenCode:`let power = 100;
console.log(powr);  // ERROR: powr is not defined`,hint:"Look at the name inside console.log — does it match exactly what was declared on line 1?",validate(t){const e=t.replace(/\/\/.*/g,"").replace(/\s+/g," ").trim();return e.includes("console.log(power)")&&!e.includes("console.log(powr)")}},success:{worldEffect:"power_restored",dialogue:[{text:"Power distribution: nominal. Thruster Array B is receiving current. All modules at operational status."},{text:"The variable was declared as `power`. The log was reading `powr` — a name that was never stored. The system found nothing to retrieve and halted distribution."},{text:"In any script, the name used to store a value and the name used to retrieve it must match exactly. That precision is what keeps every dependent system operational.",isLast:!0}]}},K0={id:"nav_calibration",title:"Trajectory Control",objective:"Fix the comparison operator to lock the orbital trajectory",challenge:{context:"The guidance computer checks whether current velocity meets the orbital insertion threshold — but the comparison is broken. Instead of testing the condition, the script overwrites velocity with the threshold value. The trajectory cannot lock.",brokenCode:`let velocity = 7800;          // m/s — current ascent speed
let escapeVelocity = 11200;   // m/s — orbital insertion threshold

if (velocity = escapeVelocity) {
  console.log("Trajectory locked. Orbital insertion confirmed.");
}`,hint:"The operator inside the if check is = — that's assignment, not comparison. Use >= to ask: is velocity at or above escapeVelocity?",validate(t){const e=t.replace(/\/\/.*/g,"").replace(/\s+/g," ").trim();return e.includes("velocity >= escapeVelocity")||e.includes("velocity > escapeVelocity")}},success:{worldEffect:"nav_calibrated",dialogue:[{text:"Guidance computer: nominal. Trajectory condition confirmed. Orbital insertion logic responding correctly."},{text:"The `=` operator was overwriting `escapeVelocity` with the value of `velocity`, then evaluating the assigned number as a condition — always resolving to true. `>=` compares the two values without modifying either."},{text:"Conditionals are how the guidance system determines what to do at each flight phase. Every decision depends on the comparison operator being exact.",isLast:!0}]}},Z0={id:"fuel_calculation",title:"Fuel Calculation",objective:"Fix the arithmetic operator in the thrust calculation",challenge:{context:"The fuel flow controller is producing negative thrust values. The formula is correct — thrust equals mass flow rate multiplied by exhaust velocity — but the operator is wrong.",brokenCode:`let massFlow = 350;         // kg/s — propellant flow rate
let exhaustVelocity = 4400; // m/s — exhaust exit speed

let thrust = massFlow - exhaustVelocity; // ERROR: wrong operator
console.log("Thrust: " + thrust + " N");`,hint:"Thrust = mass flow rate × exhaust velocity. Which operator means multiply?",validate(t){const e=t.replace(/\/\/.*/g,"").replace(/\s+/g,"");return e.includes("massFlow*exhaustVelocity")||e.includes("350*4400")}},success:{worldEffect:"fuel_online",dialogue:[{text:"Fuel flow controller: nominal. Thrust output: 1,540,000 N. Engine command accepted. Propulsion line cleared."},{text:"The script used subtraction: 350 minus 4,400. Result: -4,050 — a negative thrust value the engine controller refused. Multiplication gives 1,540,000 N — a physically valid force."},{text:"Numbers are how the rocket quantifies everything measurable. Every calculated value must use the correct operation, or the downstream systems receive data they cannot use.",isLast:!0}]}},J0={id:"comms_signal",title:"Communications Signal",objective:"Fix the undefined variable reference in the broadcast string",challenge:{context:"The communications array is offline. The broadcast script references a variable name that was never declared. The console log throws a ReferenceError and no signal is transmitted.",brokenCode:`let callsign = "LAUNCH-BAY-01";
let statusMessage = "ALL SYSTEMS NOMINAL";

let broadcast = callsign + " — " + statusMsg; // ERROR: 'statusMsg' is not defined
console.log(broadcast);`,hint:"Compare the variable declared on line 2 with the name used on line 4. Are they the same?",validate(t){const e=t.replace(/\/\/.*/g,"").replace(/\s+/g,"");return e.includes("+statusMessage")||e.includes("statusMessage+")||e.includes('"statusMessage"')}},success:{worldEffect:"comms_online",dialogue:[{text:"Communications array: nominal. Broadcast transmitted: 'LAUNCH-BAY-01 — ALL SYSTEMS NOMINAL'."},{text:"The variable `statusMessage` was declared correctly. The script was reading `statusMsg` — a name that did not exist. The system had nothing to retrieve and the transmission could not be assembled."},{text:"Strings are how systems encode and transmit information. Every variable referenced in a string operation must match a declared name exactly, or the data cannot be included.",isLast:!0}]}},Q0={id:"diagnostics_scan",title:"Diagnostics Scan",objective:"Fix the loop start index so the scan checks all systems",challenge:{context:"The diagnostics array is reporting only three systems online, but four are active. The scan loop starts at index 1, skipping the first system in the array.",brokenCode:`let systems = ["power", "fuel", "navigation", "engine"];
let onlineCount = 0;

for (let i = 1; i < systems.length; i++) { // ERROR: starts at 1, skips index 0
  onlineCount++;
}

console.log("Systems online: " + onlineCount + " / " + systems.length);`,hint:"Arrays start at index 0. What should the loop counter start at?",validate(t){const e=t.replace(/\/\/.*/g,"").replace(/\s+/g,"");return(e.includes("leti=0")||e.includes("i=0;")||e.includes("i=0,"))&&e.includes("for")}},success:{worldEffect:"diagnostics_online",dialogue:[{text:"Diagnostic scanner: nominal. Scan confirmed: 4 / 4 systems online."},{text:"The loop was beginning at `i = 1`, skipping index 0 — the first system in the array. Changing to `i = 0` ensures every element is processed from the first position."},{text:"Loops are how the station automates repetition across system lists. The starting index defines exactly what is included. An off-by-one error produces no fault alert — only silent data loss.",isLast:!0}]}},em={id:"engine_ignition",title:"Engine Ignition",objective:"Call the calculateIsp function and assign its return value",challenge:{context:"Engine specific impulse reads zero. The `calculateIsp` function exists and is correct, but it is never called. The result is hardcoded to 0, so the engine controller rejects the ignition sequence.",brokenCode:`function calculateIsp(thrust, fuelFlow) {
  return thrust / (fuelFlow * 9.81);
}

let thrust   = 1540000; // N
let fuelFlow = 350;     // kg/s

let isp = 0; // ERROR: calculateIsp is defined but never called
console.log("Engine Isp: " + isp + " s");`,hint:"The function is defined above. Call it with the two variables and assign the result to `isp`.",validate(t){const e=t.replace(/\/\/.*/g,"").replace(/\s+/g,"");return e.includes("calculateIsp(thrust,fuelFlow)")||e.includes("calculateIsp(1540000,350)")}},success:{worldEffect:"engine_online",dialogue:[{text:"Engine core: nominal. Specific impulse confirmed: 448.8 s. Ignition sequence authorised."},{text:"The function `calculateIsp` was defined but never invoked. The variable `isp` remained at 0. Calling the function and assigning its return value gave the ignition controller a valid reading."},{text:"Defining a function creates the capability. Calling it and capturing the return value is what makes the result available to the system. Without the call, the calculation never runs.",isLast:!0}]}},u2={[q0.id]:q0,[K0.id]:K0,[Z0.id]:Z0,[J0.id]:J0,[Q0.id]:Q0,[em.id]:em};function c2(t){return u2[t]??null}let Cn=!1,Ir=null;function yi(){try{return(!Ir||Ir.state==="closed")&&(Ir=new(window.AudioContext||window.webkitAudioContext)),Ir.resume().catch(()=>{}),Ir}catch{return null}}function f2(){return Cn=!Cn,Cn}function d2(){return Cn}function Qh(t,e=3){const n=Math.floor(e*t.sampleRate),i=t.createBuffer(1,n,t.sampleRate),r=i.getChannelData(0);for(let o=0;o<n;o++)r[o]=Math.random()*2-1;const s=t.createBufferSource();return s.buffer=i,s.loop=!0,s}function Hu({droneFreqs:t,lfoRate:e,lfoDepth:n,noiseFilter:i,noiseGainVal:r,masterGain:s,fadeIn:o}){if(Cn)return()=>{};try{const a=yi();if(!a)return()=>{};const l=a.createGain();l.gain.value=0,l.connect(a.destination);const u=[],c=[];t.forEach(({freq:p,type:m="sine"})=>{const _=a.createOscillator();_.type=m,_.frequency.value=p,_.connect(l),_.start(),u.push(_)});const d=a.createOscillator(),f=a.createGain();if(d.type="sine",d.frequency.value=e,f.gain.value=n,d.connect(f),u.length>0&&f.connect(u[0].frequency),d.start(),c.push(d),i){const p=Qh(a),m=a.createBiquadFilter();m.type=i.type,m.frequency.value=i.freq,m.Q.value=i.Q??1;const _=a.createGain();_.gain.value=r??.012,p.connect(m),m.connect(_),_.connect(l),p.start(),c.push(p)}return l.gain.linearRampToValueAtTime(s,a.currentTime+(o??4)),()=>{try{l.gain.cancelScheduledValues(a.currentTime),l.gain.linearRampToValueAtTime(0,a.currentTime+1.2),setTimeout(()=>{[...u,...c].forEach(p=>{try{p.stop()}catch{}})},1300)}catch{}}}catch{return()=>{}}}function h2(){return Hu({droneFreqs:[{freq:55},{freq:82.4}],lfoRate:.15,lfoDepth:1.4,noiseFilter:{type:"lowpass",freq:280,Q:.8},noiseGainVal:.01,masterGain:.022,fadeIn:5})}function p2(){return Hu({droneFreqs:[{freq:110},{freq:165,type:"sine"}],lfoRate:.08,lfoDepth:.9,noiseFilter:{type:"highpass",freq:1400,Q:.6},noiseGainVal:.013,masterGain:.018,fadeIn:3.5})}function m2(){return Hu({droneFreqs:[{freq:82,type:"sine"},{freq:123}],lfoRate:.1,lfoDepth:.7,noiseFilter:{type:"bandpass",freq:600,Q:1.5},noiseGainVal:.009,masterGain:.016,fadeIn:4})}function g2(){return Hu({droneFreqs:[{freq:32},{freq:48}],lfoRate:.06,lfoDepth:2,noiseFilter:{type:"highpass",freq:7e3,Q:.4},noiseGainVal:.008,masterGain:.02,fadeIn:6})}function v2(){if(!Cn)try{const t=yi();if(!t)return;const e=t.createOscillator(),n=t.createGain();e.connect(n),n.connect(t.destination),e.type="sine",e.frequency.setValueAtTime(260,t.currentTime),e.frequency.linearRampToValueAtTime(520,t.currentTime+.08),n.gain.setValueAtTime(.07,t.currentTime),n.gain.exponentialRampToValueAtTime(1e-4,t.currentTime+.22),e.start(t.currentTime),e.stop(t.currentTime+.24)}catch{}}function _2(){if(!Cn)try{const t=yi();if(!t)return;const e=t.createOscillator(),n=t.createGain();e.connect(n),n.connect(t.destination),e.type="sine",e.frequency.setValueAtTime(460,t.currentTime),e.frequency.linearRampToValueAtTime(200,t.currentTime+.1),n.gain.setValueAtTime(.06,t.currentTime),n.gain.exponentialRampToValueAtTime(1e-4,t.currentTime+.22),e.start(t.currentTime),e.stop(t.currentTime+.24)}catch{}}let Tc=0;function X_(){if(!Cn&&(Tc=(Tc+1)%3,Tc===0))try{const t=yi();if(!t)return;const e=t.createOscillator(),n=t.createGain();e.connect(n),n.connect(t.destination),e.type="square",e.frequency.value=880+Math.random()*280,n.gain.setValueAtTime(.007,t.currentTime),n.gain.exponentialRampToValueAtTime(1e-4,t.currentTime+.022),e.start(t.currentTime),e.stop(t.currentTime+.025)}catch{}}function ep(){if(!Cn)try{const t=yi();if(!t)return;const e=t.createOscillator(),n=t.createGain();e.connect(n),n.connect(t.destination),e.type="sawtooth",e.frequency.setValueAtTime(150,t.currentTime),e.frequency.linearRampToValueAtTime(75,t.currentTime+.3),n.gain.setValueAtTime(.045,t.currentTime),n.gain.exponentialRampToValueAtTime(1e-4,t.currentTime+.35),e.start(t.currentTime),e.stop(t.currentTime+.38)}catch{}}function tp(){if(!Cn)try{const t=yi();if(!t)return;[261.63,329.63,392,523.25].forEach((e,n)=>{const i=t.createOscillator(),r=t.createGain();i.connect(r),r.connect(t.destination),i.type="sine",i.frequency.value=e;const s=t.currentTime+n*.06;r.gain.setValueAtTime(0,s),r.gain.linearRampToValueAtTime(.07,s+.06),r.gain.exponentialRampToValueAtTime(1e-4,s+1.6),i.start(s),i.stop(s+1.6)})}catch{}}function S2(t){if(!Cn)try{const e=yi();if(!e)return;const n=380+(10-Math.max(0,t))*55,i=e.createOscillator(),r=e.createGain();i.connect(r),r.connect(e.destination),i.type="sine",i.frequency.value=n,r.gain.setValueAtTime(.1,e.currentTime),r.gain.exponentialRampToValueAtTime(1e-4,e.currentTime+.16),i.start(e.currentTime),i.stop(e.currentTime+.18)}catch{}}function y2(){if(Cn)return{setLevel:()=>{},stop:()=>{}};try{const t=yi();if(!t)return{setLevel:()=>{},stop:()=>{}};const e=t.createGain();e.gain.value=0,e.connect(t.destination);const n=t.createOscillator();n.type="sawtooth",n.frequency.value=38;const i=t.createGain();i.gain.value=.55,n.connect(i),i.connect(e),n.start();const r=t.createOscillator(),s=t.createGain();r.type="sine",r.frequency.value=7,s.gain.value=5,r.connect(s),s.connect(n.frequency),r.start();const o=Qh(t,4),a=t.createBiquadFilter();a.type="lowpass",a.frequency.value=200,a.Q.value=1.2;const l=t.createGain();l.gain.value=.45,o.connect(a),a.connect(l),l.connect(e),o.start();let u=!1;return{setLevel(c){if(!u)try{e.gain.linearRampToValueAtTime(c*.09,t.currentTime+.08)}catch{}},stop(){u=!0;try{e.gain.cancelScheduledValues(t.currentTime),e.gain.linearRampToValueAtTime(0,t.currentTime+1),setTimeout(()=>{[n,r,o].forEach(c=>{try{c.stop()}catch{}})},1200)}catch{}}}}catch{return{setLevel:()=>{},stop:()=>{}}}}function M2(){if(!Cn)try{const t=yi();if(!t)return;const e=t.createGain();e.connect(t.destination);const n=t.createOscillator(),i=t.createGain();n.type="sine",n.frequency.setValueAtTime(80,t.currentTime),n.frequency.exponentialRampToValueAtTime(18,t.currentTime+.55),i.gain.setValueAtTime(.7,t.currentTime),i.gain.exponentialRampToValueAtTime(.001,t.currentTime+.65),n.connect(i),i.connect(e),n.start(t.currentTime),n.stop(t.currentTime+.7);const r=Qh(t,2),s=t.createBiquadFilter();s.type="lowpass",s.frequency.value=900;const o=t.createGain();o.gain.setValueAtTime(.45,t.currentTime),o.gain.exponentialRampToValueAtTime(.001,t.currentTime+1.6),r.connect(s),s.connect(o),o.connect(e),r.start(t.currentTime),setTimeout(()=>{try{r.stop()}catch{}},1800),e.gain.setValueAtTime(.22,t.currentTime),e.gain.exponentialRampToValueAtTime(.001,t.currentTime+1.8),setTimeout(()=>{try{e.disconnect()}catch{}},2e3)}catch{}}function tm(){try{let m=function(C,R,N){const I=s.createOscillator(),F=s.createGain();I.type="triangle",I.frequency.value=C,F.gain.setValueAtTime(0,R),F.gain.linearRampToValueAtTime(.11,R+.01),F.gain.exponentialRampToValueAtTime(.001,R+Math.min(N*.85,.52)),I.connect(F),F.connect(o),I.start(R),I.stop(R+N),p.push(I);const z=s.createOscillator(),D=s.createGain();z.type="sine",z.frequency.value=C*2,D.gain.setValueAtTime(0,R),D.gain.linearRampToValueAtTime(.032,R+.008),D.gain.exponentialRampToValueAtTime(.001,R+.14),z.connect(D),D.connect(o),z.start(R),z.stop(R+.18),p.push(z)},_=function(C,R,N){C.forEach(I=>{[0,5,-5].forEach(F=>{const z=I*Math.pow(2,F/1200),D=s.createOscillator(),G=s.createGain();D.type="sine",D.frequency.value=z,G.gain.setValueAtTime(0,R),G.gain.linearRampToValueAtTime(.016,R+1.8),G.gain.setValueAtTime(.016,R+N-1.8),G.gain.linearRampToValueAtTime(0,R+N),D.connect(G),G.connect(o),D.start(R),D.stop(R+N),p.push(D)})})},g=function(C,R,N){const I=s.createOscillator(),F=s.createGain();I.type="sine",I.frequency.value=C,F.gain.setValueAtTime(0,R),F.gain.linearRampToValueAtTime(.03,R+.3),F.gain.setValueAtTime(.03,R+N-.6),F.gain.linearRampToValueAtTime(0,R+N),I.connect(F),F.connect(o),I.start(R),I.stop(R+N),p.push(I)},M=function(C){let R=C;h.forEach(([N,I])=>{m(N,R,u*I),R+=u*I}),v.forEach(({freqs:N,bar:I,bars:F})=>_(N,C+I*c,F*c)),S.forEach(([N,I,F])=>g(N,C+I*c,F*c))},w=function(C){for(;T+b*d<C;)M(T+b*d),b++};var t=m,e=_,n=g,i=M,r=w;const s=yi();if(!s)return()=>{};const o=s.createGain();o.gain.value=0,o.connect(s.destination),o.gain.linearRampToValueAtTime(.22,s.currentTime+5);const l=60/72,u=l/2,c=l*4,d=c*8,f={F2:87.31,A2:110,C3:130.81,E3:164.81,F3:174.61,G3:196,A3:220,B3:246.94,C4:261.63,D4:293.66,E4:329.63,F4:349.23,G4:392,A4:440,B4:493.88,C5:523.25},p=[],h=[[f.A3,1],[f.C4,1],[f.E4,2],[f.A4,1],[f.G4,1],[f.E4,2],[f.C4,1],[f.E4,1],[f.G4,2],[f.A4,1],[f.E4,1],[f.C4,2],[f.F3,1],[f.A3,1],[f.C4,2],[f.F4,1],[f.E4,1],[f.C4,2],[f.A3,1],[f.C4,1],[f.E4,2],[f.F4,1],[f.C4,1],[f.A3,2],[f.C4,1],[f.E4,1],[f.G4,2],[f.C5,1],[f.B4,1],[f.G4,2],[f.E4,1],[f.G4,1],[f.B4,2],[f.C5,1],[f.G4,1],[f.E4,2],[f.E3,1],[f.G3,1],[f.B3,2],[f.E4,1],[f.D4,1],[f.B3,2],[f.G3,1],[f.B3,1],[f.D4,2],[f.E4,2],[f.A3,2]],v=[{freqs:[f.A2,f.E3,f.A3,f.C4],bar:0,bars:2},{freqs:[f.F2,f.C3,f.F3,f.A3],bar:2,bars:2},{freqs:[f.C3,f.G3,f.C4,f.E4],bar:4,bars:2},{freqs:[f.E3,f.B3,f.E4,f.G4],bar:6,bars:2}],S=[[f.A2,0,2],[f.F2,2,2],[f.C3,4,2],[f.E3,6,2]],T=s.currentTime+.5;let b=0;w(s.currentTime+d*2);const y=setInterval(()=>w(s.currentTime+d*2),d/2*1e3);return()=>{clearInterval(y);try{o.gain.cancelScheduledValues(s.currentTime),o.gain.linearRampToValueAtTime(0,s.currentTime+2),setTimeout(()=>{p.forEach(C=>{try{C.stop()}catch{}})},2200)}catch{}}}catch{return()=>{}}}function E2(){try{Ir&&Ir.suspend().catch(()=>{})}catch{}}let Dl=null;function Ha(t){Dl=t}function T2(){if(Dl){try{Dl()}catch{}Dl=null}}function b2(t,e){try{if(!window.speechSynthesis)return;window.speechSynthesis.cancel();const n=new SpeechSynthesisUtterance(t);n.rate=.88,n.pitch=e==="control"?.78:1.05,n.volume=.8;const i=window.speechSynthesis.getVoices(),r=i.find(s=>s.lang==="en-US"&&s.localService)||i.find(s=>s.lang==="en-US")||i.find(s=>s.lang.startsWith("en"))||null;r&&(n.voice=r),window.speechSynthesis.speak(n)}catch{}}const w2={power_restoration:"power_management.js",nav_calibration:"flight_control.js"},x2={power_restoration:"ReferenceError: 'powr' is not defined. Variable names must match exactly — every character counts.",nav_calibration:"TypeError: Invalid assignment target. The = operator assigns a value; use >= to compare."},A2={power_restoration:"Fix deployed. Restoring power output...",nav_calibration:"Fix deployed. Locking orbital trajectory..."};function C2({mission:t,onSuccess:e}){const[n,i]=W.useState(t.challenge.brokenCode),[r,s]=W.useState("idle"),[o,a]=W.useState(0),[l,u]=W.useState(!1),c=w2[t.id]??`${t.id}.js`,d=x2[t.id]??"SyntaxError — code could not be executed.",f=A2[t.id]??"Fix deployed. System restoring...";function p(){if(r==="success")return;const _=o+1;a(_),t.challenge.validate(n)?(s("success"),setTimeout(()=>e(),900)):(s("error"),ep(),_>=2&&u(!0))}function m(_){i(_.target.value),r==="error"&&s("idle")}return P.jsxs("div",{className:"cr-container",children:[P.jsxs("div",{className:"cr-header",children:[P.jsx("span",{className:"cr-badge",children:"Mission"}),P.jsx("span",{className:"cr-title",children:t.title})]}),P.jsx("p",{className:"cr-objective",children:t.objective}),P.jsx("div",{className:"cr-context",children:t.challenge.context}),P.jsxs("div",{className:`cr-editor-wrap${r==="error"?" cr-editor-wrap--error":""}${r==="success"?" cr-editor-wrap--success":""}`,children:[P.jsxs("div",{className:"cr-editor-bar",children:[P.jsx("span",{className:"cr-file-name",children:c}),r==="success"&&P.jsx("span",{className:"cr-badge-ok",children:"✓ FIXED"}),r==="error"&&P.jsx("span",{className:"cr-badge-err",children:"✗ ERROR"})]}),P.jsx("textarea",{className:`cr-editor${r==="success"?" cr-editor--success":""}`,value:n,onChange:m,spellCheck:!1,autoCorrect:"off",autoCapitalize:"off",disabled:r==="success",rows:t.challenge.brokenCode.split(`
`).length+1,onKeyDown:_=>{if(_.key==="Tab"){_.preventDefault();const g=_.target.selectionStart,h=n.slice(0,g)+"  "+n.slice(_.target.selectionEnd);i(h),requestAnimationFrame(()=>{_.target.selectionStart=_.target.selectionEnd=g+2})}}})]}),r==="error"&&P.jsx("div",{className:"cr-error-msg",children:d},o),l&&r!=="success"&&P.jsxs("div",{className:"cr-hint",children:[P.jsx("span",{className:"cr-hint-label",children:"Hint"}),P.jsx("span",{children:t.challenge.hint})]}),r==="success"&&P.jsx("div",{className:"cr-success-msg",children:f}),r!=="success"&&P.jsx("button",{className:"cr-deploy-btn",onClick:p,children:"[ Deploy Fix ]"})]})}const R2=18,P2={power_restored:"POWER SYSTEMS · ALL SYSTEMS NOMINAL",nav_calibrated:"GUIDANCE COMPUTER · TRAJECTORY LOCKED · NOMINAL"};function N2({terminal:t,onClose:e,onMissionComplete:n}){var I;const i=t!==null,[r,s]=W.useState("intro"),[o,a]=W.useState(null),[l,u]=W.useState(0),[c,d]=W.useState(0),[f,p]=W.useState([]),[m,_]=W.useState(!1),g=W.useRef(null),h=W.useRef(null),v=W.useRef(null);v.current=r==="success"&&o?o.success.dialogue:t==null?void 0:t.sequence,W.useEffect(()=>{i&&(clearInterval(h.current),s("intro"),a(null),u(0),d(0),p([]),_(!1))},[t==null?void 0:t.id,i]),W.useEffect(()=>{if(!i||r==="challenge"||r==="complete")return;const F=v.current;if(!F)return;const z=F[l];if(!z)return;d(0);let D=0;return clearInterval(h.current),h.current=setInterval(()=>{D++,d(D),X_(),D>=z.text.length&&clearInterval(h.current)},R2),()=>clearInterval(h.current)},[l,t==null?void 0:t.id,r,i]),W.useEffect(()=>{g.current&&(g.current.scrollTop=g.current.scrollHeight)},[c,f.length]);const S=v.current,M=S==null?void 0:S[l],T=!!(M&&c<M.text.length),b=M?M.text.slice(0,c):"",w=W.useCallback(()=>{const F=v.current;if(!F||r==="challenge"||r==="complete")return;const z=F[l];if(!z)return;if(T){clearInterval(h.current),d(z.text.length);return}if(r==="intro"&&z.type==="mission"){const G=c2(z.missionId);a(G),p([]),s("challenge");return}const D=[...f,z.text];if(z.isLast||l+1>=F.length){p(D),_(!0),r==="success"&&s("complete");return}p(D),u(G=>G+1)},[r,l,T,f]),y=W.useCallback(()=>{o&&(tp(),n==null||n(o.id,o.success.worldEffect),u(0),d(0),p([]),_(!1),s("success"))},[o,n]);W.useEffect(()=>{if(!i)return;const F=z=>{z.code==="Escape"&&e()};return window.addEventListener("keydown",F),()=>window.removeEventListener("keydown",F)},[i,e]),W.useEffect(()=>{if(!i||r==="challenge")return;const F=z=>{(z.code==="Space"||z.code==="Enter")&&(z.preventDefault(),w())};return window.addEventListener("keydown",F),()=>window.removeEventListener("keydown",F)},[i,r,w]);const C=r==="success"||r==="complete",R=["terminal-panel",C?"terminal-panel--success":""].filter(Boolean).join(" "),N=C?P2[(I=o==null?void 0:o.success)==null?void 0:I.worldEffect]??"ALL SYSTEMS NOMINAL":(t==null?void 0:t.statusLine)??"";return P.jsx("div",{className:`terminal-backdrop${i?" open":""}`,onClick:F=>{F.target===F.currentTarget&&e()},children:t&&P.jsxs("div",{className:R,children:[P.jsx("div",{className:"terminal-scanlines"}),P.jsxs("div",{className:"t-header",children:[P.jsxs("div",{className:"t-header-left",children:[P.jsx("span",{className:`t-dot${C?" t-dot--success":""}`}),P.jsx("span",{className:"t-label",children:t.label}),t.offline&&P.jsx("span",{className:"t-offline-badge",children:"OFFLINE"}),r==="challenge"&&o&&P.jsx("span",{className:"t-mission-badge t-mission-badge--active",children:o.title}),r==="complete"&&P.jsx("span",{className:"t-mission-badge t-mission-badge--done",children:"Mission Complete"})]}),P.jsxs("div",{className:"t-header-right",children:[P.jsx("span",{className:"t-esc-hint",children:"ESC to close"}),P.jsx("button",{className:"t-close-btn",onClick:e,"aria-label":"Close terminal",children:"✕"})]})]}),P.jsxs("div",{className:"t-statusbar",children:[P.jsx("span",{className:`t-status-dot${t.offline&&!C?" t-status-dot--offline":""}`}),P.jsx("span",{className:"t-status-text",children:N})]}),r!=="challenge"&&P.jsxs("div",{className:"t-body",ref:g,children:[f.map((F,z)=>P.jsxs("div",{className:"t-history-msg",children:[P.jsx("div",{className:"t-ai-tag",children:t.ai.name}),P.jsx("p",{className:"t-msg-text t-msg-old",children:F})]},z)),!m&&M&&P.jsxs("div",{className:"t-current-msg",onClick:w,children:[P.jsxs("div",{className:"t-ai-tag",children:[t.ai.name,P.jsx("span",{className:"t-ai-title",children:t.ai.title})]}),P.jsxs("p",{className:"t-msg-text",children:[b,T&&P.jsx("span",{className:"t-cursor",children:"▋"})]})]}),m&&r==="intro"&&P.jsxs("div",{className:"t-done",children:[P.jsx("span",{className:"t-done-line"}),P.jsx("span",{className:"t-done-text",children:"End of transmission"}),P.jsx("span",{className:"t-done-line"})]})]}),r==="challenge"&&o&&P.jsx(C2,{mission:o,onSuccess:y}),r!=="challenge"&&P.jsx("div",{className:"t-footer",children:r==="complete"?P.jsx("button",{className:"t-action-btn t-mission-complete-btn",onClick:e,children:"[ Mission Complete — Close Terminal ]"}):m?P.jsx("button",{className:"t-action-btn t-close-action",onClick:e,children:"[ Close Terminal ]"}):P.jsx("button",{className:`t-action-btn${T?" t-btn-skip":""}`,onClick:w,children:T?"[ Skip ▶▶ ]":"[ Continue ▶ ]"})})]})})}const Ul=[{id:"power",label:"Power Systems",desc:"Reactor core and power distribution",terminalId:"power",missionId:"power_restoration"},{id:"fuel",label:"Fuel Systems",desc:"Propellant management and flow control",terminalId:"fuel",missionId:"fuel_calculation"},{id:"nav",label:"Navigation",desc:"Guidance computer and trajectory",terminalId:"nav",missionId:"nav_calibration"},{id:"comms",label:"Communications",desc:"Broadcast array and signal routing",terminalId:"comms",missionId:"comms_signal"},{id:"diagnostics",label:"Diagnostics",desc:"System scan and fault detection",terminalId:"diagnostics",missionId:"diagnostics_scan"},{id:"engine",label:"Engine Core",desc:"Primary thruster ignition sequence",terminalId:"engine",missionId:"engine_ignition"}],nm=Ul.map(t=>t.missionId),np="launch_seq_v1";function Fl(){return{completedMissions:[],version:1}}function L2(){try{const t=localStorage.getItem(np);if(!t)return Fl();const e=JSON.parse(t);return Array.isArray(e.completedMissions)?e:Fl()}catch{return Fl()}}function I2(t){try{localStorage.setItem(np,JSON.stringify(t))}catch{}}function ip(t,e){if(t.completedMissions.includes(e))return t;const n={...t,completedMissions:[...t.completedMissions,e]};return I2(n),n}function nr(t,e){return t.completedMissions.includes(e)}function D2(){try{localStorage.removeItem(np)}catch{}return Fl()}function U2({progress:t}){const e=Ul.filter(i=>nr(t,i.missionId)).length,n=Ul.length;return P.jsxs("div",{className:"progress-panel",children:[P.jsxs("div",{className:"pp-header",children:[P.jsx("span",{className:"pp-title",children:"Rocket Systems"}),P.jsxs("span",{className:"pp-count",children:[P.jsx("span",{className:"pp-count-num",children:e}),P.jsx("span",{className:"pp-count-sep",children:"/"}),P.jsx("span",{className:"pp-count-total",children:n})]})]}),P.jsx("div",{className:"pp-systems",children:Ul.map(i=>{const r=nr(t,i.missionId);return P.jsxs("div",{className:`pp-system${r?" pp-system--online":" pp-system--locked"}`,children:[P.jsx("span",{className:"pp-dot"}),P.jsx("span",{className:"pp-name",children:i.label}),P.jsx("span",{className:"pp-badge",children:r?"Online":"Locked"})]},i.id)})}),P.jsx("div",{className:"pp-bar-track",children:P.jsx("div",{className:"pp-bar-fill",style:{width:`${e/n*100}%`}})})]})}const im={id:"power",label:"Power Systems",statusLine:"REACTOR CORE · DISTRIBUTION FAULT · ARRAY B OFFLINE",ai:{name:"ARIA",title:"Adaptive Response Intelligence"},sequence:[{text:"Commander. The power distribution script has a critical fault. Thruster Array B is drawing zero current. The reactor is running — but the energy is not reaching the module."},{text:"A spacecraft's power system distributes electrical current from the reactor to every module on board. If the distribution script fails to read the correct value, a module loses power entirely. Reactor output makes no difference — the module is simply unreachable."},{text:"This script stores the power level in a variable — a named container the system looks up by name. If the name used to retrieve that value doesn't exactly match the name it was stored under, the system throws a reference error. The module stays offline."},{text:"The fault script is on your terminal. The variable is declared correctly — but it is being referenced by the wrong name. Fix the reference. Restore power to Thruster Array B.",type:"mission",missionId:"power_restoration"}]},rm={id:"nav",label:"Navigation",statusLine:"GUIDANCE COMPUTER · TRAJECTORY LOGIC FAULT",ai:{name:"ARIA",title:"Adaptive Response Intelligence"},sequence:[{text:"Commander. The guidance computer has flagged a logic fault in the trajectory script. The script is supposed to confirm whether current velocity is sufficient for orbital insertion — but it is producing an incorrect result on every evaluation."},{text:"A guidance computer makes real-time decisions during flight — checking whether speed, altitude, and trajectory meet the conditions required for each mission phase. If the decision logic is wrong, the computer will execute the wrong path even when all other systems are nominal."},{text:"This script makes a decision using a conditional — an if statement that checks whether a condition is true. The fault is in the comparison operator. The assignment operator `=` stores a value into a variable. The comparison operator `>=` checks whether a value meets a threshold. They look almost identical but do opposite things."},{text:"The fault script is on your terminal. One character separates a correct comparison from a broken assignment. Fix the operator. Confirm the trajectory check.",type:"mission",missionId:"nav_calibration"}]},sm={id:"fuel",label:"Fuel Systems",statusLine:"FUEL SYSTEM · THRUST NEGATIVE · PROPULSION LINE SHUT DOWN",ai:{name:"ARIA",title:"Adaptive Response Intelligence"},sequence:[{text:"Commander. The fuel flow controller has shut down the propulsion line. Thrust output is reading negative — a physically impossible value that caused the system to reject the engine command automatically."},{text:"Rocket thrust is produced by burning propellant and expelling exhaust at high velocity. The controller calculates the force from two values: how fast propellant flows into the combustion chamber, and how fast exhaust exits the nozzle. These two quantities must be multiplied together. The wrong arithmetic operation produces a result that violates the system's safety limits."},{text:"This calculation uses number arithmetic. JavaScript provides four operators: addition, subtraction, multiplication, and division. Each produces a fundamentally different result. The wrong operator here causes the thrust value to collapse below zero — a value the engine controller cannot act on."},{text:"The fault script is on your terminal. One arithmetic operator needs to be changed. Restore a valid positive thrust value to clear the engine command.",type:"mission",missionId:"fuel_calculation"}]},om={id:"comms",label:"Communications",statusLine:"COMMUNICATIONS · REFERENCE ERROR · BROADCAST OFFLINE",ai:{name:"ARIA",title:"Adaptive Response Intelligence"},sequence:[{text:"Commander. The communications array is offline. The broadcast controller is throwing a reference error — the transmission script is attempting to read a variable that does not exist. No signal is being transmitted."},{text:"A spacecraft's communications system transmits status logs, telemetry data, and control confirmations to mission control and onboard systems. Every transmission is assembled as a text string — a sequence of characters built from system data. If the script cannot read a required value, the message cannot be constructed."},{text:"This script assembles the broadcast using string concatenation — joining values together with the `+` operator. The fault is a variable name mismatch: the script references a name that was never declared. JavaScript throws a ReferenceError and halts the transmission entirely."},{text:"The fault script is on your terminal. The declared variable and the referenced variable are not the same name. Correct the reference. Restore the broadcast.",type:"mission",missionId:"comms_signal"}]},am={id:"diagnostics",label:"Diagnostics",statusLine:"DIAGNOSTICS · SCAN UNDERREPORTING · INDEX FAULT",ai:{name:"ARIA",title:"Adaptive Response Intelligence"},sequence:[{text:"Commander. The diagnostic scanner is reporting incorrect data. It shows three systems online — four are active. The scan is silently missing one system on every pass. No fault alert has been raised."},{text:"A spacecraft's diagnostic system runs automated scans of every subsystem — checking status, temperature, power draw, and response time. The scan moves through each system one by one in sequence. If the scan routine starts at the wrong position, one or more systems are never checked — and no error is generated."},{text:"This scan uses a loop — a block of code that repeats an action for each item in a list. The loop counter controls where the scan begins. JavaScript arrays are zero-indexed: the first element is at position zero, not position one. A loop starting at index 1 silently skips the first system on every execution."},{text:"The fault script is on your terminal. The loop is starting one position too late. Correct the starting index. Ensure all four systems are included in every scan.",type:"mission",missionId:"diagnostics_scan"}]},lm={id:"engine",label:"Engine Core",statusLine:"ENGINE CORE · ISP ZERO · IGNITION BLOCKED",ai:{name:"ARIA",title:"Adaptive Response Intelligence"},sequence:[{text:"Commander. The engine core is blocked. The ignition controller is reporting a specific impulse value of zero — a physically impossible reading that is preventing the ignition sequence from being authorised."},{text:"Specific impulse measures how efficiently a rocket engine uses its propellant. It is one of the primary values the ignition system uses to confirm the engine is ready for operation. The calculation exists in the control script. The issue is not the calculation itself — the calculation is never executed."},{text:"This script defines a function — a named, reusable block of instructions. Defining a function does not execute it. The function only runs when it is explicitly called by name. If the return value of that function is never assigned to a variable, the result is discarded and the system reads zero."},{text:"The fault script is on your terminal. The function exists. It is correct. It is never called. Fix the call and capture the return value. Confirm the Isp reading.",type:"mission",missionId:"engine_ignition"}]},F2={[im.id]:im,[rm.id]:rm,[sm.id]:sm,[om.id]:om,[am.id]:am,[lm.id]:lm};function O2(t,e){return{id:t,label:e??t,statusLine:"TERMINAL OFFLINE",offline:!0,ai:{name:"ARIA",title:"Adaptive Response Intelligence"},sequence:[{text:`${e??t} terminal is currently offline. It will come online as you progress through the station.`,isLast:!0}]}}function um(t,e){return F2[t]??O2(t,e)}const cm=260,k2=[{key:"c9",threshold:9.4,from:"control",msg:"T-nine — systems nominal."},{key:"c7",threshold:7.4,from:"control",msg:"T-seven — fuel pressurised."},{key:"c5",threshold:5.4,from:"control",msg:"T-five — computer armed."},{key:"c3",threshold:3.4,from:"crew",msg:"T-three — go for engine start."},{key:"c2",threshold:2.4,from:"control",msg:"T-two — you are go for launch."},{key:"c1",threshold:1.4,from:"crew",msg:"T-one — ignition sequence start."}],B2=12,z2=80,Co=typeof window<"u"&&(window.matchMedia("(pointer: coarse)").matches||window.matchMedia("(hover: none)").matches||"ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0||/Android|iPhone|iPad|iPod|Samsung|SamsungBrowser/i.test(navigator.userAgent)),G2=Co?55:120,Wa=[{id:"power",label:"Power Systems",relX:-.35},{id:"fuel",label:"Fuel Systems",relX:-.21},{id:"nav",label:"Navigation",relX:-.07},{id:"comms",label:"Communications",relX:.07},{id:"diagnostics",label:"Diagnostics",relX:.21},{id:"engine",label:"Engine Core",relX:.35}],V2={power:"powerRestored",fuel:"fuelOnline",nav:"navCalibrated",comms:"commsOnline",diagnostics:"diagnosticsOnline",engine:"engineOnline"};function H2(t){return t>8?"SYSTEMS CHECK":t>6?"FUEL PRESSURISATION":t>4?"GUIDANCE COMPUTER ARMED":t>3?"MAIN ENGINE START":t>1?"ALL SYSTEMS GO":"IGNITION SEQUENCE START"}function W2({progress:t,onMissionComplete:e,autoLaunch:n,onLaunchComplete:i}){var Be;const r=W.useRef(null),s=W.useRef({x:0,y:0,vx:0}),o=W.useRef([]),a=W.useRef(0),l=W.useRef({W:1,H:1}),u=W.useRef(!1),c=W.useCallback(q=>({powerRestored:nr(q,"power_restoration"),fuelOnline:nr(q,"fuel_calculation"),navCalibrated:nr(q,"nav_calibration"),commsOnline:nr(q,"comms_signal"),diagnosticsOnline:nr(q,"diagnostics_scan"),engineOnline:nr(q,"engine_ignition")}),[]),[d,f]=W.useState(null),[p,m]=W.useState(null),[_,g]=W.useState(()=>c(t)),[h,v]=W.useState(null),[S,M]=W.useState(10),T=W.useRef(!1),b=W.useRef(_),w=W.useRef(null),y=W.useRef(10),C=W.useRef(r2()),R=W.useRef(!1),N=W.useRef([]),I=W.useRef(null),F=W.useRef(i),z=W.useRef(null),D=W.useRef(new Set),G=W.useRef(null),H=W.useRef(null),U=W.useRef({}),[X,J]=W.useState([]),[se,ye]=W.useState("--:--:--"),[Ge,He]=W.useState({x:0,y:0}),Ue=W.useRef({active:!1,cx:0,cy:0});W.useEffect(()=>{F.current=i},[i]),W.useEffect(()=>{const q=()=>{const K=new Date,ue=String(K.getHours()).padStart(2,"0"),x=String(K.getMinutes()).padStart(2,"0"),E=String(K.getSeconds()).padStart(2,"0");ye(`${ue}:${x}:${E}`)};q();const ve=setInterval(q,1e3);return()=>clearInterval(ve)},[]),W.useEffect(()=>{var q,ve;h==="countdown"?(T2(),z.current=y2()):h==="ignition"?((q=z.current)==null||q.stop(),z.current=null,M2()):(!h||h==="complete")&&((ve=z.current)==null||ve.stop(),z.current=null)},[h]),W.useEffect(()=>()=>{var q;(q=z.current)==null||q.stop()},[]),W.useEffect(()=>{g(c(t))},[t,c]),W.useEffect(()=>{b.current=_},[_]),W.useEffect(()=>h2(),[]),W.useEffect(()=>{p&&!I.current&&v2(),!p&&I.current&&_2(),I.current=p},[p]),W.useEffect(()=>{T.current=p!==null},[p]),W.useEffect(()=>{w.current=h,C.current.phaseTransitioned=!1},[h]),W.useEffect(()=>{if(!n)return;const q=setTimeout(()=>{const ve=C.current;ve.phaseTime=0,ve.countdownTimer=10,ve.rocketAscent=0,ve.cameraOffset=0,ve.shakeX=0,ve.shakeY=0,ve.flashAlpha=0,ve.alarmAlpha=0,ve.fadeAlpha=0,ve.ignitionLevel=.3,ve.particles=[],ve.phaseTransitioned=!1,y.current=10,R.current=!0,D.current=new Set,J([]),M(10),v("countdown")},1200);return()=>clearTimeout(q)},[]);const te=MM();W.useEffect(()=>{function q(){const ve=r.current;if(!ve)return;const K=ve.clientWidth,ue=ve.clientHeight;ve.width=K,ve.height=ue,l.current={W:K,H:ue};const x=ue*.82;u.current?(s.current.y=x,s.current.x=Math.max(30,Math.min(K-30,s.current.x))):(s.current={x:K/2,y:x,vx:0},o.current=wM(G2,K,ue),N.current=EM(Co?20:55,K,ue),u.current=!0)}return q(),window.addEventListener("resize",q),()=>window.removeEventListener("resize",q)},[]),W.useEffect(()=>{function q(ve){if(ve.code==="KeyE"&&d&&!T.current&&!w.current){const K=Wa.find(ue=>ue.id===d);m(um(d,K==null?void 0:K.label))}}return window.addEventListener("keydown",q),()=>window.removeEventListener("keydown",q)},[d]);const me=30,de=9,Pe=W.useCallback((q,ve,K,ue)=>{const x=q-K,E=ve-ue,L=Math.sqrt(x*x+E*E),j=L>me?x/L*me:x,ne=L>me?E/L*me:E;He({x:j,y:ne}),te.current.ArrowLeft=x<-de,te.current.ArrowRight=x>de},[te]),ke=W.useCallback(q=>{q.preventDefault();const ve=q.touches[0],K=q.currentTarget.getBoundingClientRect(),ue=K.left+K.width/2,x=K.top+K.height/2;Ue.current={active:!0,cx:ue,cy:x},Pe(ve.clientX,ve.clientY,ue,x)},[Pe]),Fe=W.useCallback(q=>{q.preventDefault();const ve=Ue.current;ve.active&&Pe(q.touches[0].clientX,q.touches[0].clientY,ve.cx,ve.cy)},[Pe]),it=W.useCallback(q=>{q.preventDefault(),Ue.current.active=!1,te.current.ArrowLeft=!1,te.current.ArrowRight=!1,He({x:0,y:0})},[te]),Xe=W.useCallback(()=>{if(!d||T.current||w.current)return;const q=Wa.find(ve=>ve.id===d);m(um(d,q==null?void 0:q.label))},[d]),et=W.useCallback((q,ve)=>{e==null||e(q,ve)},[e]),ut=W.useCallback(q=>{const ve=r.current;if(!ve||!u.current)return;const K=ve.getContext("2d"),{W:ue,H:x}=l.current,E=s.current,L=C.current,j=w.current;a.current+=q;const ne=a.current;if(!T.current&&(!j||j==="countdown")){const ae=te.current.KeyA||te.current.ArrowLeft,Me=te.current.KeyD||te.current.ArrowRight;E.vx+=((Me?cm:ae?-cm:0)-E.vx)*Math.min(B2*q,1),E.x=Math.max(30,Math.min(ue-30,E.x+E.vx*q))}else E.vx*=.88;if(j==="countdown"){L.phaseTime+=q,L.countdownTimer=Math.max(0,10-L.phaseTime);const ae=L.phaseTime/10;L.shakeX=Math.sin(ne*48)*ae*ae*2.8,L.shakeY=Math.cos(ne*37)*ae*ae*2.8,L.alarmAlpha=.22*(.5+.5*Math.sin(ne*5.5)),L.ignitionLevel=Math.max(.3,Math.min(1,(L.phaseTime-6)/4)),L.phaseTime>3.5&&Math.random()<ae*12*q&&Ec(L,ue/2,x*.55+22);const Me=Math.max(0,Math.ceil(L.countdownTimer));Me!==y.current&&(y.current=Me,M(Me),Me>0&&S2(Me)),z.current&&z.current.setLevel(Math.max(0,(L.ignitionLevel-.3)/.7)),k2.forEach(({key:Ve,threshold:k,from:pe,msg:ie})=>{!D.current.has(Ve)&&L.countdownTimer<=k&&(D.current.add(Ve),J(we=>[...we.slice(-4),{from:pe,msg:ie,id:Ve}]),b2(ie,pe))}),L.phaseTime>=10&&!L.phaseTransitioned&&(L.phaseTransitioned=!0,L.flashAlpha=1,L.alarmAlpha=0,L.ignitionLevel=1,L.phaseTime=0,M(0),v("ignition"))}if(j==="ignition"){L.phaseTime+=q,L.flashAlpha=Math.max(0,L.flashAlpha*Math.pow(.82,q*60)),L.ignitionLevel=1;const ae=7+Math.sin(ne*80)*3;L.shakeX=(Math.random()-.5)*ae,L.shakeY=(Math.random()-.5)*ae,Math.random()<.9&&Ec(L,ue/2,x*.55+25),Math.random()<.75&&Y0(L,ue/2,x*.55+25),L.phaseTime>=1.6&&!L.phaseTransitioned&&(L.phaseTransitioned=!0,L.phaseTime=0,L.rocketAscent=0,v("liftoff"))}if(j==="liftoff"){L.phaseTime+=q,L.rocketAscent-=(160+L.phaseTime*L.phaseTime*65)*q;const ae=Math.max(0,-L.rocketAscent-x*.12);L.cameraOffset+=(ae-L.cameraOffset)*Math.min(3.5*q,.95);const Me=Math.max(0,5.5-L.phaseTime*2);L.shakeX=(Math.random()-.5)*Me,L.shakeY=(Math.random()-.5)*Me,Math.random()<.8&&Y0(L,ue/2,x*.55+L.rocketAscent+22),Math.random()<.35&&Ec(L,ue/2,x*.55+L.rocketAscent+35),Math.random()<.22&&s2(L,ue/2,x*.55+L.rocketAscent+8),L.rocketAscent<-x*1.35&&!L.phaseTransitioned&&(L.phaseTransitioned=!0,L.phaseTime=0,v("ascent"))}if(j==="ascent"){L.phaseTime+=q,L.rocketAscent-=(550+L.phaseTime*280)*q;const ae=Math.max(0,-L.rocketAscent-x*.12);L.cameraOffset+=(ae-L.cameraOffset)*Math.min(5*q,.98),L.shakeX=0,L.shakeY=0,L.phaseTime>1.5&&(L.fadeAlpha=Math.min(1,(L.phaseTime-1.5)/2.2)),L.phaseTime>=4.5&&!L.phaseTransitioned&&(L.phaseTransitioned=!0,v("complete"),F.current&&setTimeout(F.current,700))}o2(L,q);const ge=Wa.map(ae=>({...ae,x:ue/2+ae.relX*ue,y:x*.72}));if(j)d!==null&&f(null);else{let ae=null;ge.forEach(Me=>{const Ve=E.x-Me.x,k=E.y-Me.y;Math.sqrt(Ve*Ve+k*k)<z2&&(ae=Me.id)}),f(Me=>Me===ae?Me:ae)}const Q=b.current,ee=Q.powerRestored||!!j,_e=x*.55+L.rocketAscent;G.current||(G.current=$M(ue,x));const Ee=T.current||!!j;if(!Ee){const ae=U.current,Me=["powerRestored","fuelOnline","navCalibrated","commsOnline","diagnosticsOnline","engineOnline"];for(let Ve=0;Ve<Me.length;Ve++)if(Q[Me[Ve]]&&!ae[Me[Ve]]){qM(G.current,ue/2);break}U.current={...Q}}YM(G.current,q,ue,x,Ee),H.current||(H.current=JM(ue,x)),j||QM(H.current,q,ue,x),GM(K,ue,x,ne),L.alarmAlpha>.005&&PM(K,ue,x,L.alarmAlpha),K.save(),K.translate(Math.round(L.shakeX),Math.round(L.shakeY-L.cameraOffset)),xM(K,o.current,ne),LM(K,ue,x,ne),i2(K,ue,x),RM(K,ue,ee),CM(K,ue,x,ue/2),VM(K,ue/2,_e,x,ne),BM(K,ue/2,_e,ne),j||(ZM(K,G.current,ne),e2(K,H.current,ne)),ee&&UM(K,ue,x,ne),(!j||j==="countdown")&&(TM(N.current,q,ue,x),bM(K,N.current,ne)),l2(K,L),Q.navCalibrated&&(!j||j==="countdown")&&FM(K,ue/2,_e,ue,x,ne),a2(K,ue/2,_e,L.ignitionLevel),HM(K,ue/2,_e,ne);const re=_e-232;NM(K,ue/2,_e,re,ue,x,ne),IM(K,ue/2,_e,ne,ee,L.ignitionLevel),(!j||j==="countdown")&&(ge.forEach(ae=>{const Me=!!Q[V2[ae.id]];kM(K,ae.x,ae.y,ae.label,!j&&ae.id===d,ne,Me)}),Q.powerRestored&&DM(K,ge,ne));const oe=j==="countdown"?Math.max(0,Math.min(1,L.countdownTimer/2)):j?0:1;oe>.01&&(K.save(),K.globalAlpha=oe,zM(K,E.x,E.y,E.vx,ne),K.restore()),K.restore(),L.flashAlpha>.01&&(K.fillStyle=`rgba(255,248,225,${Math.min(1,L.flashAlpha)})`,K.fillRect(0,0,ue,x)),L.fadeAlpha>.005&&(K.fillStyle=`rgba(2,5,18,${Math.min(1,L.fadeAlpha)})`,K.fillRect(0,0,ue,x))},[te]);Zh(ut);const he=d?(Be=Wa.find(q=>q.id===d))==null?void 0:Be.label:null,lt=()=>{if(R.current)return;const q=C.current;q.phaseTime=0,q.countdownTimer=10,q.rocketAscent=0,q.cameraOffset=0,q.shakeX=0,q.shakeY=0,q.flashAlpha=0,q.alarmAlpha=0,q.fadeAlpha=0,q.ignitionLevel=.3,q.particles=[],q.phaseTransitioned=!1,y.current=10,R.current=!0,D.current=new Set,J([]),M(10),v("countdown")},tt=h&&h!=="complete",We=S<=3,O=_;return P.jsxs("div",{style:{position:"relative",width:"100%",height:"100%"},children:[P.jsx("canvas",{ref:r,className:"hangar-canvas"}),P.jsx("div",{className:"game-vignette"}),!h&&P.jsxs("div",{className:"hud-overlay",children:[P.jsxs("div",{className:"hud-chip",children:["Phase ",P.jsx("span",{children:"Rocket Builder"})]}),P.jsxs("div",{className:"hud-chip",children:["Bay ",P.jsx("span",{children:"Hangar 1"})]}),O.powerRestored&&P.jsxs("div",{className:"hud-chip hud-chip--online",children:["Power       ",P.jsx("span",{children:"Online"})]}),O.fuelOnline&&P.jsxs("div",{className:"hud-chip hud-chip--online",children:["Fuel        ",P.jsx("span",{children:"Online"})]}),O.navCalibrated&&P.jsxs("div",{className:"hud-chip hud-chip--online",children:["Navigation  ",P.jsx("span",{children:"Online"})]}),O.commsOnline&&P.jsxs("div",{className:"hud-chip hud-chip--online",children:["Comms       ",P.jsx("span",{children:"Online"})]}),O.diagnosticsOnline&&P.jsxs("div",{className:"hud-chip hud-chip--online",children:["Diagnostics ",P.jsx("span",{children:"Online"})]}),O.engineOnline&&P.jsxs("div",{className:"hud-chip hud-chip--online",children:["Engine      ",P.jsx("span",{children:"Online"})]})]}),he&&!p&&!h&&!Co&&P.jsxs("div",{className:"interact-prompt",children:[P.jsx("kbd",{children:"E"})," Interact · ",he]}),!h&&P.jsx("button",{className:"dev-launch-btn",onClick:lt,children:"▶ BEGIN LAUNCH"}),!h&&P.jsx(U2,{progress:t}),!h&&!Co&&P.jsxs("div",{className:"controls-hint",children:[P.jsxs("div",{children:[P.jsx("kbd",{className:"ck",children:"A"}),P.jsx("kbd",{className:"ck",children:"D"})," Move"]}),P.jsxs("div",{children:[P.jsx("kbd",{className:"ck",children:"E"})," Interact"]})]}),!h&&Co&&P.jsxs("div",{className:"mobile-controls",children:[P.jsx("div",{className:"mobile-joystick",onTouchStart:ke,onTouchMove:Fe,onTouchEnd:it,onTouchCancel:it,"aria-label":"Move character",children:P.jsx("div",{className:"joystick-nub",style:{transform:`translate(${Ge.x}px, ${Ge.y}px)`}})}),he&&!p&&P.jsx("button",{className:"mobile-btn mobile-btn--interact",onTouchStart:q=>{q.preventDefault(),Xe()},"aria-label":"Interact",children:"E"})]}),tt&&P.jsxs("div",{className:"launch-overlay",children:[h==="countdown"&&P.jsxs(P.Fragment,{children:[P.jsx("div",{className:"launch-warning",children:"Launch Sequence Initiated"}),P.jsx("div",{className:`launch-countdown${We?" launch-countdown--critical":""}`,children:S}),P.jsx("div",{className:"launch-status",children:H2(S)})]}),h==="ignition"&&P.jsx("div",{className:"launch-event launch-event--ignition",children:"Ignition"}),h==="liftoff"&&P.jsx("div",{className:"launch-event launch-event--liftoff",children:"Liftoff"}),X.length>0&&P.jsx("div",{className:"launch-comms",children:X.map(q=>P.jsxs("div",{className:`launch-comms-line launch-comms-line--${q.from}`,children:[P.jsx("span",{className:"comms-from",children:q.from==="crew"?"CREW":"MC"}),q.msg]},q.id))})]}),P.jsx(N2,{terminal:p,onClose:()=>m(null),onMissionComplete:et}),!h&&P.jsxs("div",{className:"game-status-bar",children:[P.jsxs("span",{className:"gsb-left",children:["MISSION STATUS: ",P.jsx("em",{children:"STANDBY"})]}),P.jsxs("span",{className:"gsb-right",children:["SYSTEM TIME: ",P.jsx("em",{children:se})]})]})]})}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const rp="184",X2=0,fm=1,j2=2,Ol=1,$2=2,Ro=3,_i=0,Sn=1,fi=2,Di=0,Wr=1,vu=2,dm=3,hm=4,Y2=5,Dr=100,q2=101,K2=102,Z2=103,J2=104,Q2=200,eE=201,tE=202,nE=203,od=204,ad=205,iE=206,rE=207,sE=208,oE=209,aE=210,lE=211,uE=212,cE=213,fE=214,ld=0,ud=1,cd=2,Ys=3,fd=4,dd=5,hd=6,pd=7,sp=0,dE=1,hE=2,gi=0,j_=1,$_=2,Y_=3,op=4,q_=5,K_=6,Z_=7,J_=300,Kr=301,qs=302,bc=303,wc=304,Wu=306,md=1e3,Li=1001,gd=1002,$t=1003,pE=1004,Xa=1005,nn=1006,xc=1007,zr=1008,wn=1009,Q_=1010,eS=1011,ua=1012,ap=1013,Si=1014,di=1015,zi=1016,lp=1017,up=1018,ca=1020,tS=35902,nS=35899,iS=1021,rS=1022,Jn=1023,Gi=1026,Gr=1027,sS=1028,cp=1029,Zr=1030,fp=1031,dp=1033,kl=33776,Bl=33777,zl=33778,Gl=33779,vd=35840,_d=35841,Sd=35842,yd=35843,Md=36196,Ed=37492,Td=37496,bd=37488,wd=37489,_u=37490,xd=37491,Ad=37808,Cd=37809,Rd=37810,Pd=37811,Nd=37812,Ld=37813,Id=37814,Dd=37815,Ud=37816,Fd=37817,Od=37818,kd=37819,Bd=37820,zd=37821,Gd=36492,Vd=36494,Hd=36495,Wd=36283,Xd=36284,Su=36285,jd=36286,mE=3200,$d=0,gE=1,sr="",Dn="srgb",yu="srgb-linear",Mu="linear",ct="srgb",os=7680,pm=519,vE=512,_E=513,SE=514,hp=515,yE=516,ME=517,pp=518,EE=519,mm=35044,gm="300 es",hi=2e3,fa=2001;function TE(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function Eu(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function bE(){const t=Eu("canvas");return t.style.display="block",t}const vm={};function _m(...t){const e="THREE."+t.shift();console.log(e,...t)}function oS(t){const e=t[0];if(typeof e=="string"&&e.startsWith("TSL:")){const n=t[1];n&&n.isStackTrace?t[0]+=" "+n.getLocation():t[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return t}function ze(...t){t=oS(t);const e="THREE."+t.shift();{const n=t[0];n&&n.isStackTrace?console.warn(n.getError(e)):console.warn(e,...t)}}function ot(...t){t=oS(t);const e="THREE."+t.shift();{const n=t[0];n&&n.isStackTrace?console.error(n.getError(e)):console.error(e,...t)}}function Yd(...t){const e=t.join(" ");e in vm||(vm[e]=!0,ze(...t))}function wE(t,e,n){return new Promise(function(i,r){function s(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:r();break;case t.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}const xE={[ld]:ud,[cd]:hd,[fd]:pd,[Ys]:dd,[ud]:ld,[hd]:cd,[pd]:fd,[dd]:Ys};class ts{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const n=this._listeners;if(n===void 0)return;const i=n[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const Qt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ac=Math.PI/180,qd=180/Math.PI;function no(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Qt[t&255]+Qt[t>>8&255]+Qt[t>>16&255]+Qt[t>>24&255]+"-"+Qt[e&255]+Qt[e>>8&255]+"-"+Qt[e>>16&15|64]+Qt[e>>24&255]+"-"+Qt[n&63|128]+Qt[n>>8&255]+"-"+Qt[n>>16&255]+Qt[n>>24&255]+Qt[i&255]+Qt[i>>8&255]+Qt[i>>16&255]+Qt[i>>24&255]).toLowerCase()}function Je(t,e,n){return Math.max(e,Math.min(n,t))}function AE(t,e){return(t%e+e)%e}function Cc(t,e,n){return(1-n)*t+n*e}function mo(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("Invalid component type.")}}function dn(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("Invalid component type.")}}const bp=class bp{constructor(e=0,n=0){this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Je(this.x,e.x,n.x),this.y=Je(this.y,e.y,n.y),this}clampScalar(e,n){return this.x=Je(this.x,e,n),this.y=Je(this.y,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Je(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Je(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};bp.prototype.isVector2=!0;let Le=bp;class io{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,s,o,a){let l=i[r+0],u=i[r+1],c=i[r+2],d=i[r+3],f=s[o+0],p=s[o+1],m=s[o+2],_=s[o+3];if(d!==_||l!==f||u!==p||c!==m){let g=l*f+u*p+c*m+d*_;g<0&&(f=-f,p=-p,m=-m,_=-_,g=-g);let h=1-a;if(g<.9995){const v=Math.acos(g),S=Math.sin(v);h=Math.sin(h*v)/S,a=Math.sin(a*v)/S,l=l*h+f*a,u=u*h+p*a,c=c*h+m*a,d=d*h+_*a}else{l=l*h+f*a,u=u*h+p*a,c=c*h+m*a,d=d*h+_*a;const v=1/Math.sqrt(l*l+u*u+c*c+d*d);l*=v,u*=v,c*=v,d*=v}}e[n]=l,e[n+1]=u,e[n+2]=c,e[n+3]=d}static multiplyQuaternionsFlat(e,n,i,r,s,o){const a=i[r],l=i[r+1],u=i[r+2],c=i[r+3],d=s[o],f=s[o+1],p=s[o+2],m=s[o+3];return e[n]=a*m+c*d+l*p-u*f,e[n+1]=l*m+c*f+u*d-a*p,e[n+2]=u*m+c*p+a*f-l*d,e[n+3]=c*m-a*d-l*f-u*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,u=a(i/2),c=a(r/2),d=a(s/2),f=l(i/2),p=l(r/2),m=l(s/2);switch(o){case"XYZ":this._x=f*c*d+u*p*m,this._y=u*p*d-f*c*m,this._z=u*c*m+f*p*d,this._w=u*c*d-f*p*m;break;case"YXZ":this._x=f*c*d+u*p*m,this._y=u*p*d-f*c*m,this._z=u*c*m-f*p*d,this._w=u*c*d+f*p*m;break;case"ZXY":this._x=f*c*d-u*p*m,this._y=u*p*d+f*c*m,this._z=u*c*m+f*p*d,this._w=u*c*d-f*p*m;break;case"ZYX":this._x=f*c*d-u*p*m,this._y=u*p*d+f*c*m,this._z=u*c*m-f*p*d,this._w=u*c*d+f*p*m;break;case"YZX":this._x=f*c*d+u*p*m,this._y=u*p*d+f*c*m,this._z=u*c*m-f*p*d,this._w=u*c*d-f*p*m;break;case"XZY":this._x=f*c*d-u*p*m,this._y=u*p*d-f*c*m,this._z=u*c*m+f*p*d,this._w=u*c*d+f*p*m;break;default:ze("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],r=n[4],s=n[8],o=n[1],a=n[5],l=n[9],u=n[2],c=n[6],d=n[10],f=i+a+d;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(c-l)*p,this._y=(s-u)*p,this._z=(o-r)*p}else if(i>a&&i>d){const p=2*Math.sqrt(1+i-a-d);this._w=(c-l)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(s+u)/p}else if(a>d){const p=2*Math.sqrt(1+a-i-d);this._w=(s-u)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(l+c)/p}else{const p=2*Math.sqrt(1+d-i-a);this._w=(o-r)/p,this._x=(s+u)/p,this._y=(l+c)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Je(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,r=e._y,s=e._z,o=e._w,a=n._x,l=n._y,u=n._z,c=n._w;return this._x=i*c+o*a+r*u-s*l,this._y=r*c+o*l+s*a-i*u,this._z=s*c+o*u+i*l-r*a,this._w=o*c-i*a-r*l-s*u,this._onChangeCallback(),this}slerp(e,n){let i=e._x,r=e._y,s=e._z,o=e._w,a=this.dot(e);a<0&&(i=-i,r=-r,s=-s,o=-o,a=-a);let l=1-n;if(a<.9995){const u=Math.acos(a),c=Math.sin(u);l=Math.sin(l*u)/c,n=Math.sin(n*u)/c,this._x=this._x*l+i*n,this._y=this._y*l+r*n,this._z=this._z*l+s*n,this._w=this._w*l+o*n,this._onChangeCallback()}else this._x=this._x*l+i*n,this._y=this._y*l+r*n,this._z=this._z*l+s*n,this._w=this._w*l+o*n,this.normalize();return this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(n),s*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const wp=class wp{constructor(e=0,n=0,i=0){this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(Sm.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(Sm.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const n=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,u=2*(o*r-a*i),c=2*(a*n-s*r),d=2*(s*i-o*n);return this.x=n+l*u+o*d-a*c,this.y=i+l*c+a*u-s*d,this.z=r+l*d+s*c-o*u,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Je(this.x,e.x,n.x),this.y=Je(this.y,e.y,n.y),this.z=Je(this.z,e.z,n.z),this}clampScalar(e,n){return this.x=Je(this.x,e,n),this.y=Je(this.y,e,n),this.z=Je(this.z,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Je(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,r=e.y,s=e.z,o=n.x,a=n.y,l=n.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Rc.copy(this).projectOnVector(e),this.sub(Rc)}reflect(e){return this.sub(Rc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Je(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};wp.prototype.isVector3=!0;let B=wp;const Rc=new B,Sm=new io,xp=class xp{constructor(e,n,i,r,s,o,a,l,u){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,l,u)}set(e,n,i,r,s,o,a,l,u){const c=this.elements;return c[0]=e,c[1]=r,c[2]=a,c[3]=n,c[4]=s,c[5]=l,c[6]=i,c[7]=o,c[8]=u,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[3],l=i[6],u=i[1],c=i[4],d=i[7],f=i[2],p=i[5],m=i[8],_=r[0],g=r[3],h=r[6],v=r[1],S=r[4],M=r[7],T=r[2],b=r[5],w=r[8];return s[0]=o*_+a*v+l*T,s[3]=o*g+a*S+l*b,s[6]=o*h+a*M+l*w,s[1]=u*_+c*v+d*T,s[4]=u*g+c*S+d*b,s[7]=u*h+c*M+d*w,s[2]=f*_+p*v+m*T,s[5]=f*g+p*S+m*b,s[8]=f*h+p*M+m*w,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],u=e[7],c=e[8];return n*o*c-n*a*u-i*s*c+i*a*l+r*s*u-r*o*l}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],u=e[7],c=e[8],d=c*o-a*u,f=a*l-c*s,p=u*s-o*l,m=n*d+i*f+r*p;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/m;return e[0]=d*_,e[1]=(r*u-c*i)*_,e[2]=(a*i-r*o)*_,e[3]=f*_,e[4]=(c*n-r*l)*_,e[5]=(r*s-a*n)*_,e[6]=p*_,e[7]=(i*l-u*n)*_,e[8]=(o*n-i*s)*_,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,s,o,a){const l=Math.cos(s),u=Math.sin(s);return this.set(i*l,i*u,-i*(l*o+u*a)+o+e,-r*u,r*l,-r*(-u*o+l*a)+a+n,0,0,1),this}scale(e,n){return this.premultiply(Pc.makeScale(e,n)),this}rotate(e){return this.premultiply(Pc.makeRotation(-e)),this}translate(e,n){return this.premultiply(Pc.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};xp.prototype.isMatrix3=!0;let je=xp;const Pc=new je,ym=new je().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Mm=new je().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function CE(){const t={enabled:!0,workingColorSpace:yu,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===ct&&(r.r=Ui(r.r),r.g=Ui(r.g),r.b=Ui(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ct&&(r.r=Bs(r.r),r.g=Bs(r.g),r.b=Bs(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===sr?Mu:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Yd("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),t.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Yd("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),t.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return t.define({[yu]:{primaries:e,whitePoint:i,transfer:Mu,toXYZ:ym,fromXYZ:Mm,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Dn},outputColorSpaceConfig:{drawingBufferColorSpace:Dn}},[Dn]:{primaries:e,whitePoint:i,transfer:ct,toXYZ:ym,fromXYZ:Mm,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Dn}}}),t}const nt=CE();function Ui(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function Bs(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let as;class RE{static getDataURL(e,n="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{as===void 0&&(as=Eu("canvas")),as.width=e.width,as.height=e.height;const r=as.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=as}return i.toDataURL(n)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=Eu("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Ui(s[o]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Ui(n[i]/255)*255):n[i]=Ui(n[i]);return{data:n,width:e.width,height:e.height}}else return ze("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let PE=0;class mp{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:PE++}),this.uuid=no(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?e.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?e.set(n.displayWidth,n.displayHeight,0):n!==null?e.set(n.width,n.height,n.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Nc(r[o].image)):s.push(Nc(r[o]))}else s=Nc(r);i.url=s}return n||(e.images[this.uuid]=i),i}}function Nc(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?RE.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(ze("Texture: Unable to serialize Texture."),{})}let NE=0;const Lc=new B;class rn extends ts{constructor(e=rn.DEFAULT_IMAGE,n=rn.DEFAULT_MAPPING,i=Li,r=Li,s=nn,o=zr,a=Jn,l=wn,u=rn.DEFAULT_ANISOTROPY,c=sr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:NE++}),this.uuid=no(),this.name="",this.source=new mp(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=u,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Le(0,0),this.repeat=new Le(1,1),this.center=new Le(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new je,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=c,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Lc).x}get height(){return this.source.getSize(Lc).y}get depth(){return this.source.getSize(Lc).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const n in e){const i=e[n];if(i===void 0){ze(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){ze(`Texture.setValues(): property '${n}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==J_)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case md:e.x=e.x-Math.floor(e.x);break;case Li:e.x=e.x<0?0:1;break;case gd:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case md:e.y=e.y-Math.floor(e.y);break;case Li:e.y=e.y<0?0:1;break;case gd:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}rn.DEFAULT_IMAGE=null;rn.DEFAULT_MAPPING=J_;rn.DEFAULT_ANISOTROPY=1;const Ap=class Ap{constructor(e=0,n=0,i=0,r=1){this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*n+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*n+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*n+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*n+o[7]*i+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,s;const l=e.elements,u=l[0],c=l[4],d=l[8],f=l[1],p=l[5],m=l[9],_=l[2],g=l[6],h=l[10];if(Math.abs(c-f)<.01&&Math.abs(d-_)<.01&&Math.abs(m-g)<.01){if(Math.abs(c+f)<.1&&Math.abs(d+_)<.1&&Math.abs(m+g)<.1&&Math.abs(u+p+h-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const S=(u+1)/2,M=(p+1)/2,T=(h+1)/2,b=(c+f)/4,w=(d+_)/4,y=(m+g)/4;return S>M&&S>T?S<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(S),r=b/i,s=w/i):M>T?M<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(M),i=b/r,s=y/r):T<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(T),i=w/s,r=y/s),this.set(i,r,s,n),this}let v=Math.sqrt((g-m)*(g-m)+(d-_)*(d-_)+(f-c)*(f-c));return Math.abs(v)<.001&&(v=1),this.x=(g-m)/v,this.y=(d-_)/v,this.z=(f-c)/v,this.w=Math.acos((u+p+h-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Je(this.x,e.x,n.x),this.y=Je(this.y,e.y,n.y),this.z=Je(this.z,e.z,n.z),this.w=Je(this.w,e.w,n.w),this}clampScalar(e,n){return this.x=Je(this.x,e,n),this.y=Je(this.y,e,n),this.z=Je(this.z,e,n),this.w=Je(this.w,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Je(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Ap.prototype.isVector4=!0;let Rt=Ap;class LE extends ts{constructor(e=1,n=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:nn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=i.depth,this.scissor=new Rt(0,0,e,n),this.scissorTest=!1,this.viewport=new Rt(0,0,e,n),this.textures=[];const r={width:e,height:n,depth:i.depth},s=new rn(r),o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const n={minFilter:nn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(n.mapping=e.mapping),e.wrapS!==void 0&&(n.wrapS=e.wrapS),e.wrapT!==void 0&&(n.wrapT=e.wrapT),e.wrapR!==void 0&&(n.wrapR=e.wrapR),e.magFilter!==void 0&&(n.magFilter=e.magFilter),e.minFilter!==void 0&&(n.minFilter=e.minFilter),e.format!==void 0&&(n.format=e.format),e.type!==void 0&&(n.type=e.type),e.anisotropy!==void 0&&(n.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(n.colorSpace=e.colorSpace),e.flipY!==void 0&&(n.flipY=e.flipY),e.generateMipmaps!==void 0&&(n.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(n.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(n)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=n,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++){this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const r=Object.assign({},e.textures[n].image);this.textures[n].source=new mp(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}}class vi extends LE{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class aS extends rn{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=$t,this.minFilter=$t,this.wrapR=Li,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class IE extends rn{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=$t,this.minFilter=$t,this.wrapR=Li,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const xu=class xu{constructor(e,n,i,r,s,o,a,l,u,c,d,f,p,m,_,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,l,u,c,d,f,p,m,_,g)}set(e,n,i,r,s,o,a,l,u,c,d,f,p,m,_,g){const h=this.elements;return h[0]=e,h[4]=n,h[8]=i,h[12]=r,h[1]=s,h[5]=o,h[9]=a,h[13]=l,h[2]=u,h[6]=c,h[10]=d,h[14]=f,h[3]=p,h[7]=m,h[11]=_,h[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new xu().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return this.determinant()===0?(e.set(1,0,0),n.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const n=this.elements,i=e.elements,r=1/ls.setFromMatrixColumn(e,0).length(),s=1/ls.setFromMatrixColumn(e,1).length(),o=1/ls.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*o,n[9]=i[9]*o,n[10]=i[10]*o,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),u=Math.sin(r),c=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const f=o*c,p=o*d,m=a*c,_=a*d;n[0]=l*c,n[4]=-l*d,n[8]=u,n[1]=p+m*u,n[5]=f-_*u,n[9]=-a*l,n[2]=_-f*u,n[6]=m+p*u,n[10]=o*l}else if(e.order==="YXZ"){const f=l*c,p=l*d,m=u*c,_=u*d;n[0]=f+_*a,n[4]=m*a-p,n[8]=o*u,n[1]=o*d,n[5]=o*c,n[9]=-a,n[2]=p*a-m,n[6]=_+f*a,n[10]=o*l}else if(e.order==="ZXY"){const f=l*c,p=l*d,m=u*c,_=u*d;n[0]=f-_*a,n[4]=-o*d,n[8]=m+p*a,n[1]=p+m*a,n[5]=o*c,n[9]=_-f*a,n[2]=-o*u,n[6]=a,n[10]=o*l}else if(e.order==="ZYX"){const f=o*c,p=o*d,m=a*c,_=a*d;n[0]=l*c,n[4]=m*u-p,n[8]=f*u+_,n[1]=l*d,n[5]=_*u+f,n[9]=p*u-m,n[2]=-u,n[6]=a*l,n[10]=o*l}else if(e.order==="YZX"){const f=o*l,p=o*u,m=a*l,_=a*u;n[0]=l*c,n[4]=_-f*d,n[8]=m*d+p,n[1]=d,n[5]=o*c,n[9]=-a*c,n[2]=-u*c,n[6]=p*d+m,n[10]=f-_*d}else if(e.order==="XZY"){const f=o*l,p=o*u,m=a*l,_=a*u;n[0]=l*c,n[4]=-d,n[8]=u*c,n[1]=f*d+_,n[5]=o*c,n[9]=p*d-m,n[2]=m*d-p,n[6]=a*c,n[10]=_*d+f}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(DE,e,UE)}lookAt(e,n,i){const r=this.elements;return Mn.subVectors(e,n),Mn.lengthSq()===0&&(Mn.z=1),Mn.normalize(),$i.crossVectors(i,Mn),$i.lengthSq()===0&&(Math.abs(i.z)===1?Mn.x+=1e-4:Mn.z+=1e-4,Mn.normalize(),$i.crossVectors(i,Mn)),$i.normalize(),ja.crossVectors(Mn,$i),r[0]=$i.x,r[4]=ja.x,r[8]=Mn.x,r[1]=$i.y,r[5]=ja.y,r[9]=Mn.y,r[2]=$i.z,r[6]=ja.z,r[10]=Mn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[4],l=i[8],u=i[12],c=i[1],d=i[5],f=i[9],p=i[13],m=i[2],_=i[6],g=i[10],h=i[14],v=i[3],S=i[7],M=i[11],T=i[15],b=r[0],w=r[4],y=r[8],C=r[12],R=r[1],N=r[5],I=r[9],F=r[13],z=r[2],D=r[6],G=r[10],H=r[14],U=r[3],X=r[7],J=r[11],se=r[15];return s[0]=o*b+a*R+l*z+u*U,s[4]=o*w+a*N+l*D+u*X,s[8]=o*y+a*I+l*G+u*J,s[12]=o*C+a*F+l*H+u*se,s[1]=c*b+d*R+f*z+p*U,s[5]=c*w+d*N+f*D+p*X,s[9]=c*y+d*I+f*G+p*J,s[13]=c*C+d*F+f*H+p*se,s[2]=m*b+_*R+g*z+h*U,s[6]=m*w+_*N+g*D+h*X,s[10]=m*y+_*I+g*G+h*J,s[14]=m*C+_*F+g*H+h*se,s[3]=v*b+S*R+M*z+T*U,s[7]=v*w+S*N+M*D+T*X,s[11]=v*y+S*I+M*G+T*J,s[15]=v*C+S*F+M*H+T*se,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],u=e[13],c=e[2],d=e[6],f=e[10],p=e[14],m=e[3],_=e[7],g=e[11],h=e[15],v=l*p-u*f,S=a*p-u*d,M=a*f-l*d,T=o*p-u*c,b=o*f-l*c,w=o*d-a*c;return n*(_*v-g*S+h*M)-i*(m*v-g*T+h*b)+r*(m*S-_*T+h*w)-s*(m*M-_*b+g*w)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],u=e[7],c=e[8],d=e[9],f=e[10],p=e[11],m=e[12],_=e[13],g=e[14],h=e[15],v=n*a-i*o,S=n*l-r*o,M=n*u-s*o,T=i*l-r*a,b=i*u-s*a,w=r*u-s*l,y=c*_-d*m,C=c*g-f*m,R=c*h-p*m,N=d*g-f*_,I=d*h-p*_,F=f*h-p*g,z=v*F-S*I+M*N+T*R-b*C+w*y;if(z===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const D=1/z;return e[0]=(a*F-l*I+u*N)*D,e[1]=(r*I-i*F-s*N)*D,e[2]=(_*w-g*b+h*T)*D,e[3]=(f*b-d*w-p*T)*D,e[4]=(l*R-o*F-u*C)*D,e[5]=(n*F-r*R+s*C)*D,e[6]=(g*M-m*w-h*S)*D,e[7]=(c*w-f*M+p*S)*D,e[8]=(o*I-a*R+u*y)*D,e[9]=(i*R-n*I-s*y)*D,e[10]=(m*b-_*M+h*v)*D,e[11]=(d*M-c*b-p*v)*D,e[12]=(a*C-o*N-l*y)*D,e[13]=(n*N-i*C+r*y)*D,e[14]=(_*S-m*T-g*v)*D,e[15]=(c*T-d*S+f*v)*D,this}scale(e){const n=this.elements,i=e.x,r=e.y,s=e.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,o=e.x,a=e.y,l=e.z,u=s*o,c=s*a;return this.set(u*o+i,u*a-r*l,u*l+r*a,0,u*a+r*l,c*a+i,c*l-r*o,0,u*l-r*a,c*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){const r=this.elements,s=n._x,o=n._y,a=n._z,l=n._w,u=s+s,c=o+o,d=a+a,f=s*u,p=s*c,m=s*d,_=o*c,g=o*d,h=a*d,v=l*u,S=l*c,M=l*d,T=i.x,b=i.y,w=i.z;return r[0]=(1-(_+h))*T,r[1]=(p+M)*T,r[2]=(m-S)*T,r[3]=0,r[4]=(p-M)*b,r[5]=(1-(f+h))*b,r[6]=(g+v)*b,r[7]=0,r[8]=(m+S)*w,r[9]=(g-v)*w,r[10]=(1-(f+_))*w,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinant();if(s===0)return i.set(1,1,1),n.identity(),this;let o=ls.set(r[0],r[1],r[2]).length();const a=ls.set(r[4],r[5],r[6]).length(),l=ls.set(r[8],r[9],r[10]).length();s<0&&(o=-o),Wn.copy(this);const u=1/o,c=1/a,d=1/l;return Wn.elements[0]*=u,Wn.elements[1]*=u,Wn.elements[2]*=u,Wn.elements[4]*=c,Wn.elements[5]*=c,Wn.elements[6]*=c,Wn.elements[8]*=d,Wn.elements[9]*=d,Wn.elements[10]*=d,n.setFromRotationMatrix(Wn),i.x=o,i.y=a,i.z=l,this}makePerspective(e,n,i,r,s,o,a=hi,l=!1){const u=this.elements,c=2*s/(n-e),d=2*s/(i-r),f=(n+e)/(n-e),p=(i+r)/(i-r);let m,_;if(l)m=s/(o-s),_=o*s/(o-s);else if(a===hi)m=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(a===fa)m=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return u[0]=c,u[4]=0,u[8]=f,u[12]=0,u[1]=0,u[5]=d,u[9]=p,u[13]=0,u[2]=0,u[6]=0,u[10]=m,u[14]=_,u[3]=0,u[7]=0,u[11]=-1,u[15]=0,this}makeOrthographic(e,n,i,r,s,o,a=hi,l=!1){const u=this.elements,c=2/(n-e),d=2/(i-r),f=-(n+e)/(n-e),p=-(i+r)/(i-r);let m,_;if(l)m=1/(o-s),_=o/(o-s);else if(a===hi)m=-2/(o-s),_=-(o+s)/(o-s);else if(a===fa)m=-1/(o-s),_=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return u[0]=c,u[4]=0,u[8]=0,u[12]=f,u[1]=0,u[5]=d,u[9]=0,u[13]=p,u[2]=0,u[6]=0,u[10]=m,u[14]=_,u[3]=0,u[7]=0,u[11]=0,u[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}};xu.prototype.isMatrix4=!0;let Et=xu;const ls=new B,Wn=new Et,DE=new B(0,0,0),UE=new B(1,1,1),$i=new B,ja=new B,Mn=new B,Em=new Et,Tm=new io;class yr{constructor(e=0,n=0,i=0,r=yr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],u=r[5],c=r[9],d=r[2],f=r[6],p=r[10];switch(n){case"XYZ":this._y=Math.asin(Je(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-c,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,u),this._z=0);break;case"YXZ":this._x=Math.asin(-Je(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,u)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(Je(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-o,u)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Je(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,u));break;case"YZX":this._z=Math.asin(Je(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-c,u),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Je(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,u),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-c,p),this._y=0);break;default:ze("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return Em.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Em,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return Tm.setFromEuler(this),this.setFromQuaternion(Tm,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}yr.DEFAULT_ORDER="XYZ";class lS{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let FE=0;const bm=new B,us=new io,Ti=new Et,$a=new B,go=new B,OE=new B,kE=new io,wm=new B(1,0,0),xm=new B(0,1,0),Am=new B(0,0,1),Cm={type:"added"},BE={type:"removed"},cs={type:"childadded",child:null},Ic={type:"childremoved",child:null};class Xt extends ts{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:FE++}),this.uuid=no(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Xt.DEFAULT_UP.clone();const e=new B,n=new yr,i=new io,r=new B(1,1,1);function s(){i.setFromEuler(n,!1)}function o(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Et},normalMatrix:{value:new je}}),this.matrix=new Et,this.matrixWorld=new Et,this.matrixAutoUpdate=Xt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Xt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new lS,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return us.setFromAxisAngle(e,n),this.quaternion.multiply(us),this}rotateOnWorldAxis(e,n){return us.setFromAxisAngle(e,n),this.quaternion.premultiply(us),this}rotateX(e){return this.rotateOnAxis(wm,e)}rotateY(e){return this.rotateOnAxis(xm,e)}rotateZ(e){return this.rotateOnAxis(Am,e)}translateOnAxis(e,n){return bm.copy(e).applyQuaternion(this.quaternion),this.position.add(bm.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(wm,e)}translateY(e){return this.translateOnAxis(xm,e)}translateZ(e){return this.translateOnAxis(Am,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ti.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?$a.copy(e):$a.set(e,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),go.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ti.lookAt(go,$a,this.up):Ti.lookAt($a,go,this.up),this.quaternion.setFromRotationMatrix(Ti),r&&(Ti.extractRotation(r.matrixWorld),us.setFromRotationMatrix(Ti),this.quaternion.premultiply(us.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(ot("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Cm),cs.child=e,this.dispatchEvent(cs),cs.child=null):ot("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(BE),Ic.child=e,this.dispatchEvent(Ic),Ic.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ti.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ti.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ti),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Cm),cs.child=e,this.dispatchEvent(cs),cs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,n);if(o!==void 0)return o}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(go,e,OE),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(go,kE,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const n=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=n-s[0]*n-s[4]*i-s[8]*r,s[13]+=i-s[1]*n-s[5]*i-s[9]*r,s[14]+=r-s[2]*n-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].updateMatrixWorld(e)}updateWorldMatrix(e,n){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let u=0,c=l.length;u<c;u++){const d=l[u];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,u=this.material.length;l<u;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(n){const a=o(e.geometries),l=o(e.materials),u=o(e.textures),c=o(e.images),d=o(e.shapes),f=o(e.skeletons),p=o(e.animations),m=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),u.length>0&&(i.textures=u),c.length>0&&(i.images=c),d.length>0&&(i.shapes=d),f.length>0&&(i.skeletons=f),p.length>0&&(i.animations=p),m.length>0&&(i.nodes=m)}return i.object=r,i;function o(a){const l=[];for(const u in a){const c=a[u];delete c.metadata,l.push(c)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Xt.DEFAULT_UP=new B(0,1,0);Xt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Xt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Po extends Xt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const zE={type:"move"};class Dc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Po,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Po,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Po,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,u=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(u&&e.hand){o=!0;for(const _ of e.hand.values()){const g=n.getJointPose(_,i),h=this._getHandJoint(u,_);g!==null&&(h.matrix.fromArray(g.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=g.radius),h.visible=g!==null}const c=u.joints["index-finger-tip"],d=u.joints["thumb-tip"],f=c.position.distanceTo(d.position),p=.02,m=.005;u.inputState.pinching&&f>p+m?(u.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!u.inputState.pinching&&f<=p-m&&(u.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));a!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(zE)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),u!==null&&(u.visible=o!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new Po;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}const uS={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Yi={h:0,s:0,l:0},Ya={h:0,s:0,l:0};function Uc(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class Ke{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=Dn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,nt.colorSpaceToWorking(this,n),this}setRGB(e,n,i,r=nt.workingColorSpace){return this.r=e,this.g=n,this.b=i,nt.colorSpaceToWorking(this,r),this}setHSL(e,n,i,r=nt.workingColorSpace){if(e=AE(e,1),n=Je(n,0,1),i=Je(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,o=2*i-s;this.r=Uc(o,s,e+1/3),this.g=Uc(o,s,e),this.b=Uc(o,s,e-1/3)}return nt.colorSpaceToWorking(this,r),this}setStyle(e,n=Dn){function i(s){s!==void 0&&parseFloat(s)<1&&ze("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:ze("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(o===6)return this.setHex(parseInt(s,16),n);ze("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=Dn){const i=uS[e.toLowerCase()];return i!==void 0?this.setHex(i,n):ze("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ui(e.r),this.g=Ui(e.g),this.b=Ui(e.b),this}copyLinearToSRGB(e){return this.r=Bs(e.r),this.g=Bs(e.g),this.b=Bs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Dn){return nt.workingToColorSpace(en.copy(this),e),Math.round(Je(en.r*255,0,255))*65536+Math.round(Je(en.g*255,0,255))*256+Math.round(Je(en.b*255,0,255))}getHexString(e=Dn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=nt.workingColorSpace){nt.workingToColorSpace(en.copy(this),n);const i=en.r,r=en.g,s=en.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,u;const c=(a+o)/2;if(a===o)l=0,u=0;else{const d=o-a;switch(u=c<=.5?d/(o+a):d/(2-o-a),o){case i:l=(r-s)/d+(r<s?6:0);break;case r:l=(s-i)/d+2;break;case s:l=(i-r)/d+4;break}l/=6}return e.h=l,e.s=u,e.l=c,e}getRGB(e,n=nt.workingColorSpace){return nt.workingToColorSpace(en.copy(this),n),e.r=en.r,e.g=en.g,e.b=en.b,e}getStyle(e=Dn){nt.workingToColorSpace(en.copy(this),e);const n=en.r,i=en.g,r=en.b;return e!==Dn?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(Yi),this.setHSL(Yi.h+e,Yi.s+n,Yi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(Yi),e.getHSL(Ya);const i=Cc(Yi.h,Ya.h,n),r=Cc(Yi.s,Ya.s,n),s=Cc(Yi.l,Ya.l,n);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const en=new Ke;Ke.NAMES=uS;class gp{constructor(e,n=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ke(e),this.density=n}clone(){return new gp(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class GE extends Xt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new yr,this.environmentIntensity=1,this.environmentRotation=new yr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}const Xn=new B,bi=new B,Fc=new B,wi=new B,fs=new B,ds=new B,Rm=new B,Oc=new B,kc=new B,Bc=new B,zc=new Rt,Gc=new Rt,Vc=new Rt;class Zn{constructor(e=new B,n=new B,i=new B){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),Xn.subVectors(e,n),r.cross(Xn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,n,i,r,s){Xn.subVectors(r,n),bi.subVectors(i,n),Fc.subVectors(e,n);const o=Xn.dot(Xn),a=Xn.dot(bi),l=Xn.dot(Fc),u=bi.dot(bi),c=bi.dot(Fc),d=o*u-a*a;if(d===0)return s.set(0,0,0),null;const f=1/d,p=(u*l-a*c)*f,m=(o*c-a*l)*f;return s.set(1-p-m,m,p)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,wi)===null?!1:wi.x>=0&&wi.y>=0&&wi.x+wi.y<=1}static getInterpolation(e,n,i,r,s,o,a,l){return this.getBarycoord(e,n,i,r,wi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,wi.x),l.addScaledVector(o,wi.y),l.addScaledVector(a,wi.z),l)}static getInterpolatedAttribute(e,n,i,r,s,o){return zc.setScalar(0),Gc.setScalar(0),Vc.setScalar(0),zc.fromBufferAttribute(e,n),Gc.fromBufferAttribute(e,i),Vc.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(zc,s.x),o.addScaledVector(Gc,s.y),o.addScaledVector(Vc,s.z),o}static isFrontFacing(e,n,i,r){return Xn.subVectors(i,n),bi.subVectors(e,n),Xn.cross(bi).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Xn.subVectors(this.c,this.b),bi.subVectors(this.a,this.b),Xn.cross(bi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Zn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return Zn.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,r,s){return Zn.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}containsPoint(e){return Zn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Zn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,r=this.b,s=this.c;let o,a;fs.subVectors(r,i),ds.subVectors(s,i),Oc.subVectors(e,i);const l=fs.dot(Oc),u=ds.dot(Oc);if(l<=0&&u<=0)return n.copy(i);kc.subVectors(e,r);const c=fs.dot(kc),d=ds.dot(kc);if(c>=0&&d<=c)return n.copy(r);const f=l*d-c*u;if(f<=0&&l>=0&&c<=0)return o=l/(l-c),n.copy(i).addScaledVector(fs,o);Bc.subVectors(e,s);const p=fs.dot(Bc),m=ds.dot(Bc);if(m>=0&&p<=m)return n.copy(s);const _=p*u-l*m;if(_<=0&&u>=0&&m<=0)return a=u/(u-m),n.copy(i).addScaledVector(ds,a);const g=c*m-p*d;if(g<=0&&d-c>=0&&p-m>=0)return Rm.subVectors(s,r),a=(d-c)/(d-c+(p-m)),n.copy(r).addScaledVector(Rm,a);const h=1/(g+_+f);return o=_*h,a=f*h,n.copy(i).addScaledVector(fs,o).addScaledVector(ds,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class ya{constructor(e=new B(1/0,1/0,1/0),n=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(jn.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(jn.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=jn.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,jn):jn.fromBufferAttribute(s,o),jn.applyMatrix4(e.matrixWorld),this.expandByPoint(jn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),qa.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),qa.copy(i.boundingBox)),qa.applyMatrix4(e.matrixWorld),this.union(qa)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,jn),jn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(vo),Ka.subVectors(this.max,vo),hs.subVectors(e.a,vo),ps.subVectors(e.b,vo),ms.subVectors(e.c,vo),qi.subVectors(ps,hs),Ki.subVectors(ms,ps),wr.subVectors(hs,ms);let n=[0,-qi.z,qi.y,0,-Ki.z,Ki.y,0,-wr.z,wr.y,qi.z,0,-qi.x,Ki.z,0,-Ki.x,wr.z,0,-wr.x,-qi.y,qi.x,0,-Ki.y,Ki.x,0,-wr.y,wr.x,0];return!Hc(n,hs,ps,ms,Ka)||(n=[1,0,0,0,1,0,0,0,1],!Hc(n,hs,ps,ms,Ka))?!1:(Za.crossVectors(qi,Ki),n=[Za.x,Za.y,Za.z],Hc(n,hs,ps,ms,Ka))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,jn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(jn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(xi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),xi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),xi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),xi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),xi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),xi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),xi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),xi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(xi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const xi=[new B,new B,new B,new B,new B,new B,new B,new B],jn=new B,qa=new ya,hs=new B,ps=new B,ms=new B,qi=new B,Ki=new B,wr=new B,vo=new B,Ka=new B,Za=new B,xr=new B;function Hc(t,e,n,i,r){for(let s=0,o=t.length-3;s<=o;s+=3){xr.fromArray(t,s);const a=r.x*Math.abs(xr.x)+r.y*Math.abs(xr.y)+r.z*Math.abs(xr.z),l=e.dot(xr),u=n.dot(xr),c=i.dot(xr);if(Math.max(-Math.max(l,u,c),Math.min(l,u,c))>a)return!1}return!0}const Ut=new B,Ja=new Le;let VE=0;class Bn extends ts{constructor(e,n,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:VE++}),this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=mm,this.updateRanges=[],this.gpuType=di,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)Ja.fromBufferAttribute(this,n),Ja.applyMatrix3(e),this.setXY(n,Ja.x,Ja.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Ut.fromBufferAttribute(this,n),Ut.applyMatrix3(e),this.setXYZ(n,Ut.x,Ut.y,Ut.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)Ut.fromBufferAttribute(this,n),Ut.applyMatrix4(e),this.setXYZ(n,Ut.x,Ut.y,Ut.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)Ut.fromBufferAttribute(this,n),Ut.applyNormalMatrix(e),this.setXYZ(n,Ut.x,Ut.y,Ut.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)Ut.fromBufferAttribute(this,n),Ut.transformDirection(e),this.setXYZ(n,Ut.x,Ut.y,Ut.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=mo(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=dn(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=mo(n,this.array)),n}setX(e,n){return this.normalized&&(n=dn(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=mo(n,this.array)),n}setY(e,n){return this.normalized&&(n=dn(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=mo(n,this.array)),n}setZ(e,n){return this.normalized&&(n=dn(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=mo(n,this.array)),n}setW(e,n){return this.normalized&&(n=dn(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=dn(n,this.array),i=dn(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=dn(n,this.array),i=dn(i,this.array),r=dn(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e*=this.itemSize,this.normalized&&(n=dn(n,this.array),i=dn(i,this.array),r=dn(r,this.array),s=dn(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==mm&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class cS extends Bn{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class fS extends Bn{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class Bt extends Bn{constructor(e,n,i){super(new Float32Array(e),n,i)}}const HE=new ya,_o=new B,Wc=new B;class Ma{constructor(e=new B,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):HE.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;_o.subVectors(e,this.center);const n=_o.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(_o,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Wc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(_o.copy(e.center).add(Wc)),this.expandByPoint(_o.copy(e.center).sub(Wc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let WE=0;const In=new Et,Xc=new Xt,gs=new B,En=new ya,So=new ya,Vt=new B;class on extends ts{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:WE++}),this.uuid=no(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(TE(e)?fS:cS)(e,1):this.index=e,this}setIndirect(e,n=0){return this.indirect=e,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new je().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return In.makeRotationFromQuaternion(e),this.applyMatrix4(In),this}rotateX(e){return In.makeRotationX(e),this.applyMatrix4(In),this}rotateY(e){return In.makeRotationY(e),this.applyMatrix4(In),this}rotateZ(e){return In.makeRotationZ(e),this.applyMatrix4(In),this}translate(e,n,i){return In.makeTranslation(e,n,i),this.applyMatrix4(In),this}scale(e,n,i){return In.makeScale(e,n,i),this.applyMatrix4(In),this}lookAt(e){return Xc.lookAt(e),Xc.updateMatrix(),this.applyMatrix4(Xc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(gs).negate(),this.translate(gs.x,gs.y,gs.z),this}setFromPoints(e){const n=this.getAttribute("position");if(n===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Bt(i,3))}else{const i=Math.min(e.length,n.count);for(let r=0;r<i;r++){const s=e[r];n.setXYZ(r,s.x,s.y,s.z||0)}e.length>n.count&&ze("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ya);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ot("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];En.setFromBufferAttribute(s),this.morphTargetsRelative?(Vt.addVectors(this.boundingBox.min,En.min),this.boundingBox.expandByPoint(Vt),Vt.addVectors(this.boundingBox.max,En.max),this.boundingBox.expandByPoint(Vt)):(this.boundingBox.expandByPoint(En.min),this.boundingBox.expandByPoint(En.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&ot('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ma);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ot("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new B,1/0);return}if(e){const i=this.boundingSphere.center;if(En.setFromBufferAttribute(e),n)for(let s=0,o=n.length;s<o;s++){const a=n[s];So.setFromBufferAttribute(a),this.morphTargetsRelative?(Vt.addVectors(En.min,So.min),En.expandByPoint(Vt),Vt.addVectors(En.max,So.max),En.expandByPoint(Vt)):(En.expandByPoint(So.min),En.expandByPoint(So.max))}En.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)Vt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Vt));if(n)for(let s=0,o=n.length;s<o;s++){const a=n[s],l=this.morphTargetsRelative;for(let u=0,c=a.count;u<c;u++)Vt.fromBufferAttribute(a,u),l&&(gs.fromBufferAttribute(e,u),Vt.add(gs)),r=Math.max(r,i.distanceToSquared(Vt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&ot('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){ot("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,r=n.normal,s=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Bn(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let y=0;y<i.count;y++)a[y]=new B,l[y]=new B;const u=new B,c=new B,d=new B,f=new Le,p=new Le,m=new Le,_=new B,g=new B;function h(y,C,R){u.fromBufferAttribute(i,y),c.fromBufferAttribute(i,C),d.fromBufferAttribute(i,R),f.fromBufferAttribute(s,y),p.fromBufferAttribute(s,C),m.fromBufferAttribute(s,R),c.sub(u),d.sub(u),p.sub(f),m.sub(f);const N=1/(p.x*m.y-m.x*p.y);isFinite(N)&&(_.copy(c).multiplyScalar(m.y).addScaledVector(d,-p.y).multiplyScalar(N),g.copy(d).multiplyScalar(p.x).addScaledVector(c,-m.x).multiplyScalar(N),a[y].add(_),a[C].add(_),a[R].add(_),l[y].add(g),l[C].add(g),l[R].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let y=0,C=v.length;y<C;++y){const R=v[y],N=R.start,I=R.count;for(let F=N,z=N+I;F<z;F+=3)h(e.getX(F+0),e.getX(F+1),e.getX(F+2))}const S=new B,M=new B,T=new B,b=new B;function w(y){T.fromBufferAttribute(r,y),b.copy(T);const C=a[y];S.copy(C),S.sub(T.multiplyScalar(T.dot(C))).normalize(),M.crossVectors(b,C);const N=M.dot(l[y])<0?-1:1;o.setXYZW(y,S.x,S.y,S.z,N)}for(let y=0,C=v.length;y<C;++y){const R=v[y],N=R.start,I=R.count;for(let F=N,z=N+I;F<z;F+=3)w(e.getX(F+0)),w(e.getX(F+1)),w(e.getX(F+2))}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Bn(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let f=0,p=i.count;f<p;f++)i.setXYZ(f,0,0,0);const r=new B,s=new B,o=new B,a=new B,l=new B,u=new B,c=new B,d=new B;if(e)for(let f=0,p=e.count;f<p;f+=3){const m=e.getX(f+0),_=e.getX(f+1),g=e.getX(f+2);r.fromBufferAttribute(n,m),s.fromBufferAttribute(n,_),o.fromBufferAttribute(n,g),c.subVectors(o,s),d.subVectors(r,s),c.cross(d),a.fromBufferAttribute(i,m),l.fromBufferAttribute(i,_),u.fromBufferAttribute(i,g),a.add(c),l.add(c),u.add(c),i.setXYZ(m,a.x,a.y,a.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(g,u.x,u.y,u.z)}else for(let f=0,p=n.count;f<p;f+=3)r.fromBufferAttribute(n,f+0),s.fromBufferAttribute(n,f+1),o.fromBufferAttribute(n,f+2),c.subVectors(o,s),d.subVectors(r,s),c.cross(d),i.setXYZ(f+0,c.x,c.y,c.z),i.setXYZ(f+1,c.x,c.y,c.z),i.setXYZ(f+2,c.x,c.y,c.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)Vt.fromBufferAttribute(e,n),Vt.normalize(),e.setXYZ(n,Vt.x,Vt.y,Vt.z)}toNonIndexed(){function e(a,l){const u=a.array,c=a.itemSize,d=a.normalized,f=new u.constructor(l.length*c);let p=0,m=0;for(let _=0,g=l.length;_<g;_++){a.isInterleavedBufferAttribute?p=l[_]*a.data.stride+a.offset:p=l[_]*c;for(let h=0;h<c;h++)f[m++]=u[p++]}return new Bn(f,c,d)}if(this.index===null)return ze("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new on,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],u=e(l,i);n.setAttribute(a,u)}const s=this.morphAttributes;for(const a in s){const l=[],u=s[a];for(let c=0,d=u.length;c<d;c++){const f=u[c],p=e(f,i);l.push(p)}n.morphAttributes[a]=l}n.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const u=o[a];n.addGroup(u.start,u.count,u.materialIndex)}return n}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const u in l)l[u]!==void 0&&(e[u]=l[u]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const u=i[l];e.data.attributes[l]=u.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const u=this.morphAttributes[l],c=[];for(let d=0,f=u.length;d<f;d++){const p=u[d];c.push(p.toJSON(e.data))}c.length>0&&(r[l]=c,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const u in r){const c=r[u];this.setAttribute(u,c.clone(n))}const s=e.morphAttributes;for(const u in s){const c=[],d=s[u];for(let f=0,p=d.length;f<p;f++)c.push(d[f].clone(n));this.morphAttributes[u]=c}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let u=0,c=o.length;u<c;u++){const d=o[u];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let XE=0;class ns extends ts{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:XE++}),this.uuid=no(),this.name="",this.type="Material",this.blending=Wr,this.side=_i,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=od,this.blendDst=ad,this.blendEquation=Dr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ke(0,0,0),this.blendAlpha=0,this.depthFunc=Ys,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=pm,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=os,this.stencilZFail=os,this.stencilZPass=os,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){ze(`Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){ze(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Wr&&(i.blending=this.blending),this.side!==_i&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==od&&(i.blendSrc=this.blendSrc),this.blendDst!==ad&&(i.blendDst=this.blendDst),this.blendEquation!==Dr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Ys&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==pm&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==os&&(i.stencilFail=this.stencilFail),this.stencilZFail!==os&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==os&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(n){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Ai=new B,jc=new B,Qa=new B,Zi=new B,$c=new B,el=new B,Yc=new B;class vp{constructor(e=new B,n=new B(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ai)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=Ai.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(Ai.copy(this.origin).addScaledVector(this.direction,n),Ai.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){jc.copy(e).add(n).multiplyScalar(.5),Qa.copy(n).sub(e).normalize(),Zi.copy(this.origin).sub(jc);const s=e.distanceTo(n)*.5,o=-this.direction.dot(Qa),a=Zi.dot(this.direction),l=-Zi.dot(Qa),u=Zi.lengthSq(),c=Math.abs(1-o*o);let d,f,p,m;if(c>0)if(d=o*l-a,f=o*a-l,m=s*c,d>=0)if(f>=-m)if(f<=m){const _=1/c;d*=_,f*=_,p=d*(d+o*f+2*a)+f*(o*d+f+2*l)+u}else f=s,d=Math.max(0,-(o*f+a)),p=-d*d+f*(f+2*l)+u;else f=-s,d=Math.max(0,-(o*f+a)),p=-d*d+f*(f+2*l)+u;else f<=-m?(d=Math.max(0,-(-o*s+a)),f=d>0?-s:Math.min(Math.max(-s,-l),s),p=-d*d+f*(f+2*l)+u):f<=m?(d=0,f=Math.min(Math.max(-s,-l),s),p=f*(f+2*l)+u):(d=Math.max(0,-(o*s+a)),f=d>0?s:Math.min(Math.max(-s,-l),s),p=-d*d+f*(f+2*l)+u);else f=o>0?-s:s,d=Math.max(0,-(o*f+a)),p=-d*d+f*(f+2*l)+u;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(jc).addScaledVector(Qa,f),p}intersectSphere(e,n){Ai.subVectors(e.center,this.origin);const i=Ai.dot(this.direction),r=Ai.dot(Ai)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,n):this.at(a,n)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,s,o,a,l;const u=1/this.direction.x,c=1/this.direction.y,d=1/this.direction.z,f=this.origin;return u>=0?(i=(e.min.x-f.x)*u,r=(e.max.x-f.x)*u):(i=(e.max.x-f.x)*u,r=(e.min.x-f.x)*u),c>=0?(s=(e.min.y-f.y)*c,o=(e.max.y-f.y)*c):(s=(e.max.y-f.y)*c,o=(e.min.y-f.y)*c),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),d>=0?(a=(e.min.z-f.z)*d,l=(e.max.z-f.z)*d):(a=(e.max.z-f.z)*d,l=(e.min.z-f.z)*d),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,Ai)!==null}intersectTriangle(e,n,i,r,s){$c.subVectors(n,e),el.subVectors(i,e),Yc.crossVectors($c,el);let o=this.direction.dot(Yc),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Zi.subVectors(this.origin,e);const l=a*this.direction.dot(el.crossVectors(Zi,el));if(l<0)return null;const u=a*this.direction.dot($c.cross(Zi));if(u<0||l+u>o)return null;const c=-a*Zi.dot(Yc);return c<0?null:this.at(c/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Tu extends ns{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ke(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yr,this.combine=sp,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Pm=new Et,Ar=new vp,tl=new Ma,Nm=new B,nl=new B,il=new B,rl=new B,qc=new B,sl=new B,Lm=new B,ol=new B;class It extends Xt{constructor(e=new on,n=new Tu){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;n.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){sl.set(0,0,0);for(let l=0,u=s.length;l<u;l++){const c=a[l],d=s[l];c!==0&&(qc.fromBufferAttribute(d,e),o?sl.addScaledVector(qc,c):sl.addScaledVector(qc.sub(n),c))}n.add(sl)}return n}raycast(e,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),tl.copy(i.boundingSphere),tl.applyMatrix4(s),Ar.copy(e.ray).recast(e.near),!(tl.containsPoint(Ar.origin)===!1&&(Ar.intersectSphere(tl,Nm)===null||Ar.origin.distanceToSquared(Nm)>(e.far-e.near)**2))&&(Pm.copy(s).invert(),Ar.copy(e.ray).applyMatrix4(Pm),!(i.boundingBox!==null&&Ar.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,Ar)))}_computeIntersections(e,n,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,u=s.attributes.uv,c=s.attributes.uv1,d=s.attributes.normal,f=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,_=f.length;m<_;m++){const g=f[m],h=o[g.materialIndex],v=Math.max(g.start,p.start),S=Math.min(a.count,Math.min(g.start+g.count,p.start+p.count));for(let M=v,T=S;M<T;M+=3){const b=a.getX(M),w=a.getX(M+1),y=a.getX(M+2);r=al(this,h,e,i,u,c,d,b,w,y),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=g.materialIndex,n.push(r))}}else{const m=Math.max(0,p.start),_=Math.min(a.count,p.start+p.count);for(let g=m,h=_;g<h;g+=3){const v=a.getX(g),S=a.getX(g+1),M=a.getX(g+2);r=al(this,o,e,i,u,c,d,v,S,M),r&&(r.faceIndex=Math.floor(g/3),n.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let m=0,_=f.length;m<_;m++){const g=f[m],h=o[g.materialIndex],v=Math.max(g.start,p.start),S=Math.min(l.count,Math.min(g.start+g.count,p.start+p.count));for(let M=v,T=S;M<T;M+=3){const b=M,w=M+1,y=M+2;r=al(this,h,e,i,u,c,d,b,w,y),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=g.materialIndex,n.push(r))}}else{const m=Math.max(0,p.start),_=Math.min(l.count,p.start+p.count);for(let g=m,h=_;g<h;g+=3){const v=g,S=g+1,M=g+2;r=al(this,o,e,i,u,c,d,v,S,M),r&&(r.faceIndex=Math.floor(g/3),n.push(r))}}}}function jE(t,e,n,i,r,s,o,a){let l;if(e.side===Sn?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===_i,a),l===null)return null;ol.copy(a),ol.applyMatrix4(t.matrixWorld);const u=n.ray.origin.distanceTo(ol);return u<n.near||u>n.far?null:{distance:u,point:ol.clone(),object:t}}function al(t,e,n,i,r,s,o,a,l,u){t.getVertexPosition(a,nl),t.getVertexPosition(l,il),t.getVertexPosition(u,rl);const c=jE(t,e,n,i,nl,il,rl,Lm);if(c){const d=new B;Zn.getBarycoord(Lm,nl,il,rl,d),r&&(c.uv=Zn.getInterpolatedAttribute(r,a,l,u,d,new Le)),s&&(c.uv1=Zn.getInterpolatedAttribute(s,a,l,u,d,new Le)),o&&(c.normal=Zn.getInterpolatedAttribute(o,a,l,u,d,new B),c.normal.dot(i.direction)>0&&c.normal.multiplyScalar(-1));const f={a,b:l,c:u,normal:new B,materialIndex:0};Zn.getNormal(nl,il,rl,f.normal),c.face=f,c.barycoord=d}return c}class $E extends rn{constructor(e=null,n=1,i=1,r,s,o,a,l,u=$t,c=$t,d,f){super(null,o,a,l,u,c,r,s,d,f),this.isDataTexture=!0,this.image={data:e,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Kc=new B,YE=new B,qE=new je;class Lr{constructor(e=new B(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const r=Kc.subVectors(i,n).cross(YE.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n,i=!0){const r=e.delta(Kc),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const o=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(o<0||o>1)?null:n.copy(e.start).addScaledVector(r,o)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||qE.getNormalMatrix(e),r=this.coplanarPoint(Kc).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Cr=new Ma,KE=new Le(.5,.5),ll=new B;class _p{constructor(e=new Lr,n=new Lr,i=new Lr,r=new Lr,s=new Lr,o=new Lr){this.planes=[e,n,i,r,s,o]}set(e,n,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(n),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=hi,i=!1){const r=this.planes,s=e.elements,o=s[0],a=s[1],l=s[2],u=s[3],c=s[4],d=s[5],f=s[6],p=s[7],m=s[8],_=s[9],g=s[10],h=s[11],v=s[12],S=s[13],M=s[14],T=s[15];if(r[0].setComponents(u-o,p-c,h-m,T-v).normalize(),r[1].setComponents(u+o,p+c,h+m,T+v).normalize(),r[2].setComponents(u+a,p+d,h+_,T+S).normalize(),r[3].setComponents(u-a,p-d,h-_,T-S).normalize(),i)r[4].setComponents(l,f,g,M).normalize(),r[5].setComponents(u-l,p-f,h-g,T-M).normalize();else if(r[4].setComponents(u-l,p-f,h-g,T-M).normalize(),n===hi)r[5].setComponents(u+l,p+f,h+g,T+M).normalize();else if(n===fa)r[5].setComponents(l,f,g,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Cr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Cr.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Cr)}intersectsSprite(e){Cr.center.set(0,0,0);const n=KE.distanceTo(e.center);return Cr.radius=.7071067811865476+n,Cr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Cr)}intersectsSphere(e){const n=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(ll.x=r.normal.x>0?e.max.x:e.min.x,ll.y=r.normal.y>0?e.max.y:e.min.y,ll.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(ll)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class dS extends ns{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ke(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const bu=new B,wu=new B,Im=new Et,yo=new vp,ul=new Ma,Zc=new B,Dm=new B;class ZE extends Xt{constructor(e=new on,n=new dS){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[0];for(let r=1,s=n.count;r<s;r++)bu.fromBufferAttribute(n,r-1),wu.fromBufferAttribute(n,r),i[r]=i[r-1],i[r]+=bu.distanceTo(wu);e.setAttribute("lineDistance",new Bt(i,1))}else ze("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,n){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ul.copy(i.boundingSphere),ul.applyMatrix4(r),ul.radius+=s,e.ray.intersectsSphere(ul)===!1)return;Im.copy(r).invert(),yo.copy(e.ray).applyMatrix4(Im);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,u=this.isLineSegments?2:1,c=i.index,f=i.attributes.position;if(c!==null){const p=Math.max(0,o.start),m=Math.min(c.count,o.start+o.count);for(let _=p,g=m-1;_<g;_+=u){const h=c.getX(_),v=c.getX(_+1),S=cl(this,e,yo,l,h,v,_);S&&n.push(S)}if(this.isLineLoop){const _=c.getX(m-1),g=c.getX(p),h=cl(this,e,yo,l,_,g,m-1);h&&n.push(h)}}else{const p=Math.max(0,o.start),m=Math.min(f.count,o.start+o.count);for(let _=p,g=m-1;_<g;_+=u){const h=cl(this,e,yo,l,_,_+1,_);h&&n.push(h)}if(this.isLineLoop){const _=cl(this,e,yo,l,m-1,p,m-1);_&&n.push(_)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function cl(t,e,n,i,r,s,o){const a=t.geometry.attributes.position;if(bu.fromBufferAttribute(a,r),wu.fromBufferAttribute(a,s),n.distanceSqToSegment(bu,wu,Zc,Dm)>i)return;Zc.applyMatrix4(t.matrixWorld);const u=e.ray.origin.distanceTo(Zc);if(!(u<e.near||u>e.far))return{distance:u,point:Dm.clone().applyMatrix4(t.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:t}}class hS extends ns{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ke(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Um=new Et,Kd=new vp,fl=new Ma,dl=new B;class JE extends Xt{constructor(e=new on,n=new hS){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,n){const i=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),fl.copy(i.boundingSphere),fl.applyMatrix4(r),fl.radius+=s,e.ray.intersectsSphere(fl)===!1)return;Um.copy(r).invert(),Kd.copy(e.ray).applyMatrix4(Um);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,u=i.index,d=i.attributes.position;if(u!==null){const f=Math.max(0,o.start),p=Math.min(u.count,o.start+o.count);for(let m=f,_=p;m<_;m++){const g=u.getX(m);dl.fromBufferAttribute(d,g),Fm(dl,g,l,r,e,n,this)}}else{const f=Math.max(0,o.start),p=Math.min(d.count,o.start+o.count);for(let m=f,_=p;m<_;m++)dl.fromBufferAttribute(d,m),Fm(dl,m,l,r,e,n,this)}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Fm(t,e,n,i,r,s,o){const a=Kd.distanceSqToPoint(t);if(a<n){const l=new B;Kd.closestPointToPoint(t,l),l.applyMatrix4(i);const u=r.ray.origin.distanceTo(l);if(u<r.near||u>r.far)return;s.push({distance:u,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class pS extends rn{constructor(e=[],n=Kr,i,r,s,o,a,l,u,c){super(e,n,i,r,s,o,a,l,u,c),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Ea extends rn{constructor(e,n,i,r,s,o,a,l,u){super(e,n,i,r,s,o,a,l,u),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ks extends rn{constructor(e,n,i=Si,r,s,o,a=$t,l=$t,u,c=Gi,d=1){if(c!==Gi&&c!==Gr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:n,depth:d};super(f,r,s,o,a,l,c,i,u),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new mp(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}class QE extends Ks{constructor(e,n=Si,i=Kr,r,s,o=$t,a=$t,l,u=Gi){const c={width:e,height:e,depth:1},d=[c,c,c,c,c,c];super(e,e,n,i,r,s,o,a,l,u),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class mS extends rn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Ta extends on{constructor(e=1,n=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],u=[],c=[],d=[];let f=0,p=0;m("z","y","x",-1,-1,i,n,e,o,s,0),m("z","y","x",1,-1,i,n,-e,o,s,1),m("x","z","y",1,1,e,i,n,r,o,2),m("x","z","y",1,-1,e,i,-n,r,o,3),m("x","y","z",1,-1,e,n,i,r,s,4),m("x","y","z",-1,-1,e,n,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new Bt(u,3)),this.setAttribute("normal",new Bt(c,3)),this.setAttribute("uv",new Bt(d,2));function m(_,g,h,v,S,M,T,b,w,y,C){const R=M/w,N=T/y,I=M/2,F=T/2,z=b/2,D=w+1,G=y+1;let H=0,U=0;const X=new B;for(let J=0;J<G;J++){const se=J*N-F;for(let ye=0;ye<D;ye++){const Ge=ye*R-I;X[_]=Ge*v,X[g]=se*S,X[h]=z,u.push(X.x,X.y,X.z),X[_]=0,X[g]=0,X[h]=b>0?1:-1,c.push(X.x,X.y,X.z),d.push(ye/w),d.push(1-J/y),H+=1}}for(let J=0;J<y;J++)for(let se=0;se<w;se++){const ye=f+se+D*J,Ge=f+se+D*(J+1),He=f+(se+1)+D*(J+1),Ue=f+(se+1)+D*J;l.push(ye,Ge,Ue),l.push(Ge,He,Ue),U+=6}a.addGroup(p,U,C),p+=U,f+=H}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ta(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class zs extends on{constructor(e=1,n=1,i=1,r=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:n,height:i,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const u=this;r=Math.floor(r),s=Math.floor(s);const c=[],d=[],f=[],p=[];let m=0;const _=[],g=i/2;let h=0;v(),o===!1&&(e>0&&S(!0),n>0&&S(!1)),this.setIndex(c),this.setAttribute("position",new Bt(d,3)),this.setAttribute("normal",new Bt(f,3)),this.setAttribute("uv",new Bt(p,2));function v(){const M=new B,T=new B;let b=0;const w=(n-e)/i;for(let y=0;y<=s;y++){const C=[],R=y/s,N=R*(n-e)+e;for(let I=0;I<=r;I++){const F=I/r,z=F*l+a,D=Math.sin(z),G=Math.cos(z);T.x=N*D,T.y=-R*i+g,T.z=N*G,d.push(T.x,T.y,T.z),M.set(D,w,G).normalize(),f.push(M.x,M.y,M.z),p.push(F,1-R),C.push(m++)}_.push(C)}for(let y=0;y<r;y++)for(let C=0;C<s;C++){const R=_[C][y],N=_[C+1][y],I=_[C+1][y+1],F=_[C][y+1];(e>0||C!==0)&&(c.push(R,N,F),b+=3),(n>0||C!==s-1)&&(c.push(N,I,F),b+=3)}u.addGroup(h,b,0),h+=b}function S(M){const T=m,b=new Le,w=new B;let y=0;const C=M===!0?e:n,R=M===!0?1:-1;for(let I=1;I<=r;I++)d.push(0,g*R,0),f.push(0,R,0),p.push(.5,.5),m++;const N=m;for(let I=0;I<=r;I++){const z=I/r*l+a,D=Math.cos(z),G=Math.sin(z);w.x=C*G,w.y=g*R,w.z=C*D,d.push(w.x,w.y,w.z),f.push(0,R,0),b.x=D*.5+.5,b.y=G*.5*R+.5,p.push(b.x,b.y),m++}for(let I=0;I<r;I++){const F=T+I,z=N+I;M===!0?c.push(z,z+1,F):c.push(z+1,z,F),y+=3}u.addGroup(h,y,M===!0?1:2),h+=y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new zs(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Vo extends zs{constructor(e=1,n=1,i=32,r=1,s=!1,o=0,a=Math.PI*2){super(0,e,n,i,r,s,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:n,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(e){return new Vo(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Mi{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){ze("Curve: .getPoint() not implemented.")}getPointAt(e,n){const i=this.getUtoTmapping(e);return this.getPoint(i,n)}getPoints(e=5){const n=[];for(let i=0;i<=e;i++)n.push(this.getPoint(i/e));return n}getSpacedPoints(e=5){const n=[];for(let i=0;i<=e;i++)n.push(this.getPointAt(i/e));return n}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const n=[];let i,r=this.getPoint(0),s=0;n.push(0);for(let o=1;o<=e;o++)i=this.getPoint(o/e),s+=i.distanceTo(r),n.push(s),r=i;return this.cacheArcLengths=n,n}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,n=null){const i=this.getLengths();let r=0;const s=i.length;let o;n?o=n:o=e*i[s-1];let a=0,l=s-1,u;for(;a<=l;)if(r=Math.floor(a+(l-a)/2),u=i[r]-o,u<0)a=r+1;else if(u>0)l=r-1;else{l=r;break}if(r=l,i[r]===o)return r/(s-1);const c=i[r],f=i[r+1]-c,p=(o-c)/f;return(r+p)/(s-1)}getTangent(e,n){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);const o=this.getPoint(r),a=this.getPoint(s),l=n||(o.isVector2?new Le:new B);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,n){const i=this.getUtoTmapping(e);return this.getTangent(i,n)}computeFrenetFrames(e,n=!1){const i=new B,r=[],s=[],o=[],a=new B,l=new Et;for(let p=0;p<=e;p++){const m=p/e;r[p]=this.getTangentAt(m,new B)}s[0]=new B,o[0]=new B;let u=Number.MAX_VALUE;const c=Math.abs(r[0].x),d=Math.abs(r[0].y),f=Math.abs(r[0].z);c<=u&&(u=c,i.set(1,0,0)),d<=u&&(u=d,i.set(0,1,0)),f<=u&&i.set(0,0,1),a.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let p=1;p<=e;p++){if(s[p]=s[p-1].clone(),o[p]=o[p-1].clone(),a.crossVectors(r[p-1],r[p]),a.length()>Number.EPSILON){a.normalize();const m=Math.acos(Je(r[p-1].dot(r[p]),-1,1));s[p].applyMatrix4(l.makeRotationAxis(a,m))}o[p].crossVectors(r[p],s[p])}if(n===!0){let p=Math.acos(Je(s[0].dot(s[e]),-1,1));p/=e,r[0].dot(a.crossVectors(s[0],s[e]))>0&&(p=-p);for(let m=1;m<=e;m++)s[m].applyMatrix4(l.makeRotationAxis(r[m],p*m)),o[m].crossVectors(r[m],s[m])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Sp extends Mi{constructor(e=0,n=0,i=1,r=1,s=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=n,this.xRadius=i,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,n=new Le){const i=n,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(o?s=0:s=r),this.aClockwise===!0&&!o&&(s===r?s=-r:s=s-r);const a=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(a),u=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const c=Math.cos(this.aRotation),d=Math.sin(this.aRotation),f=l-this.aX,p=u-this.aY;l=f*c-p*d+this.aX,u=f*d+p*c+this.aY}return i.set(l,u)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class eT extends Sp{constructor(e,n,i,r,s,o){super(e,n,i,i,r,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function yp(){let t=0,e=0,n=0,i=0;function r(s,o,a,l){t=s,e=a,n=-3*s+3*o-2*a-l,i=2*s-2*o+a+l}return{initCatmullRom:function(s,o,a,l,u){r(o,a,u*(a-s),u*(l-o))},initNonuniformCatmullRom:function(s,o,a,l,u,c,d){let f=(o-s)/u-(a-s)/(u+c)+(a-o)/c,p=(a-o)/c-(l-o)/(c+d)+(l-a)/d;f*=c,p*=c,r(o,a,f,p)},calc:function(s){const o=s*s,a=o*s;return t+e*s+n*o+i*a}}}const Om=new B,km=new B,Jc=new yp,Qc=new yp,ef=new yp;class tT extends Mi{constructor(e=[],n=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=n,this.curveType=i,this.tension=r}getPoint(e,n=new B){const i=n,r=this.points,s=r.length,o=(s-(this.closed?0:1))*e;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:l===0&&a===s-1&&(a=s-2,l=1);let u,c;this.closed||a>0?u=r[(a-1)%s]:(km.subVectors(r[0],r[1]).add(r[0]),u=km);const d=r[a%s],f=r[(a+1)%s];if(this.closed||a+2<s?c=r[(a+2)%s]:(Om.subVectors(r[s-1],r[s-2]).add(r[s-1]),c=Om),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let m=Math.pow(u.distanceToSquared(d),p),_=Math.pow(d.distanceToSquared(f),p),g=Math.pow(f.distanceToSquared(c),p);_<1e-4&&(_=1),m<1e-4&&(m=_),g<1e-4&&(g=_),Jc.initNonuniformCatmullRom(u.x,d.x,f.x,c.x,m,_,g),Qc.initNonuniformCatmullRom(u.y,d.y,f.y,c.y,m,_,g),ef.initNonuniformCatmullRom(u.z,d.z,f.z,c.z,m,_,g)}else this.curveType==="catmullrom"&&(Jc.initCatmullRom(u.x,d.x,f.x,c.x,this.tension),Qc.initCatmullRom(u.y,d.y,f.y,c.y,this.tension),ef.initCatmullRom(u.z,d.z,f.z,c.z,this.tension));return i.set(Jc.calc(l),Qc.calc(l),ef.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const r=e.points[n];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let n=0,i=this.points.length;n<i;n++){const r=this.points[n];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const r=e.points[n];this.points.push(new B().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Bm(t,e,n,i,r){const s=(i-e)*.5,o=(r-n)*.5,a=t*t,l=t*a;return(2*n-2*i+s+o)*l+(-3*n+3*i-2*s-o)*a+s*t+n}function nT(t,e){const n=1-t;return n*n*e}function iT(t,e){return 2*(1-t)*t*e}function rT(t,e){return t*t*e}function Ho(t,e,n,i){return nT(t,e)+iT(t,n)+rT(t,i)}function sT(t,e){const n=1-t;return n*n*n*e}function oT(t,e){const n=1-t;return 3*n*n*t*e}function aT(t,e){return 3*(1-t)*t*t*e}function lT(t,e){return t*t*t*e}function Wo(t,e,n,i,r){return sT(t,e)+oT(t,n)+aT(t,i)+lT(t,r)}class gS extends Mi{constructor(e=new Le,n=new Le,i=new Le,r=new Le){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=n,this.v2=i,this.v3=r}getPoint(e,n=new Le){const i=n,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(Wo(e,r.x,s.x,o.x,a.x),Wo(e,r.y,s.y,o.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class uT extends Mi{constructor(e=new B,n=new B,i=new B,r=new B){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=n,this.v2=i,this.v3=r}getPoint(e,n=new B){const i=n,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(Wo(e,r.x,s.x,o.x,a.x),Wo(e,r.y,s.y,o.y,a.y),Wo(e,r.z,s.z,o.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class vS extends Mi{constructor(e=new Le,n=new Le){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=n}getPoint(e,n=new Le){const i=n;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,n){return this.getPoint(e,n)}getTangent(e,n=new Le){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,n){return this.getTangent(e,n)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class cT extends Mi{constructor(e=new B,n=new B){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=n}getPoint(e,n=new B){const i=n;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,n){return this.getPoint(e,n)}getTangent(e,n=new B){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,n){return this.getTangent(e,n)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class _S extends Mi{constructor(e=new Le,n=new Le,i=new Le){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=n,this.v2=i}getPoint(e,n=new Le){const i=n,r=this.v0,s=this.v1,o=this.v2;return i.set(Ho(e,r.x,s.x,o.x),Ho(e,r.y,s.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class fT extends Mi{constructor(e=new B,n=new B,i=new B){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=n,this.v2=i}getPoint(e,n=new B){const i=n,r=this.v0,s=this.v1,o=this.v2;return i.set(Ho(e,r.x,s.x,o.x),Ho(e,r.y,s.y,o.y),Ho(e,r.z,s.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class SS extends Mi{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,n=new Le){const i=n,r=this.points,s=(r.length-1)*e,o=Math.floor(s),a=s-o,l=r[o===0?o:o-1],u=r[o],c=r[o>r.length-2?r.length-1:o+1],d=r[o>r.length-3?r.length-1:o+2];return i.set(Bm(a,l.x,u.x,c.x,d.x),Bm(a,l.y,u.y,c.y,d.y)),i}copy(e){super.copy(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const r=e.points[n];this.points.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let n=0,i=this.points.length;n<i;n++){const r=this.points[n];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const r=e.points[n];this.points.push(new Le().fromArray(r))}return this}}var zm=Object.freeze({__proto__:null,ArcCurve:eT,CatmullRomCurve3:tT,CubicBezierCurve:gS,CubicBezierCurve3:uT,EllipseCurve:Sp,LineCurve:vS,LineCurve3:cT,QuadraticBezierCurve:_S,QuadraticBezierCurve3:fT,SplineCurve:SS});class dT extends Mi{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),n=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(n)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new zm[i](n,e))}return this}getPoint(e,n){const i=e*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=i){const o=r[s]-i,a=this.curves[s],l=a.getLength(),u=l===0?0:1-o/l;return a.getPointAt(u,n)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let n=0;for(let i=0,r=this.curves.length;i<r;i++)n+=this.curves[i].getLength(),e.push(n);return this.cacheLengths=e,e}getSpacedPoints(e=40){const n=[];for(let i=0;i<=e;i++)n.push(this.getPoint(i/e));return this.autoClose&&n.push(n[0]),n}getPoints(e=12){const n=[];let i;for(let r=0,s=this.curves;r<s.length;r++){const o=s[r],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let u=0;u<l.length;u++){const c=l[u];i&&i.equals(c)||(n.push(c),i=c)}}return this.autoClose&&n.length>1&&!n[n.length-1].equals(n[0])&&n.push(n[0]),n}copy(e){super.copy(e),this.curves=[];for(let n=0,i=e.curves.length;n<i;n++){const r=e.curves[n];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let n=0,i=this.curves.length;n<i;n++){const r=this.curves[n];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let n=0,i=e.curves.length;n<i;n++){const r=e.curves[n];this.curves.push(new zm[r.type]().fromJSON(r))}return this}}class Gm extends dT{constructor(e){super(),this.type="Path",this.currentPoint=new Le,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let n=1,i=e.length;n<i;n++)this.lineTo(e[n].x,e[n].y);return this}moveTo(e,n){return this.currentPoint.set(e,n),this}lineTo(e,n){const i=new vS(this.currentPoint.clone(),new Le(e,n));return this.curves.push(i),this.currentPoint.set(e,n),this}quadraticCurveTo(e,n,i,r){const s=new _S(this.currentPoint.clone(),new Le(e,n),new Le(i,r));return this.curves.push(s),this.currentPoint.set(i,r),this}bezierCurveTo(e,n,i,r,s,o){const a=new gS(this.currentPoint.clone(),new Le(e,n),new Le(i,r),new Le(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(e){const n=[this.currentPoint.clone()].concat(e),i=new SS(n);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,n,i,r,s,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,n+l,i,r,s,o),this}absarc(e,n,i,r,s,o){return this.absellipse(e,n,i,i,r,s,o),this}ellipse(e,n,i,r,s,o,a,l){const u=this.currentPoint.x,c=this.currentPoint.y;return this.absellipse(e+u,n+c,i,r,s,o,a,l),this}absellipse(e,n,i,r,s,o,a,l){const u=new Sp(e,n,i,r,s,o,a,l);if(this.curves.length>0){const d=u.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(u);const c=u.getPoint(1);return this.currentPoint.copy(c),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class yS extends Gm{constructor(e){super(e),this.uuid=no(),this.type="Shape",this.holes=[]}getPointsHoles(e){const n=[];for(let i=0,r=this.holes.length;i<r;i++)n[i]=this.holes[i].getPoints(e);return n}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let n=0,i=e.holes.length;n<i;n++){const r=e.holes[n];this.holes.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let n=0,i=this.holes.length;n<i;n++){const r=this.holes[n];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let n=0,i=e.holes.length;n<i;n++){const r=e.holes[n];this.holes.push(new Gm().fromJSON(r))}return this}}function hT(t,e,n=2){const i=e&&e.length,r=i?e[0]*n:t.length;let s=MS(t,0,r,n,!0);const o=[];if(!s||s.next===s.prev)return o;let a,l,u;if(i&&(s=_T(t,e,s,n)),t.length>80*n){a=t[0],l=t[1];let c=a,d=l;for(let f=n;f<r;f+=n){const p=t[f],m=t[f+1];p<a&&(a=p),m<l&&(l=m),p>c&&(c=p),m>d&&(d=m)}u=Math.max(c-a,d-l),u=u!==0?32767/u:0}return da(s,o,n,a,l,u,0),o}function MS(t,e,n,i,r){let s;if(r===RT(t,e,n,i)>0)for(let o=e;o<n;o+=i)s=Vm(o/i|0,t[o],t[o+1],s);else for(let o=n-i;o>=e;o-=i)s=Vm(o/i|0,t[o],t[o+1],s);return s&&Zs(s,s.next)&&(pa(s),s=s.next),s}function Jr(t,e){if(!t)return t;e||(e=t);let n=t,i;do if(i=!1,!n.steiner&&(Zs(n,n.next)||bt(n.prev,n,n.next)===0)){if(pa(n),n=e=n.prev,n===n.next)break;i=!0}else n=n.next;while(i||n!==e);return e}function da(t,e,n,i,r,s,o){if(!t)return;!o&&s&&TT(t,i,r,s);let a=t;for(;t.prev!==t.next;){const l=t.prev,u=t.next;if(s?mT(t,i,r,s):pT(t)){e.push(l.i,t.i,u.i),pa(t),t=u.next,a=u.next;continue}if(t=u,t===a){o?o===1?(t=gT(Jr(t),e),da(t,e,n,i,r,s,2)):o===2&&vT(t,e,n,i,r,s):da(Jr(t),e,n,i,r,s,1);break}}}function pT(t){const e=t.prev,n=t,i=t.next;if(bt(e,n,i)>=0)return!1;const r=e.x,s=n.x,o=i.x,a=e.y,l=n.y,u=i.y,c=Math.min(r,s,o),d=Math.min(a,l,u),f=Math.max(r,s,o),p=Math.max(a,l,u);let m=i.next;for(;m!==e;){if(m.x>=c&&m.x<=f&&m.y>=d&&m.y<=p&&No(r,a,s,l,o,u,m.x,m.y)&&bt(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function mT(t,e,n,i){const r=t.prev,s=t,o=t.next;if(bt(r,s,o)>=0)return!1;const a=r.x,l=s.x,u=o.x,c=r.y,d=s.y,f=o.y,p=Math.min(a,l,u),m=Math.min(c,d,f),_=Math.max(a,l,u),g=Math.max(c,d,f),h=Zd(p,m,e,n,i),v=Zd(_,g,e,n,i);let S=t.prevZ,M=t.nextZ;for(;S&&S.z>=h&&M&&M.z<=v;){if(S.x>=p&&S.x<=_&&S.y>=m&&S.y<=g&&S!==r&&S!==o&&No(a,c,l,d,u,f,S.x,S.y)&&bt(S.prev,S,S.next)>=0||(S=S.prevZ,M.x>=p&&M.x<=_&&M.y>=m&&M.y<=g&&M!==r&&M!==o&&No(a,c,l,d,u,f,M.x,M.y)&&bt(M.prev,M,M.next)>=0))return!1;M=M.nextZ}for(;S&&S.z>=h;){if(S.x>=p&&S.x<=_&&S.y>=m&&S.y<=g&&S!==r&&S!==o&&No(a,c,l,d,u,f,S.x,S.y)&&bt(S.prev,S,S.next)>=0)return!1;S=S.prevZ}for(;M&&M.z<=v;){if(M.x>=p&&M.x<=_&&M.y>=m&&M.y<=g&&M!==r&&M!==o&&No(a,c,l,d,u,f,M.x,M.y)&&bt(M.prev,M,M.next)>=0)return!1;M=M.nextZ}return!0}function gT(t,e){let n=t;do{const i=n.prev,r=n.next.next;!Zs(i,r)&&TS(i,n,n.next,r)&&ha(i,r)&&ha(r,i)&&(e.push(i.i,n.i,r.i),pa(n),pa(n.next),n=t=r),n=n.next}while(n!==t);return Jr(n)}function vT(t,e,n,i,r,s){let o=t;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&xT(o,a)){let l=bS(o,a);o=Jr(o,o.next),l=Jr(l,l.next),da(o,e,n,i,r,s,0),da(l,e,n,i,r,s,0);return}a=a.next}o=o.next}while(o!==t)}function _T(t,e,n,i){const r=[];for(let s=0,o=e.length;s<o;s++){const a=e[s]*i,l=s<o-1?e[s+1]*i:t.length,u=MS(t,a,l,i,!1);u===u.next&&(u.steiner=!0),r.push(wT(u))}r.sort(ST);for(let s=0;s<r.length;s++)n=yT(r[s],n);return n}function ST(t,e){let n=t.x-e.x;if(n===0&&(n=t.y-e.y,n===0)){const i=(t.next.y-t.y)/(t.next.x-t.x),r=(e.next.y-e.y)/(e.next.x-e.x);n=i-r}return n}function yT(t,e){const n=MT(t,e);if(!n)return e;const i=bS(n,t);return Jr(i,i.next),Jr(n,n.next)}function MT(t,e){let n=e;const i=t.x,r=t.y;let s=-1/0,o;if(Zs(t,n))return n;do{if(Zs(t,n.next))return n.next;if(r<=n.y&&r>=n.next.y&&n.next.y!==n.y){const d=n.x+(r-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(d<=i&&d>s&&(s=d,o=n.x<n.next.x?n:n.next,d===i))return o}n=n.next}while(n!==e);if(!o)return null;const a=o,l=o.x,u=o.y;let c=1/0;n=o;do{if(i>=n.x&&n.x>=l&&i!==n.x&&ES(r<u?i:s,r,l,u,r<u?s:i,r,n.x,n.y)){const d=Math.abs(r-n.y)/(i-n.x);ha(n,t)&&(d<c||d===c&&(n.x>o.x||n.x===o.x&&ET(o,n)))&&(o=n,c=d)}n=n.next}while(n!==a);return o}function ET(t,e){return bt(t.prev,t,e.prev)<0&&bt(e.next,t,t.next)<0}function TT(t,e,n,i){let r=t;do r.z===0&&(r.z=Zd(r.x,r.y,e,n,i)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==t);r.prevZ.nextZ=null,r.prevZ=null,bT(r)}function bT(t){let e,n=1;do{let i=t,r;t=null;let s=null;for(e=0;i;){e++;let o=i,a=0;for(let u=0;u<n&&(a++,o=o.nextZ,!!o);u++);let l=n;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||i.z<=o.z)?(r=i,i=i.nextZ,a--):(r=o,o=o.nextZ,l--),s?s.nextZ=r:t=r,r.prevZ=s,s=r;i=o}s.nextZ=null,n*=2}while(e>1);return t}function Zd(t,e,n,i,r){return t=(t-n)*r|0,e=(e-i)*r|0,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t|e<<1}function wT(t){let e=t,n=t;do(e.x<n.x||e.x===n.x&&e.y<n.y)&&(n=e),e=e.next;while(e!==t);return n}function ES(t,e,n,i,r,s,o,a){return(r-o)*(e-a)>=(t-o)*(s-a)&&(t-o)*(i-a)>=(n-o)*(e-a)&&(n-o)*(s-a)>=(r-o)*(i-a)}function No(t,e,n,i,r,s,o,a){return!(t===o&&e===a)&&ES(t,e,n,i,r,s,o,a)}function xT(t,e){return t.next.i!==e.i&&t.prev.i!==e.i&&!AT(t,e)&&(ha(t,e)&&ha(e,t)&&CT(t,e)&&(bt(t.prev,t,e.prev)||bt(t,e.prev,e))||Zs(t,e)&&bt(t.prev,t,t.next)>0&&bt(e.prev,e,e.next)>0)}function bt(t,e,n){return(e.y-t.y)*(n.x-e.x)-(e.x-t.x)*(n.y-e.y)}function Zs(t,e){return t.x===e.x&&t.y===e.y}function TS(t,e,n,i){const r=pl(bt(t,e,n)),s=pl(bt(t,e,i)),o=pl(bt(n,i,t)),a=pl(bt(n,i,e));return!!(r!==s&&o!==a||r===0&&hl(t,n,e)||s===0&&hl(t,i,e)||o===0&&hl(n,t,i)||a===0&&hl(n,e,i))}function hl(t,e,n){return e.x<=Math.max(t.x,n.x)&&e.x>=Math.min(t.x,n.x)&&e.y<=Math.max(t.y,n.y)&&e.y>=Math.min(t.y,n.y)}function pl(t){return t>0?1:t<0?-1:0}function AT(t,e){let n=t;do{if(n.i!==t.i&&n.next.i!==t.i&&n.i!==e.i&&n.next.i!==e.i&&TS(n,n.next,t,e))return!0;n=n.next}while(n!==t);return!1}function ha(t,e){return bt(t.prev,t,t.next)<0?bt(t,e,t.next)>=0&&bt(t,t.prev,e)>=0:bt(t,e,t.prev)<0||bt(t,t.next,e)<0}function CT(t,e){let n=t,i=!1;const r=(t.x+e.x)/2,s=(t.y+e.y)/2;do n.y>s!=n.next.y>s&&n.next.y!==n.y&&r<(n.next.x-n.x)*(s-n.y)/(n.next.y-n.y)+n.x&&(i=!i),n=n.next;while(n!==t);return i}function bS(t,e){const n=Jd(t.i,t.x,t.y),i=Jd(e.i,e.x,e.y),r=t.next,s=e.prev;return t.next=e,e.prev=t,n.next=r,r.prev=n,i.next=n,n.prev=i,s.next=i,i.prev=s,i}function Vm(t,e,n,i){const r=Jd(t,e,n);return i?(r.next=i.next,r.prev=i,i.next.prev=r,i.next=r):(r.prev=r,r.next=r),r}function pa(t){t.next.prev=t.prev,t.prev.next=t.next,t.prevZ&&(t.prevZ.nextZ=t.nextZ),t.nextZ&&(t.nextZ.prevZ=t.prevZ)}function Jd(t,e,n){return{i:t,x:e,y:n,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function RT(t,e,n,i){let r=0;for(let s=e,o=n-i;s<n;s+=i)r+=(t[o]-t[s])*(t[s+1]+t[o+1]),o=s;return r}class PT{static triangulate(e,n,i=2){return hT(e,n,i)}}class Xo{static area(e){const n=e.length;let i=0;for(let r=n-1,s=0;s<n;r=s++)i+=e[r].x*e[s].y-e[s].x*e[r].y;return i*.5}static isClockWise(e){return Xo.area(e)<0}static triangulateShape(e,n){const i=[],r=[],s=[];Hm(e),Wm(i,e);let o=e.length;n.forEach(Hm);for(let l=0;l<n.length;l++)r.push(o),o+=n[l].length,Wm(i,n[l]);const a=PT.triangulate(i,r);for(let l=0;l<a.length;l+=3)s.push(a.slice(l,l+3));return s}}function Hm(t){const e=t.length;e>2&&t[e-1].equals(t[0])&&t.pop()}function Wm(t,e){for(let n=0;n<e.length;n++)t.push(e[n].x),t.push(e[n].y)}class Xu extends on{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};const s=e/2,o=n/2,a=Math.floor(i),l=Math.floor(r),u=a+1,c=l+1,d=e/a,f=n/l,p=[],m=[],_=[],g=[];for(let h=0;h<c;h++){const v=h*f-o;for(let S=0;S<u;S++){const M=S*d-s;m.push(M,-v,0),_.push(0,0,1),g.push(S/a),g.push(1-h/l)}}for(let h=0;h<l;h++)for(let v=0;v<a;v++){const S=v+u*h,M=v+u*(h+1),T=v+1+u*(h+1),b=v+1+u*h;p.push(S,M,b),p.push(M,T,b)}this.setIndex(p),this.setAttribute("position",new Bt(m,3)),this.setAttribute("normal",new Bt(_,3)),this.setAttribute("uv",new Bt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xu(e.width,e.height,e.widthSegments,e.heightSegments)}}class Mp extends on{constructor(e=new yS([new Le(0,.5),new Le(-.5,-.5),new Le(.5,-.5)]),n=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:n};const i=[],r=[],s=[],o=[];let a=0,l=0;if(Array.isArray(e)===!1)u(e);else for(let c=0;c<e.length;c++)u(e[c]),this.addGroup(a,l,c),a+=l,l=0;this.setIndex(i),this.setAttribute("position",new Bt(r,3)),this.setAttribute("normal",new Bt(s,3)),this.setAttribute("uv",new Bt(o,2));function u(c){const d=r.length/3,f=c.extractPoints(n);let p=f.shape;const m=f.holes;Xo.isClockWise(p)===!1&&(p=p.reverse());for(let g=0,h=m.length;g<h;g++){const v=m[g];Xo.isClockWise(v)===!0&&(m[g]=v.reverse())}const _=Xo.triangulateShape(p,m);for(let g=0,h=m.length;g<h;g++){const v=m[g];p=p.concat(v)}for(let g=0,h=p.length;g<h;g++){const v=p[g];r.push(v.x,v.y,0),s.push(0,0,1),o.push(v.x,v.y)}for(let g=0,h=_.length;g<h;g++){const v=_[g],S=v[0]+d,M=v[1]+d,T=v[2]+d;i.push(S,M,T),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),n=this.parameters.shapes;return NT(n,e)}static fromJSON(e,n){const i=[];for(let r=0,s=e.shapes.length;r<s;r++){const o=n[e.shapes[r]];i.push(o)}return new Mp(i,e.curveSegments)}}function NT(t,e){if(e.shapes=[],Array.isArray(t))for(let n=0,i=t.length;n<i;n++){const r=t[n];e.shapes.push(r.uuid)}else e.shapes.push(t.uuid);return e}class Ur extends on{constructor(e=1,n=32,i=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:n,heightSegments:i,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},n=Math.max(3,Math.floor(n)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let u=0;const c=[],d=new B,f=new B,p=[],m=[],_=[],g=[];for(let h=0;h<=i;h++){const v=[],S=h/i;let M=0;h===0&&o===0?M=.5/n:h===i&&l===Math.PI&&(M=-.5/n);for(let T=0;T<=n;T++){const b=T/n;d.x=-e*Math.cos(r+b*s)*Math.sin(o+S*a),d.y=e*Math.cos(o+S*a),d.z=e*Math.sin(r+b*s)*Math.sin(o+S*a),m.push(d.x,d.y,d.z),f.copy(d).normalize(),_.push(f.x,f.y,f.z),g.push(b+M,1-S),v.push(u++)}c.push(v)}for(let h=0;h<i;h++)for(let v=0;v<n;v++){const S=c[h][v+1],M=c[h][v],T=c[h+1][v],b=c[h+1][v+1];(h!==0||o>0)&&p.push(S,M,b),(h!==i-1||l<Math.PI)&&p.push(M,T,b)}this.setIndex(p),this.setAttribute("position",new Bt(m,3)),this.setAttribute("normal",new Bt(_,3)),this.setAttribute("uv",new Bt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ur(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function Js(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const r=t[n][i];if(Xm(r))r.isRenderTargetTexture?(ze("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone();else if(Array.isArray(r))if(Xm(r[0])){const s=[];for(let o=0,a=r.length;o<a;o++)s[o]=r[o].clone();e[n][i]=s}else e[n][i]=r.slice();else e[n][i]=r}}return e}function an(t){const e={};for(let n=0;n<t.length;n++){const i=Js(t[n]);for(const r in i)e[r]=i[r]}return e}function Xm(t){return t&&(t.isColor||t.isMatrix3||t.isMatrix4||t.isVector2||t.isVector3||t.isVector4||t.isTexture||t.isQuaternion)}function LT(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function wS(t){const e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:nt.workingColorSpace}const IT={clone:Js,merge:an};var DT=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,UT=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Vn extends ns{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=DT,this.fragmentShader=UT,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Js(e.uniforms),this.uniformsGroups=LT(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?n.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?n.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?n.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?n.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?n.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?n.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?n.uniforms[r]={type:"m4",value:o.toArray()}:n.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class FT extends Vn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Rr extends ns{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Ke(16777215),this.specular=new Ke(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ke(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=$d,this.normalScale=new Le(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yr,this.combine=sp,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class OT extends ns{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=mE,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class kT extends ns{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class BT extends dS{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}class Ep extends Xt{constructor(e,n=1){super(),this.isLight=!0,this.type="Light",this.color=new Ke(e),this.intensity=n}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,n){return super.copy(e,n),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const n=super.toJSON(e);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,n}}const tf=new Et,jm=new B,$m=new B;class xS{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Le(512,512),this.mapType=wn,this.map=null,this.mapPass=null,this.matrix=new Et,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new _p,this._frameExtents=new Le(1,1),this._viewportCount=1,this._viewports=[new Rt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const n=this.camera,i=this.matrix;jm.setFromMatrixPosition(e.matrixWorld),n.position.copy(jm),$m.setFromMatrixPosition(e.target.matrixWorld),n.lookAt($m),n.updateMatrixWorld(),tf.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(tf,n.coordinateSystem,n.reversedDepth),n.coordinateSystem===fa||n.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(tf)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const ml=new B,gl=new io,si=new B;class AS extends Xt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Et,this.projectionMatrix=new Et,this.projectionMatrixInverse=new Et,this.coordinateSystem=hi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(ml,gl,si),si.x===1&&si.y===1&&si.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ml,gl,si.set(1,1,1)).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorld.decompose(ml,gl,si),si.x===1&&si.y===1&&si.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ml,gl,si.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Ji=new B,Ym=new Le,qm=new Le;class bn extends AS{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=qd*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ac*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return qd*2*Math.atan(Math.tan(Ac*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){Ji.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ji.x,Ji.y).multiplyScalar(-e/Ji.z),Ji.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ji.x,Ji.y).multiplyScalar(-e/Ji.z)}getViewSize(e,n){return this.getViewBounds(e,Ym,qm),n.subVectors(qm,Ym)}setViewOffset(e,n,i,r,s,o){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(Ac*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,u=o.fullHeight;s+=o.offsetX*r/l,n-=o.offsetY*i/u,r*=o.width/l,i*=o.height/u}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}class zT extends xS{constructor(){super(new bn(90,1,.5,500)),this.isPointLightShadow=!0}}class Km extends Ep{constructor(e,n,i=0,r=2){super(e,n),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new zT}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,n){return super.copy(e,n),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const n=super.toJSON(e);return n.object.distance=this.distance,n.object.decay=this.decay,n.object.shadow=this.shadow.toJSON(),n}}class Tp extends AS{constructor(e=-1,n=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+n,l=r-n;if(this.view!==null&&this.view.enabled){const u=(this.right-this.left)/this.view.fullWidth/this.zoom,c=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=u*this.view.offsetX,o=s+u*this.view.width,a-=c*this.view.offsetY,l=a-c*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}class GT extends xS{constructor(){super(new Tp(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Zm extends Ep{constructor(e,n){super(e,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Xt.DEFAULT_UP),this.updateMatrix(),this.target=new Xt,this.shadow=new GT}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const n=super.toJSON(e);return n.object.shadow=this.shadow.toJSON(),n.object.target=this.target.uuid,n}}class VT extends Ep{constructor(e,n){super(e,n),this.isAmbientLight=!0,this.type="AmbientLight"}}const vs=-90,_s=1;class HT extends Xt{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new bn(vs,_s,e,n);r.layers=this.layers,this.add(r);const s=new bn(vs,_s,e,n);s.layers=this.layers,this.add(s);const o=new bn(vs,_s,e,n);o.layers=this.layers,this.add(o);const a=new bn(vs,_s,e,n);a.layers=this.layers,this.add(a);const l=new bn(vs,_s,e,n);l.layers=this.layers,this.add(l);const u=new bn(vs,_s,e,n);u.layers=this.layers,this.add(u)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,r,s,o,a,l]=n;for(const u of n)this.remove(u);if(e===hi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===fa)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const u of n)this.add(u),u.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,u,c]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(n,s),e.setRenderTarget(i,1,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(n,o),e.setRenderTarget(i,2,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(n,a),e.setRenderTarget(i,3,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(n,l),e.setRenderTarget(i,4,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(n,u),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(n,c),e.setRenderTarget(d,f,p),e.xr.enabled=m,i.texture.needsPMREMUpdate=!0}}class WT extends bn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Cp=class Cp{constructor(e,n,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,n,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,n=0){for(let i=0;i<4;i++)this.elements[i]=e[i+n];return this}set(e,n,i,r){const s=this.elements;return s[0]=e,s[2]=n,s[1]=i,s[3]=r,this}};Cp.prototype.isMatrix2=!0;let Jm=Cp;function Qm(t,e,n,i){const r=XT(i);switch(n){case iS:return t*e;case sS:return t*e/r.components*r.byteLength;case cp:return t*e/r.components*r.byteLength;case Zr:return t*e*2/r.components*r.byteLength;case fp:return t*e*2/r.components*r.byteLength;case rS:return t*e*3/r.components*r.byteLength;case Jn:return t*e*4/r.components*r.byteLength;case dp:return t*e*4/r.components*r.byteLength;case kl:case Bl:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case zl:case Gl:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case _d:case yd:return Math.max(t,16)*Math.max(e,8)/4;case vd:case Sd:return Math.max(t,8)*Math.max(e,8)/2;case Md:case Ed:case bd:case wd:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case Td:case _u:case xd:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Ad:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Cd:return Math.floor((t+4)/5)*Math.floor((e+3)/4)*16;case Rd:return Math.floor((t+4)/5)*Math.floor((e+4)/5)*16;case Pd:return Math.floor((t+5)/6)*Math.floor((e+4)/5)*16;case Nd:return Math.floor((t+5)/6)*Math.floor((e+5)/6)*16;case Ld:return Math.floor((t+7)/8)*Math.floor((e+4)/5)*16;case Id:return Math.floor((t+7)/8)*Math.floor((e+5)/6)*16;case Dd:return Math.floor((t+7)/8)*Math.floor((e+7)/8)*16;case Ud:return Math.floor((t+9)/10)*Math.floor((e+4)/5)*16;case Fd:return Math.floor((t+9)/10)*Math.floor((e+5)/6)*16;case Od:return Math.floor((t+9)/10)*Math.floor((e+7)/8)*16;case kd:return Math.floor((t+9)/10)*Math.floor((e+9)/10)*16;case Bd:return Math.floor((t+11)/12)*Math.floor((e+9)/10)*16;case zd:return Math.floor((t+11)/12)*Math.floor((e+11)/12)*16;case Gd:case Vd:case Hd:return Math.ceil(t/4)*Math.ceil(e/4)*16;case Wd:case Xd:return Math.ceil(t/4)*Math.ceil(e/4)*8;case Su:case jd:return Math.ceil(t/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function XT(t){switch(t){case wn:case Q_:return{byteLength:1,components:1};case ua:case eS:case zi:return{byteLength:2,components:1};case lp:case up:return{byteLength:2,components:4};case Si:case ap:case di:return{byteLength:4,components:1};case tS:case nS:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${t}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:rp}}));typeof window<"u"&&(window.__THREE__?ze("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=rp);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function CS(){let t=null,e=!1,n=null,i=null;function r(s,o){n(s,o),i=t.requestAnimationFrame(r)}return{start:function(){e!==!0&&n!==null&&t!==null&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t!==null&&t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function jT(t){const e=new WeakMap;function n(a,l){const u=a.array,c=a.usage,d=u.byteLength,f=t.createBuffer();t.bindBuffer(l,f),t.bufferData(l,u,c),a.onUploadCallback();let p;if(u instanceof Float32Array)p=t.FLOAT;else if(typeof Float16Array<"u"&&u instanceof Float16Array)p=t.HALF_FLOAT;else if(u instanceof Uint16Array)a.isFloat16BufferAttribute?p=t.HALF_FLOAT:p=t.UNSIGNED_SHORT;else if(u instanceof Int16Array)p=t.SHORT;else if(u instanceof Uint32Array)p=t.UNSIGNED_INT;else if(u instanceof Int32Array)p=t.INT;else if(u instanceof Int8Array)p=t.BYTE;else if(u instanceof Uint8Array)p=t.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)p=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:f,type:p,bytesPerElement:u.BYTES_PER_ELEMENT,version:a.version,size:d}}function i(a,l,u){const c=l.array,d=l.updateRanges;if(t.bindBuffer(u,a),d.length===0)t.bufferSubData(u,0,c);else{d.sort((p,m)=>p.start-m.start);let f=0;for(let p=1;p<d.length;p++){const m=d[f],_=d[p];_.start<=m.start+m.count+1?m.count=Math.max(m.count,_.start+_.count-m.start):(++f,d[f]=_)}d.length=f+1;for(let p=0,m=d.length;p<m;p++){const _=d[p];t.bufferSubData(u,_.start*c.BYTES_PER_ELEMENT,c,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(t.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const c=e.get(a);(!c||c.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const u=e.get(a);if(u===void 0)e.set(a,n(a,l));else if(u.version<a.version){if(u.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(u.buffer,a,l),u.version=a.version}}return{get:r,remove:s,update:o}}var $T=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,YT=`#ifdef USE_ALPHAHASH
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
#endif`,qT=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,KT=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ZT=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,JT=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,QT=`#ifdef USE_AOMAP
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
#endif`,eb=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,tb=`#ifdef USE_BATCHING
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
#endif`,nb=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,ib=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,rb=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,sb=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,ob=`#ifdef USE_IRIDESCENCE
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
#endif`,ab=`#ifdef USE_BUMPMAP
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
#endif`,lb=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,ub=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,cb=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,fb=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,db=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,hb=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,pb=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,mb=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,gb=`#define PI 3.141592653589793
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
} // validated`,vb=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,_b=`vec3 transformedNormal = objectNormal;
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
#endif`,Sb=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,yb=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Mb=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Eb=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Tb="gl_FragColor = linearToOutputTexel( gl_FragColor );",bb=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,wb=`#ifdef USE_ENVMAP
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
#endif`,xb=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Ab=`#ifdef USE_ENVMAP
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
#endif`,Cb=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Rb=`#ifdef USE_ENVMAP
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
#endif`,Pb=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Nb=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Lb=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ib=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Db=`#ifdef USE_GRADIENTMAP
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
}`,Ub=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Fb=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ob=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,kb=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Bb=`#ifdef USE_ENVMAP
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
#endif`,zb=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Gb=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Vb=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Hb=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Wb=`PhysicalMaterial material;
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
#endif`,Xb=`uniform sampler2D dfgLUT;
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
}`,jb=`
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
#endif`,$b=`#if defined( RE_IndirectDiffuse )
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
#endif`,Yb=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,qb=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Kb=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Zb=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Jb=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Qb=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,ew=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,tw=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,nw=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,iw=`#if defined( USE_POINTS_UV )
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
#endif`,rw=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,sw=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ow=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,aw=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,lw=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,uw=`#ifdef USE_MORPHTARGETS
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
#endif`,cw=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,fw=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,dw=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,hw=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,pw=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,mw=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,gw=`#ifdef USE_NORMALMAP
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
#endif`,vw=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,_w=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Sw=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,yw=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Mw=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ew=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Tw=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,bw=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ww=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,xw=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Aw=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Cw=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Rw=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Pw=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Nw=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Lw=`float getShadowMask() {
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
}`,Iw=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Dw=`#ifdef USE_SKINNING
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
#endif`,Uw=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Fw=`#ifdef USE_SKINNING
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
#endif`,Ow=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,kw=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Bw=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,zw=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Gw=`#ifdef USE_TRANSMISSION
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
#endif`,Vw=`#ifdef USE_TRANSMISSION
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
#endif`,Hw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ww=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Xw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,jw=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const $w=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Yw=`uniform sampler2D t2D;
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
}`,qw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Kw=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Zw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Jw=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Qw=`#include <common>
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
}`,ex=`#if DEPTH_PACKING == 3200
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
}`,tx=`#define DISTANCE
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
}`,nx=`#define DISTANCE
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
}`,ix=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,rx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sx=`uniform float scale;
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
}`,ox=`uniform vec3 diffuse;
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
}`,ax=`#include <common>
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
}`,lx=`uniform vec3 diffuse;
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
}`,ux=`#define LAMBERT
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
}`,cx=`#define LAMBERT
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
}`,fx=`#define MATCAP
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
}`,dx=`#define MATCAP
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
}`,hx=`#define NORMAL
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
}`,px=`#define NORMAL
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
}`,mx=`#define PHONG
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
}`,gx=`#define PHONG
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
}`,vx=`#define STANDARD
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
}`,_x=`#define STANDARD
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
}`,Sx=`#define TOON
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
}`,yx=`#define TOON
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
}`,Mx=`uniform float size;
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
}`,Ex=`uniform vec3 diffuse;
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
}`,Tx=`#include <common>
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
}`,bx=`uniform vec3 color;
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
}`,wx=`uniform float rotation;
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
}`,xx=`uniform vec3 diffuse;
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
}`,qe={alphahash_fragment:$T,alphahash_pars_fragment:YT,alphamap_fragment:qT,alphamap_pars_fragment:KT,alphatest_fragment:ZT,alphatest_pars_fragment:JT,aomap_fragment:QT,aomap_pars_fragment:eb,batching_pars_vertex:tb,batching_vertex:nb,begin_vertex:ib,beginnormal_vertex:rb,bsdfs:sb,iridescence_fragment:ob,bumpmap_pars_fragment:ab,clipping_planes_fragment:lb,clipping_planes_pars_fragment:ub,clipping_planes_pars_vertex:cb,clipping_planes_vertex:fb,color_fragment:db,color_pars_fragment:hb,color_pars_vertex:pb,color_vertex:mb,common:gb,cube_uv_reflection_fragment:vb,defaultnormal_vertex:_b,displacementmap_pars_vertex:Sb,displacementmap_vertex:yb,emissivemap_fragment:Mb,emissivemap_pars_fragment:Eb,colorspace_fragment:Tb,colorspace_pars_fragment:bb,envmap_fragment:wb,envmap_common_pars_fragment:xb,envmap_pars_fragment:Ab,envmap_pars_vertex:Cb,envmap_physical_pars_fragment:Bb,envmap_vertex:Rb,fog_vertex:Pb,fog_pars_vertex:Nb,fog_fragment:Lb,fog_pars_fragment:Ib,gradientmap_pars_fragment:Db,lightmap_pars_fragment:Ub,lights_lambert_fragment:Fb,lights_lambert_pars_fragment:Ob,lights_pars_begin:kb,lights_toon_fragment:zb,lights_toon_pars_fragment:Gb,lights_phong_fragment:Vb,lights_phong_pars_fragment:Hb,lights_physical_fragment:Wb,lights_physical_pars_fragment:Xb,lights_fragment_begin:jb,lights_fragment_maps:$b,lights_fragment_end:Yb,lightprobes_pars_fragment:qb,logdepthbuf_fragment:Kb,logdepthbuf_pars_fragment:Zb,logdepthbuf_pars_vertex:Jb,logdepthbuf_vertex:Qb,map_fragment:ew,map_pars_fragment:tw,map_particle_fragment:nw,map_particle_pars_fragment:iw,metalnessmap_fragment:rw,metalnessmap_pars_fragment:sw,morphinstance_vertex:ow,morphcolor_vertex:aw,morphnormal_vertex:lw,morphtarget_pars_vertex:uw,morphtarget_vertex:cw,normal_fragment_begin:fw,normal_fragment_maps:dw,normal_pars_fragment:hw,normal_pars_vertex:pw,normal_vertex:mw,normalmap_pars_fragment:gw,clearcoat_normal_fragment_begin:vw,clearcoat_normal_fragment_maps:_w,clearcoat_pars_fragment:Sw,iridescence_pars_fragment:yw,opaque_fragment:Mw,packing:Ew,premultiplied_alpha_fragment:Tw,project_vertex:bw,dithering_fragment:ww,dithering_pars_fragment:xw,roughnessmap_fragment:Aw,roughnessmap_pars_fragment:Cw,shadowmap_pars_fragment:Rw,shadowmap_pars_vertex:Pw,shadowmap_vertex:Nw,shadowmask_pars_fragment:Lw,skinbase_vertex:Iw,skinning_pars_vertex:Dw,skinning_vertex:Uw,skinnormal_vertex:Fw,specularmap_fragment:Ow,specularmap_pars_fragment:kw,tonemapping_fragment:Bw,tonemapping_pars_fragment:zw,transmission_fragment:Gw,transmission_pars_fragment:Vw,uv_pars_fragment:Hw,uv_pars_vertex:Ww,uv_vertex:Xw,worldpos_vertex:jw,background_vert:$w,background_frag:Yw,backgroundCube_vert:qw,backgroundCube_frag:Kw,cube_vert:Zw,cube_frag:Jw,depth_vert:Qw,depth_frag:ex,distance_vert:tx,distance_frag:nx,equirect_vert:ix,equirect_frag:rx,linedashed_vert:sx,linedashed_frag:ox,meshbasic_vert:ax,meshbasic_frag:lx,meshlambert_vert:ux,meshlambert_frag:cx,meshmatcap_vert:fx,meshmatcap_frag:dx,meshnormal_vert:hx,meshnormal_frag:px,meshphong_vert:mx,meshphong_frag:gx,meshphysical_vert:vx,meshphysical_frag:_x,meshtoon_vert:Sx,meshtoon_frag:yx,points_vert:Mx,points_frag:Ex,shadow_vert:Tx,shadow_frag:bx,sprite_vert:wx,sprite_frag:xx},Te={common:{diffuse:{value:new Ke(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new je}},envmap:{envMap:{value:null},envMapRotation:{value:new je},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new je}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new je}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new je},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new je},normalScale:{value:new Le(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new je},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new je}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new je}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new je}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ke(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new B},probesMax:{value:new B},probesResolution:{value:new B}},points:{diffuse:{value:new Ke(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0},uvTransform:{value:new je}},sprite:{diffuse:{value:new Ke(16777215)},opacity:{value:1},center:{value:new Le(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}}},ui={basic:{uniforms:an([Te.common,Te.specularmap,Te.envmap,Te.aomap,Te.lightmap,Te.fog]),vertexShader:qe.meshbasic_vert,fragmentShader:qe.meshbasic_frag},lambert:{uniforms:an([Te.common,Te.specularmap,Te.envmap,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.fog,Te.lights,{emissive:{value:new Ke(0)},envMapIntensity:{value:1}}]),vertexShader:qe.meshlambert_vert,fragmentShader:qe.meshlambert_frag},phong:{uniforms:an([Te.common,Te.specularmap,Te.envmap,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.fog,Te.lights,{emissive:{value:new Ke(0)},specular:{value:new Ke(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:qe.meshphong_vert,fragmentShader:qe.meshphong_frag},standard:{uniforms:an([Te.common,Te.envmap,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.roughnessmap,Te.metalnessmap,Te.fog,Te.lights,{emissive:{value:new Ke(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:qe.meshphysical_vert,fragmentShader:qe.meshphysical_frag},toon:{uniforms:an([Te.common,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.gradientmap,Te.fog,Te.lights,{emissive:{value:new Ke(0)}}]),vertexShader:qe.meshtoon_vert,fragmentShader:qe.meshtoon_frag},matcap:{uniforms:an([Te.common,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.fog,{matcap:{value:null}}]),vertexShader:qe.meshmatcap_vert,fragmentShader:qe.meshmatcap_frag},points:{uniforms:an([Te.points,Te.fog]),vertexShader:qe.points_vert,fragmentShader:qe.points_frag},dashed:{uniforms:an([Te.common,Te.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:qe.linedashed_vert,fragmentShader:qe.linedashed_frag},depth:{uniforms:an([Te.common,Te.displacementmap]),vertexShader:qe.depth_vert,fragmentShader:qe.depth_frag},normal:{uniforms:an([Te.common,Te.bumpmap,Te.normalmap,Te.displacementmap,{opacity:{value:1}}]),vertexShader:qe.meshnormal_vert,fragmentShader:qe.meshnormal_frag},sprite:{uniforms:an([Te.sprite,Te.fog]),vertexShader:qe.sprite_vert,fragmentShader:qe.sprite_frag},background:{uniforms:{uvTransform:{value:new je},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:qe.background_vert,fragmentShader:qe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new je}},vertexShader:qe.backgroundCube_vert,fragmentShader:qe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:qe.cube_vert,fragmentShader:qe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:qe.equirect_vert,fragmentShader:qe.equirect_frag},distance:{uniforms:an([Te.common,Te.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:qe.distance_vert,fragmentShader:qe.distance_frag},shadow:{uniforms:an([Te.lights,Te.fog,{color:{value:new Ke(0)},opacity:{value:1}}]),vertexShader:qe.shadow_vert,fragmentShader:qe.shadow_frag}};ui.physical={uniforms:an([ui.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new je},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new je},clearcoatNormalScale:{value:new Le(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new je},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new je},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new je},sheen:{value:0},sheenColor:{value:new Ke(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new je},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new je},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new je},transmissionSamplerSize:{value:new Le},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new je},attenuationDistance:{value:0},attenuationColor:{value:new Ke(0)},specularColor:{value:new Ke(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new je},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new je},anisotropyVector:{value:new Le},anisotropyMap:{value:null},anisotropyMapTransform:{value:new je}}]),vertexShader:qe.meshphysical_vert,fragmentShader:qe.meshphysical_frag};const vl={r:0,b:0,g:0},Ax=new Et,RS=new je;RS.set(-1,0,0,0,1,0,0,0,1);function Cx(t,e,n,i,r,s){const o=new Ke(0);let a=r===!0?0:1,l,u,c=null,d=0,f=null;function p(v){let S=v.isScene===!0?v.background:null;if(S&&S.isTexture){const M=v.backgroundBlurriness>0;S=e.get(S,M)}return S}function m(v){let S=!1;const M=p(v);M===null?g(o,a):M&&M.isColor&&(g(M,1),S=!0);const T=t.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,s):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,s),(t.autoClear||S)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function _(v,S){const M=p(S);M&&(M.isCubeTexture||M.mapping===Wu)?(u===void 0&&(u=new It(new Ta(1,1,1),new Vn({name:"BackgroundCubeMaterial",uniforms:Js(ui.backgroundCube.uniforms),vertexShader:ui.backgroundCube.vertexShader,fragmentShader:ui.backgroundCube.fragmentShader,side:Sn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(T,b,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),u.material.uniforms.envMap.value=M,u.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Ax.makeRotationFromEuler(S.backgroundRotation)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&u.material.uniforms.backgroundRotation.value.premultiply(RS),u.material.toneMapped=nt.getTransfer(M.colorSpace)!==ct,(c!==M||d!==M.version||f!==t.toneMapping)&&(u.material.needsUpdate=!0,c=M,d=M.version,f=t.toneMapping),u.layers.enableAll(),v.unshift(u,u.geometry,u.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new It(new Xu(2,2),new Vn({name:"BackgroundMaterial",uniforms:Js(ui.background.uniforms),vertexShader:ui.background.vertexShader,fragmentShader:ui.background.fragmentShader,side:_i,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=M,l.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,l.material.toneMapped=nt.getTransfer(M.colorSpace)!==ct,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(c!==M||d!==M.version||f!==t.toneMapping)&&(l.material.needsUpdate=!0,c=M,d=M.version,f=t.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function g(v,S){v.getRGB(vl,wS(t)),n.buffers.color.setClear(vl.r,vl.g,vl.b,S,s)}function h(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(v,S=1){o.set(v),a=S,g(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(v){a=v,g(o,a)},render:m,addToRenderList:_,dispose:h}}function Rx(t,e){const n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},r=f(null);let s=r,o=!1;function a(N,I,F,z,D){let G=!1;const H=d(N,z,F,I);s!==H&&(s=H,u(s.object)),G=p(N,z,F,D),G&&m(N,z,F,D),D!==null&&e.update(D,t.ELEMENT_ARRAY_BUFFER),(G||o)&&(o=!1,M(N,I,F,z),D!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(D).buffer))}function l(){return t.createVertexArray()}function u(N){return t.bindVertexArray(N)}function c(N){return t.deleteVertexArray(N)}function d(N,I,F,z){const D=z.wireframe===!0;let G=i[I.id];G===void 0&&(G={},i[I.id]=G);const H=N.isInstancedMesh===!0?N.id:0;let U=G[H];U===void 0&&(U={},G[H]=U);let X=U[F.id];X===void 0&&(X={},U[F.id]=X);let J=X[D];return J===void 0&&(J=f(l()),X[D]=J),J}function f(N){const I=[],F=[],z=[];for(let D=0;D<n;D++)I[D]=0,F[D]=0,z[D]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:F,attributeDivisors:z,object:N,attributes:{},index:null}}function p(N,I,F,z){const D=s.attributes,G=I.attributes;let H=0;const U=F.getAttributes();for(const X in U)if(U[X].location>=0){const se=D[X];let ye=G[X];if(ye===void 0&&(X==="instanceMatrix"&&N.instanceMatrix&&(ye=N.instanceMatrix),X==="instanceColor"&&N.instanceColor&&(ye=N.instanceColor)),se===void 0||se.attribute!==ye||ye&&se.data!==ye.data)return!0;H++}return s.attributesNum!==H||s.index!==z}function m(N,I,F,z){const D={},G=I.attributes;let H=0;const U=F.getAttributes();for(const X in U)if(U[X].location>=0){let se=G[X];se===void 0&&(X==="instanceMatrix"&&N.instanceMatrix&&(se=N.instanceMatrix),X==="instanceColor"&&N.instanceColor&&(se=N.instanceColor));const ye={};ye.attribute=se,se&&se.data&&(ye.data=se.data),D[X]=ye,H++}s.attributes=D,s.attributesNum=H,s.index=z}function _(){const N=s.newAttributes;for(let I=0,F=N.length;I<F;I++)N[I]=0}function g(N){h(N,0)}function h(N,I){const F=s.newAttributes,z=s.enabledAttributes,D=s.attributeDivisors;F[N]=1,z[N]===0&&(t.enableVertexAttribArray(N),z[N]=1),D[N]!==I&&(t.vertexAttribDivisor(N,I),D[N]=I)}function v(){const N=s.newAttributes,I=s.enabledAttributes;for(let F=0,z=I.length;F<z;F++)I[F]!==N[F]&&(t.disableVertexAttribArray(F),I[F]=0)}function S(N,I,F,z,D,G,H){H===!0?t.vertexAttribIPointer(N,I,F,D,G):t.vertexAttribPointer(N,I,F,z,D,G)}function M(N,I,F,z){_();const D=z.attributes,G=F.getAttributes(),H=I.defaultAttributeValues;for(const U in G){const X=G[U];if(X.location>=0){let J=D[U];if(J===void 0&&(U==="instanceMatrix"&&N.instanceMatrix&&(J=N.instanceMatrix),U==="instanceColor"&&N.instanceColor&&(J=N.instanceColor)),J!==void 0){const se=J.normalized,ye=J.itemSize,Ge=e.get(J);if(Ge===void 0)continue;const He=Ge.buffer,Ue=Ge.type,te=Ge.bytesPerElement,me=Ue===t.INT||Ue===t.UNSIGNED_INT||J.gpuType===ap;if(J.isInterleavedBufferAttribute){const de=J.data,Pe=de.stride,ke=J.offset;if(de.isInstancedInterleavedBuffer){for(let Fe=0;Fe<X.locationSize;Fe++)h(X.location+Fe,de.meshPerAttribute);N.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=de.meshPerAttribute*de.count)}else for(let Fe=0;Fe<X.locationSize;Fe++)g(X.location+Fe);t.bindBuffer(t.ARRAY_BUFFER,He);for(let Fe=0;Fe<X.locationSize;Fe++)S(X.location+Fe,ye/X.locationSize,Ue,se,Pe*te,(ke+ye/X.locationSize*Fe)*te,me)}else{if(J.isInstancedBufferAttribute){for(let de=0;de<X.locationSize;de++)h(X.location+de,J.meshPerAttribute);N.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let de=0;de<X.locationSize;de++)g(X.location+de);t.bindBuffer(t.ARRAY_BUFFER,He);for(let de=0;de<X.locationSize;de++)S(X.location+de,ye/X.locationSize,Ue,se,ye*te,ye/X.locationSize*de*te,me)}}else if(H!==void 0){const se=H[U];if(se!==void 0)switch(se.length){case 2:t.vertexAttrib2fv(X.location,se);break;case 3:t.vertexAttrib3fv(X.location,se);break;case 4:t.vertexAttrib4fv(X.location,se);break;default:t.vertexAttrib1fv(X.location,se)}}}}v()}function T(){C();for(const N in i){const I=i[N];for(const F in I){const z=I[F];for(const D in z){const G=z[D];for(const H in G)c(G[H].object),delete G[H];delete z[D]}}delete i[N]}}function b(N){if(i[N.id]===void 0)return;const I=i[N.id];for(const F in I){const z=I[F];for(const D in z){const G=z[D];for(const H in G)c(G[H].object),delete G[H];delete z[D]}}delete i[N.id]}function w(N){for(const I in i){const F=i[I];for(const z in F){const D=F[z];if(D[N.id]===void 0)continue;const G=D[N.id];for(const H in G)c(G[H].object),delete G[H];delete D[N.id]}}}function y(N){for(const I in i){const F=i[I],z=N.isInstancedMesh===!0?N.id:0,D=F[z];if(D!==void 0){for(const G in D){const H=D[G];for(const U in H)c(H[U].object),delete H[U];delete D[G]}delete F[z],Object.keys(F).length===0&&delete i[I]}}}function C(){R(),o=!0,s!==r&&(s=r,u(s.object))}function R(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:C,resetDefaultState:R,dispose:T,releaseStatesOfGeometry:b,releaseStatesOfObject:y,releaseStatesOfProgram:w,initAttributes:_,enableAttribute:g,disableUnusedAttributes:v}}function Px(t,e,n){let i;function r(l){i=l}function s(l,u){t.drawArrays(i,l,u),n.update(u,i,1)}function o(l,u,c){c!==0&&(t.drawArraysInstanced(i,l,u,c),n.update(u,i,c))}function a(l,u,c){if(c===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,u,0,c);let f=0;for(let p=0;p<c;p++)f+=u[p];n.update(f,i,1)}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a}function Nx(t,e,n,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const w=e.get("EXT_texture_filter_anisotropic");r=t.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(w){return!(w!==Jn&&i.convert(w)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(w){const y=w===zi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(w!==wn&&i.convert(w)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==di&&!y)}function l(w){if(w==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let u=n.precision!==void 0?n.precision:"highp";const c=l(u);c!==u&&(ze("WebGLRenderer:",u,"not supported, using",c,"instead."),u=c);const d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&e.has("EXT_clip_control");n.reversedDepthBuffer===!0&&f===!1&&ze("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),m=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=t.getParameter(t.MAX_TEXTURE_SIZE),g=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),h=t.getParameter(t.MAX_VERTEX_ATTRIBS),v=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),S=t.getParameter(t.MAX_VARYING_VECTORS),M=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),T=t.getParameter(t.MAX_SAMPLES),b=t.getParameter(t.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:u,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:_,maxCubemapSize:g,maxAttributes:h,maxVertexUniforms:v,maxVaryings:S,maxFragmentUniforms:M,maxSamples:T,samples:b}}function Lx(t){const e=this;let n=null,i=0,r=!1,s=!1;const o=new Lr,a=new je,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const p=d.length!==0||f||i!==0||r;return r=f,i=d.length,p},this.beginShadows=function(){s=!0,c(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,f){n=c(d,f,0)},this.setState=function(d,f,p){const m=d.clippingPlanes,_=d.clipIntersection,g=d.clipShadows,h=t.get(d);if(!r||m===null||m.length===0||s&&!g)s?c(null):u();else{const v=s?0:i,S=v*4;let M=h.clippingState||null;l.value=M,M=c(m,f,S,p);for(let T=0;T!==S;++T)M[T]=n[T];h.clippingState=M,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function u(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function c(d,f,p,m){const _=d!==null?d.length:0;let g=null;if(_!==0){if(g=l.value,m!==!0||g===null){const h=p+_*4,v=f.matrixWorldInverse;a.getNormalMatrix(v),(g===null||g.length<h)&&(g=new Float32Array(h));for(let S=0,M=p;S!==_;++S,M+=4)o.copy(d[S]).applyMatrix4(v,a),o.normal.toArray(g,M),g[M+3]=o.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,g}}const ur=4,eg=[.125,.215,.35,.446,.526,.582],Fr=20,Ix=256,Mo=new Tp,tg=new Ke;let nf=null,rf=0,sf=0,of=!1;const Dx=new B;class ng{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,n=0,i=.1,r=100,s={}){const{size:o=256,position:a=Dx}=s;nf=this._renderer.getRenderTarget(),rf=this._renderer.getActiveCubeFace(),sf=this._renderer.getActiveMipmapLevel(),of=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,a),n>0&&this._blur(l,0,0,n),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=sg(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=rg(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(nf,rf,sf),this._renderer.xr.enabled=of,e.scissorTest=!1,Ss(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===Kr||e.mapping===qs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),nf=this._renderer.getRenderTarget(),rf=this._renderer.getActiveCubeFace(),sf=this._renderer.getActiveMipmapLevel(),of=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:nn,minFilter:nn,generateMipmaps:!1,type:zi,format:Jn,colorSpace:yu,depthBuffer:!1},r=ig(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ig(e,n,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Ux(s)),this._blurMaterial=Ox(s,e,n),this._ggxMaterial=Fx(s,e,n)}return r}_compileMaterial(e){const n=new It(new on,e);this._renderer.compile(n,Mo)}_sceneToCubeUV(e,n,i,r,s){const l=new bn(90,1,n,i),u=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,p=d.toneMapping;d.getClearColor(tg),d.toneMapping=gi,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new It(new Ta,new Tu({name:"PMREM.Background",side:Sn,depthWrite:!1,depthTest:!1})));const _=this._backgroundBox,g=_.material;let h=!1;const v=e.background;v?v.isColor&&(g.color.copy(v),e.background=null,h=!0):(g.color.copy(tg),h=!0);for(let S=0;S<6;S++){const M=S%3;M===0?(l.up.set(0,u[S],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+c[S],s.y,s.z)):M===1?(l.up.set(0,0,u[S]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+c[S],s.z)):(l.up.set(0,u[S],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+c[S]));const T=this._cubeSize;Ss(r,M*T,S>2?T:0,T,T),d.setRenderTarget(r),h&&d.render(_,l),d.render(e,l)}d.toneMapping=p,d.autoClear=f,e.background=v}_textureToCubeUV(e,n){const i=this._renderer,r=e.mapping===Kr||e.mapping===qs;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=sg()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=rg());const s=r?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=s;const a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;Ss(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(o,Mo)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);n.autoClear=i}_applyGGXFilter(e,n,i){const r=this._renderer,s=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[i];a.material=o;const l=o.uniforms,u=i/(this._lodMeshes.length-1),c=n/(this._lodMeshes.length-1),d=Math.sqrt(u*u-c*c),f=0+u*1.25,p=d*f,{_lodMax:m}=this,_=this._sizeLods[i],g=3*_*(i>m-ur?i-m+ur:0),h=4*(this._cubeSize-_);l.envMap.value=e.texture,l.roughness.value=p,l.mipInt.value=m-n,Ss(s,g,h,3*_,2*_),r.setRenderTarget(s),r.render(a,Mo),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=m-i,Ss(e,g,h,3*_,2*_),r.setRenderTarget(e),r.render(a,Mo)}_blur(e,n,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,n,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,n,i,r,s,o,a){const l=this._renderer,u=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&ot("blur direction must be either latitudinal or longitudinal!");const c=3,d=this._lodMeshes[r];d.material=u;const f=u.uniforms,p=this._sizeLods[i]-1,m=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Fr-1),_=s/m,g=isFinite(s)?1+Math.floor(c*_):Fr;g>Fr&&ze(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Fr}`);const h=[];let v=0;for(let w=0;w<Fr;++w){const y=w/_,C=Math.exp(-y*y/2);h.push(C),w===0?v+=C:w<g&&(v+=2*C)}for(let w=0;w<h.length;w++)h[w]=h[w]/v;f.envMap.value=e.texture,f.samples.value=g,f.weights.value=h,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:S}=this;f.dTheta.value=m,f.mipInt.value=S-i;const M=this._sizeLods[r],T=3*M*(r>S-ur?r-S+ur:0),b=4*(this._cubeSize-M);Ss(n,T,b,3*M,2*M),l.setRenderTarget(n),l.render(d,Mo)}}function Ux(t){const e=[],n=[],i=[];let r=t;const s=t-ur+1+eg.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);e.push(a);let l=1/a;o>t-ur?l=eg[o-t+ur-1]:o===0&&(l=0),n.push(l);const u=1/(a-2),c=-u,d=1+u,f=[c,c,d,c,d,d,c,c,d,d,c,d],p=6,m=6,_=3,g=2,h=1,v=new Float32Array(_*m*p),S=new Float32Array(g*m*p),M=new Float32Array(h*m*p);for(let b=0;b<p;b++){const w=b%3*2/3-1,y=b>2?0:-1,C=[w,y,0,w+2/3,y,0,w+2/3,y+1,0,w,y,0,w+2/3,y+1,0,w,y+1,0];v.set(C,_*m*b),S.set(f,g*m*b);const R=[b,b,b,b,b,b];M.set(R,h*m*b)}const T=new on;T.setAttribute("position",new Bn(v,_)),T.setAttribute("uv",new Bn(S,g)),T.setAttribute("faceIndex",new Bn(M,h)),i.push(new It(T,null)),r>ur&&r--}return{lodMeshes:i,sizeLods:e,sigmas:n}}function ig(t,e,n){const i=new vi(t,e,n);return i.texture.mapping=Wu,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ss(t,e,n,i,r){t.viewport.set(e,n,i,r),t.scissor.set(e,n,i,r)}function Fx(t,e,n){return new Vn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Ix,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:ju(),fragmentShader:`

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
		`,blending:Di,depthTest:!1,depthWrite:!1})}function Ox(t,e,n){const i=new Float32Array(Fr),r=new B(0,1,0);return new Vn({name:"SphericalGaussianBlur",defines:{n:Fr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:ju(),fragmentShader:`

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
		`,blending:Di,depthTest:!1,depthWrite:!1})}function rg(){return new Vn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ju(),fragmentShader:`

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
		`,blending:Di,depthTest:!1,depthWrite:!1})}function sg(){return new Vn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ju(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Di,depthTest:!1,depthWrite:!1})}function ju(){return`

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
	`}class PS extends vi{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new pS(r),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Ta(5,5,5),s=new Vn({name:"CubemapFromEquirect",uniforms:Js(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Sn,blending:Di});s.uniforms.tEquirect.value=n;const o=new It(r,s),a=n.minFilter;return n.minFilter===zr&&(n.minFilter=nn),new HT(1,10,this).update(e,o),n.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,n=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(n,i,r);e.setRenderTarget(s)}}function kx(t){let e=new WeakMap,n=new WeakMap,i=null;function r(f,p=!1){return f==null?null:p?o(f):s(f)}function s(f){if(f&&f.isTexture){const p=f.mapping;if(p===bc||p===wc)if(e.has(f)){const m=e.get(f).texture;return a(m,f.mapping)}else{const m=f.image;if(m&&m.height>0){const _=new PS(m.height);return _.fromEquirectangularTexture(t,f),e.set(f,_),f.addEventListener("dispose",u),a(_.texture,f.mapping)}else return null}}return f}function o(f){if(f&&f.isTexture){const p=f.mapping,m=p===bc||p===wc,_=p===Kr||p===qs;if(m||_){let g=n.get(f);const h=g!==void 0?g.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==h)return i===null&&(i=new ng(t)),g=m?i.fromEquirectangular(f,g):i.fromCubemap(f,g),g.texture.pmremVersion=f.pmremVersion,n.set(f,g),g.texture;if(g!==void 0)return g.texture;{const v=f.image;return m&&v&&v.height>0||_&&v&&l(v)?(i===null&&(i=new ng(t)),g=m?i.fromEquirectangular(f):i.fromCubemap(f),g.texture.pmremVersion=f.pmremVersion,n.set(f,g),f.addEventListener("dispose",c),g.texture):null}}}return f}function a(f,p){return p===bc?f.mapping=Kr:p===wc&&(f.mapping=qs),f}function l(f){let p=0;const m=6;for(let _=0;_<m;_++)f[_]!==void 0&&p++;return p===m}function u(f){const p=f.target;p.removeEventListener("dispose",u);const m=e.get(p);m!==void 0&&(e.delete(p),m.dispose())}function c(f){const p=f.target;p.removeEventListener("dispose",c);const m=n.get(p);m!==void 0&&(n.delete(p),m.dispose())}function d(){e=new WeakMap,n=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:d}}function Bx(t){const e={};function n(i){if(e[i]!==void 0)return e[i];const r=t.getExtension(i);return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const r=n(i);return r===null&&Yd("WebGLRenderer: "+i+" extension not supported."),r}}}function zx(t,e,n,i){const r={},s=new WeakMap;function o(d){const f=d.target;f.index!==null&&e.remove(f.index);for(const m in f.attributes)e.remove(f.attributes[m]);f.removeEventListener("dispose",o),delete r[f.id];const p=s.get(f);p&&(e.remove(p),s.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,n.memory.geometries--}function a(d,f){return r[f.id]===!0||(f.addEventListener("dispose",o),r[f.id]=!0,n.memory.geometries++),f}function l(d){const f=d.attributes;for(const p in f)e.update(f[p],t.ARRAY_BUFFER)}function u(d){const f=[],p=d.index,m=d.attributes.position;let _=0;if(m===void 0)return;if(p!==null){const v=p.array;_=p.version;for(let S=0,M=v.length;S<M;S+=3){const T=v[S+0],b=v[S+1],w=v[S+2];f.push(T,b,b,w,w,T)}}else{const v=m.array;_=m.version;for(let S=0,M=v.length/3-1;S<M;S+=3){const T=S+0,b=S+1,w=S+2;f.push(T,b,b,w,w,T)}}const g=new(m.count>=65535?fS:cS)(f,1);g.version=_;const h=s.get(d);h&&e.remove(h),s.set(d,g)}function c(d){const f=s.get(d);if(f){const p=d.index;p!==null&&f.version<p.version&&u(d)}else u(d);return s.get(d)}return{get:a,update:l,getWireframeAttribute:c}}function Gx(t,e,n){let i;function r(d){i=d}let s,o;function a(d){s=d.type,o=d.bytesPerElement}function l(d,f){t.drawElements(i,f,s,d*o),n.update(f,i,1)}function u(d,f,p){p!==0&&(t.drawElementsInstanced(i,f,s,d*o,p),n.update(f,i,p))}function c(d,f,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,s,d,0,p);let _=0;for(let g=0;g<p;g++)_+=f[g];n.update(_,i,1)}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=u,this.renderMultiDraw=c}function Vx(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(n.calls++,o){case t.TRIANGLES:n.triangles+=a*(s/3);break;case t.LINES:n.lines+=a*(s/2);break;case t.LINE_STRIP:n.lines+=a*(s-1);break;case t.LINE_LOOP:n.lines+=a*s;break;case t.POINTS:n.points+=a*s;break;default:ot("WebGLInfo: Unknown draw mode:",o);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function Hx(t,e,n){const i=new WeakMap,r=new Rt;function s(o,a,l){const u=o.morphTargetInfluences,c=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=c!==void 0?c.length:0;let f=i.get(a);if(f===void 0||f.count!==d){let R=function(){y.dispose(),i.delete(a),a.removeEventListener("dispose",R)};var p=R;f!==void 0&&f.texture.dispose();const m=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,g=a.morphAttributes.color!==void 0,h=a.morphAttributes.position||[],v=a.morphAttributes.normal||[],S=a.morphAttributes.color||[];let M=0;m===!0&&(M=1),_===!0&&(M=2),g===!0&&(M=3);let T=a.attributes.position.count*M,b=1;T>e.maxTextureSize&&(b=Math.ceil(T/e.maxTextureSize),T=e.maxTextureSize);const w=new Float32Array(T*b*4*d),y=new aS(w,T,b,d);y.type=di,y.needsUpdate=!0;const C=M*4;for(let N=0;N<d;N++){const I=h[N],F=v[N],z=S[N],D=T*b*4*N;for(let G=0;G<I.count;G++){const H=G*C;m===!0&&(r.fromBufferAttribute(I,G),w[D+H+0]=r.x,w[D+H+1]=r.y,w[D+H+2]=r.z,w[D+H+3]=0),_===!0&&(r.fromBufferAttribute(F,G),w[D+H+4]=r.x,w[D+H+5]=r.y,w[D+H+6]=r.z,w[D+H+7]=0),g===!0&&(r.fromBufferAttribute(z,G),w[D+H+8]=r.x,w[D+H+9]=r.y,w[D+H+10]=r.z,w[D+H+11]=z.itemSize===4?r.w:1)}}f={count:d,texture:y,size:new Le(T,b)},i.set(a,f),a.addEventListener("dispose",R)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(t,"morphTexture",o.morphTexture,n);else{let m=0;for(let g=0;g<u.length;g++)m+=u[g];const _=a.morphTargetsRelative?1:1-m;l.getUniforms().setValue(t,"morphTargetBaseInfluence",_),l.getUniforms().setValue(t,"morphTargetInfluences",u)}l.getUniforms().setValue(t,"morphTargetsTexture",f.texture,n),l.getUniforms().setValue(t,"morphTargetsTextureSize",f.size)}return{update:s}}function Wx(t,e,n,i,r){let s=new WeakMap;function o(u){const c=r.render.frame,d=u.geometry,f=e.get(u,d);if(s.get(f)!==c&&(e.update(f),s.set(f,c)),u.isInstancedMesh&&(u.hasEventListener("dispose",l)===!1&&u.addEventListener("dispose",l),s.get(u)!==c&&(n.update(u.instanceMatrix,t.ARRAY_BUFFER),u.instanceColor!==null&&n.update(u.instanceColor,t.ARRAY_BUFFER),s.set(u,c))),u.isSkinnedMesh){const p=u.skeleton;s.get(p)!==c&&(p.update(),s.set(p,c))}return f}function a(){s=new WeakMap}function l(u){const c=u.target;c.removeEventListener("dispose",l),i.releaseStatesOfObject(c),n.remove(c.instanceMatrix),c.instanceColor!==null&&n.remove(c.instanceColor)}return{update:o,dispose:a}}const Xx={[j_]:"LINEAR_TONE_MAPPING",[$_]:"REINHARD_TONE_MAPPING",[Y_]:"CINEON_TONE_MAPPING",[op]:"ACES_FILMIC_TONE_MAPPING",[K_]:"AGX_TONE_MAPPING",[Z_]:"NEUTRAL_TONE_MAPPING",[q_]:"CUSTOM_TONE_MAPPING"};function jx(t,e,n,i,r){const s=new vi(e,n,{type:t,depthBuffer:i,stencilBuffer:r,depthTexture:i?new Ks(e,n):void 0}),o=new vi(e,n,{type:zi,depthBuffer:!1,stencilBuffer:!1}),a=new on;a.setAttribute("position",new Bt([-1,3,0,-1,-1,0,3,-1,0],3)),a.setAttribute("uv",new Bt([0,2,0,0,2,0],2));const l=new FT({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),u=new It(a,l),c=new Tp(-1,1,1,-1,0,1);let d=null,f=null,p=!1,m,_=null,g=[],h=!1;this.setSize=function(v,S){s.setSize(v,S),o.setSize(v,S);for(let M=0;M<g.length;M++){const T=g[M];T.setSize&&T.setSize(v,S)}},this.setEffects=function(v){g=v,h=g.length>0&&g[0].isRenderPass===!0;const S=s.width,M=s.height;for(let T=0;T<g.length;T++){const b=g[T];b.setSize&&b.setSize(S,M)}},this.begin=function(v,S){if(p||v.toneMapping===gi&&g.length===0)return!1;if(_=S,S!==null){const M=S.width,T=S.height;(s.width!==M||s.height!==T)&&this.setSize(M,T)}return h===!1&&v.setRenderTarget(s),m=v.toneMapping,v.toneMapping=gi,!0},this.hasRenderPass=function(){return h},this.end=function(v,S){v.toneMapping=m,p=!0;let M=s,T=o;for(let b=0;b<g.length;b++){const w=g[b];if(w.enabled!==!1&&(w.render(v,T,M,S),w.needsSwap!==!1)){const y=M;M=T,T=y}}if(d!==v.outputColorSpace||f!==v.toneMapping){d=v.outputColorSpace,f=v.toneMapping,l.defines={},nt.getTransfer(d)===ct&&(l.defines.SRGB_TRANSFER="");const b=Xx[f];b&&(l.defines[b]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=M.texture,v.setRenderTarget(_),v.render(u,c),_=null,p=!1},this.isCompositing=function(){return p},this.dispose=function(){s.depthTexture&&s.depthTexture.dispose(),s.dispose(),o.dispose(),a.dispose(),l.dispose()}}const NS=new rn,Qd=new Ks(1,1),LS=new aS,IS=new IE,DS=new pS,og=[],ag=[],lg=new Float32Array(16),ug=new Float32Array(9),cg=new Float32Array(4);function ro(t,e,n){const i=t[0];if(i<=0||i>0)return t;const r=e*n;let s=og[r];if(s===void 0&&(s=new Float32Array(r),og[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=n,t[o].toArray(s,a)}return s}function zt(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function Gt(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function $u(t,e){let n=ag[e];n===void 0&&(n=new Int32Array(e),ag[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function $x(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function Yx(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(zt(n,e))return;t.uniform2fv(this.addr,e),Gt(n,e)}}function qx(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(zt(n,e))return;t.uniform3fv(this.addr,e),Gt(n,e)}}function Kx(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(zt(n,e))return;t.uniform4fv(this.addr,e),Gt(n,e)}}function Zx(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(zt(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),Gt(n,e)}else{if(zt(n,i))return;cg.set(i),t.uniformMatrix2fv(this.addr,!1,cg),Gt(n,i)}}function Jx(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(zt(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),Gt(n,e)}else{if(zt(n,i))return;ug.set(i),t.uniformMatrix3fv(this.addr,!1,ug),Gt(n,i)}}function Qx(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(zt(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),Gt(n,e)}else{if(zt(n,i))return;lg.set(i),t.uniformMatrix4fv(this.addr,!1,lg),Gt(n,i)}}function eA(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function tA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(zt(n,e))return;t.uniform2iv(this.addr,e),Gt(n,e)}}function nA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(zt(n,e))return;t.uniform3iv(this.addr,e),Gt(n,e)}}function iA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(zt(n,e))return;t.uniform4iv(this.addr,e),Gt(n,e)}}function rA(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function sA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(zt(n,e))return;t.uniform2uiv(this.addr,e),Gt(n,e)}}function oA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(zt(n,e))return;t.uniform3uiv(this.addr,e),Gt(n,e)}}function aA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(zt(n,e))return;t.uniform4uiv(this.addr,e),Gt(n,e)}}function lA(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);let s;this.type===t.SAMPLER_2D_SHADOW?(Qd.compareFunction=n.isReversedDepthBuffer()?pp:hp,s=Qd):s=NS,n.setTexture2D(e||s,r)}function uA(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||IS,r)}function cA(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(e||DS,r)}function fA(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||LS,r)}function dA(t){switch(t){case 5126:return $x;case 35664:return Yx;case 35665:return qx;case 35666:return Kx;case 35674:return Zx;case 35675:return Jx;case 35676:return Qx;case 5124:case 35670:return eA;case 35667:case 35671:return tA;case 35668:case 35672:return nA;case 35669:case 35673:return iA;case 5125:return rA;case 36294:return sA;case 36295:return oA;case 36296:return aA;case 35678:case 36198:case 36298:case 36306:case 35682:return lA;case 35679:case 36299:case 36307:return uA;case 35680:case 36300:case 36308:case 36293:return cA;case 36289:case 36303:case 36311:case 36292:return fA}}function hA(t,e){t.uniform1fv(this.addr,e)}function pA(t,e){const n=ro(e,this.size,2);t.uniform2fv(this.addr,n)}function mA(t,e){const n=ro(e,this.size,3);t.uniform3fv(this.addr,n)}function gA(t,e){const n=ro(e,this.size,4);t.uniform4fv(this.addr,n)}function vA(t,e){const n=ro(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function _A(t,e){const n=ro(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function SA(t,e){const n=ro(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function yA(t,e){t.uniform1iv(this.addr,e)}function MA(t,e){t.uniform2iv(this.addr,e)}function EA(t,e){t.uniform3iv(this.addr,e)}function TA(t,e){t.uniform4iv(this.addr,e)}function bA(t,e){t.uniform1uiv(this.addr,e)}function wA(t,e){t.uniform2uiv(this.addr,e)}function xA(t,e){t.uniform3uiv(this.addr,e)}function AA(t,e){t.uniform4uiv(this.addr,e)}function CA(t,e,n){const i=this.cache,r=e.length,s=$u(n,r);zt(i,s)||(t.uniform1iv(this.addr,s),Gt(i,s));let o;this.type===t.SAMPLER_2D_SHADOW?o=Qd:o=NS;for(let a=0;a!==r;++a)n.setTexture2D(e[a]||o,s[a])}function RA(t,e,n){const i=this.cache,r=e.length,s=$u(n,r);zt(i,s)||(t.uniform1iv(this.addr,s),Gt(i,s));for(let o=0;o!==r;++o)n.setTexture3D(e[o]||IS,s[o])}function PA(t,e,n){const i=this.cache,r=e.length,s=$u(n,r);zt(i,s)||(t.uniform1iv(this.addr,s),Gt(i,s));for(let o=0;o!==r;++o)n.setTextureCube(e[o]||DS,s[o])}function NA(t,e,n){const i=this.cache,r=e.length,s=$u(n,r);zt(i,s)||(t.uniform1iv(this.addr,s),Gt(i,s));for(let o=0;o!==r;++o)n.setTexture2DArray(e[o]||LS,s[o])}function LA(t){switch(t){case 5126:return hA;case 35664:return pA;case 35665:return mA;case 35666:return gA;case 35674:return vA;case 35675:return _A;case 35676:return SA;case 5124:case 35670:return yA;case 35667:case 35671:return MA;case 35668:case 35672:return EA;case 35669:case 35673:return TA;case 5125:return bA;case 36294:return wA;case 36295:return xA;case 36296:return AA;case 35678:case 36198:case 36298:case 36306:case 35682:return CA;case 35679:case 36299:case 36307:return RA;case 35680:case 36300:case 36308:case 36293:return PA;case 36289:case 36303:case 36311:case 36292:return NA}}class IA{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=dA(n.type)}}class DA{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=LA(n.type)}}class UA{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,n[a.id],i)}}}const af=/(\w+)(\])?(\[|\.)?/g;function fg(t,e){t.seq.push(e),t.map[e.id]=e}function FA(t,e,n){const i=t.name,r=i.length;for(af.lastIndex=0;;){const s=af.exec(i),o=af.lastIndex;let a=s[1];const l=s[2]==="]",u=s[3];if(l&&(a=a|0),u===void 0||u==="["&&o+2===r){fg(n,u===void 0?new IA(a,t,e):new DA(a,t,e));break}else{let d=n.map[a];d===void 0&&(d=new UA(a),fg(n,d)),n=d}}}class Vl{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){const a=e.getActiveUniform(n,o),l=e.getUniformLocation(n,a.name);FA(a,l,this)}const r=[],s=[];for(const o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(o):s.push(o);r.length>0&&(this.seq=r.concat(s))}setValue(e,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(e,i,r)}setOptional(e,n,i){const r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let s=0,o=n.length;s!==o;++s){const a=n[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,n){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in n&&i.push(o)}return i}}function dg(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const OA=37297;let kA=0;function BA(t,e){const n=t.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${n[o]}`)}return i.join(`
`)}const hg=new je;function zA(t){nt._getMatrix(hg,nt.workingColorSpace,t);const e=`mat3( ${hg.elements.map(n=>n.toFixed(4))} )`;switch(nt.getTransfer(t)){case Mu:return[e,"LinearTransferOETF"];case ct:return[e,"sRGBTransferOETF"];default:return ze("WebGLProgram: Unsupported color space: ",t),[e,"LinearTransferOETF"]}}function pg(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),s=(t.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const a=parseInt(o[1]);return n.toUpperCase()+`

`+s+`

`+BA(t.getShaderSource(e),a)}else return s}function GA(t,e){const n=zA(e);return[`vec4 ${t}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}const VA={[j_]:"Linear",[$_]:"Reinhard",[Y_]:"Cineon",[op]:"ACESFilmic",[K_]:"AgX",[Z_]:"Neutral",[q_]:"Custom"};function HA(t,e){const n=VA[e];return n===void 0?(ze("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+t+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const _l=new B;function WA(){nt.getLuminanceCoefficients(_l);const t=_l.x.toFixed(4),e=_l.y.toFixed(4),n=_l.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function XA(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Lo).join(`
`)}function jA(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function $A(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=t.getActiveAttrib(e,r),o=s.name;let a=1;s.type===t.FLOAT_MAT2&&(a=2),s.type===t.FLOAT_MAT3&&(a=3),s.type===t.FLOAT_MAT4&&(a=4),n[o]={type:s.type,location:t.getAttribLocation(e,o),locationSize:a}}return n}function Lo(t){return t!==""}function mg(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function gg(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const YA=/^[ \t]*#include +<([\w\d./]+)>/gm;function eh(t){return t.replace(YA,KA)}const qA=new Map;function KA(t,e){let n=qe[e];if(n===void 0){const i=qA.get(e);if(i!==void 0)n=qe[i],ze('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return eh(n)}const ZA=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function vg(t){return t.replace(ZA,JA)}function JA(t,e,n,i){let r="";for(let s=parseInt(e);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function _g(t){let e=`precision ${t.precision} float;
	precision ${t.precision} int;
	precision ${t.precision} sampler2D;
	precision ${t.precision} samplerCube;
	precision ${t.precision} sampler3D;
	precision ${t.precision} sampler2DArray;
	precision ${t.precision} sampler2DShadow;
	precision ${t.precision} samplerCubeShadow;
	precision ${t.precision} sampler2DArrayShadow;
	precision ${t.precision} isampler2D;
	precision ${t.precision} isampler3D;
	precision ${t.precision} isamplerCube;
	precision ${t.precision} isampler2DArray;
	precision ${t.precision} usampler2D;
	precision ${t.precision} usampler3D;
	precision ${t.precision} usamplerCube;
	precision ${t.precision} usampler2DArray;
	`;return t.precision==="highp"?e+=`
#define HIGH_PRECISION`:t.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:t.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const QA={[Ol]:"SHADOWMAP_TYPE_PCF",[Ro]:"SHADOWMAP_TYPE_VSM"};function eC(t){return QA[t.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const tC={[Kr]:"ENVMAP_TYPE_CUBE",[qs]:"ENVMAP_TYPE_CUBE",[Wu]:"ENVMAP_TYPE_CUBE_UV"};function nC(t){return t.envMap===!1?"ENVMAP_TYPE_CUBE":tC[t.envMapMode]||"ENVMAP_TYPE_CUBE"}const iC={[qs]:"ENVMAP_MODE_REFRACTION"};function rC(t){return t.envMap===!1?"ENVMAP_MODE_REFLECTION":iC[t.envMapMode]||"ENVMAP_MODE_REFLECTION"}const sC={[sp]:"ENVMAP_BLENDING_MULTIPLY",[dE]:"ENVMAP_BLENDING_MIX",[hE]:"ENVMAP_BLENDING_ADD"};function oC(t){return t.envMap===!1?"ENVMAP_BLENDING_NONE":sC[t.combine]||"ENVMAP_BLENDING_NONE"}function aC(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function lC(t,e,n,i){const r=t.getContext(),s=n.defines;let o=n.vertexShader,a=n.fragmentShader;const l=eC(n),u=nC(n),c=rC(n),d=oC(n),f=aC(n),p=XA(n),m=jA(s),_=r.createProgram();let g,h,v=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(g=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,m].filter(Lo).join(`
`),g.length>0&&(g+=`
`),h=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,m].filter(Lo).join(`
`),h.length>0&&(h+=`
`)):(g=[_g(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,m,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexNormals?"#define HAS_NORMAL":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Lo).join(`
`),h=[_g(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,m,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+u:"",n.envMap?"#define "+c:"",n.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==gi?"#define TONE_MAPPING":"",n.toneMapping!==gi?qe.tonemapping_pars_fragment:"",n.toneMapping!==gi?HA("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",qe.colorspace_pars_fragment,GA("linearToOutputTexel",n.outputColorSpace),WA(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(Lo).join(`
`)),o=eh(o),o=mg(o,n),o=gg(o,n),a=eh(a),a=mg(a,n),a=gg(a,n),o=vg(o),a=vg(a),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,h=["#define varying in",n.glslVersion===gm?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===gm?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const S=v+g+o,M=v+h+a,T=dg(r,r.VERTEX_SHADER,S),b=dg(r,r.FRAGMENT_SHADER,M);r.attachShader(_,T),r.attachShader(_,b),n.index0AttributeName!==void 0?r.bindAttribLocation(_,0,n.index0AttributeName):n.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function w(N){if(t.debug.checkShaderErrors){const I=r.getProgramInfoLog(_)||"",F=r.getShaderInfoLog(T)||"",z=r.getShaderInfoLog(b)||"",D=I.trim(),G=F.trim(),H=z.trim();let U=!0,X=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(U=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,_,T,b);else{const J=pg(r,T,"vertex"),se=pg(r,b,"fragment");ot("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+N.name+`
Material Type: `+N.type+`

Program Info Log: `+D+`
`+J+`
`+se)}else D!==""?ze("WebGLProgram: Program Info Log:",D):(G===""||H==="")&&(X=!1);X&&(N.diagnostics={runnable:U,programLog:D,vertexShader:{log:G,prefix:g},fragmentShader:{log:H,prefix:h}})}r.deleteShader(T),r.deleteShader(b),y=new Vl(r,_),C=$A(r,_)}let y;this.getUniforms=function(){return y===void 0&&w(this),y};let C;this.getAttributes=function(){return C===void 0&&w(this),C};let R=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=r.getProgramParameter(_,OA)),R},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=kA++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=T,this.fragmentShader=b,this}let uC=0;class cC{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(n),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new fC(e),n.set(e,i)),i}}class fC{constructor(e){this.id=uC++,this.code=e,this.usedTimes=0}}function dC(t){return t===Zr||t===_u||t===Su}function hC(t,e,n,i,r,s){const o=new lS,a=new cC,l=new Set,u=[],c=new Map,d=i.logarithmicDepthBuffer;let f=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(y){return l.add(y),y===0?"uv":`uv${y}`}function _(y,C,R,N,I,F){const z=N.fog,D=I.geometry,G=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?N.environment:null,H=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,U=e.get(y.envMap||G,H),X=U&&U.mapping===Wu?U.image.height:null,J=p[y.type];y.precision!==null&&(f=i.getMaxPrecision(y.precision),f!==y.precision&&ze("WebGLProgram.getParameters:",y.precision,"not supported, using",f,"instead."));const se=D.morphAttributes.position||D.morphAttributes.normal||D.morphAttributes.color,ye=se!==void 0?se.length:0;let Ge=0;D.morphAttributes.position!==void 0&&(Ge=1),D.morphAttributes.normal!==void 0&&(Ge=2),D.morphAttributes.color!==void 0&&(Ge=3);let He,Ue,te,me;if(J){const $e=ui[J];He=$e.vertexShader,Ue=$e.fragmentShader}else He=y.vertexShader,Ue=y.fragmentShader,a.update(y),te=a.getVertexShaderID(y),me=a.getFragmentShaderID(y);const de=t.getRenderTarget(),Pe=t.state.buffers.depth.getReversed(),ke=I.isInstancedMesh===!0,Fe=I.isBatchedMesh===!0,it=!!y.map,Xe=!!y.matcap,et=!!U,ut=!!y.aoMap,he=!!y.lightMap,lt=!!y.bumpMap,tt=!!y.normalMap,We=!!y.displacementMap,O=!!y.emissiveMap,Be=!!y.metalnessMap,q=!!y.roughnessMap,ve=y.anisotropy>0,K=y.clearcoat>0,ue=y.dispersion>0,x=y.iridescence>0,E=y.sheen>0,L=y.transmission>0,j=ve&&!!y.anisotropyMap,ne=K&&!!y.clearcoatMap,ce=K&&!!y.clearcoatNormalMap,ge=K&&!!y.clearcoatRoughnessMap,Q=x&&!!y.iridescenceMap,ee=x&&!!y.iridescenceThicknessMap,_e=E&&!!y.sheenColorMap,Ee=E&&!!y.sheenRoughnessMap,re=!!y.specularMap,oe=!!y.specularColorMap,ae=!!y.specularIntensityMap,Me=L&&!!y.transmissionMap,Ve=L&&!!y.thicknessMap,k=!!y.gradientMap,pe=!!y.alphaMap,ie=y.alphaTest>0,we=!!y.alphaHash,Se=!!y.extensions;let le=gi;y.toneMapped&&(de===null||de.isXRRenderTarget===!0)&&(le=t.toneMapping);const Ie={shaderID:J,shaderType:y.type,shaderName:y.name,vertexShader:He,fragmentShader:Ue,defines:y.defines,customVertexShaderID:te,customFragmentShaderID:me,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:f,batching:Fe,batchingColor:Fe&&I._colorsTexture!==null,instancing:ke,instancingColor:ke&&I.instanceColor!==null,instancingMorph:ke&&I.morphTexture!==null,outputColorSpace:de===null?t.outputColorSpace:de.isXRRenderTarget===!0?de.texture.colorSpace:nt.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:it,matcap:Xe,envMap:et,envMapMode:et&&U.mapping,envMapCubeUVHeight:X,aoMap:ut,lightMap:he,bumpMap:lt,normalMap:tt,displacementMap:We,emissiveMap:O,normalMapObjectSpace:tt&&y.normalMapType===gE,normalMapTangentSpace:tt&&y.normalMapType===$d,packedNormalMap:tt&&y.normalMapType===$d&&dC(y.normalMap.format),metalnessMap:Be,roughnessMap:q,anisotropy:ve,anisotropyMap:j,clearcoat:K,clearcoatMap:ne,clearcoatNormalMap:ce,clearcoatRoughnessMap:ge,dispersion:ue,iridescence:x,iridescenceMap:Q,iridescenceThicknessMap:ee,sheen:E,sheenColorMap:_e,sheenRoughnessMap:Ee,specularMap:re,specularColorMap:oe,specularIntensityMap:ae,transmission:L,transmissionMap:Me,thicknessMap:Ve,gradientMap:k,opaque:y.transparent===!1&&y.blending===Wr&&y.alphaToCoverage===!1,alphaMap:pe,alphaTest:ie,alphaHash:we,combine:y.combine,mapUv:it&&m(y.map.channel),aoMapUv:ut&&m(y.aoMap.channel),lightMapUv:he&&m(y.lightMap.channel),bumpMapUv:lt&&m(y.bumpMap.channel),normalMapUv:tt&&m(y.normalMap.channel),displacementMapUv:We&&m(y.displacementMap.channel),emissiveMapUv:O&&m(y.emissiveMap.channel),metalnessMapUv:Be&&m(y.metalnessMap.channel),roughnessMapUv:q&&m(y.roughnessMap.channel),anisotropyMapUv:j&&m(y.anisotropyMap.channel),clearcoatMapUv:ne&&m(y.clearcoatMap.channel),clearcoatNormalMapUv:ce&&m(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ge&&m(y.clearcoatRoughnessMap.channel),iridescenceMapUv:Q&&m(y.iridescenceMap.channel),iridescenceThicknessMapUv:ee&&m(y.iridescenceThicknessMap.channel),sheenColorMapUv:_e&&m(y.sheenColorMap.channel),sheenRoughnessMapUv:Ee&&m(y.sheenRoughnessMap.channel),specularMapUv:re&&m(y.specularMap.channel),specularColorMapUv:oe&&m(y.specularColorMap.channel),specularIntensityMapUv:ae&&m(y.specularIntensityMap.channel),transmissionMapUv:Me&&m(y.transmissionMap.channel),thicknessMapUv:Ve&&m(y.thicknessMap.channel),alphaMapUv:pe&&m(y.alphaMap.channel),vertexTangents:!!D.attributes.tangent&&(tt||ve),vertexNormals:!!D.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!D.attributes.color&&D.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!D.attributes.uv&&(it||pe),fog:!!z,useFog:y.fog===!0,fogExp2:!!z&&z.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||D.attributes.normal===void 0&&tt===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:Pe,skinning:I.isSkinnedMesh===!0,morphTargets:D.morphAttributes.position!==void 0,morphNormals:D.morphAttributes.normal!==void 0,morphColors:D.morphAttributes.color!==void 0,morphTargetsCount:ye,morphTextureStride:Ge,numDirLights:C.directional.length,numPointLights:C.point.length,numSpotLights:C.spot.length,numSpotLightMaps:C.spotLightMap.length,numRectAreaLights:C.rectArea.length,numHemiLights:C.hemi.length,numDirLightShadows:C.directionalShadowMap.length,numPointLightShadows:C.pointShadowMap.length,numSpotLightShadows:C.spotShadowMap.length,numSpotLightShadowsWithMaps:C.numSpotLightShadowsWithMaps,numLightProbes:C.numLightProbes,numLightProbeGrids:F.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:y.dithering,shadowMapEnabled:t.shadowMap.enabled&&R.length>0,shadowMapType:t.shadowMap.type,toneMapping:le,decodeVideoTexture:it&&y.map.isVideoTexture===!0&&nt.getTransfer(y.map.colorSpace)===ct,decodeVideoTextureEmissive:O&&y.emissiveMap.isVideoTexture===!0&&nt.getTransfer(y.emissiveMap.colorSpace)===ct,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===fi,flipSided:y.side===Sn,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:Se&&y.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Se&&y.extensions.multiDraw===!0||Fe)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Ie.vertexUv1s=l.has(1),Ie.vertexUv2s=l.has(2),Ie.vertexUv3s=l.has(3),l.clear(),Ie}function g(y){const C=[];if(y.shaderID?C.push(y.shaderID):(C.push(y.customVertexShaderID),C.push(y.customFragmentShaderID)),y.defines!==void 0)for(const R in y.defines)C.push(R),C.push(y.defines[R]);return y.isRawShaderMaterial===!1&&(h(C,y),v(C,y),C.push(t.outputColorSpace)),C.push(y.customProgramCacheKey),C.join()}function h(y,C){y.push(C.precision),y.push(C.outputColorSpace),y.push(C.envMapMode),y.push(C.envMapCubeUVHeight),y.push(C.mapUv),y.push(C.alphaMapUv),y.push(C.lightMapUv),y.push(C.aoMapUv),y.push(C.bumpMapUv),y.push(C.normalMapUv),y.push(C.displacementMapUv),y.push(C.emissiveMapUv),y.push(C.metalnessMapUv),y.push(C.roughnessMapUv),y.push(C.anisotropyMapUv),y.push(C.clearcoatMapUv),y.push(C.clearcoatNormalMapUv),y.push(C.clearcoatRoughnessMapUv),y.push(C.iridescenceMapUv),y.push(C.iridescenceThicknessMapUv),y.push(C.sheenColorMapUv),y.push(C.sheenRoughnessMapUv),y.push(C.specularMapUv),y.push(C.specularColorMapUv),y.push(C.specularIntensityMapUv),y.push(C.transmissionMapUv),y.push(C.thicknessMapUv),y.push(C.combine),y.push(C.fogExp2),y.push(C.sizeAttenuation),y.push(C.morphTargetsCount),y.push(C.morphAttributeCount),y.push(C.numDirLights),y.push(C.numPointLights),y.push(C.numSpotLights),y.push(C.numSpotLightMaps),y.push(C.numHemiLights),y.push(C.numRectAreaLights),y.push(C.numDirLightShadows),y.push(C.numPointLightShadows),y.push(C.numSpotLightShadows),y.push(C.numSpotLightShadowsWithMaps),y.push(C.numLightProbes),y.push(C.shadowMapType),y.push(C.toneMapping),y.push(C.numClippingPlanes),y.push(C.numClipIntersection),y.push(C.depthPacking)}function v(y,C){o.disableAll(),C.instancing&&o.enable(0),C.instancingColor&&o.enable(1),C.instancingMorph&&o.enable(2),C.matcap&&o.enable(3),C.envMap&&o.enable(4),C.normalMapObjectSpace&&o.enable(5),C.normalMapTangentSpace&&o.enable(6),C.clearcoat&&o.enable(7),C.iridescence&&o.enable(8),C.alphaTest&&o.enable(9),C.vertexColors&&o.enable(10),C.vertexAlphas&&o.enable(11),C.vertexUv1s&&o.enable(12),C.vertexUv2s&&o.enable(13),C.vertexUv3s&&o.enable(14),C.vertexTangents&&o.enable(15),C.anisotropy&&o.enable(16),C.alphaHash&&o.enable(17),C.batching&&o.enable(18),C.dispersion&&o.enable(19),C.batchingColor&&o.enable(20),C.gradientMap&&o.enable(21),C.packedNormalMap&&o.enable(22),C.vertexNormals&&o.enable(23),y.push(o.mask),o.disableAll(),C.fog&&o.enable(0),C.useFog&&o.enable(1),C.flatShading&&o.enable(2),C.logarithmicDepthBuffer&&o.enable(3),C.reversedDepthBuffer&&o.enable(4),C.skinning&&o.enable(5),C.morphTargets&&o.enable(6),C.morphNormals&&o.enable(7),C.morphColors&&o.enable(8),C.premultipliedAlpha&&o.enable(9),C.shadowMapEnabled&&o.enable(10),C.doubleSided&&o.enable(11),C.flipSided&&o.enable(12),C.useDepthPacking&&o.enable(13),C.dithering&&o.enable(14),C.transmission&&o.enable(15),C.sheen&&o.enable(16),C.opaque&&o.enable(17),C.pointsUvs&&o.enable(18),C.decodeVideoTexture&&o.enable(19),C.decodeVideoTextureEmissive&&o.enable(20),C.alphaToCoverage&&o.enable(21),C.numLightProbeGrids>0&&o.enable(22),y.push(o.mask)}function S(y){const C=p[y.type];let R;if(C){const N=ui[C];R=IT.clone(N.uniforms)}else R=y.uniforms;return R}function M(y,C){let R=c.get(C);return R!==void 0?++R.usedTimes:(R=new lC(t,C,y,r),u.push(R),c.set(C,R)),R}function T(y){if(--y.usedTimes===0){const C=u.indexOf(y);u[C]=u[u.length-1],u.pop(),c.delete(y.cacheKey),y.destroy()}}function b(y){a.remove(y)}function w(){a.dispose()}return{getParameters:_,getProgramCacheKey:g,getUniforms:S,acquireProgram:M,releaseProgram:T,releaseShaderCache:b,programs:u,dispose:w}}function pC(){let t=new WeakMap;function e(o){return t.has(o)}function n(o){let a=t.get(o);return a===void 0&&(a={},t.set(o,a)),a}function i(o){t.delete(o)}function r(o,a,l){t.get(o)[a]=l}function s(){t=new WeakMap}return{has:e,get:n,remove:i,update:r,dispose:s}}function mC(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.materialVariant!==e.materialVariant?t.materialVariant-e.materialVariant:t.z!==e.z?t.z-e.z:t.id-e.id}function Sg(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function yg(){const t=[];let e=0;const n=[],i=[],r=[];function s(){e=0,n.length=0,i.length=0,r.length=0}function o(f){let p=0;return f.isInstancedMesh&&(p+=2),f.isSkinnedMesh&&(p+=1),p}function a(f,p,m,_,g,h){let v=t[e];return v===void 0?(v={id:f.id,object:f,geometry:p,material:m,materialVariant:o(f),groupOrder:_,renderOrder:f.renderOrder,z:g,group:h},t[e]=v):(v.id=f.id,v.object=f,v.geometry=p,v.material=m,v.materialVariant=o(f),v.groupOrder=_,v.renderOrder=f.renderOrder,v.z=g,v.group=h),e++,v}function l(f,p,m,_,g,h){const v=a(f,p,m,_,g,h);m.transmission>0?i.push(v):m.transparent===!0?r.push(v):n.push(v)}function u(f,p,m,_,g,h){const v=a(f,p,m,_,g,h);m.transmission>0?i.unshift(v):m.transparent===!0?r.unshift(v):n.unshift(v)}function c(f,p){n.length>1&&n.sort(f||mC),i.length>1&&i.sort(p||Sg),r.length>1&&r.sort(p||Sg)}function d(){for(let f=e,p=t.length;f<p;f++){const m=t[f];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:l,unshift:u,finish:d,sort:c}}function gC(){let t=new WeakMap;function e(i,r){const s=t.get(i);let o;return s===void 0?(o=new yg,t.set(i,[o])):r>=s.length?(o=new yg,s.push(o)):o=s[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}function vC(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new B,color:new Ke};break;case"SpotLight":n={position:new B,direction:new B,color:new Ke,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new B,color:new Ke,distance:0,decay:0};break;case"HemisphereLight":n={direction:new B,skyColor:new Ke,groundColor:new Ke};break;case"RectAreaLight":n={color:new Ke,position:new B,halfWidth:new B,halfHeight:new B};break}return t[e.id]=n,n}}}function _C(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Le};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Le};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Le,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let SC=0;function yC(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function MC(t){const e=new vC,n=_C(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)i.probe.push(new B);const r=new B,s=new Et,o=new Et;function a(u){let c=0,d=0,f=0;for(let C=0;C<9;C++)i.probe[C].set(0,0,0);let p=0,m=0,_=0,g=0,h=0,v=0,S=0,M=0,T=0,b=0,w=0;u.sort(yC);for(let C=0,R=u.length;C<R;C++){const N=u[C],I=N.color,F=N.intensity,z=N.distance;let D=null;if(N.shadow&&N.shadow.map&&(N.shadow.map.texture.format===Zr?D=N.shadow.map.texture:D=N.shadow.map.depthTexture||N.shadow.map.texture),N.isAmbientLight)c+=I.r*F,d+=I.g*F,f+=I.b*F;else if(N.isLightProbe){for(let G=0;G<9;G++)i.probe[G].addScaledVector(N.sh.coefficients[G],F);w++}else if(N.isDirectionalLight){const G=e.get(N);if(G.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){const H=N.shadow,U=n.get(N);U.shadowIntensity=H.intensity,U.shadowBias=H.bias,U.shadowNormalBias=H.normalBias,U.shadowRadius=H.radius,U.shadowMapSize=H.mapSize,i.directionalShadow[p]=U,i.directionalShadowMap[p]=D,i.directionalShadowMatrix[p]=N.shadow.matrix,v++}i.directional[p]=G,p++}else if(N.isSpotLight){const G=e.get(N);G.position.setFromMatrixPosition(N.matrixWorld),G.color.copy(I).multiplyScalar(F),G.distance=z,G.coneCos=Math.cos(N.angle),G.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),G.decay=N.decay,i.spot[_]=G;const H=N.shadow;if(N.map&&(i.spotLightMap[T]=N.map,T++,H.updateMatrices(N),N.castShadow&&b++),i.spotLightMatrix[_]=H.matrix,N.castShadow){const U=n.get(N);U.shadowIntensity=H.intensity,U.shadowBias=H.bias,U.shadowNormalBias=H.normalBias,U.shadowRadius=H.radius,U.shadowMapSize=H.mapSize,i.spotShadow[_]=U,i.spotShadowMap[_]=D,M++}_++}else if(N.isRectAreaLight){const G=e.get(N);G.color.copy(I).multiplyScalar(F),G.halfWidth.set(N.width*.5,0,0),G.halfHeight.set(0,N.height*.5,0),i.rectArea[g]=G,g++}else if(N.isPointLight){const G=e.get(N);if(G.color.copy(N.color).multiplyScalar(N.intensity),G.distance=N.distance,G.decay=N.decay,N.castShadow){const H=N.shadow,U=n.get(N);U.shadowIntensity=H.intensity,U.shadowBias=H.bias,U.shadowNormalBias=H.normalBias,U.shadowRadius=H.radius,U.shadowMapSize=H.mapSize,U.shadowCameraNear=H.camera.near,U.shadowCameraFar=H.camera.far,i.pointShadow[m]=U,i.pointShadowMap[m]=D,i.pointShadowMatrix[m]=N.shadow.matrix,S++}i.point[m]=G,m++}else if(N.isHemisphereLight){const G=e.get(N);G.skyColor.copy(N.color).multiplyScalar(F),G.groundColor.copy(N.groundColor).multiplyScalar(F),i.hemi[h]=G,h++}}g>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Te.LTC_FLOAT_1,i.rectAreaLTC2=Te.LTC_FLOAT_2):(i.rectAreaLTC1=Te.LTC_HALF_1,i.rectAreaLTC2=Te.LTC_HALF_2)),i.ambient[0]=c,i.ambient[1]=d,i.ambient[2]=f;const y=i.hash;(y.directionalLength!==p||y.pointLength!==m||y.spotLength!==_||y.rectAreaLength!==g||y.hemiLength!==h||y.numDirectionalShadows!==v||y.numPointShadows!==S||y.numSpotShadows!==M||y.numSpotMaps!==T||y.numLightProbes!==w)&&(i.directional.length=p,i.spot.length=_,i.rectArea.length=g,i.point.length=m,i.hemi.length=h,i.directionalShadow.length=v,i.directionalShadowMap.length=v,i.pointShadow.length=S,i.pointShadowMap.length=S,i.spotShadow.length=M,i.spotShadowMap.length=M,i.directionalShadowMatrix.length=v,i.pointShadowMatrix.length=S,i.spotLightMatrix.length=M+T-b,i.spotLightMap.length=T,i.numSpotLightShadowsWithMaps=b,i.numLightProbes=w,y.directionalLength=p,y.pointLength=m,y.spotLength=_,y.rectAreaLength=g,y.hemiLength=h,y.numDirectionalShadows=v,y.numPointShadows=S,y.numSpotShadows=M,y.numSpotMaps=T,y.numLightProbes=w,i.version=SC++)}function l(u,c){let d=0,f=0,p=0,m=0,_=0;const g=c.matrixWorldInverse;for(let h=0,v=u.length;h<v;h++){const S=u[h];if(S.isDirectionalLight){const M=i.directional[d];M.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(g),d++}else if(S.isSpotLight){const M=i.spot[p];M.position.setFromMatrixPosition(S.matrixWorld),M.position.applyMatrix4(g),M.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(g),p++}else if(S.isRectAreaLight){const M=i.rectArea[m];M.position.setFromMatrixPosition(S.matrixWorld),M.position.applyMatrix4(g),o.identity(),s.copy(S.matrixWorld),s.premultiply(g),o.extractRotation(s),M.halfWidth.set(S.width*.5,0,0),M.halfHeight.set(0,S.height*.5,0),M.halfWidth.applyMatrix4(o),M.halfHeight.applyMatrix4(o),m++}else if(S.isPointLight){const M=i.point[f];M.position.setFromMatrixPosition(S.matrixWorld),M.position.applyMatrix4(g),f++}else if(S.isHemisphereLight){const M=i.hemi[_];M.direction.setFromMatrixPosition(S.matrixWorld),M.direction.transformDirection(g),_++}}}return{setup:a,setupView:l,state:i}}function Mg(t){const e=new MC(t),n=[],i=[],r=[];function s(f){d.camera=f,n.length=0,i.length=0,r.length=0}function o(f){n.push(f)}function a(f){i.push(f)}function l(f){r.push(f)}function u(){e.setup(n)}function c(f){e.setupView(n,f)}const d={lightsArray:n,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:d,setupLights:u,setupLightsView:c,pushLight:o,pushShadow:a,pushLightProbeGrid:l}}function EC(t){let e=new WeakMap;function n(r,s=0){const o=e.get(r);let a;return o===void 0?(a=new Mg(t),e.set(r,[a])):s>=o.length?(a=new Mg(t),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:n,dispose:i}}const TC=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,bC=`uniform sampler2D shadow_pass;
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
}`,wC=[new B(1,0,0),new B(-1,0,0),new B(0,1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1)],xC=[new B(0,-1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1),new B(0,-1,0),new B(0,-1,0)],Eg=new Et,Eo=new B,lf=new B;function AC(t,e,n){let i=new _p;const r=new Le,s=new Le,o=new Rt,a=new OT,l=new kT,u={},c=n.maxTextureSize,d={[_i]:Sn,[Sn]:_i,[fi]:fi},f=new Vn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Le},radius:{value:4}},vertexShader:TC,fragmentShader:bC}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const m=new on;m.setAttribute("position",new Bn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new It(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ol;let h=this.type;this.render=function(b,w,y){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||b.length===0)return;this.type===$2&&(ze("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Ol);const C=t.getRenderTarget(),R=t.getActiveCubeFace(),N=t.getActiveMipmapLevel(),I=t.state;I.setBlending(Di),I.buffers.depth.getReversed()===!0?I.buffers.color.setClear(0,0,0,0):I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const F=h!==this.type;F&&w.traverse(function(z){z.material&&(Array.isArray(z.material)?z.material.forEach(D=>D.needsUpdate=!0):z.material.needsUpdate=!0)});for(let z=0,D=b.length;z<D;z++){const G=b[z],H=G.shadow;if(H===void 0){ze("WebGLShadowMap:",G,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;r.copy(H.mapSize);const U=H.getFrameExtents();r.multiply(U),s.copy(H.mapSize),(r.x>c||r.y>c)&&(r.x>c&&(s.x=Math.floor(c/U.x),r.x=s.x*U.x,H.mapSize.x=s.x),r.y>c&&(s.y=Math.floor(c/U.y),r.y=s.y*U.y,H.mapSize.y=s.y));const X=t.state.buffers.depth.getReversed();if(H.camera._reversedDepth=X,H.map===null||F===!0){if(H.map!==null&&(H.map.depthTexture!==null&&(H.map.depthTexture.dispose(),H.map.depthTexture=null),H.map.dispose()),this.type===Ro){if(G.isPointLight){ze("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}H.map=new vi(r.x,r.y,{format:Zr,type:zi,minFilter:nn,magFilter:nn,generateMipmaps:!1}),H.map.texture.name=G.name+".shadowMap",H.map.depthTexture=new Ks(r.x,r.y,di),H.map.depthTexture.name=G.name+".shadowMapDepth",H.map.depthTexture.format=Gi,H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=$t,H.map.depthTexture.magFilter=$t}else G.isPointLight?(H.map=new PS(r.x),H.map.depthTexture=new QE(r.x,Si)):(H.map=new vi(r.x,r.y),H.map.depthTexture=new Ks(r.x,r.y,Si)),H.map.depthTexture.name=G.name+".shadowMap",H.map.depthTexture.format=Gi,this.type===Ol?(H.map.depthTexture.compareFunction=X?pp:hp,H.map.depthTexture.minFilter=nn,H.map.depthTexture.magFilter=nn):(H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=$t,H.map.depthTexture.magFilter=$t);H.camera.updateProjectionMatrix()}const J=H.map.isWebGLCubeRenderTarget?6:1;for(let se=0;se<J;se++){if(H.map.isWebGLCubeRenderTarget)t.setRenderTarget(H.map,se),t.clear();else{se===0&&(t.setRenderTarget(H.map),t.clear());const ye=H.getViewport(se);o.set(s.x*ye.x,s.y*ye.y,s.x*ye.z,s.y*ye.w),I.viewport(o)}if(G.isPointLight){const ye=H.camera,Ge=H.matrix,He=G.distance||ye.far;He!==ye.far&&(ye.far=He,ye.updateProjectionMatrix()),Eo.setFromMatrixPosition(G.matrixWorld),ye.position.copy(Eo),lf.copy(ye.position),lf.add(wC[se]),ye.up.copy(xC[se]),ye.lookAt(lf),ye.updateMatrixWorld(),Ge.makeTranslation(-Eo.x,-Eo.y,-Eo.z),Eg.multiplyMatrices(ye.projectionMatrix,ye.matrixWorldInverse),H._frustum.setFromProjectionMatrix(Eg,ye.coordinateSystem,ye.reversedDepth)}else H.updateMatrices(G);i=H.getFrustum(),M(w,y,H.camera,G,this.type)}H.isPointLightShadow!==!0&&this.type===Ro&&v(H,y),H.needsUpdate=!1}h=this.type,g.needsUpdate=!1,t.setRenderTarget(C,R,N)};function v(b,w){const y=e.update(_);f.defines.VSM_SAMPLES!==b.blurSamples&&(f.defines.VSM_SAMPLES=b.blurSamples,p.defines.VSM_SAMPLES=b.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new vi(r.x,r.y,{format:Zr,type:zi})),f.uniforms.shadow_pass.value=b.map.depthTexture,f.uniforms.resolution.value=b.mapSize,f.uniforms.radius.value=b.radius,t.setRenderTarget(b.mapPass),t.clear(),t.renderBufferDirect(w,null,y,f,_,null),p.uniforms.shadow_pass.value=b.mapPass.texture,p.uniforms.resolution.value=b.mapSize,p.uniforms.radius.value=b.radius,t.setRenderTarget(b.map),t.clear(),t.renderBufferDirect(w,null,y,p,_,null)}function S(b,w,y,C){let R=null;const N=y.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(N!==void 0)R=N;else if(R=y.isPointLight===!0?l:a,t.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0||w.alphaToCoverage===!0){const I=R.uuid,F=w.uuid;let z=u[I];z===void 0&&(z={},u[I]=z);let D=z[F];D===void 0&&(D=R.clone(),z[F]=D,w.addEventListener("dispose",T)),R=D}if(R.visible=w.visible,R.wireframe=w.wireframe,C===Ro?R.side=w.shadowSide!==null?w.shadowSide:w.side:R.side=w.shadowSide!==null?w.shadowSide:d[w.side],R.alphaMap=w.alphaMap,R.alphaTest=w.alphaToCoverage===!0?.5:w.alphaTest,R.map=w.map,R.clipShadows=w.clipShadows,R.clippingPlanes=w.clippingPlanes,R.clipIntersection=w.clipIntersection,R.displacementMap=w.displacementMap,R.displacementScale=w.displacementScale,R.displacementBias=w.displacementBias,R.wireframeLinewidth=w.wireframeLinewidth,R.linewidth=w.linewidth,y.isPointLight===!0&&R.isMeshDistanceMaterial===!0){const I=t.properties.get(R);I.light=y}return R}function M(b,w,y,C,R){if(b.visible===!1)return;if(b.layers.test(w.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&R===Ro)&&(!b.frustumCulled||i.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,b.matrixWorld);const F=e.update(b),z=b.material;if(Array.isArray(z)){const D=F.groups;for(let G=0,H=D.length;G<H;G++){const U=D[G],X=z[U.materialIndex];if(X&&X.visible){const J=S(b,X,C,R);b.onBeforeShadow(t,b,w,y,F,J,U),t.renderBufferDirect(y,null,F,J,b,U),b.onAfterShadow(t,b,w,y,F,J,U)}}}else if(z.visible){const D=S(b,z,C,R);b.onBeforeShadow(t,b,w,y,F,D,null),t.renderBufferDirect(y,null,F,D,b,null),b.onAfterShadow(t,b,w,y,F,D,null)}}const I=b.children;for(let F=0,z=I.length;F<z;F++)M(I[F],w,y,C,R)}function T(b){b.target.removeEventListener("dispose",T);for(const y in u){const C=u[y],R=b.target.uuid;R in C&&(C[R].dispose(),delete C[R])}}}function CC(t,e){function n(){let k=!1;const pe=new Rt;let ie=null;const we=new Rt(0,0,0,0);return{setMask:function(Se){ie!==Se&&!k&&(t.colorMask(Se,Se,Se,Se),ie=Se)},setLocked:function(Se){k=Se},setClear:function(Se,le,Ie,$e,Pt){Pt===!0&&(Se*=$e,le*=$e,Ie*=$e),pe.set(Se,le,Ie,$e),we.equals(pe)===!1&&(t.clearColor(Se,le,Ie,$e),we.copy(pe))},reset:function(){k=!1,ie=null,we.set(-1,0,0,0)}}}function i(){let k=!1,pe=!1,ie=null,we=null,Se=null;return{setReversed:function(le){if(pe!==le){const Ie=e.get("EXT_clip_control");le?Ie.clipControlEXT(Ie.LOWER_LEFT_EXT,Ie.ZERO_TO_ONE_EXT):Ie.clipControlEXT(Ie.LOWER_LEFT_EXT,Ie.NEGATIVE_ONE_TO_ONE_EXT),pe=le;const $e=Se;Se=null,this.setClear($e)}},getReversed:function(){return pe},setTest:function(le){le?de(t.DEPTH_TEST):Pe(t.DEPTH_TEST)},setMask:function(le){ie!==le&&!k&&(t.depthMask(le),ie=le)},setFunc:function(le){if(pe&&(le=xE[le]),we!==le){switch(le){case ld:t.depthFunc(t.NEVER);break;case ud:t.depthFunc(t.ALWAYS);break;case cd:t.depthFunc(t.LESS);break;case Ys:t.depthFunc(t.LEQUAL);break;case fd:t.depthFunc(t.EQUAL);break;case dd:t.depthFunc(t.GEQUAL);break;case hd:t.depthFunc(t.GREATER);break;case pd:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}we=le}},setLocked:function(le){k=le},setClear:function(le){Se!==le&&(Se=le,pe&&(le=1-le),t.clearDepth(le))},reset:function(){k=!1,ie=null,we=null,Se=null,pe=!1}}}function r(){let k=!1,pe=null,ie=null,we=null,Se=null,le=null,Ie=null,$e=null,Pt=null;return{setTest:function(dt){k||(dt?de(t.STENCIL_TEST):Pe(t.STENCIL_TEST))},setMask:function(dt){pe!==dt&&!k&&(t.stencilMask(dt),pe=dt)},setFunc:function(dt,Ei,ni){(ie!==dt||we!==Ei||Se!==ni)&&(t.stencilFunc(dt,Ei,ni),ie=dt,we=Ei,Se=ni)},setOp:function(dt,Ei,ni){(le!==dt||Ie!==Ei||$e!==ni)&&(t.stencilOp(dt,Ei,ni),le=dt,Ie=Ei,$e=ni)},setLocked:function(dt){k=dt},setClear:function(dt){Pt!==dt&&(t.clearStencil(dt),Pt=dt)},reset:function(){k=!1,pe=null,ie=null,we=null,Se=null,le=null,Ie=null,$e=null,Pt=null}}}const s=new n,o=new i,a=new r,l=new WeakMap,u=new WeakMap;let c={},d={},f={},p=new WeakMap,m=[],_=null,g=!1,h=null,v=null,S=null,M=null,T=null,b=null,w=null,y=new Ke(0,0,0),C=0,R=!1,N=null,I=null,F=null,z=null,D=null;const G=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let H=!1,U=0;const X=t.getParameter(t.VERSION);X.indexOf("WebGL")!==-1?(U=parseFloat(/^WebGL (\d)/.exec(X)[1]),H=U>=1):X.indexOf("OpenGL ES")!==-1&&(U=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),H=U>=2);let J=null,se={};const ye=t.getParameter(t.SCISSOR_BOX),Ge=t.getParameter(t.VIEWPORT),He=new Rt().fromArray(ye),Ue=new Rt().fromArray(Ge);function te(k,pe,ie,we){const Se=new Uint8Array(4),le=t.createTexture();t.bindTexture(k,le),t.texParameteri(k,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(k,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let Ie=0;Ie<ie;Ie++)k===t.TEXTURE_3D||k===t.TEXTURE_2D_ARRAY?t.texImage3D(pe,0,t.RGBA,1,1,we,0,t.RGBA,t.UNSIGNED_BYTE,Se):t.texImage2D(pe+Ie,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,Se);return le}const me={};me[t.TEXTURE_2D]=te(t.TEXTURE_2D,t.TEXTURE_2D,1),me[t.TEXTURE_CUBE_MAP]=te(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),me[t.TEXTURE_2D_ARRAY]=te(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),me[t.TEXTURE_3D]=te(t.TEXTURE_3D,t.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),de(t.DEPTH_TEST),o.setFunc(Ys),lt(!1),tt(fm),de(t.CULL_FACE),ut(Di);function de(k){c[k]!==!0&&(t.enable(k),c[k]=!0)}function Pe(k){c[k]!==!1&&(t.disable(k),c[k]=!1)}function ke(k,pe){return f[k]!==pe?(t.bindFramebuffer(k,pe),f[k]=pe,k===t.DRAW_FRAMEBUFFER&&(f[t.FRAMEBUFFER]=pe),k===t.FRAMEBUFFER&&(f[t.DRAW_FRAMEBUFFER]=pe),!0):!1}function Fe(k,pe){let ie=m,we=!1;if(k){ie=p.get(pe),ie===void 0&&(ie=[],p.set(pe,ie));const Se=k.textures;if(ie.length!==Se.length||ie[0]!==t.COLOR_ATTACHMENT0){for(let le=0,Ie=Se.length;le<Ie;le++)ie[le]=t.COLOR_ATTACHMENT0+le;ie.length=Se.length,we=!0}}else ie[0]!==t.BACK&&(ie[0]=t.BACK,we=!0);we&&t.drawBuffers(ie)}function it(k){return _!==k?(t.useProgram(k),_=k,!0):!1}const Xe={[Dr]:t.FUNC_ADD,[q2]:t.FUNC_SUBTRACT,[K2]:t.FUNC_REVERSE_SUBTRACT};Xe[Z2]=t.MIN,Xe[J2]=t.MAX;const et={[Q2]:t.ZERO,[eE]:t.ONE,[tE]:t.SRC_COLOR,[od]:t.SRC_ALPHA,[aE]:t.SRC_ALPHA_SATURATE,[sE]:t.DST_COLOR,[iE]:t.DST_ALPHA,[nE]:t.ONE_MINUS_SRC_COLOR,[ad]:t.ONE_MINUS_SRC_ALPHA,[oE]:t.ONE_MINUS_DST_COLOR,[rE]:t.ONE_MINUS_DST_ALPHA,[lE]:t.CONSTANT_COLOR,[uE]:t.ONE_MINUS_CONSTANT_COLOR,[cE]:t.CONSTANT_ALPHA,[fE]:t.ONE_MINUS_CONSTANT_ALPHA};function ut(k,pe,ie,we,Se,le,Ie,$e,Pt,dt){if(k===Di){g===!0&&(Pe(t.BLEND),g=!1);return}if(g===!1&&(de(t.BLEND),g=!0),k!==Y2){if(k!==h||dt!==R){if((v!==Dr||T!==Dr)&&(t.blendEquation(t.FUNC_ADD),v=Dr,T=Dr),dt)switch(k){case Wr:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case vu:t.blendFunc(t.ONE,t.ONE);break;case dm:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case hm:t.blendFuncSeparate(t.DST_COLOR,t.ONE_MINUS_SRC_ALPHA,t.ZERO,t.ONE);break;default:ot("WebGLState: Invalid blending: ",k);break}else switch(k){case Wr:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case vu:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE,t.ONE,t.ONE);break;case dm:ot("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case hm:ot("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:ot("WebGLState: Invalid blending: ",k);break}S=null,M=null,b=null,w=null,y.set(0,0,0),C=0,h=k,R=dt}return}Se=Se||pe,le=le||ie,Ie=Ie||we,(pe!==v||Se!==T)&&(t.blendEquationSeparate(Xe[pe],Xe[Se]),v=pe,T=Se),(ie!==S||we!==M||le!==b||Ie!==w)&&(t.blendFuncSeparate(et[ie],et[we],et[le],et[Ie]),S=ie,M=we,b=le,w=Ie),($e.equals(y)===!1||Pt!==C)&&(t.blendColor($e.r,$e.g,$e.b,Pt),y.copy($e),C=Pt),h=k,R=!1}function he(k,pe){k.side===fi?Pe(t.CULL_FACE):de(t.CULL_FACE);let ie=k.side===Sn;pe&&(ie=!ie),lt(ie),k.blending===Wr&&k.transparent===!1?ut(Di):ut(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),o.setFunc(k.depthFunc),o.setTest(k.depthTest),o.setMask(k.depthWrite),s.setMask(k.colorWrite);const we=k.stencilWrite;a.setTest(we),we&&(a.setMask(k.stencilWriteMask),a.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),a.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),O(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?de(t.SAMPLE_ALPHA_TO_COVERAGE):Pe(t.SAMPLE_ALPHA_TO_COVERAGE)}function lt(k){N!==k&&(k?t.frontFace(t.CW):t.frontFace(t.CCW),N=k)}function tt(k){k!==X2?(de(t.CULL_FACE),k!==I&&(k===fm?t.cullFace(t.BACK):k===j2?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):Pe(t.CULL_FACE),I=k}function We(k){k!==F&&(H&&t.lineWidth(k),F=k)}function O(k,pe,ie){k?(de(t.POLYGON_OFFSET_FILL),(z!==pe||D!==ie)&&(z=pe,D=ie,o.getReversed()&&(pe=-pe),t.polygonOffset(pe,ie))):Pe(t.POLYGON_OFFSET_FILL)}function Be(k){k?de(t.SCISSOR_TEST):Pe(t.SCISSOR_TEST)}function q(k){k===void 0&&(k=t.TEXTURE0+G-1),J!==k&&(t.activeTexture(k),J=k)}function ve(k,pe,ie){ie===void 0&&(J===null?ie=t.TEXTURE0+G-1:ie=J);let we=se[ie];we===void 0&&(we={type:void 0,texture:void 0},se[ie]=we),(we.type!==k||we.texture!==pe)&&(J!==ie&&(t.activeTexture(ie),J=ie),t.bindTexture(k,pe||me[k]),we.type=k,we.texture=pe)}function K(){const k=se[J];k!==void 0&&k.type!==void 0&&(t.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function ue(){try{t.compressedTexImage2D(...arguments)}catch(k){ot("WebGLState:",k)}}function x(){try{t.compressedTexImage3D(...arguments)}catch(k){ot("WebGLState:",k)}}function E(){try{t.texSubImage2D(...arguments)}catch(k){ot("WebGLState:",k)}}function L(){try{t.texSubImage3D(...arguments)}catch(k){ot("WebGLState:",k)}}function j(){try{t.compressedTexSubImage2D(...arguments)}catch(k){ot("WebGLState:",k)}}function ne(){try{t.compressedTexSubImage3D(...arguments)}catch(k){ot("WebGLState:",k)}}function ce(){try{t.texStorage2D(...arguments)}catch(k){ot("WebGLState:",k)}}function ge(){try{t.texStorage3D(...arguments)}catch(k){ot("WebGLState:",k)}}function Q(){try{t.texImage2D(...arguments)}catch(k){ot("WebGLState:",k)}}function ee(){try{t.texImage3D(...arguments)}catch(k){ot("WebGLState:",k)}}function _e(k){return d[k]!==void 0?d[k]:t.getParameter(k)}function Ee(k,pe){d[k]!==pe&&(t.pixelStorei(k,pe),d[k]=pe)}function re(k){He.equals(k)===!1&&(t.scissor(k.x,k.y,k.z,k.w),He.copy(k))}function oe(k){Ue.equals(k)===!1&&(t.viewport(k.x,k.y,k.z,k.w),Ue.copy(k))}function ae(k,pe){let ie=u.get(pe);ie===void 0&&(ie=new WeakMap,u.set(pe,ie));let we=ie.get(k);we===void 0&&(we=t.getUniformBlockIndex(pe,k.name),ie.set(k,we))}function Me(k,pe){const we=u.get(pe).get(k);l.get(pe)!==we&&(t.uniformBlockBinding(pe,we,k.__bindingPointIndex),l.set(pe,we))}function Ve(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),o.setReversed(!1),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),t.pixelStorei(t.PACK_ALIGNMENT,4),t.pixelStorei(t.UNPACK_ALIGNMENT,4),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,t.BROWSER_DEFAULT_WEBGL),t.pixelStorei(t.PACK_ROW_LENGTH,0),t.pixelStorei(t.PACK_SKIP_PIXELS,0),t.pixelStorei(t.PACK_SKIP_ROWS,0),t.pixelStorei(t.UNPACK_ROW_LENGTH,0),t.pixelStorei(t.UNPACK_IMAGE_HEIGHT,0),t.pixelStorei(t.UNPACK_SKIP_PIXELS,0),t.pixelStorei(t.UNPACK_SKIP_ROWS,0),t.pixelStorei(t.UNPACK_SKIP_IMAGES,0),c={},d={},J=null,se={},f={},p=new WeakMap,m=[],_=null,g=!1,h=null,v=null,S=null,M=null,T=null,b=null,w=null,y=new Ke(0,0,0),C=0,R=!1,N=null,I=null,F=null,z=null,D=null,He.set(0,0,t.canvas.width,t.canvas.height),Ue.set(0,0,t.canvas.width,t.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:de,disable:Pe,bindFramebuffer:ke,drawBuffers:Fe,useProgram:it,setBlending:ut,setMaterial:he,setFlipSided:lt,setCullFace:tt,setLineWidth:We,setPolygonOffset:O,setScissorTest:Be,activeTexture:q,bindTexture:ve,unbindTexture:K,compressedTexImage2D:ue,compressedTexImage3D:x,texImage2D:Q,texImage3D:ee,pixelStorei:Ee,getParameter:_e,updateUBOMapping:ae,uniformBlockBinding:Me,texStorage2D:ce,texStorage3D:ge,texSubImage2D:E,texSubImage3D:L,compressedTexSubImage2D:j,compressedTexSubImage3D:ne,scissor:re,viewport:oe,reset:Ve}}function RC(t,e,n,i,r,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new Le,c=new WeakMap,d=new Set;let f;const p=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(x,E){return m?new OffscreenCanvas(x,E):Eu("canvas")}function g(x,E,L){let j=1;const ne=ue(x);if((ne.width>L||ne.height>L)&&(j=L/Math.max(ne.width,ne.height)),j<1)if(typeof HTMLImageElement<"u"&&x instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&x instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&x instanceof ImageBitmap||typeof VideoFrame<"u"&&x instanceof VideoFrame){const ce=Math.floor(j*ne.width),ge=Math.floor(j*ne.height);f===void 0&&(f=_(ce,ge));const Q=E?_(ce,ge):f;return Q.width=ce,Q.height=ge,Q.getContext("2d").drawImage(x,0,0,ce,ge),ze("WebGLRenderer: Texture has been resized from ("+ne.width+"x"+ne.height+") to ("+ce+"x"+ge+")."),Q}else return"data"in x&&ze("WebGLRenderer: Image in DataTexture is too big ("+ne.width+"x"+ne.height+")."),x;return x}function h(x){return x.generateMipmaps}function v(x){t.generateMipmap(x)}function S(x){return x.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:x.isWebGL3DRenderTarget?t.TEXTURE_3D:x.isWebGLArrayRenderTarget||x.isCompressedArrayTexture?t.TEXTURE_2D_ARRAY:t.TEXTURE_2D}function M(x,E,L,j,ne,ce=!1){if(x!==null){if(t[x]!==void 0)return t[x];ze("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+x+"'")}let ge;j&&(ge=e.get("EXT_texture_norm16"),ge||ze("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Q=E;if(E===t.RED&&(L===t.FLOAT&&(Q=t.R32F),L===t.HALF_FLOAT&&(Q=t.R16F),L===t.UNSIGNED_BYTE&&(Q=t.R8),L===t.UNSIGNED_SHORT&&ge&&(Q=ge.R16_EXT),L===t.SHORT&&ge&&(Q=ge.R16_SNORM_EXT)),E===t.RED_INTEGER&&(L===t.UNSIGNED_BYTE&&(Q=t.R8UI),L===t.UNSIGNED_SHORT&&(Q=t.R16UI),L===t.UNSIGNED_INT&&(Q=t.R32UI),L===t.BYTE&&(Q=t.R8I),L===t.SHORT&&(Q=t.R16I),L===t.INT&&(Q=t.R32I)),E===t.RG&&(L===t.FLOAT&&(Q=t.RG32F),L===t.HALF_FLOAT&&(Q=t.RG16F),L===t.UNSIGNED_BYTE&&(Q=t.RG8),L===t.UNSIGNED_SHORT&&ge&&(Q=ge.RG16_EXT),L===t.SHORT&&ge&&(Q=ge.RG16_SNORM_EXT)),E===t.RG_INTEGER&&(L===t.UNSIGNED_BYTE&&(Q=t.RG8UI),L===t.UNSIGNED_SHORT&&(Q=t.RG16UI),L===t.UNSIGNED_INT&&(Q=t.RG32UI),L===t.BYTE&&(Q=t.RG8I),L===t.SHORT&&(Q=t.RG16I),L===t.INT&&(Q=t.RG32I)),E===t.RGB_INTEGER&&(L===t.UNSIGNED_BYTE&&(Q=t.RGB8UI),L===t.UNSIGNED_SHORT&&(Q=t.RGB16UI),L===t.UNSIGNED_INT&&(Q=t.RGB32UI),L===t.BYTE&&(Q=t.RGB8I),L===t.SHORT&&(Q=t.RGB16I),L===t.INT&&(Q=t.RGB32I)),E===t.RGBA_INTEGER&&(L===t.UNSIGNED_BYTE&&(Q=t.RGBA8UI),L===t.UNSIGNED_SHORT&&(Q=t.RGBA16UI),L===t.UNSIGNED_INT&&(Q=t.RGBA32UI),L===t.BYTE&&(Q=t.RGBA8I),L===t.SHORT&&(Q=t.RGBA16I),L===t.INT&&(Q=t.RGBA32I)),E===t.RGB&&(L===t.UNSIGNED_SHORT&&ge&&(Q=ge.RGB16_EXT),L===t.SHORT&&ge&&(Q=ge.RGB16_SNORM_EXT),L===t.UNSIGNED_INT_5_9_9_9_REV&&(Q=t.RGB9_E5),L===t.UNSIGNED_INT_10F_11F_11F_REV&&(Q=t.R11F_G11F_B10F)),E===t.RGBA){const ee=ce?Mu:nt.getTransfer(ne);L===t.FLOAT&&(Q=t.RGBA32F),L===t.HALF_FLOAT&&(Q=t.RGBA16F),L===t.UNSIGNED_BYTE&&(Q=ee===ct?t.SRGB8_ALPHA8:t.RGBA8),L===t.UNSIGNED_SHORT&&ge&&(Q=ge.RGBA16_EXT),L===t.SHORT&&ge&&(Q=ge.RGBA16_SNORM_EXT),L===t.UNSIGNED_SHORT_4_4_4_4&&(Q=t.RGBA4),L===t.UNSIGNED_SHORT_5_5_5_1&&(Q=t.RGB5_A1)}return(Q===t.R16F||Q===t.R32F||Q===t.RG16F||Q===t.RG32F||Q===t.RGBA16F||Q===t.RGBA32F)&&e.get("EXT_color_buffer_float"),Q}function T(x,E){let L;return x?E===null||E===Si||E===ca?L=t.DEPTH24_STENCIL8:E===di?L=t.DEPTH32F_STENCIL8:E===ua&&(L=t.DEPTH24_STENCIL8,ze("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===Si||E===ca?L=t.DEPTH_COMPONENT24:E===di?L=t.DEPTH_COMPONENT32F:E===ua&&(L=t.DEPTH_COMPONENT16),L}function b(x,E){return h(x)===!0||x.isFramebufferTexture&&x.minFilter!==$t&&x.minFilter!==nn?Math.log2(Math.max(E.width,E.height))+1:x.mipmaps!==void 0&&x.mipmaps.length>0?x.mipmaps.length:x.isCompressedTexture&&Array.isArray(x.image)?E.mipmaps.length:1}function w(x){const E=x.target;E.removeEventListener("dispose",w),C(E),E.isVideoTexture&&c.delete(E),E.isHTMLTexture&&d.delete(E)}function y(x){const E=x.target;E.removeEventListener("dispose",y),N(E)}function C(x){const E=i.get(x);if(E.__webglInit===void 0)return;const L=x.source,j=p.get(L);if(j){const ne=j[E.__cacheKey];ne.usedTimes--,ne.usedTimes===0&&R(x),Object.keys(j).length===0&&p.delete(L)}i.remove(x)}function R(x){const E=i.get(x);t.deleteTexture(E.__webglTexture);const L=x.source,j=p.get(L);delete j[E.__cacheKey],o.memory.textures--}function N(x){const E=i.get(x);if(x.depthTexture&&(x.depthTexture.dispose(),i.remove(x.depthTexture)),x.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(E.__webglFramebuffer[j]))for(let ne=0;ne<E.__webglFramebuffer[j].length;ne++)t.deleteFramebuffer(E.__webglFramebuffer[j][ne]);else t.deleteFramebuffer(E.__webglFramebuffer[j]);E.__webglDepthbuffer&&t.deleteRenderbuffer(E.__webglDepthbuffer[j])}else{if(Array.isArray(E.__webglFramebuffer))for(let j=0;j<E.__webglFramebuffer.length;j++)t.deleteFramebuffer(E.__webglFramebuffer[j]);else t.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&t.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&t.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let j=0;j<E.__webglColorRenderbuffer.length;j++)E.__webglColorRenderbuffer[j]&&t.deleteRenderbuffer(E.__webglColorRenderbuffer[j]);E.__webglDepthRenderbuffer&&t.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const L=x.textures;for(let j=0,ne=L.length;j<ne;j++){const ce=i.get(L[j]);ce.__webglTexture&&(t.deleteTexture(ce.__webglTexture),o.memory.textures--),i.remove(L[j])}i.remove(x)}let I=0;function F(){I=0}function z(){return I}function D(x){I=x}function G(){const x=I;return x>=r.maxTextures&&ze("WebGLTextures: Trying to use "+x+" texture units while this GPU supports only "+r.maxTextures),I+=1,x}function H(x){const E=[];return E.push(x.wrapS),E.push(x.wrapT),E.push(x.wrapR||0),E.push(x.magFilter),E.push(x.minFilter),E.push(x.anisotropy),E.push(x.internalFormat),E.push(x.format),E.push(x.type),E.push(x.generateMipmaps),E.push(x.premultiplyAlpha),E.push(x.flipY),E.push(x.unpackAlignment),E.push(x.colorSpace),E.join()}function U(x,E){const L=i.get(x);if(x.isVideoTexture&&ve(x),x.isRenderTargetTexture===!1&&x.isExternalTexture!==!0&&x.version>0&&L.__version!==x.version){const j=x.image;if(j===null)ze("WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)ze("WebGLRenderer: Texture marked for update but image is incomplete");else{Pe(L,x,E);return}}else x.isExternalTexture&&(L.__webglTexture=x.sourceTexture?x.sourceTexture:null);n.bindTexture(t.TEXTURE_2D,L.__webglTexture,t.TEXTURE0+E)}function X(x,E){const L=i.get(x);if(x.isRenderTargetTexture===!1&&x.version>0&&L.__version!==x.version){Pe(L,x,E);return}else x.isExternalTexture&&(L.__webglTexture=x.sourceTexture?x.sourceTexture:null);n.bindTexture(t.TEXTURE_2D_ARRAY,L.__webglTexture,t.TEXTURE0+E)}function J(x,E){const L=i.get(x);if(x.isRenderTargetTexture===!1&&x.version>0&&L.__version!==x.version){Pe(L,x,E);return}n.bindTexture(t.TEXTURE_3D,L.__webglTexture,t.TEXTURE0+E)}function se(x,E){const L=i.get(x);if(x.isCubeDepthTexture!==!0&&x.version>0&&L.__version!==x.version){ke(L,x,E);return}n.bindTexture(t.TEXTURE_CUBE_MAP,L.__webglTexture,t.TEXTURE0+E)}const ye={[md]:t.REPEAT,[Li]:t.CLAMP_TO_EDGE,[gd]:t.MIRRORED_REPEAT},Ge={[$t]:t.NEAREST,[pE]:t.NEAREST_MIPMAP_NEAREST,[Xa]:t.NEAREST_MIPMAP_LINEAR,[nn]:t.LINEAR,[xc]:t.LINEAR_MIPMAP_NEAREST,[zr]:t.LINEAR_MIPMAP_LINEAR},He={[vE]:t.NEVER,[EE]:t.ALWAYS,[_E]:t.LESS,[hp]:t.LEQUAL,[SE]:t.EQUAL,[pp]:t.GEQUAL,[yE]:t.GREATER,[ME]:t.NOTEQUAL};function Ue(x,E){if(E.type===di&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===nn||E.magFilter===xc||E.magFilter===Xa||E.magFilter===zr||E.minFilter===nn||E.minFilter===xc||E.minFilter===Xa||E.minFilter===zr)&&ze("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(x,t.TEXTURE_WRAP_S,ye[E.wrapS]),t.texParameteri(x,t.TEXTURE_WRAP_T,ye[E.wrapT]),(x===t.TEXTURE_3D||x===t.TEXTURE_2D_ARRAY)&&t.texParameteri(x,t.TEXTURE_WRAP_R,ye[E.wrapR]),t.texParameteri(x,t.TEXTURE_MAG_FILTER,Ge[E.magFilter]),t.texParameteri(x,t.TEXTURE_MIN_FILTER,Ge[E.minFilter]),E.compareFunction&&(t.texParameteri(x,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(x,t.TEXTURE_COMPARE_FUNC,He[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===$t||E.minFilter!==Xa&&E.minFilter!==zr||E.type===di&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||i.get(E).__currentAnisotropy){const L=e.get("EXT_texture_filter_anisotropic");t.texParameterf(x,L.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,r.getMaxAnisotropy())),i.get(E).__currentAnisotropy=E.anisotropy}}}function te(x,E){let L=!1;x.__webglInit===void 0&&(x.__webglInit=!0,E.addEventListener("dispose",w));const j=E.source;let ne=p.get(j);ne===void 0&&(ne={},p.set(j,ne));const ce=H(E);if(ce!==x.__cacheKey){ne[ce]===void 0&&(ne[ce]={texture:t.createTexture(),usedTimes:0},o.memory.textures++,L=!0),ne[ce].usedTimes++;const ge=ne[x.__cacheKey];ge!==void 0&&(ne[x.__cacheKey].usedTimes--,ge.usedTimes===0&&R(E)),x.__cacheKey=ce,x.__webglTexture=ne[ce].texture}return L}function me(x,E,L){return Math.floor(Math.floor(x/L)/E)}function de(x,E,L,j){const ce=x.updateRanges;if(ce.length===0)n.texSubImage2D(t.TEXTURE_2D,0,0,0,E.width,E.height,L,j,E.data);else{ce.sort((Ee,re)=>Ee.start-re.start);let ge=0;for(let Ee=1;Ee<ce.length;Ee++){const re=ce[ge],oe=ce[Ee],ae=re.start+re.count,Me=me(oe.start,E.width,4),Ve=me(re.start,E.width,4);oe.start<=ae+1&&Me===Ve&&me(oe.start+oe.count-1,E.width,4)===Me?re.count=Math.max(re.count,oe.start+oe.count-re.start):(++ge,ce[ge]=oe)}ce.length=ge+1;const Q=n.getParameter(t.UNPACK_ROW_LENGTH),ee=n.getParameter(t.UNPACK_SKIP_PIXELS),_e=n.getParameter(t.UNPACK_SKIP_ROWS);n.pixelStorei(t.UNPACK_ROW_LENGTH,E.width);for(let Ee=0,re=ce.length;Ee<re;Ee++){const oe=ce[Ee],ae=Math.floor(oe.start/4),Me=Math.ceil(oe.count/4),Ve=ae%E.width,k=Math.floor(ae/E.width),pe=Me,ie=1;n.pixelStorei(t.UNPACK_SKIP_PIXELS,Ve),n.pixelStorei(t.UNPACK_SKIP_ROWS,k),n.texSubImage2D(t.TEXTURE_2D,0,Ve,k,pe,ie,L,j,E.data)}x.clearUpdateRanges(),n.pixelStorei(t.UNPACK_ROW_LENGTH,Q),n.pixelStorei(t.UNPACK_SKIP_PIXELS,ee),n.pixelStorei(t.UNPACK_SKIP_ROWS,_e)}}function Pe(x,E,L){let j=t.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(j=t.TEXTURE_2D_ARRAY),E.isData3DTexture&&(j=t.TEXTURE_3D);const ne=te(x,E),ce=E.source;n.bindTexture(j,x.__webglTexture,t.TEXTURE0+L);const ge=i.get(ce);if(ce.version!==ge.__version||ne===!0){if(n.activeTexture(t.TEXTURE0+L),(typeof ImageBitmap<"u"&&E.image instanceof ImageBitmap)===!1){const ie=nt.getPrimaries(nt.workingColorSpace),we=E.colorSpace===sr?null:nt.getPrimaries(E.colorSpace),Se=E.colorSpace===sr||ie===we?t.NONE:t.BROWSER_DEFAULT_WEBGL;n.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,E.flipY),n.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),n.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Se)}n.pixelStorei(t.UNPACK_ALIGNMENT,E.unpackAlignment);let ee=g(E.image,!1,r.maxTextureSize);ee=K(E,ee);const _e=s.convert(E.format,E.colorSpace),Ee=s.convert(E.type);let re=M(E.internalFormat,_e,Ee,E.normalized,E.colorSpace,E.isVideoTexture);Ue(j,E);let oe;const ae=E.mipmaps,Me=E.isVideoTexture!==!0,Ve=ge.__version===void 0||ne===!0,k=ce.dataReady,pe=b(E,ee);if(E.isDepthTexture)re=T(E.format===Gr,E.type),Ve&&(Me?n.texStorage2D(t.TEXTURE_2D,1,re,ee.width,ee.height):n.texImage2D(t.TEXTURE_2D,0,re,ee.width,ee.height,0,_e,Ee,null));else if(E.isDataTexture)if(ae.length>0){Me&&Ve&&n.texStorage2D(t.TEXTURE_2D,pe,re,ae[0].width,ae[0].height);for(let ie=0,we=ae.length;ie<we;ie++)oe=ae[ie],Me?k&&n.texSubImage2D(t.TEXTURE_2D,ie,0,0,oe.width,oe.height,_e,Ee,oe.data):n.texImage2D(t.TEXTURE_2D,ie,re,oe.width,oe.height,0,_e,Ee,oe.data);E.generateMipmaps=!1}else Me?(Ve&&n.texStorage2D(t.TEXTURE_2D,pe,re,ee.width,ee.height),k&&de(E,ee,_e,Ee)):n.texImage2D(t.TEXTURE_2D,0,re,ee.width,ee.height,0,_e,Ee,ee.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){Me&&Ve&&n.texStorage3D(t.TEXTURE_2D_ARRAY,pe,re,ae[0].width,ae[0].height,ee.depth);for(let ie=0,we=ae.length;ie<we;ie++)if(oe=ae[ie],E.format!==Jn)if(_e!==null)if(Me){if(k)if(E.layerUpdates.size>0){const Se=Qm(oe.width,oe.height,E.format,E.type);for(const le of E.layerUpdates){const Ie=oe.data.subarray(le*Se/oe.data.BYTES_PER_ELEMENT,(le+1)*Se/oe.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,ie,0,0,le,oe.width,oe.height,1,_e,Ie)}E.clearLayerUpdates()}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,ie,0,0,0,oe.width,oe.height,ee.depth,_e,oe.data)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,ie,re,oe.width,oe.height,ee.depth,0,oe.data,0,0);else ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Me?k&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,ie,0,0,0,oe.width,oe.height,ee.depth,_e,Ee,oe.data):n.texImage3D(t.TEXTURE_2D_ARRAY,ie,re,oe.width,oe.height,ee.depth,0,_e,Ee,oe.data)}else{Me&&Ve&&n.texStorage2D(t.TEXTURE_2D,pe,re,ae[0].width,ae[0].height);for(let ie=0,we=ae.length;ie<we;ie++)oe=ae[ie],E.format!==Jn?_e!==null?Me?k&&n.compressedTexSubImage2D(t.TEXTURE_2D,ie,0,0,oe.width,oe.height,_e,oe.data):n.compressedTexImage2D(t.TEXTURE_2D,ie,re,oe.width,oe.height,0,oe.data):ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Me?k&&n.texSubImage2D(t.TEXTURE_2D,ie,0,0,oe.width,oe.height,_e,Ee,oe.data):n.texImage2D(t.TEXTURE_2D,ie,re,oe.width,oe.height,0,_e,Ee,oe.data)}else if(E.isDataArrayTexture)if(Me){if(Ve&&n.texStorage3D(t.TEXTURE_2D_ARRAY,pe,re,ee.width,ee.height,ee.depth),k)if(E.layerUpdates.size>0){const ie=Qm(ee.width,ee.height,E.format,E.type);for(const we of E.layerUpdates){const Se=ee.data.subarray(we*ie/ee.data.BYTES_PER_ELEMENT,(we+1)*ie/ee.data.BYTES_PER_ELEMENT);n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,we,ee.width,ee.height,1,_e,Ee,Se)}E.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,ee.width,ee.height,ee.depth,_e,Ee,ee.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,re,ee.width,ee.height,ee.depth,0,_e,Ee,ee.data);else if(E.isData3DTexture)Me?(Ve&&n.texStorage3D(t.TEXTURE_3D,pe,re,ee.width,ee.height,ee.depth),k&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,ee.width,ee.height,ee.depth,_e,Ee,ee.data)):n.texImage3D(t.TEXTURE_3D,0,re,ee.width,ee.height,ee.depth,0,_e,Ee,ee.data);else if(E.isFramebufferTexture){if(Ve)if(Me)n.texStorage2D(t.TEXTURE_2D,pe,re,ee.width,ee.height);else{let ie=ee.width,we=ee.height;for(let Se=0;Se<pe;Se++)n.texImage2D(t.TEXTURE_2D,Se,re,ie,we,0,_e,Ee,null),ie>>=1,we>>=1}}else if(E.isHTMLTexture){if("texElementImage2D"in t){const ie=t.canvas;if(ie.hasAttribute("layoutsubtree")||ie.setAttribute("layoutsubtree","true"),ee.parentNode!==ie){ie.appendChild(ee),d.add(E),ie.onpaint=$e=>{const Pt=$e.changedElements;for(const dt of d)Pt.includes(dt.image)&&(dt.needsUpdate=!0)},ie.requestPaint();return}const we=0,Se=t.RGBA,le=t.RGBA,Ie=t.UNSIGNED_BYTE;t.texElementImage2D(t.TEXTURE_2D,we,Se,le,Ie,ee),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE)}}else if(ae.length>0){if(Me&&Ve){const ie=ue(ae[0]);n.texStorage2D(t.TEXTURE_2D,pe,re,ie.width,ie.height)}for(let ie=0,we=ae.length;ie<we;ie++)oe=ae[ie],Me?k&&n.texSubImage2D(t.TEXTURE_2D,ie,0,0,_e,Ee,oe):n.texImage2D(t.TEXTURE_2D,ie,re,_e,Ee,oe);E.generateMipmaps=!1}else if(Me){if(Ve){const ie=ue(ee);n.texStorage2D(t.TEXTURE_2D,pe,re,ie.width,ie.height)}k&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,_e,Ee,ee)}else n.texImage2D(t.TEXTURE_2D,0,re,_e,Ee,ee);h(E)&&v(j),ge.__version=ce.version,E.onUpdate&&E.onUpdate(E)}x.__version=E.version}function ke(x,E,L){if(E.image.length!==6)return;const j=te(x,E),ne=E.source;n.bindTexture(t.TEXTURE_CUBE_MAP,x.__webglTexture,t.TEXTURE0+L);const ce=i.get(ne);if(ne.version!==ce.__version||j===!0){n.activeTexture(t.TEXTURE0+L);const ge=nt.getPrimaries(nt.workingColorSpace),Q=E.colorSpace===sr?null:nt.getPrimaries(E.colorSpace),ee=E.colorSpace===sr||ge===Q?t.NONE:t.BROWSER_DEFAULT_WEBGL;n.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,E.flipY),n.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),n.pixelStorei(t.UNPACK_ALIGNMENT,E.unpackAlignment),n.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,ee);const _e=E.isCompressedTexture||E.image[0].isCompressedTexture,Ee=E.image[0]&&E.image[0].isDataTexture,re=[];for(let le=0;le<6;le++)!_e&&!Ee?re[le]=g(E.image[le],!0,r.maxCubemapSize):re[le]=Ee?E.image[le].image:E.image[le],re[le]=K(E,re[le]);const oe=re[0],ae=s.convert(E.format,E.colorSpace),Me=s.convert(E.type),Ve=M(E.internalFormat,ae,Me,E.normalized,E.colorSpace),k=E.isVideoTexture!==!0,pe=ce.__version===void 0||j===!0,ie=ne.dataReady;let we=b(E,oe);Ue(t.TEXTURE_CUBE_MAP,E);let Se;if(_e){k&&pe&&n.texStorage2D(t.TEXTURE_CUBE_MAP,we,Ve,oe.width,oe.height);for(let le=0;le<6;le++){Se=re[le].mipmaps;for(let Ie=0;Ie<Se.length;Ie++){const $e=Se[Ie];E.format!==Jn?ae!==null?k?ie&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+le,Ie,0,0,$e.width,$e.height,ae,$e.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+le,Ie,Ve,$e.width,$e.height,0,$e.data):ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):k?ie&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+le,Ie,0,0,$e.width,$e.height,ae,Me,$e.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+le,Ie,Ve,$e.width,$e.height,0,ae,Me,$e.data)}}}else{if(Se=E.mipmaps,k&&pe){Se.length>0&&we++;const le=ue(re[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,we,Ve,le.width,le.height)}for(let le=0;le<6;le++)if(Ee){k?ie&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,0,0,re[le].width,re[le].height,ae,Me,re[le].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,Ve,re[le].width,re[le].height,0,ae,Me,re[le].data);for(let Ie=0;Ie<Se.length;Ie++){const Pt=Se[Ie].image[le].image;k?ie&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+le,Ie+1,0,0,Pt.width,Pt.height,ae,Me,Pt.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+le,Ie+1,Ve,Pt.width,Pt.height,0,ae,Me,Pt.data)}}else{k?ie&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,0,0,ae,Me,re[le]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,Ve,ae,Me,re[le]);for(let Ie=0;Ie<Se.length;Ie++){const $e=Se[Ie];k?ie&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+le,Ie+1,0,0,ae,Me,$e.image[le]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+le,Ie+1,Ve,ae,Me,$e.image[le])}}}h(E)&&v(t.TEXTURE_CUBE_MAP),ce.__version=ne.version,E.onUpdate&&E.onUpdate(E)}x.__version=E.version}function Fe(x,E,L,j,ne,ce){const ge=s.convert(L.format,L.colorSpace),Q=s.convert(L.type),ee=M(L.internalFormat,ge,Q,L.normalized,L.colorSpace),_e=i.get(E),Ee=i.get(L);if(Ee.__renderTarget=E,!_e.__hasExternalTextures){const re=Math.max(1,E.width>>ce),oe=Math.max(1,E.height>>ce);ne===t.TEXTURE_3D||ne===t.TEXTURE_2D_ARRAY?n.texImage3D(ne,ce,ee,re,oe,E.depth,0,ge,Q,null):n.texImage2D(ne,ce,ee,re,oe,0,ge,Q,null)}n.bindFramebuffer(t.FRAMEBUFFER,x),q(E)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,j,ne,Ee.__webglTexture,0,Be(E)):(ne===t.TEXTURE_2D||ne>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&ne<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,j,ne,Ee.__webglTexture,ce),n.bindFramebuffer(t.FRAMEBUFFER,null)}function it(x,E,L){if(t.bindRenderbuffer(t.RENDERBUFFER,x),E.depthBuffer){const j=E.depthTexture,ne=j&&j.isDepthTexture?j.type:null,ce=T(E.stencilBuffer,ne),ge=E.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;q(E)?a.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,Be(E),ce,E.width,E.height):L?t.renderbufferStorageMultisample(t.RENDERBUFFER,Be(E),ce,E.width,E.height):t.renderbufferStorage(t.RENDERBUFFER,ce,E.width,E.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,ge,t.RENDERBUFFER,x)}else{const j=E.textures;for(let ne=0;ne<j.length;ne++){const ce=j[ne],ge=s.convert(ce.format,ce.colorSpace),Q=s.convert(ce.type),ee=M(ce.internalFormat,ge,Q,ce.normalized,ce.colorSpace);q(E)?a.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,Be(E),ee,E.width,E.height):L?t.renderbufferStorageMultisample(t.RENDERBUFFER,Be(E),ee,E.width,E.height):t.renderbufferStorage(t.RENDERBUFFER,ee,E.width,E.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function Xe(x,E,L){const j=E.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(t.FRAMEBUFFER,x),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ne=i.get(E.depthTexture);if(ne.__renderTarget=E,(!ne.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),j){if(ne.__webglInit===void 0&&(ne.__webglInit=!0,E.depthTexture.addEventListener("dispose",w)),ne.__webglTexture===void 0){ne.__webglTexture=t.createTexture(),n.bindTexture(t.TEXTURE_CUBE_MAP,ne.__webglTexture),Ue(t.TEXTURE_CUBE_MAP,E.depthTexture);const _e=s.convert(E.depthTexture.format),Ee=s.convert(E.depthTexture.type);let re;E.depthTexture.format===Gi?re=t.DEPTH_COMPONENT24:E.depthTexture.format===Gr&&(re=t.DEPTH24_STENCIL8);for(let oe=0;oe<6;oe++)t.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,re,E.width,E.height,0,_e,Ee,null)}}else U(E.depthTexture,0);const ce=ne.__webglTexture,ge=Be(E),Q=j?t.TEXTURE_CUBE_MAP_POSITIVE_X+L:t.TEXTURE_2D,ee=E.depthTexture.format===Gr?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;if(E.depthTexture.format===Gi)q(E)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,ee,Q,ce,0,ge):t.framebufferTexture2D(t.FRAMEBUFFER,ee,Q,ce,0);else if(E.depthTexture.format===Gr)q(E)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,ee,Q,ce,0,ge):t.framebufferTexture2D(t.FRAMEBUFFER,ee,Q,ce,0);else throw new Error("Unknown depthTexture format")}function et(x){const E=i.get(x),L=x.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==x.depthTexture){const j=x.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),j){const ne=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,j.removeEventListener("dispose",ne)};j.addEventListener("dispose",ne),E.__depthDisposeCallback=ne}E.__boundDepthTexture=j}if(x.depthTexture&&!E.__autoAllocateDepthBuffer)if(L)for(let j=0;j<6;j++)Xe(E.__webglFramebuffer[j],x,j);else{const j=x.texture.mipmaps;j&&j.length>0?Xe(E.__webglFramebuffer[0],x,0):Xe(E.__webglFramebuffer,x,0)}else if(L){E.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(n.bindFramebuffer(t.FRAMEBUFFER,E.__webglFramebuffer[j]),E.__webglDepthbuffer[j]===void 0)E.__webglDepthbuffer[j]=t.createRenderbuffer(),it(E.__webglDepthbuffer[j],x,!1);else{const ne=x.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,ce=E.__webglDepthbuffer[j];t.bindRenderbuffer(t.RENDERBUFFER,ce),t.framebufferRenderbuffer(t.FRAMEBUFFER,ne,t.RENDERBUFFER,ce)}}else{const j=x.texture.mipmaps;if(j&&j.length>0?n.bindFramebuffer(t.FRAMEBUFFER,E.__webglFramebuffer[0]):n.bindFramebuffer(t.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=t.createRenderbuffer(),it(E.__webglDepthbuffer,x,!1);else{const ne=x.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,ce=E.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,ce),t.framebufferRenderbuffer(t.FRAMEBUFFER,ne,t.RENDERBUFFER,ce)}}n.bindFramebuffer(t.FRAMEBUFFER,null)}function ut(x,E,L){const j=i.get(x);E!==void 0&&Fe(j.__webglFramebuffer,x,x.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),L!==void 0&&et(x)}function he(x){const E=x.texture,L=i.get(x),j=i.get(E);x.addEventListener("dispose",y);const ne=x.textures,ce=x.isWebGLCubeRenderTarget===!0,ge=ne.length>1;if(ge||(j.__webglTexture===void 0&&(j.__webglTexture=t.createTexture()),j.__version=E.version,o.memory.textures++),ce){L.__webglFramebuffer=[];for(let Q=0;Q<6;Q++)if(E.mipmaps&&E.mipmaps.length>0){L.__webglFramebuffer[Q]=[];for(let ee=0;ee<E.mipmaps.length;ee++)L.__webglFramebuffer[Q][ee]=t.createFramebuffer()}else L.__webglFramebuffer[Q]=t.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){L.__webglFramebuffer=[];for(let Q=0;Q<E.mipmaps.length;Q++)L.__webglFramebuffer[Q]=t.createFramebuffer()}else L.__webglFramebuffer=t.createFramebuffer();if(ge)for(let Q=0,ee=ne.length;Q<ee;Q++){const _e=i.get(ne[Q]);_e.__webglTexture===void 0&&(_e.__webglTexture=t.createTexture(),o.memory.textures++)}if(x.samples>0&&q(x)===!1){L.__webglMultisampledFramebuffer=t.createFramebuffer(),L.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,L.__webglMultisampledFramebuffer);for(let Q=0;Q<ne.length;Q++){const ee=ne[Q];L.__webglColorRenderbuffer[Q]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,L.__webglColorRenderbuffer[Q]);const _e=s.convert(ee.format,ee.colorSpace),Ee=s.convert(ee.type),re=M(ee.internalFormat,_e,Ee,ee.normalized,ee.colorSpace,x.isXRRenderTarget===!0),oe=Be(x);t.renderbufferStorageMultisample(t.RENDERBUFFER,oe,re,x.width,x.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Q,t.RENDERBUFFER,L.__webglColorRenderbuffer[Q])}t.bindRenderbuffer(t.RENDERBUFFER,null),x.depthBuffer&&(L.__webglDepthRenderbuffer=t.createRenderbuffer(),it(L.__webglDepthRenderbuffer,x,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(ce){n.bindTexture(t.TEXTURE_CUBE_MAP,j.__webglTexture),Ue(t.TEXTURE_CUBE_MAP,E);for(let Q=0;Q<6;Q++)if(E.mipmaps&&E.mipmaps.length>0)for(let ee=0;ee<E.mipmaps.length;ee++)Fe(L.__webglFramebuffer[Q][ee],x,E,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ee);else Fe(L.__webglFramebuffer[Q],x,E,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0);h(E)&&v(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(ge){for(let Q=0,ee=ne.length;Q<ee;Q++){const _e=ne[Q],Ee=i.get(_e);let re=t.TEXTURE_2D;(x.isWebGL3DRenderTarget||x.isWebGLArrayRenderTarget)&&(re=x.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(re,Ee.__webglTexture),Ue(re,_e),Fe(L.__webglFramebuffer,x,_e,t.COLOR_ATTACHMENT0+Q,re,0),h(_e)&&v(re)}n.unbindTexture()}else{let Q=t.TEXTURE_2D;if((x.isWebGL3DRenderTarget||x.isWebGLArrayRenderTarget)&&(Q=x.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(Q,j.__webglTexture),Ue(Q,E),E.mipmaps&&E.mipmaps.length>0)for(let ee=0;ee<E.mipmaps.length;ee++)Fe(L.__webglFramebuffer[ee],x,E,t.COLOR_ATTACHMENT0,Q,ee);else Fe(L.__webglFramebuffer,x,E,t.COLOR_ATTACHMENT0,Q,0);h(E)&&v(Q),n.unbindTexture()}x.depthBuffer&&et(x)}function lt(x){const E=x.textures;for(let L=0,j=E.length;L<j;L++){const ne=E[L];if(h(ne)){const ce=S(x),ge=i.get(ne).__webglTexture;n.bindTexture(ce,ge),v(ce),n.unbindTexture()}}}const tt=[],We=[];function O(x){if(x.samples>0){if(q(x)===!1){const E=x.textures,L=x.width,j=x.height;let ne=t.COLOR_BUFFER_BIT;const ce=x.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,ge=i.get(x),Q=E.length>1;if(Q)for(let _e=0;_e<E.length;_e++)n.bindFramebuffer(t.FRAMEBUFFER,ge.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+_e,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,ge.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+_e,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,ge.__webglMultisampledFramebuffer);const ee=x.texture.mipmaps;ee&&ee.length>0?n.bindFramebuffer(t.DRAW_FRAMEBUFFER,ge.__webglFramebuffer[0]):n.bindFramebuffer(t.DRAW_FRAMEBUFFER,ge.__webglFramebuffer);for(let _e=0;_e<E.length;_e++){if(x.resolveDepthBuffer&&(x.depthBuffer&&(ne|=t.DEPTH_BUFFER_BIT),x.stencilBuffer&&x.resolveStencilBuffer&&(ne|=t.STENCIL_BUFFER_BIT)),Q){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,ge.__webglColorRenderbuffer[_e]);const Ee=i.get(E[_e]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,Ee,0)}t.blitFramebuffer(0,0,L,j,0,0,L,j,ne,t.NEAREST),l===!0&&(tt.length=0,We.length=0,tt.push(t.COLOR_ATTACHMENT0+_e),x.depthBuffer&&x.resolveDepthBuffer===!1&&(tt.push(ce),We.push(ce),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,We)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,tt))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),Q)for(let _e=0;_e<E.length;_e++){n.bindFramebuffer(t.FRAMEBUFFER,ge.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+_e,t.RENDERBUFFER,ge.__webglColorRenderbuffer[_e]);const Ee=i.get(E[_e]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,ge.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+_e,t.TEXTURE_2D,Ee,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,ge.__webglMultisampledFramebuffer)}else if(x.depthBuffer&&x.resolveDepthBuffer===!1&&l){const E=x.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[E])}}}function Be(x){return Math.min(r.maxSamples,x.samples)}function q(x){const E=i.get(x);return x.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function ve(x){const E=o.render.frame;c.get(x)!==E&&(c.set(x,E),x.update())}function K(x,E){const L=x.colorSpace,j=x.format,ne=x.type;return x.isCompressedTexture===!0||x.isVideoTexture===!0||L!==yu&&L!==sr&&(nt.getTransfer(L)===ct?(j!==Jn||ne!==wn)&&ze("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):ot("WebGLTextures: Unsupported texture color space:",L)),E}function ue(x){return typeof HTMLImageElement<"u"&&x instanceof HTMLImageElement?(u.width=x.naturalWidth||x.width,u.height=x.naturalHeight||x.height):typeof VideoFrame<"u"&&x instanceof VideoFrame?(u.width=x.displayWidth,u.height=x.displayHeight):(u.width=x.width,u.height=x.height),u}this.allocateTextureUnit=G,this.resetTextureUnits=F,this.getTextureUnits=z,this.setTextureUnits=D,this.setTexture2D=U,this.setTexture2DArray=X,this.setTexture3D=J,this.setTextureCube=se,this.rebindTextures=ut,this.setupRenderTarget=he,this.updateRenderTargetMipmap=lt,this.updateMultisampleRenderTarget=O,this.setupDepthRenderbuffer=et,this.setupFrameBufferTexture=Fe,this.useMultisampledRTT=q,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function PC(t,e){function n(i,r=sr){let s;const o=nt.getTransfer(r);if(i===wn)return t.UNSIGNED_BYTE;if(i===lp)return t.UNSIGNED_SHORT_4_4_4_4;if(i===up)return t.UNSIGNED_SHORT_5_5_5_1;if(i===tS)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===nS)return t.UNSIGNED_INT_10F_11F_11F_REV;if(i===Q_)return t.BYTE;if(i===eS)return t.SHORT;if(i===ua)return t.UNSIGNED_SHORT;if(i===ap)return t.INT;if(i===Si)return t.UNSIGNED_INT;if(i===di)return t.FLOAT;if(i===zi)return t.HALF_FLOAT;if(i===iS)return t.ALPHA;if(i===rS)return t.RGB;if(i===Jn)return t.RGBA;if(i===Gi)return t.DEPTH_COMPONENT;if(i===Gr)return t.DEPTH_STENCIL;if(i===sS)return t.RED;if(i===cp)return t.RED_INTEGER;if(i===Zr)return t.RG;if(i===fp)return t.RG_INTEGER;if(i===dp)return t.RGBA_INTEGER;if(i===kl||i===Bl||i===zl||i===Gl)if(o===ct)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===kl)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Bl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===zl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Gl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===kl)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Bl)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===zl)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Gl)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===vd||i===_d||i===Sd||i===yd)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===vd)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===_d)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Sd)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===yd)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Md||i===Ed||i===Td||i===bd||i===wd||i===_u||i===xd)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Md||i===Ed)return o===ct?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Td)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===bd)return s.COMPRESSED_R11_EAC;if(i===wd)return s.COMPRESSED_SIGNED_R11_EAC;if(i===_u)return s.COMPRESSED_RG11_EAC;if(i===xd)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Ad||i===Cd||i===Rd||i===Pd||i===Nd||i===Ld||i===Id||i===Dd||i===Ud||i===Fd||i===Od||i===kd||i===Bd||i===zd)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Ad)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Cd)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Rd)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Pd)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Nd)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Ld)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Id)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Dd)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Ud)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Fd)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Od)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===kd)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Bd)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===zd)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Gd||i===Vd||i===Hd)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Gd)return o===ct?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Vd)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Hd)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Wd||i===Xd||i===Su||i===jd)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Wd)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Xd)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Su)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===jd)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ca?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:n}}const NC=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,LC=`
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

}`;class IC{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n){if(this.texture===null){const i=new mS(e.texture);(e.depthNear!==n.depthNear||e.depthFar!==n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,i=new Vn({vertexShader:NC,fragmentShader:LC,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new It(new Xu(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class DC extends ts{constructor(e,n){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,u=null,c=null,d=null,f=null,p=null,m=null;const _=typeof XRWebGLBinding<"u",g=new IC,h={},v=n.getContextAttributes();let S=null,M=null;const T=[],b=[],w=new Le;let y=null;const C=new bn;C.viewport=new Rt;const R=new bn;R.viewport=new Rt;const N=[C,R],I=new WT;let F=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(te){let me=T[te];return me===void 0&&(me=new Dc,T[te]=me),me.getTargetRaySpace()},this.getControllerGrip=function(te){let me=T[te];return me===void 0&&(me=new Dc,T[te]=me),me.getGripSpace()},this.getHand=function(te){let me=T[te];return me===void 0&&(me=new Dc,T[te]=me),me.getHandSpace()};function D(te){const me=b.indexOf(te.inputSource);if(me===-1)return;const de=T[me];de!==void 0&&(de.update(te.inputSource,te.frame,u||o),de.dispatchEvent({type:te.type,data:te.inputSource}))}function G(){r.removeEventListener("select",D),r.removeEventListener("selectstart",D),r.removeEventListener("selectend",D),r.removeEventListener("squeeze",D),r.removeEventListener("squeezestart",D),r.removeEventListener("squeezeend",D),r.removeEventListener("end",G),r.removeEventListener("inputsourceschange",H);for(let te=0;te<T.length;te++){const me=b[te];me!==null&&(b[te]=null,T[te].disconnect(me))}F=null,z=null,g.reset();for(const te in h)delete h[te];e.setRenderTarget(S),p=null,f=null,d=null,r=null,M=null,Ue.stop(),i.isPresenting=!1,e.setPixelRatio(y),e.setSize(w.width,w.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(te){s=te,i.isPresenting===!0&&ze("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(te){a=te,i.isPresenting===!0&&ze("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return u||o},this.setReferenceSpace=function(te){u=te},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return d===null&&_&&(d=new XRWebGLBinding(r,n)),d},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(te){if(r=te,r!==null){if(S=e.getRenderTarget(),r.addEventListener("select",D),r.addEventListener("selectstart",D),r.addEventListener("selectend",D),r.addEventListener("squeeze",D),r.addEventListener("squeezestart",D),r.addEventListener("squeezeend",D),r.addEventListener("end",G),r.addEventListener("inputsourceschange",H),v.xrCompatible!==!0&&await n.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(w),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let de=null,Pe=null,ke=null;v.depth&&(ke=v.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,de=v.stencil?Gr:Gi,Pe=v.stencil?ca:Si);const Fe={colorFormat:n.RGBA8,depthFormat:ke,scaleFactor:s};d=this.getBinding(),f=d.createProjectionLayer(Fe),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),M=new vi(f.textureWidth,f.textureHeight,{format:Jn,type:wn,depthTexture:new Ks(f.textureWidth,f.textureHeight,Pe,void 0,void 0,void 0,void 0,void 0,void 0,de),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const de={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,n,de),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),M=new vi(p.framebufferWidth,p.framebufferHeight,{format:Jn,type:wn,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),u=null,o=await r.requestReferenceSpace(a),Ue.setContext(r),Ue.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function H(te){for(let me=0;me<te.removed.length;me++){const de=te.removed[me],Pe=b.indexOf(de);Pe>=0&&(b[Pe]=null,T[Pe].disconnect(de))}for(let me=0;me<te.added.length;me++){const de=te.added[me];let Pe=b.indexOf(de);if(Pe===-1){for(let Fe=0;Fe<T.length;Fe++)if(Fe>=b.length){b.push(de),Pe=Fe;break}else if(b[Fe]===null){b[Fe]=de,Pe=Fe;break}if(Pe===-1)break}const ke=T[Pe];ke&&ke.connect(de)}}const U=new B,X=new B;function J(te,me,de){U.setFromMatrixPosition(me.matrixWorld),X.setFromMatrixPosition(de.matrixWorld);const Pe=U.distanceTo(X),ke=me.projectionMatrix.elements,Fe=de.projectionMatrix.elements,it=ke[14]/(ke[10]-1),Xe=ke[14]/(ke[10]+1),et=(ke[9]+1)/ke[5],ut=(ke[9]-1)/ke[5],he=(ke[8]-1)/ke[0],lt=(Fe[8]+1)/Fe[0],tt=it*he,We=it*lt,O=Pe/(-he+lt),Be=O*-he;if(me.matrixWorld.decompose(te.position,te.quaternion,te.scale),te.translateX(Be),te.translateZ(O),te.matrixWorld.compose(te.position,te.quaternion,te.scale),te.matrixWorldInverse.copy(te.matrixWorld).invert(),ke[10]===-1)te.projectionMatrix.copy(me.projectionMatrix),te.projectionMatrixInverse.copy(me.projectionMatrixInverse);else{const q=it+O,ve=Xe+O,K=tt-Be,ue=We+(Pe-Be),x=et*Xe/ve*q,E=ut*Xe/ve*q;te.projectionMatrix.makePerspective(K,ue,x,E,q,ve),te.projectionMatrixInverse.copy(te.projectionMatrix).invert()}}function se(te,me){me===null?te.matrixWorld.copy(te.matrix):te.matrixWorld.multiplyMatrices(me.matrixWorld,te.matrix),te.matrixWorldInverse.copy(te.matrixWorld).invert()}this.updateCamera=function(te){if(r===null)return;let me=te.near,de=te.far;g.texture!==null&&(g.depthNear>0&&(me=g.depthNear),g.depthFar>0&&(de=g.depthFar)),I.near=R.near=C.near=me,I.far=R.far=C.far=de,(F!==I.near||z!==I.far)&&(r.updateRenderState({depthNear:I.near,depthFar:I.far}),F=I.near,z=I.far),I.layers.mask=te.layers.mask|6,C.layers.mask=I.layers.mask&-5,R.layers.mask=I.layers.mask&-3;const Pe=te.parent,ke=I.cameras;se(I,Pe);for(let Fe=0;Fe<ke.length;Fe++)se(ke[Fe],Pe);ke.length===2?J(I,C,R):I.projectionMatrix.copy(C.projectionMatrix),ye(te,I,Pe)};function ye(te,me,de){de===null?te.matrix.copy(me.matrixWorld):(te.matrix.copy(de.matrixWorld),te.matrix.invert(),te.matrix.multiply(me.matrixWorld)),te.matrix.decompose(te.position,te.quaternion,te.scale),te.updateMatrixWorld(!0),te.projectionMatrix.copy(me.projectionMatrix),te.projectionMatrixInverse.copy(me.projectionMatrixInverse),te.isPerspectiveCamera&&(te.fov=qd*2*Math.atan(1/te.projectionMatrix.elements[5]),te.zoom=1)}this.getCamera=function(){return I},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function(te){l=te,f!==null&&(f.fixedFoveation=te),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=te)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(I)},this.getCameraTexture=function(te){return h[te]};let Ge=null;function He(te,me){if(c=me.getViewerPose(u||o),m=me,c!==null){const de=c.views;p!==null&&(e.setRenderTargetFramebuffer(M,p.framebuffer),e.setRenderTarget(M));let Pe=!1;de.length!==I.cameras.length&&(I.cameras.length=0,Pe=!0);for(let Xe=0;Xe<de.length;Xe++){const et=de[Xe];let ut=null;if(p!==null)ut=p.getViewport(et);else{const lt=d.getViewSubImage(f,et);ut=lt.viewport,Xe===0&&(e.setRenderTargetTextures(M,lt.colorTexture,lt.depthStencilTexture),e.setRenderTarget(M))}let he=N[Xe];he===void 0&&(he=new bn,he.layers.enable(Xe),he.viewport=new Rt,N[Xe]=he),he.matrix.fromArray(et.transform.matrix),he.matrix.decompose(he.position,he.quaternion,he.scale),he.projectionMatrix.fromArray(et.projectionMatrix),he.projectionMatrixInverse.copy(he.projectionMatrix).invert(),he.viewport.set(ut.x,ut.y,ut.width,ut.height),Xe===0&&(I.matrix.copy(he.matrix),I.matrix.decompose(I.position,I.quaternion,I.scale)),Pe===!0&&I.cameras.push(he)}const ke=r.enabledFeatures;if(ke&&ke.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&_){d=i.getBinding();const Xe=d.getDepthInformation(de[0]);Xe&&Xe.isValid&&Xe.texture&&g.init(Xe,r.renderState)}if(ke&&ke.includes("camera-access")&&_){e.state.unbindTexture(),d=i.getBinding();for(let Xe=0;Xe<de.length;Xe++){const et=de[Xe].camera;if(et){let ut=h[et];ut||(ut=new mS,h[et]=ut);const he=d.getCameraImage(et);ut.sourceTexture=he}}}}for(let de=0;de<T.length;de++){const Pe=b[de],ke=T[de];Pe!==null&&ke!==void 0&&ke.update(Pe,me,u||o)}Ge&&Ge(te,me),me.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:me}),m=null}const Ue=new CS;Ue.setAnimationLoop(He),this.setAnimationLoop=function(te){Ge=te},this.dispose=function(){}}}const UC=new Et,US=new je;US.set(-1,0,0,0,1,0,0,0,1);function FC(t,e){function n(g,h){g.matrixAutoUpdate===!0&&g.updateMatrix(),h.value.copy(g.matrix)}function i(g,h){h.color.getRGB(g.fogColor.value,wS(t)),h.isFog?(g.fogNear.value=h.near,g.fogFar.value=h.far):h.isFogExp2&&(g.fogDensity.value=h.density)}function r(g,h,v,S,M){h.isNodeMaterial?h.uniformsNeedUpdate=!1:h.isMeshBasicMaterial?s(g,h):h.isMeshLambertMaterial?(s(g,h),h.envMap&&(g.envMapIntensity.value=h.envMapIntensity)):h.isMeshToonMaterial?(s(g,h),d(g,h)):h.isMeshPhongMaterial?(s(g,h),c(g,h),h.envMap&&(g.envMapIntensity.value=h.envMapIntensity)):h.isMeshStandardMaterial?(s(g,h),f(g,h),h.isMeshPhysicalMaterial&&p(g,h,M)):h.isMeshMatcapMaterial?(s(g,h),m(g,h)):h.isMeshDepthMaterial?s(g,h):h.isMeshDistanceMaterial?(s(g,h),_(g,h)):h.isMeshNormalMaterial?s(g,h):h.isLineBasicMaterial?(o(g,h),h.isLineDashedMaterial&&a(g,h)):h.isPointsMaterial?l(g,h,v,S):h.isSpriteMaterial?u(g,h):h.isShadowMaterial?(g.color.value.copy(h.color),g.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function s(g,h){g.opacity.value=h.opacity,h.color&&g.diffuse.value.copy(h.color),h.emissive&&g.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(g.map.value=h.map,n(h.map,g.mapTransform)),h.alphaMap&&(g.alphaMap.value=h.alphaMap,n(h.alphaMap,g.alphaMapTransform)),h.bumpMap&&(g.bumpMap.value=h.bumpMap,n(h.bumpMap,g.bumpMapTransform),g.bumpScale.value=h.bumpScale,h.side===Sn&&(g.bumpScale.value*=-1)),h.normalMap&&(g.normalMap.value=h.normalMap,n(h.normalMap,g.normalMapTransform),g.normalScale.value.copy(h.normalScale),h.side===Sn&&g.normalScale.value.negate()),h.displacementMap&&(g.displacementMap.value=h.displacementMap,n(h.displacementMap,g.displacementMapTransform),g.displacementScale.value=h.displacementScale,g.displacementBias.value=h.displacementBias),h.emissiveMap&&(g.emissiveMap.value=h.emissiveMap,n(h.emissiveMap,g.emissiveMapTransform)),h.specularMap&&(g.specularMap.value=h.specularMap,n(h.specularMap,g.specularMapTransform)),h.alphaTest>0&&(g.alphaTest.value=h.alphaTest);const v=e.get(h),S=v.envMap,M=v.envMapRotation;S&&(g.envMap.value=S,g.envMapRotation.value.setFromMatrix4(UC.makeRotationFromEuler(M)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(US),g.reflectivity.value=h.reflectivity,g.ior.value=h.ior,g.refractionRatio.value=h.refractionRatio),h.lightMap&&(g.lightMap.value=h.lightMap,g.lightMapIntensity.value=h.lightMapIntensity,n(h.lightMap,g.lightMapTransform)),h.aoMap&&(g.aoMap.value=h.aoMap,g.aoMapIntensity.value=h.aoMapIntensity,n(h.aoMap,g.aoMapTransform))}function o(g,h){g.diffuse.value.copy(h.color),g.opacity.value=h.opacity,h.map&&(g.map.value=h.map,n(h.map,g.mapTransform))}function a(g,h){g.dashSize.value=h.dashSize,g.totalSize.value=h.dashSize+h.gapSize,g.scale.value=h.scale}function l(g,h,v,S){g.diffuse.value.copy(h.color),g.opacity.value=h.opacity,g.size.value=h.size*v,g.scale.value=S*.5,h.map&&(g.map.value=h.map,n(h.map,g.uvTransform)),h.alphaMap&&(g.alphaMap.value=h.alphaMap,n(h.alphaMap,g.alphaMapTransform)),h.alphaTest>0&&(g.alphaTest.value=h.alphaTest)}function u(g,h){g.diffuse.value.copy(h.color),g.opacity.value=h.opacity,g.rotation.value=h.rotation,h.map&&(g.map.value=h.map,n(h.map,g.mapTransform)),h.alphaMap&&(g.alphaMap.value=h.alphaMap,n(h.alphaMap,g.alphaMapTransform)),h.alphaTest>0&&(g.alphaTest.value=h.alphaTest)}function c(g,h){g.specular.value.copy(h.specular),g.shininess.value=Math.max(h.shininess,1e-4)}function d(g,h){h.gradientMap&&(g.gradientMap.value=h.gradientMap)}function f(g,h){g.metalness.value=h.metalness,h.metalnessMap&&(g.metalnessMap.value=h.metalnessMap,n(h.metalnessMap,g.metalnessMapTransform)),g.roughness.value=h.roughness,h.roughnessMap&&(g.roughnessMap.value=h.roughnessMap,n(h.roughnessMap,g.roughnessMapTransform)),h.envMap&&(g.envMapIntensity.value=h.envMapIntensity)}function p(g,h,v){g.ior.value=h.ior,h.sheen>0&&(g.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),g.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(g.sheenColorMap.value=h.sheenColorMap,n(h.sheenColorMap,g.sheenColorMapTransform)),h.sheenRoughnessMap&&(g.sheenRoughnessMap.value=h.sheenRoughnessMap,n(h.sheenRoughnessMap,g.sheenRoughnessMapTransform))),h.clearcoat>0&&(g.clearcoat.value=h.clearcoat,g.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(g.clearcoatMap.value=h.clearcoatMap,n(h.clearcoatMap,g.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,n(h.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(g.clearcoatNormalMap.value=h.clearcoatNormalMap,n(h.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===Sn&&g.clearcoatNormalScale.value.negate())),h.dispersion>0&&(g.dispersion.value=h.dispersion),h.iridescence>0&&(g.iridescence.value=h.iridescence,g.iridescenceIOR.value=h.iridescenceIOR,g.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(g.iridescenceMap.value=h.iridescenceMap,n(h.iridescenceMap,g.iridescenceMapTransform)),h.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=h.iridescenceThicknessMap,n(h.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),h.transmission>0&&(g.transmission.value=h.transmission,g.transmissionSamplerMap.value=v.texture,g.transmissionSamplerSize.value.set(v.width,v.height),h.transmissionMap&&(g.transmissionMap.value=h.transmissionMap,n(h.transmissionMap,g.transmissionMapTransform)),g.thickness.value=h.thickness,h.thicknessMap&&(g.thicknessMap.value=h.thicknessMap,n(h.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=h.attenuationDistance,g.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(g.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(g.anisotropyMap.value=h.anisotropyMap,n(h.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=h.specularIntensity,g.specularColor.value.copy(h.specularColor),h.specularColorMap&&(g.specularColorMap.value=h.specularColorMap,n(h.specularColorMap,g.specularColorMapTransform)),h.specularIntensityMap&&(g.specularIntensityMap.value=h.specularIntensityMap,n(h.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,h){h.matcap&&(g.matcap.value=h.matcap)}function _(g,h){const v=e.get(h).light;g.referencePosition.value.setFromMatrixPosition(v.matrixWorld),g.nearDistance.value=v.shadow.camera.near,g.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function OC(t,e,n,i){let r={},s={},o=[];const a=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,S){const M=S.program;i.uniformBlockBinding(v,M)}function u(v,S){let M=r[v.id];M===void 0&&(m(v),M=c(v),r[v.id]=M,v.addEventListener("dispose",g));const T=S.program;i.updateUBOMapping(v,T);const b=e.render.frame;s[v.id]!==b&&(f(v),s[v.id]=b)}function c(v){const S=d();v.__bindingPointIndex=S;const M=t.createBuffer(),T=v.__size,b=v.usage;return t.bindBuffer(t.UNIFORM_BUFFER,M),t.bufferData(t.UNIFORM_BUFFER,T,b),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,S,M),M}function d(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return ot("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(v){const S=r[v.id],M=v.uniforms,T=v.__cache;t.bindBuffer(t.UNIFORM_BUFFER,S);for(let b=0,w=M.length;b<w;b++){const y=Array.isArray(M[b])?M[b]:[M[b]];for(let C=0,R=y.length;C<R;C++){const N=y[C];if(p(N,b,C,T)===!0){const I=N.__offset,F=Array.isArray(N.value)?N.value:[N.value];let z=0;for(let D=0;D<F.length;D++){const G=F[D],H=_(G);typeof G=="number"||typeof G=="boolean"?(N.__data[0]=G,t.bufferSubData(t.UNIFORM_BUFFER,I+z,N.__data)):G.isMatrix3?(N.__data[0]=G.elements[0],N.__data[1]=G.elements[1],N.__data[2]=G.elements[2],N.__data[3]=0,N.__data[4]=G.elements[3],N.__data[5]=G.elements[4],N.__data[6]=G.elements[5],N.__data[7]=0,N.__data[8]=G.elements[6],N.__data[9]=G.elements[7],N.__data[10]=G.elements[8],N.__data[11]=0):ArrayBuffer.isView(G)?N.__data.set(new G.constructor(G.buffer,G.byteOffset,N.__data.length)):(G.toArray(N.__data,z),z+=H.storage/Float32Array.BYTES_PER_ELEMENT)}t.bufferSubData(t.UNIFORM_BUFFER,I,N.__data)}}}t.bindBuffer(t.UNIFORM_BUFFER,null)}function p(v,S,M,T){const b=v.value,w=S+"_"+M;if(T[w]===void 0)return typeof b=="number"||typeof b=="boolean"?T[w]=b:ArrayBuffer.isView(b)?T[w]=b.slice():T[w]=b.clone(),!0;{const y=T[w];if(typeof b=="number"||typeof b=="boolean"){if(y!==b)return T[w]=b,!0}else{if(ArrayBuffer.isView(b))return!0;if(y.equals(b)===!1)return y.copy(b),!0}}return!1}function m(v){const S=v.uniforms;let M=0;const T=16;for(let w=0,y=S.length;w<y;w++){const C=Array.isArray(S[w])?S[w]:[S[w]];for(let R=0,N=C.length;R<N;R++){const I=C[R],F=Array.isArray(I.value)?I.value:[I.value];for(let z=0,D=F.length;z<D;z++){const G=F[z],H=_(G),U=M%T,X=U%H.boundary,J=U+X;M+=X,J!==0&&T-J<H.storage&&(M+=T-J),I.__data=new Float32Array(H.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=M,M+=H.storage}}}const b=M%T;return b>0&&(M+=T-b),v.__size=M,v.__cache={},this}function _(v){const S={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(S.boundary=4,S.storage=4):v.isVector2?(S.boundary=8,S.storage=8):v.isVector3||v.isColor?(S.boundary=16,S.storage=12):v.isVector4?(S.boundary=16,S.storage=16):v.isMatrix3?(S.boundary=48,S.storage=48):v.isMatrix4?(S.boundary=64,S.storage=64):v.isTexture?ze("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(S.boundary=16,S.storage=v.byteLength):ze("WebGLRenderer: Unsupported uniform value type.",v),S}function g(v){const S=v.target;S.removeEventListener("dispose",g);const M=o.indexOf(S.__bindingPointIndex);o.splice(M,1),t.deleteBuffer(r[S.id]),delete r[S.id],delete s[S.id]}function h(){for(const v in r)t.deleteBuffer(r[v]);o=[],r={},s={}}return{bind:l,update:u,dispose:h}}const kC=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let oi=null;function BC(){return oi===null&&(oi=new $E(kC,16,16,Zr,zi),oi.name="DFG_LUT",oi.minFilter=nn,oi.magFilter=nn,oi.wrapS=Li,oi.wrapT=Li,oi.generateMipmaps=!1,oi.needsUpdate=!0),oi}class zC{constructor(e={}){const{canvas:n=bE(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:u=!1,powerPreference:c="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:f=!1,outputBufferType:p=wn}=e;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=o;const _=p,g=new Set([dp,fp,cp]),h=new Set([wn,Si,ua,ca,lp,up]),v=new Uint32Array(4),S=new Int32Array(4),M=new B;let T=null,b=null;const w=[],y=[];let C=null;this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=gi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const R=this;let N=!1,I=null;this._outputColorSpace=Dn;let F=0,z=0,D=null,G=-1,H=null;const U=new Rt,X=new Rt;let J=null;const se=new Ke(0);let ye=0,Ge=n.width,He=n.height,Ue=1,te=null,me=null;const de=new Rt(0,0,Ge,He),Pe=new Rt(0,0,Ge,He);let ke=!1;const Fe=new _p;let it=!1,Xe=!1;const et=new Et,ut=new B,he=new Rt,lt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let tt=!1;function We(){return D===null?Ue:1}let O=i;function Be(A,V){return n.getContext(A,V)}try{const A={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:u,powerPreference:c,failIfMajorPerformanceCaveat:d};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${rp}`),n.addEventListener("webglcontextlost",le,!1),n.addEventListener("webglcontextrestored",Ie,!1),n.addEventListener("webglcontextcreationerror",$e,!1),O===null){const V="webgl2";if(O=Be(V,A),O===null)throw Be(V)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw ot("WebGLRenderer: "+A.message),A}let q,ve,K,ue,x,E,L,j,ne,ce,ge,Q,ee,_e,Ee,re,oe,ae,Me,Ve,k,pe,ie;function we(){q=new Bx(O),q.init(),k=new PC(O,q),ve=new Nx(O,q,e,k),K=new CC(O,q),ve.reversedDepthBuffer&&f&&K.buffers.depth.setReversed(!0),ue=new Vx(O),x=new pC,E=new RC(O,q,K,x,ve,k,ue),L=new kx(R),j=new jT(O),pe=new Rx(O,j),ne=new zx(O,j,ue,pe),ce=new Wx(O,ne,j,pe,ue),ae=new Hx(O,ve,E),Ee=new Lx(x),ge=new hC(R,L,q,ve,pe,Ee),Q=new FC(R,x),ee=new gC,_e=new EC(q),oe=new Cx(R,L,K,ce,m,l),re=new AC(R,ce,ve),ie=new OC(O,ue,ve,K),Me=new Px(O,q,ue),Ve=new Gx(O,q,ue),ue.programs=ge.programs,R.capabilities=ve,R.extensions=q,R.properties=x,R.renderLists=ee,R.shadowMap=re,R.state=K,R.info=ue}we(),_!==wn&&(C=new jx(_,n.width,n.height,r,s));const Se=new DC(R,O);this.xr=Se,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const A=q.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=q.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return Ue},this.setPixelRatio=function(A){A!==void 0&&(Ue=A,this.setSize(Ge,He,!1))},this.getSize=function(A){return A.set(Ge,He)},this.setSize=function(A,V,Z=!0){if(Se.isPresenting){ze("WebGLRenderer: Can't change size while VR device is presenting.");return}Ge=A,He=V,n.width=Math.floor(A*Ue),n.height=Math.floor(V*Ue),Z===!0&&(n.style.width=A+"px",n.style.height=V+"px"),C!==null&&C.setSize(n.width,n.height),this.setViewport(0,0,A,V)},this.getDrawingBufferSize=function(A){return A.set(Ge*Ue,He*Ue).floor()},this.setDrawingBufferSize=function(A,V,Z){Ge=A,He=V,Ue=Z,n.width=Math.floor(A*Z),n.height=Math.floor(V*Z),this.setViewport(0,0,A,V)},this.setEffects=function(A){if(_===wn){ot("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(A){for(let V=0;V<A.length;V++)if(A[V].isOutputPass===!0){ze("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}C.setEffects(A||[])},this.getCurrentViewport=function(A){return A.copy(U)},this.getViewport=function(A){return A.copy(de)},this.setViewport=function(A,V,Z,$){A.isVector4?de.set(A.x,A.y,A.z,A.w):de.set(A,V,Z,$),K.viewport(U.copy(de).multiplyScalar(Ue).round())},this.getScissor=function(A){return A.copy(Pe)},this.setScissor=function(A,V,Z,$){A.isVector4?Pe.set(A.x,A.y,A.z,A.w):Pe.set(A,V,Z,$),K.scissor(X.copy(Pe).multiplyScalar(Ue).round())},this.getScissorTest=function(){return ke},this.setScissorTest=function(A){K.setScissorTest(ke=A)},this.setOpaqueSort=function(A){te=A},this.setTransparentSort=function(A){me=A},this.getClearColor=function(A){return A.copy(oe.getClearColor())},this.setClearColor=function(){oe.setClearColor(...arguments)},this.getClearAlpha=function(){return oe.getClearAlpha()},this.setClearAlpha=function(){oe.setClearAlpha(...arguments)},this.clear=function(A=!0,V=!0,Z=!0){let $=0;if(A){let Y=!1;if(D!==null){const xe=D.texture.format;Y=g.has(xe)}if(Y){const xe=D.texture.type,Ce=h.has(xe),be=oe.getClearColor(),Ne=oe.getClearAlpha(),De=be.r,Ye=be.g,Ze=be.b;Ce?(v[0]=De,v[1]=Ye,v[2]=Ze,v[3]=Ne,O.clearBufferuiv(O.COLOR,0,v)):(S[0]=De,S[1]=Ye,S[2]=Ze,S[3]=Ne,O.clearBufferiv(O.COLOR,0,S))}else $|=O.COLOR_BUFFER_BIT}V&&($|=O.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Z&&($|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),$!==0&&O.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(A){A.setRenderer(this),I=A},this.dispose=function(){n.removeEventListener("webglcontextlost",le,!1),n.removeEventListener("webglcontextrestored",Ie,!1),n.removeEventListener("webglcontextcreationerror",$e,!1),oe.dispose(),ee.dispose(),_e.dispose(),x.dispose(),L.dispose(),ce.dispose(),pe.dispose(),ie.dispose(),ge.dispose(),Se.dispose(),Se.removeEventListener("sessionstart",Rp),Se.removeEventListener("sessionend",Pp),br.stop()};function le(A){A.preventDefault(),_m("WebGLRenderer: Context Lost."),N=!0}function Ie(){_m("WebGLRenderer: Context Restored."),N=!1;const A=ue.autoReset,V=re.enabled,Z=re.autoUpdate,$=re.needsUpdate,Y=re.type;we(),ue.autoReset=A,re.enabled=V,re.autoUpdate=Z,re.needsUpdate=$,re.type=Y}function $e(A){ot("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Pt(A){const V=A.target;V.removeEventListener("dispose",Pt),dt(V)}function dt(A){Ei(A),x.remove(A)}function Ei(A){const V=x.get(A).programs;V!==void 0&&(V.forEach(function(Z){ge.releaseProgram(Z)}),A.isShaderMaterial&&ge.releaseShaderCache(A))}this.renderBufferDirect=function(A,V,Z,$,Y,xe){V===null&&(V=lt);const Ce=Y.isMesh&&Y.matrixWorld.determinant()<0,be=GS(A,V,Z,$,Y);K.setMaterial($,Ce);let Ne=Z.index,De=1;if($.wireframe===!0){if(Ne=ne.getWireframeAttribute(Z),Ne===void 0)return;De=2}const Ye=Z.drawRange,Ze=Z.attributes.position;let Oe=Ye.start*De,ht=(Ye.start+Ye.count)*De;xe!==null&&(Oe=Math.max(Oe,xe.start*De),ht=Math.min(ht,(xe.start+xe.count)*De)),Ne!==null?(Oe=Math.max(Oe,0),ht=Math.min(ht,Ne.count)):Ze!=null&&(Oe=Math.max(Oe,0),ht=Math.min(ht,Ze.count));const Nt=ht-Oe;if(Nt<0||Nt===1/0)return;pe.setup(Y,$,be,Z,Ne);let At,pt=Me;if(Ne!==null&&(At=j.get(Ne),pt=Ve,pt.setIndex(At)),Y.isMesh)$.wireframe===!0?(K.setLineWidth($.wireframeLinewidth*We()),pt.setMode(O.LINES)):pt.setMode(O.TRIANGLES);else if(Y.isLine){let Kt=$.linewidth;Kt===void 0&&(Kt=1),K.setLineWidth(Kt*We()),Y.isLineSegments?pt.setMode(O.LINES):Y.isLineLoop?pt.setMode(O.LINE_LOOP):pt.setMode(O.LINE_STRIP)}else Y.isPoints?pt.setMode(O.POINTS):Y.isSprite&&pt.setMode(O.TRIANGLES);if(Y.isBatchedMesh)if(q.get("WEBGL_multi_draw"))pt.renderMultiDraw(Y._multiDrawStarts,Y._multiDrawCounts,Y._multiDrawCount);else{const Kt=Y._multiDrawStarts,Ae=Y._multiDrawCounts,yn=Y._multiDrawCount,st=Ne?j.get(Ne).bytesPerElement:1,Ln=x.get($).currentProgram.getUniforms();for(let ii=0;ii<yn;ii++)Ln.setValue(O,"_gl_DrawID",ii),pt.render(Kt[ii]/st,Ae[ii])}else if(Y.isInstancedMesh)pt.renderInstances(Oe,Nt,Y.count);else if(Z.isInstancedBufferGeometry){const Kt=Z._maxInstanceCount!==void 0?Z._maxInstanceCount:1/0,Ae=Math.min(Z.instanceCount,Kt);pt.renderInstances(Oe,Nt,Ae)}else pt.render(Oe,Nt)};function ni(A,V,Z){A.transparent===!0&&A.side===fi&&A.forceSinglePass===!1?(A.side=Sn,A.needsUpdate=!0,wa(A,V,Z),A.side=_i,A.needsUpdate=!0,wa(A,V,Z),A.side=fi):wa(A,V,Z)}this.compile=function(A,V,Z=null){Z===null&&(Z=A),b=_e.get(Z),b.init(V),y.push(b),Z.traverseVisible(function(Y){Y.isLight&&Y.layers.test(V.layers)&&(b.pushLight(Y),Y.castShadow&&b.pushShadow(Y))}),A!==Z&&A.traverseVisible(function(Y){Y.isLight&&Y.layers.test(V.layers)&&(b.pushLight(Y),Y.castShadow&&b.pushShadow(Y))}),b.setupLights();const $=new Set;return A.traverse(function(Y){if(!(Y.isMesh||Y.isPoints||Y.isLine||Y.isSprite))return;const xe=Y.material;if(xe)if(Array.isArray(xe))for(let Ce=0;Ce<xe.length;Ce++){const be=xe[Ce];ni(be,Z,Y),$.add(be)}else ni(xe,Z,Y),$.add(xe)}),b=y.pop(),$},this.compileAsync=function(A,V,Z=null){const $=this.compile(A,V,Z);return new Promise(Y=>{function xe(){if($.forEach(function(Ce){x.get(Ce).currentProgram.isReady()&&$.delete(Ce)}),$.size===0){Y(A);return}setTimeout(xe,10)}q.get("KHR_parallel_shader_compile")!==null?xe():setTimeout(xe,10)})};let Yu=null;function BS(A){Yu&&Yu(A)}function Rp(){br.stop()}function Pp(){br.start()}const br=new CS;br.setAnimationLoop(BS),typeof self<"u"&&br.setContext(self),this.setAnimationLoop=function(A){Yu=A,Se.setAnimationLoop(A),A===null?br.stop():br.start()},Se.addEventListener("sessionstart",Rp),Se.addEventListener("sessionend",Pp),this.render=function(A,V){if(V!==void 0&&V.isCamera!==!0){ot("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(N===!0)return;I!==null&&I.renderStart(A,V);const Z=Se.enabled===!0&&Se.isPresenting===!0,$=C!==null&&(D===null||Z)&&C.begin(R,D);if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),V.parent===null&&V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),Se.enabled===!0&&Se.isPresenting===!0&&(C===null||C.isCompositing()===!1)&&(Se.cameraAutoUpdate===!0&&Se.updateCamera(V),V=Se.getCamera()),A.isScene===!0&&A.onBeforeRender(R,A,V,D),b=_e.get(A,y.length),b.init(V),b.state.textureUnits=E.getTextureUnits(),y.push(b),et.multiplyMatrices(V.projectionMatrix,V.matrixWorldInverse),Fe.setFromProjectionMatrix(et,hi,V.reversedDepth),Xe=this.localClippingEnabled,it=Ee.init(this.clippingPlanes,Xe),T=ee.get(A,w.length),T.init(),w.push(T),Se.enabled===!0&&Se.isPresenting===!0){const Ce=R.xr.getDepthSensingMesh();Ce!==null&&qu(Ce,V,-1/0,R.sortObjects)}qu(A,V,0,R.sortObjects),T.finish(),R.sortObjects===!0&&T.sort(te,me),tt=Se.enabled===!1||Se.isPresenting===!1||Se.hasDepthSensing()===!1,tt&&oe.addToRenderList(T,A),this.info.render.frame++,it===!0&&Ee.beginShadows();const Y=b.state.shadowsArray;if(re.render(Y,A,V),it===!0&&Ee.endShadows(),this.info.autoReset===!0&&this.info.reset(),($&&C.hasRenderPass())===!1){const Ce=T.opaque,be=T.transmissive;if(b.setupLights(),V.isArrayCamera){const Ne=V.cameras;if(be.length>0)for(let De=0,Ye=Ne.length;De<Ye;De++){const Ze=Ne[De];Lp(Ce,be,A,Ze)}tt&&oe.render(A);for(let De=0,Ye=Ne.length;De<Ye;De++){const Ze=Ne[De];Np(T,A,Ze,Ze.viewport)}}else be.length>0&&Lp(Ce,be,A,V),tt&&oe.render(A),Np(T,A,V)}D!==null&&z===0&&(E.updateMultisampleRenderTarget(D),E.updateRenderTargetMipmap(D)),$&&C.end(R),A.isScene===!0&&A.onAfterRender(R,A,V),pe.resetDefaultState(),G=-1,H=null,y.pop(),y.length>0?(b=y[y.length-1],E.setTextureUnits(b.state.textureUnits),it===!0&&Ee.setGlobalState(R.clippingPlanes,b.state.camera)):b=null,w.pop(),w.length>0?T=w[w.length-1]:T=null,I!==null&&I.renderEnd()};function qu(A,V,Z,$){if(A.visible===!1)return;if(A.layers.test(V.layers)){if(A.isGroup)Z=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(V);else if(A.isLightProbeGrid)b.pushLightProbeGrid(A);else if(A.isLight)b.pushLight(A),A.castShadow&&b.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||Fe.intersectsSprite(A)){$&&he.setFromMatrixPosition(A.matrixWorld).applyMatrix4(et);const Ce=ce.update(A),be=A.material;be.visible&&T.push(A,Ce,be,Z,he.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||Fe.intersectsObject(A))){const Ce=ce.update(A),be=A.material;if($&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),he.copy(A.boundingSphere.center)):(Ce.boundingSphere===null&&Ce.computeBoundingSphere(),he.copy(Ce.boundingSphere.center)),he.applyMatrix4(A.matrixWorld).applyMatrix4(et)),Array.isArray(be)){const Ne=Ce.groups;for(let De=0,Ye=Ne.length;De<Ye;De++){const Ze=Ne[De],Oe=be[Ze.materialIndex];Oe&&Oe.visible&&T.push(A,Ce,Oe,Z,he.z,Ze)}}else be.visible&&T.push(A,Ce,be,Z,he.z,null)}}const xe=A.children;for(let Ce=0,be=xe.length;Ce<be;Ce++)qu(xe[Ce],V,Z,$)}function Np(A,V,Z,$){const{opaque:Y,transmissive:xe,transparent:Ce}=A;b.setupLightsView(Z),it===!0&&Ee.setGlobalState(R.clippingPlanes,Z),$&&K.viewport(U.copy($)),Y.length>0&&ba(Y,V,Z),xe.length>0&&ba(xe,V,Z),Ce.length>0&&ba(Ce,V,Z),K.buffers.depth.setTest(!0),K.buffers.depth.setMask(!0),K.buffers.color.setMask(!0),K.setPolygonOffset(!1)}function Lp(A,V,Z,$){if((Z.isScene===!0?Z.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[$.id]===void 0){const Oe=q.has("EXT_color_buffer_half_float")||q.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[$.id]=new vi(1,1,{generateMipmaps:!0,type:Oe?zi:wn,minFilter:zr,samples:Math.max(4,ve.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:nt.workingColorSpace})}const xe=b.state.transmissionRenderTarget[$.id],Ce=$.viewport||U;xe.setSize(Ce.z*R.transmissionResolutionScale,Ce.w*R.transmissionResolutionScale);const be=R.getRenderTarget(),Ne=R.getActiveCubeFace(),De=R.getActiveMipmapLevel();R.setRenderTarget(xe),R.getClearColor(se),ye=R.getClearAlpha(),ye<1&&R.setClearColor(16777215,.5),R.clear(),tt&&oe.render(Z);const Ye=R.toneMapping;R.toneMapping=gi;const Ze=$.viewport;if($.viewport!==void 0&&($.viewport=void 0),b.setupLightsView($),it===!0&&Ee.setGlobalState(R.clippingPlanes,$),ba(A,Z,$),E.updateMultisampleRenderTarget(xe),E.updateRenderTargetMipmap(xe),q.has("WEBGL_multisampled_render_to_texture")===!1){let Oe=!1;for(let ht=0,Nt=V.length;ht<Nt;ht++){const At=V[ht],{object:pt,geometry:Kt,material:Ae,group:yn}=At;if(Ae.side===fi&&pt.layers.test($.layers)){const st=Ae.side;Ae.side=Sn,Ae.needsUpdate=!0,Ip(pt,Z,$,Kt,Ae,yn),Ae.side=st,Ae.needsUpdate=!0,Oe=!0}}Oe===!0&&(E.updateMultisampleRenderTarget(xe),E.updateRenderTargetMipmap(xe))}R.setRenderTarget(be,Ne,De),R.setClearColor(se,ye),Ze!==void 0&&($.viewport=Ze),R.toneMapping=Ye}function ba(A,V,Z){const $=V.isScene===!0?V.overrideMaterial:null;for(let Y=0,xe=A.length;Y<xe;Y++){const Ce=A[Y],{object:be,geometry:Ne,group:De}=Ce;let Ye=Ce.material;Ye.allowOverride===!0&&$!==null&&(Ye=$),be.layers.test(Z.layers)&&Ip(be,V,Z,Ne,Ye,De)}}function Ip(A,V,Z,$,Y,xe){A.onBeforeRender(R,V,Z,$,Y,xe),A.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),Y.onBeforeRender(R,V,Z,$,A,xe),Y.transparent===!0&&Y.side===fi&&Y.forceSinglePass===!1?(Y.side=Sn,Y.needsUpdate=!0,R.renderBufferDirect(Z,V,$,Y,A,xe),Y.side=_i,Y.needsUpdate=!0,R.renderBufferDirect(Z,V,$,Y,A,xe),Y.side=fi):R.renderBufferDirect(Z,V,$,Y,A,xe),A.onAfterRender(R,V,Z,$,Y,xe)}function wa(A,V,Z){V.isScene!==!0&&(V=lt);const $=x.get(A),Y=b.state.lights,xe=b.state.shadowsArray,Ce=Y.state.version,be=ge.getParameters(A,Y.state,xe,V,Z,b.state.lightProbeGridArray),Ne=ge.getProgramCacheKey(be);let De=$.programs;$.environment=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?V.environment:null,$.fog=V.fog;const Ye=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap;$.envMap=L.get(A.envMap||$.environment,Ye),$.envMapRotation=$.environment!==null&&A.envMap===null?V.environmentRotation:A.envMapRotation,De===void 0&&(A.addEventListener("dispose",Pt),De=new Map,$.programs=De);let Ze=De.get(Ne);if(Ze!==void 0){if($.currentProgram===Ze&&$.lightsStateVersion===Ce)return Up(A,be),Ze}else be.uniforms=ge.getUniforms(A),I!==null&&A.isNodeMaterial&&I.build(A,Z,be),A.onBeforeCompile(be,R),Ze=ge.acquireProgram(be,Ne),De.set(Ne,Ze),$.uniforms=be.uniforms;const Oe=$.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Oe.clippingPlanes=Ee.uniform),Up(A,be),$.needsLights=HS(A),$.lightsStateVersion=Ce,$.needsLights&&(Oe.ambientLightColor.value=Y.state.ambient,Oe.lightProbe.value=Y.state.probe,Oe.directionalLights.value=Y.state.directional,Oe.directionalLightShadows.value=Y.state.directionalShadow,Oe.spotLights.value=Y.state.spot,Oe.spotLightShadows.value=Y.state.spotShadow,Oe.rectAreaLights.value=Y.state.rectArea,Oe.ltc_1.value=Y.state.rectAreaLTC1,Oe.ltc_2.value=Y.state.rectAreaLTC2,Oe.pointLights.value=Y.state.point,Oe.pointLightShadows.value=Y.state.pointShadow,Oe.hemisphereLights.value=Y.state.hemi,Oe.directionalShadowMatrix.value=Y.state.directionalShadowMatrix,Oe.spotLightMatrix.value=Y.state.spotLightMatrix,Oe.spotLightMap.value=Y.state.spotLightMap,Oe.pointShadowMatrix.value=Y.state.pointShadowMatrix),$.lightProbeGrid=b.state.lightProbeGridArray.length>0,$.currentProgram=Ze,$.uniformsList=null,Ze}function Dp(A){if(A.uniformsList===null){const V=A.currentProgram.getUniforms();A.uniformsList=Vl.seqWithValue(V.seq,A.uniforms)}return A.uniformsList}function Up(A,V){const Z=x.get(A);Z.outputColorSpace=V.outputColorSpace,Z.batching=V.batching,Z.batchingColor=V.batchingColor,Z.instancing=V.instancing,Z.instancingColor=V.instancingColor,Z.instancingMorph=V.instancingMorph,Z.skinning=V.skinning,Z.morphTargets=V.morphTargets,Z.morphNormals=V.morphNormals,Z.morphColors=V.morphColors,Z.morphTargetsCount=V.morphTargetsCount,Z.numClippingPlanes=V.numClippingPlanes,Z.numIntersection=V.numClipIntersection,Z.vertexAlphas=V.vertexAlphas,Z.vertexTangents=V.vertexTangents,Z.toneMapping=V.toneMapping}function zS(A,V){if(A.length===0)return null;if(A.length===1)return A[0].texture!==null?A[0]:null;M.setFromMatrixPosition(V.matrixWorld);for(let Z=0,$=A.length;Z<$;Z++){const Y=A[Z];if(Y.texture!==null&&Y.boundingBox.containsPoint(M))return Y}return null}function GS(A,V,Z,$,Y){V.isScene!==!0&&(V=lt),E.resetTextureUnits();const xe=V.fog,Ce=$.isMeshStandardMaterial||$.isMeshLambertMaterial||$.isMeshPhongMaterial?V.environment:null,be=D===null?R.outputColorSpace:D.isXRRenderTarget===!0?D.texture.colorSpace:nt.workingColorSpace,Ne=$.isMeshStandardMaterial||$.isMeshLambertMaterial&&!$.envMap||$.isMeshPhongMaterial&&!$.envMap,De=L.get($.envMap||Ce,Ne),Ye=$.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,Ze=!!Z.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),Oe=!!Z.morphAttributes.position,ht=!!Z.morphAttributes.normal,Nt=!!Z.morphAttributes.color;let At=gi;$.toneMapped&&(D===null||D.isXRRenderTarget===!0)&&(At=R.toneMapping);const pt=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,Kt=pt!==void 0?pt.length:0,Ae=x.get($),yn=b.state.lights;if(it===!0&&(Xe===!0||A!==H)){const gt=A===H&&$.id===G;Ee.setState($,A,gt)}let st=!1;$.version===Ae.__version?(Ae.needsLights&&Ae.lightsStateVersion!==yn.state.version||Ae.outputColorSpace!==be||Y.isBatchedMesh&&Ae.batching===!1||!Y.isBatchedMesh&&Ae.batching===!0||Y.isBatchedMesh&&Ae.batchingColor===!0&&Y.colorTexture===null||Y.isBatchedMesh&&Ae.batchingColor===!1&&Y.colorTexture!==null||Y.isInstancedMesh&&Ae.instancing===!1||!Y.isInstancedMesh&&Ae.instancing===!0||Y.isSkinnedMesh&&Ae.skinning===!1||!Y.isSkinnedMesh&&Ae.skinning===!0||Y.isInstancedMesh&&Ae.instancingColor===!0&&Y.instanceColor===null||Y.isInstancedMesh&&Ae.instancingColor===!1&&Y.instanceColor!==null||Y.isInstancedMesh&&Ae.instancingMorph===!0&&Y.morphTexture===null||Y.isInstancedMesh&&Ae.instancingMorph===!1&&Y.morphTexture!==null||Ae.envMap!==De||$.fog===!0&&Ae.fog!==xe||Ae.numClippingPlanes!==void 0&&(Ae.numClippingPlanes!==Ee.numPlanes||Ae.numIntersection!==Ee.numIntersection)||Ae.vertexAlphas!==Ye||Ae.vertexTangents!==Ze||Ae.morphTargets!==Oe||Ae.morphNormals!==ht||Ae.morphColors!==Nt||Ae.toneMapping!==At||Ae.morphTargetsCount!==Kt||!!Ae.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&(st=!0):(st=!0,Ae.__version=$.version);let Ln=Ae.currentProgram;st===!0&&(Ln=wa($,V,Y),I&&$.isNodeMaterial&&I.onUpdateProgram($,Ln,Ae));let ii=!1,Hi=!1,is=!1;const mt=Ln.getUniforms(),Lt=Ae.uniforms;if(K.useProgram(Ln.program)&&(ii=!0,Hi=!0,is=!0),$.id!==G&&(G=$.id,Hi=!0),Ae.needsLights){const gt=zS(b.state.lightProbeGridArray,Y);Ae.lightProbeGrid!==gt&&(Ae.lightProbeGrid=gt,Hi=!0)}if(ii||H!==A){K.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),mt.setValue(O,"projectionMatrix",A.projectionMatrix),mt.setValue(O,"viewMatrix",A.matrixWorldInverse);const Xi=mt.map.cameraPosition;Xi!==void 0&&Xi.setValue(O,ut.setFromMatrixPosition(A.matrixWorld)),ve.logarithmicDepthBuffer&&mt.setValue(O,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&mt.setValue(O,"isOrthographic",A.isOrthographicCamera===!0),H!==A&&(H=A,Hi=!0,is=!0)}if(Ae.needsLights&&(yn.state.directionalShadowMap.length>0&&mt.setValue(O,"directionalShadowMap",yn.state.directionalShadowMap,E),yn.state.spotShadowMap.length>0&&mt.setValue(O,"spotShadowMap",yn.state.spotShadowMap,E),yn.state.pointShadowMap.length>0&&mt.setValue(O,"pointShadowMap",yn.state.pointShadowMap,E)),Y.isSkinnedMesh){mt.setOptional(O,Y,"bindMatrix"),mt.setOptional(O,Y,"bindMatrixInverse");const gt=Y.skeleton;gt&&(gt.boneTexture===null&&gt.computeBoneTexture(),mt.setValue(O,"boneTexture",gt.boneTexture,E))}Y.isBatchedMesh&&(mt.setOptional(O,Y,"batchingTexture"),mt.setValue(O,"batchingTexture",Y._matricesTexture,E),mt.setOptional(O,Y,"batchingIdTexture"),mt.setValue(O,"batchingIdTexture",Y._indirectTexture,E),mt.setOptional(O,Y,"batchingColorTexture"),Y._colorsTexture!==null&&mt.setValue(O,"batchingColorTexture",Y._colorsTexture,E));const Wi=Z.morphAttributes;if((Wi.position!==void 0||Wi.normal!==void 0||Wi.color!==void 0)&&ae.update(Y,Z,Ln),(Hi||Ae.receiveShadow!==Y.receiveShadow)&&(Ae.receiveShadow=Y.receiveShadow,mt.setValue(O,"receiveShadow",Y.receiveShadow)),($.isMeshStandardMaterial||$.isMeshLambertMaterial||$.isMeshPhongMaterial)&&$.envMap===null&&V.environment!==null&&(Lt.envMapIntensity.value=V.environmentIntensity),Lt.dfgLUT!==void 0&&(Lt.dfgLUT.value=BC()),Hi){if(mt.setValue(O,"toneMappingExposure",R.toneMappingExposure),Ae.needsLights&&VS(Lt,is),xe&&$.fog===!0&&Q.refreshFogUniforms(Lt,xe),Q.refreshMaterialUniforms(Lt,$,Ue,He,b.state.transmissionRenderTarget[A.id]),Ae.needsLights&&Ae.lightProbeGrid){const gt=Ae.lightProbeGrid;Lt.probesSH.value=gt.texture,Lt.probesMin.value.copy(gt.boundingBox.min),Lt.probesMax.value.copy(gt.boundingBox.max),Lt.probesResolution.value.copy(gt.resolution)}Vl.upload(O,Dp(Ae),Lt,E)}if($.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(Vl.upload(O,Dp(Ae),Lt,E),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&mt.setValue(O,"center",Y.center),mt.setValue(O,"modelViewMatrix",Y.modelViewMatrix),mt.setValue(O,"normalMatrix",Y.normalMatrix),mt.setValue(O,"modelMatrix",Y.matrixWorld),$.uniformsGroups!==void 0){const gt=$.uniformsGroups;for(let Xi=0,rs=gt.length;Xi<rs;Xi++){const Fp=gt[Xi];ie.update(Fp,Ln),ie.bind(Fp,Ln)}}return Ln}function VS(A,V){A.ambientLightColor.needsUpdate=V,A.lightProbe.needsUpdate=V,A.directionalLights.needsUpdate=V,A.directionalLightShadows.needsUpdate=V,A.pointLights.needsUpdate=V,A.pointLightShadows.needsUpdate=V,A.spotLights.needsUpdate=V,A.spotLightShadows.needsUpdate=V,A.rectAreaLights.needsUpdate=V,A.hemisphereLights.needsUpdate=V}function HS(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return F},this.getActiveMipmapLevel=function(){return z},this.getRenderTarget=function(){return D},this.setRenderTargetTextures=function(A,V,Z){const $=x.get(A);$.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,$.__autoAllocateDepthBuffer===!1&&($.__useRenderToTexture=!1),x.get(A.texture).__webglTexture=V,x.get(A.depthTexture).__webglTexture=$.__autoAllocateDepthBuffer?void 0:Z,$.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,V){const Z=x.get(A);Z.__webglFramebuffer=V,Z.__useDefaultFramebuffer=V===void 0};const WS=O.createFramebuffer();this.setRenderTarget=function(A,V=0,Z=0){D=A,F=V,z=Z;let $=null,Y=!1,xe=!1;if(A){const be=x.get(A);if(be.__useDefaultFramebuffer!==void 0){K.bindFramebuffer(O.FRAMEBUFFER,be.__webglFramebuffer),U.copy(A.viewport),X.copy(A.scissor),J=A.scissorTest,K.viewport(U),K.scissor(X),K.setScissorTest(J),G=-1;return}else if(be.__webglFramebuffer===void 0)E.setupRenderTarget(A);else if(be.__hasExternalTextures)E.rebindTextures(A,x.get(A.texture).__webglTexture,x.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const Ye=A.depthTexture;if(be.__boundDepthTexture!==Ye){if(Ye!==null&&x.has(Ye)&&(A.width!==Ye.image.width||A.height!==Ye.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");E.setupDepthRenderbuffer(A)}}const Ne=A.texture;(Ne.isData3DTexture||Ne.isDataArrayTexture||Ne.isCompressedArrayTexture)&&(xe=!0);const De=x.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(De[V])?$=De[V][Z]:$=De[V],Y=!0):A.samples>0&&E.useMultisampledRTT(A)===!1?$=x.get(A).__webglMultisampledFramebuffer:Array.isArray(De)?$=De[Z]:$=De,U.copy(A.viewport),X.copy(A.scissor),J=A.scissorTest}else U.copy(de).multiplyScalar(Ue).floor(),X.copy(Pe).multiplyScalar(Ue).floor(),J=ke;if(Z!==0&&($=WS),K.bindFramebuffer(O.FRAMEBUFFER,$)&&K.drawBuffers(A,$),K.viewport(U),K.scissor(X),K.setScissorTest(J),Y){const be=x.get(A.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+V,be.__webglTexture,Z)}else if(xe){const be=V;for(let Ne=0;Ne<A.textures.length;Ne++){const De=x.get(A.textures[Ne]);O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0+Ne,De.__webglTexture,Z,be)}}else if(A!==null&&Z!==0){const be=x.get(A.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,be.__webglTexture,Z)}G=-1},this.readRenderTargetPixels=function(A,V,Z,$,Y,xe,Ce,be=0){if(!(A&&A.isWebGLRenderTarget)){ot("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ne=x.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Ce!==void 0&&(Ne=Ne[Ce]),Ne){K.bindFramebuffer(O.FRAMEBUFFER,Ne);try{const De=A.textures[be],Ye=De.format,Ze=De.type;if(A.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+be),!ve.textureFormatReadable(Ye)){ot("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ve.textureTypeReadable(Ze)){ot("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}V>=0&&V<=A.width-$&&Z>=0&&Z<=A.height-Y&&O.readPixels(V,Z,$,Y,k.convert(Ye),k.convert(Ze),xe)}finally{const De=D!==null?x.get(D).__webglFramebuffer:null;K.bindFramebuffer(O.FRAMEBUFFER,De)}}},this.readRenderTargetPixelsAsync=async function(A,V,Z,$,Y,xe,Ce,be=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ne=x.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Ce!==void 0&&(Ne=Ne[Ce]),Ne)if(V>=0&&V<=A.width-$&&Z>=0&&Z<=A.height-Y){K.bindFramebuffer(O.FRAMEBUFFER,Ne);const De=A.textures[be],Ye=De.format,Ze=De.type;if(A.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+be),!ve.textureFormatReadable(Ye))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ve.textureTypeReadable(Ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Oe=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,Oe),O.bufferData(O.PIXEL_PACK_BUFFER,xe.byteLength,O.STREAM_READ),O.readPixels(V,Z,$,Y,k.convert(Ye),k.convert(Ze),0);const ht=D!==null?x.get(D).__webglFramebuffer:null;K.bindFramebuffer(O.FRAMEBUFFER,ht);const Nt=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await wE(O,Nt,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,Oe),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,xe),O.deleteBuffer(Oe),O.deleteSync(Nt),xe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,V=null,Z=0){const $=Math.pow(2,-Z),Y=Math.floor(A.image.width*$),xe=Math.floor(A.image.height*$),Ce=V!==null?V.x:0,be=V!==null?V.y:0;E.setTexture2D(A,0),O.copyTexSubImage2D(O.TEXTURE_2D,Z,0,0,Ce,be,Y,xe),K.unbindTexture()};const XS=O.createFramebuffer(),jS=O.createFramebuffer();this.copyTextureToTexture=function(A,V,Z=null,$=null,Y=0,xe=0){let Ce,be,Ne,De,Ye,Ze,Oe,ht,Nt;const At=A.isCompressedTexture?A.mipmaps[xe]:A.image;if(Z!==null)Ce=Z.max.x-Z.min.x,be=Z.max.y-Z.min.y,Ne=Z.isBox3?Z.max.z-Z.min.z:1,De=Z.min.x,Ye=Z.min.y,Ze=Z.isBox3?Z.min.z:0;else{const Lt=Math.pow(2,-Y);Ce=Math.floor(At.width*Lt),be=Math.floor(At.height*Lt),A.isDataArrayTexture?Ne=At.depth:A.isData3DTexture?Ne=Math.floor(At.depth*Lt):Ne=1,De=0,Ye=0,Ze=0}$!==null?(Oe=$.x,ht=$.y,Nt=$.z):(Oe=0,ht=0,Nt=0);const pt=k.convert(V.format),Kt=k.convert(V.type);let Ae;V.isData3DTexture?(E.setTexture3D(V,0),Ae=O.TEXTURE_3D):V.isDataArrayTexture||V.isCompressedArrayTexture?(E.setTexture2DArray(V,0),Ae=O.TEXTURE_2D_ARRAY):(E.setTexture2D(V,0),Ae=O.TEXTURE_2D),K.activeTexture(O.TEXTURE0),K.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,V.flipY),K.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),K.pixelStorei(O.UNPACK_ALIGNMENT,V.unpackAlignment);const yn=K.getParameter(O.UNPACK_ROW_LENGTH),st=K.getParameter(O.UNPACK_IMAGE_HEIGHT),Ln=K.getParameter(O.UNPACK_SKIP_PIXELS),ii=K.getParameter(O.UNPACK_SKIP_ROWS),Hi=K.getParameter(O.UNPACK_SKIP_IMAGES);K.pixelStorei(O.UNPACK_ROW_LENGTH,At.width),K.pixelStorei(O.UNPACK_IMAGE_HEIGHT,At.height),K.pixelStorei(O.UNPACK_SKIP_PIXELS,De),K.pixelStorei(O.UNPACK_SKIP_ROWS,Ye),K.pixelStorei(O.UNPACK_SKIP_IMAGES,Ze);const is=A.isDataArrayTexture||A.isData3DTexture,mt=V.isDataArrayTexture||V.isData3DTexture;if(A.isDepthTexture){const Lt=x.get(A),Wi=x.get(V),gt=x.get(Lt.__renderTarget),Xi=x.get(Wi.__renderTarget);K.bindFramebuffer(O.READ_FRAMEBUFFER,gt.__webglFramebuffer),K.bindFramebuffer(O.DRAW_FRAMEBUFFER,Xi.__webglFramebuffer);for(let rs=0;rs<Ne;rs++)is&&(O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,x.get(A).__webglTexture,Y,Ze+rs),O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,x.get(V).__webglTexture,xe,Nt+rs)),O.blitFramebuffer(De,Ye,Ce,be,Oe,ht,Ce,be,O.DEPTH_BUFFER_BIT,O.NEAREST);K.bindFramebuffer(O.READ_FRAMEBUFFER,null),K.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else if(Y!==0||A.isRenderTargetTexture||x.has(A)){const Lt=x.get(A),Wi=x.get(V);K.bindFramebuffer(O.READ_FRAMEBUFFER,XS),K.bindFramebuffer(O.DRAW_FRAMEBUFFER,jS);for(let gt=0;gt<Ne;gt++)is?O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Lt.__webglTexture,Y,Ze+gt):O.framebufferTexture2D(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Lt.__webglTexture,Y),mt?O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Wi.__webglTexture,xe,Nt+gt):O.framebufferTexture2D(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Wi.__webglTexture,xe),Y!==0?O.blitFramebuffer(De,Ye,Ce,be,Oe,ht,Ce,be,O.COLOR_BUFFER_BIT,O.NEAREST):mt?O.copyTexSubImage3D(Ae,xe,Oe,ht,Nt+gt,De,Ye,Ce,be):O.copyTexSubImage2D(Ae,xe,Oe,ht,De,Ye,Ce,be);K.bindFramebuffer(O.READ_FRAMEBUFFER,null),K.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else mt?A.isDataTexture||A.isData3DTexture?O.texSubImage3D(Ae,xe,Oe,ht,Nt,Ce,be,Ne,pt,Kt,At.data):V.isCompressedArrayTexture?O.compressedTexSubImage3D(Ae,xe,Oe,ht,Nt,Ce,be,Ne,pt,At.data):O.texSubImage3D(Ae,xe,Oe,ht,Nt,Ce,be,Ne,pt,Kt,At):A.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,xe,Oe,ht,Ce,be,pt,Kt,At.data):A.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,xe,Oe,ht,At.width,At.height,pt,At.data):O.texSubImage2D(O.TEXTURE_2D,xe,Oe,ht,Ce,be,pt,Kt,At);K.pixelStorei(O.UNPACK_ROW_LENGTH,yn),K.pixelStorei(O.UNPACK_IMAGE_HEIGHT,st),K.pixelStorei(O.UNPACK_SKIP_PIXELS,Ln),K.pixelStorei(O.UNPACK_SKIP_ROWS,ii),K.pixelStorei(O.UNPACK_SKIP_IMAGES,Hi),xe===0&&V.generateMipmaps&&O.generateMipmap(Ae),K.unbindTexture()},this.initRenderTarget=function(A){x.get(A).__webglFramebuffer===void 0&&E.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?E.setTextureCube(A,0):A.isData3DTexture?E.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?E.setTexture2DArray(A,0):E.setTexture2D(A,0),K.unbindTexture()},this.resetState=function(){F=0,z=0,D=null,K.reset(),pe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return hi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=nt._getDrawingBufferColorSpace(e),n.unpackColorSpace=nt._getUnpackColorSpace()}}const Sl=225e6,Tg=4.5,bg=14,wg=90,GC=[1,10,100,1e3],th="AUTO",nh="WIDE",FS="CHASE",Hl="POV",OS="FLYBY",kS="ORBITAL",uf=[th,nh,FS,Hl,OS,kS],VC=[{id:"burn",prog:.28,label:"MID-COURSE CORRECTION BURN",sub:"Δv = +4.2 m/s  ·  Duration: 8.3 sec",color:"#f59e0b",duration:5},{id:"flare",prog:.47,label:"SOLAR PARTICLE EVENT",sub:"Class M5.2 flare  ·  Radiation shield nominal",color:"#ef4444",duration:6},{id:"update",prog:.63,label:"MISSION CONTROL UPDATE",sub:"All systems nominal  ·  Go for orbital insertion",color:"#22c55e",duration:5},{id:"nav",prog:.79,label:"NAVIGATION CORRECTION",sub:"Inclination +0.003°  ·  ΔR = 812 km",color:"#60a5fa",duration:4},{id:"comm",prog:.9,label:"COMMS DELAY  ·  14.2 MIN",sub:"Mars approach confirmed  ·  Stand by",color:"#a78bfa",duration:5}],hn=new B(-9,0,0),qn=new B(22,0,0),Wl=2.2,xg=1.5,HC=new B(-1,.35,.6).normalize();function Qi(t,e,n){return t+(e-t)*Math.max(0,Math.min(1,n))}function or(t,e,n){return Math.max(e,Math.min(n,t))}function Ag(t){const e=Math.floor(Math.max(0,t)),n=Math.floor(e/3600),i=Math.floor(e%3600/60),r=e%60;return`${String(n).padStart(2,"0")}:${String(i).padStart(2,"0")}:${String(r).padStart(2,"0")}`}function WC(t){const e=Math.max(0,t);return e>=1e6?`${(e/1e6).toFixed(2)}M km`:e>=1e3?`${(e/1e3).toFixed(0)}k km`:`${e.toFixed(0)} km`}function XC(t,e,n,i,r,s,o){return[(1-t)*(1-t)*e+2*(1-t)*t*i+t*t*s,(1-t)*(1-t)*n+2*(1-t)*t*r+t*t*o]}function jC(){const n=document.createElement("canvas");n.width=2048,n.height=1024;const i=n.getContext("2d"),r=i.createLinearGradient(0,0,0,1024);r.addColorStop(0,"#0a2855"),r.addColorStop(.5,"#0d3a70"),r.addColorStop(1,"#0a2855"),i.fillStyle=r,i.fillRect(0,0,2048,1024);for(let l=0;l<180;l++){const u=(Math.sin(l*3.7)*.5+.5)*2048,c=(Math.cos(l*2.9)*.5+.5)*1024,d=i.createRadialGradient(u,c,0,u,c,2048*.022);d.addColorStop(0,"rgba(30,100,200,0.18)"),d.addColorStop(1,"rgba(0,0,0,0)"),i.fillStyle=d,i.beginPath(),i.ellipse(u,c,2048*.022,1024*.01,l,0,Math.PI*2),i.fill()}i.globalCompositeOperation="source-over",[{x:2048*.16,y:1024*.32,rx:2048*.085,ry:1024*.2,rot:.25,c:"#2d6b28"},{x:2048*.12,y:1024*.46,rx:2048*.065,ry:1024*.13,rot:.08,c:"#316d24"},{x:2048*.2,y:1024*.64,rx:2048*.05,ry:1024*.18,rot:-.08,c:"#3a7a30"},{x:2048*.455,y:1024*.29,rx:2048*.048,ry:1024*.11,rot:.1,c:"#4a8a3a"},{x:2048*.465,y:1024*.54,rx:2048*.058,ry:1024*.22,rot:.05,c:"#7a6a28"},{x:2048*.62,y:1024*.28,rx:2048*.16,ry:1024*.19,rot:.05,c:"#4a8040"},{x:2048*.66,y:1024*.5,rx:2048*.04,ry:1024*.12,rot:.1,c:"#3a7030"},{x:2048*.765,y:1024*.62,rx:2048*.055,ry:1024*.08,rot:.18,c:"#8a7830"}].forEach(({x:l,y:u,rx:c,ry:d,rot:f,c:p})=>{i.save(),i.translate(l,u),i.rotate(f),i.fillStyle=p,i.beginPath(),i.ellipse(0,0,c,d,0,0,Math.PI*2),i.fill(),i.fillStyle="rgba(0,0,0,0.12)";for(let m=0;m<8;m++)i.beginPath(),i.ellipse((Math.random()-.5)*c,(Math.random()-.5)*d,c*.3*Math.random(),d*.25*Math.random(),Math.random(),0,Math.PI*2),i.fill();i.restore()}),i.fillStyle="rgba(255,255,255,0.22)";for(let l=0;l<200;l++){const u=(Math.sin(l*4.1+1)*.5+.5)*2048,c=(Math.cos(l*3.7+2)*.5+.5)*1024;i.beginPath(),i.ellipse(u,c,2048*.038,1024*.018,l*.8,0,Math.PI*2),i.fill()}i.fillStyle="rgba(255,255,255,0.14)";for(let l=0;l<120;l++){const u=(Math.sin(l*5.3+3)*.5+.5)*2048,c=(Math.cos(l*4.1+1)*.5+.5)*1024;i.beginPath(),i.ellipse(u,c,2048*.055,1024*.025,l*1.1,0,Math.PI*2),i.fill()}const o=i.createLinearGradient(0,0,0,1024*.1);o.addColorStop(0,"rgba(235,245,255,0.95)"),o.addColorStop(1,"rgba(200,225,255,0)"),i.fillStyle=o,i.fillRect(0,0,2048,1024*.1);const a=i.createLinearGradient(0,1024*.9,0,1024);return a.addColorStop(0,"rgba(200,225,255,0)"),a.addColorStop(1,"rgba(235,245,255,0.90)"),i.fillStyle=a,i.fillRect(0,1024*.9,2048,1024*.1),new Ea(n)}function $C(){const n=document.createElement("canvas");n.width=2048,n.height=1024;const i=n.getContext("2d");return i.fillStyle="#000",i.fillRect(0,0,2048,1024),[[2048*.2,1024*.33,18],[2048*.15,1024*.4,14],[2048*.22,1024*.39,10],[2048*.47,1024*.3,16],[2048*.5,1024*.32,12],[2048*.44,1024*.31,10],[2048*.58,1024*.3,14],[2048*.64,1024*.31,12],[2048*.7,1024*.29,10],[2048*.72,1024*.35,9],[2048*.66,1024*.4,8],[2048*.22,1024*.62,9],[2048*.47,1024*.5,8],[2048*.77,1024*.63,7],[2048*.66,1024*.48,10]].forEach(([s,o,a])=>{const l=i.createRadialGradient(s,o,0,s,o,57.344);l.addColorStop(0,"rgba(255,220,100,0.85)"),l.addColorStop(.5,"rgba(255,180,60,0.40)"),l.addColorStop(1,"rgba(0,0,0,0)"),i.fillStyle=l,i.beginPath(),i.arc(s,o,2048*.028,0,Math.PI*2),i.fill();for(let u=0;u<a;u++){const c=(Math.random()-.5)*2048*.035,d=(Math.random()-.5)*1024*.03,f=.35+Math.random()*.55;i.fillStyle=`rgba(255,${150+Math.random()*105|0},${40+Math.random()*60|0},${f})`,i.fillRect(s+c|0,o+d|0,2,2)}}),new Ea(n)}function YC(){const n=document.createElement("canvas");n.width=1024,n.height=512;const i=n.getContext("2d");return i.fillStyle="#888",i.fillRect(0,0,1024,512),i.fillStyle="#222",[[1024*.16,512*.32,1024*.085,512*.2,.25],[1024*.12,512*.46,1024*.065,512*.13,.08],[1024*.2,512*.64,1024*.05,512*.18,-.08],[1024*.455,512*.29,1024*.048,512*.11,.1],[1024*.465,512*.54,1024*.058,512*.22,.05],[1024*.62,512*.28,1024*.16,512*.19,.05],[1024*.66,512*.5,1024*.04,512*.12,.1],[1024*.765,512*.62,1024*.055,512*.08,.18]].forEach(([r,s,o,a,l])=>{i.save(),i.translate(r,s),i.rotate(l),i.beginPath(),i.ellipse(0,0,o,a,0,0,Math.PI*2),i.fill(),i.restore()}),new Ea(n)}function qC(){const n=document.createElement("canvas");n.width=2048,n.height=1024;const i=n.getContext("2d"),r=i.createLinearGradient(0,0,0,1024);r.addColorStop(0,"#a03818"),r.addColorStop(.5,"#c04822"),r.addColorStop(1,"#a03818"),i.fillStyle=r,i.fillRect(0,0,2048,1024),[[2048*.4,1024*.42,2048*.18,1024*.15,0,"rgba(160,50,16,0.42)"],[2048*.7,1024*.5,2048*.14,1024*.18,0,"rgba(185,72,24,0.35)"],[2048*.2,1024*.62,2048*.12,1024*.12,0,"rgba(135,38,10,0.38)"],[2048*.55,1024*.25,2048*.22,1024*.1,0,"rgba(190,82,28,0.28)"],[2048*.8,1024*.35,2048*.1,1024*.14,0,"rgba(155,55,18,0.32)"],[2048*.05,1024*.55,2048*.08,1024*.16,0,"rgba(175,62,20,0.30)"]].forEach(([l,u,c,d,f,p])=>{i.save(),i.translate(l,u),i.rotate(f),i.fillStyle=p,i.beginPath(),i.ellipse(0,0,c,d,0,0,Math.PI*2),i.fill(),i.fillStyle="rgba(0,0,0,0.10)";for(let m=0;m<6;m++)i.beginPath(),i.ellipse((Math.random()-.5)*c,(Math.random()-.5)*d,c*.25,d*.2,Math.random(),0,Math.PI*2),i.fill();i.restore()}),i.save(),i.translate(2048*.48,1024*.46),i.rotate(-.14),i.fillStyle="rgba(80,18,4,0.55)",i.fillRect(-2048*.2,-1024*.025,2048*.4,1024*.042),i.fillStyle="rgba(60,12,2,0.30)",i.fillRect(-2048*.2,-1024*.014,2048*.4,1024*.028),i.restore();const s=i.createRadialGradient(2048*.28,1024*.4,0,2048*.28,1024*.4,2048*.055);s.addColorStop(0,"rgba(215,95,38,0.65)"),s.addColorStop(.6,"rgba(185,70,24,0.20)"),s.addColorStop(1,"rgba(0,0,0,0)"),i.fillStyle=s,i.beginPath(),i.arc(2048*.28,1024*.4,2048*.055,0,Math.PI*2),i.fill(),i.fillStyle="rgba(210,115,48,0.14)",i.fillRect(0,1024*.42,2048,1024*.18);const o=i.createLinearGradient(0,0,0,1024*.1);o.addColorStop(0,"rgba(235,228,220,0.90)"),o.addColorStop(1,"rgba(0,0,0,0)"),i.fillStyle=o,i.fillRect(0,0,2048,1024*.1);const a=i.createLinearGradient(0,1024*.9,0,1024);return a.addColorStop(0,"rgba(0,0,0,0)"),a.addColorStop(1,"rgba(225,218,210,0.82)"),i.fillStyle=a,i.fillRect(0,1024*.9,2048,1024*.1),new Ea(n)}const Cg=`
varying vec3 vNormal;
varying vec3 vViewDir;
void main() {
  vNormal = normalize(normalMatrix * normal);
  vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
  vViewDir = normalize(-mvPos.xyz);
  gl_Position = projectionMatrix * mvPos;
}`,Rg=`
uniform vec3 glowColor;
uniform float intensity;
uniform float power;
varying vec3 vNormal;
varying vec3 vViewDir;
void main() {
  float rim = 1.0 - clamp(dot(vNormal, vViewDir), 0.0, 1.0);
  rim = pow(rim, power);
  gl_FragColor = vec4(glowColor, rim * intensity);
}`;function KC(){const t=new GE;t.fog=new gp(67088,.0012);const e=new Zm(16775400,3.2);e.position.copy(HC).multiplyScalar(50),t.add(e);const n=new VT(660520,1.2);t.add(n);const i=new Zm(1716320,.8);i.position.set(30,5,10),t.add(i);function r(T,b){const w=new on,y=new Float32Array(T*3),C=new Float32Array(T*3);for(let N=0;N<T;N++){const I=Math.random()*Math.PI*2,F=Math.acos(2*Math.random()-1),z=b*.5+b*.5*Math.random();y[N*3]=z*Math.sin(F)*Math.cos(I),y[N*3+1]=z*Math.sin(F)*Math.sin(I),y[N*3+2]=z*Math.cos(F);const D=Math.random()<.07,G=Math.random()<.06;C[N*3]=D?1:G?.72:.88,C[N*3+1]=D?.8:G?.82:.9,C[N*3+2]=D?.5:1}w.setAttribute("position",new Bn(y,3)),w.setAttribute("color",new Bn(C,3));const R=new hS({size:1.4,vertexColors:!0,sizeAttenuation:!1});return new JE(w,R)}const s=r(3500,800),o=r(1200,400);t.add(s),t.add(o);const a=new Ur(Wl,96,96),l=new Rr({map:jC(),specularMap:YC(),specular:new Ke(2250120),shininess:55,emissiveMap:$C(),emissive:new Ke(16752688),emissiveIntensity:.55}),u=new It(a,l);u.position.copy(hn),u.rotation.y=-.4,t.add(u);const c=new It(new Ur(Wl*1.055,64,64),new Vn({uniforms:{glowColor:{value:new Ke(3381759)},intensity:{value:1.65},power:{value:3.8}},vertexShader:Cg,fragmentShader:Rg,transparent:!0,blending:vu,side:_i,depthWrite:!1}));u.add(c);const d=new Ur(Wl*1.01,64,64);function f(){const w=document.createElement("canvas");w.width=1024,w.height=512;const y=w.getContext("2d");y.fillStyle="rgba(0,0,0,0)",y.clearRect(0,0,1024,512),y.fillStyle="rgba(255,255,255,0.22)";for(let C=0;C<300;C++){const R=(Math.sin(C*3.1+1)*.5+.5)*1024,N=(Math.cos(C*4.7+2)*.5+.5)*512;y.beginPath(),y.ellipse(R,N,1024*.042,512*.02,C*.9,0,Math.PI*2),y.fill()}return new Ea(w)}const p=new Rr({map:f(),transparent:!0,opacity:.6,depthWrite:!1,blending:Wr}),m=new It(d,p);m.name="clouds",u.add(m);const _=new Ur(xg,96,96),g=new Rr({map:qC(),specular:new Ke(1118481),shininess:8}),h=new It(_,g);h.position.copy(qn),h.rotation.y=.5,t.add(h);const v=new It(new Ur(xg*1.045,64,64),new Vn({uniforms:{glowColor:{value:new Ke(13391138)},intensity:{value:1.2},power:{value:4.5}},vertexShader:Cg,fragmentShader:Rg,transparent:!0,blending:vu,side:_i,depthWrite:!1}));h.add(v);function S(){const T=new Po,b=new Rr({color:13160672,specular:8952234,shininess:120}),w=new Rr({color:13378082,specular:4460817,shininess:60}),y=new It(new zs(.1,.12,.6,16),b);y.rotation.z=Math.PI/2,T.add(y);const C=new It(new zs(.101,.121,.08,16),w);C.rotation.z=Math.PI/2,C.position.x=-.1,T.add(C);const R=new It(new Vo(.1,.28,16),b);R.rotation.z=Math.PI/2,R.position.x=.44,T.add(R);const N=new It(new zs(.14,.1,.14,16),new Rr({color:7833753,specular:11189196,shininess:150}));N.rotation.z=Math.PI/2,N.position.x=-.37,T.add(N);const I=new yS;I.moveTo(0,0),I.lineTo(-.22,0),I.lineTo(-.22,.22),I.lineTo(0,.1),I.closePath();const F=new Mp(I),z=new Rr({color:8952234,side:fi});[0,Math.PI/2,Math.PI,Math.PI*1.5].forEach(X=>{const J=new It(F,z);J.position.x=-.24,J.rotation.y=Math.PI/2,J.rotation.x=X,T.add(J)});const D=new Tu({color:16750912,transparent:!0,opacity:.88});[-.06,.06].forEach(X=>{const J=new Vo(.055,.45,8),se=new It(J,D);se.position.set(-.6,X,0),se.rotation.z=Math.PI/2,se.name="plume",T.add(se)});const G=new Tu({color:16777215,transparent:!0,opacity:.75});[-.06,.06].forEach(X=>{const J=new Vo(.025,.22,8),se=new It(J,G);se.position.set(-.52,X,0),se.rotation.z=Math.PI/2,se.name="plume",T.add(se)});const H=new Km(16742192,5,3.5);H.position.set(-.65,-.06,0),T.add(H);const U=new Km(16742192,5,3.5);return U.position.set(-.65,.06,0),T.add(U),T}const M=S();return M.name="spacecraft",t.add(M),{scene:t,earth:u,mars:h,spacecraft:M,stars1:s,stars2:o}}function Xl(t){const e=hn.x,n=hn.y,i=qn.x,r=qn.y,s=(e+i)*.5,o=Math.min(n,r)+6,[a,l]=XC(t,e,n,s,o,i,r),u=hn.z,c=qn.z,d=Qi(u,c,t)+Math.sin(t*Math.PI)*1.5;return new B(a,l,d)}function ZC(t){const e=[];for(let s=0;s<=80;s++)e.push(Xl(s/80));const n=new on().setFromPoints(e),i=new BT({color:52479,linewidth:1,dashSize:.4,gapSize:.25,transparent:!0,opacity:.55}),r=new ZE(n,i);return r.computeLineDistances(),t.add(r),r}function Pg(t,e,n){t.fillStyle="rgba(255,255,255,0.040)";for(let i=0;i<1400;i++)t.fillRect(Math.random()*e|0,Math.random()*n|0,1,1);t.fillStyle="rgba(0,0,0,0.025)";for(let i=0;i<700;i++)t.fillRect(Math.random()*e|0,Math.random()*n|0,1,1)}function To(t,e,n,i,r,s,o,a){const l=-Math.PI*.78,u=Math.PI*1.56;t.beginPath(),t.arc(e,n,i,l,l+u),t.strokeStyle="rgba(255,255,255,0.07)",t.lineWidth=i*.2,t.lineCap="butt",t.stroke(),r>.005&&(t.beginPath(),t.arc(e,n,i,l,l+r*u),t.strokeStyle=a,t.lineWidth=i*.2,t.lineCap="round",t.shadowBlur=8,t.shadowColor=a,t.stroke(),t.shadowBlur=0),t.fillStyle="rgba(210,235,255,0.92)",t.font=`bold ${Math.round(i*.38)}px monospace`,t.textAlign="center",t.textBaseline="middle",t.fillText(o,e,n),t.fillStyle="rgba(100,150,190,0.60)",t.font=`${Math.round(i*.28)}px monospace`,t.textBaseline="alphabetic",t.fillText(s,e,n+i*1.22)}function JC(t,e,n,i,r){const s=n*.175,o=n-s,a=Math.min(s*.3,e*.03),l=o+s*.44,u=[e*.345,e*.425,e*.505,e*.585,e*.665],c=or(i/37300,0,1),d=or(.84-r*.09,0,1),f=or(.76-r*.05,0,1);To(t,u[0],l,a,c,"VEL",`${(i/1e3).toFixed(1)}k`,"#00e8a4"),To(t,u[1],l,a*.88,d,"FUEL",`${Math.round(d*100)}%`,"#00d4ff"),To(t,u[2],l,a*1.12,f,"THR",`${Math.round(f*100)}%`,"#f59e0b"),To(t,u[3],l,a*.88,.94,"O2","94%","#22c55e"),To(t,u[4],l,a*.88,.55+r*.1,"TMP",`${21+Math.round(r*4)}°C`,"#a78bfa");const p="rgba(0,180,255,0.14)",m="rgba(0,200,255,0.70)",_=e*.054,g=s*.23;[["NAV",e*.226],["HUD",e*.226],["SYS",e*.226]].forEach(([h,v],S)=>{const M=o+s*(.14+S*.29);t.fillStyle=p,t.fillRect(v,M,_,g),t.strokeStyle="rgba(0,180,255,0.32)",t.lineWidth=.8,t.strokeRect(v,M,_,g),t.fillStyle=m,t.font=`${Math.round(_*.22)}px monospace`,t.textAlign="center",t.textBaseline="middle",t.fillText(h,v+_/2,M+g/2)}),[["COM",e-e*.226-_],["AUX",e-e*.226-_],["PWR",e-e*.226-_]].forEach(([h,v],S)=>{const M=o+s*(.14+S*.29);t.fillStyle=p,t.fillRect(v,M,_,g),t.strokeStyle="rgba(0,180,255,0.32)",t.lineWidth=.8,t.strokeRect(v,M,_,g),t.fillStyle=m,t.font=`${Math.round(_*.22)}px monospace`,t.textAlign="center",t.textBaseline="middle",t.fillText(h,v+_/2,M+g/2)})}function QC(t,e,n,i,r){if(i<.01)return;t.save(),t.globalAlpha=i;const s="rgba(5,9,20,0.97)",o=e*.22,a=e-e*.22,l=n*.068,u=n-n*.175,c=16;t.beginPath(),t.rect(0,0,e,n),t.moveTo(o+c,l),t.lineTo(a-c,l),t.quadraticCurveTo(a,l,a,l+c),t.lineTo(a,u-c),t.quadraticCurveTo(a,u,a-c,u),t.lineTo(o+c,u),t.quadraticCurveTo(o,u,o,u-c),t.lineTo(o,l+c),t.quadraticCurveTo(o,l,o+c,l),t.closePath(),t.fillStyle=s,t.fill("evenodd"),t.strokeStyle="rgba(0,190,255,0.40)",t.lineWidth=1.6,t.shadowBlur=14,t.shadowColor="rgba(0,190,255,0.40)",t.beginPath(),t.moveTo(o+c,l),t.lineTo(a-c,l),t.quadraticCurveTo(a,l,a,l+c),t.lineTo(a,u-c),t.quadraticCurveTo(a,u,a-c,u),t.lineTo(o+c,u),t.quadraticCurveTo(o,u,o,u-c),t.lineTo(o,l+c),t.quadraticCurveTo(o,l,o+c,l),t.closePath(),t.stroke(),t.shadowBlur=0;const d=o*.08,f=n*.12,p=o*.84,m=n*.54,_=10;t.strokeStyle="rgba(0,160,255,0.35)",t.lineWidth=1,t.shadowBlur=6,t.shadowColor="rgba(0,160,255,0.28)",t.beginPath(),t.moveTo(d+_,f),t.lineTo(d+p-_,f),t.quadraticCurveTo(d+p,f,d+p,f+_),t.lineTo(d+p,f+m-_),t.quadraticCurveTo(d+p,f+m,d+p-_,f+m),t.lineTo(d+_,f+m),t.quadraticCurveTo(d,f+m,d,f+m-_),t.lineTo(d,f+_),t.quadraticCurveTo(d,f,d+_,f),t.closePath(),t.stroke(),t.shadowBlur=0,t.fillStyle="rgba(0,190,255,0.42)",t.font="8px 'Courier New',monospace",t.textAlign="left",t.textBaseline="alphabetic",t.fillText("EARTH",d+7,f+m-8),[{x:d+p*.2,c:"#22c55e",l:"PWR"},{x:d+p*.5,c:"#22c55e",l:"NAV"},{x:d+p*.8,c:"#f59e0b",l:"THR"}].forEach(({x:g,c:h,l:v})=>{const S=f-18;t.fillStyle=h,t.shadowBlur=6,t.shadowColor=h,t.beginPath(),t.arc(g,S,3.5,0,Math.PI*2),t.fill(),t.shadowBlur=0,t.fillStyle="rgba(180,210,240,0.55)",t.font="7px monospace",t.textAlign="center",t.fillText(v,g,S+11)}),t.restore()}function eR({onPlayAgain:t}){const e=W.useRef(null),n=W.useRef(null),i=W.useRef(null),r=W.useRef(null),s=W.useRef(null),o=W.useRef(null),a=W.useRef(null),l=W.useRef(!1),u=W.useRef({W:1,H:1}),c=W.useRef(0),d=W.useRef(0),f=W.useRef(!1),p=W.useRef("emerge"),m=W.useRef(nh),_=W.useRef(1),g=W.useRef(1),h=W.useRef(0),v=W.useRef(null),S=W.useRef(0),M=W.useRef(0),T=W.useRef(1),b=W.useRef(new Set),w=W.useRef(null),y=W.useRef(0),C=W.useRef(!1),R=W.useRef(new B(0,0,10)),N=W.useRef(new B(0,0,0)),[I,F]=W.useState("emerge"),[z,D]=W.useState(nh),[G,H]=W.useState(1),[U,X]=W.useState(1),[J,se]=W.useState(!1),[ye,Ge]=W.useState(!1),[He,Ue]=W.useState(0),[te,me]=W.useState(Sl),[de,Pe]=W.useState(32500),[ke,Fe]=W.useState(null);W.useEffect(()=>{p.current=I,d.current=0,f.current=!1,C.current=!1},[I]),W.useEffect(()=>{m.current=z},[z]),W.useEffect(()=>{_.current=G},[G]),W.useEffect(()=>{g.current=U},[U]),W.useEffect(()=>g2(),[]),W.useEffect(()=>{const he=e.current;if(!he)return;const{W:lt,H:tt}=(()=>{var ne;const j=((ne=he.parentElement)==null?void 0:ne.getBoundingClientRect())||{width:800,height:600};return{W:j.width|0,H:j.height|0}})();u.current={W:lt,H:tt};const We=new zC({canvas:he,antialias:!0,alpha:!1});We.setPixelRatio(Math.min(window.devicePixelRatio,2)),We.setSize(lt,tt),We.toneMapping=op,We.toneMappingExposure=1.1,We.shadowMap.enabled=!1,i.current=We;const O=new bn(52,lt/tt,.05,5e3);O.position.set(-6,2,8),O.lookAt(hn),s.current=O,R.current.copy(O.position),N.current.copy(hn);const{scene:Be,earth:q,mars:ve,spacecraft:K,stars1:ue,stars2:x}=KC();r.current=Be,o.current={earth:q,mars:ve,spacecraft:K,stars1:ue,stars2:x};const E=ZC(Be);a.current=E,E.visible=!1,l.current=!0;function L(){const j=he.parentElement;if(!j)return;const ne=j.clientWidth|0,ce=j.clientHeight|0;u.current={W:ne,H:ce},We.setSize(ne,ce),O.aspect=ne/ce,O.updateProjectionMatrix(),n.current&&(n.current.width=ne,n.current.height=ce)}return window.addEventListener("resize",L),L(),()=>{window.removeEventListener("resize",L),We.dispose()}},[]);const it=W.useCallback(he=>{D(he),m.current=he,se(!1)},[]),Xe=W.useCallback(()=>{v.current=c.current,Ge(!1),se(!0),F("transit"),a.current&&(a.current.visible=!0)},[]),et=W.useCallback(he=>{if(!l.current||!i.current||!r.current||!s.current)return;const lt=i.current,tt=r.current,We=s.current,{W:O,H:Be}=u.current,q=p.current,ve=_.current,K=q==="transit"?he*ve:he;c.current+=he,d.current+=K;const ue=c.current,x=d.current,{earth:E,mars:L,spacecraft:j,stars1:ne,stars2:ce}=o.current;E.rotation.y+=he*.018,L.rotation.y+=he*.012;const ge=E.getObjectByName("clouds");ge&&(ge.rotation.y+=he*.022),j.traverse(re=>{re.name==="plume"&&(re.material.opacity=.7+.18*Math.sin(ue*14),re.scale.set(1,.85+.15*Math.sin(ue*18),1))}),m.current===th&&(M.current+=he,M.current>20&&(M.current=0,T.current=T.current%(uf.length-1)+1));const Q=m.current===th?uf[T.current]:m.current,ee=Math.min(he*3.5,1);if(q==="emerge"){const re=or(x/Tg,0,1);j.visible=!1,a.current.visible=!1,L.visible=!1;const oe=new B(-4+re*2,1.5-re*1.5,5+re*1),ae=hn.clone().add(new B(0,.5,0));R.current.lerp(oe,ee),N.current.lerp(ae,ee),x>=Tg&&!f.current&&(f.current=!0,L.visible=!0,F("orbit"))}else if(q==="orbit"){L.visible=!0,j.visible=!0,a.current.visible=!1;const re=-.18+ue*.25,oe=Wl*1.8,ae=hn.x+Math.cos(re)*oe,Me=hn.z+Math.sin(re)*oe;j.position.set(ae,hn.y,Me),j.lookAt(hn),j.rotateY(Math.PI/2);const Ve=new B(-6,2.5,9),k=new B(hn.x,0,0);R.current.lerp(Ve,ee),N.current.lerp(k,ee),x>=2.5&&!C.current&&(C.current=!0,Ge(!0))}else if(q==="transit"){const re=or(x/wg,0,1);h.current=re,j.visible=!0,a.current.visible=!0;const oe=Xl(re);if(j.position.copy(oe),re<.998){const ae=Xl(Math.min(1,re+.02));j.lookAt(ae),j.rotateY(-Math.PI/2)}if(Q===Hl){const ae=oe.clone().add(new B(.3,.15,0)),Me=qn.clone();R.current.lerp(ae,ee*.8),N.current.lerp(Me,ee),We.fov=Qi(52,48,re),We.updateProjectionMatrix()}else if(Q===FS){const ae=Xl(Math.max(0,re-.04)),Me=new B(ae.x,ae.y+1.5,ae.z+4.5);R.current.lerp(Me,ee),N.current.lerp(oe,ee),We.fov=56,We.updateProjectionMatrix()}else if(Q===OS){const ae=new B(oe.x+Math.cos(ue*.22)*8,oe.y+Math.sin(ue*.14)*3,oe.z+Math.sin(ue*.22)*8);R.current.lerp(ae,ee*.6),N.current.lerp(oe,ee),We.fov=65,We.updateProjectionMatrix()}else if(Q===kS){const ae=hn.clone().lerp(qn,re),Me=new B(ae.x,28,12);R.current.lerp(Me,ee*.5),N.current.lerp(ae,ee*.5),We.fov=55,We.updateProjectionMatrix()}else{const ae=hn.x,Me=qn.x,Ve=Qi(ae+1,Me-3,re),k=Qi(3,2,re),pe=Qi(9,8,re),ie=new B(Ve,k,pe),we=new B(Qi(ae,Me,re),0,0);R.current.lerp(ie,ee*.4),N.current.lerp(we,ee*.4),We.fov=52,We.updateProjectionMatrix()}VC.forEach(ae=>{re>=ae.prog&&!b.current.has(ae.id)&&(b.current.add(ae.id),w.current=ae,y.current=ae.duration,Fe(ae))}),w.current&&y.current>0&&(y.current-=he,y.current<=0&&(w.current=null,Fe(null))),ue-S.current>.18&&(S.current=ue,Ue(v.current!==null?ue-v.current:0),me(Sl*(1-re)),Pe(Math.round(32500+re*4800))),x>=wg&&!f.current&&(f.current=!0,F("approach"))}else if(q==="approach"){const re=or(x/bg,0,1);j.visible=!1,a.current.visible=!1;const oe=new B(qn.x-2+re*2,2-re*1.5,7-re*3),ae=qn.clone();R.current.lerp(oe,ee*.5),N.current.lerp(ae,ee*.5),We.fov=Qi(52,38,re),We.updateProjectionMatrix(),ue-S.current>.22&&(S.current=ue,Ue(v.current!==null?ue-v.current:0),me(Math.max(0,Sl*(1-or(1+re*.01,0,1)))),Pe(Math.round(Qi(37300,3200,re)))),x>=bg&&!f.current&&(f.current=!0,setTimeout(()=>F("arrival"),400))}else if(q==="arrival"){j.visible=!1,a.current.visible=!1;const re=new B(qn.x,.5,5);R.current.lerp(re,ee*.3),N.current.lerp(qn,ee*.3)}We.position.copy(R.current),We.lookAt(N.current),ne.rotation.y+=he*.001,ce.rotation.y-=he*6e-4,lt.render(tt,We);const _e=n.current;if(!_e)return;const Ee=_e.getContext("2d");if(Ee.clearRect(0,0,O,Be),q==="transit"||q==="approach"){if(Q===Hl||q==="approach"){const re=or(h.current*4,0,1);re>.05&&Q===Hl&&(QC(Ee,O,Be,re),JC(Ee,O,Be,Math.round(32500+h.current*4800),h.current))}Pg(Ee,O,Be)}else(q==="emerge"||q==="orbit")&&Pg(Ee,O,Be)},[]);Zh(et);const ut=I==="transit"||I==="approach";return P.jsxs("div",{className:"mars-scene",children:[P.jsx("canvas",{ref:e,className:"mars-canvas"}),P.jsx("canvas",{ref:n,style:{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:1}}),ut&&P.jsxs("div",{className:"mars-telemetry",style:{opacity:U},children:[P.jsx("div",{className:"mtel-label",children:"MISSION TELEMETRY"}),P.jsxs("div",{className:"mtel-row",children:[P.jsx("span",{children:"MISSION TIME"}),P.jsx("span",{children:Ag(He)})]}),P.jsxs("div",{className:"mtel-row",children:[P.jsx("span",{children:"DIST TO MARS"}),P.jsx("span",{children:WC(te)})]}),P.jsxs("div",{className:"mtel-row",children:[P.jsx("span",{children:"VELOCITY"}),P.jsxs("span",{children:[de.toLocaleString()," m/s"]})]}),P.jsxs("div",{className:"mtel-row",children:[P.jsx("span",{children:"LIFE SUPPORT"}),P.jsx("span",{className:"mtel-ok",children:"NOMINAL"})]}),P.jsxs("div",{className:"mtel-row",children:[P.jsx("span",{children:"PROPULSION"}),P.jsx("span",{className:"mtel-ok",children:"NOMINAL"})]}),P.jsxs("div",{className:"mtel-row",children:[P.jsx("span",{children:"COMMS DELAY"}),P.jsx("span",{children:I==="transit"?`${(4+Math.abs(Math.sin((te/Sl-.5)*Math.PI))*8.5).toFixed(1)} min`:"0.3 min"})]})]}),ut&&P.jsx("div",{className:"mars-mc-bar",style:{opacity:U},children:["PWR","FUEL","NAV","COMMS","DIAG","ENG"].map(he=>P.jsx("span",{className:"mc-item mc-ok",children:he},he))}),J&&I==="transit"&&P.jsxs("div",{className:"mars-director",children:[P.jsx("div",{className:"mdir-title",children:"DIRECTOR MODE"}),P.jsx("div",{className:"mdir-section",children:"CAMERA"}),P.jsx("div",{className:"mdir-row",children:uf.map(he=>P.jsx("button",{className:`mdir-btn${z===he?" mdir-btn--on":""}`,onClick:()=>it(he),children:he==="AUTO"?"⟳ AUTO":he==="WIDE"?"⊞ WIDE":he==="CHASE"?"⊿ CHASE":he==="POV"?"⊙ POV":he==="FLYBY"?"⤢ FLYBY":"◎ ORBITAL"},he))}),P.jsx("div",{className:"mdir-section",children:"TIME SCALE"}),P.jsx("div",{className:"mdir-row",children:GC.map(he=>P.jsxs("button",{className:`mdir-btn${G===he?" mdir-btn--on":""}`,onClick:()=>H(he),children:[he,"×"]},he))}),P.jsx("div",{className:"mdir-section",children:"HUD OPACITY"}),P.jsx("div",{className:"mdir-row",children:[0,.5,.75,1].map(he=>P.jsx("button",{className:`mdir-btn${U===he?" mdir-btn--on":""}`,onClick:()=>X(he),children:he===0?"OFF":Math.round(he*100)+"%"},he))})]}),I==="transit"&&P.jsx("button",{className:"mdir-toggle",onClick:()=>se(he=>!he),children:J?"✕":"⊞ DIRECTOR"}),ke&&P.jsxs("div",{className:"mars-event",style:{borderColor:ke.color},children:[P.jsx("div",{className:"mevent-label",style:{color:ke.color},children:ke.label}),P.jsx("div",{className:"mevent-sub",children:ke.sub})]}),ye&&P.jsx("div",{className:"mars-mode-overlay",children:P.jsxs("div",{className:"mmo-card",children:[P.jsx("div",{className:"mmo-pre",children:"LOW EARTH ORBIT · STAND BY"}),P.jsx("div",{className:"mmo-title",children:"BEGIN EARTH–MARS TRANSIT"}),P.jsxs("div",{className:"mmo-sub",children:["All systems nominal. Vehicle ready for trans-Mars injection burn.",P.jsx("br",{}),"Use Director Mode during transit to switch cameras and time scale."]}),P.jsx("div",{className:"mmo-options",children:P.jsxs("button",{className:"mmo-btn mmo-btn-featured",onClick:Xe,children:[P.jsx("span",{className:"mmo-btn-title",children:"INITIATE TRANSIT"}),P.jsx("span",{className:"mmo-btn-desc",children:"Cinematic · Director Mode · Switch cameras live"})]})})]})}),I==="arrival"&&P.jsxs("div",{className:"mars-arrival",children:[P.jsx("div",{className:"arr-pre",children:"MARS ORBIT INSERTION · CONFIRMED"}),P.jsx("div",{className:"arr-title",children:"SIMULATION CONCLUDED"}),P.jsxs("div",{className:"arr-data",children:[P.jsxs("div",{className:"arr-row",children:[P.jsx("span",{children:"MISSION TIME"}),P.jsx("span",{children:Ag(He)})]}),P.jsxs("div",{className:"arr-row",children:[P.jsx("span",{children:"PHASES COMPLETE"}),P.jsx("span",{children:"3 / 3"})]}),P.jsxs("div",{className:"arr-row",children:[P.jsx("span",{children:"ROCKET BUILDER"}),P.jsx("span",{className:"arr-ok",children:"CONFIRMED"})]}),P.jsxs("div",{className:"arr-row",children:[P.jsx("span",{children:"DEBUG ARENA"}),P.jsx("span",{className:"arr-ok",children:"CONFIRMED"})]}),P.jsxs("div",{className:"arr-row",children:[P.jsx("span",{children:"VISUAL LAB"}),P.jsx("span",{className:"arr-ok",children:"CONFIRMED"})]})]}),P.jsx("p",{className:"arr-sub",children:"All six systems repaired. All faults resolved. Mars orbital insertion nominal."}),t&&P.jsx("button",{className:"arr-play-again-btn",onClick:t,children:"PLAY AGAIN"})]})]})}const Ng=5.2,cf=.55,yl=3.1,ff=4.4,tR={power_restoration:{system:"POWER SYSTEMS",subtitle:"Primary fault resolved",action:"Repairing power conduits...",fault:["FAULT DETECTED","Fuel system pressure critical"],interior:"power",isLast:!1,accent:"#f59e0b",accent2:"#ef4444",bg1:"#04080f",bg2:"#08101e"},fuel_calculation:{system:"FUEL SYSTEMS",subtitle:"Pressure fault resolved",action:"Recalibrating fuel lines...",fault:["FAULT DETECTED","Navigation matrix corrupted"],interior:"fuel",isLast:!1,accent:"#f97316",accent2:"#dc2626",bg1:"#100400",bg2:"#180900"},nav_calibration:{system:"NAVIGATION",subtitle:"Gyroscopic fault resolved",action:"Recalibrating guidance sensors...",fault:["FAULT DETECTED","Communications array offline"],interior:"nav",isLast:!1,accent:"#06b6d4",accent2:"#0ea5e9",bg1:"#020c12",bg2:"#04141e"},comms_signal:{system:"COMMUNICATIONS",subtitle:"Signal fault resolved",action:"Restoring relay nodes...",fault:["FAULT DETECTED","Diagnostic systems unresponsive"],interior:"comms",isLast:!1,accent:"#22c55e",accent2:"#16a34a",bg1:"#020e06",bg2:"#04160a"},diagnostics_scan:{system:"DIAGNOSTICS",subtitle:"Diagnostic fault resolved",action:"Running full system scan...",fault:["FAULT DETECTED","Engine ignition sequence failure"],interior:"diagnostics",isLast:!1,accent:"#818cf8",accent2:"#6366f1",bg1:"#04040e",bg2:"#08081a"},engine_ignition:{system:"ENGINE CORE",subtitle:"All faults resolved",action:"Aligning ignition coils...",fault:["ALL SYSTEMS NOMINAL","Launch sequence ready"],interior:"engine",isLast:!0,accent:"#fb923c",accent2:"#22c55e",bg1:"#0e0300",bg2:"#180500"}};function rt(t,e,n,i,r,s){s=Math.min(s,i/2,r/2),t.beginPath(),t.moveTo(e+s,n),t.lineTo(e+i-s,n),t.arcTo(e+i,n,e+i,n+s,s),t.lineTo(e+i,n+r-s),t.arcTo(e+i,n+r,e+i-s,n+r,s),t.lineTo(e+s,n+r),t.arcTo(e,n+r,e,n+r-s,s),t.lineTo(e,n+s),t.arcTo(e,n,e+s,n,s),t.closePath()}function nR(t,e,n,i,r){const s=r?i:0;t.save(),t.globalAlpha=.25,t.fillStyle="#000",t.beginPath(),t.ellipse(e,n+4,30,9,0,0,Math.PI*2),t.fill(),t.restore();const o=t.createLinearGradient(e-26,n-10,e-26,n+6);o.addColorStop(0,"#374151"),o.addColorStop(1,"#111827"),t.fillStyle=o,rt(t,e-26,n-10,52,14,5),t.fill(),t.strokeStyle="#4b5563",t.lineWidth=1,rt(t,e-26,n-10,52,14,5),t.stroke();for(let F=0;F<7;F++){const z=(F*7.4+i*18)%52-26;t.fillStyle="#1f2937",rt(t,e+z-2,n-7,4,8,2),t.fill()}const a=t.createLinearGradient(e-20,n-55,e+20,n-10);a.addColorStop(0,"#4b5563"),a.addColorStop(.5,"#374151"),a.addColorStop(1,"#1f2937"),t.fillStyle=a,rt(t,e-20,n-58,40,48,6),t.fill(),t.strokeStyle="#6b7280",t.lineWidth=1,rt(t,e-20,n-58,40,48,6),t.stroke(),rt(t,e-13,n-50,26,22,3),t.fillStyle="#111827",t.fill(),t.strokeStyle="#374151",t.lineWidth=.8,t.stroke();const l=["#22c55e","#f59e0b","#3b82f6"];for(let F=0;F<3;F++){const z=Math.sin(i*(2.5+F*.8)+F*2)>.2;t.fillStyle=z?l[F]:"#1f2937",z&&(t.shadowBlur=6,t.shadowColor=l[F]),t.beginPath(),t.arc(e-8+F*8,n-38,3.5,0,Math.PI*2),t.fill(),t.shadowBlur=0}for(let F=0;F<3;F++)t.strokeStyle="#374151",t.lineWidth=1.2,t.beginPath(),t.moveTo(e-12,n-22+F*5),t.lineTo(e+12,n-22+F*5),t.stroke();t.fillStyle="#374151",rt(t,e-6,n-62,12,6,2),t.fill();const u=t.createLinearGradient(e-16,n-80,e+16,n-62);u.addColorStop(0,"#6b7280"),u.addColorStop(1,"#374151"),t.fillStyle=u,rt(t,e-16,n-82,32,22,7),t.fill(),t.strokeStyle="#9ca3af",t.lineWidth=1,rt(t,e-16,n-82,32,22,7),t.stroke(),rt(t,e-11,n-76,22,8,4),t.fillStyle="#0f172a",t.fill();const c=.5+.5*Math.sin(i*3.2),d=t.createLinearGradient(e-10,n-72,e+10,n-72);d.addColorStop(0,`rgba(6,182,212,${c*.4})`),d.addColorStop(.5,`rgba(6,182,212,${c})`),d.addColorStop(1,`rgba(6,182,212,${c*.4})`),rt(t,e-10,n-75,20,6,3),t.fillStyle=d,t.fill(),t.shadowBlur=8*c,t.shadowColor="#06b6d4",t.fill(),t.shadowBlur=0,t.strokeStyle="#6b7280",t.lineWidth=2,t.beginPath(),t.moveTo(e+8,n-82),t.lineTo(e+10,n-94),t.stroke(),t.fillStyle=Math.sin(i*4)>0?"#ef4444":"#7f1d1d",t.beginPath(),t.arc(e+10,n-95,3,0,Math.PI*2),t.fill();const f=e-20,p=n-48,m=Math.sin(s*2.8)*.22,_=-Math.PI*.55+m,g=f+Math.cos(_)*30,h=p+Math.sin(_)*30,v=Math.sin(s*3.5+.8)*.18,S=_-.5+v,M=g+Math.cos(S)*24,T=h+Math.sin(S)*24;if(t.fillStyle="#4b5563",t.beginPath(),t.arc(f,p,6,0,Math.PI*2),t.fill(),t.strokeStyle="#4b5563",t.lineWidth=8,t.lineCap="round",t.beginPath(),t.moveTo(f,p),t.lineTo(g,h),t.stroke(),t.fillStyle="#6b7280",t.beginPath(),t.arc(g,h,5,0,Math.PI*2),t.fill(),t.strokeStyle="#6b7280",t.lineWidth=6,t.beginPath(),t.moveTo(g,h),t.lineTo(M,T),t.stroke(),t.fillStyle="#9ca3af",t.beginPath(),t.arc(M,T,5,0,Math.PI*2),t.fill(),t.strokeStyle="#d1d5db",t.lineWidth=1.5,t.beginPath(),t.arc(M,T,5,0,Math.PI*2),t.stroke(),r&&Math.sin(s*6)>.5){t.shadowBlur=12,t.shadowColor="#fbbf24",t.fillStyle="#fbbf24",t.beginPath(),t.arc(M,T,3,0,Math.PI*2),t.fill(),t.shadowBlur=0;for(let F=0;F<4;F++){const z=(s*7+F*1.57)%(Math.PI*2),D=6+Math.sin(s*11+F)*4,G=M+Math.cos(z)*D,H=T+Math.sin(z)*D;t.fillStyle=F%2===0?"#fbbf24":"#f97316",t.globalAlpha=.8,t.beginPath(),t.arc(G,H,1.5,0,Math.PI*2),t.fill(),t.globalAlpha=1}}const b=e+20,w=n-48,y=-Math.PI*.15+Math.sin(s*1.6)*.08,C=b+Math.cos(y)*28,R=w+Math.sin(y)*28;t.fillStyle="#4b5563",t.beginPath(),t.arc(b,w,6,0,Math.PI*2),t.fill(),t.strokeStyle="#4b5563",t.lineWidth=8,t.lineCap="round",t.beginPath(),t.moveTo(b,w),t.lineTo(C,R),t.stroke(),t.fillStyle="#6b7280",t.beginPath(),t.arc(C,R,5,0,Math.PI*2),t.fill(),t.strokeStyle="#6b7280",t.lineWidth=5;const N=C+Math.cos(y+.4)*16,I=R+Math.sin(y+.4)*16;t.beginPath(),t.moveTo(C,R),t.lineTo(N,I),t.stroke()}function iR(t,e,n,i,r){const s=n*.72;t.fillStyle="#0d1420",t.fillRect(0,s,e,n-s);for(let d=0;d<e;d+=48)t.strokeStyle="#1a2540",t.lineWidth=1,t.beginPath(),t.moveTo(d,s),t.lineTo(d,n),t.stroke();t.fillStyle="#07101c",t.fillRect(0,0,e,s);for(let d=40;d<s;d+=60)for(let f=20;f<e;f+=60)t.fillStyle="#0e1a2e",t.beginPath(),t.arc(f,d,4,0,Math.PI*2),t.fill();const o=n*.12;t.strokeStyle=r,t.lineWidth=10,t.shadowBlur=18,t.shadowColor=r,t.beginPath(),t.moveTo(0,o),t.lineTo(e,o),t.stroke(),t.shadowBlur=0,t.strokeStyle="#78350f",t.lineWidth=6,t.beginPath(),t.moveTo(0,o),t.lineTo(e,o),t.stroke(),[e*.15,e*.35,e*.55,e*.75].forEach(d=>{const f=s-10;t.strokeStyle="#1e3a5f",t.lineWidth=6,t.beginPath(),t.moveTo(d,o),t.lineTo(d,f),t.stroke(),t.fillStyle="#0d1b2e",rt(t,d-18,f-40,36,40,4),t.fill(),t.strokeStyle="#1e3a5f",t.lineWidth=1.5,rt(t,d-18,f-40,36,40,4),t.stroke();const p=Math.sin(i*2.8+d)>0;t.fillStyle=p?r:"#451a03",t.shadowBlur=p?8:0,t.shadowColor=r,t.beginPath(),t.arc(d,f-20,5,0,Math.PI*2),t.fill(),t.shadowBlur=0});for(let d=0;d<3;d++){const f=e*.28+d*e*.22,p=(i*2.3+d*1.2)%1;if(p<.25){const m=1-p/.25;t.fillStyle=`rgba(251,191,36,${m})`,t.shadowBlur=6,t.shadowColor="#fbbf24",t.beginPath(),t.arc(f+Math.sin(i*17)*4,o+p*22,2.5,0,Math.PI*2),t.fill(),t.shadowBlur=0}}for(let d=0;d<5;d++){const f=n*.2+d*n*.1;t.strokeStyle="#1e3a5f",t.lineWidth=3,t.beginPath(),t.moveTo(0,f),t.lineTo(e*.12,f),t.stroke(),t.beginPath(),t.moveTo(e,f),t.lineTo(e*.88,f),t.stroke(),t.fillStyle=d%2===0?"#f59e0b55":"#ef444455",t.fillRect(0,f-1,e*.12,2),t.fillRect(e*.88,f-1,e*.12,2)}const l=e*.42,u=s-55;t.strokeStyle="#334155",t.lineWidth=8,t.beginPath(),t.moveTo(l,o+30),t.lineTo(l,u),t.stroke(),t.fillStyle="#1e293b",rt(t,l-22,u-10,44,44,5),t.fill(),t.strokeStyle="#475569",t.lineWidth=2,rt(t,l-22,u-10,44,44,5),t.stroke(),Math.sin(i*9)>.3&&(t.strokeStyle=r,t.lineWidth=2,t.shadowBlur=8,t.shadowColor=r,t.beginPath(),t.moveTo(l-5,u+10),t.lineTo(l-5+Math.sin(i*23)*6,u+20+Math.cos(i*17)*4),t.stroke(),t.shadowBlur=0)}function rR(t,e,n,i,r){const s=n*.72;t.fillStyle="#0d0800",t.fillRect(0,s,e,n-s),t.fillStyle="#090400",t.fillRect(0,0,e,s),[e*.18,e*.72].forEach((p,m)=>{const _=n*.1,g=e*.14,h=n*.55,v=t.createLinearGradient(p,_,p+g,_);v.addColorStop(0,"#1c0900"),v.addColorStop(.3,"#2d1200"),v.addColorStop(.7,"#1c0900"),v.addColorStop(1,"#0e0500"),t.fillStyle=v,rt(t,p,_,g,h,g*.5),t.fill(),t.strokeStyle="#7c2d12",t.lineWidth=2,rt(t,p,_,g,h,g*.5),t.stroke(),t.beginPath(),t.ellipse(p+g/2,_+g*.35,g*.5,g*.35,0,Math.PI,0),t.fillStyle="#3d1505",t.fill();for(let b=1;b<=3;b++)t.strokeStyle="#7c2d12",t.lineWidth=2.5,t.beginPath(),t.ellipse(p+g/2,_+b*h*.25,g*.5,6,0,0,Math.PI*2),t.stroke();const S=p+g/2,M=_+h*.6;t.fillStyle="#1f2937",t.beginPath(),t.arc(S,M,10,0,Math.PI*2),t.fill(),t.strokeStyle="#374151",t.lineWidth=1.5,t.beginPath(),t.arc(S,M,10,0,Math.PI*2),t.stroke();const T=-Math.PI*.8+(Math.sin(i*1.5+m)*.1+.85)*Math.PI*1.6;t.strokeStyle=r,t.lineWidth=2,t.beginPath(),t.moveTo(S,M),t.lineTo(S+Math.cos(T)*7,M+Math.sin(T)*7),t.stroke()});const a=n*.38,l=n*.52;[a,l].forEach(p=>{t.strokeStyle="#7c2d12",t.lineWidth=10,t.beginPath(),t.moveTo(e*.18+e*.14,p),t.lineTo(e*.72,p),t.stroke(),t.strokeStyle="#9a3412",t.lineWidth=6,t.beginPath(),t.moveTo(e*.18+e*.14,p),t.lineTo(e*.72,p),t.stroke();for(let m=e*.35;m<e*.72;m+=e*.1)t.fillStyle="#7c2d12",t.fillRect(m-4,p-10,8,20),t.strokeStyle="#9a3412",t.lineWidth=1,t.strokeRect(m-4,p-10,8,20)});const u=e*.5,c=a-5;t.fillStyle="#450a0a",t.beginPath(),t.arc(u,c,16,0,Math.PI*2),t.fill(),t.strokeStyle=r,t.lineWidth=2,t.beginPath(),t.arc(u,c,16,0,Math.PI*2),t.stroke();const d=i*.5;t.strokeStyle="#d97706",t.lineWidth=5,t.beginPath(),t.moveTo(u-Math.cos(d)*18,c-Math.sin(d)*18),t.lineTo(u+Math.cos(d)*18,c+Math.sin(d)*18),t.stroke();const f=i*.8%1;t.fillStyle=`rgba(251,146,60,${.7-f*.6})`,t.beginPath(),t.ellipse(u+5,c+16+f*30,3,5+f*4,0,0,Math.PI*2),t.fill(),t.fillStyle="#1f0900",t.fillRect(0,s,e,n-s);for(let p=0;p<e;p+=40)t.strokeStyle="#2d0e00",t.lineWidth=1,t.beginPath(),t.moveTo(p,s),t.lineTo(p,n),t.stroke();t.fillStyle=`rgba(251,146,60,${.04+.02*Math.sin(i*3)})`,t.fillRect(0,s-20,e,20)}function sR(t,e,n,i,r){const s=n*.72;t.fillStyle="#030c12",t.fillRect(0,0,e,n);const o=t.createRadialGradient(e/2,0,0,e/2,0,e*.7);o.addColorStop(0,"#051620"),o.addColorStop(1,"#020a10"),t.fillStyle=o,t.fillRect(0,0,e,s),t.strokeStyle="#0e3a5f44",t.lineWidth=1;const a=[[.2,.15],[.45,.08],[.6,.2],[.35,.3],[.75,.12],[.15,.35]];for(let m=0;m<a.length;m++){const[_,g]=a[m],[h,v]=a[(m+2)%a.length];t.beginPath(),t.moveTo(_*e,g*n),t.lineTo(h*e,v*n),t.stroke()}a.forEach(([m,_])=>{t.fillStyle=r,t.shadowBlur=6,t.shadowColor=r,t.beginPath(),t.arc(m*e,_*n,2.5,0,Math.PI*2),t.fill(),t.shadowBlur=0});const l=e/2,u=n*.4;t.strokeStyle="#0e4a6a",t.lineWidth=4,t.beginPath(),t.arc(l,u,55,0,Math.PI*2),t.stroke(),t.strokeStyle=r+"66",t.lineWidth=2,t.beginPath(),t.arc(l,u,55,0,Math.PI*2),t.stroke(),t.save(),t.translate(l,u),t.rotate(i*.4),t.scale(1,.35),t.strokeStyle="#1a6080",t.lineWidth=3,t.beginPath(),t.arc(0,0,55,0,Math.PI*2),t.stroke(),t.restore(),t.save(),t.translate(l,u),t.rotate(i*-.6+1),t.scale(.35,1),t.strokeStyle=r,t.lineWidth=3,t.shadowBlur=8,t.shadowColor=r,t.beginPath(),t.arc(0,0,45,0,Math.PI*2),t.stroke(),t.shadowBlur=0,t.restore();const c=t.createRadialGradient(l-8,u-8,2,l,u,18);c.addColorStop(0,"#1e6a8c"),c.addColorStop(1,"#0a2030"),t.fillStyle=c,t.beginPath(),t.arc(l,u,18,0,Math.PI*2),t.fill();const d=e*.38,f=s-30;t.fillStyle="#0a1a25",rt(t,d-30,f-45,60,50,6),t.fill(),t.strokeStyle=r+"88",t.lineWidth=1.5,rt(t,d-30,f-45,60,50,6),t.stroke(),t.fillStyle=r+"cc",t.font="8px monospace",["LAT: 28.5°N","LON: -80.7°W","ALT: 402km",`HDG: ${(Math.sin(i*.3)*5+45).toFixed(1)}°`].forEach((m,_)=>{t.fillText(m,d-26,f-36+_*10)}),t.fillStyle="#06101a",t.fillRect(0,s,e,n-s);const p=t.createLinearGradient(0,s,0,n);p.addColorStop(0,"#0e305033"),p.addColorStop(1,"transparent"),t.fillStyle=p,t.fillRect(0,s,e,n*.15)}function oR(t,e,n,i,r){const s=n*.72;t.fillStyle="#030a04",t.fillRect(0,0,e,n),[e*.15,e*.5,e*.82].forEach((c,d)=>{const f=e*.16,p=n*.25,m=n*.15;t.fillStyle="#0a1a0c",rt(t,c-f/2,m,f,p,4),t.fill(),t.strokeStyle="#14400a",t.lineWidth=2,rt(t,c-f/2,m,f,p,4),t.stroke(),t.fillStyle="#00180022",rt(t,c-f/2+3,m+3,f-6,p-6,3),t.fill(),t.strokeStyle=r,t.lineWidth=1.5,t.shadowBlur=4,t.shadowColor=r,t.beginPath();for(let _=0;_<f-10;_+=2){const g=p/2+Math.sin((_*.15+i*(2+d*.7))*Math.PI*2)*(p*.25*(.5+.5*Math.sin(i*.8+d)));_===0?t.moveTo(c-f/2+5+_,m+g):t.lineTo(c-f/2+5+_,m+g)}t.stroke(),t.shadowBlur=0,t.fillStyle=r+"99",t.font="7px monospace",t.fillText(["SIG-A","SIG-B","SIG-C"][d],c-12,m+p-5)});for(let c=e*.1;c<e*.9;c+=40)t.strokeStyle="#1a3a1e",t.lineWidth=4,t.beginPath(),t.moveTo(c,0),t.lineTo(c+Math.sin(i*.3+c*.01)*4,n*.45),t.stroke();for(let c=0;c<4;c++){const d=e*.04,f=n*.15+c*n*.12;t.fillStyle="#0d1f0f",rt(t,d,f,42,34,4),t.fill(),t.strokeStyle="#1a401e",t.lineWidth=1,rt(t,d,f,42,34,4),t.stroke();const p=Math.sin(i*3.5+c*1.1)>0;t.fillStyle=p?r:"#14400a",t.shadowBlur=p?8:0,t.shadowColor=r,t.beginPath(),t.arc(d+21,f+17,5,0,Math.PI*2),t.fill(),t.shadowBlur=0;const m=(i*80+c*30)%(e*.86);t.strokeStyle=r+"55",t.lineWidth=1,t.beginPath(),t.moveTo(d+42,f+17),t.lineTo(Math.min(d+42+m,e*.9),f+17),t.stroke()}const a=e*.42,l=s-50;t.fillStyle="#0d2010",rt(t,a-24,l-20,48,45,5),t.fill(),t.strokeStyle="#22c55e55",t.lineWidth=1.5,rt(t,a-24,l-20,48,45,5),t.stroke();const u=Math.sin(i*4)*6;t.strokeStyle="#374151",t.lineWidth=4,t.lineCap="round",t.beginPath(),t.moveTo(a-8,l-25),t.quadraticCurveTo(a-8+u,l,a-8+u*.5,l+15),t.stroke(),t.fillStyle=Math.sin(i*6)>0?r:"#14400a",t.shadowBlur=6,t.shadowColor=r,t.beginPath(),t.arc(a-8+u*.5,l+16,5,0,Math.PI*2),t.fill(),t.shadowBlur=0,t.fillStyle="#030a04",t.fillRect(0,s,e,n-s)}function aR(t,e,n,i,r){const s=n*.72;t.fillStyle="#040410",t.fillRect(0,0,e,n),t.fillStyle="#070718",t.fillRect(0,s,e,n-s);for(let p=0;p<e;p+=36)t.strokeStyle="#10103a",t.lineWidth=1,t.beginPath(),t.moveTo(p,s),t.lineTo(p,n),t.stroke();for(let p=s;p<n;p+=36)t.strokeStyle="#10103a",t.lineWidth=1,t.beginPath(),t.moveTo(0,p),t.lineTo(e,p),t.stroke();[{x:e*.15,y:n*.2,w:e*.18,h:n*.35},{x:e*.68,y:n*.2,w:e*.18,h:n*.35}].forEach((p,m)=>{t.globalAlpha=.85+.08*Math.sin(i*2+m),t.fillStyle="#0a0a2e",rt(t,p.x,p.y,p.w,p.h,6),t.fill(),t.strokeStyle=r+"88",t.lineWidth=1.5,rt(t,p.x,p.y,p.w,p.h,6),t.stroke(),t.globalAlpha=1;for(let h=0;h<p.h-10;h+=12){const v=.2+.15*Math.sin(i*3+h*.1+m);t.fillStyle=`rgba(129,140,248,${v})`,t.fillRect(p.x+4,p.y+6+h,p.w-8,3)}const _=["SYS.CHECK","MEM: 94%","TEMP: 312K","FLUX: 0.87","ERR: 0x3F","RETRY..."];t.fillStyle=r,t.font="8px monospace";const g=Math.floor(i*3+m*3)%_.length;for(let h=0;h<Math.min(5,Math.floor(p.h/14));h++){const v=.4+.6*Math.sin(i+h);t.globalAlpha=v,t.fillText(_[(g+h)%_.length],p.x+6,p.y+16+h*14)}t.globalAlpha=1,t.fillStyle=r,t.font="9px monospace",t.fillText(`MODULE-${m+1}`,p.x+6,p.y+10)});const a=e*.5,l=n*.5;t.fillStyle="#0d0d22",rt(t,a-40,l-15,80,30,4),t.fill(),t.strokeStyle=r+"66",t.lineWidth=1.5,rt(t,a-40,l-15,80,30,4),t.stroke();const u=a-35+i*40%70,c=t.createLinearGradient(u-6,l-14,u+6,l-14);c.addColorStop(0,"transparent"),c.addColorStop(.5,r+"cc"),c.addColorStop(1,"transparent"),t.fillStyle=c,t.fillRect(u-6,l-14,12,28);const d=e*.42,f=s-50;t.fillStyle="#0a1628",rt(t,d-28,f-22,56,46,4),t.fill(),t.strokeStyle=r+"55",t.lineWidth=1,rt(t,d-28,f-22,56,46,4),t.stroke(),t.strokeStyle=r+"66",t.lineWidth=1,[[d-20,f-15,d+5,f-15],[d+5,f-15,d+5,f],[d+5,f,d+20,f]].forEach(([p,m,_,g])=>{t.beginPath(),t.moveTo(p,m),t.lineTo(_,g),t.stroke()}),t.fillStyle=Math.sin(i*7)>0?"#ef4444":"#1f0606",t.shadowBlur=Math.sin(i*7)>0?8:0,t.shadowColor="#ef4444",rt(t,d-8,f-8,16,14,2),t.fill(),t.shadowBlur=0}function lR(t,e,n,i,r,s,o){const a=n*.72;t.fillStyle=s&&o?"#000800":"#0a0200",t.fillRect(0,0,e,n);const l=e*.65,u=t.createRadialGradient(e/2,n*.5,0,e/2,n*.5,e*.5);u.addColorStop(0,s&&o?"#001200":"#180800"),u.addColorStop(.7,s&&o?"#000a00":"#0d0400"),u.addColorStop(1,"#000000"),t.fillStyle=u,t.beginPath(),t.ellipse(e/2,n*.5,l/2,n*.45,0,0,Math.PI*2),t.fill();const c=n*.12;t.fillStyle="#1a0a00",t.beginPath(),t.ellipse(e/2,c,l/2,30,0,0,Math.PI*2),t.fill();const d=8;for(let h=0;h<d;h++){const v=h/d*Math.PI*2,S=l/2*.55,M=e/2+Math.cos(v)*S,T=c+Math.sin(v)*12,b=s&&o?!0:Math.sin(i*4+h)>.2;t.fillStyle=b?s&&o?"#22c55e":"#f97316":"#3d1505",t.shadowBlur=b?8:0,t.shadowColor=s&&o?"#22c55e":"#f97316",t.beginPath(),t.arc(M,T,6,0,Math.PI*2),t.fill(),t.shadowBlur=0}for(let h=0;h<6;h++){const v=n*.2+h*n*.08;t.strokeStyle="#2d1000",t.lineWidth=6,t.beginPath(),t.ellipse(e/2,v,l/2*.92,12,0,0,Math.PI*2),t.stroke(),t.strokeStyle="#451500",t.lineWidth=2,t.stroke()}const f=s&&o?.08:.18+.08*Math.sin(i*2);t.fillStyle=`rgba(251,146,60,${f})`,t.beginPath(),t.ellipse(e/2,a-10,l/2*.6,30,0,0,Math.PI*2),t.fill();const p=e*.74,m=n*.45;t.fillStyle="#1c0800",t.beginPath(),t.arc(p,m,35,0,Math.PI*2),t.fill(),t.strokeStyle="#7c2d12",t.lineWidth=3,t.beginPath(),t.arc(p,m,35,0,Math.PI*2),t.stroke(),t.save(),t.translate(p,m),t.rotate(i*6);for(let h=0;h<6;h++)t.rotate(Math.PI/3),t.fillStyle="#451500",rt(t,5,-4,22,8,3),t.fill();t.restore();const _=e*.42,g=a-60;t.fillStyle="#2d1000",t.beginPath(),t.arc(_,g,20,0,Math.PI*2),t.fill(),t.strokeStyle=s&&o?"#22c55e":r,t.lineWidth=3,t.shadowBlur=12,t.shadowColor=s&&o?"#22c55e":r,t.beginPath(),t.arc(_,g,20,0,Math.PI*2),t.stroke(),t.shadowBlur=0;for(let h=0;h<4;h++)t.strokeStyle=s&&o?"#22c55e88":r+"88",t.lineWidth=1.5,t.beginPath(),t.arc(_,g,8+h*3,-Math.PI/2+i*(h%2===0?1.5:-1.5),Math.PI/2+i*(h%2===0?1.5:-1.5)),t.stroke();t.fillStyle="#0a0200",t.fillRect(0,a,e,n-a)}function uR({missionId:t,onDone:e}){const n=tR[t],i=W.useRef(null),r=W.useRef(0),s=W.useRef(!1),o=W.useRef({W:1,H:1}),[a,l]=W.useState(!1),u=W.useCallback(()=>{s.current||(s.current=!0,e==null||e())},[e]),c=W.useCallback(()=>{l(!0),setTimeout(u,400)},[u]);W.useEffect(()=>{function f(){const p=i.current;if(!p)return;const m=p.clientWidth,_=p.clientHeight;p.width=m,p.height=_,o.current={W:m,H:_}}return f(),window.addEventListener("resize",f),()=>window.removeEventListener("resize",f)},[]);const d=W.useCallback(f=>{if(s.current)return;const p=i.current;if(!p||!n)return;const m=p.getContext("2d"),{W:_,H:g}=o.current;r.current+=f;const h=r.current;if(h>=Ng&&!s.current){s.current=!0,setTimeout(()=>{e==null||e()},50);return}const v=h>=yl;if(n.interior==="engine")lR(m,_,g,h,n.accent,n.isLast,v&&n.isLast);else{const w=m.createLinearGradient(0,0,0,g);w.addColorStop(0,n.bg1),w.addColorStop(1,n.bg2),m.fillStyle=w,m.fillRect(0,0,_,g),n.interior==="power"?iR(m,_,g,h,n.accent):n.interior==="fuel"?rR(m,_,g,h,n.accent):n.interior==="nav"?sR(m,_,g,h,n.accent):n.interior==="comms"?oR(m,_,g,h,n.accent):n.interior==="diagnostics"&&aR(m,_,g,h,n.accent)}const S=_*.46,M=g*.72-4;nR(m,S,M,h,!v);const T=g*.1;m.fillStyle="#000",m.fillRect(0,0,_,T),m.fillRect(0,g-T,_,T);const b=Math.min(1,h/cf);if(m.globalAlpha=b,m.fillStyle=n.accent,m.font=`bold ${Math.round(_*.022)}px 'Courier New', monospace`,m.textAlign="left",m.fillText(n.system,_*.04,T*.62),m.fillStyle="#ffffff88",m.font=`${Math.round(_*.016)}px 'Courier New', monospace`,m.fillText("SYSTEM REPAIR IN PROGRESS",_*.04,T*.88),m.globalAlpha=1,h<yl){const w=Math.min(1,(h-.3)/.4);if(w>0){m.globalAlpha=w,m.fillStyle="#ffffff",m.font=`${Math.round(_*.018)}px 'Courier New', monospace`,m.textAlign="left";const y=Math.floor((h-.3)*18);m.fillText(n.action.slice(0,y),_*.04,g-T*.35),m.globalAlpha=1}}if(v){const w=Math.min(1,(h-yl)/.45);if(n.isLast)m.fillStyle=`rgba(34,197,94,${w*.12})`,m.fillRect(0,T,_,g-T*2),m.globalAlpha=w,m.textAlign="center",m.fillStyle="#22c55e",m.font=`bold ${Math.round(_*.028)}px 'Courier New', monospace`,m.shadowBlur=16,m.shadowColor="#22c55e",m.fillText(n.fault[0],_/2,g*.5-14),m.shadowBlur=0,m.fillStyle="#ffffff",m.font=`${Math.round(_*.018)}px 'Courier New', monospace`,m.fillText(n.fault[1],_/2,g*.5+14),m.globalAlpha=1;else{m.fillStyle=`rgba(220,38,38,${w*.18})`,m.fillRect(0,T,_,g-T*2);const y=Math.sin((h-yl)*Math.PI*5)*.5+.5;m.strokeStyle=`rgba(220,38,38,${w*y*.9})`,m.lineWidth=3,m.strokeRect(3,T+3,_-6,g-T*2-6),m.globalAlpha=w,m.textAlign="center",m.fillStyle="#ef4444",m.font=`bold ${Math.round(_*.028)}px 'Courier New', monospace`,m.shadowBlur=12,m.shadowColor="#ef4444",m.fillText(n.fault[0],_/2,g*.5-14),m.shadowBlur=0,m.fillStyle="#ffffff",m.font=`${Math.round(_*.018)}px 'Courier New', monospace`,m.fillText(n.fault[1],_/2,g*.5+14),m.globalAlpha=1}}if(h<cf&&(m.fillStyle=`rgba(0,0,0,${1-h/cf})`,m.fillRect(0,0,_,g)),h>ff){const w=Math.min(1,(h-ff)/(Ng-ff));m.fillStyle=`rgba(0,0,0,${w})`,m.fillRect(0,0,_,g)}a&&(m.fillStyle="rgba(0,0,0,0.7)",m.fillRect(0,0,_,g)),m.textAlign="left"},[n,u,a]);return Zh(d),n?P.jsxs("div",{style:{position:"absolute",inset:0,zIndex:600,cursor:"pointer",userSelect:"none"},onClick:c,children:[P.jsx("canvas",{ref:i,style:{width:"100%",height:"100%",display:"block"}}),P.jsx("div",{style:{position:"absolute",bottom:"12%",right:"4%",color:"#ffffff66",fontSize:"11px",fontFamily:"monospace",letterSpacing:"0.1em",pointerEvents:"none"},children:"TAP TO SKIP"})]}):null}const ys=[{id:"debug_wrong_variable",title:"Cross-System Reference Fault",systemContext:"The navigation power check is referencing a variable that was never declared. The condition evaluates incorrectly — navigation reports OFFLINE despite the reactor running at 87%.",systemExplanation:"Navigation systems continuously verify that available power meets minimum operating thresholds. The check compares a live sensor reading against a stored minimum. If the wrong variable name is used, the system reads an undefined reference and the condition fails regardless of actual power output.",codingConcept:"VARIABLES",conceptDetail:"A value is stored under a specific name. The name used to retrieve it must exactly match the name it was stored under. A mismatched name is treated as a different, undefined variable.",brokenCode:`let currentPower = 87;  // % — current reactor output
let minPower = 80;      // % — minimum threshold for navigation

if (minimumPower >= minPower) { // ERROR: 'minimumPower' is not defined
  console.log("Navigation: ONLINE");
} else {
  console.log("Navigation: OFFLINE — insufficient power");
}`,hint:"The variable declared on line 1 and the variable used in the condition are not the same name.",validate(t){const e=t.replace(/\/\/.*/g,"").replace(/\s+/g,"");return e.includes("currentPower>=minPower")||e.includes("currentPower>=80")},successText:"Reference resolved. Navigation confirms: ONLINE. currentPower (87) is above minPower (80). Power check operational."},{id:"debug_wrong_operator",title:"Engine Cut-Off Logic Inverted",systemContext:"The engine cut-off logic is inverted. At launch altitude (0 m), the main engines are reading CUT-OFF. The vehicle cannot begin its ascent.",systemExplanation:"Engine cut-off logic determines when the main engines should fire and when they should shut down. The engines must be active during ascent — below the designated cut-off altitude. Above that point they shut down for staging or orbital insertion. An inverted comparison reverses this entirely.",codingConcept:"CONDITIONALS",conceptDetail:"An if statement evaluates whether a condition is true or false and executes different code for each result. The comparison operator — `>` or `<` — determines what the condition is actually testing. Reversing the operator reverses the decision.",brokenCode:`let altitude       = 0;      // m — current altitude
let cutOffAltitude = 80000; // m — engine cut-off point

if (altitude > cutOffAltitude) { // ERROR: engines should fire BELOW cut-off
  console.log("Main engines: ACTIVE");
} else {
  console.log("Main engines: CUT-OFF");
}`,hint:"The rocket fires its engines while climbing toward 80,000 m. Should the condition be > or <?",validate(t){const e=t.replace(/\/\/.*/g,"").replace(/\s+/g,"");return e.includes("altitude<cutOffAltitude")||e.includes("altitude<80000")},successText:"Logic corrected. altitude (0) < cutOffAltitude (80,000) — condition true. Main engines: ACTIVE. Ascent sequence cleared."},{id:"debug_missing_return",title:"Diagnostic Loop — Return Value Discarded",systemContext:"The pre-launch diagnostic scanner is reporting zero systems ready. The scan loop runs without error, but readyCount never increments. Three modules are operational — none are being counted.",systemExplanation:"Diagnostic systems scan each subsystem and count how many are operational before authorising launch. The scanner uses a function to check each module and returns a boolean result. If that result is never used, the count stays at zero regardless of the actual system states.",codingConcept:"FUNCTIONS",conceptDetail:"A function can return a value when called. That return value must be captured and used by the calling code. Calling a function without acting on its return value discards the result entirely — the function ran, but nothing was done with what it found.",brokenCode:`function checkSystem(system) {
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

console.log("Systems ready: " + readyCount);`,hint:"The function returns true or false. Use that return value inside an if statement to conditionally increment readyCount.",validate(t){const e=t.replace(/\/\/.*/g,"").replace(/\s+/g,"");return e.includes("if(checkSystem(systems[i]))")||e.includes("if(checkSystem(systems[i]))readyCount++")},successText:"Scan complete. Systems ready: 2 / 3. engine-B flagged FAULT. Diagnostic loop confirmed operational. Launch authorisation check passed."}];function cR({progress:t,onComplete:e}){const[n,i]=W.useState(0),[r,s]=W.useState(ys[0].brokenCode);W.useEffect(()=>p2(),[]);const[o,a]=W.useState(null),[l,u]=W.useState(""),[c,d]=W.useState(0),[f,p]=W.useState(t),m=ys[n],_=ys.filter(v=>f.completedMissions.includes(v.id)).length,g=W.useCallback(()=>{if(m.validate(r)){tp(),a("success"),u(m.successText);const v=ip(f,m.id);p(v);const S=n===ys.length-1;setTimeout(()=>{if(S)e(v);else{const M=n+1;i(M),s(ys[M].brokenCode),a(null),u(""),d(0)}},2400)}else ep(),a("error"),d(v=>v+1),u("Fault unresolved. Re-examine the code and try again.")},[r,m,n,f,e]),h=W.useCallback(v=>{s(v.target.value),o==="error"&&a(null),X_()},[o]);return P.jsxs("div",{className:"debug-arena",children:[P.jsxs("div",{className:"da-header",children:[P.jsx("div",{className:"da-mode-label",children:"DEBUG ARENA · PHASE 2"}),P.jsxs("div",{className:"da-progress",children:[_," / ",ys.length," RESOLVED"]})]}),P.jsxs("div",{className:"da-body",children:[P.jsxs("div",{className:"da-step",children:[P.jsx("div",{className:"da-step-label",children:"STEP 1 · SYSTEM CONTEXT"}),P.jsx("div",{className:"da-step-text",children:m.systemContext})]}),P.jsxs("div",{className:"da-step",children:[P.jsx("div",{className:"da-step-label",children:"STEP 2 · SYSTEM EXPLANATION"}),P.jsx("div",{className:"da-step-text",children:m.systemExplanation})]}),P.jsxs("div",{className:"da-step da-step--concept",children:[P.jsxs("div",{className:"da-step-label",children:["STEP 3 · CODING CONCEPT · ",P.jsx("span",{className:"da-concept-tag",children:m.codingConcept})]}),P.jsx("div",{className:"da-step-text",children:m.conceptDetail})]}),P.jsxs("div",{className:"da-step da-step--task",children:[P.jsxs("div",{className:"da-step-label",children:["STEP 4 · PLAYER TASK · ",m.title]}),P.jsxs("div",{className:"da-editor-wrap",children:[P.jsxs("div",{className:"da-editor-bar",children:[P.jsx("span",{className:"da-editor-file",children:"system_diagnostic.js"}),P.jsx("span",{className:"da-editor-status",children:o==="success"?"✓ RESOLVED":o==="error"?"✕ FAULT ACTIVE":"● EDITING"})]}),P.jsx("textarea",{className:"da-editor",value:r,onChange:h,spellCheck:!1,rows:r.split(`
`).length+2,disabled:o==="success"})]}),c>=2&&o!=="success"&&P.jsxs("div",{className:"da-hint",children:[P.jsx("span",{className:"da-hint-label",children:"DIAGNOSTIC HINT"}),m.hint]}),o!=="success"&&P.jsx("button",{className:"da-deploy-btn",onClick:g,children:"RUN DIAGNOSTIC"})]}),l&&P.jsxs("div",{className:"da-step da-step--response",children:[P.jsx("div",{className:"da-step-label",children:"STEP 5 · SYSTEM RESPONSE"}),P.jsx("div",{className:`da-step-response da-step-response--${o}`,children:l})]})]})]})}const Ml=[{id:"visual_fuel",title:"Fuel Tank Alert Scan",systemContext:"The fuel monitoring display is showing zero low-fuel alerts. Telemetry confirms multiple tanks are critically below threshold. The monitoring loop is running but the alert count is not updating correctly.",systemExplanation:"Fuel monitoring systems scan all onboard tanks and flag those below a safe minimum. Each flagged tank triggers an alert in the mission control display. The loop processes every tank in sequence and increments the alert counter when a tank falls below the threshold.",codingConcept:"LOOPS",conceptDetail:"A loop runs a block of code repeatedly, once for each item in a list. The loop counter moves through each position in sequence. On each pass, the loop body evaluates the current item — here, checking whether a tank is below the minimum and incrementing the alert count if so.",instruction:"How many low-fuel alerts does this scan produce?",code:`let tanks = [450, 120, 89, 310, 55]; // kg remaining
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

let status = getEngineStatus(1250);`,options:[{label:'"CRITICAL"',value:"a"},{label:'"NOMINAL"',value:"b"},{label:'"COLD"',value:"c"},{label:"undefined",value:"d"}],correct:"b",explanation:'1250 is not > 1500 — first return skipped. 1250 is > 1000 — second return executes: "NOMINAL". The function exits. The third return is never reached. Engine status confirmed: NOMINAL.'}];function fR({progress:t,onComplete:e}){const[n,i]=W.useState(0),[r,s]=W.useState(null);W.useEffect(()=>m2(),[]);const[o,a]=W.useState(!1),[l,u]=W.useState(t),c=Ml[n],d=r===c.correct,f=Ml.filter(_=>l.completedMissions.includes(_.id)).length,p=W.useCallback(()=>{if(r)if(a(!0),d){tp();const _=ip(l,c.id);u(_);const g=n===Ml.length-1;setTimeout(()=>{if(g)e(_);else{const h=n+1;i(h),s(null),a(!1)}},2600)}else ep()},[r,d,c,n,l,e]),m=W.useCallback(()=>{s(null),a(!1)},[]);return P.jsxs("div",{className:"visual-lab",children:[P.jsxs("div",{className:"vl-header",children:[P.jsx("div",{className:"vl-mode-label",children:"VISUAL LAB · PHASE 3"}),P.jsxs("div",{className:"vl-progress",children:[f," / ",Ml.length," CONFIRMED"]})]}),P.jsxs("div",{className:"vl-body",children:[P.jsxs("div",{className:"vl-step",children:[P.jsx("div",{className:"vl-step-label",children:"STEP 1 · SYSTEM CONTEXT"}),P.jsx("div",{className:"vl-step-text",children:c.systemContext})]}),P.jsxs("div",{className:"vl-step",children:[P.jsx("div",{className:"vl-step-label",children:"STEP 2 · SYSTEM EXPLANATION"}),P.jsx("div",{className:"vl-step-text",children:c.systemExplanation})]}),P.jsxs("div",{className:"vl-step vl-step--concept",children:[P.jsxs("div",{className:"vl-step-label",children:["STEP 3 · CODING CONCEPT · ",P.jsx("span",{className:"vl-concept-tag",children:c.codingConcept})]}),P.jsx("div",{className:"vl-step-text",children:c.conceptDetail})]}),P.jsxs("div",{className:"vl-step vl-step--task",children:[P.jsxs("div",{className:"vl-step-label",children:["STEP 4 · PLAYER TASK · ",c.title]}),P.jsx("div",{className:"vl-instruction",children:c.instruction}),P.jsxs("div",{className:"vl-code-wrap",children:[P.jsx("div",{className:"vl-code-bar",children:P.jsx("span",{className:"vl-code-label",children:"SYSTEM CODE · READ ONLY"})}),P.jsx("pre",{className:"vl-code",children:c.code})]}),P.jsx("div",{className:"vl-options",children:c.options.map(_=>{let g="vl-option";return o?_.value===c.correct?g+=" vl-option--correct":_.value===r&&(g+=" vl-option--wrong"):_.value===r&&(g+=" vl-option--selected"),P.jsxs("button",{className:g,onClick:()=>!o&&s(_.value),disabled:o,children:[P.jsx("span",{className:"vl-option-key",children:_.value.toUpperCase()}),P.jsx("span",{className:"vl-option-label",children:_.label})]},_.value)})}),!o&&P.jsx("button",{className:`vl-confirm-btn${r?"":" vl-confirm-btn--disabled"}`,onClick:p,disabled:!r,children:"CONFIRM READING"})]}),o&&P.jsxs("div",{className:"vl-step vl-step--response",children:[P.jsx("div",{className:"vl-step-label",children:"STEP 5 · SYSTEM RESPONSE"}),P.jsxs("div",{className:`vl-response vl-response--${d?"correct":"wrong"}`,children:[P.jsx("div",{className:"vl-response-head",children:d?"BEHAVIOUR CONFIRMED":"READING INCORRECT"}),P.jsx("div",{className:"vl-response-body",children:c.explanation}),!d&&P.jsx("button",{className:"vl-retry-btn",onClick:m,children:"RE-ANALYSE"})]})]})]})]})}const ai={BUILDER:"builder",DEBUG:"debug",VISUAL:"visual",LAUNCH:"launch"};function dR({nextMode:t,onDone:e}){W.useEffect(()=>{const r=setTimeout(e,3e3);return()=>clearTimeout(r)},[e]);const n={debug:{pre:"ROCKET BUILDER · COMPLETE",title:"DEBUG ARENA",sub:"All six systems repaired. Proceed to fault verification."},visual:{pre:"DEBUG ARENA · COMPLETE",title:"VISUAL LAB",sub:"All faults resolved. Proceed to final systems analysis."},launch:{pre:"ALL PHASES COMPLETE",title:"LAUNCH SEQUENCE INITIATED",sub:"All systems nominal. Stand by for launch."}},i=n[t]??n.launch;return P.jsxs("div",{className:"mode-transition",children:[P.jsx("div",{className:"mt-pre",children:i.pre}),P.jsx("div",{className:"mt-title",children:i.title}),P.jsx("div",{className:"mt-sub",children:i.sub}),P.jsx("div",{className:"mt-bar",children:P.jsx("div",{className:"mt-bar-fill"})})]})}function hR({onResume:t,onQuit:e}){return P.jsx("div",{className:"pause-overlay",children:P.jsxs("div",{className:"pause-panel",children:[P.jsx("div",{className:"pause-title",children:"MISSION PAUSED"}),P.jsx("div",{className:"pause-sub",children:"Your progress is saved."}),P.jsx("button",{className:"pause-btn pause-btn--resume",onClick:t,children:"RESUME MISSION"}),P.jsx("button",{className:"pause-btn pause-btn--quit",onClick:e,children:"QUIT TO GAME HUB"})]})})}function pR(){const[t,e]=W.useState(!1),n=W.useRef(!1),i=W.useRef(null);W.useEffect(()=>(i.current=tm(),Ha(i.current),()=>{var s;(s=i.current)==null||s.call(i),i.current=null,Ha(null)}),[]);const r=W.useCallback(()=>{var o;const s=!n.current;n.current=s,e(s),s?((o=i.current)==null||o.call(i),i.current=null,Ha(null)):(i.current=tm(),Ha(i.current))},[]);return P.jsx("button",{className:"game-music-btn",onClick:r,title:t?"Music off":"Music on",children:t?"♪":"♫"})}function mR(){const[t,e]=W.useState(d2()),n=W.useCallback(()=>{const i=f2();e(i)},[]);return P.jsx("button",{className:"game-mute-btn",onClick:n,title:t?"Unmute":"Mute",children:t?"🔇":"🔊"})}function gR(){const[t,e]=W.useState("MAIN_MENU"),[n,i]=W.useState(ai.BUILDER),[r,s]=W.useState(null),[o,a]=W.useState(()=>L2()),[l,u]=W.useState(!1),[c,d]=W.useState(null),f=W.useRef(null),p=W.useCallback(()=>{try{window.parent.postMessage({type:"QUIT_TO_HUB"},"*")}catch{}},[]),m=W.useCallback(()=>{a(D2()),e("MAIN_MENU"),i(ai.BUILDER),s(null),u(!1)},[]);W.useEffect(()=>{function b(w){w.data&&w.data.type==="STOP_AUDIO"&&E2()}return window.addEventListener("message",b),()=>window.removeEventListener("message",b)},[]),W.useEffect(()=>{const b=o.completedMissions,w=nm.every(R=>b.includes(R)),y=["debug_wrong_variable","debug_wrong_operator","debug_missing_return"].every(R=>b.includes(R)),C=["visual_fuel","visual_comms","visual_diagnostics"].every(R=>b.includes(R));if(C||y&&C){i(ai.LAUNCH);return}if(y){i(ai.VISUAL);return}if(w){i(ai.DEBUG);return}},[]);const _=W.useCallback(b=>{f.current=b,d(b)},[]),g=W.useCallback(()=>{const b=f.current;f.current=null,d(null),b&&a(w=>{const y=ip(w,b);return nm.every(R=>y.completedMissions.includes(R))&&s("debug"),y})},[]),h=W.useCallback(b=>{a(b),s("visual")},[]),v=W.useCallback(b=>{a(b),s("launch")},[]),S=W.useCallback(()=>{i(r),s(null)},[r]),M=W.useCallback(()=>{e("MARS")},[]),T=t==="HANGAR";return P.jsxs("div",{className:"game-root",children:[P.jsx("button",{className:"game-pause-btn",onClick:()=>u(!0),title:"Pause",children:"⏸ PAUSE"}),P.jsx(pR,{}),P.jsx(mR,{}),l&&P.jsx(hR,{onResume:()=>u(!1),onQuit:p}),t==="MAIN_MENU"&&P.jsx(SM,{onStart:()=>e("BRIEFING")}),t==="BRIEFING"&&P.jsx(yM,{onContinue:()=>e("HANGAR")}),T&&(n===ai.BUILDER||n===ai.LAUNCH)&&P.jsx(W2,{progress:o,onMissionComplete:_,autoLaunch:n===ai.LAUNCH,onLaunchComplete:M}),T&&n===ai.DEBUG&&P.jsx(cR,{progress:o,onComplete:h}),T&&n===ai.VISUAL&&P.jsx(fR,{progress:o,onComplete:v}),t==="MARS"&&P.jsx(eR,{onPlayAgain:m}),c&&P.jsx(uR,{missionId:c,onDone:g}),r&&P.jsx(dR,{nextMode:r,onDone:S})]})}const vR=df.createRoot(document.getElementById("launch-sequence-root"));vR.render(P.jsx(gR,{}));
