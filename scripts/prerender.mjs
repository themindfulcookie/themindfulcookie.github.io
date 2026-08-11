// Post-build step: renders the built SPA in a real browser and writes the
// fully-mounted DOM back into dist/index.html, so crawlers that don't execute
// JS (or execute it unreliably) still see the actual page text, meta tags,
// and JSON-LD instead of an empty <div id="root">.
import {preview} from "vite";
import puppeteer from "puppeteer";
import {writeFile} from "node:fs/promises";
import {fileURLToPath} from "node:url";
import path from "node:path";

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

async function main() {
  const server = await preview({
    root: rootDir,
    preview: {port: 4173, strictPort: true},
  });
  const url = server.resolvedUrls.local[0];

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  try {
    const page = await browser.newPage();
    await page.goto(url, {waitUntil: "networkidle0"});

    // whileInView animations only fire once their element intersects the
    // viewport, so scroll the full page in small steps to trigger every
    // section's IntersectionObserver before capturing the DOM.
    const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
    const viewportHeight = page.viewport().height;
    for (let y = 0; y < scrollHeight; y += Math.round(viewportHeight * 0.75)) {
      await page.evaluate((offset) => window.scrollTo(0, offset), y);
      await new Promise((resolve) => setTimeout(resolve, 120));
    }
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    // Give the last whileInView/animation effects a tick to attach and run.
    await new Promise((resolve) => setTimeout(resolve, 400));

    // WAAPI's fill:'forwards' keeps the animated result on screen but never
    // writes it back to the inline style attribute, so page.content() would
    // otherwise still serialize each element's pre-animation `initial` state
    // (e.g. opacity:0). Commit each animation's computed result to the
    // element's inline style before serializing so non-JS clients see the
    // settled state instead of a blank page.
    await page.evaluate(() => {
      for (const anim of document.getAnimations()) {
        try {
          anim.commitStyles();
        } catch {
          // Animation may already be finished/discarded; nothing to commit.
        }
        anim.cancel();
      }
    });
    await page.evaluate(() => window.scrollTo(0, 0));

    const html = await page.content();
    const outPath = path.join(rootDir, "dist", "index.html");
    await writeFile(outPath, html);
    console.log(`Prerendered ${url} -> ${path.relative(rootDir, outPath)} (${html.length} bytes)`);
  } finally {
    await browser.close();
    await new Promise((resolve, reject) => {
      server.httpServer.close((err) => (err ? reject(err) : resolve()));
    });
  }
}

main().catch((err) => {
  // Best-effort: if headless Chromium can't launch or render on this CI
  // runner, ship the plain Vite-built dist/index.html rather than blocking
  // every deploy on a browser-automation failure.
  console.error("Prerender failed, deploying without prerendered HTML:", err);
});
