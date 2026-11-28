(function(){document.querySelectorAll('[data-car]').forEach(function(c){var t=c.querySelector('.crt'),s=[].slice.call(t.children),n=c.querySelector('.crc b'),p=c.querySelector('.crp'),x=c.querySelector('.crx');
function cur(){var l=t.scrollLeft,i=0,b=1e9;s.forEach(function(e,k){var d=Math.abs(e.offsetLeft-t.offsetLeft-l);if(d<b){b=d;i=k}});if(t.scrollLeft+t.clientWidth>=t.scrollWidth-4)i=s.length-1;return i}
function upd(){var i=cur();n.textContent=i+1;p.disabled=t.scrollLeft<4;x.disabled=t.scrollLeft+t.clientWidth>=t.scrollWidth-4}
function go(d){var i=Math.max(0,Math.min(s.length-1,cur()+d));t.scrollTo({left:s[i].offsetLeft-t.offsetLeft})}
p.addEventListener('click',function(){go(-1)});x.addEventListener('click',function(){go(1)});
t.addEventListener('keydown',function(e){if(e.key==='ArrowRight'){e.preventDefault();go(1)}if(e.key==='ArrowLeft'){e.preventDefault();go(-1)}});
var r;t.addEventListener('scroll',function(){cancelAnimationFrame(r);r=requestAnimationFrame(upd)},{passive:true});upd()})})();
