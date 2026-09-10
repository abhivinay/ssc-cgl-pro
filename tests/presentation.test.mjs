import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";

test("redesign preserves the exact authoritative 20,600-question corpus", () => {
  const bytes = readFileSync(
    new URL("../public/pyq-master/questions.json", import.meta.url),
  );
  assert.equal(JSON.parse(bytes).length, 20600);
  assert.equal(
    createHash("sha256").update(bytes).digest("hex"),
    "18607d969b6aa5dc6c5f5c0188295236fdc27acc4b3a6845e0f76fac59901000",
  );
});

test("shared text and action palette meets normal-text contrast", () => {
  const css = readFileSync(
    new URL("../src/styles/premium.css", import.meta.url),
    "utf8",
  );
  const tokens = Object.fromEntries(
    [...css.matchAll(/--([a-z]+):\s*(#[a-f0-9]{6})/gi)].map((match) => [
      match[1],
      match[2],
    ]),
  );
  const luminance = (hex) =>
    hex
      .slice(1)
      .match(/../g)
      .map((part) => parseInt(part, 16) / 255)
      .map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
      .reduce((sum, c, i) => sum + c * [0.2126, 0.7152, 0.0722][i], 0);
  const contrast = (a, b) => {
    const values = [luminance(a), luminance(b)].sort((x, y) => y - x);
    return (values[0] + 0.05) / (values[1] + 0.05);
  };
  for (const background of ["canvas", "surface", "raised"])
    for (const foreground of ["ink", "muted", "accent"])
      assert.ok(
        contrast(tokens[foreground], tokens[background]) >= 4.5,
        foreground + " on " + background,
      );
  assert.ok(
    contrast(tokens.canvas, tokens.accent) >= 4.5,
    "primary action text",
  );
});
