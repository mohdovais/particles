!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e=e||self).particles={})}(this,(function(e){"use strict";var t=Math,r=t.random,i=t.ceil;function n(e,t,n){var o=e.x1,f=e.y1,a=e.x2,s=e.y2,y=i(r()*t)-n,l=i(r()*t)-n,v=o+i(r()*a),d=f+i(r()*s);return{x:v,y:d,r:Math.sqrt(v*v+d*d),vx:0===y?1:y,vy:0===l?1:l}}var o=window,f=window.requestAnimationFrame;e.init=function(e,t){var r=t.count,i=t.distance,a=t.speed,s=t.animate,y=t.strokeStyle,l=t.fillStyle,v=t.size,d=function(e){return function(){var t=e.offsetWidth,r=e.offsetHeight;return e.width=t,e.height=r,{width:t,height:r}}}(e),c=d(),h=function(e,t,r){var i=e.x1,o=e.y1,f=e.x2,a=e.y2;void 0===t&&(t=200),void 0===r&&(r=4);for(var s=new Array(t),y=Math.floor(r/2),l=0;l<t;l++)s[l]=n({x1:i,y1:o,x2:f,y2:a},r,y);return s}({x1:0,y1:0,x2:c.width,y2:c.height},r,a);return o.addEventListener("resize",d),f((function t(){if(h.sort((function(e,t){return e.r-t.r})),function(e,t,r){var i=r.distance,n=r.strokeStyle,o=r.fillStyle,f=r.size,a=i*i,s=e.getContext("2d"),y=(f=void 0===f?2:f)/2;s.fillStyle=o||"black",s.strokeStyle=n||"rgba(0,0,0,0.1)",s.clearRect(0,0,e.width,e.height),s.beginPath();for(var l=t.length,v=0;v<l;v++){for(var d=t[v],c=v+1;c<l;c++){var h=t[c],u=d.x-h.x,x=d.y-h.y;if(u*u+x*x<a)s.moveTo(d.x,d.y),s.lineTo(h.x,h.y);else if(Math.abs(d.r-h.r)>i)break}s.fillRect(d.x-y,d.y-y,f,f)}s.stroke()}(e,h,{distance:i,strokeStyle:y,fillStyle:l,size:v}),!1!==s){for(var n=e.width+0,o=e.height+0,a=0;a<r;a++){var d=h[a],c=d.x+d.vx,u=d.y+d.vy;d.x=c,d.y=u,d.r=Math.sqrt(c*c+u*u),(c<0||c>n)&&(d.vx=-d.vx),(u<0||u>o)&&(d.vy=-d.vy)}f(t)}})),function(){s=!1,o.removeEventListener("resize",d)}},Object.defineProperty(e,"__esModule",{value:!0})}));
