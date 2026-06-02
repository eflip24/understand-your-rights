Add the provided Google Analytics 4 tag (gtag.js) to the `<head>` of `index.html`, right after the existing Plausible and AdSense scripts. The tag ID is `G-BGE44XCLXQ`.

Change: insert these two tags in `<head>`:
1. `<script async src="https://www.googletagmanager.com/gtag/js?id=G-BGE44XCLXQ"></script>`
2. Inline `gtag('js', new Date())` and `gtag('config', 'G-BGE44XCLXQ')` initialization script.