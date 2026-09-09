// Device-local storage. Never deletes unreadable data or claims cloud sync.
export const STORAGE_EVENT = "ssc-storage-changed";
export const STORAGE_ERROR_EVENT = "ssc-storage-error";
const RECOVERY_SUFFIX = ":recovery";

export function reportStorageError(error) {
  window.dispatchEvent(new CustomEvent(STORAGE_ERROR_EVENT, {
    detail: { message: error?.message || "Storage unavailable. Export a backup before closing this tab." },
  }));
}

export function readJSON(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    try { return JSON.parse(localStorage.getItem(key + RECOVERY_SUFFIX)) ?? fallback; }
    catch { return fallback; }
  }
}

export function writeJSON(key, value) {
  const serialized = JSON.stringify(value);
  try {
    const old = localStorage.getItem(key);
    if (old === serialized) return value;
    if (key === "studyState" && old) {
      let valid=true;
      try { JSON.parse(old); } catch { valid=false; }
      // If quarantine cannot be saved, fail the write rather than destroy evidence.
      if(!valid)localStorage.setItem(key+":corrupt",old);
      else {
        try { localStorage.setItem(key + RECOVERY_SUFFIX, old); }
        catch { /* The primary write below still reports quota failures. */ }
      }
    }
    localStorage.setItem(key, serialized);
    window.dispatchEvent(new CustomEvent(STORAGE_EVENT, { detail: { key } }));
    return value;
  } catch (error) {
    reportStorageError(error);
    throw error;
  }
}

export function subscribeStorage(listener) {
  window.addEventListener(STORAGE_EVENT, listener);
  window.addEventListener("storage", listener);
  return () => {
    window.removeEventListener(STORAGE_EVENT, listener);
    window.removeEventListener("storage", listener);
  };
}
