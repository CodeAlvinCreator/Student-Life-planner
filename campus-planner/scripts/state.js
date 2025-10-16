import { load, save, loadSettings, saveSettings } from './storage.js';

export const state = {
  records: [],
  sortBy: 'dueDate',
  sortDir: 'asc',
  re: null,
  settings: { capMinutes: 600, name: '', email: '', ...loadSettings() }
};

export function initState(seed=[]) {
  const data = load();
  state.records = Array.isArray(data) && data.length ? data : seed;
  persist();
}

export function persist() {
  save(state.records);
  saveSettings(state.settings);
}

function nowIso() { return new Date().toISOString(); }
function nextId() { return 'rec_' + Math.random().toString(36).slice(2,8); }

export function upsert(rec) {
  const idx = state.records.findIndex(r => r.id === rec.id);
  const ts = nowIso();
  if (idx >= 0) {
    state.records[idx] = { ...state.records[idx], ...rec, status: rec.status || state.records[idx].status || 'Pending', updatedAt: ts };
  } else {
    state.records.unshift({ ...rec, id: nextId(), status: rec.status || 'Pending', createdAt: ts, updatedAt: ts });
  }
  persist();
}

export function remove(id) {
  state.records = state.records.filter(r => r.id !== id);
  persist();
}

export function setSort(by, dir) {
  state.sortBy = by; state.sortDir = dir; persist();
}

export function setRegex(re) { state.re = re; }

export function setCapMinutes(mins) { state.settings.capMinutes = mins; persist(); }
