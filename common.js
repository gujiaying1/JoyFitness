// STATIC CONVERSION: shared navigation + localStorage plan replaces ASP.NET Session.
(() => {
  const KEY = 'joyrise-my-plan';
  const getPlan = () => { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; } };
  const setPlan = ids => localStorage.setItem(KEY, JSON.stringify([...new Set(ids.map(Number))]));
  window.JoyPlan = {
    ids: getPlan,
    has(id){ return getPlan().includes(Number(id)); },
    add(id){ const a=getPlan(); a.push(Number(id)); setPlan(a); window.dispatchEvent(new Event('joyplanchange')); },
    addMany(ids){ setPlan(getPlan().concat(ids)); window.dispatchEvent(new Event('joyplanchange')); },
    remove(id){ setPlan(getPlan().filter(x=>x!==Number(id))); window.dispatchEvent(new Event('joyplanchange')); },
    items(){ const ids=getPlan(); return (window.JOY_WORKOUTS||[]).filter(w=>ids.includes(w.id)); }
  };

  document.addEventListener('DOMContentLoaded', () => {
    const btn=document.querySelector('.nav-toggle');
    const links=document.querySelector('.nav-links');
    if(btn&&links) btn.addEventListener('click',()=>links.classList.toggle('open'));
    const here=(location.pathname.split('/').pop()||'index.html').toLowerCase();
    document.querySelectorAll('.nav-links a').forEach(a=>{
      const href=(a.getAttribute('href')||'').split('?')[0].toLowerCase();
      if(href===here || (here==='detail.html' && href==='equipment.html')) a.classList.add('active');
    });
    document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
  });

  window.showToast = (message, type='ok') => {
    let root=document.getElementById('toastRoot');
    if(!root){ root=document.createElement('div'); root.id='toastRoot'; root.className='toast-root'; document.body.appendChild(root); }
    const t=document.createElement('div'); t.className='toast '+type; t.textContent=message; root.appendChild(t);
    requestAnimationFrame(()=>t.classList.add('show'));
    setTimeout(()=>{t.classList.remove('show'); setTimeout(()=>t.remove(),250)},2300);
  };
})();
