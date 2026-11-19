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

- **Task details**: give a task a **priority** (High, Medium or Low), a **due date** (with quick **Today** and **Tomorrow** buttons) and **tags**.
- **Edit** a task with ✎ or by double-clicking its text. That opens an inline editor for the text, priority, due date and tags. **Enter** saves and **Esc** cancels.
- **Complete** a task with the round checkbox. You can Undo the change, and deleting a task also offers Undo.
- **Completed tasks look different**: they move into their own collapsible **Completed** section. They're drawn flat, with a dashed outline, a green tick, struck-through text and a "Done 2h ago" note. Active tasks have a colored priority stripe and due-date badges: red when overdue, amber when due today.
- **Overview**: Active, Due today, Overdue and Done this week counts. Click one to filter by it. There's also a progress bar and a one-line summary.
- **Filters**:
  - Show **Active**, **Completed** or **All** tasks.
  - Filter by due date: **Overdue**, **Today**, **This week** or **No date**, each with a count.
  - Filter by **priority**, or by **tag** (click a tag on any task).
  - **Search** tasks, and **Clear filters** to reset.
- **Sort**: Smart (overdue and due-today first, then by priority and due date), Due date, Priority or Newest. Your Show and Sort choices and whether Completed is collapsed are remembered.

### General

- The top bar switches between the two sections. Each section has its own address, so the back button and bookmarks work.
- The layout adapts to phone screens, and animations turn off if your system asks for reduced motion.
- **Saving**: data is stored in your browser's `localStorage` under `daybook.journal`, `daybook.draft`, `daybook.todos` and `daybook.todoPrefs`. It stays in that browser on that computer only. Clearing your browser data erases it.

## How the code is organized

Everything is in `daybook.html`: a `<style>` block, the page shell, and one `<script>` with four parts:

1. **Utilities**: `load()` / `save()` / `remove()` helpers around `localStorage`, plus `toast()` (with an optional Undo), `debounce()` and `esc()`, which escapes user text before it goes into the page
2. **Journal view**: `renderJournal(root)` has a composer (mood, energy, tags, draft autosave, edit mode), insights (`drawInsights`) and the filtered list (`drawList`). `normalize()` upgrades entries saved by older versions.
3. **To-Do view**: `renderTodo(root)` has stats, filters/sorting (`matches`, `sorters`), active and completed lists (`taskCard`) and the inline editor (`startEdit`). `taskOptions()` builds the priority/due/tag controls shared by the add form and the editor, and `normTodo()` upgrades tasks saved by older versions.
4. **Router**: maps `#/journal` and `#/todo` to their view functions

Mood colors are defined as CSS variables `--mood-1` … `--mood-5`.

To add a section, write a `render<Name>(root)` function and add it to `routes`. Then add a matching `<a href="#/<name>" data-route="<name>">` link in the top bar.
