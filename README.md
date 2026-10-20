# Corey Ralston — Photography & Visual Storytelling

A responsive static portfolio featuring all 63 supplied images, a category filter, keyboard-accessible image viewer, original-image links, and a magazine cover PDF. Original photographs are retained; optimized WebP copies keep the gallery lighter. No packages, build step, external fonts, or API keys are needed.

## Local development

From the repository root:

```bash
python3 -m http.server 8000 --bind 0.0.0.0
```

Open the site with a browser through your local development tooling. Edit `index.html`, `styles.css`, and `script.js`. The gallery is included in the HTML so images remain accessible without JavaScript. `photos.json` records image titles, categories, source files, and dimensions; update the HTML cards and the original-file mapping in `script.js` together when changing the collection.

## GitHub Pages

GitHub Pages is configured to deploy from the `main` branch and `/` (root). Push changes to `main` to publish automatically. Under **Settings → Pages → Build and deployment**, keep **Deploy from a branch**, branch **main**, and folder **/ (root)**. The `.nojekyll` file enables direct static-file hosting.

Expected address after a successful deployment: `https://cor9.github.io/alacoreyportfolio/`.

Before publishing, verify gallery filters, lightbox arrows/Escape, all images, original-image links, the cover PDF, and mobile layout. Photo titles are descriptive labels, not assignment metadata. All rights reserved to the respective rights holders.
