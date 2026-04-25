# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Git & GitHub Workflow

Every code change must be committed and pushed to GitHub:

```bash
git add <file>
git commit -m "descriptive message"
git push
```

- Remote: `https://github.com/onlydejavuagi/claude-coding-projects` (branch `master`)
- `gh` CLI is at `/c/Program Files/GitHub CLI/gh` — add to PATH with `export PATH="$PATH:/c/Program Files/GitHub CLI"`
- Write commit messages that describe *what changed and why*, not just "update"

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
