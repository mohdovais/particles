const t=Math,e=t.random,n=t.ceil;function o({x1:t,y1:o,x2:r,y2:i},c,y){const s=n(e()*c)-y,x=n(e()*c)-y;return{x:t+n(e()*r),y:o+n(e()*i),vx:0===s?1:s,vy:0===x?1:x}}const r=window,i=window.requestAnimationFrame;function c(t,{count:e,distance:n,speed:c,animate:y,strokeStyle:s}){const x=function(t){return()=>{const e=t.offsetWidth,n=t.offsetHeight;return t.width=e,t.height=n,{width:e,height:n}}}(t),{width:h,height:f}=x(),u=function({x1:t,y1:e,x2:n,y2:r},i=200,c=4){const y=new Array(i),s=Math.floor(c/2);for(let x=0;x<i;x++)y[x]=o({x1:t,y1:e,x2:n,y2:r},c,s);return y}({x1:0,y1:0,x2:h,y2:f},e,c);return r.addEventListener("resize",x),i((function e(){!function(t,e,{distance:n,strokeStyle:o}){const{width:r,height:i}=t,c=n*n,y=t.getContext("2d");y.fillStyle="black",y.strokeStyle=o||"rgba(0,0,0,0.1)",y.clearRect(0,0,t.width,t.height),y.beginPath(),e.forEach((function(t){const n=function(t,e,n=2500){return function(t,e){const n=t.length,o=[];for(let r=0;r<n;r++)e(t[r],r,t)&&o.push(t[r]);return o}(e,e=>{if(e===t)return!1;const o=t.x-e.x,r=t.y-e.y;return o*o+r*r<n})}(t,e,c),o=n.length;for(let e=0;e<o;e++){let o=n[e];y.moveTo(t.x,t.y),y.lineTo(o.x,o.y)}})),y.stroke(),e.forEach(t=>y.fillRect(t.x,t.y,2,2));const s=r+0,x=i+0;e.forEach(t=>function(t,{x1:e,y1:n,x2:o,y2:r}){t.x+=t.vx,t.y+=t.vy,(t.x<e||t.x>o)&&(t.vx=-t.vx),(t.y<n||t.y>r)&&(t.vy=-t.vy)}(t,{x1:-0,x2:s,y1:-0,y2:x}))}(t,u,{distance:n,strokeStyle:s}),!1!==y&&i(e)})),()=>{y=!1,r.removeEventListener("resize",x)}}export{c as init};
