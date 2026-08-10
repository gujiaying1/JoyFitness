document.addEventListener('DOMContentLoaded',()=>{
  const slides=[...document.querySelectorAll('.slide')]; let idx=slides.findIndex(x=>x.classList.contains('active')); if(idx<0) idx=0;
  if(slides.length>1) setInterval(()=>{slides[idx].classList.remove('active'); idx=(idx+1)%slides.length; slides[idx].classList.add('active');},5000);
  const reveal=()=>document.querySelectorAll('.reveal').forEach(el=>{if(el.getBoundingClientRect().top<innerHeight*.9) el.classList.add('visible')});
  addEventListener('scroll',reveal,{passive:true}); reveal();
  addEventListener('scroll',()=>{const y=scrollY*.16; document.querySelectorAll('.slide').forEach(img=>img.style.transform=`translateY(${y}px) scale(1.04)`);},{passive:true});
  // Static demo occupancy: browser-only replacement for ViewBag.Current/ViewBag.Max.
  const max=80, hour=new Date().getHours();
  const current = hour>=17&&hour<=20 ? 63 : hour>=11&&hour<=14 ? 49 : 31;
  document.querySelector('#occFill').style.width=`${current/max*100}%`;
  document.querySelector('#occText').innerHTML=`${current} / ${max} &nbsp; <span class="${current>60?'high':'low'}">${current>60?'Peak Hours':'Available'}</span>`;
});
