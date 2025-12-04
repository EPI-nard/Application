const express = require("express");
const path = require("path");
const fs = require("fs");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const NEXT_DIR = path.join(__dirname, "../apps/next-app");
const VANILLA_ROOT = path.join(__dirname, "../apps/vanilla");

function toSlug(name) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function createServer(nextHandle) {
  const server = express();

  if (fs.existsSync(VANILLA_ROOT)) {
    const entries = fs.readdirSync(VANILLA_ROOT, { withFileTypes: true });

    entries
      .filter((entry) => entry.isDirectory())
      .forEach((entry) => {
        const appFolderName = entry.name;
        const appPath = path.join(VANILLA_ROOT, appFolderName);
        const slug = toSlug(appFolderName);

        server.use(`/${slug}`, express.static(appPath));

        console.log(
          `✅ App vanilla "${appFolderName}" disponible sur /${slug}`
        );
      });
  } else {
    console.warn("❌ Dossier apps/vanilla introuvable :", VANILLA_ROOT);
  }

  server.use((req, res) => {
    if (nextHandle) {
      return nextHandle(req, res);
    }
    return res.status(404).send("Not Found");
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`🔥 Serveur lancé sur http://localhost:${port}`);
    if (!nextHandle) {
      console.log("➡️  Mode vanilla-only");
    }
  });
}

if (next && fs.existsSync(NEXT_DIR)) {
  const nextApp = next({ dev, dir: NEXT_DIR });

  nextApp
    .prepare()
    .then(() => {
      const handle = nextApp.getRequestHandler();
      console.log("✅ Next.js initialisé, utilisation comme app principale.");
      createServer(handle);
    })
    .catch((err) => {
      console.error(
        "❌ Erreur lors de l'initialisation de Next.js, vanilla-only :",
        err
      );
      createServer(null);
    });
} else {
  console.warn("❌ Aucune app Next trouvée, démarrage vanilla-only.");
  createServer(null);
}