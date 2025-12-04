# Epinard

Serveur Express qui héberge automatiquement des applications vanilla JS/HTML et, si présent, une app Next.js.

## Prérequis
- Node.js 25.2.1
- npm

## Installation
```sh
npm install
```

## Démarrer le serveur
```sh
npm run dev
```
- Le serveur démarre sur http://localhost:3000
- Les apps vanilla situées dans [apps/vanilla](apps/vanilla) sont servies automatiquement sous un slug dérivé de leur nom de dossier via [`toSlug`](server/index.js).  
  Exemples :
  - [apps/vanilla/example-app](apps/vanilla/example-app) → http://localhost:3000/example-app
  - [apps/vanilla/example-app-2](apps/vanilla/example-app-2) → http://localhost:3000/example-app-2

Si une app Next.js existe dans [apps/next-app](apps/next-app), elle est utilisée comme app principale. Sinon, le serveur fonctionne en “vanilla-only”.

## Ajouter une app vanilla
1. Créez un dossier dans [apps/vanilla](apps/vanilla), par ex. `my app`.
2. Ajoutez au minimum un `index.html` (et opc. `style.css`, `script.js`, assets).
3. Accédez à l'app via l'URL slugifiée (espaces/accents retirés), ex. `my app` → http://localhost:3000/my-app.

## Scripts
- `npm run dev` / `npm start`: lance le serveur ([server/index.js](server/index.js)).
- `npm run build`: construit l'app Next.js si [apps/next-app](apps/next-app) existe.

## Structure
- [server/index.js](server/index.js) : Express + intégration Next.js, static pour les apps vanilla via [`createServer`](server/index.js).
- [apps/vanilla/example-app/index.html](apps/vanilla/example-app/index.html), [apps/vanilla/example-app/style.css](apps/vanilla/example-app/style.css)
- [apps/vanilla/example-app-2/index.html](apps/vanilla/example-app-2/index.html), [apps/vanilla/example-app-2/script.js](apps/vanilla/example-app-2/script.js)