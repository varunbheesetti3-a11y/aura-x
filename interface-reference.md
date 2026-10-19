# Aura-X interface reference notes

The new interface follows the attached request and the seven Libraries.dev references inspected on 19 October 2026. The sources describe a minimal dark AI workspace with a collapsible history sidebar, a bottom-anchored chat composer, mode selection, and stateful feedback while the assistant works.

- Border beam: animated rainbow/conic glow that rides the border of cards, buttons, and inputs; the implementation uses a focused composer beam.
- Thinking orbs: small thought-orb indicators with multiple states including working, searching, listening, composing, breathing, and weaving; the implementation uses CSS-orb states beside the welcome mark and agent messages.
- Gooey: liquid/morph navigation interactions; the implementation keeps navigation compact and uses merge-like hover/focus transitions in the workspace drawer and sidebar items.
- Voice: colorful glow rising from the bottom of a chat input during recording and sweeping while a reply is processed; the implementation uses the voice-active composer glow.
- Bot avatars: dependency-free animated canvas-style living agent avatars; the implementation uses a small CSS avatar with eye/mouth tracking cues and a working hop animation.
- Metal: liquid metal treatment for primary buttons with reflections and cursor-driven emphasis; the implementation uses a chromatic gradient, inset highlight, glow, and hover bend treatment on send.
- Image: pixel-mosaic loader that churns while image generation is in progress; the implementation uses a mosaic loader card from the composer image action.

References: https://libraries.dev/beam.html, https://libraries.dev/orbs.html, https://libraries.dev/gooey.html, https://libraries.dev/voice.html, https://libraries.dev/bots.html, https://libraries.dev/metal.html, https://libraries.dev/image.html

The product capabilities from the prior release remain accessible through the workspace drawer and settings surfaces. The new interface is intentionally implemented without pretending that external providers, credentials, or production deployment are connected.
