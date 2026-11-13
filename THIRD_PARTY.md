# Sources and attribution

## Planetary maps and sky

Planet textures, ring texture, moon and Milky Way panorama are by **Solar System Scope / INOVE**, distributed under **Creative Commons Attribution 4.0 International**.

- Source: https://www.solarsystemscope.com/textures/
- License: https://creativecommons.org/licenses/by/4.0/
- Files: `dist/assets/planets/*` (resized to 1K / 2K JPEG for faster loading)
- Use in this project: equirectangular maps on Three.js spheres, ring UV mapping, translucent cloud layers and a dimmed sky dome. Lighting, materials, presentation and animation are modified by this project. Textures were downscaled for web delivery; no other changes to the images.

Visible attribution is included in the website footer. No endorsement is implied.

## Three.js

Three.js 0.160.1, MIT License. The license is included at `dist/assets/vendor/THREE-LICENSE.txt`.

## Design and 3D references consulted

The following public skill documents informed the implementation. They were read as design and engineering references; no third-party skill installer or script was executed.

- UI/UX Pro Max: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/main/.claude/skills/ui-ux-pro-max/SKILL.md
- Animation: https://github.com/cesartevisual/threejs-skills/blob/main/skills/threejs-animation/SKILL.md
- Shaders: https://github.com/cesartevisual/threejs-skills/blob/main/skills/threejs-shaders/SKILL.md
- Performance: https://github.com/cesartevisual/threejs-skills/blob/main/skills/threejs-performance/SKILL.md

Applied principles include readable typography, visible keyboard focus, touch controls, reduced motion, elapsed-time animation with damping, explicit transform ownership, instancing, and cleanup when a scene is replaced.

## Fonts

Inter, Space Grotesk and JetBrains Mono are requested from Google Fonts, with system fallbacks. No remote asset request is required for the 3D models or planetary maps at runtime.
