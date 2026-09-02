# Eco-Tycoon Agent Memory

- **Project Summary**: A 2.5D isometric environmental tycoon game where players restore a polluted island.
- **Core Loop**: Select buildings (Solar, Wind, Filter, Nursery, Logistics) from the HUD, place them on a 2.5D grid, and watch the "Ecology" % grow. Increasing ecology triggers a radial reveal mask that replaces the grey "polluted" terrain with lush "clean" terrain.
- **Files**:
  - `/index.html`: Phaser 3 via esm.sh importmap.
  - `/main.js`: Main game logic, isometric grid, and masking system.
  - `/art_direction.md`: Visual style (isometric cartoon).
  - `/sound_direction.md`: Lo-fi music and environmental SFX.
- **Assets**: 
  - `assets/*.webp`: Isometric buildings and tiles.
  - `assets/audio/*.mp3`: Theme music and SFX.
- **Controls**: Mouse click to select buildings and place them on the grid.
- **Status**: Validation pass, Runtime check clean (Phaser initialized).
- **Masking Logic**: Uses `Phaser.GameObjects.Graphics` and `createGeometryMask` on the `cleanTerrainGroup` and buildings. The mask radius expands based on `cleanliness`.
