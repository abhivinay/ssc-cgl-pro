import { useEffect, useState, useSyncExternalStore } from "react";
import {getSyncStatus,subscribeSync} from "../../services/progressSync";
import { STORAGE_ERROR_EVENT } from "../../services/safeStorage";
export default function StorageNotice() {
  const sync=useSyncExternalStore(subscribeSync,getSyncStatus,getSyncStatus);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const onError = event => setMessage(event.detail.message);
    window.addEventListener(STORAGE_ERROR_EVENT, onError);
    return () => window.removeEventListener(STORAGE_ERROR_EVENT, onError);
  }, []);
  const warning=message||(["offline","conflict"].includes(sync.phase)?sync.message:"");
  return warning ? <aside role="alert" className="storage-notice">{warning} <a href="/settings">Open data recovery</a></aside> : null;
}
