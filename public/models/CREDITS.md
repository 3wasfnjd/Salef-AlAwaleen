# Model credits

| File | Source | Licence |
|---|---|---|
| `shaib.glb` | Owner's Mafateeh project, branch `mafateeh-v2`, `quest-native/assets/character/shaib.glb` (authored in Blender, original work) | MIT — © 2026 Aboden Games — عبودين قيمز |

| `world/tent.glb`, `world/lantern.glb`, `world/camel_kneeling.glb`, `world/camel_standing.glb`, `world/sheep.glb` | Mafateeh `mafateeh-v2` `quest-native/assets/world/props/` — owner's props whose base is **Folio 2025 by Bruno Simon** (MIT, © 2025 Bruno Simon) | MIT |
| `world/courtyard.glb`, `world/palm.glb`, `world/tower.glb`, `world/well.glb` | Mafateeh `mafateeh-v2` `quest-native/assets/world/` — owner's designs | MIT — © 2026 Aboden Games |
| `world/sky_morning.jpg` | Kenney "Skyboxes" (www.kenney.nl), via Mafateeh | CC0 1.0 |

All copied unchanged. At runtime its sheen/specular materials are converted to standard
materials for Quest performance (see `src/scene/character/GlbElder.ts`).

## Owner assets available for later scenes

The owner confirmed (2026-10-17) that all Mafateeh `mafateeh-v2` world assets are their own
designs, so they can be used here: `world/props/tent.glb` (بيت شعر), `world/house/*` (mud
houses, towers), `world/courtyard.glb`, `world/kit/*` (Najdi walls, crenels, columns, well),
`world/palm.glb`, and the animals and props. The props README there also credits
Bruno Simon's Folio 2025 (MIT) as the base of some props, including the tent; keep that
credit if they ship.
