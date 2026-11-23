// judge-smile-20261124 — writes one warm line about a small good thing
// that happened today to /output/entry.txt.
//
// The line itself lives in entry.txt next to this script. This program only
// carries it to the output directory, so the wording stays exactly as
// written, byte for byte.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.txt");
const text = readFileSync(source, "utf8");

// The gate: 1 to 200 characters, not only whitespace.
const chars = [...text].length;
if (chars < 1 || chars > 200 || text.trim().length === 0) {
  console.error(`error: entry must be 1-200 characters, got ${chars}`);
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, text, "utf8");

// Read it back so a silent partial write can never pass unnoticed.
const written = readFileSync(outPath, "utf8");
if (written !== text) {
  console.error("error: output does not match entry.txt");
  process.exit(1);
}
console.log(`wrote ${chars} characters to ${outPath}`);
