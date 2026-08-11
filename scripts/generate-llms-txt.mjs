// Pre-build step: regenerates public/llms.txt from the same source-of-truth
// constants used by the React app (src/utils/constant.js, src/data/pricing.js),
// so contact info, links, and pricing can't silently drift out of sync between
// the two.
import {createServer} from "vite";
import {writeFile} from "node:fs/promises";
import {fileURLToPath} from "node:url";
import path from "node:path";

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

async function main() {
  const server = await createServer({
    root: rootDir,
    server: {middlewareMode: true},
    appType: "custom",
  });

  let content;
  try {
    const {CONTACT_EMAIL, INSTAGRAM, TIKTOK, LINKEDIN, ORDINE_REGISTRATION} =
      await server.ssrLoadModule("/src/utils/constant.js");
    const {pricing} = await server.ssrLoadModule("/src/data/pricing.js");
    const paidPlan = pricing.plans.find((plan) => plan.price > 0);

    content = `# The Mindful Cookie

> Alice Ciani è una Dietista Nutrizionista italiana specializzata in mindful eating e intuitive eating. Offre percorsi nutrizionali online, non prescrittivi, senza diete restrittive.

## Chi è Alice Ciani

- Dietista Nutrizionista, ${ORDINE_REGISTRATION}
- Laurea magistrale in Scienze della nutrizione umana - Università degli Studi di Milano (2021)
- Laurea triennale in Dietistica - Università degli Studi di Milano (2019)
- Laurea triennale in Scienze e tecniche psicologiche - Università degli Studi di Pavia (2016)
- Approccio basato sui principi di mindful eating e intuitive eating, senza diete restrittive

## Contatti e profili verificabili

- Sito: https://themindfulcookie.com/
- LinkedIn: ${LINKEDIN}
- Instagram: ${INSTAGRAM}
- TikTok: ${TIKTOK}
- Email: ${CONTACT_EMAIL}

## Servizi

- Chiamata conoscitiva gratuita (15 minuti)
- Percorso personalizzato di mindful eating, 50 minuti per consulenza, online via Google Meet, ${paidPlan.price} EUR a incontro

## Note

I disturbi alimentari richiedono un trattamento multidisciplinare: il percorso non sostituisce un supporto psicologico e viene offerto in affiancamento a terapeuti quando necessario. Il percorso non prevede il rilascio di diete ed è riservato ai maggiorenni.
`;
  } finally {
    await server.close();
  }

  const outPath = path.join(rootDir, "public", "llms.txt");
  await writeFile(outPath, content);
  console.log(`Generated ${path.relative(rootDir, outPath)}`);
}

main().catch((err) => {
  console.error("llms.txt generation failed:", err);
  process.exit(1);
});
