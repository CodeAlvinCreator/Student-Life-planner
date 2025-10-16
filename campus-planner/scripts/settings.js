import { loadSettings, saveSettings } from './storage.js';

const settings = { capMinutes: 600, name: '', email: '', ...loadSettings() };

function init(){
  document.getElementById('year').textContent = new Date().getFullYear();

  // Cap
  const cap = document.getElementById('cap');
  cap.value = settings.capMinutes ?? '';
  document.getElementById('settings-form').addEventListener('submit', (e)=>{
    e.preventDefault();
    const v = Number(cap.value || 0);
    settings.capMinutes = Number.isFinite(v) ? v : 0;
    saveSettings(settings);
    const s = document.getElementById('settings-status');
    s.textContent = 'Settings saved';
    setTimeout(()=>s.textContent='', 1500);
  });

  const min = document.getElementById('conv-min');
  const out = document.getElementById('conv-hr');
  const update = ()=>{
    const v = Number(min.value || 0);
    const hr = (v/60).toFixed(2);
    out.textContent = `${hr} hours`;
  };
  min.addEventListener('input', update); update();
}

init();
