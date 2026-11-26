import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// One Star for Monday — the line this entry submits.
const REVIEW =
  "Booked the weekend, got seated here by force. Cold coffee, endless gruel, and the waiter says Friday's 'not available.' One star, never returning.";

// Gate self-check: UTF-8 text, 1..180 characters, not only white space, <= 25 words.
const chars = [...REVIEW].length;
const words = REVIEW.trim().split(/\s+/).length;
if (chars < 1 || chars > 180) throw new Error(`gate: ${chars} characters, cap 180`);
if (words > 25) throw new Error(`gate: ${words} words, cap 25`);
if (REVIEW.trim().length === 0) throw new Error("gate: entry is only white space");

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", REVIEW, "utf8");

// Read back and confirm the exact bytes landed.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== REVIEW) throw new Error("read-back mismatch: /output/entry.txt differs from REVIEW");

