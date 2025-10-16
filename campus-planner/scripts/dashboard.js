import { initState, state } from './state.js';

const fallbackSeed = [
  { id:'seed1', title:'Study session CS101', dueDate:'2025-09-25', duration:90, tag:'Study', status:'Pending', createdAt:'-', updatedAt:'-'},
  { id:'seed2', title:'Club meeting', dueDate:'2025-09-24', duration:60, tag:'Club', status:'Pending', createdAt:'-', updatedAt:'-'},
  { id:'seed3', title:'Gym workout', dueDate:'2025-09-22', duration:45, tag:'Personal', status:'Done', createdAt:'-', updatedAt:'-'},
];

async function loadSeed(){
  try{ const res = await fetch('seed.json'); if(!res.ok) throw new Error(); return await res.json(); } catch { return fallbackSeed; }
}

function renderStats(){
  const list = state.records;
  const total = list.length;
  const completed = list.filter(r=> (r.status||'Pending')==='Done').length;
  const today = new Date();
  const upcoming = list
    .filter(r=> new Date(r.dueDate) >= new Date(today.toISOString().slice(0,10)))
    .sort((a,b)=>a.dueDate.localeCompare(b.dueDate))
    .length;
  document.getElementById('stat-total').textContent = String(total);
  document.getElementById('stat-completed').textContent = String(completed);
  document.getElementById('stat-upcoming').textContent = String(upcoming);

  // Trend: last 7 days durations
  const days = Array.from({length:7}, (_,i)=>{
    const d = new Date(); d.setDate(d.getDate() - (6-i));
    const ymd = d.toISOString().slice(0,10);
    const sum = list.filter(r=>r.dueDate===ymd).reduce((a,b)=>a+Number(b.duration||0),0);
    return sum;
  });
  const max = Math.max(1, ...days);
  const chars = '▁▂▃▄▅▆▇█';
  const bars = days.map(v=> chars[Math.min(7, Math.max(0, Math.round((v/max)*7)))]).join('');
  document.getElementById('stat-trend').textContent = bars;

  // Goals progress: naive percent of completed/total
  const pct = total ? Math.round((completed/total)*100) : 0;
  document.getElementById('goal-progress').style.width = pct + '%';
}

function renderUpcoming(){
  const ul = document.getElementById('upcoming-list');
  const list = [...state.records]
    .sort((a,b)=> a.dueDate.localeCompare(b.dueDate))
    .slice(0,5);
  ul.innerHTML = list.map(r=>`<li>
    <h3>${escapeHtml(r.title)}</h3>
    <p><strong>Due:</strong> ${escapeHtml(r.dueDate)} • <strong>${escapeHtml(r.tag)}</strong></p>
    <p><strong>Duration:</strong> ${escapeHtml(String(r.duration)+'m')} • <strong>Status:</strong> ${escapeHtml(r.status||'Pending')}</p>
  </li>`).join('');
}

function applyWelcome(){
  const name = state.settings.name?.trim();
  if (name) document.getElementById('student-name').textContent = name;
}

function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]));
}

async function main(){
  document.getElementById('year').textContent = new Date().getFullYear();
  const seed = await loadSeed();
  initState(seed);
  applyWelcome();
  renderStats();
  renderUpcoming();
}

main();
