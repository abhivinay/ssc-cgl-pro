import { BACKUP_FORMAT, isAppKey, validateEntries } from "./backupFormat";
import { STORAGE_EVENT, reportStorageError } from "./safeStorage";
let status = { phase: "connecting", message: "Connecting to saved progress…" };
const listeners = new Set();
export const getSyncStatus = () => status;
export const subscribeSync = listener => { listeners.add(listener); return () => listeners.delete(listener); };
const publish = value => { status = value; listeners.forEach(listener => listener()); };
export function collectEntries() {
  const entries = Object.create(null);
  for (let i = 0; i < localStorage.length; i++) { const key = localStorage.key(i); if (isAppKey(key)) entries[key] = localStorage.getItem(key); }
  return validateEntries(entries);
}
export const createBackup = () => ({ format: BACKUP_FORMAT, version: 1, createdAt: new Date().toISOString(), entries: collectEntries() });

export function applyEntries(entries) {
  const checked = validateEntries(entries);
  const before = collectEntries();
  try {
    // Clear only owned keys, never unrelated browser data. Roll back on quota errors.
    Object.keys(before).forEach(key => localStorage.removeItem(key));
    Object.entries(checked).forEach(([key, value]) => localStorage.setItem(key, value));
  } catch (error) {
    Object.keys(checked).forEach(key => localStorage.removeItem(key));
    Object.entries(before).forEach(([key, value]) => localStorage.setItem(key, value));
    reportStorageError(error);
    throw error;
  }
  window.dispatchEvent(new CustomEvent(STORAGE_EVENT, { detail: { key: "studyState" } }));
}

async function request(method = "GET", body) {
  const response = await fetch("/api/progress", { method, headers: { "Content-Type": "application/json" }, ...(body ? { body: JSON.stringify(body) } : {}), signal: AbortSignal.timeout(10000) });
  if (!response.ok) { const error = new Error(response.status === 409 ? "Another session has newer progress. Export this device's backup, then reload the server copy." : "Backend unavailable. Changes are cached on this device only. Start the server to save to disk."); error.status = response.status; throw error; }
  return response.json();
}

export async function loadServerCopy() {
  const server = await request();
  applyEntries(server.entries);
  localStorage.setItem("ssc-sync-revision", String(server.revision));
  localStorage.removeItem("ssc-sync-pending");
  window.location.reload();
}

export function startProgressSync() {
  let stopped = false, ready = false, busy = false, dirty = false, timer;
  let revision = Number(localStorage.getItem("ssc-sync-revision")) || 0;
  const fail = error => { ready = false; publish({ phase: error.status === 409 ? "conflict" : "offline", message: error.message }); };
  const save = async () => {
    if (!ready || stopped || busy) return;
    busy = true; dirty = false;
    try {
      const entries = collectEntries();
      publish({ phase: "saving", message: "Saving progress to disk…" });
      const server = await request("PUT", { entries, baseRevision: revision });
      if (stopped) return;
      revision = server.revision;
      localStorage.setItem("ssc-sync-revision", String(revision));
      if (!dirty) localStorage.removeItem("ssc-sync-pending");
      publish({ phase: "saved", message: "Saved to backend disk", savedAt: server.savedAt });
    } catch (error) { if (!stopped) fail(error); }
    finally { busy = false; if (dirty && ready && !stopped) timer = setTimeout(save, 500); }
  };
  const changed = event => {
    const key = event.detail?.key ?? event.key;
    if (key && !isAppKey(key)) return;
    dirty = true;
    localStorage.setItem("ssc-sync-pending", "1");
    clearTimeout(timer); timer = setTimeout(save, 600);
  };
  const connect = async () => {
    if (busy || stopped) return;
    try {
      const server = await request();
      if (stopped) return;
      const local = collectEntries();
      const pending = localStorage.getItem("ssc-sync-pending") === "1";
      if (server.revision && Object.keys(local).length && (revision !== server.revision && (pending || !revision))) {
        const error = new Error("Server and device progress differ. Export a backup before loading the server copy."); error.status = 409; throw error;
      }
      if (server.revision && !pending) applyEntries(server.entries);
      revision = server.revision;
      localStorage.setItem("ssc-sync-revision", String(revision));
      ready = true;
      if (!server.revision || pending) await save();
      else publish({ phase: "saved", message: "Saved to backend disk", savedAt: server.savedAt });
    } catch (error) { if (!stopped) fail(error); }
  };
  window.addEventListener(STORAGE_EVENT, changed);
  window.addEventListener("storage", changed);
  window.addEventListener("online", connect);
  window.addEventListener("ssc-sync-retry", connect);
  connect();
  return () => { stopped = true; clearTimeout(timer); window.removeEventListener(STORAGE_EVENT, changed); window.removeEventListener("storage", changed); window.removeEventListener("online", connect); window.removeEventListener("ssc-sync-retry", connect); };
}
