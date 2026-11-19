# Daybook: Journal & To-Do

A minimal journal and to-do list app in a single file, [`daybook.html`](daybook.html).

## Run it

Double-click `daybook.html`, or drag it into a browser window. There's nothing to install.

## Features

### Journal (`#/journal`)

- **Log entries** with a title, a date (backdating is allowed) and the main text.
- **Mood** (Awful, Low, Okay, Good or Great) and **energy** (1–5) pickers. Click a selected one again to clear it.
- **"Grateful for"**: an optional one-line prompt for something good in your day.
- **Tags**: type a tag and press Enter or a comma. Backspace in the empty field removes the last tag.
- **Drafts autosave** as you type and are restored when you come back. Press **Ctrl/Cmd + Enter** to save the entry.
- **Edit** any entry. Press **Esc** to cancel editing. **Delete** shows an **Undo** button.
- **Insights**: your writing streak, total entries, average mood over the last 7 days, and a 14-day mood chart.
- **Find entries**: full-text search, filter by mood, or click a tag on any entry to filter by it. Entries are grouped by month, and long ones collapse with "Show more".

### To-Do (`#/todo`)

- Add tasks, check them off and delete them, with Undo after a delete.
- Edit a task by double-clicking it or using the ✎ button.
- A progress bar shows how much is done. Filter by All, Open or Done, and use **Clear completed** to remove finished tasks.

### General

- The top bar switches between the two sections. Each section has its own address, so the back button and bookmarks work.
- The layout adapts to phone screens, and animations turn off if your system asks for reduced motion.
- **Saving**: data is stored in your browser's `localStorage` under `daybook.journal`, `daybook.draft` and `daybook.todos`. It stays in that browser on that computer only. Clearing your browser data erases it.

## How the code is organized

Everything is in `daybook.html`: a `<style>` block, the page shell, and one `<script>` with four parts:

1. **Utilities**: `load()` / `save()` / `remove()` helpers around `localStorage`, plus `toast()` (with an optional Undo), `debounce()` and `esc()`, which escapes user text before it goes into the page
2. **Journal view**: `renderJournal(root)` has a composer (mood, energy, tags, draft autosave, edit mode), insights (`drawInsights`) and the filtered list (`drawList`). `normalize()` upgrades entries saved by older versions.
3. **To-Do view**: `renderTodo(root)`
4. **Router**: maps `#/journal` and `#/todo` to their view functions

Mood colors are defined as CSS variables `--mood-1` … `--mood-5`.

To add a section, write a `render<Name>(root)` function and add it to `routes`. Then add a matching `<a href="#/<name>" data-route="<name>">` link in the top bar.
