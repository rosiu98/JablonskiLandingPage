(() => {
  "use strict";

  const cards = [...document.querySelectorAll("[data-price-id]")];
  if (!cards.length) return;

  // PapaParse, preserved from the existing pricing page's bundled parser.
  var Oe=Object.create;var{getPrototypeOf:Te,defineProperty:ke,getOwnPropertyNames:Ie}=Object;var we=Object.prototype.hasOwnProperty;function Ae(c){return this[c]}var Le,De,Fe=(c,p,O)=>{var v=c!=null&&typeof c==="object";if(v){var z=p?Le??=new WeakMap:De??=new WeakMap,U=z.get(c);if(U)return U}O=c!=null?Oe(Te(c)):{};let i=p||!c||!c.__esModule||!we.call(c,"default")?ke(O,"default",{value:c,enumerable:!0}):O;if(c&&typeof c==="object"||typeof c==="function"){for(let Y of Ie(c))if(!we.call(i,Y))ke(i,Y,{get:Ae.bind(c,Y),enumerable:!0})}if(v)z.set(c,i);return i};var ze=(c,p)=>()=>(p||c((p={exports:{}}).exports,p),p.exports);var Ee=ze(function(ce,fe){((c,p)=>{typeof define=="function"&&define.amd?define([],p):typeof fe=="object"&&typeof ce<"u"?fe.exports=p():c.Papa=p()})(ce,function c(){var p=typeof self<"u"?self:typeof window<"u"?window:p!==void 0?p:{},O=!p.document&&!!p.postMessage,v=p.IS_PAPA_WORKER||!1,z={},U=0,i={};function Y(t){return t.charCodeAt(0)===65279?t.slice(1):t}function X(t){this._handle=null,this._finished=!1,this._completed=!1,this._halted=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},function(e){var r=de(e);r.chunkSize=parseInt(r.chunkSize),e.step||e.chunk||(r.chunkSize=null),this._handle=new pe(r),(this._handle.streamer=this)._config=r}.call(this,t),this.parseChunk=function(e,r){var a=parseInt(this._config.skipFirstNLines)||0;if(this.isFirstChunk&&0<a){let _=this._config.newline;_||(n=this._config.quoteChar||'"',_=this._handle.guessLineEndings(e,n)),e=[...e.split(_).slice(a)].join(_)}this.isFirstChunk&&x(this._config.beforeFirstChunk)&&(n=this._config.beforeFirstChunk(e))!==void 0&&(e=n),this.isFirstChunk=!1,this._halted=!1;var a=this._partialLine+e,n=(this._partialLine="",this._handle.parse(a,this._baseIndex,!this._finished));if(!this._handle.paused()&&!this._handle.aborted()){if(e=n.meta.cursor,a=(this._finished||(this._partialLine=a.substring(e-this._baseIndex),this._baseIndex=e),n&&n.data&&(this._rowCount+=n.data.length),this._finished||this._config.preview&&this._rowCount>=this._config.preview),v)p.postMessage({results:n,workerId:i.WORKER_ID,finished:a});else if(x(this._config.chunk)&&!r){if(this._config.chunk(n,this._handle),this._handle.paused()||this._handle.aborted())return void(this._halted=!0);this._completeResults=n=void 0}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(n.data),this._completeResults.errors=this._completeResults.errors.concat(n.errors),this._completeResults.meta=n.meta),this._completed||!a||!x(this._config.complete)||n&&n.meta.aborted||(this._config.complete(this._completeResults,this._input),this._completed=!0),a||n&&n.meta.paused||this._nextChunk(),n}this._halted=!0},this._sendError=function(e){x(this._config.error)?this._config.error(e):v&&this._config.error&&p.postMessage({workerId:i.WORKER_ID,error:e,finished:!1})}}function ie(t){var e;(t=t||{}).chunkSize||(t.chunkSize=i.RemoteChunkSize),X.call(this,t),this._nextChunk=O?function(){this._readChunk(),this._chunkLoaded()}:function(){this._readChunk()},this.stream=function(r){this._input=r,this._nextChunk()},this._readChunk=function(){if(this._finished)this._chunkLoaded();else{if(e=new XMLHttpRequest,this._config.withCredentials&&(e.withCredentials=this._config.withCredentials),O||(e.onload=Z(this._chunkLoaded,this),e.onerror=Z(this._chunkError,this)),e.ontimeout=Z(this._chunkTimeout,this),e.open(this._config.downloadRequestBody?"POST":"GET",this._input,!O),this._config.downloadTimeout&&!O&&(e.timeout=this._config.downloadTimeout),this._config.downloadRequestHeaders){var r,a=this._config.downloadRequestHeaders;for(r in a)e.setRequestHeader(r,a[r])}var n;this._config.chunkSize&&(n=this._start+this._config.chunkSize-1,e.setRequestHeader("Range","bytes="+this._start+"-"+n));try{e.send(this._config.downloadRequestBody)}catch(_){this._chunkError(_.message)}O&&e.status===0&&this._chunkError()}},this._chunkLoaded=function(){e.readyState===4&&(e.status<200||400<=e.status?this._chunkError():(this._start+=this._config.chunkSize||e.responseText.length,this._finished=!this._config.chunkSize||this._start>=((r)=>(r=r.getResponseHeader("Content-Range"))!==null?parseInt(r.substring(r.lastIndexOf("/")+1)):-1)(e),this.parseChunk(e.responseText)))},this._chunkError=function(r){r=e.statusText||r,this._sendError(Error(r))},this._chunkTimeout=function(){this._chunkError("Request timed out after "+this._config.downloadTimeout+"ms")}}function se(t){(t=t||{}).chunkSize||(t.chunkSize=i.LocalChunkSize),X.call(this,t);var e,r,a=typeof FileReader<"u";this.stream=function(n){this._input=n,r=n.slice||n.webkitSlice||n.mozSlice,a?((e=new FileReader).onload=Z(this._chunkLoaded,this),e.onerror=Z(this._chunkError,this)):e=new FileReaderSync,this._nextChunk()},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk()},this._readChunk=function(){var n=this._input,_=(this._config.chunkSize&&(_=Math.min(this._start+this._config.chunkSize,this._input.size),n=r.call(n,this._start,_)),e.readAsText(n,this._config.encoding));a||this._chunkLoaded({target:{result:_}})},this._chunkLoaded=function(n){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(n.target.result)},this._chunkError=function(){this._sendError(e.error)}}function ee(t){var e;X.call(this,t=t||{}),this.stream=function(r){return e=r,this._nextChunk()},this._nextChunk=function(){var r,a;if(!this._finished)return r=this._config.chunkSize,e=r?(a=e.substring(0,r),e.substring(r)):(a=e,""),this._finished=!e,this.parseChunk(a)}}function ae(t){X.call(this,t=t||{});var e=[],r=!0,a=!1;this.pause=function(){X.prototype.pause.apply(this,arguments),this._input.pause()},this.resume=function(){X.prototype.resume.apply(this,arguments),this._input.resume()},this.stream=function(n){this._input=n,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError)},this._checkIsFinished=function(){a&&e.length===1&&(this._finished=!0)},this._nextChunk=function(){this._checkIsFinished(),e.length?this.parseChunk(e.shift()):r=!0},this._streamData=Z(function(n){try{e.push(typeof n=="string"?n:n.toString(this._config.encoding)),r&&(r=!1,this._checkIsFinished(),this.parseChunk(e.shift()))}catch(_){this._streamError(_)}},this),this._streamError=Z(function(n){this._streamCleanUp(),this._sendError(n)},this),this._streamEnd=Z(function(){this._streamCleanUp(),a=!0,this._streamData("")},this),this._streamCleanUp=Z(function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError)},this)}function pe(t){var e,r,a,n,_=Math.pow(2,53),F=-_,B=/^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/,J=/^((\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)))$/,b=this,j=0,o=0,P=!1,u=!1,l=[],s={data:[],errors:[],meta:{}};function M(g){return t.skipEmptyLines==="greedy"?g.join("").trim()==="":g.length===1&&g[0].length===0}function k(){if(s&&a&&(N("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+i.DefaultDelimiter+"'"),a=!1),t.skipEmptyLines&&(s.data=s.data.filter(function(w){return!M(w)})),C()){let w=function(L){l.push(L)};var h=w;if(s)if(Array.isArray(s.data[0])){for(var g=0;C()&&g<s.data.length;g++)s.data[g].forEach(w);s.data.splice(0,1)}else s.data.forEach(w)}function f(w,L){for(var S=t.header?{}:[],y=0;y<w.length;y++){var d=y,D=w[y],D=((m,E)=>((T)=>(t.dynamicTypingFunction&&t.dynamicTyping[T]===void 0&&(t.dynamicTyping[T]=t.dynamicTypingFunction(T)),(t.dynamicTyping[T]||t.dynamicTyping)===!0))(m)?E==="true"||E==="TRUE"||E!=="false"&&E!=="FALSE"&&(((T)=>{if(B.test(T)){if(T=parseFloat(T),F<T&&T<_)return 1}})(E)?parseFloat(E):J.test(E)?new Date(E):E===""?null:E):E)(d=t.header?y>=l.length?"__parsed_extra":l[y]:d,D=t.transform?t.transform(D,d):D);d==="__parsed_extra"?(S[d]=S[d]||[],S[d].push(D)):S[d]=D}return t.header&&(y>l.length?N("FieldMismatch","TooManyFields","Too many fields: expected "+l.length+" fields but parsed "+y,o+L):y<l.length&&N("FieldMismatch","TooFewFields","Too few fields: expected "+l.length+" fields but parsed "+y,o+L)),S}var R;s&&(t.header||t.dynamicTyping||t.transform)&&(R=1,!s.data.length||Array.isArray(s.data[0])?(s.data=s.data.map(f),R=s.data.length):s.data=f(s.data,0),t.header&&s.meta&&(s.meta.fields=l),o+=R)}function C(){return t.header&&l.length===0}function N(g,f,R,h){g={type:g,code:f,message:R},h!==void 0&&(g.row=h),s.errors.push(g)}x(t.step)&&(n=t.step,t.step=function(g){s=g,C()?k():(k(),s.data.length!==0&&(j+=g.data.length,t.preview&&j>t.preview?r.abort():(s.data=s.data[0],n(s,b))))}),this.parse=function(g,f,R){var h=t.quoteChar||'"',h=(t.newline||(t.newline=this.guessLineEndings(g,h)),a=!1,t.delimiter?x(t.delimiter)&&(t.delimiter=t.delimiter(g),s.meta.delimiter=t.delimiter):((h=((w,L,S,y,d)=>{var D,m,E,T;d=d||[",","\t","|",";",i.RECORD_SEP,i.UNIT_SEP];for(var G=0;G<d.length;G++){for(var K,re=d[G],A=0,W=0,I=0,q=(E=void 0,new he({comments:y,delimiter:re,newline:L,preview:10}).parse(w)),Q=0;Q<q.data.length;Q++)S&&M(q.data[Q])?I++:(K=q.data[Q].length,W+=K,E===void 0?E=K:0<K&&(A+=Math.abs(K-E),E=K));0<q.data.length&&(W/=q.data.length-I),1.99<W&&(m===void 0||A<m||A===m&&T<W)&&(m=A,D=re,T=W)}return{successful:!!(t.delimiter=D),bestDelimiter:D}})(g,t.newline,t.skipEmptyLines,t.comments,t.delimitersToGuess)).successful?t.delimiter=h.bestDelimiter:(a=!0,t.delimiter=i.DefaultDelimiter),s.meta.delimiter=t.delimiter),de(t));return h.header=C(),t.preview&&t.header&&h.preview++,e=g,r=new he(h),s=r.parse(e,f,R),k(),P?{meta:{paused:!0}}:s||{meta:{paused:!1}}},this.paused=function(){return P},this.pause=function(){P=!0,r.abort(),e=x(t.chunk)?"":e.substring(r.getCharIndex())},this.resume=function(){b.streamer._halted?(P=!1,b.streamer.parseChunk(e,!0)):setTimeout(b.resume,3)},this.aborted=function(){return u},this.abort=function(){u=!0,r.abort(),s.meta.aborted=!0,x(t.complete)&&t.complete(s),e=""},this.guessLineEndings=function(w,h){w=w.substring(0,1048576);var h=new RegExp(te(h)+"([^]*?)"+te(h),"gm"),R=(w=w.replace(h,"")).split("\r"),h=w.split(`
`),w=1<h.length&&h[0].length<R[0].length;if(R.length===1||w)return`
`;for(var L=0,S=0;S<R.length;S++)R[S][0]===`
`&&L++;return L>=R.length/2?`\r
`:"\r"}}function te(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function he(t){var e=(t=t||{}).delimiter,r=t.newline,a=t.comments,n=t.step,_=t.preview,F=t.fastMode,B=null,J=!1,b=t.quoteChar==null?'"':t.quoteChar,j=b;if(t.escapeChar!==void 0&&(j=t.escapeChar),(typeof e!="string"||-1<i.BAD_DELIMITERS.indexOf(e))&&(e=","),a===e)throw Error("Comment character same as delimiter");a===!0?a="#":(typeof a!="string"||-1<i.BAD_DELIMITERS.indexOf(a))&&(a=!1),r!==`
`&&r!=="\r"&&r!==`\r
`&&(r=`
`);var o=0,P=!1;this.parse=function(u,l,s){if(typeof u!="string")throw Error("Input must be a string");var M=u.length,k=e.length,C=r.length,N=a.length,g=x(n),f=[],R=[],h=[],w=o=0;if(!u)return A();if(F||F!==!1&&u.indexOf(b)===-1){for(var L=u.split(r),S=0;S<L.length;S++){if(h=L[S],o+=h.length,S!==L.length-1)o+=r.length;else if(s)return A();if(!a||h.substring(0,N)!==a){if(g){if(f=[],T(h.split(e)),W(),P)return A()}else T(h.split(e));if(_&&_<=S)return f=f.slice(0,_),A(!0)}}return A()}for(var y=u.indexOf(e,o),d=u.indexOf(r,o),D=new RegExp(te(j)+te(b),"g"),m=u.indexOf(b,o);;)if(u[o]===b)for(m=o,o++;;){if((m=u.indexOf(b,m+1))===-1)return s||R.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:f.length,index:o}),K();if(m===M-1)return K(u.substring(o,m).replace(D,b));if(b===j&&u[m+1]===j)m++;else if(b===j||m===0||u[m-1]!==j){y!==-1&&y<m+1&&(y=u.indexOf(e,m+1));var E=G((d=d!==-1&&d<m+1?u.indexOf(r,m+1):d)===-1?y:Math.min(y,d));if(u.substr(m+1+E,k)===e){h.push(u.substring(o,m).replace(D,b)),u[o=m+1+E+k]!==b&&(m=u.indexOf(b,o)),y=u.indexOf(e,o),d=u.indexOf(r,o);break}if(E=G(d),u.substring(m+1+E,m+1+E+C)===r){if(h.push(u.substring(o,m).replace(D,b)),re(m+1+E+C),y=u.indexOf(e,o),m=u.indexOf(b,o),g&&(W(),P))return A();if(_&&f.length>=_)return A(!0);break}R.push({type:"Quotes",code:"InvalidQuotes",message:"Trailing quote on quoted field is malformed",row:f.length,index:o}),m++}}else if(a&&h.length===0&&u.substring(o,o+N)===a){if(d===-1)return A();o=d+C,d=u.indexOf(r,o),y=u.indexOf(e,o)}else if(y!==-1&&(y<d||d===-1))h.push(u.substring(o,y)),o=y+k,y=u.indexOf(e,o);else{if(d===-1)break;if(h.push(u.substring(o,d)),re(d+C),g&&(W(),P))return A();if(_&&f.length>=_)return A(!0)}return K();function T(I){f.push(I),w=o}function G(I){var q=0;return q=I!==-1&&(I=u.substring(m+1,I))&&I.trim()===""?I.length:q}function K(I){return s||(I===void 0&&(I=u.substring(o)),h.push(I),o=M,T(h),g&&W()),A()}function re(I){o=I,T(h),h=[],d=u.indexOf(r,o)}function A(I){if(t.header&&!l&&f.length&&!J){var q=f[0],Q=Object.create(null),le=new Set(q);let me=!1;for(let V=0;V<q.length;V++){let H=Y(q[V]);if(Q[H=x(t.transformHeader)?t.transformHeader(H,V):H]){let ne,ye=Q[H];for(;ne=H+"_"+ye,ye++,le.has(ne););le.add(ne),q[V]=ne,Q[H]++,me=!0,(B=B===null?{}:B)[ne]=H}else Q[H]=1,q[V]=H;le.add(H)}me&&console.warn("Duplicate headers found and renamed."),J=!0}return{data:f,errors:R,meta:{delimiter:e,linebreak:r,aborted:P,truncated:!!I,cursor:w+(l||0),renamedHeaders:B}}}function W(){n(A()),f=[],R=[]}},this.abort=function(){P=!0},this.getCharIndex=function(){return o}}function Ce(t){var e=t.data,r=z[e.workerId],a=!1;if(e.error)r.userError(e.error,e.file);else if(e.results&&e.results.data){var n={abort:function(){a=!0,ge(e.workerId,{data:[],errors:[],meta:{aborted:!0}})},pause:_e,resume:_e};if(x(r.userStep)){for(var _=0;_<e.results.data.length&&(r.userStep({data:e.results.data[_],errors:e.results.errors,meta:e.results.meta},n),!a);_++);delete e.results}else x(r.userChunk)&&(r.userChunk(e.results,n,e.file),delete e.results)}e.finished&&!a&&ge(e.workerId,e.results)}function ge(t,e){var r=z[t];x(r.userComplete)&&r.userComplete(e),r.terminate(),delete z[t]}function _e(){throw Error("Not implemented.")}function de(t){if(typeof t!="object"||t===null)return t;var e,r=Array.isArray(t)?[]:{};for(e in t)r[e]=de(t[e]);return r}function Z(t,e){return function(){t.apply(e,arguments)}}function x(t){return typeof t=="function"}return i.parse=function(t,e){var r=(e=e||{}).dynamicTyping||!1;if(x(r)&&(e.dynamicTypingFunction=r,r={}),e.dynamicTyping=r,e.transform=!!x(e.transform)&&e.transform,e.downloadTimeout!==void 0){var r=parseInt(e.downloadTimeout);if(isNaN(r))throw Error("Config downloadTimeout value ("+e.downloadTimeout+") not parsable by parseInt(val).");e.downloadTimeout=r}if(!e.worker||!i.WORKERS_SUPPORTED)return r=null,i.NODE_STREAM_INPUT,typeof t=="string"?(t=Y(t),r=new(e.download?ie:ee)(e)):t.readable===!0&&x(t.read)&&x(t.on)?r=new ae(e):(p.File&&t instanceof File||t instanceof Object)&&(r=new se(e)),r.stream(t);(r=(()=>{var a;return!!i.WORKERS_SUPPORTED&&(a=(()=>{var n=p.URL||p.webkitURL||null,_=c.toString();return i.BLOB_URL||(i.BLOB_URL=n.createObjectURL(new Blob(["var global = (function() { if (typeof self !== 'undefined') { return self; } if (typeof window !== 'undefined') { return window; } if (typeof global !== 'undefined') { return global; } return {}; })(); global.IS_PAPA_WORKER=true; ","(",_,")();"],{type:"text/javascript"})))})(),(a=new p.Worker(a)).onmessage=Ce,a.id=U++,z[a.id]=a)})()).userStep=e.step,r.userChunk=e.chunk,r.userComplete=e.complete,r.userError=e.error,e.step=x(e.step),e.chunk=x(e.chunk),e.complete=x(e.complete),e.error=x(e.error),delete e.worker,r.postMessage({input:t,config:e,workerId:r.id})},i.unparse=function(t,e){var r=!1,a=!0,n=",",_=`\r
`,F='"',B=F+F,J=!1,b=null,j=!1,o=((()=>{if(typeof e=="object"){if(typeof e.delimiter!="string"||i.BAD_DELIMITERS.filter(function(l){return e.delimiter.indexOf(l)!==-1}).length||(n=e.delimiter),typeof e.quotes!="boolean"&&typeof e.quotes!="function"&&!Array.isArray(e.quotes)||(r=e.quotes),typeof e.skipEmptyLines!="boolean"&&typeof e.skipEmptyLines!="string"||(J=e.skipEmptyLines),typeof e.newline=="string"&&(_=e.newline),typeof e.quoteChar=="string"&&(F=e.quoteChar,B=F+F),typeof e.header=="boolean"&&(a=e.header),Array.isArray(e.columns)){if(e.columns.length===0)throw Error("Option columns is empty");b=e.columns}e.escapeChar!==void 0&&(B=e.escapeChar+F),e.escapeFormulae instanceof RegExp?j=e.escapeFormulae:typeof e.escapeFormulae=="boolean"&&e.escapeFormulae&&(j=/^[=+\-@\t\r].*$/)}})(),new RegExp(te(F),"g"));if(typeof t=="string"&&(t=JSON.parse(t)),Array.isArray(t)){if(!t.length||Array.isArray(t[0]))return P(null,t,J);if(typeof t[0]=="object")return P(b||Object.keys(t[0]),t,J)}else if(typeof t=="object")return typeof t.data=="string"&&(t.data=JSON.parse(t.data)),Array.isArray(t.data)&&(t.fields||(t.fields=t.meta&&t.meta.fields||b),t.fields||(t.fields=Array.isArray(t.data[0])?t.fields:typeof t.data[0]=="object"?Object.keys(t.data[0]):[]),Array.isArray(t.data[0])||typeof t.data[0]=="object"||(t.data=[t.data])),P(t.fields||[],t.data||[],J);throw Error("Unable to serialize unrecognized input");function P(l,s,M){var k="",C=(typeof l=="string"&&(l=JSON.parse(l)),typeof s=="string"&&(s=JSON.parse(s)),Array.isArray(l)&&0<l.length),N=!Array.isArray(s[0]);if(C&&a){for(var g=0;g<l.length;g++)0<g&&(k+=n),k+=u(l[g],g);0<s.length&&(k+=_)}for(var f=0;f<s.length;f++){var R=(C?l:s[f]).length,h=!1,w=C?Object.keys(s[f]).length===0:s[f].length===0;if(M&&!C&&(h=M==="greedy"?s[f].join("").trim()==="":s[f].length===1&&s[f][0].length===0),M==="greedy"&&C){for(var L=[],S=0;S<R;S++){var y=N?l[S]:S;L.push(s[f][y])}h=L.join("").trim()===""}if(!h){for(var d=0;d<R;d++){0<d&&!w&&(k+=n);var D=C&&N?l[d]:d;k+=u(s[f][D],d)}f<s.length-1&&(!M||0<R&&!w)&&(k+=_)}}return k}function u(l,s){var M,k,C;return l==null?"":l.constructor===Date?isNaN(l.getTime())?"":l.toISOString():(C=!1,j&&typeof l=="string"&&j.test(l)&&(l="'"+l,C=!0),k=(M=l.toString()).replace(o,B),(C=C||r===!0||typeof r=="function"&&r(l,s)||Array.isArray(r)&&r[s]||((N,g)=>{for(var f=0;f<g.length;f++)if(-1<N.indexOf(g[f]))return!0;return!1})(k,i.BAD_DELIMITERS)||-1<k.indexOf(n)||-1<M.indexOf(F)||k.charAt(0)===" "||k.charAt(k.length-1)===" ")?F+k+F:k)}},i.RECORD_SEP=String.fromCharCode(30),i.UNIT_SEP=String.fromCharCode(31),i.BYTE_ORDER_MARK="\uFEFF",i.BAD_DELIMITERS=["\r",`
`,'"',i.BYTE_ORDER_MARK],i.WORKERS_SUPPORTED=!O&&!!p.Worker,i.NODE_STREAM_INPUT=1,i.LocalChunkSize=10485760,i.RemoteChunkSize=5242880,i.DefaultDelimiter=",",i.Parser=he,i.ParserHandle=pe,i.NetworkStreamer=ie,i.FileStreamer=se,i.StringStreamer=ee,i.ReadableStreamStreamer=ae,v&&(p.onmessage=function(t){t=t.data,i.WORKER_ID===void 0&&t&&(i.WORKER_ID=t.workerId),typeof t.input=="string"?p.postMessage({workerId:i.WORKER_ID,results:i.parse(t.input,t.config),finished:!0}):(p.File&&t.input instanceof File||t.input instanceof Object)&&(t=i.parse(t.input,t.config))&&p.postMessage({workerId:i.WORKER_ID,results:t,finished:!0})}),(ie.prototype=Object.create(X.prototype)).constructor=ie,(se.prototype=Object.create(X.prototype)).constructor=se,(ee.prototype=Object.create(ee.prototype)).constructor=ee,(ae.prototype=Object.create(X.prototype)).constructor=ae,i})});

  const Papa = Fe(Ee(), 1).default;
  const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTXxtzSse-RcIkjdHy4jKXSCv9Gz5JWIY7lBLTlYRE2uhx2g6g1KqPMc789XCVFpT8OLXrFCNwpW8D1/pub?gid=0&single=true&output=csv";
  const knownIds = new Set([
    "kurs-b", "kurs-c", "kurs-c-e",
    "doszkalajace-b", "doszkalajace-c", "doszkalajace-c-e",
  ]);
  const requiredIds = new Set(cards.map((card) => card.dataset.priceId));
  const status = document.querySelector("#price-status");
  const retry = document.querySelector("#price-retry");
  const currency = new Intl.NumberFormat("pl-PL", {
    style: "currency", currency: "PLN", maximumFractionDigits: 2,
  });
  let loading = false;

  if (status) {
    status.setAttribute("role", "status");
    status.setAttribute("aria-live", "polite");
    status.setAttribute("aria-atomic", "true");
  }

  function parsePrices(csv) {
    const result = Papa.parse(csv.replace(/^\uFEFF/, ""), {
      header: true,
      skipEmptyLines: "greedy",
    });
    const columns = ["id", "cena_pln", "jednostka", "opis"];
    if (result.errors.length || !columns.every((column) => result.meta.fields?.includes(column))) {
      throw new Error("Nieprawidłowy format cennika");
    }

    const prices = new Map();
    for (const row of result.data) {
      const id = row.id?.trim();
      if (!knownIds.has(id) || !requiredIds.has(id)) continue;
      if (prices.has(id)) throw new Error("Powtórzona pozycja cennika");

      const rawAmount = row.cena_pln?.trim().replace(/[\s\u00a0]/g, "") ?? "";
      const parsedAmount = /^\d+(?:[.,]\d{1,2})?$/.test(rawAmount)
        ? Number(rawAmount.replace(",", "."))
        : null;
      const amount = parsedAmount !== null && Number.isFinite(parsedAmount) && parsedAmount > 0
        ? parsedAmount
        : null;
      prices.set(id, {
        amount,
        unit: row.jednostka?.trim() ?? "",
        description: row.opis?.trim() ?? "",
      });
    }

    if ([...requiredIds].some((id) => !prices.has(id))) {
      throw new Error("Niepełny cennik");
    }
    return prices;
  }

  function setCardText(card, selector, text) {
    const element = card.querySelector(selector);
    if (element) element.textContent = text;
  }

  function clearAmounts(message) {
    cards.forEach((card) => {
      setCardText(card, "[data-amount]", message);
      setCardText(card, "[data-unit]", "");
    });
  }

  function setStatus(message) {
    if (status) status.textContent = message;
  }

  function setRetry(visible, disabled) {
    if (!retry) return;
    retry.hidden = !visible;
    retry.disabled = disabled;
  }

  function renderPrices(prices) {
    cards.forEach((card) => {
      const price = prices.get(card.dataset.priceId);
      setCardText(card, "[data-amount]", price.amount === null
        ? "Zapytaj o cenę"
        : currency.format(price.amount));
      const unit = price.unit === "godzina" ? "za godzinę jazdy"
        : price.unit === "kurs" ? "za kurs" : price.unit;
      setCardText(card, "[data-unit]", price.amount === null ? "" : unit);
      if (price.description) setCardText(card, "[data-description]", price.description);
    });
  }

  async function loadPrices() {
    if (loading) return;
    loading = true;
    setRetry(false, true);
    clearAmounts("Pobieranie ceny…");
    setStatus("Pobieranie aktualnych cen…");

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(csvUrl, {
        credentials: "omit",
        cache: "no-store",
        signal: controller.signal,
      });
      if (!response.ok) throw new Error("Nie udało się pobrać cen");
      const prices = parsePrices(await response.text());
      renderPrices(prices);
      setStatus("Aktualny cennik kursów i dodatkowych jazd.");
    } catch {
      clearAmounts("Zapytaj o cenę");
      setStatus("Nie udało się pobrać aktualnych cen. Zadzwoń: 606 720 252.");
      setRetry(true, false);
    } finally {
      clearTimeout(timeout);
      loading = false;
    }
  }

  retry?.addEventListener("click", loadPrices);
  loadPrices();
})();
