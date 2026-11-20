# JN Inter College website demo

Open `index.html` in a modern browser. The page uses HTML, CSS and JavaScript and needs no build step. The 3D enhancement loads the pinned Three.js browser module on demand from jsDelivr; an internet connection is required for the real-time scenes. Without WebGL or network access, the rest of the site stays available with its local campus illustration and photo fallbacks.

## Edit school details

Update `site-config.js` with confirmed school name, address, phone, email and year. Unknown details are intentionally blank and remain visibly marked as placeholders. Replace the illustrative photos in `index.html` with school-owned images before publishing. Do not treat the sample events, facilities or content as verified school facts.

## Demo interactions

- Hindi is the default; the EN / हि control switches all visible copy and remembers the choice.
- Gallery category filters, photo lightbox and arrow-key navigation work locally.
- The enquiry form validates in the browser and displays a local demo confirmation only. It does not send data.
- The hero builds a real-time Three.js campus scene with a globe, books, graduation cap, science glassware and dimensional JN medallion. Scroll to the campus-map concept and select its markers to focus illustrative campus zones. Three.js is pinned to 0.187.0 and imported from the jsDelivr CDN only when a scene approaches the viewport.
- The 3D scenes load only near the viewport, use low-power WebGL settings, and respect reduced-motion preferences. The map is an illustrative concept, not an actual campus plan.
- Remote Unsplash photography is used for the preview. If an image fails, it falls back to `assets/image-fallback.svg`.

Designed & developed by AP Creative Studio.

## Netlify deployment

This folder is ready to deploy as a static site. `netlify.toml` sets the publish directory to this folder, so no build command, package install or server function is needed. Deploy this folder as the site root. Keep `index.html`, `netlify.toml`, `scene3d.js`, `script.js`, `site-config.js`, `style.css` and `assets/` together. The 3D scenes and remote photography/fonts need an internet connection; local SVG fallbacks keep the page populated if those external resources are unavailable.
