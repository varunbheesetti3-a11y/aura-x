# Aura-X Autonomous Multi-Agent Development Platform

React / Express / tRPC / Drizzle starter, adapted from the Sandbox web-db-user template.

Aura-X is now a Signal noir command center for autonomous multi-agent development work. The
current release includes an interactive workspace shell for projects, runs, agent delegation,
model/provider routing, tool and environment readiness, research, automations, security/audit,
metrics/release, and settings. The UI is explicit about demo data, evidence, and blocked states,
and is ready to connect the visible domain records to the initialized backend.

- `pnpm dev`: development server; honors `PORT` (default 3000).
- `pnpm build` / `pnpm start`: build and serve `dist/index.js` and `dist/public/`.
- `pnpm db:migrate`: apply checked-in migrations. `pnpm db:push`: generate and apply new schema changes.
- `pnpm check` / `pnpm test`: types and application tests.

Start with the Webdev skill's default-template guide. Platform login, storage, payments and service contracts live in its shared references; read the relevant capability before extending its helper.

`server/_core/publicConfig.ts` exposes only named public runtime values. Private keys stay server-side. The platform serves managed `/manus-storage/` assets; the application does not register a second proxy.

Platform configuration is readable and editable through `webdev.config`. Default settings are initial values, not enforced constraints. The agent may modify the files, commands and configuration or follow the flexible guide for another stack.
