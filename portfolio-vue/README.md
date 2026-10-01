# Personal Portfolio (Vue 3 + Vite)

Matthew Neo Adriaanse's portfolio, rebuilt as a Vue 3 single-page app.

## Run it
```bash
npm install
npm run dev      # local dev server
npm run build    # production build in dist/
```

## Edit content
All text, links, projects and skills live in `src/data.js`.
To add a project, add an object to the `projects` array.

## Deploy
Push to GitHub, then either upload `dist/` to Netlify or use GitHub Pages
(the build uses relative paths, so it works under any repo name).
