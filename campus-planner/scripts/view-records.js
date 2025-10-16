import { load, save } from './storage.js';
import { compileRegex, highlight } from './search.js';

const state = { records: [], sortBy:'dueDate', sortDir:'asc', re:null };

function sortRecords(arr){
  const m = state.sortDir==='asc'?1:-1;
  return [...arr].sort((a,b)=>{
    if (state.sortBy==='duration') return (a.duration-b.duration)*m;
    if (state.sortBy==='title') return a.title.localeCompare(b.title)*m;
    return a.dueDate.localeCompare(b.dueDate)*m;
  });
}

function filterRecords(list){
  const q = document.getElementById('search-input').value;
  const flags = document.getElementById('search-ci').checked ? 'i' : '';
  const re = compileRegex(q, flags);
  const err = document.getElementById('search-error');
  if (!q){ err.textContent=''; state.re = null; }
  else if (!re){ err.textContent='Invalid regex'; state.re = null; }
  else { err.textContent=''; state.re = re; }

  const cat = document.getElementById('filter-cat').value;
  return sortRecords(state.records.filter(r=>{
    const okCat = !cat || r.tag.toLowerCase()===cat.toLowerCase();
    if (!state.re) return okCat;
    const hay = `${r.title} ${r.tag} ${r.dueDate} ${r.duration} ${r.status}`;
    return okCat && state.re.test(hay);
  }));
}

function escapeHtml(s){ return String(s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c])); }
function applyHighlight(s){ return state.re ? highlight(s, state.re) : s; }

function render(){
  const list = filterRecords(state.records);
  const tbody = document.getElementById('records-tbody');
  tbody.innerHTML = list.map(r=>
    `<tr data-id="${r.id}">`
    + `<td>${applyHighlight(escapeHtml(r.title))}</td>`
    + `<td>${applyHighlight(escapeHtml(r.tag))}</td>`
    + `<td>${applyHighlight(escapeHtml(r.dueDate))}</td>`
    + `<td>${applyHighlight(escapeHtml(String(r.duration)+'m'))}</td>`
    + `<td>${applyHighlight(escapeHtml(r.status||'Pending'))}</td>`
    + `<td class="actions-col"><button class="secondary" data-edit="${r.id}">Edit</button><button data-del="${r.id}">Delete</button></td>`
    + `</tr>`
  ).join('');

  const ul = document.getElementById('records-cards');
  ul.innerHTML = list.map(r=>`
    <li data-id="${r.id}">
      <h3>${applyHighlight(escapeHtml(r.title))}</h3>
      <p><strong>Category:</strong> ${applyHighlight(escapeHtml(r.tag))}</p>
      <p><strong>Due:</strong> ${applyHighlight(escapeHtml(r.dueDate))}</p>
      <p><strong>Duration:</strong> ${applyHighlight(escapeHtml(String(r.duration)+'m'))}</p>
      <p><strong>Status:</strong> ${applyHighlight(escapeHtml(r.status||'Pending'))}</p>
      <div class="card-actions">
        <button class="secondary" data-edit="${r.id}">Edit</button>
        <button data-del="${r.id}">Delete</button>
      </div>
    </li>`).join('');
}

function wire(){
  document.getElementById('year').textContent = new Date().getFullYear();
  document.getElementById('search-input').addEventListener('input', render);
  document.getElementById('search-ci').addEventListener('change', render);
  document.getElementById('filter-cat').addEventListener('change', render);
  const sortBy = document.getElementById('sort-by');
  const sortDir = document.getElementById('sort-dir');
  sortBy.addEventListener('change', ()=>{ state.sortBy = sortBy.value; render(); });
  sortDir.addEventListener('click', ()=>{ state.sortDir = state.sortDir==='asc'?'desc':'asc'; sortDir.textContent = state.sortDir==='asc'?'↑':'↓'; render(); });

  document.addEventListener('click', (e)=>{
    const t = e.target; if (!(t instanceof HTMLElement)) return;
    const del = t.getAttribute('data-del');
    if (del){
      if (confirm('Delete this record?')){
        state.records = state.records.filter(r=> r.id !== del);
        save(state.records);
        render();
      }
      return;
    }
    const edt = t.getAttribute('data-edit');
    if (edt){
      const r = state.records.find(x=> x.id === edt);
      if (r){
        const params = new URLSearchParams(r).toString();
        window.location.href = `records.html?${params}`;
      }
    }
  });
}

function main(){
  state.records = load();
  wire();
  render();
}

main();
