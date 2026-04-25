# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Git & GitHub Workflow

**Commit and push after every meaningful unit of work.** Do not batch multiple features into one commit, and do not leave work uncommitted at the end of a session. The goal is that GitHub always reflects the current working state of the project so work is never lost and any change can be reverted.

```bash
git add <file>
git commit -m "descriptive message"
git push
```

When to commit:
- After adding a new feature or fixing a bug
- After any change that leaves the app in a working state
- Before starting a risky or experimental change

Commit message rules:
- First line: short summary of *what* changed and *why* (not just "update" or "fix")
- If multiple things changed, use a short body listing them

Setup notes:
- Remote: `https://github.com/onlydejavuagi/claude-coding-projects` (branch `master`)
- `gh` CLI path: `/c/Program Files/GitHub CLI/gh` — activate with `export PATH="$PATH:/c/Program Files/GitHub CLI"`

## Project Structure

All projects are standalone single-file HTML apps — no build step, no dependencies, no package manager. Open any `.html` file directly in a browser to run it.

| File | Description |
|------|-------------|
| `tictactoe.html` | Tic Tac Toe game — 2-player and vs CPU (minimax AI), score tracking |
| `news-curator.html` | Daily news curator — RSS feeds, episode builder, script/bullet export, TTS |

## news-curator.html Architecture

**Data flow:** On load, `fetchAllFeeds()` fires parallel `fetch()` calls through the `allorigins.win` CORS proxy for 7 RSS sources (CNBC, Reuters, MarketWatch, TechCrunch, The Verge, Ars Technica, Hacker News). Raw XML is parsed in-browser via `DOMParser`, supporting both RSS 2.0 (`<item>`) and Atom (`<entry>`) formats. Results are merged, deduplicated by `id` (link+title), and sorted newest-first into `allItems[]`.

**State:** Three global arrays drive the UI — `allItems[]` (all fetched stories), `episode[]` (user-curated list, max 10, persisted to `localStorage`). Two strings track active tab filters: `activeFilter` (`all`/`stock`/`tech`) and `activeExport` (`script`/`bullets`).

**Key functions:**
- `fetchSource(src)` — fetches one RSS feed via allorigins proxy, returns normalized item objects
- `renderFeed()` — re-renders left panel cards filtered by `activeFilter`; reads `episode[]` to grey out already-added cards
- `addToEpisode(item)` / `removeFromEpisode(id)` / `moveStory(id, dir)` — mutate `episode[]`, save to localStorage, re-render both panels
- `updateExport()` — regenerates export textarea content and stops any active TTS
- `generateScript()` / `generateBulletList()` — build export strings from `episode[]`
- TTS: `playTTS()`, `togglePause()`, `stopTTS()` — wrap `window.speechSynthesis`; `syncTTSButtons()` updates button states

**Layout:** CSS Grid two-column (`1fr 1fr`). Left = scrollable news feed. Right = episode list (flex, scrollable) stacked above export panel (fixed `280px` height).

## Design Conventions

- Dark theme throughout: background `#1a1a2e`, surface `#16213e`, card `#0f3460`, accent `#e94560`, teal `#a8dadc`
- New apps should be single self-contained `.html` files following the same dark theme
- No external CSS/JS libraries — vanilla JS (ES6+) only
