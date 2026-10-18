(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();const Tf=1.1;class Ef{constructor(t,e,n){this.app=t,this.xr=e,this.setEnvironment=n,t.onFrame(i=>this.updateSpin(i))}app;xr;setEnvironment;spin=-1;run=t=>{const e=this.xr.command(t);if(e)return e;switch(t.name){case"move":return{ok:!1,note:"Walking along with the player works in the headset, in mixed reality."};case"pose":return this.app.setPosture(t.value==="sit"?"seated":"standing"),{ok:!0};case"gesture":return this.gesture(t.value);case"celebration":return{ok:!1,note:"The celebrations (bubbles, fireworks…) show in the headset."};case"change_place":return this.setEnvironment(t.value),{ok:!0}}};gesture(t){const e=this.app.character;if(!e)return{ok:!1,note:"not ready yet"};if(t==="spin")return this.spin=0,{ok:!0};const n=t;return e.perform?.(n)?{ok:!0}:this.app.currentPosture==="seated"&&(this.app.setPosture("standing"),e.perform?.(n))?{ok:!0,note:"stood up to do it"}:(this.app.behavior.dispatch({type:"react"},performance.now()),{ok:!0,note:`no ${n} animation, so a happy reaction instead`})}updateSpin(t){const e=this.app.character?.object;if(this.spin<0||!e)return;this.spin+=t/Tf;const n=Math.min(1,this.spin);e.rotation.y=Math.PI*2*(n*n*(3-2*n)),n>=1&&(e.rotation.y=0,this.spin=-1)}}const Pc={move:{key:"action",values:["come","stay","follow","circle"]},pose:{key:"pose",values:["sit","stand"]},gesture:{key:"gesture",values:["wave","celebrate","dance","spin"]},celebration:{key:"kind",values:["bubble","firework","water","confetti"]},change_place:{key:"place",values:["majlis","fereej","barr"]}};function Af(s,t){if(!(s in Pc))return null;const e=Pc[s],n=t?.[e.key];return typeof n!="string"||!e.values.includes(n)?null:{name:s,value:n}}const Vl="186",us={ROTATE:0,DOLLY:1,PAN:2},as={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Rf=0,Ic=1,Cf=2,ya=1,Pf=2,Zs=3,mi=0,Ke=1,en=2,jn=0,Qs=1,Ra=2,Lc=3,Dc=4,If=5,rs=100,Lf=101,Df=102,Nf=103,Uf=104,Of=200,Ff=201,Bf=202,kf=203,qu=204,Ku=205,zf=206,Hf=207,Vf=208,Gf=209,Wf=210,Xf=211,Yf=212,qf=213,Kf=214,Ko=0,Zo=1,Jo=2,hr=3,$o=4,jo=5,Qo=6,tl=7,Gl=0,Zf=1,Jf=2,On=0,Zu=1,Ju=2,$u=3,ju=4,Qu=5,td=6,ed=7,Nc="attached",$f="detached",nd=300,Ci=301,xs=302,$a=303,ja=304,ka=306,Pi=1e3,Dn=1001,Ca=1002,Ne=1003,id=1004,Js=1005,Be=1006,Ma=1007,Jn=1008,an=1009,sd=1010,rd=1011,ur=1012,Wl=1013,Fn=1014,fn=1015,Bn=1016,Xl=1017,Yl=1018,dr=1020,ad=35902,od=35899,ld=1021,cd=1022,pn=1023,ti=1026,Ri=1027,za=1028,ql=1029,Ii=1030,Kl=1031,Zl=1033,Sa=33776,ba=33777,wa=33778,Ta=33779,el=35840,nl=35841,il=35842,sl=35843,rl=36196,al=37492,ol=37496,ll=37488,cl=37489,Pa=37490,hl=37491,ul=37808,dl=37809,fl=37810,pl=37811,ml=37812,gl=37813,_l=37814,xl=37815,vl=37816,yl=37817,Ml=37818,Sl=37819,bl=37820,wl=37821,Tl=36492,El=36494,Al=36495,Rl=36283,Cl=36284,Ia=36285,Pl=36286,Jl=2200,jf=2201,Qf=2202,fr=2300,pr=2301,Qa=2302,Uc=2303,os=2400,ls=2401,La=2402,$l=2500,tp=2501,ep=0,hd=1,Il=2,np=3200,mr=0,ip=1,pi="",ye="srgb",ln="srgb-linear",Da="linear",ae="srgb",to=7680,sp=519,rp=512,ap=513,op=514,jl=515,lp=516,cp=517,Ql=518,hp=519,ud=35044,Oc=35048,Fc="300 es",Nn=2e3,gr=2001;function up(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function dp(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function _r(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function fp(){const s=_r("canvas");return s.style.display="block",s}const Bc={};function Na(...s){const t="THREE."+s.shift();console.log(t,...s)}function dd(s){const t=s[0];if(typeof t=="string"&&t.startsWith("TSL:")){const e=s[1];e&&e.isStackTrace?s[0]+=" "+e.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function Tt(...s){s=dd(s);const t="THREE."+s.shift();{const e=s[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...s)}}function Lt(...s){s=dd(s);const t="THREE."+s.shift();{const e=s[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...s)}}function ds(...s){const t=s.join(" ");t in Bc||(Bc[t]=!0,Tt(...s))}function pp(s,t,e){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const mp={[Ko]:Zo,[Jo]:Qo,[$o]:tl,[hr]:jo,[Zo]:Ko,[Qo]:Jo,[tl]:$o,[jo]:hr};class ei{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const i=n[t];if(i!==void 0){const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,t);t.target=null}}}const Xe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let kc=1234567;const tr=Math.PI/180,vs=180/Math.PI;function mn(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Xe[s&255]+Xe[s>>8&255]+Xe[s>>16&255]+Xe[s>>24&255]+"-"+Xe[t&255]+Xe[t>>8&255]+"-"+Xe[t>>16&15|64]+Xe[t>>24&255]+"-"+Xe[e&63|128]+Xe[e>>8&255]+"-"+Xe[e>>16&255]+Xe[e>>24&255]+Xe[n&255]+Xe[n>>8&255]+Xe[n>>16&255]+Xe[n>>24&255]).toLowerCase()}function Ft(s,t,e){return Math.max(t,Math.min(e,s))}function tc(s,t){return(s%t+t)%t}function gp(s,t,e,n,i){return n+(s-t)*(i-n)/(e-t)}function _p(s,t,e){return s!==t?(e-s)/(t-s):0}function er(s,t,e){return(1-e)*s+e*t}function xp(s,t,e,n){return er(s,t,1-Math.exp(-e*n))}function vp(s,t=1){return t-Math.abs(tc(s,t*2)-t)}function yp(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*(3-2*s))}function Mp(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*s*(s*(s*6-15)+10))}function Sp(s,t){return s+Math.floor(Math.random()*(t-s+1))}function bp(s,t){return s+Math.random()*(t-s)}function wp(s){return s*(.5-Math.random())}function Tp(s){s!==void 0&&(kc=s);let t=kc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Ep(s){return s*tr}function Ap(s){return s*vs}function Rp(s){return s>0&&Number.isInteger(s)&&2**Math.round(Math.log2(s))===s}function Cp(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Pp(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Ip(s,t,e,n,i){const r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),c=r((t+n)/2),h=a((t+n)/2),u=r((t-n)/2),f=a((t-n)/2),d=r((n-t)/2),p=a((n-t)/2);switch(i){case"XYX":s.set(o*h,l*u,l*f,o*c);break;case"YZY":s.set(l*f,o*h,l*u,o*c);break;case"ZXZ":s.set(l*u,l*f,o*h,o*c);break;case"XZX":s.set(o*h,l*p,l*d,o*c);break;case"YXY":s.set(l*d,o*h,l*p,o*c);break;case"ZYZ":s.set(l*p,l*d,o*h,o*c);break;default:Tt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function yn(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:case Uint8ClampedArray:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function oe(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Te={DEG2RAD:tr,RAD2DEG:vs,generateUUID:mn,clamp:Ft,euclideanModulo:tc,mapLinear:gp,inverseLerp:_p,lerp:er,damp:xp,pingpong:vp,smoothstep:yp,smootherstep:Mp,randInt:Sp,randFloat:bp,randFloatSpread:wp,seededRandom:Tp,degToRad:Ep,radToDeg:Ap,isPowerOfTwo:Rp,ceilPowerOfTwo:Cp,floorPowerOfTwo:Pp,setQuaternionFromProperEuler:Ip,normalize:oe,denormalize:yn};class it{static{it.prototype.isVector2=!0}constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Ft(this.x,t.x,e.x),this.y=Ft(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Ft(this.x,t,e),this.y=Ft(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ft(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ft(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*i+t.x,this.y=r*i+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class he{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3],f=r[a+0],d=r[a+1],p=r[a+2],x=r[a+3];if(u!==x||l!==f||c!==d||h!==p){let g=l*f+c*d+h*p+u*x;g<0&&(f=-f,d=-d,p=-p,x=-x,g=-g);let m=1-o;if(g<.9995){const M=Math.acos(g),S=Math.sin(M);m=Math.sin(m*M)/S,o=Math.sin(o*M)/S,l=l*m+f*o,c=c*m+d*o,h=h*m+p*o,u=u*m+x*o}else{l=l*m+f*o,c=c*m+d*o,h=h*m+p*o,u=u*m+x*o;const M=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=M,c*=M,h*=M,u*=M}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,r,a){const o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=r[a],f=r[a+1],d=r[a+2],p=r[a+3];return t[e]=o*p+h*u+l*d-c*f,t[e+1]=l*p+h*f+c*u-o*d,t[e+2]=c*p+h*d+o*f-l*u,t[e+3]=h*p-o*u-l*f-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),u=o(r/2),f=l(n/2),d=l(i/2),p=l(r/2);switch(a){case"XYZ":this._x=f*h*u+c*d*p,this._y=c*d*u-f*h*p,this._z=c*h*p+f*d*u,this._w=c*h*u-f*d*p;break;case"YXZ":this._x=f*h*u+c*d*p,this._y=c*d*u-f*h*p,this._z=c*h*p-f*d*u,this._w=c*h*u+f*d*p;break;case"ZXY":this._x=f*h*u-c*d*p,this._y=c*d*u+f*h*p,this._z=c*h*p+f*d*u,this._w=c*h*u-f*d*p;break;case"ZYX":this._x=f*h*u-c*d*p,this._y=c*d*u+f*h*p,this._z=c*h*p-f*d*u,this._w=c*h*u+f*d*p;break;case"YZX":this._x=f*h*u+c*d*p,this._y=c*d*u+f*h*p,this._z=c*h*p-f*d*u,this._w=c*h*u-f*d*p;break;case"XZY":this._x=f*h*u-c*d*p,this._y=c*d*u-f*h*p,this._z=c*h*p+f*d*u,this._w=c*h*u+f*d*p;break;default:Tt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],u=e[10],f=n+o+u;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-l)*d,this._y=(r-c)*d,this._z=(a-i)*d}else if(n>o&&n>u){const d=2*Math.sqrt(1+n-o-u);this._w=(h-l)/d,this._x=.25*d,this._y=(i+a)/d,this._z=(r+c)/d}else if(o>u){const d=2*Math.sqrt(1+o-n-u);this._w=(r-c)/d,this._x=(i+a)/d,this._y=.25*d,this._z=(l+h)/d}else{const d=2*Math.sqrt(1+u-n-o);this._w=(a-i)/d,this._x=(r+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ft(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+i*c-r*l,this._y=i*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-r*c,this._onChangeCallback(),this}slerp(t,e){let n=t._x,i=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(n=-n,i=-i,r=-r,a=-a,o=-o);let l=1-e;if(o<.9995){const c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+n*e,this._y=this._y*l+i*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this._onChangeCallback()}else this._x=this._x*l+n*e,this._y=this._y*l+i*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class A{static{A.prototype.isVector3=!0}constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(zc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(zc.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*i-o*n),h=2*(o*e-r*i),u=2*(r*n-a*e);return this.x=e+l*c+a*u-o*h,this.y=n+l*h+o*c-r*u,this.z=i+l*u+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Ft(this.x,t.x,e.x),this.y=Ft(this.y,t.y,e.y),this.z=Ft(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Ft(this.x,t,e),this.y=Ft(this.y,t,e),this.z=Ft(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ft(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=i*l-r*o,this.y=r*a-n*l,this.z=n*o-i*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return eo.copy(this).projectOnVector(t),this.sub(eo)}reflect(t){return this.sub(eo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ft(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const eo=new A,zc=new he;class Nt{static{Nt.prototype.isMatrix3=!0}constructor(t,e,n,i,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,c)}set(t,e,n,i,r,a,o,l,c){const h=this.elements;return h[0]=t,h[1]=i,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],f=n[2],d=n[5],p=n[8],x=i[0],g=i[3],m=i[6],M=i[1],S=i[4],_=i[7],T=i[2],b=i[5],R=i[8];return r[0]=a*x+o*M+l*T,r[3]=a*g+o*S+l*b,r[6]=a*m+o*_+l*R,r[1]=c*x+h*M+u*T,r[4]=c*g+h*S+u*b,r[7]=c*m+h*_+u*R,r[2]=f*x+d*M+p*T,r[5]=f*g+d*S+p*b,r[8]=f*m+d*_+p*R,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+i*r*c-i*a*l}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=h*a-o*c,f=o*l-h*r,d=c*r-a*l,p=e*u+n*f+i*d;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/p;return t[0]=u*x,t[1]=(i*c-h*n)*x,t[2]=(o*n-i*a)*x,t[3]=f*x,t[4]=(h*e-i*l)*x,t[5]=(i*r-o*e)*x,t[6]=d*x,t[7]=(n*l-c*e)*x,t[8]=(a*e-n*r)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-i*c,i*l,-i*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return ds("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(no.makeScale(t,e)),this}rotate(t){return ds("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(no.makeRotation(-t)),this}translate(t,e){return ds("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(no.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const no=new Nt,Hc=new Nt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Vc=new Nt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Lp(){const s={enabled:!0,workingColorSpace:ln,spaces:{},convert:function(i,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===ae&&(i.r=Qn(i.r),i.g=Qn(i.g),i.b=Qn(i.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ae&&(i.r=fs(i.r),i.g=fs(i.g),i.b=fs(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===pi?Da:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,a){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,r){return ds("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(i,r)},toWorkingColorSpace:function(i,r){return ds("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(i,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[ln]:{primaries:t,whitePoint:n,transfer:Da,toXYZ:Hc,fromXYZ:Vc,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:ye},outputColorSpaceConfig:{drawingBufferColorSpace:ye}},[ye]:{primaries:t,whitePoint:n,transfer:ae,toXYZ:Hc,fromXYZ:Vc,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:ye}}}),s}const qt=Lp();function Qn(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function fs(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let ki;class Dp{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{ki===void 0&&(ki=_r("canvas")),ki.width=t.width,ki.height=t.height;const i=ki.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),n=ki}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=_r("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=Qn(r[a]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Qn(e[n]/255)*255):e[n]=Qn(e[n]);return{data:e,width:t.width,height:t.height}}else return Tt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Np=0;class ec{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Np++}),this.uuid=mn(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(io(i[a].image)):r.push(io(i[a]))}else r=io(i);n.url=r}return e||(t.images[this.uuid]=n),n}}function io(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Dp.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(Tt("Texture: Unable to serialize Texture."),{})}let Up=0;const so=new A;class Ee extends ei{constructor(t=Ee.DEFAULT_IMAGE,e=Ee.DEFAULT_MAPPING,n=Dn,i=Dn,r=Be,a=Jn,o=pn,l=an,c=Ee.DEFAULT_ANISOTROPY,h=pi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Up++}),this.uuid=mn(),this.name="",this.source=new ec(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new it(0,0),this.repeat=new it(1,1),this.center=new it(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Nt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(so).x}get height(){return this.source.getSize(so).y}get depth(){return this.source.getSize(so).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){Tt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){Tt(`Texture.setValues(): property '${e}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==nd)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Pi:t.x=t.x-Math.floor(t.x);break;case Dn:t.x=t.x<0?0:1;break;case Ca:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Pi:t.y=t.y-Math.floor(t.y);break;case Dn:t.y=t.y<0?0:1;break;case Ca:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ee.DEFAULT_IMAGE=null;Ee.DEFAULT_MAPPING=nd;Ee.DEFAULT_ANISOTROPY=1;class ue{static{ue.prototype.isVector4=!0}constructor(t=0,e=0,n=0,i=1){this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*i+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r;const l=t.elements,c=l[0],h=l[4],u=l[8],f=l[1],d=l[5],p=l[9],x=l[2],g=l[6],m=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-x)<.01&&Math.abs(p-g)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+x)<.1&&Math.abs(p+g)<.1&&Math.abs(c+d+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const S=(c+1)/2,_=(d+1)/2,T=(m+1)/2,b=(h+f)/4,R=(u+x)/4,v=(p+g)/4;return S>_&&S>T?S<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(S),i=b/n,r=R/n):_>T?_<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(_),n=b/i,r=v/i):T<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(T),n=R/r,i=v/r),this.set(n,i,r,e),this}let M=Math.sqrt((g-p)*(g-p)+(u-x)*(u-x)+(f-h)*(f-h));return Math.abs(M)<.001&&(M=1),this.x=(g-p)/M,this.y=(u-x)/M,this.z=(f-h)/M,this.w=Math.acos((c+d+m-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Ft(this.x,t.x,e.x),this.y=Ft(this.y,t.y,e.y),this.z=Ft(this.z,t.z,e.z),this.w=Ft(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Ft(this.x,t,e),this.y=Ft(this.y,t,e),this.z=Ft(this.z,t,e),this.w=Ft(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ft(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Op extends ei{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Be,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new ue(0,0,t,e),this.scissorTest=!1,this.viewport=new ue(0,0,t,e),this.textures=[];const i={width:t,height:e,depth:n.depth},r=new Ee(i),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){const e={minFilter:Be,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const i=Object.assign({},t.textures[e].image);this.textures[e].source=new ec(i)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){const e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Mn extends Op{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class fd extends Ee{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Ne,this.minFilter=Ne,this.wrapR=Dn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Fp extends Ee{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Ne,this.minFilter=Ne,this.wrapR=Dn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}}class Dt{static{Dt.prototype.isMatrix4=!0}constructor(t,e,n,i,r,a,o,l,c,h,u,f,d,p,x,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,c,h,u,f,d,p,x,g)}set(t,e,n,i,r,a,o,l,c,h,u,f,d,p,x,g){const m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=i,m[1]=r,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=h,m[10]=u,m[14]=f,m[3]=d,m[7]=p,m[11]=x,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Dt().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const e=this.elements,n=t.elements,i=1/zi.setFromMatrixColumn(t,0).length(),r=1/zi.setFromMatrixColumn(t,1).length(),a=1/zi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const f=a*h,d=a*u,p=o*h,x=o*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=d+p*c,e[5]=f-x*c,e[9]=-o*l,e[2]=x-f*c,e[6]=p+d*c,e[10]=a*l}else if(t.order==="YXZ"){const f=l*h,d=l*u,p=c*h,x=c*u;e[0]=f+x*o,e[4]=p*o-d,e[8]=a*c,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=d*o-p,e[6]=x+f*o,e[10]=a*l}else if(t.order==="ZXY"){const f=l*h,d=l*u,p=c*h,x=c*u;e[0]=f-x*o,e[4]=-a*u,e[8]=p+d*o,e[1]=d+p*o,e[5]=a*h,e[9]=x-f*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const f=a*h,d=a*u,p=o*h,x=o*u;e[0]=l*h,e[4]=p*c-d,e[8]=f*c+x,e[1]=l*u,e[5]=x*c+f,e[9]=d*c-p,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const f=a*l,d=a*c,p=o*l,x=o*c;e[0]=l*h,e[4]=x-f*u,e[8]=p*u+d,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=d*u+p,e[10]=f-x*u}else if(t.order==="XZY"){const f=a*l,d=a*c,p=o*l,x=o*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=f*u+x,e[5]=a*h,e[9]=d*u-p,e[2]=p*u-d,e[6]=o*h,e[10]=x*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Bp,t,kp)}lookAt(t,e,n){const i=this.elements;return sn.subVectors(t,e),sn.lengthSq()===0&&(sn.z=1),sn.normalize(),ai.crossVectors(n,sn),ai.lengthSq()===0&&(Math.abs(n.z)===1?sn.x+=1e-4:sn.z+=1e-4,sn.normalize(),ai.crossVectors(n,sn)),ai.normalize(),Nr.crossVectors(sn,ai),i[0]=ai.x,i[4]=Nr.x,i[8]=sn.x,i[1]=ai.y,i[5]=Nr.y,i[9]=sn.y,i[2]=ai.z,i[6]=Nr.z,i[10]=sn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],f=n[9],d=n[13],p=n[2],x=n[6],g=n[10],m=n[14],M=n[3],S=n[7],_=n[11],T=n[15],b=i[0],R=i[4],v=i[8],E=i[12],P=i[1],I=i[5],O=i[9],F=i[13],L=i[2],k=i[6],K=i[10],Z=i[14],nt=i[3],X=i[7],Q=i[11],et=i[15];return r[0]=a*b+o*P+l*L+c*nt,r[4]=a*R+o*I+l*k+c*X,r[8]=a*v+o*O+l*K+c*Q,r[12]=a*E+o*F+l*Z+c*et,r[1]=h*b+u*P+f*L+d*nt,r[5]=h*R+u*I+f*k+d*X,r[9]=h*v+u*O+f*K+d*Q,r[13]=h*E+u*F+f*Z+d*et,r[2]=p*b+x*P+g*L+m*nt,r[6]=p*R+x*I+g*k+m*X,r[10]=p*v+x*O+g*K+m*Q,r[14]=p*E+x*F+g*Z+m*et,r[3]=M*b+S*P+_*L+T*nt,r[7]=M*R+S*I+_*k+T*X,r[11]=M*v+S*O+_*K+T*Q,r[15]=M*E+S*F+_*Z+T*et,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],u=t[6],f=t[10],d=t[14],p=t[3],x=t[7],g=t[11],m=t[15],M=l*d-c*f,S=o*d-c*u,_=o*f-l*u,T=a*d-c*h,b=a*f-l*h,R=a*u-o*h;return e*(x*M-g*S+m*_)-n*(p*M-g*T+m*b)+i*(p*S-x*T+m*R)-r*(p*_-x*b+g*R)}determinantAffine(){const t=this.elements,e=t[0],n=t[4],i=t[8],r=t[1],a=t[5],o=t[9],l=t[2],c=t[6],h=t[10];return e*(a*h-o*c)-n*(r*h-o*l)+i*(r*c-a*l)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=t[9],f=t[10],d=t[11],p=t[12],x=t[13],g=t[14],m=t[15],M=e*o-n*a,S=e*l-i*a,_=e*c-r*a,T=n*l-i*o,b=n*c-r*o,R=i*c-r*l,v=h*x-u*p,E=h*g-f*p,P=h*m-d*p,I=u*g-f*x,O=u*m-d*x,F=f*m-d*g,L=M*F-S*O+_*I+T*P-b*E+R*v;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const k=1/L;return t[0]=(o*F-l*O+c*I)*k,t[1]=(i*O-n*F-r*I)*k,t[2]=(x*R-g*b+m*T)*k,t[3]=(f*b-u*R-d*T)*k,t[4]=(l*P-a*F-c*E)*k,t[5]=(e*F-i*P+r*E)*k,t[6]=(g*_-p*R-m*S)*k,t[7]=(h*R-f*_+d*S)*k,t[8]=(a*O-o*P+c*v)*k,t[9]=(n*P-e*O-r*v)*k,t[10]=(p*b-x*_+m*M)*k,t[11]=(u*_-h*b-d*M)*k,t[12]=(o*E-a*I-l*v)*k,t[13]=(e*I-n*E+i*v)*k,t[14]=(x*S-p*T-g*M)*k,t[15]=(h*T-u*S+f*M)*k,this}scale(t){const e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,a){return this.set(1,n,r,0,t,1,a,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,u=o+o,f=r*c,d=r*h,p=r*u,x=a*h,g=a*u,m=o*u,M=l*c,S=l*h,_=l*u,T=n.x,b=n.y,R=n.z;return i[0]=(1-(x+m))*T,i[1]=(d+_)*T,i[2]=(p-S)*T,i[3]=0,i[4]=(d-_)*b,i[5]=(1-(f+m))*b,i[6]=(g+M)*b,i[7]=0,i[8]=(p+S)*R,i[9]=(g-M)*R,i[10]=(1-(f+x))*R,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;t.x=i[12],t.y=i[13],t.z=i[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let a=zi.set(i[0],i[1],i[2]).length();const o=zi.set(i[4],i[5],i[6]).length(),l=zi.set(i[8],i[9],i[10]).length();r<0&&(a=-a),_n.copy(this);const c=1/a,h=1/o,u=1/l;return _n.elements[0]*=c,_n.elements[1]*=c,_n.elements[2]*=c,_n.elements[4]*=h,_n.elements[5]*=h,_n.elements[6]*=h,_n.elements[8]*=u,_n.elements[9]*=u,_n.elements[10]*=u,e.setFromRotationMatrix(_n),n.x=a,n.y=o,n.z=l,this}makePerspective(t,e,n,i,r,a,o=Nn,l=!1){const c=this.elements,h=2*r/(e-t),u=2*r/(n-i),f=(e+t)/(e-t),d=(n+i)/(n-i);let p,x;if(l)p=r/(a-r),x=a*r/(a-r);else if(o===Nn)p=-(a+r)/(a-r),x=-2*a*r/(a-r);else if(o===gr)p=-a/(a-r),x=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=u,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,i,r,a,o=Nn,l=!1){const c=this.elements,h=2/(e-t),u=2/(n-i),f=-(e+t)/(e-t),d=-(n+i)/(n-i);let p,x;if(l)p=1/(a-r),x=a/(a-r);else if(o===Nn)p=-2/(a-r),x=-(a+r)/(a-r);else if(o===gr)p=-1/(a-r),x=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=u,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=p,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const zi=new A,_n=new Dt,Bp=new A(0,0,0),kp=new A(1,1,1),ai=new A,Nr=new A,sn=new A,Gc=new Dt,Wc=new he;class Sn{constructor(t=0,e=0,n=0,i=Sn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,r=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],u=i[2],f=i[6],d=i[10];switch(e){case"XYZ":this._y=Math.asin(Ft(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ft(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ft(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ft(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ft(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-Ft(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:Tt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Gc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Gc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Wc.setFromEuler(this),this.setFromQuaternion(Wc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Sn.DEFAULT_ORDER="XYZ";class nc{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let zp=0;const Xc=new A,Hi=new he,Vn=new Dt,Ur=new A,Cs=new A,Hp=new A,Vp=new he,Yc=new A(1,0,0),qc=new A(0,1,0),Kc=new A(0,0,1),Zc={type:"added"},Gp={type:"removed"},Vi={type:"childadded",child:null},ro={type:"childremoved",child:null};class xe extends ei{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:zp++}),this.uuid=mn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=xe.DEFAULT_UP.clone();const t=new A,e=new Sn,n=new he,i=new A(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Dt},normalMatrix:{value:new Nt}}),this.matrix=new Dt,this.matrixWorld=new Dt,this.matrixAutoUpdate=xe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=xe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new nc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Hi.setFromAxisAngle(t,e),this.quaternion.multiply(Hi),this}rotateOnWorldAxis(t,e){return Hi.setFromAxisAngle(t,e),this.quaternion.premultiply(Hi),this}rotateX(t){return this.rotateOnAxis(Yc,t)}rotateY(t){return this.rotateOnAxis(qc,t)}rotateZ(t){return this.rotateOnAxis(Kc,t)}translateOnAxis(t,e){return Xc.copy(t).applyQuaternion(this.quaternion),this.position.add(Xc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Yc,t)}translateY(t){return this.translateOnAxis(qc,t)}translateZ(t){return this.translateOnAxis(Kc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Vn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Ur.copy(t):Ur.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Cs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Vn.lookAt(Cs,Ur,this.up):Vn.lookAt(Ur,Cs,this.up),this.quaternion.setFromRotationMatrix(Vn),i&&(Vn.extractRotation(i.matrixWorld),Hi.setFromRotationMatrix(Vn),this.quaternion.premultiply(Hi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Lt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Zc),Vi.child=t,this.dispatchEvent(Vi),Vi.child=null):Lt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Gp),ro.child=t,this.dispatchEvent(ro),ro.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Vn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Vn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Vn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Zc),Vi.child=t,this.dispatchEvent(Vi),Vi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Cs,t,Hp),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Cs,Vp,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const e=t.x,n=t.y,i=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*i,r[13]+=n-r[1]*e-r[5]*n-r[9]*i,r[14]+=i-r[2]*e-r[6]*n-r[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,i.name=this.name,i.castShadow=this.castShadow,i.receiveShadow=this.receiveShadow,i.visible=this.visible,i.frustumCulled=this.frustumCulled,i.renderOrder=this.renderOrder,i.static=this.static,i.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(t),i.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));i.material=o}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),u=a(t.shapes),f=a(t.skeletons),d=a(t.animations),p=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),p.length>0&&(n.nodes=p)}return n.object=i,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}xe.DEFAULT_UP=new A(0,1,0);xe.DEFAULT_MATRIX_AUTO_UPDATE=!0;xe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Gt extends xe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Wp={type:"move"};class ao{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Gt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Gt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new A,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new A),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Gt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new A,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new A,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const x of t.hand.values()){const g=e.getJointPose(x,n),m=this._getHandJoint(c,x);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,p=.005;c.inputState.pinching&&f>d+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=d-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Wp)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Gt;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const pd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},oi={h:0,s:0,l:0},Or={h:0,s:0,l:0};function oo(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class St{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=ye){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,qt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,i=qt.workingColorSpace){return this.r=t,this.g=e,this.b=n,qt.colorSpaceToWorking(this,i),this}setHSL(t,e,n,i=qt.workingColorSpace){if(t=tc(t,1),e=Ft(e,0,1),n=Ft(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=oo(a,r,t+1/3),this.g=oo(a,r,t),this.b=oo(a,r,t-1/3)}return qt.colorSpaceToWorking(this,i),this}setStyle(t,e=ye){function n(r){r!==void 0&&parseFloat(r)<1&&Tt("Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Tt("Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Tt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=ye){const n=pd[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Tt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Qn(t.r),this.g=Qn(t.g),this.b=Qn(t.b),this}copyLinearToSRGB(t){return this.r=fs(t.r),this.g=fs(t.g),this.b=fs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ye){return qt.workingToColorSpace(Ye.copy(this),t),Math.round(Ft(Ye.r*255,0,255))*65536+Math.round(Ft(Ye.g*255,0,255))*256+Math.round(Ft(Ye.b*255,0,255))}getHexString(t=ye){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=qt.workingColorSpace){qt.workingToColorSpace(Ye.copy(this),e);const n=Ye.r,i=Ye.g,r=Ye.b,a=Math.max(n,i,r),o=Math.min(n,i,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(i-r)/u+(i<r?6:0);break;case i:l=(r-n)/u+2;break;case r:l=(n-i)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=qt.workingColorSpace){return qt.workingToColorSpace(Ye.copy(this),e),t.r=Ye.r,t.g=Ye.g,t.b=Ye.b,t}getStyle(t=ye){qt.workingToColorSpace(Ye.copy(this),t);const e=Ye.r,n=Ye.g,i=Ye.b;return t!==ye?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(oi),this.setHSL(oi.h+t,oi.s+e,oi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(oi),t.getHSL(Or);const n=er(oi.h,Or.h,e),i=er(oi.s,Or.s,e),r=er(oi.l,Or.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ye=new St;St.NAMES=pd;class Xp extends xe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Sn,this.environmentIntensity=1,this.environmentRotation=new Sn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}}const xn=new A,Gn=new A,lo=new A,Wn=new A,Gi=new A,Wi=new A,Jc=new A,co=new A,ho=new A,uo=new A,fo=new ue,po=new ue,mo=new ue;class dn{constructor(t=new A,e=new A,n=new A){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),xn.subVectors(t,e),i.cross(xn);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){xn.subVectors(i,e),Gn.subVectors(n,e),lo.subVectors(t,e);const a=xn.dot(xn),o=xn.dot(Gn),l=xn.dot(lo),c=Gn.dot(Gn),h=Gn.dot(lo),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;const f=1/u,d=(c*l-o*h)*f,p=(a*h-o*l)*f;return r.set(1-d-p,p,d)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Wn)===null?!1:Wn.x>=0&&Wn.y>=0&&Wn.x+Wn.y<=1}static getInterpolation(t,e,n,i,r,a,o,l){return this.getBarycoord(t,e,n,i,Wn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Wn.x),l.addScaledVector(a,Wn.y),l.addScaledVector(o,Wn.z),l)}static getInterpolatedAttribute(t,e,n,i,r,a){return fo.setScalar(0),po.setScalar(0),mo.setScalar(0),fo.fromBufferAttribute(t,e),po.fromBufferAttribute(t,n),mo.fromBufferAttribute(t,i),a.setScalar(0),a.addScaledVector(fo,r.x),a.addScaledVector(po,r.y),a.addScaledVector(mo,r.z),a}static isFrontFacing(t,e,n,i){return xn.subVectors(n,e),Gn.subVectors(t,e),xn.cross(Gn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return xn.subVectors(this.c,this.b),Gn.subVectors(this.a,this.b),xn.cross(Gn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return dn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return dn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return dn.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return dn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return dn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,r=this.c;let a,o;Gi.subVectors(i,n),Wi.subVectors(r,n),co.subVectors(t,n);const l=Gi.dot(co),c=Wi.dot(co);if(l<=0&&c<=0)return e.copy(n);ho.subVectors(t,i);const h=Gi.dot(ho),u=Wi.dot(ho);if(h>=0&&u<=h)return e.copy(i);const f=l*u-h*c;if(f<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(Gi,a);uo.subVectors(t,r);const d=Gi.dot(uo),p=Wi.dot(uo);if(p>=0&&d<=p)return e.copy(r);const x=d*c-l*p;if(x<=0&&c>=0&&p<=0)return o=c/(c-p),e.copy(n).addScaledVector(Wi,o);const g=h*p-d*u;if(g<=0&&u-h>=0&&d-p>=0)return Jc.subVectors(r,i),o=(u-h)/(u-h+(d-p)),e.copy(i).addScaledVector(Jc,o);const m=1/(g+x+f);return a=x*m,o=f*m,e.copy(n).addScaledVector(Gi,a).addScaledVector(Wi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class bn{constructor(t=new A(1/0,1/0,1/0),e=new A(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(vn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(vn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=vn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,vn):vn.fromBufferAttribute(r,a),vn.applyMatrix4(t.matrixWorld),this.expandByPoint(vn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Fr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Fr.copy(n.boundingBox)),Fr.applyMatrix4(t.matrixWorld),this.union(Fr)}const i=t.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,vn),vn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ps),Br.subVectors(this.max,Ps),Xi.subVectors(t.a,Ps),Yi.subVectors(t.b,Ps),qi.subVectors(t.c,Ps),li.subVectors(Yi,Xi),ci.subVectors(qi,Yi),xi.subVectors(Xi,qi);let e=[0,-li.z,li.y,0,-ci.z,ci.y,0,-xi.z,xi.y,li.z,0,-li.x,ci.z,0,-ci.x,xi.z,0,-xi.x,-li.y,li.x,0,-ci.y,ci.x,0,-xi.y,xi.x,0];return!go(e,Xi,Yi,qi,Br)||(e=[1,0,0,0,1,0,0,0,1],!go(e,Xi,Yi,qi,Br))?!1:(kr.crossVectors(li,ci),e=[kr.x,kr.y,kr.z],go(e,Xi,Yi,qi,Br))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,vn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(vn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Xn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Xn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Xn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Xn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Xn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Xn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Xn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Xn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Xn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Xn=[new A,new A,new A,new A,new A,new A,new A,new A],vn=new A,Fr=new bn,Xi=new A,Yi=new A,qi=new A,li=new A,ci=new A,xi=new A,Ps=new A,Br=new A,kr=new A,vi=new A;function go(s,t,e,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){vi.fromArray(s,r);const o=i.x*Math.abs(vi.x)+i.y*Math.abs(vi.y)+i.z*Math.abs(vi.z),l=t.dot(vi),c=e.dot(vi),h=n.dot(vi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const De=new A,zr=new it;let Yp=0;class Ce extends ei{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Yp++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=ud,this.updateRanges=[],this.gpuType=fn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)zr.fromBufferAttribute(this,e),zr.applyMatrix3(t),this.setXY(e,zr.x,zr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)De.fromBufferAttribute(this,e),De.applyMatrix3(t),this.setXYZ(e,De.x,De.y,De.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)De.fromBufferAttribute(this,e),De.applyMatrix4(t),this.setXYZ(e,De.x,De.y,De.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)De.fromBufferAttribute(this,e),De.applyNormalMatrix(t),this.setXYZ(e,De.x,De.y,De.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)De.fromBufferAttribute(this,e),De.transformDirection(t),this.setXYZ(e,De.x,De.y,De.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=yn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=oe(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=yn(e,this.array)),e}setX(t,e){return this.normalized&&(e=oe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=yn(e,this.array)),e}setY(t,e){return this.normalized&&(e=oe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=yn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=oe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=yn(e,this.array)),e}setW(t,e){return this.normalized&&(e=oe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=oe(e,this.array),n=oe(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=oe(e,this.array),n=oe(n,this.array),i=oe(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=oe(e,this.array),n=oe(n,this.array),i=oe(i,this.array),r=oe(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}}class md extends Ce{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class gd extends Ce{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Ht extends Ce{constructor(t,e,n){super(new Float32Array(t),e,n)}}const qp=new bn,Is=new A,_o=new A;class zn{constructor(t=new A,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):qp.setFromPoints(t).getCenter(n);let i=0;for(let r=0,a=t.length;r<a;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Is.subVectors(t,this.center);const e=Is.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(Is,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(_o.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Is.copy(t.center).add(_o)),this.expandByPoint(Is.copy(t.center).sub(_o))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let Kp=0;const hn=new Dt,xo=new xe,Ki=new A,rn=new bn,Ls=new bn,Ve=new A;class Qt extends ei{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Kp++}),this.uuid=mn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(up(t)?gd:md)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Nt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return hn.makeRotationFromQuaternion(t),this.applyMatrix4(hn),this}rotateX(t){return hn.makeRotationX(t),this.applyMatrix4(hn),this}rotateY(t){return hn.makeRotationY(t),this.applyMatrix4(hn),this}rotateZ(t){return hn.makeRotationZ(t),this.applyMatrix4(hn),this}translate(t,e,n){return hn.makeTranslation(t,e,n),this.applyMatrix4(hn),this}scale(t,e,n){return hn.makeScale(t,e,n),this.applyMatrix4(hn),this}lookAt(t){return xo.lookAt(t),xo.updateMatrix(),this.applyMatrix4(xo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ki).negate(),this.translate(Ki.x,Ki.y,Ki.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let i=0,r=t.length;i<r;i++){const a=t[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ht(n,3))}else{const n=Math.min(t.length,e.count);for(let i=0;i<n;i++){const r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&Tt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new bn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Lt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new A(-1/0,-1/0,-1/0),new A(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const r=e[n];rn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ve.addVectors(this.boundingBox.min,rn.min),this.boundingBox.expandByPoint(Ve),Ve.addVectors(this.boundingBox.max,rn.max),this.boundingBox.expandByPoint(Ve)):(this.boundingBox.expandByPoint(rn.min),this.boundingBox.expandByPoint(rn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Lt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new zn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Lt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new A,1/0);return}if(t){const n=this.boundingSphere.center;if(rn.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];Ls.setFromBufferAttribute(o),this.morphTargetsRelative?(Ve.addVectors(rn.min,Ls.min),rn.expandByPoint(Ve),Ve.addVectors(rn.max,Ls.max),rn.expandByPoint(Ve)):(rn.expandByPoint(Ls.min),rn.expandByPoint(Ls.max))}rn.getCenter(n);let i=0;for(let r=0,a=t.count;r<a;r++)Ve.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(Ve));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Ve.fromBufferAttribute(o,c),l&&(Ki.fromBufferAttribute(t,c),Ve.add(Ki)),i=Math.max(i,n.distanceToSquared(Ve))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&Lt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Lt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,r=e.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new Ce(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],l=[];for(let v=0;v<n.count;v++)o[v]=new A,l[v]=new A;const c=new A,h=new A,u=new A,f=new it,d=new it,p=new it,x=new A,g=new A;function m(v,E,P){c.fromBufferAttribute(n,v),h.fromBufferAttribute(n,E),u.fromBufferAttribute(n,P),f.fromBufferAttribute(r,v),d.fromBufferAttribute(r,E),p.fromBufferAttribute(r,P),h.sub(c),u.sub(c),d.sub(f),p.sub(f);const I=1/(d.x*p.y-p.x*d.y);isFinite(I)&&(x.copy(h).multiplyScalar(p.y).addScaledVector(u,-d.y).multiplyScalar(I),g.copy(u).multiplyScalar(d.x).addScaledVector(h,-p.x).multiplyScalar(I),o[v].add(x),o[E].add(x),o[P].add(x),l[v].add(g),l[E].add(g),l[P].add(g))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let v=0,E=M.length;v<E;++v){const P=M[v],I=P.start,O=P.count;for(let F=I,L=I+O;F<L;F+=3)m(t.getX(F+0),t.getX(F+1),t.getX(F+2))}const S=new A,_=new A,T=new A,b=new A;function R(v){T.fromBufferAttribute(i,v),b.copy(T);const E=o[v];S.copy(E),S.sub(T.multiplyScalar(T.dot(E))).normalize(),_.crossVectors(b,E);const I=_.dot(l[v])<0?-1:1;a.setXYZW(v,S.x,S.y,S.z,I)}for(let v=0,E=M.length;v<E;++v){const P=M[v],I=P.start,O=P.count;for(let F=I,L=I+O;F<L;F+=3)R(t.getX(F+0)),R(t.getX(F+1)),R(t.getX(F+2))}this._transformed=!0}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new Ce(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const i=new A,r=new A,a=new A,o=new A,l=new A,c=new A,h=new A,u=new A;if(t)for(let f=0,d=t.count;f<d;f+=3){const p=t.getX(f+0),x=t.getX(f+1),g=t.getX(f+2);i.fromBufferAttribute(e,p),r.fromBufferAttribute(e,x),a.fromBufferAttribute(e,g),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),o.fromBufferAttribute(n,p),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,g),o.add(h),l.add(h),c.add(h),n.setXYZ(p,o.x,o.y,o.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let f=0,d=e.count;f<d;f+=3)i.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),a.fromBufferAttribute(e,f+2),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ve.fromBufferAttribute(t,e),Ve.normalize(),t.setXYZ(e,Ve.x,Ve.y,Ve.z)}toNonIndexed(){function t(o,l){const c=o.array,h=o.itemSize,u=o.normalized,f=new c.constructor(l.length*h);let d=0,p=0;for(let x=0,g=l.length;x<g;x++){o.isInterleavedBufferAttribute?d=l[x]*o.data.stride+o.offset:d=l[x]*h;for(let m=0;m<h;m++)f[p++]=c[d++]}return new Ce(f,h,u)}if(this.index===null)return Tt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Qt,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],c=t(l,n);e.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){const f=c[h],d=t(f,n);l.push(d)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const i={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){const d=c[u];h.push(d.toJSON(t.data))}h.length>0&&(i[l]=h,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const i=t.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],u=r[c];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class _d{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=ud,this.updateRanges=[],this.version=0,this.uuid=mn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,r=this.stride;i<r;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=mn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=mn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));const e={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return e.usage=this.usage,e}}const Je=new A;class xr{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Je.fromBufferAttribute(this,e),Je.applyMatrix4(t),this.setXYZ(e,Je.x,Je.y,Je.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Je.fromBufferAttribute(this,e),Je.applyNormalMatrix(t),this.setXYZ(e,Je.x,Je.y,Je.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Je.fromBufferAttribute(this,e),Je.transformDirection(t),this.setXYZ(e,Je.x,Je.y,Je.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=yn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=oe(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=oe(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=oe(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=oe(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=oe(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=yn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=yn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=yn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=yn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=oe(e,this.array),n=oe(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=oe(e,this.array),n=oe(n,this.array),i=oe(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=oe(e,this.array),n=oe(n,this.array),i=oe(i,this.array),r=oe(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=r,this}clone(t){if(t===void 0){Na("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return new Ce(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new xr(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){Na("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const vo=new A,Zp=new A,Jp=new Nt;class Zn{constructor(t=new A(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=vo.subVectors(n,e).cross(Zp.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){const i=t.delta(vo),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const a=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(i,a)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Jp.getNormalMatrix(t),i=this.coplanarPoint(vo).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}}let $p=0;class nn extends ei{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:$p++}),this.uuid=mn(),this.name="",this.type="Material",this.blending=Qs,this.side=mi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=qu,this.blendDst=Ku,this.blendEquation=rs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new St(0,0,0),this.blendAlpha=0,this.depthFunc=hr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=sp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=to,this.stencilZFail=to,this.stencilZPass=to,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){Tt(`Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){Tt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector2&&n&&n.isVector2||i&&i.isEuler&&n&&n.isEuler||i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=i(t.textures),a=i(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new St().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new Zn().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new it().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new it().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class xd extends nn{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new St(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Zi;const Ds=new A,Ji=new A,$i=new A,ji=new it,Ns=new it,vd=new Dt,Hr=new A,Us=new A,Vr=new A,$c=new it,yo=new it,jc=new it;class jp extends xe{constructor(t=new xd){if(super(),this.isSprite=!0,this.type="Sprite",Zi===void 0){Zi=new Qt;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new _d(e,5);Zi.setIndex([0,1,2,0,2,3]),Zi.setAttribute("position",new xr(n,3,0,!1)),Zi.setAttribute("uv",new xr(n,2,3,!1))}this.geometry=Zi,this.material=t,this.center=new it(.5,.5),this.count=1}intersectsFrustum(t){return t.intersectsSprite(this)}raycast(t,e){t.camera===null&&Lt('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ji.setFromMatrixScale(this.matrixWorld),vd.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),$i.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ji.multiplyScalar(-$i.z);const n=this.material.rotation;let i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));const a=this.center;Gr(Hr.set(-.5,-.5,0),$i,a,Ji,i,r),Gr(Us.set(.5,-.5,0),$i,a,Ji,i,r),Gr(Vr.set(.5,.5,0),$i,a,Ji,i,r),$c.set(0,0),yo.set(1,0),jc.set(1,1);let o=t.ray.intersectTriangle(Hr,Us,Vr,!1,Ds);if(o===null&&(Gr(Us.set(-.5,.5,0),$i,a,Ji,i,r),yo.set(0,1),o=t.ray.intersectTriangle(Hr,Vr,Us,!1,Ds),o===null))return;const l=t.ray.origin.distanceTo(Ds);l<t.near||l>t.far||e.push({distance:l,point:Ds.clone(),uv:dn.getInterpolation(Ds,Hr,Us,Vr,$c,yo,jc,new it),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function Gr(s,t,e,n,i,r){ji.subVectors(s,e).addScalar(.5).multiply(n),i!==void 0?(Ns.x=r*ji.x-i*ji.y,Ns.y=i*ji.x+r*ji.y):Ns.copy(ji),s.copy(t),s.x+=Ns.x,s.y+=Ns.y,s.applyMatrix4(vd)}const Yn=new A,Mo=new A,Wr=new A,Xr=new A;class Ss{constructor(t=new A,e=new A(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Yn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Yn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Yn.copy(this.origin).addScaledVector(this.direction,e),Yn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Mo.copy(t).add(e).multiplyScalar(.5),Wr.copy(e).sub(t).normalize(),Xr.copy(this.origin).sub(Mo);const r=t.distanceTo(e)*.5,a=-this.direction.dot(Wr),o=Xr.dot(this.direction),l=-Xr.dot(Wr),c=Xr.lengthSq(),h=Math.abs(1-a*a);let u,f,d,p;if(h>0)if(u=a*l-o,f=a*o-l,p=r*h,u>=0)if(f>=-p)if(f<=p){const x=1/h;u*=x,f*=x,d=u*(u+a*f+2*o)+f*(a*u+f+2*l)+c}else f=r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*l)+c;else f=-r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*l)+c;else f<=-p?(u=Math.max(0,-(-a*r+o)),f=u>0?-r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c):f<=p?(u=0,f=Math.min(Math.max(-r,-l),r),d=f*(f+2*l)+c):(u=Math.max(0,-(a*r+o)),f=u>0?r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c);else f=a>0?-r:r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Mo).addScaledVector(Wr,f),d}intersectSphere(t,e){if(t.radius<0)return null;Yn.subVectors(t.center,this.origin);const n=Yn.dot(this.direction),i=Yn.dot(Yn)-n*n,r=t.radius*t.radius;if(i>r)return null;const a=Math.sqrt(r-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(n=(t.min.x-f.x)*c,i=(t.max.x-f.x)*c):(n=(t.max.x-f.x)*c,i=(t.min.x-f.x)*c),h>=0?(r=(t.min.y-f.y)*h,a=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,a=(t.min.y-f.y)*h),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),u>=0?(o=(t.min.z-f.z)*u,l=(t.max.z-f.z)*u):(o=(t.max.z-f.z)*u,l=(t.min.z-f.z)*u),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Yn)!==null}intersectTriangle(t,e,n,i,r){const a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,u=t.x-a.x,f=t.y-a.y,d=t.z-a.z,p=e.x-a.x,x=e.y-a.y,g=e.z-a.z,m=n.x-a.x,M=n.y-a.y,S=n.z-a.z,_=Math.abs(l),T=Math.abs(c),b=Math.abs(h);let R,v,E,P,I,O,F,L,k,K,Z,nt;if(_>=T&&_>=b?(E=l,O=u,k=p,nt=m,l>=0?(R=c,v=h,P=f,I=d,F=x,L=g,K=M,Z=S):(R=h,v=c,P=d,I=f,F=g,L=x,K=S,Z=M)):T>=b?(E=c,O=f,k=x,nt=M,c>=0?(R=h,v=l,P=d,I=u,F=g,L=p,K=S,Z=m):(R=l,v=h,P=u,I=d,F=p,L=g,K=m,Z=S)):(E=h,O=d,k=g,nt=S,h>=0?(R=l,v=c,P=u,I=f,F=p,L=x,K=m,Z=M):(R=c,v=l,P=f,I=u,F=x,L=p,K=M,Z=m)),E===0)return null;const X=R/E,Q=v/E,et=1/E,Pt=P-X*O,Rt=I-Q*O,pe=F-X*k,Jt=L-Q*k,ee=K-X*nt,Y=Z-Q*nt,j=ee*Jt-Y*pe,xt=Pt*Y-Rt*ee,Ut=pe*Rt-Jt*Pt;if(i){if(j<0||xt<0||Ut<0)return null}else if((j<0||xt<0||Ut<0)&&(j>0||xt>0||Ut>0))return null;const gt=j+xt+Ut;if(gt===0)return null;const Vt=et*(j*O+xt*k+Ut*nt);return(gt>0?Vt<0:Vt>0)?null:this.at(Vt/gt,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ue extends nn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new St(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Sn,this.combine=Gl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Qc=new Dt,yi=new Ss,Yr=new zn,th=new A,qr=new A,Kr=new A,Zr=new A,So=new A,Jr=new A,eh=new A,$r=new A;class te extends xe{constructor(t=new Qt,e=new Ue){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const o=this.morphTargetInfluences;if(r&&o){Jr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],u=r[l];h!==0&&(So.fromBufferAttribute(u,t),a?Jr.addScaledVector(So,h):Jr.addScaledVector(So.sub(e),h))}e.add(Jr)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Yr.copy(n.boundingSphere),Yr.applyMatrix4(r),yi.copy(t.ray).recast(t.near),!(Yr.containsPoint(yi.origin)===!1&&(yi.intersectSphere(Yr,th)===null||yi.origin.distanceToSquared(th)>(t.far-t.near)**2))&&(Qc.copy(r).invert(),yi.copy(t.ray).applyMatrix4(Qc),!(n.boundingBox!==null&&yi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,yi)))}_computeIntersections(t,e,n){let i;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,x=f.length;p<x;p++){const g=f[p],m=a[g.materialIndex],M=Math.max(g.start,d.start),S=Math.min(o.count,Math.min(g.start+g.count,d.start+d.count));for(let _=M,T=S;_<T;_+=3){const b=o.getX(_),R=o.getX(_+1),v=o.getX(_+2);i=jr(this,m,t,n,c,h,u,b,R,v),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=g.materialIndex,e.push(i))}}else{const p=Math.max(0,d.start),x=Math.min(o.count,d.start+d.count);for(let g=p,m=x;g<m;g+=3){const M=o.getX(g),S=o.getX(g+1),_=o.getX(g+2);i=jr(this,a,t,n,c,h,u,M,S,_),i&&(i.faceIndex=Math.floor(g/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let p=0,x=f.length;p<x;p++){const g=f[p],m=a[g.materialIndex],M=Math.max(g.start,d.start),S=Math.min(l.count,Math.min(g.start+g.count,d.start+d.count));for(let _=M,T=S;_<T;_+=3){const b=_,R=_+1,v=_+2;i=jr(this,m,t,n,c,h,u,b,R,v),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=g.materialIndex,e.push(i))}}else{const p=Math.max(0,d.start),x=Math.min(l.count,d.start+d.count);for(let g=p,m=x;g<m;g+=3){const M=g,S=g+1,_=g+2;i=jr(this,a,t,n,c,h,u,M,S,_),i&&(i.faceIndex=Math.floor(g/3),e.push(i))}}}}function Qp(s,t,e,n,i,r,a,o){let l;if(t.side===Ke?l=n.intersectTriangle(a,r,i,!0,o):l=n.intersectTriangle(i,r,a,t.side===mi,o),l===null)return null;$r.copy(o),$r.applyMatrix4(s.matrixWorld);const c=e.ray.origin.distanceTo($r);return c<e.near||c>e.far?null:{distance:c,point:$r.clone(),object:s}}function jr(s,t,e,n,i,r,a,o,l,c){s.getVertexPosition(o,qr),s.getVertexPosition(l,Kr),s.getVertexPosition(c,Zr);const h=Qp(s,t,e,n,qr,Kr,Zr,eh);if(h){const u=new A;dn.getBarycoord(eh,qr,Kr,Zr,u),i&&(h.uv=dn.getInterpolatedAttribute(i,o,l,c,u,new it)),r&&(h.uv1=dn.getInterpolatedAttribute(r,o,l,c,u,new it)),a&&(h.normal=dn.getInterpolatedAttribute(a,o,l,c,u,new A),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new A,materialIndex:0};dn.getNormal(qr,Kr,Zr,f.normal),h.face=f,h.barycoord=u}return h}const Os=new ue,nh=new ue,ih=new ue,tm=new ue,sh=new Dt,Qr=new A,bo=new zn,rh=new Dt,wo=new Ss;class em extends te{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Nc,this.bindMatrix=new Dt,this.bindMatrixInverse=new Dt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const t=this.geometry;this.boundingBox===null&&(this.boundingBox=new bn),this.boundingBox.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Qr),this.boundingBox.expandByPoint(Qr)}computeBoundingSphere(){const t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new zn),this.boundingSphere.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Qr),this.boundingSphere.expandByPoint(Qr)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}raycast(t,e){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),bo.copy(this.boundingSphere),bo.applyMatrix4(i),t.ray.intersectsSphere(bo)!==!1&&(rh.copy(i).invert(),wo.copy(t.ray).applyMatrix4(rh),!(this.boundingBox!==null&&wo.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(t,e,wo)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const t=new ue,e=this.geometry.attributes.skinWeight;for(let n=0,i=e.count;n<i;n++){t.fromBufferAttribute(e,n);const r=1/t.manhattanLength();r!==1/0?t.multiplyScalar(r):t.set(1,0,0,0),e.setXYZW(n,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode===Nc?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===$f?this.bindMatrixInverse.copy(this.bindMatrix).invert():Tt("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){const n=this.skeleton,i=this.geometry;nh.fromBufferAttribute(i.attributes.skinIndex,t),ih.fromBufferAttribute(i.attributes.skinWeight,t),e.isVector4?(Os.copy(e),e.set(0,0,0,0)):(Os.set(...e,1),e.set(0,0,0)),Os.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){const a=ih.getComponent(r);if(a!==0){const o=nh.getComponent(r);sh.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),e.addScaledVector(tm.copy(Os).applyMatrix4(sh),a)}}return e.isVector4&&(e.w=Os.w),e.applyMatrix4(this.bindMatrixInverse)}}class yd extends xe{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Ha extends Ee{constructor(t=null,e=1,n=1,i,r,a,o,l,c=Ne,h=Ne,u,f){super(null,a,o,l,c,h,i,r,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const ah=new Dt,nm=new Dt;class ic{constructor(t=[],e=[]){this.uuid=mn(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){Tt("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Dt)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){const n=new Dt;this.bones[t]&&n.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&n.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const t=this.bones,e=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,a=t.length;r<a;r++){const o=t[r]?t[r].matrixWorld:nm;ah.multiplyMatrices(o,e[r]),ah.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new ic(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);const e=new Float32Array(t*t*4);e.set(this.boneMatrices);const n=new Ha(e,t,t,pn,fn);return n.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=n,this}getBoneByName(t){for(let e=0,n=this.bones.length;e<n;e++){const i=this.bones[e];if(i.name===t)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,e){this.uuid=t.uuid;for(let n=0,i=t.bones.length;n<i;n++){const r=t.bones[n];let a=e[r];a===void 0&&(Tt("Skeleton: No bone found with UUID:",r),a=new yd),this.bones.push(a),this.boneInverses.push(new Dt().fromArray(t.boneInverses[n]))}return this.init(),this}toJSON(){const t={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;const e=this.bones,n=this.boneInverses;for(let i=0,r=e.length;i<r;i++){const a=e[i];t.bones.push(a.uuid);const o=n[i];t.boneInverses.push(o.toArray())}return t}}class Ua extends Ce{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Qi=new Dt,oh=new Dt,ta=[],lh=new bn,im=new Dt,Fs=new te,Bs=new zn;class Md extends te{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Ua(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,im)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new bn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Qi),lh.copy(t.boundingBox).applyMatrix4(Qi),this.boundingBox.union(lh)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new zn),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Qi),Bs.copy(t.boundingSphere).applyMatrix4(Qi),this.boundingSphere.union(Bs)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(t,e){const n=this.matrixWorld,i=this.count;if(Fs.geometry=this.geometry,Fs.material=this.material,Fs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Bs.copy(this.boundingSphere),Bs.applyMatrix4(n),t.ray.intersectsSphere(Bs)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,Qi),oh.multiplyMatrices(n,Qi),Fs.matrixWorld=oh,Fs.raycast(t,ta);for(let a=0,o=ta.length;a<o;a++){const l=ta[a];l.instanceId=r,l.object=this,e.push(l)}ta.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new Ua(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){const n=e.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Ha(new Float32Array(i*this.count),i,this.count,za,fn));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=i*t;return r[l]=o,r.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Mi=new zn,sm=new it(.5,.5),ea=new A;class sc{constructor(t=new Zn,e=new Zn,n=new Zn,i=new Zn,r=new Zn,a=new Zn){this.planes=[t,e,n,i,r,a]}set(t,e,n,i,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Nn,n=!1){const i=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],u=r[5],f=r[6],d=r[7],p=r[8],x=r[9],g=r[10],m=r[11],M=r[12],S=r[13],_=r[14],T=r[15];if(i[0].setComponents(c-a,d-h,m-p,T-M).normalize(),i[1].setComponents(c+a,d+h,m+p,T+M).normalize(),i[2].setComponents(c+o,d+u,m+x,T+S).normalize(),i[3].setComponents(c-o,d-u,m-x,T-S).normalize(),n)i[4].setComponents(l,f,g,_).normalize(),i[5].setComponents(c-l,d-f,m-g,T-_).normalize();else if(i[4].setComponents(c-l,d-f,m-g,T-_).normalize(),e===Nn)i[5].setComponents(c+l,d+f,m+g,T+_).normalize();else if(e===gr)i[5].setComponents(l,f,g,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Mi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Mi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Mi)}intersectsSprite(t){Mi.center.set(0,0,0);const e=sm.distanceTo(t.center);return Mi.radius=.7071067811865476+e,Mi.applyMatrix4(t.matrixWorld),this.intersectsSphere(Mi)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(ea.x=i.normal.x>0?t.max.x:t.min.x,ea.y=i.normal.y>0?t.max.y:t.min.y,ea.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(ea)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class vr extends nn{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new St(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Oa=new A,Fa=new A,ch=new Dt,ks=new Ss,na=new zn,To=new A,hh=new A;class Cr extends xe{constructor(t=new Qt,e=new vr){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let i=1,r=e.count;i<r;i++)Oa.fromBufferAttribute(e,i-1),Fa.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=Oa.distanceTo(Fa);t.setAttribute("lineDistance",new Ht(n,1))}else Tt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),na.copy(n.boundingSphere),na.applyMatrix4(i),na.radius+=r,t.ray.intersectsSphere(na)===!1)return;ch.copy(i).invert(),ks.copy(t.ray).applyMatrix4(ch);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){const d=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);for(let x=d,g=p-1;x<g;x+=c){const m=h.getX(x),M=h.getX(x+1),S=ia(this,t,ks,l,m,M,x);S&&e.push(S)}if(this.isLineLoop){const x=h.getX(p-1),g=h.getX(d),m=ia(this,t,ks,l,x,g,p-1);m&&e.push(m)}}else{const d=Math.max(0,a.start),p=Math.min(f.count,a.start+a.count);for(let x=d,g=p-1;x<g;x+=c){const m=ia(this,t,ks,l,x,x+1,x);m&&e.push(m)}if(this.isLineLoop){const x=ia(this,t,ks,l,p-1,d,p-1);x&&e.push(x)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function ia(s,t,e,n,i,r,a){const o=s.geometry.attributes.position;if(Oa.fromBufferAttribute(o,i),Fa.fromBufferAttribute(o,r),e.distanceSqToSegment(Oa,Fa,To,hh)>n)return;To.applyMatrix4(s.matrixWorld);const c=t.ray.origin.distanceTo(To);if(!(c<t.near||c>t.far))return{distance:c,point:hh.clone().applyMatrix4(s.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:s}}const uh=new A,dh=new A;class Sd extends Cr{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let i=0,r=e.count;i<r;i+=2)uh.fromBufferAttribute(e,i),dh.fromBufferAttribute(e,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+uh.distanceTo(dh);t.setAttribute("lineDistance",new Ht(n,1))}else Tt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class rm extends Cr{constructor(t,e){super(t,e),this.isLineLoop=!0,this.type="LineLoop"}}class ps extends nn{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new St(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const fh=new Dt,Ll=new Ss,sa=new zn,ra=new A;class rc extends xe{constructor(t=new Qt,e=new ps){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),sa.copy(n.boundingSphere),sa.applyMatrix4(i),sa.radius+=r,t.ray.intersectsSphere(sa)===!1)return;fh.copy(i).invert(),Ll.copy(t.ray).applyMatrix4(fh);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,u=n.attributes.position;if(c!==null){const f=Math.max(0,a.start),d=Math.min(c.count,a.start+a.count);for(let p=f,x=d;p<x;p++){const g=c.getX(p);ra.fromBufferAttribute(u,g),ph(ra,g,l,i,t,e,this)}}else{const f=Math.max(0,a.start),d=Math.min(u.count,a.start+a.count);for(let p=f,x=d;p<x;p++)ra.fromBufferAttribute(u,p),ph(ra,p,l,i,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function ph(s,t,e,n,i,r,a){const o=Ll.distanceSqToPoint(s);if(o<e){const l=new A;Ll.closestPointToPoint(s,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class bd extends Ee{constructor(t=[],e=Ci,n,i,r,a,o,l,c,h){super(t,e,n,i,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class bs extends Ee{constructor(t,e,n,i,r,a,o,l,c){super(t,e,n,i,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class yr extends Ee{constructor(t,e,n=Fn,i,r,a,o=Ne,l=Ne,c,h=ti,u=1){if(h!==ti&&h!==Ri)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:t,height:e,depth:u};super(f,i,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new ec(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}}class am extends yr{constructor(t,e=Fn,n=Ci,i,r,a=Ne,o=Ne,l,c=ti){const h={width:t,height:t,depth:1},u=[h,h,h,h,h,h];super(t,t,e,n,i,r,a,o,l,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class wd extends Ee{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Ui extends Qt{constructor(t=1,e=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};const o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],u=[];let f=0,d=0;p("z","y","x",-1,-1,n,e,t,a,r,0),p("z","y","x",1,-1,n,e,-t,a,r,1),p("x","z","y",1,1,t,n,e,i,a,2),p("x","z","y",1,-1,t,n,-e,i,a,3),p("x","y","z",1,-1,t,e,n,i,r,4),p("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new Ht(c,3)),this.setAttribute("normal",new Ht(h,3)),this.setAttribute("uv",new Ht(u,2));function p(x,g,m,M,S,_,T,b,R,v,E){const P=_/R,I=T/v,O=_/2,F=T/2,L=b/2,k=R+1,K=v+1;let Z=0,nt=0;const X=new A;for(let Q=0;Q<K;Q++){const et=Q*I-F;for(let Pt=0;Pt<k;Pt++){const Rt=Pt*P-O;X[x]=Rt*M,X[g]=et*S,X[m]=L,c.push(X.x,X.y,X.z),X[x]=0,X[g]=0,X[m]=b>0?1:-1,h.push(X.x,X.y,X.z),u.push(Pt/R),u.push(1-Q/v),Z+=1}}for(let Q=0;Q<v;Q++)for(let et=0;et<R;et++){const Pt=f+et+k*Q,Rt=f+et+k*(Q+1),pe=f+(et+1)+k*(Q+1),Jt=f+(et+1)+k*Q;l.push(Pt,Rt,Jt),l.push(Rt,pe,Jt),nt+=6}o.addGroup(d,nt,E),d+=nt,f+=Z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ui(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class nr extends Qt{constructor(t=1,e=1,n=4,i=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:t,height:e,capSegments:n,radialSegments:i,heightSegments:r},e=Math.max(0,e),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),r=Math.max(1,Math.floor(r));const a=[],o=[],l=[],c=[],h=e/2,u=Math.PI/2*t,f=e,d=2*u+f,p=n*2+r,x=i+1,g=new A,m=new A;for(let M=0;M<=p;M++){let S=0,_=0,T=0,b=0;if(M<=n){const E=M/n,P=E*Math.PI/2;_=-h-t*Math.cos(P),T=t*Math.sin(P),b=-t*Math.cos(P),S=E*u}else if(M<=n+r){const E=(M-n)/r;_=-h+E*e,T=t,b=0,S=u+E*f}else{const E=(M-n-r)/n,P=E*Math.PI/2;_=h+t*Math.sin(P),T=t*Math.cos(P),b=t*Math.sin(P),S=u+f+E*u}const R=Math.max(0,Math.min(1,S/d));let v=0;M===0?v=.5/i:M===p&&(v=-.5/i);for(let E=0;E<=i;E++){const P=E/i,I=P*Math.PI*2,O=Math.sin(I),F=Math.cos(I);m.x=-T*F,m.y=_,m.z=T*O,o.push(m.x,m.y,m.z),g.set(-T*F,b,T*O),g.normalize(),l.push(g.x,g.y,g.z),c.push(P+v,R)}if(M>0){const E=(M-1)*x;for(let P=0;P<i;P++){const I=E+P,O=E+P+1,F=M*x+P,L=M*x+P+1;a.push(I,O,F),a.push(O,L,F)}}}this.setIndex(a),this.setAttribute("position",new Ht(o,3)),this.setAttribute("normal",new Ht(l,3)),this.setAttribute("uv",new Ht(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new nr(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}}class Pr extends Qt{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const r=[],a=[],o=[],l=[],c=new A,h=new it;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,f=3;u<=e;u++,f+=3){const d=n+u/e*i;c.x=t*Math.cos(d),c.y=t*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[f]/t+1)/2,h.y=(a[f+1]/t+1)/2,l.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new Ht(a,3)),this.setAttribute("normal",new Ht(o,3)),this.setAttribute("uv",new Ht(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Pr(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Li extends Qt{constructor(t=1,e=1,n=1,i=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;i=Math.floor(i),r=Math.floor(r);const h=[],u=[],f=[],d=[];let p=0;const x=[],g=n/2;let m=0;M(),a===!1&&(t>0&&S(!0),e>0&&S(!1)),this.setIndex(h),this.setAttribute("position",new Ht(u,3)),this.setAttribute("normal",new Ht(f,3)),this.setAttribute("uv",new Ht(d,2));function M(){const _=new A,T=new A;let b=0;const R=(e-t)/n;for(let v=0;v<=r;v++){const E=[],P=v/r,I=P*(e-t)+t;for(let O=0;O<=i;O++){const F=O/i,L=F*l+o,k=Math.sin(L),K=Math.cos(L);T.x=I*k,T.y=-P*n+g,T.z=I*K,u.push(T.x,T.y,T.z),_.set(k,R,K).normalize(),f.push(_.x,_.y,_.z),d.push(F,1-P),E.push(p++)}x.push(E)}for(let v=0;v<i;v++)for(let E=0;E<r;E++){const P=x[E][v],I=x[E+1][v],O=x[E+1][v+1],F=x[E][v+1];(t>0||E!==0)&&(h.push(P,I,F),b+=3),(e>0||E!==r-1)&&(h.push(I,O,F),b+=3)}c.addGroup(m,b,0),m+=b}function S(_){const T=p,b=new it,R=new A;let v=0;const E=_===!0?t:e,P=_===!0?1:-1;for(let O=1;O<=i;O++)u.push(0,g*P,0),f.push(0,P,0),d.push(.5,.5),p++;const I=p;for(let O=0;O<=i;O++){const L=O/i*l+o,k=Math.cos(L),K=Math.sin(L);R.x=E*K,R.y=g*P,R.z=E*k,u.push(R.x,R.y,R.z),f.push(0,P,0),b.x=k*.5+.5,b.y=K*.5*P+.5,d.push(b.x,b.y),p++}for(let O=0;O<i;O++){const F=T+O,L=I+O;_===!0?h.push(L,L+1,F):h.push(L+1,L,F),v+=3}c.addGroup(m,v,_===!0?1:2),m+=v}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Li(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ms extends Li{constructor(t=1,e=1,n=32,i=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,i,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new ms(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ac extends Qt{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};const r=[],a=[];o(i),c(n),h(),this.setAttribute("position",new Ht(r,3)),this.setAttribute("normal",new Ht(r.slice(),3)),this.setAttribute("uv",new Ht(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(M){const S=new A,_=new A,T=new A;for(let b=0;b<e.length;b+=3)d(e[b+0],S),d(e[b+1],_),d(e[b+2],T),l(S,_,T,M)}function l(M,S,_,T){const b=T+1,R=[];for(let v=0;v<=b;v++){R[v]=[];const E=M.clone().lerp(_,v/b),P=S.clone().lerp(_,v/b),I=b-v;for(let O=0;O<=I;O++)O===0&&v===b?R[v][O]=E:R[v][O]=E.clone().lerp(P,O/I)}for(let v=0;v<b;v++)for(let E=0;E<2*(b-v)-1;E++){const P=Math.floor(E/2);E%2===0?(f(R[v][P+1]),f(R[v+1][P]),f(R[v][P])):(f(R[v][P+1]),f(R[v+1][P+1]),f(R[v+1][P]))}}function c(M){const S=new A;for(let _=0;_<r.length;_+=3)S.x=r[_+0],S.y=r[_+1],S.z=r[_+2],S.normalize().multiplyScalar(M),r[_+0]=S.x,r[_+1]=S.y,r[_+2]=S.z}function h(){const M=new A;for(let S=0;S<r.length;S+=3){M.x=r[S+0],M.y=r[S+1],M.z=r[S+2];const _=g(M)/2/Math.PI+.5,T=m(M)/Math.PI+.5;a.push(_,1-T)}p(),u()}function u(){for(let M=0;M<a.length;M+=6){const S=a[M+0],_=a[M+2],T=a[M+4],b=Math.max(S,_,T),R=Math.min(S,_,T);b>.9&&R<.1&&(S<.2&&(a[M+0]+=1),_<.2&&(a[M+2]+=1),T<.2&&(a[M+4]+=1))}}function f(M){r.push(M.x,M.y,M.z)}function d(M,S){const _=M*3;S.x=t[_+0],S.y=t[_+1],S.z=t[_+2]}function p(){const M=new A,S=new A,_=new A,T=new A,b=new it,R=new it,v=new it;for(let E=0,P=0;E<r.length;E+=9,P+=6){M.set(r[E+0],r[E+1],r[E+2]),S.set(r[E+3],r[E+4],r[E+5]),_.set(r[E+6],r[E+7],r[E+8]),b.set(a[P+0],a[P+1]),R.set(a[P+2],a[P+3]),v.set(a[P+4],a[P+5]),T.copy(M).add(S).add(_).divideScalar(3);const I=g(T);x(b,P+0,M,I),x(R,P+2,S,I),x(v,P+4,_,I)}}function x(M,S,_,T){T<0&&M.x===1&&(a[S]=M.x-1),_.x===0&&_.z===0&&(a[S]=T/2/Math.PI+.5)}function g(M){return Math.atan2(M.z,-M.x)}function m(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ac(t.vertices,t.indices,t.radius,t.detail)}}class Hn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Tt("Curve: .getPoint() not implemented.")}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const n=this.getLengths();let i=0;const r=n.length;let a;e?a=e:a=t*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-a,c<0)o=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===a)return i/(r-1);const h=n[i],f=n[i+1]-h,d=(a-h)/f;return(i+d)/(r-1)}getTangent(t,e){let i=t-1e-4,r=t+1e-4;i<0&&(i=0),r>1&&(r=1);const a=this.getPoint(i),o=this.getPoint(r),l=e||(a.isVector2?new it:new A);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){const n=new A,i=[],r=[],a=[],o=new A,l=new Dt;for(let d=0;d<=t;d++){const p=d/t;i[d]=this.getTangentAt(p,new A)}r[0]=new A,a[0]=new A;let c=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),f=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),f<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],o),a[0].crossVectors(i[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(i[d-1],i[d]),o.length()>Number.EPSILON){o.normalize();const p=Math.acos(Ft(i[d-1].dot(i[d]),-1,1));r[d].applyMatrix4(l.makeRotationAxis(o,p))}a[d].crossVectors(i[d],r[d])}if(e===!0){let d=Math.acos(Ft(r[0].dot(r[t]),-1,1));d/=t,i[0].dot(o.crossVectors(r[0],r[t]))>0&&(d=-d);for(let p=1;p<=t;p++)r[p].applyMatrix4(l.makeRotationAxis(i[p],d*p)),a[p].crossVectors(i[p],r[p])}return{tangents:i,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class oc extends Hn{constructor(t=0,e=0,n=1,i=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new it){const n=e,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(a?r=0:r=i),this.aClockwise===!0&&!a&&(r===i?r=-i:r=r-i);const o=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=l-this.aX,d=c-this.aY;l=f*h-d*u+this.aX,c=f*u+d*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class om extends oc{constructor(t,e,n,i,r,a){super(t,e,n,n,i,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function lc(){let s=0,t=0,e=0,n=0;function i(r,a,o,l){s=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){i(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,u){let f=(a-r)/c-(o-r)/(c+h)+(o-a)/h,d=(o-a)/h-(l-a)/(h+u)+(l-o)/u;f*=h,d*=h,i(a,o,f,d)},calc:function(r){const a=r*r,o=a*r;return s+t*r+e*a+n*o}}}const mh=new A,gh=new A,Eo=new lc,Ao=new lc,Ro=new lc;class lm extends Hn{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new A){const n=e,i=this.points,r=i.length,a=(r-(this.closed?0:1))*t;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=i[(o-1)%r]:(gh.subVectors(i[0],i[1]).add(i[0]),c=gh);const u=i[o%r],f=i[(o+1)%r];if(this.closed||o+2<r?h=i[(o+2)%r]:(mh.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=mh),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let p=Math.pow(c.distanceToSquared(u),d),x=Math.pow(u.distanceToSquared(f),d),g=Math.pow(f.distanceToSquared(h),d);x<1e-4&&(x=1),p<1e-4&&(p=x),g<1e-4&&(g=x),Eo.initNonuniformCatmullRom(c.x,u.x,f.x,h.x,p,x,g),Ao.initNonuniformCatmullRom(c.y,u.y,f.y,h.y,p,x,g),Ro.initNonuniformCatmullRom(c.z,u.z,f.z,h.z,p,x,g)}else this.curveType==="catmullrom"&&(Eo.initCatmullRom(c.x,u.x,f.x,h.x,this.tension),Ao.initCatmullRom(c.y,u.y,f.y,h.y,this.tension),Ro.initCatmullRom(c.z,u.z,f.z,h.z,this.tension));return n.set(Eo.calc(l),Ao.calc(l),Ro.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new A().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function _h(s,t,e,n,i){const r=(n-t)*.5,a=(i-e)*.5,o=s*s,l=s*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*s+e}function cm(s,t){const e=1-s;return e*e*t}function hm(s,t){return 2*(1-s)*s*t}function um(s,t){return s*s*t}function ir(s,t,e,n){return cm(s,t)+hm(s,e)+um(s,n)}function dm(s,t){const e=1-s;return e*e*e*t}function fm(s,t){const e=1-s;return 3*e*e*s*t}function pm(s,t){return 3*(1-s)*s*s*t}function mm(s,t){return s*s*s*t}function sr(s,t,e,n,i){return dm(s,t)+fm(s,e)+pm(s,n)+mm(s,i)}class Td extends Hn{constructor(t=new it,e=new it,n=new it,i=new it){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new it){const n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(sr(t,i.x,r.x,a.x,o.x),sr(t,i.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class gm extends Hn{constructor(t=new A,e=new A,n=new A,i=new A){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new A){const n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(sr(t,i.x,r.x,a.x,o.x),sr(t,i.y,r.y,a.y,o.y),sr(t,i.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Ed extends Hn{constructor(t=new it,e=new it){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new it){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new it){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class _m extends Hn{constructor(t=new A,e=new A){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new A){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new A){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Ad extends Hn{constructor(t=new it,e=new it,n=new it){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new it){const n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(ir(t,i.x,r.x,a.x),ir(t,i.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class xm extends Hn{constructor(t=new A,e=new A,n=new A){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new A){const n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(ir(t,i.x,r.x,a.x),ir(t,i.y,r.y,a.y),ir(t,i.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Rd extends Hn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new it){const n=e,i=this.points,r=(i.length-1)*t,a=Math.floor(r),o=r-a,l=i[a===0?a:a-1],c=i[a],h=i[a>i.length-2?i.length-1:a+1],u=i[a>i.length-3?i.length-1:a+2];return n.set(_h(o,l.x,c.x,h.x,u.x),_h(o,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new it().fromArray(i))}return this}}var xh=Object.freeze({__proto__:null,ArcCurve:om,CatmullRomCurve3:lm,CubicBezierCurve:Td,CubicBezierCurve3:gm,EllipseCurve:oc,LineCurve:Ed,LineCurve3:_m,QuadraticBezierCurve:Ad,QuadraticBezierCurve3:xm,SplineCurve:Rd});class vm extends Hn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new xh[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),i=this.getCurveLengths();let r=0;for(;r<i.length;){if(i[r]>=n){const a=i[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let i=0,r=this.curves;i<r.length;i++){const a=r[i],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(new xh[i.type]().fromJSON(i))}return this}}class vh extends vm{constructor(t){super(),this.type="Path",this.currentPoint=new it,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Ed(this.currentPoint.clone(),new it(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){const r=new Ad(this.currentPoint.clone(),new it(t,e),new it(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,r,a){const o=new Td(this.currentPoint.clone(),new it(t,e),new it(n,i),new it(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Rd(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,r,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,i,r,a),this}absarc(t,e,n,i,r,a){return this.absellipse(t,e,n,n,i,r,a),this}ellipse(t,e,n,i,r,a,o,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,i,r,a,o,l),this}absellipse(t,e,n,i,r,a,o,l){const c=new oc(t,e,n,i,r,a,o,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Cd extends vh{constructor(t){super(t),this.uuid=mn(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(new vh().fromJSON(i))}return this}}function ym(s,t,e=2){const n=t&&t.length,i=n?t[0]*e:s.length;let r=Pd(s,0,i,e,!0);const a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(n&&(r=Tm(s,t,r,e)),s.length>80*e){o=s[0],l=s[1];let h=o,u=l;for(let f=e;f<i;f+=e){const d=s[f],p=s[f+1];d<o&&(o=d),p<l&&(l=p),d>h&&(h=d),p>u&&(u=p)}c=Math.max(h-o,u-l),c=c!==0?32767/c:0}return Mr(r,a,e,o,l,c,0),a}function Pd(s,t,e,n,i){let r;if(i===Om(s,t,e,n)>0)for(let a=t;a<e;a+=n)r=yh(a/n|0,s[a],s[a+1],r);else for(let a=e-n;a>=t;a-=n)r=yh(a/n|0,s[a],s[a+1],r);return r&&ys(r,r.next)&&(br(r),r=r.next),r}function Di(s,t){if(!s)return s;t||(t=s);let e=s,n;do if(n=!1,!e.steiner&&(ys(e,e.next)||we(e.prev,e,e.next)===0)){if(br(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Mr(s,t,e,n,i,r,a){if(!s)return;!a&&r&&Pm(s,n,i,r);let o=s;for(;s.prev!==s.next;){const l=s.prev,c=s.next;if(r?Sm(s,n,i,r):Mm(s)){t.push(l.i,s.i,c.i),br(s),s=c.next,o=c.next;continue}if(s=c,s===o){a?a===1?(s=bm(Di(s),t),Mr(s,t,e,n,i,r,2)):a===2&&wm(s,t,e,n,i,r):Mr(Di(s),t,e,n,i,r,1);break}}}function Mm(s){const t=s.prev,e=s,n=s.next;if(we(t,e,n)>=0)return!1;const i=t.x,r=e.x,a=n.x,o=t.y,l=e.y,c=n.y,h=Math.min(i,r,a),u=Math.min(o,l,c),f=Math.max(i,r,a),d=Math.max(o,l,c);let p=n.next;for(;p!==t;){if(p.x>=h&&p.x<=f&&p.y>=u&&p.y<=d&&$s(i,o,r,l,a,c,p.x,p.y)&&we(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function Sm(s,t,e,n){const i=s.prev,r=s,a=s.next;if(we(i,r,a)>=0)return!1;const o=i.x,l=r.x,c=a.x,h=i.y,u=r.y,f=a.y,d=Math.min(o,l,c),p=Math.min(h,u,f),x=Math.max(o,l,c),g=Math.max(h,u,f),m=Dl(d,p,t,e,n),M=Dl(x,g,t,e,n);let S=s.prevZ,_=s.nextZ;for(;S&&S.z>=m&&_&&_.z<=M;){if(S.x>=d&&S.x<=x&&S.y>=p&&S.y<=g&&S!==i&&S!==a&&$s(o,h,l,u,c,f,S.x,S.y)&&we(S.prev,S,S.next)>=0||(S=S.prevZ,_.x>=d&&_.x<=x&&_.y>=p&&_.y<=g&&_!==i&&_!==a&&$s(o,h,l,u,c,f,_.x,_.y)&&we(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;S&&S.z>=m;){if(S.x>=d&&S.x<=x&&S.y>=p&&S.y<=g&&S!==i&&S!==a&&$s(o,h,l,u,c,f,S.x,S.y)&&we(S.prev,S,S.next)>=0)return!1;S=S.prevZ}for(;_&&_.z<=M;){if(_.x>=d&&_.x<=x&&_.y>=p&&_.y<=g&&_!==i&&_!==a&&$s(o,h,l,u,c,f,_.x,_.y)&&we(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function bm(s,t){let e=s;do{const n=e.prev,i=e.next.next;!ys(n,i)&&Ld(n,e,e.next,i)&&Sr(n,i)&&Sr(i,n)&&(t.push(n.i,e.i,i.i),br(e),br(e.next),e=s=i),e=e.next}while(e!==s);return Di(e)}function wm(s,t,e,n,i,r){let a=s;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Dm(a,o)){let l=Dd(a,o);a=Di(a,a.next),l=Di(l,l.next),Mr(a,t,e,n,i,r,0),Mr(l,t,e,n,i,r,0);return}o=o.next}a=a.next}while(a!==s)}function Tm(s,t,e,n){const i=[];for(let r=0,a=t.length;r<a;r++){const o=t[r]*n,l=r<a-1?t[r+1]*n:s.length,c=Pd(s,o,l,n,!1);c===c.next&&(c.steiner=!0),i.push(Lm(c))}i.sort(Em);for(let r=0;r<i.length;r++)e=Am(i[r],e);return e}function Em(s,t){let e=s.x-t.x;if(e===0&&(e=s.y-t.y,e===0)){const n=(s.next.y-s.y)/(s.next.x-s.x),i=(t.next.y-t.y)/(t.next.x-t.x);e=n-i}return e}function Am(s,t){const e=Rm(s,t);if(!e)return t;const n=Dd(e,s);return Di(n,n.next),Di(e,e.next)}function Rm(s,t){let e=t;const n=s.x,i=s.y;let r=-1/0,a;if(ys(s,e))return e;do{if(ys(s,e.next))return e.next;if(i<=e.y&&i>=e.next.y&&e.next.y!==e.y){const u=e.x+(i-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(u<=n&&u>r&&(r=u,a=e.x<e.next.x?e:e.next,u===n))return a}e=e.next}while(e!==t);if(!a)return null;const o=a,l=a.x,c=a.y;let h=1/0;e=a;do{if(n>=e.x&&e.x>=l&&n!==e.x&&Id(i<c?n:r,i,l,c,i<c?r:n,i,e.x,e.y)){const u=Math.abs(i-e.y)/(n-e.x);Sr(e,s)&&(u<h||u===h&&(e.x>a.x||e.x===a.x&&Cm(a,e)))&&(a=e,h=u)}e=e.next}while(e!==o);return a}function Cm(s,t){return we(s.prev,s,t.prev)<0&&we(t.next,s,s.next)<0}function Pm(s,t,e,n){let i=s;do i.z===0&&(i.z=Dl(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,Im(i)}function Im(s){let t,e=1;do{let n=s,i;s=null;let r=null;for(t=0;n;){t++;let a=n,o=0;for(let c=0;c<e&&(o++,a=a.nextZ,!!a);c++);let l=e;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(i=n,n=n.nextZ,o--):(i=a,a=a.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;n=a}r.nextZ=null,e*=2}while(t>1);return s}function Dl(s,t,e,n,i){return s=(s-e)*i|0,t=(t-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,s|t<<1}function Lm(s){let t=s,e=s;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==s);return e}function Id(s,t,e,n,i,r,a,o){return(i-a)*(t-o)>=(s-a)*(r-o)&&(s-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(i-a)*(n-o)}function $s(s,t,e,n,i,r,a,o){return!(s===a&&t===o)&&Id(s,t,e,n,i,r,a,o)}function Dm(s,t){return s.next.i!==t.i&&s.prev.i!==t.i&&!Nm(s,t)&&(Sr(s,t)&&Sr(t,s)&&Um(s,t)&&(we(s.prev,s,t.prev)||we(s,t.prev,t))||ys(s,t)&&we(s.prev,s,s.next)>0&&we(t.prev,t,t.next)>0)}function we(s,t,e){return(t.y-s.y)*(e.x-t.x)-(t.x-s.x)*(e.y-t.y)}function ys(s,t){return s.x===t.x&&s.y===t.y}function Ld(s,t,e,n){const i=oa(we(s,t,e)),r=oa(we(s,t,n)),a=oa(we(e,n,s)),o=oa(we(e,n,t));return!!(i!==r&&a!==o||i===0&&aa(s,e,t)||r===0&&aa(s,n,t)||a===0&&aa(e,s,n)||o===0&&aa(e,t,n))}function aa(s,t,e){return t.x<=Math.max(s.x,e.x)&&t.x>=Math.min(s.x,e.x)&&t.y<=Math.max(s.y,e.y)&&t.y>=Math.min(s.y,e.y)}function oa(s){return s>0?1:s<0?-1:0}function Nm(s,t){let e=s;do{if(e.i!==s.i&&e.next.i!==s.i&&e.i!==t.i&&e.next.i!==t.i&&Ld(e,e.next,s,t))return!0;e=e.next}while(e!==s);return!1}function Sr(s,t){return we(s.prev,s,s.next)<0?we(s,t,s.next)>=0&&we(s,s.prev,t)>=0:we(s,t,s.prev)<0||we(s,s.next,t)<0}function Um(s,t){let e=s,n=!1;const i=(s.x+t.x)/2,r=(s.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&i<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==s);return n}function Dd(s,t){const e=Nl(s.i,s.x,s.y),n=Nl(t.i,t.x,t.y),i=s.next,r=t.prev;return s.next=t,t.prev=s,e.next=i,i.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function yh(s,t,e,n){const i=Nl(s,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function br(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function Nl(s,t,e){return{i:s,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Om(s,t,e,n){let i=0;for(let r=t,a=e-n;r<e;r+=n)i+=(s[a]-s[r])*(s[r+1]+s[a+1]),a=r;return i}class Fm{static triangulate(t,e,n=2){return ym(t,e,n)}}class rr{static area(t){const e=t.length;let n=0;for(let i=e-1,r=0;r<e;i=r++)n+=t[i].x*t[r].y-t[r].x*t[i].y;return n*.5}static isClockWise(t){return rr.area(t)<0}static triangulateShape(t,e){const n=[],i=[],r=[];Mh(t),Sh(n,t);let a=t.length;e.forEach(Mh);for(let l=0;l<e.length;l++)i.push(a),a+=e[l].length,Sh(n,e[l]);const o=Fm.triangulate(n,i);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}}function Mh(s){const t=s.length;t>2&&s[t-1].equals(s[0])&&s.pop()}function Sh(s,t){for(let e=0;e<t.length;e++)s.push(t[e].x),s.push(t[e].y)}class Va extends Qt{constructor(t=[new it(0,-.5),new it(.5,0),new it(0,.5)],e=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:i},e=Math.floor(e),i=Ft(i,0,Math.PI*2);const r=[],a=[],o=[],l=[],c=[],h=1/e,u=new A,f=new it,d=new A,p=new A,x=new A;let g=0,m=0;for(let M=0;M<=t.length-1;M++)switch(M){case 0:g=t[M+1].x-t[M].x,m=t[M+1].y-t[M].y,d.x=m*1,d.y=-g,d.z=m*0,x.copy(d),d.normalize(),l.push(d.x,d.y,d.z);break;case t.length-1:l.push(x.x,x.y,x.z);break;default:g=t[M+1].x-t[M].x,m=t[M+1].y-t[M].y,d.x=m*1,d.y=-g,d.z=m*0,p.copy(d),d.x+=x.x,d.y+=x.y,d.z+=x.z,d.normalize(),l.push(d.x,d.y,d.z),x.copy(p)}for(let M=0;M<=e;M++){const S=n+M*h*i,_=Math.sin(S),T=Math.cos(S);for(let b=0;b<=t.length-1;b++){u.x=t[b].x*_,u.y=t[b].y,u.z=t[b].x*T,a.push(u.x,u.y,u.z),f.x=M/e,f.y=b/(t.length-1),o.push(f.x,f.y);const R=l[3*b+0]*_,v=l[3*b+1],E=l[3*b+0]*T;c.push(R,v,E)}}for(let M=0;M<e;M++)for(let S=0;S<t.length-1;S++){const _=S+M*t.length,T=_,b=_+t.length,R=_+t.length+1,v=_+1;r.push(T,b,v),r.push(R,v,b)}this.setIndex(r),this.setAttribute("position",new Ht(a,3)),this.setAttribute("uv",new Ht(o,2)),this.setAttribute("normal",new Ht(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Va(t.points,t.segments,t.phiStart,t.phiLength)}}class cc extends ac{constructor(t=1,e=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new cc(t.radius,t.detail)}}class Oi extends Qt{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,u=t/o,f=e/l,d=[],p=[],x=[],g=[];for(let m=0;m<h;m++){const M=m*f-a;for(let S=0;S<c;S++){const _=S*u-r;p.push(_,-M,0),x.push(0,0,1),g.push(S/o),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let M=0;M<o;M++){const S=M+c*m,_=M+c*(m+1),T=M+1+c*(m+1),b=M+1+c*m;d.push(S,_,b),d.push(_,T,b)}this.setIndex(d),this.setAttribute("position",new Ht(p,3)),this.setAttribute("normal",new Ht(x,3)),this.setAttribute("uv",new Ht(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Oi(t.width,t.height,t.widthSegments,t.heightSegments)}}class Ga extends Qt{constructor(t=.5,e=1,n=32,i=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);const o=[],l=[],c=[],h=[];let u=t;const f=(e-t)/i,d=new A,p=new it;for(let x=0;x<=i;x++){for(let g=0;g<=n;g++){const m=r+g/n*a;d.x=u*Math.cos(m),d.y=u*Math.sin(m),l.push(d.x,d.y,d.z),c.push(0,0,1),p.x=(d.x/e+1)/2,p.y=(d.y/e+1)/2,h.push(p.x,p.y)}u+=f}for(let x=0;x<i;x++){const g=x*(n+1);for(let m=0;m<n;m++){const M=m+g,S=M,_=M+n+1,T=M+n+2,b=M+1;o.push(S,_,b),o.push(_,T,b)}}this.setIndex(o),this.setAttribute("position",new Ht(l,3)),this.setAttribute("normal",new Ht(c,3)),this.setAttribute("uv",new Ht(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ga(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class hc extends Qt{constructor(t=new Cd([new it(0,.5),new it(-.5,-.5),new it(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const n=[],i=[],r=[],a=[];let o=0,l=0;if(Array.isArray(t)===!1)c(t);else for(let h=0;h<t.length;h++)c(t[h]),this.addGroup(o,l,h),o+=l,l=0;this.setIndex(n),this.setAttribute("position",new Ht(i,3)),this.setAttribute("normal",new Ht(r,3)),this.setAttribute("uv",new Ht(a,2));function c(h){const u=i.length/3,f=h.extractPoints(e);let d=f.shape;const p=f.holes;rr.isClockWise(d)===!1&&(d=d.reverse());for(let g=0,m=p.length;g<m;g++){const M=p[g];rr.isClockWise(M)===!0&&(p[g]=M.reverse())}const x=rr.triangulateShape(d,p);for(let g=0,m=p.length;g<m;g++){const M=p[g];d=d.concat(M)}for(let g=0,m=d.length;g<m;g++){const M=d[g];i.push(M.x,M.y,0),r.push(0,0,1),a.push(M.x,M.y)}for(let g=0,m=x.length;g<m;g++){const M=x[g],S=M[0]+u,_=M[1]+u,T=M[2]+u;n.push(S,_,T),l+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return Bm(e,t)}static fromJSON(t,e){const n=[];for(let i=0,r=t.shapes.length;i<r;i++){const a=e[t.shapes[i]];n.push(a)}return new hc(n,t.curveSegments)}}function Bm(s,t){if(t.shapes=[],Array.isArray(s))for(let e=0,n=s.length;e<n;e++){const i=s[e];t.shapes.push(i.uuid)}else t.shapes.push(s.uuid);return t}class ni extends Qt{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],u=new A,f=new A,d=[],p=[],x=[],g=[];for(let m=0;m<=n;m++){const M=[],S=m/n,_=a+S*o,T=t*Math.cos(_),b=Math.sqrt(t*t-T*T);let R=0;m===0&&a===0?R=.5/e:m===n&&l===Math.PI&&(R=-.5/e);for(let v=0;v<=e;v++){const E=v/e,P=i+E*r;u.x=-b*Math.cos(P),u.y=T,u.z=b*Math.sin(P),p.push(u.x,u.y,u.z),f.copy(u).normalize(),x.push(f.x,f.y,f.z),g.push(E+R,1-S),M.push(c++)}h.push(M)}for(let m=0;m<n;m++)for(let M=0;M<e;M++){const S=h[m][M+1],_=h[m][M],T=h[m+1][M],b=h[m+1][M+1];(m!==0||a>0)&&d.push(S,_,b),(m!==n-1||l<Math.PI)&&d.push(_,T,b)}this.setIndex(d),this.setAttribute("position",new Ht(p,3)),this.setAttribute("normal",new Ht(x,3)),this.setAttribute("uv",new Ht(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ni(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Un extends Qt{constructor(t=1,e=.4,n=12,i=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),i=Math.floor(i);const l=[],c=[],h=[],u=[],f=new A,d=new A,p=new A;for(let x=0;x<=n;x++){const g=a+x/n*o;for(let m=0;m<=i;m++){const M=m/i*r;d.x=(t+e*Math.cos(g))*Math.cos(M),d.y=(t+e*Math.cos(g))*Math.sin(M),d.z=e*Math.sin(g),c.push(d.x,d.y,d.z),f.x=t*Math.cos(M),f.y=t*Math.sin(M),p.subVectors(d,f).normalize(),h.push(p.x,p.y,p.z),u.push(m/i),u.push(x/n)}}for(let x=1;x<=n;x++)for(let g=1;g<=i;g++){const m=(i+1)*x+g-1,M=(i+1)*(x-1)+g-1,S=(i+1)*(x-1)+g,_=(i+1)*x+g;l.push(m,M,_),l.push(M,S,_)}this.setIndex(l),this.setAttribute("position",new Ht(c,3)),this.setAttribute("normal",new Ht(h,3)),this.setAttribute("uv",new Ht(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Un(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}}function Ms(s){const t={};for(const e in s){t[e]={};for(const n in s[e]){const i=s[e][n];if(bh(i))i.isRenderTargetTexture?(Tt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone();else if(Array.isArray(i))if(bh(i[0])){const r=[];for(let a=0,o=i.length;a<o;a++)r[a]=i[a].clone();t[e][n]=r}else t[e][n]=i.slice();else t[e][n]=i}}return t}function $e(s){const t={};for(let e=0;e<s.length;e++){const n=Ms(s[e]);for(const i in n)t[i]=n[i]}return t}function bh(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function km(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function Nd(s){const t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:qt.workingColorSpace}const zm={clone:Ms,merge:$e};var Hm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Vm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class kn extends nn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Hm,this.fragmentShader=Vm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ms(t.uniforms),this.uniformsGroups=km(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?e.uniforms[i]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[i]={type:"m4",value:a.toArray()}:e.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(const n in t.uniforms){const i=t.uniforms[n];switch(this.uniforms[n]={},i.type){case"t":this.uniforms[n].value=e[i.value]||null;break;case"c":this.uniforms[n].value=new St().setHex(i.value);break;case"v2":this.uniforms[n].value=new it().fromArray(i.value);break;case"v3":this.uniforms[n].value=new A().fromArray(i.value);break;case"v4":this.uniforms[n].value=new ue().fromArray(i.value);break;case"m3":this.uniforms[n].value=new Nt().fromArray(i.value);break;case"m4":this.uniforms[n].value=new Dt().fromArray(i.value);break;default:this.uniforms[n].value=i.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class Gm extends kn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Ni extends nn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new St(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new St(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=mr,this.normalScale=new it(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Sn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class wn extends Ni{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new it(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ft(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new St(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new St(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new St(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(t){this._retroreflectivity>0!=t>0&&this.version++,this._retroreflectivity=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.retroreflectivity=t.retroreflectivity,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class wh extends nn{constructor(t){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new St(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new St(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=mr,this.normalScale=new it(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.gradientMap=t.gradientMap,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.alphaMap=t.alphaMap,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}class gs extends nn{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new St(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new St(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=mr,this.normalScale=new it(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Sn,this.combine=Gl,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Wm extends nn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=np,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Xm extends nn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}function di(s,t){return!s||s.constructor===t?s:typeof t.BYTES_PER_ELEMENT=="number"?new t(s):Array.prototype.slice.call(s)}function Ea(s){return s!==void 0&&s.inTangents!==void 0&&s.outTangents!==void 0}function Ym(s){function t(i,r){return s[i]-s[r]}const e=s.length,n=new Array(e);for(let i=0;i!==e;++i)n[i]=i;return n.sort(t),n}function Th(s,t,e){const n=s.length,i=new s.constructor(n);for(let r=0,a=0;a!==n;++r){const o=e[r]*t;for(let l=0;l!==t;++l)i[a++]=s[o+l]}return i}function qm(s,t,e,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(t.push(r.time),e.push(...a)),r=s[i++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(t.push(r.time),a.toArray(e,e.length)),r=s[i++];while(r!==void 0);else do a=r[n],a!==void 0&&(t.push(r.time),e.push(a)),r=s[i++];while(r!==void 0)}class ws{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){const e=this.parameterPositions;let n=this._cachedIndex,i=e[n],r=e[n-1];t:{e:{let a;n:{i:if(!(t<i)){for(let o=n+2;;){if(i===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=i,i=e[++n],t<i)break e}a=e.length;break n}if(!(t>=r)){const o=e[1];t<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=e[--n-1],t>=r)break e}a=n,n=0;break n}break t}for(;n<a;){const o=n+a>>>1;t<e[o]?a=o:n=o+1}if(i=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){const e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=t*i;for(let a=0;a!==i;++a)e[a]=n[r+a];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}}class Km extends ws{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:os,endingEnd:os}}intervalChanged_(t,e,n){const i=this.parameterPositions;let r=t-2,a=t+1,o=i[r],l=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case ls:r=t,o=2*e-n;break;case La:r=i.length-2,o=e+i[r]-i[r+1];break;default:r=t,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case ls:a=t,l=2*n-e;break;case La:a=1,l=n+i[1]-i[0];break;default:a=t-1,l=e}const c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(t,e,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this._offsetPrev,u=this._offsetNext,f=this._weightPrev,d=this._weightNext,p=(n-e)/(i-e),x=p*p,g=x*p,m=-f*g+2*f*x-f*p,M=(1+f)*g+(-1.5-2*f)*x+(-.5+f)*p+1,S=(-1-d)*g+(1.5+d)*x+.5*p,_=d*g-d*x;for(let T=0;T!==o;++T)r[T]=m*a[h+T]+M*a[c+T]+S*a[l+T]+_*a[u+T];return r}}class Ud extends ws{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=(n-e)/(i-e),u=1-h;for(let f=0;f!==o;++f)r[f]=a[c+f]*u+a[l+f]*h;return r}}class Zm extends ws{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}}class Jm extends ws{interpolate_(t,e,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this.inTangents,u=this.outTangents;if(!h||!u){const p=(n-e)/(i-e),x=1-p;for(let g=0;g!==o;++g)r[g]=a[c+g]*x+a[l+g]*p;return r}const f=o*2,d=t-1;for(let p=0;p!==o;++p){const x=a[c+p],g=a[l+p],m=d*f+p*2,M=u[m],S=u[m+1],_=t*f+p*2,T=h[_],b=h[_+1],R=jm(n,e,M,T,i);r[p]=Od(R,x,S,b,g)}return r}}function Od(s,t,e,n,i){const r=1-s;return r*r*r*t+3*r*r*s*e+3*r*s*s*n+s*s*s*i}function $m(s,t,e,n,i){const r=1-s;return 3*r*r*(e-t)+6*r*s*(n-e)+3*s*s*(i-n)}function jm(s,t,e,n,i){let r=(s-t)/(i-t);for(let a=0;a<8;a++){const o=Od(r,t,e,n,i)-s;if(Math.abs(o)<1e-10)break;const l=$m(r,t,e,n,i);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-o/l))}return r}class Tn{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=di(e,this.TimeBufferType),this.values=di(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){const e=t.constructor;let n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:di(t.times,Array),values:di(t.values,Array)};const i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i),Ea(t.settings)&&(n.settings={inTangents:di(t.settings.inTangents,Array),outTangents:di(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Zm(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Ud(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Km(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){const e=new Jm(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case fr:e=this.InterpolantFactoryMethodDiscrete;break;case pr:e=this.InterpolantFactoryMethodLinear;break;case Qa:e=this.InterpolantFactoryMethodSmooth;break;case Uc:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Tt("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return fr;case this.InterpolantFactoryMethodLinear:return pr;case this.InterpolantFactoryMethodSmooth:return Qa;case this.InterpolantFactoryMethodBezier:return Uc}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){const e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t}return this}scale(t){if(t!==1){const e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t;Ea(this.settings)&&(Eh(this.settings.inTangents,t),Eh(this.settings.outTangents,t))}return this}trim(t,e){const n=this.times,i=n.length;let r=0,a=i-1;for(;r!==i&&n[r]<t;)++r;for(;a!==-1&&n[a]>e;)--a;if(++a,r!==0||a!==i){r>=a&&(a=Math.max(a,1),r=a-1);const o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0;const e=this.getValueSize();e-Math.floor(e)!==0&&(Lt("KeyframeTrack: Invalid value size in track.",this),t=!1);const n=this.times,i=this.values,r=n.length;r===0&&(Lt("KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){const l=n[o];if(typeof l=="number"&&isNaN(l)){Lt("KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){Lt("KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(i!==void 0&&dp(i))for(let o=0,l=i.length;o!==l;++o){const c=i[o];if(isNaN(c)){Lt("KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){const t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Qa,r=t.length-1;let a=1;for(let o=1;o<r;++o){let l=!1;const c=t[o],h=t[o+1];if(c!==h&&(o!==1||c!==t[0]))if(i)l=!0;else{const u=o*n,f=u-n,d=u+n;for(let p=0;p!==n;++p){const x=e[u+p];if(x!==e[f+p]||x!==e[d+p]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];const u=o*n,f=a*n;for(let d=0;d!==n;++d)e[f+d]=e[u+d]}++a}}if(r>0){t[a]=t[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){const t=this.times.slice(),e=this.values.slice(),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,Ea(this.settings)&&(i.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),i}}function Eh(s,t){for(let e=0,n=s.length;e!==n;e+=2)s[e]*=t}Tn.prototype.ValueTypeName="";Tn.prototype.TimeBufferType=Float32Array;Tn.prototype.ValueBufferType=Float32Array;Tn.prototype.DefaultInterpolation=pr;class Ts extends Tn{constructor(t,e,n){super(t,e,n)}}Ts.prototype.ValueTypeName="bool";Ts.prototype.ValueBufferType=Array;Ts.prototype.DefaultInterpolation=fr;Ts.prototype.InterpolantFactoryMethodLinear=void 0;Ts.prototype.InterpolantFactoryMethodSmooth=void 0;class Fd extends Tn{constructor(t,e,n,i){super(t,e,n,i)}}Fd.prototype.ValueTypeName="color";class wr extends Tn{constructor(t,e,n,i){super(t,e,n,i)}}wr.prototype.ValueTypeName="number";class Qm extends ws{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-e)/(i-e);let c=t*o;for(let h=c+o;c!==h;c+=4)he.slerpFlat(r,0,a,c-o,a,c,l);return r}}class Tr extends Tn{constructor(t,e,n,i){super(t,e,n,i)}InterpolantFactoryMethodLinear(t){return new Qm(this.times,this.values,this.getValueSize(),t)}}Tr.prototype.ValueTypeName="quaternion";Tr.prototype.InterpolantFactoryMethodSmooth=void 0;class Es extends Tn{constructor(t,e,n){super(t,e,n)}}Es.prototype.ValueTypeName="string";Es.prototype.ValueBufferType=Array;Es.prototype.DefaultInterpolation=fr;Es.prototype.InterpolantFactoryMethodLinear=void 0;Es.prototype.InterpolantFactoryMethodSmooth=void 0;class Ba extends Tn{constructor(t,e,n,i){super(t,e,n,i)}}Ba.prototype.ValueTypeName="vector";class Er{constructor(t="",e=-1,n=[],i=$l){this.name=t,this.tracks=n,this.duration=e,this.blendMode=i,this.uuid=mn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(t){const e=[],n=t.tracks,i=1/(t.fps||1);for(let a=0,o=n.length;a!==o;++a)e.push(e0(n[a]).scale(i));const r=new this(t.name,t.duration,e,t.blendMode);return r.uuid=t.uuid,r.userData=JSON.parse(t.userData||"{}"),r}static toJSON(t){const e=[],n=t.tracks,i={name:t.name,duration:t.duration,tracks:e,uuid:t.uuid,blendMode:t.blendMode,userData:JSON.stringify(t.userData)};for(let r=0,a=n.length;r!==a;++r)e.push(Tn.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(t,e,n,i){const r=e.length,a=[];for(let o=0;o<r;o++){let l=[],c=[];l.push((o+r-1)%r,o,(o+1)%r),c.push(0,1,0);const h=Ym(l);l=Th(l,1,h),c=Th(c,1,h),!i&&l[0]===0&&(l.push(r),c.push(c[0])),a.push(new wr(".morphTargetInfluences["+e[o].name+"]",l,c).scale(1/n))}return new this(t,-1,a)}static findByName(t,e){let n=t;if(!Array.isArray(t)){const i=t;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===e)return n[i];return null}static CreateClipsFromMorphTargetSequences(t,e,n){const i={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,l=t.length;o<l;o++){const c=t[o],h=c.name.match(r);if(h&&h.length>1){const u=h[1];let f=i[u];f||(i[u]=f=[]),f.push(c)}}const a=[];for(const o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],e,n));return a}resetDuration(){const t=this.tracks;let e=0;for(let n=0,i=t.length;n!==i;++n){const r=this.tracks[n];e=Math.max(e,r.times[r.times.length-1])}return this.duration=e,this}trim(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].trim(0,this.duration);return this}validate(){let t=!0;for(let e=0;e<this.tracks.length;e++)t=t&&this.tracks[e].validate();return t}optimize(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].optimize();return this}clone(){const t=[];for(let n=0;n<this.tracks.length;n++)t.push(this.tracks[n].clone());const e=new this.constructor(this.name,this.duration,t,this.blendMode);return e.userData=JSON.parse(JSON.stringify(this.userData)),e}toJSON(){return this.constructor.toJSON(this)}}function t0(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return wr;case"vector":case"vector2":case"vector3":case"vector4":return Ba;case"color":return Fd;case"quaternion":return Tr;case"bool":case"boolean":return Ts;case"string":return Es}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function e0(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const t=t0(s.type);if(s.times===void 0){const n=[],i=[];qm(s.keys,n,i,"value"),s.times=n,s.values=i}let e;return t.parse!==void 0?e=t.parse(s):e=new t(s.name,s.times,s.values,s.interpolation),Ea(s.settings)&&(e.settings={inTangents:di(s.settings.inTangents,Float32Array),outTangents:di(s.settings.outTangents,Float32Array)}),e}const $n={enabled:!1,files:{},add:function(s,t){this.enabled!==!1&&(Ah(s)||(this.files[s]=t))},get:function(s){if(this.enabled!==!1&&!Ah(s))return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};function Ah(s){try{const t=s.slice(s.indexOf(":")+1);return new URL(t).protocol==="blob:"}catch{return!1}}class n0{constructor(t,e,n){const i=this;let r=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,r===!1&&i.onStart!==void 0&&i.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=c.length;u<f;u+=2){const d=c[u],p=c[u+1];if(d.global&&(d.lastIndex=0),d.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const i0=new n0;class As{constructor(t){this.manager=t!==void 0?t:i0,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){const n=this;return new Promise(function(i,r){n.load(t,i,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}}As.DEFAULT_MATERIAL_NAME="__DEFAULT";const qn={};class s0 extends Error{constructor(t,e){super(t),this.response=e}}class Bd extends As{constructor(t){super(t),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(t,e,n,i){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=$n.get(`file:${t}`);if(r!==void 0){this.manager.itemStart(t),setTimeout(()=>{e&&e(r),this.manager.itemEnd(t)},0);return}if(qn[t]!==void 0){qn[t].push({onLoad:e,onProgress:n,onError:i});return}qn[t]=[],qn[t].push({onLoad:e,onProgress:n,onError:i});const a=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&Tt("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const h=qn[t],u=c.body.getReader(),f=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),d=f?parseInt(f):0,p=d!==0;let x=0;const g=new ReadableStream({start(m){M();function M(){u.read().then(({done:S,value:_})=>{if(S)m.close();else{x+=_.byteLength;const T=new ProgressEvent("progress",{lengthComputable:p,loaded:x,total:d});for(let b=0,R=h.length;b<R;b++){const v=h[b];v.onProgress&&v.onProgress(T)}m.enqueue(_),M()}},S=>{m.error(S)})}}});return new Response(g)}else throw new s0(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return c.json();default:if(o==="")return c.text();{const u=/charset="?([^;"\s]*)"?/i.exec(o),f=u&&u[1]?u[1].toLowerCase():void 0,d=new TextDecoder(f);return c.arrayBuffer().then(p=>d.decode(p))}}}).then(c=>{$n.add(`file:${t}`,c);const h=qn[t];delete qn[t];for(let u=0,f=h.length;u<f;u++){const d=h[u];d.onLoad&&d.onLoad(c)}}).catch(c=>{const h=qn[t];if(h===void 0)throw this.manager.itemError(t),c;delete qn[t];for(let u=0,f=h.length;u<f;u++){const d=h[u];d.onError&&d.onError(c)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const ts=new WeakMap;class r0 extends As{constructor(t){super(t)}load(t,e,n,i){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,a=$n.get(`image:${t}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(t),setTimeout(function(){e&&e(a),r.manager.itemEnd(t)},0);else{let u=ts.get(a);u===void 0&&(u=[],ts.set(a,u)),u.push({onLoad:e,onError:i})}return a}const o=_r("img");function l(){h(),e&&e(this);const u=ts.get(this)||[];for(let f=0;f<u.length;f++){const d=u[f];d.onLoad&&d.onLoad(this)}ts.delete(this),r.manager.itemEnd(t)}function c(u){h(),i&&i(u),$n.remove(`image:${t}`);const f=ts.get(this)||[];for(let d=0;d<f.length;d++){const p=f[d];p.onError&&p.onError(u)}ts.delete(this),r.manager.itemError(t),r.manager.itemEnd(t)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),$n.add(`image:${t}`,o),r.manager.itemStart(t),o.src=t,o}}class kd extends As{constructor(t){super(t)}load(t,e,n,i){const r=new Ee,a=new r0(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(t,function(o){r.image=o,r.needsUpdate=!0,e!==void 0&&e(r)},n,i),r}}class Wa extends xe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new St(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}class a0 extends Wa{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(xe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new St(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){const e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}}const Co=new Dt,Rh=new A,Ch=new A;class uc{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new it(512,512),this.mapType=an,this.map=null,this.mapPass=null,this.matrix=new Dt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new sc,this._frameExtents=new it(1,1),this._viewportCount=1,this._viewports=[new ue(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera;Rh.setFromMatrixPosition(t.matrixWorld),e.position.copy(Rh),Ch.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Ch),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,i){Co.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(Co,t.coordinateSystem,t.reversedDepth);const r=this._frameExtents,a=i?i.z/r.x:1,o=i?i.w/r.y:1,l=i?i.x/r.x:0,c=i?i.y/r.y:0;t.coordinateSystem===gr||t.reversedDepth?e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),e.multiply(Co)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const la=new A,ca=new he,Rn=new A;class zd extends xe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Dt,this.projectionMatrix=new Dt,this.projectionMatrixInverse=new Dt,this.coordinateSystem=Nn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(la,ca,Rn),Rn.x===1&&Rn.y===1&&Rn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(la,ca,Rn.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(la,ca,Rn),Rn.x===1&&Rn.y===1&&Rn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(la,ca,Rn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const hi=new A,Ph=new it,Ih=new it;class je extends zd{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=vs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(tr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return vs*2*Math.atan(Math.tan(tr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){hi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(hi.x,hi.y).multiplyScalar(-t/hi.z),hi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(hi.x,hi.y).multiplyScalar(-t/hi.z)}getViewSize(t,e){return this.getViewBounds(t,Ph,Ih),e.subVectors(Ih,Ph)}setViewOffset(t,e,n,i,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(tr*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*i/l,e-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}class o0 extends uc{constructor(){super(new je(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(t){const e=this.camera,n=vs*2*t.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,r=t.distance||e.far;(n!==e.fov||i!==e.aspect||r!==e.far)&&(e.fov=n,e.aspect=i,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this.aspect=t.aspect,this}toJSON(){const t=super.toJSON();return t.focus=this.focus,t.aspect=this.aspect,t}}class l0 extends Wa{constructor(t,e,n=0,i=Math.PI/3,r=0,a=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(xe.DEFAULT_UP),this.updateMatrix(),this.target=new xe,this.distance=n,this.angle=i,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new o0}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.map=t.map,this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.distance=this.distance,e.object.angle=this.angle,e.object.decay=this.decay,e.object.penumbra=this.penumbra,e.object.target=this.target.uuid,this.map&&this.map.isTexture&&(e.object.map=this.map.toJSON(t).uuid),e.object.shadow=this.shadow.toJSON(),e}}class c0 extends uc{constructor(){super(new je(90,1,.5,500)),this.isPointLightShadow=!0}}class dc extends Wa{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new c0}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.distance=this.distance,e.object.decay=this.decay,e.object.shadow=this.shadow.toJSON(),e}}class Xa extends zd{constructor(t=-1,e=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=i+e,l=i-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class h0 extends uc{constructor(){super(new Xa(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Hd extends Wa{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(xe.DEFAULT_UP),this.updateMatrix(),this.target=new xe,this.shadow=new h0}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}}class ar{static extractUrlBase(t){const e=t.lastIndexOf("/");return e===-1?"./":t.slice(0,e+1)}static resolveURL(t,e){return typeof t!="string"||t===""?"":(/^https?:\/\//i.test(e)&&/^\//.test(t)&&(e=e.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(t)||/^data:.*,.*$/i.test(t)||/^blob:.*$/i.test(t)?t:e+t)}}const Po=new WeakMap;class u0 extends As{constructor(t){super(t),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Tt("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Tt("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(t){return this.options=t,this}load(t,e,n,i){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,a=$n.get(`image-bitmap:${t}`);if(a!==void 0){if(r.manager.itemStart(t),a.then){a.then(c=>{Po.has(a)===!0?(i&&i(Po.get(a)),r.manager.itemError(t),r.manager.itemEnd(t)):(e&&e(c),r.manager.itemEnd(t))});return}setTimeout(function(){e&&e(a),r.manager.itemEnd(t)},0);return}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const l=fetch(t,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign({},r.options,{colorSpaceConversion:"none"}))}).then(function(c){return $n.add(`image-bitmap:${t}`,c),e&&e(c),r.manager.itemEnd(t),c}).catch(function(c){i&&i(c),Po.set(l,c),$n.remove(`image-bitmap:${t}`),r.manager.itemError(t),r.manager.itemEnd(t)});$n.add(`image-bitmap:${t}`,l),r.manager.itemStart(t)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const es=-90,ns=1;class d0 extends xe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new je(es,ns,t,e);i.layers=this.layers,this.add(i);const r=new je(es,ns,t,e);r.layers=this.layers,this.add(r);const a=new je(es,ns,t,e);a.layers=this.layers,this.add(a);const o=new je(es,ns,t,e);o.layers=this.layers,this.add(o);const l=new je(es,ns,t,e);l.layers=this.layers,this.add(l);const c=new je(es,ns,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,r,a,o,l]=e;for(const c of e)this.remove(c);if(t===Nn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===gr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),p=t.xr.enabled;t.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;t.isWebGLRenderer===!0?g=t.state.buffers.depth.getReversed():g=t.reversedDepthBuffer,t.setRenderTarget(n,0,i),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,i),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,2,i),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,3,i),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(n,4,i),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,i),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(u,f,d),t.xr.enabled=p,n.texture.needsPMREMUpdate=!0}}class f0 extends je{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class p0{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(t){this._document=t,t.hidden!==void 0&&(this._pageVisibilityHandler=m0.bind(this),t.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(t){return this._timescale=t,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(t){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(t!==void 0?t:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function m0(){this._document.hidden===!1&&this.reset()}class g0{constructor(t,e,n){this.binding=t,this.valueSize=n;let i,r,a;switch(e){case"quaternion":i=this._slerp,r=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,r=this._select,a=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,r=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=r,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(t,e){const n=this.buffer,i=this.valueSize,r=t*i+i;let a=this.cumulativeWeight;if(a===0){for(let o=0;o!==i;++o)n[r+o]=n[o];a=e}else{a+=e;const o=e/a;this._mixBufferRegion(n,r,0,o,i)}this.cumulativeWeight=a}accumulateAdditive(t){const e=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(e,i,0,t,n),this.cumulativeWeightAdditive+=t}apply(t){const e=this.valueSize,n=this.buffer,i=t*e+e,r=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){const l=e*this._origIndex;this._mixBufferRegion(n,i,l,1-r,e)}a>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*e,1,e);for(let l=e,c=e+e;l!==c;++l)if(n[l]!==n[l+e]){o.setValue(n,i);break}}saveOriginalState(){const t=this.binding,e=this.buffer,n=this.valueSize,i=n*this._origIndex;t.getValue(e,i);for(let r=n,a=i;r!==a;++r)e[r]=e[i+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const t=this.valueSize*3;this.binding.setValue(this.buffer,t)}_setAdditiveIdentityNumeric(){const t=this._addIndex*this.valueSize,e=t+this.valueSize;for(let n=t;n<e;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const t=this._origIndex*this.valueSize,e=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[e+n]=this.buffer[t+n]}_select(t,e,n,i,r){if(i>=.5)for(let a=0;a!==r;++a)t[e+a]=t[n+a]}_slerp(t,e,n,i){he.slerpFlat(t,e,t,e,t,n,i)}_slerpAdditive(t,e,n,i,r){const a=this._workIndex*r;he.multiplyQuaternionsFlat(t,a,t,e,t,n),he.slerpFlat(t,e,t,e,t,a,i)}_lerp(t,e,n,i,r){const a=1-i;for(let o=0;o!==r;++o){const l=e+o;t[l]=t[l]*a+t[n+o]*i}}_lerpAdditive(t,e,n,i,r){for(let a=0;a!==r;++a){const o=e+a;t[o]=t[o]+t[n+a]*i}}}const fc="\\[\\]\\.:\\/",_0=new RegExp("["+fc+"]","g"),pc="[^"+fc+"]",x0="[^"+fc.replace("\\.","")+"]",v0=/((?:WC+[\/:])*)/.source.replace("WC",pc),y0=/(WCOD+)?/.source.replace("WCOD",x0),M0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",pc),S0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",pc),b0=new RegExp("^"+v0+y0+M0+S0+"$"),w0=["material","materials","bones","map"];class T0{constructor(t,e,n){const i=n||se.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e)}setValue(t,e){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(t,e)}bind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}}class se{constructor(t,e,n){this.path=e,this.parsedPath=n||se.parseTrackName(e),this.node=se.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new se.Composite(t,e,n):new se(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(_0,"")}static parseTrackName(t){const e=b0.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);const n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const r=n.nodeName.substring(i+1);w0.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){const n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){const n=function(r){for(let a=0;a<r.length;a++){const o=r[a];if(o.name===e||o.uuid===e)return o;const l=n(o.children);if(l)return l}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node;const e=this.parsedPath,n=e.objectName,i=e.propertyName;let r=e.propertyIndex;if(t||(t=se.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Tt("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){Lt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Lt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Lt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Lt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Lt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){Lt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){Lt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}const a=t[i];if(a===void 0){const c=e.nodeName;Lt("PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!t.geometry){Lt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Lt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}se.Composite=T0;se.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};se.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};se.prototype.GetterByBindingType=[se.prototype._getValue_direct,se.prototype._getValue_array,se.prototype._getValue_arrayElement,se.prototype._getValue_toArray];se.prototype.SetterByBindingTypeAndVersioning=[[se.prototype._setValue_direct,se.prototype._setValue_direct_setNeedsUpdate,se.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[se.prototype._setValue_array,se.prototype._setValue_array_setNeedsUpdate,se.prototype._setValue_array_setMatrixWorldNeedsUpdate],[se.prototype._setValue_arrayElement,se.prototype._setValue_arrayElement_setNeedsUpdate,se.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[se.prototype._setValue_fromArray,se.prototype._setValue_fromArray_setNeedsUpdate,se.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class E0{constructor(t,e,n=null,i=e.blendMode){this._mixer=t,this._clip=e,this._localRoot=n,this.blendMode=i;const r=e.tracks,a=r.length,o=new Array(a),l={endingStart:os,endingEnd:os};for(let c=0;c!==a;++c){const h=r[c].createInterpolant(null);o[c]=h,h.settings=l}this._interpolantSettings=l,this._interpolants=o,this._propertyBindings=new Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._restoreTimeScale=null,this._weightInterpolant=null,this.loop=jf,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(t){return this._startTime=t,this}setLoop(t,e){return this.loop=t,this.repetitions=e,this}setEffectiveWeight(t){return this.weight=t,this._effectiveWeight=this.enabled?t:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(t){return this._scheduleFading(t,0,1)}fadeOut(t){return this._scheduleFading(t,1,0)}crossFadeFrom(t,e,n=!1){if(t.fadeOut(e),this.fadeIn(e),n===!0){const i=this._clip.duration,r=t._clip.duration,a=r/i,o=i/r;t._restoreTimeScale=t.timeScale,this._restoreTimeScale=this.timeScale,t.warp(1,a,e),this.warp(o,1,e)}return this}crossFadeTo(t,e,n=!1){return t.crossFadeFrom(this,e,n)}stopFading(){const t=this._weightInterpolant;return t!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(t)),this}setEffectiveTimeScale(t){return this.timeScale=t,this._effectiveTimeScale=this.paused?0:t,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(t){return this.timeScale=this._clip.duration/t,this.stopWarping()}syncWith(t){return this.time=t.time,this.timeScale=t.timeScale,this.stopWarping()}halt(t){return this.warp(this._effectiveTimeScale,0,t)}warp(t,e,n){const i=this._mixer,r=i.time,a=this.timeScale;let o=this._timeScaleInterpolant;o===null&&(o=i._lendControlInterpolant(),this._timeScaleInterpolant=o);const l=o.parameterPositions,c=o.sampleValues;return l[0]=r,l[1]=r+n,c[0]=t/a,c[1]=e/a,this}stopWarping(){const t=this._timeScaleInterpolant;return t!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(t)),this._restoreTimeScale=null,this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(t,e,n,i){if(!this.enabled){this._updateWeight(t);return}const r=this._startTime;if(r!==null){const l=(t-r)*n;l<0||n===0?e=0:(this._startTime=null,e=n*l)}e*=this._updateTimeScale(t);const a=this._updateTime(e),o=this._updateWeight(t);if(o>0){const l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case tp:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(a),c[h].accumulateAdditive(o);break;case $l:default:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(a),c[h].accumulate(i,o)}}}_updateWeight(t){let e=0;if(this.enabled){e=this.weight;const n=this._weightInterpolant;if(n!==null){const i=n.evaluate(t)[0];e*=i,t>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=e,e}_updateTimeScale(t){let e=0;if(!this.paused){e=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const i=n.evaluate(t)[0];e*=i,t>n.parameterPositions[1]&&(e===0?this.paused=!0:(this._restoreTimeScale!==null&&(e=this._restoreTimeScale),this.timeScale=e),this.stopWarping())}}return this._effectiveTimeScale=e,e}_updateTime(t){const e=this._clip.duration,n=this.loop;let i=this.time+t,r=this._loopCount;const a=n===Qf;if(t===0)return r===-1?i:a&&(r&1)===1?e-i:i;if(n===Jl){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));t:{if(i>=e)i=e;else if(i<0)i=0;else{this.time=i;break t}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:t<0?-1:1})}}else{if(r===-1&&(t>=0?(r=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),i>=e||i<0){const o=Math.floor(i/e);i-=e*o,r+=Math.abs(o);const l=this.repetitions-r;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=t>0?e:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:t>0?1:-1});else{if(l===1){const c=t<0;this._setEndings(c,!c,a)}else this._setEndings(!1,!1,a);this._loopCount=r,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this._loopCount=r,this.time=i;if(a&&(r&1)===1)return e-i}return i}_setEndings(t,e,n){const i=this._interpolantSettings;n?(i.endingStart=ls,i.endingEnd=ls):(t?i.endingStart=this.zeroSlopeAtStart?ls:os:i.endingStart=La,e?i.endingEnd=this.zeroSlopeAtEnd?ls:os:i.endingEnd=La)}_scheduleFading(t,e,n){const i=this._mixer,r=i.time;let a=this._weightInterpolant;a===null&&(a=i._lendControlInterpolant(),this._weightInterpolant=a);const o=a.parameterPositions,l=a.sampleValues;return o[0]=r,l[0]=e,o[1]=r+t,l[1]=n,this}}const A0=new Float32Array(1);class Vd extends ei{constructor(t){super(),this._root=t,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}_bindAction(t,e){const n=t._localRoot||this._root,i=t._clip.tracks,r=i.length,a=t._propertyBindings,o=t._interpolants,l=n.uuid,c=this._bindingsByRootAndName;let h=c[l];h===void 0&&(h={},c[l]=h);for(let u=0;u!==r;++u){const f=i[u],d=f.name;let p=h[d];if(p!==void 0)++p.referenceCount,a[u]=p;else{if(p=a[u],p!==void 0){p._cacheIndex===null&&(++p.referenceCount,this._addInactiveBinding(p,l,d));continue}const x=e&&e._propertyBindings[u].binding.parsedPath;p=new g0(se.create(n,d,x),f.ValueTypeName,f.getValueSize()),++p.referenceCount,this._addInactiveBinding(p,l,d),a[u]=p}o[u].resultBuffer=p.buffer}}_activateAction(t){if(!this._isActiveAction(t)){if(t._cacheIndex===null){const n=(t._localRoot||this._root).uuid,i=t._clip.uuid,r=this._actionsByClip[i];this._bindAction(t,r&&r.knownActions[0]),this._addInactiveAction(t,i,n)}const e=t._propertyBindings;for(let n=0,i=e.length;n!==i;++n){const r=e[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(t)}}_deactivateAction(t){if(this._isActiveAction(t)){const e=t._propertyBindings;for(let n=0,i=e.length;n!==i;++n){const r=e[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(t)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const t=this;this.stats={actions:{get total(){return t._actions.length},get inUse(){return t._nActiveActions}},bindings:{get total(){return t._bindings.length},get inUse(){return t._nActiveBindings}},controlInterpolants:{get total(){return t._controlInterpolants.length},get inUse(){return t._nActiveControlInterpolants}}}}_isActiveAction(t){const e=t._cacheIndex;return e!==null&&e<this._nActiveActions}_addInactiveAction(t,e,n){const i=this._actions,r=this._actionsByClip;let a=r[e];if(a===void 0)a={knownActions:[t],actionByRoot:{}},t._byClipCacheIndex=0,r[e]=a;else{const o=a.knownActions;t._byClipCacheIndex=o.length,o.push(t)}t._cacheIndex=i.length,i.push(t),a.actionByRoot[n]=t}_removeInactiveAction(t){const e=this._actions,n=e[e.length-1],i=t._cacheIndex;n._cacheIndex=i,e[i]=n,e.pop(),t._cacheIndex=null;const r=t._clip.uuid,a=this._actionsByClip,o=a[r],l=o.knownActions,c=l[l.length-1],h=t._byClipCacheIndex;c._byClipCacheIndex=h,l[h]=c,l.pop(),t._byClipCacheIndex=null;const u=o.actionByRoot,f=(t._localRoot||this._root).uuid;delete u[f],l.length===0&&delete a[r],this._removeInactiveBindingsForAction(t)}_removeInactiveBindingsForAction(t){const e=t._propertyBindings;for(let n=0,i=e.length;n!==i;++n){const r=e[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(t){const e=this._actions,n=t._cacheIndex,i=this._nActiveActions++,r=e[i];t._cacheIndex=i,e[i]=t,r._cacheIndex=n,e[n]=r}_takeBackAction(t){const e=this._actions,n=t._cacheIndex,i=--this._nActiveActions,r=e[i];t._cacheIndex=i,e[i]=t,r._cacheIndex=n,e[n]=r}_addInactiveBinding(t,e,n){const i=this._bindingsByRootAndName,r=this._bindings;let a=i[e];a===void 0&&(a={},i[e]=a),a[n]=t,t._cacheIndex=r.length,r.push(t)}_removeInactiveBinding(t){const e=this._bindings,n=t.binding,i=n.rootNode.uuid,r=n.path,a=this._bindingsByRootAndName,o=a[i],l=e[e.length-1],c=t._cacheIndex;l._cacheIndex=c,e[c]=l,e.pop(),delete o[r],Object.keys(o).length===0&&delete a[i]}_lendBinding(t){const e=this._bindings,n=t._cacheIndex,i=this._nActiveBindings++,r=e[i];t._cacheIndex=i,e[i]=t,r._cacheIndex=n,e[n]=r}_takeBackBinding(t){const e=this._bindings,n=t._cacheIndex,i=--this._nActiveBindings,r=e[i];t._cacheIndex=i,e[i]=t,r._cacheIndex=n,e[n]=r}_lendControlInterpolant(){const t=this._controlInterpolants,e=this._nActiveControlInterpolants++;let n=t[e];return n===void 0&&(n=new Ud(new Float32Array(2),new Float32Array(2),1,A0),n.__cacheIndex=e,t[e]=n),n}_takeBackControlInterpolant(t){const e=this._controlInterpolants,n=t.__cacheIndex,i=--this._nActiveControlInterpolants,r=e[i];t.__cacheIndex=i,e[i]=t,r.__cacheIndex=n,e[n]=r}clipAction(t,e,n){const i=e||this._root,r=i.uuid;let a=typeof t=="string"?Er.findByName(i,t):t;const o=a!==null?a.uuid:t,l=this._actionsByClip[o];let c=null;if(n===void 0&&(a!==null?n=a.blendMode:n=$l),l!==void 0){const u=l.actionByRoot[r];if(u!==void 0&&u.blendMode===n)return u;c=l.knownActions[0],a===null&&(a=c._clip)}if(a===null)return null;const h=new E0(this,a,e,n);return this._bindAction(h,c),this._addInactiveAction(h,o,r),h}existingAction(t,e){const n=e||this._root,i=n.uuid,r=typeof t=="string"?Er.findByName(n,t):t,a=r?r.uuid:t,o=this._actionsByClip[a];return o!==void 0&&o.actionByRoot[i]||null}stopAllAction(){const t=this._actions,e=this._nActiveActions;for(let n=e-1;n>=0;--n)t[n].stop();return this}update(t){t*=this.timeScale;const e=this._actions,n=this._nActiveActions,i=this.time+=t,r=Math.sign(t),a=this._accuIndex^=1;for(let c=0;c!==n;++c)e[c]._update(i,t,r,a);const o=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)o[c].apply(a);return this}setTime(t){this.time=0;for(let e=0;e<this._actions.length;e++)this._actions[e].time=0;return this.update(t)}getRoot(){return this._root}uncacheClip(t){const e=this._actions,n=t.uuid,i=this._actionsByClip,r=i[n];if(r!==void 0){const a=r.knownActions;for(let o=0,l=a.length;o!==l;++o){const c=a[o];this._deactivateAction(c);const h=c._cacheIndex,u=e[e.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,u._cacheIndex=h,e[h]=u,e.pop(),this._removeInactiveBindingsForAction(c)}delete i[n]}}uncacheRoot(t){const e=t.uuid,n=this._actionsByClip;for(const a in n){const o=n[a].actionByRoot,l=o[e];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}const i=this._bindingsByRootAndName,r=i[e];if(r!==void 0)for(const a in r){const o=r[a];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(t,e){const n=this.existingAction(t,e);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}const Lh=new Dt;class R0{constructor(t,e,n=0,i=1/0){this.ray=new Ss(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new nc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,e.projectionMatrix.elements[14]).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):Lt("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Lh.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Lh),this}intersectObject(t,e=!0,n=[]){return Ul(t,this,n,e),n.sort(Dh),n}intersectObjects(t,e=!0,n=[]){for(let i=0,r=t.length;i<r;i++)Ul(t[i],this,n,e);return n.sort(Dh),n}}function Dh(s,t){return s.distance-t.distance}function Ul(s,t,e,n){let i=!0;if(s.layers.test(t.layers)&&s.raycast(t,e)===!1&&(i=!1),i===!0&&n===!0){const r=s.children;for(let a=0,o=r.length;a<o;a++)Ul(r[a],t,e,!0)}}class Nh{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Ft(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Ft(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Gd{static{Gd.prototype.isMatrix2=!0}constructor(t,e,n,i){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,i){const r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=i,this}}class C0 extends ei{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function Uh(s,t,e,n){const i=P0(n);switch(e){case ld:return s*t;case za:return s*t/i.components*i.byteLength;case ql:return s*t/i.components*i.byteLength;case Ii:return s*t*2/i.components*i.byteLength;case Kl:return s*t*2/i.components*i.byteLength;case cd:return s*t*3/i.components*i.byteLength;case pn:return s*t*4/i.components*i.byteLength;case Zl:return s*t*4/i.components*i.byteLength;case Sa:case ba:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case wa:case Ta:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case nl:case sl:return Math.max(s,16)*Math.max(t,8)/4;case el:case il:return Math.max(s,8)*Math.max(t,8)/2;case rl:case al:case ll:case cl:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case ol:case Pa:case hl:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case ul:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case dl:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case fl:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case pl:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case ml:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case gl:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case _l:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case xl:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case vl:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case yl:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case Ml:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case Sl:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case bl:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case wl:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case Tl:case El:case Al:return Math.ceil(s/4)*Math.ceil(t/4)*16;case Rl:case Cl:return Math.ceil(s/4)*Math.ceil(t/4)*8;case Ia:case Pl:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function P0(s){switch(s){case an:case sd:return{byteLength:1,components:1};case ur:case rd:case Bn:return{byteLength:2,components:1};case Xl:case Yl:return{byteLength:2,components:4};case Fn:case Wl:case fn:return{byteLength:4,components:1};case ad:case od:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Vl}}));typeof window<"u"&&(window.__THREE__?Tt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Vl);function Wd(){let s=null,t=!1,e=null,n=null;function i(r,a){n=s.requestAnimationFrame(i),e(r,a)}return{start:function(){t!==!0&&e!==null&&s!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function I0(s){const t=new WeakMap;function e(o,l){const c=o.array,h=o.usage,u=c.byteLength,f=s.createBuffer();s.bindBuffer(l,f),s.bufferData(l,c,h),o.onUploadCallback();let d;if(c instanceof Float32Array)d=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=s.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?d=s.HALF_FLOAT:d=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=s.SHORT;else if(c instanceof Uint32Array)d=s.UNSIGNED_INT;else if(c instanceof Int32Array)d=s.INT;else if(c instanceof Int8Array)d=s.BYTE;else if(c instanceof Uint8Array)d=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){const h=l.array,u=l.updateRanges;if(s.bindBuffer(c,o),u.length===0)s.bufferSubData(c,0,h);else{u.sort((d,p)=>d.start-p.start);let f=0;for(let d=1;d<u.length;d++){const p=u[f],x=u[d];x.start<=p.start+p.count+1?p.count=Math.max(p.count,x.start+x.count-p.start):(++f,u[f]=x)}u.length=f+1;for(let d=0,p=u.length;d<p;d++){const x=u[d];s.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(s.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:r,update:a}}var L0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,D0=`#ifdef USE_ALPHAHASH
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
#endif`,N0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,U0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,O0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,F0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,B0=`#ifdef USE_AOMAP
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
#endif`,k0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,z0=`#ifdef USE_BATCHING
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
#endif`,H0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,V0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,G0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,W0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,X0=`#ifdef USE_IRIDESCENCE
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
#endif`,Y0=`#ifdef USE_BUMPMAP
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
#endif`,q0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,K0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Z0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,J0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,$0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,j0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Q0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,tg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,eg=`#define PI 3.141592653589793
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
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
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
} // validated`,ng=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,ig=`vec3 transformedNormal = objectNormal;
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
#endif`,sg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,rg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ag=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,og=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,lg="gl_FragColor = linearToOutputTexel( gl_FragColor );",cg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,hg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
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
#endif`,ug=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,dg=`#ifdef USE_ENVMAP
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
#endif`,fg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,pg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,mg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,gg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,_g=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,xg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,vg=`#ifdef USE_GRADIENTMAP
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
}`,yg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Mg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Sg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,bg=`uniform bool receiveShadow;
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
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
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
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
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
#include <lightprobes_pars_fragment>`,wg=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
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
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
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
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,Tg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Eg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ag=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Rg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Cg=`PhysicalMaterial material;
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
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
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
#endif`,Pg=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
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
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
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
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
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
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
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
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
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
}`,Ig=`
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
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
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
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
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
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Lg=`#if defined( RE_IndirectDiffuse )
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
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Dg=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ng=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Ug=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Og=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Fg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Bg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,kg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,zg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Hg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Vg=`#if defined( USE_POINTS_UV )
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
#endif`,Gg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Wg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Xg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Yg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,qg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Kg=`#ifdef USE_MORPHTARGETS
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
#endif`,Zg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Jg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
	#ifdef DOUBLE_SIDED
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
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,$g=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,jg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Qg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,t_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,e_=`#ifdef USE_NORMALMAP
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
#endif`,n_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,i_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,s_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,r_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,a_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,o_=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,l_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,c_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,h_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,u_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,d_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,f_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,p_=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
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
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
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
#endif`,m_=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
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
#endif`,g_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
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
#endif`,__=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
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
}`,x_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,v_=`#ifdef USE_SKINNING
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
#endif`,y_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,M_=`#ifdef USE_SKINNING
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
#endif`,S_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,b_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,w_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,T_=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,E_=`#ifdef USE_TRANSMISSION
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
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,A_=`#ifdef USE_TRANSMISSION
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
#endif`,R_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,C_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,P_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,I_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const L_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,D_=`uniform sampler2D t2D;
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
}`,N_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,U_=`#ifdef ENVMAP_TYPE_CUBE
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
}`,O_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,F_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,B_=`#include <common>
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
}`,k_=`#if DEPTH_PACKING == 3200
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
}`,z_=`#define DISTANCE
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
}`,H_=`#define DISTANCE
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
void main() {
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
}`,V_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,G_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,W_=`uniform float scale;
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
}`,X_=`uniform vec3 diffuse;
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
}`,Y_=`#include <common>
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
}`,q_=`uniform vec3 diffuse;
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
}`,K_=`#define LAMBERT
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
}`,Z_=`#define LAMBERT
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
}`,J_=`#define MATCAP
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
}`,$_=`#define MATCAP
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
}`,j_=`#define NORMAL
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
}`,Q_=`#define NORMAL
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
}`,tx=`#define PHONG
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
}`,ex=`#define PHONG
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
}`,nx=`#define STANDARD
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
}`,ix=`#define STANDARD
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
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
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
}`,sx=`#define TOON
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
}`,rx=`#define TOON
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
}`,ax=`uniform float size;
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
}`,ox=`uniform vec3 diffuse;
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
}`,lx=`#include <common>
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
}`,cx=`uniform vec3 color;
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
}`,hx=`uniform float rotation;
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
}`,ux=`uniform vec3 diffuse;
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
}`,kt={alphahash_fragment:L0,alphahash_pars_fragment:D0,alphamap_fragment:N0,alphamap_pars_fragment:U0,alphatest_fragment:O0,alphatest_pars_fragment:F0,aomap_fragment:B0,aomap_pars_fragment:k0,batching_pars_vertex:z0,batching_vertex:H0,begin_vertex:V0,beginnormal_vertex:G0,bsdfs:W0,iridescence_fragment:X0,bumpmap_pars_fragment:Y0,clipping_planes_fragment:q0,clipping_planes_pars_fragment:K0,clipping_planes_pars_vertex:Z0,clipping_planes_vertex:J0,color_fragment:$0,color_pars_fragment:j0,color_pars_vertex:Q0,color_vertex:tg,common:eg,cube_uv_reflection_fragment:ng,defaultnormal_vertex:ig,displacementmap_pars_vertex:sg,displacementmap_vertex:rg,emissivemap_fragment:ag,emissivemap_pars_fragment:og,colorspace_fragment:lg,colorspace_pars_fragment:cg,envmap_fragment:hg,envmap_common_pars_fragment:ug,envmap_pars_fragment:dg,envmap_pars_vertex:fg,envmap_physical_pars_fragment:wg,envmap_vertex:pg,fog_vertex:mg,fog_pars_vertex:gg,fog_fragment:_g,fog_pars_fragment:xg,gradientmap_pars_fragment:vg,lightmap_pars_fragment:yg,lights_lambert_fragment:Mg,lights_lambert_pars_fragment:Sg,lights_pars_begin:bg,lights_toon_fragment:Tg,lights_toon_pars_fragment:Eg,lights_phong_fragment:Ag,lights_phong_pars_fragment:Rg,lights_physical_fragment:Cg,lights_physical_pars_fragment:Pg,lights_fragment_begin:Ig,lights_fragment_maps:Lg,lights_fragment_end:Dg,lightprobes_pars_fragment:Ng,logdepthbuf_fragment:Ug,logdepthbuf_pars_fragment:Og,logdepthbuf_pars_vertex:Fg,logdepthbuf_vertex:Bg,map_fragment:kg,map_pars_fragment:zg,map_particle_fragment:Hg,map_particle_pars_fragment:Vg,metalnessmap_fragment:Gg,metalnessmap_pars_fragment:Wg,morphinstance_vertex:Xg,morphcolor_vertex:Yg,morphnormal_vertex:qg,morphtarget_pars_vertex:Kg,morphtarget_vertex:Zg,normal_fragment_begin:Jg,normal_fragment_maps:$g,normal_pars_fragment:jg,normal_pars_vertex:Qg,normal_vertex:t_,normalmap_pars_fragment:e_,clearcoat_normal_fragment_begin:n_,clearcoat_normal_fragment_maps:i_,clearcoat_pars_fragment:s_,iridescence_pars_fragment:r_,opaque_fragment:a_,packing:o_,premultiplied_alpha_fragment:l_,project_vertex:c_,dithering_fragment:h_,dithering_pars_fragment:u_,roughnessmap_fragment:d_,roughnessmap_pars_fragment:f_,shadowmap_pars_fragment:p_,shadowmap_pars_vertex:m_,shadowmap_vertex:g_,shadowmask_pars_fragment:__,skinbase_vertex:x_,skinning_pars_vertex:v_,skinning_vertex:y_,skinnormal_vertex:M_,specularmap_fragment:S_,specularmap_pars_fragment:b_,tonemapping_fragment:w_,tonemapping_pars_fragment:T_,transmission_fragment:E_,transmission_pars_fragment:A_,uv_pars_fragment:R_,uv_pars_vertex:C_,uv_vertex:P_,worldpos_vertex:I_,background_vert:L_,background_frag:D_,backgroundCube_vert:N_,backgroundCube_frag:U_,cube_vert:O_,cube_frag:F_,depth_vert:B_,depth_frag:k_,distance_vert:z_,distance_frag:H_,equirect_vert:V_,equirect_frag:G_,linedashed_vert:W_,linedashed_frag:X_,meshbasic_vert:Y_,meshbasic_frag:q_,meshlambert_vert:K_,meshlambert_frag:Z_,meshmatcap_vert:J_,meshmatcap_frag:$_,meshnormal_vert:j_,meshnormal_frag:Q_,meshphong_vert:tx,meshphong_frag:ex,meshphysical_vert:nx,meshphysical_frag:ix,meshtoon_vert:sx,meshtoon_frag:rx,points_vert:ax,points_frag:ox,shadow_vert:lx,shadow_frag:cx,sprite_vert:hx,sprite_frag:ux},ut={common:{diffuse:{value:new St(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Nt},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Nt}},envmap:{envMap:{value:null},envMapRotation:{value:new Nt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Nt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Nt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Nt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Nt},normalScale:{value:new it(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Nt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Nt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Nt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Nt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new St(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new A},probesMax:{value:new A},probesResolution:{value:new A}},points:{diffuse:{value:new St(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0},uvTransform:{value:new Nt}},sprite:{diffuse:{value:new St(16777215)},opacity:{value:1},center:{value:new it(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Nt},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0}}},In={basic:{uniforms:$e([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.fog]),vertexShader:kt.meshbasic_vert,fragmentShader:kt.meshbasic_frag},lambert:{uniforms:$e([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,ut.lights,{emissive:{value:new St(0)},envMapIntensity:{value:1}}]),vertexShader:kt.meshlambert_vert,fragmentShader:kt.meshlambert_frag},phong:{uniforms:$e([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,ut.lights,{emissive:{value:new St(0)},specular:{value:new St(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:kt.meshphong_vert,fragmentShader:kt.meshphong_frag},standard:{uniforms:$e([ut.common,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.roughnessmap,ut.metalnessmap,ut.fog,ut.lights,{emissive:{value:new St(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:kt.meshphysical_vert,fragmentShader:kt.meshphysical_frag},toon:{uniforms:$e([ut.common,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.gradientmap,ut.fog,ut.lights,{emissive:{value:new St(0)}}]),vertexShader:kt.meshtoon_vert,fragmentShader:kt.meshtoon_frag},matcap:{uniforms:$e([ut.common,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,{matcap:{value:null}}]),vertexShader:kt.meshmatcap_vert,fragmentShader:kt.meshmatcap_frag},points:{uniforms:$e([ut.points,ut.fog]),vertexShader:kt.points_vert,fragmentShader:kt.points_frag},dashed:{uniforms:$e([ut.common,ut.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:kt.linedashed_vert,fragmentShader:kt.linedashed_frag},depth:{uniforms:$e([ut.common,ut.displacementmap]),vertexShader:kt.depth_vert,fragmentShader:kt.depth_frag},normal:{uniforms:$e([ut.common,ut.bumpmap,ut.normalmap,ut.displacementmap,{opacity:{value:1}}]),vertexShader:kt.meshnormal_vert,fragmentShader:kt.meshnormal_frag},sprite:{uniforms:$e([ut.sprite,ut.fog]),vertexShader:kt.sprite_vert,fragmentShader:kt.sprite_frag},background:{uniforms:{uvTransform:{value:new Nt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:kt.background_vert,fragmentShader:kt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Nt}},vertexShader:kt.backgroundCube_vert,fragmentShader:kt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:kt.cube_vert,fragmentShader:kt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:kt.equirect_vert,fragmentShader:kt.equirect_frag},distance:{uniforms:$e([ut.common,ut.displacementmap,{referencePosition:{value:new A},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:kt.distance_vert,fragmentShader:kt.distance_frag},shadow:{uniforms:$e([ut.lights,ut.fog,{color:{value:new St(0)},opacity:{value:1}}]),vertexShader:kt.shadow_vert,fragmentShader:kt.shadow_frag}};In.physical={uniforms:$e([In.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Nt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Nt},clearcoatNormalScale:{value:new it(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Nt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Nt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Nt},sheen:{value:0},sheenColor:{value:new St(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Nt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Nt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Nt},transmissionSamplerSize:{value:new it},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Nt},attenuationDistance:{value:0},attenuationColor:{value:new St(0)},specularColor:{value:new St(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Nt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Nt},anisotropyVector:{value:new it},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Nt}}]),vertexShader:kt.meshphysical_vert,fragmentShader:kt.meshphysical_frag};const ha={r:0,b:0,g:0},dx=new Dt,Xd=new Nt;Xd.set(-1,0,0,0,1,0,0,0,1);function fx(s,t,e,n,i,r){const a=new St(0);let o=i===!0?0:1,l,c,h=null,u=0,f=null;function d(M){let S=M.isScene===!0?M.background:null;if(S&&S.isTexture){const _=M.backgroundBlurriness>0;S=t.get(S,_)}return S}function p(M){let S=!1;const _=d(M);_===null?g(a,o):_&&_.isColor&&(g(_,1),S=!0);const T=s.xr.getEnvironmentBlendMode();T==="additive"?e.buffers.color.setClear(0,0,0,1,r):T==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(s.autoClear||S)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function x(M,S){const _=d(S);_&&(_.isCubeTexture||_.mapping===ka)?(c===void 0&&(c=new te(new Ui(1,1,1),new kn({name:"BackgroundCubeMaterial",uniforms:Ms(In.backgroundCube.uniforms),vertexShader:In.backgroundCube.vertexShader,fragmentShader:In.backgroundCube.fragmentShader,side:Ke,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(T,b,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=_,c.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(dx.makeRotationFromEuler(S.backgroundRotation)).transpose(),_.isCubeTexture&&_.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Xd),c.material.toneMapped=qt.getTransfer(_.colorSpace)!==ae,(h!==_||u!==_.version||f!==s.toneMapping)&&(c.material.needsUpdate=!0,h=_,u=_.version,f=s.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new te(new Oi(2,2),new kn({name:"BackgroundMaterial",uniforms:Ms(In.background.uniforms),vertexShader:In.background.vertexShader,fragmentShader:In.background.fragmentShader,side:mi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,l.material.toneMapped=qt.getTransfer(_.colorSpace)!==ae,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),(h!==_||u!==_.version||f!==s.toneMapping)&&(l.material.needsUpdate=!0,h=_,u=_.version,f=s.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null))}function g(M,S){M.getRGB(ha,Nd(s)),e.buffers.color.setClear(ha.r,ha.g,ha.b,S,r)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,S=1){a.set(M),o=S,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(M){o=M,g(a,o)},render:p,addToRenderList:x,dispose:m}}function px(s,t){const e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=f(null);let r=i,a=!1;function o(I,O,F,L,k){let K=!1;const Z=u(I,L,F,O);r!==Z&&(r=Z,c(r.object)),K=d(I,L,F,k),K&&p(I,L,F,k),k!==null&&t.update(k,s.ELEMENT_ARRAY_BUFFER),(K||a)&&(a=!1,_(I,O,F,L),k!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(k).buffer))}function l(){return s.createVertexArray()}function c(I){return s.bindVertexArray(I)}function h(I){return s.deleteVertexArray(I)}function u(I,O,F,L){const k=L.wireframe===!0;let K=n[O.id];K===void 0&&(K={},n[O.id]=K);const Z=I.isInstancedMesh===!0?I.id:0;let nt=K[Z];nt===void 0&&(nt={},K[Z]=nt);let X=nt[F.id];X===void 0&&(X={},nt[F.id]=X);let Q=X[k];return Q===void 0&&(Q=f(l()),X[k]=Q),Q}function f(I){const O=[],F=[],L=[];for(let k=0;k<e;k++)O[k]=0,F[k]=0,L[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:F,attributeDivisors:L,object:I,attributes:{},index:null}}function d(I,O,F,L){const k=r.attributes,K=O.attributes;let Z=0;const nt=F.getAttributes();for(const X in nt)if(nt[X].location>=0){const et=k[X];let Pt=K[X];if(Pt===void 0&&(X==="instanceMatrix"&&I.instanceMatrix&&(Pt=I.instanceMatrix),X==="instanceColor"&&I.instanceColor&&(Pt=I.instanceColor)),et===void 0||et.attribute!==Pt||Pt&&et.data!==Pt.data)return!0;Z++}return r.attributesNum!==Z||r.index!==L}function p(I,O,F,L){const k={},K=O.attributes;let Z=0;const nt=F.getAttributes();for(const X in nt)if(nt[X].location>=0){let et=K[X];et===void 0&&(X==="instanceMatrix"&&I.instanceMatrix&&(et=I.instanceMatrix),X==="instanceColor"&&I.instanceColor&&(et=I.instanceColor));const Pt={};Pt.attribute=et,et&&et.data&&(Pt.data=et.data),k[X]=Pt,Z++}r.attributes=k,r.attributesNum=Z,r.index=L}function x(){const I=r.newAttributes;for(let O=0,F=I.length;O<F;O++)I[O]=0}function g(I){m(I,0)}function m(I,O){const F=r.newAttributes,L=r.enabledAttributes,k=r.attributeDivisors;F[I]=1,L[I]===0&&(s.enableVertexAttribArray(I),L[I]=1),k[I]!==O&&(s.vertexAttribDivisor(I,O),k[I]=O)}function M(){const I=r.newAttributes,O=r.enabledAttributes;for(let F=0,L=O.length;F<L;F++)O[F]!==I[F]&&(s.disableVertexAttribArray(F),O[F]=0)}function S(I,O,F,L,k,K,Z){Z===!0?s.vertexAttribIPointer(I,O,F,k,K):s.vertexAttribPointer(I,O,F,L,k,K)}function _(I,O,F,L){x();const k=L.attributes,K=F.getAttributes(),Z=O.defaultAttributeValues;for(const nt in K){const X=K[nt];if(X.location>=0){let Q=k[nt];if(Q===void 0&&(nt==="instanceMatrix"&&I.instanceMatrix&&(Q=I.instanceMatrix),nt==="instanceColor"&&I.instanceColor&&(Q=I.instanceColor)),Q!==void 0){const et=Q.normalized,Pt=Q.itemSize,Rt=t.get(Q);if(Rt===void 0)continue;const pe=Rt.buffer,Jt=Rt.type,ee=Rt.bytesPerElement,Y=Jt===s.INT||Jt===s.UNSIGNED_INT||Q.gpuType===Wl;if(Q.isInterleavedBufferAttribute){const j=Q.data,xt=j.stride,Ut=Q.offset;if(j.isInstancedInterleavedBuffer){for(let gt=0;gt<X.locationSize;gt++)m(X.location+gt,j.meshPerAttribute);I.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let gt=0;gt<X.locationSize;gt++)g(X.location+gt);s.bindBuffer(s.ARRAY_BUFFER,pe);for(let gt=0;gt<X.locationSize;gt++)S(X.location+gt,Pt/X.locationSize,Jt,et,xt*ee,(Ut+Pt/X.locationSize*gt)*ee,Y)}else{if(Q.isInstancedBufferAttribute){for(let j=0;j<X.locationSize;j++)m(X.location+j,Q.meshPerAttribute);I.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let j=0;j<X.locationSize;j++)g(X.location+j);s.bindBuffer(s.ARRAY_BUFFER,pe);for(let j=0;j<X.locationSize;j++)S(X.location+j,Pt/X.locationSize,Jt,et,Pt*ee,Pt/X.locationSize*j*ee,Y)}}else if(Z!==void 0){const et=Z[nt];if(et!==void 0)switch(et.length){case 2:s.vertexAttrib2fv(X.location,et);break;case 3:s.vertexAttrib3fv(X.location,et);break;case 4:s.vertexAttrib4fv(X.location,et);break;default:s.vertexAttrib1fv(X.location,et)}}}}M()}function T(){E();for(const I in n){const O=n[I];for(const F in O){const L=O[F];for(const k in L){const K=L[k];for(const Z in K)h(K[Z].object),delete K[Z];delete L[k]}}delete n[I]}}function b(I){if(n[I.id]===void 0)return;const O=n[I.id];for(const F in O){const L=O[F];for(const k in L){const K=L[k];for(const Z in K)h(K[Z].object),delete K[Z];delete L[k]}}delete n[I.id]}function R(I){for(const O in n){const F=n[O];for(const L in F){const k=F[L];if(k[I.id]===void 0)continue;const K=k[I.id];for(const Z in K)h(K[Z].object),delete K[Z];delete k[I.id]}}}function v(I){for(const O in n){const F=n[O],L=I.isInstancedMesh===!0?I.id:0,k=F[L];if(k!==void 0){for(const K in k){const Z=k[K];for(const nt in Z)h(Z[nt].object),delete Z[nt];delete k[K]}delete F[L],Object.keys(F).length===0&&delete n[O]}}}function E(){P(),a=!0,r!==i&&(r=i,c(r.object))}function P(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:E,resetDefaultState:P,dispose:T,releaseStatesOfGeometry:b,releaseStatesOfObject:v,releaseStatesOfProgram:R,initAttributes:x,enableAttribute:g,disableUnusedAttributes:M}}function mx(s,t,e){let n;function i(l){n=l}function r(l,c){s.drawArrays(n,l,c),e.update(c,n,1)}function a(l,c,h){h!==0&&(s.drawArraysInstanced(n,l,c,h),e.update(c,n,h))}function o(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let f=0;for(let d=0;d<h;d++)f+=c[d];e.update(f,n,1)}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function gx(s,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const R=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(R){return!(R!==pn&&n.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){const v=R===Bn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==an&&R!==fn&&!v&&n.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE))}function l(R){if(R==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(Tt("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,f=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&f===!1&&Tt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const d=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),p=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),m=s.getParameter(s.MAX_VERTEX_ATTRIBS),M=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),S=s.getParameter(s.MAX_VARYING_VECTORS),_=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),T=s.getParameter(s.MAX_SAMPLES),b=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:p,maxTextureSize:x,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:M,maxVaryings:S,maxFragmentUniforms:_,maxSamples:T,samples:b}}function _x(s){const t=this;let e=null,n=0,i=!1,r=!1;const a=new Zn,o=new Nt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const d=u.length!==0||f||n!==0||i;return i=f,n=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,d){const p=u.clippingPlanes,x=u.clipIntersection,g=u.clipShadows,m=s.get(u);if(!i||p===null||p.length===0||r&&!g)r?h(null):c();else{const M=r?0:n,S=M*4;let _=m.clippingState||null;l.value=_,_=h(p,f,S,d);for(let T=0;T!==S;++T)_[T]=e[T];m.clippingState=_,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,f,d,p){const x=u!==null?u.length:0;let g=null;if(x!==0){if(g=l.value,p!==!0||g===null){const m=d+x*4,M=f.matrixWorldInverse;o.getNormalMatrix(M),(g===null||g.length<m)&&(g=new Float32Array(m));for(let S=0,_=d;S!==x;++S,_+=4)a.copy(u[S]).applyMatrix4(M,o),a.normal.toArray(g,_),g[_+3]=a.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,g}}const cs=4,xx=6,vx=20,yx=256,zs=new Xa,Oh=new St;let Io=null,Lo=0,Do=0,No=!1;const Mx=new A,Si=new A;class Fh{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,i=100,r={}){const{size:a=256,position:o=Mx}=r;Io=this._renderer.getRenderTarget(),Lo=this._renderer.getActiveCubeFace(),Do=this._renderer.getActiveMipmapLevel(),No=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,i,l,o),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=zh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=kh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Io,Lo,Do),this._renderer.xr.enabled=No,t.scissorTest=!1,is(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Ci||t.mapping===xs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Io=this._renderer.getRenderTarget(),Lo=this._renderer.getActiveCubeFace(),Do=this._renderer.getActiveMipmapLevel(),No=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Be,minFilter:Be,generateMipmaps:!1,type:Bn,format:pn,colorSpace:ln,depthBuffer:!1},i=Bh(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Bh(t,e,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Sx(r)),this._blurMaterial=wx(r,t,e),this._ggxMaterial=bx(r,t,e)}return i}_compileMaterial(t){const e=new te(new Qt,t);this._renderer.compile(e,zs)}_sceneToCubeUV(t,e,n,i,r){const l=new je(90,1,e,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,d=u.toneMapping;u.getClearColor(Oh),u.toneMapping=On,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(i),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new te(new Ui,new Ue({name:"PMREM.Background",side:Ke,depthWrite:!1,depthTest:!1})));const x=this._backgroundBox,g=x.material;let m=!1;const M=t.background;M?M.isColor&&(g.color.copy(M),t.background=null,m=!0):(g.color.copy(Oh),m=!0);for(let S=0;S<6;S++){const _=S%3;_===0?(l.up.set(0,c[S],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[S],r.y,r.z)):_===1?(l.up.set(0,0,c[S]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[S],r.z)):(l.up.set(0,c[S],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[S]));const T=this._cubeSize;is(i,_*T,S>2?T:0,T,T),u.setRenderTarget(i),m&&u.render(x,l),u.render(t,l)}u.toneMapping=d,u.autoClear=f,t.background=M}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===Ci||t.mapping===xs;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=zh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=kh());const r=i?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;is(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,zs)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodMeshes.length;for(let r=1;r<i;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=n}_applyGGXFilter(t,e,n){const i=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const l=a.uniforms,c=n/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),u=Math.sqrt(c*c-h*h),f=c*1.25,d=u*f,{_lodMax:p}=this,x=this._sizeLods[n],g=3*x*(n>p-cs?n-p+cs:0),m=4*(this._cubeSize-x);l.envMap.value=t.texture,l.roughness.value=d,l.mipInt.value=p-e,is(r,g,m,3*x,2*x),i.setRenderTarget(r),i.render(o,zs),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=p-n,is(t,g,m,3*x,2*x),i.setRenderTarget(t),i.render(o,zs)}_blur(t,e,n,i){const r=this._pingPongRenderTarget,a=Math.min(i,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,n,a),this._blurPass(r,t,n,n,a)}_blurPass(t,e,n,i,r){const a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[i];l.material=o;const c=o.uniforms;c.envMap.value=t.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-n;const h=this._sizeLods[i],u=3*h*(i>this._lodMax-cs?i-this._lodMax+cs:0),f=4*(this._cubeSize-h);is(e,u,f,3*h,2*h),a.setRenderTarget(e),a.render(l,zs)}}function Sx(s){const t=[],e=[];let n=s;const i=s-cs+1+xx;for(let r=0;r<i;r++){const a=Math.pow(2,n);t.push(a);const o=1/(a-2),l=-o,c=1+o,h=[l,l,c,l,c,c,l,l,c,c,l,c],u=6,f=6,d=3,p=new Float32Array(d*f*u),x=new Float32Array(d*f*u);for(let m=0;m<u;m++){const M=m%3*2/3-1,S=m>2?0:-1,_=[M,S,0,M+2/3,S,0,M+2/3,S+1,0,M,S,0,M+2/3,S+1,0,M,S+1,0];p.set(_,d*f*m);for(let T=0;T<f;T++){const b=h[T*2]*2-1,R=h[T*2+1]*2-1;m===0?Si.set(1,R,b):m===1?Si.set(-b,1,-R):m===2?Si.set(-b,R,1):m===3?Si.set(-1,R,-b):m===4?Si.set(-b,-1,R):Si.set(b,R,-1),Si.toArray(x,(m*f+T)*d)}}const g=new Qt;g.setAttribute("position",new Ce(p,d)),g.setAttribute("outputDirection",new Ce(x,d)),e.push(new te(g,null)),n>cs&&n--}return{lodMeshes:e,sizeLods:t}}function Bh(s,t,e){const n=new Mn(s,t,e);return n.texture.mapping=ka,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function is(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function bx(s,t,e){return new kn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:yx,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ya(),fragmentShader:`

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
		`,blending:jn,depthTest:!1,depthWrite:!1})}function wx(s,t,e){return new kn({name:"SphericalGaussianBlur",defines:{SAMPLES:vx,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Ya(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:jn,depthTest:!1,depthWrite:!1})}function kh(){return new kn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ya(),fragmentShader:`

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
		`,blending:jn,depthTest:!1,depthWrite:!1})}function zh(){return new kn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ya(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:jn,depthTest:!1,depthWrite:!1})}function Ya(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class Yd extends Mn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new bd(i),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Ui(5,5,5),r=new kn({name:"CubemapFromEquirect",uniforms:Ms(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ke,blending:jn});r.uniforms.tEquirect.value=e;const a=new te(i,r),o=e.minFilter;return e.minFilter===Jn&&(e.minFilter=Be),new d0(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,i=!0){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,i);t.setRenderTarget(r)}}function Tx(s){let t=new WeakMap,e=new WeakMap,n=null;function i(f,d=!1){return f==null?null:d?a(f):r(f)}function r(f){if(f&&f.isTexture){const d=f.mapping;if(d===$a||d===ja)if(t.has(f)){const p=t.get(f).texture;return o(p,f.mapping)}else{const p=f.image;if(p&&p.height>0){const x=new Yd(p.height);return x.fromEquirectangularTexture(s,f),t.set(f,x),f.addEventListener("dispose",c),o(x.texture,f.mapping)}else return null}}return f}function a(f){if(f&&f.isTexture){const d=f.mapping,p=d===$a||d===ja,x=d===Ci||d===xs;if(p||x){let g=e.get(f);const m=g!==void 0?g.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==m)return n===null&&(n=new Fh(s)),g=p?n.fromEquirectangular(f,g):n.fromCubemap(f,g),g.texture.pmremVersion=f.pmremVersion,e.set(f,g),g.texture;if(g!==void 0)return g.texture;{const M=f.image;return p&&M&&M.height>0||x&&M&&l(M)?(n===null&&(n=new Fh(s)),g=p?n.fromEquirectangular(f):n.fromCubemap(f),g.texture.pmremVersion=f.pmremVersion,e.set(f,g),f.addEventListener("dispose",h),g.texture):null}}}return f}function o(f,d){return d===$a?f.mapping=Ci:d===ja&&(f.mapping=xs),f}function l(f){let d=0;const p=6;for(let x=0;x<p;x++)f[x]!==void 0&&d++;return d===p}function c(f){const d=f.target;d.removeEventListener("dispose",c);const p=t.get(d);p!==void 0&&(t.delete(d),p.dispose())}function h(f){const d=f.target;d.removeEventListener("dispose",h);const p=e.get(d);p!==void 0&&(e.delete(d),p.dispose())}function u(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:u}}function Ex(s){const t={};function e(n){if(t[n]!==void 0)return t[n];const i=s.getExtension(n);return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&ds("WebGLRenderer: "+n+" extension not supported."),i}}}function Ax(s,t,e,n){const i={},r=new WeakMap;function a(u){const f=u.target;f.index!==null&&t.remove(f.index);for(const p in f.attributes)t.remove(f.attributes[p]);f.removeEventListener("dispose",a),delete i[f.id];const d=r.get(f);d&&(t.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function o(u,f){return i[f.id]===!0||(f.addEventListener("dispose",a),i[f.id]=!0,e.memory.geometries++),f}function l(u){const f=u.attributes;for(const d in f)t.update(f[d],s.ARRAY_BUFFER)}function c(u){const f=[],d=u.index,p=u.attributes.position;let x=0;if(p===void 0)return;if(d!==null){const M=d.array;x=d.version;for(let S=0,_=M.length;S<_;S+=3){const T=M[S+0],b=M[S+1],R=M[S+2];f.push(T,b,b,R,R,T)}}else{const M=p.array;x=p.version;for(let S=0,_=M.length/3-1;S<_;S+=3){const T=S+0,b=S+1,R=S+2;f.push(T,b,b,R,R,T)}}const g=new(p.count>=65535?gd:md)(f,1);g.version=x;const m=r.get(u);m&&t.remove(m),r.set(u,g)}function h(u){const f=r.get(u);if(f){const d=u.index;d!==null&&f.version<d.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function Rx(s,t,e){let n;function i(u){n=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function l(u,f){s.drawElements(n,f,r,u*a),e.update(f,n,1)}function c(u,f,d){d!==0&&(s.drawElementsInstanced(n,f,r,u*a,d),e.update(f,n,d))}function h(u,f,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,u,0,d);let x=0;for(let g=0;g<d;g++)x+=f[g];e.update(x,n,1)}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function Cx(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case s.TRIANGLES:e.triangles+=o*(r/3);break;case s.LINES:e.lines+=o*(r/2);break;case s.LINE_STRIP:e.lines+=o*(r-1);break;case s.LINE_LOOP:e.lines+=o*r;break;case s.POINTS:e.points+=o*r;break;default:Lt("WebGLInfo: Unknown draw mode:",a);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function Px(s,t,e){const n=new WeakMap,i=new ue;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let f=n.get(o);if(f===void 0||f.count!==u){let E=function(){R.dispose(),n.delete(o),o.removeEventListener("dispose",E)};f!==void 0&&f.texture.dispose();const d=o.morphAttributes.position!==void 0,p=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let S=0;d===!0&&(S=1),p===!0&&(S=2),x===!0&&(S=3);let _=o.attributes.position.count*S,T=1;_>t.maxTextureSize&&(T=Math.ceil(_/t.maxTextureSize),_=t.maxTextureSize);const b=new Float32Array(_*T*4*u),R=new fd(b,_,T,u);R.type=fn,R.needsUpdate=!0;const v=S*4;for(let P=0;P<u;P++){const I=g[P],O=m[P],F=M[P],L=_*T*4*P;for(let k=0;k<I.count;k++){const K=k*v;d===!0&&(i.fromBufferAttribute(I,k),b[L+K+0]=i.x,b[L+K+1]=i.y,b[L+K+2]=i.z,b[L+K+3]=0),p===!0&&(i.fromBufferAttribute(O,k),b[L+K+4]=i.x,b[L+K+5]=i.y,b[L+K+6]=i.z,b[L+K+7]=0),x===!0&&(i.fromBufferAttribute(F,k),b[L+K+8]=i.x,b[L+K+9]=i.y,b[L+K+10]=i.z,b[L+K+11]=F.itemSize===4?i.w:1)}}f={count:u,texture:R,size:new it(_,T)},n.set(o,f),o.addEventListener("dispose",E)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",a.morphTexture,e);else{let d=0;for(let x=0;x<c.length;x++)d+=c[x];const p=o.morphTargetsRelative?1:1-d;l.getUniforms().setValue(s,"morphTargetBaseInfluence",p),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(s,"morphTargetsTextureSize",f.size)}return{update:r}}function Ix(s,t,e,n,i){let r=new WeakMap;function a(c){const h=i.render.frame,u=c.geometry,f=t.get(c,u);if(r.get(f)!==h&&(t.update(f),r.set(f,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(e.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,s.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){const d=c.skeleton;r.get(d)!==h&&(d.update(),r.set(d,h))}return f}function o(){r=new WeakMap}function l(c){const h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:a,dispose:o}}const Lx={[Zu]:"LINEAR_TONE_MAPPING",[Ju]:"REINHARD_TONE_MAPPING",[$u]:"CINEON_TONE_MAPPING",[ju]:"ACES_FILMIC_TONE_MAPPING",[td]:"AGX_TONE_MAPPING",[ed]:"NEUTRAL_TONE_MAPPING",[Qu]:"CUSTOM_TONE_MAPPING"};function Dx(s,t,e,n,i,r){const a=new Mn(t,e,{type:s,depthBuffer:i,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,l=null;const c=new Qt;c.setAttribute("position",new Ht([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new Ht([0,2,0,0,2,0],2));const h=new Gm({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),u=new te(c,h),f=new Xa(-1,1,1,-1,0,1);let d=null,p=null,x=!1,g,m=null,M=[],S=!1;this.setSize=function(_,T){a.setSize(_,T),o!==null&&o.setSize(_,T),l!==null&&l.setSize(_,T);for(let b=0;b<M.length;b++){const R=M[b];R.setSize&&R.setSize(_,T)}},this.setEffects=function(_){M=_,S=M.length>0&&M[0].isRenderPass===!0;const T=a.width,b=a.height;M.length>0&&o===null&&(o=new Mn(T,b,{type:Bn,depthBuffer:!1,stencilBuffer:!1}),l=new Mn(T,b,{type:Bn,depthBuffer:!1,stencilBuffer:!1}));for(let R=0;R<M.length;R++){const v=M[R];v.setSize&&v.setSize(T,b)}},this.begin=function(_,T){if(x||_.toneMapping===On&&M.length===0)return!1;if(m=T,T!==null){const b=T.width,R=T.height;(a.width!==b||a.height!==R)&&this.setSize(b,R)}return S===!1&&_.setRenderTarget(a),g=_.toneMapping,_.toneMapping=On,!0},this.hasRenderPass=function(){return S},this.end=function(_,T){_.toneMapping=g,x=!0;let b=a,R=o;for(let v=0;v<M.length;v++){const E=M[v];E.enabled!==!1&&(E.render(_,R,b,T),E.needsSwap!==!1&&(b=R,R=R===o?l:o))}if(d!==_.outputColorSpace||p!==_.toneMapping){d=_.outputColorSpace,p=_.toneMapping,h.defines={},qt.getTransfer(d)===ae&&(h.defines.SRGB_TRANSFER="");const v=Lx[p];v&&(h.defines[v]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=b.texture,_.setRenderTarget(m),_.render(u,f),m=null,x=!1},this.isCompositing=function(){return x},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),h.dispose()}}const qd=new Ee,Ol=new yr(1,1),Kd=new fd,Zd=new Fp,Jd=new bd,Hh=[],Vh=[],Gh=new Float32Array(16),Wh=new Float32Array(9),Xh=new Float32Array(4);function Rs(s,t,e){const n=s[0];if(n<=0||n>0)return s;const i=t*e;let r=Hh[i];if(r===void 0&&(r=new Float32Array(i),Hh[i]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,s[a].toArray(r,o)}return r}function ke(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function ze(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function qa(s,t){let e=Vh[t];e===void 0&&(e=new Int32Array(t),Vh[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function Nx(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function Ux(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ke(e,t))return;s.uniform2fv(this.addr,t),ze(e,t)}}function Ox(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ke(e,t))return;s.uniform3fv(this.addr,t),ze(e,t)}}function Fx(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ke(e,t))return;s.uniform4fv(this.addr,t),ze(e,t)}}function Bx(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(ke(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),ze(e,t)}else{if(ke(e,n))return;Xh.set(n),s.uniformMatrix2fv(this.addr,!1,Xh),ze(e,n)}}function kx(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(ke(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),ze(e,t)}else{if(ke(e,n))return;Wh.set(n),s.uniformMatrix3fv(this.addr,!1,Wh),ze(e,n)}}function zx(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(ke(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),ze(e,t)}else{if(ke(e,n))return;Gh.set(n),s.uniformMatrix4fv(this.addr,!1,Gh),ze(e,n)}}function Hx(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function Vx(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ke(e,t))return;s.uniform2iv(this.addr,t),ze(e,t)}}function Gx(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ke(e,t))return;s.uniform3iv(this.addr,t),ze(e,t)}}function Wx(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ke(e,t))return;s.uniform4iv(this.addr,t),ze(e,t)}}function Xx(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function Yx(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ke(e,t))return;s.uniform2uiv(this.addr,t),ze(e,t)}}function qx(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ke(e,t))return;s.uniform3uiv(this.addr,t),ze(e,t)}}function Kx(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ke(e,t))return;s.uniform4uiv(this.addr,t),ze(e,t)}}function Zx(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(Ol.compareFunction=e.isReversedDepthBuffer()?Ql:jl,r=Ol):r=qd,e.setTexture2D(t||r,i)}function Jx(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||Zd,i)}function $x(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||Jd,i)}function jx(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||Kd,i)}function Qx(s){switch(s){case 5126:return Nx;case 35664:return Ux;case 35665:return Ox;case 35666:return Fx;case 35674:return Bx;case 35675:return kx;case 35676:return zx;case 5124:case 35670:return Hx;case 35667:case 35671:return Vx;case 35668:case 35672:return Gx;case 35669:case 35673:return Wx;case 5125:return Xx;case 36294:return Yx;case 36295:return qx;case 36296:return Kx;case 35678:case 36198:case 36298:case 36306:case 35682:return Zx;case 35679:case 36299:case 36307:return Jx;case 35680:case 36300:case 36308:case 36293:return $x;case 36289:case 36303:case 36311:case 36292:return jx}}function tv(s,t){s.uniform1fv(this.addr,t)}function ev(s,t){const e=Rs(t,this.size,2);s.uniform2fv(this.addr,e)}function nv(s,t){const e=Rs(t,this.size,3);s.uniform3fv(this.addr,e)}function iv(s,t){const e=Rs(t,this.size,4);s.uniform4fv(this.addr,e)}function sv(s,t){const e=Rs(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function rv(s,t){const e=Rs(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function av(s,t){const e=Rs(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function ov(s,t){s.uniform1iv(this.addr,t)}function lv(s,t){s.uniform2iv(this.addr,t)}function cv(s,t){s.uniform3iv(this.addr,t)}function hv(s,t){s.uniform4iv(this.addr,t)}function uv(s,t){s.uniform1uiv(this.addr,t)}function dv(s,t){s.uniform2uiv(this.addr,t)}function fv(s,t){s.uniform3uiv(this.addr,t)}function pv(s,t){s.uniform4uiv(this.addr,t)}function mv(s,t,e){const n=this.cache,i=t.length,r=qa(e,i);ke(n,r)||(s.uniform1iv(this.addr,r),ze(n,r));let a;this.type===s.SAMPLER_2D_SHADOW?a=Ol:a=qd;for(let o=0;o!==i;++o)e.setTexture2D(t[o]||a,r[o])}function gv(s,t,e){const n=this.cache,i=t.length,r=qa(e,i);ke(n,r)||(s.uniform1iv(this.addr,r),ze(n,r));for(let a=0;a!==i;++a)e.setTexture3D(t[a]||Zd,r[a])}function _v(s,t,e){const n=this.cache,i=t.length,r=qa(e,i);ke(n,r)||(s.uniform1iv(this.addr,r),ze(n,r));for(let a=0;a!==i;++a)e.setTextureCube(t[a]||Jd,r[a])}function xv(s,t,e){const n=this.cache,i=t.length,r=qa(e,i);ke(n,r)||(s.uniform1iv(this.addr,r),ze(n,r));for(let a=0;a!==i;++a)e.setTexture2DArray(t[a]||Kd,r[a])}function vv(s){switch(s){case 5126:return tv;case 35664:return ev;case 35665:return nv;case 35666:return iv;case 35674:return sv;case 35675:return rv;case 35676:return av;case 5124:case 35670:return ov;case 35667:case 35671:return lv;case 35668:case 35672:return cv;case 35669:case 35673:return hv;case 5125:return uv;case 36294:return dv;case 36295:return fv;case 36296:return pv;case 35678:case 36198:case 36298:case 36306:case 35682:return mv;case 35679:case 36299:case 36307:return gv;case 35680:case 36300:case 36308:case 36293:return _v;case 36289:case 36303:case 36311:case 36292:return xv}}class yv{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Qx(e.type)}}class Mv{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=vv(e.type)}}class Sv{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let r=0,a=i.length;r!==a;++r){const o=i[r];o.setValue(t,e[o.id],n)}}}const Uo=/(\w+)(\])?(\[|\.)?/g;function Yh(s,t){s.seq.push(t),s.map[t.id]=t}function bv(s,t,e){const n=s.name,i=n.length;for(Uo.lastIndex=0;;){const r=Uo.exec(n),a=Uo.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){Yh(e,c===void 0?new yv(o,s,t):new Mv(o,s,t));break}else{let u=e.map[o];u===void 0&&(u=new Sv(o),Yh(e,u)),e=u}}}class Aa{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=t.getActiveUniform(e,a),l=t.getUniformLocation(e,o.name);bv(o,l,this)}const i=[],r=[];for(const a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?i.push(a):r.push(a);i.length>0&&(this.seq=i.concat(r))}setValue(t,e,n,i){const r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,r=t.length;i!==r;++i){const a=t[i];a.id in e&&n.push(a)}return n}}function qh(s,t,e){const n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}const wv=37297;let Tv=0;function Ev(s,t){const e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=i;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const Kh=new Nt;function Av(s){qt._getMatrix(Kh,qt.workingColorSpace,s);const t=`mat3( ${Kh.elements.map(e=>e.toFixed(4))} )`;switch(qt.getTransfer(s)){case Da:return[t,"LinearTransferOETF"];case ae:return[t,"sRGBTransferOETF"];default:return Tt("WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function Zh(s,t,e){const n=s.getShaderParameter(t,s.COMPILE_STATUS),r=(s.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+Ev(s.getShaderSource(t),o)}else return r}function Rv(s,t){const e=Av(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}const Cv={[Zu]:"Linear",[Ju]:"Reinhard",[$u]:"Cineon",[ju]:"ACESFilmic",[td]:"AgX",[ed]:"Neutral",[Qu]:"Custom"};function Pv(s,t){const e=Cv[t];return e===void 0?(Tt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const ua=new A;function Iv(){qt.getLuminanceCoefficients(ua);const s=ua.x.toFixed(4),t=ua.y.toFixed(4),e=ua.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Lv(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(js).join(`
`)}function Dv(s){const t=[];for(const e in s){const n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Nv(s,t){const e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(t,i),a=r.name;let o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:s.getAttribLocation(t,a),locationSize:o}}return e}function js(s){return s!==""}function Jh(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function $h(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Uv=/^[ \t]*#include +<([\w\d./]+)>/gm;function Fl(s){return s.replace(Uv,Fv)}const Ov=new Map;function Fv(s,t){let e=kt[t];if(e===void 0){const n=Ov.get(t);if(n!==void 0)e=kt[n],Tt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return Fl(e)}const Bv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function jh(s){return s.replace(Bv,kv)}function kv(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Qh(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}const zv={[ya]:"SHADOWMAP_TYPE_PCF",[Zs]:"SHADOWMAP_TYPE_VSM"};function Hv(s){return zv[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Vv={[Ci]:"ENVMAP_TYPE_CUBE",[xs]:"ENVMAP_TYPE_CUBE",[ka]:"ENVMAP_TYPE_CUBE_UV"};function Gv(s){return s.envMap===!1?"ENVMAP_TYPE_CUBE":Vv[s.envMapMode]||"ENVMAP_TYPE_CUBE"}const Wv={[xs]:"ENVMAP_MODE_REFRACTION"};function Xv(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":Wv[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Yv={[Gl]:"ENVMAP_BLENDING_MULTIPLY",[Zf]:"ENVMAP_BLENDING_MIX",[Jf]:"ENVMAP_BLENDING_ADD"};function qv(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":Yv[s.combine]||"ENVMAP_BLENDING_NONE"}function Kv(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Zv(s,t,e,n){const i=s.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=Hv(e),c=Gv(e),h=Xv(e),u=qv(e),f=Kv(e),d=Lv(e),p=Dv(r),x=i.createProgram();let g,m,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(js).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(js).join(`
`),m.length>0&&(m+=`
`)):(g=[Qh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(js).join(`
`),m=[Qh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==On?"#define TONE_MAPPING":"",e.toneMapping!==On?kt.tonemapping_pars_fragment:"",e.toneMapping!==On?Pv("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",kt.colorspace_pars_fragment,Rv("linearToOutputTexel",e.outputColorSpace),Iv(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(js).join(`
`)),a=Fl(a),a=Jh(a,e),a=$h(a,e),o=Fl(o),o=Jh(o,e),o=$h(o,e),a=jh(a),o=jh(o),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,g=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",e.glslVersion===Fc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Fc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const S=M+g+a,_=M+m+o,T=qh(i,i.VERTEX_SHADER,S),b=qh(i,i.FRAGMENT_SHADER,_);i.attachShader(x,T),i.attachShader(x,b),e.index0AttributeName!==void 0?i.bindAttribLocation(x,0,e.index0AttributeName):e.hasPositionAttribute===!0&&i.bindAttribLocation(x,0,"position"),i.linkProgram(x);function R(I){if(s.debug.checkShaderErrors){const O=i.getProgramInfoLog(x)||"",F=i.getShaderInfoLog(T)||"",L=i.getShaderInfoLog(b)||"",k=O.trim(),K=F.trim(),Z=L.trim();let nt=!0,X=!0;if(i.getProgramParameter(x,i.LINK_STATUS)===!1)if(nt=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,x,T,b);else{const Q=Zh(i,T,"vertex"),et=Zh(i,b,"fragment");Lt("WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(x,i.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+k+`
`+Q+`
`+et)}else k!==""?Tt("WebGLProgram: Program Info Log:",k):(K===""||Z==="")&&(X=!1);X&&(I.diagnostics={runnable:nt,programLog:k,vertexShader:{log:K,prefix:g},fragmentShader:{log:Z,prefix:m}})}i.deleteShader(T),i.deleteShader(b),v=new Aa(i,x),E=Nv(i,x)}let v;this.getUniforms=function(){return v===void 0&&R(this),v};let E;this.getAttributes=function(){return E===void 0&&R(this),E};let P=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=i.getProgramParameter(x,wv)),P},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Tv++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=T,this.fragmentShader=b,this}let Jv=0;class $v{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){const i=this._getShaderCacheForMaterial(t);return i.has(e)===!1&&(i.add(e),e.usedTimes++),i.has(n)===!1&&(i.add(n),n.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new jv(t),e.set(t,n)),n}}class jv{constructor(t){this.id=Jv++,this.code=t,this.usedTimes=0}}function Qv(s){return s===Ii||s===Pa||s===Ia}function ty(s,t,e,n,i,r){const a=new nc,o=new $v,l=new Set,c=[],h=new Map,u=n.logarithmicDepthBuffer;let f=n.precision;const d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(v){return l.add(v),v===0?"uv":`uv${v}`}function x(v,E,P,I,O,F){const L=I.fog,k=O.geometry,K=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?I.environment:null,Z=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,nt=t.get(v.envMap||K,Z),X=nt&&nt.mapping===ka?nt.image.height:null,Q=d[v.type];v.precision!==null&&(f=n.getMaxPrecision(v.precision),f!==v.precision&&Tt("WebGLProgram.getParameters:",v.precision,"not supported, using",f,"instead."));const et=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,Pt=et!==void 0?et.length:0;let Rt=0;k.morphAttributes.position!==void 0&&(Rt=1),k.morphAttributes.normal!==void 0&&(Rt=2),k.morphAttributes.color!==void 0&&(Rt=3);let pe,Jt,ee,Y;if(Q){const ge=In[Q];pe=ge.vertexShader,Jt=ge.fragmentShader}else{pe=v.vertexShader,Jt=v.fragmentShader;const ge=o.getVertexShaderStage(v),ne=o.getFragmentShaderStage(v);o.update(v,ge,ne),ee=ge.id,Y=ne.id}const j=s.getRenderTarget(),xt=s.state.buffers.depth.getReversed(),Ut=O.isInstancedMesh===!0,gt=O.isBatchedMesh===!0,Vt=!!v.map,Oe=!!v.matcap,Xt=!!nt,jt=!!v.aoMap,me=!!v.lightMap,Kt=!!v.bumpMap&&v.wireframe===!1,Me=!!v.normalMap,He=!!v.displacementMap,Qe=!!v.emissiveMap,Se=!!v.metalnessMap,Ie=!!v.roughnessMap,U=v.anisotropy>0,Ge=v.clearcoat>0,re=v.dispersion>0,C=v.retroreflectivity>0,y=v.iridescence>0,B=v.sheen>0,V=v.transmission>0,W=U&&!!v.anisotropyMap,st=Ge&&!!v.clearcoatMap,rt=Ge&&!!v.clearcoatNormalMap,q=Ge&&!!v.clearcoatRoughnessMap,$=y&&!!v.iridescenceMap,at=y&&!!v.iridescenceThicknessMap,Et=B&&!!v.sheenColorMap,ht=B&&!!v.sheenRoughnessMap,ot=!!v.specularMap,At=!!v.specularColorMap,It=!!v.specularIntensityMap,Ot=V&&!!v.transmissionMap,N=V&&!!v.thicknessMap,lt=!!v.gradientMap,J=!!v.alphaMap,ct=v.alphaTest>0,pt=!!v.alphaHash,tt=!!v.extensions;let Ct=On;v.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(Ct=s.toneMapping);const bt={shaderID:Q,shaderType:v.type,shaderName:v.name,vertexShader:pe,fragmentShader:Jt,defines:v.defines,customVertexShaderID:ee,customFragmentShaderID:Y,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:f,batching:gt,batchingColor:gt&&O._colorsTexture!==null,instancing:Ut,instancingColor:Ut&&O.instanceColor!==null,instancingMorph:Ut&&O.morphTexture!==null,outputColorSpace:j===null?s.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:qt.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:Vt,matcap:Oe,envMap:Xt,envMapMode:Xt&&nt.mapping,envMapCubeUVHeight:X,aoMap:jt,lightMap:me,bumpMap:Kt,normalMap:Me,displacementMap:He,emissiveMap:Qe,normalMapObjectSpace:Me&&v.normalMapType===ip,normalMapTangentSpace:Me&&v.normalMapType===mr,packedNormalMap:Me&&v.normalMapType===mr&&Qv(v.normalMap.format),metalnessMap:Se,roughnessMap:Ie,anisotropy:U,anisotropyMap:W,clearcoat:Ge,clearcoatMap:st,clearcoatNormalMap:rt,clearcoatRoughnessMap:q,dispersion:re,retroreflection:C,iridescence:y,iridescenceMap:$,iridescenceThicknessMap:at,sheen:B,sheenColorMap:Et,sheenRoughnessMap:ht,specularMap:ot,specularColorMap:At,specularIntensityMap:It,transmission:V,transmissionMap:Ot,thicknessMap:N,gradientMap:lt,opaque:v.transparent===!1&&v.blending===Qs&&v.alphaToCoverage===!1,alphaMap:J,alphaTest:ct,alphaHash:pt,combine:v.combine,mapUv:Vt&&p(v.map.channel),aoMapUv:jt&&p(v.aoMap.channel),lightMapUv:me&&p(v.lightMap.channel),bumpMapUv:Kt&&p(v.bumpMap.channel),normalMapUv:Me&&p(v.normalMap.channel),displacementMapUv:He&&p(v.displacementMap.channel),emissiveMapUv:Qe&&p(v.emissiveMap.channel),metalnessMapUv:Se&&p(v.metalnessMap.channel),roughnessMapUv:Ie&&p(v.roughnessMap.channel),anisotropyMapUv:W&&p(v.anisotropyMap.channel),clearcoatMapUv:st&&p(v.clearcoatMap.channel),clearcoatNormalMapUv:rt&&p(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:q&&p(v.clearcoatRoughnessMap.channel),iridescenceMapUv:$&&p(v.iridescenceMap.channel),iridescenceThicknessMapUv:at&&p(v.iridescenceThicknessMap.channel),sheenColorMapUv:Et&&p(v.sheenColorMap.channel),sheenRoughnessMapUv:ht&&p(v.sheenRoughnessMap.channel),specularMapUv:ot&&p(v.specularMap.channel),specularColorMapUv:At&&p(v.specularColorMap.channel),specularIntensityMapUv:It&&p(v.specularIntensityMap.channel),transmissionMapUv:Ot&&p(v.transmissionMap.channel),thicknessMapUv:N&&p(v.thicknessMap.channel),alphaMapUv:J&&p(v.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(Me||U),vertexNormals:!!k.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!k.attributes.uv&&(Vt||J),fog:!!L,useFog:v.fog===!0,fogExp2:!!L&&L.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||k.attributes.normal===void 0&&Me===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:xt,skinning:O.isSkinnedMesh===!0,hasPositionAttribute:k.attributes.position!==void 0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:Pt,morphTextureStride:Rt,numSunLights:E.sun.length,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numSunLightShadows:E.sunShadowMap.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numLightProbeGrids:F.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:s.shadowMap.enabled&&P.length>0,shadowMapType:s.shadowMap.type,toneMapping:Ct,decodeVideoTexture:Vt&&v.map.isVideoTexture===!0&&qt.getTransfer(v.map.colorSpace)===ae,decodeVideoTextureEmissive:Qe&&v.emissiveMap.isVideoTexture===!0&&qt.getTransfer(v.emissiveMap.colorSpace)===ae,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===en,flipSided:v.side===Ke,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:tt&&v.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(tt&&v.extensions.multiDraw===!0||gt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return bt.vertexUv1s=l.has(1),bt.vertexUv2s=l.has(2),bt.vertexUv3s=l.has(3),l.clear(),bt}function g(v){const E=[];if(v.shaderID?E.push(v.shaderID):(E.push(v.customVertexShaderID),E.push(v.customFragmentShaderID)),v.defines!==void 0)for(const P in v.defines)E.push(P),E.push(v.defines[P]);return v.isRawShaderMaterial===!1&&(m(E,v),M(E,v),E.push(s.outputColorSpace)),E.push(v.customProgramCacheKey),E.join()}function m(v,E){v.push(E.precision),v.push(E.outputColorSpace),v.push(E.envMapMode),v.push(E.envMapCubeUVHeight),v.push(E.mapUv),v.push(E.alphaMapUv),v.push(E.lightMapUv),v.push(E.aoMapUv),v.push(E.bumpMapUv),v.push(E.normalMapUv),v.push(E.displacementMapUv),v.push(E.emissiveMapUv),v.push(E.metalnessMapUv),v.push(E.roughnessMapUv),v.push(E.anisotropyMapUv),v.push(E.clearcoatMapUv),v.push(E.clearcoatNormalMapUv),v.push(E.clearcoatRoughnessMapUv),v.push(E.iridescenceMapUv),v.push(E.iridescenceThicknessMapUv),v.push(E.sheenColorMapUv),v.push(E.sheenRoughnessMapUv),v.push(E.specularMapUv),v.push(E.specularColorMapUv),v.push(E.specularIntensityMapUv),v.push(E.transmissionMapUv),v.push(E.thicknessMapUv),v.push(E.combine),v.push(E.fogExp2),v.push(E.sizeAttenuation),v.push(E.morphTargetsCount),v.push(E.morphAttributeCount),v.push(E.numSunLights),v.push(E.numDirLights),v.push(E.numPointLights),v.push(E.numSpotLights),v.push(E.numSpotLightMaps),v.push(E.numHemiLights),v.push(E.numRectAreaLights),v.push(E.numSunLightShadows),v.push(E.numDirLightShadows),v.push(E.numPointLightShadows),v.push(E.numSpotLightShadows),v.push(E.numSpotLightShadowsWithMaps),v.push(E.numLightProbes),v.push(E.shadowMapType),v.push(E.toneMapping),v.push(E.numClippingPlanes),v.push(E.numClipIntersection),v.push(E.depthPacking)}function M(v,E){a.disableAll(),E.instancing&&a.enable(0),E.instancingColor&&a.enable(1),E.instancingMorph&&a.enable(2),E.matcap&&a.enable(3),E.envMap&&a.enable(4),E.normalMapObjectSpace&&a.enable(5),E.normalMapTangentSpace&&a.enable(6),E.clearcoat&&a.enable(7),E.iridescence&&a.enable(8),E.alphaTest&&a.enable(9),E.vertexColors&&a.enable(10),E.vertexAlphas&&a.enable(11),E.vertexUv1s&&a.enable(12),E.vertexUv2s&&a.enable(13),E.vertexUv3s&&a.enable(14),E.vertexTangents&&a.enable(15),E.anisotropy&&a.enable(16),E.alphaHash&&a.enable(17),E.batching&&a.enable(18),E.dispersion&&a.enable(19),E.retroreflection&&a.enable(24),E.batchingColor&&a.enable(20),E.gradientMap&&a.enable(21),E.packedNormalMap&&a.enable(22),E.vertexNormals&&a.enable(23),v.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reversedDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.decodeVideoTextureEmissive&&a.enable(20),E.alphaToCoverage&&a.enable(21),E.numLightProbeGrids>0&&a.enable(22),E.hasPositionAttribute&&a.enable(23),v.push(a.mask)}function S(v){const E=d[v.type];let P;if(E){const I=In[E];P=zm.clone(I.uniforms)}else P=v.uniforms;return P}function _(v,E){let P=h.get(E);return P!==void 0?++P.usedTimes:(P=new Zv(s,E,v,i),c.push(P),h.set(E,P)),P}function T(v){if(--v.usedTimes===0){const E=c.indexOf(v);c[E]=c[c.length-1],c.pop(),h.delete(v.cacheKey),v.destroy()}}function b(v){o.remove(v)}function R(){o.dispose()}return{getParameters:x,getProgramCacheKey:g,getUniforms:S,acquireProgram:_,releaseProgram:T,releaseShaderCache:b,programs:c,dispose:R}}function ey(){let s=new WeakMap;function t(a){return s.has(a)}function e(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,l){s.get(a)[o]=l}function r(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:r}}function ny(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.materialVariant!==t.materialVariant?s.materialVariant-t.materialVariant:s.z!==t.z?s.z-t.z:s.id-t.id}function tu(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function eu(){const s=[];let t=0;const e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function a(f){let d=0;return f.isInstancedMesh&&(d+=2),f.isSkinnedMesh&&(d+=1),d}function o(f,d,p,x,g,m){let M=s[t];return M===void 0?(M={id:f.id,object:f,geometry:d,material:p,materialVariant:a(f),groupOrder:x,renderOrder:f.renderOrder,z:g,group:m},s[t]=M):(M.id=f.id,M.object=f,M.geometry=d,M.material=p,M.materialVariant=a(f),M.groupOrder=x,M.renderOrder=f.renderOrder,M.z=g,M.group=m),t++,M}function l(f,d,p,x,g,m,M){M.reversedDepth===!0&&(g=-g);const S=o(f,d,p,x,g,m);p.transmission>0?n.push(S):p.transparent===!0?i.push(S):e.push(S)}function c(f,d,p,x,g,m){const M=o(f,d,p,x,g,m);p.transmission>0?n.unshift(M):p.transparent===!0?i.unshift(M):e.unshift(M)}function h(f,d){e.length>1&&e.sort(f||ny),n.length>1&&n.sort(d||tu),i.length>1&&i.sort(d||tu)}function u(){for(let f=t,d=s.length;f<d;f++){const p=s[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:l,unshift:c,finish:u,sort:h}}function iy(){let s=new WeakMap;function t(n,i){const r=s.get(n);let a;return r===void 0?(a=new eu,s.set(n,[a])):i>=r.length?(a=new eu,r.push(a)):a=r[i],a}function e(){s=new WeakMap}return{get:t,dispose:e}}function sy(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new A,color:new St};break;case"SpotLight":e={position:new A,direction:new A,color:new St,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new A,color:new St,distance:0,decay:0};break;case"HemisphereLight":e={direction:new A,skyColor:new St,groundColor:new St};break;case"RectAreaLight":e={color:new St,position:new A,halfWidth:new A,halfHeight:new A};break}return s[t.id]=e,e}}}function ry(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let ay=0;function oy(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function ly(s){const t=new sy,e=ry(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new A);const i=new A,r=new Dt,a=new Dt;function o(c){let h=0,u=0,f=0;for(let O=0;O<9;O++)n.probe[O].set(0,0,0);let d=0,p=0,x=0,g=0,m=0,M=0,S=0,_=0,T=0,b=0,R=0,v=0,E=0,P=0;c.sort(oy);for(let O=0,F=c.length;O<F;O++){const L=c[O],k=L.color,K=L.intensity,Z=L.distance;let nt=null;if(L.shadow&&L.shadow.map&&(L.shadow.map.texture.format===Ii?nt=L.shadow.map.texture:nt=L.shadow.map.depthTexture||L.shadow.map.texture),L.isAmbientLight)h+=k.r*K,u+=k.g*K,f+=k.b*K;else if(L.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(L.sh.coefficients[X],K);P++}else if(L.isSunLight){const X=t.get(L);if(X.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const Q=L.shadow,et=e.get(L);et.shadowIntensity=Q.intensity,et.shadowBias=Q.bias,et.shadowNormalBias=Q.normalBias,et.shadowRadius=Q.radius,et.shadowMapSize.copy(Q.mapSize).multiply(Q.getFrameExtents()),n.sunShadow[p]=et,n.sunShadowMap[p]=nt;const Pt=Q.getViewportCount();for(let Rt=0;Rt<Pt;Rt++)n.sunShadowMatrix[x+Rt]=Q.getMatrix(Rt),n.sunShadowCascade[x+Rt]=Q._cascadeData[Rt];x+=Pt,p++}n.sun[d]=X,d++}else if(L.isDirectionalLight){const X=t.get(L);if(X.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const Q=L.shadow,et=e.get(L);et.shadowIntensity=Q.intensity,et.shadowBias=Q.bias,et.shadowNormalBias=Q.normalBias,et.shadowRadius=Q.radius,et.shadowMapSize=Q.mapSize,n.directionalShadow[g]=et,n.directionalShadowMap[g]=nt,n.directionalShadowMatrix[g]=L.shadow.matrix,T++}n.directional[g]=X,g++}else if(L.isSpotLight){const X=t.get(L);X.position.setFromMatrixPosition(L.matrixWorld),X.color.copy(k).multiplyScalar(K),X.distance=Z,X.coneCos=Math.cos(L.angle),X.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),X.decay=L.decay,n.spot[M]=X;const Q=L.shadow;if(L.map&&(n.spotLightMap[v]=L.map,v++,Q.updateMatrices(L),L.castShadow&&E++),n.spotLightMatrix[M]=Q.matrix,L.castShadow){const et=e.get(L);et.shadowIntensity=Q.intensity,et.shadowBias=Q.bias,et.shadowNormalBias=Q.normalBias,et.shadowRadius=Q.radius,et.shadowMapSize=Q.mapSize,n.spotShadow[M]=et,n.spotShadowMap[M]=nt,R++}M++}else if(L.isRectAreaLight){const X=t.get(L);X.color.copy(k).multiplyScalar(K),X.halfWidth.set(L.width*.5,0,0),X.halfHeight.set(0,L.height*.5,0),n.rectArea[S]=X,S++}else if(L.isPointLight){const X=t.get(L);if(X.color.copy(L.color).multiplyScalar(L.intensity),X.distance=L.distance,X.decay=L.decay,L.castShadow){const Q=L.shadow,et=e.get(L);et.shadowIntensity=Q.intensity,et.shadowBias=Q.bias,et.shadowNormalBias=Q.normalBias,et.shadowRadius=Q.radius,et.shadowMapSize=Q.mapSize,et.shadowCameraNear=Q.camera.near,et.shadowCameraFar=Q.camera.far,n.pointShadow[m]=et,n.pointShadowMap[m]=nt,n.pointShadowMatrix[m]=L.shadow.matrix,b++}n.point[m]=X,m++}else if(L.isHemisphereLight){const X=t.get(L);X.skyColor.copy(L.color).multiplyScalar(K),X.groundColor.copy(L.groundColor).multiplyScalar(K),n.hemi[_]=X,_++}}S>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ut.LTC_FLOAT_1,n.rectAreaLTC2=ut.LTC_FLOAT_2):(n.rectAreaLTC1=ut.LTC_HALF_1,n.rectAreaLTC2=ut.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;const I=n.hash;(I.sunLength!==d||I.directionalLength!==g||I.pointLength!==m||I.spotLength!==M||I.rectAreaLength!==S||I.hemiLength!==_||I.numSunShadows!==p||I.numDirectionalShadows!==T||I.numPointShadows!==b||I.numSpotShadows!==R||I.numSpotMaps!==v||I.numLightProbes!==P)&&(n.sun.length=d,n.directional.length=g,n.spot.length=M,n.rectArea.length=S,n.point.length=m,n.hemi.length=_,n.sunShadow.length=p,n.sunShadowMap.length=p,n.sunShadowMatrix.length=x,n.sunShadowCascade.length=x,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.directionalShadowMatrix.length=T,n.pointShadow.length=b,n.pointShadowMap.length=b,n.pointShadowMatrix.length=b,n.spotShadow.length=R,n.spotShadowMap.length=R,n.spotLightMatrix.length=R+v-E,n.spotLightMap.length=v,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=P,I.sunLength=d,I.directionalLength=g,I.pointLength=m,I.spotLength=M,I.rectAreaLength=S,I.hemiLength=_,I.numSunShadows=p,I.numDirectionalShadows=T,I.numPointShadows=b,I.numSpotShadows=R,I.numSpotMaps=v,I.numLightProbes=P,n.version=ay++)}function l(c,h){let u=0,f=0,d=0,p=0,x=0,g=0;const m=h.matrixWorldInverse;for(let M=0,S=c.length;M<S;M++){const _=c[M];if(_.isSunLight){const T=n.sun[u];T.direction.setFromMatrixPosition(_.matrixWorld),T.direction.transformDirection(m),u++}else if(_.isDirectionalLight){const T=n.directional[f];T.direction.setFromMatrixPosition(_.matrixWorld),i.setFromMatrixPosition(_.target.matrixWorld),T.direction.sub(i),T.direction.transformDirection(m),f++}else if(_.isSpotLight){const T=n.spot[p];T.position.setFromMatrixPosition(_.matrixWorld),T.position.applyMatrix4(m),T.direction.setFromMatrixPosition(_.matrixWorld),i.setFromMatrixPosition(_.target.matrixWorld),T.direction.sub(i),T.direction.transformDirection(m),p++}else if(_.isRectAreaLight){const T=n.rectArea[x];T.position.setFromMatrixPosition(_.matrixWorld),T.position.applyMatrix4(m),a.identity(),r.copy(_.matrixWorld),r.premultiply(m),a.extractRotation(r),T.halfWidth.set(_.width*.5,0,0),T.halfHeight.set(0,_.height*.5,0),T.halfWidth.applyMatrix4(a),T.halfHeight.applyMatrix4(a),x++}else if(_.isPointLight){const T=n.point[d];T.position.setFromMatrixPosition(_.matrixWorld),T.position.applyMatrix4(m),d++}else if(_.isHemisphereLight){const T=n.hemi[g];T.direction.setFromMatrixPosition(_.matrixWorld),T.direction.transformDirection(m),g++}}}return{setup:o,setupView:l,state:n}}function nu(s){const t=new ly(s),e=[],n=[],i=[];function r(f){u.camera=f,e.length=0,n.length=0,i.length=0}function a(f){e.push(f)}function o(f){n.push(f)}function l(f){i.push(f)}function c(){t.setup(e)}function h(f){t.setupView(e,f)}const u={lightsArray:e,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function cy(s){let t=new WeakMap;function e(i,r=0){const a=t.get(i);let o;return a===void 0?(o=new nu(s),t.set(i,[o])):r>=a.length?(o=new nu(s),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}const hy=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,uy=`uniform sampler2D shadow_pass;
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
}`,dy=[new A(1,0,0),new A(-1,0,0),new A(0,1,0),new A(0,-1,0),new A(0,0,1),new A(0,0,-1)],fy=[new A(0,-1,0),new A(0,-1,0),new A(0,0,1),new A(0,0,-1),new A(0,-1,0),new A(0,-1,0)],iu=new Dt,Hs=new A,Oo=new A;function py(s,t,e){let n=new sc;const i=new it,r=new it,a=new ue,o=new Wm,l=new Xm,c={},h=e.maxTextureSize,u={[mi]:Ke,[Ke]:mi,[en]:en},f=new kn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new it},radius:{value:4}},vertexShader:hy,fragmentShader:uy}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const p=new Qt;p.setAttribute("position",new Ce(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new te(p,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ya;let m=this.type;this.render=function(b,R,v){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||b.length===0)return;this.type===Pf&&(Tt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=ya);const E=s.getRenderTarget(),P=s.getActiveCubeFace(),I=s.getActiveMipmapLevel(),O=s.state;O.setBlending(jn),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const F=m!==this.type;F&&R.traverse(function(L){L.material&&(Array.isArray(L.material)?L.material.forEach(k=>k.needsUpdate=!0):L.material.needsUpdate=!0)});for(let L=0,k=b.length;L<k;L++){const K=b[L],Z=K.shadow;if(Z===void 0){Tt("WebGLShadowMap:",K,"has no shadow.");continue}if(Z.autoUpdate===!1&&Z.needsUpdate===!1)continue;i.copy(Z.mapSize);const nt=Z.getFrameExtents();i.multiply(nt),r.copy(Z.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/nt.x),i.x=r.x*nt.x,Z.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/nt.y),i.y=r.y*nt.y,Z.mapSize.y=r.y));const X=s.state.buffers.depth.getReversed();if(Z.camera._reversedDepth=X,Z.map===null||F===!0){if(Z.map!==null&&(Z.map.depthTexture!==null&&(Z.map.depthTexture.dispose(),Z.map.depthTexture=null),Z.map.dispose()),this.type===Zs){if(K.isPointLight){Tt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}Z.map=new Mn(i.x,i.y,{format:Ii,type:Bn,minFilter:Be,magFilter:Be,generateMipmaps:!1}),Z.map.texture.name=K.name+".shadowMap",Z.map.depthTexture=new yr(i.x,i.y,fn),Z.map.depthTexture.name=K.name+".shadowMapDepth",Z.map.depthTexture.format=ti,Z.map.depthTexture.compareFunction=null,Z.map.depthTexture.minFilter=Ne,Z.map.depthTexture.magFilter=Ne}else K.isPointLight?(Z.map=new Yd(i.x),Z.map.depthTexture=new am(i.x,Fn)):(Z.map=new Mn(i.x,i.y),Z.map.depthTexture=new yr(i.x,i.y,Fn)),Z.map.depthTexture.name=K.name+".shadowMap",Z.map.depthTexture.format=ti,this.type===ya?(Z.map.depthTexture.compareFunction=X?Ql:jl,Z.map.depthTexture.minFilter=Be,Z.map.depthTexture.magFilter=Be):(Z.map.depthTexture.compareFunction=null,Z.map.depthTexture.minFilter=Ne,Z.map.depthTexture.magFilter=Ne);Z.camera.updateProjectionMatrix()}Z.map.isWebGLCubeRenderTarget!==!0&&(Z.map.width!==i.x||Z.map.height!==i.y)&&Z.map.setSize(i.x,i.y);const Q=Z.map.isWebGLCubeRenderTarget?6:Z.getViewportCount();K.isPointLight!==!0&&Z.updateMatrices(K,v);for(let et=0;et<Q;et++){const Pt=Z.getCamera(et);if(K.isPointLight){const Rt=Z.camera,pe=Z.matrix,Jt=K.distance||Rt.far;Jt!==Rt.far&&(Rt.far=Jt,Rt.updateProjectionMatrix()),Hs.setFromMatrixPosition(K.matrixWorld),Rt.position.copy(Hs),Oo.copy(Rt.position),Oo.add(dy[et]),Rt.up.copy(fy[et]),Rt.lookAt(Oo),Rt.updateMatrixWorld(),pe.makeTranslation(-Hs.x,-Hs.y,-Hs.z),iu.multiplyMatrices(Rt.projectionMatrix,Rt.matrixWorldInverse),Z._frustum.setFromProjectionMatrix(iu,Rt.coordinateSystem,Rt.reversedDepth)}if(Z.map.isWebGLCubeRenderTarget)s.setRenderTarget(Z.map,et),s.clear();else{et===0&&(s.setRenderTarget(Z.map),s.clear());const Rt=Z.getViewport(et);a.set(r.x*Rt.x,r.y*Rt.y,r.x*Rt.z,r.y*Rt.w),O.viewport(a)}n=Z.getFrustum(et),_(R,v,Pt,K,this.type)}Z.isPointLightShadow!==!0&&this.type===Zs&&M(Z,v),Z.needsUpdate=!1}m=this.type,g.needsUpdate=!1,s.setRenderTarget(E,P,I)};function M(b,R){const v=t.update(x);f.defines.VSM_SAMPLES!==b.blurSamples&&(f.defines.VSM_SAMPLES=b.blurSamples,d.defines.VSM_SAMPLES=b.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),b.mapPass===null?b.mapPass=new Mn(i.x,i.y,{format:Ii,type:Bn}):(b.mapPass.width!==b.map.width||b.mapPass.height!==b.map.height)&&b.mapPass.setSize(b.map.width,b.map.height),f.uniforms.shadow_pass.value=b.map.depthTexture,f.uniforms.resolution.value.set(b.map.width,b.map.height),f.uniforms.radius.value=b.radius,s.setRenderTarget(b.mapPass),s.clear(),s.renderBufferDirect(R,null,v,f,x,null),d.uniforms.shadow_pass.value=b.mapPass.texture,d.uniforms.resolution.value.set(b.map.width,b.map.height),d.uniforms.radius.value=b.radius,s.setRenderTarget(b.map),s.clear(),s.renderBufferDirect(R,null,v,d,x,null)}function S(b,R,v,E){let P=null;const I=v.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(I!==void 0)P=I;else if(P=v.isPointLight===!0?l:o,s.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const O=P.uuid,F=R.uuid;let L=c[O];L===void 0&&(L={},c[O]=L);let k=L[F];k===void 0&&(k=P.clone(),L[F]=k,R.addEventListener("dispose",T)),P=k}if(P.visible=R.visible,P.wireframe=R.wireframe,E===Zs?P.side=R.shadowSide!==null?R.shadowSide:R.side:P.side=R.shadowSide!==null?R.shadowSide:u[R.side],P.alphaMap=R.alphaMap,P.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,P.map=R.map,P.clipShadows=R.clipShadows,P.clippingPlanes=R.clippingPlanes,P.clipIntersection=R.clipIntersection,P.displacementMap=R.displacementMap,P.displacementScale=R.displacementScale,P.displacementBias=R.displacementBias,P.wireframeLinewidth=R.wireframeLinewidth,P.linewidth=R.linewidth,v.isPointLight===!0&&P.isMeshDistanceMaterial===!0){const O=s.properties.get(P);O.light=v}return P}function _(b,R,v,E,P){if(b.visible===!1)return;if(b.layers.test(R.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&P===Zs)&&(!b.frustumCulled||b.intersectsFrustum(n))){b.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,b.matrixWorld);const F=t.update(b),L=b.material;if(Array.isArray(L)){const k=F.groups;for(let K=0,Z=k.length;K<Z;K++){const nt=k[K],X=L[nt.materialIndex];if(X&&X.visible){const Q=S(b,X,E,P);b.onBeforeShadow(s,b,R,v,F,Q,nt),s.renderBufferDirect(v,null,F,Q,b,nt),b.onAfterShadow(s,b,R,v,F,Q,nt)}}}else if(L.visible){const k=S(b,L,E,P);b.onBeforeShadow(s,b,R,v,F,k,null),s.renderBufferDirect(v,null,F,k,b,null),b.onAfterShadow(s,b,R,v,F,k,null)}}const O=b.children;for(let F=0,L=O.length;F<L;F++)_(O[F],R,v,E,P)}function T(b){b.target.removeEventListener("dispose",T);for(const v in c){const E=c[v],P=b.target.uuid;P in E&&(E[P].dispose(),delete E[P])}}}function my(s,t){function e(){let N=!1;const lt=new ue;let J=null;const ct=new ue(0,0,0,0);return{setMask:function(pt){J!==pt&&!N&&(s.colorMask(pt,pt,pt,pt),J=pt)},setLocked:function(pt){N=pt},setClear:function(pt,tt,Ct,bt,ge){ge===!0&&(pt*=bt,tt*=bt,Ct*=bt),lt.set(pt,tt,Ct,bt),ct.equals(lt)===!1&&(s.clearColor(pt,tt,Ct,bt),ct.copy(lt))},reset:function(){N=!1,J=null,ct.set(-1,0,0,0)}}}function n(){let N=!1,lt=!1,J=null,ct=null,pt=null;return{setReversed:function(tt){if(lt!==tt){const Ct=t.get("EXT_clip_control");tt?Ct.clipControlEXT(Ct.LOWER_LEFT_EXT,Ct.ZERO_TO_ONE_EXT):Ct.clipControlEXT(Ct.LOWER_LEFT_EXT,Ct.NEGATIVE_ONE_TO_ONE_EXT),lt=tt;const bt=pt;pt=null,this.setClear(bt)}},getReversed:function(){return lt},setTest:function(tt){tt?j(s.DEPTH_TEST):xt(s.DEPTH_TEST)},setMask:function(tt){J!==tt&&!N&&(s.depthMask(tt),J=tt)},setFunc:function(tt){if(lt&&(tt=mp[tt]),ct!==tt){switch(tt){case Ko:s.depthFunc(s.NEVER);break;case Zo:s.depthFunc(s.ALWAYS);break;case Jo:s.depthFunc(s.LESS);break;case hr:s.depthFunc(s.LEQUAL);break;case $o:s.depthFunc(s.EQUAL);break;case jo:s.depthFunc(s.GEQUAL);break;case Qo:s.depthFunc(s.GREATER);break;case tl:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}ct=tt}},setLocked:function(tt){N=tt},setClear:function(tt){pt!==tt&&(pt=tt,lt&&(tt=1-tt),s.clearDepth(tt))},reset:function(){N=!1,J=null,ct=null,pt=null,lt=!1}}}function i(){let N=!1,lt=null,J=null,ct=null,pt=null,tt=null,Ct=null,bt=null,ge=null;return{setTest:function(ne){N||(ne?j(s.STENCIL_TEST):xt(s.STENCIL_TEST))},setMask:function(ne){lt!==ne&&!N&&(s.stencilMask(ne),lt=ne)},setFunc:function(ne,gn,En){(J!==ne||ct!==gn||pt!==En)&&(s.stencilFunc(ne,gn,En),J=ne,ct=gn,pt=En)},setOp:function(ne,gn,En){(tt!==ne||Ct!==gn||bt!==En)&&(s.stencilOp(ne,gn,En),tt=ne,Ct=gn,bt=En)},setLocked:function(ne){N=ne},setClear:function(ne){ge!==ne&&(s.clearStencil(ne),ge=ne)},reset:function(){N=!1,lt=null,J=null,ct=null,pt=null,tt=null,Ct=null,bt=null,ge=null}}}const r=new e,a=new n,o=new i,l=new WeakMap,c=new WeakMap;let h={},u={},f={},d=new WeakMap,p=[],x=null,g=!1,m=null,M=null,S=null,_=null,T=null,b=null,R=null,v=new St(0,0,0),E=0,P=!1,I=null,O=null,F=null,L=null,k=null;const K=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Z=!1,nt=0;const X=s.getParameter(s.VERSION);X.indexOf("WebGL")!==-1?(nt=parseFloat(/^WebGL (\d)/.exec(X)[1]),Z=nt>=1):X.indexOf("OpenGL ES")!==-1&&(nt=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),Z=nt>=2);let Q=null,et={};const Pt=s.getParameter(s.SCISSOR_BOX),Rt=s.getParameter(s.VIEWPORT),pe=new ue().fromArray(Pt),Jt=new ue().fromArray(Rt);function ee(N,lt,J,ct){const pt=new Uint8Array(4),tt=s.createTexture();s.bindTexture(N,tt),s.texParameteri(N,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(N,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Ct=0;Ct<J;Ct++)N===s.TEXTURE_3D||N===s.TEXTURE_2D_ARRAY?s.texImage3D(lt,0,s.RGBA,1,1,ct,0,s.RGBA,s.UNSIGNED_BYTE,pt):s.texImage2D(lt+Ct,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,pt);return tt}const Y={};Y[s.TEXTURE_2D]=ee(s.TEXTURE_2D,s.TEXTURE_2D,1),Y[s.TEXTURE_CUBE_MAP]=ee(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),Y[s.TEXTURE_2D_ARRAY]=ee(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Y[s.TEXTURE_3D]=ee(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),j(s.DEPTH_TEST),a.setFunc(hr),Kt(!1),Me(Ic),j(s.CULL_FACE),jt(jn);function j(N){h[N]!==!0&&(s.enable(N),h[N]=!0)}function xt(N){h[N]!==!1&&(s.disable(N),h[N]=!1)}function Ut(N,lt){return f[N]!==lt?(s.bindFramebuffer(N,lt),f[N]=lt,N===s.DRAW_FRAMEBUFFER&&(f[s.FRAMEBUFFER]=lt),N===s.FRAMEBUFFER&&(f[s.DRAW_FRAMEBUFFER]=lt),!0):!1}function gt(N,lt){let J=p,ct=!1;if(N){J=d.get(lt),J===void 0&&(J=[],d.set(lt,J));const pt=N.textures;if(J.length!==pt.length||J[0]!==s.COLOR_ATTACHMENT0){for(let tt=0,Ct=pt.length;tt<Ct;tt++)J[tt]=s.COLOR_ATTACHMENT0+tt;J.length=pt.length,ct=!0}}else J[0]!==s.BACK&&(J[0]=s.BACK,ct=!0);ct&&s.drawBuffers(J)}function Vt(N){return x!==N?(s.useProgram(N),x=N,!0):!1}const Oe={[rs]:s.FUNC_ADD,[Lf]:s.FUNC_SUBTRACT,[Df]:s.FUNC_REVERSE_SUBTRACT};Oe[Nf]=s.MIN,Oe[Uf]=s.MAX;const Xt={[Of]:s.ZERO,[Ff]:s.ONE,[Bf]:s.SRC_COLOR,[qu]:s.SRC_ALPHA,[Wf]:s.SRC_ALPHA_SATURATE,[Vf]:s.DST_COLOR,[zf]:s.DST_ALPHA,[kf]:s.ONE_MINUS_SRC_COLOR,[Ku]:s.ONE_MINUS_SRC_ALPHA,[Gf]:s.ONE_MINUS_DST_COLOR,[Hf]:s.ONE_MINUS_DST_ALPHA,[Xf]:s.CONSTANT_COLOR,[Yf]:s.ONE_MINUS_CONSTANT_COLOR,[qf]:s.CONSTANT_ALPHA,[Kf]:s.ONE_MINUS_CONSTANT_ALPHA};function jt(N,lt,J,ct,pt,tt,Ct,bt,ge,ne){if(N===jn){g===!0&&(xt(s.BLEND),g=!1);return}if(g===!1&&(j(s.BLEND),g=!0),N!==If){if(N!==m||ne!==P){if((M!==rs||T!==rs)&&(s.blendEquation(s.FUNC_ADD),M=rs,T=rs),ne)switch(N){case Qs:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ra:s.blendFunc(s.ONE,s.ONE);break;case Lc:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Dc:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:Lt("WebGLState: Invalid blending: ",N);break}else switch(N){case Qs:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ra:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case Lc:Lt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Dc:Lt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Lt("WebGLState: Invalid blending: ",N);break}S=null,_=null,b=null,R=null,v.set(0,0,0),E=0,m=N,P=ne}return}pt=pt||lt,tt=tt||J,Ct=Ct||ct,(lt!==M||pt!==T)&&(s.blendEquationSeparate(Oe[lt],Oe[pt]),M=lt,T=pt),(J!==S||ct!==_||tt!==b||Ct!==R)&&(s.blendFuncSeparate(Xt[J],Xt[ct],Xt[tt],Xt[Ct]),S=J,_=ct,b=tt,R=Ct),(bt.equals(v)===!1||ge!==E)&&(s.blendColor(bt.r,bt.g,bt.b,ge),v.copy(bt),E=ge),m=N,P=!1}function me(N,lt){N.side===en?xt(s.CULL_FACE):j(s.CULL_FACE);let J=N.side===Ke;lt&&(J=!J),Kt(J),N.blending===Qs&&N.transparent===!1?jt(jn):jt(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),a.setFunc(N.depthFunc),a.setTest(N.depthTest),a.setMask(N.depthWrite),r.setMask(N.colorWrite);const ct=N.stencilWrite;o.setTest(ct),ct&&(o.setMask(N.stencilWriteMask),o.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),o.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),Qe(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?j(s.SAMPLE_ALPHA_TO_COVERAGE):xt(s.SAMPLE_ALPHA_TO_COVERAGE)}function Kt(N){I!==N&&(N?s.frontFace(s.CW):s.frontFace(s.CCW),I=N)}function Me(N){N!==Rf?(j(s.CULL_FACE),N!==O&&(N===Ic?s.cullFace(s.BACK):N===Cf?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):xt(s.CULL_FACE),O=N}function He(N){N!==F&&(Z&&s.lineWidth(N),F=N)}function Qe(N,lt,J){N?(j(s.POLYGON_OFFSET_FILL),(L!==lt||k!==J)&&(L=lt,k=J,a.getReversed()&&(lt=-lt),s.polygonOffset(lt,J))):xt(s.POLYGON_OFFSET_FILL)}function Se(N){N?j(s.SCISSOR_TEST):xt(s.SCISSOR_TEST)}function Ie(N){N===void 0&&(N=s.TEXTURE0+K-1),Q!==N&&(s.activeTexture(N),Q=N)}function U(N,lt,J){J===void 0&&(Q===null?J=s.TEXTURE0+K-1:J=Q);let ct=et[J];ct===void 0&&(ct={type:void 0,texture:void 0},et[J]=ct),(ct.type!==N||ct.texture!==lt)&&(Q!==J&&(s.activeTexture(J),Q=J),s.bindTexture(N,lt||Y[N]),ct.type=N,ct.texture=lt)}function Ge(){const N=et[Q];N!==void 0&&N.type!==void 0&&(s.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function re(){try{s.compressedTexImage2D(...arguments)}catch(N){Lt("WebGLState:",N)}}function C(){try{s.compressedTexImage3D(...arguments)}catch(N){Lt("WebGLState:",N)}}function y(){try{s.texSubImage2D(...arguments)}catch(N){Lt("WebGLState:",N)}}function B(){try{s.texSubImage3D(...arguments)}catch(N){Lt("WebGLState:",N)}}function V(){try{s.compressedTexSubImage2D(...arguments)}catch(N){Lt("WebGLState:",N)}}function W(){try{s.compressedTexSubImage3D(...arguments)}catch(N){Lt("WebGLState:",N)}}function st(){try{s.texStorage2D(...arguments)}catch(N){Lt("WebGLState:",N)}}function rt(){try{s.texStorage3D(...arguments)}catch(N){Lt("WebGLState:",N)}}function q(){try{s.texImage2D(...arguments)}catch(N){Lt("WebGLState:",N)}}function $(){try{s.texImage3D(...arguments)}catch(N){Lt("WebGLState:",N)}}function at(N){return u[N]!==void 0?u[N]:s.getParameter(N)}function Et(N,lt){u[N]!==lt&&(s.pixelStorei(N,lt),u[N]=lt)}function ht(N){pe.equals(N)===!1&&(s.scissor(N.x,N.y,N.z,N.w),pe.copy(N))}function ot(N){Jt.equals(N)===!1&&(s.viewport(N.x,N.y,N.z,N.w),Jt.copy(N))}function At(N,lt){let J=c.get(lt);J===void 0&&(J=new WeakMap,c.set(lt,J));let ct=J.get(N);ct===void 0&&(ct=s.getUniformBlockIndex(lt,N.name),J.set(N,ct))}function It(N,lt){const ct=c.get(lt).get(N);l.get(lt)!==ct&&(s.uniformBlockBinding(lt,ct,N.__bindingPointIndex),l.set(lt,ct))}function Ot(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),h={},u={},Q=null,et={},f={},d=new WeakMap,p=[],x=null,g=!1,m=null,M=null,S=null,_=null,T=null,b=null,R=null,v=new St(0,0,0),E=0,P=!1,I=null,O=null,F=null,L=null,k=null,pe.set(0,0,s.canvas.width,s.canvas.height),Jt.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:j,disable:xt,bindFramebuffer:Ut,drawBuffers:gt,useProgram:Vt,setBlending:jt,setMaterial:me,setFlipSided:Kt,setCullFace:Me,setLineWidth:He,setPolygonOffset:Qe,setScissorTest:Se,activeTexture:Ie,bindTexture:U,unbindTexture:Ge,compressedTexImage2D:re,compressedTexImage3D:C,texImage2D:q,texImage3D:$,pixelStorei:Et,getParameter:at,updateUBOMapping:At,uniformBlockBinding:It,texStorage2D:st,texStorage3D:rt,texSubImage2D:y,texSubImage3D:B,compressedTexSubImage2D:V,compressedTexSubImage3D:W,scissor:ht,viewport:ot,reset:Ot}}function gy(s,t,e,n,i,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new it,h=new WeakMap,u=new Set;let f;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(C,y){return p?new OffscreenCanvas(C,y):_r("canvas")}function g(C,y,B){let V=1;const W=re(C);if((W.width>B||W.height>B)&&(V=B/Math.max(W.width,W.height)),V<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const st=Math.floor(V*W.width),rt=Math.floor(V*W.height);f===void 0&&(f=x(st,rt));const q=y?x(st,rt):f;return q.width=st,q.height=rt,q.getContext("2d").drawImage(C,0,0,st,rt),Tt("WebGLRenderer: Texture has been resized from ("+W.width+"x"+W.height+") to ("+st+"x"+rt+")."),q}else return"data"in C&&Tt("WebGLRenderer: Image in DataTexture is too big ("+W.width+"x"+W.height+")."),C;return C}function m(C){return C.generateMipmaps}function M(C){s.generateMipmap(C)}function S(C){return C.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?s.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function _(C,y,B,V,W,st=!1){if(C!==null){if(s[C]!==void 0)return s[C];Tt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let rt;V&&(rt=t.get("EXT_texture_norm16"),rt||Tt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let q=y;if(y===s.RED&&(B===s.FLOAT&&(q=s.R32F),B===s.HALF_FLOAT&&(q=s.R16F),B===s.UNSIGNED_BYTE&&(q=s.R8),B===s.UNSIGNED_SHORT&&rt&&(q=rt.R16_EXT),B===s.SHORT&&rt&&(q=rt.R16_SNORM_EXT)),y===s.RED_INTEGER&&(B===s.UNSIGNED_BYTE&&(q=s.R8UI),B===s.UNSIGNED_SHORT&&(q=s.R16UI),B===s.UNSIGNED_INT&&(q=s.R32UI),B===s.BYTE&&(q=s.R8I),B===s.SHORT&&(q=s.R16I),B===s.INT&&(q=s.R32I)),y===s.RG&&(B===s.FLOAT&&(q=s.RG32F),B===s.HALF_FLOAT&&(q=s.RG16F),B===s.UNSIGNED_BYTE&&(q=s.RG8),B===s.UNSIGNED_SHORT&&rt&&(q=rt.RG16_EXT),B===s.SHORT&&rt&&(q=rt.RG16_SNORM_EXT)),y===s.RG_INTEGER&&(B===s.UNSIGNED_BYTE&&(q=s.RG8UI),B===s.UNSIGNED_SHORT&&(q=s.RG16UI),B===s.UNSIGNED_INT&&(q=s.RG32UI),B===s.BYTE&&(q=s.RG8I),B===s.SHORT&&(q=s.RG16I),B===s.INT&&(q=s.RG32I)),y===s.RGB_INTEGER&&(B===s.UNSIGNED_BYTE&&(q=s.RGB8UI),B===s.UNSIGNED_SHORT&&(q=s.RGB16UI),B===s.UNSIGNED_INT&&(q=s.RGB32UI),B===s.BYTE&&(q=s.RGB8I),B===s.SHORT&&(q=s.RGB16I),B===s.INT&&(q=s.RGB32I)),y===s.RGBA_INTEGER&&(B===s.UNSIGNED_BYTE&&(q=s.RGBA8UI),B===s.UNSIGNED_SHORT&&(q=s.RGBA16UI),B===s.UNSIGNED_INT&&(q=s.RGBA32UI),B===s.BYTE&&(q=s.RGBA8I),B===s.SHORT&&(q=s.RGBA16I),B===s.INT&&(q=s.RGBA32I)),y===s.RGB&&(B===s.UNSIGNED_SHORT&&rt&&(q=rt.RGB16_EXT),B===s.SHORT&&rt&&(q=rt.RGB16_SNORM_EXT),B===s.UNSIGNED_INT_5_9_9_9_REV&&(q=s.RGB9_E5),B===s.UNSIGNED_INT_10F_11F_11F_REV&&(q=s.R11F_G11F_B10F)),y===s.RGBA){const $=st?Da:qt.getTransfer(W);B===s.FLOAT&&(q=s.RGBA32F),B===s.HALF_FLOAT&&(q=s.RGBA16F),B===s.UNSIGNED_BYTE&&(q=$===ae?s.SRGB8_ALPHA8:s.RGBA8),B===s.UNSIGNED_SHORT&&rt&&(q=rt.RGBA16_EXT),B===s.SHORT&&rt&&(q=rt.RGBA16_SNORM_EXT),B===s.UNSIGNED_SHORT_4_4_4_4&&(q=s.RGBA4),B===s.UNSIGNED_SHORT_5_5_5_1&&(q=s.RGB5_A1)}return(q===s.R16F||q===s.R32F||q===s.RG16F||q===s.RG32F||q===s.RGBA16F||q===s.RGBA32F)&&t.get("EXT_color_buffer_float"),q}function T(C,y){let B;return C?y===null||y===Fn||y===dr?B=s.DEPTH24_STENCIL8:y===fn?B=s.DEPTH32F_STENCIL8:y===ur&&(B=s.DEPTH24_STENCIL8,Tt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===Fn||y===dr?B=s.DEPTH_COMPONENT24:y===fn?B=s.DEPTH_COMPONENT32F:y===ur&&(B=s.DEPTH_COMPONENT16),B}function b(C,y){return m(C)===!0||C.isFramebufferTexture&&C.minFilter!==Ne&&C.minFilter!==Be?Math.log2(Math.max(y.width,y.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?y.mipmaps.length:1}function R(C){const y=C.target;y.removeEventListener("dispose",R),E(y),y.isVideoTexture&&h.delete(y),y.isHTMLTexture&&u.delete(y)}function v(C){const y=C.target;y.removeEventListener("dispose",v),I(y)}function E(C){const y=n.get(C);if(y.__webglInit===void 0)return;const B=C.source,V=d.get(B);if(V){const W=V[y.__cacheKey];W.usedTimes--,W.usedTimes===0&&P(C),Object.keys(V).length===0&&d.delete(B)}n.remove(C)}function P(C){const y=n.get(C);s.deleteTexture(y.__webglTexture);const B=C.source,V=d.get(B);delete V[y.__cacheKey],a.memory.textures--}function I(C){const y=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(y.__webglFramebuffer[V]))for(let W=0;W<y.__webglFramebuffer[V].length;W++)s.deleteFramebuffer(y.__webglFramebuffer[V][W]);else s.deleteFramebuffer(y.__webglFramebuffer[V]);y.__webglDepthbuffer&&s.deleteRenderbuffer(y.__webglDepthbuffer[V])}else{if(Array.isArray(y.__webglFramebuffer))for(let V=0;V<y.__webglFramebuffer.length;V++)s.deleteFramebuffer(y.__webglFramebuffer[V]);else s.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&s.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&s.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let V=0;V<y.__webglColorRenderbuffer.length;V++)y.__webglColorRenderbuffer[V]&&s.deleteRenderbuffer(y.__webglColorRenderbuffer[V]);y.__webglDepthRenderbuffer&&s.deleteRenderbuffer(y.__webglDepthRenderbuffer)}const B=C.textures;for(let V=0,W=B.length;V<W;V++){const st=n.get(B[V]);st.__webglTexture&&(s.deleteTexture(st.__webglTexture),a.memory.textures--),n.remove(B[V])}n.remove(C)}let O=0;function F(){O=0}function L(){return O}function k(C){O=C}function K(){const C=O;return C>=i.maxTextures&&Tt("WebGLTextures: Trying to use "+(C+1)+" texture units while this GPU supports only "+i.maxTextures),O+=1,C}function Z(C){const y=[];return y.push(C.wrapS),y.push(C.wrapT),y.push(C.wrapR||0),y.push(C.magFilter),y.push(C.minFilter),y.push(C.anisotropy),y.push(C.internalFormat),y.push(C.format),y.push(C.type),y.push(C.generateMipmaps),y.push(C.premultiplyAlpha),y.push(C.flipY),y.push(C.unpackAlignment),y.push(C.colorSpace),y.join()}function nt(C,y){const B=n.get(C);if(C.isVideoTexture&&U(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&B.__version!==C.version){const V=C.image;if(V===null)Tt("WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)Tt("WebGLRenderer: Texture marked for update but image is incomplete");else{xt(B,C,y);return}}else C.isExternalTexture&&(B.__webglTexture=C.sourceTexture?C.sourceTexture:null);e.bindTexture(s.TEXTURE_2D,B.__webglTexture,s.TEXTURE0+y)}function X(C,y){const B=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&B.__version!==C.version){xt(B,C,y);return}else C.isExternalTexture&&(B.__webglTexture=C.sourceTexture?C.sourceTexture:null);e.bindTexture(s.TEXTURE_2D_ARRAY,B.__webglTexture,s.TEXTURE0+y)}function Q(C,y){const B=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&B.__version!==C.version){xt(B,C,y);return}e.bindTexture(s.TEXTURE_3D,B.__webglTexture,s.TEXTURE0+y)}function et(C,y){const B=n.get(C);if(C.isCubeDepthTexture!==!0&&C.version>0&&B.__version!==C.version){Ut(B,C,y);return}e.bindTexture(s.TEXTURE_CUBE_MAP,B.__webglTexture,s.TEXTURE0+y)}const Pt={[Pi]:s.REPEAT,[Dn]:s.CLAMP_TO_EDGE,[Ca]:s.MIRRORED_REPEAT},Rt={[Ne]:s.NEAREST,[id]:s.NEAREST_MIPMAP_NEAREST,[Js]:s.NEAREST_MIPMAP_LINEAR,[Be]:s.LINEAR,[Ma]:s.LINEAR_MIPMAP_NEAREST,[Jn]:s.LINEAR_MIPMAP_LINEAR},pe={[rp]:s.NEVER,[hp]:s.ALWAYS,[ap]:s.LESS,[jl]:s.LEQUAL,[op]:s.EQUAL,[Ql]:s.GEQUAL,[lp]:s.GREATER,[cp]:s.NOTEQUAL};function Jt(C,y){if(y.type===fn&&t.has("OES_texture_float_linear")===!1&&(y.magFilter===Be||y.magFilter===Ma||y.magFilter===Js||y.magFilter===Jn||y.minFilter===Be||y.minFilter===Ma||y.minFilter===Js||y.minFilter===Jn)&&Tt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(C,s.TEXTURE_WRAP_S,Pt[y.wrapS]),s.texParameteri(C,s.TEXTURE_WRAP_T,Pt[y.wrapT]),(C===s.TEXTURE_3D||C===s.TEXTURE_2D_ARRAY)&&s.texParameteri(C,s.TEXTURE_WRAP_R,Pt[y.wrapR]),s.texParameteri(C,s.TEXTURE_MAG_FILTER,Rt[y.magFilter]),s.texParameteri(C,s.TEXTURE_MIN_FILTER,Rt[y.minFilter]),y.compareFunction&&(s.texParameteri(C,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(C,s.TEXTURE_COMPARE_FUNC,pe[y.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===Ne||y.minFilter!==Js&&y.minFilter!==Jn||y.type===fn&&t.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){const B=t.get("EXT_texture_filter_anisotropic");s.texParameterf(C,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,i.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function ee(C,y){let B=!1;C.__webglInit===void 0&&(C.__webglInit=!0,y.addEventListener("dispose",R));const V=y.source;let W=d.get(V);W===void 0&&(W={},d.set(V,W));const st=Z(y);if(st!==C.__cacheKey){W[st]===void 0&&(W[st]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,B=!0),W[st].usedTimes++;const rt=W[C.__cacheKey];rt!==void 0&&(W[C.__cacheKey].usedTimes--,rt.usedTimes===0&&P(y)),C.__cacheKey=st,C.__webglTexture=W[st].texture}return B}function Y(C,y,B){return Math.floor(Math.floor(C/B)/y)}function j(C,y,B,V){const st=C.updateRanges;if(st.length===0)e.texSubImage2D(s.TEXTURE_2D,0,0,0,y.width,y.height,B,V,y.data);else{st.sort((Et,ht)=>Et.start-ht.start);let rt=0;for(let Et=1;Et<st.length;Et++){const ht=st[rt],ot=st[Et],At=ht.start+ht.count,It=Y(ot.start,y.width,4),Ot=Y(ht.start,y.width,4);ot.start<=At+1&&It===Ot&&Y(ot.start+ot.count-1,y.width,4)===It?ht.count=Math.max(ht.count,ot.start+ot.count-ht.start):(++rt,st[rt]=ot)}st.length=rt+1;const q=e.getParameter(s.UNPACK_ROW_LENGTH),$=e.getParameter(s.UNPACK_SKIP_PIXELS),at=e.getParameter(s.UNPACK_SKIP_ROWS);e.pixelStorei(s.UNPACK_ROW_LENGTH,y.width);for(let Et=0,ht=st.length;Et<ht;Et++){const ot=st[Et],At=Math.floor(ot.start/4),It=Math.ceil(ot.count/4),Ot=At%y.width,N=Math.floor(At/y.width),lt=It,J=1;e.pixelStorei(s.UNPACK_SKIP_PIXELS,Ot),e.pixelStorei(s.UNPACK_SKIP_ROWS,N),e.texSubImage2D(s.TEXTURE_2D,0,Ot,N,lt,J,B,V,y.data)}C.clearUpdateRanges(),e.pixelStorei(s.UNPACK_ROW_LENGTH,q),e.pixelStorei(s.UNPACK_SKIP_PIXELS,$),e.pixelStorei(s.UNPACK_SKIP_ROWS,at)}}function xt(C,y,B){let V=s.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(V=s.TEXTURE_2D_ARRAY),y.isData3DTexture&&(V=s.TEXTURE_3D);const W=ee(C,y),st=y.source;e.bindTexture(V,C.__webglTexture,s.TEXTURE0+B);const rt=n.get(st);if(st.version!==rt.__version||W===!0){if(e.activeTexture(s.TEXTURE0+B),(typeof ImageBitmap<"u"&&y.image instanceof ImageBitmap)===!1){const J=qt.getPrimaries(qt.workingColorSpace),ct=y.colorSpace===pi?null:qt.getPrimaries(y.colorSpace),pt=y.colorSpace===pi||J===ct?s.NONE:s.BROWSER_DEFAULT_WEBGL;e.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,y.flipY),e.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),e.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,pt)}e.pixelStorei(s.UNPACK_ALIGNMENT,y.unpackAlignment);let $=g(y.image,!1,i.maxTextureSize);$=Ge(y,$);const at=r.convert(y.format,y.colorSpace),Et=r.convert(y.type);let ht=_(y.internalFormat,at,Et,y.normalized,y.colorSpace,y.isVideoTexture);Jt(V,y);let ot;const At=y.mipmaps,It=y.isVideoTexture!==!0,Ot=rt.__version===void 0||W===!0,N=st.dataReady,lt=b(y,$);if(y.isDepthTexture)ht=T(y.format===Ri,y.type),Ot&&(It?e.texStorage2D(s.TEXTURE_2D,1,ht,$.width,$.height):e.texImage2D(s.TEXTURE_2D,0,ht,$.width,$.height,0,at,Et,null));else if(y.isDataTexture)if(At.length>0){It&&Ot&&e.texStorage2D(s.TEXTURE_2D,lt,ht,At[0].width,At[0].height);for(let J=0,ct=At.length;J<ct;J++)ot=At[J],It?N&&e.texSubImage2D(s.TEXTURE_2D,J,0,0,ot.width,ot.height,at,Et,ot.data):e.texImage2D(s.TEXTURE_2D,J,ht,ot.width,ot.height,0,at,Et,ot.data);y.generateMipmaps=!1}else It?(Ot&&e.texStorage2D(s.TEXTURE_2D,lt,ht,$.width,$.height),N&&j(y,$,at,Et)):e.texImage2D(s.TEXTURE_2D,0,ht,$.width,$.height,0,at,Et,$.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){It&&Ot&&e.texStorage3D(s.TEXTURE_2D_ARRAY,lt,ht,At[0].width,At[0].height,$.depth);for(let J=0,ct=At.length;J<ct;J++)if(ot=At[J],y.format!==pn)if(at!==null)if(It){if(N)if(y.layerUpdates.size>0){const pt=Uh(ot.width,ot.height,y.format,y.type);for(const tt of y.layerUpdates){const Ct=ot.data.subarray(tt*pt/ot.data.BYTES_PER_ELEMENT,(tt+1)*pt/ot.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,J,0,0,tt,ot.width,ot.height,1,at,Ct)}}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,J,0,0,0,ot.width,ot.height,$.depth,at,ot.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,J,ht,ot.width,ot.height,$.depth,0,ot.data,0,0);else Tt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else It?N&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,J,0,0,0,ot.width,ot.height,$.depth,at,Et,ot.data):e.texImage3D(s.TEXTURE_2D_ARRAY,J,ht,ot.width,ot.height,$.depth,0,at,Et,ot.data);y.layerUpdates.size>0&&y.clearLayerUpdates()}else{It&&Ot&&e.texStorage2D(s.TEXTURE_2D,lt,ht,At[0].width,At[0].height);for(let J=0,ct=At.length;J<ct;J++)ot=At[J],y.format!==pn?at!==null?It?N&&e.compressedTexSubImage2D(s.TEXTURE_2D,J,0,0,ot.width,ot.height,at,ot.data):e.compressedTexImage2D(s.TEXTURE_2D,J,ht,ot.width,ot.height,0,ot.data):Tt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):It?N&&e.texSubImage2D(s.TEXTURE_2D,J,0,0,ot.width,ot.height,at,Et,ot.data):e.texImage2D(s.TEXTURE_2D,J,ht,ot.width,ot.height,0,at,Et,ot.data)}else if(y.isDataArrayTexture)if(It){if(Ot&&e.texStorage3D(s.TEXTURE_2D_ARRAY,lt,ht,$.width,$.height,$.depth),N)if(y.layerUpdates.size>0){const J=Uh($.width,$.height,y.format,y.type);for(const ct of y.layerUpdates){const pt=$.data.subarray(ct*J/$.data.BYTES_PER_ELEMENT,(ct+1)*J/$.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,ct,$.width,$.height,1,at,Et,pt)}y.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,$.width,$.height,$.depth,at,Et,$.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,ht,$.width,$.height,$.depth,0,at,Et,$.data);else if(y.isData3DTexture)It?(Ot&&e.texStorage3D(s.TEXTURE_3D,lt,ht,$.width,$.height,$.depth),N&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,$.width,$.height,$.depth,at,Et,$.data)):e.texImage3D(s.TEXTURE_3D,0,ht,$.width,$.height,$.depth,0,at,Et,$.data);else if(y.isFramebufferTexture){if(Ot)if(It)e.texStorage2D(s.TEXTURE_2D,lt,ht,$.width,$.height);else{let J=$.width,ct=$.height;for(let pt=0;pt<lt;pt++)e.texImage2D(s.TEXTURE_2D,pt,ht,J,ct,0,at,Et,null),J>>=1,ct>>=1}}else if(y.isHTMLTexture){if("texElementImage2D"in s){const J=s.canvas;if(J.hasAttribute("layoutsubtree")||J.setAttribute("layoutsubtree","true"),$.parentNode!==J){J.appendChild($),u.add(y),J.onpaint=ct=>{const pt=ct.changedElements;for(const tt of u)pt.includes(tt.image)&&(tt.needsUpdate=!0)},J.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,$);else{const pt=s.RGBA,tt=s.RGBA,Ct=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,pt,tt,Ct,$)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(At.length>0){if(It&&Ot){const J=re(At[0]);e.texStorage2D(s.TEXTURE_2D,lt,ht,J.width,J.height)}for(let J=0,ct=At.length;J<ct;J++)ot=At[J],It?N&&e.texSubImage2D(s.TEXTURE_2D,J,0,0,at,Et,ot):e.texImage2D(s.TEXTURE_2D,J,ht,at,Et,ot);y.generateMipmaps=!1}else if(It){if(Ot){const J=re($);e.texStorage2D(s.TEXTURE_2D,lt,ht,J.width,J.height)}N&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,at,Et,$)}else e.texImage2D(s.TEXTURE_2D,0,ht,at,Et,$);m(y)&&M(V),rt.__version=st.version,y.onUpdate&&y.onUpdate(y)}C.__version=y.version}function Ut(C,y,B){if(y.image.length!==6)return;const V=ee(C,y),W=y.source;e.bindTexture(s.TEXTURE_CUBE_MAP,C.__webglTexture,s.TEXTURE0+B);const st=n.get(W);if(W.version!==st.__version||V===!0){e.activeTexture(s.TEXTURE0+B);const rt=qt.getPrimaries(qt.workingColorSpace),q=y.colorSpace===pi?null:qt.getPrimaries(y.colorSpace),$=y.colorSpace===pi||rt===q?s.NONE:s.BROWSER_DEFAULT_WEBGL;e.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,y.flipY),e.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),e.pixelStorei(s.UNPACK_ALIGNMENT,y.unpackAlignment),e.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,$);const at=y.isCompressedTexture||y.image[0].isCompressedTexture,Et=y.image[0]&&y.image[0].isDataTexture,ht=[];for(let tt=0;tt<6;tt++)!at&&!Et?ht[tt]=g(y.image[tt],!0,i.maxCubemapSize):ht[tt]=Et?y.image[tt].image:y.image[tt],ht[tt]=Ge(y,ht[tt]);const ot=ht[0],At=r.convert(y.format,y.colorSpace),It=r.convert(y.type),Ot=_(y.internalFormat,At,It,y.normalized,y.colorSpace),N=y.isVideoTexture!==!0,lt=st.__version===void 0||V===!0,J=W.dataReady;let ct=b(y,ot);Jt(s.TEXTURE_CUBE_MAP,y);let pt;if(at){N&&lt&&e.texStorage2D(s.TEXTURE_CUBE_MAP,ct,Ot,ot.width,ot.height);for(let tt=0;tt<6;tt++){pt=ht[tt].mipmaps;for(let Ct=0;Ct<pt.length;Ct++){const bt=pt[Ct];y.format!==pn?At!==null?N?J&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Ct,0,0,bt.width,bt.height,At,bt.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Ct,Ot,bt.width,bt.height,0,bt.data):Tt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?J&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Ct,0,0,bt.width,bt.height,At,It,bt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Ct,Ot,bt.width,bt.height,0,At,It,bt.data)}}}else{if(pt=y.mipmaps,N&&lt){pt.length>0&&ct++;const tt=re(ht[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,ct,Ot,tt.width,tt.height)}for(let tt=0;tt<6;tt++)if(Et){N?J&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,ht[tt].width,ht[tt].height,At,It,ht[tt].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,Ot,ht[tt].width,ht[tt].height,0,At,It,ht[tt].data);for(let Ct=0;Ct<pt.length;Ct++){const ge=pt[Ct].image[tt].image;N?J&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Ct+1,0,0,ge.width,ge.height,At,It,ge.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Ct+1,Ot,ge.width,ge.height,0,At,It,ge.data)}}else{N?J&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,At,It,ht[tt]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,Ot,At,It,ht[tt]);for(let Ct=0;Ct<pt.length;Ct++){const bt=pt[Ct];N?J&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Ct+1,0,0,At,It,bt.image[tt]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Ct+1,Ot,At,It,bt.image[tt])}}}m(y)&&M(s.TEXTURE_CUBE_MAP),st.__version=W.version,y.onUpdate&&y.onUpdate(y)}C.__version=y.version}function gt(C,y,B,V,W,st){const rt=r.convert(B.format,B.colorSpace),q=r.convert(B.type),$=_(B.internalFormat,rt,q,B.normalized,B.colorSpace),at=n.get(y),Et=n.get(B);if(Et.__renderTarget=y,!at.__hasExternalTextures){const ht=Math.max(1,y.width>>st),ot=Math.max(1,y.height>>st);W===s.TEXTURE_3D||W===s.TEXTURE_2D_ARRAY?e.texImage3D(W,st,$,ht,ot,y.depth,0,rt,q,null):e.texImage2D(W,st,$,ht,ot,0,rt,q,null)}e.bindFramebuffer(s.FRAMEBUFFER,C),Ie(y)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,V,W,Et.__webglTexture,0,Se(y)):(W===s.TEXTURE_2D||W>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&W<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,V,W,Et.__webglTexture,st),e.bindFramebuffer(s.FRAMEBUFFER,null)}function Vt(C,y,B){if(s.bindRenderbuffer(s.RENDERBUFFER,C),y.depthBuffer){const V=y.depthTexture,W=V&&V.isDepthTexture?V.type:null,st=T(y.stencilBuffer,W),rt=y.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;Ie(y)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Se(y),st,y.width,y.height):B?s.renderbufferStorageMultisample(s.RENDERBUFFER,Se(y),st,y.width,y.height):s.renderbufferStorage(s.RENDERBUFFER,st,y.width,y.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,rt,s.RENDERBUFFER,C)}else{const V=y.textures;for(let W=0;W<V.length;W++){const st=V[W],rt=r.convert(st.format,st.colorSpace),q=r.convert(st.type),$=_(st.internalFormat,rt,q,st.normalized,st.colorSpace);Ie(y)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Se(y),$,y.width,y.height):B?s.renderbufferStorageMultisample(s.RENDERBUFFER,Se(y),$,y.width,y.height):s.renderbufferStorage(s.RENDERBUFFER,$,y.width,y.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Oe(C,y,B){const V=y.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(s.FRAMEBUFFER,C),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const W=n.get(y.depthTexture);if(W.__renderTarget=y,(!W.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),V){if(W.__webglInit===void 0&&(W.__webglInit=!0,y.depthTexture.addEventListener("dispose",R)),W.__webglTexture===void 0){W.__webglTexture=s.createTexture(),e.bindTexture(s.TEXTURE_CUBE_MAP,W.__webglTexture),Jt(s.TEXTURE_CUBE_MAP,y.depthTexture);const at=r.convert(y.depthTexture.format),Et=r.convert(y.depthTexture.type);let ht;y.depthTexture.format===ti?ht=s.DEPTH_COMPONENT24:y.depthTexture.format===Ri&&(ht=s.DEPTH24_STENCIL8);for(let ot=0;ot<6;ot++)s.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,ht,y.width,y.height,0,at,Et,null)}}else nt(y.depthTexture,0);const st=W.__webglTexture,rt=Se(y),q=V?s.TEXTURE_CUBE_MAP_POSITIVE_X+B:s.TEXTURE_2D,$=y.depthTexture.format===Ri?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(y.depthTexture.format===ti)Ie(y)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,$,q,st,0,rt):s.framebufferTexture2D(s.FRAMEBUFFER,$,q,st,0);else if(y.depthTexture.format===Ri)Ie(y)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,$,q,st,0,rt):s.framebufferTexture2D(s.FRAMEBUFFER,$,q,st,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Xt(C){const y=n.get(C),B=C.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==C.depthTexture){const V=C.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),V){const W=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,V.removeEventListener("dispose",W)};V.addEventListener("dispose",W),y.__depthDisposeCallback=W}y.__boundDepthTexture=V}if(C.depthTexture&&!y.__autoAllocateDepthBuffer)if(B)for(let V=0;V<6;V++)Oe(y.__webglFramebuffer[V],C,V);else{const V=C.texture.mipmaps;V&&V.length>0?Oe(y.__webglFramebuffer[0],C,0):Oe(y.__webglFramebuffer,C,0)}else if(B){y.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(e.bindFramebuffer(s.FRAMEBUFFER,y.__webglFramebuffer[V]),y.__webglDepthbuffer[V]===void 0)y.__webglDepthbuffer[V]=s.createRenderbuffer(),Vt(y.__webglDepthbuffer[V],C,!1);else{const W=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,st=y.__webglDepthbuffer[V];s.bindRenderbuffer(s.RENDERBUFFER,st),s.framebufferRenderbuffer(s.FRAMEBUFFER,W,s.RENDERBUFFER,st)}}else{const V=C.texture.mipmaps;if(V&&V.length>0?e.bindFramebuffer(s.FRAMEBUFFER,y.__webglFramebuffer[0]):e.bindFramebuffer(s.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=s.createRenderbuffer(),Vt(y.__webglDepthbuffer,C,!1);else{const W=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,st=y.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,st),s.framebufferRenderbuffer(s.FRAMEBUFFER,W,s.RENDERBUFFER,st)}}e.bindFramebuffer(s.FRAMEBUFFER,null)}function jt(C,y,B){const V=n.get(C);y!==void 0&&gt(V.__webglFramebuffer,C,C.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),B!==void 0&&Xt(C)}function me(C){const y=C.texture,B=n.get(C),V=n.get(y);C.addEventListener("dispose",v);const W=C.textures,st=C.isWebGLCubeRenderTarget===!0,rt=W.length>1;if(rt||(V.__webglTexture===void 0&&(V.__webglTexture=s.createTexture()),V.__version=y.version,a.memory.textures++),st){B.__webglFramebuffer=[];for(let q=0;q<6;q++)if(y.mipmaps&&y.mipmaps.length>0){B.__webglFramebuffer[q]=[];for(let $=0;$<y.mipmaps.length;$++)B.__webglFramebuffer[q][$]=s.createFramebuffer()}else B.__webglFramebuffer[q]=s.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){B.__webglFramebuffer=[];for(let q=0;q<y.mipmaps.length;q++)B.__webglFramebuffer[q]=s.createFramebuffer()}else B.__webglFramebuffer=s.createFramebuffer();if(rt)for(let q=0,$=W.length;q<$;q++){const at=n.get(W[q]);at.__webglTexture===void 0&&(at.__webglTexture=s.createTexture(),a.memory.textures++)}if(C.samples>0&&Ie(C)===!1){B.__webglMultisampledFramebuffer=s.createFramebuffer(),B.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let q=0;q<W.length;q++){const $=W[q];B.__webglColorRenderbuffer[q]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,B.__webglColorRenderbuffer[q]);const at=r.convert($.format,$.colorSpace),Et=r.convert($.type),ht=_($.internalFormat,at,Et,$.normalized,$.colorSpace,C.isXRRenderTarget===!0),ot=Se(C);s.renderbufferStorageMultisample(s.RENDERBUFFER,ot,ht,C.width,C.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+q,s.RENDERBUFFER,B.__webglColorRenderbuffer[q])}s.bindRenderbuffer(s.RENDERBUFFER,null),C.depthBuffer&&(B.__webglDepthRenderbuffer=s.createRenderbuffer(),Vt(B.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(st){e.bindTexture(s.TEXTURE_CUBE_MAP,V.__webglTexture),Jt(s.TEXTURE_CUBE_MAP,y);for(let q=0;q<6;q++)if(y.mipmaps&&y.mipmaps.length>0)for(let $=0;$<y.mipmaps.length;$++)gt(B.__webglFramebuffer[q][$],C,y,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+q,$);else gt(B.__webglFramebuffer[q],C,y,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+q,0);m(y)&&M(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(rt){for(let q=0,$=W.length;q<$;q++){const at=W[q],Et=n.get(at);let ht=s.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ht=C.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(ht,Et.__webglTexture),Jt(ht,at),gt(B.__webglFramebuffer,C,at,s.COLOR_ATTACHMENT0+q,ht,0),m(at)&&M(ht)}e.unbindTexture()}else{let q=s.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(q=C.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(q,V.__webglTexture),Jt(q,y),y.mipmaps&&y.mipmaps.length>0)for(let $=0;$<y.mipmaps.length;$++)gt(B.__webglFramebuffer[$],C,y,s.COLOR_ATTACHMENT0,q,$);else gt(B.__webglFramebuffer,C,y,s.COLOR_ATTACHMENT0,q,0);m(y)&&M(q),e.unbindTexture()}C.depthBuffer&&Xt(C)}function Kt(C){const y=C.textures;for(let B=0,V=y.length;B<V;B++){const W=y[B];if(m(W)){const st=S(C),rt=n.get(W).__webglTexture;e.bindTexture(st,rt),M(st),e.unbindTexture()}}}const Me=[],He=[];function Qe(C){if(C.samples>0){if(Ie(C)===!1){const y=C.textures,B=C.width,V=C.height;let W=s.COLOR_BUFFER_BIT;const st=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,rt=n.get(C),q=y.length>1;if(q)for(let at=0;at<y.length;at++)e.bindFramebuffer(s.FRAMEBUFFER,rt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+at,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,rt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+at,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,rt.__webglMultisampledFramebuffer);const $=C.texture.mipmaps;$&&$.length>0?e.bindFramebuffer(s.DRAW_FRAMEBUFFER,rt.__webglFramebuffer[0]):e.bindFramebuffer(s.DRAW_FRAMEBUFFER,rt.__webglFramebuffer);for(let at=0;at<y.length;at++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(W|=s.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(W|=s.STENCIL_BUFFER_BIT)),q){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,rt.__webglColorRenderbuffer[at]);const Et=n.get(y[at]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Et,0)}s.blitFramebuffer(0,0,B,V,0,0,B,V,W,s.NEAREST),l===!0&&(Me.length=0,He.length=0,Me.push(s.COLOR_ATTACHMENT0+at),C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&(Me.push(st),He.push(st),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,He)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Me))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),q)for(let at=0;at<y.length;at++){e.bindFramebuffer(s.FRAMEBUFFER,rt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+at,s.RENDERBUFFER,rt.__webglColorRenderbuffer[at]);const Et=n.get(y[at]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,rt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+at,s.TEXTURE_2D,Et,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,rt.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&l){const y=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[y])}}}function Se(C){return Math.min(i.maxSamples,C.samples)}function Ie(C){const y=n.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function U(C){const y=a.render.frame;h.get(C)!==y&&(h.set(C,y),C.update())}function Ge(C,y){const B=C.colorSpace,V=C.format,W=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||B!==ln&&B!==pi&&(qt.getTransfer(B)===ae?(V!==pn||W!==an)&&Tt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Lt("WebGLTextures: Unsupported texture color space:",B)),y}function re(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=K,this.resetTextureUnits=F,this.getTextureUnits=L,this.setTextureUnits=k,this.setTexture2D=nt,this.setTexture2DArray=X,this.setTexture3D=Q,this.setTextureCube=et,this.rebindTextures=jt,this.setupRenderTarget=me,this.updateRenderTargetMipmap=Kt,this.updateMultisampleRenderTarget=Qe,this.setupDepthRenderbuffer=Xt,this.setupFrameBufferTexture=gt,this.useMultisampledRTT=Ie,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function _y(s,t){function e(n,i=pi){let r;const a=qt.getTransfer(i);if(n===an)return s.UNSIGNED_BYTE;if(n===Xl)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Yl)return s.UNSIGNED_SHORT_5_5_5_1;if(n===ad)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===od)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===sd)return s.BYTE;if(n===rd)return s.SHORT;if(n===ur)return s.UNSIGNED_SHORT;if(n===Wl)return s.INT;if(n===Fn)return s.UNSIGNED_INT;if(n===fn)return s.FLOAT;if(n===Bn)return s.HALF_FLOAT;if(n===ld)return s.ALPHA;if(n===cd)return s.RGB;if(n===pn)return s.RGBA;if(n===ti)return s.DEPTH_COMPONENT;if(n===Ri)return s.DEPTH_STENCIL;if(n===za)return s.RED;if(n===ql)return s.RED_INTEGER;if(n===Ii)return s.RG;if(n===Kl)return s.RG_INTEGER;if(n===Zl)return s.RGBA_INTEGER;if(n===Sa||n===ba||n===wa||n===Ta)if(a===ae)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Sa)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ba)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===wa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ta)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Sa)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ba)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===wa)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ta)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===el||n===nl||n===il||n===sl)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===el)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===nl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===il)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===sl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===rl||n===al||n===ol||n===ll||n===cl||n===Pa||n===hl)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===rl||n===al)return a===ae?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ol)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===ll)return r.COMPRESSED_R11_EAC;if(n===cl)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Pa)return r.COMPRESSED_RG11_EAC;if(n===hl)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===ul||n===dl||n===fl||n===pl||n===ml||n===gl||n===_l||n===xl||n===vl||n===yl||n===Ml||n===Sl||n===bl||n===wl)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ul)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===dl)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===fl)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===pl)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ml)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===gl)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===_l)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===xl)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===vl)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===yl)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ml)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Sl)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===bl)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===wl)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Tl||n===El||n===Al)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Tl)return a===ae?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===El)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Al)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Rl||n===Cl||n===Ia||n===Pl)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Rl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Cl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ia)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Pl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===dr?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}const xy=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,vy=`
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

}`;class yy{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new wd(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new kn({vertexShader:xy,fragmentShader:vy,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new te(new Oi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class My extends ei{constructor(t,e){super();const n=this;let i=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,f=null,d=null,p=null;const x=typeof XRWebGLBinding<"u",g=new yy,m={},M=e.getContextAttributes();let S=null,_=null;const T=[],b=[],R=new it;let v=null,E=null;const P=new je;P.viewport=new ue;const I=new je;I.viewport=new ue;const O=[P,I],F=new f0;let L=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let j=T[Y];return j===void 0&&(j=new ao,T[Y]=j),j.getTargetRaySpace()},this.getControllerGrip=function(Y){let j=T[Y];return j===void 0&&(j=new ao,T[Y]=j),j.getGripSpace()},this.getHand=function(Y){let j=T[Y];return j===void 0&&(j=new ao,T[Y]=j),j.getHandSpace()};function K(Y){const j=b.indexOf(Y.inputSource);if(j===-1)return;const xt=T[j];xt!==void 0&&(xt.update(Y.inputSource,Y.frame,c||a),xt.dispatchEvent({type:Y.type,data:Y.inputSource}))}function Z(){i.removeEventListener("select",K),i.removeEventListener("selectstart",K),i.removeEventListener("selectend",K),i.removeEventListener("squeeze",K),i.removeEventListener("squeezestart",K),i.removeEventListener("squeezeend",K),i.removeEventListener("end",Z),i.removeEventListener("inputsourceschange",nt);for(let Y=0;Y<T.length;Y++){const j=b[Y];j!==null&&(b[Y]=null,T[Y].disconnect(j))}L=null,k=null,g.reset();for(const Y in m)delete m[Y];if(t.setRenderTarget(S),d=null,f=null,u=null,i=null,_=null,ee.stop(),n.isPresenting=!1,t.setPixelRatio(v),t.setSize(R.width,R.height,!1),E!==null){const Y=E.camera;Y.fov=E.fov,Y.zoom=E.zoom,Y.updateProjectionMatrix(),E=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,n.isPresenting===!0&&Tt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){o=Y,n.isPresenting===!0&&Tt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u===null&&x&&(u=new XRWebGLBinding(i,e)),u},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function(Y){if(i=Y,i!==null){if(S=t.getRenderTarget(),i.addEventListener("select",K),i.addEventListener("selectstart",K),i.addEventListener("selectend",K),i.addEventListener("squeeze",K),i.addEventListener("squeezestart",K),i.addEventListener("squeezeend",K),i.addEventListener("end",Z),i.addEventListener("inputsourceschange",nt),M.xrCompatible!==!0&&await e.makeXRCompatible(),v=t.getPixelRatio(),t.getSize(R),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let xt=null,Ut=null,gt=null;M.depth&&(gt=M.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,xt=M.stencil?Ri:ti,Ut=M.stencil?dr:Fn);const Vt={colorFormat:e.RGBA8,depthFormat:gt,scaleFactor:r};u=this.getBinding(),f=u.createProjectionLayer(Vt),i.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),_=new Mn(f.textureWidth,f.textureHeight,{format:pn,type:an,depthTexture:new yr(f.textureWidth,f.textureHeight,Ut,void 0,void 0,void 0,void 0,void 0,void 0,xt),stencilBuffer:M.stencil,colorSpace:t.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{const xt={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(i,e,xt),i.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),_=new Mn(d.framebufferWidth,d.framebufferHeight,{format:pn,type:an,colorSpace:t.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),ee.setContext(i),ee.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function nt(Y){for(let j=0;j<Y.removed.length;j++){const xt=Y.removed[j],Ut=b.indexOf(xt);Ut>=0&&(b[Ut]=null,T[Ut].disconnect(xt))}for(let j=0;j<Y.added.length;j++){const xt=Y.added[j];let Ut=b.indexOf(xt);if(Ut===-1){for(let Vt=0;Vt<T.length;Vt++)if(Vt>=b.length){b.push(xt),Ut=Vt;break}else if(b[Vt]===null){b[Vt]=xt,Ut=Vt;break}if(Ut===-1)break}const gt=T[Ut];gt&&gt.connect(xt)}}const X=new A,Q=new A;function et(Y,j,xt){X.setFromMatrixPosition(j.matrixWorld),Q.setFromMatrixPosition(xt.matrixWorld);const Ut=X.distanceTo(Q),gt=j.projectionMatrix.elements,Vt=xt.projectionMatrix.elements,Oe=gt[14]/(gt[10]-1),Xt=gt[14]/(gt[10]+1),jt=(gt[9]+1)/gt[5],me=(gt[9]-1)/gt[5],Kt=(gt[8]-1)/gt[0],Me=(Vt[8]+1)/Vt[0],He=Oe*Kt,Qe=Oe*Me,Se=Ut/(-Kt+Me),Ie=Se*-Kt;if(j.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(Ie),Y.translateZ(Se),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),gt[10]===-1)Y.projectionMatrix.copy(j.projectionMatrix),Y.projectionMatrixInverse.copy(j.projectionMatrixInverse);else{const U=Oe+Se,Ge=Xt+Se,re=He-Ie,C=Qe+(Ut-Ie),y=jt*Xt/Ge*U,B=me*Xt/Ge*U;Y.projectionMatrix.makePerspective(re,C,y,B,U,Ge),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function Pt(Y,j){j===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(j.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(i===null)return;let j=Y.near,xt=Y.far;g.texture!==null&&(g.depthNear>0&&(j=g.depthNear),g.depthFar>0&&(xt=g.depthFar)),F.near=I.near=P.near=j,F.far=I.far=P.far=xt,(L!==F.near||k!==F.far)&&(i.updateRenderState({depthNear:F.near,depthFar:F.far}),L=F.near,k=F.far),F.layers.mask=Y.layers.mask|6,P.layers.mask=F.layers.mask&-5,I.layers.mask=F.layers.mask&-3;const Ut=Y.parent,gt=F.cameras;Pt(F,Ut);for(let Vt=0;Vt<gt.length;Vt++)Pt(gt[Vt],Ut);gt.length===2?et(F,P,I):F.projectionMatrix.copy(P.projectionMatrix),E===null&&Y.isPerspectiveCamera&&(E={camera:Y,fov:Y.fov,zoom:Y.zoom}),Rt(Y,F,Ut)};function Rt(Y,j,xt){xt===null?Y.matrix.copy(j.matrixWorld):(Y.matrix.copy(xt.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(j.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(j.projectionMatrix),Y.projectionMatrixInverse.copy(j.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=vs*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function(Y){l=Y,f!==null&&(f.fixedFoveation=Y),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=Y)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(F)},this.getCameraTexture=function(Y){return m[Y]};let pe=null;function Jt(Y,j){if(h=j.getViewerPose(c||a),p=j,h!==null){const xt=h.views;d!==null&&(t.setRenderTargetFramebuffer(_,d.framebuffer),t.setRenderTarget(_));let Ut=!1;xt.length!==F.cameras.length&&(F.cameras.length=0,Ut=!0);for(let Xt=0;Xt<xt.length;Xt++){const jt=xt[Xt];let me=null;if(d!==null)me=d.getViewport(jt);else{const Me=u.getViewSubImage(f,jt);me=Me.viewport,Xt===0&&(t.setRenderTargetTextures(_,Me.colorTexture,Me.depthStencilTexture),t.setRenderTarget(_))}let Kt=O[Xt];Kt===void 0&&(Kt=new je,Kt.layers.enable(Xt),Kt.viewport=new ue,O[Xt]=Kt),Kt.matrix.fromArray(jt.transform.matrix),Kt.matrix.decompose(Kt.position,Kt.quaternion,Kt.scale),Kt.projectionMatrix.fromArray(jt.projectionMatrix),Kt.projectionMatrixInverse.copy(Kt.projectionMatrix).invert(),Kt.viewport.set(me.x,me.y,me.width,me.height),Xt===0&&(F.matrix.copy(Kt.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),Ut===!0&&F.cameras.push(Kt)}const gt=i.enabledFeatures;if(gt&&gt.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&x){u=n.getBinding();const Xt=u.getDepthInformation(xt[0]);Xt&&Xt.isValid&&Xt.texture&&g.init(Xt,i.renderState)}if(gt&&gt.includes("camera-access")&&x){t.state.unbindTexture(),u=n.getBinding();for(let Xt=0;Xt<xt.length;Xt++){const jt=xt[Xt].camera;if(jt){let me=m[jt];me||(me=new wd,m[jt]=me);const Kt=u.getCameraImage(jt);me.sourceTexture=Kt}}}}for(let xt=0;xt<T.length;xt++){const Ut=b[xt],gt=T[xt];Ut!==null&&gt!==void 0&&gt.update(Ut,j,c||a)}pe&&pe(Y,j),j.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:j}),p=null}const ee=new Wd;ee.setAnimationLoop(Jt),this.setAnimationLoop=function(Y){pe=Y},this.dispose=function(){}}}const Sy=new Dt,$d=new Nt;$d.set(-1,0,0,0,1,0,0,0,1);function by(s,t){function e(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,Nd(s)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function i(g,m,M,S,_){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(g,m):m.isMeshLambertMaterial?(r(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(g,m),u(g,m)):m.isMeshPhongMaterial?(r(g,m),h(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(g,m),f(g,m),m.isMeshPhysicalMaterial&&d(g,m,_)):m.isMeshMatcapMaterial?(r(g,m),p(g,m)):m.isMeshDepthMaterial?r(g,m):m.isMeshDistanceMaterial?(r(g,m),x(g,m)):m.isMeshNormalMaterial?r(g,m):m.isLineBasicMaterial?(a(g,m),m.isLineDashedMaterial&&o(g,m)):m.isPointsMaterial?l(g,m,M,S):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,e(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===Ke&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,e(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===Ke&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,e(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,e(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);const M=t.get(m),S=M.envMap,_=M.envMapRotation;S&&(g.envMap.value=S,g.envMapRotation.value.setFromMatrix4(Sy.makeRotationFromEuler(_)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply($d),g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,g.aoMapTransform))}function a(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform))}function o(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,M,S){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*M,g.scale.value=S*.5,m.map&&(g.map.value=m.map,e(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function h(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function u(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function f(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function d(g,m,M){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Ke&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.retroreflectivity>0&&(g.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=M.texture,g.transmissionSamplerSize.value.set(M.width,M.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function x(g,m){const M=t.get(m).light;g.referencePosition.value.setFromMatrixPosition(M.matrixWorld),g.nearDistance.value=M.shadow.camera.near,g.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function wy(s,t,e,n){let i={},r={},a=[];const o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(_,T){const b=T.program;n.uniformBlockBinding(_,b)}function c(_,T){let b=i[_.id];b===void 0&&(g(_),b=h(_),i[_.id]=b,_.addEventListener("dispose",M));const R=T.program;n.updateUBOMapping(_,R);const v=t.render.frame;r[_.id]!==v&&(f(_),r[_.id]=v)}function h(_){const T=u();_.__bindingPointIndex=T;const b=s.createBuffer(),R=_.__size,v=_.usage;return s.bindBuffer(s.UNIFORM_BUFFER,b),s.bufferData(s.UNIFORM_BUFFER,R,v),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,T,b),b}function u(){for(let _=0;_<o;_++)if(a.indexOf(_)===-1)return a.push(_),_;return Lt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(_){const T=i[_.id],b=_.uniforms,R=_.__cache;s.bindBuffer(s.UNIFORM_BUFFER,T);for(let v=0,E=b.length;v<E;v++){const P=b[v];if(Array.isArray(P))for(let I=0,O=P.length;I<O;I++)d(P[I],v,I,R);else d(P,v,0,R)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function d(_,T,b,R){if(x(_,T,b,R)===!0){const v=_.__offset,E=_.value;if(Array.isArray(E)){let P=0;for(let I=0;I<E.length;I++){const O=E[I],F=m(O);p(O,_.__data,P),typeof O!="number"&&typeof O!="boolean"&&!O.isMatrix3&&!ArrayBuffer.isView(O)&&(P+=F.storage/Float32Array.BYTES_PER_ELEMENT)}}else p(E,_.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,v,_.__data)}}function p(_,T,b){typeof _=="number"||typeof _=="boolean"?T[0]=_:_.isMatrix3?(T[0]=_.elements[0],T[1]=_.elements[1],T[2]=_.elements[2],T[3]=0,T[4]=_.elements[3],T[5]=_.elements[4],T[6]=_.elements[5],T[7]=0,T[8]=_.elements[6],T[9]=_.elements[7],T[10]=_.elements[8],T[11]=0):ArrayBuffer.isView(_)?T.set(new _.constructor(_.buffer,_.byteOffset,T.length)):_.toArray(T,b)}function x(_,T,b,R){const v=_.value,E=T+"_"+b;if(R[E]===void 0)return typeof v=="number"||typeof v=="boolean"?R[E]=v:ArrayBuffer.isView(v)?R[E]=v.slice():R[E]=v.clone(),!0;{const P=R[E];if(typeof v=="number"||typeof v=="boolean"){if(P!==v)return R[E]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(P.equals(v)===!1)return P.copy(v),!0}}return!1}function g(_){const T=_.uniforms;let b=0;const R=16;for(let E=0,P=T.length;E<P;E++){const I=Array.isArray(T[E])?T[E]:[T[E]];for(let O=0,F=I.length;O<F;O++){const L=I[O],k=Array.isArray(L.value)?L.value:[L.value];for(let K=0,Z=k.length;K<Z;K++){const nt=k[K],X=m(nt),Q=b%R,et=Q%X.boundary,Pt=Q+et;b+=et,Pt!==0&&R-Pt<X.storage&&(b+=R-Pt),L.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=b,b+=X.storage}}}const v=b%R;return v>0&&(b+=R-v),_.__size=b,_.__cache={},this}function m(_){const T={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(T.boundary=4,T.storage=4):_.isVector2?(T.boundary=8,T.storage=8):_.isVector3||_.isColor?(T.boundary=16,T.storage=12):_.isVector4?(T.boundary=16,T.storage=16):_.isMatrix3?(T.boundary=48,T.storage=48):_.isMatrix4?(T.boundary=64,T.storage=64):_.isTexture?Tt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(_)?(T.boundary=16,T.storage=_.byteLength):Tt("WebGLRenderer: Unsupported uniform value type.",_),T}function M(_){const T=_.target;T.removeEventListener("dispose",M);const b=a.indexOf(T.__bindingPointIndex);a.splice(b,1),s.deleteBuffer(i[T.id]),delete i[T.id],delete r[T.id]}function S(){for(const _ in i)s.deleteBuffer(i[_]);a=[],i={},r={}}return{bind:l,update:c,dispose:S}}const Ty=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Cn=null;function Ey(){return Cn===null&&(Cn=new Ha(Ty,16,16,Ii,Bn),Cn.name="DFG_LUT",Cn.minFilter=Be,Cn.magFilter=Be,Cn.wrapS=Dn,Cn.wrapT=Dn,Cn.generateMipmaps=!1,Cn.needsUpdate=!0),Cn}class Ay{constructor(t={}){const{canvas:e=fp(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1,outputBufferType:d=an}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;const x=d,g=new Set([Zl,Kl,ql]),m=new Set([an,Fn,ur,dr,Xl,Yl]),M=new Uint32Array(4),S=new Int32Array(4),_=new A;let T=null,b=null;const R=[],v=[];let E=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=On,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const P=this;let I=!1,O=null,F=null,L=null,k=null;this._outputColorSpace=ye;let K=0,Z=0,nt=null,X=-1,Q=null;const et=new ue,Pt=new ue;let Rt=null;const pe=new St(0);let Jt=0,ee=e.width,Y=e.height,j=1,xt=null,Ut=null;const gt=new ue(0,0,ee,Y),Vt=new ue(0,0,ee,Y);let Oe=!1;const Xt=new sc;let jt=!1,me=!1;const Kt=new Dt,Me=new A,He=new ue,Qe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Se=!1;function Ie(){return nt===null?j:1}let U=n;function Ge(w,D){return e.getContext(w,D)}let re,C,y,B,V,W,st,rt,q,$,at,Et,ht,ot,At,It,Ot,N,lt,J,ct,pt,tt;try{const w={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Vl}`),e.addEventListener("webglcontextlost",ge,!1),e.addEventListener("webglcontextrestored",ne,!1),e.addEventListener("webglcontextcreationerror",gn,!1),U===null){const D="webgl2";if(U=Ge(D,w),U===null)throw Ge(D)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ct()}catch(w){throw e.removeEventListener("webglcontextlost",ge,!1),e.removeEventListener("webglcontextrestored",ne,!1),e.removeEventListener("webglcontextcreationerror",gn,!1),Lt("WebGLRenderer: "+w.message),w}function Ct(){re=new Ex(U),re.init(),ct=new _y(U,re),C=new gx(U,re,t,ct),y=new my(U,re),C.reversedDepthBuffer&&f&&y.buffers.depth.setReversed(!0),F=U.createFramebuffer(),L=U.createFramebuffer(),k=U.createFramebuffer(),B=new Cx(U),V=new ey,W=new gy(U,re,y,V,C,ct,B),st=new Tx(P),rt=new I0(U),pt=new px(U,rt),q=new Ax(U,rt,B,pt),$=new Ix(U,q,rt,pt,B),N=new Px(U,C,W),At=new _x(V),at=new ty(P,st,re,C,pt,At),Et=new by(P,V),ht=new iy,ot=new cy(re),Ot=new fx(P,st,y,$,p,l),It=new py(P,$,C),tt=new wy(U,B,C,y),lt=new mx(U,re,B),J=new Rx(U,re,B),B.programs=at.programs,P.capabilities=C,P.extensions=re,P.properties=V,P.renderLists=ht,P.shadowMap=It,P.state=y,P.info=B}x!==an&&(E=new Dx(x,e.width,e.height,o,i,r));const bt=new My(P,U);this.xr=bt,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const w=re.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=re.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return j},this.setPixelRatio=function(w){w!==void 0&&(j=w,this.setSize(ee,Y,!1))},this.getSize=function(w){return w.set(ee,Y)},this.setSize=function(w,D,G=!0){if(bt.isPresenting){Tt("WebGLRenderer: Can't change size while VR device is presenting.");return}ee=w,Y=D,e.width=Math.floor(w*j),e.height=Math.floor(D*j),G===!0&&(e.style.width=w+"px",e.style.height=D+"px"),E!==null&&E.setSize(e.width,e.height),this.setViewport(0,0,w,D)},this.getDrawingBufferSize=function(w){return w.set(ee*j,Y*j).floor()},this.setDrawingBufferSize=function(w,D,G){ee=w,Y=D,j=G,e.width=Math.floor(w*G),e.height=Math.floor(D*G),this.setViewport(0,0,w,D)},this.setEffects=function(w){if(x===an){Lt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(w){for(let D=0;D<w.length;D++)if(w[D].isOutputPass===!0){Tt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}E.setEffects(w||[])},this.getCurrentViewport=function(w){return w.copy(et)},this.getViewport=function(w){return w.copy(gt)},this.setViewport=function(w,D,G,z){w.isVector4?gt.set(w.x,w.y,w.z,w.w):gt.set(w,D,G,z),y.viewport(et.copy(gt).multiplyScalar(j).round())},this.getScissor=function(w){return w.copy(Vt)},this.setScissor=function(w,D,G,z){w.isVector4?Vt.set(w.x,w.y,w.z,w.w):Vt.set(w,D,G,z),y.scissor(Pt.copy(Vt).multiplyScalar(j).round())},this.getScissorTest=function(){return Oe},this.setScissorTest=function(w){y.setScissorTest(Oe=w)},this.setOpaqueSort=function(w){xt=w},this.setTransparentSort=function(w){Ut=w},this.getClearColor=function(w){return w.copy(Ot.getClearColor())},this.setClearColor=function(){Ot.setClearColor(...arguments)},this.getClearAlpha=function(){return Ot.getClearAlpha()},this.setClearAlpha=function(){Ot.setClearAlpha(...arguments)},this.clear=function(w=!0,D=!0,G=!0){let z=0;if(w){let H=!1;if(nt!==null){const ft=nt.texture.format;H=g.has(ft)}if(H){const ft=nt.texture.type,_t=m.has(ft),dt=Ot.getClearColor(),vt=Ot.getClearAlpha(),wt=dt.r,Bt=dt.g,Yt=dt.b;_t?(M[0]=wt,M[1]=Bt,M[2]=Yt,M[3]=vt,U.clearBufferuiv(U.COLOR,0,M)):(S[0]=wt,S[1]=Bt,S[2]=Yt,S[3]=vt,U.clearBufferiv(U.COLOR,0,S))}else z|=U.COLOR_BUFFER_BIT}D&&(z|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),G&&(z|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z!==0&&U.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(w){w.setRenderer(this),O=w},this.dispose=function(){e.removeEventListener("webglcontextlost",ge,!1),e.removeEventListener("webglcontextrestored",ne,!1),e.removeEventListener("webglcontextcreationerror",gn,!1),Ot.dispose(),ht.dispose(),ot.dispose(),V.dispose(),st.dispose(),$.dispose(),pt.dispose(),tt.dispose(),at.dispose(),bt.dispose(),bt.removeEventListener("sessionstart",Mc),bt.removeEventListener("sessionend",Sc),_i.stop()};function ge(w){w.preventDefault(),Na("WebGLRenderer: Context Lost."),I=!0}function ne(){Na("WebGLRenderer: Context Restored."),I=!1;const w=B.autoReset,D=It.enabled,G=It.autoUpdate,z=It.needsUpdate,H=It.type;Ct(),B.autoReset=w,It.enabled=D,It.autoUpdate=G,It.needsUpdate=z,It.type=H}function gn(w){Lt("WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function En(w){const D=w.target;D.removeEventListener("dispose",En),xf(D)}function xf(w){vf(w),V.remove(w)}function vf(w){const D=V.get(w).programs;D!==void 0&&(D.forEach(function(G){at.releaseProgram(G)}),w.isShaderMaterial&&at.releaseShaderCache(w))}this.renderBufferDirect=function(w,D,G,z,H,ft){D===null&&(D=Qe);const _t=H.isMesh&&H.matrixWorld.determinantAffine()<0,dt=Sf(w,D,G,z,H);y.setMaterial(z,_t);let vt=G.index,wt=1;if(z.wireframe===!0){if(vt=q.getWireframeAttribute(G),vt===void 0)return;wt=2}const Bt=G.drawRange,Yt=G.attributes.position;let yt=Bt.start*wt,ie=(Bt.start+Bt.count)*wt;ft!==null&&(yt=Math.max(yt,ft.start*wt),ie=Math.min(ie,(ft.start+ft.count)*wt)),vt!==null?(yt=Math.max(yt,0),ie=Math.min(ie,vt.count)):Yt!=null&&(yt=Math.max(yt,0),ie=Math.min(ie,Yt.count));const Le=ie-yt;if(Le<0||Le===1/0)return;pt.setup(H,z,dt,G,vt);let ve,de=lt;if(vt!==null&&(ve=rt.get(vt),de=J,de.setIndex(ve)),H.isMesh)z.wireframe===!0?(y.setLineWidth(z.wireframeLinewidth*Ie()),de.setMode(U.LINES)):de.setMode(U.TRIANGLES);else if(H.isLine){let We=z.linewidth;We===void 0&&(We=1),y.setLineWidth(We*Ie()),H.isLineSegments?de.setMode(U.LINES):H.isLineLoop?de.setMode(U.LINE_LOOP):de.setMode(U.LINE_STRIP)}else H.isPoints?de.setMode(U.POINTS):H.isSprite&&de.setMode(U.TRIANGLES);if(H.isBatchedMesh)if(re.get("WEBGL_multi_draw"))de.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{const We=H._multiDrawStarts,mt=H._multiDrawCounts,Ze=H._multiDrawCount,$t=vt?rt.get(vt).bytesPerElement:1,cn=V.get(z).currentProgram.getUniforms();for(let An=0;An<Ze;An++)cn.setValue(U,"_gl_DrawID",An),de.render(We[An]/$t,mt[An])}else if(H.isInstancedMesh)de.renderInstances(yt,Le,H.count);else if(G.isInstancedBufferGeometry){const We=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,mt=Math.min(G.instanceCount,We);de.renderInstances(yt,Le,mt)}else de.render(yt,Le)};function yc(w,D,G,z){O!==null&&w.isNodeMaterial&&O.setObject(z,w),jt===!0&&At.setState(w,G,!1),w.transparent===!0&&w.side===en&&w.forceSinglePass===!1?(w.side=Ke,w.needsUpdate=!0,Dr(w,D,z),w.side=mi,w.needsUpdate=!0,Dr(w,D,z),w.side=en):Dr(w,D,z)}this.compile=function(w,D,G=null){G===null&&(G=w),O!==null&&O.renderStart(w,D,G),b=ot.get(G),b.init(D),v.push(b),G.traverseVisible(function(H){H.isLight&&H.layers.test(D.layers)&&(b.pushLight(H),H.castShadow&&b.pushShadow(H))}),w!==G&&w.traverseVisible(function(H){H.isLight&&H.layers.test(D.layers)&&(b.pushLight(H),H.castShadow&&b.pushShadow(H))}),b.setupLights(),O!==null&&O.updateLights(b.state.lightsArray),me=this.localClippingEnabled,jt=At.init(this.clippingPlanes,me),jt===!0&&At.setGlobalState(this.clippingPlanes,D),O!==null&&It.render(b.state.shadowsArray,G,D);const z=new Set;return w.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;const ft=H.material;if(ft)if(Array.isArray(ft))for(let _t=0;_t<ft.length;_t++){const dt=ft[_t];yc(dt,G,D,H),z.add(dt)}else yc(ft,G,D,H),z.add(ft)}),b=v.pop(),O!==null&&O.renderEnd(),z},this.compileAsync=function(w,D,G=null){const z=this.compile(w,D,G);return new Promise(H=>{function ft(){if(z.forEach(function(_t){const vt=V.get(_t).currentProgram;(vt===void 0||vt.isReady())&&z.delete(_t)}),z.size===0){H(w);return}setTimeout(ft,10)}re.get("KHR_parallel_shader_compile")!==null?ft():setTimeout(ft,10)})};let Za=null;function yf(w){Za&&Za(w)}function Mc(){_i.stop()}function Sc(){_i.start()}const _i=new Wd;_i.setAnimationLoop(yf),typeof self<"u"&&_i.setContext(self),this.setAnimationLoop=function(w){Za=w,bt.setAnimationLoop(w),w===null?_i.stop():_i.start()},bt.addEventListener("sessionstart",Mc),bt.addEventListener("sessionend",Sc),this.render=function(w,D){if(D!==void 0&&D.isCamera!==!0){Lt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;O!==null&&O.renderStart(w,D);const G=bt.enabled===!0&&bt.isPresenting===!0,z=E!==null&&(nt===null||G)&&E.begin(P,nt);if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),bt.enabled===!0&&bt.isPresenting===!0&&(E===null||E.isCompositing()===!1)&&(bt.cameraAutoUpdate===!0&&bt.updateCamera(D),D=bt.getCamera()),w.isScene===!0&&w.onBeforeRender(P,w,D,nt),b=ot.get(w,v.length),b.init(D),b.state.textureUnits=W.getTextureUnits(),v.push(b),Kt.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),Xt.setFromProjectionMatrix(Kt,Nn,D.reversedDepth),me=this.localClippingEnabled,jt=At.init(this.clippingPlanes,me),T=ht.get(w,R.length),T.init(),R.push(T),bt.enabled===!0&&bt.isPresenting===!0){const _t=P.xr.getDepthSensingMesh();_t!==null&&Ja(_t,D,-1/0,P.sortObjects)}Ja(w,D,0,P.sortObjects),T.finish(),O!==null&&O.updateLights(b.state.lightsArray),P.sortObjects===!0&&T.sort(xt,Ut),Se=bt.enabled===!1||bt.isPresenting===!1||bt.hasDepthSensing()===!1,Se&&Ot.addToRenderList(T,w),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),jt===!0&&At.beginShadows();const H=b.state.shadowsArray;if(It.render(H,w,D),jt===!0&&At.endShadows(),(z&&E.hasRenderPass())===!1){const _t=T.opaque,dt=T.transmissive;if(b.setupLights(),D.isArrayCamera){const vt=D.cameras;if(dt.length>0)for(let wt=0,Bt=vt.length;wt<Bt;wt++){const Yt=vt[wt];wc(_t,dt,w,Yt)}Se&&Ot.render(w);for(let wt=0,Bt=vt.length;wt<Bt;wt++){const Yt=vt[wt];bc(T,w,Yt,Yt.viewport)}}else dt.length>0&&wc(_t,dt,w,D),Se&&Ot.render(w),bc(T,w,D)}nt!==null&&Z===0&&(W.updateMultisampleRenderTarget(nt),W.updateRenderTargetMipmap(nt)),z&&E.end(P),w.isScene===!0&&w.onAfterRender(P,w,D),pt.resetDefaultState(),X=-1,Q=null,v.pop(),v.length>0?(b=v[v.length-1],W.setTextureUnits(b.state.textureUnits),jt===!0&&At.setGlobalState(P.clippingPlanes,b.state.camera)):b=null,R.pop(),R.length>0?T=R[R.length-1]:T=null,O!==null&&O.renderEnd()};function Ja(w,D,G,z){if(w.visible===!1)return;if(w.layers.test(D.layers)){if(w.isGroup)G=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(D);else if(w.isLightProbeGrid)b.pushLightProbeGrid(w);else if(w.isLight)b.pushLight(w),w.castShadow&&b.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||w.intersectsFrustum(Xt)){z&&He.setFromMatrixPosition(w.matrixWorld).applyMatrix4(Kt);const _t=$.update(w),dt=w.material;dt.visible&&T.push(w,_t,dt,G,He.z,null,D)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||w.intersectsFrustum(Xt))){const _t=$.update(w),dt=w.material;if(z&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),He.copy(w.boundingSphere.center)):(_t.boundingSphere===null&&_t.computeBoundingSphere(),He.copy(_t.boundingSphere.center)),He.applyMatrix4(w.matrixWorld).applyMatrix4(Kt)),Array.isArray(dt)){const vt=_t.groups;for(let wt=0,Bt=vt.length;wt<Bt;wt++){const Yt=vt[wt],yt=dt[Yt.materialIndex];yt&&yt.visible&&T.push(w,_t,yt,G,He.z,Yt,D)}}else dt.visible&&T.push(w,_t,dt,G,He.z,null,D)}}const ft=w.children;for(let _t=0,dt=ft.length;_t<dt;_t++)Ja(ft[_t],D,G,z)}function bc(w,D,G,z){const{opaque:H,transmissive:ft,transparent:_t}=w;b.setupLightsView(G),jt===!0&&At.setGlobalState(P.clippingPlanes,G),z&&y.viewport(et.copy(z)),H.length>0&&Lr(H,D,G),ft.length>0&&Lr(ft,D,G),_t.length>0&&Lr(_t,D,G),y.buffers.depth.setTest(!0),y.buffers.depth.setMask(!0),y.buffers.color.setMask(!0),y.setPolygonOffset(!1)}function wc(w,D,G,z){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[z.id]===void 0){const yt=re.has("EXT_color_buffer_half_float")||re.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[z.id]=new Mn(1,1,{generateMipmaps:!0,type:yt?Bn:an,minFilter:Jn,samples:Math.max(4,C.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:qt.workingColorSpace})}const ft=b.state.transmissionRenderTarget[z.id],_t=z.viewport||et;ft.setSize(_t.z*P.transmissionResolutionScale,_t.w*P.transmissionResolutionScale);const dt=P.getRenderTarget(),vt=P.getActiveCubeFace(),wt=P.getActiveMipmapLevel();P.setRenderTarget(ft),P.getClearColor(pe),Jt=P.getClearAlpha(),Jt<1&&P.setClearColor(16777215,.5),P.clear(),Se&&Ot.render(G);const Bt=P.toneMapping;P.toneMapping=On;const Yt=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),b.setupLightsView(z),jt===!0&&At.setGlobalState(P.clippingPlanes,z),Lr(w,G,z),W.updateMultisampleRenderTarget(ft),W.updateRenderTargetMipmap(ft),re.has("WEBGL_multisampled_render_to_texture")===!1){let yt=!1;for(let ie=0,Le=D.length;ie<Le;ie++){const ve=D[ie],{object:de,geometry:We,material:mt,group:Ze}=ve;if(mt.side===en&&de.layers.test(z.layers)){const $t=mt.side;mt.side=Ke,mt.needsUpdate=!0,Tc(de,G,z,We,mt,Ze),mt.side=$t,mt.needsUpdate=!0,yt=!0}}yt===!0&&(W.updateMultisampleRenderTarget(ft),W.updateRenderTargetMipmap(ft))}P.setRenderTarget(dt,vt,wt),P.setClearColor(pe,Jt),Yt!==void 0&&(z.viewport=Yt),P.toneMapping=Bt}function Lr(w,D,G){const z=D.isScene===!0?D.overrideMaterial:null;for(let H=0,ft=w.length;H<ft;H++){const _t=w[H],{object:dt,geometry:vt,group:wt}=_t;let Bt=_t.material;Bt.allowOverride===!0&&z!==null&&(Bt=z),dt.layers.test(G.layers)&&Tc(dt,D,G,vt,Bt,wt)}}function Tc(w,D,G,z,H,ft){O!==null&&H.isNodeMaterial&&O.setObject(w,H),w.onBeforeRender(P,D,G,z,H,ft),w.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),H.onBeforeRender(P,D,G,z,w,ft),H.transparent===!0&&H.side===en&&H.forceSinglePass===!1?(H.side=Ke,H.needsUpdate=!0,P.renderBufferDirect(G,D,z,H,w,ft),H.side=mi,H.needsUpdate=!0,P.renderBufferDirect(G,D,z,H,w,ft),H.side=en):P.renderBufferDirect(G,D,z,H,w,ft),w.onAfterRender(P,D,G,z,H,ft)}function Dr(w,D,G){D.isScene!==!0&&(D=Qe);const z=V.get(w),H=b.state.lights,ft=b.state.shadowsArray,_t=H.state.version,dt=at.getParameters(w,H.state,ft,D,G,b.state.lightProbeGridArray),vt=at.getProgramCacheKey(dt);let wt=z.programs;z.environment=w.isMeshStandardMaterial||w.isMeshLambertMaterial||w.isMeshPhongMaterial?D.environment:null,z.fog=D.fog;const Bt=w.isMeshStandardMaterial||w.isMeshLambertMaterial&&!w.envMap||w.isMeshPhongMaterial&&!w.envMap;z.envMap=st.get(w.envMap||z.environment,Bt),z.envMapRotation=z.environment!==null&&w.envMap===null?D.environmentRotation:w.envMapRotation,wt===void 0&&(w.addEventListener("dispose",En),wt=new Map,z.programs=wt);let Yt=wt.get(vt);if(Yt!==void 0){if(z.currentProgram===Yt&&z.lightsStateVersion===_t)return Ac(w,dt),Yt}else dt.uniforms=at.getUniforms(w),O!==null&&w.isNodeMaterial&&O.build(w,G,dt),w.onBeforeCompile(dt,P),Yt=at.acquireProgram(dt,vt),wt.set(vt,Yt),z.uniforms=dt.uniforms;const yt=z.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(yt.clippingPlanes=At.uniform),Ac(w,dt),z.needsLights=wf(w),z.lightsStateVersion=_t,z.needsLights&&(yt.ambientLightColor.value=H.state.ambient,yt.lightProbe.value=H.state.probe,yt.sunLights.value=H.state.sun,yt.sunLightShadows.value=H.state.sunShadow,yt.directionalLights.value=H.state.directional,yt.directionalLightShadows.value=H.state.directionalShadow,yt.spotLights.value=H.state.spot,yt.spotLightShadows.value=H.state.spotShadow,yt.rectAreaLights.value=H.state.rectArea,yt.ltc_1.value=H.state.rectAreaLTC1,yt.ltc_2.value=H.state.rectAreaLTC2,yt.pointLights.value=H.state.point,yt.pointLightShadows.value=H.state.pointShadow,yt.hemisphereLights.value=H.state.hemi,yt.sunShadowMatrix.value=H.state.sunShadowMatrix,yt.sunShadowCascade.value=H.state.sunShadowCascade,yt.directionalShadowMatrix.value=H.state.directionalShadowMatrix,yt.spotLightMatrix.value=H.state.spotLightMatrix,yt.spotLightMap.value=H.state.spotLightMap,yt.pointShadowMatrix.value=H.state.pointShadowMatrix),z.lightProbeGrid=b.state.lightProbeGridArray.length>0,z.currentProgram=Yt,z.uniformsList=null,Yt}function Ec(w){if(w.uniformsList===null){const D=w.currentProgram.getUniforms();w.uniformsList=Aa.seqWithValue(D.seq,w.uniforms)}return w.uniformsList}function Ac(w,D){const G=V.get(w);G.outputColorSpace=D.outputColorSpace,G.batching=D.batching,G.batchingColor=D.batchingColor,G.instancing=D.instancing,G.instancingColor=D.instancingColor,G.instancingMorph=D.instancingMorph,G.skinning=D.skinning,G.morphTargets=D.morphTargets,G.morphNormals=D.morphNormals,G.morphColors=D.morphColors,G.morphTargetsCount=D.morphTargetsCount,G.numClippingPlanes=D.numClippingPlanes,G.numIntersection=D.numClipIntersection,G.vertexAlphas=D.vertexAlphas,G.vertexTangents=D.vertexTangents,G.toneMapping=D.toneMapping}function Mf(w,D){if(w.length===0)return null;if(w.length===1)return w[0].texture!==null?w[0]:null;_.setFromMatrixPosition(D.matrixWorld);for(let G=0,z=w.length;G<z;G++){const H=w[G];if(H.texture!==null&&H.boundingBox.containsPoint(_))return H}return null}function Sf(w,D,G,z,H){D.isScene!==!0&&(D=Qe),W.resetTextureUnits();const ft=D.fog,_t=z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial?D.environment:null,dt=nt===null?P.outputColorSpace:nt.isXRRenderTarget===!0?nt.texture.colorSpace:qt.workingColorSpace,vt=z.isMeshStandardMaterial||z.isMeshLambertMaterial&&!z.envMap||z.isMeshPhongMaterial&&!z.envMap,wt=st.get(z.envMap||_t,vt),Bt=z.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Yt=!!G.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),yt=!!G.morphAttributes.position,ie=!!G.morphAttributes.normal,Le=!!G.morphAttributes.color;let ve=On;z.toneMapped&&(nt===null||nt.isXRRenderTarget===!0)&&(ve=P.toneMapping);const de=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,We=de!==void 0?de.length:0,mt=V.get(z),Ze=b.state.lights;if(jt===!0&&(me===!0||w!==Q)){const _e=w===Q&&z.id===X;At.setState(z,w,_e)}let $t=!1;z.version===mt.__version?(mt.needsLights&&mt.lightsStateVersion!==Ze.state.version||mt.outputColorSpace!==dt||H.isBatchedMesh&&mt.batching===!1||!H.isBatchedMesh&&mt.batching===!0||H.isBatchedMesh&&mt.batchingColor===!0&&H._colorsTexture===null||H.isBatchedMesh&&mt.batchingColor===!1&&H._colorsTexture!==null||H.isInstancedMesh&&mt.instancing===!1||!H.isInstancedMesh&&mt.instancing===!0||H.isSkinnedMesh&&mt.skinning===!1||!H.isSkinnedMesh&&mt.skinning===!0||H.isInstancedMesh&&mt.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&mt.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&mt.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&mt.instancingMorph===!1&&H.morphTexture!==null||mt.envMap!==wt||z.fog===!0&&mt.fog!==ft||mt.numClippingPlanes!==void 0&&(mt.numClippingPlanes!==At.numPlanes||mt.numIntersection!==At.numIntersection)||mt.vertexAlphas!==Bt||mt.vertexTangents!==Yt||mt.morphTargets!==yt||mt.morphNormals!==ie||mt.morphColors!==Le||mt.toneMapping!==ve||mt.morphTargetsCount!==We||!!mt.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&($t=!0):($t=!0,mt.__version=z.version);let cn=mt.currentProgram;$t===!0&&(cn=Dr(z,D,H),O&&z.isNodeMaterial&&O.onUpdateProgram(z,cn,mt));let An=!1,ii=!1,Fi=!1;const ce=cn.getUniforms(),Ae=mt.uniforms;if(y.useProgram(cn.program)&&(An=!0,ii=!0,Fi=!0),z.id!==X&&(X=z.id,ii=!0),mt.needsLights){const _e=Mf(b.state.lightProbeGridArray,H);mt.lightProbeGrid!==_e&&(mt.lightProbeGrid=_e,ii=!0)}if(An||Q!==w){y.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),ce.setValue(U,"projectionMatrix",w.projectionMatrix),ce.setValue(U,"viewMatrix",w.matrixWorldInverse);const ri=ce.map.cameraPosition;ri!==void 0&&ri.setValue(U,Me.setFromMatrixPosition(w.matrixWorld)),C.logarithmicDepthBuffer&&ce.setValue(U,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&ce.setValue(U,"isOrthographic",w.isOrthographicCamera===!0),Q!==w&&(Q=w,ii=!0,Fi=!0)}if(mt.needsLights&&(Ze.state.sunShadowMap.length>0&&ce.setValue(U,"sunShadowMap",Ze.state.sunShadowMap,W),Ze.state.directionalShadowMap.length>0&&ce.setValue(U,"directionalShadowMap",Ze.state.directionalShadowMap,W),Ze.state.spotShadowMap.length>0&&ce.setValue(U,"spotShadowMap",Ze.state.spotShadowMap,W),Ze.state.pointShadowMap.length>0&&ce.setValue(U,"pointShadowMap",Ze.state.pointShadowMap,W)),H.isSkinnedMesh){ce.setOptional(U,H,"bindMatrix"),ce.setOptional(U,H,"bindMatrixInverse");const _e=H.skeleton;_e&&(_e.boneTexture===null&&_e.computeBoneTexture(),ce.setValue(U,"boneTexture",_e.boneTexture,W))}H.isBatchedMesh&&(ce.setOptional(U,H,"batchingTexture"),ce.setValue(U,"batchingTexture",H._matricesTexture,W),ce.setOptional(U,H,"batchingIdTexture"),ce.setValue(U,"batchingIdTexture",H._indirectTexture,W),ce.setOptional(U,H,"batchingColorTexture"),H._colorsTexture!==null&&ce.setValue(U,"batchingColorTexture",H._colorsTexture,W));const si=G.morphAttributes;if((si.position!==void 0||si.normal!==void 0||si.color!==void 0)&&N.update(H,G,cn),(ii||mt.receiveShadow!==H.receiveShadow)&&(mt.receiveShadow=H.receiveShadow,ce.setValue(U,"receiveShadow",H.receiveShadow)),(z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial)&&z.envMap===null&&D.environment!==null&&(Ae.envMapIntensity.value=D.environmentIntensity),Ae.dfgLUT!==void 0&&(Ae.dfgLUT.value=Ey()),ii){if(ce.setValue(U,"toneMappingExposure",P.toneMappingExposure),mt.needsLights&&bf(Ae,Fi),ft&&z.fog===!0&&Et.refreshFogUniforms(Ae,ft),Et.refreshMaterialUniforms(Ae,z,j,Y,b.state.transmissionRenderTarget[w.id]),mt.needsLights&&mt.lightProbeGrid){const _e=mt.lightProbeGrid;Ae.probesSH.value=_e.texture,Ae.probesMin.value.copy(_e.boundingBox.min),Ae.probesMax.value.copy(_e.boundingBox.max),Ae.probesResolution.value.copy(_e.resolution)}Aa.upload(U,Ec(mt),Ae,W)}if(z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(Aa.upload(U,Ec(mt),Ae,W),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&ce.setValue(U,"center",H.center),ce.setValue(U,"modelViewMatrix",H.modelViewMatrix),ce.setValue(U,"normalMatrix",H.normalMatrix),ce.setValue(U,"modelMatrix",H.matrixWorld),z.uniformsGroups!==void 0){const _e=z.uniformsGroups;for(let ri=0,Bi=_e.length;ri<Bi;ri++){const Cc=_e[ri];tt.update(Cc,cn),tt.bind(Cc,cn)}}return cn}function bf(w,D){w.ambientLightColor.needsUpdate=D,w.lightProbe.needsUpdate=D,w.sunLights.needsUpdate=D,w.sunLightShadows.needsUpdate=D,w.directionalLights.needsUpdate=D,w.directionalLightShadows.needsUpdate=D,w.pointLights.needsUpdate=D,w.pointLightShadows.needsUpdate=D,w.spotLights.needsUpdate=D,w.spotLightShadows.needsUpdate=D,w.rectAreaLights.needsUpdate=D,w.hemisphereLights.needsUpdate=D}function wf(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return K},this.getActiveMipmapLevel=function(){return Z},this.getRenderTarget=function(){return nt},this.setRenderTargetTextures=function(w,D,G){const z=V.get(w);z.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),V.get(w.texture).__webglTexture=D,V.get(w.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:G,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,D){const G=V.get(w);G.__webglFramebuffer=D,G.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(w,D=0,G=0){nt=w,K=D,Z=G;let z=null,H=!1,ft=!1;if(w){const dt=V.get(w);if(dt.__useDefaultFramebuffer!==void 0){y.bindFramebuffer(U.FRAMEBUFFER,dt.__webglFramebuffer),et.copy(w.viewport),Pt.copy(w.scissor),Rt=w.scissorTest,y.viewport(et),y.scissor(Pt),y.setScissorTest(Rt),X=-1;return}else if(dt.__webglFramebuffer===void 0)W.setupRenderTarget(w);else if(dt.__hasExternalTextures)W.rebindTextures(w,V.get(w.texture).__webglTexture,V.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const Bt=w.depthTexture;if(dt.__boundDepthTexture!==Bt){if(Bt!==null&&V.has(Bt)&&(w.width!==Bt.image.width||w.height!==Bt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");W.setupDepthRenderbuffer(w)}}const vt=w.texture;(vt.isData3DTexture||vt.isDataArrayTexture||vt.isCompressedArrayTexture)&&(ft=!0);const wt=V.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(wt[D])?z=wt[D][G]:z=wt[D],H=!0):w.samples>0&&W.useMultisampledRTT(w)===!1?z=V.get(w).__webglMultisampledFramebuffer:Array.isArray(wt)?z=wt[G]:z=wt,et.copy(w.viewport),Pt.copy(w.scissor),Rt=w.scissorTest}else et.copy(gt).multiplyScalar(j).floor(),Pt.copy(Vt).multiplyScalar(j).floor(),Rt=Oe;if(G!==0&&(z=F),y.bindFramebuffer(U.FRAMEBUFFER,z)&&y.drawBuffers(w,z),y.viewport(et),y.scissor(Pt),y.setScissorTest(Rt),H){const dt=V.get(w.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+D,dt.__webglTexture,G)}else if(ft){const dt=D;for(let vt=0;vt<w.textures.length;vt++){const wt=V.get(w.textures[vt]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+vt,wt.__webglTexture,G,dt)}}else if(w!==null&&G!==0){const dt=V.get(w.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,dt.__webglTexture,G)}X=-1};function Rc(w){const D=V.get(w);return(D.__readFormat!==w.format||D.__readType!==w.type)&&(D.__readFormat=w.format,D.__readType=w.type,D.__formatReadable=C.textureFormatReadable(w.format),D.__typeReadable=C.textureTypeReadable(w.type)),D}this.readRenderTargetPixels=function(w,D,G,z,H,ft,_t,dt=0){if(!(w&&w.isWebGLRenderTarget)){Lt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let vt=V.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&_t!==void 0&&(vt=vt[_t]),vt){y.bindFramebuffer(U.FRAMEBUFFER,vt);try{const wt=w.textures[dt],Bt=wt.format,Yt=wt.type;w.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+dt);const yt=Rc(wt);if(yt.__formatReadable===!1){Lt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(yt.__typeReadable===!1){Lt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=w.width-z&&G>=0&&G<=w.height-H&&U.readPixels(D,G,z,H,ct.convert(Bt),ct.convert(Yt),ft)}finally{const wt=nt!==null?V.get(nt).__webglFramebuffer:null;y.bindFramebuffer(U.FRAMEBUFFER,wt)}}},this.readRenderTargetPixelsAsync=async function(w,D,G,z,H,ft,_t,dt=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let vt=V.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&_t!==void 0&&(vt=vt[_t]),vt)if(D>=0&&D<=w.width-z&&G>=0&&G<=w.height-H){y.bindFramebuffer(U.FRAMEBUFFER,vt);const wt=w.textures[dt],Bt=wt.format,Yt=wt.type;w.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+dt);const yt=Rc(wt);if(yt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(yt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ie=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,ie),U.bufferData(U.PIXEL_PACK_BUFFER,ft.byteLength,U.STREAM_READ),U.readPixels(D,G,z,H,ct.convert(Bt),ct.convert(Yt),0),U.bindBuffer(U.PIXEL_PACK_BUFFER,null);const Le=nt!==null?V.get(nt).__webglFramebuffer:null;y.bindFramebuffer(U.FRAMEBUFFER,Le);const ve=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await pp(U,ve,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,ie),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,ft),U.bindBuffer(U.PIXEL_PACK_BUFFER,null),U.deleteBuffer(ie),U.deleteSync(ve),ft}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,D=null,G=0){const z=Math.pow(2,-G),H=Math.floor(w.image.width*z),ft=Math.floor(w.image.height*z),_t=D!==null?D.x:0,dt=D!==null?D.y:0;W.setTexture2D(w,0),U.copyTexSubImage2D(U.TEXTURE_2D,G,0,0,_t,dt,H,ft),y.unbindTexture()},this.copyTextureToTexture=function(w,D,G=null,z=null,H=0,ft=0){let _t,dt,vt,wt,Bt,Yt,yt,ie,Le;const ve=w.isCompressedTexture?w.mipmaps[ft]:w.image;if(G!==null)_t=G.max.x-G.min.x,dt=G.max.y-G.min.y,vt=G.isBox3?G.max.z-G.min.z:1,wt=G.min.x,Bt=G.min.y,Yt=G.isBox3?G.min.z:0;else{const Ae=Math.pow(2,-H);_t=Math.floor(ve.width*Ae),dt=Math.floor(ve.height*Ae),w.isDataArrayTexture?vt=ve.depth:w.isData3DTexture?vt=Math.floor(ve.depth*Ae):vt=1,wt=0,Bt=0,Yt=0}z!==null?(yt=z.x,ie=z.y,Le=z.z):(yt=0,ie=0,Le=0);const de=ct.convert(D.format),We=ct.convert(D.type);let mt;D.isData3DTexture?(W.setTexture3D(D,0),mt=U.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(W.setTexture2DArray(D,0),mt=U.TEXTURE_2D_ARRAY):(W.setTexture2D(D,0),mt=U.TEXTURE_2D),y.activeTexture(U.TEXTURE0),y.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,D.flipY),y.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),y.pixelStorei(U.UNPACK_ALIGNMENT,D.unpackAlignment);const Ze=y.getParameter(U.UNPACK_ROW_LENGTH),$t=y.getParameter(U.UNPACK_IMAGE_HEIGHT),cn=y.getParameter(U.UNPACK_SKIP_PIXELS),An=y.getParameter(U.UNPACK_SKIP_ROWS),ii=y.getParameter(U.UNPACK_SKIP_IMAGES);y.pixelStorei(U.UNPACK_ROW_LENGTH,ve.width),y.pixelStorei(U.UNPACK_IMAGE_HEIGHT,ve.height),y.pixelStorei(U.UNPACK_SKIP_PIXELS,wt),y.pixelStorei(U.UNPACK_SKIP_ROWS,Bt),y.pixelStorei(U.UNPACK_SKIP_IMAGES,Yt);const Fi=w.isDataArrayTexture||w.isData3DTexture,ce=D.isDataArrayTexture||D.isData3DTexture;if(w.isDepthTexture){const Ae=V.get(w),si=V.get(D),_e=V.get(Ae.__renderTarget),ri=V.get(si.__renderTarget);y.bindFramebuffer(U.READ_FRAMEBUFFER,_e.__webglFramebuffer),y.bindFramebuffer(U.DRAW_FRAMEBUFFER,ri.__webglFramebuffer);for(let Bi=0;Bi<vt;Bi++)Fi&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,V.get(w).__webglTexture,H,Yt+Bi),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,V.get(D).__webglTexture,ft,Le+Bi)),U.blitFramebuffer(wt,Bt,_t,dt,yt,ie,_t,dt,U.DEPTH_BUFFER_BIT,U.NEAREST);y.bindFramebuffer(U.READ_FRAMEBUFFER,null),y.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(H!==0||w.isRenderTargetTexture||V.has(w)){const Ae=V.get(w),si=V.get(D);y.bindFramebuffer(U.READ_FRAMEBUFFER,L),y.bindFramebuffer(U.DRAW_FRAMEBUFFER,k);for(let _e=0;_e<vt;_e++)Fi?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Ae.__webglTexture,H,Yt+_e):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Ae.__webglTexture,H),ce?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,si.__webglTexture,ft,Le+_e):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,si.__webglTexture,ft),H!==0?U.blitFramebuffer(wt,Bt,_t,dt,yt,ie,_t,dt,U.COLOR_BUFFER_BIT,U.NEAREST):ce?U.copyTexSubImage3D(mt,ft,yt,ie,Le+_e,wt,Bt,_t,dt):U.copyTexSubImage2D(mt,ft,yt,ie,wt,Bt,_t,dt);y.bindFramebuffer(U.READ_FRAMEBUFFER,null),y.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else ce?w.isDataTexture||w.isData3DTexture?U.texSubImage3D(mt,ft,yt,ie,Le,_t,dt,vt,de,We,ve.data):D.isCompressedArrayTexture?U.compressedTexSubImage3D(mt,ft,yt,ie,Le,_t,dt,vt,de,ve.data):U.texSubImage3D(mt,ft,yt,ie,Le,_t,dt,vt,de,We,ve):w.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,ft,yt,ie,_t,dt,de,We,ve.data):w.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,ft,yt,ie,ve.width,ve.height,de,ve.data):U.texSubImage2D(U.TEXTURE_2D,ft,yt,ie,_t,dt,de,We,ve);y.pixelStorei(U.UNPACK_ROW_LENGTH,Ze),y.pixelStorei(U.UNPACK_IMAGE_HEIGHT,$t),y.pixelStorei(U.UNPACK_SKIP_PIXELS,cn),y.pixelStorei(U.UNPACK_SKIP_ROWS,An),y.pixelStorei(U.UNPACK_SKIP_IMAGES,ii),ft===0&&D.generateMipmaps&&U.generateMipmap(mt),y.unbindTexture()},this.initRenderTarget=function(w){V.get(w).__webglFramebuffer===void 0&&W.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?W.setTextureCube(w,0):w.isData3DTexture?W.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?W.setTexture2DArray(w,0):W.setTexture2D(w,0),y.unbindTexture()},this.resetState=function(){K=0,Z=0,nt=null,y.reset(),pt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Nn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=qt._getDrawingBufferColorSpace(t),e.unpackColorSpace=qt._getUnpackColorSpace()}}function jd(s,t=!1){const e=s[0].index!==null,n=new Set(Object.keys(s[0].attributes)),i=new Set(Object.keys(s[0].morphAttributes)),r={},a={},o=s[0].morphTargetsRelative,l=new Qt;let c=0;for(let h=0;h<s.length;++h){const u=s[h];let f=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const d in u.attributes){if(!n.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(u.attributes[d]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const d in u.morphAttributes){if(!i.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[d]===void 0&&(a[d]=[]),a[d].push(u.morphAttributes[d])}if(t){let d;if(e)d=u.index.count;else if(u.attributes.position!==void 0)d=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,d,h),c+=d}}if(e){let h=0;const u=[];for(let f=0;f<s.length;++f){const d=s[f].index;for(let p=0;p<d.count;++p)u.push(d.getX(p)+h);h+=s[f].attributes.position.count}l.setIndex(u)}for(const h in r){const u=su(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(const h in a){const u=a[h][0].length;if(u!==0){l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let f=0;f<u;++f){const d=[];for(let x=0;x<a[h].length;++x)d.push(a[h][x][f]);const p=su(d);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(p)}}}return l}function su(s){let t,e,n,i=-1,r=0;for(let c=0;c<s.length;++c){const h=s[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=h.gpuType),i!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}const a=new t(r),o=new Ce(a,e,n);let l=0;for(let c=0;c<s.length;++c){const h=s[c];if(h.isInterleavedBufferAttribute){const u=l/e;for(let f=0,d=h.count;f<d;f++)for(let p=0;p<e;p++){const x=h.getComponent(f,p);o.setComponent(f+u,p,x)}}else a.set(h.array,l);l+=h.count*e}return i!==void 0&&(o.gpuType=i),o}function ru(s,t){if(t===ep)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(t===Il||t===hd){let e=s.getIndex();if(e===null){const r=[],a=s.getAttribute("position");if(a!==void 0){for(let o=0;o<a.count;o++)r.push(o);s.setIndex(r),e=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}const n=e.count-2,i=[];if(t===Il)for(let r=1;r<=n;r++)i.push(e.getX(0)),i.push(e.getX(r)),i.push(e.getX(r+1));else for(let r=0;r<n;r++)r%2===0?(i.push(e.getX(r)),i.push(e.getX(r+1)),i.push(e.getX(r+2))):(i.push(e.getX(r+2)),i.push(e.getX(r+1)),i.push(e.getX(r)));return i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles."),s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",t),s}function Ry(s){const t=new Map,e=new Map,n=s.clone();return Qd(s,n,function(i,r){t.set(r,i),e.set(i,r)}),n.traverse(function(i){if(!i.isSkinnedMesh)return;const r=i,a=t.get(i),o=a.skeleton.bones;r.skeleton=a.skeleton.clone(),r.bindMatrix.copy(a.bindMatrix),r.skeleton.bones=o.map(function(l){return e.get(l)}),r.bind(r.skeleton,r.bindMatrix)}),n}function Qd(s,t,e){e(s,t);for(let n=0;n<s.children.length;n++)Qd(s.children[n],t.children[n],e)}class mc extends As{constructor(t){super(t),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(e){return new Dy(e)}),this.register(function(e){return new Ny(e)}),this.register(function(e){return new Gy(e)}),this.register(function(e){return new Wy(e)}),this.register(function(e){return new Xy(e)}),this.register(function(e){return new Oy(e)}),this.register(function(e){return new Fy(e)}),this.register(function(e){return new By(e)}),this.register(function(e){return new ky(e)}),this.register(function(e){return new Ly(e)}),this.register(function(e){return new zy(e)}),this.register(function(e){return new Uy(e)}),this.register(function(e){return new Vy(e)}),this.register(function(e){return new Hy(e)}),this.register(function(e){return new Py(e)}),this.register(function(e){return new au(e,Wt.EXT_MESHOPT_COMPRESSION)}),this.register(function(e){return new au(e,Wt.KHR_MESHOPT_COMPRESSION)}),this.register(function(e){return new Yy(e)})}load(t,e,n,i){const r=this;let a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){const c=ar.extractUrlBase(t);a=ar.resolveURL(c,this.path)}else a=ar.extractUrlBase(t);this.manager.itemStart(t);const o=function(c){i?i(c):console.error(c),r.manager.itemError(t),r.manager.itemEnd(t)},l=new Bd(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(t,function(c){try{r.parse(c,a,function(h){e(h),r.manager.itemEnd(t)},o)}catch(h){o(h)}},n,o)}setDRACOLoader(t){return this.dracoLoader=t,this}setKTX2Loader(t){return this.ktx2Loader=t,this}setMeshoptDecoder(t){return this.meshoptDecoder=t,this}register(t){return this.pluginCallbacks.indexOf(t)===-1&&this.pluginCallbacks.push(t),this}unregister(t){return this.pluginCallbacks.indexOf(t)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(t),1),this}parse(t,e,n,i){let r;const a={},o={},l=new TextDecoder;if(typeof t=="string")r=JSON.parse(t);else if(t instanceof ArrayBuffer)if(l.decode(new Uint8Array(t,0,4))===tf){try{a[Wt.KHR_BINARY_GLTF]=new qy(t)}catch(u){i&&i(u);return}r=JSON.parse(a[Wt.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(t));else r=t;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new aM(r,{path:e||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,a[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){const u=r.extensionsUsed[h],f=r.extensionsRequired||[];switch(u){case Wt.KHR_MATERIALS_UNLIT:a[u]=new Iy;break;case Wt.KHR_DRACO_MESH_COMPRESSION:a[u]=new Ky(r,this.dracoLoader);break;case Wt.KHR_TEXTURE_TRANSFORM:a[u]=new Zy;break;case Wt.KHR_MESH_QUANTIZATION:a[u]=new Jy;break;default:f.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(a),c.setPlugins(o),c.parse(n,i)}parseAsync(t,e){const n=this;return new Promise(function(i,r){n.parse(t,e,i,r)})}}function Cy(){let s={};return{get:function(t){return s[t]},add:function(t,e){s[t]=e},remove:function(t){delete s[t]},removeAll:function(){s={}}}}function Pe(s,t,e){const n=s.json.materials[t];return n.extensions&&n.extensions[e]?n.extensions[e]:null}const Wt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class Py{constructor(t){this.parser=t,this.name=Wt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const t=this.parser,e=this.parser.json.nodes||[];for(let n=0,i=e.length;n<i;n++){const r=e[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&t._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(t){const e=this.parser,n="light:"+t;let i=e.cache.get(n);if(i)return i;const r=e.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[t];let c;const h=new St(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],ln);const u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Hd(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new dc(h),c.distance=u;break;case"spot":c=new l0(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),Pn(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=e.createUniqueName(l.name||"light_"+t),i=Promise.resolve(c),e.cache.add(n,i),i}getDependency(t,e){if(t==="light")return this._loadLight(e)}createNodeAttachment(t){const e=this,n=this.parser,r=n.json.nodes[t],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return n._getNodeRef(e.cache,o,l)})}}class Iy{constructor(){this.name=Wt.KHR_MATERIALS_UNLIT}getMaterialType(){return Ue}extendParams(t,e,n){const i=[];t.color=new St(1,1,1),t.opacity=1;const r=e.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const a=r.baseColorFactor;t.color.setRGB(a[0],a[1],a[2],ln),t.opacity=a[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(t,"map",r.baseColorTexture,ye))}return Promise.all(i)}}class Ly{constructor(t){this.parser=t,this.name=Wt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(t,e){const n=Pe(this.parser,t,this.name);return n===null||n.emissiveStrength!==void 0&&(e.emissiveIntensity=n.emissiveStrength),Promise.resolve()}}class Dy{constructor(t){this.parser=t,this.name=Wt.KHR_MATERIALS_CLEARCOAT}getMaterialType(t){return Pe(this.parser,t,this.name)!==null?wn:null}extendMaterialParams(t,e){const n=Pe(this.parser,t,this.name);if(n===null)return Promise.resolve();const i=[];if(n.clearcoatFactor!==void 0&&(e.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&i.push(this.parser.assignTexture(e,"clearcoatMap",n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(e.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(e,"clearcoatRoughnessMap",n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(i.push(this.parser.assignTexture(e,"clearcoatNormalMap",n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){const r=n.clearcoatNormalTexture.scale;e.clearcoatNormalScale=new it(r,r)}return Promise.all(i)}}class Ny{constructor(t){this.parser=t,this.name=Wt.KHR_MATERIALS_DISPERSION}getMaterialType(t){return Pe(this.parser,t,this.name)!==null?wn:null}extendMaterialParams(t,e){const n=Pe(this.parser,t,this.name);return n===null||(e.dispersion=n.dispersion!==void 0?n.dispersion:0),Promise.resolve()}}class Uy{constructor(t){this.parser=t,this.name=Wt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(t){return Pe(this.parser,t,this.name)!==null?wn:null}extendMaterialParams(t,e){const n=Pe(this.parser,t,this.name);if(n===null)return Promise.resolve();const i=[];return n.iridescenceFactor!==void 0&&(e.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&i.push(this.parser.assignTexture(e,"iridescenceMap",n.iridescenceTexture)),n.iridescenceIor!==void 0&&(e.iridescenceIOR=n.iridescenceIor),e.iridescenceThicknessRange===void 0&&(e.iridescenceThicknessRange=[100,400]),n.iridescenceThicknessMinimum!==void 0&&(e.iridescenceThicknessRange[0]=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(e.iridescenceThicknessRange[1]=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&i.push(this.parser.assignTexture(e,"iridescenceThicknessMap",n.iridescenceThicknessTexture)),Promise.all(i)}}class Oy{constructor(t){this.parser=t,this.name=Wt.KHR_MATERIALS_SHEEN}getMaterialType(t){return Pe(this.parser,t,this.name)!==null?wn:null}extendMaterialParams(t,e){const n=Pe(this.parser,t,this.name);if(n===null)return Promise.resolve();const i=[];if(e.sheenColor=new St(0,0,0),e.sheenRoughness=0,e.sheen=1,n.sheenColorFactor!==void 0){const r=n.sheenColorFactor;e.sheenColor.setRGB(r[0],r[1],r[2],ln)}return n.sheenRoughnessFactor!==void 0&&(e.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&i.push(this.parser.assignTexture(e,"sheenColorMap",n.sheenColorTexture,ye)),n.sheenRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(e,"sheenRoughnessMap",n.sheenRoughnessTexture)),Promise.all(i)}}class Fy{constructor(t){this.parser=t,this.name=Wt.KHR_MATERIALS_TRANSMISSION}getMaterialType(t){return Pe(this.parser,t,this.name)!==null?wn:null}extendMaterialParams(t,e){const n=Pe(this.parser,t,this.name);if(n===null)return Promise.resolve();const i=[];return n.transmissionFactor!==void 0&&(e.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&i.push(this.parser.assignTexture(e,"transmissionMap",n.transmissionTexture)),Promise.all(i)}}class By{constructor(t){this.parser=t,this.name=Wt.KHR_MATERIALS_VOLUME}getMaterialType(t){return Pe(this.parser,t,this.name)!==null?wn:null}extendMaterialParams(t,e){const n=Pe(this.parser,t,this.name);if(n===null)return Promise.resolve();const i=[];e.thickness=n.thicknessFactor!==void 0?n.thicknessFactor:0,n.thicknessTexture!==void 0&&i.push(this.parser.assignTexture(e,"thicknessMap",n.thicknessTexture)),e.attenuationDistance=n.attenuationDistance||1/0;const r=n.attenuationColor||[1,1,1];return e.attenuationColor=new St().setRGB(r[0],r[1],r[2],ln),Promise.all(i)}}class ky{constructor(t){this.parser=t,this.name=Wt.KHR_MATERIALS_IOR}getMaterialType(t){return Pe(this.parser,t,this.name)!==null?wn:null}extendMaterialParams(t,e){const n=Pe(this.parser,t,this.name);return n===null||(e.ior=n.ior!==void 0?n.ior:1.5,e.ior===0&&(e.ior=1e3)),Promise.resolve()}}class zy{constructor(t){this.parser=t,this.name=Wt.KHR_MATERIALS_SPECULAR}getMaterialType(t){return Pe(this.parser,t,this.name)!==null?wn:null}extendMaterialParams(t,e){const n=Pe(this.parser,t,this.name);if(n===null)return Promise.resolve();const i=[];e.specularIntensity=n.specularFactor!==void 0?n.specularFactor:1,n.specularTexture!==void 0&&i.push(this.parser.assignTexture(e,"specularIntensityMap",n.specularTexture));const r=n.specularColorFactor||[1,1,1];return e.specularColor=new St().setRGB(r[0],r[1],r[2],ln),n.specularColorTexture!==void 0&&i.push(this.parser.assignTexture(e,"specularColorMap",n.specularColorTexture,ye)),Promise.all(i)}}class Hy{constructor(t){this.parser=t,this.name=Wt.EXT_MATERIALS_BUMP}getMaterialType(t){return Pe(this.parser,t,this.name)!==null?wn:null}extendMaterialParams(t,e){const n=Pe(this.parser,t,this.name);if(n===null)return Promise.resolve();const i=[];return e.bumpScale=n.bumpFactor!==void 0?n.bumpFactor:1,n.bumpTexture!==void 0&&i.push(this.parser.assignTexture(e,"bumpMap",n.bumpTexture)),Promise.all(i)}}class Vy{constructor(t){this.parser=t,this.name=Wt.KHR_MATERIALS_ANISOTROPY}getMaterialType(t){return Pe(this.parser,t,this.name)!==null?wn:null}extendMaterialParams(t,e){const n=Pe(this.parser,t,this.name);if(n===null)return Promise.resolve();const i=[];return n.anisotropyStrength!==void 0&&(e.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(e.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&i.push(this.parser.assignTexture(e,"anisotropyMap",n.anisotropyTexture)),Promise.all(i)}}class Gy{constructor(t){this.parser=t,this.name=Wt.KHR_TEXTURE_BASISU}loadTexture(t){const e=this.parser,n=e.json,i=n.textures[t];if(!i.extensions||!i.extensions[this.name])return null;const r=i.extensions[this.name],a=e.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return e.loadTextureImage(t,r.source,a)}}class Wy{constructor(t){this.parser=t,this.name=Wt.EXT_TEXTURE_WEBP}loadTexture(t){const e=this.name,n=this.parser,i=n.json,r=i.textures[t];if(!r.extensions||!r.extensions[e])return null;const a=r.extensions[e],o=i.images[a.source];let l=n.textureLoader;if(o.uri){const c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return n.loadTextureImage(t,a.source,l)}}class Xy{constructor(t){this.parser=t,this.name=Wt.EXT_TEXTURE_AVIF}loadTexture(t){const e=this.name,n=this.parser,i=n.json,r=i.textures[t];if(!r.extensions||!r.extensions[e])return null;const a=r.extensions[e],o=i.images[a.source];let l=n.textureLoader;if(o.uri){const c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return n.loadTextureImage(t,a.source,l)}}class au{constructor(t,e){this.name=e,this.parser=t}loadBufferView(t){const e=this.parser.json,n=e.bufferViews[t];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(e.extensionsRequired&&e.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){const l=i.byteOffset||0,c=i.byteLength||0,h=i.count,u=i.byteStride,f=new Uint8Array(o,l,c);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,u,f,i.mode,i.filter).then(function(d){return d.buffer}):a.ready.then(function(){const d=new ArrayBuffer(h*u);return a.decodeGltfBuffer(new Uint8Array(d),h,u,f,i.mode,i.filter),d})})}else return null}}class Yy{constructor(t){this.name=Wt.EXT_MESH_GPU_INSTANCING,this.parser=t}createNodeMesh(t){const e=this.parser.json,n=e.nodes[t];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=e.meshes[n.mesh];for(const c of i.primitives)if(c.mode!==un.TRIANGLES&&c.mode!==un.TRIANGLE_STRIP&&c.mode!==un.TRIANGLE_FAN&&c.mode!==void 0)return null;const a=n.extensions[this.name].attributes,o=[],l={};for(const c in a)o.push(this.parser.getDependency("accessor",a[c]).then(h=>(l[c]=h,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(t)),Promise.all(o).then(c=>{const h=c.pop(),u=h.isGroup?h.children:[h],f=c[0].count,d=[];for(const p of u){const x=new Dt,g=new A,m=new he,M=new A(1,1,1),S=new Md(p.geometry,p.material,f);for(let T=0;T<f;T++)l.TRANSLATION&&g.fromBufferAttribute(l.TRANSLATION,T),l.ROTATION&&m.fromBufferAttribute(l.ROTATION,T),l.SCALE&&M.fromBufferAttribute(l.SCALE,T),S.setMatrixAt(T,x.compose(g,m,M));let _=null;for(const T in l)if(T==="_COLOR_0"){const b=l[T];S.instanceColor=new Ua(b.array,b.itemSize,b.normalized)}else if(T!=="TRANSLATION"&&T!=="ROTATION"&&T!=="SCALE"){if(_===null){const R=S.geometry;_=new Qt,_.name=R.name;for(const v in R.attributes)_.setAttribute(v,R.attributes[v]);for(const v in R.morphAttributes)_.morphAttributes[v]=R.morphAttributes[v];R.index!==null&&_.setIndex(R.index),_.morphTargetsRelative=R.morphTargetsRelative;for(const v of R.groups)_.addGroup(v.start,v.count,v.materialIndex);R.boundingBox!==null&&(_.boundingBox=R.boundingBox.clone()),R.boundingSphere!==null&&(_.boundingSphere=R.boundingSphere.clone()),_.drawRange.start=R.drawRange.start,_.drawRange.count=R.drawRange.count,_.userData=Object.assign({},R.userData),S.geometry=_}const b=l[T];_.setAttribute(T,new Ua(b.array,b.itemSize,b.normalized))}xe.prototype.copy.call(S,p),this.parser.assignFinalMaterial(S),d.push(S)}return h.isGroup?(h.clear(),h.add(...d),h):d[0]}))}}const tf="glTF",Vs=12,ou={JSON:1313821514,BIN:5130562};class qy{constructor(t){this.name=Wt.KHR_BINARY_GLTF,this.content=null,this.body=null;const e=new DataView(t,0,Vs),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(t.slice(0,4))),version:e.getUint32(4,!0),length:e.getUint32(8,!0)},this.header.magic!==tf)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-Vs,r=new DataView(t,Vs);let a=0;for(;a<i;){const o=r.getUint32(a,!0);a+=4;const l=r.getUint32(a,!0);if(a+=4,l===ou.JSON){const c=new Uint8Array(t,Vs+a,o);this.content=n.decode(c)}else if(l===ou.BIN){const c=Vs+a;this.body=t.slice(c,c+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class Ky{constructor(t,e){if(!e)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Wt.KHR_DRACO_MESH_COMPRESSION,this.json=t,this.dracoLoader=e,this.dracoLoader.preload()}decodePrimitive(t,e){const n=this.json,i=this.dracoLoader,r=t.extensions[this.name].bufferView,a=t.extensions[this.name].attributes,o={},l={},c={};for(const h in a){const u=Bl[h]||h.toLowerCase();o[u]=a[h]}for(const h in t.attributes){const u=Bl[h]||h.toLowerCase();if(a[h]!==void 0){const f=n.accessors[t.attributes[h]],d=_s[f.componentType];c[u]=d.name,l[u]=f.normalized===!0}}return e.getDependency("bufferView",r).then(function(h){return new Promise(function(u,f){i.decodeDracoFile(h,function(d){for(const p in d.attributes){const x=d.attributes[p],g=l[p];g!==void 0&&(x.normalized=g)}u(d)},o,c,ln,f)})})}}class Zy{constructor(){this.name=Wt.KHR_TEXTURE_TRANSFORM}extendTexture(t,e){if((e.texCoord===void 0||e.texCoord===t.channel)&&e.offset===void 0&&e.rotation===void 0&&e.scale===void 0)return t;if(t=t.clone(),e.texCoord!==void 0&&(t.channel=e.texCoord),e.offset!==void 0&&t.offset.fromArray(e.offset),e.rotation!==void 0&&(t.rotation=e.rotation),e.scale!==void 0&&t.repeat.fromArray(e.scale),e.rotation!==void 0){const n=Math.cos(t.rotation),i=Math.sin(t.rotation);t.matrix.set(t.repeat.x*n,t.repeat.y*i,t.offset.x,-t.repeat.x*i,t.repeat.y*n,t.offset.y,0,0,1),t.matrixAutoUpdate=!1}return t.needsUpdate=!0,t}}class Jy{constructor(){this.name=Wt.KHR_MESH_QUANTIZATION}}class ef extends ws{constructor(t,e,n,i){super(t,e,n,i)}copySampleValue_(t){const e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=t*i*3+i;for(let a=0;a!==i;a++)e[a]=n[r+a];return e}interpolate_(t,e,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,h=i-e,u=(n-e)/h,f=u*u,d=f*u,p=t*c,x=p-c,g=-2*d+3*f,m=d-f,M=1-g,S=m-f+u;for(let _=0;_!==o;_++){const T=a[x+_+o],b=a[x+_+l]*h,R=a[p+_+o],v=a[p+_]*h;r[_]=M*T+S*b+g*R+m*v}return r}}const $y=new he;class jy extends ef{interpolate_(t,e,n,i){const r=super.interpolate_(t,e,n,i);return $y.fromArray(r).normalize().toArray(r),r}}const un={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},_s={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},lu={9728:Ne,9729:Be,9984:id,9985:Ma,9986:Js,9987:Jn},cu={33071:Dn,33648:Ca,10497:Pi},Fo={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Bl={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},ui={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Qy={CUBICSPLINE:void 0,LINEAR:pr,STEP:fr},Bo={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function tM(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new Ni({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:mi})),s.DefaultMaterial}function bi(s,t,e){for(const n in e.extensions)s[n]===void 0&&(t.userData.gltfExtensions=t.userData.gltfExtensions||{},t.userData.gltfExtensions[n]=e.extensions[n])}function Pn(s,t){t.extras!==void 0&&(typeof t.extras=="object"?Object.assign(s.userData,t.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+t.extras))}function eM(s,t,e){let n=!1,i=!1,r=!1;for(let c=0,h=t.length;c<h;c++){const u=t[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(s);const a=[],o=[],l=[];for(let c=0,h=t.length;c<h;c++){const u=t[c];if(n){const f=u.POSITION!==void 0?e.getDependency("accessor",u.POSITION):s.attributes.position;a.push(f)}if(i){const f=u.NORMAL!==void 0?e.getDependency("accessor",u.NORMAL):s.attributes.normal;o.push(f)}if(r){const f=u.COLOR_0!==void 0?e.getDependency("accessor",u.COLOR_0):s.attributes.color;l.push(f)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){const h=c[0],u=c[1],f=c[2];return n&&(s.morphAttributes.position=h),i&&(s.morphAttributes.normal=u),r&&(s.morphAttributes.color=f),s.morphTargetsRelative=!0,s})}function nM(s,t){if(s.updateMorphTargets(),t.weights!==void 0)for(let e=0,n=t.weights.length;e<n;e++)s.morphTargetInfluences[e]=t.weights[e];if(t.extras&&Array.isArray(t.extras.targetNames)){const e=t.extras.targetNames;if(s.morphTargetInfluences.length===e.length){s.morphTargetDictionary={};for(let n=0,i=e.length;n<i;n++)s.morphTargetDictionary[e[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function iM(s){let t;const e=s.extensions&&s.extensions[Wt.KHR_DRACO_MESH_COMPRESSION];if(e?t="draco:"+e.bufferView+":"+e.indices+":"+ko(e.attributes):t=s.indices+":"+ko(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,i=s.targets.length;n<i;n++)t+=":"+ko(s.targets[n]);return t}function ko(s){let t="";const e=Object.keys(s).sort();for(let n=0,i=e.length;n<i;n++)t+=e[n]+":"+s[e[n]]+";";return t}function kl(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function sM(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":s.search(/\.ktx2($|\?)/i)>0||s.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const rM=new Dt;class aM{constructor(t={},e={}){this.json=t,this.extensions={},this.plugins={},this.options=e,this.cache=new Cy,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,r=!1,a=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){const o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;const l=o.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||r&&a<98?this.textureLoader=new kd(this.options.manager):this.textureLoader=new u0(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Bd(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(t){this.extensions=t}setPlugins(t){this.plugins=t}parse(t,e){const n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){const o={scene:a[0][i.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:i.asset,parser:n,userData:{}};return bi(r,o,i),Pn(o,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){for(const l of o.scenes)l.updateMatrixWorld();t(o)})}).catch(e)}_markDefs(){const t=this.json.nodes||[],e=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=e.length;i<r;i++){const a=e[i].joints;for(let o=0,l=a.length;o<l;o++)t[a[o]].isBone=!0}for(let i=0,r=t.length;i<r;i++){const a=t[i];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(t,e){e!==void 0&&(t.refs[e]===void 0&&(t.refs[e]=t.uses[e]=0),t.refs[e]++)}_getNodeRef(t,e,n){if(t.refs[e]<=1)return n;const i=n.clone(),r=(a,o)=>{const l=this.associations.get(a);l!=null&&this.associations.set(o,l);for(const[c,h]of a.children.entries())r(h,o.children[c])};return r(n,i),i.name+="_instance_"+t.uses[e]++,i}_invokeOne(t){const e=Object.values(this.plugins);e.push(this);for(let n=0;n<e.length;n++){const i=t(e[n]);if(i)return i}return null}_invokeAll(t){const e=Object.values(this.plugins);e.unshift(this);const n=[];for(let i=0;i<e.length;i++){const r=t(e[i]);r&&n.push(r)}return n}getDependency(t,e){const n=t+":"+e;let i=this.cache.get(n);if(!i){switch(t){case"scene":i=this.loadScene(e);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(e)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(e)});break;case"accessor":i=this.loadAccessor(e);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(e)});break;case"buffer":i=this.loadBuffer(e);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(e)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(e)});break;case"skin":i=this.loadSkin(e);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(e)});break;case"camera":i=this.loadCamera(e);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(t,e)}),!i)throw new Error("Unknown type: "+t);break}this.cache.add(n,i)}return i}getDependencies(t){let e=this.cache.get(t);if(!e){const n=this,i=this.json[t+(t==="mesh"?"es":"s")]||[];e=Promise.all(i.map(function(r,a){return n.getDependency(t,a)})),this.cache.add(t,e)}return e}loadBuffer(t){const e=this.json.buffers[t],n=this.fileLoader;if(e.type&&e.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+e.type+" buffer type is not supported.");if(e.uri===void 0&&t===0)return Promise.resolve(this.extensions[Wt.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(r,a){n.load(ar.resolveURL(e.uri,i.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+e.uri+'".'))})})}loadBufferView(t){const e=this.json.bufferViews[t];return this.getDependency("buffer",e.buffer).then(function(n){const i=e.byteLength||0,r=e.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(t){const e=this,n=this.json,i=this.json.accessors[t];if(i.bufferView===void 0&&i.sparse===void 0){const a=Fo[i.type],o=_s[i.componentType],l=i.normalized===!0,c=new o(i.count*a);return Promise.resolve(new Ce(c,a,l))}const r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(a){const o=a[0],l=Fo[i.type],c=_s[i.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,f=i.byteOffset||0,d=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,p=i.normalized===!0;let x,g;if(d&&d!==u){const m=Math.floor(f/d),M="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+m+":"+i.count;let S=e.cache.get(M);S||(x=new c(o,m*d,i.count*d/h),S=new _d(x,d/h),e.cache.add(M,S)),g=new xr(S,l,f%d/h,p)}else o===null?x=new c(i.count*l):x=new c(o,f,i.count*l),g=new Ce(x,l,p);if(i.sparse!==void 0){const m=Fo.SCALAR,M=_s[i.sparse.indices.componentType],S=i.sparse.indices.byteOffset||0,_=i.sparse.values.byteOffset||0,T=new M(a[1],S,i.sparse.count*m),b=new c(a[2],_,i.sparse.count*l);o!==null&&(g=new Ce(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let R=0,v=T.length;R<v;R++){const E=T[R];if(g.setX(E,b[R*l]),l>=2&&g.setY(E,b[R*l+1]),l>=3&&g.setZ(E,b[R*l+2]),l>=4&&g.setW(E,b[R*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=p}return g})}loadTexture(t){const e=this.json,n=this.options,r=e.textures[t].source,a=e.images[r];let o=this.textureLoader;if(a.uri){const l=n.manager.getHandler(a.uri);l!==null&&(o=l)}return this.loadTextureImage(t,r,o)}loadTextureImage(t,e,n){const i=this,r=this.json,a=r.textures[t],o=r.images[e],l=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(e,n).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);const f=(r.samplers||{})[a.sampler]||{};return h.magFilter=lu[f.magFilter]||Be,h.minFilter=lu[f.minFilter]||Jn,h.wrapS=cu[f.wrapS]||Pi,h.wrapT=cu[f.wrapT]||Pi,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==Ne&&h.minFilter!==Be,i.associations.set(h,{textures:t}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(t,e){const n=this,i=this.json,r=this.options;if(this.sourceCache[t]!==void 0)return this.sourceCache[t].then(u=>u.clone());const a=i.images[t],o=self.URL||self.webkitURL;let l=a.uri||"",c=!1;if(a.bufferView!==void 0)l=n.getDependency("bufferView",a.bufferView).then(function(u){c=!0;const f=new Blob([u],{type:a.mimeType});return l=o.createObjectURL(f),l});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+t+" is missing URI and bufferView");const h=Promise.resolve(l).then(function(u){return new Promise(function(f,d){let p=f;e.isImageBitmapLoader===!0&&(p=function(x){const g=new Ee(x);g.needsUpdate=!0,f(g)}),e.load(ar.resolveURL(u,r.path),p,void 0,d)})}).then(function(u){return c===!0&&o.revokeObjectURL(l),Pn(u,a),u.userData.mimeType=a.mimeType||sM(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[t]=h,h}assignTexture(t,e,n,i){const r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[Wt.KHR_TEXTURE_TRANSFORM]){const o=n.extensions!==void 0?n.extensions[Wt.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const l=r.associations.get(a);a=r.extensions[Wt.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,l)}}return i!==void 0&&(a.colorSpace=i),t[e]=a,a})}assignFinalMaterial(t){const e=t.geometry;let n=t.material;const i=e.attributes.tangent===void 0,r=e.attributes.color!==void 0,a=e.attributes.normal===void 0;if(t.isPoints){const o="PointsMaterial:"+n.uuid;let l=this.cache.get(o);l||(l=new ps,nn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(o,l)),n=l}else if(t.isLine){const o="LineBasicMaterial:"+n.uuid;let l=this.cache.get(o);l||(l=new vr,nn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(o,l)),n=l}if(i||r||a){let o="ClonedMaterial:"+n.uuid+":";i&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=n.clone(),r&&(l.vertexColors=!0),a&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(n))),n=l}t.material=n}getMaterialType(){return Ni}loadMaterial(t){const e=this,n=this.json,i=this.extensions,r=n.materials[t];let a;const o={},l=r.extensions||{},c=[];if(l[Wt.KHR_MATERIALS_UNLIT]){const u=i[Wt.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),c.push(u.extendParams(o,r,e))}else{const u=r.pbrMetallicRoughness||{};if(o.color=new St(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){const f=u.baseColorFactor;o.color.setRGB(f[0],f[1],f[2],ln),o.opacity=f[3]}u.baseColorTexture!==void 0&&c.push(e.assignTexture(o,"map",u.baseColorTexture,ye)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(e.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),c.push(e.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(t)}),c.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(t,o)})))}r.doubleSided===!0&&(o.side=en);const h=r.alphaMode||Bo.OPAQUE;if(h===Bo.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===Bo.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==Ue&&(c.push(e.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new it(1,1),r.normalTexture.scale!==void 0)){const u=r.normalTexture.scale;o.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&a!==Ue&&(c.push(e.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==Ue){const u=r.emissiveFactor;o.emissive=new St().setRGB(u[0],u[1],u[2],ln)}return r.emissiveTexture!==void 0&&a!==Ue&&c.push(e.assignTexture(o,"emissiveMap",r.emissiveTexture,ye)),Promise.all(c).then(function(){const u=new a(o);return r.name&&(u.name=r.name),Pn(u,r),e.associations.set(u,{materials:t}),r.extensions&&bi(i,u,r),u})}createUniqueName(t){const e=se.sanitizeNodeName(t||"");return e in this.nodeNamesUsed?e+"_"+ ++this.nodeNamesUsed[e]:(this.nodeNamesUsed[e]=0,e)}loadGeometries(t){const e=this,n=this.extensions,i=this.primitiveCache;function r(o){return n[Wt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,e).then(function(l){return hu(l,o,e)})}const a=[];for(let o=0,l=t.length;o<l;o++){const c=t[o],h=iM(c),u=i[h];if(u)a.push(u.promise);else{let f;c.extensions&&c.extensions[Wt.KHR_DRACO_MESH_COMPRESSION]?f=r(c):f=hu(new Qt,c,e),c.mode===un.TRIANGLE_STRIP?f=f.then(d=>ru(d,hd)):c.mode===un.TRIANGLE_FAN&&(f=f.then(d=>ru(d,Il))),i[h]={primitive:c,promise:f},a.push(f)}}return Promise.all(a)}loadMesh(t){const e=this,n=this.json,i=this.extensions,r=n.meshes[t],a=r.primitives,o=[];for(let l=0,c=a.length;l<c;l++){const h=a[l].material===void 0?tM(this.cache):this.getDependency("material",a[l].material);o.push(h)}return o.push(e.loadGeometries(a)),Promise.all(o).then(async function(l){const c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let d=0,p=h.length;d<p;d++){const x=h[d],g=a[d];let m;const M=c[d];if(g.mode===un.TRIANGLES||g.mode===un.TRIANGLE_STRIP||g.mode===un.TRIANGLE_FAN||g.mode===void 0){const S=r.isSkinnedMesh===!0,_=x.hasAttribute("skinIndex")&&x.hasAttribute("skinWeight");S&&_===!1&&console.warn("THREE.GLTFLoader: Missing skinIndex or skinWeight attributes. Skinning disabled."),m=S&&_?new em(x,M):new te(x,M),m.isSkinnedMesh===!0&&m.normalizeSkinWeights()}else if(g.mode===un.LINES)m=new Sd(x,M);else if(g.mode===un.LINE_STRIP)m=new Cr(x,M);else if(g.mode===un.LINE_LOOP)m=new rm(x,M);else if(g.mode===un.POINTS)m=new rc(x,M);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(m.geometry.morphAttributes).length>0&&nM(m,r),m.name=e.createUniqueName(r.name||"mesh_"+t),Pn(m,r),g.extensions&&bi(i,m,g),e.assignFinalMaterial(m),u.push(m)}for(let d=0,p=u.length;d<p;d++)e.associations.set(u[d],{meshes:t,primitives:d});if(u.length===1)return r.extensions&&bi(i,u[0],r),u[0];const f=new Gt;r.extensions&&bi(i,f,r),e.associations.set(f,{meshes:t});for(let d=0,p=u.length;d<p;d++)f.add(u[d]);return f})}loadCamera(t){let e;const n=this.json.cameras[t],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?e=new je(Te.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(e=new Xa(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(e.name=this.createUniqueName(n.name)),Pn(e,n),Promise.resolve(e)}loadSkin(t){const e=this.json.skins[t],n=[];for(let i=0,r=e.joints.length;i<r;i++)n.push(this._loadNodeShallow(e.joints[i]));return e.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",e.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const r=i.pop(),a=i,o=[],l=[];for(let c=0,h=a.length;c<h;c++){const u=a[c];if(u){o.push(u);const f=new Dt;r!==null&&f.fromArray(r.array,c*16),l.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',e.joints[c])}return new ic(o,l)})}loadAnimation(t){const e=this.json,n=this,i=e.animations[t],r=i.name?i.name:"animation_"+t,a=[],o=[],l=[],c=[],h=[];for(let u=0,f=i.channels.length;u<f;u++){const d=i.channels[u],p=i.samplers[d.sampler],x=d.target,g=x.node,m=i.parameters!==void 0?i.parameters[p.input]:p.input,M=i.parameters!==void 0?i.parameters[p.output]:p.output;x.node!==void 0&&(a.push(this.getDependency("node",g)),o.push(this.getDependency("accessor",m)),l.push(this.getDependency("accessor",M)),c.push(p),h.push(x))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){const f=u[0],d=u[1],p=u[2],x=u[3],g=u[4],m=[];for(let S=0,_=f.length;S<_;S++){const T=f[S],b=d[S],R=p[S],v=x[S],E=g[S];if(T===void 0)continue;T.updateMatrix&&T.updateMatrix();const P=n._createAnimationTracks(T,b,R,v,E);if(P)for(let I=0;I<P.length;I++)m.push(P[I])}const M=new Er(r,void 0,m);return Pn(M,i),M})}createNodeMesh(t){const e=this.json,n=this,i=e.nodes[t];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){const a=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let l=0,c=i.weights.length;l<c;l++)o.morphTargetInfluences[l]=i.weights[l]}),a})}loadNode(t){const e=this.json,n=this,i=e.nodes[t],r=n._loadNodeShallow(t),a=[],o=i.children||[];for(let c=0,h=o.length;c<h;c++)a.push(n.getDependency("node",o[c]));const l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(a),l]).then(function(c){const h=c[0],u=c[1],f=c[2];f!==null&&h.traverse(function(d){d.isSkinnedMesh&&d.bind(f,rM)});for(let d=0,p=u.length;d<p;d++)h.add(u[d]);if(h.userData.pivot!==void 0&&u.length>0){const d=h.userData.pivot,p=u[0];h.pivot=new A().fromArray(d),h.position.x-=d[0],h.position.y-=d[1],h.position.z-=d[2],p.position.set(0,0,0),delete h.userData.pivot}return h})}_loadNodeShallow(t){const e=this.json,n=this.extensions,i=this;if(this.nodeCache[t]!==void 0)return this.nodeCache[t];const r=e.nodes[t],a=r.name?i.createUniqueName(r.name):"",o=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(t)});return l&&o.push(l),r.camera!==void 0&&o.push(i.getDependency("camera",r.camera).then(function(c){return i._getNodeRef(i.cameraCache,r.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(t)}).forEach(function(c){o.push(c)}),this.nodeCache[t]=Promise.all(o).then(function(c){let h;if(r.isBone===!0?h=new yd:c.length>1?h=new Gt:c.length===1?h=c[0]:h=new xe,h!==c[0])for(let u=0,f=c.length;u<f;u++)h.add(c[u]);if(r.name&&(h.userData.name=r.name,h.name=a),Pn(h,r),r.extensions&&bi(n,h,r),r.matrix!==void 0){const u=new Dt;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);if(!i.associations.has(h))i.associations.set(h,{});else if(r.mesh!==void 0&&i.meshCache.refs[r.mesh]>1){const u=i.associations.get(h);i.associations.set(h,{...u})}return i.associations.get(h).nodes=t,h}),this.nodeCache[t]}loadScene(t){const e=this.extensions,n=this.json.scenes[t],i=this,r=new Gt;n.name&&(r.name=i.createUniqueName(n.name)),Pn(r,n),n.extensions&&bi(e,r,n);const a=n.nodes||[],o=[];for(let l=0,c=a.length;l<c;l++)o.push(i.getDependency("node",a[l]));return Promise.all(o).then(function(l){for(let h=0,u=l.length;h<u;h++){const f=l[h];f.parent!==null?r.add(Ry(f)):r.add(f)}const c=h=>{const u=new Map;for(const[f,d]of i.associations)(f instanceof nn||f instanceof Ee)&&u.set(f,d);return h.traverse(f=>{const d=i.associations.get(f);d!=null&&u.set(f,d)}),u};return i.associations=c(r),r})}_createAnimationTracks(t,e,n,i,r){const a=[],o=t.name?t.name:t.uuid,l=[];function c(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}ui[r.path]===ui.weights?(c(t),t.isGroup&&t.children.forEach(c)):l.push(o);let h;switch(ui[r.path]){case ui.weights:h=wr;break;case ui.rotation:h=Tr;break;case ui.translation:case ui.scale:h=Ba;break;default:n.itemSize===1?h=wr:h=Ba;break}const u=i.interpolation!==void 0?Qy[i.interpolation]:pr,f=this._getArrayFromAccessor(n);for(let d=0,p=l.length;d<p;d++){const x=new h(l[d]+"."+ui[r.path],e.array,f,u);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(x),a.push(x)}return a}_getArrayFromAccessor(t){let e=t.array;if(t.normalized){const n=kl(e.constructor),i=new Float32Array(e.length);for(let r=0,a=e.length;r<a;r++)i[r]=e[r]*n;e=i}return e}_createCubicSplineTrackInterpolant(t){t.createInterpolant=function(n){const i=this instanceof Tr?jy:ef;return new i(this.times,this.values,this.getValueSize()/3,n)},t.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function oM(s,t,e){const n=t.attributes,i=new bn;if(n.POSITION!==void 0){const o=e.json.accessors[n.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(i.set(new A(l[0],l[1],l[2]),new A(c[0],c[1],c[2])),o.normalized){const h=kl(_s[o.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=t.targets;if(r!==void 0){const o=new A,l=new A;for(let c=0,h=r.length;c<h;c++){const u=r[c];if(u.POSITION!==void 0){const f=e.json.accessors[u.POSITION],d=f.min,p=f.max;if(d!==void 0&&p!==void 0){if(l.setX(Math.max(Math.abs(d[0]),Math.abs(p[0]))),l.setY(Math.max(Math.abs(d[1]),Math.abs(p[1]))),l.setZ(Math.max(Math.abs(d[2]),Math.abs(p[2]))),f.normalized){const x=kl(_s[f.componentType]);l.multiplyScalar(x)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(o)}s.boundingBox=i;const a=new zn;i.getCenter(a.center),a.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=a}function hu(s,t,e){const n=t.attributes,i=[];function r(a,o){return e.getDependency("accessor",a).then(function(l){s.setAttribute(o,l)})}for(const a in n){const o=Bl[a]||a.toLowerCase();o in s.attributes||i.push(r(n[a],o))}if(t.indices!==void 0&&!s.index){const a=e.getDependency("accessor",t.indices).then(function(o){s.setIndex(o)});i.push(a)}return qt.workingColorSpace!==ln&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${qt.workingColorSpace}" not supported.`),Pn(s,t),oM(s,t,e),Promise.all(i).then(function(){return t.targets!==void 0?eM(s,t.targets,e):s})}const lM=new mc,uu=new Map,nf=s=>new URL(s,document.baseURI).href;async function cM(s){const t=nf(s);let e=uu.get(t);return e||(e=lM.loadAsync(t).then(n=>hM(n.scene)),uu.set(t,e)),(await e).clone()}function hM(s){s.updateMatrixWorld(!0);const t=new Map;s.traverse(n=>{const i=n;if(!i.isMesh||i.isSkinnedMesh)return;const r=Array.isArray(i.material)?i.material:[i.material],a=i.geometry.groups.length?i.geometry.groups:[{start:0,count:1/0,materialIndex:0}],o=i.geometry.index?i.geometry.toNonIndexed():i.geometry.clone();o.applyMatrix4(i.matrixWorld);for(const l of a){const c=Ar(r[l.materialIndex??0]),h=a.length>1?uM(o,l.start,l.count):o,u=`${c.uuid}|${Object.keys(h.attributes).sort().join(",")}`,f=t.get(u)??{material:c,parts:[]};f.parts.push(h),t.set(u,f)}});const e=new Gt;for(const{material:n,parts:i}of t.values()){const r=i.length===1?i[0]:jd(i,!1);r&&(r.computeBoundingSphere(),e.add(new te(r,n)))}return e}function uM(s,t,e){const n=s.getAttribute("position").count,i=Math.min(n,t+e),r=new Qt;for(const[a,o]of Object.entries(s.attributes)){const l=o;r.setAttribute(a,new Ce(l.array.slice(t*l.itemSize,i*l.itemSize),l.itemSize,l.normalized))}return r}const du=new WeakMap;function Ar(s){if(!(s instanceof wn))return s;let t=du.get(s);if(!t){const e=new Ni;Ni.prototype.copy.call(e,s),du.set(s,e),t=e}return t}function dM(s){const t=new kd().load(nf(s));t.colorSpace=ye;const e=new te(new ni(60,32,16),new Ue({map:t,side:Ke,depthWrite:!1,fog:!1}));return e.renderOrder=-1,e.name="sky",e}const Rr=(s,t,e,n)=>s+(t-s)*(1-Math.exp(-e*n));class sf{constructor(t,e,n,i=[]){this.root=t,this.head=e,this.neck=n,this.eyes=i}root;head;neck;eyes;target=new A(0,1.1,1.5);yaw=0;pitch=0;wanderT=0;wander=new it;tmpV=new A;tmpQ=new he;tmpQ2=new he;rootQ=new he;up=new A(0,1,0);right=new A;rest=new Map;restore(){for(const[t,e]of this.rest)t.quaternion.copy(e)}update(t,e,n){if(!this.head)return;this.root.getWorldQuaternion(this.rootQ);const i=this.head.getWorldPosition(this.tmpV.set(0,0,0)),r=this.tmpV.copy(this.target).sub(i);r.applyQuaternion(this.tmpQ.copy(this.rootQ).invert()),this.wanderT-=t,this.wanderT<=0&&(this.wanderT=1.5+Math.random()*3,this.wander.set((Math.random()-.5)*.12,(Math.random()-.5)*.06));let a=Math.atan2(r.x,r.z)+this.wander.x,o=Math.atan2(r.y,Math.hypot(r.x,r.z))+this.wander.y;n==="thinking"&&(a+=.35,o+=.22+Math.sin(e*.5)*.03),n==="listening"&&(o-=.04),a=Te.clamp(a,-.9,.9),o=Te.clamp(o,-.45,.35),this.yaw=Rr(this.yaw,a,5,t),this.pitch=Rr(this.pitch,o,5,t),this.up.set(0,1,0).applyQuaternion(this.rootQ),this.right.set(1,0,0).applyQuaternion(this.rootQ);const l=this.eyes.length?1:1/.8,c=[[this.neck,.35*l],[this.head,.45*l]];for(const[h,u]of c)h&&this.rotateBoneWorld(h,this.yaw*u,-this.pitch*u);for(const h of this.eyes)this.rotateBoneWorld(h,this.yaw*.25,-this.pitch*.25)}rotateBoneWorld(t,e,n){const i=t.parent;if(!i)return;const r=this.rest.get(t)??new he;this.rest.set(t,r.copy(t.quaternion));const a=t.getWorldQuaternion(this.tmpQ),o=this.tmpQ2.setFromAxisAngle(this.up,e);o.multiply(new he().setFromAxisAngle(this.right,n)),a.premultiply(o);const l=i.getWorldQuaternion(new he);t.quaternion.copy(l.invert().multiply(a)),t.updateMatrixWorld(!0)}}class rf{next=2;t=-1;update(t){if(this.next-=t,this.t<0&&this.next<=0&&(this.t=0,this.next=2.5+Math.random()*4),this.t<0)return 0;this.t+=t;const e=.16;return this.t>=e?(this.t=-1,0):1-Math.abs(1-this.t/e*2)}}const fu=.6,fM=.8,pu=1.3,mu=.3,gu=new St("#45d2ec"),pM=new St("#b9a8ff"),mM={idle:"Idle",sit:"Sit_Idle",walk:"Walk",run:"Run",wave:"Wave",celebrate:"Celebrate",dance:"Dance"};class gc{object=new Gt;model;mixer;actions={};current;base;oneShot=!1;gaze;blinker=new rf;mouths=[];lids=[];shines=[];antennae=[[],[]];sway=new Map;posture="seated";speed=0;state="idle";expression="neutral";mouthTarget=0;mouth01=0;wobble=0;greeted=!1;static async load(t){const e=await new mc().loadAsync(t);return new gc(e.scene,e.animations)}constructor(t,e){this.object.name="alien",this.model=t,t.scale.multiplyScalar(fu),this.object.add(t),this.object.updateMatrixWorld(!0);const n={};t.traverse(l=>{const c=l;if(!c.isMesh)return;c.frustumCulled=!1;const h=c.material.name;n[h]=c});const i=n.Jelly_Cyan_Violet,r=n.Eyes,a=n.Mouth_Cavity,o=t.getObjectByName("Head");if(i&&(i.material=xM(Ar(i.material))),r&&(r.material=new Ni({color:"#1d1838",roughness:.12,metalness:0})),a&&(a.material=Ar(a.material)),i&&a&&this.buildMouth([i,a],a),r&&o)for(const l of _M(r))this.buildEye(l,o);for(const[l,c]of[["L",this.antennae[0]],["R",this.antennae[1]]])for(let h=1;h<=5;h++){const u=t.getObjectByName(`Antenna_0${h}_${l}`);u&&c.push(u)}this.gaze=new sf(this.object,o,t.getObjectByName("Neck")),this.mixer=new Vd(t);for(const[l,c]of Object.entries(mM)){const h=Er.findByName(e,c);h&&(this.actions[l]=this.mixer.clipAction(h))}for(const l of["wave","celebrate","dance"]){const c=this.actions[l];c&&(c.setLoop(Jl,1),c.clampWhenFinished=!0)}this.mixer.addEventListener("finished",()=>{this.oneShot=!1,this.play(this.base,.4)}),this.setBase(this.actions.sit,0)}buildMouth(t,e){const n=zl(e),i=new bn().setFromPoints(n),r=(i.min.x+i.max.x)/2,a=i.max.y,o=i.min.y,l=Math.max(a-o,1e-4),c=(i.max.x-i.min.x)/2,h=i.min.z-l*1.5,u=l*1.6,f=Te.smoothstep;for(const d of t){const p=d===e?n:zl(d),x=gM(d),g=new Float32Array(p.length*3),m=new A;p.forEach((S,_)=>{if(S.z<h||S.y>a||S.y<o-l*2.2)return;const T=1-f(Math.abs(S.x-r),c*.75,c*1.35);if(T<=0)return;const b=S.y>=o?(a-S.y)/l:1-f(o-S.y,0,l*2.2);m.set(0,-u*T*b,0).applyMatrix3(x),g.set([m.x,m.y,m.z],_*3)});const M=d.geometry;M.morphAttributes={position:[new Ht(g,3)]},M.morphTargetsRelative=!0,d.updateMorphTargets(),d.morphTargetDictionary={mouthOpen:0},d.morphTargetInfluences=[0],this.mouths.push(d)}}buildEye(t,e){const n=(o,l)=>{const c=new Dt().compose(l,this.object.getWorldQuaternion(new he),new A(1,1,1));c.premultiply(e.matrixWorld.clone().invert()),c.decompose(o.position,o.quaternion,o.scale),e.add(o)},i=new Gt,r=new te(new ni(1,24,16),new Ni({color:gu,emissive:gu.clone().multiplyScalar(.45),roughness:.3}));r.scale.copy(t.radii).multiplyScalar(1.07),r.position.y=-t.radii.y*1.07,i.add(r),i.visible=!1,n(i,t.center.clone().setY(t.center.y+t.radii.y*1.07)),this.lids.push({pivot:i,sy:i.scale.y});const a=new Ue({color:"#ffffff"});for(const[o,l,c]of[[-.3,.38,.3],[.28,-.3,.13]]){const h=new it(t.center.x+o*t.radii.x,t.center.y+l*t.radii.y);let u=t.center.z+t.radii.z*.8,f=1/0;for(const p of t.front){const x=(p.x-h.x)**2+(p.y-h.y)**2;x<f&&(f=x,u=p.z)}const d=new te(new Pr(c*t.radii.x,20),a);n(d,new A(h.x,h.y,u+t.radii.z*.04)),this.shines.push({dot:d,coveredAt:(1-l)/2})}}play(t,e=mu){!t||t===this.current||(t.reset().setEffectiveWeight(1).play(),this.current&&this.current.crossFadeTo(t,e,!1),this.current=t)}setBase(t,e=mu){this.base=t,this.oneShot||this.play(t,e)}playOnce(t){const e=this.actions[t];return!e||this.posture==="seated"?!1:(this.oneShot=!0,this.current===e?e.reset().play():this.play(e,.25),!0)}perform(t){return t==="celebrate"&&(this.wobble=1),this.playOnce(t)}setPosture(t){const e=t==="flying"?"standing":t;e!==this.posture&&(this.posture=e,this.oneShot=!1,this.setBase(e==="seated"?this.actions.sit:this.actions.idle))}setLocomotion(t){if(this.speed=t,this.posture==="standing")if(t>.08){const e=t>pu&&this.actions.run,n=e?this.actions.run:this.actions.walk;this.oneShot=!1,this.setBase(n,.25),n&&(n.timeScale=Te.clamp(t/(e?pu*1.6:fM),.6,1.6))}else this.setBase(this.actions.idle,.3)}setState(t){t!==this.state&&(t==="speaking"&&!this.greeted&&(this.greeted=!0,this.speed<.08&&this.playOnce("wave")),t==="reacting"&&(this.wobble=1,this.speed<.08&&this.playOnce("celebrate")),this.state=t)}setMouthOpen(t){this.mouthTarget=Te.clamp(t,0,1)}lookAt(t){this.gaze.target.copy(t)}gesture(t){}setExpression(t){this.expression=t}update(t,e){for(const[c,h]of this.sway)c.quaternion.multiply(h.invert());this.gaze.restore(),this.mixer.update(t),this.object.updateMatrixWorld(!0);const n=this.state==="speaking"||this.state==="storytelling";this.mouth01=Rr(this.mouth01,n?this.mouthTarget:0,18,t);let i=this.mouth01;(this.state==="interrupted"||this.expression==="surprised")&&(i=Math.max(i,.35));for(const c of this.mouths)c.morphTargetInfluences[0]=i;let r=this.blinker.update(t);this.state==="reacting"&&(r=Math.max(r,.55));for(const{pivot:c,sy:h}of this.lids)c.visible=r>.02,c.scale.y=h*Math.max(r,.001);for(const{dot:c,coveredAt:h}of this.shines)c.visible=r<h;this.wobble=Math.max(0,this.wobble-t*.9);const a=Math.sin(e*2.2)*.012+this.mouth01*Math.sin(e*17)*.012+this.wobble*Math.sin(e*14)*.06,o=fu;this.model.scale.set(o*(1-a*.5),o*(1+a),o*(1-a*.5));const l=.6+this.mouth01*.8+this.wobble*2+Math.min(this.speed,1.5)*.5;this.antennae.forEach((c,h)=>{c.forEach((u,f)=>{const d=(f+1)*.022*l,p=this.sway.get(u)??new he;p.setFromEuler(new Sn(Math.sin(e*3.1+f*.7+h)*d,0,Math.sin(e*2.3+f*.9+h*2)*d*.8)),u.quaternion.multiply(p),this.sway.set(u,p)})}),this.gaze.update(t,e,this.state)}dispose(){this.mixer.stopAllAction(),this.object.traverse(t=>{const e=t;if(!e.isMesh)return;e.geometry.dispose();const n=Array.isArray(e.material)?e.material:[e.material];for(const i of n){for(const r of Object.values(i))r instanceof Ee&&r.dispose();i.dispose()}}),this.object.removeFromParent()}}function zl(s){const t=s.geometry.attributes.position,e=[];for(let n=0;n<t.count;n++){const i=new A().fromBufferAttribute(t,n);s.applyBoneTransform(n,i),e.push(i.applyMatrix4(s.matrixWorld))}return e}function gM(s){const t=r=>s.applyBoneTransform(0,r.clone()).applyMatrix4(s.matrixWorld),e=t(new A),n=[new A(1,0,0),new A(0,1,0),new A(0,0,1)].map(r=>t(r).sub(e));return new Nt().set(n[0].x,n[1].x,n[2].x,n[0].y,n[1].y,n[2].y,n[0].z,n[1].z,n[2].z).invert()}function _M(s){const t=zl(s),e=t.reduce((n,i)=>n+i.x,0)/t.length;return[t.filter(n=>n.x<e),t.filter(n=>n.x>=e)].map(n=>{const i=new bn().setFromPoints(n),r=i.getCenter(new A),a=i.getSize(new A).multiplyScalar(.5),o=n.filter(l=>l.z>r.z);return{center:r,radii:a,front:o}})}function xM(s){return s.roughness=.28,s.emissiveMap=s.map,s.emissive=new St(.42,.42,.42),s.onBeforeCompile=t=>{t.uniforms.rimColor={value:pM},t.fragmentShader=t.fragmentShader.replace("#include <common>",`#include <common>
uniform vec3 rimColor;`).replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
        float rim = 1.0 - saturate(dot(normal, normalize(vViewPosition)));
        totalEmissiveRadiance += rimColor * pow(rim, 2.5) * 0.55;`)},s.customProgramCacheKey=()=>"jelly-rim",s}const vM=1.65,_u=.1,yM=1,MM=.35,zo=(s,t)=>s.getObjectByName(t)??s.getObjectByName(t.replace(/\./g,""));class _c{object=new Gt;mixer;faces=[];gaze;blinker=new rf;model;actions={};oneShot=!1;current;posture="seated";state="idle";expression="neutral";mouthTarget=0;mouth01=0;morph={blink:0,eyes_wide:0,eyes_happy:0,brows_up:0,brows_angry:0,brows_sad:0,brow_raise_L:0,smile:0,frown:0,mouth_oo:0,mouth_open:0};static async load(t){const e=await new mc().loadAsync(t);return new _c(e.scene,e.animations)}constructor(t,e){this.object.name="glb-elder",this.model=t,t.scale.setScalar(vM),t.position.set(0,_u,-.02),this.object.add(t),t.traverse(r=>{const a=r;a.isMesh&&(a.frustumCulled=!1,a.material=Array.isArray(a.material)?a.material.map(Ar):Ar(a.material),a.morphTargetDictionary&&"mouth_open"in a.morphTargetDictionary&&this.faces.push(a))});const n=["Eye.L","Eye.R"].map(r=>zo(t,r)).filter(r=>!!r);this.gaze=new sf(this.object,zo(t,"Head"),zo(t,"Neck"),n),this.mixer=new Vd(t);const i=r=>{const a=Er.findByName(e,r);return a?this.mixer.clipAction(a):void 0};this.actions.sit=i("sit_idle")??i("idle"),this.actions.stand=i("idle"),this.actions.walk=i("walk"),this.actions.celebrate=i("celebrate"),this.actions.dance=i("ardah");for(const r of[this.actions.celebrate,this.actions.dance])r?.setLoop(Jl,1),r&&(r.clampWhenFinished=!0);this.mixer.addEventListener("finished",()=>{this.oneShot=!1,this.play(this.posture==="seated"?this.actions.sit:this.actions.stand,.4)}),this.play(this.actions.sit,0)}play(t,e=MM){!t||t===this.current||(t.reset().setEffectiveWeight(1).play(),this.current&&this.current.crossFadeTo(t,e,!1),this.current=t)}setPosture(t){const e=t==="flying"?"standing":t;e!==this.posture&&(this.posture=e,this.oneShot=!1,this.model.position.y=e==="seated"?_u:0,this.play(e==="seated"?this.actions.sit:this.actions.stand))}perform(t){const e=t==="wave"?void 0:this.actions[t];return!e||this.posture==="seated"?!1:(this.oneShot=!0,this.current===e?e.reset().play():this.play(e,.3),!0)}setLocomotion(t){if(this.posture!=="standing"||this.oneShot)return;const e=this.actions.walk;t>.08?(this.play(e,.25),e&&(e.timeScale=Te.clamp(t/yM,.5,1.5))):this.play(this.actions.stand,.3)}setState(t){this.state=t}setMouthOpen(t){this.mouthTarget=Te.clamp(t,0,1)}lookAt(t){this.gaze.target.copy(t)}gesture(t){}setExpression(t){this.expression=t}update(t,e){this.gaze.restore(),this.mixer.update(t),this.object.updateMatrixWorld(!0);const n=this.state==="speaking"||this.state==="storytelling";this.mouth01=Rr(this.mouth01,n?this.mouthTarget:0,18,t);const i={blink:0,eyes_wide:0,eyes_happy:0,brows_up:0,brows_angry:0,brows_sad:0,brow_raise_L:0,smile:.12,frown:0,mouth_oo:0,mouth_open:0};switch(this.state){case"listening":i.brows_up=.35,i.eyes_wide=.15;break;case"thinking":i.brow_raise_L=.6,i.mouth_oo=.15;break;case"speaking":case"storytelling":i.brows_up=.15+this.mouth01*.35,i.smile=this.state==="storytelling"?.25:.15;break;case"reacting":i.smile=1,i.eyes_happy=.8;break;case"interrupted":i.brows_up=.8,i.eyes_wide=.5;break}this.expression==="smile"&&(i.smile=Math.max(i.smile,.8)),this.expression==="surprised"&&(i.brows_up=Math.max(i.brows_up,.8)),this.expression==="thoughtful"&&(i.brow_raise_L=Math.max(i.brow_raise_L,.5)),i.mouth_open=this.mouth01,i.mouth_oo=Math.max(i.mouth_oo,this.mouth01*.25*(.5+.5*Math.sin(e*7))),i.blink=this.blinker.update(t);for(const r of Object.keys(i))this.morph[r]=r==="blink"||r==="mouth_open"?i[r]:Rr(this.morph[r],i[r],6,t);for(const r of this.faces){const a=r.morphTargetDictionary,o=r.morphTargetInfluences;for(const l of Object.keys(this.morph)){const c=a[l];c!==void 0&&(o[c]=this.morph[l])}}this.gaze.update(t,e,this.state)}dispose(){this.mixer.stopAllAction(),this.object.traverse(t=>{const e=t;if(!e.isMesh)return;e.geometry.dispose();const n=Array.isArray(e.material)?e.material:[e.material];for(const i of n){for(const r of Object.values(i))r instanceof Ee&&r.dispose();i.dispose()}}),this.object.removeFromParent()}}class fe{parts=[];tmp=new xe;add(t,e,n=[0,0,0],i=[0,0,0],r=[1,1,1]){const a=t.index?t.toNonIndexed():t.clone();t.dispose(),a.deleteAttribute("uv"),this.tmp.position.set(...n),this.tmp.rotation.set(...i),this.tmp.scale.set(...r),this.tmp.updateMatrix(),a.applyMatrix4(this.tmp.matrix);const o=new St(e),l=a.getAttribute("position").count,c=new Float32Array(l*3);for(let h=0;h<l;h++)c.set([o.r,o.g,o.b],h*3);return a.setAttribute("color",new Ce(c,3)),this.parts.push(a),this}get size(){return this.parts.length}build(t=bM()){const e=jd(this.parts,!1);if(!e)throw new Error("MergedBuilder: incompatible geometries");return this.parts.forEach(n=>n.dispose()),this.parts=[],e.computeBoundingSphere(),new te(e,t)}}let SM=null;function bM(){return SM??=new gs({vertexColors:!0})}const Zt=(s,t,e)=>new Ui(s,t,e),zt=(s,t=12,e=10)=>new ni(s,t,e),Re=(s,t,e,n=12,i=!1)=>new Li(s,t,e,n,1,i),ss="#f3c39a",Ho="#e7a983",wi="#3a2216",xu="#20c5b5",vu="#ff8fb1",wM="#7b4a1f",TM="#8e4ce0",EM="#3fbf5f",yu="#2a9a49",AM="#ffd23f",Mu="#ff6f61",Su="#8a2537",RM=.12,bu=.1,CM=.55,qe=(s,t,e,n)=>s+(t-s)*(1-Math.exp(-e*n));function PM(){const s=new Uint8Array([90,170,255]),t=new Ha(s,s.length,1,za);return t.minFilter=t.magFilter=Ne,t.needsUpdate=!0,t}function xc(s,t,e){const n=document.createElement("canvas");n.width=s,n.height=t;const i=n.getContext("2d");if(!i)throw new Error("2D canvas unavailable");e(i);const r=new bs(n);return r.colorSpace=ye,r}function IM(){return xc(256,256,s=>{const t=["#ff6f61","#ffbf3c","#20c5b5","#9b5de5","#ff6f61","#ffbf3c"],e=256/t.length;t.forEach((n,i)=>{s.fillStyle=n,s.fillRect(0,i*e,256,e)}),s.fillStyle="#fff6e0";for(let n=0;n<t.length;n++){const i=n*e+e/2;for(let r=0;r<256;r+=32)s.beginPath(),s.moveTo(r+4,i),s.lineTo(r+16,i-e*.3),s.lineTo(r+28,i),s.lineTo(r+16,i+e*.3),s.closePath(),s.fill()}})}function LM(){return xc(128,128,s=>{const t=s.createLinearGradient(0,0,128,128);t.addColorStop(0,"rgba(255,143,177,0.85)"),t.addColorStop(.35,"rgba(255,210,63,0.75)"),t.addColorStop(.65,"rgba(32,197,181,0.75)"),t.addColorStop(1,"rgba(155,93,229,0.85)"),s.fillStyle=t,s.fillRect(0,0,128,128),s.strokeStyle="rgba(255,255,255,0.9)",s.lineWidth=3,s.beginPath(),s.moveTo(4,124),s.quadraticCurveTo(70,70,120,8),s.stroke()})}function DM(){return xc(64,64,s=>{const t=s.createRadialGradient(32,32,0,32,32,30);t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(.3,"rgba(255,230,140,0.8)"),t.addColorStop(1,"rgba(255,230,140,0)"),s.fillStyle=t,s.fillRect(0,0,64,64)})}function NM(){const s=new Cd;return s.moveTo(0,0),s.bezierCurveTo(.05,.22,.3,.32,.36,.2),s.bezierCurveTo(.4,.1,.22,.02,.18,-.02),s.bezierCurveTo(.26,-.08,.24,-.2,.14,-.2),s.bezierCurveTo(.06,-.2,.02,-.1,0,0),s}class UM{object=new Gt;hover=new Gt;body=new Gt;dress;head=new Gt;eyes=[];pupils=[];brows=[];smile;mouthOpen;star;wings=[];sparkles;sparkleBase;armL;armR;legs=[];state="idle";expression="neutral";posture="seated";walk=0;walkPhase=0;mouthTarget=0;mouth01=0;lookTarget=new A(0,1.1,1.5);yaw=0;pitch=0;nextBlink=1.5;blinkT=-1;lean=0;tilt=0;browUp=0;happy=0;hoverY=bu;act=null;tmp=new A;tmpM=new Dt;disposables=[];constructor(){this.object.name="nawwara",this.object.scale.setScalar(CM);const t=this.keep(PM()),e=this.keep(new wh({vertexColors:!0,gradientMap:t})),n=(h,u=e)=>{const f=h.build(u);return this.keep(f.geometry),f};this.object.add(this.hover),this.hover.add(this.body);const i=[[0,0],[.2,0],[.19,.04],[.15,.14],[.115,.24],[.1,.3],[0,.31]].map(([h,u])=>new it(h,u)),r=this.keep(IM());this.dress=new te(this.keep(new Va(i,24)),this.keep(new wh({map:r,gradientMap:t}))),this.dress.position.y=.17,this.body.add(this.dress),this.body.add(n(new fe().add(zt(1,16,10),Mu,[0,.47,0],[0,0,0],[.11,.06,.095]).add(new Un(.105,.012,6,24),"#ffbf3c",[0,.2,0],[Math.PI/2,0,0]).add(new Li(.035,.04,.06,10),ss,[0,.5,0])));for(const h of[-1,1]){const u=new Gt;u.position.set(h*.06,.2,0),u.add(n(new fe().add(new nr(.03,.12,4,10),ss,[0,-.1,0]).add(zt(1,12,8),TM,[0,-.19,.025],[0,0,0],[.042,.03,.06]))),this.body.add(u),this.legs.push(u)}this.armR=this.buildArm(-1,n),this.armL=this.buildArm(1,n),this.head.position.set(0,.67,0),this.body.add(this.head),this.head.add(n(new fe().add(zt(.165,24,18),ss).add(zt(1,10,8),Ho,[-.158,-.01,0],[0,0,0],[.025,.035,.02]).add(zt(1,10,8),Ho,[.158,-.01,0],[0,0,0],[.025,.035,.02]).add(zt(1,8,6),Ho,[0,-.025,.163],[0,0,0],[.016,.012,.012]).add(zt(1,12,8),vu,[-.085,-.05,.135],[0,-.55,0],[.032,.022,.01]).add(zt(1,12,8),vu,[.085,-.05,.135],[0,.55,0],[.032,.022,.01]).add(new ni(.172,24,14,0,Math.PI*2,0,Math.PI*.42),wi,[0,.02,-.006]).add(zt(1,16,10),wi,[0,.118,.105],[.45,0,0],[.12,.035,.05]).add(zt(.075,14,10),wi,[-.19,0,-.04]).add(zt(.075,14,10),wi,[.19,0,-.04]).add(zt(.06,12,8),wi,[-.22,-.09,-.05]).add(zt(.06,12,8),wi,[.22,-.09,-.05]).add(new Un(.04,.013,6,16),xu,[-.17,.035,-.035],[0,Math.PI/2,0]).add(new Un(.04,.013,6,16),xu,[.17,.035,-.035],[0,Math.PI/2,0]).add(new ms(.03,.14,6),EM,[0,.21,0],[0,0,0],[1,1,.45]).add(new ms(.028,.12,6),yu,[-.05,.19,0],[0,0,.5],[1,1,.45]).add(new ms(.028,.12,6),yu,[.05,.19,0],[0,0,-.5],[1,1,.45]))),this.star=new te(this.keep(new cc(.035,0)),this.keep(new Ue({color:AM}))),this.star.position.set(0,.3,0),this.head.add(this.star);for(const h of[-1,1]){const u=new Gt;u.position.set(h*.058,-.005,.145),u.add(n(new fe().add(zt(1,16,12),"#ffffff",[0,0,0],[0,0,0],[.042,.05,.022])));const f=new Gt;f.add(n(new fe().add(zt(1,14,10),wM,[0,0,.012],[0,0,0],[.029,.035,.014]).add(zt(1,12,8),"#1d120b",[0,0,.02],[0,0,0],[.017,.021,.01]).add(zt(.008,8,6),"#ffffff",[.01,.014,.03]).add(zt(.004,6,4),"#ffffff",[-.008,-.01,.03]))),u.add(f),this.head.add(u),this.eyes.push(u),this.pupils.push(f);const d=n(new fe().add(Zt(.045,.008,.01),wi));d.position.set(h*.06,.062,.152),this.head.add(d),this.brows.push(d)}this.smile=n(new fe().add(new Un(.03,.006,6,16,Math.PI),Su,[0,0,0],[0,0,Math.PI])),this.smile.position.set(0,-.075,.15),this.head.add(this.smile),this.mouthOpen=n(new fe().add(zt(1,14,10),Su,[0,0,0],[0,0,0],[.03,.025,.012]).add(zt(1,10,8),"#ff7a93",[0,-.012,.004],[0,0,0],[.018,.01,.01])),this.mouthOpen.position.set(0,-.075,.152),this.head.add(this.mouthOpen);const a=this.keep(new hc(NM(),12)),o=this.keep(new Ue({map:this.keep(LM()),transparent:!0,side:en,depthWrite:!1}));for(const h of[-1,1]){const u=new Gt;u.position.set(h*.03,.44,-.08);const f=new te(a,o);f.scale.set(h*1.25,1.25,1.25),u.add(f),this.body.add(u),this.wings.push(f)}const l=14;this.sparkleBase=new Float32Array(l*3);for(let h=0;h<l;h++)this.sparkleBase.set([Math.random()*Math.PI*2,.25+Math.random()*.75,.22+Math.random()*.15],h*3);const c=this.keep(new Qt);c.setAttribute("position",new Ce(new Float32Array(l*3),3)),this.sparkles=new rc(c,this.keep(new ps({map:this.keep(DM()),size:.035,transparent:!0,depthWrite:!1,blending:Ra}))),this.sparkles.frustumCulled=!1,this.hover.add(this.sparkles)}buildArm(t,e){const n=new Gt;n.position.set(t*.105,.46,0),n.add(e(new fe().add(zt(.042,12,8),Mu).add(new nr(.022,.08,4,8),ss,[0,-.07,0])));const i=new Gt;return i.position.set(0,-.12,0),i.add(e(new fe().add(new nr(.02,.07,4,8),ss,[0,-.045,0]).add(zt(.03,10,8),ss,[0,-.1,.005]))),n.add(i),this.body.add(n),{root:n,lower:i}}keep(t){return this.disposables.push(t),t}setState(t){this.state=t}setMouthOpen(t){this.mouthTarget=Te.clamp(t,0,1)}lookAt(t){this.lookTarget.copy(t)}gesture(t){}perform(t){return this.act={kind:t,t:0},!0}setPosture(t){this.posture=t,t==="seated"&&(this.walk=0)}setLocomotion(t){this.walk=this.posture==="seated"?0:t}setExpression(t){this.expression=t}update(t,e){const n=this.state,i=n==="speaking"||n==="storytelling",r=this.posture==="flying",a=!r&&this.walk>.08,o=this.posture==="seated"?bu:r?0:RM,l=n==="reacting"?Math.abs(Math.sin(e*9))*.06:0;this.hoverY=qe(this.hoverY,o,6,t),this.hover.position.y=this.hoverY+Math.sin(e*2.3)*(this.posture==="seated"?.004:.02)+l;const c=r?.25*Math.min(1,this.walk/1.2)+(n==="listening"?.08:0):a?.12*Math.min(1,this.walk):n==="listening"?.1:n==="interrupted"?-.05:0,h=n==="listening"?.14:n==="thinking"?-.1:i?Math.sin(e*1.4)*.06:0;this.lean=qe(this.lean,c,6,t),this.tilt=qe(this.tilt,h,6,t),this.body.rotation.x=this.lean,this.head.rotation.z=this.tilt,this.dress.scale.set(1+Math.sin(e*2)*.01,1,1+Math.sin(e*2)*.01),this.walkPhase+=t*(4+this.walk*7);const u=a?Math.sin(this.walkPhase)*.5*Math.min(1,this.walk):0,f=this.posture==="seated"?-1.35:r?.45+Math.sin(e*3)*.12:0;this.legs[0].rotation.x=qe(this.legs[0].rotation.x,f+u,10,t),this.legs[1].rotation.x=qe(this.legs[1].rotation.x,f-u,10,t);let d=-.15,p=.25,x=-.3,g=-.15,m=.25,M=-.3;if(n==="thinking")d=-1.1,p=-.1,x=-2;else if(i){const F=n==="storytelling"?1:.5;d=-.6-Math.sin(e*2.2)*.35*F,p=.5+Math.sin(e*1.3)*.2*F,x=-.9+Math.sin(e*3.1)*.3*F,n==="storytelling"&&(g=-.6-Math.sin(e*1.9+1.2)*.35,m=.55,M=-.8)}else n==="reacting"?(d=-2.6,p=.4,x=-.2,g=-2.6,m=.4,M=-.2):n==="idle"&&this.expression==="smile"?(d=-2.4,p=.3,x=-.4+Math.sin(e*8)*.4):a&&(d=Math.sin(this.walkPhase)*.4,g=-Math.sin(this.walkPhase)*.4);let S=0,_=0,T=0;if(this.act){const F=this.act;F.t+=t;const L=F.kind==="dance"?4:F.kind==="wave"?2.4:1.8;if(F.t>=L)this.act=null;else if(F.kind==="wave")d=-2.4,p=.3,x=-.4+Math.sin(F.t*9)*.45;else if(F.kind==="celebrate"){d=-2.6,p=.4,x=-.2,g=-2.6,m=.4,M=-.2;const k=Math.min(1,F.t/.9);S=-Math.PI*2*(k*k*(3-2*k)),T=Math.sin(Math.min(1,F.t/.9)*Math.PI)*.12}else{const k=F.t*6;d=-1.8-Math.sin(k)*.6,g=-1.8+Math.sin(k)*.6,p=.6,m=.6,x=-.6,M=-.6,_=Math.sin(k)*.25,T=Math.abs(Math.sin(k))*.05}}this.hover.rotation.x=S,this.body.rotation.z=_,this.hover.position.y+=T;const b=this.act!==null,R=n==="interrupted"?16:7;this.armR.root.rotation.x=qe(this.armR.root.rotation.x,d,R,t),this.armR.root.rotation.z=qe(this.armR.root.rotation.z,-p,R,t),this.armR.lower.rotation.x=qe(this.armR.lower.rotation.x,x,R,t),this.armL.root.rotation.x=qe(this.armL.root.rotation.x,g,R,t),this.armL.root.rotation.z=qe(this.armL.root.rotation.z,m,R,t),this.armL.lower.rotation.x=qe(this.armL.lower.rotation.x,M,R,t);const E=.35+Math.sin(e*(r||a||n==="reacting"?16:n==="storytelling"?10:5))*.3;this.wings[0].parent.rotation.y=-E-.4,this.wings[1].parent.rotation.y=E+.4;const P=1+Math.sin(e*3)*.12+(n==="reacting"?.3:0);this.star.scale.setScalar(P),this.star.rotation.y=e*1.5;const I=n==="listening"||n==="interrupted"?1:i?.3+this.mouth01*.5:n==="thinking"?.6:0;this.browUp=qe(this.browUp,I,8,t);const O=n==="reacting"||this.expression==="smile"||b?1:i?.4:.25;this.happy=qe(this.happy,O,5,t),this.brows.forEach((F,L)=>{F.position.y=.062+this.browUp*.012,F.rotation.z=(L===0?1:-1)*(n==="thinking"?.2:-.1*this.happy)}),this.mouth01=qe(this.mouth01,i?this.mouthTarget:n==="interrupted"?.35:0,18,t),this.mouthOpen.visible=this.mouth01>.04,this.mouthOpen.scale.set(1-this.mouth01*.2,.25+this.mouth01*1.1,1),this.smile.visible=!this.mouthOpen.visible,this.smile.scale.set(1+this.happy*.3,.6+this.happy*.6,1),this.updateGaze(t,e),this.updateBlink(t),this.updateSparkles(e)}updateGaze(t,e){this.body.updateWorldMatrix(!0,!1),this.tmpM.copy(this.body.matrixWorld).invert();const n=this.tmp.copy(this.lookTarget).applyMatrix4(this.tmpM);n.sub(this.head.position);let i=Math.atan2(n.x,n.z),r=Math.atan2(n.y,Math.hypot(n.x,n.z));this.state==="thinking"&&(i+=.4,r+=.3+Math.sin(e*.6)*.04),i=Te.clamp(i,-1,1),r=Te.clamp(r,-.5,.45),this.yaw=qe(this.yaw,i,6,t),this.pitch=qe(this.pitch,r,6,t),this.head.rotation.y=this.yaw*.8,this.head.rotation.x=-this.pitch*.7;const a=Te.clamp(i-this.head.rotation.y,-.5,.5),o=Te.clamp(r+this.head.rotation.x,-.4,.4);for(const l of this.pupils)l.position.set(Math.sin(a)*.012,Math.sin(o)*.012,0)}updateBlink(t){this.nextBlink-=t,this.blinkT<0&&this.nextBlink<=0&&(this.blinkT=0,this.nextBlink=2+Math.random()*3.5);let e=1;this.blinkT>=0&&(this.blinkT+=t,e=this.blinkT<.14?Math.abs(1-this.blinkT/.14*2):1,this.blinkT>=.14&&(this.blinkT=-1));const n=this.happy>.8?.35:0,i=this.state==="interrupted"?.12:0;for(const r of this.eyes)r.scale.y=Math.max(.08,e-n+i)}updateSparkles(t){const e=this.sparkles.geometry.getAttribute("position"),n=this.state==="reacting"?2.5:.6;for(let i=0;i<e.count;i++){const r=this.sparkleBase[i*3]+t*n*(i%2?1:-1),a=this.sparkleBase[i*3+1]+Math.sin(t*1.3+i)*.05,o=this.sparkleBase[i*3+2];e.setXYZ(i,Math.cos(r)*o,a,Math.sin(r)*o)}e.needsUpdate=!0,this.sparkles.material.opacity=.6+Math.sin(t*4)*.3}dispose(){this.disposables.forEach(t=>t.dispose()),this.object.removeFromParent()}}function af(s,t,e){const n=document.createElement("canvas");n.width=s,n.height=t;const i=n.getContext("2d");if(!i)throw new Error("2D canvas unavailable");e(i);const r=new bs(n);return r.colorSpace=ye,r.anisotropy=4,r}function OM(){return af(512,256,s=>{const t=["#7a1c1c","#1d1410","#e9dcc0","#1d1410","#a3262a","#e9dcc0","#1d1410","#7a1c1c"],e=256/t.length;t.forEach((i,r)=>{s.fillStyle=i,s.fillRect(0,r*e,512,e)}),s.fillStyle="#e9dcc0";const n=128;for(let i=0;i<512;i+=32)s.beginPath(),s.moveTo(i,n),s.lineTo(i+16,n-14),s.lineTo(i+32,n),s.lineTo(i+16,n+14),s.closePath(),s.fill();s.fillStyle="#a3262a";for(let i=0;i<512;i+=32)s.fillRect(i+13,n-3,6,6);s.fillStyle="#c9a76a";for(let i=0;i<512;i+=16)for(const r of[e,256-e])s.beginPath(),s.moveTo(i,r),s.lineTo(i+8,r+(r<128?8:-8)),s.lineTo(i+16,r),s.fill()})}function FM(){const s=af(128,128,t=>{t.fillStyle="#f4f1ea",t.fillRect(0,0,128,128),t.fillStyle="#b3202a";for(let e=0;e<128;e+=16)t.fillRect(e,0,6,128),t.fillRect(0,e,128,6);t.fillStyle="#f4f1ea";for(let e=0;e<128;e+=16)for(let n=0;n<128;n+=16)t.fillRect(e+2,n+2,2,2)});return s.wrapS=s.wrapT=Pi,s.repeat.set(4,4),s}const da="#a8714c",Gs="#8f5d3d",Ws="#f3f0e8",Vo="#3a281b",BM="#c9a35a",fa="#d9d5cc",kM="#bdb8ae",wu="#141210",pa=(s,t,e,n)=>s+(t-s)*(1-Math.exp(-e*n)),Tu={lean:0,headTilt:0,browRaise:0,browAngle:0,smile:0,rightShoulder:-.35,rightElbow:-1.15,rightOut:.12,leftShoulder:-.35,leftElbow:-1.15,leftOut:.12};class of{object=new Gt;torso=new Gt;chest;neck=new Gt;head=new Gt;eyes=[];pupils=[];brows=[];jaw=new Gt;mouth;right;left;state="idle";expression="neutral";currentGesture="none";mouthTarget=0;mouth01=0;lookTarget=new A(0,1.1,1.5);yaw=0;pitch=0;nextBlink=2;blinkT=-1;wanderT=0;wander=new it;pose={...Tu};materials=[];geometries=[];textures=[];tmp=new A;tmpMatrix=new Dt;constructor(){this.object.name="procedural-elder";const t=this.track(new gs({vertexColors:!0})),e=this.track(new gs({vertexColors:!0,side:en}));this.object.add(this.mesh(new fe().add(zt(1,16,10),Ws,[0,.2,.06],[0,0,0],[.4,.11,.3]).add(zt(.045,8,6),Gs,[-.24,.13,.26],[0,0,0],[1,.6,1.5]).add(zt(.045,8,6),Gs,[.24,.13,.26],[0,0,0],[1,.6,1.5]),t)),this.torso.position.set(0,.24,-.02),this.object.add(this.torso),this.chest=this.mesh(new fe().add(Re(.16,.21,.46,14),Ws,[0,.23,0]).add(zt(.165,14,8),Ws,[0,.46,0],[0,0,0],[1.2,.45,.85]).add(Zt(.012,.16,.005),"#e2ddd2",[0,.38,.152]),t),this.torso.add(this.chest);const n=Te.degToRad(32),i=new fe().add(new Li(.2,.27,.6,18,1,!0,n,Math.PI*2-n*2),Vo,[0,.2,-.005]);for(const u of[-1,1]){const f=u*n;i.add(Zt(.02,.6,.012),BM,[Math.sin(f)*.235,.2,Math.cos(f)*.235],[-.116,f,0])}i.add(zt(.2,14,6),Vo,[0,.46,-.02],[0,0,0],[1.25,.35,.95]),this.torso.add(this.mesh(i,e)),this.neck.position.set(0,.53,.01),this.torso.add(this.neck),this.neck.add(this.mesh(new fe().add(Re(.045,.055,.1,10),da,[0,.03,0]),t)),this.head.position.set(0,.15,0),this.neck.add(this.head),this.head.add(this.mesh(new fe().add(zt(1,16,12),da,[0,0,0],[0,0,0],[.095,.12,.105]).add(zt(1,8,6),Gs,[0,-.005,.1],[.3,0,0],[.018,.03,.022]).add(zt(1,6,4),Gs,[-.012,-.025,.103],[0,0,0],[.008,.006,.01]).add(zt(1,6,4),Gs,[.012,-.025,.103],[0,0,0],[.008,.006,.01]).add(Zt(.07,.014,.02),fa,[0,-.04,.1],[0,0,0]).add(zt(1,10,8),fa,[-.058,-.05,.055],[0,0,0],[.03,.045,.035]).add(zt(1,10,8),fa,[.058,-.05,.055],[0,0,0],[.03,.045,.035]).add(new Un(.098,.009,6,20),wu,[0,.09,-.01],[Math.PI/2-.12,0,0]).add(new Un(.098,.009,6,20),wu,[0,.108,-.012],[Math.PI/2-.12,0,0]),t));const r=this.track(FM()),a=this.track(new gs({map:r,side:en})),o=new ni(.112,16,8,0,Math.PI*2,0,Math.PI/2);o.translate(0,.02,-.005);const l=Te.degToRad(48),c=new Li(.112,.2,.3,18,1,!0,l,Math.PI*2-l*2);c.translate(0,-.13,-.02);const h=zM([o,c]);this.head.add(this.track(new te(h,a))),this.geometries.push(h);for(const u of[-1,1]){const f=new Gt;f.position.set(u*.036,.018,.088);const d=this.mesh(new fe().add(zt(.015,10,8),"#ece6da"),t),p=this.mesh(new fe().add(zt(.008,8,6),"#2a1a10",[0,0,.0105]),t);f.add(d,p),this.head.add(f),this.eyes.push(f),this.pupils.push(p);const x=this.mesh(new fe().add(Zt(.038,.009,.012),kM),t);x.position.set(u*.037,.045,.098),this.head.add(x),this.brows.push(x)}this.jaw.position.set(0,-.055,.085),this.head.add(this.jaw),this.mouth=this.mesh(new fe().add(zt(1,10,6),"#3a1a14",[0,0,.018],[0,0,0],[.022,.006,.01]),t),this.jaw.add(this.mouth),this.jaw.add(this.mesh(new fe().add(zt(1,12,10),fa,[0,-.04,-.01],[.25,0,0],[.068,.075,.055]),t)),this.right=this.buildArm(-1,t),this.left=this.buildArm(1,t),this.object.add(this.mesh(new fe().add(Re(.012,.012,.95,6),"#5a3a22",[.5,.47,-.15],[.25,0,-.32]).add(new Un(.04,.012,6,10,Math.PI),"#5a3a22",[.68,.91,-.03],[.25,0,-.32]),t))}buildArm(t,e){const n=new Gt;n.position.set(t*.215,.44,0),this.torso.add(n),n.add(this.mesh(new fe().add(zt(.06,10,8),Vo,[0,0,0]).add(Re(.05,.06,.27,10),Ws,[0,-.135,0]),e));const i=new Gt;return i.position.set(0,-.27,0),n.add(i),i.add(this.mesh(new fe().add(Re(.042,.05,.25,10),Ws,[0,-.125,0]).add(zt(1,10,8),da,[0,-.28,.005],[0,0,0],[.035,.05,.022]).add(Zt(.012,.04,.012),da,[t*-.03,-.27,.012],[0,0,t*.5]),e)),{shoulder:n,elbow:i}}setState(t){this.state=t,t==="interrupted"&&(this.currentGesture="none")}setMouthOpen(t){this.mouthTarget=Te.clamp(t,0,1)}lookAt(t){this.lookTarget.copy(t)}gesture(t){this.currentGesture=t}setExpression(t){this.expression=t}setPosture(t){}setLocomotion(t){}update(t,e){const n=this.targetPose(e),i=this.state==="interrupted"?14:4;for(const l of Object.keys(n))this.pose[l]=pa(this.pose[l],n[l],i,t);const r=this.pose,a=Math.sin(e*1.6);this.chest.scale.set(1+a*.008,1+a*.012,1+a*.01),this.torso.rotation.x=r.lean+a*.008,this.torso.position.y=.24+(this.state==="reacting"?Math.abs(Math.sin(e*9))*.008:0),this.updateGaze(t,e),this.head.rotation.z=r.headTilt;const o=this.state==="speaking"||this.state==="storytelling";this.mouth01=pa(this.mouth01,o?this.mouthTarget:0,18,t),this.jaw.rotation.x=this.mouth01*.22,this.mouth.scale.y=1+this.mouth01*2.6,this.mouth.scale.x=1+r.smile*.35-this.mouth01*.15,this.brows.forEach((l,c)=>{const h=c===0?-1:1;l.position.y=.045+r.browRaise*.008,l.rotation.z=h*r.browAngle}),this.updateBlink(t),this.right.shoulder.rotation.set(r.rightShoulder,0,-r.rightOut),this.right.elbow.rotation.x=r.rightElbow,this.left.shoulder.rotation.set(r.leftShoulder,0,r.leftOut),this.left.elbow.rotation.x=r.leftElbow}targetPose(t){const e={...Tu};switch(this.state){case"listening":e.lean=.1,e.headTilt=.09,e.browRaise=.4;break;case"thinking":e.browAngle=.12,e.headTilt=-.05;break;case"speaking":e.browRaise=.2+this.mouth01*.5;break;case"storytelling":e.lean=.05,e.browRaise=.3+this.mouth01*.6,e.headTilt=Math.sin(t*.7)*.05;break;case"reacting":e.smile=1,e.lean=-.05,e.browRaise=.5;break;case"interrupted":e.lean=-.04,e.browRaise=1;break}const n=this.state==="thinking"?"thoughtful":this.state==="reacting"?"smile":this.expression;n==="smile"&&(e.smile=1),n==="surprised"&&(e.browRaise=1),n==="thoughtful"&&(e.browAngle=.15);const i=this.state==="thinking"?"beard":this.state==="storytelling"||this.state==="speaking"?this.currentGesture==="none"?"explain":this.currentGesture:this.state==="interrupted"?"none":this.currentGesture,r=this.state==="storytelling"?1:.5;switch(i){case"explain":e.rightShoulder=-.75-Math.sin(t*1.3)*.18*r,e.rightElbow=-1.5+Math.sin(t*2.1)*.25*r,e.rightOut=.3+Math.sin(t*.9)*.12*r,this.state==="storytelling"&&(e.leftShoulder=-.5-Math.sin(t*1.1+1.7)*.12,e.leftElbow=-1.35+Math.sin(t*1.7+.6)*.15,e.leftOut=.2);break;case"point":e.rightShoulder=-1.25,e.rightElbow=-.4,e.rightOut=.15;break;case"beard":e.rightShoulder=-.95,e.rightElbow=-2.25,e.rightOut=-.3;break}return e}updateGaze(t,e){this.neck.updateWorldMatrix(!0,!1),this.tmpMatrix.copy(this.neck.matrixWorld).invert();const n=this.tmp.copy(this.lookTarget).applyMatrix4(this.tmpMatrix);n.y-=this.head.position.y,this.wanderT-=t,this.wanderT<=0&&(this.wanderT=1.5+Math.random()*3,this.wander.set((Math.random()-.5)*.12,(Math.random()-.5)*.06));let i=Math.atan2(n.x,n.z)+this.wander.x,r=Math.atan2(n.y,Math.hypot(n.x,n.z))+this.wander.y;this.state==="thinking"&&(i+=.35,r+=.25+Math.sin(e*.5)*.03),i=Te.clamp(i,-.9,.9),r=Te.clamp(r,-.4,.35),this.yaw=pa(this.yaw,i,5,t),this.pitch=pa(this.pitch,r,5,t),this.head.rotation.y=this.yaw*.8,this.head.rotation.x=-this.pitch*.7;const a=Te.clamp((i-this.head.rotation.y)*1.2,-.45,.45),o=Te.clamp((r+this.head.rotation.x)*1.2,-.3,.3);for(const l of this.pupils)l.position.set(Math.sin(a)*.006,Math.sin(o)*.005,0)}updateBlink(t){this.nextBlink-=t,this.blinkT<0&&this.nextBlink<=0&&(this.blinkT=0,this.nextBlink=2.5+Math.random()*4);let e=1;if(this.blinkT>=0){this.blinkT+=t;const i=.16;e=this.blinkT<i?Math.abs(1-this.blinkT/i*2):1,this.blinkT>=i&&(this.blinkT=-1)}const n=this.pose.smile*.35;for(const i of this.eyes)i.scale.y=Math.max(.08,e-n)}mesh(t,e){const n=t.build(e);return this.geometries.push(n.geometry),n}track(t){return t instanceof nn?this.materials.push(t):t instanceof Ee&&this.textures.push(t),t}dispose(){this.geometries.forEach(t=>t.dispose()),this.materials.forEach(t=>t.dispose()),this.textures.forEach(t=>t.dispose()),this.object.removeFromParent()}}function zM(s){const t=s.map(i=>{const r=i.index?i.toNonIndexed():i;return r!==i&&i.dispose(),r}),e=t.reduce((i,r)=>i+r.getAttribute("position").count,0),n=new Qt;for(const i of["position","normal","uv"]){const r=t[0].getAttribute(i).itemSize,a=new Float32Array(e*r);let o=0;for(const l of t){const c=l.getAttribute(i);a.set(c.array,o),o+=c.array.length}n.setAttribute(i,new Ce(a,r))}return t.forEach(i=>i.dispose()),n.computeBoundingSphere(),n}const on={"abu-nasser":{id:"abu-nasser",nameKey:"char.abu-nasser",voices:["Algenib","Charon","Sadaltager","Enceladus","Orus","Iapetus","Schedar","Umbriel"],defaultVoice:"Algenib",tone:"elder",motion:"walk",kids:!1,greeting:"(دخل الضيف المجلس الآن وجلس قدامك. رحّب به باختصار.)",async load(){try{return await _c.load(new URL("models/shaib.glb",document.baseURI).href)}catch(s){return console.warn("Elder model failed to load, using procedural fallback",s),new of}}},nawwara:{id:"nawwara",nameKey:"char.nawwara",voices:["Leda","Laomedeia","Zephyr","Autonoe","Achernar","Aoede","Puck"],defaultVoice:"Leda",tone:"child",motion:"fly",kids:!0,greeting:"(جاء صديقك الآن. رحّبي به بفرح وبجملة قصيرة.)",load:async()=>new UM},jelo:{id:"jelo",nameKey:"char.jelo",voices:["Fenrir","Puck","Sadachbia","Achird","Zubenelgenubi","Laomedeia"],defaultVoice:"Fenrir",tone:"alien",motion:"walk",kids:!0,greeting:"(وصل صديقك الأرضي الآن. سلّم عليه بحماس وبجملة قصيرة.)",load:()=>gc.load(new URL("models/alien.glb",document.baseURI).href)}},HM=Object.keys(on),lf=s=>typeof s=="string"&&s in on,VM={"app.title":"سوالف الأولين","app.subtitle":"مجلس الشايب","app.phaseNotice":"الشخصيات تتكلم بالذكاء الاصطناعي وقد تخطئ. صوتك يُرسل إلى Google Gemini أثناء الجلسة فقط ولا نحفظه.","btn.enterVR":"ادخل المجلس (VR)","btn.enterMR":"تجوّل معه في غرفتك (MR)","btn.switchToVR":"واقع افتراضي","btn.switchToMR":"واقع مختلط","btn.place":"إعادة وضع الشخصية","btn.exit":"خروج","btn.language":"English","xr.unsupported":"هذا الجهاز لا يدعم الواقع الافتراضي في المتصفح. يمكنك مشاهدة المجلس ثلاثي الأبعاد هنا.","xr.mrUnavailable":"الواقع المختلط غير متاح على هذا الجهاز.","xr.placeHint":"وجّه نحو الأرض واضغط الزناد لوضع الشخصية","xr.placedManual":"تعذّر اكتشاف الأرضية، فوُضعت الشخصية أمامك.","xr.sessionError":"تعذّر بدء الجلسة: {error}","states.title":"معاينة حالات الشخصية (ليست محادثة ذكاء اصطناعي)","state.idle":"هادئ","state.listening":"يستمع","state.thinking":"يفكّر","state.speaking":"يتكلم","state.storytelling":"يسولف","state.reacting":"يتفاعل","state.interrupted":"مقاطَع","touch.hint":"اسحب للالتفاف، وقرّب بإصبعين","env.label":"المكان","env.majlis":"المجلس","env.fereej":"الفريج","env.barr":"البر — بيت الشعر","env.loading":"يجهّز المكان…","talk.start":"🎙️ ابدأ السالفة","talk.stop":"أنهِ الجلسة","talk.cut":"اقطع كلامه","talk.hint":"اضغط «ابدأ السالفة» واسمح بالميكروفون، ثم تكلّم براحتك. تقدر تقاطع الشخصية متى ما بغيت.","talk.xrHint":"الأفضل تبدأ الكلام قبل دخول النظارة حتى يظهر طلب إذن الميكروفون.","status.idle":"غير متصل","status.connecting":"يتصل…","status.ready":"يسمعك الحين","status.reconnecting":"يعيد الاتصال… ({n})","status.closed":"انتهت الجلسة","err.mic_denied":"ما وصلنا إذن الميكروفون. فعّله من إعدادات المتصفح ثم حاول مرة ثانية.","err.mic_unavailable":"ما لقينا ميكروفون يشتغل على هذا الجهاز.","err.invalid_code":"رمز الدخول غير صحيح. اكتبه في «خيارات».","err.rate_limited":"محاولات كثيرة. انتظر دقيقة وحاول مرة ثانية.","err.server_not_configured":"خادم الصوت شغّال لكن مفتاح Gemini غير مضاف بعد.","err.server_unreachable":"تعذّر الوصول لخادم الصوت. تأكد من الإنترنت.","err.upstream":"تعذّر الاتصال بخدمة Gemini. قد تكون حدود الاستخدام المجاني انتهت لليوم.","err.connection_lost":"انقطع الاتصال. اضغط «ابدأ السالفة» مرة ثانية.","voice.notConfigured":"المحادثة الصوتية غير مفعّلة بعد: خادم الصوت لم يُجهّز.","settings.code":"رمز الدخول","settings.interrupt":"المقاطعة","interrupt.auto":"تلقائي: تتكلم فوقه فيسكت","interrupt.tap":"بالضغط: إذا صار يقاطع نفسه","caption.you":"أنت","btn.options":"خيارات","companion.start":"يمشي معي","companion.stop":"اجلس يا عم","companion.hint":"امشِ بهدوء في مكان مفتوح؛ النظارة قد لا تعرف مكان الجدران والأثاث.","settings.voice":"الصوت","settings.voiceNote":"يتغيّر الصوت من الجلسة القادمة.","settings.tone":"نبرة الشخصية","tone.on":"مفعّلة (الشايب أعمق، نوّارة طفولية، جيلو فضائي)","tone.off":"بدون","voice.Algenib":"Algenib — أجش فيه بحّة","voice.Charon":"Charon — رزين","voice.Sadaltager":"Sadaltager — حكيم","voice.Enceladus":"Enceladus — فيه نَفَس","voice.Orus":"Orus — حازم","voice.Iapetus":"Iapetus — واضح","voice.Schedar":"Schedar — هادي","voice.Umbriel":"Umbriel — مرتاح","room.none":"ما فيه بيانات للغرفة. سوّ «إعداد المساحة» في النظارة أو اضغط «مسح الغرفة».","room.status":"الغرفة: {walls} جدران، {items} أثاث","btn.scan":"مسح الغرفة","settings.character":"الشخصية","char.abu-nasser":"أبو ناصر — الشايب","char.nawwara":"نوّارة — جنّية واحة الألوان","voice.Leda":"Leda — شبابي","voice.Laomedeia":"Laomedeia — مرح","voice.Zephyr":"Zephyr — مشرق","voice.Autonoe":"Autonoe — لامع","voice.Achernar":"Achernar — ناعم","voice.Aoede":"Aoede — منعش","voice.Puck":"Puck — شقي","kids.notice":"{name} للأطفال بإشراف الكبار. صوت الطفل يُرسل إلى Google Gemini (الطبقة المجانية قد تستخدم البيانات لتحسين خدماتها)، فلا تشاركوا معلومات شخصية.","shot.bubble":"🫧 فقاعات","shot.firework":"🎆 ألعاب نارية","shot.water":"💧 ماء","shot.confetti":"🎉 قصاصات","btn.close":"إغلاق","char.jelo":"جيلو — الفضائي","voice.Fenrir":"Fenrir — متحمّس","voice.Sadachbia":"Sadachbia — حيوي","voice.Achird":"Achird — ودود","voice.Zubenelgenubi":"Zubenelgenubi — عفوي","xr.talkHint":"اضغط زر القبضة (Grip) عشان تسولف"},GM={"app.title":"Salef Al-Awaleen","app.subtitle":"The Elder's Majlis","app.phaseNotice":"The characters' voices and words are AI-generated and may be wrong. Your voice is sent to Google Gemini during the session only and is not stored by us.","btn.enterVR":"Enter the majlis (VR)","btn.enterMR":"Walk around your room together (MR)","btn.switchToVR":"Virtual reality","btn.switchToMR":"Mixed reality","btn.place":"Reposition the character","btn.exit":"Exit","btn.language":"العربية","xr.unsupported":"This device does not support WebXR. You can view the 3D majlis here.","xr.mrUnavailable":"Mixed reality is not available on this device.","xr.placeHint":"Point at the floor and press the trigger to place the character","xr.placedManual":"Floor not detected; the character was placed in front of you.","xr.sessionError":"Could not start the session: {error}","states.title":"Character state preview (not an AI conversation)","state.idle":"Idle","state.listening":"Listening","state.thinking":"Thinking","state.speaking":"Speaking","state.storytelling":"Storytelling","state.reacting":"Reacting","state.interrupted":"Interrupted","touch.hint":"Drag to look around, pinch to zoom","env.label":"Place","env.majlis":"Majlis","env.fereej":"Old neighbourhood","env.barr":"Desert — tent","env.loading":"Preparing the place…","talk.start":"🎙️ Start talking","talk.stop":"End session","talk.cut":"Cut him off","talk.hint":"Tap “Start talking”, allow the microphone, then just speak. You can interrupt any time.","talk.xrHint":"Start talking before entering the headset view so the microphone prompt can appear.","status.idle":"Not connected","status.connecting":"Connecting…","status.ready":"Listening","status.reconnecting":"Reconnecting… ({n})","status.closed":"Session ended","err.mic_denied":"Microphone permission was not granted. Enable it in the browser settings and try again.","err.mic_unavailable":"No working microphone was found on this device.","err.invalid_code":"Wrong access code. Enter it under “Options”.","err.rate_limited":"Too many attempts. Wait a minute and try again.","err.server_not_configured":"The voice server is running but the Gemini key has not been added yet.","err.server_unreachable":"Could not reach the voice server. Check the internet connection.","err.upstream":"Could not connect to Gemini. The free daily limit may be used up.","err.connection_lost":"The connection was lost. Tap “Start talking” again.","voice.notConfigured":"Voice conversation is not enabled yet: the voice server has not been set up.","settings.code":"Access code","settings.interrupt":"Interrupting","interrupt.auto":"Automatic: talk over him and he stops","interrupt.tap":"By button: if he keeps interrupting himself","caption.you":"You","btn.options":"Options","companion.start":"Walk with me","companion.stop":"Sit down","companion.hint":"Walk slowly in an open space; the headset may not know where walls and furniture are.","settings.voice":"Voice","settings.voiceNote":"The voice changes from the next session.","settings.tone":"Character tone","tone.on":"On (elder deeper, Nawwara childlike, Jelo alien)","tone.off":"Off","voice.Algenib":"Algenib — gravelly","voice.Charon":"Charon — measured","voice.Sadaltager":"Sadaltager — wise","voice.Enceladus":"Enceladus — breathy","voice.Orus":"Orus — firm","voice.Iapetus":"Iapetus — clear","voice.Schedar":"Schedar — calm","voice.Umbriel":"Umbriel — easy-going","room.none":"No room data. Run Space Setup on the headset or press “Scan room”.","room.status":"Room: {walls} walls, {items} furniture","btn.scan":"Scan room","settings.character":"Character","char.abu-nasser":"Abu Nasser — the elder","char.nawwara":"Nawwara — fairy of the Oasis of Colours","voice.Leda":"Leda — youthful","voice.Laomedeia":"Laomedeia — upbeat","voice.Zephyr":"Zephyr — bright","voice.Autonoe":"Autonoe — sparkly","voice.Achernar":"Achernar — soft","voice.Aoede":"Aoede — breezy","voice.Puck":"Puck — playful","kids.notice":"{name} is for children with adult supervision. The child's voice is sent to Google Gemini (the free tier may use data to improve its services), so don't share personal information.","shot.bubble":"🫧 Bubbles","shot.firework":"🎆 Fireworks","shot.water":"💧 Water","shot.confetti":"🎉 Confetti","btn.close":"Close","char.jelo":"Jelo — the space alien","voice.Fenrir":"Fenrir — excitable","voice.Sadachbia":"Sadachbia — lively","voice.Achird":"Achird — friendly","voice.Zubenelgenubi":"Zubenelgenubi — casual","xr.talkHint":"Squeeze the grip button to talk"},Eu={ar:VM,en:GM},cf="salef.locale";let Ka=WM();function WM(){const s=new URLSearchParams(globalThis.location?.search??"").get("lang");if(s==="ar"||s==="en")return s;try{const t=globalThis.localStorage?.getItem(cf);if(t==="ar"||t==="en")return t}catch{}return"ar"}function Au(){return Ka}function Hl(s=Ka){return s==="ar"}function XM(s){Ka=s;try{globalThis.localStorage?.setItem(cf,s)}catch{}}function Mt(s,t={},e=Ka){return(Eu[e][s]??Eu.ar[s]??s).replace(/\{(\w+)\}/g,(i,r)=>t[r]??`{${r}}`)}class hf{listeners={};on(t,e){return(this.listeners[t]??=new Set).add(e),()=>this.listeners[t]?.delete(e)}emit(t,e){this.listeners[t]?.forEach(n=>n(e))}}function YM(s){let t="";for(let n=0;n<s.length;n+=32768)t+=String.fromCharCode(...s.subarray(n,n+32768));return btoa(t)}function qM(s){const t=atob(s),e=new Uint8Array(t.length);for(let n=0;n<t.length;n++)e[n]=t.charCodeAt(n);return e}function KM(s){const t=new DataView(s.buffer,s.byteOffset,s.byteLength),e=new Float32Array(Math.floor(s.byteLength/2));for(let n=0;n<e.length;n++)e[n]=t.getInt16(n*2,!0)/32768;return e}function ZM(s,t=24e3){const e=/rate=(\d+)/.exec(s??"");return e?Number(e[1]):t}function JM(s){if(!s.length)return 0;let t=0;for(let e=0;e<s.length;e++)t+=s[e]*s[e];return Math.sqrt(t/s.length)}const $M={elder:{rate:.92,low:4,high:-5},child:{rate:1.12,low:-3,high:3},alien:{rate:1.07,low:-4,high:5},none:{rate:1,low:0,high:0}};class jM{constructor(t,e="none"){this.ctx=t,this.low=t.createBiquadFilter(),this.low.type="lowshelf",this.low.frequency.value=220,this.high=t.createBiquadFilter(),this.high.type="highshelf",this.high.frequency.value=4500,this.gain=t.createGain(),this.analyser=t.createAnalyser(),this.analyser.fftSize=512,this.levelBuf=new Float32Array(this.analyser.fftSize),this.low.connect(this.high).connect(this.gain),this.gain.connect(this.analyser),this.setTone(e)}ctx;gain;low;high;rate=1;analyser;levelBuf;sources=new Set;playhead=0;drainedCallbacks=[];loopback=null;setTone(t){const e=$M[t];this.rate=e.rate,this.low.gain.value=e.low,this.high.gain.value=e.high}async connectOutput(t){if(t)try{return this.loopback=await QM(this.ctx,this.gain),"loopback"}catch(e){console.warn("Echo-cancellation loopback unavailable, playing directly",e)}return this.gain.connect(this.ctx.destination),"direct"}get playing(){return this.sources.size>0}enqueue(t,e){const n=this.ctx.createBuffer(1,t.length,e);n.copyToChannel(t,0);const i=this.ctx.createBufferSource();i.buffer=n,i.playbackRate.value=this.rate,i.connect(this.low);const r=Math.max(this.ctx.currentTime+.03,this.playhead);i.start(r);const a=n.duration/this.rate;return this.playhead=r+a,this.sources.add(i),i.onended=()=>{this.sources.delete(i),this.sources.size===0&&this.flushDrained()},a}whenDrained(t){this.sources.size===0?t():this.drainedCallbacks.push(t)}stop(){for(const t of this.sources){t.onended=null;try{t.stop()}catch{}}this.sources.clear(),this.playhead=0,this.drainedCallbacks=[]}level(){return this.playing?(this.analyser.getFloatTimeDomainData(this.levelBuf),Math.min(1,JM(this.levelBuf)*4)):0}dispose(){this.stop(),this.low.disconnect(),this.high.disconnect(),this.gain.disconnect(),this.loopback&&(this.loopback.pcs.forEach(t=>t.close()),this.loopback.el.srcObject=null,this.loopback=null)}flushDrained(){const t=this.drainedCallbacks;this.drainedCallbacks=[],t.forEach(e=>e())}}async function QM(s,t){const e=s.createMediaStreamDestination();t.connect(e);const n=new RTCPeerConnection,i=new RTCPeerConnection;n.onicecandidate=c=>c.candidate&&void i.addIceCandidate(c.candidate),i.onicecandidate=c=>c.candidate&&void n.addIceCandidate(c.candidate);const r=new Audio;r.autoplay=!0;const a=new Promise(c=>{i.ontrack=h=>{r.srcObject=h.streams[0]??new MediaStream([h.track]),c()}});for(const c of e.stream.getAudioTracks())n.addTrack(c,e.stream);const o=await n.createOffer();o.sdp=o.sdp?.replace(/(a=fmtp:\d+ .*)/,"$1;maxaveragebitrate=96000;useinbandfec=1"),await n.setLocalDescription(o),await i.setRemoteDescription(o);const l=await i.createAnswer();return await i.setLocalDescription(l),await n.setRemoteDescription(l),await Promise.race([a,new Promise((c,h)=>setTimeout(()=>h(new Error("loopback timeout")),4e3))]),await r.play(),{pcs:[n,i],el:r}}const tS=8,eS=.02,nS=3,iS=700,sS=3;class Kn extends Error{constructor(t){super(t),this.code=t}code}class rS{constructor(t){this.options=t,this.mode=t.interruptMode}options;emitter=new hf;ctx=null;player=null;mic=null;capture=null;ws=null;ready=!1;resumeHandle=null;closedByUser=!1;reconnects=0;greeted=!1;mode;speaking=!1;story=!1;turnSeconds=0;dropUntilTurnEnd=!1;userLine="";characterLine="";loudChunks=0;userActive=!1;lastLoudAt=0;onEvent(t){return this.emitter.on("event",t)}onStatus(t){return this.emitter.on("status",t)}onTranscript(t){return this.emitter.on("transcript",t)}outputLevel(){return this.player?.level()??0}setInterruptMode(t){this.mode=t}setTone(t){this.options.tone=t,this.player?.setTone(t)}async start(){const t=new AudioContext;this.ctx=t,t.resume(),this.closedByUser=!1,this.status({kind:"connecting"});try{await this.startAudio(t),await this.connect()}catch(e){const n=e instanceof Kn?e.code:"server_unreachable";throw this.status({kind:"error",code:n}),this.teardown(),e}}interrupt(){!this.speaking&&!this.player?.playing||(this.player?.stop(),this.dropUntilTurnEnd=!0,this.endTurn("responseCancelled"))}close(){this.closedByUser=!0,this.teardown(),this.status({kind:"closed"})}async startAudio(t){if(!navigator.mediaDevices?.getUserMedia)throw new Kn("mic_unavailable");try{this.mic=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0,channelCount:1}})}catch(r){const a=r?.name;throw new Kn(a==="NotAllowedError"||a==="SecurityError"?"mic_denied":"mic_unavailable")}this.player=new jM(t,this.options.tone);const e=/iPhone|iPad|iPod/.test(navigator.userAgent)||navigator.userAgent.includes("Mac")&&"ontouchend"in document;await this.player.connectOutput(!e),await t.audioWorklet.addModule(new URL(""+new URL("capture-worklet-DQ9qJSU_.js",import.meta.url).href,import.meta.url));const n=t.createMediaStreamSource(this.mic);this.capture=new AudioWorkletNode(t,"salef-capture");const i=t.createGain();i.gain.value=0,n.connect(this.capture).connect(i).connect(t.destination),this.capture.port.onmessage=r=>this.onMicChunk(r.data)}onMicChunk({pcm:t,level:e}){const n=this.speaking||!!this.player?.playing;this.mode==="tap"&&n||(this.ws?.readyState===WebSocket.OPEN&&this.ready&&this.ws.send(JSON.stringify({realtimeInput:{audio:{data:YM(new Uint8Array(t)),mimeType:"audio/pcm;rate=16000"}}})),n||this.localVad(e))}localVad(t){const e=performance.now();t>eS?(this.loudChunks++,this.lastLoudAt=e,!this.userActive&&this.loudChunks>=nS&&(this.userActive=!0,this.emit({type:"userStartedSpeaking"}))):(this.loudChunks=0,this.userActive&&e-this.lastLoudAt>iS&&(this.userActive=!1,this.emit({type:"userStoppedSpeaking"})))}async fetchToken(){let t;try{t=await fetch(`${this.options.apiBase.replace(/\/$/,"")}/v1/session`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({code:this.options.accessCode,voice:this.options.voice,character:this.options.character})})}catch{throw new Kn("server_unreachable")}if(t.status===401)throw new Kn("invalid_code");if(t.status===429)throw new Kn("rate_limited");if(t.status===503)throw new Kn("server_not_configured");if(!t.ok)throw new Kn("upstream");return await t.json()}async connect(){const{token:t,model:e,wsUrl:n}=await this.fetchToken();this.ready=!1;const i=new WebSocket(`${n}?access_token=${encodeURIComponent(t)}`);i.binaryType="arraybuffer",this.ws=i,await new Promise((r,a)=>{const o=()=>a(new Kn("upstream"));i.onerror=o,i.onclose=o,i.onopen=()=>{i.send(JSON.stringify({setup:{model:e,sessionResumption:this.resumeHandle?{handle:this.resumeHandle}:{}}}))},i.onmessage=l=>{const c=aS(l.data);if(c){if(!this.ready&&c.setupComplete){i.onerror=null,i.onclose=h=>this.onClose(h),this.ready=!0,this.reconnects=0,this.status({kind:"ready"}),this.greeted||(this.greeted=!0,i.send(JSON.stringify({clientContent:{turns:[{role:"user",parts:[{text:this.options.greeting}]}],turnComplete:!0}}))),r();return}this.ready&&this.onServerMessage(c)}}})}onClose(t){this.ready=!1,!this.closedByUser&&(console.warn("Live connection closed",t.code,t.reason),this.reconnect())}async reconnect(){if(!this.closedByUser){if(this.reconnects>=sS){this.status({kind:"error",code:"connection_lost"}),this.teardown();return}this.reconnects++,this.status({kind:"reconnecting",attempt:this.reconnects}),this.player?.stop(),this.speaking&&this.endTurn("responseCancelled"),await new Promise(t=>setTimeout(t,500*2**(this.reconnects-1)));try{await this.connect()}catch{this.reconnect()}}}onServerMessage(t){if(t.sessionResumptionUpdate?.newHandle&&t.sessionResumptionUpdate.resumable!==!1&&(this.resumeHandle=t.sessionResumptionUpdate.newHandle),t.goAway){this.ws?.close();return}t.toolCall?.functionCalls?.length&&this.answerToolCalls(t.toolCall.functionCalls);const e=t.serverContent;if(e){e.interrupted&&(this.player?.stop(),this.dropUntilTurnEnd=!1,this.speaking&&(this.speaking=!1,this.emit({type:"userStartedSpeaking"}),this.flushCharacterLine())),e.inputTranscription?.text&&(this.userLine+=e.inputTranscription.text,this.emitter.emit("transcript",{role:"user",text:this.userLine,final:!1}));for(const n of e.modelTurn?.parts??[]){const i=n.inlineData?.data;if(!i||this.dropUntilTurnEnd||!this.player)continue;this.speaking||this.beginTurn();const r=KM(qM(i));this.turnSeconds+=this.player.enqueue(r,ZM(n.inlineData?.mimeType)),!this.story&&this.turnSeconds>tS&&(this.story=!0,this.emit({type:"responseStarted",story:!0}))}e.outputTranscription?.text&&!this.dropUntilTurnEnd&&(this.characterLine+=e.outputTranscription.text,this.emitter.emit("transcript",{role:"character",text:this.characterLine,final:!1})),e.turnComplete&&(this.dropUntilTurnEnd=!1,this.player?.whenDrained(()=>this.endTurn("responseFinished")))}}beginTurn(){this.speaking=!0,this.story=!1,this.turnSeconds=0,this.userActive=!1,this.loudChunks=0,this.userLine&&(this.emitter.emit("transcript",{role:"user",text:this.userLine,final:!0}),this.userLine=""),this.emit({type:"responseStarted",story:!1})}endTurn(t){this.speaking&&(this.speaking=!1,this.emit({type:t}),this.flushCharacterLine())}flushCharacterLine(){this.characterLine&&(this.emitter.emit("transcript",{role:"character",text:this.characterLine,final:!0}),this.characterLine="")}emit(t){this.emitter.emit("event",t)}status(t){this.emitter.emit("status",t)}teardown(){this.ready=!1,this.ws&&(this.ws.onclose=null,this.ws.onmessage=null,this.ws.close(),this.ws=null),this.capture?.port.close(),this.capture?.disconnect(),this.capture=null,this.mic?.getTracks().forEach(t=>t.stop()),this.mic=null,this.player?.dispose(),this.player=null,this.ctx?.close(),this.ctx=null,this.speaking=!1,this.userActive=!1}answerToolCalls(t){const e=t.map(n=>{let i;try{i=this.options.onCommand?.(n.name??"",n.args)??{ok:!1,note:"commands are not available"}}catch(r){console.warn("Command failed",n.name,r),i={ok:!1,note:"something went wrong"}}return{id:n.id,name:n.name,response:i}});this.ws?.send(JSON.stringify({toolResponse:{functionResponses:e}}))}}function aS(s){try{const t=typeof s=="string"?s:new TextDecoder().decode(s);return JSON.parse(t)}catch{return null}}const Ru="salef.accessCode",Cu="salef.interruptMode",Pu="salef.voice.",Iu="salef.tone",Lu="salef.character";function uf(s){switch(s.kind){case"error":return Mt(`err.${s.code}`);case"reconnecting":return Mt("status.reconnecting",{n:String(s.attempt)});default:return Mt(`status.${s.kind}`)}}class oS{constructor(t,e){this.app=t,this.apiBase=e,t.onFrame(()=>t.character?.setMouthOpen(this.session?.outputLevel()??0)),t.behavior.on("change",({to:n})=>{const i=n==="speaking"||n==="storytelling";i!==this.speaking&&(this.speaking=i,this.views.forEach(r=>r.speakingChanged(i)))})}app;apiBase;session=null;commandHandler=null;views=[];lastStatus={kind:"idle"};speaking=!1;get configured(){return!!this.apiBase}get active(){return this.session!==null}get isSpeaking(){return this.speaking}get status(){return this.lastStatus}setCommandHandler(t){this.commandHandler=t}addView(t){this.views.push(t),t.status(this.lastStatus)}start(){if(this.session||!this.apiBase)return;const t=new rS({apiBase:this.apiBase,accessCode:this.accessCode,interruptMode:this.interruptMode,voice:this.voice,tone:this.toneOn?on[this.character].tone:"none",character:this.character,greeting:on[this.character].greeting,onCommand:(e,n)=>{const i=Af(e,n);return i?this.commandHandler?.(i)??{ok:!1,note:"not available here"}:{ok:!1,note:"unknown command"}}});this.session=t,t.onEvent(e=>this.app.behavior.dispatch(e,performance.now())),t.onTranscript(e=>this.views.forEach(n=>n.transcript(e))),t.onStatus(e=>{this.lastStatus=e,this.views.forEach(n=>n.status(e)),(e.kind==="error"||e.kind==="closed")&&(this.session=null,this.app.behavior.dispatch({type:"reset"},performance.now()))}),t.start().catch(()=>{})}stop(){this.session?.close(),this.session=null}toggle(){this.session?this.stop():this.start()}interrupt(){this.session?.interrupt()}get accessCode(){return Xs(Ru)??""}set accessCode(t){Ys(Ru,t.trim())}get interruptMode(){return Xs(Cu)==="tap"?"tap":"auto"}set interruptMode(t){Ys(Cu,t),this.session?.setInterruptMode(t)}get character(){const t=Xs(Lu);return lf(t)?t:"abu-nasser"}set character(t){t!==this.character&&(this.stop(),Ys(Lu,t))}get voice(){const t=on[this.character],e=Xs(Pu+t.id);return e&&t.voices.includes(e)?e:t.defaultVoice}set voice(t){Ys(Pu+this.character,t)}get toneOn(){return Xs(Iu)!=="off"}set toneOn(t){Ys(Iu,t?"on":"off"),this.session?.setTone(t?on[this.character].tone:"none")}}function Xs(s){try{return localStorage.getItem(s)}catch{return null}}function Ys(s,t){try{localStorage.setItem(s,t)}catch{}}const or=["majlis","fereej","barr"],lS={fereej:{sky:"models/world/sky_morning.jpg",models:[{path:"models/world/courtyard.glb",position:[0,0,0]},{path:"models/world/tower.glb",position:[-9,0,-14],rotationY:.4},{path:"models/world/tower.glb",position:[11,0,-12],rotationY:-.3},{path:"models/world/well.glb",position:[3.2,0,-2.4],rotationY:.6},{path:"models/world/palm.glb",position:[-3.5,0,-3.5],scale:.9}]},barr:{sky:"models/world/sky_morning.jpg",ground:"#d6ae78",lamps:[[-1,.45,.1]],models:[{path:"models/world/tent.glb",position:[0,0,-3.4]},{path:"models/world/lantern.glb",position:[-1,0,.1],scale:.8},{path:"models/world/camel_kneeling.glb",position:[4.2,0,-1.5],rotationY:-1.9,scale:.75},{path:"models/world/camel_standing.glb",position:[6.5,0,-5.5],rotationY:2.4,scale:.65},{path:"models/world/sheep.glb",position:[-4.5,0,-.5],rotationY:1.2,scale:.7},{path:"models/world/sheep.glb",position:[-5.4,0,.6],rotationY:.6,scale:.7},{path:"models/world/palm.glb",position:[-7,0,-7],scale:1.1},{path:"models/world/palm.glb",position:[8,0,-10],rotationY:1.3}]}};class cS{root=new Gt;groups=new Map;currentId="majlis";constructor(t){this.root.name="environments",this.root.add(t),this.groups.set("majlis",Promise.resolve(t))}get current(){return this.currentId}async show(t){this.currentId=t;let e=this.groups.get(t);e||(e=this.build(t),this.groups.set(t,e));const n=await e;if(this.currentId===t){for(const[i,r]of this.groups)r.then(a=>a.visible=i===t);n.visible=!0}}async build(t){const e=lS[t],n=new Gt;if(n.name=`env-${t}`,n.visible=!1,this.root.add(n),n.add(dM(e.sky)),e.ground){const r=new te(new Pr(55,48).rotateX(-Math.PI/2),new gs({color:e.ground}));r.position.y=-.01,n.add(r)}for(const r of e.lamps??[]){const a=new dc("#ff9f45",2.2,5,1.6);a.position.set(...r),n.add(a)}const i=await Promise.all(e.models.map(r=>cM(r.path)));return e.models.forEach((r,a)=>{const o=i[a];o.position.set(...r.position),o.rotation.y=r.rotationY??0,o.scale.setScalar(r.scale??1),n.add(o)}),n}}const Du={type:"change"},vc={type:"start"},df={type:"end"},ma=new Ss,Nu=new Zn,hS=Math.cos(70*Te.DEG2RAD),Fe=new A,tn=2*Math.PI,le={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Go=1e-6;class uS extends C0{constructor(t,e=null){super(t,e),this.state=le.NONE,this.target=new A,this.cursor=new A,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:us.ROTATE,MIDDLE:us.DOLLY,RIGHT:us.PAN},this.touches={ONE:as.ROTATE,TWO:as.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new A,this._lastQuaternion=new he,this._lastTargetPosition=new A,this._quat=new he().setFromUnitVectors(t.up,new A(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Nh,this._sphericalDelta=new Nh,this._scale=1,this._panOffset=new A,this._rotateStart=new it,this._rotateEnd=new it,this._rotateDelta=new it,this._panStart=new it,this._panEnd=new it,this._panDelta=new it,this._dollyStart=new it,this._dollyEnd=new it,this._dollyDelta=new it,this._dollyDirection=new A,this._mouse=new it,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=fS.bind(this),this._onPointerDown=dS.bind(this),this._onPointerUp=pS.bind(this),this._onContextMenu=MS.bind(this),this._onMouseWheel=_S.bind(this),this._onKeyDown=xS.bind(this),this._onTouchStart=vS.bind(this),this._onTouchMove=yS.bind(this),this._onMouseDown=mS.bind(this),this._onMouseMove=gS.bind(this),this._interceptControlDown=SS.bind(this),this._interceptControlUp=bS.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=le.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();const t=this.domElement.getRootNode();t.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),t.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Du),this.update(),this.state=le.NONE}pan(t,e){this._pan(t,e),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){const e=this.object.position;Fe.copy(e).sub(this.target),Fe.applyQuaternion(this._quat),this._spherical.setFromVector3(Fe),this.autoRotate&&this.state===le.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,i=this.maxAzimuthAngle;isFinite(n)&&isFinite(i)&&(n<-Math.PI?n+=tn:n>Math.PI&&(n-=tn),i<-Math.PI?i+=tn:i>Math.PI&&(i-=tn),n<=i?this._spherical.theta=Math.max(n,Math.min(i,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+i)/2?Math.max(n,this._spherical.theta):Math.min(i,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Fe.setFromSpherical(this._spherical),Fe.applyQuaternion(this._quatInverse),e.copy(this.target).add(Fe),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=Fe.length();a=this._clampDistance(o*this._scale);const l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const o=new A(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new A(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=Fe.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(ma.origin.copy(this.object.position),ma.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(ma.direction))<hS?this.object.lookAt(this.target):(Nu.setFromNormalAndCoplanarPoint(this.object.up,this.target),ma.intersectPlane(Nu,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Go||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Go||this._lastTargetPosition.distanceToSquared(this.target)>Go?(this.dispatchEvent(Du),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?tn/60*this.autoRotateSpeed*t:tn/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Fe.setFromMatrixColumn(e,0),Fe.multiplyScalar(-t),this._panOffset.add(Fe)}_panUp(t,e){this.screenSpacePanning===!0?Fe.setFromMatrixColumn(e,1):(Fe.setFromMatrixColumn(e,0),Fe.crossVectors(this.object.up,Fe)),Fe.multiplyScalar(t),this._panOffset.add(Fe)}_pan(t,e){const n=this.domElement;if(this.object.isPerspectiveCamera){const i=this.object.position;Fe.copy(i).sub(this.target);let r=Fe.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),i=t-n.left,r=e-n.top,a=n.width,o=n.height;this._mouse.x=i/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(tn*this._rotateDelta.x/e.clientHeight),this._rotateUp(tn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(tn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-tn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(tn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-tn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),i=.5*(t.pageY+e.y);this._rotateStart.set(n,i)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),i=.5*(t.pageY+e.y);this._panStart.set(n,i)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,i=t.pageY-e.y,r=Math.sqrt(n*n+i*i);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),i=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(i,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(tn*this._rotateDelta.x/e.clientHeight),this._rotateUp(tn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),i=.5*(t.pageY+e.y);this._panEnd.set(n,i)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,i=t.pageY-e.y,r=Math.sqrt(n*n+i*i);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new it,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function dS(s){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(s.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(s)&&(this._addPointer(s),s.pointerType==="touch"?this._onTouchStart(s):this._onMouseDown(s),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function fS(s){this.enabled!==!1&&(s.pointerType==="touch"?this._onTouchMove(s):this._onMouseMove(s))}function pS(s){switch(this._removePointer(s),this._pointers.length){case 0:this.domElement.releasePointerCapture(s.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(df),this.state=le.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function mS(s){let t;switch(s.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case us.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(s),this.state=le.DOLLY;break;case us.ROTATE:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=le.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=le.ROTATE}break;case us.PAN:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=le.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=le.PAN}break;default:this.state=le.NONE}this.state!==le.NONE&&this.dispatchEvent(vc)}function gS(s){switch(this.state){case le.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(s);break;case le.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(s);break;case le.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(s);break}}function _S(s){this.enabled===!1||this.enableZoom===!1||this.state!==le.NONE||(s.preventDefault(),this.dispatchEvent(vc),this._handleMouseWheel(this._customWheelEvent(s)),this.dispatchEvent(df))}function xS(s){this.enabled!==!1&&this._handleKeyDown(s)}function vS(s){switch(this._trackPointer(s),this._pointers.length){case 1:switch(this.touches.ONE){case as.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(s),this.state=le.TOUCH_ROTATE;break;case as.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(s),this.state=le.TOUCH_PAN;break;default:this.state=le.NONE}break;case 2:switch(this.touches.TWO){case as.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(s),this.state=le.TOUCH_DOLLY_PAN;break;case as.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(s),this.state=le.TOUCH_DOLLY_ROTATE;break;default:this.state=le.NONE}break;default:this.state=le.NONE}this.state!==le.NONE&&this.dispatchEvent(vc)}function yS(s){switch(this._trackPointer(s),this.state){case le.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(s),this.update();break;case le.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(s),this.update();break;case le.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(s),this.update();break;case le.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(s),this.update();break;default:this.state=le.NONE}}function MS(s){this.enabled!==!1&&s.preventDefault()}function SS(s){s.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function bS(s){s.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Uu={interrupted:600,reacting:1200},wS={idle:["userStartedSpeaking","responseStarted","react","reset"],listening:["userStoppedSpeaking","responseStarted","reset"],thinking:["userStartedSpeaking","responseStarted","responseCancelled","reset"],speaking:["userStartedSpeaking","responseStarted","responseFinished","responseCancelled","reset"],storytelling:["userStartedSpeaking","responseFinished","responseCancelled","reset"],reacting:["userStartedSpeaking","responseStarted","reset"],interrupted:["userStoppedSpeaking","responseStarted","reset"]};class TS extends hf{current="idle";enteredAt=0;userTalkingAfterInterrupt=!1;get state(){return this.current}dispatch(t,e){if(!wS[this.current].includes(t.type))return this.current;switch(t.type){case"userStartedSpeaking":this.current==="speaking"||this.current==="storytelling"?(this.userTalkingAfterInterrupt=!0,this.set("interrupted",e)):this.set("listening",e);break;case"userStoppedSpeaking":this.userTalkingAfterInterrupt=!1,this.set("thinking",e);break;case"responseStarted":this.set(t.story?"storytelling":"speaking",e);break;case"responseFinished":case"responseCancelled":this.set("idle",e);break;case"react":this.set("reacting",e);break;case"reset":this.userTalkingAfterInterrupt=!1,this.set("idle",e);break}return this.current}update(t){const e=t-this.enteredAt;this.current==="interrupted"&&e>=Uu.interrupted?this.set(this.userTalkingAfterInterrupt?"listening":"idle",t):this.current==="reacting"&&e>=Uu.reacting&&this.set("idle",t)}set(t,e){if(t===this.current)return;const n=this.current;this.current=t,this.enteredAt=e,this.emit("change",{from:n,to:t})}}const Ti="#b98a5c",ga="#9c7048",ES="#a67c55",lr="#4a3020",AS="#8a6a3c",cr="#7d1f24",hs="#c9a35a",Ln="#c79a3b",ff={halfW:3.2,back:-2.6,front:3.4,height:3.2};function RS(){const s=new Gt;s.name="majlis-full";const t=new Gt;return t.name="majlis-core",s.add(CS()),s.add(PS()),s.add(IS()),s.add(FS()),s.add(OS()),t.add(LS()),t.add(DS()),t.add(NS()),{full:s,core:t,lights:US()}}function CS(){const s=new fe,{halfW:t,back:e,front:n,height:i}=ff,r=n-e,a=(n+e)/2,o=.25;s.add(Zt(t*2,.05,r),ES,[0,-.025,a]),s.add(Zt(t*2+o*2,.12,r+o*2),AS,[0,i+.06,a]),s.add(Zt(t*2+o*2,i,o),Ti,[0,i/2,e-o/2]),s.add(Zt(o,i,r),Ti,[-t-o/2,i/2,a]),s.add(Zt(o,i,r),Ti,[t+o/2,i/2,a]);const l=1.1,c=t-l/2;s.add(Zt(c,i,o),Ti,[-1.8750000000000002,i/2,n+o/2]),s.add(Zt(c,i,o),Ti,[l/2+c/2,i/2,n+o/2]),s.add(Zt(l,i-2.1,o),Ti,[0,2.1+(i-2.1)/2,n+o/2]),s.add(Zt(l,2.1,.08),lr,[0,1.05,n+o-.04]),s.add(Zt(t*2,.35,.04),ga,[0,.175,e+.02]),s.add(Zt(.04,.35,r),ga,[-t+.02,.175,a]),s.add(Zt(.04,.35,r),ga,[t-.02,.175,a]);for(let h=e+.4;h<n;h+=.55)s.add(Re(.06,.06,t*2,6),lr,[0,i-.06,h],[0,0,Math.PI/2]);for(const h of[-1.6,0,1.6])s.add(Re(.14,.14,.05,3),"#2a3550",[h,i-.45,e+.01],[Math.PI/2,0,0]);for(const h of[-1.2,.6,2.2])s.add(Zt(.03,.5,.32),"#7a5634",[-t+.015,1.5,h]),s.add(Zt(.03,.5,.32),"#7a5634",[t-.015,1.5,h]);for(const h of[-1.9,1.9])s.add(Re(.17,.2,i,12),Ti,[h,i/2,.9]),s.add(Zt(.5,.12,.5),ga,[h,i-.06,.9]);return gi(s.build(),"shell")}function PS(){const s=new fe,{halfW:t,back:e,front:n}=ff,i=(r,a,o,l)=>{const c=l?o:.55,h=l?.55:o;s.add(Zt(c,.12,h),cr,[r,.06,a]),s.add(Zt(l?c:.04,.02,l?.04:h),hs,[r,.125,l?a+.26:a]);const u=l?r:r+(r<0?-.22:.22),f=l?a-.22:a;s.add(Zt(l?c:.14,.42,l?.14:h),cr,[u,.33,f])};i(0,e+.3,3.4,!0),i(-t+.3,.6,3.6,!1),i(t-.3,.6,3.6,!1);for(const r of[-.6,.6,1.8])s.add(Re(.1,.1,.4,10),hs,[-t+.55,.2,r],[Math.PI/2,0,0]),s.add(Re(.1,.1,.4,10),hs,[t-.55,.2,r],[Math.PI/2,0,0]);s.add(Zt(.7,.1,.6),cr,[0,.05,1.5]),s.add(Zt(.72,.02,.04),hs,[0,.1,1.2]),s.add(Zt(.8,.25,.6),"#8e7a66",[t-.75,.125,e+.6]),s.add(Zt(.5,.02,.35),"#3a2c22",[t-.75,.26,e+.6]);for(let r=0;r<3;r++)s.add(Re(.11,.08,.26,10),Ln,[t-.95+r*.2,.39,e+.6]);s.add(Zt(.6,.4,.35),lr,[-t+.4,.2,e+.45]),s.add(Zt(.62,.04,.37),Ln,[-t+.4,.41,e+.45]),s.add(Re(.05,.08,.14,8),"#5a3a26",[-t+.4,.5,e+.45]),s.add(Re(.09,.05,.06,8),Ln,[-t+.4,.6,e+.45]),s.add(Zt(.2,.03,.2),lr,[1.1,.015,-.9]);for(const[r,a]of[[-.08,-.08],[.08,-.08],[-.08,.08],[.08,.08]])s.add(Zt(.015,.36,.015),Ln,[1.1+r,.2,-.9+a]);return s.add(Re(0,.13,.12,4),Ln,[1.1,.44,-.9],[0,Math.PI/4,0]),s.add(Zt(1.3,.12,.3),lr,[0,2.16,n+.12]),gi(s.build(),"furniture")}function IS(){const s=new ni(40,16,10),t=new Ue({color:"#141b33",side:Ke,depthWrite:!1}),e=new te(s,t);return e.renderOrder=-1,gi(e,"sky")}function LS(){const s=new gs({map:OM()}),t=new te(new Oi(2.4,1.4),s);return t.rotation.x=-Math.PI/2,t.position.set(0,.006,.35),gi(t,"rug")}function DS(){const s=new fe;return s.add(Zt(.85,.1,.7),cr,[0,.05,-.05]),s.add(Zt(.87,.02,.04),hs,[0,.1,.3]),s.add(Zt(.85,.45,.16),cr,[0,.33,-.42]),s.add(Re(.09,.09,.42,10),hs,[-.5,.18,-.08],[Math.PI/2,0,0]),s.add(Re(.6,.6,.002,20),"#2b1d14",[0,.004,-.05]),gi(s.build(),"elder-seat")}function NS(){const s=new fe,t=.62,e=.32;s.add(Re(.2,.2,.02,18),Ln,[t,.015,e]);const n=[[0,0],[.075,0],[.085,.03],[.07,.08],[.045,.11],[.03,.15],[.035,.2],[.05,.21],[0,.22]].map(([i,r])=>new it(i,r));s.add(new Va(n,14),Ln,[t-.06,.025,e-.02]),s.add(Re(.005,.016,.15,6),Ln,[t+0,.17,e-.02],[0,0,-.9]),s.add(Re(0,.025,.05,8),Ln,[t-.06,.27,e-.02]),s.add(new Un(.05,.006,4,10,Math.PI),Ln,[t-.13,.15,e-.02],[0,0,Math.PI/2]);for(let i=0;i<3;i++)s.add(Re(.022,.016,.03,8),"#f1ece0",[t+.06+i%2*.05,.04,e+.08-i*.05]);s.add(Re(.07,.04,.04,12),"#6b4a2c",[t-.02,.045,e+.13]);for(let i=0;i<6;i++){const r=i/6*Math.PI*2;s.add(zt(.015,6,4),"#4a2412",[t-.02+Math.cos(r)*.035,.07,e+.13+Math.sin(r)*.035],[0,0,0],[1,.7,1.6])}return gi(s.build(),"coffee-set")}function US(){const s=new Gt;s.name="lights",s.add(new a0("#ffe6c4","#5a3d28",1.1));const t=new Hd("#ffd9a8",1.3);return t.position.set(1.5,3,2),s.add(t),s}function OS(){const s=new dc("#ff9f45",2.2,5,1.6);return s.position.set(1.1,.35,-.9),gi(s,"lantern-light")}function FS(){const s=new te(new Ui(.13,.26,.13),new Ue({color:"#ffb35c"}));return s.position.set(1.1,.2,-.9),gi(s,"lantern-glow")}function gi(s,t){return s.name=t,s}class BS{renderer;scene=new Xp;camera;stage=new Gt;majlis;environments;rig=null;posture="seated";behavior=new TS;controls;timer=new p0;frameHooks=[];headWorld=new A;viewMode="vr";constructor(t){this.renderer=new Ay({antialias:!0,alpha:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.setSize(t.clientWidth,t.clientHeight),this.renderer.outputColorSpace=ye,this.renderer.xr.enabled=!0,this.renderer.xr.setReferenceSpaceType("local-floor"),this.renderer.xr.setFoveation(1),t.appendChild(this.renderer.domElement),this.camera=new je(60,t.clientWidth/t.clientHeight,.05,100),this.frameCamera(t),this.scene.add(this.stage),this.majlis=RS(),this.environments=new cS(this.majlis.full),this.stage.add(this.environments.root,this.majlis.core,this.majlis.lights),this.behavior.on("change",({to:e})=>this.rig?.setState(e)),this.controls=new uS(this.camera,this.renderer.domElement),this.controls.target.set(0,.8,0),this.controls.enableDamping=!0,this.controls.enablePan=!1,this.controls.minDistance=.9,this.controls.maxDistance=3.2,this.controls.minPolarAngle=Math.PI*.3,this.controls.maxPolarAngle=Math.PI*.55,this.controls.minAzimuthAngle=-Math.PI*.45,this.controls.maxAzimuthAngle=Math.PI*.45,this.controls.update(),window.addEventListener("resize",()=>this.resize(t)),this.renderer.setAnimationLoop((e,n)=>this.tick(e,n))}get character(){return this.rig}setCharacter(t){this.rig?.dispose(),this.rig=t,t.setState(this.behavior.state),t.setPosture(this.posture),this.stage.add(t.object)}get currentPosture(){return this.posture}setPosture(t){this.posture=t,this.rig?.setPosture(t)}onFrame(t){this.frameHooks.push(t)}get mode(){return this.viewMode}setViewMode(t){this.viewMode=t,this.environments.root.visible=t==="vr"}frameCamera(t){const e=t.clientWidth<t.clientHeight;this.camera.fov=e?70:55,this.camera.position.set(0,e?1:1.05,e?2.5:1.9),this.camera.updateProjectionMatrix()}resize(t){this.renderer.xr.isPresenting||(this.camera.aspect=t.clientWidth/t.clientHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(t.clientWidth,t.clientHeight))}tick(t,e){this.timer.update(t);const n=Math.min(this.timer.getDelta(),.1),i=this.timer.getElapsed();this.renderer.xr.isPresenting||this.controls.update(),(this.renderer.xr.isPresenting?this.renderer.xr.getCamera():this.camera).getWorldPosition(this.headWorld),this.rig?.lookAt(this.headWorld),this.behavior.update(performance.now());for(const a of this.frameHooks)a(n,i,e);this.rig?.update(n,i),this.renderer.render(this.scene,this.camera)}}const kS=["idle","listening","thinking","speaking","storytelling","reacting","interrupted"];class zS{constructor(t,e,n){this.root=t,this.caps=e,this.actions=n,this.render()}root;caps;actions;error="";voiceStatus={kind:"idle"};speaking=!1;menuOpen=!1;lines={user:"",character:""};refs={};showError(t){this.error=t,this.render()}status(t){this.voiceStatus=t,t.kind==="connecting"&&(this.lines={user:"",character:""}),this.updateVoice()}transcript(t){this.lines[t.role]=t.text,this.updateVoice()}speakingChanged(t){this.speaking=t,this.updateVoice()}updateVoice(){const{status:t,talk:e,cut:n,captions:i,user:r,character:a}=this.refs;if(t&&(t.textContent=uf(this.voiceStatus),t.classList.toggle("error",this.voiceStatus.kind==="error")),e&&(e.textContent=this.actions.voice.active()?Mt("talk.stop"):Mt("talk.start")),n&&(n.hidden=!(this.speaking&&this.actions.voice.active())),i&&r&&a){r.textContent=this.lines.user?`${Mt("caption.you")}: ${this.lines.user}`:"";const o=Mt(on[this.actions.getCharacter()].nameKey).split(" — ")[0];a.textContent=this.lines.character?`${o}: ${this.lines.character}`:"",i.hidden=!this.lines.user&&!this.lines.character}}render(){document.documentElement.lang=Au(),document.documentElement.dir=Hl()?"rtl":"ltr",document.title=Mt("app.title"),this.root.replaceChildren(),this.refs={};const t=be("header","top"),e=Ei("☰","icon",()=>this.setMenu(!this.menuOpen));e.setAttribute("aria-expanded",String(this.menuOpen)),e.setAttribute("aria-label",Mt("btn.options")),e.title=Mt("btn.options"),t.append(e,be("h1","",Mt("app.title")));const n=Ei(Mt("btn.language"),"small",()=>{XM(Au()==="ar"?"en":"ar"),this.render()}),i=be("section","bottom"),r=this.actions.voice;if(r.configured){const h=be("div","captions");this.refs.user=be("p","caption user"),this.refs.character=be("p","caption elder"),h.append(this.refs.character,this.refs.user),this.refs.captions=h,this.refs.status=be("p","status");const u=be("div","row");this.refs.talk=Ei("","primary",()=>{r.toggle(),this.updateVoice()}),this.refs.cut=Ei(Mt("talk.cut"),"",()=>r.interrupt()),u.append(this.refs.talk,this.refs.cut),this.xrButtons(u),i.append(h,this.refs.status,u)}else{const h=be("div","row");this.xrButtons(h),i.append(be("p","notice",Mt("voice.notConfigured")),h)}const a=be("aside","drawer");a.id="options",a.hidden=!this.menuOpen;const o=be("div","drawer-head"),l=be("div","row");l.append(n,Ei(Mt("btn.close"),"small",()=>this.setMenu(!1))),o.append(be("h2","",Mt("btn.options")),l),a.append(o);const c=this.actions.getCharacter();if(a.append(this.select(Mt("settings.character"),HM.map(h=>[h,Mt(on[h].nameKey)]),c,h=>{this.actions.setCharacter(h),this.lines={user:"",character:""},this.render()})),a.append(this.select(Mt("env.label"),or.map(h=>[h,Mt(`env.${h}`)]),this.actions.currentEnvironment(),h=>this.actions.setEnvironment(h))),r.configured){const h=be("label","states"),u=document.createElement("input");u.type="password",u.autocomplete="off",u.value=r.getCode(),u.addEventListener("change",()=>r.setCode(u.value)),h.append(document.createTextNode(Mt("settings.code")),u),a.append(h,this.select(Mt("settings.interrupt"),[["auto",Mt("interrupt.auto")],["tap",Mt("interrupt.tap")]],r.getMode(),f=>r.setMode(f)),this.select(Mt("settings.voice"),on[c].voices.map(f=>[f,Mt(`voice.${f}`)]),r.getVoice(),f=>r.setVoice(f)),be("p","hint",Mt("settings.voiceNote")),this.select(Mt("settings.tone"),[["on",Mt("tone.on")],["off",Mt("tone.off")]],r.getTone()?"on":"off",f=>r.setTone(f==="on")),be("p","hint",Mt("talk.hint"))),(this.caps.vr||this.caps.ar)&&a.append(be("p","hint",Mt("talk.xrHint")))}!this.caps.vr&&!this.caps.ar&&a.append(be("p","hint",Mt("touch.hint"))),a.append(this.select(Mt("states.title"),kS.map(h=>[h,Mt(`state.${h}`)]),"idle",h=>this.actions.previewState(h))),a.append(be("p","notice",Mt("app.phaseNotice"))),on[c].kids&&a.append(be("p","notice",Mt("kids.notice",{name:Mt(on[c].nameKey).split(" — ")[0]}))),this.error&&i.append(be("p","notice error",this.error)),this.root.append(t,i,a),this.updateVoice()}xrButtons(t){this.caps.vr&&t.append(Ei(Mt("btn.enterVR"),"",()=>this.actions.enterXR("vr"))),this.caps.ar&&t.append(Ei(Mt("btn.enterMR"),"",()=>this.actions.enterXR("mr")))}setMenu(t){this.menuOpen=t;const e=this.root.querySelector(".drawer");e&&(e.hidden=!t),this.root.querySelector(".top button[aria-expanded]")?.setAttribute("aria-expanded",String(t))}select(t,e,n,i){const r=be("label","states"),a=document.createElement("select");for(const[o,l]of e){const c=document.createElement("option");c.value=o,c.textContent=l,c.selected=o===n,a.append(c)}return a.addEventListener("change",()=>i(a.value)),r.append(document.createTextNode(t),a),r}}function be(s,t="",e){const n=document.createElement(s);return t&&(n.className=t),e!==void 0&&(n.textContent=e),n}function Ei(s,t,e){const n=document.createElement("button");return n.type="button",t&&(n.className=t),n.textContent=s,n.addEventListener("click",e),n}const Wo=["bubble","firework","water","confetti"],Ou={bubble:{speed:4.2,grav:-.06,life:3.6,r:.06,cool:.16},firework:{speed:20,grav:.35,life:.85,r:.025,cool:.2},water:{speed:7.5,grav:1,life:1.6,r:.015,cool:.03},confetti:{speed:8,grav:.4,life:.45,r:.03,cool:.45}},Fu=9.8,Bu=[14835775,15909198,7317718,8109962,13214438,16775922];function Xo(s,t=!1){const e=document.createElement("canvas");e.width=e.height=64;const n=e.getContext("2d");if(t){const r=n.createRadialGradient(32,32,18,32,32,31);r.addColorStop(0,"rgba(255,255,255,0.04)"),r.addColorStop(.55,"rgba(160,220,255,0.25)"),r.addColorStop(.8,"rgba(255,170,230,0.6)"),r.addColorStop(.92,"rgba(255,240,150,0.75)"),r.addColorStop(1,"rgba(255,255,255,0)"),n.fillStyle=r,n.fillRect(0,0,64,64),n.fillStyle="rgba(255,255,255,0.85)",n.beginPath(),n.ellipse(22,20,7,4,-.6,0,Math.PI*2),n.fill()}else{const r=n.createRadialGradient(32,32,0,32,32,31);r.addColorStop(0,`rgba(${s},1)`),r.addColorStop(.4,`rgba(${s},0.8)`),r.addColorStop(1,`rgba(${s},0)`),n.fillStyle=r,n.fillRect(0,0,64,64)}const i=new bs(e);return i.colorSpace=ye,i}class Yo{constructor(t,e){this.capacity=t;const n=new Qt;this.pos=new Ce(new Float32Array(t*3),3),this.col=new Ce(new Float32Array(t*3).fill(1),3),this.pos.setUsage(Oc),this.col.setUsage(Oc),n.setAttribute("position",this.pos),n.setAttribute("color",this.col),n.setDrawRange(0,0),this.points=new rc(n,e),this.points.frustumCulled=!1}capacity;points;pos;col;count=0;begin(){this.count=0}add(t,e){this.count>=this.capacity||(this.pos.setXYZ(this.count,t.x,t.y,t.z),e&&this.col.setXYZ(this.count,e.r,e.g,e.b),this.count++)}end(){this.points.geometry.setDrawRange(0,this.count),this.pos.needsUpdate=!0,this.col.needsUpdate=!0}}class fi{static COUNT=180;static DUR=3.5;pool=[];m4=new Dt;pv=new A;sv=new A;constructor(t){const e=new Oi(.03,.06),n=new Ue({side:en}),i=["#ff4040","#ff9638","#ffe14a","#46d56c","#38baff","#5754e8","#b65bff"].map(a=>new St(a)),r=new Sn;for(let a=0;a<4;a++){const o=new Md(e,n,fi.COUNT);o.visible=!1,o.frustumCulled=!1;const l=new Float32Array(fi.COUNT),c=new Float32Array(fi.COUNT),h=[];for(let u=0;u<fi.COUNT;u++)l[u]=Math.random(),c[u]=Math.random()*Math.PI*2,h.push(new he().setFromEuler(r.set(Math.random()*6.283,Math.random()*6.283,Math.random()*6.283))),o.setColorAt(u,i[u%i.length]);t.add(o),this.pool.push({mesh:o,rp:l,ang:c,qs:h,t:0,active:!1,radius:1,elev:1})}}pop(t,e=1.2,n=1.1){const i=this.pool.find(r=>!r.active)??this.pool[0];i.active=!0,i.t=0,i.radius=e,i.elev=n,i.mesh.position.copy(t),i.mesh.visible=!0}update(t){const n=.30000000000000004;for(const i of this.pool){if(!i.active)continue;i.t+=t;const r=Math.min(1,i.t/fi.DUR),a=1-(1-r)*(1-r);for(let o=0;o<fi.COUNT;o++){const l=n*i.rp[o];let c=Math.max(0,Math.min(1,(a-l)/.7));c=1-Math.pow(1-c,3);const h=Math.min(1,(1-Math.abs(c-.5)*2)*20),u=i.rp[o]*99%1;this.pv.set(Math.sin(i.ang[o])*c*u*i.radius,(1-Math.pow(1-c*2,2))*u*i.elev,Math.cos(i.ang[o])*c*u*i.radius),this.sv.setScalar(Math.max(1e-4,h)),this.m4.compose(this.pv,i.qs[o],this.sv),i.mesh.setMatrixAt(o,this.m4)}i.mesh.instanceMatrix.needsUpdate=!0,r>=1&&(i.active=!1,i.mesh.visible=!1)}}}class HS{constructor(t,e){this.world=t,this.events=e,this.group.name="celebration-shots",this.bubbles=new Yo(48,new ps({map:Xo("",!0),size:.12,transparent:!0,depthWrite:!1,vertexColors:!1})),this.glows=new Yo(512,new ps({map:Xo("255,255,255"),size:.035,transparent:!0,depthWrite:!1,vertexColors:!0,blending:Ra})),this.drops=new Yo(256,new ps({map:Xo("120,200,255"),size:.04,transparent:!0,depthWrite:!1,color:"#9ad8ff"})),this.group.add(this.bubbles.points,this.glows.points,this.drops.points);for(let n=0;n<8;n++){const i=new te(new Ga(.06,.08,24).rotateX(-Math.PI/2),new Ue({color:"#bfe8ff",transparent:!0,opacity:0,depthWrite:!1}));i.visible=!1,this.group.add(i),this.rings.push({mesh:i,t:1})}this.confetti=new fi(this.group)}world;events;group=new Gt;shots=[];sparks=[];rings=[];bubbles;glows;drops;confetti;lastShot=new Map;clock=0;tmp=new A;fire(t,e,n,i){const r=Ou[t];if(this.clock-(this.lastShot.get(i)??-1)<r.cool)return!1;this.lastShot.set(i,this.clock),this.shots.length>=64&&this.shots.shift();const a=e.clone().addScaledVector(n,.08),o=t==="water"?2:1;for(let l=0;l<o;l++){const c=n.clone();t==="water"&&c.add(new A((Math.random()-.5)*.06,(Math.random()-.5)*.06,(Math.random()-.5)*.06)).normalize(),this.shots.push({kind:t,p:a.clone(),v:c.multiplyScalar(r.speed),t:0,wob:Math.random()*6})}return t!=="bubble"&&t!=="water"&&this.spark(a,new A,16771504,.07,0,0,1),this.events.sound(t==="water"?"splash":t==="bubble"?"pop":"whoosh",a),!0}update(t){this.clock+=t;const e=this.world.floorY,n=this.world.target();for(let i=this.shots.length-1;i>=0;i--){const r=this.shots[i],a=Ou[r.kind];r.t+=t;const o=this.tmp.copy(r.p),l={x:o.x,z:o.z};r.v.y-=Fu*a.grav*t,r.kind==="bubble"&&(r.wob+=t*3,r.v.x+=Math.sin(r.wob)*.25*t,r.v.z+=Math.cos(r.wob*.8)*.25*t),r.p.addScaledVector(r.v,t);let c=!1;const h=this.world.popAt?.(r.p,a.r);if(h){this.burst(r.p,h.getHex(),14,1.1),this.events.sound("pop",r.p),this.shots.splice(i,1);continue}else n&&r.p.distanceTo(n)<.22+a.r?(this.events.hitCharacter(r.kind),c=!0):this.world.crosses(l,{x:r.p.x,z:r.p.z})?(r.p.copy(o),c=!0):r.p.y<e+a.r&&(r.p.y=e+(r.kind==="water"?.002:a.r),c=!0);r.kind==="firework"&&!c&&Math.random()<.6&&this.spark(r.p,this.randomDir(.3),16760944,.25,.5,.92),(c||r.t>a.life)&&(this.finish(r,c),this.shots.splice(i,1))}for(let i=this.sparks.length-1;i>=0;i--){const r=this.sparks[i];r.t+=t,r.v.y-=Fu*r.grav*t,r.v.multiplyScalar(Math.pow(r.drag,t*60)),r.p.addScaledVector(r.v,t),r.t>=r.max&&this.sparks.splice(i,1)}for(const i of this.rings)i.t>=1||(i.t+=t/.6,i.mesh.scale.setScalar(1+i.t*4),i.mesh.material.opacity=Math.max(0,.8*(1-i.t)),i.t>=1&&(i.mesh.visible=!1));this.confetti.update(t),this.draw()}finish(t,e){switch(t.kind){case"bubble":this.burst(t.p,13626111,8,.8),this.events.sound("pop",t.p);break;case"firework":for(let n=0;n<26;n++)this.spark(t.p,this.randomDir(1.6+Math.random()*1.6),Bu[n%Bu.length],.5+Math.random()*.35,.5,.97);this.events.sound("boom",t.p);break;case"water":if(e){this.ripple(t.p);for(let n=0;n<3;n++)this.spark(t.p,this.randomDir(.9).setY(Math.random()*1.2),10148095,.35,1,.97,0)}break;case"confetti":this.confetti.pop(t.p,1,.9),this.events.sound("confetti",t.p);break}}ripple(t){const e=this.rings.find(n=>n.t>=1);e&&(e.t=0,e.mesh.position.set(t.x,this.world.floorY+.004,t.z),e.mesh.scale.setScalar(1),e.mesh.visible=!0)}burst(t,e,n,i){for(let r=0;r<n;r++)this.spark(t,this.randomDir(i*(.5+Math.random())),e,.3+Math.random()*.2,.3,.95)}spark(t,e,n,i,r=.5,a=.97,o=1){this.sparks.length>=480||this.sparks.push({p:t.clone(),v:e.clone(),c:new St(n),t:0,max:i,drag:a,grav:o===0?1:r})}randomDir(t){return new A(Math.random()-.5,Math.random()-.5,Math.random()-.5).normalize().multiplyScalar(t)}draw(){this.bubbles.begin(),this.drops.begin();const t=new St(16774358);this.glows.begin();for(const n of this.shots)n.kind==="bubble"?this.bubbles.add(n.p):n.kind==="water"?this.drops.add(n.p):this.glows.add(n.p,n.kind==="confetti"?new St(16751317):t);const e=new St;for(const n of this.sparks)this.glows.add(n.p,e.copy(n.c).multiplyScalar(Math.max(0,1-n.t/n.max)));this.bubbles.end(),this.drops.end(),this.glows.end()}clear(){this.shots.length=0,this.sparks.length=0,this.draw()}}function VS(s,t,e,n,i,r,a,o,l){const c={ink:"#2c2d3d"},h=0;function u(d,p,x,g,m,M,S,_){if(S==="closed"){d.strokeStyle=c.ink,d.lineWidth=g*.42,d.lineCap="round",d.lineJoin="round";const b=p<0?1:-1;d.beginPath(),d.moveTo(p-g*.6*b,x-g*.6),d.lineTo(p+g*.45*b,x),d.lineTo(p-g*.6*b,x+g*.6),d.stroke();return}if(S==="squint"||S==="laugh"){d.strokeStyle=c.ink,d.lineWidth=g*.42,d.lineCap="round",d.lineJoin="round",d.beginPath(),d.moveTo(p-g*.75,x+g*.35),d.quadraticCurveTo(p,x-g*.75,p+g*.75,x+g*.35),d.stroke();return}const T=S==="focus"?.6:1;if(d.save(),d.translate(p,x),d.scale(1,T),d.fillStyle="#fffaf2",d.beginPath(),d.ellipse(0,0,g,g*1.12,0,0,Math.PI*2),d.fill(),S==="dizzy"){d.strokeStyle=c.ink,d.lineWidth=g*.2,d.lineCap="round",d.beginPath();const b=h*9*(p<0?1:-1);for(let R=0;R<Math.PI*4;R+=.2){const v=g*.1+R*g*.055,E=Math.cos(R+b)*v,P=Math.sin(R+b)*v;R===0?d.moveTo(E,P):d.lineTo(E,P)}d.stroke()}else{const b=S==="wide"?g*.42:S==="joy"?g*.66:g*.55;d.fillStyle=c.ink,d.beginPath(),d.arc(m*g*.42,M*g*.48,b,0,Math.PI*2),d.fill(),d.fillStyle="rgba(255,255,255,.9)",d.beginPath(),d.arc(m*g*.42-b*.35,M*g*.48-b*.4,b*.28,0,Math.PI*2),d.fill(),S==="joy"&&(d.beginPath(),d.arc(m*g*.42+b*.35,M*g*.48+b*.3,b*.14,0,Math.PI*2),d.fill())}d.restore()}function f(d,p,x,g,m,M,S,_){if(x==="none")return;const T=p*.19,b=p*.31,R=-p*.08+m*p*.06,v=g*p*.08;if(u(d,-b+v,R,T,g,m,x),u(d,b+v,R,T,g,m,x),(x==="wide"||x==="dizzy")&&(d.fillStyle=c.ink,d.beginPath(),d.ellipse(v,p*.32+m*p*.05,p*.07,p*.09,0,0,Math.PI*2),d.fill()),x==="joy"&&(d.strokeStyle=c.ink,d.lineWidth=Math.max(1.2,p*.07),d.lineCap="round",d.beginPath(),d.arc(v,p*.1,p*.24,Math.PI*.18,Math.PI*.82),d.stroke()),x==="laugh"){const E=p*.2,P=p*.27,I=p*.24+Math.abs(Math.sin(h*16))*p*.05;d.save(),d.beginPath(),d.moveTo(v-P,E),d.lineTo(v+P,E),d.ellipse(v,E,P,I,0,0,Math.PI),d.closePath(),d.fillStyle="#4a1712",d.fill(),d.clip(),d.fillStyle="#d8505a",d.beginPath(),d.ellipse(v,E+I*.95,P*.6,I*.45,0,0,Math.PI*2),d.fill(),d.restore()}(x==="joy"||x==="laugh")&&(M=Math.max(M,.9)),M>0&&(d.fillStyle=`rgba(200,60,50,${.35*M})`,d.beginPath(),d.ellipse(-p*.55+v,p*.2,p*.13,p*.07,0,0,Math.PI*2),d.fill(),d.beginPath(),d.ellipse(p*.55+v,p*.2,p*.13,p*.07,0,0,Math.PI*2),d.fill())}return f(s,t,e,n,i,r)}const ku=[{style:"jelly",light:"#ffb3d7",dark:"#f54b9a"},{style:"fabric",light:"#d7b5ff",dark:"#a45cf0"},{style:"clay",light:"#ffd094",dark:"#ff922e"},{style:"fur",light:"#fffaf2",dark:"#d9cfc0"},{style:"bubble",light:"#e9f6ff",dark:"#9fcbe8"}];function pf(s,t,e){const n=document.createElement("canvas");n.width=s,n.height=t;const i=n.getContext("2d");i.translate(0,t),i.scale(1,-1),e(i);const r=new bs(n);return r.flipY=!1,r.colorSpace=ye,r}function zu(s){return pf(128,128,t=>{t.translate(64,64),VS(t,56,s,0,0,.9)})}function GS(s,t){return pf(128,64,e=>{const n=e.createLinearGradient(0,0,0,64);n.addColorStop(0,s),n.addColorStop(1,t),e.fillStyle=n,e.fillRect(0,0,128,64);const i=e.createRadialGradient(26,18,0,26,18,12);i.addColorStop(0,"rgba(255,255,255,0.9)"),i.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=i,e.fillRect(0,0,128,64)})}class WS{group=new Gt;balloons=[];anchor=new A;viewer=new A;time=0;constructor(t=7){this.group.name="dahrooj-balloons";const e=[zu("joy"),zu("laugh")],n=new Pr(1,24),i=new ni(1,20,14),r=new ms(.12,.2,8);for(let a=0;a<t;a++){const o=ku[a%ku.length],l=.055+Math.random()*.03,c=new Gt,h=new Ue({map:GS(o.light,o.dark),transparent:o.style==="bubble",opacity:o.style==="bubble"?.75:1}),u=new te(i,h);u.scale.set(l,l*1.1,l);const f=new te(n,new Ue({map:e[a%2],transparent:!0,depthWrite:!1}));f.scale.setScalar(l*.85),f.position.z=l*.97;const d=new te(r,new Ue({color:o.dark}));d.scale.setScalar(l),d.position.y=-l*1.15,d.rotation.x=Math.PI;const p=Array.from({length:12},(g,m)=>new A(Math.sin(m*.9)*.008,-l*1.2-m*.012,0)),x=new Cr(new Qt().setFromPoints(p),new vr({color:"#f5f0e6"}));c.add(u,f,d,x),this.group.add(c),this.balloons.push({group:c,body:u,color:new St(o.dark),r:l,angle:a/t*Math.PI*2,orbit:.3+Math.random()*.25,height:-.05+Math.random()*.45,speed:(.35+Math.random()*.3)*(a%2?1:-1),phase:Math.random()*6,respawn:0,pos:new A})}}update(t,e,n){this.time+=t,this.anchor.lerp(e,Math.min(1,t*2.5)),this.anchor.lengthSq()===0&&this.anchor.copy(e),this.viewer.copy(n);for(const i of this.balloons){if(i.respawn>0){i.respawn-=t,i.group.visible=!1,i.respawn<=0&&(i.respawn=0,i.pos.copy(this.anchor),i.group.scale.setScalar(.01));continue}i.group.visible=!0,i.angle+=i.speed*t;const r=Math.sin(this.time*1.3+i.phase)*.05,a=new A(this.anchor.x+Math.cos(i.angle)*i.orbit,this.anchor.y+i.height+r,this.anchor.z+Math.sin(i.angle)*i.orbit);i.pos.lerp(a,Math.min(1,t*3)),i.group.position.copy(i.pos),i.group.lookAt(this.viewer.x,i.pos.y,this.viewer.z),i.group.rotation.z=Math.sin(this.time*1.7+i.phase)*.12;const o=i.group.scale.x+(1-i.group.scale.x)*Math.min(1,t*4);i.group.scale.setScalar(o)}}hit(t,e){for(const n of this.balloons)if(!(n.respawn>0||!n.group.visible)&&n.pos.distanceTo(t)<n.r*1.1+e)return n.respawn=3+Math.random()*2,n.group.visible=!1,n.color;return null}get alive(){return this.balloons.filter(t=>t.respawn===0).length}positions(){return this.balloons.filter(t=>t.respawn===0).map(t=>t.pos.clone())}}const mf={floorY:0,floor:null,walls:[],obstacles:[]};function _a(s,t,e){return(t.x-s.x)*(e.z-s.z)-(t.z-s.z)*(e.x-s.x)}function Hu(s,t,e,n){const i=_a(e,n,s),r=_a(e,n,t),a=_a(s,t,e),o=_a(s,t,n);return(i>0&&r<0||i<0&&r>0)&&(a>0&&o<0||a<0&&o>0)}function Vu(s,t){let e=!1;for(let n=0,i=t.length-1;n<t.length;i=n++){const r=t[n],a=t[i];r.z>s.z!=a.z>s.z&&s.x<(a.x-r.x)*(s.z-r.z)/(a.z-r.z)+r.x&&(e=!e)}return e}function qs(s,t){const e=t.b.x-t.a.x,n=t.b.z-t.a.z,i=e*e+n*n,r=i===0?0:Math.max(0,Math.min(1,((s.x-t.a.x)*e+(s.z-t.a.z)*n)/i));return{x:t.a.x+r*e,z:t.a.z+r*n}}const Ks=(s,t)=>Math.hypot(s.x-t.x,s.z-t.z);function Gu(s){return s.map((t,e)=>({a:t,b:s[(e+1)%s.length]}))}class Ir{constructor(t=.25){this.radius=t}radius;geometry=mf;get known(){const t=this.geometry;return t.walls.length>0||t.floor!==null||t.obstacles.length>0}forFlight(t){const e=this.geometry,n=new Ir(this.radius);return n.geometry={floorY:e.floorY,floor:null,walls:e.walls,obstacles:e.obstacles.filter((i,r)=>(e.obstacleHeights?.[r]??1/0)>t)},n}forWalking(){return this.forFlight(-1/0)}clearance(t){return this.blockers().reduce((e,n)=>Math.min(e,Ks(t,qs(t,n))),1/0)}blockers(){const t=this.geometry;return[...t.walls,...t.obstacles.flatMap(Gu),...t.floor?Gu(t.floor):[]]}isBlocked(t){const e=this.geometry;return e.floor&&!Vu(t,e.floor)||e.obstacles.some(n=>Vu(t,n))?!0:this.blockers().some(n=>Ks(t,qs(t,n))<this.radius)}crosses(t,e){return this.blockers().some(n=>Hu(t,e,n.a,n.b))}step(t,e){if(!this.known||!this.crosses(t,e)&&!this.isBlocked(e)||this.isBlocked(t)&&!this.crosses(t,e)&&this.clearance(e)>=this.clearance(t))return e;const n=this.blockers().filter(i=>Hu(t,e,i.a,i.b)||Ks(e,qs(e,i))<this.radius).sort((i,r)=>Ks(t,qs(t,i))-Ks(t,qs(t,r)))[0];if(n){const i=n.b.x-n.a.x,r=n.b.z-n.a.z,a=Math.hypot(i,r)||1,o=e.x-t.x,l=e.z-t.z,c=(o*i+l*r)/a,h={x:t.x+c*i/a,z:t.z+c*r/a};if(!this.crosses(t,h)&&!this.isBlocked(h))return h}return t}firstFree(t,e){return this.known?t.find(n=>!this.isBlocked(n)&&(!e||!this.crosses(e,n)))??null:t[0]??null}}function XS(s,t){return{x:s[0]*t.x+s[4]*t.y+s[8]*t.z+s[12],y:s[1]*t.x+s[5]*t.y+s[9]*t.z+s[13],z:s[2]*t.x+s[6]*t.y+s[10]*t.z+s[14]}}const YS=new Set(["table","couch","bed","desk","storage","screen","lamp","plant","other"]);function qS(s){const t=[],e=[];for(const{plane:a,matrix:o}of s){const l=a.polygon.map(h=>XS(o,h));if(l.length<2)continue;const c=(a.semanticLabel??"").toLowerCase();if(a.orientation==="vertical"||c==="wall"||c.includes("frame")){if(c.includes("door")||c.includes("window"))continue;let h={a:{x:l[0].x,z:l[0].z},b:{x:l[1].x,z:l[1].z}},u=-1;for(let f=0;f<l.length;f++)for(let d=f+1;d<l.length;d++){const p=Math.hypot(l[f].x-l[d].x,l[f].z-l[d].z);p>u&&(u=p,h={a:{x:l[f].x,z:l[f].z},b:{x:l[d].x,z:l[d].z}})}u>.3&&e.push(h)}else{const h=l.reduce((u,f)=>u+f.y,0)/l.length;t.push({label:c,y:h,poly:l.map(u=>({x:u.x,z:u.z}))})}}const n=t.filter(a=>a.label==="floor").sort((a,o)=>a.y-o.y)[0]??t.filter(a=>a.label!=="ceiling").sort((a,o)=>a.y-o.y)[0],i=n?.y??0,r=t.filter(a=>a!==n&&a.label!=="ceiling"&&a.label!=="floor").filter(a=>YS.has(a.label)||a.y-i>.15&&a.y-i<1.6);return{floorY:i,floor:n&&n.poly.length>=3?n.poly:null,walls:e,obstacles:r.map(a=>a.poly),obstacleHeights:r.map(a=>a.y-i)}}const KS={side:.75,ahead:.25,start:.5,stop:.2,maxSpeed:1.2,accel:2,turnRate:5,personalSpace:.55,headingSpeed:.25,stuckFor:1.2,catchUpDistance:3.5};class ZS{position=new A;yaw=0;speed=0;walking=!1;stuck=0;mode="follow";autoFollow=!1;modeT=0;circleFrom=0;hold=new A;hopped=!1;heading=new A(0,0,-1);lastHead=new A;hasLastHead=!1;opts;tmp=new A;target=new A;constructor(t={}){this.opts={...KS,...t}}reset(t,e,n,i){this.position.set(t.x,0,t.z),this.yaw=e,this.speed=0,this.walking=!1,this.mode="follow",this.heading.set(i.x,0,i.z),this.heading.lengthSq()<1e-6&&this.heading.set(0,0,-1),this.heading.normalize(),this.lastHead.copy(n),this.hasLastHead=!0}get currentMode(){return this.mode}command(t,e,n){if(this.mode=t,this.modeT=0,this.stuck=0,this.autoFollow=t==="come",t==="stay"&&this.hold.copy(this.position),t==="come"){const i=new A(n.x,0,n.z);i.lengthSq()<1e-6&&i.set(0,0,-1),i.normalize(),this.hold.set(e.x+i.x*.95,0,e.z+i.z*.95)}t==="circle"&&(this.circleFrom=Math.atan2(this.position.x-e.x,this.position.z-e.z))}update(t,e,n=new Ir){if(t<=0)return;const i=this.opts,r=this.tmp.set(e.x,0,e.z);if(this.modeT+=t,this.hasLastHead){const S=e.x-this.lastHead.x,_=e.z-this.lastHead.z;Math.hypot(S,_)/t>i.headingSpeed&&this.heading.lerp(new A(S,0,_).normalize(),Math.min(1,t*3)).normalize()}this.lastHead.copy(e),this.hasLastHead=!0;const a=new A(-this.heading.z,0,this.heading.x),o=(S,_)=>({x:r.x+a.x*S+this.heading.x*_,z:r.z+a.z*S+this.heading.z*_}),l={x:this.position.x,z:this.position.z},c=n.isBlocked({x:r.x,z:r.z})?null:{x:r.x,z:r.z};this.mode==="come"&&this.autoFollow&&Math.hypot(this.hold.x-r.x,this.hold.z-r.z)>2.5&&(this.mode="follow"),this.mode==="circle"&&this.modeT>8&&(this.mode="follow");const h=()=>{const S=[];for(const _ of[.8,1.2,1.7])for(let T=0;T<12;T++){const b=T/12*Math.PI*2;S.push({x:r.x+Math.sin(b)*_,z:r.z+Math.cos(b)*_})}return S.sort((_,T)=>Math.hypot(_.x-l.x,_.z-l.z)-Math.hypot(T.x-l.x,T.z-l.z)),n.firstFree(S,c)};let u;if(this.mode==="stay")u={x:this.hold.x,z:this.hold.z};else if(this.mode==="come"){const S={x:this.hold.x-r.x,z:this.hold.z-r.z},_={x:-S.z*.6,z:S.x*.6};u=n.firstFree([{x:this.hold.x,z:this.hold.z},{x:this.hold.x+_.x,z:this.hold.z+_.z},{x:this.hold.x-_.x,z:this.hold.z-_.z}],c)??h()??l}else if(this.mode==="circle"){const S=this.circleFrom+this.modeT/8*Math.PI*2,_=T=>({x:r.x+Math.sin(S)*T,z:r.z+Math.cos(S)*T});u=n.firstFree([_(1.3),_(1),_(1.7)],c)??{x:this.target.x,z:this.target.z}}else u=n.firstFree([o(i.side,i.ahead),o(-i.side,i.ahead),o(i.side,-.6),o(-i.side,-.6),o(0,-.9)],c)??h()??l;this.target.set(u.x,0,u.z),this.hopped=!1;const f=new A().subVectors(this.target,this.position),d=f.length();this.walking=d>(this.walking?i.stop:i.start);const p=this.walking?Math.min(i.maxSpeed,d*1.6+.2):0,x=Te.clamp(p-this.speed,-i.accel*t*2,i.accel*t);this.speed=Math.max(0,this.speed+x);let g;if(this.speed>.05&&d>.001){const S=Math.min(d,this.speed*t),_=f.normalize(),T={x:l.x+_.x*S,z:l.z+_.z*S},b=n.isBlocked(l)?T:n.step(l,T),R=Math.hypot(b.x-l.x,b.z-l.z);this.stuck=R<S*.3?this.stuck+t:0,this.position.set(b.x,0,b.z),g=Math.atan2(_.x,_.z),(this.stuck>i.stuckFor||d>i.catchUpDistance)&&(this.position.copy(this.target),this.stuck=0,this.speed=0,this.hopped=!0)}else g=Math.atan2(r.x-this.position.x,r.z-this.position.z);const m=new A().subVectors(this.position,r),M=m.length();if(M<i.personalSpace){M<1e-4&&m.copy(a);const S=r.clone().addScaledVector(m.normalize(),i.personalSpace);n.isBlocked({x:S.x,z:S.z})||this.position.copy(S)}this.yaw+=gf(this.yaw,g)*Math.min(1,t*i.turnRate)}}function gf(s,t){let e=(t-s)%(Math.PI*2);return e>Math.PI&&(e-=Math.PI*2),e<-Math.PI&&(e+=Math.PI*2),e}class JS{ctx;out;noise=null;constructor(){this.ctx=new AudioContext,this.ctx.resume(),this.out=this.ctx.createGain(),this.out.gain.value=.35,this.out.connect(this.ctx.destination)}play(t){const e=this.ctx.currentTime;switch(t){case"pop":this.tone(e,900+Math.random()*300,300,.06,"sine",.5);break;case"whoosh":this.noiseBurst(e,.18,1800,.25,"bandpass");break;case"boom":this.noiseBurst(e,.5,900,.6,"lowpass");for(let n=0;n<6;n++)this.noiseBurst(e+.08+Math.random()*.35,.03,5e3,.15,"highpass");break;case"splash":this.noiseBurst(e,.07,2600,.08,"bandpass");break;case"confetti":this.noiseBurst(e,.08,3e3,.4,"highpass"),this.tone(e+.02,520,880,.18,"triangle",.25);break;case"click":this.tone(e,1400,1400,.03,"square",.12);break}}close(){this.ctx.close()}tone(t,e,n,i,r,a){const o=this.ctx.createOscillator(),l=this.ctx.createGain();o.type=r,o.frequency.setValueAtTime(e,t),o.frequency.exponentialRampToValueAtTime(Math.max(20,n),t+i),l.gain.setValueAtTime(a,t),l.gain.exponentialRampToValueAtTime(.001,t+i),o.connect(l).connect(this.out),o.start(t),o.stop(t+i+.02)}noiseBurst(t,e,n,i,r){if(!this.noise){this.noise=this.ctx.createBuffer(1,this.ctx.sampleRate,this.ctx.sampleRate);const c=this.noise.getChannelData(0);for(let h=0;h<c.length;h++)c[h]=Math.random()*2-1}const a=this.ctx.createBufferSource();a.buffer=this.noise;const o=this.ctx.createBiquadFilter();o.type=r,o.frequency.value=n;const l=this.ctx.createGain();l.gain.setValueAtTime(i,t),l.gain.exponentialRampToValueAtTime(.001,t+e),a.connect(o).connect(l).connect(this.out),a.start(t,Math.random()*.5),a.stop(t+e+.02)}}const $S={distance:1.4,minDistance:.9,heightBelowEyes:.55,roam:.6,maxSpeed:1.6,headingRate:1.2};class jS{position=new A;yaw=0;speed=0;velocity=new A;heading=new A(0,0,-1);t=0;opts;mode="follow";modeT=0;circleFrom=0;hold=new A;constructor(t={}){this.opts={...$S,...t}}reset(t,e){this.position.copy(t),this.velocity.set(0,0,0),this.speed=0,this.mode="follow",this.heading.set(e.x,0,e.z),this.heading.lengthSq()<1e-6&&this.heading.set(0,0,-1),this.heading.normalize()}get currentMode(){return this.mode}command(t,e){this.mode=t,this.modeT=0,t==="stay"&&this.hold.copy(this.position),t==="circle"&&(this.circleFrom=Math.atan2(this.position.x-e.x,this.position.z-e.z))}target=new A;update(t,e,n,i=new Ir){if(t<=0)return;const r=this.opts;if(this.t+=t,n.x*n.x+n.z*n.z>1e-6){const M=Math.atan2(this.heading.x,this.heading.z),S=Math.atan2(n.x,n.z),_=M+gf(M,S)*Math.min(1,t*r.headingRate);this.heading.set(Math.sin(_),0,Math.cos(_))}const a=this.t;let o=Math.sin(a*.35)*r.roam+Math.sin(a*.9)*.15;const l=r.distance+Math.sin(a*.5)*.2,c=e.y-r.heightBelowEyes+Math.sin(a*.7)*.12,h=(M,S)=>{const _=Math.cos(M),T=Math.sin(M),b=this.heading.x*_+this.heading.z*T,R=-this.heading.x*T+this.heading.z*_;return{x:e.x+b*S,z:e.z+R*S}},u={x:e.x,z:e.z};let f=h(o,l);if(i.known&&(i.isBlocked(f)||i.crosses(u,f))){const M=Math.atan2(this.position.x-e.x,this.position.z-e.z),S=r.minDistance+.1,_={x:e.x+Math.sin(M)*S,z:e.z+Math.cos(M)*S},T=[h(o,l*.8),h(-o,l),h(-o,l*.8),h(0,S),h(.9,S),h(-.9,S),_,h(Math.PI/2,S),h(-Math.PI/2,S)],b=i.firstFree(T,u);b?f=b:f={x:this.position.x,z:this.position.z},o=-o}if(this.target.set(f.x,c,f.z),this.modeT+=t,(this.mode==="come"&&this.modeT>6||this.mode==="circle"&&this.modeT>7)&&(this.mode="follow"),this.mode==="stay")this.target.copy(this.hold).setY(this.hold.y+Math.sin(a*.7)*.05);else if(this.mode==="come"){const M=h(0,r.minDistance+.08),S=i.firstFree([M],u);S&&this.target.set(S.x,e.y-.35,S.z)}else if(this.mode==="circle"){const M=this.circleFrom+this.modeT/7*Math.PI*2,S={x:e.x+Math.sin(M)*1.25,z:e.z+Math.cos(M)*1.25};i.crosses(u,S)||this.target.set(S.x,e.y-.3+Math.sin(M*2)*.15,S.z)}const p=new A().subVectors(this.target,this.position).multiplyScalar(2.2);p.length()>r.maxSpeed&&p.setLength(r.maxSpeed),this.velocity.lerp(p,Math.min(1,t*3));const x=this.position.clone().addScaledVector(this.velocity,t),g=i.step({x:this.position.x,z:this.position.z},{x:x.x,z:x.z});x.x=g.x,x.z=g.z;const m=new A().subVectors(x,e);m.length()<r.minDistance&&(m.lengthSq()<1e-6&&m.copy(this.heading),x.copy(e).addScaledVector(m.normalize(),r.minDistance)),this.speed=x.distanceTo(this.position)/t,this.position.copy(x),this.yaw=Math.atan2(e.x-this.position.x,e.z-this.position.z)}}const Ai=1024,xa=384,va=210,qo=120;class QS{mesh;canvas=document.createElement("canvas");ctx;texture;buttons=[];status="";info="";hovered=null;constructor(){this.canvas.width=Ai,this.canvas.height=xa;const t=this.canvas.getContext("2d");if(!t)throw new Error("2D canvas unavailable");this.ctx=t,this.texture=new bs(this.canvas),this.texture.colorSpace=ye;const e=new Ue({map:this.texture,transparent:!0});this.mesh=new te(new Oi(.6,.225),e),this.mesh.name="xr-panel",this.draw()}setButtons(t){this.buttons=t,this.draw()}setStatus(t){t!==this.status&&(this.status=t,this.draw())}setInfo(t){t!==this.info&&(this.info=t,this.draw())}setHovered(t){t!==this.hovered&&(this.hovered=t,this.draw())}buttonAt(t){const e=t.x*Ai,n=(1-t.y)*xa;return n<va||n>va+qo?null:this.buttonRects().find(r=>e>=r.x&&e<=r.x+r.w)?.id??null}buttonRects(){const t=Math.max(this.buttons.length,1),e=24,n=(Ai-e*(t+1))/t;return(Hl()?[...this.buttons].reverse():this.buttons).map((r,a)=>({id:r.id,label:r.label,x:e+a*(n+e),w:n}))}draw(){const t=this.ctx;t.clearRect(0,0,Ai,xa),t.fillStyle="rgba(28, 20, 14, 0.86)",Wu(t,0,0,Ai,xa,36),t.fill(),t.direction=Hl()?"rtl":"ltr",t.textAlign="center",t.textBaseline="middle",t.fillStyle="#f3e6cc",t.font='600 46px system-ui, "Noto Sans Arabic", sans-serif',t.fillText(this.status,Ai/2,70),t.fillStyle="#c9b48f",t.font='34px system-ui, "Noto Sans Arabic", sans-serif',t.fillText(this.info,Ai/2,145);for(const e of this.buttonRects())t.fillStyle=e.id===this.hovered?"#c9a35a":"#6e4a2c",Wu(t,e.x,va,e.w,qo,24),t.fill(),t.fillStyle=e.id===this.hovered?"#1c140e":"#f3e6cc",t.font='600 38px system-ui, "Noto Sans Arabic", sans-serif',t.fillText(e.label,e.x+e.w/2,va+qo/2,e.w-20);this.texture.needsUpdate=!0}dispose(){this.texture.dispose(),this.mesh.material.dispose(),this.mesh.geometry.dispose()}}function Wu(s,t,e,n,i,r){s.beginPath(),s.moveTo(t+r,e),s.arcTo(t+n,e,t+n,e+i,r),s.arcTo(t+n,e+i,t,e+i,r),s.arcTo(t,e+i,t,e,r),s.arcTo(t,e,t+n,e,r),s.closePath()}const Xu=1.5,tb=4;class Yu{constructor(t,e,n){this.app=t,this.caps=e,this.callbacks=n,this.reticle=new te(new Ga(.12,.16,32).rotateX(-Math.PI/2),new Ue({color:"#f3d58a"})),this.reticle.matrixAutoUpdate=!1,this.reticle.visible=!1,t.scene.add(this.reticle),this.panel.mesh.scale.setScalar(.7),this.panel.mesh.visible=!1,t.scene.add(this.panel.mesh),this.setupControllers();const i=this.room;this.shots=new HS({get floorY(){return i.geometry.floorY},crosses:(r,a)=>this.room.known&&this.room.crosses(r,a),popAt:(r,a)=>this.balloons.group.visible?this.balloons.hit(r,a):null,target:()=>{const r=this.app.character?.object;return!r||!r.visible?null:r.getWorldPosition(new A).add(new A(0,this.callbacks.motion()==="fly"?.28:.8,0))}},{sound:r=>this.sfx?.play(r),hitCharacter:()=>this.app.behavior.dispatch({type:"react"},performance.now())}),t.scene.add(this.shots.group),this.balloons.group.visible=!1,t.scene.add(this.balloons.group),this.shotLabel=new jp(new xd({transparent:!0,depthTest:!1})),this.shotLabel.scale.set(.16,.05,1),this.shotLabel.visible=!1,this.shotLabel.renderOrder=10,t.scene.add(this.shotLabel),n.conversation.addView({status:r=>{this.voiceStatus=r,r.kind==="connecting"&&(this.caption=""),this.refreshPanel(),r.kind==="error"&&this.setMenu(!0)},transcript:r=>{r.role==="character"&&(this.caption=r.text)},speakingChanged:()=>this.refreshPanel()}),t.onFrame((r,a,o)=>this.onFrame(r,o))}app;caps;callbacks;session=null;kind=null;panel=new QS;reticle;raycaster=new R0;controllers=[];tmpMatrix=new Dt;hitTestSource=null;placing=!1;placingSince=0;needsInitialPlacement=!1;companionPending=!1;reticleValid=!1;pads=new Map;sourceController=new Map;shots;fx=null;balloons=new WS;shotKind="bubble";shotLabel;shotLabelUntil=0;sfx=null;frames=0;fpsWindowStart=0;fps=0;hint="";elapsed=0;voiceStatus={kind:"idle"};companionOn=!1;talkHintAt=-1;referenceSpace="local-floor";companion=new ZS;flyer=new jS;motion="walk";room=new Ir(.25);roomRefreshAt=0;roomOutline=null;roomOutlineUntil=0;roomCaptureUsed=!1;caption="";static async capabilities(){const t=navigator.xr;if(!t||!window.isSecureContext)return{vr:!1,ar:!1};const[e,n]=await Promise.all([t.isSessionSupported("immersive-vr").catch(()=>!1),t.isSessionSupported("immersive-ar").catch(()=>!1)]);return{vr:e,ar:n}}get active(){return this.session!==null}command(t){if(!this.session)return null;const e=this.app.mode==="mr",n=this.app.renderer.xr.getCamera(),i=new A().setFromMatrixPosition(n.matrixWorld),r=new A(0,0,-1).applyQuaternion(n.getWorldQuaternion(new he));switch(t.name){case"move":return e?(this.companionOn||this.setCompanion(!0),this.motion==="fly"?this.flyer.command(t.value,i):(t.value!=="stay"&&this.app.setPosture("standing"),this.companion.command(t.value,i,r)),{ok:!0}):{ok:!1,note:"In the majlis we sit together. Walking around the room works in mixed reality (the X button)."};case"pose":return e?this.motion==="fly"?{ok:!1,note:"In the room she flies; she can sit down in the majlis (virtual reality)."}:(this.companionOn||this.setCompanion(!0),t.value==="sit"?(this.companion.command("stay",i,r),this.app.setPosture("seated"),{ok:!0,note:"sitting here and waiting until asked to walk along"}):(this.app.setPosture("standing"),{ok:!0})):null;case"celebration":return this.fx={kind:t.value,until:this.elapsed+1.6},{ok:!0};case"change_place":return e?{ok:!1,note:"In mixed reality we are in the real room. The places are in virtual reality (the X button)."}:null;default:return null}}async start(t){if(this.session)return this.setMode(t);const e=navigator.xr;if(!e)throw new Error("WebXR unavailable");this.sfx??=new JS;let n;if(this.caps.ar)n=await e.requestSession("immersive-ar",{requiredFeatures:[],optionalFeatures:["unbounded","local-floor","hit-test","hand-tracking","plane-detection","anchors"]}),this.kind="ar";else if(t==="vr"&&this.caps.vr)n=await e.requestSession("immersive-vr",{requiredFeatures:["local-floor"],optionalFeatures:["hand-tracking"]}),this.kind="vr";else throw new Error(Mt("xr.mrUnavailable"));if(this.session=n,n.addEventListener("end",()=>this.onSessionEnd()),this.app.renderer.xr.setReferenceSpaceType(this.referenceSpaceFor(n)),await this.app.renderer.xr.setSession(n),this.preferFrameRate(n,72),this.kind==="ar")try{const i=await n.requestReferenceSpace("viewer");this.hitTestSource=await n.requestHitTestSource?.({space:i})??null}catch{this.hitTestSource=null}this.needsInitialPlacement=!0,this.panel.mesh.visible=!1,this.applyMode(t)}async setMode(t){if(!this.session)return this.start(t);if(t==="mr"&&this.kind!=="ar")throw new Error(Mt("xr.mrUnavailable"));this.applyMode(t)}end(){this.session?.end()}applyMode(t){t==="mr"?this.companionPending=!0:this.setCompanion(!1),this.app.setViewMode(t),this.setPlacing(!1),this.refreshPanel()}setPlacing(t){this.placing=t,this.placingSince=this.elapsed,this.reticle.visible=!1,this.hint=t?Mt("xr.placeHint"):""}refreshPanel(){const t=[];this.kind==="ar"&&t.push(this.app.mode==="vr"?{id:"mode",label:Mt("btn.switchToMR")}:{id:"mode",label:Mt("btn.switchToVR")}),this.app.mode==="vr"&&t.push({id:"env",label:Mt(`env.${this.app.environments.current}`)}),this.app.mode==="mr"&&!this.companionOn&&t.push({id:"place",label:Mt("btn.place")}),this.app.mode==="mr"&&t.push({id:"walk",label:this.companionOn?Mt("companion.stop"):Mt("companion.start")}),this.app.mode==="mr"&&!this.room.known&&this.session?.initiateRoomCapture&&!this.roomCaptureUsed&&t.push({id:"scan",label:Mt("btn.scan")});const e=this.callbacks.conversation;e.configured&&(e.active&&e.isSpeaking?t.push({id:"cut",label:Mt("talk.cut")}):t.push({id:"talk",label:e.active?Mt("talk.stop"):Mt("talk.start")})),t.push({id:"exit",label:Mt("btn.exit")}),this.panel.setButtons(t),this.panel.setStatus(e.configured&&this.voiceStatus.kind!=="idle"?uf(this.voiceStatus):Mt("app.title"))}activate(t){if(t==="mode")this.setMode(this.app.mode==="vr"?"mr":"vr");else if(t==="place")this.setPlacing(!0);else if(t==="walk")this.setCompanion(!this.companionOn);else if(t==="scan")this.roomCaptureUsed=!0,this.session?.initiateRoomCapture?.().catch(()=>{}),this.refreshPanel();else if(t==="env"){const e=or[(or.indexOf(this.app.environments.current)+1)%or.length];this.hint=Mt("env.loading"),this.callbacks.setEnvironment(e).finally(()=>{this.hint="",this.refreshPanel()}),this.refreshPanel()}else t==="talk"?(this.callbacks.conversation.toggle(),this.refreshPanel()):t==="cut"?this.callbacks.conversation.interrupt():t==="exit"&&this.end()}setupControllers(){const t=new Qt().setFromPoints([new A(0,0,0),new A(0,0,-1)]),e=new vr({color:"#f3e6cc",transparent:!0,opacity:.6});for(let n=0;n<2;n++){const i=this.app.renderer.xr.getController(n),r=new Cr(t,e);r.scale.z=2,i.add(r),i.addEventListener("connected",a=>this.sourceController.set(a.data,i)),i.addEventListener("squeezestart",()=>{this.session&&(this.activate(this.callbacks.conversation.active&&this.callbacks.conversation.isSpeaking?"cut":"talk"),this.sfx?.play("click"))}),i.addEventListener("select",a=>{a.data?.gamepad||this.onSelect(i)}),this.app.scene.add(i),this.controllers.push(i)}}panelHit(t){if(!this.panel.mesh.visible)return null;this.tmpMatrix.identity().extractRotation(t.matrixWorld),this.raycaster.ray.origin.setFromMatrixPosition(t.matrixWorld),this.raycaster.ray.direction.set(0,0,-1).applyMatrix4(this.tmpMatrix);const e=this.raycaster.intersectObject(this.panel.mesh,!1)[0];return e?.uv?this.panel.buttonAt(e.uv):null}onSelect(t){const e=this.panelHit(t);if(e){this.activate(e);return}if(this.placing&&this.reticleValid){const n=new A().setFromMatrixPosition(this.reticle.matrix);this.placeStageAt(n),this.setPlacing(!1);return}this.fireFrom(t,t)}fireFrom(t,e,n){this.tmpMatrix.identity().extractRotation(t.matrixWorld);const i=new A().setFromMatrixPosition(t.matrixWorld),r=new A(0,0,-1).applyMatrix4(this.tmpMatrix).normalize();this.shots.fire(this.shotKind,i,r,e)&&n?.gamepad?.hapticActuators?.[0]?.pulse?.(this.shotKind==="bubble"||this.shotKind==="water"?.12:.35,22)?.catch(()=>{})}cycleShot(t){this.shotKind=Wo[(Wo.indexOf(this.shotKind)+1)%Wo.length],this.sfx?.play("click");const e=t?new A().setFromMatrixPosition(t.matrixWorld).add(new A(0,.12,0)):null;this.showLabel(Mt(`shot.${this.shotKind}`),e,1.5)}showLabel(t,e,n){const i=document.createElement("canvas"),r=i.getContext("2d"),a='600 56px system-ui, "Noto Sans Arabic", sans-serif';r.font=a,i.width=Math.max(384,Math.ceil(r.measureText(t).width)+80),i.height=120,r.translate(0,120),r.scale(1,-1),r.fillStyle="rgba(28,20,14,0.85)",r.beginPath(),r.roundRect(0,0,i.width,120,40),r.fill(),r.fillStyle="#ffe9b0",r.font=a,r.textAlign="center",r.textBaseline="middle",r.direction="rtl",r.fillText(t,i.width/2,64);const o=this.shotLabel.material;o.map?.dispose(),o.map=new bs(i),o.map.flipY=!1,o.map.colorSpace=ye,o.needsUpdate=!0,this.shotLabel.scale.set(.05*(i.width/120),.05,1),e&&this.shotLabel.position.copy(e),this.shotLabel.visible=!0,this.shotLabelUntil=this.elapsed+n}hintTalk(){const t=this.callbacks.conversation,e=this.app.character?.object;if(!t.configured||t.active||!e)return;const n=e.getWorldPosition(new A).add(new A(0,this.motion==="fly"?.55:1.25,0));this.showLabel(Mt("xr.talkHint"),n,6)}onFrame(t,e){if(!this.session||!e)return;this.elapsed+=t;const n=this.app.renderer.xr.getCamera();if(this.needsInitialPlacement&&(this.needsInitialPlacement=!1,this.placeInFrontOf(n)),this.companionPending&&(this.companionPending=!1,this.app.mode==="mr"&&this.setCompanion(!0)),this.reticleValid=!1,this.placing&&this.hitTestSource){const o=this.app.renderer.xr.getReferenceSpace(),l=o?e.getHitTestResults(this.hitTestSource)[0]:void 0,c=l&&o?l.getPose(o):void 0;c&&(this.reticle.matrix.fromArray(c.transform.matrix),this.reticleValid=!0)}if(this.reticle.visible=this.reticleValid,this.placing&&!this.reticleValid&&this.elapsed-this.placingSince>tb&&(this.placeInFrontOf(n),this.setPlacing(!1),this.hint=Mt("xr.placedManual")),this.kind==="ar"&&this.elapsed>=this.roomRefreshAt&&(this.roomRefreshAt=this.elapsed+1,this.refreshRoom(e)),this.roomOutline&&(this.roomOutline.visible=this.app.mode==="mr"&&(this.placing||this.elapsed<this.roomOutlineUntil)),this.companionOn){const o=new A().setFromMatrixPosition(n.matrixWorld);if(this.callbacks.motion()!==this.motion&&this.startMotion(o,n),this.motion==="fly"){const l=new A(0,0,-1).applyQuaternion(n.getWorldQuaternion(new he)),c=this.room.forFlight(this.flyer.position.y-this.room.geometry.floorY-.1);this.flyer.update(t,o,l,c),this.app.stage.position.copy(this.flyer.position),this.app.stage.rotation.set(0,this.flyer.yaw,0),this.app.character?.setLocomotion(this.flyer.speed)}else this.companion.update(t,o,this.room.forWalking()),this.companion.hopped&&this.sfx?.play("pop"),this.app.stage.position.copy(this.companion.position).setY(this.room.geometry.floorY),this.app.stage.rotation.set(0,this.companion.yaw,0),this.app.character?.setLocomotion(this.companion.speed)}let i=null;for(const o of this.controllers)i??=this.panelHit(o);this.panel.setHovered(i);for(const o of this.session.inputSources){const l=o.gamepad;if(!l)continue;const c=this.sourceController.get(o),h={trigger:!!l.buttons[0]?.pressed,stick:!!l.buttons[3]?.pressed,a:!!l.buttons[4]?.pressed,b:!!l.buttons[5]?.pressed},u=this.pads.get(o)??{trigger:!1,stick:!1,a:!1,b:!1,consumed:!1};let f=u.consumed;if(h.trigger&&!u.trigger){const d=c?this.panelHit(c):null;f=!1,d?(this.activate(d),f=!0):this.placing&&this.reticleValid&&(this.placeStageAt(new A().setFromMatrixPosition(this.reticle.matrix)),this.setPlacing(!1),f=!0)}h.trigger&&!f&&c&&this.fireFrom(c,o,o),h.stick&&!u.stick&&this.setMenu(!this.panel.mesh.visible),h.a&&!u.a&&(o.handedness==="left"?this.kind==="ar"&&this.activate("mode"):this.cycleShot(c)),h.b&&!u.b&&this.callbacks.conversation.interrupt(),this.pads.set(o,{...h,consumed:h.trigger&&f})}const r=this.companionOn&&this.motion==="fly"&&this.app.character?.object.visible;if(this.balloons.group.visible=!!r,r){const o=new A().setFromMatrixPosition(n.matrixWorld);this.balloons.update(t,this.app.character.object.getWorldPosition(new A).add(new A(0,.2,0)),o)}if(this.fx)if(this.elapsed>this.fx.until)this.fx=null;else{const o=this.app.character?.object,l=this.companionOn?this.motion==="fly"?.65:1.75:1.3;if(o){const c=o.getWorldPosition(new A).add(new A(0,l,0)),h=new A((Math.random()-.5)*.9,1,(Math.random()-.5)*.9).normalize();this.shots.fire(this.fx.kind,c,h,"character")}}this.shots.update(t),this.talkHintAt>0&&this.elapsed>=this.talkHintAt&&(this.talkHintAt=-1,this.hintTalk()),this.shotLabel.visible&&this.elapsed>this.shotLabelUntil&&(this.shotLabel.visible=!1),this.frames++,this.elapsed-this.fpsWindowStart>=1&&(this.fps=Math.round(this.frames/(this.elapsed-this.fpsWindowStart)),this.frames=0,this.fpsWindowStart=this.elapsed);const a=this.caption.length>70?`…${this.caption.slice(-70)}`:this.caption;this.panel.setInfo([this.hint||a,`${this.fps} fps`].filter(Boolean).join(" · "))}setMenu(t){if(this.panel.mesh.visible=t&&this.session!==null,!this.panel.mesh.visible)return;const e=this.app.renderer.xr.getCamera(),n=new A().setFromMatrixPosition(e.matrixWorld),i=new A(0,0,-1).applyQuaternion(e.getWorldQuaternion(new he));i.y=0,i.lengthSq()<1e-6&&i.set(0,0,-1),i.normalize(),this.panel.mesh.position.copy(n).addScaledVector(i,.55).add(new A(0,-.18,0)),this.panel.mesh.lookAt(n),this.refreshPanel()}startMotion(t,e){this.motion=this.callbacks.motion();const n=new A(0,0,-1).applyQuaternion(e.getWorldQuaternion(new he));if(this.motion==="fly"){this.app.setPosture("flying");const i=this.app.stage.position.clone();i.y=Math.max(i.y,t.y-.55),this.flyer.reset(i,n)}else this.app.setPosture("standing"),this.app.stage.position.y=this.room.geometry.floorY,this.companion.reset(this.app.stage.position,this.app.stage.rotation.y,t,n)}setCompanion(t){if(t===this.companionOn)return;this.companionOn=t;const e=this.app.character,n=this.app.renderer.xr.getCamera(),i=new A().setFromMatrixPosition(n.matrixWorld);t?(this.setPlacing(!1),this.hint=this.room.known?this.roomStatus():Mt("room.none"),this.roomOutlineUntil=this.elapsed+6,this.app.majlis.core.visible=!1,this.startMotion(i,n),this.talkHintAt=this.elapsed+1.5):(this.hint="",e?.setLocomotion(0),this.app.setPosture("seated"),this.app.majlis.core.visible=!0,this.app.stage.position.y=this.room.geometry.floorY,this.placeStageAt(this.app.stage.position.clone().setY(this.room.geometry.floorY),i)),this.refreshPanel()}placeInFrontOf(t){const e=new A().setFromMatrixPosition(t.matrixWorld),n=new A(0,0,-1).applyQuaternion(t.getWorldQuaternion(new he));n.y=0,n.lengthSq()<1e-4&&n.set(0,0,-1),n.normalize();const i=(o,l=0)=>({x:e.x+n.x*o-n.z*l,z:e.z+n.z*o+n.x*l}),r={x:e.x,z:e.z},a=this.room.firstFree([i(Xu),i(1.2),i(1,.6),i(1,-.6),i(.9)],r)??i(Xu);this.placeStageAt(new A(a.x,this.room.geometry.floorY,a.z),e)}roomStatus(){const t=this.room.geometry;return Mt("room.status",{walls:String(t.walls.length),items:String(t.obstacles.length)})}refreshRoom(t){const e=this.app.renderer.xr.getReferenceSpace(),n=t.detectedPlanes;if(!e||!n||n.size===0)return;const i=[];n.forEach(a=>{const o=t.getPose(a.planeSpace,e);o&&i.push({plane:a,matrix:o.transform.matrix})});const r=this.room.known;this.room.geometry=qS(i),this.updateRoomOutline(this.room.geometry),!r&&this.room.known&&this.refreshPanel()}updateRoomOutline(t){const e=[],n=t.floorY+.02,i=(r,a)=>r.forEach((o,l)=>{const c=r[(l+1)%r.length];e.push(o.x,a,o.z,c.x,a,c.z)});t.walls.forEach(r=>e.push(r.a.x,n,r.a.z,r.b.x,n,r.b.z,r.a.x,n+1,r.a.z,r.b.x,n+1,r.b.z)),t.obstacles.forEach(r=>i(r,n)),t.floor&&i(t.floor,n),this.roomOutline||(this.roomOutline=new Sd(new Qt,new vr({color:"#f3d58a",transparent:!0,opacity:.7})),this.roomOutline.visible=!1,this.app.scene.add(this.roomOutline)),this.roomOutline.geometry.dispose(),this.roomOutline.geometry=new Qt().setAttribute("position",new Ht(e,3))}placeStageAt(t,e){const n=e??new A().setFromMatrixPosition(this.app.renderer.xr.getCamera().matrixWorld);this.app.stage.position.copy(t),this.app.stage.rotation.set(0,Math.atan2(n.x-t.x,n.z-t.z),0)}referenceSpaceFor(t){const e=t.enabledFeatures;return this.referenceSpace=e?.includes("unbounded")?"unbounded":"local-floor",this.referenceSpace}preferFrameRate(t,e){const n=t.supportedFrameRates;n&&Array.from(n).includes(e)&&t.updateTargetFrameRate?.(e).catch(()=>{})}onSessionEnd(){this.companionPending=!1,this.shots.clear(),this.balloons.group.visible=!1,this.pads.clear(),this.setCompanion(!1),this.room.geometry=mf,this.roomCaptureUsed=!1,this.roomOutline&&(this.roomOutline.visible=!1),this.session=null,this.kind=null,this.hitTestSource=null,this.placing=!1,this.reticle.visible=!1,this.panel.mesh.visible=!1,this.app.stage.position.set(0,0,0),this.app.stage.rotation.set(0,0,0),this.app.setViewMode("vr"),this.callbacks.onSessionEnd()}}const eb={idle:[],listening:[{type:"userStartedSpeaking"}],thinking:[{type:"userStartedSpeaking"},{type:"userStoppedSpeaking"}],speaking:[{type:"responseStarted",story:!1}],storytelling:[{type:"responseStarted",story:!0}],reacting:[{type:"react"}],interrupted:[{type:"responseStarted",story:!0},{type:"userStartedSpeaking"}]},_f="salef.environment";function nb(){try{const s=localStorage.getItem(_f);if(s&&or.includes(s))return s}catch{}return"majlis"}async function ib(){const s=document.getElementById("stage"),t=document.getElementById("ui");if(!s||!t)throw new Error("Missing #stage or #ui");const e=new BS(s),n=new URLSearchParams(location.search),i=d=>{try{localStorage.setItem(_f,d)}catch{}return e.environments.show(d)};e.environments.show(nb());const r=new oS(e,"https://salef-al-awaleen.3wasf-njd2.workers.dev");let a=0;const o=async d=>{const p=++a,x=await on[d].load();p===a?e.setCharacter(x):x.dispose()},l=n.get("character");l==="procedural"?e.setCharacter(new of):(lf(l)&&(r.character=l),o(r.character));const c=await Yu.capabilities(),h=new Yu(e,c,{onSessionEnd:()=>document.body.classList.remove("in-xr"),setEnvironment:i,conversation:r,motion:()=>on[r.character].motion});r.setCommandHandler(new Ef(e,h,i).run);const u=new zS(t,c,{enterXR:d=>{h.start(d).then(()=>document.body.classList.add("in-xr")).catch(p=>u.showError(Mt("xr.sessionError",{error:String(p?.message??p)})))},setEnvironment:d=>{i(d)},currentEnvironment:()=>e.environments.current,voice:{configured:r.configured,active:()=>r.active,toggle:()=>r.toggle(),interrupt:()=>r.interrupt(),getCode:()=>r.accessCode,setCode:d=>r.accessCode=d,getMode:()=>r.interruptMode,setMode:d=>r.interruptMode=d,getVoice:()=>r.voice,setVoice:d=>r.voice=d,getTone:()=>r.toneOn,setTone:d=>r.toneOn=d},getCharacter:()=>r.character,setCharacter:d=>{r.character=d,o(d)},previewState:d=>{const p=performance.now();e.behavior.dispatch({type:"reset"},p);for(const x of eb[d])e.behavior.dispatch(x,p)}});r.addView(u),n.has("debug")&&Object.assign(window,{__salef:e,__conversation:r,__xr:h});const f=r.configured&&!r.accessCode;n.get("app")==="quest"&&(c.ar||c.vr)&&!f&&h.start(n.get("mode")==="mr"?"mr":"vr").then(()=>document.body.classList.add("in-xr")).catch(()=>{})}ib().catch(s=>{console.error(s),document.body.textContent=String(s)});
//# sourceMappingURL=index-18O-FF2B.js.map
