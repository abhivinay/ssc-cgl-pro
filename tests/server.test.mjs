import test, { after } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {get} from "node:http";
process.env.SSC_DATA_DIR = mkdtempSync(join(tmpdir(), "ssc-http-test-"));
process.env.GEMINI_API_KEY = "";
const { default: app } = await import("../server.js");
const server = await new Promise(resolve => { const listening = app.listen(0, "127.0.0.1", () => resolve(listening)); });
const base = `http://127.0.0.1:${server.address().port}`;
after(() => new Promise(resolve => server.close(resolve)));

test("backend starts without an extraction API key", async () => {
  const response = await fetch(`${base}/api/health`);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true, extractionConfigured: false });
});
test("foreign origins and rebinding hosts cannot read progress", async () => {
  assert.equal((await fetch(`${base}/api/progress`, { headers: { Origin: "https://untrusted.example" } })).status, 403);
  const hostStatus=await new Promise((resolve,reject)=>get(`${base}/api/progress`,{headers:{Host:"untrusted.example"}},response=>{response.resume();resolve(response.statusCode);}).on("error",reject));
  assert.equal(hostStatus,403);
});
test("HTTP progress saves and stale revisions return conflict", async () => {
  const snapshot = await (await fetch(`${base}/api/progress`)).json();
  const options = { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ baseRevision: snapshot.revision, entries: { studyState: '{"xp":12}' } }) };
  assert.equal((await fetch(`${base}/api/progress`, options)).status, 200);
  assert.equal((await fetch(`${base}/api/progress`, options)).status, 409);
  assert.equal((await (await fetch(`${base}/api/progress`)).json()).entries.studyState, '{"xp":12}');
});
test("unconfigured extraction returns a non-retryable error", async () => {
  const response = await fetch(`${base}/api/extract-pdf`, { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" });
  assert.equal(response.status, 503); assert.equal((await response.json()).retryable, false);
});

test("malformed JSON reaches the Express error handler without changing saved progress", async () => {
  const before = await (await fetch(`${base}/api/progress`)).json();
  const response = await fetch(`${base}/api/progress`, {
    method: "PUT", headers: { "Content-Type": "application/json" }, body: "{broken",
  });
  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), { error: "Invalid JSON request", retryable: false });
  assert.deepEqual(await (await fetch(`${base}/api/progress`)).json(), before);
});
