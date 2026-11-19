# Claude Coding Projects

A collection of small, standalone browser apps built with Claude Code. Each app is a single self-contained `.html` file with no build step, dependencies or package manager.

## Quick start

1. Clone the repo:
   ```bash
   git clone https://github.com/onlydejavuagi/claude-coding-projects.git
   ```
2. Open any `.html` file directly in your browser (double-click it, or drag it into a browser window).

That's it. Nothing to install.

## Apps

### Tic Tac Toe — [`tictactoe.html`](tictactoe.html)

A classic 3×3 game.

- **2-player mode**: take turns on the same screen.
- **vs CPU mode**: play against a minimax AI that never loses. Toggle with the mode button.
- **Score tracking** across rounds; **New Game** resets the board.

### Daily News Curator — [`news-curator.html`](news-curator.html)

Pick the day's top stories and turn them into a short show script.

- **Live feeds** from CNBC, Reuters, MarketWatch, TechCrunch, The Verge, Ars Technica and Hacker News, merged and sorted newest first.
- **Filter** by All, Stock or Tech, and hit **Refresh** to re-fetch.
- **Build an episode** of up to 10 stories: add with **+**, reorder with ▲/▼, remove with ✕. Your episode is saved in the browser (`localStorage`), so it survives a reload.
- **Export** as a narrated **Script** or a **Bullet List**, then **Copy to Clipboard**.
- **Read aloud** with Play / Pause / Stop, using your browser's built-in text-to-speech.

> **Note:** Feeds are fetched through the public [allorigins.win](https://allorigins.win) CORS proxy, so the app needs an internet connection. If a source fails to load, the proxy or that feed may be temporarily down; try **Refresh**.

### Daybook: Journal & To-Do — [`ClaudeVSCodeProject/daybook.html`](ClaudeVSCodeProject/daybook.html)

A minimal journal and to-do app with top-bar navigation between the two sections.

- **Journal**: log entries with mood, energy, a "grateful for" line and tags. Drafts autosave, and entries can be edited, searched and filtered. It also shows your writing streak and a 14-day mood chart.
- **To-Do**: add, edit, check off and delete tasks, with a progress bar and Undo.
- Everything is saved in your browser (`localStorage`).

## Project conventions

- One self-contained `.html` file per app, using vanilla JavaScript (ES6+) and no external libraries.
- Shared dark theme:

  | Role       | Color     |
  |------------|-----------|
  | Background | `#1a1a2e` |
  | Surface    | `#16213e` |
  | Card       | `#0f3460` |
  | Accent     | `#e94560` |
  | Teal       | `#a8dadc` |

See [CLAUDE.md](CLAUDE.md) for architecture notes and the Git workflow used in this repo.

## Related

- [garagedoorapp](https://github.com/onlydejavuagi/garagedoorapp): a garage door visualizer (Next.js) that started here and now lives in its own repo.
