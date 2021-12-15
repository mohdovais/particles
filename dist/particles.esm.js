const math=Math,win=window,reqAnimationFrame=window.requestAnimationFrame,EVENT_NAME_RESIZE="resize",random=math.random,ceil=math.ceil,floor=math.floor,randomVelocity=a=>{const b=ceil(random()*a);return(random()>0.5?1:-1)*(0===b?randomVelocity(a):b)};function createParticle({x1:a,y1:b,x2:c,y2:d},e){const f=randomVelocity(e),g=randomVelocity(e),h=a+ceil(random()*c),i=b+ceil(random()*d);return{x:h,y:i,r:0|Math.sqrt(h*h+i*i),vx:f,vy:g}}function createParticles({x1:a,y1:b,x2:c,y2:d},e=200,f=4){const g=new Array(e);for(let h=0;h<e;h++)g[h]=createParticle({x1:a,y1:b,x2:c,y2:d},f);return g}function moveParticles(a,b,c){const d=b+100,e=c+100,f=a.length;for(let g=0;g<f;g++){let h=a[g];const i=h.x+h.vx,j=h.y+h.vy;h.x=i,h.y=j,h.r=Math.sqrt(i*i+j*j),(i< -100||i>d)&&(h.vx=-h.vx),(j< -100||j>e)&&(h.vy=-h.vy)}}function resizer(a){return()=>{const b=a.offsetWidth,c=a.offsetHeight;return a.width=b,a.height=c,{width:b,height:c}}}function createMatrix(a,b){const c=new Array();return a.forEach(a=>{const d=floor(a.y/b),e=floor(a.x/b);null==c[d]&&(c[d]=[]),null==c[d][e]&&(c[d][e]=[]),c[d][e].push(a)}),c}const ensureArray=a=>null==a?[]:Array.isArray(a)?a:[a],getBlock=(a,b,c)=>ensureArray(ensureArray(a[b])[c]);function draw(a,b,{distance:c,strokeStyle:d,fillStyle:e,size:f=2}){const{width:g,height:h}=a,i=a.getContext("2d");i.fillStyle=e||"black",i.strokeStyle=d||"rgba(0,0,0,0.1)",i.clearRect(0,0,g,h),i.beginPath();const j=Math.ceil(g/c),k=Math.ceil(h/c),l=createMatrix(b,c),m=c*c,n=f/2;for(let o=0;o<k;o++)for(let p=0;p<j;p++){const q=getBlock(l,o,p),r=[].concat(q,getBlock(l,o+1,p),getBlock(l,o,p+1),getBlock(l,o+1,p+1));q.forEach(a=>{r.forEach(b=>{if(a!==b){const c=a.x-b.x,d=a.y-b.y;c*c+d*d<m&&(i.moveTo(a.x,a.y),i.lineTo(b.x,b.y))}}),i.fillRect(a.x-n,a.y-n,f,f)})}i.stroke()}function init(a,b){var{count:c,distance:d,speed:e,animate:f=!0,strokeStyle:g,fillStyle:h,size:i=2}=b;const j=resizer(a),{width:k,height:l}=j(),m=createParticles({x1:0,y1:0,x2:k,y2:l},c,e);function n(){m.sort(function(a,b){return a.r-b.r}),draw(a,m,{distance:d,strokeStyle:g,fillStyle:h,size:i}),!1!==f&&(moveParticles(m,k,l),reqAnimationFrame(n))}return win.addEventListener(EVENT_NAME_RESIZE,j),reqAnimationFrame(n),()=>{f=!1,win.removeEventListener(EVENT_NAME_RESIZE,j)}}export{init}
//# sourceMappingURL=particles.esm.js.map
