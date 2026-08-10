const PAGE_SIZE=6;
let state={q:'',part:'',sort:'',page:1};
function difficultyRank(x){return {Beginner:1,Intermediate:2,Advanced:3}[x]||9}
function filtered(){
  let a=[...JOY_WORKOUTS];
  if(state.q) a=a.filter(w=>w.name.toLowerCase().includes(state.q.toLowerCase()));
  if(state.part) a=a.filter(w=>w.part===state.part);
  if(state.sort==='diff-asc') a.sort((a,b)=>difficultyRank(a.difficulty)-difficultyRank(b.difficulty)||a.id-b.id);
  else if(state.sort==='diff-desc') a.sort((a,b)=>difficultyRank(b.difficulty)-difficultyRank(a.difficulty)||a.id-b.id);
  else a.sort((a,b)=>a.id-b.id);
  return a;
}
function render(){
  const all=filtered(); const pages=Math.max(1,Math.ceil(all.length/PAGE_SIZE)); state.page=Math.min(state.page,pages);
  const items=all.slice((state.page-1)*PAGE_SIZE,state.page*PAGE_SIZE);
  document.getElementById('equipmentCards').innerHTML=items.length?items.map((w,i)=>`<article class="card reveal visible" style="animation-delay:${i*60}ms">
    <img src="${w.imgUrl}" alt="${w.name}" loading="lazy"><h3>${w.name}</h3><p class="part">${w.part} · ${w.difficulty}</p><p class="desc">${w.shortDesc}</p>
    <div class="foot"><a class="btn" href="detail.html?id=${w.id}">Detail</a><button class="heart ${JoyPlan.has(w.id)?'on':''}" data-id="${w.id}" title="Add to My Training Plan" aria-label="Toggle ${w.name} in plan">❤</button></div></article>`).join(''):'<div class="empty-state wide"><h3>No matching equipment</h3><p>Try a different search or muscle group.</p></div>';
  const pg=document.getElementById('paging'); pg.innerHTML=pages>1?Array.from({length:pages},(_,i)=>`<button class="${state.page===i+1?'on':''}" data-page="${i+1}">${i+1}</button>`).join(''):'';
  document.getElementById('resultCount').textContent=`${all.length} exercise${all.length===1?'':'s'}`;
  document.querySelectorAll('.heart').forEach(b=>b.onclick=()=>{const id=+b.dataset.id; JoyPlan.has(id)?JoyPlan.remove(id):JoyPlan.add(id); render(); showToast(JoyPlan.has(id)?'Added to My Training Plan':'Removed from My Training Plan');});
  pg.querySelectorAll('button').forEach(b=>b.onclick=()=>{state.page=+b.dataset.page; render(); scrollTo({top:document.querySelector('.eq-list').offsetTop-90,behavior:'smooth'});});
}
document.addEventListener('DOMContentLoaded',()=>{
  const f=document.getElementById('filterForm');
  f.addEventListener('submit',e=>{e.preventDefault(); state={q:f.q.value.trim(),part:f.part.value,sort:f.sort.value,page:1}; render();});
  document.getElementById('resetFilter').onclick=()=>{f.reset();state={q:'',part:'',sort:'',page:1};render()};
  window.addEventListener('joyplanchange',render); render();
});
