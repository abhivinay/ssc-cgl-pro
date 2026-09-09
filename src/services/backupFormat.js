export const BACKUP_FORMAT = "ssc-sentinel-backup";
export const isAppKey = key => /^(ssc[-A-Z][\w:.-]*|studyState|studyStreak|bestStreak|lastStudyDate)$/.test(key) && !key.startsWith("ssc-sync-") && !key.endsWith(":recovery");

export function validateEntries(entries) {
  if (!entries || typeof entries !== "object" || Array.isArray(entries)) throw new Error("Backup entries must be an object.");
  if (Object.keys(entries).length > 2000) throw new Error("Backup has too many entries.");
  const checked = Object.create(null);
  for (const [key, value] of Object.entries(entries)) {
    if (!isAppKey(key) || key.length > 2048 || typeof value !== "string") throw new Error(`Unsupported backup entry: ${key}`);
    if (key === "studyState") {
      let study;
      try { study = JSON.parse(value); } catch { throw new Error("Invalid study progress in backup."); }
      if (!study || typeof study !== "object" || Array.isArray(study)) throw new Error("Invalid study progress in backup.");
    }
    checked[key] = value;
  }
  if (JSON.stringify(checked).length > 10 * 1024 * 1024) throw new Error("Backup exceeds the 10 MB limit.");
  return checked;
}

export function parseBackup(text) {
  const backup = JSON.parse(text);
  if (backup?.format !== BACKUP_FORMAT || backup.version !== 1) throw new Error("Unsupported backup format or version.");
  return { ...backup, entries: validateEntries(backup.entries) };
}
