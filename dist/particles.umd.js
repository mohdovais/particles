!function(a,b){"object"==typeof exports&&"undefined"!=typeof module?b(exports):"function"==typeof define&&define.amd?define(["exports"],b):b((a="undefined"!=typeof globalThis?globalThis:a||self).particles={})}(this,function(a){"use strict";var b=function(a,b){var c=a.x1,d=a.y1,e=a.x2,f=a.y2,g=n(b),h=n(b),i=c+l(k()*e),j=d+l(k()*f);return{x:i,y:j,r:0|Math.sqrt(i*i+j*j),vx:g,vy:h}},c=function(a){for(var c=a.x1,d=a.y1,e=a.x2,f=a.y2,g=arguments.length>1&& void 0!==arguments[1]?arguments[1]:200,h=arguments.length>2&& void 0!==arguments[2]?arguments[2]:4,i=new Array(g),j=0;j<g;j++)i[j]=b({x1:c,y1:d,x2:e,y2:f},h);return i},d=function(a,b,c){for(var d=b+0,e=c+0,f=a.length,g=0;g<f;g++){var h=a[g],i=h.x+h.vx,j=h.y+h.vy;h.x=i,h.y=j,h.r=Math.sqrt(i*i+j*j),(i<0||i>d)&&(h.vx=-h.vx),(j<0||j>e)&&(h.vy=-h.vy)}},e=function(a,b){var c=new Array();return a.forEach(function(a){var d=m(a.y/b),e=m(a.x/b);null==c[d]&&(c[d]=[]),null==c[d][e]&&(c[d][e]=[]),c[d][e].push(a)}),c},f=function(a,b,c){var d=c.distance,f=c.strokeStyle,g=c.fillStyle,h=c.size,i=a.width,j=a.height,k=a.getContext("2d"),l=Math.ceil(i/d),m=Math.ceil(j/d),n=e(b,d),o=d*d,q=h/2,r=function(a,b){var c=a.x-b.x,d=a.y-b.y;c*c+d*d<o&&(k.moveTo(a.x,a.y),k.lineTo(b.x,b.y))};k.beginPath(),k.clearRect(0,0,i,j),k.fillStyle=g,k.strokeStyle=f;for(var s=0;s<m;s++)!function(a){for(var b=0;b<l;b++)!function(b){var c=p(n,a,b),d=[].concat(p(n,a,b+1),p(n,a+1,b),p(n,a+1,b+1)),e=new Set();c.forEach(function(a){e.add(a),c.forEach(function(b){e.has(b)||r(a,b)}),d.forEach(function(b){r(a,b)}),k.fillRect(a.x-q,a.y-q,h,h)})}(b)}(s);k.stroke(),k.restore()},g=Math,h=window,i=window.requestAnimationFrame,j="resize",k=g.random,l=g.ceil,m=g.floor,n=function(a){var b=l(k()*a);return(k()>0.5?1:-1)*(0===b?n(a):b)},o=function(a){return null==a?[]:Array.isArray(a)?a:[a]},p=function(a,b,c){return o(o(a[b])[c])};a.init=function(a,b){var e,g=b.count,k=b.distance,l=void 0===k?100:k,m=b.speed,n=b.animate,o=void 0===n||n,p=b.strokeStyle,q=void 0===p?"rgba(0,0,0,0.1)":p,r=b.fillStyle,s=void 0===r?"black":r,t=b.size,u=void 0===t?2:t,v=(e=a,function(){var a=e.offsetWidth,b=e.offsetHeight;return e.width=a,e.height=b,{width:a,height:b}}),w=v(),x=w.width,y=w.height,z=c({x1:0,y1:0,x2:x,y2:y},void 0===g?500:g,void 0===m?4:m);h.addEventListener(j,v);var A=0;function B(){var b=arguments.length>0&& void 0!==arguments[0]?arguments[0]:0;b-A>16&&(f(a,z,{distance:l,strokeStyle:q,fillStyle:s,size:u}),d(z,x,y),A=b),!1!==o&&i(B)}return i(B),function(){o=!1,h.removeEventListener(j,v)}},Object.defineProperty(a,"__esModule",{value:!0})})
//# sourceMappingURL=particles.umd.js.map
