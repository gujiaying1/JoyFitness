document.addEventListener('DOMContentLoaded',()=>{
  const id=Number(new URLSearchParams(location.search).get('id')||1); const w=JOY_WORKOUTS.find(x=>x.id===id);
  const root=document.getElementById('detailRoot');
  if(!w){ root.innerHTML='<div class="empty-state"><h2>Exercise not found</h2><a class="btn" href="equipment.html">Back to Equipment</a></div>'; return; }
  document.title=`${w.name} - JoyRise Fitness`;
  const days=w.part==='Legs'?'3-4':'2-3';
  root.innerHTML=`<section class="equipment-detail">
    <div class="detail-header glass-card"><div class="breadcrumb"><a href="equipment.html">← Equipment Library</a><span>/</span><span>${w.name}</span></div>
      <div class="header-content"><div class="header-text"><h1 class="equipment-title">${w.name}</h1>
        <div class="equipment-meta"><span class="meta-tag">🏋️ ${w.part}</span><span class="meta-tag">📶 ${w.difficulty} Level</span><span class="meta-tag">⚙️ Strength Training</span><span class="meta-tag">⏱ 15-20 min</span></div>
        <p class="equipment-description">${w.shortDesc}</p><div class="equipment-stats"><div><b>8-12</b><span>Reps</span></div><div><b>3-4</b><span>Sets</span></div><div><b>60-90s</b><span>Rest</span></div><div><b>${days}</b><span>Days/Week</span></div></div>
        <button id="planToggle" class="primary-action"></button>
      </div><div class="header-image"><img src="${w.imgUrl}" alt="${w.name}"></div></div></div>
    <div class="detail-grid-static"><div class="glass-card section-card"><h2>Exercise Demonstration</h2><div class="video-wrap"><iframe src="https://player.bilibili.com/player.html?bvid=${w.video}&page=1&high_quality=1&autoplay=0" allowfullscreen></iframe></div><p class="muted">If the embedded video is blocked by your browser/network, the exercise information below still works.</p></div>
    <div class="glass-card section-card"><h2>How to Perform</h2><ol class="steps">${w.steps.map(s=>`<li>${s}</li>`).join('')}</ol><h3>Alternatives</h3><div class="chips">${w.alternatives.map(a=>`<span>${a}</span>`).join('')}</div><div class="tip-box"><strong>Training tip</strong><p>Use a controlled range of motion and choose a load that lets you maintain good form.</p></div></div></div>
  </section>`;
  const btn=document.getElementById('planToggle');
  function sync(){btn.textContent=JoyPlan.has(w.id)?'♥ Remove from My Plan':'♡ Add to My Plan';btn.classList.toggle('saved',JoyPlan.has(w.id));}
  btn.onclick=()=>{JoyPlan.has(w.id)?JoyPlan.remove(w.id):JoyPlan.add(w.id);sync();showToast(JoyPlan.has(w.id)?'Added to My Training Plan':'Removed from My Training Plan')};sync();
});
