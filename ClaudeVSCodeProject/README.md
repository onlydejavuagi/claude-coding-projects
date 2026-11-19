# Daybook: Journal & To-Do

A minimal journal and to-do list web app. It's built with vanilla JavaScript and uses [Vite](https://vite.dev) as its dev server.

## Run it

```bash
npm install
npm run dev      # opens at http://localhost:5173
```

> **Windows PowerShell error "running scripts is disabled on this system"?** Either run
> `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` once, or use `npm.cmd` in place of `npm`
> (e.g. `npm.cmd run dev`).

`npm run build` writes a static production build to `dist/`, and `npm run preview` serves that build.

## Features

- **Journal** (`#/journal`): write entries with an optional title. Entries are dated and shown newest first, and you can delete them.
- **To-Do** (`#/todo`): add tasks, check them off and delete them. You can filter by All, Open or Done.
- **Navigation**: hash-based routing in the top bar, so the back button and bookmarks work.
- **Persistence**: data is stored in your browser's `localStorage` under `daybook.journal` and `daybook.todos`. It stays in that browser only.

## Structure

```
index.html            app shell + top nav
src/
  main.js             hash router: maps #/journal and #/todo to views
  store.js            localStorage load/save helpers + id generator
  style.css           theme tokens and component styles
  views/
    journal.js        journal view
    todo.js           to-do view
```

To add a section, create `src/views/<name>.js` that exports a `render<Name>(root)` function. Then register it in `routes` in `main.js` and add a nav link in `index.html`.
