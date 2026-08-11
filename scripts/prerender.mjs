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
    // Give the last whileInView/animation effects a tick to attach.
    await new Promise((resolve) => setTimeout(resolve, 300));

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
  console.error("Prerender failed:", err);
  process.exit(1);
});
