/* Contador do carrinho compartilhado entre as páginas */
(function(){
  var c=document.getElementById('cart');
  if(c){
    try{ c.textContent='Carrinho ('+(localStorage.getItem('mm_n')||0)+')'; }catch(e){}
    if(!document.getElementById('drawer')) c.href='index3.html';
  }
  var h=document.querySelector('header'),bg=document.getElementById('burger');
  if(bg){ bg.onclick=function(){ var o=h.classList.toggle('open'); bg.setAttribute('aria-expanded',o); };
    [].forEach.call(h.querySelectorAll('nav a'),function(l){ l.onclick=function(){ h.classList.remove('open'); bg.setAttribute('aria-expanded',false); }; }); }
  /* Carrossel */
  var car=document.getElementById('car'); if(!car) return;
  var tr=car.querySelector('.track'), sl=tr.children, dots=car.querySelector('.dots'), i=0, t;
  [].forEach.call(sl,function(_,k){
    var b=document.createElement('button'); b.setAttribute('aria-label','Foto '+(k+1));
    b.onclick=function(){go(k)}; dots.appendChild(b);
  });
  function go(k){ i=(k+sl.length)%sl.length; tr.scrollTo({left:i*tr.clientWidth,behavior:'smooth'}); mark(); }
  function mark(){ [].forEach.call(dots.children,function(b,k){ b.setAttribute('aria-current',k===i); }); }
  tr.addEventListener('scroll',function(){ var k=Math.round(tr.scrollLeft/tr.clientWidth); if(k!==i){i=k;mark();} });
  car.querySelector('.p').onclick=function(){go(i-1)};
  car.querySelector('.n').onclick=function(){go(i+1)};
  function play(){ stop(); if(!matchMedia('(prefers-reduced-motion:reduce)').matches) t=setInterval(function(){go(i+1)},4500); }
  function stop(){ clearInterval(t); }
  car.onmouseenter=car.onfocusin=stop; car.onmouseleave=car.onfocusout=play;
  mark(); play();
})();
