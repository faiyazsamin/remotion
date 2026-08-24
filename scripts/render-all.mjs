/**
 * Renders every composition in the project to `out/`.
 *
 * The CLI has no render-all, and looping `remotion render` re-bundles the project
 * and launches a fresh browser for each one. This bundles once and reuses that
 * bundle for all of them, which is most of the wall-clock saving.
 *
 *   node scripts/render-all.mjs                 # everything
 *   node scripts/render-all.mjs FeatureSharkHome ChangelogScene
 *                                               # only ids matching those terms
 *   CONCURRENCY=4 node scripts/render-all.mjs   # override per-render threads
 */

import { bundle } from "@remotion/bundler";
import { getCompositions, renderMedia } from "@remotion/renderer";
import { mkdir } from "node:fs/promises";
import { join, resolve } from "node:path";

const OUT_DIR = "out";
const ENTRY = join("src", "index.ts");
/** Matches the studio's own default, and what the scenes were designed for. */
const CODEC = "h264";

const filters = process.argv.slice(2);
const concurrency = process.env.CONCURRENCY
  ? Number(process.env.CONCURRENCY)
  : null;

const seconds = (ms) => `${(ms / 1000).toFixed(1)}s`;

const started = Date.now();

await mkdir(OUT_DIR, { recursive: true });

process.stdout.write("Bundling... ");
const serveUrl = await bundle({
  entryPoint: ENTRY,
  /*
    Kept out of the way of `remotion bundle`'s own output. Webpack requires an
    absolute path here.
  */
  outDir: resolve("node_modules", ".cache", "render-all"),
});
process.stdout.write(`done (${seconds(Date.now() - started)})\n`);

const all = await getCompositions(serveUrl);
const compositions = filters.length
  ? all.filter((composition) =>
      filters.some((filter) =>
        composition.id.toLowerCase().includes(filter.toLowerCase()),
      ),
    )
  : all;

if (compositions.length === 0) {
  console.error(
    `No composition matched ${filters.join(", ")}.\nAvailable: ${all
      .map((composition) => composition.id)
      .join(", ")}`,
  );
  process.exit(1);
}

const totalFrames = compositions.reduce(
  (sum, composition) => sum + composition.durationInFrames,
  0,
);
console.log(
  `Rendering ${compositions.length} composition(s), ${totalFrames} frames total\n`,
);

const failures = [];

for (const [index, composition] of compositions.entries()) {
  const label = `[${index + 1}/${compositions.length}] ${composition.id}`;
  const outputLocation = join(OUT_DIR, `${composition.id}.mp4`);
  const at = Date.now();
  let lastShown = -1;

  try {
    await renderMedia({
      serveUrl,
      composition,
      codec: CODEC,
      outputLocation,
      ...(concurrency ? { concurrency } : {}),
      onProgress: ({ progress }) => {
        const percent = Math.floor(progress * 100);

        /* Every 5% — a per-frame line would bury the summary in CI logs. */
        if (percent >= lastShown + 5) {
          lastShown = percent;
          process.stdout.write(`\r${label} ${percent}%   `);
        }
      },
    });

    process.stdout.write(
      `\r${label} done in ${seconds(Date.now() - at)} → ${outputLocation}\n`,
    );
  } catch (error) {
    /* One bad composition should not cost the whole batch. */
    process.stdout.write(`\r${label} FAILED\n`);
    console.error(`  ${error instanceof Error ? error.message : error}\n`);
    failures.push(composition.id);
  }
}

console.log(`\nFinished in ${seconds(Date.now() - started)}`);

if (failures.length) {
  console.error(`Failed: ${failures.join(", ")}`);
  process.exit(1);
}
