# Aura-X implementation plan

## Product scope
Aura-X is an autonomous multi-agent development platform. This first release turns the proposed engineering specification into a usable command center: users can inspect active projects, submit a build request, see the plan and delegated agent graph, manage provider/model routing, inspect tools and environment readiness, run research workflows, define automations and recovery behavior, review security/audit signals, and track release readiness and delivery metrics.

The UI is explicit about state. Seeded records are labeled as demo data; verified evidence is shown separately from model-generated explanations. Real provider calls, OAuth, persistent domain tables, and scheduled callbacks remain clear extension points rather than being faked as complete.

## Implementation approach
- Use the initialized React/Express/tRPC/Drizzle starter and keep the server/database capability enabled.
- Implement the primary user experience in `client/src/pages/Home.tsx` with local state for this first vertical slice: navigation, build composer, provider/tool toggles, research search, automation toggles, security acknowledgements, and release checks.
- Use a small set of reusable presentational helpers and Lucide icons instead of generic dashboard boilerplate.
- Keep the architecture ready for real persistence by modeling visible records around the specification's domains: projects, runs, agents, providers, tools, automations, audit events, and release checks.
- Add a route manifest for the app's navigable page declarations and a literal project logo URL for checkpoint metadata.

## Design system

### Alternatives considered
- **Signal noir** (0.06): a dark, instrument-panel workspace with sharp signal colors and evidence-first density.
- **Warm editorial ops** (0.04): a light, paper-like operations console with amber annotations.
- **Glass laboratory** (0.08): a translucent, high-chroma lab interface with floating cards.

### Chosen: Signal noir
**Design Movement:** Mission-control software meets Swiss information design; compact blocks, measured spacing, and deliberately limited color.

**Core Principles:** evidence over spectacle; state is always legible; operator actions are close to their consequences; every surface earns its place.

**Color Philosophy:** near-black blue-charcoal surfaces create calm focus; cobalt is the ownable Aura-X signal for active work; mint confirms verified progress; amber marks attention; red is reserved for blocked or unsafe states.

**Layout Paradigm:** a fixed left rail anchors context while the main canvas uses asymmetric editorial bands: a wide workstream column, a narrow system column, and low-noise detail strips instead of centered card grids.

**Signature Elements:** cobalt vertical signal bars; tiny mono metadata labels; a recurring “evidence / state / next” triad in cards.

**Interaction Philosophy:** controls should feel like operator instruments: small, direct, stateful, and reversible. Buttons update labels and status immediately; nothing implies success without a visible status or evidence line.

**Animation:** use short 160–220ms fades and slide-ins for panels, with pulsing only on live status indicators. Avoid ornamental motion.

**Typography System:** `Space Grotesk` for headings and UI labels, `IBM Plex Mono` for identifiers, timestamps, metrics, and status metadata. Large headings are tight and short; body copy stays compact and high contrast.

**Brand Essence:** the operating layer for teams who want autonomous software work without losing the chain of evidence. Precise, auditable, quietly ambitious.

**Brand Voice:** headlines are active and specific; CTAs name the next operator action. Example lines: “Build with intent. Ship with evidence.” / “Start a run and keep the chain visible.”

**Wordmark & Logo:** a compact `A/X` monogram built from two intersecting cobalt signal strokes; it reads as both a route junction and an agent handoff.

**Signature Brand Color:** Aura cobalt `#6C7BFF`.

## Project structure
- `client/src/pages/Home.tsx`: command center shell, seeded domain records, interactive panels and run composer.
- `client/src/index.css`: Signal noir theme tokens, layout primitives, tables, progress, motion, and responsive behavior.
- `client/src/App.tsx`: route entry and shared providers.
- `public/manus-routes.json`: declared page route surface.
- `drizzle/schema.ts`, `server/db.ts`, `server/routers.ts`: prepared extension points for persistent domain tables and tRPC procedures.

## Build workflow
Run `pnpm check`, `pnpm build`, start the managed dev server on port 3000, verify `/api/health` and `/manus-routes.json`, and inspect the live preview. Save the working version to the project's canonical `main` branch after validation.
