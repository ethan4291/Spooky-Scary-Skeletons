# Spooky Scary Skeletons — GitHub Pages site

Drop your full-screen background image as `static/bg.jpg` and your music as `static/music.mp3`.

To publish on GitHub Pages:

1. Create a new repository and push this folder.
2. In GitHub, go to Settings → Pages and choose the branch (usually main) and the root folder.

Files added:

- `index.html` — the site entry.
- `static/style.css` — styles.
- `static/script.js` — play/pause logic and fallback tone.
- `static/bg.svg` — SVG fallback background.
- `.nojekyll` — ensures GitHub Pages serves files as-is.

Flask (optional):

If you'd rather run this as a Python/Flask app locally or on a Python host, I added instructions below.

1. Create a virtual environment and install dependencies:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

2. Run the Flask app:

```bash
python3 app.py
# open http://127.0.0.1:5000
```

The Flask app serves `index.html` at `/` and static files from `/static/`.

GitHub Pages automatic deploy (optional):

- This repo includes a GitHub Actions workflow `.github/workflows/deploy.yml` which will automatically deploy the repository root to the `gh-pages` branch whenever you push to `main`.
- After the workflow runs, enable GitHub Pages in the repository Settings → Pages and select the `gh-pages` branch.

