const t=Math,e=t.random,n=t.ceil;function o({x1:t,y1:o,x2:r,y2:i},s,l){const y=n(e()*s)-l,c=n(e()*s)-l,a=t+n(e()*r),f=o+n(e()*i);return{x:a,y:f,r:Math.sqrt(a*a+f*f),vx:0===y?1:y,vy:0===c?1:c,a:Math.atan(f/a)}}const r=window,i=window.requestAnimationFrame;function s(t,{count:e,distance:n,speed:s,animate:l,strokeStyle:y,fillStyle:c,size:a}){const f=function(t){return()=>{const e=t.offsetWidth,n=t.offsetHeight;return t.width=e,t.height=n,{width:e,height:n}}}(t),{width:h,height:x}=f(),d=function({x1:t,y1:e,x2:n,y2:r},i=200,s=4){const l=new Array(i),y=Math.floor(s/2);for(let c=0;c<i;c++)l[c]=o({x1:t,y1:e,x2:n,y2:r},s,y);return l}({x1:0,y1:0,x2:h,y2:x},e,s);return r.addEventListener("resize",f),i((function e(){d.sort((function(t,e){return t.r-e.r})),function(t,e,{distance:n,strokeStyle:o,fillStyle:r,size:i}){const s=n*n,l=t.getContext("2d"),y=(i=void 0===i?2:i)/2;l.fillStyle=r||"black",l.strokeStyle=o||"rgba(0,0,0,0.1)",l.clearRect(0,0,t.width,t.height),l.beginPath();const c=e.length;for(let t=0;t<c;t++){let o=e[t],r=o.r+n;for(let n=t+1;n<c;n++){let t=e[n];if(!(t.r<r))break;{const e=o.x-t.x,n=o.y-t.y;e*e+n*n<s&&(l.moveTo(o.x,o.y),l.lineTo(t.x,t.y))}}l.fillRect(o.x-y,o.y-y,i,i)}l.stroke()}(t,d,{distance:n,strokeStyle:y,fillStyle:c,size:a}),!1!==l&&(!function(t,e,n){const o=e+0,r=n+0,i=t.length;for(let e=0;e<i;e++){let n=t[e];const i=n.x+n.vx,s=n.y+n.vy;n.x=i,n.y=s,n.r=Math.sqrt(i*i+s*s),(i<0||i>o)&&(n.vx=-n.vx),(s<0||s>r)&&(n.vy=-n.vy)}}(d,h,x),i(e))})),()=>{l=!1,r.removeEventListener("resize",f)}}export{s as init};
