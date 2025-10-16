import { validateTitle, validateDate, validateDuration, validateTag } from './validators.js';
import { load, save } from './storage.js';

function nowIso(){ return new Date().toISOString(); }
function nextId(){ return 'rec_' + Math.random().toString(36).slice(2,8); }

function wire(){
  document.getElementById('year').textContent = new Date().getFullYear();

  const inlineForm = document.getElementById('record-form-inline');
  if (inlineForm){
    inlineForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const id = document.getElementById('i-rec-id').value || nextId();
      const title = document.getElementById('i-title').value;
      const tag = document.getElementById('i-tag').value;
      const dueDate = document.getElementById('i-dueDate').value;
      const duration = document.getElementById('i-duration').value;
      const status = document.getElementById('i-status').value;

      const vTitle = validateTitle(title); document.getElementById('i-err-title').textContent = vTitle.ok?'':vTitle.msg;
      const vDate = validateDate(dueDate); document.getElementById('i-err-date').textContent = vDate.ok?'':vDate.msg;
      const vDur = validateDuration(duration); document.getElementById('i-err-duration').textContent = vDur.ok?'':vDur.msg;
      const vTag = validateTag(tag); document.getElementById('i-err-tag').textContent = vTag.ok?'':vTag.msg;
      if (!vTitle.ok || !vDate.ok || !vDur.ok || !vTag.ok) return;

      const arr = load();
      const ts = nowIso();
      const idx = arr.findIndex(r=> r.id === id);
      const rec = { id, title: vTitle.val, tag: vTag.val, dueDate: vDate.val, duration: Number(vDur.val ?? vDur), status, updatedAt: ts };
      if (idx >= 0) arr[idx] = { ...arr[idx], ...rec };
      else arr.unshift({ ...rec, createdAt: ts });
      save(arr);

      inlineForm.reset();
      const msg = document.getElementById('save-status');
      if (msg){ msg.textContent = 'Saved'; setTimeout(()=> msg.textContent='', 800); }
      // Redirect to View Records page so user can see the list
      window.location.href = 'view-records.html';
    });
  }
}

function main(){
  wire();
}

main();
