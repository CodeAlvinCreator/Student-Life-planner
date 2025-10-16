// Regex catalog
// Title: no leading/trailing spaces, collapse doubles, and no immediate duplicate words (back-reference)
export const reNoEdgeSpace = /^\S(?:.*\S)?$/;
export const reDuplicateWord = /(\b(\w+)\b)\s+\1/i; // advanced: back-reference
// Duration (minutes) whole or decimal up to 2 places
export const reNumber = /^(0|[1-9]\d*)(\.\d{1,2})?$/;
// Date YYYY-MM-DD
export const reDate = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
// Tag letters, spaces, hyphens
export const reTag = /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/;

export function collapseSpaces(s){ return s.replace(/\s+/g,' ').trim(); }

export function validateTitle(s){
  const v = collapseSpaces(s);
  if (!reNoEdgeSpace.test(v)) return { ok:false, msg:'No leading/trailing spaces' };
  if (reDuplicateWord.test(v)) return { ok:false, msg:'Avoid duplicate words' };
  return { ok:true, val:v };
}

export function validateDuration(s){
  if (!reNumber.test(s)) return { ok:false, msg:'Invalid number' };
  return { ok:true, val:parseFloat(s) };
}

export function validateDate(s){
  if (!reDate.test(s)) return { ok:false, msg:'Invalid date' };
  return { ok:true, val:s };
}

export function validateTag(s){
  const v = collapseSpaces(s);
  if (!reTag.test(v)) return { ok:false, msg:'Letters, spaces, hyphens only' };
  return { ok:true, val:v };
}
