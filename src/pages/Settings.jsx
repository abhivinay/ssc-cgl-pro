import { useState, useSyncExternalStore } from "react";
import { Link } from "react-router-dom";
import { createBackup, applyEntries, getSyncStatus, subscribeSync, loadServerCopy } from "../services/progressSync";
import { parseBackup } from "../services/backupFormat";
import Button from "../components/ui/Button";

function downloadBackup() {
  const url = URL.createObjectURL(new Blob([JSON.stringify(createBackup(), null, 2)], { type: "application/json" }));
  const anchor = document.createElement("a"); anchor.href = url; anchor.download = `ssc-sentinel-${new Date().toISOString().slice(0, 10)}.json`; anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function Settings() {
  const sync = useSyncExternalStore(subscribeSync, getSyncStatus, getSyncStatus);
  const [backup, setBackup] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inspect = async event => {
    setError(""); setBackup(null);
    try { const file = event.target.files?.[0]; if (!file) return; if (file.size > 15 * 1024 * 1024) throw new Error("Choose a backup smaller than 15 MB."); setBackup(parseBackup(await file.text())); }
    catch (reason) { setError(reason.message); }
    event.target.value = "";
  };
  return <div className="max-w-3xl mx-auto space-y-6"><Link to="/dashboard" className="text-cyan-200">Back to Command Center</Link><header><p className="eyebrow">Your preparation, protected</p><h1 className="text-3xl font-bold mt-3">Data & recovery</h1></header>
    <section className="card p-6 space-y-4"><h2 className="text-xl font-semibold">Save status</h2><p role="status">{sync.message}</p>{sync.savedAt && <p className="text-zinc-400">Last saved: {new Date(sync.savedAt).toLocaleString()}</p>}<p className="text-sm text-zinc-400">The backend keeps progress on its disk, plus a previous snapshot. Browser data is a working cache. This is not cloud or cross-device sync; keep an exported backup outside this computer.</p><Button variant="secondary" onClick={() => window.dispatchEvent(new Event("ssc-sync-retry"))}>Reconnect server</Button></section>
    <section className="card p-6 space-y-4"><h2 className="text-xl font-semibold">Export a backup</h2><p>Includes progress, notes, test attempts, brain sessions, review records and rewards. PDFs and API keys are not included.</p><Button onClick={() => { try { downloadBackup(); } catch (reason) { setError(reason.message); } }}>Download backup</Button></section>
    <section className="card p-6 space-y-4"><h2 className="text-xl font-semibold">Restore a backup</h2><p>Inspect a backup first. Confirming replaces this device's app data; a backup of the current data downloads before replacement.</p><label className="block">Choose Sentinel backup<input className="block mt-3 max-w-full" type="file" accept=".json,application/json" onChange={inspect}/></label>{backup && <div className="space-y-3"><p>{Object.keys(backup.entries).length} entries · created {backup.createdAt || "unknown"}</p><Button variant="danger" onClick={() => { try { downloadBackup(); applyEntries(backup.entries); localStorage.setItem("ssc-sync-pending", "1"); window.location.reload(); } catch (reason) { setError(reason.message); } }}>Back up current data & restore</Button><Button variant="secondary" onClick={() => setBackup(null)}>Cancel</Button></div>}</section>
    {sync.phase === "conflict" && <section className="card p-6 space-y-4"><h2 className="text-xl font-semibold">Resolve save conflict</h2><p>Neither copy has been overwritten. Download this device's backup before replacing it with the server copy.</p><Button loading={loading} onClick={async () => { setLoading(true); try { downloadBackup(); await loadServerCopy(); } catch (reason) { setError(reason.message); setLoading(false); } }}>Back up device & load server copy</Button></section>}
    {error && <p role="alert" className="text-rose-300">{error}</p>}
  </div>;
}
