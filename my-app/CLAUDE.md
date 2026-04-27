# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Important: Next.js 16

This project uses **Next.js 16.2.4**, which has breaking changes from earlier versions. Before modifying any Next.js-specific behaviour (routing, config, middleware, font loading), read the relevant guide in `node_modules/next/dist/docs/`. The bundler is Turbopack (not webpack).

## Git Workflow

Commit and push to GitHub after every meaningful unit of work. Never leave working changes uncommitted at the end of a session.

```bash
git add <files>
git commit -m "short description of what changed and why"
git push
```

Commit after: adding a feature, fixing a bug, any change that leaves the app in a working state. Each commit message should say *what* changed and *why* — not just "update" or "fix".

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build (runs type-check + lint)
npm run start    # Serve the production build
npm run lint     # ESLint (eslint-config-next)
```

On Windows, `npx`/`npm` require the PATH to include the Node.js install directory. If they are not found in Bash, use the PowerShell tool and prepend:
```powershell
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force
```

There is no test suite.

## Environment Variables

Both variables are required and live in `.env.local` (gitignored):

| Variable | Purpose |
|---|---|
| `OPENAI_API_KEY` | OpenAI API key for `gpt-image-1` image editing |
| `GENERATE_PASSWORD` | Password users must enter before AI generation runs |

## Architecture

Single-page Next.js App Router application. Two source files drive all behaviour:

### `app/page.tsx` (client component)
All UI and state lives here — no sub-components or separate files. Key pieces:

- **`DOORS` array** — defines the 6 vendor door styles (id, name, vendor, material, price, description). Adding a new style requires an entry here, a corresponding SVG component, a `DoorSVG` switch case, and a prompt in the API route.
- **SVG door components** (`ClassicWhiteDoor`, `CarriageHouseDoor`, etc.) — inline SVG illustrations used as sidebar thumbnails. Each accepts a `uid` prop appended to gradient IDs to prevent conflicts when the same door renders in multiple places simultaneously.
- **`resizeToPNG(src, maxPx)`** — client-side canvas helper that downscales any uploaded image to ≤1024 px on its longest edge and converts it to PNG before sending to the API.
- **Password modal** — shown when "Generate with AI" is clicked. Submits the password alongside the image; a 401 response re-opens the modal with an error rather than surfacing it as a generation error.
- **`view` state** (`"original"` | `"result"`) — toggles between the uploaded house photo and the AI-generated result. The Before/After toggle only appears once a result exists.

### `app/api/generate/route.ts` (server — POST `/api/generate`)
Accepts `{ image: string, doorId: string, password: string }` where `image` is a base64 PNG data URL.

1. Validates `GENERATE_PASSWORD` — returns 401 on mismatch.
2. Looks up `DOOR_PROMPTS[doorId]` — a per-style natural-language instruction telling `gpt-image-1` exactly what door to render while preserving the rest of the house.
3. Converts the base64 image to a `File` object via `openai.toFile` and calls `openai.images.edit()` with `model: "gpt-image-1"`, no mask (the model infers the garage door location from context).
4. Returns the result as `{ image: "data:image/png;base64,..." }`.

## Design

Dark theme matching the rest of the repo: `#1a1a2e` background, `#16213e` surface, `#0f3460` card, `#e94560` accent, `#a8dadc` teal. All styling is inline (`style={{}}`), not Tailwind classes, for consistency with the other HTML apps in the parent repo.
