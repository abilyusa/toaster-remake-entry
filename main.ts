// The Funniest Toaster Error Message — one line, at most 120 characters.
// The toaster aborts the job on deadpan legal grounds: the bread has
// retained counsel, so the appliance declines to proceed.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE = "ERROR: Toasting aborted. The bread has retained counsel.";

// Gate from the competition rules: /output/entry.txt must be UTF-8 text
// of 1 to 120 characters (code points), a single line, not only white space.
const chars = [...LINE].length;
if (chars < 1 || chars > 120 || LINE.includes("\n") || !LINE.trim()) {
  throw new Error(`entry violates the 1-120 character single-line gate: ${chars} chars`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE + "\n", "utf8");

// Read back what was written: the file must hold exactly the gated line.
const written = readFileSync(outPath, "utf8");
if (written !== LINE + "\n") {
  throw new Error("entry.txt does not match the gated line");
}
