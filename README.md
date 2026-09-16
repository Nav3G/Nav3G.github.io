# Portfolio site — setup & workflow

This is a static site built with **MkDocs** + the **Material** theme. You write plain Markdown files, it builds a full website. Math is written in LaTeX-style `\( ... \)` (inline) and `\[ ... \]` (display) and renders in-browser via MathJax.

## 1. Preview it locally

You'll need Python. From this folder:

```bash
pip install mkdocs mkdocs-material
mkdocs serve
```

Then open `http://127.0.0.1:8000` in a browser. It live-reloads as you edit files — leave `mkdocs serve` running while you write.

## 2. Where things live

```
docs/
  index.md                    <- homepage
  projects/
    index.md                  <- project table
    fm-superhet/
      index.md                <- project overview page
      log/
        2026-08-18.md          <- one file per dated entry
    discrete-lna/...
    mom-antenna-sim/...
  notes/
    index.md                  <- derivations library landing page
    example-derivation.md     <- template: delete once replaced
  assets/                     <- images, PDFs, data plots go here, one folder per project
```

**To add a new log entry:** create a new file in the project's `log/` folder named `YYYY-MM-DD.md` (or `YYYY-MM-DD-short-title.md` if you write more than one entry a day), and add a link to it from the project's `index.md`. Keep entries short — a few sentences, a photo, a data point. The rigor lives in `notes/`, not here.

**To add a photo or data plot:** drop the image file in `docs/assets/<project-name>/` and reference it with:

```markdown
<figure>
  <img src="../../../assets/fm-superhet/your-image.jpg" alt="describe it">
  <figcaption>Caption text.</figcaption>
</figure>
```

(Adjust the number of `../` depending on how deep the current file is — log entries are one level deeper than project index pages.)

**To add a derivation:** create a new file in `docs/notes/`, add it to the `nav:` list in `mkdocs.yml` and to `docs/notes/index.md`. If you already have a polished `.tex`/PDF version, put the compiled PDF in `docs/assets/<something>/` and link it at the top of the page (see `example-derivation.md` for the pattern) — write a short web version below it, you don't need to retype the whole thing.

**To link a derivation to a project:** just add a Markdown link in both directions — under "Related derivations" on the project page, and (optionally) a note at the top of the derivation page pointing back to the project.

## 3. Deploying (making it a real public site)

Easiest path is GitHub Pages, since MkDocs has a one-command deploy for it:

1. Create a new repo on GitHub (e.g. `portfolio`).
2. From this folder:
   ```bash
   git remote add origin https://github.com/<your-username>/portfolio.git
   git push -u origin main
   ```
3. Deploy:
   ```bash
   pip install ghp-import   # one-time
   mkdocs gh-deploy
   ```
   This builds the site and pushes it to a `gh-pages` branch, which GitHub Pages serves automatically. Your site will be live at `https://<your-username>.github.io/portfolio/`.
4. Any time you want to update the live site after editing: just run `mkdocs gh-deploy` again. (Your source content stays on `main`; only the built HTML goes to `gh-pages`.)

## 4. Day-to-day habit

- Log entries: write them close to when the work happens, even short ones. A logbook written retroactively loses most of its value.
- Commit as you go: `git add -A && git commit -m "log: LO buffer power-up"`. This repo *is* version-controlled history of the work, which is worth something on its own.
