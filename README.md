## Personal Website (Vue + Vite)

This site is now a Vue 3 single-page application using Vite.

### Stack

- Vue 3
- Vue Router (hash mode for GitHub Pages compatibility)
- Vite

### Local Development

```bash
npm install
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

### Deploy to GitHub Pages

Two deployment options are included:

1. Manual deploy script

```bash
npm run deploy
```

2. GitHub Actions workflow

Push to `main`, and [.github/workflows/deploy.yml](.github/workflows/deploy.yml) builds and deploys `dist/` with GitHub Pages Actions.

### GitHub Repository Settings

In your repository settings, set Pages to use **GitHub Actions** as the source.

