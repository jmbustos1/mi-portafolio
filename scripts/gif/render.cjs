// Renderiza una escena HTML con draw(t) cuadro a cuadro y la codifica como GIF y PNG fijo.
//   NODE_PATH=<carpeta con playwright>/node_modules node scripts/gif/render.cjs <escena.html> <salida.gif> <salida.png> [t_png]
const { chromium } = require("playwright");
const { execFileSync } = require("child_process");
const fs = require("fs"), os = require("os"), path = require("path");

const [scene, gif, png, posterAt = "15.5"] = process.argv.slice(2);
const FPS = 25; // Los GIF guardan el tiempo en centésimas: 25 fps es exacto y fluido.

(async () => {
  const dir = fs.mkdtempSync(path.join(process.env.TMPDIR || os.tmpdir(), "gif-"));
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 960, height: 540 } });
  await page.goto("file://" + path.resolve(scene));
  await page.evaluate(() => document.fonts.ready);
  const total = await page.evaluate(() => window.T);
  const frames = Math.round(total * FPS);
  for (let i = 0; i < frames; i++) {
    await page.evaluate((t) => window.draw(t), i / FPS);
    await page.screenshot({ path: path.join(dir, `f${String(i).padStart(4, "0")}.png`) });
  }
  await page.evaluate((t) => window.draw(t), Number(posterAt));
  await page.screenshot({ path: png });
  await browser.close();
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-framerate", String(FPS), "-i", path.join(dir, "f%04d.png"),
    "-filter_complex", "split[a][b];[a]palettegen=max_colors=64:stats_mode=full[p];[b][p]paletteuse=dither=none:diff_mode=rectangle",
    "-loop", "0", gif]);
  fs.rmSync(dir, { recursive: true });
  console.log(`${frames} cuadros, ${(fs.statSync(gif).size / 1e6).toFixed(2)} MB`);
})();
