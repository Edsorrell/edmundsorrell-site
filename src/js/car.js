(function(){document.querySelectorAll('[data-car]').forEach(function(c){var t=c.querySelector('.crt'),s=[].slice.call(t.children),n=c.querySelector('.crc b'),p=c.querySelector('.crp'),x=c.querySelector('.crx'),cur=0;
function pad(){var f=s[0].getBoundingClientRect().width,l=s[s.length-1].getBoundingClientRect().width,w=t.clientWidth;t.style.paddingLeft=Math.max(0,(w-f)/2)+'px';t.style.paddingRight=Math.max(0,(w-l)/2)+'px'}
function mid(e){return e.offsetLeft-t.offsetLeft+e.offsetWidth/2}
function near(){var m=t.scrollLeft+t.clientWidth/2,i=0,b=1e9;s.forEach(function(e,k){var d=Math.abs(mid(e)-m);if(d<b){b=d;i=k}});return i}
function upd(){cur=near();s.forEach(function(e,k){e.classList.toggle('on',k===cur)});n.textContent=cur+1;p.disabled=cur===0;x.disabled=cur===s.length-1}
function go(i){i=Math.max(0,Math.min(s.length-1,i));t.scrollTo({left:mid(s[i])-t.clientWidth/2})}
p.addEventListener('click',function(){go(cur-1)});x.addEventListener('click',function(){go(cur+1)});
s.forEach(function(e,k){e.addEventListener('click',function(){if(k!==cur)go(k)});var im=e.querySelector('img');if(im&&!im.complete)im.addEventListener('load',function(){pad();upd()},{once:true})});
t.addEventListener('keydown',function(e){if(e.key==='ArrowRight'){e.preventDefault();go(cur+1)}if(e.key==='ArrowLeft'){e.preventDefault();go(cur-1)}});
var r;t.addEventListener('scroll',function(){cancelAnimationFrame(r);r=requestAnimationFrame(upd)},{passive:true});
addEventListener('resize',function(){pad();go(cur)});pad();t.style.scrollBehavior='auto';t.scrollLeft=0;t.style.scrollBehavior='';upd()})})();
