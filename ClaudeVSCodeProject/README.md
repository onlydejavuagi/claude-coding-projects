# Daybook: Journal & To-Do

A minimal journal and to-do list app in a single file, [`daybook.html`](daybook.html).

## Run it

Double-click `daybook.html`, or drag it into a browser window. There's nothing to install.

## Features

- **Journal** (`#/journal`): write entries with an optional title. Entries are dated and shown newest first, and you can delete them.
- **To-Do** (`#/todo`): add tasks, check them off and delete them. You can filter by All, Open or Done.
- **Navigation**: the top bar switches between the two sections. Each section has its own address, so the back button and bookmarks work.
- **Saving**: data is stored in your browser's `localStorage` under `daybook.journal` and `daybook.todos`. It stays in that browser on that computer only. Clearing your browser data erases it.

## How the code is organized

Everything is in `daybook.html`: a `<style>` block, the page shell, and one `<script>` with four parts:

1. **Storage**: `load()` / `save()` helpers around `localStorage`
2. **Journal view**: `renderJournal(root)`
3. **To-Do view**: `renderTodo(root)`
4. **Router**: maps `#/journal` and `#/todo` to their view functions

To add a section, write a `render<Name>(root)` function and add it to `routes`. Then add a matching `<a href="#/<name>" data-route="<name>">` link in the top bar.
