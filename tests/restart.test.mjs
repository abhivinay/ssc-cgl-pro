import test from "node:test";
import assert from "node:assert/strict";
import { fork } from "node:child_process";
import { once } from "node:events";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

test("backend process restart preserves study progress, PYQ answers and recovery on disk", { timeout: 30000 }, async () => {
  const directory = mkdtempSync(join(tmpdir(), "ssc-restart-"));
  let child;
  const stop = async () => {
    if (!child || child.exitCode !== null) return;
    const exited = once(child, "exit");
    child.kill();
    await exited;
  };
  const start = async () => {
    child = fork(new URL("./fixtures/progress-server.mjs", import.meta.url), [], {
      env: { ...process.env, SSC_DATA_DIR: directory, GEMINI_API_KEY: "", GEMINI_MODEL: "" },
      stdio: ["ignore", "ignore", "inherit", "ipc"],
      windowsHide: true,
    });
    const [message] = await once(child, "message", { signal: AbortSignal.timeout(10000) });
    return `http://127.0.0.1:${message.port}/api/progress`;
  };
  const save = async (url, entries, baseRevision) => {
    const response = await fetch(url, {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ entries, baseRevision }), signal: AbortSignal.timeout(5000),
    });
    assert.equal(response.status, 200);
    return response.json();
  };
  try {
    let url = await start();
    const original = {
      studyState: JSON.stringify({ xp: 120, topics: [{ id: "quant-1", completed: true }] }),
      "ssc-pyq-attempts": JSON.stringify({ "fixture-question": { choice: "A", correct: true } }),
      "ssc-pyq-position": JSON.stringify({ subject: "Quant", year: "2024", index: 3 }),
      "ssc-content-studio-review": JSON.stringify([{ id: "fixture-question", questionText: "Synthetic question" }]),
    };
    const first = await save(url, original, 0);
    const updated = { ...original, studyState: JSON.stringify({ xp: 140, topics: [{ id: "quant-1", completed: true }] }) };
    const second = await save(url, updated, first.revision);
    await stop();
    assert.deepEqual(JSON.parse(readFileSync(join(directory, "progress.json"), "utf8")), second);
    assert.deepEqual(JSON.parse(readFileSync(join(directory, "progress.previous.json"), "utf8")), first);

    url = await start();
    const restored = await (await fetch(url, { signal: AbortSignal.timeout(5000) })).json();
    assert.deepEqual(restored, second);
    const third = await save(url, restored.entries, restored.revision);
    assert.equal(third.revision, 3);
    assert.deepEqual(third.entries, updated);
    assert.deepEqual(JSON.parse(readFileSync(join(directory, "progress.previous.json"), "utf8")), second);
  } finally {
    await stop();
    // Only this test's freshly allocated temporary directory is removed.
    rmSync(directory, { recursive: true, force: true });
  }
});
