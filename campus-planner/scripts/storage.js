const KEY = 'clp:data:v1';
const KEY_SETTINGS = 'clp:settings:v1';

export function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
  } catch {
    return [];
  }
}

export function save(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function loadSettings() {
  try {
    return JSON.parse(localStorage.getItem(KEY_SETTINGS) || '{}');
  } catch {
    return {};
  }
}

export function saveSettings(s) {
  localStorage.setItem(KEY_SETTINGS, JSON.stringify(s));
}

export async function importJson(file) {
  const text = await file.text();
  let json;
  try { json = JSON.parse(text); } catch { throw new Error('Invalid JSON'); }
  if (!Array.isArray(json)) throw new Error('Expected an array of records');
  for (const r of json) {
    if (!r || typeof r !== 'object') throw new Error('Invalid record item');
    if (!r.id || !r.title || !r.duration || !r.tag || !r.dueDate) throw new Error('Missing fields');
  }
  save(json);
  return json;
}

export function exportJson(data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'campus-planner.json';
  a.click();
  URL.revokeObjectURL(url);
}
