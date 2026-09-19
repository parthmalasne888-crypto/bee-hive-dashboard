# HiveSense Field Light

## Visual design system

HiveSense uses a field-intelligence aesthetic: warm, near-white surfaces make the farmer-facing information calm and approachable, while a deep forest navigation rail and evergreen call-to-actions establish trust and visual focus. Honey gold is reserved for sensor activity, primary highlights, and product provenance.

| Role | Token | Use |
| --- | --- | --- |
| Canvas | `#F8F5ED` | Main interface background |
| Forest | `#183B2A` | Navigation, primary actions, footer |
| Honey | `#C9831C` | Signals, selected states, product energy |
| Leaf | `#287C56` | Healthy/verified status |
| Alert | `#BD4C38` | Critical action only |

Typography is Manrope for clear, human product copy and DM Mono for measurement labels and technical context.

## Page and component architecture

The page remains a single, section-addressable product story to retain fast navigation and existing feature state:

1. Hero / overview
2. Smart-hive product story and honeycomb controls
3. Hive health and selectable hive records
4. Hive list and analytics
5. Traceability and certificate
6. Pollination intelligence
7. B-Mart and sell-honey workflow
8. Emergency intelligence and footer

Reusable React components cover navigation, section headings, telemetry cards, charts, hive health, traceability, pollination, product cards, and the marketplace modal. Demo telemetry is isolated in `useLiveTelemetry`, so a real ESP32/backend adapter can replace its output without changing UI components.

## Animation and interaction map

- The hero uses a lightweight CSS hive/bee/sensor scene with orbiting data, a small pointer tilt, and scoped visual telemetry.
- Honeycomb cells react to hover and selection to reveal one focused category at a time.
- Product cards lift and the jar visual subtly rotates; marketplace actions maintain local React state and clearly label demo outcomes.
- The emergency control shifts sensor data and elevates the farmer-first "what happened / what to do" alert.
- `IntersectionObserver` synchronizes sidebar state to scroll position; navigation and search scroll directly to their relevant sections.

## Responsive, performance, and accessibility strategy

Mobile uses the same information priorities with a collapsible navigation and reduced grid density. Decorative motion is CSS transform/opacity based, rather than a continuously mounted WebGL scene. Animation is turned down under `prefers-reduced-motion`; controls retain keyboard focus and status is expressed with text as well as color. Live values are explicitly presented as a demo until a backend source is connected.
