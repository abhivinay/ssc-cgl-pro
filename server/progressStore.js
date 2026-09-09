import { existsSync, mkdirSync, readFileSync, writeFileSync, renameSync, copyFileSync, openSync, fsyncSync, closeSync } from "node:fs";
import { join } from "node:path";
import { validateEntries } from "../src/services/backupFormat.js";

export function createProgressStore(directory) {
  const file = join(directory, "progress.json");
  const previous = join(directory, "progress.previous.json");
  const read = () => {
    if (!existsSync(file)) return { revision: 0, entries: {} };
    const value = JSON.parse(readFileSync(file, "utf8"));
    if (!Number.isSafeInteger(value.revision) || value.revision < 0) throw new Error("Invalid progress revision. Restore progress.previous.json from a backup.");
    return { ...value, entries: validateEntries(value.entries) };
  };
  const write = (entries, baseRevision) => {
    const current = read();
    if (baseRevision !== current.revision) { const error = new Error("Progress changed in another session. Reload before saving."); error.status = 409; throw error; }
    const next = { revision: current.revision + 1, savedAt: new Date().toISOString(), entries: validateEntries(entries) };
    mkdirSync(directory, { recursive: true, mode: 0o700 });
    const temporary = join(directory, "progress.next.json");
    writeFileSync(temporary, JSON.stringify(next), { mode: 0o600 });
    const descriptor = openSync(temporary, "r");
    try {
      fsyncSync(descriptor);
    } catch (error) {
      // Some Windows filesystems and security tools reject fsync even after a
      // successful write. The atomic rename below remains the recovery guard.
      if (!["EPERM", "EINVAL", "ENOSYS"].includes(error?.code)) throw error;
    } finally { closeSync(descriptor); }
    if (existsSync(file)) copyFileSync(file, previous);
    renameSync(temporary, file);
    return next;
  };
  return { read, write };
}

export function installProgressRoutes(app, directory) {
  const store = createProgressStore(directory);
  app.get("/api/progress", (req, res) => {
    try { res.set("Cache-Control", "no-store").json(store.read()); }
    catch { res.status(503).json({ error: "Saved progress could not be read. The server file has not been overwritten. Restore a backup before continuing." }); }
  });
  app.put("/api/progress", (req, res) => {
    try { res.json(store.write(req.body?.entries, req.body?.baseRevision)); }
    catch (error) { res.status(error.status || 400).json({ error: error.message }); }
  });
}
