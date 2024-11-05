import{t as C,z as P,A as b,B as E,C as W,D as Y,F as I,G as O,H as m,I as q,J as $,K as j,L as S,M as w,N as D,O as z,c as y,P as F,Q as G,R as J,S as K,T as Q,U,V as X,a as Z,p as x,h as L,e as rr,k as tr}from"./runtime.BQEIYVZe.js";import{b as er}from"./disclose-version.BMO508ZJ.js";const V=new Set,N=new Set;function ar(r,t,a,u){function s(e){if(u.capture||p.call(t,e),!e.cancelBubble){var o=I,d=O;b(null),E(null);try{return a.call(this,e)}finally{b(o),E(d)}}}return r.startsWith("pointer")||r.startsWith("touch")||r==="wheel"?P(()=>{t.addEventListener(r,s,u)}):t.addEventListener(r,s,u),s}function fr(r,t,a,u,s){var e={capture:u,passive:s},o=ar(r,t,a,e);(t===document.body||t===window||t===document)&&C(()=>{t.removeEventListener(r,o,e)})}function lr(r){for(var t=0;t<r.length;t++)V.add(r[t]);for(var a of N)a(r)}function p(r){var A;var t=this,a=t.ownerDocument,u=r.type,s=((A=r.composedPath)==null?void 0:A.call(r))||[],e=s[0]||r.target,o=0,d=r.__root;if(d){var c=s.indexOf(d);if(c!==-1&&(t===document||t===window)){r.__root=t;return}var _=s.indexOf(t);if(_===-1)return;c<=_&&(o=c)}if(e=s[o]||r.target,e!==t){W(r,"currentTarget",{configurable:!0,get(){return e||a}});var T=I,f=O;b(null),E(null);try{for(var n,i=[];e!==null;){var l=e.assignedSlot||e.parentNode||e.host||null;try{var h=e["__"+u];if(h!==void 0&&!e.disabled)if(Y(h)){var[M,...B]=h;M.apply(e,[r,...B])}else h.call(e,r)}catch(g){n?i.push(g):n=g}if(r.cancelBubble||l===t||l===null)break;e=l}if(n){for(let g of i)queueMicrotask(()=>{throw g});throw n}}finally{r.__root=t,delete r.currentTarget,b(T),E(f)}}}const nr=["touchstart","touchmove"];function sr(r){return nr.includes(r)}let k=!0;function dr(r,t){var a=t==null?"":typeof t=="object"?t+"":t;a!==(r.__t??(r.__t=r.nodeValue))&&(r.__t=a,r.nodeValue=a==null?"":a+"")}function ir(r,t){return H(r,t)}function cr(r,t){m(),t.intro=t.intro??!1;const a=t.target,u=L,s=y;try{for(var e=q(a);e&&(e.nodeType!==8||e.data!==$);)e=j(e);if(!e)throw S;w(!0),D(e),z();const o=H(r,{...t,anchor:e});if(y===null||y.nodeType!==8||y.data!==F)throw G(),S;return w(!1),o}catch(o){if(o===S)return t.recover===!1&&J(),m(),K(a),w(!1),ir(r,t);throw o}finally{w(u),D(s)}}const v=new Map;function H(r,{target:t,anchor:a,props:u={},events:s,context:e,intro:o=!0}){m();var d=new Set,c=f=>{for(var n=0;n<f.length;n++){var i=f[n];if(!d.has(i)){d.add(i);var l=sr(i);t.addEventListener(i,p,{passive:l});var h=v.get(i);h===void 0?(document.addEventListener(i,p,{passive:l}),v.set(i,1)):v.set(i,h+1)}}};c(Q(V)),N.add(c);var _=void 0,T=U(()=>{var f=a??t.appendChild(X());return Z(()=>{if(e){x({});var n=tr;n.c=e}s&&(u.$$events=s),L&&er(f,null),k=o,_=r(f,u)||{},k=!0,L&&(O.nodes_end=y),e&&rr()}),()=>{var l;for(var n of d){t.removeEventListener(n,p);var i=v.get(n);--i===0?(document.removeEventListener(n,p),v.delete(n)):v.set(n,i)}N.delete(c),R.delete(_),f!==a&&((l=f.parentNode)==null||l.removeChild(f))}});return R.set(_,T),_}let R=new WeakMap;function _r(r){const t=R.get(r);t&&t()}export{k as a,lr as d,fr as e,cr as h,ir as m,dr as s,_r as u};
